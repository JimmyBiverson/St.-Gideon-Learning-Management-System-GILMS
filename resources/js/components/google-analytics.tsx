import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

let gaInitialized = false;
let lastPageViewUrl: string | null = null;

function firePageView(): void {
   // Guards against firing twice for the same URL back-to-back, which
   // React's StrictMode triggers in development by double-invoking this
   // effect on initial mount. A real navigation always changes the URL.
   if (lastPageViewUrl === window.location.href) {
      return;
   }

   lastPageViewUrl = window.location.href;
   window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title,
   });
}

function initGtag(measurementId: string): void {
   if (gaInitialized || typeof window === 'undefined') {
      return;
   }

   gaInitialized = true;

   const script = document.createElement('script');
   script.async = true;
   script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
   document.head.appendChild(script);

   window.dataLayer = window.dataLayer || [];
   window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer ??= []).push(arguments);
   };
   window.gtag('js', new Date());
   // We fire page_view manually on every Inertia navigation, since this
   // is an SPA and the automatic gtag page_view only fires on hard loads.
   window.gtag('config', measurementId, { send_page_view: false });
}

/**
 * Loads Google Analytics (gtag.js) and tracks page_view on every Inertia
 * navigation. Mounted only on public layouts (landing, auth) — never in
 * the dashboard. No-ops entirely when disabled or no Measurement ID is set.
 */
export function GoogleAnalytics() {
   const { props } = usePage<SharedData>();
   const { googleAnalytics, flash } = props;
   const firedEvents = useRef(new Set<string>());

   useEffect(() => {
      if (!googleAnalytics?.enabled || !googleAnalytics.measurementId) {
         return;
      }

      initGtag(googleAnalytics.measurementId);
      firePageView();

      const removeListener = router.on('navigate', firePageView);

      return () => removeListener();
   }, [googleAnalytics?.enabled, googleAnalytics?.measurementId]);

   useEffect(() => {
      if (!googleAnalytics?.enabled || !flash?.googleAnalyticsEvent) {
         return;
      }

      if (!window.gtag) {
         return;
      }

      const { event, transaction_id, value, currency, content_name } =
         flash.googleAnalyticsEvent;

      const dedupeKey = transaction_id ?? event;

      if (firedEvents.current.has(dedupeKey)) {
         return;
      }

      firedEvents.current.add(dedupeKey);

      const eventParams: Record<string, unknown> = {};

      if (transaction_id !== undefined) {
         eventParams.transaction_id = transaction_id;
      }

      if (value !== undefined) {
         eventParams.value = value;
      }

      if (currency !== undefined) {
         eventParams.currency = currency;
      }

      if (content_name !== undefined) {
         eventParams.content_name = content_name;
      }

      window.gtag('event', event, eventParams);
   }, [flash?.googleAnalyticsEvent, googleAnalytics?.enabled]);

   return null;
}

export default GoogleAnalytics;

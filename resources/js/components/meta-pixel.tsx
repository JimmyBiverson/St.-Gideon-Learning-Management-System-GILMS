import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

let pixelInitialized = false;
let lastPageViewUrl: string | null = null;

function firePageView(): void {
   // Guards against firing twice for the same URL back-to-back, which
   // React's StrictMode triggers in development by double-invoking this
   // effect on initial mount. A real navigation always changes the URL.
   if (lastPageViewUrl === window.location.href) {
      return;
   }

   lastPageViewUrl = window.location.href;
   window.fbq?.('track', 'PageView');
}

function getCookie(name: string): string | null {
   if (typeof document === 'undefined') {
      return null;
   }

   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);

   if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
   }

   return null;
}

function setCookie(name: string, value: string, days: number): void {
   if (typeof document === 'undefined') {
      return;
   }

   const maxAge = days * 24 * 60 * 60;
   document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
}

function extractFbclidFromCookie(fbcCookie: string): string | null {
   const parts = fbcCookie.split('.');

   if (parts.length >= 4 && parts[0] === 'fb') {
      return parts.slice(3).join('.');
   }

   return null;
}

function formatFbc(fbclid: string): string {
   return `fb.1.${Date.now()}.${fbclid}`;
}

function initPixel(pixelId: string): void {
   // console.log('initPixel called, pixelInitialized:', pixelInitialized);

   if (pixelInitialized || typeof window === 'undefined') {
      return;
   }

   pixelInitialized = true;

   /* eslint-disable */
   (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
         n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;

      const s = b.getElementsByTagName(e)[0];

      s.parentNode?.insertBefore(t, s);
   })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js',
   );
   /* eslint-enable */

   window.fbq?.('init', pixelId);
}

/**
 * Loads the Meta Browser Pixel and tracks PageView on every Inertia
 * navigation. Mounted only on public layouts (landing, auth) — never in
 * the dashboard. No-ops entirely when disabled or no pixel ID is set.
 */
export function MetaPixel() {
   const { props } = usePage<SharedData>();
   const { metaPixel, flash } = props;
   const firedEventIds = useRef(new Set<string>());

   useEffect(() => {
      if (!metaPixel?.enabled || !metaPixel.pixelId) {
         return;
      }

      const params = new URLSearchParams(window.location.search);
      const fbclid = params.get('fbclid');

      if (fbclid) {
         const existingFbc = getCookie('_fbc');
         const existingFbclid = existingFbc
            ? extractFbclidFromCookie(existingFbc)
            : null;

         if (!existingFbc || existingFbclid !== fbclid) {
            setCookie('_fbc', formatFbc(fbclid), 90);
         }

         params.delete('fbclid');
         const url = new URL(window.location.href);
         url.search = params.toString();
         window.history.replaceState({}, '', url.toString());
      }

      initPixel(metaPixel.pixelId);
      firePageView();

      const removeListener = router.on('navigate', firePageView);

      return () => removeListener();
   }, [metaPixel?.enabled, metaPixel?.pixelId]);

   useEffect(() => {
      if (!metaPixel?.enabled || !flash?.metaPixelEvent) {
         return;
      }

      if (!window.fbq) {
         return;
      }

      const { event, event_id, value, currency, content_name } =
         flash.metaPixelEvent;

      if (firedEventIds.current.has(event_id)) {
         return;
      }

      firedEventIds.current.add(event_id);

      const customData: Record<string, unknown> = {};

      if (value !== undefined) {
         customData.value = value;
      }

      if (currency !== undefined) {
         customData.currency = currency;
      }

      if (content_name !== undefined) {
         customData.content_name = content_name;
      }

      window.fbq('track', event, customData, { eventID: event_id });
   }, [flash?.metaPixelEvent, metaPixel?.enabled]);

   return null;
}

export default MetaPixel;

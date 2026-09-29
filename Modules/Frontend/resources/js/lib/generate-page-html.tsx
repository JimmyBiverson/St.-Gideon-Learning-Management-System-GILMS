import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PageRenderer from '@/frontend/page-jsx/page-renderer';

export interface UseGeneratePageHtmlOptions {
   /**
    * How long (ms) to wait after the last child/text DOM mutation before
    * capturing the HTML. Attribute changes (e.g. carousel transforms) are
    * intentionally ignored so animations never block the capture.
    * Default: 600ms.
    */
   stabilizeDelay?: number;

   /**
    * Hard timeout (ms) — captures whatever is rendered by this point.
    * Default: 10000ms.
    */
   timeout?: number;
}

export interface UseGeneratePageHtmlResult {
   /** Captured HTML string (available after DOM stabilises). */
   html: string | null;
   /**
    * MUST be rendered somewhere in your JSX tree.
    * Renders PageRenderer into a hidden off-screen container so that
    * Inertia context (usePage, Link) and useEffect/API calls all work,
    * and captures the final HTML once the DOM settles.
    *
    * @example  return <>{portal}<PageRenderer pageData={pageData[0]} /></>;
    */
   portal: React.ReactPortal | null;
}

/**
 * Captures a fully-rendered HTML snapshot of a page in the background.
 *
 * Renders the component in a hidden off-screen container (portal) so that:
 *  - Inertia context (usePage, Link, etc.) is inherited — card components work
 *  - useEffect runs — DynamicWrapper API calls fire and complete
 *  - Attribute mutations (carousel animations) are ignored by the observer
 *    so the debounce settles once structural/data changes stop
 *
 * The visible page should be rendered separately using <PageRenderer> directly,
 * which also supports SSR (page source will contain the full HTML).
 *
 * @example
 * const { html, portal } = useGeneratePageHtml(pageData[0]);
 *
 * useEffect(() => { if (html) console.log(html); }, [html]);
 *
 * return (
 *   <>
 *     {portal}
 *     <PageRenderer pageData={pageData[0]} />
 *   </>
 * );
 */
export function useGeneratePageHtml(
   pageData: EditorElement | null,
   options: UseGeneratePageHtmlOptions = {},
): UseGeneratePageHtmlResult {
   const { stabilizeDelay = 600, timeout = 10_000 } = options;

   const [html, setHtml] = useState<string | null>(null);

   // Create the off-screen container once during state initialisation so it is
   // immediately available for createPortal on the first client render.
   // The typeof check makes this SSR-safe (document doesn't exist in Node.js).
   const [container] = useState<HTMLDivElement | null>(() => {
      if (typeof document === 'undefined') {
         return null;
      }

      const div = document.createElement('div');
      div.setAttribute('aria-hidden', 'true');
      div.style.cssText =
         'position:fixed;top:-99999px;left:-99999px;width:1280px;' +
         'pointer-events:none;visibility:hidden;z-index:-9999;overflow:hidden;';
      document.body.appendChild(div);

      return div;
   });

   const containerRef = useRef(container);

   // Remove the off-screen container when the component unmounts.
   useEffect(() => {
      const el = containerRef.current;

      return () => {
         if (el) {
            document.body.removeChild(el);
         }
      };
   }, []);

   // Watch the hidden container for structural changes and capture once stable.
   useEffect(() => {
      if (!container || !pageData) {
         return;
      }

      const el = container;
      let stabilizeTimer: ReturnType<typeof setTimeout>;

      const capture = () => {
         clearTimeout(stabilizeTimer);
         observer.disconnect();
         clearTimeout(maxTimer);
         setHtml(el.innerHTML);
      };

      // Only watch childList and characterData — NOT attributes.
      // Carousel/animation transforms change attributes continuously and would
      // prevent the debounce from ever settling.
      const observer = new MutationObserver(() => {
         clearTimeout(stabilizeTimer);
         stabilizeTimer = setTimeout(capture, stabilizeDelay);
      });

      observer.observe(el, {
         childList: true,
         subtree: true,
         characterData: true,
         attributes: false,
      });

      const maxTimer = setTimeout(capture, timeout);

      return () => {
         clearTimeout(stabilizeTimer);
         clearTimeout(maxTimer);
         observer.disconnect();
      };
   }, [container, pageData, stabilizeDelay, timeout]);

   // Portal renders INTO the hidden off-screen container.
   // Because the portal is declared inside the component's JSX tree it
   // inherits every React context (Inertia PageContext, translations, etc.).
   const portal =
      container && pageData
         ? createPortal(<PageRenderer pageData={pageData} />, container)
         : null;

   return { html, portal };
}

/**
 * Stable ref callback for use with containerRef pattern.
 * Kept as a separate export for consumers that need it.
 */
export function useStableRefCallback<T extends HTMLElement>(
   setter: React.Dispatch<React.SetStateAction<T | null>>,
) {
   return useCallback(
      (el: T | null) => {
         setter(el);
      },
      [setter],
   );
}

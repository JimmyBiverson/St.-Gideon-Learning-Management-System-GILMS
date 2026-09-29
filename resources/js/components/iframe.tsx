import { usePage } from '@inertiajs/react';
import type { IframeHTMLAttributes, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface IFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {
   children: ReactNode;
   previewTheme: 'light' | 'dark' | 'system';
}

const IFrame = ({
   children,
   className,
   previewTheme,
   ...props
}: IFrameProps) => {
   const page = usePage<EditorProps>();
   const iframeRef = useRef<HTMLIFrameElement>(null);
   const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
   const [isIframeReady, setIsIframeReady] = useState(false);
   const scrollPositionRef = useRef({ x: 0, y: 0 });

   // Memoize theme config to prevent unnecessary recreations
   const themeConfig = useMemo(
      () => page.props.project.theme_config,
      [page.props.project.theme_config],
   );

   useEffect(() => {
      if (iframeRef.current) {
         // const { document } = contentRef.contentWindow;
         const document = iframeRef.current.contentDocument;

         if (document) {
            // Save current scroll position before recreating
            if (document.documentElement) {
               scrollPositionRef.current = {
                  x:
                     document.documentElement.scrollLeft ||
                     document.body.scrollLeft,
                  y:
                     document.documentElement.scrollTop ||
                     document.body.scrollTop,
               };
            }

            // Resolve 'system' theme to actual theme based on system preference
            const resolvedTheme =
               previewTheme === 'system'
                  ? window.matchMedia('(prefers-color-scheme: dark)').matches
                     ? 'dark'
                     : 'light'
                  : previewTheme;

            // Extract all stylesheets from parent document
            const parentStylesheets = Array.from(window.document.styleSheets)
               .map((sheet) => {
                  try {
                     // Get the href or inline styles
                     if (sheet.href) {
                        return `<link rel="stylesheet" href="${sheet.href}" />`;
                     } else if (sheet.ownerNode) {
                        const node = sheet.ownerNode as HTMLStyleElement;

                        return `<style>${node.innerHTML}</style>`;
                     }
                  } catch (e) {
                     // Cross-origin stylesheets will throw errors, skip them
                     if (sheet.href) {
                        return `<link rel="stylesheet" href="${sheet.href}" />`;
                     }
                  }

                  return '';
               })
               .filter(Boolean)
               .join('\n');

            // Set up the HTML structure
            document.open();
            document.write(`
                  <!DOCTYPE html>
                  <html lang="en" class="${resolvedTheme}">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      ${parentStylesheets}
                    </head>
                    <body id="previewIframe" class="min-h-screen">
                    </body>
                  </html>
                `);
            document.close();

            // Defer state update to avoid synchronous setState in effect
            setTimeout(() => {
               const bodyElement = document.body;

               if (bodyElement) {
                  setMountNode(bodyElement);
                  // Mark iframe as ready after mountNode is set
                  setIsIframeReady(true);

                  // Restore scroll position after a short delay to ensure content is rendered
                  requestAnimationFrame(() => {
                     if (
                        document.documentElement &&
                        scrollPositionRef.current
                     ) {
                        document.documentElement.scrollTop =
                           scrollPositionRef.current.y;
                        document.documentElement.scrollLeft =
                           scrollPositionRef.current.x;
                     }
                  });
               }
            }, 100);
         }

         // // Adjust the iframe height based on content
         // const adjustIframeHeight = () => {
         //   if (contentRef && contentRef.contentWindow?.document.body) {
         //     const iframeHeight =
         //       contentRef.contentWindow.document.body.scrollHeight;
         //     contentRef.style.height = `${iframeHeight}px`;
         //   }
         // };

         // // Listen for content changes and adjust height
         // contentRef.onload = adjustIframeHeight;
         // contentRef.contentWindow.addEventListener("resize", adjustIframeHeight);

         // adjustIframeHeight(); // Initial height adjustment
      }
   }, [previewTheme, themeConfig]);

   return (
      <iframe
         ref={iframeRef}
         className={cn('h-full max-h-screen w-full', className)}
         {...props}
      >
         {mountNode && isIframeReady && createPortal(children, mountNode)}
      </iframe>
   );
};

export default IFrame;

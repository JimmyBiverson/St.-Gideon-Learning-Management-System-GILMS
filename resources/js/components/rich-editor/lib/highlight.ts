import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { createLowlight } from 'lowlight';
import type { JSX } from 'react';
import * as prod from 'react/jsx-runtime';

const lowlight = createLowlight();

export function highlight(code: string, lang: string) {
   try {
      const tree = lowlight.highlight(lang, code, { prefix: 'hljs-' });

      return toJsxRuntime(tree as any, {
         Fragment: prod.Fragment,
         jsx: prod.jsx,
         jsxs: prod.jsxs,
         components: {
            pre: ({ children }) => children as any,
         },
      }) as JSX.Element;
   } catch (error) {
      // Fallback for unsupported languages
      return code as any;
   }
}

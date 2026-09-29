import type { ComponentType } from 'react';

type PluginPageEntry = {
   component: string;
   file: string | null;
   css?: string[];
};

type PageModule = { default: ComponentType };

declare global {
   interface Window {
      __PLUGIN_PAGE_ENTRY__?: PluginPageEntry;
   }
}

export function loadPluginPageFromManifest(
   componentName: string,
): Promise<ComponentType> | null {
   if (typeof window === 'undefined') {
      return null;
   }

   const entry = window.__PLUGIN_PAGE_ENTRY__;

   if (!entry?.file || entry.component !== componentName) {
      return null;
   }

   entry.css?.forEach((href) => {
      if (document.querySelector(`link[data-plugin-page-css="${href}"]`)) {
         return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.pluginPageCss = href;
      document.head.appendChild(link);
   });

   return import(/* @vite-ignore */ entry.file).then(
      (module: PageModule) => module.default,
   );
}

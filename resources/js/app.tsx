import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import { loadPluginPageFromManifest } from '@/lib/plugin-page';

const appName = import.meta.env.VITE_APP_NAME;
type PageModule = { default: ComponentType };

const appPages = import.meta.glob<PageModule>('./pages/**/*.tsx');
const modulePages = import.meta.glob<PageModule>(
   '/Modules/*/resources/js/pages/**/*.tsx',
);

createInertiaApp({
   title: (title) => title,
   resolve: (name) => {
      const parts = name.split('/');
      const modulePage = `/Modules/${parts[0]}/resources/js/pages/${parts.slice(1).join('/')}.tsx`;

      if (modulePages[modulePage]) {
         return modulePages[modulePage]().then((module) => module.default);
      }

      const pluginPage = loadPluginPageFromManifest(name);

      if (pluginPage) {
         return pluginPage;
      }

      return resolvePageComponent(`./pages/${name}.tsx`, appPages).then(
         (module) => module.default,
      );
   },
   layout: (name) => {
      switch (true) {
         case name === 'welcome':
            return null;
         // case name.startsWith('auth/'):
         //     return AuthLayout;
         // case name.startsWith('dashboard/'):
         //     return AppLayout;
         // case name.startsWith('settings/'):
         //     return [AppLayout, SettingsLayout];
         default:
            return null;
      }
   },
   strictMode: true,
   withApp(app) {
      return <TooltipProvider delayDuration={0}>{app}</TooltipProvider>;
   },
   progress: {
      color: '#4B5563',
   },
});

// This will set light / dark mode on load...
initializeTheme();

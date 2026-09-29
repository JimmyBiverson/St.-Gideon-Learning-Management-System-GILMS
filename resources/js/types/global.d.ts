declare module '@inertiajs/core' {
   export interface InertiaConfig {
      sharedPageProps: {
         name: string;
         auth: Auth;
         sidebarOpen: boolean;
         [key: string]: unknown;
      };
   }
}

interface Window {
   fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown };
   _fbq?: unknown;
   gtag?: (...args: unknown[]) => void;
   dataLayer?: unknown[];
}

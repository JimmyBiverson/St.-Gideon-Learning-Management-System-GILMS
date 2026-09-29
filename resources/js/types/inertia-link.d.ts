import type {
   CacheForOption,
   LinkPrefetchOption,
   PageProps,
   RequestPayload,
   UrlMethodPair,
} from '@inertiajs/core';
import type { Method as WayfinderMethod, RouteDefinition } from '../wayfinder';

declare module '@inertiajs/core' {
   export interface LinkComponentBaseProps {
      href?:
         | string
         | UrlMethodPair
         | RouteDefinition<WayfinderMethod | WayfinderMethod[]>;
      data?: RequestPayload;
      prefetch?: boolean | LinkPrefetchOption | LinkPrefetchOption[];
      cacheFor?: CacheForOption | CacheForOption[];
      cacheTags?: string | string[];
      instant?: boolean;
      pageProps?:
         | Record<string, unknown>
         | ((
              currentProps: PageProps,
              sharedProps: Partial<PageProps>,
           ) => Record<string, unknown>)
         | null;
   }
}

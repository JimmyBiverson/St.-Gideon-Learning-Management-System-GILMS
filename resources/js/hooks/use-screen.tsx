import { useSyncExternalStore } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | 'default';

const breakpoints = [
   {
      size: 'sm' as const,
      mql:
         typeof window !== 'undefined'
            ? window.matchMedia('(max-width: 639px)')
            : undefined,
   },
   {
      size: 'md' as const,
      mql:
         typeof window !== 'undefined'
            ? window.matchMedia('(min-width: 640px) and (max-width: 767px)')
            : undefined,
   },
   {
      size: 'lg' as const,
      mql:
         typeof window !== 'undefined'
            ? window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
            : undefined,
   },
   {
      size: 'xl' as const,
      mql:
         typeof window !== 'undefined'
            ? window.matchMedia('(min-width: 1024px) and (max-width: 1279px)')
            : undefined,
   },
];

function getScreenWidth(): number {
   return typeof window !== 'undefined' ? window.innerWidth : 0;
}

function getScreenSize(): ScreenSize {
   if (typeof window === 'undefined') {
      return 'default';
   }

   const width = window.innerWidth;

   if (width < 640) {
      return 'sm';
   }

   if (width < 768) {
      return 'md';
   }

   if (width < 1024) {
      return 'lg';
   }

   if (width < 1280) {
      return 'xl';
   }

   return 'default';
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
   if (listeners.size === 0) {
      window.addEventListener('resize', notifyAll, { passive: true });
   }

   listeners.add(callback);

   return () => {
      listeners.delete(callback);

      if (listeners.size === 0) {
         window.removeEventListener('resize', notifyAll);
      }
   };
}

function notifyAll() {
   listeners.forEach((cb) => cb());
}

const useScreen = () => {
   const screen = useSyncExternalStore(subscribe, getScreenWidth, () => 0);
   const size = useSyncExternalStore(
      subscribe,
      getScreenSize,
      () => 'default' as ScreenSize,
   );

   return { size, screen };
};

export default useScreen;

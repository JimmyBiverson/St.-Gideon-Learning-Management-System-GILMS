import { useCallback, useEffect, useRef } from 'react';
import {
   cancelScheduledTimeout,
   scheduleTimeout,
} from '@/lib/scheduled-timeout';

/**
 * Schedule a one-shot callback after `delayMs` (default: next macrotask).
 * Clears pending callbacks on unmount and when superseded by a new schedule.
 */
export function useDeferredCallback(delayMs = 0): {
   runDeferred: (callback: () => void) => void;
   cancel: () => void;
} {
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   useEffect(() => {
      return () => {
         cancelScheduledTimeout(timerRef);
      };
   }, []);

   const cancel = useCallback(() => {
      cancelScheduledTimeout(timerRef);
   }, []);

   const runDeferred = useCallback(
      (callback: () => void) => {
         scheduleTimeout(timerRef, callback, delayMs);
      },
      [delayMs],
   );

   return { runDeferred, cancel };
}

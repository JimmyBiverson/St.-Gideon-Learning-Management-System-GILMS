type Timer = ReturnType<typeof setTimeout>;

export type ScheduledTimeoutRef = { current: Timer | null };

export function cancelScheduledTimeout(holder: ScheduledTimeoutRef): void {
   if (holder.current !== null) {
      clearTimeout(holder.current);
      holder.current = null;
   }
}

/**
 * Replace any pending timer on `holder`, then run `callback` after `delayMs`.
 * Typical use: defer work to the next macrotask so React state updates apply first.
 */
export function scheduleTimeout(
   holder: ScheduledTimeoutRef,
   callback: () => void,
   delayMs = 0,
): void {
   cancelScheduledTimeout(holder);
   holder.current = setTimeout(() => {
      holder.current = null;
      callback();
   }, delayMs);
}

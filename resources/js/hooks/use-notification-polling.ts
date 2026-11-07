import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
   createNotificationTracker,
   playNotificationSound,
   unlockNotificationAudio,
} from '@/lib/notification-sound';
import { feed } from '@/routes/notifications';

let trackedUser: number | string | null = null;
let track = createNotificationTracker();

export default function useNotificationPolling() {
   const { auth, notificationFeed, notificationPollInterval } =
      usePage<SharedData>().props;
   const userId = auth?.user?.id;
   const interval = Math.max(2000, notificationPollInterval || 2000);
   useEffect(() => {
      if (!userId) return;
      let timer: ReturnType<typeof setTimeout>;
      let active = true;
      let inFlight = false;
      let controller: AbortController;
      const poll = async () => {
         clearTimeout(timer);
         if (!active || inFlight || document.hidden) return;
         inFlight = true;
         controller = new AbortController();
         try {
            const response = await fetch(feed.url(), {
               signal: controller.signal,
               credentials: 'same-origin',
               cache: 'no-store',
               headers: { Accept: 'application/json' },
            });
            if (!response.ok) return;
            const data = await response.json();
            if (!active || !Array.isArray(data.notificationFeed)) return;
            router.replace({
               props: (current) =>
                  (current.auth as SharedData['auth'])?.user?.id === userId
                     ? {
                          ...current,
                          notificationFeed: data.notificationFeed,
                          unreadNotificationsCount:
                             data.unreadNotificationsCount,
                       }
                     : current,
               preserveState: true,
               preserveScroll: true,
            });
         } catch {
            // A temporary network failure is retried without interrupting the page.
         } finally {
            inFlight = false;
            if (active && !document.hidden) timer = setTimeout(poll, interval);
         }
      };
      const refresh = () => {
         clearTimeout(timer);
         if (!document.hidden) void poll();
      };
      document.addEventListener('visibilitychange', refresh);
      window.addEventListener('online', refresh);
      document.addEventListener('pointerdown', unlockNotificationAudio);
      document.addEventListener('keydown', unlockNotificationAudio);
      if (!document.hidden) timer = setTimeout(poll, interval);
      return () => {
         active = false;
         clearTimeout(timer);
         controller?.abort();
         document.removeEventListener('visibilitychange', refresh);
         window.removeEventListener('online', refresh);
         document.removeEventListener('pointerdown', unlockNotificationAudio);
         document.removeEventListener('keydown', unlockNotificationAudio);
      };
   }, [userId, interval]);
   useEffect(() => {
      if (trackedUser !== (userId ?? null)) {
         trackedUser = userId ?? null;
         track = createNotificationTracker();
      }
      if (!userId || !notificationFeed) return;
      const fresh = track(notificationFeed);
      if (fresh.length && !document.hidden) {
         toast.info(
            fresh.length === 1
               ? 'You have a new notification'
               : `You have ${fresh.length} new notifications`,
         );
         void playNotificationSound();
      }
   }, [userId, notificationFeed]);
}

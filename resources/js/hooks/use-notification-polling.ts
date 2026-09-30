import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type PollHandle = { start: () => void; stop: () => void };

const only = ['notifications', 'unreadNotificationsCount'];

// The bell can be mounted by more than one navbar on a page, and each mount
// would otherwise start its own poll, so the poll is only ever started once.
let poll: PollHandle | null = null;

// When the poll was last paused because the tab was hidden. `null` means it is
// running. Used to tell a quick tab switch apart from a genuinely stale bell.
let stoppedAt: number | null = null;

/**
 * Keeps the notification bell current without a page reload.
 *
 * A poll is used rather than a websocket so that no extra service, process or
 * configuration is needed to keep notifications live. Only the two
 * notification props are requested, so each tick is a small partial request
 * instead of a full page render.
 *
 * The poll is stopped entirely while the tab is hidden. A hidden tab is not
 * being looked at, so those requests produced nothing anyone could see, and
 * with every logged-in user polling they were the largest avoidable source of
 * request traffic as the user base grows.
 *
 * The poll is owned here rather than left to Inertia's built-in handling, which
 * still fires one request in ten while a tab is hidden and cannot catch the
 * bell up when the user comes back. On return, if at least one interval was
 * missed, the two props are refreshed immediately so a stale badge is never
 * left sitting there.
 *
 * The handle and the listener live at module scope on purpose: the bell
 * unmounts and remounts across Inertia navigations, and a poll that was torn
 * down with it would stop updating the bell.
 */
const useNotificationPolling = () => {
   const { auth, notificationPollInterval } = usePage<SharedData>().props;
   const interval = notificationPollInterval || 15000;

   useEffect(() => {
      // Logged out: stop polling rather than keep requesting as a guest, and
      // allow a later sign-in to start a fresh poll.
      if (!auth?.user) {
         if (poll) {
            poll.stop();
            poll = null;
            stoppedAt = null;
         }

         return;
      }

      if (poll) {
         return;
      }

      poll = router.poll(interval, { only }, { autoStart: false });

      const syncWithVisibility = () => {
         if (!poll) {
            return;
         }

         if (document.hidden) {
            poll.stop();
            stoppedAt = Date.now();

            return;
         }

         const hiddenFor = stoppedAt === null ? 0 : Date.now() - stoppedAt;
         stoppedAt = null;
         poll.start();

         if (hiddenFor >= interval) {
            router.reload({
               only,
               preserveState: true,
               preserveScroll: true,
               preserveErrors: true,
               showProgress: false,
            });
         }
      };

      document.addEventListener('visibilitychange', syncWithVisibility);

      // Mounted while the tab is already hidden: stay stopped, and let
      // `syncWithVisibility` start the poll when the tab is actually used.
      if (!document.hidden) {
         syncWithVisibility();
      }
   }, [auth?.user, interval]);
};

export default useNotificationPolling;

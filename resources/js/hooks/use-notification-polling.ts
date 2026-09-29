import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// The bell can be mounted by more than one navbar on a page, and each mount
// would otherwise start its own poll, so the poll is only ever started once.
let polling = false;

/**
 * Keeps the notification bell current without a page reload.
 *
 * A poll is used rather than a websocket so that no extra service, process or
 * configuration is needed to keep notifications live. Only the two
 * notification props are requested, so each tick is a small partial request
 * instead of a full page render.
 */
const useNotificationPolling = () => {
   const { auth, notificationPollInterval } = usePage<SharedData>().props;

   useEffect(() => {
      if (polling || !auth?.user) {
         return;
      }

      polling = true;

      router.poll(notificationPollInterval || 15000, {
         only: ['notifications', 'unreadNotificationsCount'],
      });
   }, [auth?.user, notificationPollInterval]);
};

export default useNotificationPolling;

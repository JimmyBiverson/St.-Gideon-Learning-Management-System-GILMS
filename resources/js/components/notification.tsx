import { Link, router, usePage } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Bell } from 'lucide-react';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import useNotificationPolling from '@/hooks/use-notification-polling';
import { cn } from '@/lib/utils';
import { index, readAll, show } from '@/routes/notifications';

import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const Notification = () => {
   const { notifications, unreadNotificationsCount, translate } =
      usePage<SharedData>().props;
   const { button, frontend, dashboard } = translate;

   useNotificationPolling();

   const items = notifications ?? [];
   const unreadCount = unreadNotificationsCount ?? items.length;

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               size="icon"
               variant="ghost"
               className="relative h-9 w-9 rounded-full p-0"
            >
               <Bell className="!h-5 !w-5" />
               {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                     {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-2">
               <h4 className="font-semibold">{dashboard.notifications}</h4>
               <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 text-xs"
                  onClick={() => router.put(readAll())}
               >
                  {button.mark_all_as_read}
               </Button>
            </div>

            <ScrollArea>
               <div className="flex max-h-[300px] flex-col gap-1 py-2">
                  {items.length > 0 ? (
                     items.map(({ id, data, created_at }) => {
                        const time = formatDistanceToNow(new Date(created_at), {
                           addSuffix: true,
                        });
                        const timeText =
                           time.slice(0, 1).toUpperCase() + time.slice(1);

                        return (
                           <Link
                              key={id}
                              href={show(id)}
                              className={cn(
                                 'flex flex-col gap-1 px-4 py-2 transition-colors hover:bg-accent/50',
                              )}
                           >
                              <p className="text-sm font-medium capitalize">
                                 {data.title}
                              </p>
                              <span
                                 className="text-xs text-muted-foreground"
                                 title={format(new Date(created_at), 'PPpp')}
                              >
                                 {timeText}
                              </span>
                           </Link>
                        );
                     })
                  ) : (
                     <p className="p-6 text-center text-sm text-muted-foreground">
                        {frontend.no_unread_notifications}
                     </p>
                  )}
               </div>
            </ScrollArea>

            <div className="border-t p-2">
               <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center"
                  size="sm"
               >
                  <Link href={index()}>{button.view_all_notifications}</Link>
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   );
};

export default Notification;

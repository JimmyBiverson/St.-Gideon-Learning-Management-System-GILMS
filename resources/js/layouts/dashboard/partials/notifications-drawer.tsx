import { Link, router, usePage } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import useNotificationPolling from '@/hooks/use-notification-polling';
import { cn } from '@/lib/utils';
import { index, readAll, show } from '@/routes/notifications';

export function NotificationsDrawer() {
   const { notifications, unreadNotificationsCount, translate, direction } =
      usePage<SharedData>().props;
   const { button, frontend, dashboard } = translate;
   const [open, setOpen] = useState(false);

   useNotificationPolling();

   const items = notifications ?? [];
   const unreadCount = unreadNotificationsCount ?? items.length;

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               size="icon"
               variant="ghost"
               className="relative h-10 w-10 rounded-full bg-transparent"
               title="Notifications"
            >
               <Bell className="!h-5 !w-5" />
               {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                     {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
               )}
               <span className="sr-only">Notifications</span>
            </Button>
         </SheetTrigger>

         <SheetContent
            className="flex w-80 flex-col p-0 sm:max-w-80"
            side={direction === 'rtl' ? 'left' : 'right'}
         >
            <SheetHeader className="flex-shrink-0 border-b px-5 py-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <SheetTitle className="text-base font-semibold">
                        {dashboard.notifications ?? 'Notifications'}
                     </SheetTitle>
                     {unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
                           {unreadCount}
                        </span>
                     )}
                  </div>
                  <div className="flex items-center gap-1">
                     {unreadCount > 0 && (
                        <Button
                           size="sm"
                           variant="ghost"
                           className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                           onClick={() => router.put(readAll())}
                           title="Mark all as read"
                        >
                           <CheckCheck className="h-3.5 w-3.5" />
                           <span className="hidden sm:inline">
                              {button.mark_all_as_read ?? 'Mark all read'}
                           </span>
                        </Button>
                     )}
                  </div>
               </div>
            </SheetHeader>

            {/* Notifications List */}
            <ScrollArea className="flex-1">
               <div className="flex flex-col divide-y">
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
                              onClick={() => setOpen(false)}
                              className={cn(
                                 'group flex gap-3 px-5 py-3.5 transition-colors hover:bg-muted/60',
                              )}
                           >
                              {/* Unread dot */}
                              <div className="mt-1.5 flex-shrink-0">
                                 <span className="block h-2 w-2 rounded-full bg-primary" />
                              </div>

                              <div className="min-w-0 flex-1">
                                 <p className="text-sm leading-snug font-medium capitalize">
                                    {data.title}
                                 </p>
                                 <span
                                    className="mt-0.5 text-xs text-muted-foreground"
                                    title={format(new Date(created_at), 'PPpp')}
                                 >
                                    {timeText}
                                 </span>
                              </div>
                           </Link>
                        );
                     })
                  ) : (
                     <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                           <Bell className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-medium">All caught up!</p>
                           <p className="text-xs text-muted-foreground">
                              {frontend.no_unread_notifications ??
                                 'No unread notifications'}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </ScrollArea>

            {/* Footer */}
            <div className="flex-shrink-0 border-t p-3">
               <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center gap-2 text-sm"
                  size="sm"
                  onClick={() => setOpen(false)}
               >
                  <Link href={index()}>
                     <ExternalLink className="h-3.5 w-3.5" />
                     {button.view_all_notifications ?? 'View all notifications'}
                  </Link>
               </Button>
            </div>
         </SheetContent>
      </Sheet>
   );
}

import { Link, usePage } from '@inertiajs/react';
import {
   Bell,
   BookOpen,
   ClipboardList,
   Home,
   Menu,
   Settings,
   UserRound,
   Users,
} from 'lucide-react';
import { useState } from 'react';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const icons = {
   home: Home,
   book: BookOpen,
   bell: Bell,
   users: Users,
   profile: UserRound,
   assessment: ClipboardList,
   settings: Settings,
};

export default function MobileBottomNavigation() {
   const { props, url } = usePage<SharedData>();
   const [open, setOpen] = useState(false);
   const navigation = props.mobileNavigation;
   if (!navigation?.items.length) return null;
   const path = url.split('?')[0];
   const unread = props.unreadNotificationsCount ?? 0;

   return (
      <nav
         aria-label="Mobile navigation"
         className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-xl md:hidden"
      >
         <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around gap-1">
            {navigation.items.map((item) => {
               const Icon = icons[item.icon as keyof typeof icons] ?? BookOpen;
               const active =
                  path === item.href ||
                  (item.href !== '/' &&
                     item.href !== '/dashboard' &&
                     path.startsWith(item.href + '/'));
               return (
                  <Link
                     key={item.href}
                     href={item.href}
                     aria-current={active ? 'page' : undefined}
                     className={cn(
                        'relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px]',
                        active
                           ? 'bg-primary/10 text-primary'
                           : 'text-muted-foreground hover:bg-muted',
                     )}
                  >
                     <Icon className="size-5" aria-hidden="true" />
                     <span className="max-w-full truncate">{item.label}</span>
                     {item.icon === 'bell' && unread > 0 && (
                        <span
                           className="absolute top-1 right-2 rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground"
                           aria-label={`${unread} unread notifications`}
                        >
                           {unread > 99 ? '99+' : unread}
                        </span>
                     )}
                  </Link>
               );
            })}
            <Sheet open={open} onOpenChange={setOpen}>
               <SheetTrigger className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground hover:bg-muted">
                  <Menu className="size-5" aria-hidden="true" />
                  More
               </SheetTrigger>
               <SheetContent
                  side="bottom"
                  className="max-h-[80svh] overflow-y-auto rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
               >
                  <SheetHeader>
                     <SheetTitle>More options</SheetTitle>
                     <SheetDescription>
                        Quick access to your workspace.
                     </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-2 px-4">
                     {navigation.more.map((item) => (
                        <Link
                           key={item.href}
                           href={item.href}
                           onClick={() => setOpen(false)}
                           className="rounded-xl border p-4 font-medium hover:bg-muted"
                        >
                           {item.label}
                        </Link>
                     ))}
                  </div>
               </SheetContent>
            </Sheet>
         </div>
      </nav>
   );
}

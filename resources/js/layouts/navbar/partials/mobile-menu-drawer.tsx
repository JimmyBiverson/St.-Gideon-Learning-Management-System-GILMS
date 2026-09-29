import { Link, router, usePage } from '@inertiajs/react';
import {
   Bell,
   Check,
   ChevronDown,
   GraduationCap,
   Heart,
   LayoutDashboard,
   LogOut,
   Monitor,
   Moon,
   SettingsIcon,
   Sun,
   UserCircle,
} from 'lucide-react';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
} from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { useAuth } from '@/hooks/use-auth';
import setGlobalColorTheme from '@/lib/theme-colors';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';
import change from '@/routes/change';
import login from '@/routes/login';
import { index as notificationsIndex } from '@/routes/notifications';
import register from '@/routes/register';
import student from '@/routes/student';

interface MobileMenuDrawerProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   language: boolean;
   customizable: boolean;
   customizeLink: string;
}

const menuItemClass =
   'bg-muted w-full text-left justify-start text-sm font-normal';

const MobileMenuDrawer = ({
   open,
   onOpenChange,
   language,
   customizable,
   customizeLink,
}: MobileMenuDrawerProps) => {
   const { props } = usePage<SharedData>();
   const { navbar, translate, system, direction, langs, locale } = props;
   const { isAdmin, isLoggedIn } = useAuth();
   const { appearance, updateAppearance } = useAppearance();
   const { button } = translate;

   const sortedItems = navbar.navbar_items.toSorted((a, b) => a.sort - b.sort);
   const navItems = sortedItems.filter((item) => item.type !== 'action');
   const actionItems = sortedItems.filter((item) => item.type === 'action');

   const close = () => onOpenChange(false);

   const appearanceHandler = (value: Appearance) => {
      updateAppearance(value);

      if (props.frontend) {
         setGlobalColorTheme(value, props.frontend.theme_color as ThemeColors);
      }
   };

   const directionHandler = () => {
      router.post(change.direction(), {
         direction: direction === 'ltr' ? 'rtl' : 'ltr',
      });
      close();
   };

   const langHandler = (lang: string) => {
      router.post(change.lang(), { locale: lang });
      close();
   };

   const renderNavItems = (item: NavbarItem) => {
      if (!item.active) {
         return null;
      }

      switch (item.type) {
         case 'url':
            return (
               <Link
                  key={item.id}
                  href={item.value || ''}
                  onClick={close}
                  className="py-1.5 text-sm font-normal"
               >
                  {item.title}
               </Link>
            );

         case 'dropdown':
            return (
               <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger className={menuItemClass}>
                     <span className="flex items-center justify-between">
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                     </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-20">
                     {item.items &&
                        Array.isArray(item.items) &&
                        item.items.map(
                           (
                              subItem: { url?: string; title: string },
                              idx: number,
                           ) => (
                              <DropdownMenuItem
                                 key={idx}
                                 asChild
                                 className="cursor-pointer px-5"
                              >
                                 <Link href={subItem.url || ''} onClick={close}>
                                    {subItem.title}
                                 </Link>
                              </DropdownMenuItem>
                           ),
                        )}
                  </DropdownMenuContent>
               </DropdownMenu>
            );

         default:
            return null;
      }
   };

   const renderActionItem = (item: NavbarItem) => {
      if (!item.active) {
         return null;
      }

      switch (item.slug) {
         case 'language':
            if (!system.fields.language_selector || !language) {
               return null;
            }

            return (
               <Fragment key={item.id}>
                  {system.fields.direction === 'none' && (
                     <Button
                        type="button"
                        variant="ghost"
                        className={menuItemClass}
                        onClick={directionHandler}
                     >
                        {direction === 'ltr' ? 'RTL' : 'LTR'}
                     </Button>
                  )}
                  {langs
                     .filter((lang) => lang.is_active)
                     .map((lang) => (
                        <Button
                           key={lang.id}
                           type="button"
                           variant="ghost"
                           className={menuItemClass}
                           onClick={() => langHandler(lang.code)}
                        >
                           {lang.name}
                           {lang.code === locale && (
                              <Check className="h-4 w-4" />
                           )}
                        </Button>
                     ))}
               </Fragment>
            );

         case 'notification':
            if (!isLoggedIn) {
               return null;
            }

            return (
               <Link key={item.id} href={notificationsIndex()} onClick={close}>
                  <Button
                     variant="ghost"
                     className={cn(
                        'flex flex-row items-center gap-2',
                        menuItemClass,
                     )}
                  >
                     <Bell className="h-4 w-4" />
                     {item.title}
                  </Button>
               </Link>
            );

         case 'profile': {
            if (!isLoggedIn) {
               return null;
            }

            const { user } = props.auth;

            return (
               <Fragment key={item.id}>
                  {(user.role === 'admin' || user.role === 'instructor') && (
                     <Button
                        type="button"
                        variant="ghost"
                        className={menuItemClass}
                        onClick={() => {
                           router.get(dashboard());
                           close();
                        }}
                     >
                        <LayoutDashboard className="h-4 w-4" />
                        {button.dashboard}
                     </Button>
                  )}
                  {(user.role === 'student' || user.role === 'instructor') && (
                     <>
                        <Button
                           type="button"
                           variant="ghost"
                           className={menuItemClass}
                           onClick={() => {
                              router.get(student.index({ tab: 'courses' }));
                              close();
                           }}
                        >
                           <GraduationCap className="h-4 w-4" />
                           {button.my_courses}
                        </Button>
                        <Button
                           type="button"
                           variant="ghost"
                           className={menuItemClass}
                           onClick={() => {
                              router.get(student.index({ tab: 'wishlist' }));
                              close();
                           }}
                        >
                           <Heart className="h-4 w-4" />
                           {button.wishlist}
                        </Button>
                        <Button
                           type="button"
                           variant="ghost"
                           className={menuItemClass}
                           onClick={() => {
                              router.get(student.index({ tab: 'profile' }));
                              close();
                           }}
                        >
                           <UserCircle className="h-4 w-4" />
                           {button.profile}
                        </Button>
                        <Button
                           type="button"
                           variant="ghost"
                           className={menuItemClass}
                           onClick={() => {
                              router.get(student.index({ tab: 'settings' }));
                              close();
                           }}
                        >
                           <SettingsIcon className="h-4 w-4" />
                           {button.settings}
                        </Button>
                     </>
                  )}
                  <Button
                     type="button"
                     variant="ghost"
                     className={menuItemClass}
                     onClick={() => {
                        router.post(logout());
                        close();
                     }}
                  >
                     <LogOut className="h-4 w-4" />
                     {button.logout}
                  </Button>
               </Fragment>
            );
         }

         case 'theme':
            return (
               <Fragment key={item.id}>
                  {(
                     [
                        { value: 'light' as const, label: 'Light', Icon: Sun },
                        { value: 'dark' as const, label: 'Dark', Icon: Moon },
                        {
                           value: 'system' as const,
                           label: 'System',
                           Icon: Monitor,
                        },
                     ] as const
                  ).map(({ value, label, Icon }) => (
                     <Button
                        key={value}
                        type="button"
                        variant="ghost"
                        className={cn(menuItemClass, 'justify-between')}
                        onClick={() => {
                           appearanceHandler(value);
                           close();
                        }}
                     >
                        <span className="flex items-center gap-2">
                           <Icon className="h-4 w-4" />
                           {label}
                        </span>

                        {appearance === value && <Check className="h-4 w-4" />}
                     </Button>
                  ))}

                  <Separator className="my-2" />
               </Fragment>
            );

         default:
            return null;
      }
   };

   return (
      <Sheet open={open} onOpenChange={onOpenChange}>
         <SheetContent
            side="right"
            className="flex w-[260px] flex-col gap-0 p-0 sm:max-w-sm"
         >
            <SheetHeader className="border-b px-6 py-4 text-left">
               <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-57px)] flex-1 px-6">
               <div className="flex flex-col gap-2 py-2">
                  {navItems.map((item) => (
                     <Fragment key={item.id}>{renderNavItems(item)}</Fragment>
                  ))}

                  <Separator className="my-2" />

                  {actionItems.map((item) => (
                     <Fragment key={item.id}>{renderActionItem(item)}</Fragment>
                  ))}

                  {customizable && isAdmin && (
                     <Link
                        href={customizeLink}
                        className={menuItemClass}
                        onClick={close}
                     >
                        {props.customize ? 'Back' : 'Customize'}
                     </Link>
                  )}

                  {!isLoggedIn && (
                     <div className="space-y-2 border-t border-border pt-4 pb-6">
                        <Button
                           asChild
                           variant="outline"
                           className="w-full rounded-sm shadow-none"
                        >
                           <Link href={register.index()} onClick={close}>
                              {translate.button.sign_up}
                           </Link>
                        </Button>
                        <Button
                           asChild
                           className="w-full rounded-sm shadow-none"
                        >
                           <Link href={login.index()} onClick={close}>
                              {translate.button.log_in}
                           </Link>
                        </Button>
                     </div>
                  )}
               </div>
            </ScrollArea>
         </SheetContent>
      </Sheet>
   );
};

export default MobileMenuDrawer;

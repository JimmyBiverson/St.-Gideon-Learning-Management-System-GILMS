import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import useScreen from '@/hooks/use-screen';
import { cn } from '@/lib/utils';
import Actions from './partials/actions';
import MobileMenuDrawer from './partials/mobile-menu-drawer';

interface NavbarProps {
   language?: boolean;
   heightCover?: boolean;
   customizable?: boolean;
}

const Navbar = ({
   language = false,
   heightCover = true,
   customizable = true,
}: NavbarProps) => {
   const { props } = usePage<SharedData>();
   const { navbar } = props;
   const { isAdmin } = useAuth();
   const [isSticky, setIsSticky] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { screen } = useScreen();

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;

         if (scrollPosition > 100) {
            setIsSticky(true);
         } else {
            setIsSticky(false);
         }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const renderNavItems = (item: NavbarItem) => {
      if (item.active) {
         switch (item.type) {
            case 'url':
               return (
                  <Link
                     key={item.id}
                     href={item.value || ''}
                     className="text-sm font-normal"
                  >
                     {item.title}
                  </Link>
               );

            case 'dropdown':
               return (
                  <DropdownMenu key={item.id}>
                     <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 text-sm">
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="start" className="min-w-20">
                        {item.items &&
                           Array.isArray(item.items) &&
                           item.items.map((subItem: any, idx: number) => (
                              <DropdownMenuItem
                                 key={idx}
                                 asChild
                                 className="cursor-pointer px-5"
                              >
                                 <Link href={subItem.url || ''}>
                                    {subItem.title}
                                 </Link>
                              </DropdownMenuItem>
                           ))}
                     </DropdownMenuContent>
                  </DropdownMenu>
               );

            default:
               return null;
         }
      }
   };

   const sortedItems = navbar.navbar_items.toSorted((a, b) => a.sort - b.sort);
   const customizeLink = props.customize ? '/' : '?customize=true';

   return (
      <>
         <div className="fixed top-0 z-30 w-full">
            <div
               className={cn(
                  'container mt-0 flex h-[72px] items-center justify-between gap-1 !px-4 transition-all duration-200 md:gap-6',
                  isSticky &&
                     'mx-auto mt-4 h-16 w-full rounded-2xl bg-background shadow-card md:!max-w-6xl',
                  screen < 768 && 'mt-0 h-[72px] rounded-none',
               )}
            >
               <Link href="/">
                  <AppLogo />
               </Link>

               <div className="hidden gap-4 md:flex md:items-center">
                  {sortedItems.map((item) => (
                     <Fragment key={item.id}>{renderNavItems(item)}</Fragment>
                  ))}
               </div>

               <div className="flex items-center gap-2">
                  {customizable && isAdmin && (
                     <Button
                        asChild
                        variant="outline"
                        className="hidden text-sm font-normal sm:block"
                     >
                        <Link href={customizeLink}>
                           {props.customize ? 'Back' : 'Customize'}
                        </Link>
                     </Button>
                  )}

                  <Actions language={language} />

                  <Button
                     size="icon"
                     variant="secondary"
                     className="md:hidden"
                     onClick={() => setIsMenuOpen(true)}
                     aria-label="Open menu"
                  >
                     <Menu className="h-6 w-6" />
                  </Button>
               </div>
            </div>
         </div>

         <MobileMenuDrawer
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            language={language}
            customizable={customizable}
            customizeLink={customizeLink}
         />

         {heightCover && (
            <div className="relative z-20 h-[72px] bg-transparent" />
         )}
      </>
   );
};

export default Navbar;

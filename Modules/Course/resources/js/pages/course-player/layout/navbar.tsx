import AppLogo from '@/components/app-logo';
import Appearance from '@/components/appearance';
import Notification from '@/components/notification';
import ProfileToggle from '@/components/profile-toggle';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import useScreen from '@/hooks/use-screen';
import { Link, usePage } from '@inertiajs/react';
import { Expand, LayoutList, Minimize } from 'lucide-react';

const Navbar = () => {
   const { screen } = useScreen();
   const { open, toggleSidebar } = useSidebar();
   const { props } = usePage<CoursePlayerProps>();

   return (
      <header className="sticky top-0 z-50 h-[60px] bg-background shadow-card">
         <div className="flex h-full items-center justify-between gap-3 px-4 md:px-8">
            <Link href="/">
               <AppLogo />
            </Link>

            <p className="hidden font-semibold sm:block">
               {props.course.title}
            </p>

            <div className="mr-0 flex items-center gap-2">
               <Appearance />

               <Notification />

               {screen > 768 && (
                  <Button
                     size="icon"
                     variant="secondary"
                     onClick={() => toggleSidebar()}
                     className="rounded-full border-secondary-100 text-secondary-foreground hover:text-secondary-foreground"
                  >
                     {open ? <Expand /> : <Minimize />}
                  </Button>
               )}

               <ProfileToggle />

               {screen < 768 && (
                  <Button
                     size="icon"
                     variant="secondary"
                     onClick={() => toggleSidebar()}
                     className="rounded-full border-secondary-100 text-secondary-foreground hover:text-secondary-foreground"
                  >
                     <LayoutList />
                  </Button>
               )}
            </div>
         </div>
      </header>
   );
};

export default Navbar;

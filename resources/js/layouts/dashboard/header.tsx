import { usePage } from '@inertiajs/react';
import Appearance from '@/components/appearance';
import Language from '@/components/language';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { NotificationsDrawer } from '@/layouts/dashboard/partials/notifications-drawer';
import { ProfileDrawer } from '@/layouts/dashboard/partials/profile-drawer';
import { SettingsDrawer } from '@/layouts/dashboard/partials/settings-drawer';

const DashboardHeader = () => {
   const { isAdmin } = useAuth();
   const { props } = usePage<SharedData>();
   const { system } = props;

   return (
      <header className="absolute top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 px-4 backdrop-blur-md md:px-6">
         <div className="flex w-full items-center justify-between gap-3">
            {/* Left: sidebar trigger + breadcrumbs */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
               <SidebarTrigger
                  variant="ghost"
                  className="-ml-1 h-10 w-10 flex-shrink-0 rounded-full bg-transparent text-xl [&>svg]:!h-5 [&>svg]:!w-5"
               />
            </div>

            {/* Right: action buttons */}
            <div className="flex flex-shrink-0 items-center gap-1.5">
               {system.fields.language_selector && <Language />}
               {!isAdmin && <Appearance buttonClass="h-10 w-10" />}
               <NotificationsDrawer />
               {isAdmin && <SettingsDrawer />}
               <ProfileDrawer />
            </div>
         </div>
      </header>
   );
};

export default DashboardHeader;

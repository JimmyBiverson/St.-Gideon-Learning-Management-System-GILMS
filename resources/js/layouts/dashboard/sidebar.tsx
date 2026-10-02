import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLogo from '@/components/app-logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';
import { NavMain } from '@/layouts/dashboard/partials/nav-main';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
   const { state, isMobile, setOpenMobile } = useSidebar();
   const { props, url } = usePage<SharedData>();
   const compact = state === 'collapsed';

   useEffect(() => {
      setOpenMobile(false);
   }, [setOpenMobile, url]);

   return (
      <Sidebar
         collapsible="icon"
         variant="inset"
         side={props.direction === 'rtl' ? 'right' : 'left'}
         className="z-50 border-r border-border bg-transparent p-0 shadow-none"
      >
         <ScrollArea className={cn('h-full', compact ? 'p-0' : 'p-2')}>
            {!compact && (
               <SidebarHeader>
                  <SidebarMenu>
                     <SidebarMenuItem className="py-3">
                        <Link
                           href="/"
                           onClick={() => {
                              if (isMobile) {
                                 setOpenMobile(false);
                              }
                           }}
                           className={`flex items-center gap-2 overflow-hidden ${compact ? 'justify-center' : ''}`}
                        >
                           <AppLogo className="h-[26px]" />
                        </Link>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarHeader>
            )}

            <SidebarContent>
               <NavMain />
            </SidebarContent>
         </ScrollArea>
      </Sidebar>
   );
};

export default DashboardSidebar;

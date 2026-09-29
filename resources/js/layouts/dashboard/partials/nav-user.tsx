import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';

export function NavUser() {
   const { auth, direction } = usePage<SharedData>().props;
   const { state } = useSidebar();
   const isMobile = useIsMobile();

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger className="w-full">
                  <SidebarMenuButton
                     size="lg"
                     className="group cursor-pointer text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                  >
                     <UserInfo user={auth.user} />
                     <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="end"
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={
                     isMobile
                        ? 'bottom'
                        : state === 'collapsed'
                          ? direction === 'rtl'
                             ? 'left'
                             : 'right'
                          : 'bottom'
                  }
               >
                  <UserMenuContent user={auth.user} />
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}

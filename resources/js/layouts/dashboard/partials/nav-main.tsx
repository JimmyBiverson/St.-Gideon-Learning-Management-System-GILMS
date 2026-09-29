import { usePage } from '@inertiajs/react';
import { GitCompareArrows } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';
import { getRouteSegments } from '@/lib/route';
import { cn } from '@/lib/utils';
import systemRoutes from '@/routes/system';
import NavMainItem from './nav-main-item';
import getDashboardRoutes from './routes';

export function NavMain() {
   const page = usePage<SharedData>();
   const { auth, system } = page.props;
   const { state } = useSidebar();
   const compact = state === 'collapsed';
   const segments = getRouteSegments(page.url);
   const accordionFromUrl = segments.length > 1 ? segments[1] : '';

   const [openAccordions, setOpenAccordions] = useState(() => accordionFromUrl);
   const [prevUrl, setPrevUrl] = useState(page.url);

   if (page.url !== prevUrl) {
      setPrevUrl(page.url);
      setOpenAccordions(accordionFromUrl);
   }

   const routes = useMemo(() => getDashboardRoutes(page.props), [page.props]);

   return (
      <SidebarGroup className="px-2 py-0">
         <Accordion
            type="single"
            collapsible
            value={openAccordions}
            onValueChange={setOpenAccordions}
         >
            {routes.map(({ title, pages }, key) => (
               <SidebarMenu key={key} className="space-y-1">
                  <SidebarGroupLabel>{title}</SidebarGroupLabel>

                  {pages.map((page) => {
                     const role = page.access.includes(
                        auth.user.role || 'admin',
                     );
                     const subType = page.access.includes(
                        system.sub_type || 'collaborative',
                     );

                     if (role && subType) {
                        return (
                           <SidebarMenuItem key={page.slug}>
                              <NavMainItem pageRoute={page} />
                           </SidebarMenuItem>
                        );
                     }
                  })}

                  {auth.user.role === 'admin' && (
                     <SidebarMenuItem>
                        {compact ? (
                           <a
                              target="_blank"
                              href={systemRoutes.maintenance.index.url()}
                              className={cn(
                                 'flex h-14 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-transparent p-1 transition-all',
                                 'text-muted-foreground hover:bg-muted hover:text-foreground',
                              )}
                           >
                              <GitCompareArrows className="h-5 w-5 shrink-0" />
                              <span className="block w-full truncate px-0.5 text-center text-[10px] leading-tight font-medium">
                                 Maintenance
                              </span>
                           </a>
                        ) : (
                           <SidebarMenuButton
                              asChild
                              className="h-10 gap-3 rounded-lg px-3"
                           >
                              <a
                                 target="_blank"
                                 href={systemRoutes.maintenance.index.url()}
                              >
                                 <GitCompareArrows className="h-4 w-4" />
                                 <span>Maintenance</span>
                              </a>
                           </SidebarMenuButton>
                        )}
                     </SidebarMenuItem>
                  )}
               </SidebarMenu>
            ))}
         </Accordion>
      </SidebarGroup>
   );
}

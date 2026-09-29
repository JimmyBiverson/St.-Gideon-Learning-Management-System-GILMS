import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { routeLastSegment, routeSecondSegment } from '@/lib/route';
import { cn } from '@/lib/utils';

interface NavMainItemProps {
   pageRoute: RoutePage;
}

const NavMainItem = (props: NavMainItemProps) => {
   const page = usePage<SharedData>();
   const { auth, direction, frontend } = page.props;
   const { state, isMobile, setOpenMobile } = useSidebar();

   const { pageRoute } = props;
   const { Icon, name, path, children, slug } = pageRoute;
   const compact = state === 'collapsed';

   // The sidebar lives in a persistent layout, so its mobile drawer survives
   // the visit these links trigger. Dismiss it on the way out, otherwise it
   // stays open on top of the page that was just navigated to.
   const closeMobileSidebar = () => {
      if (isMobile) {
         setOpenMobile(false);
      }
   };

   const activeAccordion = (slug: string) => {
      return routeSecondSegment(page.url) === slug;
   };

   const activeRoute = (slug: string) => {
      return routeLastSegment(page.url) === slug;
   };

   const activeChildRoute = (parentSlug: string, childSlug: string) => {
      return activeAccordion(parentSlug) && activeRoute(childSlug);
   };

   const visibleChildren = children.filter(({ slug: childSlug, access }) => {
      if (pageRoute.slug === 'settings' && childSlug === 'pages' && frontend) {
         return false;
      }

      return access.includes(auth.user.role);
   });

   if (compact) {
      const compactBase = cn(
         'flex h-14 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-transparent p-1 transition-all',
      );

      if (children.length > 0) {
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <button
                     type="button"
                     className={cn(
                        compactBase,
                        activeAccordion(slug)
                           ? 'bg-primary/10 font-semibold text-primary shadow-sm hover:bg-primary/15'
                           : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                     )}
                  >
                     <Icon className="h-5 w-5 shrink-0" />
                     <div className="flex w-full items-center justify-center gap-0.5 px-0.5">
                        <span className="truncate text-[10px] leading-tight font-medium">
                           {name}
                        </span>
                        <ChevronRight className="h-2.5 w-2.5 shrink-0 opacity-40" />
                     </div>
                  </button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  side={direction === 'rtl' ? 'left' : 'right'}
                  align="start"
                  className="min-w-44 rounded-lg border bg-popover p-1.5 shadow-lg"
                  sideOffset={8}
               >
                  <div className="mb-1 px-2 py-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                     {name}
                  </div>
                  {children.map(
                     (
                        { path, name: childName, slug: childSlug, access },
                        index: number,
                     ) => {
                        if (
                           pageRoute.slug === 'settings' &&
                           childSlug === 'pages' &&
                           frontend
                        ) {
                           return null;
                        }

                        if (access.includes(auth.user.role)) {
                           const active = activeChildRoute(
                              pageRoute.slug,
                              childSlug,
                           );

                           return (
                              <DropdownMenuItem
                                 asChild
                                 key={index}
                                 className={cn(
                                    'w-full cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
                                    active
                                       ? 'bg-secondary font-medium text-secondary-foreground hover:bg-secondary/90'
                                       : 'text-foreground hover:bg-muted',
                                 )}
                              >
                                  <Link href={path} onClick={closeMobileSidebar}>
                                     <span className="capitalize">
                                        {childName}
                                     </span>
                                  </Link>
                              </DropdownMenuItem>
                           );
                        }
                     },
                  )}
               </DropdownMenuContent>
            </DropdownMenu>
         );
      } else {
         return (
            <Link
               href={path}
               onClick={closeMobileSidebar}
               className={cn(
                  compactBase,
                  activeRoute(slug)
                     ? 'bg-primary/10 font-semibold text-primary shadow-sm hover:bg-primary/15'
                     : 'text-muted-foreground hover:bg-muted hover:text-foreground',
               )}
            >
               <Icon className="h-5 w-5 shrink-0" />
               <span className="block w-full truncate px-0.5 text-center text-[10px] leading-tight font-medium">
                  {name}
               </span>
            </Link>
         );
      }
   }

   // Expanded mode
   return children.length > 0 ? (
      <AccordionItem value={slug} className="border-0">
         <div
            className={cn(
               'h-10 overflow-hidden rounded-lg hover:bg-muted',
               activeAccordion(slug) &&
                  'bg-primary/10 text-primary hover:bg-primary/15',
            )}
         >
            <AccordionTrigger
               className={cn(
                  'h-10 cursor-pointer py-0 pr-2 font-normal hover:no-underline',
                  direction === 'rtl' && 'pr-0',
               )}
            >
               <SidebarMenuButton
                  asChild
                  className={cn(
                     'h-10 cursor-pointer gap-3 px-3 hover:bg-transparent active:bg-transparent',
                     activeAccordion(slug) &&
                        'hover:text-primary active:text-primary',
                  )}
               >
                  <span>
                     <Icon className="h-4 w-4" />
                     <span>{name}</span>
                  </span>
               </SidebarMenuButton>
            </AccordionTrigger>
         </div>

         <AccordionContent className="space-y-1 p-0 py-1">
            {visibleChildren.map(
               ({ path, name: childName, slug: childSlug }, index) => {
                  const isLast = index === visibleChildren.length - 1;

                  return (
                     <div className="relative w-full pl-7" key={childSlug}>
                        <span
                           className={cn(
                              'absolute top-0 left-4 border-l border-sidebar-border/60',
                              isLast ? 'h-1/2' : 'h-full',
                           )}
                        />
                        <span className="absolute top-1/2 left-4 w-3 -translate-y-px rounded-bl-lg border-b border-sidebar-border/60" />
                        <SidebarMenuButton
                           asChild
                           isActive={activeChildRoute(
                              pageRoute.slug,
                              childSlug,
                           )}
                           className="h-9 pl-3"
                        >
                            <Link href={path} onClick={closeMobileSidebar}>
                               <span className="text-sm font-normal capitalize">
                                  {childName}
                               </span>
                            </Link>
                        </SidebarMenuButton>
                     </div>
                  );
               },
            )}
         </AccordionContent>
      </AccordionItem>
   ) : (
      <SidebarMenuButton
         asChild
         isActive={activeRoute(slug)}
         className={cn(
            'h-10 gap-3 rounded-lg px-3',
            activeRoute(slug)
               ? 'data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:hover:bg-primary/15'
               : '',
         )}
      >
         <Link href={path} onClick={closeMobileSidebar}>
            <Icon className="h-4 w-4" />
            <span>{name}</span>
         </Link>
      </SidebarMenuButton>
   );
};

export default NavMainItem;

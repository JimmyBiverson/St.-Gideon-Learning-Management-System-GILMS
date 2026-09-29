import { router, usePage } from '@inertiajs/react';
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
} from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLang } from '@/hooks/use-lang';
import { namedRouteUrl } from '@/lib/named-route-url';
import { getQueryParams } from '@/lib/route';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
   className?: string;
   routeName: string;
   isColumnView?: boolean;
   paginationKey?: string;
   routeParams?: Record<string, string | number>;
   paginationInfo: Pagination<any>;
   inertiaOptions?: any;
}

const TableFooter = (props: Props) => {
   const page = usePage<SharedData>();
   const { table, common } = useLang();
   const {
      routeName,
      routeParams,
      className,
      paginationInfo,
      paginationKey,
      isColumnView,
      inertiaOptions,
   } = props;
   const {
      current_page,
      last_page,
      first_page_url,
      last_page_url,
      next_page_url,
      prev_page_url,
      from,
      to,
      total,
   } = paginationInfo;
   const urlParams = getQueryParams(page.url);
   const pageKey = paginationKey ? `${paginationKey}_page` : 'page';

   const dropdownList: { key: string; value: number }[] = [];

   if (last_page > 0) {
      for (let i = 1; i <= last_page; i++) {
         dropdownList.push({
            key: `${i}`,
            value: i,
         });
      }
   } else {
      dropdownList.push({
         key: '1',
         value: 1,
      });
   }

   const gotoPage = (pageNumber: number) => {
      router.get(
         namedRouteUrl(routeName, {
            ...(routeParams || {}),
            ...urlParams,
            [pageKey]: pageNumber,
         }),
         {},
         { ...(inertiaOptions || {}) },
      );
   };

   const gotoRoute = (path: string) => {
      const pathParams = getQueryParams(path);

      router.get(
         namedRouteUrl(routeName, {
            ...(routeParams || {}),
            ...urlParams,
            ...pathParams,
            [pageKey]: pathParams[pageKey],
         }),
         {},
         { ...(inertiaOptions || {}) },
      );
   };

   return (
      <div
         className={cn(
            'border-t border-border bg-card/50 p-4 sm:p-6',
            className,
         )}
      >
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Entry stats summary */}
            <div className="text-center text-sm text-muted-foreground sm:text-left">
               Showing{' '}
               <span className="font-semibold text-foreground">
                  {from || 0}
               </span>{' '}
               to{' '}
               <span className="font-semibold text-foreground">{to || 0}</span>{' '}
               of <span className="font-semibold text-foreground">{total}</span>{' '}
               entries
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2">
               {/* First Page */}
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        size="icon"
                        variant="outline"
                        disabled={!prev_page_url}
                        onClick={() => gotoRoute(first_page_url as string)}
                        className="h-8 w-8 transition-colors disabled:opacity-40"
                     >
                        <ChevronsLeft className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>{common.first}</TooltipContent>
               </Tooltip>

               {/* Previous Page */}
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        size="icon"
                        variant="outline"
                        disabled={!prev_page_url}
                        onClick={() => gotoRoute(prev_page_url as string)}
                        className="h-8 w-8 transition-colors disabled:opacity-40"
                     >
                        <ChevronLeft className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>{table.previous}</TooltipContent>
               </Tooltip>

               {/* Page Dropdown Selector */}
               <div className="mx-1 flex items-center gap-1.5 text-sm">
                  <span className="text-muted-foreground">{common.page}</span>
                  <DropdownMenu>
                     <Tooltip>
                        <DropdownMenuTrigger asChild>
                           <TooltipTrigger>
                              <Button
                                 variant="outline"
                                 className="h-8 min-w-[52px] px-2 font-medium transition-colors hover:bg-accent"
                              >
                                 {current_page}
                              </Button>
                           </TooltipTrigger>
                        </DropdownMenuTrigger>
                        <TooltipContent>Select Page</TooltipContent>
                     </Tooltip>
                     <DropdownMenuContent
                        align="center"
                        className="max-h-[200px] min-w-[65px] overflow-y-auto"
                     >
                        {dropdownList.map((item) => (
                           <DropdownMenuItem
                              key={item.key}
                              onClick={() => gotoPage(item.value)}
                              className={cn(
                                 'justify-center text-center font-medium transition-colors',
                                 current_page === item.value &&
                                    'bg-accent text-accent-foreground',
                              )}
                           >
                              {item.value}
                           </DropdownMenuItem>
                        ))}
                     </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-muted-foreground">
                     {common.of} {last_page}
                  </span>
               </div>

               {/* Next Page */}
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        size="icon"
                        variant="outline"
                        disabled={!next_page_url}
                        onClick={() => gotoRoute(next_page_url as string)}
                        className="h-8 w-8 transition-colors disabled:opacity-40"
                     >
                        <ChevronRight className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>{common.next}</TooltipContent>
               </Tooltip>

               {/* Last Page */}
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        size="icon"
                        variant="outline"
                        disabled={!next_page_url}
                        onClick={() => gotoRoute(last_page_url as string)}
                        className="h-8 w-8 transition-colors disabled:opacity-40"
                     >
                        <ChevronsRight className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>{common.last}</TooltipContent>
               </Tooltip>
            </div>
         </div>
      </div>
   );
};
export default TableFooter;

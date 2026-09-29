import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { namedRouteUrl } from '@/lib/named-route-url';
import { getQueryParams } from '@/lib/route';
import { router, usePage } from '@inertiajs/react';

interface Props {
   className: string;
   routeName: string;
   routeParams?: Record<string, string | number>;
   paginationInfo: Pagination<any>;
   paginationKey?: string;
}

const TableFooter = (props: Props) => {
   const { props: pageProps } = usePage<SharedData>();
   const { translate } = pageProps;
   const { frontend, common } = translate;
   const {
      current_page,
      last_page,
      first_page_url,
      last_page_url,
      next_page_url,
      prev_page_url,
   } = props.paginationInfo;
   const page = usePage<CoursesIndexProps>();
   const urlParams = getQueryParams(page.url);
   const pageKey = props.paginationKey ? `${props.paginationKey}_page` : 'page';

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
         namedRouteUrl(props.routeName, {
            ...(props.routeParams || {}),
            ...urlParams,
            [pageKey]: pageNumber,
         }),
      );
   };

   const gotoRoute = (path: string) => {
      const pathParams = getQueryParams(path);

      router.get(
         namedRouteUrl(props.routeName, {
            ...(props.routeParams || {}),
            ...urlParams,
            ...pathParams,
            [pageKey]: pathParams[pageKey],
         }),
      );
   };

   const menuItem = (e: number) => {
      return `text-center py-1 ${current_page === e && 'bg-primary-50'}`;
   };

   return (
      <div className={`${props.className}`}>
         <div className="mb-4 flex items-center justify-center md:hidden">
            <span className="mr-1">
               <strong>
                  {current_page} {common.of} {last_page}
               </strong>
            </span>
            <span className="mr-3">| {frontend.go_to_page_colon}</span>
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Button
                     variant="secondary"
                     className="h-8 w-[60px] rounded-md border border-gray-200 text-gray-700 hover:border-primary"
                  >
                     {current_page}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="min-w-[60px]">
                  <ScrollArea className="">
                     {dropdownList.map((item) => (
                        <DropdownMenuItem
                           key={item.key}
                           onClick={() => gotoPage(item.value)}
                           className={menuItem(item.value)}
                        >
                           {item.value}
                        </DropdownMenuItem>
                     ))}
                  </ScrollArea>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="flex items-center justify-center">
            <Button
               color="white"
               disabled={!prev_page_url}
               onClick={() => gotoRoute(first_page_url as string)}
               className="h-8 px-2 text-xs sm:px-3"
            >
               {'<<First'}
            </Button>

            <Button
               color="white"
               disabled={!prev_page_url}
               onClick={() => gotoRoute(prev_page_url as string)}
               className="mx-3 h-8 px-2 text-xs sm:px-3"
            >
               {frontend.prev}
            </Button>

            <div className="hidden items-center md:flex">
               <span className="mr-1">
                  {common.page}{' '}
                  <strong>
                     {current_page} {common.of} {last_page}
                  </strong>
               </span>
               <span className="mr-3">| {frontend.go_to_page_colon}</span>
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Button
                        variant="secondary"
                        className="h-8 w-[60px] rounded-md border border-gray-200 text-gray-700 hover:border-primary"
                     >
                        {current_page}
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[60px]">
                     <ScrollArea className="">
                        {dropdownList.map((item) => (
                           <DropdownMenuItem
                              key={item.key}
                              onClick={() => gotoPage(item.value)}
                              className={menuItem(item.value)}
                           >
                              {item.value}
                           </DropdownMenuItem>
                        ))}
                     </ScrollArea>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <Button
               color="white"
               disabled={!next_page_url}
               onClick={() => gotoRoute(next_page_url as string)}
               className="mx-3 h-8 px-2 text-xs sm:px-3"
            >
               {frontend.next}
            </Button>

            <Button
               color="white"
               disabled={!next_page_url}
               onClick={() => gotoRoute(last_page_url as string)}
               className="h-8 px-2 text-xs sm:px-3"
            >
               {'Last>>'}
            </Button>
         </div>
      </div>
   );
};

export default TableFooter;

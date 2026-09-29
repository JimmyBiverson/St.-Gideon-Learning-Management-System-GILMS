import { router, usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { namedRouteUrl } from '@/lib/named-route-url';
import { getQueryParams } from '@/lib/route';

interface Props {
   className?: string;
   pageSizeKey?: string;
   pageData: Pagination<any>;
   dropdownList: number[];
   routeName: string;
   routeParams?: Record<string, string | number>;
}

const TablePageSize = (props: Props) => {
   const page = usePage<SharedData>();
   const {
      pageData,
      dropdownList,
      className,
      routeName,
      routeParams,
      pageSizeKey,
   } = props;
   const urlParams = getQueryParams(page.url);
   const perPage = pageSizeKey ? `${pageSizeKey}_per_page` : 'per_page';
   const { per_page } = pageData;

   const gotoPage = (size: number) => {
      router.get(
         namedRouteUrl(routeName, {
            ...(routeParams || {}),
            ...urlParams,
            [perPage]: size,
         }),
         {},
         { preserveState: true, preserveScroll: true },
      );
   };

   return (
      <div className={`relative h-10 ${className}`}>
         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
         </span>

         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-[72px] justify-start !bg-transparent font-normal transition-[color,box-shadow] hover:border-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 data-[state=open]:border-zinc-900 data-[state=open]:ring-1 data-[state=open]:ring-zinc-900 dark:hover:border-zinc-50 dark:focus-visible:border-zinc-50 dark:focus-visible:ring-zinc-50 dark:data-[state=open]:border-zinc-50 dark:data-[state=open]:ring-zinc-50"
               >
                  {per_page}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[72px]">
               {dropdownList.map((item) => (
                  <DropdownMenuItem
                     key={item}
                     onClick={() => gotoPage(item)}
                     className={`text-center ${per_page === item && 'bg-muted'}`}
                  >
                     {item}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};

export default TablePageSize;

import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import SearchInput from '@/components/search-input';
import { useLang } from '@/hooks/use-lang';
import { namedRouteUrl } from '@/lib/named-route-url';
import { getQueryParams } from '@/lib/route';
import { cn } from '@/lib/utils';

import TableDataExport from './table-data-export';
import TablePageSize from './table-page-size';

interface Props {
   data: Pagination<any>;
   title: string;
   Icon?: ReactNode;
   component?: ReactNode;
   filterKey?: string;
   globalSearch: boolean;
   tablePageSizes: number[];
   routeName?: string;
   routeParams?: Record<string, string | number>;
   exportPath?: string;
   className?: string;
}

const TableFilter = (props: Props) => {
   const {
      Icon,
      data,
      title,
      component,
      filterKey,
      globalSearch,
      tablePageSizes,
      routeName,
      routeParams,
      exportPath,
      className,
   } = props;
   const { common } = useLang();
   const page = usePage<SharedData>();
   const urlParams = getQueryParams(page.url);
   const search = filterKey ? `${filterKey}_search` : 'search';

   const searchHandler = (query: string) => {
      if (!routeName) {
         return;
      }

      router.get(
         namedRouteUrl(routeName, {
            ...(routeParams || {}),
            ...urlParams,
            [search]: query,
         }),
         {},
         {
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
         },
      );
   };

   return (
      <div
         className={cn('items-center justify-between p-6 md:flex', className)}
      >
         <div className="flex items-center gap-5">
            {Icon && (
               <div className="bg-primary-25 flex h-10 w-10 items-center justify-center rounded-md">
                  {Icon}
               </div>
            )}
            {title && (
               <p className="mb-4 text-lg font-semibold md:mb-0">{title}</p>
            )}
         </div>
         <div className="flex items-center justify-end gap-3">
            {globalSearch && (
               <SearchInput
                  placeholder={common.search}
                  onChangeValue={searchHandler}
                  searchKey={search}
               />
            )}

            {routeName && (
               <TablePageSize
                  routeParams={routeParams}
                  routeName={routeName}
                  pageData={data}
                  dropdownList={tablePageSizes}
                  pageSizeKey={filterKey}
               />
            )}

            {exportPath && <TableDataExport route={exportPath} />}

            {component && component}
         </div>
      </div>
   );
};

export default TableFilter;

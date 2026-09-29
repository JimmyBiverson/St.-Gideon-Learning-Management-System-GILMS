import { usePage } from '@inertiajs/react';
import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import TableHeader from '@/components/table/table-header';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import TableColumn from './partials/instructors-table-columns';
import TableFilter from './partials/table-filter';
import TableFooter from './partials/table-footer';

interface InstructorProps {
   instructors: Pagination<Instructor>;
   selectedIds?: number[];
   onCourseSelect?: (id: number) => void;
}

const Instructors = ({
   instructors,
   selectedIds = [],
   onCourseSelect,
}: InstructorProps) => {
   const page = usePage<IntroPageProps>();
   const routeName = page.props.type === 'demo' ? 'home.demo' : 'home';
   const routeParams =
      page.props.type === 'demo' ? { slug: page.props.page.slug } : undefined;

   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: instructors.data,
      columns: TableColumn(page.props.translate),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <div>
         <TableFilter
            data={instructors}
            title="Instructors"
            globalSearch={true}
            searchKey="instructor"
            tablePageSizes={[10, 15, 20, 25]}
            routeName={routeName}
            routeParams={routeParams}
         />

         <Table className="border-y border-border">
            <TableHeader table={table} />

            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className={cn(
                           'cursor-pointer hover:bg-muted',
                           selectedIds?.includes(Number(row.original.id)) &&
                              'bg-secondary-100',
                        )}
                        onClick={() =>
                           onCourseSelect &&
                           onCourseSelect(Number(row.original.id))
                        }
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext(),
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell className="h-24 text-center">
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <TableFooter
            className="p-4"
            routeName={routeName}
            routeParams={routeParams}
            paginationInfo={instructors}
            paginationKey="instructor"
         />
      </div>
   );
};

export default Instructors;

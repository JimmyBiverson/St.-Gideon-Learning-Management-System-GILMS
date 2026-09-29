import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import TableColumn from './Partials/applications-table-columns';

interface Props extends SharedData {
   applications: Pagination<Instructor>;
}

const Applications = (props: Props) => {
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const { translate } = props;
   const { dashboard } = translate;

   const table = useReactTable({
      data: props.applications.data,
      columns: TableColumn(props.translate),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Instructor Applications"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Instructors', href: '/dashboard/instructors' },
               { title: 'Applications' },
            ]}
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.applications}
               title={dashboard.instructor_list}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="instructors.applications"
               filterKey="instructors"
            />

            <Table className="border-y border-border py-0">
               <TableHeader table={table} tableHeadClass="px-6" />

               <TableBody>
                  {table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id} className="px-6 py-3">
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext(),
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>

            {table.getRowModel().rows?.length <= 0 && (
               <p className="w-full border-b border-border px-6 py-10 text-center">
                  {dashboard.no_results_found}
               </p>
            )}

            <TableFooter
               className="p-4 sm:p-6"
               routeName="instructors.applications"
               paginationInfo={props.applications}
               paginationKey="instructors"
            />
         </Card>
      </>
   );
};

Applications.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Applications;

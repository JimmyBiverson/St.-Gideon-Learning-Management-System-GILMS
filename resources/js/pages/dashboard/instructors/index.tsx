import { Link } from '@inertiajs/react';
import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import * as React from 'react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/instructors';
import TableColumn from './Partials/instructors-table-columns';

interface Props extends SharedData {
   instructors: Pagination<Instructor>;
}

const Index = (props: Props) => {
   const { isAdmin } = useAuth();
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const { translate } = props;
   const { button, dashboard } = translate;

   const table = useReactTable({
      data: props.instructors.data,
      columns: TableColumn(isAdmin, props.translate),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Instructors"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Instructors' },
            ]}
            action={
               <Link href={create()}>
                  <Button>
                     <Plus />
                     Add Instructor
                  </Button>
               </Link>
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.instructors}
               title={dashboard.instructor_list}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="instructors.index"
               filterKey="instructors"
            />

            <Table className="border-y border-border">
               <TableHeader table={table} tableHeadClass="px-6" />

               <TableBody>
                  {table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id} className="px-6">
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
               routeName="instructors.index"
               paginationInfo={props.instructors}
               paginationKey="instructors"
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/exams';
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
import ExamTableColumn from './partials/exam-table-columns';

interface Props extends SharedData {
   exams: Pagination<Exam>;
}

const Index = (props: Props) => {
   const { translate } = props;
   const { button } = translate;
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: props.exams.data,
      columns: ExamTableColumn(),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Exams"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exams' },
            ]}
            action={
               <Button asChild className="h-9 px-4">
                  <Link href={create()}>
                     <Plus />
                     {button.create_exam}
                  </Link>
               </Button>
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.exams}
               title="Exam List"
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="exams.index"
               filterKey="exams"
            />

            <Table className="border-y border-border">
               <TableHeader table={table} />

               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && 'selected'}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="py-3">
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
                        <TableCell
                           colSpan={table.getAllColumns().length}
                           className="h-24 text-center"
                        >
                           No exams found.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-4 sm:p-6"
               routeName="exams.index"
               paginationInfo={props.exams}
               paginationKey="exams"
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/exams';
import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import ExamAttemptTableColumn from './partials/exam-attempt-table-columns';

const Attempts = ({ exam_id, attempts }: ExamAttemptsProps) => {
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: attempts.data,
      columns: ExamAttemptTableColumn(),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Attempts"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exams', href: index.url() },
               { title: 'Exam Attempts' },
            ]}
            className="mb-4"
         />

         <div className="space-y-6">
            {/* Exam Attempts Summary */}
            <div className="grid gap-4 md:grid-cols-4">
               <Card className="p-4">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">
                        Total Attempts
                     </p>
                     <p className="text-2xl font-bold">{attempts.total}</p>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">Completed</p>
                     <p className="text-2xl font-bold text-green-600">
                        {
                           attempts.data.filter((a) => a.status === 'completed')
                              .length
                        }
                     </p>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">
                        In Progress
                     </p>
                     <p className="text-2xl font-bold text-blue-600">
                        {
                           attempts.data.filter(
                              (a) => a.status === 'in_progress',
                           ).length
                        }
                     </p>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">Pass Rate</p>
                     <p className="text-2xl font-bold text-purple-600">
                        {attempts.data.length > 0
                           ? (
                                (attempts.data.filter(
                                   (a) =>
                                      a.is_passed && a.status === 'completed',
                                ).length /
                                   attempts.data.filter(
                                      (a) => a.status === 'completed',
                                   ).length) *
                                   100 || 0
                             ).toFixed(1)
                           : 0}
                        %
                     </p>
                  </div>
               </Card>
            </div>

            {/* Attempts Table */}
            <Card>
               <TableFilter
                  data={attempts}
                  title="Exam Attempts"
                  globalSearch={true}
                  tablePageSizes={[10, 15, 20, 25]}
                  routeName="exam-attempts.index"
                  routeParams={{ exam_id }}
                  filterKey="exam_attempts"
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
                           <TableCell
                              colSpan={table.getAllColumns().length}
                              className="h-24 text-center"
                           >
                              No exam attempts found.
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>

               <TableFooter
                  className="p-4 sm:p-6"
                  routeName="exam-attempts.index"
                  paginationInfo={attempts}
                  routeParams={{ exam_id }}
                  paginationKey="exam_attempts"
               />
            </Card>
         </div>
      </>
   );
};

Attempts.layout = (page: React.ReactNode) => (
   <DashboardLayout children={page} />
);

export default Attempts;

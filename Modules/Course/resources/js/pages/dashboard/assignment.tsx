import Breadcrumbs from '@/components/breadcrumbs';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index as coursesIndex } from '@/routes/courses';
import { usePage } from '@inertiajs/react';
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
import AssignmentTableColumn from './partials/assignment-table-column';
import AssignmentForm from './partials/forms/assignment-form';

const AssignmentPage = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { course, translate, tab } = props;
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: course.assignments || [],
      columns: AssignmentTableColumn(
         (tab as string) || 'assignment',
         translate,
         course.enrollments_count || 0,
      ),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Course Assignments"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Courses', href: coursesIndex.url() },
               { title: 'Assignments' },
            ]}
            action={
               <AssignmentForm
                  title={'Add Assignment'}
                  handler={
                     <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Assignment</span>
                     </Button>
                  }
               />
            }
            className="mb-4"
         />

         <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-6">
               <h2 className="text-xl font-bold">Assignment List</h2>
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
               <Table className="min-w-3xl border-y border-border">
                  <TableHeader table={table} />

                  <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
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
                        ))
                     ) : (
                        <TableRow>
                           <TableCell className="h-24 text-center">
                              {translate.frontend.no_results}
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </div>
         </Card>
      </>
   );
};

AssignmentPage.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default AssignmentPage;

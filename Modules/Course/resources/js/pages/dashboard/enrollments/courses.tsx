import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
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
import AdminTableColumn from './partials/admin-table-columns';
import EnrollmentModal from './partials/enrollment-modal';
import InstructorTableColumn from './partials/instructor-table-columns';

interface Props extends SharedData {
   enrollments: Pagination<CourseEnrollment>;
}

const Courses = (props: Props) => {
   const { isAdmin } = useAuth();
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const { translate, enrollments } = props;
   const { dashboard } = translate;

   const table = useReactTable({
      data: enrollments.data,
      columns: isAdmin
         ? AdminTableColumn('course', translate, 'enrollments.destroy')
         : InstructorTableColumn('course', translate),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Enrollments"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Course Enrollments' },
            ]}
            action={
               <EnrollmentModal
                  type="course"
                  title="Add New Course Enrollment"
                  handler={
                     <Button>
                        <Plus />
                        Add Enrollment
                     </Button>
                  }
               />
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={enrollments}
               title={dashboard.course_list}
               globalSearch={true}
               filterKey="course_enrollments"
               tablePageSizes={[10, 15, 20, 25]}
               routeName="course-enrollments.index"
            />

            <Table className="border-y border-border">
               <TableHeader table={table} />

               <TableBody>
                  {enrollments.data && enrollments.data.length > 0 ? (
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
                        <TableCell className="h-24 text-center">
                           {dashboard.no_results}
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-4 sm:p-6"
               routeName="course-enrollments.index"
               paginationInfo={enrollments}
               paginationKey="course_enrollments"
            />
         </Card>
      </>
   );
};

Courses.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Courses;

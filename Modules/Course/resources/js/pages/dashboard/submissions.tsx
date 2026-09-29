import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/course-assignments';
import { index as coursesIndex } from '@/routes/courses';
import { Link, usePage } from '@inertiajs/react';
import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { ArrowLeft } from 'lucide-react';
import * as React from 'react';
import type { ReactNode } from 'react';
import SubmissionsTableColumn from './partials/submissions-table-column';

const SubmissionsPage = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { course, translate, submissions, assignment } = props;
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: submissions?.data || [],
      columns: SubmissionsTableColumn(translate),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Assignment Submissions"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Courses', href: coursesIndex.url() },
               { title: 'Assignments', href: index.url(course.id) },
               { title: 'Submissions' },
            ]}
            className="mb-4"
         />

         <Card>
            <div className="relative flex items-center justify-between gap-3 p-6">
               <TableFilter
                  data={submissions}
                  title="Assignment Submissions"
                  globalSearch={true}
                  tablePageSizes={[10, 15, 20, 25]}
                  routeName="course-assignments.submissions"
                  routeParams={{
                     course_id: course.id,
                     assignment_id: assignment || '',
                  }}
                  className="w-full p-0"
                  filterKey="assignment_submissions"
               />

               <Button
                  asChild
                  className="absolute top-0 right-0 flex h-8 items-center gap-2 md:relative md:top-auto md:h-9"
               >
                  <Link href={`/dashboard/courses/${course.id}/assignments`}>
                     <ArrowLeft className="h-4 w-4" />
                     <span>Back</span>
                  </Link>
               </Button>
            </div>

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

            <TableFooter
               className="border-none pt-0"
               paginationInfo={submissions}
               routeName="course-assignments.submissions"
               routeParams={{
                  course_id: course.id,
                  assignment_id: assignment || '',
               }}
               paginationKey="assignment_submissions"
            />
         </Card>
      </>
   );
};

SubmissionsPage.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default SubmissionsPage;

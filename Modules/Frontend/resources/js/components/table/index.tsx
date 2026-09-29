import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import BlogsTableColumns from './blogs-table-columns';
import CategoriesTableColumns from './categories-table-columns';
import CourseTableColumns from './courses-table-columns';
import InstructorTableColumns from './instructors-table-columns';

type TableData =
   | Course
   | Exam
   | Blog
   | Instructor
   | CourseCategory
   | ExamCategory
   | BlogCategory;

interface CoursesProps {
   type:
      | 'courses'
      | 'exams'
      | 'blogs'
      | 'instructors'
      | 'course_categories'
      | 'exam_categories'
      | 'blog_categories';
   title: string;
   data: Pagination<TableData>;
   selectedIds?: number[];
   onCourseSelect?: (id: number) => void;
}

const DataTable = ({
   type,
   title,
   data,
   selectedIds = [],
   onCourseSelect,
}: CoursesProps) => {
   const routeName = 'frontend.api';

   const tableColumns = (): ColumnDef<TableData, any>[] => {
      switch (type) {
         case 'courses':
            return CourseTableColumns() as ColumnDef<TableData, any>[];

         case 'instructors':
            return InstructorTableColumns() as ColumnDef<TableData, any>[];

         case 'blogs':
            return BlogsTableColumns() as ColumnDef<TableData, any>[];

         default:
            return CategoriesTableColumns() as ColumnDef<TableData, any>[];
      }
   };

   const [sorting, setSorting] = React.useState<SortingState>([]);
   // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table returns unstable function references by design
   const table = useReactTable({
      data: data.data,
      columns: tableColumns(),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <div>
         <TableFilter
            data={data}
            title={title}
            filterKey={type}
            globalSearch={true}
            tablePageSizes={[10, 15, 20, 25]}
            routeName={routeName}
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
            paginationInfo={data}
            paginationKey={type}
            isColumnView={true}
            inertiaOptions={{
               preserveState: true,
               preserveScroll: true,
               showProgress: false,
            }}
         />
      </div>
   );
};

export default DataTable;

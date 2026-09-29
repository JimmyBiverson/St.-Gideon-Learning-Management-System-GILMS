import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/courses';
import { Link, usePage } from '@inertiajs/react';
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
import TableColumn from './partials/table-columns';

interface Props extends SharedData {
   courses: Pagination<Course>;
}

const Index = (props: Props) => {
   const { props: pageProps } = usePage<SharedData>();
   const { isAdmin } = useAuth();
   const { system } = pageProps;
   const { translate } = props;
   const { button, dashboard, frontend } = translate;
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const columns = React.useMemo(
      () => TableColumn({ isAdmin, system, translate }),
      [isAdmin, system, translate],
   );

   const table = useReactTable({
      data: props.courses.data,
      columns,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Courses"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Courses' },
            ]}
            action={
               <Button asChild className="h-9 px-4">
                  <Link href={create()}>
                     <Plus />
                     {button.create_course}
                  </Link>
               </Button>
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.courses}
               title={dashboard.course_list}
               globalSearch={true}
               filterKey="courses"
               tablePageSizes={[10, 15, 20, 25]}
               routeName="courses.index"
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
                        <TableCell className="h-24 text-center">
                           {frontend.no_results}
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-0 py-5 sm:p-7"
               routeName="courses.index"
               paginationInfo={props.courses}
               paginationKey="courses"
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

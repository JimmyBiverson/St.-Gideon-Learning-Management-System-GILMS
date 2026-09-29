import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/blogs';
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

interface BlogsPageProps extends SharedData {
   blogs: Pagination<Blog>;
   statuses: Record<string, string>;
   statistics: {
      total: number;
      published: number;
      draft: number;
      archived: number;
      popular: number;
   };
}

const BlogsIndex = () => {
   const { props } = usePage<BlogsPageProps>();
   const { blogs, translate } = props;
   const { dashboard, frontend } = translate;

   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: blogs.data,
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
            title={dashboard.blog}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: dashboard.blog },
            ]}
            action={
               <Button asChild>
                  <Link href={create()}>
                     <Plus className="mr-2 h-4 w-4" />
                     {dashboard.add_new_blog}
                  </Link>
               </Button>
            }
            className="mb-4"
         />

         <div className="space-y-6">
            {/* Blogs Table */}
            <Card>
               <TableFilter
                  data={blogs}
                  title={dashboard.blog}
                  globalSearch={true}
                  tablePageSizes={[10, 15, 20, 25]}
                  routeName="blogs.index"
                  filterKey="blogs"
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
                              {frontend.no_results}
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>

               <TableFooter
                  className="p-4 sm:p-6"
                  routeName="blogs.index"
                  paginationInfo={blogs}
                  paginationKey="blogs"
               />
            </Card>
         </div>
      </>
   );
};

BlogsIndex.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default BlogsIndex;

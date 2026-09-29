import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { create } from '@/routes/products';
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

const Index = (props: ProductDashboardIndexProps) => {
   const { props: pageProps } = usePage<SharedData>();
   const { isAdmin } = useAuth();
   const { system } = pageProps;
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const columns = React.useMemo(
      () => TableColumn({ isAdmin, system }),
      [isAdmin, system],
   );

   const table = useReactTable({
      data: props.products.data,
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
            title="Products"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Products' },
            ]}
            action={
               <Button asChild className="h-9 px-4">
                  <Link href={create()}>
                     <Plus />
                     Create Product
                  </Link>
               </Button>
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.products}
               title="Products"
               globalSearch={true}
               filterKey="products"
               tablePageSizes={[10, 15, 20, 25]}
               routeName="products.index"
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
                           No products found
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-0 py-5 sm:p-7"
               routeName="products.index"
               paginationInfo={props.products}
               paginationKey="products"
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

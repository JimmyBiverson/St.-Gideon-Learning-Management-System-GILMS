import type { SortingState } from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';

import TableColumn from './Partials/table-columns';

interface Props extends SharedData {
   users: Pagination<User>;
}

const Index = (props: Props) => {
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: props.users.data,
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
            title="Users"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Users' },
            ]}
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={props.users}
               title="User List"
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="users.index"
               filterKey="users"
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

            <TableFooter
               className="border-none p-5 sm:p-6"
               routeName="users.index"
               paginationInfo={props.users}
               paginationKey="users"
            />
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

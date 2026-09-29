import Breadcrumbs from '@/components/breadcrumbs';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
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
import CouponForm from './coupon-form';
import CouponTableColumns from './coupon-table-columns';

interface Props {
   exams: Exam[];
   coupons: Pagination<ExamCoupon>;
}

const CouponsIndex = ({ coupons, exams }: Props) => {
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: coupons.data,
      columns: CouponTableColumns({ exams }),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <>
         <Breadcrumbs
            title="Coupons"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exam Coupons' },
            ]}
            action={
               <CouponForm
                  title="Create Coupon"
                  exams={exams}
                  handler={
                     <Button>
                        <Plus className="h-4 w-4" />
                        Add Coupon
                     </Button>
                  }
               />
            }
            className="mb-4"
         />

         <Card>
            <TableFilter
               data={coupons}
               title="Coupon List"
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="exam-coupons.index"
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
                           No coupons found.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-4 sm:p-6"
               routeName="exam-coupons.index"
               paginationInfo={coupons}
            />
         </Card>
      </>
   );
};

CouponsIndex.layout = (page: React.ReactNode) => (
   <DashboardLayout>{page}</DashboardLayout>
);

export default CouponsIndex;

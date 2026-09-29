import Breadcrumbs from '@/components/breadcrumbs';
import TableFooter from '@/components/table/table-footer';
import { Card } from '@/components/ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { systemCurrency } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import type { ReactNode } from 'react';

interface Props {
   orders: Pagination<ProductOrder>;
}

const SalesIndex = ({ orders }: Props) => {
   const { props } = usePage<SharedData>();
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <>
         <Breadcrumbs
            title="Sales"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Product Sales' },
            ]}
            className="mb-4"
         />

         <Card>
            <Table className="border-y border-border">
               <TableHeader>
                  <TableRow>
                     <TableHead className="pl-4">Customer</TableHead>
                     <TableHead>Product</TableHead>
                     <TableHead className="text-center">Subtotal</TableHead>
                     <TableHead className="text-center">Discount</TableHead>
                     <TableHead className="text-center">Tax</TableHead>
                     <TableHead className="text-center">Total</TableHead>
                     <TableHead className="pr-4 text-end">Date</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {orders.data.length > 0 ? (
                     orders.data.map((order) => (
                        <TableRow key={order.id}>
                           <TableCell className="pl-4">
                              <p className="font-medium">{order.user?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                 {order.user?.email}
                              </p>
                           </TableCell>
                           <TableCell>
                              <Link
                                 href={`/products/details/${order.product?.slug}/${order.product_id}`}
                              >
                                 {order.product?.title}
                              </Link>
                           </TableCell>
                           <TableCell className="text-center">
                              {amount(Number(order.subtotal))}
                           </TableCell>
                           <TableCell className="text-center">
                              {amount(Number(order.discount))}
                           </TableCell>
                           <TableCell className="text-center">
                              {amount(Number(order.tax))}
                           </TableCell>
                           <TableCell className="text-center font-semibold">
                              {amount(Number(order.total))}
                           </TableCell>
                           <TableCell className="pr-4 text-end">
                              {format(
                                 new Date(order.created_at),
                                 'MMM d, yyyy',
                              )}
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                           No sales yet
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-0 py-5 sm:p-7"
               routeName="product-orders.sales"
               paginationInfo={orders}
            />
         </Card>
      </>
   );
};

SalesIndex.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SalesIndex;

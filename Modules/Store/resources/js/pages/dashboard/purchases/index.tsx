import Breadcrumbs from '@/components/breadcrumbs';
import TableFooter from '@/components/table/table-footer';
import { Button } from '@/components/ui/button';
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
import { details } from '@/routes/products';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
   orders: Pagination<ProductOrder>;
}

const PurchasesIndex = ({ orders }: Props) => {
   const { props } = usePage<SharedData>();
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <>
         <Breadcrumbs
            title="My Purchases"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'My Purchases' },
            ]}
            className="mb-4"
         />

         <Card>
            <Table className="border-y border-border">
               <TableHeader>
                  <TableRow>
                     <TableHead className="pl-4">Product</TableHead>
                     <TableHead>Seller</TableHead>
                     <TableHead className="text-center">Total</TableHead>
                     <TableHead className="text-center">Date</TableHead>
                     <TableHead className="pr-4 text-end">Actions</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {orders.data.length > 0 ? (
                     orders.data.map((order) => (
                        <TableRow key={order.id}>
                           <TableCell className="pl-4">
                              <div className="flex items-center gap-3">
                                 <img
                                    src={
                                       order.product?.thumbnail ||
                                       '/assets/images/blank-image.jpg'
                                    }
                                    alt={order.product?.title}
                                    className="h-10 w-10 rounded-md object-cover"
                                 />
                                 <Link
                                    href={
                                       order.product
                                          ? details({
                                               slug: order.product.slug,
                                               id: order.product_id,
                                            })
                                          : '#'
                                    }
                                    className="font-medium"
                                 >
                                    {order.product?.title}
                                 </Link>
                              </div>
                           </TableCell>
                           <TableCell>{order.instructor?.user?.name}</TableCell>
                           <TableCell className="text-center font-semibold">
                              {amount(Number(order.total))}
                           </TableCell>
                           <TableCell className="text-center">
                              {format(
                                 new Date(order.created_at),
                                 'MMM d, yyyy',
                              )}
                           </TableCell>
                           <TableCell className="pr-4 text-end">
                              <Button asChild size="sm" variant="outline">
                                 <Link
                                    href={
                                       order.product
                                          ? details({
                                               slug: order.product.slug,
                                               id: order.product_id,
                                            })
                                          : '#'
                                    }
                                 >
                                    <Download className="mr-1.5 h-3.5 w-3.5" />
                                    Downloads
                                 </Link>
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                           You have not purchased any products yet
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            <TableFooter
               className="p-0 py-5 sm:p-7"
               routeName="product-orders.purchases"
               paginationInfo={orders}
            />
         </Card>
      </>
   );
};

PurchasesIndex.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default PurchasesIndex;

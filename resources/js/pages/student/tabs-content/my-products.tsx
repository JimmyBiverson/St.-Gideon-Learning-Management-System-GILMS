import { Link, usePage } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MyProducts = () => {
   const { props } = usePage<StudentDashboardProps>();
   const { productOrders, system } = props;

   return productOrders && productOrders.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {productOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden p-0">
               <img
                  src={
                     order.product?.thumbnail ||
                     '/assets/images/blank-image.jpg'
                  }
                  alt={order.product?.title}
                  className="h-40 w-full object-cover"
               />
               <div className="space-y-2 p-4">
                  <p className="font-semibold">{order.product?.title}</p>
                  <p className="text-sm text-muted-foreground">
                     by {order.instructor?.user?.name}
                  </p>

                  <Button asChild className="w-full">
                     <Link
                        href={
                           order.product
                              ? `/products/details/${order.product.slug}/${order.product_id}`
                              : '#'
                        }
                     >
                        <Download className="mr-2 h-4 w-4" />
                        View & Download
                     </Link>
                  </Button>
               </div>
            </Card>
         ))}
      </div>
   ) : (
      <Card className="flex items-center justify-center p-6">
         <p>You have not purchased any products yet.</p>
      </Card>
   );
};

export default MyProducts;

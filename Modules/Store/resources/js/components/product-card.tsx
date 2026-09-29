import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { cn, systemCurrency } from '@/lib/utils';
import { details } from '@/routes/products';
import { Link, usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';
import ProductWishlistHandler from './wishlist-handler';

interface Props {
   product: Product;
   className?: string;
   wishlists?: ProductWishlist[];
}

const ProductCard = ({ product, className, wishlists }: Props) => {
   const { props } = usePage<SharedData>();
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card className={cn('group p-0', className)}>
         <CardHeader className="p-0">
            <div className="relative">
               <div className="p-2 pb-0">
                  <Link href={details({ slug: product.slug, id: product.id })}>
                     <div className="relative h-[190px] overflow-hidden rounded-lg">
                        <img
                           src={
                              product.thumbnail ||
                              '/assets/images/blank-image.jpg'
                           }
                           alt={product.title}
                           className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                           onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/images/blank-image.jpg';
                           }}
                        />
                     </div>
                  </Link>
               </div>

               <ProductWishlistHandler
                  product={product}
                  wishlists={wishlists}
                  className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100"
               />
            </div>
         </CardHeader>

         <CardContent className="p-4">
            <div className="mb-1 flex items-center gap-2 text-xs text-secondary-foreground">
               <div className="flex items-center gap-1">
                  {product.instructor?.user?.photo ? (
                     <img
                        src={product.instructor.user.photo}
                        alt={product.instructor.user.name}
                        className="h-4 w-4 rounded-full object-cover"
                     />
                  ) : null}
                  <span>{product.instructor?.user?.name}</span>
               </div>
               {product.product_category && (
                  <>
                     <span>in</span>
                     <span>{product.product_category.title}</span>
                  </>
               )}
            </div>

            <Link href={details({ slug: product.slug, id: product.id })}>
               <p className="mb-2 font-semibold hover:text-secondary-foreground">
                  {product.title}
               </p>

               <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>
                     {product.average_rating
                        ? Number(product.average_rating).toFixed(2)
                        : '0.00'}
                  </span>
                  <span>({product.reviews_count || 0})</span>
               </p>
            </Link>
         </CardContent>

         <CardFooter className="flex w-full items-center justify-between p-4 pt-0">
            <p className="capitalize">
               {product.pricing_type === 'free' ? (
                  <span className="font-semibold">Free</span>
               ) : product.discount ? (
                  <>
                     <span className="font-semibold">
                        {amount(product.discount_price as number)}
                     </span>
                     <span className="ml-2 text-sm font-medium text-muted-foreground line-through">
                        {amount(product.price as number)}
                     </span>
                  </>
               ) : (
                  <span className="font-semibold">
                     {amount(product.price as number)}
                  </span>
               )}
            </p>

            <Button
               asChild
               variant="outline"
               className="border-secondary-100 px-2.5 hover:border-primary hover:bg-background"
            >
               <Link href={details({ slug: product.slug, id: product.id })}>
                  View
               </Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default ProductCard;

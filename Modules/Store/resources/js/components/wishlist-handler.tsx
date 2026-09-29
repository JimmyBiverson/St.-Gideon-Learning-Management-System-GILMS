import { router, usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import productWishlists from '@/routes/product-wishlists';

interface Props {
   product: Product;
   wishlists?: ProductWishlist[];
   className?: string;
}

const ProductWishlistHandler = ({ product, wishlists, className }: Props) => {
   const { auth, errors } = usePage<SharedData>().props;
   const { user } = auth;

   const isWishlisted = wishlists?.find(
      (wishlist) => wishlist.product_id === product.id,
   );

   const handleWishlist = () => {
      if (isWishlisted) {
         router.delete(productWishlists.destroy(isWishlisted.id), {
            showProgress: false,
            preserveScroll: true,
         });
      } else {
         router.post(
            productWishlists.store(),
            {
               user_id: user?.id,
               product_id: product.id,
            },
            {
               showProgress: false,
               preserveScroll: true,
            },
         );
      }
   };

   useEffect(() => {
      if (errors.product_id) {
         toast.error(errors.product_id);
      }
   }, [errors]);

   return (
      <TooltipProvider delayDuration={0}>
         <Tooltip>
            <TooltipTrigger className={className}>
               <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80 hover:bg-white"
                  onClick={handleWishlist}
               >
                  <Heart
                     className={cn('h-4 w-4', isWishlisted && 'text-red-500')}
                  />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p>
                  {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
               </p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default ProductWishlistHandler;

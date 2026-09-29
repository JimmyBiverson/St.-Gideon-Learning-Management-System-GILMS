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
import courseWishlists from '@/routes/course-wishlists';
import examWishlists from '@/routes/exam-wishlists';

interface WishlistHandlerProps {
   type: 'exam' | 'course';
   content: Exam | Course;
   wishlists?: ExamWishlist[] | CourseWishlist[];
   className?: string;
}

const WishlistHandler = ({
   type,
   wishlists,
   content,
   className,
}: WishlistHandlerProps) => {
   const { auth, translate, errors } = usePage<SharedData>().props;
   const { user } = auth;
   const { frontend } = translate;

   const isWishlisted =
      type === 'course'
         ? (wishlists as CourseWishlist[])?.find(
              (wishlist) => wishlist.course_id === content.id,
           )
         : (wishlists as ExamWishlist[])?.find(
              (wishlist) => wishlist.exam_id === content.id,
           );

   const handleWishlist = () => {
      if (isWishlisted) {
         const destroyUrl =
            type === 'course'
               ? courseWishlists.destroy(isWishlisted.id)
               : examWishlists.destroy(isWishlisted.id);

         router.delete(destroyUrl, {
            showProgress: false,
            preserveScroll: true,
         });
      } else {
         const storeUrl =
            type === 'course' ? courseWishlists.store() : examWishlists.store();

         router.post(
            storeUrl,
            {
               user_id: user?.id,
               [type + '_id']: content.id,
            },
            {
               showProgress: false,
               preserveScroll: true,
            },
         );
      }
   };

   useEffect(() => {
      if (errors.course_id) {
         toast.error(errors.course_id);
      }

      if (errors.exam_id) {
         toast.error(errors.exam_id);
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
                  {' '}
                  {isWishlisted
                     ? frontend.remove_from_wishlist
                     : frontend.add_to_wishlist}
               </p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default WishlistHandler;

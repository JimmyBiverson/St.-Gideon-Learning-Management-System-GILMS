import { Link, usePage } from '@inertiajs/react';
import { Clock, Heart, ShoppingCart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import RatingDisplay from '@/exam/pages/components/rating-display';
import { cn, systemCurrency } from '@/lib/utils';
import exams from '@/routes/exams';
import WishlistHandler from '../wishlist-handler';

interface Props {
   exam: Exam;
   variant?: 'default' | 'compact';
   viewType?: 'grid' | 'list';
   onAddToCart?: (exam: Exam) => void;
   onAddToWishlist?: (exam: Exam) => void;
   className?: string;
   wishlists?: ExamWishlist[];
}

const ExamCard1 = ({
   exam,
   variant = 'default',
   viewType = 'grid',
   onAddToCart,
   onAddToWishlist,
   className,
   wishlists,
}: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { common } = translate;

   const isCompact = variant === 'compact';
   const examUrl = exams.details({ slug: exam.slug, id: exam.id });
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card
         className={cn(
            'group relative pb-0',
            className,
            viewType === 'list' && 'flex flex-row',
         )}
      >
         <Link href={examUrl} className={cn(viewType === 'list' && 'w-1/3')}>
            <div
               className={cn(
                  'relative overflow-hidden',
                  viewType === 'grid' ? 'aspect-video' : 'h-full min-h-[200px]',
               )}
            >
               {exam.thumbnail ? (
                  <img
                     src={exam.thumbnail}
                     alt={exam.title}
                     className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
               ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                     <span className="text-4xl font-bold text-primary/30">
                        {exam.title.charAt(0)}
                     </span>
                  </div>
               )}
               {exam.level && (
                  <Badge className="absolute top-2 left-2 capitalize">
                     {exam.level}
                  </Badge>
               )}
            </div>
         </Link>

         <WishlistHandler
            type="exam"
            content={exam}
            wishlists={wishlists}
            className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100"
         />

         <div className={cn('flex flex-col', viewType === 'list' && 'flex-1')}>
            <CardContent className="p-4">
               <Link href={examUrl}>
                  <h3 className="group-hover: mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                     {exam.title}
                  </h3>
               </Link>

               {!isCompact && exam.short_description && (
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                     {exam.short_description}
                  </p>
               )}

               <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <span>by</span>
                  <span className="font-medium">
                     {exam.instructor?.user?.name || 'Instructor'}
                  </span>
               </div>

               <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                     <Clock className="h-4 w-4" />
                     <span>
                        {exam.duration_hours}h {exam.duration_minutes}m
                     </span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Users className="h-4 w-4" />
                     <span>{exam.enrollments_count || 0} students</span>
                  </div>
               </div>

               {exam.average_rating !== undefined && (
                  <RatingDisplay
                     rating={exam.average_rating}
                     reviewCount={exam.reviews_count}
                     size="sm"
                     className="mb-3"
                  />
               )}
            </CardContent>

            <CardFooter
               className={cn(
                  'flex items-center justify-between border-t p-4',
                  viewType === 'list' && 'mt-auto',
               )}
            >
               <div className="flex items-baseline gap-2">
                  {exam.pricing_type === 'free' ? (
                     <span className="font-semibold">{common.free}</span>
                  ) : exam.discount ? (
                     <>
                        <span className="font-semibold">
                           {amount(exam.discount_price as number)}
                        </span>
                        <span className="ml-2 text-sm font-medium text-muted-foreground line-through">
                           {amount(exam.price)}
                        </span>
                     </>
                  ) : (
                     <>
                        <span className="font-semibold">
                           {amount(exam.price)}
                        </span>
                     </>
                  )}
               </div>

               <div className="flex items-center gap-2">
                  {onAddToWishlist && (
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                           e.preventDefault();
                           onAddToWishlist(exam);
                        }}
                     >
                        <Heart className="h-4 w-4" />
                     </Button>
                  )}
                  {onAddToCart && exam.pricing_type === 'paid' && (
                     <Button
                        variant="default"
                        size="icon"
                        onClick={(e) => {
                           e.preventDefault();
                           onAddToCart(exam);
                        }}
                     >
                        <ShoppingCart className="h-4 w-4" />
                     </Button>
                  )}
               </div>
            </CardFooter>
         </div>
      </Card>
   );
};

export default ExamCard1;

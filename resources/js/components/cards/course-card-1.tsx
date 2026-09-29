import { Link, usePage } from '@inertiajs/react';
import { Clock, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { cn, secondsToDuration, systemCurrency } from '@/lib/utils';
import { details } from '@/routes/course';
import WishlistHandler from '../wishlist-handler';

interface Props {
   course: Course;
   viewType?: 'grid' | 'list';
   className?: string;
   wishlists?: CourseWishlist[];
}

const CourseCard1 = ({
   course,
   viewType = 'grid',
   className,
   wishlists,
}: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { button, frontend, common } = translate;
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card
         className={cn(
            'group p-0',
            viewType === 'list' &&
               'sm:flex sm:w-full sm:flex-row sm:justify-between',
            className,
         )}
      >
         <CardHeader className="p-0">
            <div className="relative">
               <div className={cn('p-2 pb-0', viewType === 'list' && 'pb-2')}>
                  <Link
                     href={details({
                        slug: course.slug,
                        id: course.id,
                     })}
                  >
                     <div
                        className={cn(
                           'relative h-[190px] overflow-hidden rounded-lg',
                           viewType === 'list' && 'sm:w-[260px]',
                        )}
                     >
                        <img
                           src={
                              course.thumbnail ||
                              '/assets/images/blank-image.jpg'
                           }
                           alt={course.title}
                           className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                           onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/images/blank-image.jpg';
                           }}
                        />
                     </div>
                  </Link>
               </div>

               <WishlistHandler
                  type="course"
                  content={course}
                  wishlists={wishlists}
                  className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100"
               />
            </div>
         </CardHeader>

         <div
            className={cn(
               viewType === 'list' &&
                  'flex w-[calc(100%-272px)] flex-col justify-between',
            )}
         >
            <CardContent className={cn('p-4', viewType === 'list' && 'h-full')}>
               <div className="mb-1 flex items-center gap-1.5 text-xs text-secondary-foreground">
                  <Users className="h-3 w-3" />
                  <span>
                     {course.enrollments_count || 0}{' '}
                     {course.enrollments_count || 0 > 0
                        ? ` ${common.students}`
                        : ` ${frontend.student}`}
                  </span>

                  <Clock className="ml-2 h-3 w-3" />
                  <span>
                     {secondsToDuration(course.lessons_duration ?? null)}
                  </span>
               </div>

               <Link
                  className={cn(
                     'space-y-3',
                     viewType === 'list' &&
                        'sm:flex sm:h-full sm:flex-col sm:justify-between sm:py-4',
                  )}
                  href={details({
                     slug: course.slug,
                     id: course.id,
                  })}
               >
                  <p className="font-semibold hover:text-secondary-foreground">
                     {course.title}
                  </p>

                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                     <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                     <span>
                        {course.average_rating
                           ? Number(course.average_rating).toFixed(2)
                           : '0.00'}
                     </span>
                     <span>
                        ({course.reviews_count || 0} {common.reviews})
                     </span>
                  </p>
               </Link>
            </CardContent>

            <CardFooter className="flex w-full items-center justify-between p-4 pt-0">
               <p className="capitalize">
                  {course.pricing_type === 'free' ? (
                     <span className="font-semibold">{common.free}</span>
                  ) : course.discount ? (
                     <>
                        <span className="font-semibold">
                           {amount(course.discount_price as number)}
                        </span>
                        <span className="ml-2 text-sm font-medium text-muted-foreground line-through">
                           {amount(course.price)}
                        </span>
                     </>
                  ) : (
                     <>
                        <span className="font-semibold">
                           {amount(course.price)}
                        </span>
                     </>
                  )}
               </p>

               <Button
                  asChild
                  variant="outline"
                  className="border-secondary-100 px-2.5 hover:border-primary hover:bg-background"
               >
                  <Link
                     href={details({
                        slug: course.slug,
                        id: course.id,
                     })}
                  >
                     {button.learn_more}
                  </Link>
               </Button>
            </CardFooter>
         </div>
      </Card>
   );
};

export default CourseCard1;

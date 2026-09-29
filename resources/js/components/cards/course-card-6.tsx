import { Link, usePage } from '@inertiajs/react';
import { Clock, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { cn, getCourseDuration, systemCurrency } from '@/lib/utils';
import { details } from '@/routes/course';
import WishlistHandler from '../wishlist-handler';

interface Props {
   course: Course;
   type?: 'grid' | 'list';
   className?: string;
   wishlists?: CourseWishlist[];
}

const CourseCard6 = ({
   course,
   type = 'grid',
   className,
   wishlists,
}: Props) => {
   const { props } = usePage<SharedData>();
   const { button, common, frontend } = props.translate;
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card className={cn('flex w-full items-center', className)}>
         <CardHeader className="p-0">
            <div className="relative">
               <div className="p-2 pb-0">
                  <Link
                     href={details({
                        slug: course.slug,
                        id: course.id,
                     })}
                  >
                     <div
                        className={cn(
                           'relative h-[190px] overflow-hidden rounded-lg',
                           type === 'grid' && 'w-full max-w-[240px]',
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
                  className="absolute top-2 right-2 z-10"
               />
            </div>
         </CardHeader>

         <CardContent className="p-4">
            <div className="mb-1 flex items-center gap-1.5 text-xs text-secondary-foreground">
               <Users className="h-3 w-3" />
               <span>
                  {course.enrollments_count || 0}{' '}
                  {course.enrollments_count || 0 > 0
                     ? common.students
                     : frontend.student}
               </span>

               <Clock className="ml-2 h-3 w-3" />
               <span>{getCourseDuration(course, 'readable')}</span>
            </div>

            <Link
               className="space-y-3"
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
                  <span>{course.average_rating || 0}</span>
                  <span>
                     ({course.reviews_count || 0} {common.reviews})
                  </span>
               </p>
            </Link>
         </CardContent>

         <CardFooter className="flex items-center justify-between p-4 pt-0">
            <p className="capitalize">
               {course.pricing_type === 'free' ? (
                  course.pricing_type
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
      </Card>
   );
};

export default CourseCard6;

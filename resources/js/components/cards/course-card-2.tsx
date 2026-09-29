import { Link, usePage } from '@inertiajs/react';
import { Clock, Star, TrendingUp, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
   className?: string;
   wishlists?: CourseWishlist[];
}

const CourseCard2 = ({ course, className, wishlists }: Props) => {
   const { props } = usePage<SharedData>();
   const { common, frontend } = props.translate;
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card className={cn(className)}>
         <CardHeader className="p-0">
            <div className="relative">
               <Link
                  href={details({
                     slug: course.slug,
                     id: course.id,
                  })}
               >
                  <div className="relative h-[300px] w-full overflow-hidden rounded-t-lg">
                     <img
                        src={
                           course.thumbnail || '/assets/images/blank-image.jpg'
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

               <WishlistHandler
                  type="course"
                  content={course}
                  wishlists={wishlists}
                  className="absolute top-2 right-2 z-10"
               />
            </div>
         </CardHeader>

         <div className="p-4">
            <CardContent className="p-0 pb-5">
               <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs text-secondary-foreground uppercase">
                     {course.course_category.title}
                  </p>

                  <div className="flex items-center gap-2">
                     {course.discount ? (
                        <p className="pt-1 text-gray-300 line-through">
                           {amount(course.discount_price as number)}
                        </p>
                     ) : (
                        ''
                     )}

                     {course.pricing_type === 'free' ? (
                        <p className="text-lg font-semibold">{common.free}</p>
                     ) : (
                        <p className="text-lg font-semibold">
                           {amount(course.price)}
                        </p>
                     )}
                  </div>
               </div>

               <Link
                  href={details({
                     slug: course.slug,
                     id: course.id,
                  })}
               >
                  <p className="text-lg font-semibold hover:text-secondary-foreground">
                     {course.title}
                  </p>
               </Link>

               <div className="flex items-center gap-8 py-5">
                  <p className="flex items-center gap-1.5">
                     <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                     <span className="font-medium">
                        {course.average_rating || 0}
                     </span>
                     <span className="text-sm text-muted-foreground">
                        ({course.reviews_count || 0} {common.reviews})
                     </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                     <Users className="h-3.5 w-3.5" />
                     <span className="font-medium">
                        {course.enrollments_count || 0}
                     </span>
                     <span className="text-sm text-muted-foreground">
                        {course.enrollments_count || 0 > 0
                           ? common.students
                           : frontend.student}
                     </span>
                  </p>
               </div>

               <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                     <AvatarImage
                        src={course.instructor.user.photo || ''}
                        alt={course.instructor.user.name}
                        className="object-cover"
                     />
                     <AvatarFallback>IM</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">
                     {course.instructor.user.name}
                  </p>
               </div>
            </CardContent>

            <CardFooter className="flex items-center gap-5 border-t border-muted p-0 pt-5">
               <p className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                     {getCourseDuration(course, 'readable')}
                  </span>
               </p>

               <p className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{course.level}</span>
               </p>
            </CardFooter>
         </div>
      </Card>
   );
};

export default CourseCard2;

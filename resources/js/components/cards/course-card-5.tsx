import { Link, usePage } from '@inertiajs/react';
import { Clock, Star, TrendingUp, Users } from 'lucide-react';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { cn, getCourseDuration, systemCurrency } from '@/lib/utils';
import { details } from '@/routes/course';
import { Separator } from '../ui/separator';

interface Props {
   course: Course;
   className?: string;
}

const CourseCard5 = ({ course, className }: Props) => {
   const { props } = usePage<SharedData>();
   const { common, frontend } = props.translate;
   const { amount } = systemCurrency(props.system.fields['selling_currency']);

   return (
      <Card
         className={cn('flex flex-col items-center p-0 md:flex-row', className)}
      >
         <CardHeader className="w-full p-0 md:w-auto">
            <Link
               href={details({
                  slug: course.slug,
                  id: course.id,
               })}
               className="relative h-[260px] w-full overflow-hidden rounded-t-lg md:w-[250px] md:rounded-t-none md:rounded-l-lg"
            >
               <img
                  src={course.thumbnail || '/assets/images/blank-image.jpg'}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.src = '/assets/images/blank-image.jpg';
                  }}
               />
            </Link>
         </CardHeader>

         <div className="flex w-full flex-col justify-between p-5">
            <CardContent className="p-0">
               <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs text-secondary-foreground uppercase">
                     {course.course_category.title}
                  </p>

                  <p className="text-lg capitalize">
                     {course.pricing_type === 'free' ? (
                        <span className="font-semibold">{common.free}</span>
                     ) : course.discount ? (
                        <>
                           <span className="mr-2 text-base font-medium text-muted-foreground line-through">
                              {amount(course.price)}
                           </span>

                           <span className="font-semibold">
                              {amount(course.discount_price as number)}
                           </span>
                        </>
                     ) : (
                        <span className="font-semibold">
                           {amount(course.price)}
                        </span>
                     )}
                  </p>
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
            </CardContent>

            <Separator className="bg-muted" />

            <CardFooter className="flex items-center gap-5 p-0 pt-6">
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

export default CourseCard5;

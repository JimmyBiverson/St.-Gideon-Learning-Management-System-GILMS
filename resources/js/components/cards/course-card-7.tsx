import { Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import courseRoutes from '@/routes/course';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface Props {
   course: Course;
   watch_history: WatchHistory;
   completion: CourseCompletion;
   className?: string;
}

const CourseCard7 = ({
   course,
   watch_history,
   completion,
   className,
}: Props) => {
   const { props } = usePage();
   const { translate } = props as any;
   const { frontend, button } = translate;

   return (
      <Card
         className={cn(
            'flex flex-col justify-between overflow-hidden !border p-0 md:flex-row',
            className,
         )}
      >
         <CardHeader className="h-[200px] w-full max-w-[360px] p-0">
            <img
               src={course.thumbnail || '/assets/images/blank-image.jpg'}
               alt={course.title}
               className="h-full w-full object-cover"
               onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/images/blank-image.jpg';
               }}
            />
         </CardHeader>

         <CardContent className="flex w-full flex-col justify-between p-4">
            <div>
               <div className="mb-3 flex items-center gap-2">
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
               </div>
               <p className="text-sm font-semibold hover:text-secondary-foreground">
                  {course.title}
               </p>
            </div>

            <div className="space-y-2">
               <div className="w-full space-y-2 pt-4 pb-2">
                  <p className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                     <span>{frontend.progress}</span>
                     <span>{completion?.completion ?? 0}%</span>
                  </p>

                  <Progress
                     value={Number(completion?.completion ?? 0)}
                     className="h-1.5"
                  />
               </div>

               {watch_history && (
                  <Button asChild className="h-9 w-full">
                     <Link
                        href={courseRoutes.play.start({
                           type: watch_history.current_watching_type,
                           watch_history: watch_history.id as number,
                           lesson_id: watch_history.current_watching_id,
                        })}
                     >
                        {button.continue}
                     </Link>
                  </Button>
               )}
            </div>
         </CardContent>
      </Card>
   );
};

export default CourseCard7;

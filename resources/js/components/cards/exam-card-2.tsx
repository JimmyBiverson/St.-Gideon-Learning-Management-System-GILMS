import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import studentExam from '@/routes/student/exam';

interface Props {
   enrollment: ExamEnrollment;
   className?: string;
}

const ExamCard2 = ({ enrollment, className }: Props) => {
   const { exam } = enrollment;
   const examUrl = studentExam.show({ id: exam.id, tab: 'attempts' });

   return (
      <Card className={cn('group', className)}>
         <Link href={examUrl}>
            <div className={cn('relative overflow-hidden', 'aspect-video')}>
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

         <div className={cn('flex flex-col')}>
            <CardContent className="p-4">
               <Link href={examUrl}>
                  <h3 className="group-hover: mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                     {exam.title}
                  </h3>
               </Link>

               {exam.short_description && (
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
            </CardContent>
         </div>
      </Card>
   );
};

export default ExamCard2;

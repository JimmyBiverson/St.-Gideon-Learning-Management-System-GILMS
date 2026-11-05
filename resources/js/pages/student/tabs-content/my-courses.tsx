import { Link, usePage } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import ProgressCard from '@/components/cards/course-card-4';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

const MyCourses = () => {
   const { courseEnrollments, translate } =
      usePage<StudentDashboardProps>().props;
   const { frontend } = translate;

   return courseEnrollments && courseEnrollments.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
         {courseEnrollments.map((enrollment: CourseEnrollment) => (
            <ProgressCard key={enrollment.id} enrollment={enrollment} />
         ))}
      </div>
   ) : (
      <Card className="flex flex-col items-center justify-center gap-4 rounded-2xl border-dashed px-6 py-14 text-center">
         <div className="rounded-2xl bg-primary/10 p-4 text-primary">
            <BookOpen className="size-8" aria-hidden="true" />
         </div>
         <h2 className="text-xl font-semibold">{frontend.no_courses_found}</h2>
         <p className="max-w-sm text-sm text-muted-foreground">
            Explore learning opportunities and return here to continue your
            progress.
         </p>
         <Button asChild>
            <Link href={home()}>Explore learning</Link>
         </Button>
      </Card>
   );
};

export default MyCourses;

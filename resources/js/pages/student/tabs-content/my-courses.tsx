import { usePage } from '@inertiajs/react';
import ProgressCard from '@/components/cards/course-card-4';
import { Card } from '@/components/ui/card';

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
      <Card className="flex items-center justify-center p-6">
         <p>{frontend.no_courses_found}</p>
      </Card>
   );
};

export default MyCourses;

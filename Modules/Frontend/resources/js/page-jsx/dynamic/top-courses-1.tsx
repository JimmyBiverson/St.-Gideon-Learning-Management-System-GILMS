import CourseCard3 from '@/components/cards/course-card-3';
import { cn } from '@/lib/utils';

const TopCourses1 = ({ data }: { data: Collection<Course> }) => {
   if (!data) {
      return null;
   }

   const courseLength = data.collection.length ?? 0;

   return (
      <div
         className={cn(
            'relative z-10 grid grid-cols-1 items-center gap-x-20',
            courseLength > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1',
            courseLength > 2 ? 'gap-y-10' : 'gap-y-14',
         )}
      >
         {data.collection.slice(0, 2).map((course) => (
            <CourseCard3 key={course.id} course={course} className="h-full" />
         ))}
      </div>
   );
};

export default TopCourses1;

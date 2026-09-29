import CourseCard5 from '@/components/cards/course-card-5';

const NewCourses1 = ({ data }: { data: Collection<Course> }) => {
   if (!data) {
      return null;
   }

   return (
      <div className="relative z-10 grid grid-cols-1 gap-7 lg:grid-cols-2">
         {data.collection.slice(0, 4).map((course) => (
            <CourseCard5 key={course.id} course={course} className="py-0" />
         ))}
      </div>
   );
};

export default NewCourses1;

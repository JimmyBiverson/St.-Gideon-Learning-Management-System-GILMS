import CourseCard2 from '@/components/cards/course-card-2';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TopCourseCategories3 = ({
   data,
}: {
   data: Collection<CourseCategory>;
}) => {
   if (!data || !data.collection || data.collection.length === 0) {
      return (
         <p className="flex items-center justify-center p-8 text-center text-muted-foreground">
            No course categories found.
         </p>
      );
   }

   return (
      <Tabs defaultValue={data.collection[0].slug}>
         <div className="mt-6 flex w-full overflow-x-auto overflow-y-hidden">
            <TabsList className="h-[60px] justify-center px-2">
               {data.collection.map((category) => (
                  <TabsTrigger
                     key={category.id}
                     value={category.slug}
                     className="h-11 cursor-pointer text-base"
                  >
                     {category.title}
                  </TabsTrigger>
               ))}
            </TabsList>
         </div>

         {data.collection.map((category) => (
            <TabsContent
               key={category.id}
               value={category.slug}
               className="mt-10"
            >
               {category.courses && category.courses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {category.courses.map((course) => (
                        <CourseCard2 key={course.id} course={course} />
                     ))}
                  </div>
               ) : (
                  <p className="text-center text-muted-foreground">
                     No courses found
                  </p>
               )}
            </TabsContent>
         ))}
      </Tabs>
   );
};

export default TopCourseCategories3;

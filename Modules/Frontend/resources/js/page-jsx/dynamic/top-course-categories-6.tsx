import CategoryCard4 from '@/components/cards/category-card-4';

const TopCourseCategories6 = ({
   data,
}: {
   data: Collection<CourseCategory>;
}) => {
   if (!data) {
      return null;
   }

   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         {data.collection.slice(0, 3).map((category) => (
            <CategoryCard4 key={category.id} category={category} />
         ))}
      </div>
   );
};

export default TopCourseCategories6;

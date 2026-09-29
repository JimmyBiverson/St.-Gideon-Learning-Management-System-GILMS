import CategoryCard2 from '@/components/cards/category-card-2';

const TopCourseCategories2 = ({
   data,
}: {
   data: Collection<CourseCategory>;
}) => {
   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
         {data &&
            data.collection.map((category) => (
               <CategoryCard2 key={category.id} category={category} />
            ))}
      </div>
   );
};

export default TopCourseCategories2;

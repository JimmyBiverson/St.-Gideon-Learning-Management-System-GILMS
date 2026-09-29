import CategoryCard1 from '@/components/cards/category-card-1';
import { getColorWithOpacity } from '@/lib/utils';

const TopCourseCategories = ({
   data,
}: {
   data: Collection<CourseCategory>;
}) => {
   const colors = [
      'rgba(79,57,246,1)',
      'rgba(0,122,85,1)',
      'rgba(255,171,0,1)',
      'rgba(236,0,63,1)',
      'rgba(255,171,0,1)',
      // 'rgba(236,0,63,1)',
      // 'rgba(79,57,246,1)',
      // 'rgba(0,122,85,1)',
   ];

   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
         {data &&
            data.collection.map((category, index) => {
               // Cycle through colors array - when index exceeds array length, start from beginning
               const colorIndex = index % colors.length;
               const currentColor = colors[colorIndex];

               return (
                  <CategoryCard1
                     key={category.id}
                     category={category}
                     style={{
                        color: currentColor,
                        borderColor: getColorWithOpacity(currentColor, 0.15),
                        backgroundColor: getColorWithOpacity(
                           currentColor,
                           0.04,
                        ),
                     }}
                  />
               );
            })}
      </div>
   );
};

export default TopCourseCategories;

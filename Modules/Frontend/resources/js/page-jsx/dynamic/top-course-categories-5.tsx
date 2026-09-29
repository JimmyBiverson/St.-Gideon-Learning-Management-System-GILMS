import CategoryCard4 from '@/components/cards/category-card-4';
import { getColorWithOpacity } from '@/lib/utils';

const TopCourseCategories5 = ({
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
      <div className="z-10 grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
         {data &&
            data.collection.slice(0, 3).map((category, index) => {
               const colorIndex = index % colors.length;
               const currentColor = colors[colorIndex];

               return (
                  <CategoryCard4
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

export default TopCourseCategories5;

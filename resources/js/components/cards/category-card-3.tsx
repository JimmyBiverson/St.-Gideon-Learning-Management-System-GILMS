import { Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { courses } from '@/routes/category';

const CategoryCard2 = ({ category }: { category: CourseCategory }) => {
   return (
      <Link href={courses({ category: category.slug })}>
         <Card className="h-[110px] gap-4 rounded-2xl border-muted px-12 py-6 !shadow-none hover:!shadow-card">
            <p className="text-lg font-medium">{category.title}</p>
            <p className="text-muted-foreground">
               {category.courses_count} Courses
            </p>
         </Card>
      </Link>
   );
};

export default CategoryCard2;

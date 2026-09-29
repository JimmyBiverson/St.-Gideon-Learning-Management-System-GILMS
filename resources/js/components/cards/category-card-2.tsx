import { Link } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Card } from '@/components/ui/card';
import { courses } from '@/routes/category';

const CategoryCard2 = ({ category }: { category: CourseCategory }) => {
   return (
      <Link href={courses({ category: category.slug })}>
         <Card className="min:h-[110px] flex items-center gap-4 rounded-2xl p-6 !shadow-none hover:!shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
               <DynamicIcon size={24} name={category.icon as any} />
            </div>

            <div>
               <p className="text-lg font-medium">{category.title}</p>
               <p className="text-muted-foreground">
                  {category.courses_count} Courses
               </p>
            </div>
         </Card>
      </Link>
   );
};

export default CategoryCard2;

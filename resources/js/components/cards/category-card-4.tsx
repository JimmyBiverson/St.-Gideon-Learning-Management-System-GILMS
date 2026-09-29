import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { courses } from '@/routes/category';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
   category: CourseCategory;
   className?: string;
}

const CategoryCard4 = ({ category, className, ...props }: Props) => {
   return (
      <Link href={courses({ category: category.slug })}>
         <Card
            className={cn(
               'group rounded-2xl border-muted p-6 !shadow-none hover:!shadow-card',
               className,
            )}
            {...props}
         >
            <DynamicIcon size={24} name={category.icon as any} />
            <p className="pt-5 pb-8 text-xl font-semibold text-foreground">
               {category.title}
            </p>

            <div className="flex items-center justify-between gap-2 text-muted-foreground group-hover:text-foreground">
               <p className="text-sm font-medium">
                  {category.courses_count} Courses
               </p>
               <ExternalLink className="h-4 w-4" />
            </div>
         </Card>
      </Link>
   );
};

export default CategoryCard4;

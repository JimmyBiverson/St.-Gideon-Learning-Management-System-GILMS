import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Card } from '@/components/ui/card';
import { useLang } from '@/hooks/use-lang';
import { cn } from '@/lib/utils';
import { courses } from '@/routes/category';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
   category: CourseCategory;
   className?: string;
}

const CategoryCard1 = ({ category, className, ...props }: Props) => {
   const { common } = useLang();

   return (
      <Link href={courses({ category: category.slug })}>
         <Card
            className={cn(
               'min:h-[110px] group gap-4 rounded-2xl border-secondary-100 bg-secondary-100 p-5 text-secondary-foreground !shadow-none hover:!shadow-card',
               className,
            )}
            {...props}
         >
            <DynamicIcon size={28} name={category.icon as any} />

            <p className="mt-4 mb-4 text-xl font-semibold text-foreground">
               {category.title}
            </p>

            <div className="flex items-center justify-between gap-2 text-muted-foreground group-hover:text-foreground">
               <p className="text-sm font-medium">
                  {category.courses_count} {common.courses}
               </p>
               <ExternalLink className="h-4 w-4" />
            </div>
         </Card>
      </Link>
   );
};

export default CategoryCard1;

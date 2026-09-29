import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { Download, Eye } from 'lucide-react';

const Resource = () => {
   const { props } = usePage<CoursePlayerProps>();
   const resources = (props.watching as SectionLesson).resources;

   return (
      <div className="space-y-5">
         {resources.map((resource: LessonResource) => (
            <div className="rounded-md bg-muted p-1.5" key={resource.id}>
               <div className="flex items-center justify-between gap-2">
                  <div className="w-full px-1">
                     <a
                        target="_blank"
                        href={resource.resource}
                        className="cursor-pointer text-sm hover:underline"
                     >
                        {resource.title.slice(0, 50) +
                           (resource.title.length > 50 ? '...' : '')}
                     </a>
                  </div>

                  <Button
                     asChild
                     size="icon"
                     variant="secondary"
                     className="h-7 w-7"
                  >
                     <a target="_blank" href={resource.resource}>
                        {resource.type === 'link' ? (
                           <Eye className="h-3 w-3" />
                        ) : (
                           <Download className="h-3 w-3" />
                        )}
                     </a>
                  </Button>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Resource;

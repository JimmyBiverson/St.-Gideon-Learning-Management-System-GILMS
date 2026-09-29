import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { destroy } from '@/routes/lesson-resources';
import { Download, Eye, Pencil } from 'lucide-react';
import { useState } from 'react';
import ResourceForm from './forms/resource-form';

interface Props {
   lesson: SectionLesson;
   setOpen: (value: boolean) => void;
}

const ResourceList = ({ lesson, setOpen }: Props) => {
   const [editId, setEditId] = useState('');

   return (
      <div className="space-y-4 py-3">
         {lesson.resources.length > 0 ? (
            lesson.resources.map((resource: LessonResource) => (
               <div
                  className={cn(
                     'rounded-md bg-muted p-1.5',
                     resource.id.toString() === editId && 'p-3',
                  )}
               >
                  {resource.id.toString() === editId ? (
                     <ResourceForm
                        key={resource.id}
                        lesson={lesson}
                        resource={resource}
                        setEditId={setEditId}
                        setIsOpen={setOpen}
                     />
                  ) : (
                     <div
                        key={resource.id}
                        className="flex items-center justify-between gap-2"
                     >
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

                        <ActionsDropdown
                           className="max-w-36"
                           routes={[
                              {
                                 label: 'Delete',
                                 method: 'delete',
                                 route: destroy.url(resource.id),
                                 message:
                                    'Are you sure you want to delete this resource?',
                              },
                           ]}
                           component={
                              <>
                                 <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start has-[svg]:!px-2"
                                 >
                                    <a target="_blank" href={resource.resource}>
                                       {resource.type === 'link' ? (
                                          <Eye size={15} />
                                       ) : (
                                          <Download size={15} />
                                       )}
                                       <span>
                                          {resource.type === 'link'
                                             ? 'Preview'
                                             : 'Download'}
                                       </span>
                                    </a>
                                 </Button>

                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start has-[svg]:!px-2"
                                    onClick={() =>
                                       setEditId(resource.id.toString())
                                    }
                                 >
                                    <Pencil size={15} />
                                    <span>Edit</span>
                                 </Button>
                              </>
                           }
                        />
                     </div>
                  )}
               </div>
            ))
         ) : (
            <div className="rounded-md bg-muted p-1.5">
               <div className="w-full px-1 py-6 text-center">
                  <p className="text-sm">No resources available</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default ResourceList;

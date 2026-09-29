import ActionsDropdown from '@/components/actions-dropdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { destroy } from '@/routes/exam-resources';
import { usePage } from '@inertiajs/react';
import { Download, Eye, Pencil, Plus } from 'lucide-react';
import ResourceForm from '../forms/resource-form';

const Resources = () => {
   const { exam } = usePage<ExamUpdateProps>().props;

   return (
      <div className="space-y-4 py-3">
         <div className="flex items-center justify-between">
            <div>
               <h3 className="text-lg font-semibold">Exam Resources</h3>
               <p className="text-sm text-muted-foreground">
                  Exam Resources List
               </p>
            </div>

            <div className="flex items-center gap-2">
               <ResourceForm
                  title="Add new exam resource"
                  handler={
                     <Button>
                        <Plus className="h-4 w-4" />
                        Add Resource
                     </Button>
                  }
               />
            </div>
         </div>

         <Card className="space-y-4 p-5 shadow-none">
            {exam.resources.length > 0 ? (
               exam.resources.map((resource: ExamResource) => (
                  <div className="rounded-md border border-border p-2">
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
                           routes={[
                              {
                                 label: 'Delete',
                                 method: 'delete',
                                 route: destroy.url(resource.id),
                              },
                           ]}
                           component={
                              <>
                                 <ResourceForm
                                    title="Update new exam resource"
                                    resource={resource}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          <span>Edit</span>
                                       </Button>
                                    }
                                 />

                                 <Button
                                    asChild
                                    variant="ghost"
                                    className="h-8 w-full justify-start has-[svg]:!px-2"
                                 >
                                    <a target="_blank" href={resource.resource}>
                                       {resource.type === 'link' ? (
                                          <>
                                             <Eye size={15} />
                                             <span>View</span>
                                          </>
                                       ) : (
                                          <>
                                             <Download size={15} />
                                             <span>Download</span>
                                          </>
                                       )}
                                    </a>
                                 </Button>
                              </>
                           }
                        />
                     </div>
                  </div>
               ))
            ) : (
               <div className="rounded-md p-1.5">
                  <div className="w-full px-1 py-6 text-center">
                     <p className="text-sm">No resources available</p>
                  </div>
               </div>
            )}
         </Card>
      </div>
   );
};

export default Resources;

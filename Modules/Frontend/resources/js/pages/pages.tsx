import ActionsDropdown from '@/components/actions-dropdown';
import Breadcrumbs from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import DashboardLayout from '@/layouts/dashboard/layout';
import { cn } from '@/lib/utils';
import { editor, show, update } from '@/routes/frontend-pages';
import { Link, router } from '@inertiajs/react';
import { Check, Eye, FileText, Pencil, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import FrontendSystem from '@/frontend/components/frontend-system';
import PageCreate from '@/frontend/components/page-create';
import SystemMode from '@/frontend/components/system-mode';

const Pages = ({ project }: FrontendPagesProps) => {
   const homePages = project.pages.filter((page) => page.type === 'home');
   const innerPages = project.pages.filter((page) => page.type === 'inner');

   return (
      <>
         <Breadcrumbs
            title="Pages"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Frontend Pages' },
            ]}
            action={
               <div className="flex items-center gap-4">
                  <Tooltip>
                     <TooltipTrigger>
                        <SystemMode />
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Switch System Mode</p>
                     </TooltipContent>
                  </Tooltip>

                  <FrontendSystem />
               </div>
            }
            className="mb-4"
         />

         {/* Pages Section */}
         <div>
            <div className="mb-4 flex items-center justify-between">
               <div>
                  <h2 className="text-xl font-semibold">Pages</h2>
                  <p className="text-sm text-muted-foreground">
                     Manage your project pages
                  </p>
               </div>
               <PageCreate
                  projectId={project.id as number}
                  triggerHandler={
                     <Button className="px-3">
                        <Plus className="h-4 w-4" />
                        <span>Create Page</span>
                     </Button>
                  }
               />
            </div>

            {/* Home Pages */}
            <div>
               <h2 className="mb-3 text-base font-semibold">Home Pages</h2>

               {homePages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {homePages.map((page) => (
                        <Card
                           key={page.id}
                           className={cn(
                              'flex-row items-center justify-between border p-5 transition-all',
                              page.status &&
                                 '!border-foreground outline outline-foreground',
                           )}
                        >
                           <div className="flex items-center justify-start gap-3">
                              <h3 className="mb-1 text-lg font-semibold transition-colors">
                                 {page.title}
                              </h3>
                              {page.status && (
                                 <Badge className="h-5 w-5 rounded-full p-0">
                                    <Check />
                                 </Badge>
                              )}
                           </div>

                           <ActionsDropdown
                              component={
                                 <>
                                    {!page.status && (
                                       <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-full justify-start has-[svg]:!px-2"
                                          onClick={() => {
                                             router.post(update(page.id), {
                                                title: page.title,
                                                type: 'home',
                                                status: true,
                                             });
                                          }}
                                       >
                                          <Check size={15} />
                                          Activate
                                       </Button>
                                    )}

                                    <Button
                                       asChild
                                       variant="ghost"
                                       size="sm"
                                       className="w-full justify-start has-[svg]:!px-2"
                                    >
                                       <a
                                          href={show.url(Number(page.id))}
                                          target="_blank"
                                       >
                                          <Eye size={15} />
                                          View
                                       </a>
                                    </Button>

                                    <Button
                                       asChild
                                       variant="ghost"
                                       size="sm"
                                       className="w-full justify-start has-[svg]:!px-2"
                                    >
                                       <Link
                                          href={editor({
                                             project: project.id,
                                             page: page.id,
                                          })}
                                       >
                                          <Pencil size={15} />
                                          Edit
                                       </Link>
                                    </Button>
                                 </>
                              }
                           />
                        </Card>
                     ))}
                  </div>
               ) : (
                  <Card className="border-dashed">
                     <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                           <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">
                           No pages yet
                        </h3>
                        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                           Get started by creating your first page for this
                           project.
                        </p>
                        <PageCreate
                           projectId={project.id as number}
                           triggerHandler={
                              <Button>
                                 <Plus className="h-4 w-4" />
                                 Create Your First Page
                              </Button>
                           }
                        />
                     </div>
                  </Card>
               )}
            </div>

            {/* Inner Pages */}
            <div className="mt-6">
               <h2 className="mb-3 text-base font-semibold">Inner Pages</h2>
               {innerPages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {innerPages.map((page) => (
                        <Card
                           key={page.id}
                           className="flex-row items-start justify-between p-5 transition-all"
                        >
                           <h3 className="mb-1 text-lg font-semibold transition-colors">
                              {page.title}
                           </h3>

                           <ActionsDropdown
                              className="max-w-36"
                              component={
                                 <>
                                    <a
                                       onClick={(e) => e.stopPropagation()}
                                       href={show.url(Number(page.id))}
                                       target="_blank"
                                    >
                                       <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Eye size={15} />
                                          View
                                       </Button>
                                    </a>

                                    <Link
                                       onClick={(e) => e.stopPropagation()}
                                       href={editor({
                                          project: project.id,
                                          page: page.id,
                                       })}
                                    >
                                       <Button
                                          size="sm"
                                          variant="ghost"
                                          className="w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          Edit
                                       </Button>
                                    </Link>
                                 </>
                              }
                           />
                        </Card>
                     ))}
                  </div>
               ) : (
                  <Card className="border-dashed">
                     <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                           <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">
                           No pages yet
                        </h3>
                        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                           Get started by creating your first page for this
                           project.
                        </p>
                        <PageCreate
                           projectId={project.id as number}
                           triggerHandler={
                              <Button>
                                 <Plus className="h-4 w-4" />
                                 Create Your First Page
                              </Button>
                           }
                        />
                     </div>
                  </Card>
               )}
            </div>
         </div>
      </>
   );
};

Pages.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Pages;

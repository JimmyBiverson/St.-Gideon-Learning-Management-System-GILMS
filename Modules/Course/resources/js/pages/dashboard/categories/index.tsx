import ActionsDropdown from '@/components/actions-dropdown';
import Breadcrumbs from '@/components/breadcrumbs';
import DataSortModal from '@/components/data-sort-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import {
   destroy as destroyCategory,
   sort as sortCategories,
} from '@/routes/course-categories';
import {
   destroy as destroyCategoryChild,
   sort as sortCategoryChild,
} from '@/routes/course-category-child';
import { router } from '@inertiajs/react';
import { ArrowDownUp, Pencil, Plus } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { ReactNode } from 'react';
import AddCategoryChild from './partials/category-child-form';
import CategoryForm from './partials/category-form';

interface Props extends SharedData {
   categories: CourseCategory[];
}

const Index = (props: Props) => {
   const { isAdmin } = useAuth();
   const { categories, translate } = props;
   const { button, frontend, dashboard } = translate;

   const defaultCategory = categories.find(
      (category) => category.slug === 'default',
   );
   const otherCategories = categories.filter(
      (category) => category.slug !== 'default',
   );

   return (
      <>
         <Breadcrumbs
            title="Categories"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Course Categories' },
            ]}
            action={
               <div className="flex items-center gap-3">
                  <DataSortModal
                     title={dashboard.sort_categories}
                     data={categories}
                     handler={
                        <Button
                           variant="outline"
                           size="sm"
                           className="h-9 gap-2"
                        >
                           <ArrowDownUp className="h-4 w-4" />
                           {button.sort_categories}
                        </Button>
                     }
                     onOrderChange={(newOrder, setOpen) => {
                        router.post(
                           sortCategories(),
                           {
                              sortedData: newOrder,
                           },
                           {
                              preserveScroll: true,
                              onSuccess: () => setOpen && setOpen(false),
                           },
                        );
                     }}
                     renderContent={(item) => (
                        <Card className="w-full px-4 py-3">
                           <p>{item.title}</p>
                        </Card>
                     )}
                  />

                  <CategoryForm
                     title={dashboard.add_category}
                     handler={
                        <Button size="sm" className="h-9 gap-2">
                           <Plus className="h-4 w-4" />
                           {dashboard.add_category}
                        </Button>
                     }
                  />
               </div>
            }
            className="mb-4"
         />

         {categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
               {defaultCategory && (
                  <Card
                     key={defaultCategory.id}
                     className="flex flex-col justify-between p-6"
                  >
                     <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                 <DynamicIcon
                                    size={20}
                                    name={defaultCategory.icon as any}
                                 />
                              </div>
                              <div>
                                 <h2 className="text-lg leading-tight font-semibold text-foreground">
                                    {defaultCategory.title}
                                 </h2>
                                 <span className="mt-1 inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                    {dashboard.protected_category}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <Separator className="bg-border/50" />

                        <div className="space-y-1">
                           <p className="text-sm font-medium">
                              {dashboard.protected_category}
                           </p>
                           <p className="text-sm leading-relaxed text-muted-foreground">
                              {dashboard.default_category_description}
                           </p>
                        </div>
                     </div>
                  </Card>
               )}

               {otherCategories.map((category) => (
                  <Card
                     key={category.id}
                     className="flex flex-col justify-between p-6"
                  >
                     <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                 <DynamicIcon
                                    size={20}
                                    name={category.icon as any}
                                 />
                              </div>
                              <div>
                                 <h2 className="text-lg leading-tight font-semibold text-foreground">
                                    {category.title}
                                 </h2>
                              </div>
                           </div>

                           <ActionsDropdown
                              className="max-w-36"
                              routes={[
                                 {
                                    label: 'Delete',
                                    method: 'delete',
                                    route: destroyCategory.url({
                                       category: Number(category.id),
                                    }),
                                    message: `The category "${category.title}" and its sub categories will be deleted and their courses will be moved to the default category.`,
                                 },
                              ]}
                              component={
                                 <>
                                    <AddCategoryChild
                                       categoryId={Number(category.id)}
                                       title={dashboard.add_new_category}
                                       handler={
                                          <Button
                                             size="sm"
                                             variant="ghost"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Plus size={15} />
                                             <span>Category</span>
                                          </Button>
                                       }
                                    />

                                    <DataSortModal
                                       title={button.sort_categories}
                                       data={category.category_children || []}
                                       handler={
                                          <Button
                                             size="sm"
                                             variant="ghost"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <ArrowDownUp size={15} />
                                             <span>Sort</span>
                                          </Button>
                                       }
                                       onOrderChange={(newOrder, setOpen) => {
                                          router.post(
                                             sortCategoryChild(),
                                             {
                                                sortedData: newOrder,
                                             },
                                             {
                                                preserveScroll: true,
                                                onSuccess: () =>
                                                   setOpen && setOpen(false),
                                             },
                                          );
                                       }}
                                       renderContent={(item) => (
                                          <Card className="w-full px-4 py-3">
                                             <p>{item.title}</p>
                                          </Card>
                                       )}
                                    />

                                    <CategoryForm
                                       title={dashboard.update_category}
                                       category={category}
                                       handler={
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="w-full justify-start has-[svg]:!px-2"
                                          >
                                             <Pencil size={15} />
                                             Edit
                                          </Button>
                                       }
                                    />
                                 </>
                              }
                           />
                        </div>

                        <Separator className="bg-border/50" />

                        {category.description && (
                           <p className="text-sm leading-relaxed text-muted-foreground">
                              {category.description}
                           </p>
                        )}

                        {category.category_children &&
                        category.category_children.length > 0 ? (
                           <div className="space-y-2">
                              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                 Subcategories
                              </p>
                              <div className="space-y-2 overflow-y-auto">
                                 {category.category_children.map((child) => (
                                    <div
                                       key={child.id}
                                       className="group/item flex items-center justify-between rounded-lg border border-border/65 bg-muted/30 px-3 py-1.5 transition-colors hover:bg-muted/60"
                                    >
                                       <div className="flex items-center gap-2">
                                          <DynamicIcon
                                             size={14}
                                             name={child.icon as any}
                                             className="text-muted-foreground"
                                          />
                                          <span className="text-sm font-medium text-foreground">
                                             {child.title}
                                          </span>
                                       </div>

                                       <ActionsDropdown
                                          className="max-w-36"
                                          routes={[
                                             {
                                                label: 'Delete',
                                                method: 'delete',
                                                route: destroyCategoryChild.url(
                                                   {
                                                      category_child: Number(
                                                         child.id,
                                                      ),
                                                   },
                                                ),
                                                message: `The sub category "${child.title}" will be deleted and their courses will be moved to it's parent category.`,
                                             },
                                          ]}
                                          component={
                                             <AddCategoryChild
                                                categoryChild={child}
                                                categoryId={Number(category.id)}
                                                title={
                                                   dashboard.update_category
                                                }
                                                handler={
                                                   <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="w-full justify-start has-[svg]:!px-2"
                                                   >
                                                      <Pencil size={15} />
                                                      Edit
                                                   </Button>
                                                }
                                             />
                                          }
                                       />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <p className="py-6 text-center text-xs font-medium text-muted-foreground uppercase">
                              No subcategories found
                           </p>
                        )}
                     </div>
                  </Card>
               ))}
            </div>
         ) : (
            <Card className="p-6">
               <h2 className="text-center text-muted-foreground">
                  {dashboard.no_results}
               </h2>
            </Card>
         )}
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

import ActionsDropdown from '@/components/actions-dropdown';
import Breadcrumbs from '@/components/breadcrumbs';
import DataSortModal from '@/components/data-sort-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { sort, destroy } from '@/routes/exam-categories';
import { router } from '@inertiajs/react';
import { Pencil, Plus, ArrowDownUp } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import CategoryForm from './category-form';

interface Props extends SharedData {
   categories: ExamCategory[];
}

const CategoriesIndex = (props: Props) => {
   const { isAdmin } = useAuth();
   const { categories, translate } = props;
   const { button, dashboard } = translate;

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
               { title: 'Exam Categories' },
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
                           sort(),
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
                                    Protected
                                 </span>
                              </div>
                           </div>
                        </div>

                        <Separator className="bg-border/50" />

                        <p className="text-sm leading-relaxed text-muted-foreground">
                           When a category is deleted, its exams are moved to
                           the default category. The default category cannot be
                           edited or removed.
                        </p>
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
                              routes={[
                                 {
                                    label: button.delete || 'Delete',
                                    method: 'delete',
                                    route: destroy.url(category.id),
                                    message:
                                       'Are you sure you want to delete this category?',
                                 },
                              ]}
                              component={
                                 <CategoryForm
                                    title="Edit Category"
                                    category={category}
                                    handler={
                                       <Button
                                          variant="ghost"
                                          className="h-8 w-full justify-start has-[svg]:!px-2"
                                       >
                                          <Pencil size={15} />
                                          <span>{button.edit || 'Edit'}</span>
                                       </Button>
                                    }
                                 />
                              }
                           />
                        </div>

                        <Separator className="bg-border/50" />

                        {category.description && (
                           <p className="text-sm leading-relaxed text-muted-foreground">
                              {category.description}
                           </p>
                        )}
                     </div>

                     <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                        <Badge
                           variant={category.status ? 'default' : 'secondary'}
                           className="rounded-full"
                        >
                           {category.status ? 'Active' : 'Inactive'}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground">
                           {category.exams_count || 0} exams
                        </span>
                     </div>
                  </Card>
               ))}
            </div>
         ) : (
            <div className="col-span-full">
               <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
                     <p className="text-sm text-muted-foreground">
                        No categories found. Create your first category!
                     </p>
                     <CategoryForm
                        title="Create Category"
                        handler={
                           <Button size="sm">
                              <Plus className="h-4 w-4" />
                              Add Category
                           </Button>
                        }
                     />
                  </CardContent>
               </Card>
            </div>
         )}
      </>
   );
};

CategoriesIndex.layout = (page: React.ReactNode) => (
   <DashboardLayout>{page}</DashboardLayout>
);
export default CategoriesIndex;

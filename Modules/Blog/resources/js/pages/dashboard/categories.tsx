import ActionsDropdown from '@/components/actions-dropdown';
import Breadcrumbs from '@/components/breadcrumbs';
import DataSortModal from '@/components/data-sort-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/dashboard/layout';
import { destroy, sort } from '@/routes/blogs/categories';
import { router, usePage } from '@inertiajs/react';
import { Pencil, FolderOpen, Plus, ArrowDownUp } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { ReactNode } from 'react';
import CategoryForm from './partials/category-form';

const BlogCategoriesIndex = () => {
   const { props } = usePage<BlogCategoriesPageProps>();
   const { categories, translate } = props;
   const { dashboard, button } = translate;

   const defaultCategory = categories.find(
      (category) => category.slug === 'default',
   );
   const allCategories = categories.filter(
      (category) => category.slug !== 'default',
   );

   return (
      <>
         <Breadcrumbs
            title={dashboard.blog_category || 'Blog Categories'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Blog Categories' },
            ]}
            action={
               <div className="flex items-center gap-3">
                  <DataSortModal
                     title={dashboard.sort_categories}
                     data={allCategories}
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
                           <p>{item.name}</p>
                        </Card>
                     )}
                  />

                  <CategoryForm
                     title={dashboard.create_category}
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

         <div className="space-y-6">
            {/* Categories Grid */}
            {categories.length > 0 && (
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {defaultCategory && (
                     <Card className="flex flex-col justify-between p-6">
                        <div className="space-y-4">
                           <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-2">
                                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <DynamicIcon
                                       size={20}
                                       name={defaultCategory.icon as any}
                                    />
                                 </div>

                                 <div>
                                    <h2 className="text-lg leading-tight font-semibold text-foreground">
                                       {defaultCategory.name}
                                    </h2>
                                    <span className="mt-1 inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                       Protected
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <Separator className="bg-border/50" />

                           {defaultCategory.description && (
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                 {defaultCategory.description}
                              </p>
                           )}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                           <span className="text-xs text-muted-foreground">
                              {dashboard.total_number_of_blog}
                           </span>
                           <span className="text-xs font-semibold text-foreground">
                              {defaultCategory.blogs_count || 0} blogs
                           </span>
                        </div>
                     </Card>
                  )}

                  {allCategories.map((category) => (
                     <Card
                        key={category.id}
                        className="flex flex-col justify-between p-6"
                     >
                        <div className="space-y-4">
                           <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-2">
                                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <DynamicIcon
                                       size={20}
                                       name={category.icon as any}
                                    />
                                 </div>

                                 <div>
                                    <h2 className="text-lg leading-tight font-semibold text-foreground">
                                       {category.name}
                                    </h2>
                                 </div>
                              </div>

                              <div className="flex items-center gap-1">
                                 <ActionsDropdown
                                    routes={[
                                       {
                                          label: button.delete || 'Delete',
                                          method: 'delete',
                                          route: destroy.url(category.id),
                                          message: `Are you sure you want to delete this category?`,
                                       },
                                    ]}
                                    component={
                                       <CategoryForm
                                          title={button.update}
                                          category={category}
                                          handler={
                                             <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start has-[svg]:!px-2"
                                             >
                                                <Pencil size={15} />
                                                {button.update || 'Edit'}
                                             </Button>
                                          }
                                       />
                                    }
                                 />
                              </div>
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
                              variant={
                                 category.status === 'active'
                                    ? 'default'
                                    : 'secondary'
                              }
                              className="rounded-full capitalize"
                           >
                              {category.status}
                           </Badge>
                           <span className="text-xs font-semibold text-foreground">
                              {category.blogs_count || 0} blogs
                           </span>
                        </div>
                     </Card>
                  ))}
               </div>
            )}

            {categories.length === 0 && (
               <div className="py-12 text-center">
                  <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                     No categories found
                  </h3>
                  <p className="mt-2 mb-4 text-muted-foreground">
                     Get started by creating your first blog category
                  </p>

                  <CategoryForm
                     title="Create Category"
                     handler={
                        <Button size="sm">
                           <Plus className="mr-2 h-4 w-4" />
                           Add New Category
                        </Button>
                     }
                  />
               </div>
            )}
         </div>
      </>
   );
};

BlogCategoriesIndex.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default BlogCategoriesIndex;

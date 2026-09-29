import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/products';
import { Form, useForm, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

const Basic = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { tab, categories, product } = props;

   const { data, setData } = useForm({
      tab: tab,
      description: product.description || '',
      product_category_id: product.product_category_id,
      product_category_child_id: product.product_category_child_id,
   });

   const transformedCategories = useMemo(() => {
      return categories.flatMap((category) => {
         const categoryItem = {
            label: category.title,
            value: category.id,
            id: category.id,
            child_id: '',
         };

         const childItems =
            category.category_children?.map((child) => ({
               label: `--${child.title}`,
               value: `--${child.id}`,
               id: child.product_category_id,
               child_id: child.id,
            })) || [];

         return [categoryItem, ...childItems];
      });
   }, [categories]);

   const getSelectedCategory = () => {
      if (data.product_category_child_id) {
         return `--${data.product_category_child_id}`;
      }

      return data.product_category_id;
   };

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form({ id: product.id })}
            options={{ preserveScroll: true }}
            transform={(formData) => ({
               ...formData,
               ...data,
            })}
         >
            {({ processing, errors }) => (
               <div className="space-y-4">
                  <div>
                     <Label>Title *</Label>
                     <Input
                        name="title"
                        defaultValue={product.title}
                        placeholder="e.g. Advanced Microscope"
                     />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>Summary *</Label>
                     <Textarea
                        rows={4}
                        name="summary"
                        defaultValue={product.summary}
                        placeholder="Keep the summary short — it appears at the top of the product page."
                     />
                     <InputError message={errors.summary} />
                  </div>

                  <div>
                     <Label>Description</Label>
                     <Editor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: 'Describe your product in detail',
                           imageCaption: 'Describe your product in detail',
                        }}
                        contentMinHeight={256}
                        contentMaxHeight={640}
                        initialContent={data.description}
                        onContentChange={(value) =>
                           setData('description', value as string)
                        }
                     />
                     <InputError message={errors.description} />
                  </div>

                  <div>
                     <Label htmlFor="product_category_id">Category *</Label>
                     <Combobox
                        data={transformedCategories}
                        placeholder="Select a category"
                        defaultValue={getSelectedCategory()}
                        onSelect={(selected) => {
                           setData('product_category_id', selected.id);
                           setData(
                              'product_category_child_id',
                              selected.child_id,
                           );
                        }}
                     />
                     <InputError message={errors.product_category_id} />
                  </div>

                  <LoadingButton
                     loading={processing}
                     className="float-end mt-4"
                  >
                     Save Changes
                  </LoadingButton>
               </div>
            )}
         </Form>
      </Card>
   );
};

Basic.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Basic;

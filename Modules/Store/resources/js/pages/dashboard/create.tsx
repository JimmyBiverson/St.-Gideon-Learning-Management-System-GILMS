import Breadcrumbs from '@/components/breadcrumbs';
import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { store } from '@/routes/products';
import { Form, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

const Index = (props: ProductCreateProps) => {
   const user = props.auth.user;
   const { categories, system } = props;
   const { isAdmin } = useAuth();

   const { data, setData, reset } = useForm({
      description: '',
      pricing_type: 'paid',
      discount: false,
      product_category_id: '',
      product_category_child_id: '',
   });

   const defaultInstructorId =
      isAdmin && system.sub_type === 'collaborative'
         ? ''
         : user.instructor_id?.toString();

   const transformedCategories = useMemo(() => {
      return categories.flatMap((category) => {
         const categoryItem = {
            label: category.title,
            value: category.title,
            id: category.id,
            child_id: '',
         };

         const childItems =
            category.category_children?.map((child) => ({
               label: `--${child.title}`,
               value: child.title,
               id: child.product_category_id,
               child_id: child.id,
            })) || [];

         return [categoryItem, ...childItems];
      });
   }, [categories]);

   return (
      <>
         <Breadcrumbs
            title="Create Product"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Create New Product' },
            ]}
            className="mb-4"
         />

         <Card className="container p-6">
            <Form
               {...store.form()}
               transform={(formData) => ({
                  ...formData,
                  ...data,
               })}
               className="space-y-6"
               onSuccess={() => reset()}
            >
               {({ processing, errors }) => {
                  return (
                     <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                           {/* Left Column */}
                           <div className="space-y-6">
                              <div>
                                 <Label>Title *</Label>
                                 <Input
                                    name="title"
                                    placeholder="e.g. Advanced Microscope"
                                 />
                                 <InputError message={errors.title} />
                              </div>

                              <div>
                                 <Label>Summary *</Label>
                                 <Textarea
                                    rows={5}
                                    name="summary"
                                    placeholder="Short summary shown at the top of the product page"
                                 />
                                 <InputError message={errors.summary} />
                              </div>

                              <div>
                                 <Label>Description</Label>
                                 <Editor
                                    ssr={true}
                                    output="html"
                                    placeholder={{
                                       paragraph:
                                          'Describe your product in detail',
                                       imageCaption:
                                          'Describe your product in detail',
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
                           </div>

                           {/* Right Column */}
                           <div className="space-y-6">
                              {isAdmin &&
                              system.sub_type === 'collaborative' ? (
                                 <div>
                                    <Label htmlFor="instructor_id">
                                       Instructor *
                                    </Label>
                                    <Combobox
                                       name="instructor_id"
                                       defaultValue={defaultInstructorId}
                                       data={
                                          props.instructors?.map(
                                             (instructor) => ({
                                                label: instructor.user.name,
                                                value: instructor.id.toString(),
                                             }),
                                          ) || []
                                       }
                                       placeholder="Select instructor"
                                       onSelect={() => null}
                                    />
                                    <InputError
                                       message={errors.instructor_id}
                                    />
                                 </div>
                              ) : (
                                 <input
                                    hidden
                                    name="instructor_id"
                                    value={defaultInstructorId}
                                 />
                              )}

                              <div>
                                 <Label htmlFor="product_category_id">
                                    Category *
                                 </Label>
                                 <Combobox
                                    name="product_category_id"
                                    data={transformedCategories}
                                    placeholder="Select a category"
                                    onSelect={(selected) => {
                                       setData(
                                          'product_category_id',
                                          selected.id as string,
                                       );
                                       setData(
                                          'product_category_child_id',
                                          selected.child_id as string,
                                       );
                                    }}
                                 />
                                 <InputError
                                    message={errors.product_category_id}
                                 />
                              </div>

                              <div>
                                 <Label>Pricing *</Label>
                                 <RadioGroup
                                    name="pricing_type"
                                    defaultValue={data.pricing_type}
                                    className="flex items-center space-x-4 pt-2 pb-1"
                                    onValueChange={(value) =>
                                       setData('pricing_type', value)
                                    }
                                 >
                                    {['free', 'paid'].map((price) => (
                                       <div
                                          key={price}
                                          className="flex items-center space-x-2"
                                       >
                                          <RadioGroupItem
                                             className="cursor-pointer"
                                             id={price}
                                             value={price}
                                          />
                                          <Label
                                             htmlFor={price}
                                             className="mb-0 capitalize"
                                          >
                                             {price}
                                          </Label>
                                       </div>
                                    ))}
                                 </RadioGroup>
                                 <InputError message={errors.pricing_type} />

                                 <Accordion
                                    collapsible
                                    type="single"
                                    value={data.pricing_type}
                                 >
                                    <AccordionItem
                                       value="paid"
                                       className="border-none"
                                    >
                                       <AccordionContent className="space-y-4 p-0.5">
                                          <div className="pt-3">
                                             <Label htmlFor="price">
                                                Price *
                                             </Label>
                                             <Input
                                                type="number"
                                                name="price"
                                                placeholder="e.g. 49"
                                             />
                                             <InputError
                                                message={errors.price}
                                             />
                                          </div>

                                          <div className="space-y-2">
                                             <div className="flex items-center space-x-2">
                                                <Checkbox
                                                   id="discount"
                                                   name="discount"
                                                   checked={data.discount}
                                                   onCheckedChange={(
                                                      checked: boolean,
                                                   ) =>
                                                      setData(
                                                         'discount',
                                                         checked,
                                                      )
                                                   }
                                                />
                                                <Label
                                                   htmlFor="discount"
                                                   className="mb-0"
                                                >
                                                   Discounted Price
                                                </Label>
                                             </div>

                                             {data.discount && (
                                                <div>
                                                   <Input
                                                      type="number"
                                                      name="discount_price"
                                                      placeholder="e.g. 39"
                                                   />
                                                   <InputError
                                                      message={
                                                         errors.discount_price
                                                      }
                                                   />
                                                </div>
                                             )}
                                          </div>
                                       </AccordionContent>
                                    </AccordionItem>
                                 </Accordion>
                              </div>

                              <div>
                                 <Label htmlFor="thumbnail">Thumbnail</Label>
                                 <Input
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                 />
                                 <InputError message={errors.thumbnail} />
                              </div>
                           </div>
                        </div>

                        <div className="col-span-2 mt-6 text-right">
                           <LoadingButton loading={processing}>
                              Create Product
                           </LoadingButton>
                        </div>
                     </>
                  );
               }}
            </Form>
         </Card>
      </>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

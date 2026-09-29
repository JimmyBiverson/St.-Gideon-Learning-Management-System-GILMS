import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
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
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/products';
import { Form, useForm, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

const Pricing = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { tab, product } = props;

   const { data, setData } = useForm({
      tab: tab,
      pricing_type: product.pricing_type || 'free',
      discount: Boolean(product.discount) || false,
      unlimited_inventory: Boolean(product.unlimited_inventory),
   });

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form({ id: product.id })}
            className="space-y-4"
            options={{ preserveScroll: true }}
            transform={(formData) => {
               const isFree = data.pricing_type === 'free';
               const discountPrice = data.discount
                  ? formData.discount_price
                  : null;

               return {
                  ...formData,
                  ...data,
                  discount: isFree ? false : data.discount,
                  price: isFree ? null : formData.price,
                  discount_price: isFree ? null : discountPrice,
               };
            }}
         >
            {({ processing, errors }) => (
               <>
                  <Accordion
                     collapsible
                     type="single"
                     value={data.pricing_type}
                  >
                     <div>
                        <Label>Pricing *</Label>
                        <RadioGroup
                           value={data.pricing_type}
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
                                    id={price}
                                    value={price}
                                    className="cursor-pointer"
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
                     </div>

                     <AccordionItem value="paid" className="border-none">
                        <AccordionContent className="space-y-4 p-0.5">
                           <div className="pt-3">
                              <Label>Price *</Label>
                              <Input
                                 type="number"
                                 name="price"
                                 defaultValue={product.price}
                                 placeholder="e.g. 49"
                              />
                              <InputError message={errors.price} />
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="discount"
                                    checked={data.discount}
                                    onCheckedChange={(checked) => {
                                       setData('discount', checked as boolean);
                                    }}
                                 />
                                 <Label htmlFor="discount" className="mb-0">
                                    Discounted Price
                                 </Label>
                              </div>

                              {data.discount && (
                                 <div>
                                    <Input
                                       type="number"
                                       name="discount_price"
                                       defaultValue={product.discount_price}
                                       placeholder="e.g. 39"
                                    />
                                    <InputError
                                       message={errors.discount_price}
                                    />
                                 </div>
                              )}
                           </div>
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>

                  <div className="space-y-2 border-t pt-4">
                     <div className="flex items-center space-x-2">
                        <Checkbox
                           id="unlimited_inventory"
                           checked={data.unlimited_inventory}
                           onCheckedChange={(checked) =>
                              setData('unlimited_inventory', checked as boolean)
                           }
                        />
                        <Label htmlFor="unlimited_inventory" className="mb-0">
                           Unlimited inventory (no purchase limit)
                        </Label>
                     </div>

                     {!data.unlimited_inventory && (
                        <div>
                           <Label>Inventory</Label>
                           <Input
                              type="number"
                              name="inventory"
                              defaultValue={product.inventory}
                              placeholder="e.g. 100"
                           />
                           <InputError message={errors.inventory} />
                        </div>
                     )}
                  </div>

                  <LoadingButton
                     loading={processing}
                     className="float-end mt-4"
                  >
                     Save Changes
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

Pricing.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Pricing;

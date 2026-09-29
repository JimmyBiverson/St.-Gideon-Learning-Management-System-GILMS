import Combobox from '@/components/combobox';
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
import courseDurations from '@/data/course-durations';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/courses';
import { Form, useForm, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

const Pricing = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;
   const { tab, prices, expiries, course } = props;

   const { data, setData } = useForm({
      tab: tab,
      pricing_type: course.pricing_type || '',
      discount: Boolean(course.discount) || false,
      expiry_type: course.expiry_type || '',
      expiry_duration: course.expiry_duration || '',
   });

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form({ id: course.id })}
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
            {({ processing, errors }) => {
               return (
                  <>
                     <Accordion
                        collapsible
                        type="single"
                        value={data.pricing_type}
                     >
                        <div>
                           <Label>{input.pricing_type} *</Label>
                           <RadioGroup
                              value={data.pricing_type}
                              className="flex items-center space-x-4 pt-2 pb-1"
                              onValueChange={(value) =>
                                 setData('pricing_type', value)
                              }
                           >
                              {prices.map((price) => (
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

                        <AccordionItem
                           value={prices[1]}
                           className="border-none"
                        >
                           <AccordionContent className="space-y-4 p-0.5">
                              <div className="pt-3">
                                 <Label>{dashboard.price} *</Label>
                                 <Input
                                    type="number"
                                    name="price"
                                    defaultValue={course.price}
                                    placeholder={input.course_price_placeholder}
                                 />
                                 <InputError message={errors.price} />
                              </div>

                              <div className="space-y-2">
                                 <div className="flex items-center space-x-2">
                                    <Checkbox
                                       id="discount"
                                       checked={data.discount}
                                       onCheckedChange={(checked) => {
                                          setData('discount', checked);
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
                                          defaultValue={course.discount_price}
                                          placeholder={
                                             input.discount_price_placeholder
                                          }
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

                     <Accordion
                        collapsible
                        type="single"
                        value={data.expiry_type}
                     >
                        <div>
                           <Label>Expiry period type</Label>
                           <RadioGroup
                              value={data.expiry_type}
                              className="flex items-center space-x-4 pt-2 pb-1"
                              onValueChange={(value) =>
                                 setData('expiry_type', value)
                              }
                           >
                              {expiries.map((expiry) => (
                                 <div
                                    key={expiry}
                                    className="flex items-center space-x-2"
                                 >
                                    <RadioGroupItem
                                       id={expiry}
                                       value={expiry}
                                       className="cursor-pointer"
                                    />
                                    <Label
                                       htmlFor={expiry}
                                       className="mb-0 capitalize"
                                    >
                                       {expiry.replace('_', ' ')}
                                    </Label>
                                 </div>
                              ))}
                           </RadioGroup>
                           <InputError message={errors.expiry_type} />
                        </div>

                        <AccordionItem
                           value={expiries[1]}
                           className="border-none"
                        >
                           <AccordionContent className="space-y-4 p-0.5">
                              <div className="pt-3">
                                 <Label>Expiry duration</Label>
                                 <Combobox
                                    data={courseDurations}
                                    defaultValue={data.expiry_duration}
                                    placeholder={'Select duration'}
                                    onSelect={(selected) =>
                                       setData(
                                          'expiry_duration',
                                          selected.value,
                                       )
                                    }
                                 />
                                 <InputError message={errors.expiry_duration} />
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>

                     <LoadingButton
                        loading={processing}
                        className="float-end mt-4"
                     >
                        {button.save_changes}
                     </LoadingButton>
                  </>
               );
            }}
         </Form>
      </Card>
   );
};

Pricing.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Pricing;

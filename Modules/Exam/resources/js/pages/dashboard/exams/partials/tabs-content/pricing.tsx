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
import { update } from '@/routes/exams';
import { Form, useForm, usePage } from '@inertiajs/react';

const Pricing = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { tab, exam, translate } = props;
   const { input } = translate;
   const inputExpiry = input as typeof input & {
      expiry_duration?: string;
      expiry_duration_placeholder?: string;
   };

   const { data, setData } = useForm({
      pricingType: exam.pricing_type || 'paid',
      discount: Boolean(exam.discount) || false,
      expiryType: exam.expiry_type || '',
      expiryDuration: exam.expiry_duration || '',
   });

   const pricingTypes = ['free', 'paid'];

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form(Number(exam.id))}
            transform={(formData) => ({
               ...formData,
               tab,
               pricing_type: data.pricingType,
               discount: data.discount,
               expiry_type: data.expiryType,
               expiry_duration: data.expiryDuration,
            })}
            options={{ preserveScroll: true }}
            className="space-y-4"
         >
            {({ errors, processing }) => (
               <>
                  <Accordion collapsible type="single" value={data.pricingType}>
                     <div>
                        <Label>Pricing Type *</Label>
                        <RadioGroup
                           defaultValue={data.pricingType}
                           className="flex items-center space-x-4 pt-2 pb-1"
                           onValueChange={(value: 'free' | 'paid') =>
                              setData('pricingType', value)
                           }
                        >
                           {pricingTypes.map((type) => (
                              <div
                                 key={type}
                                 className="flex items-center space-x-2"
                              >
                                 <RadioGroupItem
                                    className="cursor-pointer"
                                    id={type}
                                    value={type}
                                 />
                                 <Label
                                    htmlFor={type}
                                    className="mb-0 cursor-pointer capitalize"
                                 >
                                    {type}
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
                                 defaultValue={(exam.price || '').toString()}
                                 placeholder="Enter your exam price ($0)"
                              />
                              <InputError message={errors.price} />
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="discount"
                                    name="discount"
                                    checked={data.discount}
                                    onCheckedChange={(checked) => {
                                       setData('discount', checked === true);
                                    }}
                                 />
                                 <Label
                                    htmlFor="discount"
                                    className="mb-0 cursor-pointer"
                                 >
                                    Discounted Price
                                 </Label>
                              </div>

                              {data.discount && (
                                 <div>
                                    <Input
                                       type="number"
                                       name="discount_price"
                                       defaultValue={(
                                          exam.discount_price || ''
                                       ).toString()}
                                       placeholder="Enter discount price"
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

                  <Accordion collapsible type="single" value={data.expiryType}>
                     <div>
                        <Label>Expiry period type</Label>
                        <RadioGroup
                           defaultValue={data.expiryType}
                           className="flex items-center space-x-4 pt-2 pb-1"
                           onValueChange={(value) =>
                              setData('expiryType', value)
                           }
                        >
                           {['lifetime', 'limited_time'].map((expiry) => (
                              <div
                                 key={expiry}
                                 className="flex items-center space-x-2"
                              >
                                 <RadioGroupItem
                                    className="cursor-pointer"
                                    id={expiry}
                                    value={expiry}
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
                        value="limited_time"
                        className="border-none"
                     >
                        <AccordionContent className="space-y-4 p-0.5">
                           <div className="pt-3">
                              <Label>{inputExpiry.expiry_duration}</Label>
                              <Combobox
                                 defaultValue={data.expiryDuration}
                                 data={courseDurations}
                                 placeholder={
                                    inputExpiry.expiry_duration_placeholder ||
                                    'Select duration'
                                 }
                                 onSelect={(selected) =>
                                    setData('expiryDuration', selected.value)
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
                     Save Changes
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default Pricing;

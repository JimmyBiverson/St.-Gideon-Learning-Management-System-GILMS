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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import courseDurations from '@/data/course-durations';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { index as examsIndex, store } from '@/routes/exams';
import { Form, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

interface Props extends SharedData {
   categories: ExamCategory[];
   instructors: Instructor[];
}

const CreateExam = (props: Props) => {
   const { user } = useAuth();
   const { categories, instructors, system, translate } = props;
   const { input } = translate;

   const { data, setData } = useForm({
      description: '',
      pricing_type: 'paid',
      discount: false as boolean,
      expiry_type: 'lifetime',
      expiry_duration: '',
      instructor_id:
         user.role === 'admin' && system.sub_type === 'collaborative'
            ? ''
            : user.instructor_id,
      exam_category_id: '',
   });

   const transformedCategories = useMemo(() => {
      return categories.map((category) => ({
         label: category.title,
         value: category.id.toString(),
      }));
   }, [categories]);

   const transformedInstructors = useMemo(() => {
      return instructors.map((instructor) => ({
         label: instructor.user.name,
         value: instructor.id.toString(),
      }));
   }, [instructors]);

   const levels = ['beginner', 'intermediate', 'advanced'];
   const pricingTypes = ['paid', 'free'];
   const expiryTypes = ['lifetime', 'limited_time'];

   return (
      <>
         <Breadcrumbs
            title="Create Exam"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Exams', href: examsIndex.url() },
               { title: 'Create New Exam' },
            ]}
            className="mb-4"
         />

         <Card className="container p-4 md:p-6">
            <Form
               {...store.form()}
               transform={(formData) => ({
                  ...formData,
                  ...data,
               })}
               options={{ preserveScroll: true }}
               encType="multipart/form-data"
               className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
               {({ errors, processing }) => (
                  <>
                     {/* Left Column */}
                     <div className="space-y-6">
                        <div>
                           <Label>Exam Title *</Label>
                           <Input name="title" placeholder="Enter exam title" />
                           <InputError message={errors.title} />
                        </div>

                        <div>
                           <Label>Short Description</Label>
                           <Textarea
                              rows={5}
                              name="short_description"
                              placeholder="Brief description for exam cards"
                           />
                           <InputError message={errors.short_description} />
                        </div>

                        <div>
                           <Label>Description</Label>
                           <Editor
                              ssr={true}
                              output="html"
                              placeholder={{
                                 paragraph:
                                    'Enter detailed exam description...',
                                 imageCaption:
                                    'Enter detailed exam description...',
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
                        {user?.role === 'admin' &&
                           system?.sub_type === 'collaborative' && (
                              <div>
                                 <Label htmlFor="instructor_id">
                                    Exam Instructor *
                                 </Label>
                                 <Combobox
                                    data={transformedInstructors || []}
                                    placeholder="Select instructor"
                                    defaultValue={
                                       data.instructor_id?.toString() || ''
                                    }
                                    onSelect={(selected) =>
                                       setData(
                                          'instructor_id',
                                          selected.value as string,
                                       )
                                    }
                                 />
                                 <InputError message={errors.instructor_id} />
                              </div>
                           )}

                        <div className="grid gap-6 md:grid-cols-2">
                           <div>
                              <Label htmlFor="exam_category_id">
                                 Category *
                              </Label>
                              <Combobox
                                 data={transformedCategories}
                                 placeholder="Select category"
                                 onSelect={(selected) => {
                                    setData(
                                       'exam_category_id',
                                       selected.value as string,
                                    );
                                 }}
                              />
                              <InputError message={errors.exam_category_id} />
                           </div>

                           <div>
                              <Label>Difficulty Level *</Label>
                              <Select name="level" defaultValue="beginner">
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {levels.map((level) => (
                                       <SelectItem
                                          key={level}
                                          value={level}
                                          className="capitalize"
                                       >
                                          {level}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.level} />
                           </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                           <div>
                              <Label>Duration (Hours) *</Label>
                              <Input
                                 type="number"
                                 name="duration_hours"
                                 placeholder="1"
                                 min="0"
                              />
                              <InputError message={errors.duration_hours} />
                           </div>

                           <div>
                              <Label>Duration (Minutes) *</Label>
                              <Input
                                 type="number"
                                 name="duration_minutes"
                                 placeholder="0"
                                 min="0"
                                 max="59"
                              />
                              <InputError message={errors.duration_minutes} />
                           </div>

                           <div>
                              <Label>Pass Mark *</Label>
                              <Input
                                 type="number"
                                 name="pass_mark"
                                 placeholder="50"
                                 min="0"
                                 max="100"
                              />
                              <InputError message={errors.pass_mark} />
                           </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                           <div>
                              <Label>Max Attempts *</Label>
                              <Input
                                 type="number"
                                 name="max_attempts"
                                 placeholder="3"
                                 min="1"
                              />
                              <InputError message={errors.max_attempts} />
                           </div>

                           <div>
                              <Label>Total Marks *</Label>
                              <Input
                                 type="number"
                                 name="total_marks"
                                 placeholder="100"
                                 min="1"
                              />
                              <InputError message={errors.total_marks} />
                           </div>
                        </div>

                        <div>
                           <Label>Pricing Type *</Label>
                           <RadioGroup
                              name="pricing_type"
                              defaultValue="paid"
                              className="flex items-center space-x-4 pt-2 pb-1"
                              onValueChange={(value) =>
                                 setData('pricing_type', value)
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
                                       <Label htmlFor="price">Price *</Label>
                                       <Input
                                          type="number"
                                          name="price"
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
                                                setData(
                                                   'discount',
                                                   checked === true,
                                                );
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
                        </div>

                        <div>
                           <Label>{input.expiry_period_type}</Label>
                           <RadioGroup
                              name="expiry_type"
                              defaultValue="lifetime"
                              className="flex items-center space-x-4 pt-2 pb-1"
                              onValueChange={(value) =>
                                 setData('expiry_type', value)
                              }
                           >
                              {expiryTypes.map((expiry) => (
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

                           <Accordion
                              collapsible
                              type="single"
                              value={data.expiry_type}
                           >
                              <AccordionItem
                                 value="limited_time"
                                 className="border-none"
                              >
                                 <AccordionContent className="space-y-4 p-0.5">
                                    <div className="pt-3">
                                       <Label htmlFor="expiry_duration">
                                          Expiry Duration
                                       </Label>
                                       <Combobox
                                          defaultValue={data.expiry_duration}
                                          data={courseDurations}
                                          placeholder={'Select duration'}
                                          onSelect={(selected) =>
                                             setData(
                                                'expiry_duration',
                                                selected.value,
                                             )
                                          }
                                       />
                                       <InputError
                                          message={errors.expiry_duration}
                                       />
                                    </div>
                                 </AccordionContent>
                              </AccordionItem>
                           </Accordion>
                        </div>

                        <div>
                           <Label htmlFor="thumbnail">Thumbnail</Label>
                           <Input type="file" name="thumbnail" />
                           <InputError message={errors.thumbnail} />
                        </div>
                     </div>

                     <div className="col-span-full pt-2">
                        <LoadingButton
                           loading={processing}
                           className="float-end"
                        >
                           Create Exam
                        </LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </Card>
      </>
   );
};

CreateExam.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default CreateExam;

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
import { Button } from '@/components/ui/button';
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
import courseLanguages from '@/data/course-languages';
import { useAuth } from '@/hooks/use-auth';
import { usePlugin } from '@/hooks/use-plugin';
import DashboardLayout from '@/layouts/dashboard/layout';
import { store } from '@/routes/courses';
import { Form, useForm } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import CourseAiGeneratePanel from './partials/course-ai-generate-panel';

const Index = (props: CourseCreateProps) => {
   const { translate } = props;
   const { input, button, common } = translate;
   const user = props.auth.user;
   const {
      labels,
      prices,
      expiries,
      categories,
      instructors,
      system,
      aiInstructorId,
   } = props;
   const inputLang = input as unknown as Record<string, string>;
   const { isAdmin } = useAuth();

   const { data, setData, reset } = useForm({
      status: 'draft',
      description: '',
      pricing_type: 'paid',
      discount: false,
      expiry_type: 'lifetime',
      course_category_id: '',
      course_category_child_id: '',
   });

   const defaultInstructorId =
      isAdmin && system.sub_type === 'collaborative'
         ? ''
         : user.instructor_id?.toString();

   const transformedCategories = useMemo(() => {
      return categories.flatMap((category) => {
         // Parent categories
         const categoryItem = {
            label: category.title,
            value: category.title,
            id: category.id,
            child_id: '',
         };

         // Child categories
         const childItems =
            category.category_children?.map((child) => ({
               label: `--${child.title}`,
               value: child.title,
               id: child.course_category_id,
               child_id: child.id,
            })) || [];

         return [categoryItem, ...childItems]; // Combine parent + children
      });
   }, [categories]);

   const transformedInstructors = instructors.map((instructor) => ({
      label: instructor.user.name,
      value: instructor.id.toString(),
   }));

   return (
      <>
         <Breadcrumbs
            title="Create Course"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Create New Course' },
            ]}
            action={
               usePlugin('AIAssistant') && (
                  <CourseAiGeneratePanel
                     title="Generate Course with AI"
                     description="Describe your course, choose how many sections, lessons, FAQs, requirements, and outcomes to create, then generate everything in one flow."
                     actionUrl="/dashboard/courses/ai/generate"
                     extraData={{
                        instructor_id:
                           aiInstructorId ?? user.instructor_id ?? undefined,
                     }}
                     categoryLabel={input.category}
                     categoryPlaceholder={input.category_placeholder}
                     languageLabel={input.course_language}
                     languagePlaceholder="Select Course Language"
                     categoryData={transformedCategories}
                     languageData={courseLanguages}
                     handler={
                        <Button
                           type="button"
                           variant="outline"
                           className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950/30"
                        >
                           <Bot className="h-4 w-4" />
                           Generate with AI
                        </Button>
                     }
                  />
               )
            }
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
                                 <Label>{input.title} *</Label>
                                 <Input
                                    name="title"
                                    placeholder={input.title_placeholder}
                                 />
                                 <InputError message={errors.title} />
                              </div>

                              <div>
                                 <Label>{input.short_description}</Label>
                                 <Textarea
                                    rows={5}
                                    name="short_description"
                                    placeholder={
                                       input.short_description_placeholder
                                    }
                                 />
                                 <InputError
                                    message={errors.short_description}
                                 />
                              </div>

                              <div>
                                 <Label>{input.description}</Label>
                                 <Editor
                                    ssr={true}
                                    output="html"
                                    placeholder={{
                                       paragraph: input.description_placeholder,
                                       imageCaption:
                                          input.description_placeholder,
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
                                       {input.course_instructor} *
                                    </Label>
                                    <Combobox
                                       name="instructor_id"
                                       defaultValue={defaultInstructorId}
                                       data={transformedInstructors || []}
                                       placeholder={input.course_instructor}
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

                              <div className="grid gap-6 md:grid-cols-2">
                                 <div>
                                    <Label htmlFor="course_category_id">
                                       {input.category} *
                                    </Label>
                                    <Combobox
                                       name="course_category_id"
                                       data={transformedCategories}
                                       placeholder={input.category_placeholder}
                                       onSelect={(selected) => {
                                          setData(
                                             'course_category_id',
                                             selected.id as string,
                                          );
                                          setData(
                                             'course_category_child_id',
                                             selected.child_id as string,
                                          );
                                       }}
                                    />
                                    <InputError
                                       message={errors.course_category_id}
                                    />
                                 </div>

                                 <div>
                                    <Label htmlFor="level">
                                       {input.course_level} *
                                    </Label>
                                    <Select name="level">
                                       <SelectTrigger>
                                          <SelectValue
                                             placeholder={
                                                input.course_level_placeholder
                                             }
                                          />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {labels.map((label) => (
                                             <SelectItem
                                                key={label}
                                                value={label}
                                             >
                                                {label}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                    <InputError message={errors.level} />
                                 </div>
                              </div>

                              <div>
                                 <Label>{input.course_language} *</Label>
                                 <Combobox
                                    name="language"
                                    data={courseLanguages}
                                    placeholder={
                                       input.course_language_placeholder
                                    }
                                    onSelect={() => null}
                                 />
                                 <InputError message={errors.language} />
                              </div>

                              <div>
                                 <Label>{input.pricing_type} *</Label>
                                 <RadioGroup
                                    name="pricing_type"
                                    defaultValue={data.pricing_type}
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
                                       value={prices[1]}
                                       className="border-none"
                                    >
                                       <AccordionContent className="space-y-4 p-0.5">
                                          <div className="pt-3">
                                             <Label htmlFor="price">
                                                {input.price} *
                                             </Label>
                                             <Input
                                                type="number"
                                                name="price"
                                                placeholder={
                                                   input.course_price_placeholder
                                                }
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
                                                      placeholder={
                                                         input.discount_price_placeholder
                                                      }
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
                                 <Label>{input.expiry_period_type}</Label>
                                 <RadioGroup
                                    name="expiry_type"
                                    defaultValue={data.expiry_type}
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
                                       value={expiries[1]}
                                       className="border-none"
                                    >
                                       <AccordionContent className="space-y-4 p-0.5">
                                          <div className="pt-3">
                                             <Label htmlFor="expiry_duration">
                                                {inputLang.expiry_duration ??
                                                   'Expiry duration'}
                                             </Label>
                                             <Combobox
                                                name="expiry_duration"
                                                data={courseDurations}
                                                placeholder={
                                                   inputLang.expiry_duration_placeholder ||
                                                   'Select duration'
                                                }
                                                onSelect={() => null}
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
                                 <Label htmlFor="thumbnail">
                                    {input.thumbnail}
                                 </Label>
                                 <Input
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                 />
                                 <InputError message={errors.thumbnail} />
                              </div>

                              <div>
                                 <Label htmlFor="drip_content">
                                    {input.enable_drip_content} *
                                 </Label>
                                 <RadioGroup
                                    name="drip_content"
                                    defaultValue="0"
                                    className="flex items-center space-x-4 pt-2 pb-1"
                                 >
                                    <div className="flex items-center space-x-2">
                                       <RadioGroupItem
                                          className="cursor-pointer"
                                          id="off"
                                          value="0"
                                       />
                                       <Label htmlFor="off" className="mb-0">
                                          {common.off}
                                       </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                       <RadioGroupItem
                                          className="cursor-pointer"
                                          id="on"
                                          value="1"
                                       />
                                       <Label htmlFor="on" className="mb-0">
                                          {common.on}
                                       </Label>
                                    </div>
                                 </RadioGroup>
                                 <InputError message={errors.drip_content} />
                              </div>
                           </div>
                        </div>

                        <div className="col-span-2 mt-6 text-right">
                           <LoadingButton loading={processing}>
                              {button.create_course}
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

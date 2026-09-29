import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import courseLanguages from '@/data/course-languages';
import { usePlugin } from '@/hooks/use-plugin';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/courses';
import { Form, router, useForm, usePage } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import AiInlineEditModal from './ai-inline-edit-modal';

const Basic = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { tab, labels, categories, course, instructors, translate } = props;
   const { input, button, common } = translate;

   const { data, setData } = useForm({
      tab: tab,
      status: course.status,
      description: course.description,
      language: course.language,
      instructor_id: course.instructor_id,
      course_category_id: course.course_category_id,
      course_category_child_id: course.course_category_child_id,
   });

   const transformedCategories = useMemo(() => {
      return categories.flatMap((category) => {
         // Parent categories
         const categoryItem = {
            label: category.title,
            value: category.id,
            id: category.id,
            child_id: '',
         };

         // Child categories
         const childItems =
            category.category_children?.map((child) => ({
               label: `--${child.title}`,
               value: `--${child.id}`,
               id: child.course_category_id,
               child_id: child.id,
            })) || [];

         return [categoryItem, ...childItems]; // Combine parent + children
      });
   }, [categories]);

   const transformedInstructors = instructors?.map((instructor) => ({
      label: instructor.user.name,
      value: instructor.id,
   }));

   const getSelectedCategory = () => {
      if (data.course_category_child_id) {
         return `--${data.course_category_child_id}`;
      } else {
         return data.course_category_id;
      }
   };

   return (
      <Card className="container p-4 sm:p-6">
         <div className="mb-4 flex items-center justify-end">
            {usePlugin('AIAssistant') && (
               <AiInlineEditModal
                  title="Edit Basic Info with AI"
                  description="Describe what you want to change — e.g. 'Rewrite the title to be more compelling' or 'Make the description more detailed and add an HTML bullet list'."
                  actionUrl={`/dashboard/courses/ai/${course.id}/edit`}
                  onSuccess={() => router.reload({ preserveScroll: true })}
                  options={{ tab: 'basic' }}
                  handler={
                     <Button
                        type="button"
                        variant="outline"
                        className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950/30"
                     >
                        <Bot className="h-4 w-4" />
                        Edit with AI
                     </Button>
                  }
               />
            )}
         </div>

         <Form
            {...update.form({ id: course.id })}
            options={{ preserveScroll: true }}
            transform={(formData) => ({
               ...formData,
               ...data,
               drip_content: formData.drip_content === 'enable' ? true : false,
            })}
         >
            {({ processing, errors }) => {
               return (
                  <div className="space-y-4">
                     <div>
                        <Label>{input.title} *</Label>
                        <Input
                           name="title"
                           defaultValue={course.title}
                           placeholder={input.title_placeholder}
                        />
                        <InputError message={errors.title} />
                     </div>

                     <div>
                        <Label>{input.short_description}</Label>
                        <Textarea
                           rows={5}
                           name="short_description"
                           defaultValue={course.short_description}
                           placeholder={input.short_description_placeholder}
                        />
                        <InputError message={errors.short_description} />
                     </div>

                     <div>
                        <Label>{input.description}</Label>
                        <Editor
                           ssr={true}
                           output="html"
                           placeholder={{
                              paragraph: input.description_placeholder,
                              imageCaption: input.description_placeholder,
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

                     {/* {auth.user.role === 'admin' &&
                        system.sub_type === 'collaborative' && (
                           <div>
                              <Label>{input.course_instructor} *</Label>
                              <Combobox
                                 data={transformedInstructors || []}
                                 defaultValue={data.instructor_id}
                                 placeholder={input.instructor_placeholder}
                                 onSelect={(selected) =>
                                    setData('instructor_id', selected.value)
                                 }
                              />
                              <InputError message={errors.instructor_id} />
                           </div>
                        )} */}

                     <div className="grid gap-6 md:grid-cols-2">
                        <div>
                           <Label htmlFor="course_category_id">
                              {input.category} *
                           </Label>
                           <Combobox
                              data={transformedCategories}
                              placeholder={input.category_placeholder}
                              defaultValue={getSelectedCategory()}
                              onSelect={(selected) => {
                                 setData('course_category_id', selected.id);
                                 setData(
                                    'course_category_child_id',
                                    selected.child_id,
                                 );
                              }}
                           />
                           <InputError message={errors.course_category_id} />
                        </div>

                        <div>
                           <Label>{input.course_level} *</Label>
                           <Select name="level" defaultValue={course.level}>
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder={input.course_level_placeholder}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 {labels.map((label) => (
                                    <SelectItem
                                       key={label}
                                       value={label}
                                       className="capitalize"
                                    >
                                       {label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.level} />
                        </div>

                        <div>
                           <Label>{input.course_language} *</Label>
                           <Combobox
                              data={courseLanguages}
                              defaultValue={data.language}
                              placeholder={input.course_language_placeholder}
                              onSelect={(selected) =>
                                 setData('language', selected.value)
                              }
                           />
                           <InputError message={errors.language} />
                        </div>

                        <div>
                           <Label>{input.enable_drip_content}</Label>
                           <RadioGroup
                              name="drip_content"
                              defaultValue={
                                 course.drip_content ? 'enable' : 'disable'
                              }
                              className="flex items-center space-x-4 pt-2"
                           >
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem
                                    id="enable"
                                    value="enable"
                                    className="cursor-pointer"
                                 />
                                 <Label htmlFor="enable" className="mb-0">
                                    {common.enabled}
                                 </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem
                                    id="disable"
                                    value="disable"
                                    className="cursor-pointer"
                                 />
                                 <Label htmlFor="disable" className="mb-0">
                                    {common.disabled}
                                 </Label>
                              </div>
                           </RadioGroup>
                           <InputError message={errors.drip_content} />
                        </div>
                     </div>

                     <LoadingButton
                        loading={processing}
                        className="float-end mt-4"
                     >
                        {button.save_changes}
                     </LoadingButton>
                  </div>
               );
            }}
         </Form>
      </Card>
   );
};

Basic.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Basic;

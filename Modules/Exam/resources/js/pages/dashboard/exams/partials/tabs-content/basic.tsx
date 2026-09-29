import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/exams';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const Basic = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { auth, system, tab, categories, exam, instructors } = props;

   const { data, setData } = useForm({
      description: exam.description || '',
      instructorId: exam.instructor_id?.toString() || '',
      examCategoryId: exam.exam_category_id?.toString() || '',
   });
   const transformedCategories = useMemo(() => {
      return categories.map((category) => ({
         label: category.title,
         value: category.id.toString(),
      }));
   }, [categories]);

   const transformedInstructors = instructors?.map((instructor) => ({
      label: instructor.user.name,
      value: instructor.id.toString(),
   }));

   const levels = ['beginner', 'intermediate', 'advanced'];
   const statuses = ['draft', 'published', 'archived'];

   const selectedCategory = categories.find(
      (cat) => cat.id.toString() === data.examCategoryId,
   );

   //    let selectedCategory: any;
   // categories.map((category) => {
   //    if (course.course_category_child_id) {
   //       category.category_children?.map((child) => {
   //          if (child.id === data.course_category_child_id) {
   //             selectedCategory = child;
   //             return;
   //          }
   //       });
   //    } else {
   //       if (category.id === data.course_category_id) {
   //          selectedCategory = category;
   //          return;
   //       }
   //    }
   // });

   //    let selectedCategory: any;
   // categories.map((category) => {
   //    if (course.course_category_child_id) {
   //       category.category_children?.map((child) => {
   //          if (child.id === data.course_category_child_id) {
   //             selectedCategory = child;
   //             return;
   //          }
   //       });
   //    } else {
   //       if (category.id === data.course_category_id) {
   //          selectedCategory = category;
   //          return;
   //       }
   //    }
   // });

   return (
      <Card className="container p-4 sm:p-6">
         <Form
            {...update.form(Number(exam.id))}
            transform={(formData) => ({
               ...formData,
               tab,
               description: data.description,
               exam_category_id: data.examCategoryId,
               ...(auth.user.role === 'admin' &&
               system.sub_type === 'collaborative'
                  ? { instructor_id: data.instructorId }
                  : {}),
            })}
            options={{ preserveScroll: true }}
            className="space-y-4"
         >
            {({ errors, processing }) => (
               <>
                  <div>
                     <Label>Exam Title *</Label>
                     <Input
                        name="title"
                        defaultValue={exam.title || ''}
                        placeholder="Enter exam title"
                     />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>Short Description</Label>
                     <Textarea
                        rows={5}
                        name="short_description"
                        defaultValue={exam.short_description || ''}
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
                           paragraph: 'Enter detailed exam description...',
                           imageCaption: 'Enter detailed exam description...',
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

                  {auth.user.role === 'admin' &&
                     system.sub_type === 'collaborative' && (
                        <div>
                           <Label>Exam Instructor *</Label>
                           <Combobox
                              defaultValue={data.instructorId}
                              data={transformedInstructors || []}
                              placeholder="Select instructor"
                              onSelect={(selected) =>
                                 setData(
                                    'instructorId',
                                    selected.value as string,
                                 )
                              }
                           />
                           <InputError message={errors.instructor_id} />
                        </div>
                     )}

                  <div className="grid gap-6 md:grid-cols-2">
                     <div>
                        <Label>Category *</Label>
                        <Combobox
                           data={transformedCategories}
                           placeholder="Select category"
                           defaultValue={selectedCategory?.id.toString() || ''}
                           onSelect={(selected) => {
                              setData(
                                 'examCategoryId',
                                 selected.value as string,
                              );
                           }}
                        />
                        <InputError message={errors.exam_category_id} />
                     </div>

                     <div>
                        <Label>Difficulty Level *</Label>
                        <Select name="level" defaultValue={exam.level || ''}>
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

                     <div>
                        <Label>Status *</Label>
                        <Select
                           name="status"
                           defaultValue={exam.status || 'draft'}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                           </SelectTrigger>
                           <SelectContent>
                              {statuses.map((status) => (
                                 <SelectItem
                                    key={status}
                                    value={status}
                                    className="capitalize"
                                 >
                                    {status}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                     </div>
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

export default Basic;

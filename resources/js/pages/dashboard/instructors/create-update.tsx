import { Form } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TagInput from '@/components/tag-input';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { store, update } from '@/routes/become-instructor';

interface Props extends SharedData {
   users?: User[];
   instructor?: Instructor;
}

function parseInstructorSkills(
   skills: Instructor['skills'] | undefined,
): string[] {
   if (!skills) {
      return [];
   }

   try {
      const parsed = JSON.parse(skills) as unknown;

      return Array.isArray(parsed) ? parsed.map(String) : [];
   } catch {
      return [];
   }
}

const CreateUpdate = ({ instructor, users, translate }: Props) => {
   const { dashboard, input, button } = translate;

   const initialSkills = parseInstructorSkills(instructor?.skills);

   const [data, setData] = useState({
      user_id: instructor?.user_id?.toString() ?? '',
      skills: initialSkills,
   });

   const [createFormKey, setCreateFormKey] = useState(0);

   const formDefinition = instructor
      ? update.form(instructor.id)
      : store.form();

   const formKey = instructor
      ? `edit-${instructor.id}-${instructor.updated_at ?? ''}`
      : `create-${createFormKey}`;

   const userOptions = (users ?? []).map((user) => ({
      value: user.id.toString(),
      label: user.name,
   }));

   return (
      <>
         <Breadcrumbs
            title={instructor ? 'Edit Instructor' : 'Create Instructor'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Instructors', href: '/dashboard/instructors' },
               { title: instructor ? 'Edit' : 'Create' },
            ]}
            className="mb-4"
         />

         <Card className="p-4 sm:p-6">
            <Form
               key={formKey}
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  skills: data.skills,
                  ...(!instructor ? { user_id: data.user_id } : {}),
               })}
               options={{ preserveScroll: true }}
               onSuccess={() => {
                  if (!instructor) {
                     setCreateFormKey((k) => k + 1);
                     setData({ user_id: '', skills: [] });
                  }
               }}
               className="relative space-y-4"
            >
               {({ errors, processing }) => (
                  <>
                     {instructor ? (
                        <div>
                           <Label>{dashboard.course_instructor}</Label>
                           <Input
                              readOnly
                              value={instructor.user?.name ?? ''}
                              className="bg-muted"
                           />
                        </div>
                     ) : (
                        <div>
                           <Label>{dashboard.course_instructor} *</Label>
                           <Combobox
                              data={userOptions}
                              defaultValue={data.user_id}
                              placeholder={input.select}
                              onSelect={(selected) =>
                                 setData((prev) => ({
                                    ...prev,
                                    user_id: selected.value,
                                 }))
                              }
                           />
                           <InputError message={errors.user_id} />
                        </div>
                     )}

                     <div>
                        <Label>{input.designation}</Label>
                        <Input
                           type="text"
                           name="designation"
                           defaultValue={instructor?.designation ?? ''}
                           placeholder={input.designation_placeholder}
                        />
                        <InputError message={errors.designation} />
                     </div>

                     <div>
                        <Label>{input.resume}</Label>
                        <Input type="file" name="resume" />
                        <InputError message={errors.resume} />
                     </div>

                     <div>
                        <Label>{input.skills}</Label>
                        <TagInput
                           defaultTags={data.skills}
                           placeholder={input.skills}
                           onChange={(values: string[]) =>
                              setData((prev) => ({ ...prev, skills: values }))
                           }
                        />
                        <InputError message={errors.skills} />
                     </div>

                     <div className="pb-3">
                        <Label>{input.biography}</Label>
                        <Textarea
                           rows={5}
                           required
                           name="biography"
                           defaultValue={instructor?.biography ?? ''}
                           placeholder={input.biography_placeholder}
                        />
                        <InputError message={errors.biography} />
                     </div>

                     <LoadingButton loading={processing}>
                        {instructor ? button.update : button.submit}
                     </LoadingButton>
                  </>
               )}
            </Form>
         </Card>
      </>
   );
};

CreateUpdate.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default CreateUpdate;

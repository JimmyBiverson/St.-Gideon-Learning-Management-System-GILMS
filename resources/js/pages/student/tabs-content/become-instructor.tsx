import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TagInput from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { store, update } from '@/routes/become-instructor';

const BecomeInstructor = () => {
   const { auth, instructor, translate } =
      usePage<StudentDashboardProps>().props;
   const { button, input, frontend } = translate;
   const [isEditing, setIsEditing] = useState(instructor ? false : true);

   const initialSkills = instructor?.skills
      ? typeof instructor.skills === 'string'
         ? (JSON.parse(instructor.skills) as string[])
         : instructor.skills
      : [];

   const { data, setData } = useForm({ skills: initialSkills });

   const formDefinition = instructor
      ? update.form({ id: instructor.id })
      : store.form();

   return (
      <Card className="p-4 sm:p-6">
         {!isEditing ? (
            <div className="space-y-6 text-center">
               {instructor.status === 'rejected' ? (
                  <>
                     <p className="text-red-600">
                        {frontend.application_rejected}
                     </p>

                     <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        variant="destructive"
                        className="text-primary-foreground capitalize"
                     >
                        Reapply
                     </Button>
                  </>
               ) : (
                  <>
                     <p>{frontend.application_under_review}</p>

                     <Button type="button" className="capitalize">
                        {frontend.application_status}: {instructor.status}
                     </Button>
                  </>
               )}
            </div>
         ) : (
            <Form
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  user_id: auth.user.id,
                  skills: data.skills,
               })}
               encType="multipart/form-data"
               options={{ preserveScroll: true }}
            >
               {({ errors, processing }) => (
                  <div className="relative space-y-4">
                     <div>
                        <Label htmlFor="designation">{input.designation}</Label>
                        <Input
                           id="designation"
                           type="text"
                           name="designation"
                           defaultValue={instructor?.designation || ''}
                           placeholder={input.designation_placeholder}
                        />
                        <InputError message={errors.designation} />
                     </div>

                     <div>
                        <Label htmlFor="resume">{input.resume}</Label>
                        <Input
                           id="resume"
                           type="file"
                           name="resume"
                           accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <InputError message={errors.resume} />
                     </div>

                     <div>
                        <Label>{input.skills}</Label>
                        <TagInput
                           defaultTags={initialSkills}
                           placeholder={input.skills_tag_placeholder}
                           onChange={(values: string[]) =>
                              setData('skills', values)
                           }
                        />
                        <InputError message={errors.skills} />
                     </div>

                     <div className="pb-3">
                        <Label htmlFor="biography">{input.biography}</Label>
                        <Textarea
                           id="biography"
                           rows={5}
                           required
                           name="biography"
                           defaultValue={instructor?.biography || ''}
                           placeholder={input.biography_placeholder}
                        />
                        <InputError message={errors.biography} />
                     </div>

                     <LoadingButton
                        type="submit"
                        loading={processing}
                        className="mt-2"
                     >
                        {instructor ? button.submit : button.update}
                     </LoadingButton>
                  </div>
               )}
            </Form>
         )}
      </Card>
   );
};

export default BecomeInstructor;

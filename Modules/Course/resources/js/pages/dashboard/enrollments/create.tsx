import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/layouts/dashboard/layout';
import { store } from '@/routes/course-enrollments';
import { Form, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface Props extends SharedData {
   users: User[];
   courses: Course[];
   prices: string[];
}

const Index = (props: Props) => {
   const { users, courses, prices, translate } = props;
   const { input, button } = translate;

   const { data, setData } = useForm({
      user_id: '',
      course_id: '',
      enrollment_type: 'free',
   });

   const transformedUsers = users.map((user) => ({
      label: user.name,
      value: user.id.toString(),
   }));

   const transformedCourses = courses.map((course) => ({
      label: course.title,
      value: course.id.toString(),
   }));

   return (
      <Card className="mx-auto max-w-2xl p-6">
         <Form {...store.form()} transform={() => data} className="space-y-6">
            {({ errors, processing }) => (
               <>
                  <div>
                     <Label>{input.select}</Label>
                     <Combobox
                        data={transformedUsers}
                        defaultValue={data.user_id}
                        placeholder={input.select}
                        onSelect={(selected) =>
                           setData('user_id', selected.value)
                        }
                     />
                     <InputError message={errors.user_id} />
                  </div>

                  <div>
                     <Label>{input.select || 'Select Course'}</Label>
                     <Combobox
                        data={transformedCourses}
                        defaultValue={data.course_id}
                        placeholder={input.select_course_placeholder}
                        onSelect={(selected) =>
                           setData('course_id', selected.value)
                        }
                     />
                     <InputError message={errors.course_id} />
                  </div>

                  <div>
                     <Label>{input.enrollment_type}</Label>
                     <RadioGroup
                        defaultValue={data.enrollment_type}
                        className="flex items-center space-x-4 pt-2 pb-1"
                        onValueChange={(value) =>
                           setData('enrollment_type', value)
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
                                 className="mt-0 capitalize"
                              >
                                 {price}
                              </Label>
                           </div>
                        ))}
                     </RadioGroup>
                     <InputError message={errors.enrollment_type} />
                  </div>

                  <div className="col-span-2 mt-6 text-right">
                     <LoadingButton loading={processing}>
                        {button.submit}
                     </LoadingButton>
                  </div>
               </>
            )}
         </Form>
      </Card>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;

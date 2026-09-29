import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/courses';
import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

const SEO = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;
   const { tab, course } = props;

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form({ id: course.id })}
            options={{ preserveScroll: true }}
         >
            {({ processing, errors }) => (
               <div className="space-y-4">
                  <input type="hidden" name="tab" value={tab} />

                  <div>
                     <Label>{dashboard.meta_title}</Label>
                     <Input
                        name="meta_title"
                        defaultValue={course.meta_title}
                        placeholder={input.meta_title}
                     />
                     <InputError message={errors.meta_title} />
                  </div>

                  <div>
                     <Label>{dashboard.meta_keywords}</Label>
                     <Textarea
                        rows={3}
                        name="meta_keywords"
                        defaultValue={course.meta_keywords}
                        placeholder={input.meta_keywords}
                     />
                     <InputError message={errors.meta_keywords} />
                  </div>

                  <div>
                     <Label>{dashboard.meta_description}</Label>
                     <Textarea
                        rows={3}
                        name="meta_description"
                        defaultValue={course.meta_description}
                        placeholder={input.meta_description}
                     />
                     <InputError message={errors.meta_description} />
                  </div>

                  <div>
                     <Label>{dashboard.og_title}</Label>
                     <Input
                        name="og_title"
                        defaultValue={course.og_title}
                        placeholder={input.og_title}
                     />
                     <InputError message={errors.og_title} />
                  </div>

                  <div>
                     <Label>{dashboard.og_description}</Label>
                     <Textarea
                        rows={3}
                        name="og_description"
                        defaultValue={course.og_description}
                        placeholder={input.og_description}
                     />
                     <InputError message={errors.og_description} />
                  </div>

                  <LoadingButton
                     loading={processing}
                     className="float-end mt-4"
                  >
                     {button.save_changes}
                  </LoadingButton>
               </div>
            )}
         </Form>
      </Card>
   );
};

SEO.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SEO;

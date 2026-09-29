import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/exams';
import { Form, usePage } from '@inertiajs/react';

const SEO = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { tab, exam } = props;

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form(Number(exam.id))}
            transform={(formData) => ({
               ...formData,
               tab,
            })}
            options={{ preserveScroll: true }}
            className="space-y-4"
         >
            {({ errors, processing }) => (
               <>
                  <div>
                     <Label>Meta Title</Label>
                     <Input
                        name="meta_title"
                        defaultValue={exam.meta_title || ''}
                        placeholder="Enter meta title for SEO"
                     />
                     <InputError message={errors.meta_title} />
                  </div>

                  <div>
                     <Label>Meta Keywords</Label>
                     <Textarea
                        rows={3}
                        name="meta_keywords"
                        defaultValue={exam.meta_keywords || ''}
                        placeholder="Enter meta keywords separated by commas"
                     />
                     <InputError message={errors.meta_keywords} />
                  </div>

                  <div>
                     <Label>Meta Description</Label>
                     <Textarea
                        rows={3}
                        name="meta_description"
                        defaultValue={exam.meta_description || ''}
                        placeholder="Enter meta description for search engines"
                     />
                     <InputError message={errors.meta_description} />
                  </div>

                  <div>
                     <Label>OG Title</Label>
                     <Input
                        name="og_title"
                        defaultValue={exam.og_title || ''}
                        placeholder="Enter Open Graph title"
                     />
                     <InputError message={errors.og_title} />
                  </div>

                  <div>
                     <Label>OG Description</Label>
                     <Textarea
                        rows={3}
                        name="og_description"
                        defaultValue={exam.og_description || ''}
                        placeholder="Enter Open Graph description for social media"
                     />
                     <InputError message={errors.og_description} />
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

export default SEO;

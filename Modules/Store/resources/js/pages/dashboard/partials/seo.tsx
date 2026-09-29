import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/products';
import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

const SEO = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { tab, product } = props;

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form({ id: product.id })}
            options={{ preserveScroll: true }}
         >
            {({ processing, errors }) => (
               <div className="space-y-4">
                  <input type="hidden" name="tab" value={tab} />

                  <div>
                     <Label>Meta Title</Label>
                     <Input
                        name="meta_title"
                        defaultValue={product.meta_title}
                        placeholder="Meta title"
                     />
                     <InputError message={errors.meta_title} />
                  </div>

                  <div>
                     <Label>Meta Keywords</Label>
                     <Textarea
                        rows={3}
                        name="meta_keywords"
                        defaultValue={product.meta_keywords}
                        placeholder="Comma separated keywords"
                     />
                     <InputError message={errors.meta_keywords} />
                  </div>

                  <div>
                     <Label>Meta Description</Label>
                     <Textarea
                        rows={3}
                        name="meta_description"
                        defaultValue={product.meta_description}
                        placeholder="Meta description"
                     />
                     <InputError message={errors.meta_description} />
                  </div>

                  <div>
                     <Label>OG Title</Label>
                     <Input
                        name="og_title"
                        defaultValue={product.og_title}
                        placeholder="Open Graph title"
                     />
                     <InputError message={errors.og_title} />
                  </div>

                  <div>
                     <Label>OG Description</Label>
                     <Textarea
                        rows={3}
                        name="og_description"
                        defaultValue={product.og_description}
                        placeholder="Open Graph description"
                     />
                     <InputError message={errors.og_description} />
                  </div>

                  <LoadingButton
                     loading={processing}
                     className="float-end mt-4"
                  >
                     Save Changes
                  </LoadingButton>
               </div>
            )}
         </Form>
      </Card>
   );
};

SEO.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SEO;

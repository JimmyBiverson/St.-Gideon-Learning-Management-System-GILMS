import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import InputError from '@/components/input-error';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/custom-page';
import { index } from '@/routes/pages';

interface Props extends SharedData {
   page: Page;
}

const Update = ({ page }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, common, button } = translate;

   const [description, setDescription] = useState(page.description);

   return (
      <>
         <Breadcrumbs
            title={settings.edit_custom_page}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Page Settings', href: index.url() },
               { title: 'Edit' },
            ]}
            className="mb-4"
         />

         <div className="container mx-auto space-y-10 px-4 py-6">
            <Card className="p-4 sm:p-6">
               <Form
                  {...update.form(page.id)}
                  transform={(formData) => ({
                     ...formData,
                     description,
                  })}
                  options={{ preserveScroll: true }}
                  className="space-y-4"
               >
                  {({ processing, errors }) => (
                     <>
                        <div>
                           <Label>{common.title}</Label>
                           <Input
                              name="title"
                              defaultValue={page.title}
                              placeholder={input.page_title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>

                        <div>
                           <Label>{common.description}</Label>
                           <Editor
                              ssr={true}
                              output="html"
                              placeholder={{
                                 paragraph: input.description,
                                 imageCaption: input.description_placeholder,
                              }}
                              contentMinHeight={256}
                              contentMaxHeight={640}
                              initialContent={description}
                              onContentChange={(value) =>
                                 setDescription(value as string)
                              }
                           />
                           <InputError message={errors.description} />
                        </div>

                        <div>
                           <Label>{input.meta_description}</Label>
                           <Textarea
                              rows={3}
                              name="meta_description"
                              defaultValue={page.meta_description}
                              placeholder={input.meta_description_placeholder}
                           />
                           <InputError message={errors.meta_description} />
                        </div>

                        <div>
                           <Label>{input.meta_keywords}</Label>
                           <Input
                              name="meta_keywords"
                              defaultValue={page.meta_keywords}
                              placeholder={input.meta_keywords_placeholder}
                           />
                           <InputError message={errors.meta_keywords} />
                        </div>

                        <div>
                           <Label htmlFor="active">{common.active}</Label>
                           <RadioGroup
                              id="active"
                              name="active"
                              defaultChecked={page.active}
                              className="flex items-center space-x-4 pt-2 pb-1"
                           >
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem
                                    className="cursor-pointer"
                                    id="off"
                                    value="off"
                                 />
                                 <Label htmlFor="off" className="mb-0">
                                    {common.off}
                                 </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem
                                    className="cursor-pointer"
                                    id="on"
                                    value="on"
                                 />
                                 <Label htmlFor="on" className="mb-0">
                                    {common.on}
                                 </Label>
                              </div>
                           </RadioGroup>
                           <InputError message={errors.active} />
                        </div>

                        <div>
                           <Button type="submit" disabled={processing}>
                              {processing ? button.saving : button.save_changes}
                           </Button>
                        </div>
                     </>
                  )}
               </Form>
            </Card>
         </div>
      </>
   );
};

Update.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default Update;

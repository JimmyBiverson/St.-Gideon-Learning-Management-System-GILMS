import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/custom-page';

interface Props {
   title: string;
   actionComponent: React.ReactNode;
}

const CustomPageCreateForm = ({ title, actionComponent }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { input, button, common } = translate;
   const [open, setOpen] = useState(false);
   const { data, setData } = useForm({ description: '', active: true });

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{actionComponent}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  {...store.form()}
                  transform={(formData) => ({
                     ...formData,
                     description: data.description,
                     active: data.active,
                  })}
                  options={{ preserveScroll: true }}
                  onSuccess={() => {
                     setData({ description: '', active: true });
                     setOpen(false);
                  }}
                  className="space-y-4"
               >
                  {({ processing, errors }) => (
                     <>
                        <div>
                           <Label>{common.name}</Label>
                           <Input
                              name="name"
                              defaultValue=""
                              placeholder={input.page_name_placeholder}
                           />
                           <InputError message={errors.name} />
                        </div>

                        <div>
                           <Label>{input.slug}</Label>
                           <Input
                              name="slug"
                              defaultValue=""
                              placeholder={input.page_slug_placeholder}
                           />
                           <InputError message={errors.slug} />
                        </div>

                        <div>
                           <Label>{common.title}</Label>
                           <Input
                              name="title"
                              defaultValue=""
                              placeholder={input.page_title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>

                        <div>
                           <Label>{input.page_contents}</Label>
                           <Editor
                              ssr={false}
                              output="html"
                              placeholder={{
                                 paragraph: input.description_placeholder,
                                 imageCaption: input.image_url_placeholder,
                              }}
                              contentMaxHeight={640}
                              initialContent={data.description}
                              onContentChange={(value) =>
                                 setData('description', value as string)
                              }
                           />
                           <InputError message={errors.description} />
                        </div>

                        <div>
                           <Label>{input.meta_description}</Label>
                           <Textarea
                              rows={3}
                              name="meta_description"
                              defaultValue=""
                              placeholder={input.meta_description_placeholder}
                           />
                           <InputError message={errors.meta_description} />
                        </div>

                        <div>
                           <Label>{input.meta_keywords}</Label>
                           <Textarea
                              rows={2}
                              name="meta_keywords"
                              defaultValue=""
                              placeholder={input.meta_keywords_placeholder}
                           />
                           <InputError message={errors.meta_keywords} />
                        </div>

                        <div>
                           <Label>{common.status}</Label>
                           <RadioGroup
                              value={data.active ? 'on' : 'off'}
                              onValueChange={(value) =>
                                 setData('active', value === 'on')
                              }
                           >
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="off" id="off" />
                                 <Label htmlFor="off" className="mb-0">
                                    {common.off}
                                 </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem value="on" id="on" />
                                 <Label htmlFor="on" className="mb-0">
                                    {common.on}
                                 </Label>
                              </div>
                           </RadioGroup>
                           <InputError message={errors.active} />
                        </div>

                        <div className="flex justify-end gap-4">
                           <Button
                              variant="outline"
                              type="button"
                              onClick={() => setOpen(false)}
                           >
                              {button.cancel}
                           </Button>
                           <LoadingButton loading={processing} type="submit">
                              {button.submit}
                           </LoadingButton>
                        </div>
                     </>
                  )}
               </Form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default CustomPageCreateForm;

import { Form } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { store, update } from '@/routes/newsletters';

interface Props {
   title: string;
   handler: React.ReactNode;
   newsletter?: Newsletter;
   translate: LanguageTranslations;
}

const NewsletterForm = ({ title, newsletter, handler, translate }: Props) => {
   const [open, setOpen] = useState(false);
   const { input, button } = translate;

   const [description, setDescription] = useState(
      newsletter?.description ?? '',
   );

   const formDefinition = newsletter
      ? update.form.put(Number(newsletter.id))
      : store.form();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  key={newsletter?.id ?? 'create'}
                  {...formDefinition}
                  transform={(formData) => ({ ...formData, description })}
                  options={{ preserveScroll: true }}
                  onSuccess={() => setOpen(false)}
                  className="space-y-4 p-0.5"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{input.subject}</Label>
                           <Input
                              required
                              type="text"
                              name="subject"
                              defaultValue={newsletter?.subject ?? ''}
                              placeholder={input.subject}
                           />
                           <InputError message={errors.subject} />
                        </div>

                        <div>
                           <Label>{input.description}</Label>
                           <Editor
                              ssr={true}
                              output="html"
                              placeholder={{
                                 paragraph: input.description_placeholder,
                                 imageCaption: input.image_url_placeholder,
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

                        <DialogFooter className="flex justify-end space-x-2 pt-4">
                           <DialogClose asChild>
                              <Button type="button" variant="outline">
                                 {button.close}
                              </Button>
                           </DialogClose>

                           <LoadingButton loading={processing}>
                              {button.submit}
                           </LoadingButton>
                        </DialogFooter>
                     </>
                  )}
               </Form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default NewsletterForm;

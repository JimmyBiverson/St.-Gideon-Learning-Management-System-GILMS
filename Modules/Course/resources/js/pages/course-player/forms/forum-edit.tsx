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
import { update as forumUpdate } from '@/routes/course-forums';
import { Form, useForm, usePage } from '@inertiajs/react';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';

const ForumEdit = ({ forum }: { forum: CourseForum }) => {
   const [open, setOpen] = useState(false);
   const { data, setData } = useForm({ description: forum.description });
   const { props } = usePage();
   const { translate } = props as any;
   const { button, input, frontend } = translate;

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               size="sm"
               variant="ghost"
               className="w-full cursor-pointer justify-start px-2"
            >
               <SquarePen className="h-4 w-4" />
               <span>{button.edit}</span>
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>{frontend.edit_forum_question}</DialogTitle>
            </DialogHeader>

            <Form
               {...forumUpdate.form(forum.id)}
               transform={(data) => ({
                  ...data,
                  description: data.description,
               })}
               onSuccess={() => setOpen(false)}
               className="space-y-4 p-0.5"
            >
               {({ processing, errors }) => (
                  <>
                     <div>
                        <Label>{input.question_title}</Label>
                        <Input
                           required
                           type="text"
                           name="title"
                           defaultValue={forum.title}
                           placeholder={input.question_title_placeholder}
                        />
                        <InputError message={errors.title} />
                     </div>

                     <div>
                        <Label>{input.description}</Label>
                        <Editor
                           ssr={true}
                           output="html"
                           placeholder={{
                              paragraph: input.content_placeholder,
                              imageCaption: input.image_caption_placeholder,
                           }}
                           contentMinHeight={260}
                           contentMaxHeight={600}
                           initialContent={data.description}
                           onContentChange={(value) =>
                              setData('description', value as string)
                           }
                        />
                        <InputError message={errors.description} />
                     </div>

                     <DialogFooter>
                        <LoadingButton loading={processing}>
                           {button.update}
                        </LoadingButton>

                        <DialogClose asChild>
                           <Button variant="outline">{button.cancel}</Button>
                        </DialogClose>
                     </DialogFooter>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default ForumEdit;

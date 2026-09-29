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
import { Label } from '@/components/ui/label';
import {
   store as forumReplyStore,
   update as forumReplyUpdate,
} from '@/routes/course-forum-replies';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   user: User;
   forum: CourseForum;
   reply?: CourseForumReply;
   actionComponent: React.ReactNode;
}

const ForumReply = ({ user, forum, reply, actionComponent }: Props) => {
   const [open, setOpen] = useState(false);
   const { data, setData } = useForm({
      description: reply?.description ?? '',
   });
   const { props } = usePage();
   const { translate } = props as any;
   const { button, input, frontend } = translate;

   const formProps = reply
      ? forumReplyUpdate.form(reply.id)
      : forumReplyStore.form();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {reply ? button.edit : button.add} {frontend.forum_reply}
               </DialogTitle>
            </DialogHeader>

            <Form
               {...formProps}
               transform={(formData) => ({
                  ...formData,
                  description: data.description,
                  user_id: user.id,
                  course_id: forum.course_id,
                  course_forum_id: forum.id,
                  course_forum_user_id: forum.user_id,
               })}
               onSuccess={() => setOpen(false)}
               className="space-y-4 p-0.5"
            >
               {({ processing, errors }) => (
                  <>
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
                           {reply ? button.update : button.submit}
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

export default ForumReply;

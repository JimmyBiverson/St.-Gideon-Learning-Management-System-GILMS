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
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { details, update } from '@/routes/exams';
import { Form, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const ExamUpdateHeader = () => {
   const [open, setOpen] = useState(false);
   const { data, setData } = useForm({ feedback: '' });
   const { props } = usePage<ExamUpdateProps>();

   const user = props.auth.user;
   const { exam } = props;
   const statuses = ['draft', 'published', 'archived'].filter(
      (s) => s !== exam.status,
   );

   return (
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
         <Button>
            <Link href={details({ slug: exam.slug, id: exam.id })}>
               View Exam
            </Link>
         </Button>

         <Button
            className={cn(
               'capitalize',
               exam.status === 'published'
                  ? 'bg-green-500 hover:bg-green-600'
                  : exam.status === 'archived'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-500 hover:bg-gray-600',
            )}
            disabled
         >
            {exam.status}
         </Button>

         {user.role === 'instructor' && exam.status !== 'published' && (
            <Button
               onClick={() =>
                  router.post(update(exam.id), {
                     tab: 'status',
                     status: 'published',
                  })
               }
            >
               Submit for Review
            </Button>
         )}

         {user.role === 'admin' && (
            <Dialog
               open={open}
               onOpenChange={(next) => {
                  setOpen(next);

                  if (!next) {
                     setData('feedback', '');
                  }
               }}
            >
               <DialogTrigger asChild>
                  <Button className="capitalize">Change Status</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Change Exam Status</DialogTitle>
                  </DialogHeader>
                  <Form
                     {...update.form(exam.id)}
                     transform={(formData) => ({
                        ...formData,
                        tab: 'status',
                        feedback: data.feedback,
                     })}
                     options={{ preserveScroll: true }}
                     onSuccess={() => {
                        setData('feedback', '');
                        setOpen(false);
                     }}
                     className="space-y-4"
                  >
                     {({ errors, processing }) => (
                        <>
                           <div>
                              <Label>Status</Label>
                              <Select required name="status">
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {statuses.map((s) => (
                                       <SelectItem
                                          key={s}
                                          value={s}
                                          className="capitalize"
                                       >
                                          {s}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.status} />
                           </div>

                           <div className="pb-6">
                              <Label>
                                 Feedback{' '}
                                 <span className="text-gray-500">
                                    (Optional)
                                 </span>
                              </Label>
                              <Editor
                                 ssr={true}
                                 output="html"
                                 placeholder={{
                                    paragraph:
                                       'Enter feedback for instructor...',
                                    imageCaption: 'Enter image caption...',
                                 }}
                                 contentMinHeight={256}
                                 contentMaxHeight={640}
                                 initialContent={data.feedback}
                                 onContentChange={(value) =>
                                    setData('feedback', value as string)
                                 }
                              />
                              <InputError message={errors.feedback} />
                           </div>

                           <LoadingButton
                              loading={processing}
                              className="w-full"
                           >
                              Update Status
                           </LoadingButton>
                        </>
                     )}
                  </Form>
               </DialogContent>
            </Dialog>
         )}
      </div>
   );
};

export default ExamUpdateHeader;

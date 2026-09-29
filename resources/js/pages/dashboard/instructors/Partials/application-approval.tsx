import { Form, useForm, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
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
import { status as instructorStatus } from '@/routes/instructors';

interface Props {
   instructor: Instructor;
   actionComponent: ReactNode;
}

const ApplicationApproval = ({ instructor, actionComponent }: Props) => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { dashboard, input, button } = translate;

   const { data, setData } = useForm({ feedback: '' });

   const statuses = ['pending', 'approved', 'rejected'].filter(
      (status) => status !== instructor.status,
   );

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{dashboard.are_you_absolutely_sure}</DialogTitle>

               {/* add a form where admin can select status then write a feedback and submit */}
               <Form
                  {...instructorStatus.form(Number(instructor.id))}
                  transform={(formData) => ({
                     ...formData,
                     feedback: data.feedback,
                  })}
                  onSuccess={() => {
                     setData('feedback', '');
                     setOpen(false);
                  }}
                  resetOnSuccess={['status']}
                  className="space-y-4"
               >
                  {({ errors, processing }) => {
                     return (
                        <>
                           <div>
                              <Label>{dashboard.approval_status} *</Label>
                              <Select required name="status">
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select the approval status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {statuses.map((status) => (
                                       <SelectItem
                                          key={status}
                                          value={status}
                                          className="capitalize"
                                       >
                                          {status}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <InputError message={errors.status} />
                           </div>

                           <div className="pb-6">
                              <Label>{dashboard.feedback}</Label>
                              <Editor
                                 ssr={true}
                                 output="html"
                                 placeholder={{
                                    paragraph: input.description_placeholder,
                                    imageCaption: input.image_url_placeholder,
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
                              {button.submit}
                           </LoadingButton>
                        </>
                     );
                  }}
               </Form>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default ApplicationApproval;

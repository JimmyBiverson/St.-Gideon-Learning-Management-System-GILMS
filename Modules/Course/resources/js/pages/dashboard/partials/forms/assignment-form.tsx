import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { formatDateForLaravel } from '@/lib/date';
import { store, update } from '@/routes/assignments';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   assignment?: CourseAssignment;
   handler: React.ReactNode;
}

const AssignmentForm = ({ title, assignment, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;

   const { data, setData, reset } = useForm({
      summary: assignment?.summary ?? '',
      deadline: assignment?.deadline
         ? new Date(assignment.deadline)
         : new Date(),
      late_submission: assignment?.late_submission ?? false,
      late_deadline: assignment?.late_deadline
         ? new Date(assignment.late_deadline)
         : new Date(),
   });

   const formDefinition = assignment
      ? update.form(assignment.id)
      : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);
               reset();
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  key={formKey}
                  {...formDefinition}
                  transform={(formData) => ({
                     ...formData,
                     course_id: props.course.id,
                     summary: data.summary,
                     deadline: data.deadline
                        ? formatDateForLaravel(data.deadline)
                        : '',
                     late_submission: data.late_submission,
                     late_deadline: data.late_deadline
                        ? formatDateForLaravel(data.late_deadline)
                        : '',
                  })}
                  onSuccess={() => {
                     setOpen(false);
                  }}
                  options={{ preserveScroll: true }}
                  className="space-y-4 p-0.5"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{input.title}</Label>
                           <Input
                              required
                              type="text"
                              name="title"
                              defaultValue={assignment?.title || ''}
                              placeholder={'Enter assignment title'}
                           />
                           <InputError message={errors.title} />
                        </div>

                        <div>
                           <Label>{'Deadline'}</Label>
                           <DateTimePicker
                              date={data.deadline}
                              setDate={(date) => setData('deadline', date)}
                           />
                           <InputError message={errors.deadline} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                           <div>
                              <Label>{dashboard.total_mark}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="total_mark"
                                 defaultValue={assignment?.total_mark || ''}
                                 placeholder="0.00"
                              />
                              <InputError message={errors.total_mark} />
                           </div>
                           <div>
                              <Label>{dashboard.pass_mark}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="pass_mark"
                                 defaultValue={assignment?.pass_mark || ''}
                                 placeholder="0.00"
                              />
                              <InputError message={errors.pass_mark} />
                           </div>
                           <div>
                              <Label>{input.retake_attempts}</Label>
                              <Input
                                 min="1"
                                 required
                                 type="number"
                                 name="retake"
                                 defaultValue={assignment?.retake || 1}
                                 placeholder="00"
                              />
                              <InputError message={errors.retake} />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="summary">{'Summary'}</Label>
                           <Editor
                              ssr={true}
                              output="html"
                              placeholder={{
                                 paragraph: 'Type assignment summary here...',
                                 imageCaption:
                                    'Type caption for image (optional)',
                              }}
                              contentMinHeight={256}
                              contentMaxHeight={640}
                              initialContent={data.summary}
                              onContentChange={(value) =>
                                 setData('summary', value as string)
                              }
                           />
                           <InputError message={errors.summary} />
                        </div>

                        <div className="flex items-center space-x-2">
                           <Checkbox
                              id="late_submission"
                              checked={data.late_submission}
                              onCheckedChange={(checked) =>
                                 setData('late_submission', checked as boolean)
                              }
                           />
                           <Label
                              htmlFor="late_submission"
                              className="mb-0 cursor-pointer"
                           >
                              {'Allow Late Submission'}
                           </Label>
                        </div>

                        {data.late_submission && (
                           <>
                              <div>
                                 <Label>{'Late Submission Mark'}</Label>
                                 <Input
                                    type="number"
                                    name="late_total_mark"
                                    defaultValue={
                                       assignment?.late_total_mark || 0
                                    }
                                    placeholder="Enter marks for late submission"
                                 />
                                 <InputError message={errors.late_total_mark} />
                              </div>

                              <div>
                                 <Label>{'Late Submission Deadline'}</Label>
                                 <DateTimePicker
                                    date={
                                       data.late_deadline
                                          ? new Date(data.late_deadline)
                                          : new Date()
                                    }
                                    setDate={(date) =>
                                       setData('late_deadline', date)
                                    }
                                 />
                                 <InputError message={errors.late_deadline} />
                              </div>
                           </>
                        )}

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

export default AssignmentForm;

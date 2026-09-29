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
import { store, update } from '@/routes/quiz';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   quiz?: SectionQuiz;
   handler: React.ReactNode;
   sectionId: string | number;
}

const QuizForm = ({ title, quiz, handler, sectionId }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;

   const { data, setData, reset } = useForm({
      summary: quiz?.summary ?? '',
   });

   const formDefinition = quiz ? update.form(quiz.id) : store.form();

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
                     ...data,
                     course_section_id: sectionId,
                     course_id: props.course.id,
                  })}
                  options={{ preserveScroll: true }}
                  onSuccess={() => {
                     reset();
                     setOpen(false);
                  }}
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
                              defaultValue={quiz?.title || ''}
                              placeholder={input.quiz_title_placeholder}
                           />
                           <InputError message={errors.title} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                           <div>
                              <Label>{dashboard.hours}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="hours"
                                 defaultValue={quiz?.hours || ''}
                                 placeholder="Hours"
                              />
                              <InputError message={errors.hours} />
                           </div>
                           <div>
                              <Label>{dashboard.minutes}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="minutes"
                                 defaultValue={quiz?.minutes || ''}
                                 placeholder="Minutes"
                              />
                              <InputError message={errors.minutes} />
                           </div>
                           <div>
                              <Label>{dashboard.seconds}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="seconds"
                                 defaultValue={quiz?.seconds || ''}
                                 placeholder="Seconds"
                              />
                              <InputError message={errors.seconds} />
                           </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                           <div>
                              <Label>{dashboard.total_mark}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="total_mark"
                                 defaultValue={quiz?.total_mark || ''}
                                 placeholder="Total Mark"
                              />
                              <InputError message={errors.total_mark} />
                           </div>
                           <div>
                              <Label>{dashboard.pass_mark}</Label>
                              <Input
                                 required
                                 type="number"
                                 name="pass_mark"
                                 defaultValue={quiz?.pass_mark || ''}
                                 placeholder="Pass Mark"
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
                                 defaultValue={quiz?.retake || 1}
                                 placeholder="00"
                              />
                              <InputError message={errors.retake} />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="summary">
                              {dashboard.quiz_summary}
                           </Label>
                           <Editor
                              ssr={true}
                              output="html"
                              placeholder={{
                                 paragraph: 'Type your content here...',
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

export default QuizForm;

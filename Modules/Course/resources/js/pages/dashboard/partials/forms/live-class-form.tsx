import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { store, update } from '@/routes/live-classes';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   liveClass?: CourseLiveClass;
   courseId: string | number;
}

const LiveClassForm = ({ title, liveClass, handler, courseId }: Props) => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { dashboard, input, button } = translate;

   const { data, setData, reset } = useForm({
      class_note: liveClass?.class_note ?? '',
      class_date_and_time: liveClass?.class_date_and_time
         ? new Date(liveClass.class_date_and_time)
         : new Date(),
   });

   const formDefinition = liveClass ? update.form(liveClass.id) : store.form();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <Form
                  {...formDefinition}
                  transform={(formData) => ({
                     ...formData,
                     course_id: courseId,
                     class_note: data.class_note,
                     class_date_and_time: data.class_date_and_time,
                  })}
                  onSuccess={() => {
                     if (!liveClass) {
                        reset();
                     }

                     setOpen(false);
                  }}
                  className="space-y-4"
               >
                  {({ errors, processing }) => (
                     <>
                        <div>
                           <Label>{dashboard.class_topic} *</Label>
                           <Input
                              type="text"
                              name="class_topic"
                              defaultValue={liveClass?.class_topic || ''}
                              placeholder={input.class_topic}
                              required
                           />
                           <InputError message={errors.class_topic} />
                        </div>

                        <div>
                           <Label>{dashboard.start_date_time} *</Label>
                           <DateTimePicker
                              date={data.class_date_and_time}
                              setDate={(date) =>
                                 setData('class_date_and_time', date)
                              }
                           />
                           <InputError message={errors.class_date_and_time} />
                        </div>

                        <div>
                           <Label>{dashboard.class_notes}</Label>
                           <Editor
                              output="html"
                              placeholder={{
                                 paragraph: input.description,
                                 imageCaption: input.image_url_placeholder,
                              }}
                              contentMinHeight={256}
                              contentMaxHeight={640}
                              initialContent={data.class_note}
                              onContentChange={(value) =>
                                 setData('class_note', value as string)
                              }
                           />
                           <InputError message={errors.class_note} />
                        </div>

                        <div className="flex justify-end gap-3">
                           <DialogClose asChild>
                              <Button type="button" variant="outline">
                                 {button.cancel}
                              </Button>
                           </DialogClose>

                           <Button type="submit" disabled={processing}>
                              {processing
                                 ? dashboard.scheduling
                                 : button.schedule_class}
                           </Button>
                        </div>
                     </>
                  )}
               </Form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default LiveClassForm;

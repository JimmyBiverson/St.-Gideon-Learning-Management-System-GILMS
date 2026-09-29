import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { store, update } from '@/routes/course-faqs';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   courseId: string | number;
   handler: React.ReactNode;
   faq?: CourseFaq;
}

const FaqForm = ({ title, courseId, handler, faq }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { input, button, dashboard } = translate;

   const { data, setData, reset } = useForm({
      course_id: courseId,
      question: faq?.question || '',
      answer: faq?.answer || '',
   });

   const formDefinition = faq ? update.form(faq.id) : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);

               if (faq) {
                  setData({
                     course_id: courseId,
                     question: faq.question || '',
                     answer: faq.answer || '',
                  });
               } else {
                  reset();
               }
            }
         }}
      >
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent>
            <DialogHeader className="mb-4">
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Form
               key={formKey}
               {...formDefinition}
               transform={(formData) => ({
                  ...formData,
                  ...data,
               })}
               options={{ preserveScroll: true }}
               onSuccess={() => {
                  if (!faq) {
                     reset();
                  }

                  setOpen(false);
               }}
               className="space-y-4"
            >
               {({ errors, processing }) => (
                  <>
                     <div className="space-y-2">
                        <Label>{input.question || 'Question'}</Label>
                        <Input
                           required
                           type="text"
                           value={data.question}
                           placeholder={input.question}
                           onChange={(e) => setData('question', e.target.value)}
                        />
                        <InputError message={errors.question} />
                     </div>

                     <div className="space-y-2">
                        <Label>{input.answer || 'Answer'}</Label>
                        <Textarea
                           required
                           value={data.answer}
                           placeholder={input.answer}
                           onChange={(e) => setData('answer', e.target.value)}
                           className="min-h-[120px]"
                        />
                        <InputError message={errors.answer} />
                     </div>

                     <div className="flex justify-end gap-3 pt-2">
                        <LoadingButton loading={processing}>
                           {button.save || 'Save'}
                        </LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default FaqForm;

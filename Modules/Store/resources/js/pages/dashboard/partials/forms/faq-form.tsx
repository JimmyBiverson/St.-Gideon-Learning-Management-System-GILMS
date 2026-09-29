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
import { store, update } from '@/routes/product-faqs';
import { Form, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   productId: string | number;
   handler: React.ReactNode;
   faq?: ProductFaq;
}

const FaqForm = ({ title, productId, handler, faq }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);

   const { data, setData, reset } = useForm({
      product_id: productId,
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
                     product_id: productId,
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
                        <Label>Question</Label>
                        <Input
                           required
                           type="text"
                           value={data.question}
                           placeholder="e.g. What format is the e-book in?"
                           onChange={(e) => setData('question', e.target.value)}
                        />
                        <InputError message={errors.question} />
                     </div>

                     <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                           value={data.answer}
                           placeholder="Answer shown to buyers"
                           onChange={(e) => setData('answer', e.target.value)}
                           className="min-h-[120px]"
                        />
                        <InputError message={errors.answer} />
                     </div>

                     <div className="flex justify-end gap-3 pt-2">
                        <LoadingButton loading={processing}>Save</LoadingButton>
                     </div>
                  </>
               )}
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default FaqForm;

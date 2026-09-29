import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { destroy, update } from '@/routes/exam-faqs';
import { Form, router } from '@inertiajs/react';

const FaqForm = ({ faq }: { faq: ExamFaq }) => {
   return (
      <Form {...update.form(faq.id)} className="space-y-2">
         {({ errors, processing }) => (
            <>
               <div>
                  <Input
                     required
                     type="text"
                     name="question"
                     defaultValue={faq.question}
                     placeholder="Enter your question"
                  />

                  <InputError message={errors.question} />
               </div>

               <div>
                  <Textarea
                     required
                     name="answer"
                     defaultValue={faq.answer}
                     placeholder="Enter your answer"
                  />

                  <InputError message={errors.answer} />
               </div>

               <div className="flex items-center justify-end gap-2">
                  <LoadingButton
                     type="button"
                     variant="outline"
                     loading={processing}
                     onClick={() => router.delete(destroy(faq.id))}
                     className="h-7 w-full bg-red-50 text-xs hover:bg-red-100"
                  >
                     Remove
                  </LoadingButton>
                  <LoadingButton
                     variant="secondary"
                     className="h-7 w-full text-xs"
                     loading={processing}
                  >
                     Save
                  </LoadingButton>
               </div>
            </>
         )}
      </Form>
   );
};

export default FaqForm;

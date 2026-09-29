import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Textarea } from '@/components/ui/textarea';
import { destroy, update } from '@/routes/exam-outcomes';
import { Form, router } from '@inertiajs/react';

const OutcomeForm = ({ outcome }: { outcome: ExamOutcome }) => {
   return (
      <Form {...update.form(outcome.id)} className="space-y-2">
         {({ errors, processing }) => (
            <>
               <div>
                  <Textarea
                     required
                     name="outcome"
                     defaultValue={outcome.outcome}
                     placeholder="Enter exam learning outcome"
                  />

                  <InputError message={errors.outcome} />
               </div>

               <div className="flex items-center justify-end gap-2">
                  <LoadingButton
                     type="button"
                     variant="outline"
                     loading={processing}
                     onClick={() => router.delete(destroy(outcome.id))}
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

export default OutcomeForm;

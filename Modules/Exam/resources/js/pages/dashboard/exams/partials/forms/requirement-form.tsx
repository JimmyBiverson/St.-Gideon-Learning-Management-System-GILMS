import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Textarea } from '@/components/ui/textarea';
import { destroy, update } from '@/routes/exam-requirements';
import { Form, router } from '@inertiajs/react';

const RequirementForm = ({ requirement }: { requirement: ExamRequirement }) => {
   return (
      <Form {...update.form(requirement.id)} className="space-y-2">
         {({ errors, processing }) => (
            <>
               <div>
                  <Textarea
                     required
                     name="requirement"
                     defaultValue={requirement.requirement}
                     placeholder="Enter exam requirement"
                  />

                  <InputError message={errors.requirement} />
               </div>

               <div className="flex items-center justify-end gap-2">
                  <LoadingButton
                     type="button"
                     variant="outline"
                     loading={processing}
                     onClick={() => router.delete(destroy(requirement.id))}
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

export default RequirementForm;

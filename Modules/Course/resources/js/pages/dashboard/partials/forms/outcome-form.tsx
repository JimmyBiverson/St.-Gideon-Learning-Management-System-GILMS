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
import { store, update } from '@/routes/course-outcomes';
import { Form, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   courseId: string | number;
   handler: React.ReactNode;
   outcome?: CourseOutcome;
}

const OutcomeForm = ({ title, courseId, handler, outcome }: Props) => {
   const [open, setOpen] = useState(false);
   const [formKey, setFormKey] = useState(0);
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { input, button } = translate;

   const { data, setData, reset } = useForm({
      course_id: courseId,
      outcome: outcome?.outcome || '',
   });

   const formDefinition = outcome ? update.form(outcome.id) : store.form();

   return (
      <Dialog
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (nextOpen) {
               setFormKey((k) => k + 1);

               if (outcome) {
                  setData({
                     course_id: courseId,
                     outcome: outcome.outcome || '',
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
                  if (!outcome) {
                     reset();
                  }

                  setOpen(false);
               }}
               className="space-y-4"
            >
               {({ errors, processing }) => (
                  <>
                     <div className="space-y-2">
                        <Label>{input.outcome || 'Outcome'}</Label>
                        <Input
                           required
                           type="text"
                           value={data.outcome}
                           placeholder={input.outcome}
                           onChange={(e) => setData('outcome', e.target.value)}
                        />
                        <InputError message={errors.outcome} />
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

export default OutcomeForm;

import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/change-email';
import LoadingButton from '../loading-button';

const ChangeEmail = () => {
   const { props } = usePage<SharedData>();
   const { email } = props.auth.user;
   const { translate } = props;
   const { auth, button, input } = translate;

   return (
      <Card className="border-none">
         <div className="border-b border-b-border px-7 pt-7 pb-4">
            <p className="text18 font-bold">{auth.change_email}</p>
         </div>
         <Form {...update.form()} className="space-y-6 p-6">
            {({ processing, errors }) => (
               <>
                  <div>
                     <Label>{input.current_email}</Label>
                     <Input
                        required
                        readOnly
                        type="email"
                        name="current_email"
                        defaultValue={email}
                        placeholder={input.current_email_placeholder}
                     />
                     <InputError
                        message={errors.current_email}
                        className="mt-2"
                     />
                  </div>

                  <div>
                     <Label>{input.new_email}</Label>
                     <Input
                        required
                        type="email"
                        name="new_email"
                        placeholder={input.new_email_placeholder}
                     />
                     <InputError message={errors.new_email} className="mt-2" />
                  </div>

                  <LoadingButton loading={processing} className="float-end">
                     {button.get_email_change_link}
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default ChangeEmail;

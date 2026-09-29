import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/forgot-password';

import LoadingButton from '../loading-button';

const ForgetPassword = () => {
   const { props } = usePage<SharedData>();
   const { email } = props.auth.user;
   const { translate } = props;
   const { button, input } = translate;

   return (
      <Card className="border-none">
         <div className="border-b border-b-border px-7 pt-7 pb-4">
            <p className="text18 font-bold">{button.forget_password}</p>
         </div>

         <Form {...store.form()} className="space-y-6 p-6">
            {({ processing, errors }) => (
               <>
                  <div>
                     <Label>{input.your_email}</Label>
                     <Input
                        required
                        readOnly
                        type="email"
                        name="email"
                        defaultValue={email}
                     />
                     <InputError message={errors.email} className="mt-2" />
                  </div>

                  <LoadingButton loading={processing} className="float-right">
                     {button.get_password_reset_link}
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default ForgetPassword;

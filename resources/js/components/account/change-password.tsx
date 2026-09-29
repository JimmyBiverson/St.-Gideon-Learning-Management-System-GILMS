import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/change-password';
import LoadingButton from '../loading-button';

const ChangePassword = () => {
   const { props } = usePage();
   const { translate } = props as any;
   const { button, input } = translate;

   return (
      <Card className="border-none">
         <div className="border-b border-b-border px-7 pt-7 pb-4">
            <p className="text18 font-bold">{button.change_password}</p>
         </div>

         <Form
            {...update.form()}
            resetOnSuccess={[
               'current_password',
               'password',
               'password_confirmation',
            ]}
            className="space-y-6 p-6"
         >
            {({ processing, errors }) => (
               <>
                  <div>
                     <Label>{input.current_password}</Label>
                     <Input
                        required
                        type="password"
                        name="current_password"
                        placeholder={input.current_password_placeholder}
                     />
                     <InputError
                        message={errors.current_password}
                        className="mt-2"
                     />
                  </div>

                  <div>
                     <Label>{input.new_password}</Label>
                     <Input
                        required
                        type="password"
                        name="password"
                        placeholder={input.new_password_placeholder}
                     />
                     <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div>
                     <Label>{input.confirm_new_password}</Label>
                     <Input
                        required
                        type="password"
                        name="password_confirmation"
                        placeholder={input.confirm_new_password}
                     />
                  </div>

                  <LoadingButton loading={processing} className="float-right">
                     {button.change_password}
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default ChangePassword;

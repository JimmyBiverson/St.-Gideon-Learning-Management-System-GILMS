import { Form, Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import PasswordInput from '@/components/password-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import { store } from '@/routes/reset-password';

interface ResetPasswordProps {
   token: string;
   email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
   const { props } = usePage<SharedData>();
   const { auth, input, button } = props.translate;

   return (
      <AuthLayout
         title={auth.reset_title}
         description={auth.reset_description}
         headline="Almost there!"
         subtitle="Set your new password and get back to your learning."
      >
         <Head title={auth.reset_title} />

         <Form
            {...store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            transform={(data) => ({ ...data, token, email })}
         >
            {({ processing, errors }) => (
               <div className="grid gap-6">
                  <div className="grid gap-2">
                     <Label htmlFor="email">{input.email}</Label>
                     <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        defaultValue={email}
                        className="mt-1 block w-full"
                        readOnly
                     />
                     <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="password">{input.password}</Label>
                     <PasswordInput
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        autoFocus
                        placeholder={input.password_placeholder}
                     />
                     <InputError message={errors.password} />
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="password_confirmation">
                        {input.confirm_password}
                     </Label>
                     <PasswordInput
                        id="password_confirmation"
                        name="password_confirmation"
                        autoComplete="new-password"
                        placeholder={input.confirm_password}
                     />
                     <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                     />
                  </div>

                  <LoadingButton className="mt-4 w-full" loading={processing}>
                     {button.submit}
                  </LoadingButton>
               </div>
            )}
         </Form>
      </AuthLayout>
   );
}

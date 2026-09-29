// Components
import { Form, Head, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import { store } from '@/routes/confirm-password';

export default function ConfirmPassword() {
   const { props } = usePage<SharedData>();
   const { auth, input, button } = props.translate;

   return (
      <AuthLayout
         title={auth.confirm_title}
         description={auth.confirm_description}
         headline="Security check"
         subtitle="Please confirm your identity to continue."
      >
         <Head title={auth.confirm_title} />

         <Form {...store.form()} resetOnSuccess={['password']}>
            {({ processing, errors }) => (
               <div className="space-y-6">
                  <div className="grid gap-2">
                     <Label htmlFor="password">{input.password}</Label>
                     <PasswordInput
                        id="password"
                        name="password"
                        placeholder={input.password_placeholder}
                        autoComplete="current-password"
                        autoFocus
                     />

                     <InputError message={errors.password} />
                  </div>

                  <div className="flex items-center">
                     <Button className="w-full" disabled={processing}>
                        {processing && (
                           <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {button.confirm_password}
                     </Button>
                  </div>
               </div>
            )}
         </Form>
      </AuthLayout>
   );
}

// Components
import { Form, Head, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import { store } from '@/routes/forgot-password';
import { index } from '@/routes/login';

export default function ForgotPassword({ status }: { status?: string }) {
   const { props } = usePage<SharedData>();
   const { auth, input, button } = props.translate;

   return (
      <AuthLayout
         title={auth.forgot_password}
         description={auth.forgot_description}
         headline="Don't worry!"
         subtitle="We'll help you securely reset your password."
      >
         <Head title={auth.forgot_password} />

         {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
               {status}
            </div>
         )}

         <div className="space-y-6">
            <Form {...store.form()}>
               {({ processing, errors }) => (
                  <>
                     <div className="grid gap-2">
                        <Label htmlFor="email">{input.email}</Label>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="off"
                           autoFocus
                           placeholder={input.email_placeholder}
                        />
                        <InputError message={errors.email} />
                     </div>

                     <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                           {processing && (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                           )}
                           {button.submit}
                        </Button>
                     </div>
                  </>
               )}
            </Form>

            <div className="space-x-1 text-center text-sm text-muted-foreground">
               <span>{auth.return_to_login}</span>
               <TextLink href={index()}>{button.login}</TextLink>
            </div>
         </div>
      </AuthLayout>
   );
}

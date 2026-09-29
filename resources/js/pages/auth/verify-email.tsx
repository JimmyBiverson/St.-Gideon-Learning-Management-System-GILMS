import { Form, Head, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth';
import { logout } from '@/routes/index';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
   const { props } = usePage<SharedData>();
   const { auth, button } = props.translate;

   return (
      <AuthLayout
         title={auth.verify_title}
         description={auth.verify_description}
         headline="Check your inbox"
         subtitle="Verify your email and start your learning journey."
      >
         <Head title={auth.verify_title} />

         {status === 'verification-link-sent' && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
               {auth.verification_sent}
            </div>
         )}

         <div className="space-y-6 text-center">
            <Form {...send.form()}>
               {({ processing }) => (
                  <Button disabled={processing} variant="secondary">
                     {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                     )}
                     {button.submit}
                  </Button>
               )}
            </Form>

            <Form {...logout.form()}>
               {({ processing }) => (
                  <Button
                     type="submit"
                     disabled={processing}
                     className="mx-auto block text-sm"
                  >
                     {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                     )}
                     {button.logout}
                  </Button>
               )}
            </Form>
         </div>
      </AuthLayout>
   );
}

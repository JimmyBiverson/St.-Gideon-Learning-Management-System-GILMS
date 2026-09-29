import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import system from '@/routes/system';
import { Form, Head } from '@inertiajs/react';

const Index = () => {
   return (
      <AuthLayout
         title="System Access"
         description="Enter admin credentials to access system"
      >
         <Head title="System Access" />
         <Form {...system.verify.form()} className="flex flex-col gap-6">
            {({ processing, errors }) => (
               <div className="grid gap-6">
                  <div className="grid gap-2">
                     <Label>Admin Email</Label>
                     <Input
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        name="email"
                        autoComplete="email"
                        placeholder="admin@example.com"
                     />
                     <InputError message={errors.email} />
                  </div>

                  <div className="grid gap-2">
                     <Label>Password</Label>
                     <Input
                        type="password"
                        required
                        tabIndex={2}
                        name="password"
                        placeholder="Password"
                     />
                     <InputError message={errors.password} />
                  </div>

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={processing}
                  >
                     {processing ? 'Verifying...' : 'Verify Admin Access'}
                  </Button>
               </div>
            )}
         </Form>
      </AuthLayout>
   );
};

export default Index;

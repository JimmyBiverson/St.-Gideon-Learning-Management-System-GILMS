import { Form, Head, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import { index } from '@/routes/login';
import { store } from '@/routes/register';

interface RegisterProps {
   googleLogIn: boolean;
   recaptcha: {
      status: boolean;
      siteKey: string;
      secretKey: string;
   };
}

export default function Register({ googleLogIn, recaptcha }: RegisterProps) {
   const { props } = usePage<SharedData>();
   const { auth, input, button } = props.translate;
   const recaptchaRef = useRef<ReCAPTCHA | null>(null);
   const [recaptchaToken, setRecaptchaToken] = useState('');

   return (
      <AuthLayout
         title={auth.register_title}
         description={auth.register_description}
         headline="Start learning today"
         subtitle="Join thousands of students worldwide."
      >
         <Head title={auth.register_title} />
         <Form
            {...store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            onError={() => recaptchaRef.current?.reset()}
            transform={(data) => ({
               ...data,
               recaptcha: recaptchaToken,
               recaptcha_status: recaptcha.status,
            })}
            className="flex flex-col gap-6"
         >
            {({ processing, errors }) => (
               <>
                  <div className="grid gap-6">
                     <div className="grid gap-2">
                        <Label htmlFor="name">{input.name}</Label>
                        <Input
                           id="name"
                           name="name"
                           type="text"
                           required
                           autoFocus
                           tabIndex={1}
                           autoComplete="name"
                           disabled={processing}
                           placeholder={input.full_name_placeholder}
                        />
                        <InputError message={errors.name} className="mt-2" />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="email">{input.email}</Label>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           required
                           tabIndex={2}
                           autoComplete="email"
                           disabled={processing}
                           placeholder={input.email_placeholder}
                        />
                        <InputError message={errors.email} />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="password">{input.password}</Label>
                        <PasswordInput
                           id="password"
                           name="password"
                           required
                           tabIndex={3}
                           autoComplete="new-password"
                           disabled={processing}
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
                           required
                           tabIndex={4}
                           autoComplete="new-password"
                           disabled={processing}
                           placeholder={input.confirm_password}
                        />
                        <InputError message={errors.password_confirmation} />
                     </div>

                     {recaptcha.status && (
                        <div>
                           <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={recaptcha.siteKey}
                              onChange={(token) =>
                                 setRecaptchaToken(token ?? '')
                              }
                           />
                           <InputError message={errors.recaptcha} />
                        </div>
                     )}

                     <LoadingButton
                        className="mt-2 w-full"
                        tabIndex={5}
                        loading={processing}
                     >
                        {button.create}
                     </LoadingButton>
                  </div>

                  {googleLogIn && (
                     <>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                           <span className="relative z-10 bg-background px-2 text-muted-foreground">
                              {auth.continue_with}
                           </span>
                        </div>

                        <a type="button" className="w-full" href="auth/google">
                           <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                           >
                              {button.continue_with_google}
                           </Button>
                        </a>
                     </>
                  )}

                  <div className="space-x-2 text-sm">
                     <span className="text-muted-foreground">
                        {auth.have_account}
                     </span>
                     <TextLink href={index()} tabIndex={6}>
                        {button.login}
                     </TextLink>
                  </div>
               </>
            )}
         </Form>
      </AuthLayout>
   );
}

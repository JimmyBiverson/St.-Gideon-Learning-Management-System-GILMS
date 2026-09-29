import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth';
import { index as forgotPassword } from '@/routes/forgot-password';
import { store as login } from '@/routes/login';
import { index as register } from '@/routes/register';

interface LoginProps {
   status?: string;
   canResetPassword: boolean;
   googleLogIn: boolean;
   recaptcha: {
      status: boolean;
      siteKey: string;
      secretKey: string;
   };
}

export default function Login({ status, recaptcha, googleLogIn }: LoginProps) {
   const { props } = usePage<SharedData>();
   const { auth, input, button } = props.translate;
   const recaptchaRef = useRef<ReCAPTCHA | null>(null);
   const [recaptchaToken, setRecaptchaToken] = useState('');

   return (
      <AuthLayout
         title={auth.login_title}
         description={auth.login_description}
         headline="Welcome back!"
         subtitle="Continue your learning journey."
      >
         <Head title={auth.login_title} />
         <Form
            {...login.form()}
            resetOnSuccess={['password']}
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
                        <Label htmlFor="email">{input.email}</Label>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           required
                           autoFocus
                           tabIndex={1}
                           autoComplete="email"
                           placeholder={input.email_placeholder}
                        />
                        <InputError message={errors.email} />
                     </div>

                     <div className="grid gap-2">
                        <div className="flex items-center">
                           <Label htmlFor="password">{input.password}</Label>
                           <TextLink
                              href={forgotPassword()}
                              className="ml-auto text-sm"
                              tabIndex={5}
                           >
                              {auth.forgot_password}
                           </TextLink>
                        </div>
                        <PasswordInput
                           id="password"
                           name="password"
                           required
                           tabIndex={2}
                           autoComplete="current-password"
                           placeholder={input.password_placeholder}
                        />
                        <InputError message={errors.password} />
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

                     <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" tabIndex={3} />
                        <Label htmlFor="remember" className="mb-0">
                           {input.remember_me}
                        </Label>
                     </div>

                     <LoadingButton
                        loading={processing}
                        type="submit"
                        className="w-full"
                     >
                        {button.login}
                     </LoadingButton>

                     {googleLogIn && (
                        <>
                           <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                 {auth.continue_with}
                              </span>
                           </div>

                           <a
                              type="button"
                              className="w-full"
                              href="auth/google"
                           >
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
                  </div>
                  <div className="space-x-2 text-sm">
                     <span className="text-muted-foreground">
                        {auth.no_account}
                     </span>
                     <Link
                        href={register()}
                        className="underline underline-offset-4"
                     >
                        {button.sign_up}
                     </Link>
                  </div>
               </>
            )}
         </Form>

         {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
               {status}
            </div>
         )}
      </AuthLayout>
   );
}

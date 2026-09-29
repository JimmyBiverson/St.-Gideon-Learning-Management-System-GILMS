import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showStep3, storeStep4 } from '@/routes/install';
import { Form, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Layout from '../components/layout';
import Message from '../components/message';
import StepNavigator from '../components/step-navigator';

interface Props extends SharedData {
   NAME: string;
   EMAIL: string;
   PASSWORD: string;
}

const Step4 = (props: Props) => {
   const { NAME, EMAIL, PASSWORD, flash } = props;

   return (
      <div>
         <StepNavigator step1="fill" step2="fill" step3="fill" step4="active" />

         <Form {...storeStep4.form()} options={{ preserveScroll: true }}>
            {({ errors }) => (
               <div id="dataForm">
                  <Message error={flash.error} success={flash.success} />

                  <div className="mb-6">
                     <Label>Name</Label>

                     <Input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={NAME || ''}
                        placeholder="Username"
                     />

                     <InputError message={errors.name} />
                  </div>

                  <div className="mb-6">
                     <Label>Email</Label>

                     <Input
                        id="email"
                        type="email"
                        name="email"
                        defaultValue={EMAIL || ''}
                        placeholder="Email"
                     />

                     <InputError message={errors.email} />
                  </div>

                  <div className="mb-6">
                     <Label>Password</Label>

                     <Input
                        id="password"
                        type="password"
                        name="password"
                        defaultValue={PASSWORD || ''}
                        placeholder="Password"
                     />

                     <InputError message={errors.password} />
                  </div>

                  <div className="mb-6">
                     <Label>Confirm Password</Label>

                     <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        defaultValue={PASSWORD || ''}
                        placeholder="Confirm Password"
                     />

                     <InputError message={errors.password_confirmation} />
                  </div>
                  {/* 
                <Button
                    type="submit"
                    className={cn(
                        'w-full',
                        isAdminCredentials ? 'bg-green-500' : 'bg-red-500',
                    )}
                >
                    Save Credentials
                </Button> */}

                  <div className="mt-12 flex items-center justify-end gap-4">
                     <Link href={showStep3()}>
                        <Button
                           type="button"
                           variant="outline"
                           className="border border-orange-500 bg-transparent! text-orange-500! uppercase"
                        >
                           Previous Step
                        </Button>
                     </Link>

                     <Button
                        type="submit"
                        className="bg-orange-500 px-6 py-3 text-white uppercase hover:bg-orange-600/90"
                     >
                        Next Step
                     </Button>
                  </div>
               </div>
            )}
         </Form>
      </div>
   );
};

Step4.layout = (page: ReactNode) => <Layout children={page} />;

export default Step4;

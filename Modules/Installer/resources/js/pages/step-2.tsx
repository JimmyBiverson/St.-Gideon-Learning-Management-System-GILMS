import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { generateAppKey } from '@/routes';
import { index, storeStep2 } from '@/routes/install';
import { Form, Link, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@/installer/components/layout';
import StepNavigator from '@/installer/components/step-navigator';
import timezones from '@/installer/data/timezones';

interface Props {
   // APP_NAME: string;
   APP_ENV: string;
   APP_DEBUG: string;
   APP_KEY: string;
   APP_TIMEZONE: string;
   APP_URL: string;
}

const Step2 = (props: Props) => {
   const { APP_ENV, APP_DEBUG, APP_KEY, APP_TIMEZONE, APP_URL } = props;

   const [data, setData] = useState({
      app_env: APP_ENV || 'local',
      app_debug: JSON.stringify(APP_DEBUG) || 'true',
      app_timezone: APP_TIMEZONE.replaceAll('"', '') || '',
   });

   const handleGenerateKey = () => {
      router.get(generateAppKey());
   };

   return (
      <div>
         <StepNavigator step1="fill" step2="active" />

         <Form
            {...storeStep2.form()}
            transform={(formData) => ({
               ...formData,
               ...data,
            })}
            options={{ preserveScroll: true }}
         >
            {({ errors }) => (
               <>
                  <div className="mb-6">
                     <Label>App Environment</Label>

                     <Select
                        name="app_env"
                        value={data.app_env}
                        onValueChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              app_env: value,
                           }))
                        }
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select the app environment" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="local">Local</SelectItem>
                           <SelectItem value="testing">Testing</SelectItem>
                           <SelectItem value="production">
                              Production
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="mb-6">
                     <Label>App Debug Mode</Label>

                     <Select
                        name="app_debug"
                        value={data.app_debug}
                        onValueChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              app_debug: value,
                           }))
                        }
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select the app environment" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="true">True</SelectItem>
                           <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="mb-6">
                     <Label>App URL/Domain</Label>

                     <Input
                        type="text"
                        name="app_url"
                        defaultValue={window.location.origin}
                        placeholder="Enter your url/domain"
                     />

                     <InputError message={errors.app_url} />
                  </div>

                  <div className="mb-6">
                     <Label>App Timezone</Label>

                     <Select
                        name="app_timezone"
                        value={data.app_timezone}
                        onValueChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              app_timezone: value,
                           }))
                        }
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select the app timezone" />
                        </SelectTrigger>

                        <SelectContent>
                           {timezones.map((timezone) => (
                              <SelectItem key={timezone} value={timezone}>
                                 {timezone}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="mb-12">
                     <div>
                        <Label>App Key</Label>

                        <Input
                           type="text"
                           name="app_key"
                           defaultValue={APP_KEY || ''}
                           placeholder="Click button to generate key"
                        />

                        <InputError message={errors.app_key} />
                     </div>

                     <Button
                        type="button"
                        variant="outline"
                        className="mt-4 border border-orange-500 !bg-transparent !text-orange-500"
                        onClick={handleGenerateKey}
                     >
                        Generate Key
                     </Button>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                     <Link href={index()}>
                        <Button
                           type="button"
                           variant="outline"
                           className="border border-orange-500 !bg-transparent !text-orange-500 uppercase"
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
               </>
            )}
         </Form>
      </div>
   );
};

Step2.layout = (page: ReactNode) => <Layout children={page} />;

export default Step2;

import { Form, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import Switch from '@/components/switch';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/use-lang';
import { update } from '@/routes/auth0';

interface Props {
   auth: Settings<RecaptchaAuthFields>;
}

const Recaptcha = (props: Props) => {
   const { button, common } = useLang();
   const fields = props.auth.fields as RecaptchaAuthFields;
   const { data, setData } = useForm({ active: fields.active });

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form(props.auth.id)}
            transform={(formData) => ({
               ...fields,
               ...formData,
               ...data,
               type: 'google_recaptcha',
            })}
            className="space-y-6"
         >
            {({ processing, errors }) => (
               <>
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-semibold">
                        ReCaptcha Settings
                     </h2>

                     <div className="flex items-center space-x-2">
                        <Label htmlFor="status" className="mb-0">
                           {data.active ? common.enabled : common.disabled}
                        </Label>
                        <Switch
                           id="status"
                           defaultChecked={data.active}
                           onCheckedChange={(checked) => {
                              setData('active', checked);
                           }}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <div>
                        <Label>Site Key</Label>
                        <Input
                           name="site_key"
                           defaultValue={fields.site_key || ''}
                           placeholder="Site Key"
                        />
                        <InputError message={errors.site_key} />
                     </div>

                     <div>
                        <Label>Secret Key</Label>
                        <Input
                           name="secret_key"
                           defaultValue={fields.secret_key || ''}
                           placeholder="Secret Key"
                        />
                        <InputError message={errors.secret_key} />
                     </div>
                  </div>

                  <LoadingButton
                     loading={processing}
                     type="submit"
                     className="float-end"
                  >
                     {button.save_changes}
                  </LoadingButton>
               </>
            )}
         </Form>
      </Card>
   );
};

export default Recaptcha;

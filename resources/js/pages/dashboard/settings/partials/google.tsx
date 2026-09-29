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
   auth: Settings<GoogleAuthFields>;
}

const Google = (props: Props) => {
   const { auth, input, button, common } = useLang();
   const fields = props.auth.fields as GoogleAuthFields;
   const { data, setData } = useForm({ active: fields.active });

   return (
      <Card className="p-4 sm:p-6">
         <Form
            {...update.form(props.auth.id)}
            transform={(formData) => ({
               ...fields,
               ...formData,
               ...data,
               type: 'google_auth',
            })}
            className="space-y-6"
         >
            {({ processing, errors }) => (
               <>
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-semibold">
                        {auth.google_auth}
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
                        <Label>{input.google_client_id}</Label>
                        <Input
                           name="client_id"
                           defaultValue={fields.client_id || ''}
                           placeholder={input.google_client_id_placeholder}
                        />
                        <InputError message={errors.client_id} />
                     </div>

                     <div>
                        <Label>{input.google_client_secret}</Label>
                        <Input
                           name="client_secret"
                           defaultValue={fields.client_secret || ''}
                           placeholder={input.google_client_secret_placeholder}
                        />
                        <InputError message={errors.client_secret} />
                     </div>

                     <div>
                        <Label>{input.google_redirect_uri}</Label>
                        <Input
                           name="redirect"
                           defaultValue={fields.redirect || ''}
                           placeholder={input.google_redirect_uri}
                        />
                        <InputError message={errors.redirect} />
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

export default Google;

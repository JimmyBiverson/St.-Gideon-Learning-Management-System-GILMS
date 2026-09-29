import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import Switch from '@/components/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import paypalCurrencies from '@/data/currencies/paypal';
import { cn } from '@/lib/utils';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface PaypalProps {
   payment: Settings<PaypalFields>;
   type: 'payout' | 'payment';
}

const Paypal = ({ payment, type }: PaypalProps) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button, common } = translate;

   const { data, setData } = useForm({
      active: payment.fields.active,
      test_mode: payment.fields.test_mode,
   });

   const formProps =
      type === 'payment' ? paymentUpdate.form(payment.id) : payoutUpdate.form();

   return (
      <Form
         {...formProps}
         transform={(formData) => ({
            ...payment.fields,
            ...formData,
            ...data,
            type: 'paypal',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        {settings.paypal_settings}
                     </h2>

                     <div className="flex items-center space-x-2">
                        <Label htmlFor="status" className="mb-0">
                           {payment.fields.active
                              ? common.enabled
                              : common.disabled}
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
                        <Label>{input.currency}</Label>
                        <Select
                           name="currency"
                           defaultValue={payment.fields.currency ?? ''}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder={input.currency} />
                           </SelectTrigger>
                           <SelectContent>
                              {paypalCurrencies.map((c) => (
                                 <SelectItem key={c.value} value={c.value}>
                                    {c.label} ({c.value})
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <InputError message={errors.currency} />
                     </div>

                     <div>
                        <span className="mb-3 block text-sm font-medium">
                           {settings.test_mode}:
                        </span>
                        <div className="flex items-center space-x-2">
                           <Switch
                              id="test_mode"
                              defaultChecked={data.test_mode}
                              onCheckedChange={(checked) => {
                                 setData('test_mode', checked);
                              }}
                           />
                           <Label
                              htmlFor="test_mode"
                              className="mb-0 text-gray-500"
                           >
                              {data.test_mode
                                 ? settings.using_sandbox_environment
                                 : settings.using_production_environment}
                           </Label>
                        </div>
                     </div>
                  </div>

                  {/* Sandbox Credentials Section */}
                  <div
                     className={cn('border-b pb-6', {
                        'opacity-60': !data.test_mode,
                     })}
                  >
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.sandbox_credentials}
                     </h3>

                     <div>
                        <Label>{input.sandbox_client_id}</Label>
                        <Input
                           name="sandbox_client_id"
                           defaultValue={payment.fields.sandbox_client_id ?? ''}
                           placeholder={input.sandbox_client_id_placeholder}
                           disabled={!data.test_mode}
                        />
                        <InputError message={errors.sandbox_client_id} />
                     </div>

                     <div>
                        <Label>{input.sandbox_secret_key}</Label>
                        <Input
                           name="sandbox_secret_key"
                           defaultValue={
                              payment.fields.sandbox_secret_key ?? ''
                           }
                           placeholder={input.sandbox_secret_key_placeholder}
                           disabled={!data.test_mode}
                           type="password"
                        />
                        <InputError message={errors.sandbox_secret_key} />
                     </div>
                  </div>

                  {/* Production Credentials Section */}
                  <div
                     className={cn('space-y-6', {
                        'opacity-60': data.test_mode,
                     })}
                  >
                     <h3 className="text-lg font-medium">
                        {settings.production_credentials}
                     </h3>

                     <div>
                        <Label>{input.production_client_id}</Label>
                        <Input
                           name="production_client_id"
                           defaultValue={
                              payment.fields.production_client_id ?? ''
                           }
                           placeholder={input.production_client_id_placeholder}
                           disabled={data.test_mode}
                        />
                        <InputError message={errors.production_client_id} />
                     </div>

                     <div>
                        <Label>{input.production_secret_key}</Label>
                        <Input
                           name="production_secret_key"
                           defaultValue={
                              payment.fields.production_secret_key ?? ''
                           }
                           placeholder={input.production_secret_key_placeholder}
                           disabled={data.test_mode}
                           type="password"
                        />
                        <InputError message={errors.production_secret_key} />
                     </div>
                  </div>

                  <div className="flex justify-end pt-4">
                     <LoadingButton type="submit" loading={processing}>
                        {button.save_changes}
                     </LoadingButton>
                  </div>
               </>
            );
         }}
      </Form>
   );
};

export default Paypal;

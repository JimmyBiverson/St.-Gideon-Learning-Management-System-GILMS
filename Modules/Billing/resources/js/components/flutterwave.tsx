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
import flutterwaveCurrencies from '@/data/currencies/flutterwave';
import { cn } from '@/lib/utils';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface FlutterwaveProps {
   payment: Settings<FlutterwaveFields>;
   type: 'payout' | 'payment';
}

const Flutterwave = ({ payment, type }: FlutterwaveProps) => {
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
            type: 'flutterwave',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        Flutterwave Settings
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
                              {flutterwaveCurrencies.map((c) => (
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
                                 ? settings.using_test_keys
                                 : settings.using_live_keys}
                           </Label>
                        </div>
                     </div>
                  </div>

                  {/* Test Credentials */}
                  <div
                     className={cn('border-b pb-6', {
                        'opacity-60': !data.test_mode,
                     })}
                  >
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.test_credentials}
                     </h3>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div>
                           <Label>{input.test_public_key}</Label>
                           <Input
                              name="test_public_key"
                              defaultValue={
                                 payment.fields.test_public_key ?? ''
                              }
                              placeholder="FLWPUBK_TEST-xxxxxxxxxxxxxxxx-X"
                              disabled={!data.test_mode}
                           />
                           <InputError message={errors.test_public_key} />
                        </div>
                        <div>
                           <Label>{input.test_secret_key}</Label>
                           <Input
                              name="test_secret_key"
                              defaultValue={
                                 payment.fields.test_secret_key ?? ''
                              }
                              placeholder="FLWSECK_TEST-xxxxxxxxxxxxxxxx-X"
                              disabled={!data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.test_secret_key} />
                        </div>
                        <div>
                           <Label>Test Encryption Key</Label>
                           <Input
                              name="test_encryption_key"
                              defaultValue={
                                 payment.fields.test_encryption_key ?? ''
                              }
                              placeholder="FLWSECK_TEST-xxxxxxxxxxxxxxxx"
                              disabled={!data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.test_encryption_key} />
                        </div>
                     </div>
                  </div>

                  {/* Live Credentials */}
                  <div
                     className={cn('space-y-6', {
                        'opacity-60': data.test_mode,
                     })}
                  >
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.live_credentials}
                     </h3>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div>
                           <Label>{input.live_public_key}</Label>
                           <Input
                              name="live_public_key"
                              defaultValue={
                                 payment.fields.live_public_key ?? ''
                              }
                              placeholder="FLWPUBK-xxxxxxxxxxxxxxxx-X"
                              disabled={data.test_mode}
                           />
                           <InputError message={errors.live_public_key} />
                        </div>
                        <div>
                           <Label>{input.live_secret_key}</Label>
                           <Input
                              name="live_secret_key"
                              defaultValue={
                                 payment.fields.live_secret_key ?? ''
                              }
                              placeholder="FLWSECK-xxxxxxxxxxxxxxxx-X"
                              disabled={data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.live_secret_key} />
                        </div>
                        <div>
                           <Label>Live Encryption Key</Label>
                           <Input
                              name="live_encryption_key"
                              defaultValue={
                                 payment.fields.live_encryption_key ?? ''
                              }
                              placeholder="FLWSECK-xxxxxxxxxxxxxxxx"
                              disabled={data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.live_encryption_key} />
                        </div>
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

export default Flutterwave;

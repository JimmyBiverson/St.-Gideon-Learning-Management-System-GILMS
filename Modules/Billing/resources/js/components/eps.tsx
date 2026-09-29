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
import epsCurrency from '@/data/currencies/eps';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface EpsProps {
   payment: Settings<EpsFields>;
   type: 'payout' | 'payment';
}

const Eps = ({ payment, type }: EpsProps) => {
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
            type: 'eps',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200">
                     We couldn't test bKash as we don't have a merchant account.
                     If you find any bug/issue please report (send email at
                     support@ui-lib.com) back to us immediately, we'll fix that.
                  </div>

                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        {settings.eps_settings}
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
                              {epsCurrency.map((c) => (
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
                                 ? settings.using_test_environment
                                 : settings.using_live_environment}
                           </Label>
                        </div>
                     </div>
                  </div>

                  {/* API Credentials Section */}
                  <div>
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.api_credentials}
                     </h3>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                           <Label>{input.eps_username}</Label>
                           <Input
                              name="username"
                              defaultValue={payment.fields.username ?? ''}
                              placeholder="Enter the username"
                           />
                           <InputError message={errors.username} />
                        </div>

                        <div>
                           <Label>{input.password}</Label>
                           <Input
                              name="password"
                              defaultValue={payment.fields.password ?? ''}
                              placeholder="Enter the password"
                              type="password"
                           />
                           <InputError message={errors.password} />
                        </div>

                        <div>
                           <Label>{input.eps_hashkey}</Label>
                           <Input
                              name="hashkey"
                              defaultValue={payment.fields.hashkey ?? ''}
                              placeholder="Enter the hash key"
                              type="password"
                           />
                           <InputError message={errors.hashkey} />
                        </div>

                        <div>
                           <Label>{input.eps_merchant_id}</Label>
                           <Input
                              name="merchant_id"
                              defaultValue={payment.fields.merchant_id ?? ''}
                              placeholder="Enter the merchant ID"
                           />
                           <InputError message={errors.merchant_id} />
                        </div>

                        <div>
                           <Label>{input.store_id}</Label>
                           <Input
                              name="store_id"
                              defaultValue={payment.fields.store_id ?? ''}
                              placeholder="Enter the store ID"
                           />
                           <InputError message={errors.store_id} />
                        </div>

                        <div>
                           <Label>{input.eps_device_type_id}</Label>
                           <Input
                              name="device_type_id"
                              type="number"
                              defaultValue={payment.fields.device_type_id ?? ''}
                              placeholder="Enter the device type ID"
                           />
                           <InputError message={errors.device_type_id} />
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

export default Eps;

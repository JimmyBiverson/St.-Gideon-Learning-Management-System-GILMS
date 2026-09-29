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
import sslcommerzCurrency from '@/data/currencies/sslcommerz';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface SSLCommerzProps {
   payment: Settings<SSLCommerzFields>;
   type: 'payout' | 'payment';
}

const SSLCommerz = ({ payment, type }: SSLCommerzProps) => {
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
            type: 'sslcommerz',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        {settings.sslcommerz_settings}
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
                              {sslcommerzCurrency.map((c) => (
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
                           <Label>{input.store_id}</Label>
                           <Input
                              name="store_id"
                              defaultValue={payment.fields.store_id ?? ''}
                              placeholder="Enter the store ID"
                           />
                           <InputError message={errors.store_id} />
                           <p className="mt-1 text-sm text-gray-500">
                              {data.test_mode
                                 ? settings.use_test_mode_key.replace(
                                      ':key',
                                      'store ID',
                                   )
                                 : settings.use_live_mode_key.replace(
                                      ':key',
                                      'store ID',
                                   )}
                           </p>
                        </div>

                        <div>
                           <Label>{input.store_password}</Label>
                           <Input
                              name="store_password"
                              defaultValue={payment.fields.store_password ?? ''}
                              placeholder="Enter the store password"
                              type="password"
                           />
                           <InputError message={errors.store_password} />
                           <p className="mt-1 text-sm text-gray-500">
                              {data.test_mode
                                 ? settings.use_test_mode_key.replace(
                                      ':key',
                                      'store password',
                                   )
                                 : settings.use_live_mode_key.replace(
                                      ':key',
                                      'store password',
                                   )}
                           </p>
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

export default SSLCommerz;

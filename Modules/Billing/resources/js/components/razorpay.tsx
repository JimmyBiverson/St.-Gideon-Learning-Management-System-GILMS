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
import razorpayCurrency from '@/data/currencies/razorpay';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface RazorpayProps {
   payment: Settings<RazorpayFields>;
   type: 'payout' | 'payment';
}

const Razorpay = ({ payment, type }: RazorpayProps) => {
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
            type: 'razorpay',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        {settings.razorpay_settings}
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
                              {razorpayCurrency.map((c) => (
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
                           <Label>{input.api_key}</Label>
                           <Input
                              name="api_key"
                              defaultValue={payment.fields.api_key ?? ''}
                              placeholder={input.api_key_placeholder}
                           />
                           <InputError message={errors.api_key} />
                           <p className="mt-1 text-sm text-gray-500">
                              {data.test_mode
                                 ? settings.use_test_mode_key.replace(
                                      ':key',
                                      'public key',
                                   )
                                 : settings.use_live_mode_key.replace(
                                      ':key',
                                      'public key',
                                   )}
                           </p>
                        </div>

                        <div>
                           <Label>{input.api_secret}</Label>
                           <Input
                              name="api_secret"
                              defaultValue={payment.fields.api_secret ?? ''}
                              placeholder={input.api_secret_placeholder}
                              type="password"
                           />
                           <InputError message={errors.api_secret} />
                           <p className="mt-1 text-sm text-gray-500">
                              {data.test_mode
                                 ? settings.use_test_mode_key.replace(
                                      ':key',
                                      'secret key',
                                   )
                                 : settings.use_live_mode_key.replace(
                                      ':key',
                                      'secret key',
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

export default Razorpay;

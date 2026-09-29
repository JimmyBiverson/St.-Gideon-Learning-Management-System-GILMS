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
import paytabsCurrencies from '@/data/currencies/paytabs';
import { cn } from '@/lib/utils';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface PaytabsProps {
   payment: Settings<PaytabsFields>;
   type: 'payout' | 'payment';
}

const paytabsRegions = [
   { label: 'UAE (United Arab Emirates)', value: 'UAE' },
   { label: 'SAU (Saudi Arabia)', value: 'SAU' },
   { label: 'EGY (Egypt)', value: 'EGY' },
   { label: 'OMN (Oman)', value: 'OMN' },
   { label: 'JOR (Jordan)', value: 'JOR' },
   { label: 'IRQ (Iraq)', value: 'IRQ' },
   { label: 'Global', value: 'GLOBAL' },
];

const Paytabs = ({ payment, type }: PaytabsProps) => {
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
            type: 'paytabs',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200">
                     We couldn't test PayTabs from our end as our country does not support PayTabs. If you find any bug/issue please report (send email at support@ui-lib.com) back to us immediately, we'll fix that.
                  </div>

                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">Paytabs Settings</h2>

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

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                              {paytabsCurrencies.map((c) => (
                                 <SelectItem key={c.value} value={c.value}>
                                    {c.label} ({c.value})
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <InputError message={errors.currency} />
                     </div>

                     <div>
                        <Label>Region</Label>
                        <Select
                           name="region"
                           defaultValue={payment.fields.region ?? ''}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select region" />
                           </SelectTrigger>
                           <SelectContent>
                              {paytabsRegions.map((r) => (
                                 <SelectItem key={r.value} value={r.value}>
                                    {r.label}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <InputError message={errors.region} />
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

                  {/* Profile ID — single value, same for test and live */}
                  <div className="border-b pb-6">
                     <h3 className="mb-4 text-lg font-medium">
                        Merchant Profile
                     </h3>
                     <div>
                        <Label>Profile ID</Label>
                        <Input
                           name="profile_id"
                           defaultValue={payment.fields.profile_id ?? ''}
                           placeholder="e.g. 177903"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                           Found in your Paytabs dashboard under Developers →
                           API Keys (same for test and live)
                        </p>
                        <InputError message={errors.profile_id} />
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
                     <div>
                        <Label>Test Server Key</Label>
                        <Input
                           name="test_server_key"
                           defaultValue={payment.fields.test_server_key ?? ''}
                           placeholder="e.g. SJJ96JKMR8-JMTBR6TGH8-JWZ2RLIH92"
                           disabled={!data.test_mode}
                           type="password"
                        />
                        <InputError message={errors.test_server_key} />
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
                     <div>
                        <Label>Live Server Key</Label>
                        <Input
                           name="live_server_key"
                           defaultValue={payment.fields.live_server_key ?? ''}
                           placeholder="Enter live server key"
                           disabled={data.test_mode}
                           type="password"
                        />
                        <InputError message={errors.live_server_key} />
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

export default Paytabs;

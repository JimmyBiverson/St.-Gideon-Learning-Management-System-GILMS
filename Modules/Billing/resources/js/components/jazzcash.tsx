import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import Switch from '@/components/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { update as paymentUpdate } from '@/routes/payment-gateways';
import { update as payoutUpdate } from '@/routes/payouts/settings';
import { Form, useForm, usePage } from '@inertiajs/react';

interface JazzCashProps {
   payment: Settings<JazzCashFields>;
   type: 'payout' | 'payment';
}

const JazzCash = ({ payment, type }: JazzCashProps) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, button, common } = translate;

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
            type: 'jazzcash',
         })}
         className="space-y-6 rounded-lg border bg-card p-4 sm:p-6"
      >
         {({ processing, errors }) => {
            return (
               <>
                  <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200">
                     We couldn't test JazzCash from our end as our country does not support JazzCash. If you find any bug/issue please report (send email at support@ui-lib.com) back to us immediately, we'll fix that.
                  </div>

                  <div className="flex items-center justify-between pb-2">
                     <h2 className="text-xl font-semibold">
                        JazzCash Settings
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

                  {/* Sandbox Credentials */}
                  <div
                     className={cn('border-b pb-6', {
                        'opacity-60': !data.test_mode,
                     })}
                  >
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.sandbox_credentials}
                     </h3>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div>
                           <Label>Sandbox Merchant ID</Label>
                           <Input
                              name="test_merchant_id"
                              defaultValue={
                                 payment.fields.test_merchant_id ?? ''
                              }
                              placeholder="Enter sandbox merchant ID"
                              disabled={!data.test_mode}
                           />
                           <InputError message={errors.test_merchant_id} />
                        </div>
                        <div>
                           <Label>Sandbox Password</Label>
                           <Input
                              name="test_password"
                              defaultValue={payment.fields.test_password ?? ''}
                              placeholder="Enter sandbox password"
                              disabled={!data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.test_password} />
                        </div>
                        <div>
                           <Label>Sandbox Integrity Salt</Label>
                           <Input
                              name="test_integrity_salt"
                              defaultValue={
                                 payment.fields.test_integrity_salt ?? ''
                              }
                              placeholder="Enter sandbox integrity salt"
                              disabled={!data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.test_integrity_salt} />
                        </div>
                     </div>
                  </div>

                  {/* Production Credentials */}
                  <div
                     className={cn('space-y-6', {
                        'opacity-60': data.test_mode,
                     })}
                  >
                     <h3 className="mb-4 text-lg font-medium">
                        {settings.production_credentials}
                     </h3>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div>
                           <Label>Live Merchant ID</Label>
                           <Input
                              name="live_merchant_id"
                              defaultValue={
                                 payment.fields.live_merchant_id ?? ''
                              }
                              placeholder="Enter live merchant ID"
                              disabled={data.test_mode}
                           />
                           <InputError message={errors.live_merchant_id} />
                        </div>
                        <div>
                           <Label>Live Password</Label>
                           <Input
                              name="live_password"
                              defaultValue={payment.fields.live_password ?? ''}
                              placeholder="Enter live password"
                              disabled={data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.live_password} />
                        </div>
                        <div>
                           <Label>Live Integrity Salt</Label>
                           <Input
                              name="live_integrity_salt"
                              defaultValue={
                                 payment.fields.live_integrity_salt ?? ''
                              }
                              placeholder="Enter live integrity salt"
                              disabled={data.test_mode}
                              type="password"
                           />
                           <InputError message={errors.live_integrity_salt} />
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

export default JazzCash;

import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update as googleAnalyticsUpdate } from '@/routes/google-analytics';

interface Props extends Omit<SharedData, 'googleAnalytics'> {
   googleAnalytics: Settings<GoogleAnalyticsFields>;
}

const GoogleAnalytics = ({ googleAnalytics }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button } = translate;
   const fields = googleAnalytics.fields as GoogleAnalyticsFields;

   const [analyticsEnabled, setAnalyticsEnabled] = useState(
      fields.analytics_enabled ?? false,
   );
   const [mpEnabled, setMpEnabled] = useState(fields.mp_enabled ?? false);
   const [debugMode, setDebugMode] = useState(fields.debug_mode ?? false);

   return (
      <>
         <Breadcrumbs
            title={
               settings.google_analytics_settings || 'Google Analytics Settings'
            }
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Google Analytics' },
            ]}
            className="mb-4"
         />

         <div className="grid grid-cols-1 gap-6 md:px-3 lg:grid-cols-3">
            <div className="lg:col-span-2">
               <Card className="p-4 sm:p-6">
                  <Form
                     {...googleAnalyticsUpdate.form(Number(googleAnalytics.id))}
                     transform={(formData) => ({
                        ...fields,
                        ...formData,
                        analytics_enabled: analyticsEnabled,
                        mp_enabled: mpEnabled,
                        debug_mode: debugMode,
                     })}
                     options={{ preserveScroll: true }}
                     className="space-y-6"
                  >
                     {({ processing, errors }) => (
                        <>
                           {/* Browser gtag.js */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <Label className="text-base">
                                       {input.analytics_enabled ||
                                          'Enable Google Analytics'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                       Tracks page views and engagement using
                                       the gtag.js JavaScript library.
                                    </p>
                                 </div>
                                 <Switch
                                    checked={analyticsEnabled}
                                    onCheckedChange={setAnalyticsEnabled}
                                 />
                              </div>

                              <div>
                                 <Label htmlFor="measurement_id">
                                    {input.measurement_id || 'Measurement ID'}
                                 </Label>
                                 <Input
                                    id="measurement_id"
                                    name="measurement_id"
                                    defaultValue={fields.measurement_id || ''}
                                    placeholder={
                                       input.measurement_id_placeholder ||
                                       'e.g. G-XXXXXXXXXX'
                                    }
                                 />
                                 <InputError message={errors.measurement_id} />
                              </div>
                           </div>

                           <Separator />

                           {/* Measurement Protocol */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <Label className="text-base">
                                       {input.mp_enabled ||
                                          'Enable Measurement Protocol'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                       Sends server-side events (e.g.
                                       registration, purchase) directly to
                                       Google. Optional, more reliable than the
                                       browser tag alone. When on, sign-up and
                                       purchase events are sent server-side
                                       instead of from the browser to avoid
                                       double counting.
                                    </p>
                                 </div>
                                 <Switch
                                    checked={mpEnabled}
                                    onCheckedChange={setMpEnabled}
                                 />
                              </div>

                              <div>
                                 <Label htmlFor="api_secret">
                                    {input.api_secret ||
                                       'Measurement Protocol API Secret'}
                                 </Label>
                                 <Input
                                    id="api_secret"
                                    name="api_secret"
                                    type="password"
                                    defaultValue={fields.api_secret || ''}
                                    placeholder={
                                       input.api_secret_placeholder ||
                                       'Enter your Measurement Protocol API secret'
                                    }
                                 />
                                 <InputError message={errors.api_secret} />
                              </div>

                              <div className="flex items-center justify-between">
                                 <div>
                                    <Label className="text-base">
                                       {input.debug_mode || 'Debug Mode'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                       Routes events to Google's validation
                                       endpoint for testing. Turn this off once
                                       you've confirmed events arrive.
                                    </p>
                                 </div>
                                 <Switch
                                    checked={debugMode}
                                    onCheckedChange={setDebugMode}
                                 />
                              </div>
                           </div>

                           <LoadingButton
                              loading={processing}
                              className="float-end"
                           >
                              {button.save_changes}
                           </LoadingButton>
                        </>
                     )}
                  </Form>
               </Card>
            </div>

            <div className="space-y-6">
               <Card className="space-y-5 py-6">
                  <CardHeader>
                     <CardTitle className="text-lg">
                        Where to find these
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                     <div>
                        <h4 className="mb-1 font-medium text-foreground">
                           Measurement ID
                        </h4>
                        <p>
                           analytics.google.com → Admin → Data streams → your
                           web stream → shown as G-XXXXXXXXXX.
                        </p>
                     </div>
                     <div>
                        <h4 className="mb-1 font-medium text-foreground">
                           API Secret
                        </h4>
                        <p>
                           Same data stream panel → Measurement Protocol API
                           secrets → Create.
                        </p>
                     </div>
                     <div>
                        <h4 className="mb-1 font-medium text-foreground">
                           Verifying it works
                        </h4>
                        <p>
                           Reports → Realtime (browser events, seconds) or Admin
                           → DebugView (with Debug Mode on above).
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   );
};

GoogleAnalytics.layout = (page: ReactNode) => (
   <DashboardLayout children={page} />
);

export default GoogleAnalytics;

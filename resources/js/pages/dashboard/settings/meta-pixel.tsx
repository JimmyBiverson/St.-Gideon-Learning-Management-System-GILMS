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
import { update as metaPixelUpdate } from '@/routes/meta-pixel';

interface Props extends Omit<SharedData, 'metaPixel'> {
   metaPixel: Settings<MetaPixelFields>;
}

const MetaPixel = ({ metaPixel }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button } = translate;
   const fields = metaPixel.fields as MetaPixelFields;

   const [pixelEnabled, setPixelEnabled] = useState(
      fields.pixel_enabled ?? false,
   );
   const [capiEnabled, setCapiEnabled] = useState(fields.capi_enabled ?? false);

   return (
      <>
         <Breadcrumbs
            title={settings.meta_pixel_settings || 'Meta Pixel Settings'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Meta Pixel' },
            ]}
            className="mb-4"
         />

         <div className="grid grid-cols-1 gap-6 md:px-3 lg:grid-cols-3">
            <div className="lg:col-span-2">
               <Card className="p-4 sm:p-6">
                  <Form
                     {...metaPixelUpdate.form(Number(metaPixel.id))}
                     transform={(formData) => ({
                        ...fields,
                        ...formData,
                        pixel_enabled: pixelEnabled,
                        capi_enabled: capiEnabled,
                     })}
                     options={{ preserveScroll: true }}
                     className="space-y-6"
                  >
                     {({ processing, errors }) => (
                        <>
                           {/* Browser Pixel */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <Label className="text-base">
                                       {input.pixel_enabled ||
                                          'Enable Browser Pixel'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                       Tracks page views and client-side events
                                       using the Meta Pixel JavaScript SDK.
                                    </p>
                                 </div>
                                 <Switch
                                    checked={pixelEnabled}
                                    onCheckedChange={setPixelEnabled}
                                 />
                              </div>

                              <div>
                                 <Label htmlFor="pixel_id">
                                    {input.pixel_id || 'Pixel ID'}
                                 </Label>
                                 <Input
                                    id="pixel_id"
                                    name="pixel_id"
                                    defaultValue={fields.pixel_id || ''}
                                    placeholder={
                                       input.pixel_id_placeholder ||
                                       'e.g. 1234567890123456'
                                    }
                                 />
                                 <InputError message={errors.pixel_id} />
                              </div>
                           </div>

                           <Separator />

                           {/* Conversions API */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <Label className="text-base">
                                       {input.capi_enabled ||
                                          'Enable Conversions API'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                       Sends server-side events (e.g.
                                       registration, purchase) directly to Meta.
                                       Optional, more reliable than the browser
                                       pixel alone.
                                    </p>
                                 </div>
                                 <Switch
                                    checked={capiEnabled}
                                    onCheckedChange={setCapiEnabled}
                                 />
                              </div>

                              <div>
                                 <Label htmlFor="access_token">
                                    {input.access_token ||
                                       'Conversions API Access Token'}
                                 </Label>
                                 <Input
                                    id="access_token"
                                    name="access_token"
                                    type="password"
                                    defaultValue={fields.access_token || ''}
                                    placeholder={
                                       input.access_token_placeholder ||
                                       'Enter your Conversions API access token'
                                    }
                                 />
                                 <InputError message={errors.access_token} />
                              </div>

                              <div>
                                 <Label htmlFor="test_event_code">
                                    {input.test_event_code || 'Test Event Code'}
                                 </Label>
                                 <Input
                                    id="test_event_code"
                                    name="test_event_code"
                                    defaultValue={fields.test_event_code || ''}
                                    placeholder={
                                       input.test_event_code_placeholder ||
                                       'e.g. TEST12345 (optional, for testing only)'
                                    }
                                 />
                                 <InputError message={errors.test_event_code} />
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
                           Pixel ID
                        </h4>
                        <p>
                           Meta Events Manager → select your pixel → shown under
                           the pixel name / Settings tab.
                        </p>
                     </div>
                     <div>
                        <h4 className="mb-1 font-medium text-foreground">
                           Access Token
                        </h4>
                        <p>
                           Events Manager → Settings → Conversions API →
                           Generate access token.
                        </p>
                     </div>
                     <div>
                        <h4 className="mb-1 font-medium text-foreground">
                           Test Event Code
                        </h4>
                        <p>
                           Events Manager → Test Events tab. Remove it once
                           you've confirmed events arrive.
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   );
};

MetaPixel.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default MetaPixel;

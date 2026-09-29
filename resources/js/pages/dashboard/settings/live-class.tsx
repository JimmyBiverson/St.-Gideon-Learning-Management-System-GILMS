import { Form, usePage } from '@inertiajs/react';
import { Video } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/live-class';

interface Props extends SharedData {
   liveClass: Settings<ZoomConfigFields>;
}

const LiveClass = ({ liveClass }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input } = translate;
   const fields = liveClass.fields as ZoomConfigFields;
   const [zoomWebSdk, setZoomWebSdk] = useState(fields.zoom_web_sdk ?? false);

   return (
      <>
         <Breadcrumbs
            title={settings.live_class_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Live Class Settings' },
            ]}
            className="mb-4"
         />

         <div className="space-y-6 md:px-3">
            {/* Settings Form */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
               <div className="lg:col-span-2">
                  <Card className="space-y-6 py-6">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Video className="h-5 w-5" />
                           {settings.configure_zoom}
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <Form
                           {...update.form(liveClass.id)}
                           transform={(formData) => ({
                              ...fields,
                              ...formData,
                              zoom_web_sdk: zoomWebSdk,
                           })}
                           options={{ preserveScroll: true }}
                           className="space-y-6"
                        >
                           {({ processing, errors }) => (
                              <>
                                 {/* Account Email */}
                                 <div className="space-y-2">
                                    <Label htmlFor="zoom_account_email">
                                       {input.account_email}{' '}
                                       <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                       id="zoom_account_email"
                                       type="email"
                                       name="zoom_account_email"
                                       defaultValue={
                                          fields.zoom_account_email ?? ''
                                       }
                                       placeholder={
                                          input.zoom_account_email_placeholder
                                       }
                                       required
                                    />
                                    {errors.zoom_account_email && (
                                       <p className="text-sm text-red-500">
                                          {errors.zoom_account_email}
                                       </p>
                                    )}
                                 </div>

                                 {/* Account ID */}
                                 <div className="space-y-2">
                                    <Label htmlFor="zoom_account_id">
                                       {input.account_id}{' '}
                                       <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                       id="zoom_account_id"
                                       type="text"
                                       name="zoom_account_id"
                                       defaultValue={
                                          fields.zoom_account_id ?? ''
                                       }
                                       placeholder={
                                          input.zoom_account_id_placeholder
                                       }
                                       required
                                    />
                                    {errors.zoom_account_id && (
                                       <p className="text-sm text-red-500">
                                          {errors.zoom_account_id}
                                       </p>
                                    )}
                                 </div>

                                 {/* Client ID */}
                                 <div className="space-y-2">
                                    <Label htmlFor="zoom_client_id">
                                       {input.client_id}{' '}
                                       <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                       id="zoom_client_id"
                                       type="text"
                                       name="zoom_client_id"
                                       defaultValue={
                                          fields.zoom_client_id ?? ''
                                       }
                                       placeholder={
                                          input.zoom_client_id_placeholder
                                       }
                                       required
                                    />
                                    {errors.zoom_client_id && (
                                       <p className="text-sm text-red-500">
                                          {errors.zoom_client_id}
                                       </p>
                                    )}
                                 </div>

                                 {/* Client Secret */}
                                 <div className="space-y-2">
                                    <Label htmlFor="zoom_client_secret">
                                       Client Secret{' '}
                                       <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                       id="zoom_client_secret"
                                       type="password"
                                       name="zoom_client_secret"
                                       defaultValue={
                                          fields.zoom_client_secret ?? ''
                                       }
                                       placeholder={
                                          input.zoom_client_secret_placeholder
                                       }
                                       required
                                    />
                                    {errors.zoom_client_secret && (
                                       <p className="text-sm text-red-500">
                                          {errors.zoom_client_secret}
                                       </p>
                                    )}
                                 </div>

                                 <Separator />

                                 {/* Web SDK Option */}
                                 <div className="space-y-4">
                                    <Label className="mb-4">
                                       Do you want to use Web SDK for your live
                                       class?{' '}
                                       <span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
                                       name="zoom_web_sdk"
                                       defaultValue={
                                          zoomWebSdk ? 'activate' : 'deactivate'
                                       }
                                       onValueChange={(value) =>
                                          setZoomWebSdk(value === 'activate')
                                       }
                                       className="flex gap-6"
                                    >
                                       <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                             id="activate"
                                             value="activate"
                                             className="cursor-pointer"
                                          />
                                          <Label
                                             htmlFor="activate"
                                             className="mb-0"
                                          >
                                             Yes
                                          </Label>
                                       </div>
                                       <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                             id="deactivate"
                                             value="deactivate"
                                             className="cursor-pointer"
                                          />
                                          <Label
                                             htmlFor="deactivate"
                                             className="mb-0"
                                          >
                                             No
                                          </Label>
                                       </div>
                                    </RadioGroup>
                                    {errors.zoom_web_sdk && (
                                       <p className="text-sm text-red-500">
                                          {errors.zoom_web_sdk}
                                       </p>
                                    )}
                                 </div>

                                 {/* Web SDK Credentials */}
                                 {zoomWebSdk && (
                                    <div className="space-y-4 rounded-lg border bg-muted p-4">
                                       <h4 className="text-muted-foreground">
                                          Meeting SDK Credentials
                                       </h4>

                                       <div className="space-y-2">
                                          <Label>
                                             Meeting SDK Client ID{' '}
                                             <span className="text-red-500">
                                                *
                                             </span>
                                          </Label>
                                          <Input
                                             required
                                             type="text"
                                             name="zoom_sdk_client_id"
                                             defaultValue={
                                                fields.zoom_sdk_client_id ?? ''
                                             }
                                             placeholder="Enter your Meeting SDK client ID"
                                          />
                                          {errors.zoom_sdk_client_id && (
                                             <p className="text-sm text-red-500">
                                                {errors.zoom_sdk_client_id}
                                             </p>
                                          )}
                                       </div>

                                       <div className="space-y-2">
                                          <Label>
                                             Meeting SDK Client Secret{' '}
                                             <span className="text-red-500">
                                                *
                                             </span>
                                          </Label>
                                          <Input
                                             required
                                             type="password"
                                             name="zoom_sdk_client_secret"
                                             defaultValue={
                                                fields.zoom_sdk_client_secret ??
                                                ''
                                             }
                                             placeholder="Enter your Meeting SDK client secret"
                                          />
                                          {errors.zoom_sdk_client_secret && (
                                             <p className="text-sm text-red-500">
                                                {errors.zoom_sdk_client_secret}
                                             </p>
                                          )}
                                       </div>
                                    </div>
                                 )}

                                 {/* Submit Button */}
                                 <Button
                                    type="submit"
                                    disabled={processing}
                                    className="float-end mt-2 w-full sm:w-auto"
                                 >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                 </Button>
                              </>
                           )}
                        </Form>
                     </CardContent>
                  </Card>
               </div>

               {/* Help Section */}
               <div className="space-y-6">
                  <Card className="space-y-6 py-6">
                     <CardHeader>
                        <CardTitle className="text-lg">
                           Setup Instructions
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                           <h4 className="mb-2 font-medium">
                              Step 1: Create Zoom App
                           </h4>
                           <p className="text-sm text-muted-foreground">
                              Go to the Zoom Marketplace and create a
                              Server-to-Server OAuth app.
                           </p>
                        </div>

                        <div>
                           <h4 className="mb-2 font-medium">
                              Step 2: Get Credentials
                           </h4>
                           <p className="text-sm text-muted-foreground">
                              Copy your Account ID, Client ID, and Client Secret
                              from your app settings.
                           </p>
                        </div>

                        <div>
                           <h4 className="mb-2 font-medium">
                              Step 3: Web SDK (Optional)
                           </h4>
                           <p className="text-sm text-muted-foreground">
                              If you want to embed Zoom meetings directly in
                              your website, enable Web SDK and provide Meeting
                              SDK credentials.
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="space-y-5 py-6">
                     <CardHeader>
                        <CardTitle className="text-lg">
                           Required Scopes
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <ul className="space-y-1 text-sm">
                           <li>• meeting:write</li>
                           <li>• meeting:read</li>
                           <li>• user:read</li>
                        </ul>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </>
   );
};

LiveClass.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default LiveClass;

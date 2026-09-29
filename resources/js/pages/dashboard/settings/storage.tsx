import { Form, usePage } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update as storageUpdate } from '@/routes/storage';

type StorageFormData = StorageFields & Record<string, string | boolean>;

interface Props extends SharedData {
   storage: Settings<StorageFormData>;
}

const Storage = ({ storage }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button } = translate;

   const [storageDriver, setStorageDriver] = useState(
      () => storage.fields.storage_driver as 'local' | 's3' | 'r2' | 'bunny',
   );

   return (
      <>
         <Breadcrumbs
            title={settings.storage_settings}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Storage Settings' },
            ]}
            className="mb-4"
         />

         <div className="md:px-3">
            <Card className="p-4 sm:p-6">
               <Form
                  {...storageUpdate.form(Number(storage.id))}
                  transform={(formData) => ({ ...storage.fields, ...formData })}
                  options={{ preserveScroll: true }}
                  className="space-y-6"
               >
                  {({ processing, errors }) => (
                     <>
                        <div>
                           <Label>{input.storage_driver} *</Label>
                           <Select
                              name="storage_driver"
                              defaultValue={storage.fields.storage_driver}
                              onValueChange={(value) =>
                                 setStorageDriver(
                                    value as 'local' | 's3' | 'r2' | 'bunny',
                                 )
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder={input.select_option}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="local">Local</SelectItem>
                                 <SelectItem value="s3">AWS S3</SelectItem>
                                 <SelectItem value="r2">
                                    Cloudflare R2
                                 </SelectItem>
                                 <SelectItem value="bunny">
                                    Bunny Stream
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <InputError message={errors.storage_driver} />
                           {storageDriver === 'bunny' && (
                              <p className="mt-2 text-xs text-muted-foreground">
                                 Bunny only hosts lesson videos — it has no file
                                 storage of its own for images, documents, or
                                 course previews, so those keep using the local
                                 disk while Bunny is selected.
                              </p>
                           )}
                        </div>

                        {(storageDriver === 's3' || storageDriver === 'r2') && (
                           <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
                              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              <AlertTitle className="text-amber-800 dark:text-amber-200">
                                 CORS must be configured on your bucket
                              </AlertTitle>
                              <AlertDescription className="text-amber-700 dark:text-amber-300">
                                 <p>
                                    Videos and files now upload directly from
                                    the visitor&apos;s browser to your{' '}
                                    {storageDriver === 's3'
                                       ? 'S3 bucket'
                                       : 'R2 bucket'}{' '}
                                    for speed — your server is no longer in the
                                    middle. The bucket must explicitly allow
                                    this, or uploads will fail.
                                 </p>
                                 <p className="mt-2">
                                    In{' '}
                                    {storageDriver === 's3'
                                       ? 'the S3 console (Permissions → CORS)'
                                       : 'your R2 dashboard (Settings → CORS Policy)'}
                                    , add a rule allowing your site&apos;s
                                    domain, for example:
                                 </p>
                                 <pre className="mt-2 overflow-x-auto rounded bg-amber-100 p-2 text-xs whitespace-pre dark:bg-amber-900/40">
                                    {`[
  {
    "AllowedOrigins": ["https://your-domain.com"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]`}
                                 </pre>
                                 <p className="mt-2">
                                    <code>
                                       ExposeHeaders: [&quot;ETag&quot;]
                                    </code>{' '}
                                    is required — without it the browser
                                    can&apos;t read the value it needs to finish
                                    the upload, and every upload will fail.
                                 </p>
                              </AlertDescription>
                           </Alert>
                        )}

                        {storageDriver === 's3' && (
                           <>
                              <div>
                                 <Label>{input.aws_access_key_id} *</Label>
                                 <Input
                                    name="aws_access_key_id"
                                    defaultValue={
                                       storage.fields.aws_access_key_id || ''
                                    }
                                    placeholder={
                                       input.aws_access_key_id_placeholder
                                    }
                                 />
                                 <InputError
                                    message={errors.aws_access_key_id}
                                 />
                              </div>

                              <div>
                                 <Label>{input.secret_access_key}</Label>
                                 <Input
                                    type="password"
                                    name="aws_secret_access_key"
                                    defaultValue={
                                       storage.fields.aws_secret_access_key ||
                                       ''
                                    }
                                    placeholder={
                                       input.secret_access_key_placeholder
                                    }
                                 />
                                 <InputError
                                    message={errors.aws_secret_access_key}
                                 />
                              </div>
                              <div>
                                 <Label>{input.aws_default_region} *</Label>
                                 <Input
                                    name="aws_default_region"
                                    defaultValue={
                                       storage.fields.aws_default_region || ''
                                    }
                                    placeholder={
                                       input.aws_default_region_placeholder
                                    }
                                 />
                                 <InputError
                                    message={errors.aws_default_region}
                                 />
                              </div>
                              <div>
                                 <Label>{input.bucket_name} *</Label>
                                 <Input
                                    name="aws_bucket"
                                    defaultValue={
                                       storage.fields.aws_bucket || ''
                                    }
                                    placeholder={input.bucket_name_placeholder}
                                 />
                                 <InputError message={errors.aws_bucket} />
                              </div>
                           </>
                        )}

                        {storageDriver === 'r2' && (
                           <>
                              <div>
                                 <Label>Account ID or Access Key *</Label>
                                 <Input
                                    name="r2_access_key_id"
                                    defaultValue={
                                       storage.fields.r2_access_key_id || ''
                                    }
                                    placeholder="Enter R2 Access Key ID"
                                 />
                                 <InputError
                                    message={errors.r2_access_key_id}
                                 />
                              </div>

                              <div>
                                 <Label>Secret Access Key *</Label>
                                 <Input
                                    type="password"
                                    name="r2_secret_access_key"
                                    defaultValue={
                                       storage.fields.r2_secret_access_key || ''
                                    }
                                    placeholder="Enter R2 Secret Access Key"
                                 />
                                 <InputError
                                    message={errors.r2_secret_access_key}
                                 />
                              </div>

                              <div>
                                 <Label>Bucket Name *</Label>
                                 <Input
                                    name="r2_bucket"
                                    defaultValue={
                                       storage.fields.r2_bucket || ''
                                    }
                                    placeholder="Enter R2 Bucket Name"
                                 />
                                 <InputError message={errors.r2_bucket} />
                              </div>

                              <div>
                                 <Label>Endpoint *</Label>
                                 <Input
                                    name="r2_endpoint"
                                    defaultValue={
                                       storage.fields.r2_endpoint || ''
                                    }
                                    placeholder="Enter R2 Endpoint"
                                 />
                                 <InputError message={errors.r2_endpoint} />
                              </div>

                              <div>
                                 <Label>Public URL (Optional)</Label>
                                 <Input
                                    name="r2_public_url"
                                    defaultValue={
                                       storage.fields.r2_public_url || ''
                                    }
                                    placeholder="https://<account-id>.r2.cloudflarestorage.com"
                                 />
                                 <InputError message={errors.r2_public_url} />
                              </div>

                              <div>
                                 <Label>Region</Label>
                                 <Input
                                    name="r2_region"
                                    defaultValue={
                                       storage.fields.r2_region || 'auto'
                                    }
                                    placeholder="auto"
                                 />
                                 <InputError message={errors.r2_region} />
                              </div>
                           </>
                        )}

                        {storageDriver === 'bunny' && (
                           <>
                              <div>
                                 <Label>Bunny Library ID *</Label>
                                 <Input
                                    name="bunny_library_id"
                                    defaultValue={
                                       storage.fields.bunny_library_id || ''
                                    }
                                    placeholder="Enter your Bunny Stream Library ID"
                                 />
                                 <InputError
                                    message={errors.bunny_library_id}
                                 />
                              </div>

                              <div>
                                 <Label>Bunny Stream API Key *</Label>
                                 <Input
                                    type="password"
                                    name="bunny_api_key"
                                    defaultValue={
                                       storage.fields.bunny_api_key || ''
                                    }
                                    placeholder="Enter your Bunny Stream API key"
                                 />
                                 <InputError message={errors.bunny_api_key} />
                              </div>

                              <div>
                                 <Label>Bunny Token Authentication Key *</Label>
                                 <Input
                                    type="password"
                                    name="bunny_token_auth_key"
                                    defaultValue={
                                       storage.fields.bunny_token_auth_key || ''
                                    }
                                    placeholder="Enter your library's Token Authentication security key"
                                 />
                                 <p className="mt-1 text-xs text-muted-foreground">
                                    Enable Token Authentication on this library
                                    in the Bunny dashboard first, then copy its
                                    security key here — this is what signs every
                                    lesson's playback URL.
                                 </p>
                                 <InputError
                                    message={errors.bunny_token_auth_key}
                                 />
                              </div>
                           </>
                        )}

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
      </>
   );
};

Storage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Storage;

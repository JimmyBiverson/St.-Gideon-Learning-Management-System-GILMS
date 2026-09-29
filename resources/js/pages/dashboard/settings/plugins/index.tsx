import { router, usePage } from '@inertiajs/react';
import { CheckCircle, Upload } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/layout';
import { store } from '@/routes/plugins';
import PluginCard from './partials/plugin-card';

const PluginsIndex = () => {
   const { props } = usePage<PluginsPageProps>();
   const { plugins, translate } = props;
   const { dashboard, button, common } = translate;

   const [isSubmit, setIsSubmit] = useState(false);
   const [isFileSelected, setIsFileSelected] = useState(false);
   const [selectedFileName, setSelectedFileName] = useState('');
   const [pluginFileUrl, setPluginFileUrl] = useState('');
   const [errors, setErrors] = useState<Record<string, string>>({});
   const submitRequestedRef = useRef(false);

   const resetUploadState = () => {
      setIsSubmit(false);
      submitRequestedRef.current = false;
      setIsFileSelected(false);
      setSelectedFileName('');
      setPluginFileUrl('');
      setErrors({});
   };

   const installPlugin = (fileUrl: string) => {
      setIsSubmit(true);
      router.post(
         store(),
         { plugin_file_url: fileUrl },
         {
            preserveScroll: true,
            onSuccess: () => {
               resetUploadState();
            },
            onError: (formErrors) => {
               setErrors(formErrors as Record<string, string>);
               setIsSubmit(false);
               submitRequestedRef.current = false;
            },
            onFinish: () => {
               setIsSubmit(false);
            },
         },
      );
   };

   const handleInstall = () => {
      if (!isFileSelected) {
         return;
      }

      submitRequestedRef.current = true;

      if (pluginFileUrl) {
         installPlugin(pluginFileUrl);

         return;
      }

      setIsSubmit(true);
   };

   return (
      <>
         <Breadcrumbs
            title={dashboard.plugins ?? 'Plugins'}
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Settings' },
               { title: 'Plugins' },
            ]}
            className="mb-4"
         />

         <div className="space-y-6">
            <Card className="py-4 md:py-6">
               <CardContent className="space-y-4 px-4 md:px-6">
                  <Label className="flex items-center gap-2">
                     <Upload className="h-4 w-4" />
                     Upload plugin
                  </Label>
                  <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
                     <ChunkedUploaderInput
                        className="w-full sm:rounded-r-none"
                        inputClass="sm:rounded-r-none"
                        buttonClass="sm:rounded-r-none"
                        isSubmit={isSubmit && !pluginFileUrl}
                        storage="local"
                        filetype="zip"
                        delayUpload={true}
                        onFileSelected={(file) => {
                           setIsFileSelected(true);
                           setSelectedFileName(file.name);
                           setErrors({});
                        }}
                        onFileUploaded={(fileData) => {
                           setPluginFileUrl(fileData.file_url ?? '');

                           if (submitRequestedRef.current) {
                              installPlugin(fileData.file_url ?? '');
                           }
                        }}
                        onError={() => {
                           resetUploadState();
                        }}
                        onCancelUpload={() => {
                           resetUploadState();
                        }}
                     />

                     <LoadingButton
                        size="lg"
                        type="button"
                        disabled={!isFileSelected || isSubmit}
                        loading={isSubmit}
                        onClick={handleInstall}
                        className="w-full sm:w-auto md:rounded-l-none"
                     >
                        {isSubmit
                           ? pluginFileUrl
                              ? 'Installing...'
                              : 'Uploading...'
                           : (button.upload ?? 'Install plugin')}
                     </LoadingButton>
                  </div>

                  <InputError
                     message={String(
                        errors.plugin_file_url || errors.plugin || '',
                     )}
                  />

                  <p className="text-xs text-muted-foreground">
                     Large deploy ZIPs upload in chunks (up to 256 MB). The
                     package must contain Modules/&#123;Name&#125;,
                     public/build, and bootstrap/ssr.
                  </p>

                  {isFileSelected && selectedFileName && (
                     <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
                        <div className="flex items-start gap-2">
                           <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                           <div>
                              <p className="text-sm text-green-800 dark:text-green-300">
                                 <strong>Selected file:</strong>{' '}
                                 {selectedFileName}
                              </p>
                              {pluginFileUrl && (
                                 <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                                    Upload complete. Click install to deploy the
                                    plugin.
                                 </p>
                              )}
                           </div>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            <h4 className="text-xl font-semibold">Installed plugins</h4>

            {plugins.length > 0 ? (
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {plugins.map((plugin) => (
                     <PluginCard key={plugin.name} plugin={plugin} />
                  ))}
               </div>
            ) : (
               <p className="p-4 text-sm text-muted-foreground md:p-6">
                  {common.no_results ??
                     'No uploaded plugins yet. Install a plugin ZIP to see it here.'}
               </p>
            )}
         </div>
      </>
   );
};

PluginsIndex.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default PluginsIndex;

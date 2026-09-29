import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import WarningModal from '@/components/warning-modal';
import {
   refresh,
   updatePackageStore,
   updateSeeder,
   updateStart,
   updateRollback,
   updateStep,
} from '@/routes/system';
import { router } from '@inertiajs/react';
import {
   AlertTriangle,
   CheckCircle,
   Database,
   Loader2,
   RefreshCw,
   Upload,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { UpdatePackageItem } from './update-package-list';
import UpdatePackageList from './update-package-list';

interface Props {
   version: string;
   packages: UpdatePackageItem[];
   diskUsage: number;
   updateState: UpdateRunPayload;
}

type UpdatePhase =
   | 'idle'
   | 'uploading'
   | 'registering'
   | 'installing'
   | 'done'
   | 'failed';

export interface UpdateRunPayload {
   run_id: string | null;
   status: 'idle' | 'processing' | 'stalled' | 'done' | 'failed';
   phase: string;
   phase_label: string;
   message: string;
   package: string | null;
   package_id: number | null;
   target_version: string | null;
   files_done: number;
   files_total: number;
   percent: number;
   can_rollback: boolean;
   resumable: boolean;
}

/**
 * Delay between step calls. The server does ~10s of work per call, so this is
 * only breathing room for the browser, not a poll interval.
 */
const STEP_PAUSE_MS = 250;

/** Consecutive step failures tolerated before giving up and reporting it. */
const MAX_STEP_RETRIES = 5;

function csrfToken(): string {
   return (
      document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
         ?.content ?? ''
   );
}

async function postJson(
   url: string,
   body: Record<string, unknown> = {},
): Promise<Response> {
   return fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'X-CSRF-TOKEN': csrfToken(),
      },
      body: JSON.stringify(body),
   });
}

const ApplicationUpdate = ({
   version,
   packages,
   diskUsage,
   updateState,
}: Props) => {
   const [open, setOpen] = useState(false);
   const [phase, setPhase] = useState<UpdatePhase>('idle');
   const [isFileSelected, setIsFileSelected] = useState(false);
   const [selectedFileName, setSelectedFileName] = useState<string>('');
   const [upgradingName, setUpgradingName] = useState<string>('');
   const [extractError, setExtractError] = useState<string>('');
   const [validationErrors, setValidationErrors] = useState<string[]>([]);
   const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
   const [progress, setProgress] = useState<UpdateRunPayload | null>(null);
   const [lastPackageId, setLastPackageId] = useState<number | null>(null);

   // Set when the user leaves or cancels, so an in-flight loop stops asking
   // for more steps instead of continuing behind a closed dialog.
   const abandonedRef = useRef(false);

   const isUploading = phase === 'uploading' || phase === 'registering';
   const isProcessing = isUploading || phase === 'installing';

   // A run left behind by a closed browser or a killed process. The server
   // still has the cursor, so this is offered as Resume rather than restart.
   const interruptedRun =
      updateState.resumable && updateState.status !== 'idle'
         ? updateState
         : null;

   // ── The step loop ────────────────────────────────────────────────────────

   /**
    * Drive the run to completion by calling /system/update-step repeatedly.
    *
    * Each call does a bounded slice of work server-side and returns well inside
    * any web server timeout, so there is no long request to be cut off. A call
    * that fails anyway is retried a few times: the cursor is on disk, so a
    * retry resumes rather than restarts.
    */
   const runSteps = useCallback(async () => {
      let failures = 0;

      for (;;) {
         if (abandonedRef.current) {
            return;
         }

         try {
            const res = await postJson(updateStep.url());

            if (!res.ok) {
               throw new Error(`Step returned ${res.status}`);
            }

            const state: UpdateRunPayload = await res.json();
            failures = 0;
            setProgress(state);

            if (state.status === 'done') {
               setPhase('done');
               setTimeout(() => router.visit(updateSeeder.url()), 1500);

               return;
            }

            if (state.status === 'failed') {
               setPhase('failed');
               setExtractError(
                  state.message || 'The update stopped with an error.',
               );

               return;
            }
         } catch (error) {
            failures++;

            if (failures >= MAX_STEP_RETRIES) {
               setPhase('failed');
               setExtractError(
                  'Lost contact with the server while installing. Nothing has been lost — reopen this dialog to resume from where it stopped.',
               );
               console.warn('Update step failed repeatedly:', error);

               return;
            }

            // Back off a little before retrying a step that failed.
            await new Promise((resolve) =>
               setTimeout(resolve, 1000 * failures),
            );

            continue;
         }

         await new Promise((resolve) => setTimeout(resolve, STEP_PAUSE_MS));
      }
   }, []);

   // Stop asking for steps once this component goes away.
   useEffect(
      () => () => {
         abandonedRef.current = true;
      },
      [],
   );

   // ── Step one: upload & verify ────────────────────────────────────────────

   const registerPackage = (uploadId: number) => {
      setPhase('registering');

      router.post(
         updatePackageStore.url(),
         { upload_id: uploadId },
         {
            preserveScroll: true,
            onFinish: () => {
               setPhase('idle');
               setIsFileSelected(false);
               setSelectedFileName('');
            },
         },
      );
   };

   // ── Step two: install ────────────────────────────────────────────────────

   const dispatchUpdate = useCallback(
      async (packageId: number) => {
         abandonedRef.current = false;
         setLastPackageId(packageId);
         setExtractError('');
         setValidationErrors([]);
         setValidationWarnings([]);
         setProgress(null);
         setPhase('installing');

         try {
            const res = await postJson(updateStart.url(), {
               package_id: packageId,
            });

            const body: UpdateRunPayload & {
               errors?: string[];
               warnings?: string[];
            } = await res.json();

            if (!res.ok || body.status === 'failed') {
               setPhase('failed');
               setExtractError(body.message || 'Failed to start the update.');
               setValidationErrors(body.errors ?? []);
               setValidationWarnings(body.warnings ?? []);

               return;
            }

            setProgress(body);
         } catch (error) {
            setPhase('failed');
            setExtractError(
               'Could not start the update. Please check your connection and try again.',
            );
            console.warn('Update start failed:', error);

            return;
         }

         await runSteps();
      },
      [runSteps],
   );

   const handleUpgrade = (pkg: UpdatePackageItem) => {
      setUpgradingName(pkg.original_filename);
      dispatchUpdate(pkg.id);
   };

   /**
    * Pick up a run that was interrupted. Nothing is repeated — the server
    * continues from the cursor it had already written to disk.
    */
   const handleResume = async () => {
      abandonedRef.current = false;
      setUpgradingName(updateState.package ?? '');
      setExtractError('');
      setValidationErrors([]);
      setValidationWarnings([]);
      setProgress(updateState);
      setPhase('installing');
      setOpen(true);

      await runSteps();
   };

   const handleRetry = () => {
      // A failed run still owns the application until it is rolled back or
      // abandoned, so resuming it is the right move; only a run that never
      // started needs dispatching afresh.
      if (updateState.resumable) {
         void handleResume();

         return;
      }

      if (lastPackageId !== null) {
         dispatchUpdate(lastPackageId);
      }
   };

   // ── Reset ────────────────────────────────────────────────────────────────

   const onResetHandler = () => {
      abandonedRef.current = true;
      setPhase('idle');
      setIsFileSelected(false);
      setSelectedFileName('');
      setUpgradingName('');
      setExtractError('');
      setValidationErrors([]);
      setValidationWarnings([]);
      setProgress(null);
      setLastPackageId(null);
   };

   const handleOpenChange = (nextOpen: boolean) => {
      if (isProcessing) {
         setOpen(true);

         return;
      }

      setOpen(nextOpen);

      if (!nextOpen) {
         onResetHandler();
      }
   };

   const installable = packages.filter((pkg) => pkg.can_upgrade).length;

   // ── Render ───────────────────────────────────────────────────────────────

   return (
      <>
         <Card className="border-2">
            <CardHeader className="p-4 sm:p-6">
               <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Upload className="text-warning h-5 w-5" />
                  Application Update
               </h2>
               <p className="mt-1 text-sm text-muted-foreground">
                  Upload and install the latest version of your application
               </p>
            </CardHeader>

            <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
               <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-border dark:bg-secondary">
                  <div className="flex items-start">
                     <div className="shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                     </div>
                     <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">
                           Important Update Guidelines
                        </h3>
                        <div className="mt-2 text-sm text-amber-700">
                           <ul className="list-inside list-disc space-y-1">
                              <li>
                                 <strong>Refresh Server:</strong> Every time
                                 refresh server before updating
                              </li>
                              <li>
                                 <strong>Backup First:</strong> Always create a
                                 backup before updating
                              </li>
                              <li>
                                 <strong>File Format:</strong> Upload must be a
                                 valid ZIP file
                              </li>
                              <li>
                                 <strong>Maintenance Mode:</strong> Site will be
                                 temporarily unavailable during update
                              </li>
                              <li>
                                 <strong>Migrations:</strong> Database
                                 migrations will be automatically applied
                              </li>
                              <li>
                                 <strong>Downtime:</strong> Update process may
                                 take several minutes
                              </li>
                              <li>
                                 <strong>Browser:</strong> Do not refresh or
                                 close browser during update
                              </li>
                              <li>
                                 <strong>Seeder:</strong> Run seeder only after
                                 updating the application version
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-3 sm:flex-row">
                  <WarningModal
                     method="post"
                     routePath={refresh.url()}
                     title="Are you sure to refresh your app?"
                     actionComponent={
                        <Button type="button" variant="secondary">
                           <RefreshCw className="h-4 w-4" />
                           <span>Refresh App</span>
                        </Button>
                     }
                  />

                  <Button type="button" onClick={() => setOpen(true)}>
                     <Upload className="h-4 w-4" />
                     <span>
                        {installable > 0
                           ? `Update Available (${installable})`
                           : 'Update Application'}
                     </span>
                  </Button>

                  <WarningModal
                     method="get"
                     routePath={updateSeeder.url()}
                     title={`Are you sure to run v-${version} Seeder`}
                     actionComponent={
                        <Button
                           variant="ghost"
                           className="bg-destructive/8 text-destructive hover:bg-destructive/6 hover:text-destructive"
                        >
                           <Database className="h-4 w-4" />
                           <span>Run {version} Version Seeder</span>
                        </Button>
                     }
                  >
                     <div className="space-y-2">
                        <p>
                           This will run the database seeder for version{' '}
                           {version}.
                        </p>

                        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                           <p className="font-medium">Important Notes:</p>
                           <ul className="mt-1 list-inside list-disc space-y-2">
                              <li>
                                 Run this seeder only once after updating to
                                 version {version}
                              </li>
                              <li>
                                 Running this multiple times will overwrite
                                 existing data
                              </li>
                              <li>
                                 Do not run this seeder after you have added
                                 your own content to the website
                              </li>
                           </ul>
                        </div>
                     </div>
                  </WarningModal>
               </div>
            </CardContent>
         </Card>

         <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[640px]">
               {/* Installing overlay */}
               {phase === 'installing' && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
                     <div className="w-full max-w-sm px-6 text-center">
                        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm font-medium">
                           {progress?.phase_label ?? 'Preparing the update'}
                        </p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                           {upgradingName}
                        </p>

                        {progress && progress.files_total > 0 && (
                           <>
                              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                                 <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{ width: `${progress.percent}%` }}
                                 />
                              </div>
                              <p className="mt-2 text-xs text-muted-foreground">
                                 {progress.files_done.toLocaleString()} /{' '}
                                 {progress.files_total.toLocaleString()} (
                                 {progress.percent}%)
                              </p>
                           </>
                        )}

                        <p className="mt-3 text-xs text-muted-foreground">
                           Installing in small steps so nothing times out. If
                           this window closes, the update pauses safely and can
                           be resumed.
                        </p>
                     </div>
                  </div>
               )}

               {/* Success overlay */}
               {phase === 'done' && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
                     <div className="text-center">
                        <CheckCircle className="mx-auto mb-4 h-10 w-10 text-green-500" />
                        <p className="text-sm font-medium text-green-700">
                           Update complete! Redirecting...
                        </p>
                     </div>
                  </div>
               )}

               <ScrollArea className="max-h-[85vh]">
                  <DialogHeader>
                     <DialogTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        Application Update
                     </DialogTitle>
                     <DialogDescription className="text-left">
                        Currently running{' '}
                        <strong className="text-foreground">v{version}</strong>.
                        Upload a package to verify it, then install it when
                        you're ready.
                     </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 px-1 pt-4">
                     {/* An update that was interrupted still owns the site. */}
                     {interruptedRun && phase !== 'installing' && (
                        <div className="space-y-3 rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
                           <div className="flex items-start gap-2">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                              <div className="space-y-1">
                                 <p className="text-sm font-medium text-amber-900">
                                    An update is part-way through
                                 </p>
                                 <p className="text-sm text-amber-800">
                                    {interruptedRun.package} stopped during
                                    &ldquo;{interruptedRun.phase_label}
                                    &rdquo;
                                    {interruptedRun.files_total > 0 &&
                                       ` at ${interruptedRun.files_done.toLocaleString()} of ${interruptedRun.files_total.toLocaleString()} (${interruptedRun.percent}%)`}
                                    .
                                 </p>
                                 <p className="text-xs text-amber-800">
                                    Resuming continues from exactly where it
                                    stopped — nothing is repeated.
                                 </p>
                              </div>
                           </div>

                           <div className="flex flex-wrap gap-2">
                              <Button
                                 type="button"
                                 size="sm"
                                 onClick={() => void handleResume()}
                              >
                                 Resume update
                              </Button>

                              {interruptedRun.can_rollback && (
                                 <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                       router.post(
                                          updateRollback.url(),
                                          {},
                                          { preserveScroll: true },
                                       )
                                    }
                                 >
                                    Roll back
                                 </Button>
                              )}
                           </div>
                        </div>
                     )}

                     {/* Step one */}
                     <div className="space-y-2">
                        <Label>1. Upload a package (.zip only)</Label>

                        <ChunkedUploaderInput
                           isSubmit={phase === 'uploading'}
                           storage="local"
                           filetype="update"
                           delayUpload
                           onFileSelected={(file) => {
                              setIsFileSelected(true);
                              setSelectedFileName(file.name);
                           }}
                           onFileUploaded={(fileData) => {
                              registerPackage(fileData.upload_id);
                           }}
                           onError={() => setPhase('idle')}
                           onCancelUpload={() => onResetHandler()}
                        />

                        {isFileSelected && phase === 'idle' && (
                           <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                              <p className="min-w-0 truncate text-sm text-green-800">
                                 <strong>Selected:</strong> {selectedFileName}
                              </p>
                              <LoadingButton
                                 type="button"
                                 size="sm"
                                 loading={false}
                                 onClick={() => setPhase('uploading')}
                              >
                                 Upload & Verify
                              </LoadingButton>
                           </div>
                        )}

                        {isUploading && (
                           <p className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              {phase === 'uploading'
                                 ? 'Uploading package...'
                                 : 'Verifying package...'}
                           </p>
                        )}
                     </div>

                     {/* Step two */}
                     <div className="space-y-2">
                        <Label>2. Install a verified package</Label>

                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                           <p className="text-sm text-red-700">
                              <strong>Back up first.</strong> Installing
                              replaces application files, runs migrations, and
                              cannot be undone.
                           </p>
                        </div>

                        <UpdatePackageList
                           packages={packages}
                           diskUsage={diskUsage}
                           disabled={isProcessing}
                           onUpgrade={handleUpgrade}
                        />
                     </div>

                     {/* Failure */}
                     {phase === 'failed' && extractError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                           <p className="text-sm font-medium text-red-800">
                              {validationErrors.length > 0
                                 ? 'This package cannot be installed'
                                 : 'Update failed'}
                           </p>

                           {validationErrors.length > 0 ? (
                              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-red-700">
                                 {validationErrors.map((error) => (
                                    <li key={error}>{error}</li>
                                 ))}
                              </ul>
                           ) : (
                              <p className="mt-1 text-sm text-red-700">
                                 {extractError}
                              </p>
                           )}

                           <p className="mt-2 text-xs text-red-700">
                              {validationErrors.length > 0
                                 ? 'Nothing has been changed — the package was rejected before any files were touched.'
                                 : 'Your site has been brought back online. The package is still here, so you can retry without uploading it again.'}
                           </p>
                        </div>
                     )}

                     {phase === 'failed' && validationWarnings.length > 0 && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                           <p className="text-sm font-medium text-amber-800">
                              Also noticed in this package
                           </p>
                           <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-amber-700">
                              {validationWarnings.map((warning) => (
                                 <li key={warning}>{warning}</li>
                              ))}
                           </ul>
                        </div>
                     )}

                     <DialogFooter className="w-full justify-between space-x-2 pt-4">
                        <DialogClose asChild>
                           <Button
                              type="button"
                              variant="outline"
                              disabled={isProcessing}
                           >
                              Close
                           </Button>
                        </DialogClose>

                        {phase === 'failed' &&
                           validationErrors.length === 0 &&
                           lastPackageId !== null && (
                              <LoadingButton
                                 type="button"
                                 loading={false}
                                 onClick={handleRetry}
                              >
                                 Retry install
                              </LoadingButton>
                           )}
                     </DialogFooter>
                  </div>
               </ScrollArea>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ApplicationUpdate;

import LoadingButton from '@/components/loading-button';
import { updateAbort, updateRollback } from '@/routes/system';
import { router } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { UpdateRunPayload } from './application-update';

interface Props {
   isMaintenance: boolean;
   updateState: UpdateRunPayload;
}

/**
 * Escape hatch for an update that did not finish.
 *
 * On shared hosting there is no CLI, so a killed update that left the site in
 * maintenance mode is otherwise only recoverable over FTP. `system/*` routes
 * are exempt from maintenance mode, so this page stays reachable and this
 * banner is the way back.
 */
const ApplicationRecovery = ({ isMaintenance, updateState }: Props) => {
   const [processing, setProcessing] = useState(false);

   const isInterrupted = updateState.resumable && updateState.status !== 'idle';

   // Nothing to recover from: the site is live and no run is outstanding.
   if (!isMaintenance && !isInterrupted) {
      return null;
   }

   const post = (url: string) => {
      setProcessing(true);
      router.post(url, {}, { onFinish: () => setProcessing(false) });
   };

   return (
      <div className="mb-6 rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-border dark:bg-secondary">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
               <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

               <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-red-800 dark:text-foreground">
                     {isInterrupted
                        ? 'An application update did not finish'
                        : 'Your site is in maintenance mode'}
                  </h3>

                  <p className="text-sm text-red-700 dark:text-muted-foreground">
                     {updateState.message ||
                        'Visitors are currently seeing the maintenance page instead of your site.'}
                  </p>

                  {isInterrupted && (
                     <p className="text-xs text-red-700 dark:text-muted-foreground">
                        Stopped during &ldquo;{updateState.phase_label}&rdquo;
                        {updateState.files_total > 0 &&
                           ` at ${updateState.files_done.toLocaleString()} of ${updateState.files_total.toLocaleString()} (${updateState.percent}%)`}
                        {updateState.package ? ` — ${updateState.package}` : ''}
                        . Open the update dialog to resume from exactly where it
                        stopped.
                     </p>
                  )}
               </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
               {isInterrupted && updateState.can_rollback && (
                  <LoadingButton
                     type="button"
                     variant="outline"
                     loading={processing}
                     disabled={processing}
                     onClick={() => post(updateRollback.url())}
                  >
                     Roll back
                  </LoadingButton>
               )}

               <LoadingButton
                  type="button"
                  variant="destructive"
                  loading={processing}
                  disabled={processing}
                  onClick={() => post(updateAbort.url())}
               >
                  Force site online
               </LoadingButton>
            </div>
         </div>
      </div>
   );
};

export default ApplicationRecovery;

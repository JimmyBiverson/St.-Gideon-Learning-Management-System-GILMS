import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import system from '@/routes/system';
import { router } from '@inertiajs/react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
   isMaintenance: boolean;
}

const ApplicationMaintenance = ({ isMaintenance }: Props) => {
   const [open, setOpen] = useState(false);
   const [processing, setProcessing] = useState(false);

   const handleSubmit = () => {
      setProcessing(true);

      router.post(
         system.maintenance.store(),
         {},
         {
            onSuccess: () => setOpen(false),
            onFinish: () => setProcessing(false),
         },
      );
   };

   return (
      <>
         <div>
            <Button
               type="button"
               variant={isMaintenance ? 'default' : 'destructive'}
               onClick={() => setOpen(true)}
            >
               {isMaintenance
                  ? 'Disable Maintenance Mode'
                  : 'Enable Maintenance Mode'}
            </Button>
         </div>

         {/* Confirmation Dialog */}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
               <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                     <AlertTriangle className="h-5 w-5 text-amber-600" />
                     {isMaintenance
                        ? 'Disable Maintenance Mode'
                        : 'Enable Maintenance Mode'}
                  </DialogTitle>
                  <DialogDescription className="space-y-4 text-left">
                     <p>
                        {isMaintenance
                           ? 'Your application is currently in maintenance mode. This will bring your application back online for all users.'
                           : 'Your application is currently live. This will put your application into maintenance mode and make it temporarily unavailable for users.'}
                     </p>

                     <div
                        className={`rounded-lg p-4 ${
                           isMaintenance
                              ? 'border border-green-200 bg-green-50 dark:border-border dark:bg-secondary'
                              : 'border border-amber-200 bg-amber-50 dark:border-border dark:bg-secondary'
                        }`}
                     >
                        <div className="flex items-start gap-2">
                           <CheckCircle
                              className={`mt-0.5 h-4 w-4 ${
                                 isMaintenance
                                    ? 'text-green-600'
                                    : 'text-amber-600'
                              }`}
                           />
                           <p
                              className={`text-sm ${
                                 isMaintenance
                                    ? 'text-green-800 dark:text-foreground'
                                    : 'text-amber-800 dark:text-foreground'
                              }`}
                           >
                              {isMaintenance
                                 ? 'Click confirm to disable maintenance mode.'
                                 : 'Click confirm to enable maintenance mode.'}
                           </p>
                        </div>
                     </div>
                  </DialogDescription>
               </DialogHeader>

               <DialogFooter className="pt-4">
                  <DialogClose asChild>
                     <Button type="button" variant="outline">
                        Cancel
                     </Button>
                  </DialogClose>

                  <LoadingButton
                     type="button"
                     loading={processing}
                     disabled={processing}
                     onClick={handleSubmit}
                  >
                     {isMaintenance
                        ? 'Disable Maintenance'
                        : 'Enable Maintenance'}
                  </LoadingButton>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ApplicationMaintenance;

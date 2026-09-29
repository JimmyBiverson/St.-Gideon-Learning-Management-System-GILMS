import { Button } from '@/components/ui/button';
import Main from '@/layouts/main';
import { dashboard } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import ApplicationBackup from '@/maintenance/components/application-backup';
import ApplicationBackupList from '@/maintenance/components/application-backup-list';
import ApplicationMaintenance from '@/maintenance/components/application-maintenance';
import ApplicationReboot from '@/maintenance/components/application-reboot';
import ApplicationRecovery from '@/maintenance/components/application-recovery';
import ApplicationSitemap from '@/maintenance/components/application-sitemap';
import type { UpdateRunPayload } from '@/maintenance/components/application-update';
import ApplicationUpdate from '@/maintenance/components/application-update';
import type { UpdatePackageItem } from '@/maintenance/components/update-package-list';

export interface MaintenanceProps {
   version: string;
   recentBackups: ApplicationBackup[];
   isMaintenance: boolean;
   updateState: UpdateRunPayload;
   updatePackages: UpdatePackageItem[];
   updatePackagesDiskUsage: number;
   flash: {
      error: string;
      warning: string;
      success: string;
   };
}

const Maintenance = ({
   version,
   flash,
   recentBackups,
   isMaintenance,
   updateState,
   updatePackages,
   updatePackagesDiskUsage,
}: MaintenanceProps) => {
   return (
      <div className="container bg-background px-3 py-6 sm:p-6 md:p-10">
         <Head title="App Maintenance" />

         <div className="md:px-3">
            <div className="mb-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
               <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-nowrap">
                     App Maintenance
                  </h1>
                  <p className="text-sm text-nowrap text-muted-foreground md:text-base">
                     Current Version:{' '}
                     <span className="font-bold text-primary">{version}</span>
                  </p>
               </div>

               <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <Link href={dashboard()}>
                     <Button>
                        <ArrowLeft /> Back To Dashboard
                     </Button>
                  </Link>

                  <ApplicationMaintenance isMaintenance={isMaintenance} />
               </div>
            </div>

            <ApplicationRecovery
               isMaintenance={isMaintenance}
               updateState={updateState}
            />

            {/* Flash Messages */}
            {flash?.success && (
               <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start">
                     <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                     <div className="ml-3">
                        <p className="text-sm text-green-800">
                           {String(flash.success)}
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {flash?.error && (
               <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start">
                     <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                     <div className="ml-3">
                        <p className="text-sm text-red-800">
                           {String(flash.error)}
                        </p>
                     </div>
                  </div>
               </div>
            )}

            <div className="space-y-6">
               {/* Update Section */}
               <ApplicationUpdate
                  version={version}
                  packages={updatePackages}
                  diskUsage={updatePackagesDiskUsage}
                  updateState={updateState}
               />

               {/* Reboot Section */}
               <ApplicationReboot />

               {/* Sitemap Section */}
               <ApplicationSitemap />

               {/* Backup Section */}
               <ApplicationBackup />

               {/* Backup History Section */}
               <ApplicationBackupList recentBackups={recentBackups} />
            </div>
         </div>
      </div>
   );
};

Maintenance.layout = (page: ReactNode) => <Main children={page} />;

export default Maintenance;

import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { formatDateTimeLocale } from '@/lib/date';
import { updatePackageDelete, updatePackageVerify } from '@/routes/system';
import { router } from '@inertiajs/react';
import {
   AlertTriangle,
   ArrowUpCircle,
   CheckCircle,
   Package,
   RefreshCw,
   Trash2,
} from 'lucide-react';
import { useState } from 'react';

export interface UpdatePackageItem {
   id: number;
   original_filename: string;
   size: number;
   sha256: string | null;
   version: string | null;
   min_upgradable_from: string | null;
   package_type: string | null;
   file_count: number;
   vendor_included: boolean;
   incremental: boolean;
   base_version: string | null;
   removed_count: number;
   status: 'ready' | 'invalid' | 'applied';
   errors: string[];
   warnings: string[];
   can_upgrade: boolean;
   blocked_reason: string | null;
   uploaded_at: string | null;
   applied_at: string | null;
}

interface Props {
   packages: UpdatePackageItem[];
   diskUsage: number;
   disabled: boolean;
   onUpgrade: (pkg: UpdatePackageItem) => void;
}

function formatBytes(bytes: number): string {
   if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
   }

   return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const UpdatePackageList = ({
   packages,
   diskUsage,
   disabled,
   onUpgrade,
}: Props) => {
   const [busyId, setBusyId] = useState<number | null>(null);
   const [confirmingId, setConfirmingId] = useState<number | null>(null);

   const handleDelete = (pkg: UpdatePackageItem) => {
      setBusyId(pkg.id);

      router.delete(updatePackageDelete.url(pkg.id), {
         preserveScroll: true,
         onFinish: () => {
            setBusyId(null);
            setConfirmingId(null);
         },
      });
   };

   const handleVerify = (pkg: UpdatePackageItem) => {
      setBusyId(pkg.id);

      router.post(
         updatePackageVerify.url(pkg.id),
         {},
         { preserveScroll: true, onFinish: () => setBusyId(null) },
      );
   };

   if (packages.length === 0) {
      return (
         <div className="rounded-lg border border-dashed p-6 text-center">
            <Package className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">
               No update packages uploaded yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
               Upload a ZIP above. It will be verified before it can be
               installed.
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-3">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Uploaded packages</h3>
            <span className="text-xs text-muted-foreground">
               {packages.length} stored · {formatBytes(diskUsage)} on disk
            </span>
         </div>

         {packages.map((pkg) => (
            <div
               key={pkg.id}
               className="rounded-lg border p-3 transition-colors hover:bg-muted/40"
            >
               <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                     <p className="flex items-center gap-2 truncate text-sm font-medium">
                        {pkg.original_filename}
                        {pkg.incremental && (
                           <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-normal text-secondary-foreground">
                              incremental
                           </span>
                        )}
                     </p>

                     <p className="text-xs text-muted-foreground">
                        {pkg.version ? `v${pkg.version}` : 'Unknown version'} ·{' '}
                        {formatBytes(pkg.size)}
                        {pkg.file_count > 0 &&
                           ` · ${pkg.file_count.toLocaleString()} files`}
                        {pkg.removed_count > 0 &&
                           ` · ${pkg.removed_count.toLocaleString()} removed`}
                        {pkg.uploaded_at &&
                           ` · uploaded ${formatDateTimeLocale(pkg.uploaded_at)}`}
                     </p>

                     {pkg.status === 'applied' ? (
                        <p className="flex items-center gap-1 text-xs text-green-700">
                           <CheckCircle className="h-3 w-3" />
                           Installed
                           {pkg.applied_at &&
                              ` on ${formatDateTimeLocale(pkg.applied_at)}`}
                        </p>
                     ) : pkg.can_upgrade ? (
                        <p className="flex items-center gap-1 text-xs text-green-700">
                           <CheckCircle className="h-3 w-3" />
                           Verified Mentor LMS package
                           {pkg.incremental && pkg.base_version
                              ? ` · applies to ${pkg.base_version}`
                              : pkg.min_upgradable_from
                                ? ` · requires ${pkg.min_upgradable_from} or newer`
                                : ''}
                        </p>
                     ) : (
                        <p className="flex items-start gap-1 text-xs text-amber-700">
                           <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                           <span>{pkg.blocked_reason}</span>
                        </p>
                     )}

                     {/* Full reasons, so a packaging mistake is diagnosable */}
                     {pkg.status === 'invalid' && pkg.errors.length > 1 && (
                        <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-red-700">
                           {pkg.errors.slice(1).map((error) => (
                              <li key={error}>{error}</li>
                           ))}
                        </ul>
                     )}

                     {pkg.warnings.length > 0 && (
                        <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-amber-700">
                           {pkg.warnings.map((warning) => (
                              <li key={warning}>{warning}</li>
                           ))}
                        </ul>
                     )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                     {pkg.can_upgrade && (
                        <Button
                           type="button"
                           size="sm"
                           disabled={disabled || busyId === pkg.id}
                           onClick={() => onUpgrade(pkg)}
                        >
                           <ArrowUpCircle className="h-4 w-4" />
                           Upgrade
                        </Button>
                     )}

                     {pkg.status !== 'applied' && (
                        <Button
                           type="button"
                           size="sm"
                           variant="ghost"
                           title="Re-check this package"
                           disabled={disabled || busyId === pkg.id}
                           onClick={() => handleVerify(pkg)}
                        >
                           <RefreshCw className="h-4 w-4" />
                        </Button>
                     )}

                     {confirmingId === pkg.id ? (
                        <div className="flex items-center gap-1">
                           <LoadingButton
                              type="button"
                              size="sm"
                              variant="destructive"
                              loading={busyId === pkg.id}
                              onClick={() => handleDelete(pkg)}
                           >
                              Confirm
                           </LoadingButton>
                           <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => setConfirmingId(null)}
                           >
                              Cancel
                           </Button>
                        </div>
                     ) : (
                        <Button
                           type="button"
                           size="sm"
                           variant="ghost"
                           title="Delete this package"
                           disabled={disabled || busyId === pkg.id}
                           className="text-destructive hover:text-destructive"
                           onClick={() => setConfirmingId(pkg.id)}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default UpdatePackageList;

<?php

namespace App\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AppConfig
{
    public function __construct(private SettingsService $settingsService) {}

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (isInstallerRequest($request)) {
            return $next($request);
        }

        $systemSetting = $this->settingsService->getSetting(['type' => 'system']);
        $system = $systemSetting ? $systemSetting['fields'] : [];

        $storageSetting = $this->settingsService->getSetting(['type' => 'storage']);
        $storage = $storageSetting ? $storageSetting['fields'] : [];

        // App configuration
        config(['app.name' => $system['name'] ?? config('app.name')]);

        $storageDriver = $storage['storage_driver'] ?? 'local';

        // Every configured driver's credentials are loaded regardless of
        // which one is currently active. A lesson/file already stored on
        // S3 or R2 must stay resolvable (e.g. via LessonVideoUrlResolver's
        // signed URLs) after the admin switches the active driver
        // elsewhere — only filesystems.default/media-library.disk_name
        // below decide where *new* uploads go.
        config([
            'filesystems.disks.s3.key' => $storage['aws_access_key_id'] ?? '',
            'filesystems.disks.s3.secret' => $storage['aws_secret_access_key'] ?? '',
            'filesystems.disks.s3.region' => $storage['aws_default_region'] ?? '',
            'filesystems.disks.s3.bucket' => $storage['aws_bucket'] ?? '',
        ]);

        config([
            'filesystems.disks.r2.key' => $storage['r2_access_key_id'] ?? '',
            'filesystems.disks.r2.secret' => $storage['r2_secret_access_key'] ?? '',
            'filesystems.disks.r2.region' => $storage['r2_region'] ?? 'auto',
            'filesystems.disks.r2.bucket' => $storage['r2_bucket'] ?? '',
            'filesystems.disks.r2.url' => $storage['r2_public_url'] ?? '',
            'filesystems.disks.r2.endpoint' => $storage['r2_endpoint'] ?? '',
        ]);

        config([
            'services.bunny.library_id' => $storage['bunny_library_id'] ?? '',
            'services.bunny.api_key' => $storage['bunny_api_key'] ?? '',
            'services.bunny.token_auth_key' => $storage['bunny_token_auth_key'] ?? '',
        ]);

        // The active driver only decides where *new* uploads/media go.
        // Bunny only hosts lesson videos — it has no generic file API for
        // images/documents/previews, so those fall back to local while
        // Bunny is active.
        $driverIsUsable = match ($storageDriver) {
            's3' => ! (
                empty($storage['aws_access_key_id'] ?? null)
                || empty($storage['aws_secret_access_key'] ?? null)
                || empty($storage['aws_default_region'] ?? null)
                || empty($storage['aws_bucket'] ?? null)
            ),
            'r2' => ! (
                empty($storage['r2_access_key_id'] ?? null)
                || empty($storage['r2_secret_access_key'] ?? null)
                || empty($storage['r2_bucket'] ?? null)
                || empty($storage['r2_endpoint'] ?? null)
            ),
            // r2.url is intentionally excluded from the check: it is optional
            // and only affects whether images/documents/previews display, not
            // whether uploads work.
            'bunny' => ! (
                empty($storage['bunny_library_id'] ?? null)
                || empty($storage['bunny_api_key'] ?? null)
                || empty($storage['bunny_token_auth_key'] ?? null)
            ),
            default => true,
        };

        $driverLabel = match ($storageDriver) {
            's3' => 'S3',
            'r2' => 'Cloudflare R2',
            'bunny' => 'Bunny Stream',
            default => 'local',
        };

        if ($driverIsUsable) {
            match ($storageDriver) {
                's3' => config(['filesystems.default' => 's3', 'media-library.disk_name' => 's3']),
                'r2' => config(['filesystems.default' => 'r2', 'media-library.disk_name' => 'r2']),
                default => config(['filesystems.default' => 'local', 'media-library.disk_name' => 'public']),
            };
        } else {
            /*
             * The selected driver has blank credentials.
             *
             * This used to `return back()->with('error', ...)`, which cannot be
             * made safe by redirecting somewhere else: this middleware runs on
             * the `web` group, so *every* destination is itself re-checked and
             * redirected again. On a fresh install left on s3/r2/bunny that
             * locked out every visitor with ERR_TOO_MANY_REDIRECTS, including
             * the admin who needed to go and fix the setting.
             *
             * A page load therefore never redirects. It falls back to the local
             * disk, so the site stays usable and the settings screen can be
             * reached, and the misconfiguration is logged instead of flashed —
             * a flash would need a redirect to survive.
             */
            config(['filesystems.default' => 'local', 'media-library.disk_name' => 'public']);

            /*
             * Only a request that is actually uploading a file is refused, so
             * nothing is silently stored on the local disk and then appear lost
             * once the driver is corrected.
             *
             * The test is deliberately "does this request carry files" and not
             * "is this an unsafe method". This middleware runs on the `web`
             * group, so refusing every unsafe method would also block sign-in,
             * profile updates, and the storage settings form itself — which is
             * the very screen needed to fix the setting, and would leave the
             * site unusable rather than safe. A request carrying no file does
             * not depend on remote storage and is served from the local disk.
             */
            if ($request->allFiles() !== []) {
                return $this->refuseStorageWrite($request, $driverLabel, $storageDriver);
            }
        }

        return $next($request);
    }

    /**
     * Refuse an upload while the configured storage driver is unusable.
     *
     * Only reached for requests that carry files, which arrive as multipart
     * form posts, so `back()` lands on the form the submission came from — a
     * page that is not behind this failure. The guard is kept anyway so the
     * redirect can never point at itself, whatever the Referer turns out to be.
     *
     * The warning is logged here rather than on every request: an upload
     * attempt is rare and actionable, whereas a per-request log line would
     * flood the log for every visitor while the setting is still wrong.
     */
    private function refuseStorageWrite(Request $request, string $driverLabel, string $storageDriver): Response
    {
        $message = "{$driverLabel} storage configuration is incomplete. "
            .'The file was not uploaded. Please fix it in the storage settings.';

        Log::warning(
            "Storage driver [{$storageDriver}] is selected but its credentials are incomplete. "
            .'Upload refused; falling back to the local disk for everything else. '
            .'Route: '.$request->method().' '.$request->path()
            .' Browser: '.$request->userAgent()
        );

        if (canReturnToPreviousPage($request)) {
            return back()->with('error', $message);
        }

        return redirect()->to(roleLandingUrl($request->user()))->with('error', $message);
    }
}

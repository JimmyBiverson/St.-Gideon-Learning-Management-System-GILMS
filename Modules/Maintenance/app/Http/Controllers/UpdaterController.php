<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Updates\UpdatePackageValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Modules\Maintenance\Models\Backup;
use Modules\Maintenance\Models\UpdatePackage;
use Modules\Maintenance\Services\UpdatePackageLibrary;
use Modules\Maintenance\Services\UpdateRunner;
use Modules\Maintenance\Services\UpdateRunState;
use RuntimeException;

class UpdaterController extends Controller
{
    /**
     * Extraction needs room for the new files plus headroom; a shared-hosting
     * quota running out mid-extract produces truncated files with no error.
     */
    private const float REQUIRED_FREE_SPACE_MULTIPLIER = 2.5;

    public function __construct(
        private UpdateRunState $runState,
        private UpdateRunner $runner,
        private UpdatePackageValidator $validator,
        private UpdatePackageLibrary $library
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $version = file_get_contents(base_path('version.txt'));
        $isMaintenance = file_exists(storage_path('framework/maintenance.php'));

        // This page is the admin's only way back in when something is broken —
        // most commonly right after an update, before `php artisan migrate` has
        // caught up with a table this release added. It must render regardless,
        // so every piece that can fail is isolated and degrades to "nothing to
        // show" rather than taking the whole page down with it.
        $recentBackups = $this->safely(fn () => Backup::orderBy('created_at', 'desc')->take(10)->get(), collect());
        $updateState = $this->safely(fn () => $this->runState->current(), [
            'run_id' => null,
            'status' => 'idle',
            'phase' => 'plan',
            'phase_label' => '',
            'message' => '',
            'package' => null,
            'package_id' => null,
            'target_version' => null,
            'files_done' => 0,
            'files_total' => 0,
            'percent' => 0,
            'can_rollback' => false,
            'resumable' => false,
            'started_at' => null,
            'heartbeat_at' => null,
        ]);
        $updatePackages = $this->safely(
            fn () => $this->library->all()
                ->map(fn (UpdatePackage $package) => $package->toListItem(trim($version)))
                ->values(),
            collect(),
            'The update package list could not be loaded — run "php artisan migrate" to finish setting up this release.'
        );
        $updatePackagesDiskUsage = $this->safely(fn () => $this->library->diskUsage(), 0);

        return Inertia::render('Maintenance/index', [
            'version' => $version,
            'isMaintenance' => $isMaintenance,
            'recentBackups' => $recentBackups,
            'updateState' => $updateState,
            'updatePackages' => $updatePackages,
            'updatePackagesDiskUsage' => $updatePackagesDiskUsage,
            'flash' => [
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    /**
     * Run a piece of this page's data gathering, falling back to a default and
     * surfacing a warning banner instead of a broken page if it throws.
     *
     * @template TValue
     *
     * @param  callable(): TValue  $callback
     * @param  TValue  $default
     * @return TValue
     */
    private function safely(callable $callback, mixed $default, ?string $warning = null): mixed
    {
        try {
            return $callback();
        } catch (\Throwable $e) {
            Log::warning('Maintenance page: a section failed to load', ['error' => $e->getMessage()]);

            if ($warning !== null && ! session()->has('warning')) {
                session()->flash('warning', $warning);
            }

            return $default;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        if (file_exists(storage_path('framework/maintenance.php'))) {
            Artisan::call('up');

            return redirect()->back()->with('success', 'Application is now live.');
        }

        Artisan::call('down');

        return redirect()->back()->with('success', 'Application is now in maintenance mode.');
    }

    /**
     * Begin installing a package: validate it, put the site into maintenance
     * mode, and return immediately.
     *
     * Nothing is written to the application here. The browser then calls
     * /system/update/step repeatedly, each call doing a bounded slice of the
     * work, so no single request ever approaches a shared host's timeout.
     */
    public function updateApp(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'package_id' => ['required', 'integer'],
        ]);

        if ($this->runState->isRunning()) {
            return response()->json([
                'status' => 'processing',
                'message' => 'An update is already in progress.',
            ], 409);
        }

        $package = UpdatePackage::find((int) $validated['package_id']);

        if (! $package) {
            return response()->json([
                'status' => 'failed',
                'message' => 'That update package no longer exists. Upload it again.',
            ], 422);
        }

        $currentVersion = trim(file_get_contents(base_path('version.txt')));

        if ($blockedReason = $package->blockedReason($currentVersion)) {
            return response()->json([
                'status' => 'failed',
                'message' => $blockedReason,
                'errors' => $package->errors() ?: [$blockedReason],
                'warnings' => $package->warnings(),
            ], 422);
        }

        $packagePath = $package->absolutePath();

        try {
            $this->assertEnoughFreeSpace($packagePath);
        } catch (RuntimeException $e) {
            return response()->json(['status' => 'failed', 'message' => $e->getMessage()], 422);
        }

        // Re-validate at the moment of installation, not just at upload: the
        // file can rot on disk, and the site's version may have moved on since.
        // An invalid package must cost the customer nothing more than an error
        // message — no maintenance mode, no half-replaced application.
        $validation = $this->validator->validate($packagePath, $currentVersion);

        if (! $validation->isValid()) {
            Log::warning('Update package rejected by validation', [
                'package' => $package->original_filename,
                'errors' => $validation->errors,
            ]);

            $package->update([
                'status' => UpdatePackage::STATUS_INVALID,
                'validation' => ['errors' => $validation->errors, 'warnings' => $validation->warnings],
            ]);

            return response()->json([
                'status' => 'failed',
                'message' => $validation->firstError(),
                'errors' => $validation->errors,
                'warnings' => $validation->warnings,
            ], 422);
        }

        if ($validation->warnings !== []) {
            Log::info('Update package passed validation with warnings', [
                'package' => $package->original_filename,
                'warnings' => $validation->warnings,
            ]);
        }

        $this->runner->begin($package, (string) $validation->version);

        return response()->json($this->runState->current());
    }

    /**
     * Do one slice of the running update and report where it got to.
     *
     * Called in a loop by the browser. Each call returns inside the configured
     * step budget, so it cannot be cut off by a web server timeout — and if the
     * host kills it anyway, the cursor on disk means the next call resumes
     * rather than restarts.
     */
    public function updateStep(): JsonResponse
    {
        if (! $this->runState->isResumable()) {
            return response()->json($this->runState->current());
        }

        return response()->json($this->runner->step());
    }

    /**
     * Polled by the frontend, and read on page load so an update interrupted by
     * a closed browser can be picked up again.
     *
     * Possible statuses: 'idle' | 'processing' | 'stalled' | 'done' | 'failed'.
     * Terminal states persist until the next run starts or the admin dismisses
     * them, so a second browser tab or a page reload cannot swallow the result.
     */
    public function updateStatus(): JsonResponse
    {
        return response()->json($this->runState->current());
    }

    /**
     * Put back every file the running update has replaced or deleted so far.
     */
    public function rollbackUpdate(): RedirectResponse
    {
        try {
            $result = $this->runner->rollback();
        } catch (RuntimeException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->back()->with(
            'success',
            "Update rolled back: {$result['restored']} file(s) restored, {$result['removed']} removed. Your site is back online."
        );
    }

    /**
     * Recover from an update that died mid-flight: bring the site back online
     * and clear the stale run so the updater can be used again.
     *
     * On shared hosting there is no CLI to run `php artisan up`, so without
     * this the only exit from a killed update is a manual FTP intervention.
     */
    public function abortUpdate(): RedirectResponse
    {
        Artisan::call('up');
        Cache::forget('maintenance_secret');
        $this->runState->clear();

        Log::warning('Interrupted update cleared and application forced back online.');

        return redirect()->back()->with('success', 'The application is back online and the interrupted update has been cleared.');
    }

    /**
     * @throws RuntimeException
     */
    private function assertEnoughFreeSpace(string $packagePath): void
    {
        $free = @disk_free_space(base_path());

        if ($free === false) {
            return; // Hosting won't tell us; proceed rather than block a valid update.
        }

        $required = (int) (filesize($packagePath) * self::REQUIRED_FREE_SPACE_MULTIPLIER);

        if ($free < $required) {
            throw new RuntimeException(sprintf(
                'Not enough free disk space to install this update: %.0f MB required, %.0f MB available. Free up space and try again.',
                $required / 1024 / 1024,
                $free / 1024 / 1024
            ));
        }
    }

    public function updateAppSeeder()
    {
        ignore_user_abort(true);
        set_time_limit(0);

        // Pre-update refresh
        Artisan::call('optimize:clear');

        // Run migrations
        Log::info('Running database migrations after update');
        Artisan::call('migrate', ['--force' => true]);

        // Run data updates/seeders
        Artisan::call('module:seed', [
            'module' => 'Maintenance',
            '--class' => 'MaintenanceDatabaseSeeder',
            '--force' => true,
        ]);
        Artisan::call('module:seed', [
            'module' => 'Blog',
            '--class' => 'BlogDatabaseSeeder',
            '--force' => true,
        ]);
        Artisan::call('module:seed', [
            'module' => 'Language',
            '--class' => 'LanguageDatabaseSeeder',
            '--force' => true,
        ]);
        Artisan::call('module:seed', [
            'module' => 'Certification',
            '--class' => 'CertificationDatabaseSeeder',
            '--force' => true,
        ]);
        Artisan::call('module:seed', [
            'module' => 'Frontend',
            '--class' => 'FrontendDatabaseSeeder',
            '--force' => true,
        ]);
        Artisan::call('module:seed', [
            'module' => 'Billing',
            '--class' => 'BillingDatabaseSeeder',
            '--force' => true,
        ]);

        return redirect(route('system.maintenance.index'))->with('success', 'Current version seeder run successfully');
    }
}

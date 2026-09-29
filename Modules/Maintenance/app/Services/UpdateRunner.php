<?php

namespace Modules\Maintenance\Services;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Modules\Maintenance\Models\UpdatePackage;
use RuntimeException;
use ZipArchive;

/**
 * Applies an update as a sequence of short, resumable steps.
 *
 * The original updater extracted 30,000+ files inside one HTTP request. On
 * shared hosting that cannot be made reliable: the web server cuts the
 * connection at 60–120 seconds and the host kills the PHP process with it, so
 * every attempt to survive one long request (streams, ignore_user_abort,
 * raising fastcgi timeouts a customer cannot edit) only moved the failure.
 *
 * Instead the browser calls `step()` repeatedly. Each call does about ten
 * seconds of work, advances a cursor that is persisted to disk, and returns.
 * No single request ever approaches a timeout, on any host, with no exec(), no
 * queue worker and no cron. If the browser closes or the process is killed, the
 * cursor is still on disk and the run picks up exactly where it stopped.
 *
 * Phases run in order, and each one is itself resumable:
 *
 *   plan → backup → extract → remove → merge → caches → migrate → privatize-video → finalize
 *
 * Migrations deliberately land in a request of their own. By then extraction
 * has already replaced vendor/, so they run on a freshly booted autoloader
 * rather than against classes the old release had loaded into memory.
 */
class UpdateRunner
{
    /**
     * @var array<int, string>
     */
    public const array PHASES = [
        'plan', 'backup', 'extract', 'remove', 'merge', 'caches', 'migrate', 'privatize-video', 'finalize', 'complete',
    ];

    /**
     * Phases after which the file system alone no longer describes the
     * installation: once migrations have run, putting the old files back would
     * leave new schema under old code. Rollback is refused from here on.
     *
     * @var array<int, string>
     */
    private const array PHASES_PAST_ROLLBACK = ['migrate', 'privatize-video', 'finalize', 'complete'];

    public function __construct(
        private UpdateRunState $state,
        private UpdateService $updateService
    ) {}

    /**
     * Put the site into maintenance mode and lay out the work. Returns
     * immediately — nothing is written to the application yet.
     */
    public function begin(UpdatePackage $package, string $targetVersion): void
    {
        $secret = 'update-'.now()->timestamp;

        $runId = $this->state->start($package->original_filename, $package->id, [
            'package_path' => $package->absolutePath(),
            'target_version' => $targetVersion,
        ]);

        File::ensureDirectoryExists($this->state->workspace($runId));

        Artisan::call('down', [
            '--secret' => $secret,
            '--render' => 'errors::503',
            '--retry' => 60,
        ]);
        Cache::put('maintenance_secret', $secret, now()->addHours(6));

        Log::info('Update run started', [
            'run_id' => $runId,
            'package' => $package->original_filename,
            'target_version' => $targetVersion,
        ]);
    }

    /**
     * Do one slice of work — roughly `release.package.step_seconds` of it — and
     * return the run's current state.
     *
     * @return array<string, mixed>
     */
    public function step(): array
    {
        $budget = (float) config('release.package.step_seconds', 10);
        $deadline = microtime(true) + $budget;

        ignore_user_abort(true);
        set_time_limit(0);

        // The session lock would otherwise hold up the very requests the
        // browser uses to follow this run's progress.
        if (session()->isStarted()) {
            session()->save();
        }

        try {
            // A do-while, not a while: every call must make at least one slice
            // of progress. Checking the clock first would let a slow server —
            // or a very small budget — return without having advanced anything,
            // and the browser would then loop forever getting nowhere.
            do {
                $raw = $this->state->raw();
                $phase = (string) ($raw['phase'] ?? 'plan');

                if ($phase === 'complete' || ($raw['status'] ?? null) === UpdateRunState::STATUS_FAILED) {
                    break;
                }

                if ($this->runSlice($phase, $raw, $deadline)) {
                    $this->advanceFrom($phase);
                }
            } while (microtime(true) < $deadline);
        } catch (\Throwable $e) {
            $this->state->markFailed($e->getMessage());

            Log::error('Update run failed', [
                'phase' => $this->state->raw()['phase'] ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Never leave the site behind a maintenance page because a step
            // threw: the admin needs the dashboard to recover.
            Artisan::call('up');
        }

        return $this->state->current();
    }

    /**
     * Put back every file this run had replaced or deleted.
     *
     * Only offered before migrations run. Afterwards the database has moved on
     * and restoring the old files would leave new schema under old code, which
     * is a worse position than the one being recovered from.
     *
     * @return array<string, mixed>
     */
    public function rollback(): array
    {
        $raw = $this->state->raw();
        $runId = $raw['run_id'] ?? null;
        $phase = (string) ($raw['phase'] ?? 'plan');

        if (! is_string($runId) || $runId === '') {
            throw new RuntimeException('There is no update run to roll back.');
        }

        if (in_array($phase, self::PHASES_PAST_ROLLBACK, true)) {
            throw new RuntimeException('This update has already run database migrations and cannot be rolled back automatically. Restore your most recent backup instead.');
        }

        if (! ($raw['can_rollback'] ?? false)) {
            throw new RuntimeException('No snapshot was taken for this update, so it cannot be rolled back automatically. Restore your most recent backup instead.');
        }

        $workspace = $this->state->workspace($runId);
        $snapshot = $workspace.'/snapshot';
        $restored = 0;

        foreach (File::allFiles($snapshot, hidden: true) as $file) {
            $relativePath = str_replace(
                DIRECTORY_SEPARATOR,
                '/',
                substr($file->getPathname(), strlen($snapshot) + 1)
            );

            $target = base_path($relativePath);
            File::ensureDirectoryExists(dirname($target));

            if (File::copy($file->getPathname(), $target)) {
                $restored++;
            }
        }

        // Files this run created did not exist before it, so putting the old
        // ones back is not enough — they have to go.
        $removed = 0;

        foreach ($this->readList($workspace.'/created.list') as $relativePath) {
            if ($this->deleteApplicationFile($relativePath)) {
                $removed++;
            }
        }

        Artisan::call('optimize:clear');
        Artisan::call('up');

        Log::warning('Update run rolled back', [
            'run_id' => $runId,
            'files_restored' => $restored,
            'files_removed' => $removed,
        ]);

        $this->state->clear();

        return ['restored' => $restored, 'removed' => $removed];
    }

    /**
     * @param  array<string, mixed>  $raw
     * @return bool Whether the phase is finished.
     */
    private function runSlice(string $phase, array $raw, float $deadline): bool
    {
        return match ($phase) {
            'plan' => $this->planSlice($raw),
            'backup' => $this->backupSlice($raw, $deadline),
            'extract' => $this->extractSlice($raw, $deadline),
            'remove' => $this->removeSlice($raw, $deadline),
            'merge' => $this->mergeSlice(),
            'caches' => $this->cachesSlice(),
            'migrate' => $this->migrateSlice(),
            'privatize-video' => $this->privatizeVideoSlice($deadline),
            'finalize' => $this->finalizeSlice($raw),
            default => throw new RuntimeException("This update was started by a different version of the updater and cannot be continued (unknown step \"{$phase}\"). Roll it back or restore your backup."),
        };
    }

    private function advanceFrom(string $phase): void
    {
        $index = array_search($phase, self::PHASES, true);
        $next = self::PHASES[$index + 1] ?? 'complete';

        if ($next === 'complete') {
            $this->state->markDone();

            return;
        }

        $this->state->enterPhase($next, $this->totalFor($next));
    }

    private function totalFor(string $phase): int
    {
        $workspace = $this->workspace();

        return match ($phase) {
            'backup' => count($this->readList($workspace.'/backup.list')),
            'extract' => count($this->readList($workspace.'/extract.list')),
            'remove' => count($this->readList($workspace.'/remove.list')),
            default => 0,
        };
    }

    /**
     * Work out exactly what this package will touch, and write those lists to
     * disk so every later step — in this request or a much later one — walks
     * the same plan.
     *
     * @param  array<string, mixed>  $raw
     */
    private function planSlice(array $raw): bool
    {
        $zip = new ZipArchive;
        $packagePath = (string) ($raw['package_path'] ?? '');

        if ($zip->open($packagePath) !== true) {
            throw new RuntimeException('The update package could not be opened. It may have been deleted or corrupted.');
        }

        try {
            $extract = [];
            $created = [];

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $name = $zip->getNameIndex($i);

                if ($name === false || $name === '' || str_ends_with($name, '/')) {
                    continue;
                }

                // The customer's own environment file is never the release's.
                if (basename($name) === '.env') {
                    continue;
                }

                $extract[] = $name;

                if (! file_exists(base_path($name))) {
                    $created[] = $name;
                }
            }

            $remove = $this->updateService->removalsFromManifest($zip);
        } finally {
            $zip->close();
        }

        $workspace = $this->workspace();
        File::ensureDirectoryExists($workspace);

        $this->writeList($workspace.'/extract.list', $extract);
        $this->writeList($workspace.'/remove.list', $remove);
        $this->writeList($workspace.'/created.list', $created);

        // Only files that already exist can be snapshotted; the rest are
        // handled by created.list on rollback.
        $backup = array_values(array_filter(
            array_unique([...$extract, ...$remove]),
            fn (string $path) => is_file(base_path($path))
        ));

        $canSnapshot = $this->canSnapshot($backup);

        $this->writeList($workspace.'/backup.list', $canSnapshot ? $backup : []);

        $this->state->patch([
            'can_rollback' => $canSnapshot,
            'message' => $canSnapshot
                ? ''
                : 'Not enough free disk space to snapshot the files being replaced, so this update cannot be rolled back automatically.',
        ]);

        Log::info('Update run planned', [
            'extract' => count($extract),
            'remove' => count($remove),
            'snapshot' => $canSnapshot ? count($backup) : 0,
        ]);

        return true;
    }

    /**
     * @param  array<string, mixed>  $raw
     */
    private function backupSlice(array $raw, float $deadline): bool
    {
        $workspace = $this->workspace();
        $snapshot = $workspace.'/snapshot';

        return $this->walkList(
            $workspace.'/backup.list',
            $raw,
            $deadline,
            function (string $relativePath) use ($snapshot): void {
                $source = base_path($relativePath);

                if (! is_file($source)) {
                    return;
                }

                $destination = $snapshot.'/'.$relativePath;
                File::ensureDirectoryExists(dirname($destination));
                @copy($source, $destination);
            }
        );
    }

    /**
     * @param  array<string, mixed>  $raw
     */
    private function extractSlice(array $raw, float $deadline): bool
    {
        $entries = $this->readList($this->workspace().'/extract.list');
        $total = count($entries);
        $cursor = (int) ($raw['files_done'] ?? 0);

        if ($cursor >= $total) {
            return true;
        }

        $zip = new ZipArchive;
        $packagePath = (string) ($raw['package_path'] ?? '');

        if ($zip->open($packagePath) !== true) {
            throw new RuntimeException('The update package could not be opened. It may have been deleted or corrupted.');
        }

        $batchSize = (int) config('release.package.extract_batch', 250);

        try {
            // At least one batch per call, for the same reason as step().
            do {
                $batch = array_slice($entries, $cursor, $batchSize);

                if (! $zip->extractTo(base_path(), $batch)) {
                    throw new RuntimeException('Failed to extract part of the update package.');
                }

                $cursor += count($batch);
                $this->state->heartbeat($cursor, $total);
            } while ($cursor < $total && microtime(true) < $deadline);
        } finally {
            $zip->close();
        }

        $this->state->heartbeat($cursor, $total, force: true);

        return $cursor >= $total;
    }

    /**
     * @param  array<string, mixed>  $raw
     */
    private function removeSlice(array $raw, float $deadline): bool
    {
        return $this->walkList(
            $this->workspace().'/remove.list',
            $raw,
            $deadline,
            fn (string $relativePath) => $this->deleteApplicationFile($relativePath)
        );
    }

    private function mergeSlice(): bool
    {
        $this->updateService->mergeModuleStatuses();

        return true;
    }

    private function cachesSlice(): bool
    {
        Artisan::call('optimize:clear');

        // PHP files were replaced under a running process; without this the
        // next request can keep executing the previous release's bytecode.
        if (function_exists('opcache_reset')) {
            @opcache_reset();
        }

        return true;
    }

    /**
     * Runs in a request of its own, booted from the code this update just
     * installed — which is the only way the new migrations are visible at all.
     */
    private function migrateSlice(): bool
    {
        Artisan::call('migrate', ['--force' => true]);

        Log::info('Update migrations complete', ['output' => Artisan::output()]);

        return true;
    }

    /**
     * Moves legacy publicly-stored video lesson files to private storage.
     * Runs as its own bounded slice, like every other phase here — a site
     * with a large media library must not be forced through this in one
     * request. Safe to resume: the command only ever selects rows it hasn't
     * already migrated.
     */
    private function privatizeVideoSlice(float $deadline): bool
    {
        $budget = max(1, (int) floor($deadline - microtime(true)));

        $exitCode = Artisan::call('course:privatize-video-lessons', ['--seconds' => $budget]);

        Log::info('Video lesson privatization slice ran', [
            'output' => Artisan::output(),
            'exit_code' => $exitCode,
        ]);

        return $exitCode === 0;
    }

    /**
     * @param  array<string, mixed>  $raw
     */
    private function finalizeSlice(array $raw): bool
    {
        $targetVersion = $raw['target_version'] ?? null;

        // Written last, and only here: a run that died earlier must never have
        // left the site claiming a version it did not finish installing.
        if (is_string($targetVersion) && $targetVersion !== '') {
            File::put(base_path('version.txt'), $targetVersion);
        }

        $packageId = $raw['package_id'] ?? null;

        if ($packageId !== null && $package = UpdatePackage::find($packageId)) {
            $package->update([
                'status' => UpdatePackage::STATUS_APPLIED,
                'applied_at' => now(),
            ]);

            if ($package->existsOnDisk()) {
                File::delete($package->absolutePath());
            }
        }

        Artisan::call('up');
        Cache::forget('maintenance_secret');

        // The snapshot is only useful before migrations; they have run.
        File::deleteDirectory($this->workspace().'/snapshot');

        Log::info('Update run completed', ['version' => $targetVersion]);

        return true;
    }

    /**
     * Walk a persisted list from wherever the cursor is, until the list is
     * exhausted or the time budget runs out.
     *
     * @param  array<string, mixed>  $raw
     * @param  callable(string): mixed  $handler
     */
    private function walkList(string $listPath, array $raw, float $deadline, callable $handler): bool
    {
        $entries = $this->readList($listPath);
        $total = count($entries);
        $cursor = (int) ($raw['files_done'] ?? 0);

        if ($total === 0) {
            return true;
        }

        // At least one entry per call, for the same reason as step().
        do {
            $handler($entries[$cursor]);
            $cursor++;

            $this->state->heartbeat($cursor, $total);
        } while ($cursor < $total && microtime(true) < $deadline);

        $this->state->heartbeat($cursor, $total, force: true);

        return $cursor >= $total;
    }

    /**
     * Delete a file the update no longer ships, refusing anything that is not
     * plainly a file inside this application. The paths were validated before
     * the run began; this is where the deletion actually happens, so they are
     * checked again here.
     */
    private function deleteApplicationFile(string $relativePath): bool
    {
        if (str_contains($relativePath, '..') || str_starts_with($relativePath, '/')) {
            Log::warning('Skipped unsafe path in update removal list', ['path' => $relativePath]);

            return false;
        }

        $target = base_path($relativePath);
        $real = realpath($target);
        $root = realpath(base_path());

        if ($real === false || $root === false || ! str_starts_with($real, $root.DIRECTORY_SEPARATOR)) {
            return false;
        }

        if (! is_file($real) || is_link($target)) {
            return false;
        }

        return @unlink($real);
    }

    /**
     * A snapshot needs room for a copy of everything being replaced. On a
     * quota-limited host it is better to proceed without one — and say so —
     * than to fill the disk half way through the update itself.
     *
     * @param  array<int, string>  $paths
     */
    private function canSnapshot(array $paths): bool
    {
        if (! config('release.package.snapshot', true) || $paths === []) {
            return false;
        }

        $bytes = 0;

        foreach ($paths as $path) {
            $bytes += (int) @filesize(base_path($path));
        }

        $free = @disk_free_space(base_path());

        if ($free === false) {
            return false;
        }

        return $free > ($bytes * 2);
    }

    private function workspace(): string
    {
        $runId = $this->state->raw()['run_id'] ?? null;

        if (! is_string($runId) || $runId === '') {
            throw new RuntimeException('There is no update run in progress.');
        }

        return $this->state->workspace($runId);
    }

    /**
     * @return array<int, string>
     */
    private function readList(string $path): array
    {
        if (! is_file($path)) {
            return [];
        }

        return array_values(array_filter(
            file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: []
        ));
    }

    /**
     * @param  array<int, string>  $entries
     */
    private function writeList(string $path, array $entries): void
    {
        File::put($path, implode("\n", $entries));
    }
}

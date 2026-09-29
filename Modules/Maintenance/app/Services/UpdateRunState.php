<?php

namespace Modules\Maintenance\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

/**
 * Tracks the progress of an application update run.
 *
 * State deliberately lives in a JSON file rather than the cache: the update
 * itself calls `optimize:clear` (which runs `cache:clear`, truncating the
 * database cache store), so anything written to the cache by the updater is
 * destroyed moments later and the frontend polls a status that no longer
 * exists. A file also stays readable while `config/` and `vendor/` are being
 * replaced underneath the running process.
 *
 * The file is read and written by *both* the old and the new version of the
 * application: once extraction has replaced vendor/, every later request in the
 * same run is served by the new code. Its shape is therefore kept flat and
 * every read tolerates missing keys, so a run started by one release can always
 * be finished by the next.
 */
class UpdateRunState
{
    public const string STATUS_IDLE = 'idle';

    public const string STATUS_PROCESSING = 'processing';

    public const string STATUS_STALLED = 'stalled';

    public const string STATUS_DONE = 'done';

    public const string STATUS_FAILED = 'failed';

    /**
     * A run whose heartbeat is older than this is treated as dead. On shared
     * hosting the web server kills the PHP process when the connection drops,
     * so without this the frontend would poll a `processing` run forever.
     */
    private const int STALL_AFTER_SECONDS = 120;

    /**
     * Heartbeats are written between extraction batches; throttle them so a
     * 30,000-file package doesn't cause thousands of tiny writes.
     */
    private const int HEARTBEAT_THROTTLE_SECONDS = 1;

    private ?float $lastHeartbeatAt = null;

    public function path(): string
    {
        return storage_path('app/private/updates/state.json');
    }

    public function directory(): string
    {
        return dirname($this->path());
    }

    /**
     * Where a run's working files live: the entry lists it walks through and
     * the snapshot it can roll back to.
     */
    public function workspace(string $runId): string
    {
        return $this->directory().'/runs/'.$runId;
    }

    /**
     * Begin a new run, discarding any terminal state left by the previous one.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function start(string $package, ?int $packageId = null, array $attributes = []): string
    {
        $this->lastHeartbeatAt = null;
        $runId = (string) Str::uuid();

        $this->write([
            'run_id' => $runId,
            'status' => self::STATUS_PROCESSING,
            'phase' => 'plan',
            'message' => '',
            'package' => $package,
            'package_id' => $packageId,
            'files_done' => 0,
            'files_total' => 0,
            'can_rollback' => false,
            'started_at' => now()->toIso8601String(),
            'heartbeat_at' => now()->toIso8601String(),
            ...$attributes,
        ]);

        return $runId;
    }

    /**
     * Merge changes into the current run without disturbing the rest of it.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function patch(array $attributes): void
    {
        $this->write([
            ...$this->read(),
            ...$attributes,
            'heartbeat_at' => now()->toIso8601String(),
        ]);
    }

    /**
     * Move to the next phase, resetting the progress counters that belong to it.
     */
    public function enterPhase(string $phase, int $total = 0): void
    {
        $this->lastHeartbeatAt = null;

        $this->patch([
            'phase' => $phase,
            'files_done' => 0,
            'files_total' => $total,
        ]);
    }

    /**
     * Record progress within the current phase and prove the process is alive.
     */
    public function heartbeat(int $filesDone, int $filesTotal, bool $force = false): void
    {
        $now = microtime(true);

        if (! $force && $this->lastHeartbeatAt !== null && ($now - $this->lastHeartbeatAt) < self::HEARTBEAT_THROTTLE_SECONDS) {
            return;
        }

        $this->lastHeartbeatAt = $now;

        $this->write([
            ...$this->read(),
            'status' => self::STATUS_PROCESSING,
            'files_done' => $filesDone,
            'files_total' => $filesTotal,
            'heartbeat_at' => now()->toIso8601String(),
        ]);
    }

    public function markDone(): void
    {
        $state = $this->read();

        $this->write([
            ...$state,
            'status' => self::STATUS_DONE,
            'phase' => 'complete',
            'message' => '',
            'files_done' => $state['files_total'] ?? 0,
            'can_rollback' => false,
            'heartbeat_at' => now()->toIso8601String(),
        ]);
    }

    public function markFailed(string $message): void
    {
        $this->write([
            ...$this->read(),
            'status' => self::STATUS_FAILED,
            'message' => $message,
            'heartbeat_at' => now()->toIso8601String(),
        ]);
    }

    public function clear(): void
    {
        $this->lastHeartbeatAt = null;

        $runId = $this->read()['run_id'] ?? null;

        if (is_string($runId) && $runId !== '') {
            File::deleteDirectory($this->workspace($runId));
        }

        File::delete($this->path());
    }

    /**
     * Whether an update is genuinely in flight. A run whose heartbeat has gone
     * quiet reports `stalled`, not `processing`, so a second update is not
     * blocked forever by a process the host silently killed.
     */
    public function isRunning(): bool
    {
        return $this->current()['status'] === self::STATUS_PROCESSING;
    }

    /**
     * Whether there is a run to pick up — in flight or stalled part-way. Either
     * way it owns the application until it is finished or abandoned.
     */
    public function isResumable(): bool
    {
        $state = $this->current();

        return in_array($state['status'], [self::STATUS_PROCESSING, self::STATUS_STALLED, self::STATUS_FAILED], true)
            && $state['phase'] !== 'complete';
    }

    /**
     * Whether a run is in flight against this specific package — the check that
     * stops it being deleted out from under an installation.
     */
    public function isRunningPackage(int $packageId): bool
    {
        return $this->isRunning() && ($this->read()['package_id'] ?? null) === $packageId;
    }

    /**
     * @return array<string, mixed>
     */
    public function raw(): array
    {
        return $this->read();
    }

    /**
     * @return array<string, mixed>
     */
    public function current(): array
    {
        $state = $this->read();

        if ($state === []) {
            return $this->idleState();
        }

        $status = $state['status'] ?? self::STATUS_IDLE;
        $filesDone = (int) ($state['files_done'] ?? 0);
        $filesTotal = (int) ($state['files_total'] ?? 0);
        $phase = (string) ($state['phase'] ?? 'plan');

        if ($status === self::STATUS_PROCESSING && $this->hasStalled($state)) {
            $status = self::STATUS_STALLED;
        }

        return [
            'run_id' => $state['run_id'] ?? null,
            'status' => $status,
            'phase' => $phase,
            'phase_label' => $this->phaseLabel($phase),
            'message' => $status === self::STATUS_STALLED
                ? 'The update stopped responding, most likely because the server ended the request. Nothing further is being written — you can resume it.'
                : (string) ($state['message'] ?? ''),
            'package' => $state['package'] ?? null,
            'package_id' => $state['package_id'] ?? null,
            'target_version' => $state['target_version'] ?? null,
            'files_done' => $filesDone,
            'files_total' => $filesTotal,
            'percent' => $filesTotal > 0 ? (int) floor(($filesDone / $filesTotal) * 100) : 0,
            'can_rollback' => (bool) ($state['can_rollback'] ?? false),
            'resumable' => $status !== self::STATUS_DONE && $phase !== 'complete',
            'started_at' => $state['started_at'] ?? null,
            'heartbeat_at' => $state['heartbeat_at'] ?? null,
        ];
    }

    /**
     * Human wording for each phase. An unknown phase is reported rather than
     * hidden: it means a run was started by a release that names its phases
     * differently, which the admin needs to know about.
     */
    private function phaseLabel(string $phase): string
    {
        return match ($phase) {
            'plan' => 'Preparing the update',
            'backup' => 'Backing up files that will change',
            'extract' => 'Extracting files',
            'remove' => 'Removing files this version drops',
            'merge' => 'Merging module settings',
            'caches' => 'Clearing compiled caches',
            'migrate' => 'Running database migrations',
            'privatize-video' => 'Moving lesson videos to private storage',
            'finalize' => 'Finishing up',
            'complete' => 'Complete',
            default => "Unknown step ({$phase})",
        };
    }

    /**
     * @param  array<string, mixed>  $state
     */
    private function hasStalled(array $state): bool
    {
        $heartbeat = $state['heartbeat_at'] ?? null;

        if (! is_string($heartbeat) || $heartbeat === '') {
            return true;
        }

        return strtotime($heartbeat) < now()->subSeconds(self::STALL_AFTER_SECONDS)->getTimestamp();
    }

    /**
     * @return array<string, mixed>
     */
    private function idleState(): array
    {
        return [
            'run_id' => null,
            'status' => self::STATUS_IDLE,
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
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function read(): array
    {
        $path = $this->path();

        if (! File::isFile($path)) {
            return [];
        }

        $decoded = json_decode((string) File::get($path), true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Written via a temporary file and renamed into place so a concurrent
     * status poll can never read a half-written JSON document.
     *
     * @param  array<string, mixed>  $state
     */
    private function write(array $state): void
    {
        File::ensureDirectoryExists($this->directory());

        $path = $this->path();
        $temporaryPath = $path.'.tmp';

        File::put($temporaryPath, json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        @rename($temporaryPath, $path);
    }
}

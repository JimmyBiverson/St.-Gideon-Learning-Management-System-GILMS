<?php

namespace Modules\Maintenance\Services;

use App\Rules\RejectsExecutableExtension;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use ZipArchive;

class UpdateService extends FileService
{
    /**
     * Loose files Laravel/the framework legitimately ships directly under
     * public/ — nothing else is allowed to land there as a top-level file.
     *
     * @var array<int, string>
     */
    private const array ALLOWED_PUBLIC_ROOT_FILES = [
        'index.php', '.htaccess', 'robots.txt', 'favicon.ico', 'favicon.svg',
        'apple-touch-icon.png', 'web.config', 'hot',
    ];

    /**
     * Directories under public/ that are allowed to receive new files during
     * an update (compiled assets, static assets, the storage symlink target)
     * — still subject to the executable-extension check below.
     *
     * @var array<int, string>
     */
    private const array ALLOWED_PUBLIC_SUBDIRECTORIES = ['build/', 'assets/', 'script/', 'storage/'];

    /**
     * Clear all caches with optional aggressive mode
     */
    public function clearCaches(bool $aggressive = false): void
    {
        $commands = [
            'cache:clear --no-interaction --force',
            'config:clear --no-interaction --force',
            'route:clear --no-interaction --force',
            'view:clear --no-interaction --force',
            'event:clear --no-interaction --force',
        ];

        if ($aggressive) {
            $commands[] = 'optimize:clear --no-interaction --force';
        }

        foreach ($commands as $command) {
            try {
                Artisan::call($command);
                Log::info("Executed: php artisan {$command}");
            } catch (\Exception $e) {
                Log::error("Failed to execute {$command}: ".$e->getMessage());
            }
        }
    }

    /**
     * Manually delete cache files that might be locked
     */
    public function manuallyClearCacheFiles(): void
    {
        $cachePaths = [
            base_path('bootstrap/cache/'),
            storage_path('framework/cache/data/'),
            storage_path('framework/sessions/'),
            storage_path('framework/views/'),
        ];

        foreach ($cachePaths as $path) {
            try {
                if (file_exists($path)) {
                    // Delete all files in cache directories
                    $files = new \RecursiveIteratorIterator(
                        new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS),
                        \RecursiveIteratorIterator::CHILD_FIRST
                    );

                    foreach ($files as $file) {
                        if ($file->isFile()) {
                            @unlink($file->getRealPath());
                        }
                    }
                    Log::info("Manually cleared cache files in: {$path}");
                }
            } catch (\Exception $e) {
                Log::error("Failed to manually clear cache in {$path}: ".$e->getMessage());
            }
        }
    }

    /**
     * Number of entries handed to ZipArchive::extractTo() per batch. Extracting
     * all 30,000+ entries in a single call gives the caller no opportunity to
     * report progress or prove the process is still alive, which is what made a
     * killed update indistinguishable from a slow one.
     */
    private const int EXTRACTION_BATCH_SIZE = 250;

    /**
     * Update application from uploaded ZIP file
     *
     * @param  (callable(int, int): void)|null  $onProgress  Receives (filesExtracted, filesTotal)
     *                                                       after each batch.
     */
    public function updateApplicationFromZip(string $zipFilePath, ?callable $onProgress = null)
    {
        $zip = new ZipArchive;
        $rootPath = base_path();

        try {
            // Validate ZIP file exists
            if (! file_exists($zipFilePath)) {
                throw new \Exception('Update ZIP file not found: '.$zipFilePath);
            }

            // Open the update ZIP file
            if ($zip->open($zipFilePath) !== true) {
                throw new \Exception('Cannot open update ZIP file: '.basename($zipFilePath));
            }

            // Validate every entry before writing anything — a partially
            // applied update is far safer to recover from than one where
            // the malicious entry was extracted before the check ran.
            $this->assertZipEntriesAreSafe($zip);

            $filesToExtract = [];

            // Build array of files to extract, safely skipping .env
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $fileName = $zip->getNameIndex($i);

                // Skip the .env file anywhere in the project
                if (basename($fileName) === '.env') {
                    continue;
                }

                $filesToExtract[] = $fileName;
            }

            $extractedCount = 0;
            $totalToExtract = count($filesToExtract);

            if ($onProgress !== null) {
                $onProgress(0, $totalToExtract);
            }

            foreach (array_chunk($filesToExtract, self::EXTRACTION_BATCH_SIZE) as $batch) {
                if (! $zip->extractTo($rootPath, $batch)) {
                    throw new \Exception('Failed to extract files using ZipArchive::extractTo');
                }

                $extractedCount += count($batch);

                if ($onProgress !== null) {
                    $onProgress($extractedCount, $totalToExtract);
                }
            }

            $removedCount = $this->applyRemovals($this->removalsFromManifest($zip));

            $zip->close();

            $this->mergeModuleStatuses();

            // Log successful extraction
            Log::info('Update ZIP extracted successfully', [
                'files_extracted' => $extractedCount,
                'files_removed' => $removedCount,
                'target_directory' => $rootPath,
            ]);
        } catch (\Exception $e) {
            // Log the error before throwing
            Log::error('Failed to extract update ZIP', [
                'file' => $zipFilePath,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * The paths this package declares as deleted since its base version.
     *
     * @return array<int, string>
     */
    public function removalsFromManifest(ZipArchive $zip): array
    {
        $contents = $zip->getFromName(config('release.package.manifest_file', 'update-manifest.json'));

        if ($contents === false) {
            return [];
        }

        $manifest = json_decode($contents, true);

        if (! is_array($manifest) || ! is_array($manifest['removed'] ?? null)) {
            return [];
        }

        return array_values(array_filter($manifest['removed'], 'is_string'));
    }

    /**
     * Delete files the new version no longer ships.
     *
     * Extraction only ever adds and overwrites, so without this a long-lived
     * installation accumulates every file ever shipped: vendor packages that
     * are no longer in composer.lock, migrations that were deleted, classes
     * that were renamed and now collide with their replacement under PSR-4.
     *
     * The paths were validated before extraction began; they are checked again
     * here because this is where the deletion actually happens.
     *
     * @param  array<int, string>  $paths
     */
    private function applyRemovals(array $paths): int
    {
        if ($paths === []) {
            return 0;
        }

        $root = realpath(base_path());
        $removed = 0;

        foreach ($paths as $path) {
            if ($this->isUnsafePath($path) || str_ends_with($path, '/')) {
                Log::warning('Skipped unsafe path in update removal list', ['path' => $path]);

                continue;
            }

            $target = base_path($path);
            $real = realpath($target);

            // Must exist, be a plain file, and resolve inside the application —
            // a symlink pointing elsewhere is not ours to delete.
            if ($real === false || $root === false || ! str_starts_with($real, $root.DIRECTORY_SEPARATOR)) {
                continue;
            }

            if (! is_file($real) || is_link($target)) {
                continue;
            }

            if (@unlink($real)) {
                $removed++;
            }
        }

        return $removed;
    }

    /**
     * Fold a package's `modules_statuses.dist.json` into the installation's own
     * `modules_statuses.json`, then discard it.
     *
     * Shipping `modules_statuses.json` directly overwrote the customer's file,
     * so every plugin they had installed silently vanished from the app — the
     * files survived under Modules/, but nothing listed them any more. Existing
     * entries therefore keep the customer's value (a module they chose to
     * disable stays disabled) and only genuinely new modules are added.
     */
    public function mergeModuleStatuses(): void
    {
        $distPath = base_path('modules_statuses.dist.json');

        if (! file_exists($distPath)) {
            return;
        }

        try {
            $shipped = json_decode((string) file_get_contents($distPath), true);

            if (! is_array($shipped)) {
                throw new \RuntimeException('modules_statuses.dist.json is not valid JSON.');
            }

            $currentPath = base_path('modules_statuses.json');
            $current = file_exists($currentPath)
                ? json_decode((string) file_get_contents($currentPath), true)
                : [];

            if (! is_array($current)) {
                $current = [];
            }

            // Union with the installation's values winning on conflict.
            $merged = $current + $shipped;

            file_put_contents($currentPath, json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Stale compiled module list — regenerated on the next boot.
            @unlink(base_path('bootstrap/cache/modules.php'));

            Log::info('Merged shipped module statuses into the installation', [
                'added' => array_keys(array_diff_key($shipped, $current)),
                'preserved' => array_keys($current),
            ]);
        } finally {
            @unlink($distPath);
        }
    }

    /**
     * Reject the whole update before extracting anything if any entry looks
     * like a path-traversal attempt, or would introduce/replace a
     * web-executable file somewhere it doesn't belong under public/.
     *
     * This closes the RCE path where an update ZIP entry named e.g.
     * "public/x1.php" or "../../../public/index.php" would otherwise be
     * written verbatim to the live web root.
     *
     * @throws \Exception
     */
    private function assertZipEntriesAreSafe(ZipArchive $zip): void
    {
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $fileName = $zip->getNameIndex($i);

            if ($fileName === false || $fileName === '' || basename($fileName) === '.env') {
                continue;
            }

            if ($this->isUnsafePath($fileName)) {
                throw new \Exception("Update package rejected: unsafe path in ZIP entry \"{$fileName}\".");
            }

            if (str_starts_with($fileName, 'public/') && ! $this->isAllowedPublicEntry(substr($fileName, strlen('public/')))) {
                throw new \Exception("Update package rejected: unexpected file \"{$fileName}\" is not part of the application's known public assets.");
            }
        }
    }

    /**
     * Path traversal / absolute-path guard, mirroring the same check used
     * for plugin package ZIPs (App\Services\Plugins\PluginZipValidator).
     */
    private function isUnsafePath(string $fileName): bool
    {
        return str_contains($fileName, '..')
            || str_starts_with($fileName, '/')
            || str_starts_with($fileName, '\\')
            || (bool) preg_match('#^[A-Za-z]:[\\\\/]#', $fileName);
    }

    /**
     * Whether a path relative to public/ is allowed to be written by an
     * application update.
     */
    private function isAllowedPublicEntry(string $relativePath): bool
    {
        if ($relativePath === '' || str_ends_with($relativePath, '/')) {
            // Directory entry.
            return true;
        }

        if (in_array($relativePath, self::ALLOWED_PUBLIC_ROOT_FILES, true)) {
            return true;
        }

        foreach (self::ALLOWED_PUBLIC_SUBDIRECTORIES as $allowedDirectory) {
            if (str_starts_with($relativePath, $allowedDirectory)) {
                return ! RejectsExecutableExtension::isDenied(pathinfo($relativePath, PATHINFO_EXTENSION));
            }
        }

        return false;
    }
}

<?php

namespace App\Console\Commands;

use App\Services\Updates\UpdatePackageValidator;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use RuntimeException;
use ZipArchive;

class MakeVersionCommand extends Command
{
    protected $signature = 'make:version
        {version : The release version number, e.g. 5.4.2}
        {--type=full : Package profile — "full" ships everything (installer), "update" omits build-time and dev tooling}
        {--min-from= : Oldest installed version this package may be applied on top of}
        {--base= : Build an incremental package containing only what changed since this version}
        {--no-vendor : Omit vendor/ (only safe when composer.lock has not changed)}';

    protected $description = 'Bump version.txt and package the project source into a customer-ready release ZIP';

    /**
     * Build-time-only paths dropped from an `--type=update` package. None of it
     * is needed to run the application, and ZIP size is exactly what decides
     * whether an update survives upload and extraction on shared hosting.
     *
     * @var array<int, string>
     */
    private const array UPDATE_PROFILE_EXCLUDES = [
        'docker',
        'Dockerfile',
        'docker-compose.yaml',
        'docker-compose.prod.yaml',
        'docker.env',
        '.dockerignore',
        'package-lock.json',
        'eslint.config.js',
        '.prettierrc',
        '.prettierignore',
        'tsconfig.json',
        'vite.config.ts',
        'components.json',
    ];

    public function handle(): int
    {
        $version = $this->argument('version');
        $type = $this->option('type');

        if (! preg_match('/^\d+\.\d+\.\d+$/', $version)) {
            $this->error("Invalid version [{$version}]. Expected a semantic version like 5.4.2.");

            return self::FAILURE;
        }

        if (! in_array($type, ['full', 'update'], true)) {
            $this->error("Invalid --type [{$type}]. Expected \"full\" or \"update\".");

            return self::FAILURE;
        }

        $minimumFrom = $this->option('min-from') ?: config('release.package.min_upgradable_from', '5.0.0');

        if (! preg_match('/^\d+\.\d+\.\d+$/', (string) $minimumFrom)) {
            $this->error("Invalid --min-from [{$minimumFrom}]. Expected a semantic version like 5.0.0.");

            return self::FAILURE;
        }

        $baseVersion = $this->option('base') ?: null;

        if ($baseVersion !== null) {
            if (! preg_match('/^\d+\.\d+\.\d+$/', $baseVersion)) {
                $this->error("Invalid --base [{$baseVersion}]. Expected a semantic version like 5.4.2.");

                return self::FAILURE;
            }

            if (version_compare($version, $baseVersion, '<=')) {
                $this->error("--base [{$baseVersion}] must be older than the version being built [{$version}].");

                return self::FAILURE;
            }

            if (! File::exists($this->indexPath($baseVersion))) {
                $this->error("No file index recorded for version {$baseVersion}.");
                $this->line('An incremental package can only be built against a version that was itself built by this command.');
                $this->line('Expected: '.$this->indexPath($baseVersion));

                return self::FAILURE;
            }
        }

        if (! File::exists(public_path('build/manifest.json'))) {
            $this->error('Vite manifest not found at public/build/manifest.json.');
            $this->line('Run a full production build first: npm run build:ssr');

            return self::FAILURE;
        }

        if (! File::exists(base_path('vendor/autoload.php'))) {
            $this->error('vendor/ is missing or incomplete.');
            $this->line('Run: composer install --no-dev --optimize-autoloader');

            return self::FAILURE;
        }

        if (File::isDirectory(base_path('vendor/phpunit')) || File::isDirectory(base_path('vendor/pestphp'))) {
            $this->warn('vendor/ still contains dev dependencies (phpunit/pestphp found).');
            $this->warn('Consider rebuilding first with: composer install --no-dev --optimize-autoloader');
        }

        File::put(base_path('version.txt'), $version);
        $this->info("Updated version.txt to {$version}.");

        $this->info('Clearing compiled caches...');
        Artisan::call('optimize:clear');

        $zipName = match (true) {
            $baseVersion !== null => "mentor-lms-update-v{$baseVersion}-to-v{$version}.zip",
            $type === 'update' => "mentor-lms-update-v{$version}.zip",
            default => "mentor-lms-v{$version}.zip",
        };
        $outputPath = rtrim(config('release.output_path'), '/').'/'.$zipName;
        File::ensureDirectoryExists(dirname($outputPath));

        if (File::exists($outputPath)) {
            File::delete($outputPath);
        }

        // Staging must live outside the project tree entirely: storage/ is
        // itself one of the directories being copied into the release, so
        // nesting the staging path under storage_path() makes
        // copyDirectory() copy the (growing) destination into itself.
        $stagingPath = rtrim(sys_get_temp_dir(), '/').'/mentor-lms-release-'.Str::uuid();

        try {
            $this->info('Staging release files...');
            $this->stageDirectories($stagingPath);
            $this->stageFiles($stagingPath);
            $this->removeExcludedPaths($stagingPath);
            $this->emptyDevDirectories($stagingPath);
            $this->removeJunkFiles($stagingPath);
            $this->applyProfile($stagingPath, $type);

            // The canonical contents of this release, captured before anything
            // is dropped for shipping. This is what the *next* incremental
            // build diffs against, so it must describe the whole version, not
            // the subset that happened to be packaged.
            $fileIndex = $this->buildFileIndex($stagingPath);

            if ($this->option('no-vendor')) {
                File::deleteDirectory($stagingPath.'/vendor');
                $this->line('Omitted vendor/ from the package.');
            }

            $removed = $baseVersion === null
                ? []
                : $this->reduceToChangedFiles($stagingPath, $fileIndex, $baseVersion);

            $this->writeManifest($stagingPath, $version, $type, (string) $minimumFrom, $baseVersion, $removed);

            $this->info('Building ZIP archive...');
            $this->buildZip($stagingPath, $outputPath);

            // Nothing is recorded or published until the package proves itself:
            // a rejected build leaves no ZIP, no checksum and no index entry
            // claiming this version shipped.
            if (! $this->selfValidate($outputPath)) {
                File::delete($outputPath);

                return self::FAILURE;
            }

            $this->writeChecksum($outputPath);
            $this->archiveFileIndex($version, $type, $fileIndex);
            $this->summarise($outputPath, $version, $type, (string) $minimumFrom, $baseVersion, $removed);

            return self::SUCCESS;
        } catch (RuntimeException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        } finally {
            File::deleteDirectory($stagingPath);
        }
    }

    /**
     * Strip operating-system clutter that accumulates anywhere in the tree.
     * Deleting the handful that exist today would not stop the next one being
     * committed, so the packager drops them on every build.
     */
    private function removeJunkFiles(string $stagingPath): void
    {
        $junkNames = ['.DS_Store', 'Thumbs.db', '.phpunit.result.cache'];
        $removed = 0;

        foreach (File::allFiles($stagingPath, hidden: true) as $file) {
            if (in_array($file->getFilename(), $junkNames, true)) {
                File::delete($file->getPathname());
                $removed++;
            }
        }

        if ($removed > 0) {
            $this->line("Removed {$removed} junk file(s) from the staged release.");
        }
    }

    /**
     * Trim build-time tooling from an update package, and hand the customer's
     * module list over as a `.dist` file the updater merges rather than a
     * `modules_statuses.json` that would overwrite the plugins they installed.
     */
    private function applyProfile(string $stagingPath, string $type): void
    {
        if ($type !== 'update') {
            return;
        }

        foreach (self::UPDATE_PROFILE_EXCLUDES as $path) {
            $target = $stagingPath.'/'.$path;

            if (File::isDirectory($target)) {
                File::deleteDirectory($target);
            } elseif (File::exists($target)) {
                File::delete($target);
            }
        }

        $statuses = $stagingPath.'/modules_statuses.json';

        if (File::exists($statuses)) {
            File::move($statuses, $stagingPath.'/modules_statuses.dist.json');
        }
    }

    /**
     * The package's identity card. Without it a ZIP cannot be recognised as a
     * Mentor LMS release, and the customer's server has no way to tell an
     * upgrade from a downgrade or a half-built archive.
     *
     * @param  array<int, string>  $removed
     */
    private function writeManifest(
        string $stagingPath,
        string $version,
        string $type,
        string $minimumFrom,
        ?string $baseVersion = null,
        array $removed = []
    ): void {
        $files = File::allFiles($stagingPath, hidden: true);

        $manifest = [
            'product' => config('release.package.product', 'mentor-lms'),
            'schema' => 1,
            'version' => $version,
            'type' => $type,
            'min_upgradable_from' => $minimumFrom,
            'generated_at' => now()->toIso8601String(),
            'file_count' => count($files),
            'vendor_included' => File::isDirectory($stagingPath.'/vendor'),
            'incremental' => $baseVersion !== null,
            // An incremental package applies to exactly this version and no
            // other: it contains only the difference from it.
            'base_version' => $baseVersion,
            // Paths deleted since the base version, which the updater removes
            // after extracting. Extraction alone only ever adds and overwrites.
            'removed' => array_values($removed),
        ];

        File::put(
            $stagingPath.'/'.config('release.package.manifest_file', 'update-manifest.json'),
            json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }

    /**
     * Reduce the staged tree to only what changed since the base version, and
     * return the paths the base version had that this one does not.
     *
     * Most releases touch a few hundred files, not thirty thousand. Shipping
     * only those is the difference between an extraction that finishes in
     * seconds and one that outlives a shared host's request timeout.
     *
     * @param  array<string, string>  $fileIndex  path => sha1 for this release
     * @return array<int, string> Paths removed since the base version
     */
    private function reduceToChangedFiles(string $stagingPath, array $fileIndex, string $baseVersion): array
    {
        $base = json_decode((string) File::get($this->indexPath($baseVersion)), true);
        $baseFiles = is_array($base['files'] ?? null) ? $base['files'] : [];
        $baseType = $base['type'] ?? null;

        if ($baseType !== null && $baseType !== $this->option('type')) {
            $this->warn("Base version {$baseVersion} was built as a \"{$baseType}\" package but this is \"{$this->option('type')}\".");
            $this->warn('The diff will include everything the two profiles disagree about.');
        }

        $unchanged = 0;

        foreach ($fileIndex as $path => $checksum) {
            // version.txt and the manifest always ship: the first is what the
            // application reports about itself, the second is the package's
            // identity.
            if ($path === 'version.txt') {
                continue;
            }

            if (($baseFiles[$path] ?? null) === $checksum) {
                File::delete($stagingPath.'/'.$path);
                $unchanged++;
            }
        }

        $removed = array_values(array_diff(array_keys($baseFiles), array_keys($fileIndex)));

        $this->line(sprintf(
            'Incremental against %s: %s changed, %s unchanged (omitted), %s removed.',
            $baseVersion,
            number_format(count($fileIndex) - $unchanged),
            number_format($unchanged),
            number_format(count($removed))
        ));

        return $removed;
    }

    /**
     * @return array<string, string> path => sha1
     */
    private function buildFileIndex(string $stagingPath): array
    {
        $base = rtrim($stagingPath, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
        $index = [];

        foreach (File::allFiles($stagingPath, hidden: true) as $file) {
            $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', str_replace($base, '', $file->getPathname()));
            $index[$relativePath] = sha1_file($file->getPathname());
        }

        return $index;
    }

    private function indexPath(string $version): string
    {
        return rtrim(config('release.manifest_archive_path'), '/').'/'.$version.'.json';
    }

    private function writeChecksum(string $outputPath): void
    {
        $checksum = hash_file('sha256', $outputPath);

        File::put($outputPath.'.sha256', $checksum.'  '.basename($outputPath).PHP_EOL);
    }

    /**
     * Record what this version contains, so a future incremental release can
     * work out which files changed and which were deleted.
     *
     * @param  array<string, string>  $index
     */
    private function archiveFileIndex(string $version, string $type, array $index): void
    {
        $archivePath = rtrim(config('release.manifest_archive_path'), '/');
        File::ensureDirectoryExists($archivePath);

        File::put(
            $archivePath.'/'.$version.'.json',
            json_encode([
                'version' => $version,
                'type' => $type,
                'generated_at' => now()->toIso8601String(),
                'files' => $index,
            ], JSON_UNESCAPED_SLASHES)
        );
    }

    /**
     * Run the customer's own validator against the package we just built, so a
     * package that would be rejected on their server never leaves this machine.
     */
    private function selfValidate(string $outputPath): bool
    {
        $this->info('Validating package...');

        $result = app(UpdatePackageValidator::class)->validate($outputPath);

        foreach ($result->warnings as $warning) {
            $this->warn('  ! '.$warning);
        }

        if ($result->isValid()) {
            $this->info('  Package passed validation.');

            return true;
        }

        $this->error('The package failed validation and has been deleted:');

        foreach ($result->errors as $error) {
            $this->error('  x '.$error);
        }

        return false;
    }

    /**
     * @param  array<int, string>  $removed
     */
    private function summarise(
        string $outputPath,
        string $version,
        string $type,
        string $minimumFrom,
        ?string $baseVersion,
        array $removed
    ): void {
        $this->newLine();
        $this->info("Release package created: {$outputPath}");

        $rows = [
            ['Version', $version],
            ['Type', $type.($baseVersion !== null ? ' (incremental)' : '')],
        ];

        if ($baseVersion !== null) {
            $rows[] = ['Applies to', 'exactly '.$baseVersion];
            $rows[] = ['Files removed', number_format(count($removed))];
        } else {
            $rows[] = ['Upgradable from', $minimumFrom.' or newer'];
        }

        $rows[] = ['Size', sprintf('%.1f MB', File::size($outputPath) / 1024 / 1024)];
        $rows[] = ['SHA-256', trim(strtok((string) File::get($outputPath.'.sha256'), ' '))];

        $this->table(['', ''], $rows);
    }

    private function stageDirectories(string $stagingPath): void
    {
        foreach (config('release.directories', []) as $directory) {
            $source = base_path($directory);

            if (! File::isDirectory($source)) {
                $this->warn("Skipping missing directory: {$directory}");

                continue;
            }

            File::copyDirectory($source, $stagingPath.'/'.$directory);
        }
    }

    private function stageFiles(string $stagingPath): void
    {
        foreach (config('release.files', []) as $file) {
            $source = base_path($file);

            if (! File::exists($source)) {
                $this->warn("Skipping missing file: {$file}");

                continue;
            }

            $destination = $stagingPath.'/'.$file;
            File::ensureDirectoryExists(dirname($destination));
            File::copy($source, $destination);
        }
    }

    private function removeExcludedPaths(string $stagingPath): void
    {
        foreach (config('release.exclude_paths', []) as $path) {
            $target = $stagingPath.'/'.$path;

            if (File::isDirectory($target)) {
                File::deleteDirectory($target);
            } elseif (File::exists($target)) {
                File::delete($target);
            }
        }
    }

    /**
     * Empty out local/dev-only directory contents that must still exist
     * (Laravel/the app expects the directories present at boot) but whose
     * contents are never meant to ship: caches, sessions, logs, staged
     * plugin-install scratch files, dev-uploaded media, etc. Then drop the
     * handful of directories that shouldn't ship even as an empty folder.
     */
    private function emptyDevDirectories(string $stagingPath): void
    {
        $rules = config('release.empty_directories', []);

        // Full staging-rooted paths for every configured rule, so a parent
        // directory's cleanup can recognise "this subdirectory has its own
        // rule, leave it alone" regardless of processing order below.
        $protectedPaths = array_map(
            fn (string $path) => $stagingPath.'/'.$path,
            array_keys($rules)
        );

        // Deepest paths first: storage/framework/cache/data must already
        // be in its final state by the time storage/framework/cache
        // decides whether to delete it as "just another subdirectory".
        uksort($rules, fn (string $a, string $b) => substr_count($b, '/') <=> substr_count($a, '/'));

        foreach ($rules as $path => $keep) {
            $this->emptyDirectory($stagingPath.'/'.$path, $keep, $protectedPaths);
        }

        foreach (config('release.excluded_directories', []) as $path) {
            File::deleteDirectory($stagingPath.'/'.$path);
        }

        // Defensive: never ship a release that boots straight into
        // maintenance mode because the machine building it happened to be
        // down at the time.
        File::delete($stagingPath.'/storage/framework/maintenance.php');
    }

    /**
     * @param  array<int, string>  $keep  Filenames to leave in place directly inside $path.
     * @param  array<int, string>  $protectedPaths  Full staging-rooted paths that must
     *                                              never be deleted here even though they're a subdirectory of $path — they have
     *                                              their own rule in config('release.empty_directories') and are cleaned by it.
     */
    private function emptyDirectory(string $path, array $keep = [], array $protectedPaths = []): void
    {
        if (! File::isDirectory($path)) {
            return;
        }

        // files() (depth 0, non-recursive) — not allFiles(), which would
        // also reach into e.g. cache/data/ and re-evaluate its contents
        // against cache/'s own (possibly different) keep list, undoing
        // data/'s already-applied rule. hidden: true so .gitignore is
        // actually seen by this loop rather than "kept" only because
        // Finder's dotfile default made it invisible.
        foreach (File::files($path, hidden: true) as $file) {
            if (! in_array($file->getFilename(), $keep, true)) {
                File::delete($file->getPathname());
            }
        }

        foreach (File::directories($path) as $subDirectory) {
            if (! in_array($subDirectory, $protectedPaths, true)) {
                File::deleteDirectory($subDirectory);
            }
        }
    }

    private function buildZip(string $stagingPath, string $outputPath): void
    {
        $zip = new ZipArchive;

        if ($zip->open($outputPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException('Unable to create the release ZIP file.');
        }

        $base = rtrim($stagingPath, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;

        // ZIP archives don't store empty directories on their own — add
        // explicit entries for every directory in the tree, or ones left
        // empty by emptyDevDirectories() (storage/framework/cache,
        // storage/logs, etc.) simply won't exist after the customer
        // unzips, even though Laravel needs them present and writable.
        foreach (File::allDirectories($stagingPath) as $directory) {
            $relativePath = str_replace($base, '', $directory);
            $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            $zip->addEmptyDir($relativePath);
        }

        // hidden: true — otherwise .htaccess, .env.example, .prettierrc,
        // etc. get silently dropped from the archive.
        foreach (File::allFiles($stagingPath, hidden: true) as $file) {
            $relativePath = str_replace($base, '', $file->getPathname());
            $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            $zip->addFile($file->getPathname(), $relativePath);
        }

        $zip->close();
    }
}

<?php

namespace App\Services\Updates;

use App\Rules\RejectsExecutableExtension;
use ZipArchive;

/**
 * Decides whether a ZIP is a Mentor LMS update package that may be extracted
 * over a live installation.
 *
 * Modelled on App\Services\Plugins\PluginZipValidator, but reports a collected
 * result instead of throwing on the first problem: a customer needs to see
 * everything wrong with a package at once, and warnings must survive alongside
 * errors so packaging mistakes are visible without blocking a valid install.
 *
 * Runs in two places, deliberately: inside `make:version` against its own
 * output, so a broken package never leaves the build machine, and on the
 * customer's server before anything is written.
 */
class UpdatePackageValidator
{
    /**
     * Loose files Laravel/the framework legitimately ships directly under
     * public/ — mirrors the same list enforced at extraction time.
     *
     * @var array<int, string>
     */
    private const array ALLOWED_PUBLIC_ROOT_FILES = [
        'index.php', '.htaccess', 'robots.txt', 'favicon.ico', 'favicon.svg',
        'apple-touch-icon.png', 'web.config', 'hot',
    ];

    /**
     * @var array<int, string>
     */
    private const array ALLOWED_PUBLIC_SUBDIRECTORIES = ['build/', 'assets/', 'script/', 'storage/'];

    /**
     * @param  string|null  $currentVersion  The installed version, when validating on a customer's
     *                                       server. Omit at build time, where applicability
     *                                       checks (newer-than, min-upgradable-from) don't apply.
     */
    public function validate(string $zipPath, ?string $currentVersion = null): UpdatePackageValidation
    {
        $errors = [];
        $warnings = [];

        if (! is_file($zipPath)) {
            return new UpdatePackageValidation(errors: ['The update package could not be found on the server.']);
        }

        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            return new UpdatePackageValidation(errors: ['The file is not a readable ZIP archive. It may have been corrupted during upload.']);
        }

        try {
            $entries = $this->entries($zip);

            if ($entries === []) {
                return new UpdatePackageValidation(errors: ['The ZIP archive is empty.']);
            }

            if ($this->hasEncryptedEntries($zip)) {
                return new UpdatePackageValidation(errors: ['The ZIP archive is password protected and cannot be installed.']);
            }

            // A wrapper folder means every path is off by one level and the
            // update would silently install into a subdirectory, doing nothing.
            if ($wrapper = $this->detectWrapperDirectory($entries)) {
                return new UpdatePackageValidation(errors: [
                    "Every file in this archive sits inside a \"{$wrapper}\" folder. Re-create the ZIP from the contents of that folder rather than from the folder itself.",
                ]);
            }

            $manifest = $this->readManifest($zip, $errors);
            $incremental = (bool) ($manifest['incremental'] ?? false);
            $removed = is_array($manifest['removed'] ?? null) ? $manifest['removed'] : [];

            array_push($errors, ...$this->identityErrors($zip, $manifest, $incremental));
            array_push($errors, ...$this->layoutErrors($entries));
            array_push($errors, ...$this->nestedDirectoryErrors($entries));
            array_push($errors, ...$this->removalErrors($removed));

            $vendorIncluded = $this->containsPrefix($entries, 'vendor/');

            // An incremental package contains only what changed, so demanding
            // marker files, a built manifest or vendor/ would reject every
            // legitimate one. Its identity rests on the manifest and on the
            // base version it is pinned to instead.
            if (! $incremental) {
                array_push($errors, ...$this->completenessErrors($zip, $entries, $vendorIncluded));
                array_push($warnings, ...$this->hygieneWarnings($zip, $entries));
            } else {
                array_push($warnings, ...$this->incrementalWarnings($manifest, $entries, $removed));
            }

            if ($currentVersion !== null && $manifest !== null) {
                array_push($errors, ...$this->applicabilityErrors($manifest, $currentVersion, $incremental));
            }

            return new UpdatePackageValidation(
                errors: array_values(array_unique($errors)),
                warnings: array_values(array_unique($warnings)),
                manifest: $manifest,
                version: is_string($manifest['version'] ?? null) ? $manifest['version'] : null,
                minUpgradableFrom: is_string($manifest['min_upgradable_from'] ?? null) ? $manifest['min_upgradable_from'] : null,
                type: is_string($manifest['type'] ?? null) ? $manifest['type'] : null,
                fileCount: count($entries),
                sizeBytes: (int) filesize($zipPath),
                vendorIncluded: $vendorIncluded,
                incremental: $incremental,
                baseVersion: is_string($manifest['base_version'] ?? null) ? $manifest['base_version'] : null,
                removedCount: count($removed),
            );
        } finally {
            $zip->close();
        }
    }

    /**
     * @return array<int, string>
     */
    private function entries(ZipArchive $zip): array
    {
        $entries = [];

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);

            if (is_string($name) && $name !== '') {
                $entries[] = $name;
            }
        }

        return $entries;
    }

    private function hasEncryptedEntries(ZipArchive $zip): bool
    {
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $stat = $zip->statIndex($i);

            if (is_array($stat) && ($stat['encryption_method'] ?? ZipArchive::EM_NONE) !== ZipArchive::EM_NONE) {
                return true;
            }
        }

        return false;
    }

    /**
     * The single top-level directory every entry lives under, if there is one
     * and it isn't a directory this application actually has.
     *
     * @param  array<int, string>  $entries
     */
    private function detectWrapperDirectory(array $entries): ?string
    {
        $roots = [];

        foreach ($entries as $entry) {
            $roots[strtok($entry, '/')] = true;

            if (count($roots) > 1) {
                return null;
            }
        }

        $root = array_key_first($roots);

        if ($root === null || in_array($root, config('release.package.allowed_roots', []), true)) {
            return null;
        }

        return $root;
    }

    /**
     * @param  array<int, string>  $errors
     * @return array<string, mixed>|null
     */
    private function readManifest(ZipArchive $zip, array &$errors): ?array
    {
        $manifestFile = config('release.package.manifest_file', 'update-manifest.json');
        $contents = $zip->getFromName($manifestFile);

        if ($contents === false) {
            $errors[] = "This package has no {$manifestFile} and cannot be identified as a Mentor LMS release. Rebuild it with `php artisan make:version`.";

            return null;
        }

        $decoded = json_decode($contents, true);

        if (! is_array($decoded)) {
            $errors[] = "The package's {$manifestFile} is not valid JSON.";

            return null;
        }

        return $decoded;
    }

    /**
     * @param  array<string, mixed>|null  $manifest
     * @return array<int, string>
     */
    private function identityErrors(ZipArchive $zip, ?array $manifest, bool $incremental = false): array
    {
        $errors = [];

        if (! $incremental) {
            foreach (config('release.package.marker_files', []) as $marker) {
                if ($zip->getFromName($marker) === false) {
                    $errors[] = "This does not look like a Mentor LMS package: {$marker} is missing.";
                }
            }
        }

        if ($manifest === null) {
            return $errors;
        }

        if ($incremental) {
            $baseVersion = $manifest['base_version'] ?? null;

            if (! is_string($baseVersion) || ! $this->isSemver($baseVersion)) {
                $errors[] = 'This incremental package does not declare which version it applies to and cannot be installed.';
            }
        }

        $expectedProduct = config('release.package.product', 'mentor-lms');

        if (($manifest['product'] ?? null) !== $expectedProduct) {
            $errors[] = "This package is for a different product (expected \"{$expectedProduct}\").";
        }

        $schema = $manifest['schema'] ?? null;

        if (! in_array($schema, config('release.package.supported_schemas', [1]), true)) {
            $errors[] = 'This package was built for a newer version of the updater. Update to the latest release first.';
        }

        $version = $manifest['version'] ?? null;

        if (! is_string($version) || ! $this->isSemver($version)) {
            $errors[] = 'The package manifest does not declare a valid version number.';

            return $errors;
        }

        // version.txt is what the running application reads, so a mismatch
        // would leave the site reporting a version it isn't.
        $versionFile = $zip->getFromName('version.txt');

        if (is_string($versionFile) && trim($versionFile) !== $version) {
            $errors[] = 'The package is inconsistent: version.txt says "'.trim($versionFile)."\" but the manifest says \"{$version}\".";
        }

        return $errors;
    }

    /**
     * Path safety and "nothing unexpected in here" checks.
     *
     * @param  array<int, string>  $entries
     * @return array<int, string>
     */
    private function layoutErrors(array $entries): array
    {
        $errors = [];
        $allowedRoots = config('release.package.allowed_roots', []);
        $allowedRootFiles = config('release.package.allowed_root_files', []);
        $forbidden = config('release.package.forbidden_paths', []);
        $unexpected = [];

        foreach ($entries as $entry) {
            if ($this->isUnsafePath($entry)) {
                $errors[] = "Update package rejected: unsafe path in ZIP entry \"{$entry}\".";

                continue;
            }

            foreach ($forbidden as $pattern) {
                if ($this->matchesPath($entry, $pattern)) {
                    $errors[] = "The package contains \"{$pattern}\", which must never be shipped to a customer.";
                }
            }

            if (str_starts_with($entry, 'public/') && ! $this->isAllowedPublicEntry(substr($entry, strlen('public/')))) {
                $errors[] = "Update package rejected: unexpected file \"{$entry}\" is not part of the application's known public assets.";

                continue;
            }

            if (! str_contains(rtrim($entry, '/'), '/')) {
                // Top-level entry: either a known root directory or a known file.
                $name = rtrim($entry, '/');

                if (! in_array($name, $allowedRoots, true) && ! in_array($name, $allowedRootFiles, true)) {
                    $unexpected[] = $name;
                }

                continue;
            }

            if (! in_array(strtok($entry, '/'), $allowedRoots, true)) {
                $unexpected[] = strtok($entry, '/');
            }
        }

        $unexpected = array_values(array_unique($unexpected));

        if ($unexpected !== []) {
            $errors[] = 'The package contains unexpected top-level entries: '.implode(', ', array_slice($unexpected, 0, 10)).'.';
        }

        return $errors;
    }

    /**
     * The manifest's `removed` list drives real deletions on the customer's
     * server, so it is held to the same standard as the archive's own entries —
     * and additionally may never name anything that belongs to the customer
     * rather than to the release.
     *
     * @param  array<int, mixed>  $removed
     * @return array<int, string>
     */
    private function removalErrors(array $removed): array
    {
        $errors = [];
        $allowedRoots = config('release.package.allowed_roots', []);

        foreach ($removed as $path) {
            if (! is_string($path) || $path === '') {
                $errors[] = 'The package lists an invalid path for removal.';

                continue;
            }

            if ($this->isUnsafePath($path) || str_ends_with($path, '/')) {
                $errors[] = "Update package rejected: unsafe path in removal list \"{$path}\".";

                continue;
            }

            // Either inside a known directory, or a known top-level file — a
            // release legitimately drops e.g. a config or a root-level script.
            $isKnownDirectory = str_contains($path, '/')
                && in_array(strtok($path, '/'), $allowedRoots, true);
            $isKnownRootFile = ! str_contains($path, '/')
                && in_array($path, config('release.package.allowed_root_files', []), true);

            if (! $isKnownDirectory && ! $isKnownRootFile) {
                $errors[] = "Update package rejected: removal list names \"{$path}\", which is outside the application's directories.";

                continue;
            }

            if ($this->isProtectedFromRemoval($path)) {
                $errors[] = "Update package rejected: removal list names \"{$path}\", which belongs to the installation and is never the release's to delete.";
            }
        }

        return $errors;
    }

    /**
     * Paths an update may overwrite but must never delete: the customer's
     * configuration, their uploaded media, their logs, and the state files that
     * describe their installation rather than the release.
     */
    private function isProtectedFromRemoval(string $path): bool
    {
        $protectedPrefixes = [
            'storage/app/public/',
            'storage/app/private/',
            'storage/app/backups/',
            'storage/app/plugins/',
            'storage/logs/',
            'storage/framework/',
            'bootstrap/cache/',
            'public/storage/',
        ];

        foreach ($protectedPrefixes as $prefix) {
            if (str_starts_with($path, $prefix)) {
                return true;
            }
        }

        return in_array($path, [
            '.env',
            'version.txt',
            'modules_statuses.json',
            'modules_statuses.dist.json',
            'update-manifest.json',
        ], true);
    }

    /**
     * @param  array<int, string>  $entries
     * @param  array<string, mixed>|null  $manifest
     * @param  array<int, mixed>  $removed
     * @return array<int, string>
     */
    private function incrementalWarnings(?array $manifest, array $entries, array $removed): array
    {
        $warnings = [];

        // version.txt is what the application reports after the update, and it
        // changes every release, so an incremental package that omits it would
        // install new code under the old version number.
        if (! in_array('version.txt', $entries, true)) {
            $warnings[] = 'This incremental package does not update version.txt, so the site will still report its previous version.';
        }

        if ($entries === [] || (count($entries) <= 2 && $removed === [])) {
            $warnings[] = 'This incremental package contains no changed files and nothing to remove — it may have been built against the wrong base version.';
        }

        return $warnings;
    }

    /**
     * @param  array<int, string>  $entries
     * @return array<int, string>
     */
    private function completenessErrors(ZipArchive $zip, array $entries, bool $vendorIncluded): array
    {
        $errors = [];

        foreach (config('release.package.build_files', []) as $buildFile) {
            if ($zip->getFromName($buildFile) === false) {
                $errors[] = "The package is missing {$buildFile} — front-end assets were not built. Run `npm run build:ssr` and repackage.";
            }
        }

        if ($vendorIncluded) {
            foreach (config('release.package.vendor_files', []) as $vendorFile) {
                if ($zip->getFromName($vendorFile) === false) {
                    $errors[] = "The package includes vendor/ but {$vendorFile} is missing — the dependencies are incomplete.";
                }
            }

            foreach (config('release.package.dev_dependency_paths', []) as $devPath) {
                if ($this->containsPrefix($entries, $devPath)) {
                    $errors[] = "The package ships development dependencies ({$devPath}). Rebuild with `composer install --no-dev --optimize-autoloader`.";
                }
            }
        }

        return $errors;
    }

    /**
     * @param  array<int, string>  $entries
     * @return array<int, string>
     */
    private function hygieneWarnings(ZipArchive $zip, array $entries): array
    {
        $warnings = [];
        $largeFileThreshold = (int) config('release.package.large_file_warning_bytes', 25 * 1024 * 1024);

        foreach (config('release.package.discouraged_paths', []) as $pattern) {
            $matches = array_values(array_filter(
                $entries,
                fn (string $entry) => $this->matchesPath($entry, $pattern)
            ));

            if ($matches !== []) {
                $warnings[] = 'The package contains '.count($matches)." entry/entries matching \"{$pattern}\", which a release does not need.";
            }
        }

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $stat = $zip->statIndex($i);

            if (is_array($stat) && ($stat['size'] ?? 0) >= $largeFileThreshold) {
                $warnings[] = sprintf(
                    'Unusually large file in package: %s (%.1f MB).',
                    $stat['name'],
                    $stat['size'] / 1024 / 1024
                );
            }
        }

        if (! $this->containsPrefix($entries, 'vendor/')) {
            $warnings[] = 'This package does not include vendor/. It can only be applied to an installation whose dependencies already match composer.lock.';
        }

        return $warnings;
    }

    /**
     * @param  array<string, mixed>  $manifest
     * @return array<int, string>
     */
    private function applicabilityErrors(array $manifest, string $currentVersion, bool $incremental = false): array
    {
        $errors = [];
        $version = $manifest['version'] ?? null;

        if (! is_string($version) || ! $this->isSemver($version)) {
            return $errors;
        }

        $currentVersion = trim($currentVersion);

        // An incremental package carries only the difference from one exact
        // version, so applying it to anything else silently leaves the
        // application a mixture of two releases.
        if ($incremental) {
            $baseVersion = $manifest['base_version'] ?? null;

            if (is_string($baseVersion) && $baseVersion !== $currentVersion) {
                $errors[] = "This incremental update applies to version {$baseVersion}, but you are running {$currentVersion}. Install the releases in order, or use the full package for {$version}.";
            }
        }

        if (version_compare($version, $currentVersion, '<')) {
            $errors[] = "This package is version {$version}, which is older than the installed version {$currentVersion}. Downgrading would leave the database ahead of the code.";
        } elseif (version_compare($version, $currentVersion, '=')) {
            $errors[] = "Version {$version} is already installed.";
        }

        $minimum = $manifest['min_upgradable_from'] ?? null;

        if (is_string($minimum) && $this->isSemver($minimum) && version_compare($currentVersion, $minimum, '<')) {
            $errors[] = "Version {$version} can only be installed on {$minimum} or newer. Install the intermediate release first.";
        }

        return $errors;
    }

    private function isSemver(string $version): bool
    {
        return (bool) preg_match('/^\d+\.\d+\.\d+$/', trim($version));
    }

    /**
     * @param  array<int, string>  $entries
     */
    private function containsPrefix(array $entries, string $prefix): bool
    {
        foreach ($entries as $entry) {
            if (str_starts_with($entry, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /**
     * A pattern ending in "/" is anchored to the root of the archive and
     * matches only real files beneath it — never the directory entry itself or
     * a .gitignore placeholder, since several such directories (bootstrap/cache,
     * storage/app/backups, ...) must ship empty for the application to boot.
     * Any other pattern matches a full path or a bare filename at any depth.
     */
    private function matchesPath(string $entry, string $pattern): bool
    {
        if (str_ends_with($pattern, '/')) {
            if (str_ends_with($entry, '/') || basename($entry) === '.gitignore') {
                return false;
            }

            return str_starts_with($entry, $pattern);
        }

        return $entry === $pattern || basename($entry) === $pattern;
    }

    /**
     * Directory names that are a packaging mistake wherever they appear, unlike
     * the root-anchored rules — a vendor package's own .github/ is normal, but
     * a node_modules/ or .git/ inside one is not.
     *
     * @param  array<int, string>  $entries
     * @return array<int, string>
     */
    private function nestedDirectoryErrors(array $entries): array
    {
        $errors = [];
        $forbidden = config('release.package.forbidden_nested_directories', []);

        foreach ($entries as $entry) {
            foreach ($forbidden as $directory) {
                if (str_contains($entry, '/'.$directory.'/') || str_starts_with($entry, $directory.'/')) {
                    $errors[] = "The package contains a nested \"{$directory}\" directory, which must never be shipped.";
                }
            }
        }

        return $errors;
    }

    /**
     * Path traversal / absolute-path guard, mirroring the check applied again
     * at extraction time in Modules\Maintenance\Services\UpdateService.
     */
    private function isUnsafePath(string $fileName): bool
    {
        return str_contains($fileName, '..')
            || str_starts_with($fileName, '/')
            || str_starts_with($fileName, '\\')
            || (bool) preg_match('#^[A-Za-z]:[\\\\/]#', $fileName);
    }

    private function isAllowedPublicEntry(string $relativePath): bool
    {
        if ($relativePath === '' || str_ends_with($relativePath, '/')) {
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

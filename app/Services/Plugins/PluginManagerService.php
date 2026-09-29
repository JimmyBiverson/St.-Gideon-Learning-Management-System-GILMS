<?php

namespace App\Services\Plugins;

use App\Exceptions\PluginInstallException;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Nwidart\Modules\Exceptions\ModuleNotFoundException;
use Nwidart\Modules\Facades\Module;
use ZipArchive;

class PluginManagerService
{
    public function __construct(
        private PluginZipValidator $zipValidator,
        private PluginPackagePaths $paths,
        private PluginRegistry $registry,
        private PluginModuleDiscovery $moduleDiscovery,
    ) {}

    /**
     * @return array<int, array{
     *     name: string,
     *     alias: string,
     *     description: string,
     *     version: string|null,
     *     is_core: bool,
     *     is_enabled: bool,
     *     is_uploaded: bool,
     *     can_toggle: bool,
     *     can_delete: bool,
     *     can_update: bool,
     *     has_seeder: bool,
     *     needs_setup: bool,
     *     seeder_class: string,
     *     installed_at: string|null,
     * }>
     */
    public function listPlugins(): array
    {
        $registry = $this->registry->all();
        $plugins = [];

        foreach (Module::all() as $module) {
            $name = $module->getName();
            $isCore = $this->zipValidator->isCoreModulePublic($name);
            $plugins[] = [
                'name' => $name,
                'alias' => (string) ($module->get('alias') ?? Str::lower($name)),
                'description' => (string) ($module->get('description') ?? ''),
                'version' => $this->moduleVersion($name),
                'is_core' => $isCore,
                'is_enabled' => $module->isEnabled(),
                'is_uploaded' => $this->registry->isUploadedPlugin($name),
                'can_toggle' => ! $isCore,
                'can_delete' => ! $isCore && $this->registry->isUploadedPlugin($name),
                'can_update' => ! $isCore,
                'has_seeder' => $this->moduleHasSeeder($name),
                'needs_setup' => $this->hasPendingSetup($name),
                'seeder_class' => $name.'DatabaseSeeder',
                'installed_at' => $registry[$name]['installed_at'] ?? null,
            ];
        }

        usort($plugins, fn (array $a, array $b) => strcmp($a['name'], $b['name']));

        return $plugins;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listUploadedPlugins(): array
    {
        return array_values(array_filter(
            $this->listPlugins(),
            fn (array $plugin) => ! $plugin['is_core'],
        ));
    }

    public function runUploadedPluginSeeder(string $moduleName): void
    {
        $this->assertOptionalPlugin($moduleName);

        if (! $this->hasPendingSetup($moduleName)) {
            throw new PluginInstallException("Database setup has already been completed for [{$moduleName}].");
        }

        if (! $this->moduleHasSeeder($moduleName)) {
            throw new PluginInstallException("The module [{$moduleName}] does not have a database seeder.");
        }

        Artisan::call('module:migrate', [
            'module' => $moduleName,
            '--force' => true,
        ]);

        Artisan::call('module:seed', [
            'module' => $moduleName,
            '--class' => $moduleName.'DatabaseSeeder',
            '--force' => true,
        ]);

        $this->clearSetupFlag($moduleName);
    }

    public function setupFlagPath(string $moduleName): string
    {
        return $this->paths->moduleDirectory($moduleName).'/'.Str::lower($moduleName);
    }

    public function hasPendingSetup(string $moduleName): bool
    {
        return File::exists($this->setupFlagPath($moduleName));
    }

    private function clearSetupFlag(string $moduleName): void
    {
        $path = $this->setupFlagPath($moduleName);

        if (File::exists($path)) {
            File::delete($path);
        }
    }

    private function assertOptionalPlugin(string $moduleName): void
    {
        if ($this->zipValidator->isCoreModulePublic($moduleName)) {
            throw new PluginInstallException("The core module [{$moduleName}] cannot be managed as a plugin.");
        }

        if (! Module::has($moduleName)) {
            throw new PluginInstallException("The module [{$moduleName}] is not installed.");
        }
    }

    private function moduleHasSeeder(string $moduleName): bool
    {
        return class_exists("Modules\\{$moduleName}\\Database\\Seeders\\{$moduleName}DatabaseSeeder");
    }

    public function installFromChunkedUrl(string $pluginFileUrl): string
    {
        $zipPath = $this->resolveChunkedUploadZipPath($pluginFileUrl);

        try {
            return $this->installFromZipPath($zipPath);
        } finally {
            if (File::isFile($zipPath)) {
                File::delete($zipPath);
            }
        }
    }

    public function resolveChunkedUploadZipPath(string $fileUrl): string
    {
        $relativePath = parse_url($fileUrl, PHP_URL_PATH);

        if (! is_string($relativePath) || $relativePath === '') {
            throw new PluginInstallException('Invalid plugin file URL.');
        }

        $path = public_path($relativePath);

        if (! File::isFile($path)) {
            throw new PluginInstallException('Uploaded plugin ZIP was not found on the server.');
        }

        return $path;
    }

    public function installFromZipPath(string $zipPath): string
    {
        ini_set('max_execution_time', '600');

        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            throw new PluginInstallException('The uploaded file is not a valid ZIP archive.');
        }

        $zip->close();

        $validated = $this->zipValidator->validate($zipPath);
        $moduleName = $validated['module_name'];
        $isUpdate = $this->zipValidator->moduleExistsOnDisk($moduleName);

        if ($isUpdate && $this->zipValidator->isCoreModulePublic($moduleName)) {
            throw new PluginInstallException("The core module [{$moduleName}] cannot be replaced.");
        }

        if ($isUpdate) {
            $this->backupModuleDirectory($moduleName);
        }

        $this->extractPackage($zipPath, $moduleName);
        $this->removeMisplacedModuleCopies($moduleName);
        $this->moduleDiscovery->refresh();

        $this->registerModuleStatus($moduleName, $isUpdate);
        $this->runModuleMigrations($moduleName);
        $this->registry->register($moduleName, $isUpdate);

        Artisan::call('optimize:clear');

        return $moduleName;
    }

    public function toggle(string $moduleName, bool $enable): void
    {
        if ($this->zipValidator->isCoreModulePublic($moduleName)) {
            throw new PluginInstallException("The core module [{$moduleName}] cannot be toggled.");
        }

        if (! Module::has($moduleName)) {
            throw new PluginInstallException("The module [{$moduleName}] is not installed.");
        }

        if ($enable) {
            Artisan::call('module:enable', ['module' => $moduleName]);
        } else {
            Artisan::call('module:disable', ['module' => $moduleName]);
        }

        Artisan::call('optimize:clear');
    }

    public function delete(string $moduleName): void
    {
        if ($this->zipValidator->isCoreModulePublic($moduleName)) {
            throw new PluginInstallException("The core module [{$moduleName}] cannot be deleted.");
        }

        if (! $this->registry->isUploadedPlugin($moduleName)) {
            throw new PluginInstallException('Only uploaded plugins can be deleted from the dashboard.');
        }

        if (Module::isEnabled($moduleName)) {
            Artisan::call('module:disable', ['module' => $moduleName]);
        }

        $this->removeModuleFromDisk($moduleName);
        $this->removeModuleStatus($moduleName);
        $this->registry->forget($moduleName);
        $this->moduleDiscovery->refresh();

        Artisan::call('optimize:clear');
    }

    private function extractPackage(string $zipPath, string $moduleName): void
    {
        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            throw new PluginInstallException('Unable to open the plugin ZIP file.');
        }

        $moduleRoot = $this->paths->moduleRootInZip($moduleName);
        $basePath = base_path();

        try {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $fileName = $zip->getNameIndex($i);

                if ($fileName === false || $fileName === '') {
                    continue;
                }

                if (! $this->paths->isExtractablePath($fileName, $moduleName)) {
                    continue;
                }

                if (str_starts_with($fileName, $moduleRoot)) {
                    $relativePath = substr($fileName, strlen($moduleRoot));

                    if ($relativePath === '' || $this->zipValidator->shouldSkipExtractPath($relativePath)) {
                        continue;
                    }
                }

                $destination = $basePath.DIRECTORY_SEPARATOR.str_replace('/', DIRECTORY_SEPARATOR, $fileName);

                if (! $this->isDestinationWithinApplication($destination)) {
                    throw new PluginInstallException('The ZIP archive contains invalid paths.');
                }

                if (str_ends_with($fileName, '/')) {
                    File::ensureDirectoryExists($destination);

                    continue;
                }

                File::ensureDirectoryExists(dirname($destination));
                File::put($destination, $zip->getFromIndex($i));
            }
        } finally {
            $zip->close();
        }
    }

    private function isDestinationWithinApplication(string $destination): bool
    {
        $base = realpath(base_path());
        $parent = realpath(dirname($destination));

        if ($base === false || $parent === false) {
            return str_starts_with($destination, base_path());
        }

        return $parent === $base || str_starts_with($parent, $base.DIRECTORY_SEPARATOR);
    }

    private function backupModuleDirectory(string $moduleName): void
    {
        $source = $this->zipValidator->moduleDirectory($moduleName);

        if (! File::isDirectory($source)) {
            return;
        }

        $backupBase = config('plugins.backup_path');
        $destination = $backupBase.'/'.$moduleName.'-'.now()->format('Y-m-d-His');

        File::ensureDirectoryExists($backupBase);
        File::copyDirectory($source, $destination);

        Log::info('Plugin module backup created.', ['module' => $moduleName, 'path' => $destination]);
    }

    private function removeModuleFromDisk(string $moduleName): void
    {
        $this->removeMisplacedModuleCopies($moduleName);

        $moduleDirectory = $this->zipValidator->moduleDirectory($moduleName);

        if (File::isDirectory($moduleDirectory)) {
            File::deleteDirectory($moduleDirectory);
        }
    }

    private function removeMisplacedModuleCopies(string $moduleName): void
    {
        $modulesPath = base_path('Modules');

        if (! File::isDirectory($modulesPath)) {
            return;
        }

        foreach (File::directories($modulesPath) as $directory) {
            if (basename($directory) === $moduleName) {
                continue;
            }

            $moduleJsonPath = $directory.DIRECTORY_SEPARATOR.'module.json';

            if (! File::exists($moduleJsonPath)) {
                continue;
            }

            $data = json_decode(File::get($moduleJsonPath), true);

            if (is_array($data) && ($data['name'] ?? null) === $moduleName) {
                File::deleteDirectory($directory);
            }
        }
    }

    private function moduleVersion(string $moduleName): ?string
    {
        $jsonPath = $this->zipValidator->moduleDirectory($moduleName).'/module.json';

        if (! File::exists($jsonPath)) {
            return null;
        }

        $data = json_decode(File::get($jsonPath), true);

        if (! is_array($data) || empty($data['version']) || ! is_string($data['version'])) {
            return null;
        }

        return $data['version'];
    }

    private function runModuleMigrations(string $moduleName): void
    {
        if (! Module::has($moduleName)) {
            throw new PluginInstallException(
                "Module [{$moduleName}] was extracted but is not discoverable. Try running php artisan optimize:clear, then upload again.",
            );
        }

        try {
            Artisan::call('module:migrate', [
                'module' => $moduleName,
                '--force' => true,
            ]);
        } catch (ModuleNotFoundException $exception) {
            throw new PluginInstallException($exception->getMessage(), previous: $exception);
        }
    }

    private function registerModuleStatus(string $moduleName, bool $isUpdate): void
    {
        $path = base_path('modules_statuses.json');
        $statuses = [];

        if (File::exists($path)) {
            $statuses = json_decode(File::get($path), true) ?? [];
        }

        if (! $isUpdate || ! array_key_exists($moduleName, $statuses)) {
            $statuses[$moduleName] = false;
        }

        File::put($path, json_encode($statuses, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    private function removeModuleStatus(string $moduleName): void
    {
        $path = base_path('modules_statuses.json');

        if (! File::exists($path)) {
            return;
        }

        $statuses = json_decode(File::get($path), true) ?? [];
        unset($statuses[$moduleName]);
        File::put($path, json_encode($statuses, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}

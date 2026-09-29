<?php

namespace App\Console\Commands;

use App\Exceptions\PluginInstallException;
use App\Services\Plugins\PluginPackagePaths;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use ZipArchive;

class PackagePluginCommand extends Command
{
    protected $signature = 'plugin:package {module : The module name (e.g. AIAssistant)} {--output= : Output ZIP path}';

    protected $description = 'Package a module with public/build and bootstrap/ssr for plugin upload';

    public function __construct(
        private PluginPackagePaths $paths,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $moduleName = $this->argument('module');
        $modulePath = $this->paths->moduleDirectory($moduleName);
        $buildPath = base_path($this->paths->buildPathInApp());
        $ssrPath = base_path($this->paths->ssrPathInApp());
        $manifestPath = $buildPath.'/manifest.json';

        if (! File::isDirectory($modulePath)) {
            $this->error("Module [{$moduleName}] was not found at {$modulePath}.");

            return self::FAILURE;
        }

        if (! File::exists($manifestPath)) {
            $this->error('Vite manifest not found at public/build/manifest.json.');
            $this->line('Run a full production build first: npm run build:ssr');

            return self::FAILURE;
        }

        if (! File::isDirectory($ssrPath) || File::isEmptyDirectory($ssrPath)) {
            $this->error('SSR build output not found at bootstrap/ssr/.');
            $this->line('Run: npm run build:ssr');

            return self::FAILURE;
        }

        $outputPath = $this->option('output')
            ?? storage_path('app/plugins/packages/'.$moduleName.'.zip');

        File::ensureDirectoryExists(dirname($outputPath));

        if (File::exists($outputPath)) {
            File::delete($outputPath);
        }

        $stagingPath = storage_path('app/plugins/staging/'.Str::uuid());

        try {
            $this->ensureSetupFlagExists($modulePath, $moduleName);
            $this->copyDirectoryToStaging($modulePath, $stagingPath.'/'.$this->paths->modulePathInApp($moduleName));
            $this->copyDirectoryToStaging($buildPath, $stagingPath.'/'.$this->paths->buildPathInApp());
            $this->copyDirectoryToStaging($ssrPath, $stagingPath.'/'.$this->paths->ssrPathInApp());

            $zip = new ZipArchive;

            if ($zip->open($outputPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
                throw new PluginInstallException('Unable to create the plugin ZIP file.');
            }

            $this->addDirectoryToZip($zip, $stagingPath, '');
            $zip->close();

            $this->info("Plugin package created: {$outputPath}");
            $this->line('Included: Modules/'.$moduleName.', public/build/, bootstrap/ssr/');

            return self::SUCCESS;
        } catch (PluginInstallException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        } finally {
            File::deleteDirectory($stagingPath);
        }
    }

    private function ensureSetupFlagExists(string $modulePath, string $moduleName): void
    {
        $flagPath = $modulePath.'/'.Str::lower($moduleName);

        if (! File::exists($flagPath)) {
            File::put($flagPath, '');
            $this->line('Created setup flag: '.Str::lower($moduleName));
        }
    }

    private function copyDirectoryToStaging(string $source, string $destination): void
    {
        File::copyDirectory($source, $destination);

        if (! str_contains($destination, DIRECTORY_SEPARATOR.'Modules'.DIRECTORY_SEPARATOR)) {
            return;
        }

        foreach (config('plugins.extract_excludes', []) as $excluded) {
            $excludedPath = $destination.DIRECTORY_SEPARATOR.$excluded;

            if (File::isDirectory($excludedPath)) {
                File::deleteDirectory($excludedPath);
            } elseif (File::exists($excludedPath)) {
                File::delete($excludedPath);
            }
        }
    }

    private function addDirectoryToZip(ZipArchive $zip, string $directory, string $zipPrefix): void
    {
        $base = rtrim($directory, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;

        foreach (File::allFiles($directory) as $file) {
            $relativePath = str_replace($base, '', $file->getPathname());
            $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            $zipPath = $zipPrefix !== '' ? $zipPrefix.'/'.$relativePath : $relativePath;
            $zip->addFile($file->getPathname(), $zipPath);
        }
    }
}

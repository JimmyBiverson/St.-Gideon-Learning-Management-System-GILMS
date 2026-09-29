<?php

namespace App\Services\Plugins;

use App\Exceptions\PluginInstallException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use ZipArchive;

class PluginZipValidator
{
    public function __construct(
        private PluginPackagePaths $paths,
        private PluginOfficialRegistry $officialRegistry,
        private PluginStructureValidator $structureValidator,
    ) {}

    /**
     * @return array{module_name: string, module_root_in_zip: string}
     */
    public function validate(string $zipPath): array
    {
        $zip = new ZipArchive;

        if ($zip->open($zipPath) !== true) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }

        try {
            $this->assertNoDangerousPaths($zip);

            $moduleName = $this->resolveModuleName($zip);
            $moduleRoot = $this->paths->moduleRootInZip($moduleName);

            $this->assertRequiredPackageFiles($zip);
            $this->assertOnlyAllowedRoots($zip, $moduleName);

            if ($this->isCoreModule($moduleName)) {
                throw new PluginInstallException("The module [{$moduleName}] is a core module and cannot be installed as a plugin.");
            }

            $this->assertOfficialPlugin($moduleName);
            $this->assertModuleStructureInTemp($zip, $moduleName);

            return [
                'module_name' => $moduleName,
                'module_root_in_zip' => $moduleRoot,
            ];
        } finally {
            $zip->close();
        }
    }

    private function isCoreModule(string $moduleName): bool
    {
        return in_array($moduleName, config('plugins.core_modules', []), true);
    }

    private function assertNoDangerousPaths(ZipArchive $zip): void
    {
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);

            if ($name === false) {
                continue;
            }

            if (str_contains($name, '..') || str_starts_with($name, '/') || str_starts_with($name, '\\')) {
                throw new PluginInstallException('The uploaded plugin is not our official plugin.');
            }
        }
    }

    private function resolveModuleName(ZipArchive $zip): string
    {
        $moduleJsonPath = null;
        $folderName = null;

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);

            if ($name === false) {
                continue;
            }

            if (preg_match('#^Modules/([^/]+)/module\.json$#', $name, $matches) !== 1) {
                continue;
            }

            if ($moduleJsonPath !== null) {
                throw new PluginInstallException('The uploaded plugin is not our official plugin.');
            }

            $moduleJsonPath = $name;
            $folderName = $matches[1];
        }

        if ($moduleJsonPath === null || $folderName === null) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }

        $contents = $zip->getFromName($moduleJsonPath);

        if ($contents === false) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }

        $data = json_decode($contents, true);

        if (! is_array($data) || empty($data['name']) || ! is_string($data['name'])) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }

        if ($data['name'] !== $folderName) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }

        return $data['name'];
    }

    private function assertRequiredPackageFiles(ZipArchive $zip): void
    {
        foreach (config('plugins.package.required_files', ['public/build/manifest.json']) as $requiredFile) {
            if ($zip->getFromName($requiredFile) === false) {
                throw new PluginInstallException('The uploaded plugin has an invalid structure.');
            }
        }

        if (! $this->zipContainsFilesUnderPrefix($zip, $this->paths->ssrPathInApp().'/')) {
            throw new PluginInstallException('The uploaded plugin has an invalid structure.');
        }

        if (! $this->zipContainsFilesUnderPrefix($zip, $this->paths->buildPathInApp().'/')) {
            throw new PluginInstallException('The uploaded plugin has an invalid structure.');
        }
    }

    private function assertOnlyAllowedRoots(ZipArchive $zip, string $moduleName): void
    {
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);

            if ($name === false || $name === '' || str_ends_with($name, '/')) {
                continue;
            }

            if (! $this->paths->isExtractablePath($name, $moduleName)) {
                throw new PluginInstallException('The uploaded plugin is not our official plugin.');
            }
        }
    }

    private function zipContainsFilesUnderPrefix(ZipArchive $zip, string $prefix): bool
    {
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);

            if ($name !== false && str_starts_with($name, $prefix) && ! str_ends_with($name, '/')) {
                return true;
            }
        }

        return false;
    }

    /**
     * @throws PluginInstallException
     */
    private function assertOfficialPlugin(string $moduleName): void
    {
        if (! $this->officialRegistry->isOfficial($moduleName)) {
            throw new PluginInstallException('The uploaded plugin is not our official plugin.');
        }
    }

    /**
     * Extract the module subtree into a temp directory and validate its structure,
     * then always delete the temp directory.
     *
     * @throws PluginInstallException
     */
    private function assertModuleStructureInTemp(ZipArchive $zip, string $moduleName): void
    {
        $tempPath = storage_path('app/plugins/validation/'.Str::uuid());
        $moduleRoot = $this->paths->moduleRootInZip($moduleName);
        $moduleTempPath = $tempPath.DIRECTORY_SEPARATOR.$this->paths->modulePathInApp($moduleName);

        try {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $fileName = $zip->getNameIndex($i);

                if ($fileName === false || $fileName === '') {
                    continue;
                }

                if (! str_starts_with($fileName, $moduleRoot)) {
                    continue;
                }

                $relativePath = substr($fileName, strlen($moduleRoot));

                if ($relativePath === '') {
                    continue;
                }

                $destination = $moduleTempPath.DIRECTORY_SEPARATOR.str_replace('/', DIRECTORY_SEPARATOR, $relativePath);

                // ZIP directory entries end with '/'; create them as directories.
                if (str_ends_with($fileName, '/')) {
                    File::ensureDirectoryExists($destination);

                    continue;
                }

                File::ensureDirectoryExists(dirname($destination));
                File::put($destination, $zip->getFromIndex($i));
            }

            $this->structureValidator->validate($moduleTempPath, $moduleName);
        } finally {
            File::deleteDirectory($tempPath);
        }
    }

    public function shouldSkipExtractPath(string $path): bool
    {
        $segments = explode('/', $path);

        foreach (config('plugins.extract_excludes', []) as $excluded) {
            if (in_array($excluded, $segments, true)) {
                return true;
            }
        }

        if (basename($path) === '.env') {
            return true;
        }

        return false;
    }

    public function moduleDirectory(string $moduleName): string
    {
        return $this->paths->moduleDirectory($moduleName);
    }

    public function moduleExistsOnDisk(string $moduleName): bool
    {
        return File::isDirectory($this->moduleDirectory($moduleName));
    }

    public function isCoreModulePublic(string $moduleName): bool
    {
        return $this->isCoreModule($moduleName);
    }
}

<?php

namespace App\Services\Plugins;

use App\Exceptions\PluginInstallException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PluginStructureValidator
{
    /**
     * Required directories under Modules/{Name}/.
     *
     * @var array<int, string>
     */
    private array $requiredDirectories = [
        'app/Providers',
        'routes',
        'resources',
        'database',
    ];

    /**
     * Required files under Modules/{Name}/.
     *
     * @var array<int, string>
     */
    private array $requiredFiles = [
        'module.json',
        'composer.json',
    ];

    /**
     * Validate that the extracted module directory contains the required
     * structure for a Mentor LMS module.
     *
     * @param  string  $modulePath  Absolute path to the Modules/{Name}/ directory.
     * @param  string  $moduleName  The module name (e.g. "AIAssistant").
     *
     * @throws PluginInstallException
     */
    public function validate(string $modulePath, string $moduleName): void
    {
        if (! File::isDirectory($modulePath)) {
            throw new PluginInstallException('The uploaded plugin has an invalid structure.');
        }

        foreach ($this->requiredDirectories as $dir) {
            if (! File::isDirectory($modulePath.DIRECTORY_SEPARATOR.$dir)) {
                throw new PluginInstallException('The uploaded plugin has an invalid structure.');
            }
        }

        foreach ($this->requiredFiles as $file) {
            if (! File::exists($modulePath.DIRECTORY_SEPARATOR.$file)) {
                throw new PluginInstallException('The uploaded plugin has an invalid structure.');
            }
        }

        // Verify the setup marker created by `plugin:package` is present.
        // Its presence confirms the ZIP was produced by the official toolchain.
        $markerFile = Str::lower($moduleName);

        if (! File::exists($modulePath.DIRECTORY_SEPARATOR.$markerFile)) {
            throw new PluginInstallException('The uploaded plugin has an invalid structure.');
        }
    }
}

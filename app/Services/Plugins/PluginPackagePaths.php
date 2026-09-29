<?php

namespace App\Services\Plugins;

class PluginPackagePaths
{
    public function moduleDirectory(string $moduleName): string
    {
        return base_path($this->modulePathInApp($moduleName));
    }

    public function modulePathInApp(string $moduleName): string
    {
        return str_replace('{module}', $moduleName, config('plugins.package.module_path', 'Modules/{module}'));
    }

    public function moduleRootInZip(string $moduleName): string
    {
        return $this->modulePathInApp($moduleName).'/';
    }

    public function buildPathInApp(): string
    {
        return config('plugins.package.build_path', 'public/build');
    }

    public function ssrPathInApp(): string
    {
        return config('plugins.package.ssr_path', 'bootstrap/ssr');
    }

    /**
     * @return array<int, string>
     */
    public function extractablePrefixes(string $moduleName): array
    {
        return [
            $this->moduleRootInZip($moduleName),
            $this->buildPathInApp().'/',
            $this->ssrPathInApp().'/',
        ];
    }

    public function isExtractablePath(string $zipPath, string $moduleName): bool
    {
        $normalized = ltrim(str_replace('\\', '/', $zipPath), '/');

        foreach ($this->extractablePrefixes($moduleName) as $prefix) {
            if (str_starts_with($normalized, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return array<int, string>
     */
    public function sourcePathsForPackaging(string $moduleName): array
    {
        return [
            $this->moduleDirectory($moduleName),
            base_path($this->buildPathInApp()),
            base_path($this->ssrPathInApp()),
        ];
    }
}

<?php

namespace App\Services\Plugins;

use Illuminate\Support\Facades\File;

class PluginRegistry
{
    /**
     * @return array<string, array{installed_at: string, updated_at: string}>
     */
    public function all(): array
    {
        $path = config('plugins.registry_path');

        if (! File::exists($path)) {
            return [];
        }

        $data = json_decode(File::get($path), true);

        if (! is_array($data) || ! isset($data['plugins']) || ! is_array($data['plugins'])) {
            return [];
        }

        return $data['plugins'];
    }

    public function register(string $module, bool $isUpdate = false): void
    {
        $plugins = $this->all();
        $now = now()->toIso8601String();

        $plugins[$module] = [
            'installed_at' => $isUpdate && isset($plugins[$module]['installed_at'])
                ? $plugins[$module]['installed_at']
                : $now,
            'updated_at' => $now,
        ];

        $this->write($plugins);
    }

    public function forget(string $module): void
    {
        $plugins = $this->all();

        unset($plugins[$module]);

        $this->write($plugins);
    }

    public function isUploadedPlugin(string $module): bool
    {
        return array_key_exists($module, $this->all());
    }

    /**
     * @param  array<string, array{installed_at: string, updated_at: string}>  $plugins
     */
    private function write(array $plugins): void
    {
        $path = config('plugins.registry_path');
        $directory = dirname($path);

        if (! File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        File::put($path, json_encode(['plugins' => $plugins], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}

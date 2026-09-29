<?php

namespace App\Services\Plugins;

use Illuminate\Support\Facades\File;

class PluginOfficialRegistry
{
    /**
     * Path to the official plugins JSON registry shipped with the application.
     */
    private function registryPath(): string
    {
        return base_path('Modules/official-plugins.json');
    }

    /**
     * @return array<int, string>
     */
    public function officialPluginNames(): array
    {
        $path = $this->registryPath();

        if (! File::exists($path)) {
            return [];
        }

        $data = json_decode(File::get($path), true);

        if (! is_array($data) || ! isset($data['plugins']) || ! is_array($data['plugins'])) {
            return [];
        }

        return array_values(array_filter($data['plugins'], 'is_string'));
    }

    public function isOfficial(string $moduleName): bool
    {
        return in_array($moduleName, $this->officialPluginNames(), true);
    }
}

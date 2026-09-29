<?php

namespace App\Services\Plugins;

use Nwidart\Modules\FileRepository;

class PluginModuleDiscovery
{
    public function refresh(): void
    {
        $reflection = new \ReflectionClass(FileRepository::class);
        $property = $reflection->getProperty('modules');
        $property->setAccessible(true);
        $property->setValue(null, []);
    }
}

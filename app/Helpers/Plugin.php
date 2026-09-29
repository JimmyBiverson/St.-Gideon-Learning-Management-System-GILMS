<?php

use Nwidart\Modules\Facades\Module;

/**
 * @return bool|null null when the module is not installed; otherwise enabled state
 */
function plugin_enabled(string $name): ?bool
{
    if (! Module::has($name)) {
        return null;
    }

    return Module::isEnabled($name);
}

/**
 * @return bool true only when the module exists and is enabled
 */
function plugin_active(string $name): bool
{
    return plugin_enabled($name) === true;
}

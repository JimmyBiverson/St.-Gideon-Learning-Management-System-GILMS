<?php

namespace Modules\Maintenance\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class MaintenanceServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Maintenance';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'maintenance';

    /**
     * Command classes to register.
     *
     * @var string[]
     */
    protected array $commands = [];

    /**
     * Provider classes to register.
     *
     * @var string[]
     */
    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];

    /**
     * Define module schedules.
     *
     * @param  $schedule
     */
    // protected function configureSchedules(Schedule $schedule): void
    // {
    //     $schedule->command('inspire')->hourly();
    // }
}

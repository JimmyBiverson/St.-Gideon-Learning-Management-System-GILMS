<?php

namespace Modules\Installer\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Middleware\InstalledRoutes;
use Modules\Installer\Http\Middleware\InstallerRoutes;
use Nwidart\Modules\Support\ModuleServiceProvider;

class InstallerServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Installer';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'installer';

    /**
     * Command classes to register.
     *
     * @var string[]
     */
    // protected array $commands = [];

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
     * Bootstrap any module services.
     */
    public function boot(): void
    {
        parent::boot();

        Route::aliasMiddleware('installed', InstalledRoutes::class);
        Route::aliasMiddleware('installer', InstallerRoutes::class);
    }

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

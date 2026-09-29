<?php

namespace Modules\Store\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Route;
use Modules\Store\Http\Middleware\ProductPurchasedMiddleware;
use Nwidart\Modules\Support\ModuleServiceProvider;

class StoreServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Store';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'store';

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

        Route::aliasMiddleware('product.purchased', ProductPurchasedMiddleware::class);
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

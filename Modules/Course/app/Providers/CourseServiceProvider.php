<?php

namespace Modules\Course\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Route;
use Modules\Course\Console\Commands\PrivatizeVideoLessonFilesCommand;
use Modules\Course\Http\Middleware\CourseEnrollmentMiddleware;
use Modules\Course\Http\Middleware\LessonEnrollmentMiddleware;
use Nwidart\Modules\Support\ModuleServiceProvider;

class CourseServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Course';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'course';

    /**
     * Command classes to register.
     *
     * @var string[]
     */
    protected array $commands = [
        PrivatizeVideoLessonFilesCommand::class,
    ];

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

        Route::aliasMiddleware('course.enrollment', CourseEnrollmentMiddleware::class);
        Route::aliasMiddleware('lesson.enrollment', LessonEnrollmentMiddleware::class);
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

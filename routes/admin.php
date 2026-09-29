<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\JobCircularController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PluginController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::prefix('dashboard')->group(function () {
    // users
    Route::resource('users', UsersController::class)->only(['index', 'update']);

    // instructor
    Route::middleware('collaborative')->group(function () {
        Route::get('instructors/applications', [InstructorController::class, 'applications'])->name('instructors.applications');
        Route::put('instructors/status/{id}', [InstructorController::class, 'status'])->name('instructors.status')->middleware('smtpConfig');
        Route::resource('instructors', InstructorController::class)->except(['show', 'update']);
    });

    // notification
    Route::resource('newsletters', NewsletterController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::post('newsletters/send', [NewsletterController::class, 'newsletter_send'])->name('newsletters.send')->middleware('smtpConfig');

    // job circulars
    Route::resource('job-circulars', JobCircularController::class)->except(['show']);
    Route::put('job-circulars/{job_circular}/toggle-status', [JobCircularController::class, 'toggleStatus'])->name('job-circulars.toggle-status');

    // settings
    Route::controller(SettingController::class)->prefix('settings')->group(function () {
        Route::get('auth0', 'auth0')->name('auth0.index');
        Route::post('auth0/{id}', 'auth0_update')->name('auth0.update');

        Route::get('system', 'system')->name('system.index');
        Route::post('system/{id}', 'system_update')->name('system.update');
        Route::get('system/translations/{locale}', 'system_translations')->name('system.translations');
        Route::put('system/translations/{locale}', 'system_translations_update')->name('system.translations.update');

        Route::get('pages', 'pages')->name('pages.index');
        Route::post('home-page/{id}', 'home_pages_update')->name('home-page.update');
        Route::post('system-type', 'system_type_update')->name('system-type.update');

        Route::get('custom-page/{id}', 'custom_pages_edit')->name('custom-page.edit');
        Route::post('custom-page', 'custom_pages_store')->name('custom-page.store');
        Route::put('custom-page/{id}', 'custom_pages_update')->name('custom-page.update');
        Route::delete('custom-page/{id}', 'custom_pages_destroy')->name('custom-page.destroy');

        Route::get('storage', 'storage')->name('storage.index');
        Route::post('storage/{id}', 'storage_update')->name('storage.update');

        Route::get('smtp', 'smtp')->name('smtp.index');
        Route::post('smtp/{id}', 'smtp_update')->name('smtp.update');

        Route::get('maintenance', 'maintenance')->name('maintenance.index');

        Route::get('live-class', 'live_class')->name('live-class.index');
        Route::post('live-class/{id}', 'live_class_update')->name('live-class.update');

        Route::get('meta-pixel', 'meta_pixel')->name('meta-pixel.index');
        Route::post('meta-pixel/{id}', 'meta_pixel_update')->name('meta-pixel.update');

        Route::get('google-analytics', 'google_analytics')->name('google-analytics.index');
        Route::post('google-analytics/{id}', 'google_analytics_update')->name('google-analytics.update');

        // plugins
        Route::get('plugins', [PluginController::class, 'index'])->name('plugins.index');
        Route::post('plugins', [PluginController::class, 'store'])->name('plugins.store');
        Route::put('plugins/{module}/toggle', [PluginController::class, 'toggle'])->name('plugins.toggle');
        Route::post('plugins/{module}/seeder', [PluginController::class, 'seeder'])->name('plugins.seeder');

        // Navbar management routes
        Route::post('navbar/{navbar}/items', 'navbar_items_store')->name('navbar.items.store');
        Route::put('navbar-items/{item}', 'navbar_items_update')->name('navbar.items.update');
        Route::delete('navbar-items/{item}', 'navbar_items_destroy')->name('navbar.items.destroy');
        Route::post('navbar-items/reorder', 'navbar_items_reorder')->name('navbar.items.reorder');

        // Footer management routes
        Route::post('footer/{footer}/items', 'footer_items_store')->name('footer.items.store');
        Route::put('footer-items/{item}', 'footer_items_update')->name('footer.items.update');
        Route::delete('footer-items/{item}', 'footer_items_destroy')->name('footer.items.destroy');
        Route::post('footer-items/reorder', 'footer_items_reorder')->name('footer.items.reorder');

        // Navbar/footer translation routes
        Route::get('navbar/translations/{locale}', 'navbar_translations')->name('navbar.translations');
        Route::put('navbar/translations/{locale}', 'navbar_translations_update')->name('navbar.translations.update');
        Route::get('footer/translations/{locale}', 'footer_translations')->name('footer.translations');
        Route::put('footer/translations/{locale}', 'footer_translations_update')->name('footer.translations.update');
    });

    // customize home page sections
    Route::controller(HomeController::class)->prefix('page/section')->group(function () {
        Route::post('sort', 'sort_section')->name('page.section.sort');
        Route::post('update/{id}', 'update_section')->name('page.section.update');
    });
});

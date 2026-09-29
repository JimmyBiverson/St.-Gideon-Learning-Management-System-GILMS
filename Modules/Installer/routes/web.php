<?php

use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Controllers\InstallerController;
use Modules\Installer\Http\Controllers\InstallerDBController;
use Modules\Installer\Http\Middleware\InstallerRoutes;

// Until the install completes, sessions have to live somewhere that does not
// need the database they are about to create. This used to read
// `! exists('installed') || ! env('MENTOR_INSTALLED')`, which is true when
// *either* marker is missing and so forced file sessions on nearly every
// install. applicationInstalled() is the one place that decides this, and it
// treats the two markers as alternatives — the same rule the installer's
// middleware applies.
if (! applicationInstalled()) {
    config(['session.driver' => 'file']);
}

Route::middleware(InstallerRoutes::class)->group(function () {
    Route::get('install/step-1', [InstallerController::class, 'index'])->name('install.index');

    Route::get('install/step-2', [InstallerController::class, 'show_step2'])->name('install.show-step2');
    Route::post('install/step-2', [InstallerController::class, 'store_step2'])->name('install.store-step2');

    Route::get('install/step-3', [InstallerController::class, 'show_step3'])->name('install.show-step3');
    Route::post('install/step-3', [InstallerController::class, 'store_step3'])->name('install.store-step3');

    Route::get('install/step-4', [InstallerController::class, 'show_step4'])->name('install.show-step4');
    Route::post('install/step-4', [InstallerController::class, 'store_step4'])->name('install.store-step4');

    Route::get('install/processing', [InstallerController::class, 'show_processing'])->name('install.show-processing');
    Route::post('install/processing', [InstallerController::class, 'store_processing'])->name('install.store-processing');

    Route::get('install/finish', [InstallerController::class, 'finish'])->name('install.finish');

    Route::post('install/check-database', [InstallerDBController::class, 'databaseChecker'])->name('check-database');
    Route::get('install/generate-app-key', [InstallerController::class, 'generateAppKey'])->name('generate-app-key');
});

Route::get('install/refresh', [InstallerController::class, 'refresh'])->name('install.refresh');

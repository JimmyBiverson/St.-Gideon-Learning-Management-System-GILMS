<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Route;
use Modules\Maintenance\Http\Controllers\BackupController;
use Modules\Maintenance\Http\Controllers\SystemController;
use Modules\Maintenance\Http\Controllers\UpdatePackageController;
use Modules\Maintenance\Http\Controllers\UpdaterController;
use Modules\Maintenance\Http\Middleware\AuthMiddleware;
use Modules\Maintenance\Http\Middleware\MaintenanceMiddleware;

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('system/login', [SystemController::class, 'login'])->name('system.login');
    Route::post('system/login', [SystemController::class, 'verify'])->name('system.verify');
});

Route::withoutMiddleware([HandleInertiaRequests::class])->middleware([MaintenanceMiddleware::class])->group(function () {
    Route::get('system/maintenance', [UpdaterController::class, 'index'])->name('system.maintenance.index');
    Route::post('system/maintenance', [UpdaterController::class, 'store'])->name('system.maintenance.store');

    Route::post('system/update', [UpdaterController::class, 'updateApp'])->name('system.update-start');
    Route::get('system/update', [UpdaterController::class, 'updateAppSeeder'])->name('system.update-seeder');
    Route::get('system/update-status', [UpdaterController::class, 'updateStatus'])->name('system.update-status');
    Route::post('system/update-step', [UpdaterController::class, 'updateStep'])->name('system.update-step');
    Route::post('system/update-rollback', [UpdaterController::class, 'rollbackUpdate'])->name('system.update-rollback');
    Route::post('system/update-abort', [UpdaterController::class, 'abortUpdate'])->name('system.update-abort');

    Route::post('system/update/packages', [UpdatePackageController::class, 'store'])->name('system.update-package-store');
    Route::post('system/update/packages/{id}/verify', [UpdatePackageController::class, 'verify'])->name('system.update-package-verify');
    Route::delete('system/update/packages/{id}', [UpdatePackageController::class, 'destroy'])->name('system.update-package-delete');

    Route::post('system/backup', [BackupController::class, 'store'])->name('system.backup-store');
    Route::delete('system/backup/{id}', [BackupController::class, 'destroy'])->name('system.backup-delete');
    Route::post('system/backup/{id}/restore', [BackupController::class, 'restore'])->name('system.backup-restore');
    Route::get('system/backup/{id}/download', [BackupController::class, 'download'])->name('system.backup-download');

    Route::post('system/storage', [SystemController::class, 'storage'])->name('system.storage');
    Route::post('system/refresh', [SystemController::class, 'refresh'])->name('system.refresh');
    Route::post('system/clear', [SystemController::class, 'clear'])->name('system.clear');
    Route::post('system/reboot', [SystemController::class, 'reboot'])->name('system.reboot');
    Route::post('system/sitemap', [SystemController::class, 'sitemap'])->name('system.sitemap');
});

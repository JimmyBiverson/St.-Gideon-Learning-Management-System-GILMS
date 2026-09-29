<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {
    // dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // settings
    Route::prefix('settings/account')->group(function () {
        Route::get('/', [SettingController::class, 'account'])->name('instructor.index');
        Route::post('profile', [SettingController::class, 'profile_update'])->name('instructor.update');
    });
});

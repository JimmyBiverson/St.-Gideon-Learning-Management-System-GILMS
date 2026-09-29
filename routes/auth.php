<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware(['smtpConfig'])->group(function () {
    Route::resource('forgot-password', PasswordResetLinkController::class)->only(['index', 'store']);

    Route::resource('reset-password', NewPasswordController::class)->only(['index', 'store']);
});

Route::middleware(['guest', 'authConfig'])->group(function () {
    Route::resource('login', AuthenticatedSessionController::class)->only(['index', 'store']);
    Route::resource('register', RegisteredUserController::class)->only(['index', 'store'])->middleware('smtpConfig');

    Route::get('auth/google', [GoogleAuthController::class, 'show'])->name('google-auth.show');
    Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('google-auth.callback');
});

Route::middleware('auth')->group(function () {
    Route::prefix('verify-email')->name('verify-email.')->group(function () {
        Route::get('/', EmailVerificationPromptController::class)->name('index');
        Route::get('/{id}/{hash}', VerifyEmailController::class)->name('verify')->middleware(['signed', 'throttle:6,1']);
    });

    Route::middleware('smtpConfig')->controller(EmailVerificationNotificationController::class)->group(function () {
        Route::post('change-email', 'update')->name('change-email.update');
        Route::get('change-email/save', 'save')->name('change-email.save');
        Route::post('email/verification-notification', 'store')->middleware('throttle:6,1')->name('verification.send');
    });

    Route::put('change-password', [PasswordResetLinkController::class, 'update'])->name('change-password.update');
    Route::resource('confirm-password', ConfirmablePasswordController::class)->only(['create', 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

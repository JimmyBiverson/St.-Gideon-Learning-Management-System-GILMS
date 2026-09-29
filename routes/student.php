<?php

use App\Http\Controllers\ChunkedUploadController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('student/{tab}', [StudentController::class, 'index'])->name('student.index')->middleware('smtpConfig');
Route::get('student/courses/{id}/{tab}', [StudentController::class, 'show_course'])->name('student.course.show');
Route::get('student/exams/{id}/{tab}', [StudentController::class, 'show_exam'])->name('student.exam.show');
Route::post('student/profile', [StudentController::class, 'update_profile'])->name('student.profile.update');

Route::controller(InstructorController::class)->middleware(['smtpConfig', 'collaborative'])->group(function () {
    Route::post('become-instructor', 'store')->name('become-instructor.store');
    Route::post('become-instructor/{id}', 'update')->name('become-instructor.update');
});

Route::resource('notifications', NotificationController::class)->only(['index', 'show']);
Route::put('notifications/read/all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');

// users
Route::delete('users/{id}', [UsersController::class, 'destroy'])->name('users.destroy');

// Chunked uploads for large files
Route::prefix('dashboard/uploads/chunked')->controller(ChunkedUploadController::class)->group(function () {
    Route::post('initialize', 'initialize')->name('chunked.upload.initialize');
    Route::post('{id}/chunk', 'uploadChunk')->name('chunked.upload.chunk');
    Route::post('{id}/complete', 'complete')->name('chunked.upload.complete');
    Route::get('{id}/status', 'status')->name('chunked.upload.status');
    Route::delete('{id}/abort', 'abort')->name('chunked.upload.abort');
});

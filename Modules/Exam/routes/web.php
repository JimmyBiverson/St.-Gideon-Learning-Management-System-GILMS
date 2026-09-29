<?php

use Illuminate\Support\Facades\Route;
use Modules\Exam\Http\Controllers\ExamAttemptController;
use Modules\Exam\Http\Controllers\ExamCategoryController;
use Modules\Exam\Http\Controllers\ExamController;
use Modules\Exam\Http\Controllers\ExamCouponController;
use Modules\Exam\Http\Controllers\ExamEnrollmentController;
use Modules\Exam\Http\Controllers\ExamFaqController;
use Modules\Exam\Http\Controllers\ExamOutcomeController;
use Modules\Exam\Http\Controllers\ExamQuestionController;
use Modules\Exam\Http\Controllers\ExamRequirementController;
use Modules\Exam\Http\Controllers\ExamResourceController;
use Modules\Exam\Http\Controllers\ExamReviewController;
use Modules\Exam\Http\Controllers\ExamWishlistController;
use Modules\Exam\Http\Middleware\CheckExamEnrollMiddleware;

/*
|--------------------------------------------------------------------------
| Public/Guest Routes (similar to course routes)
|--------------------------------------------------------------------------
*/

// Exam browsing
Route::get('exams/{category?}', [ExamController::class, 'category_exams'])->name('category.exams');
Route::get('exams/details/{slug}/{id}', [ExamController::class, 'show'])->name('exams.details');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])->prefix('dashboard')->group(function () {
    // Exam Categories (Admin only)
    Route::resource('exams/categories', ExamCategoryController::class)->only(['index', 'store', 'destroy'])->names('exam-categories');
    Route::post('exams/categories/{category}', [ExamCategoryController::class, 'update'])->name('exam-categories.update');
    Route::post('exams/categories/order/sort', [ExamCategoryController::class, 'sort'])->name('exam-categories.sort');

    // Exams (Admin only)
    Route::delete('exams/{exam}', [ExamController::class, 'destroy'])->name('exams.destroy');

    // Coupons
    Route::resource('exams/exam/coupons', ExamCouponController::class)->only(['index', 'store', 'update', 'destroy'])->names('exam-coupons');
    Route::post('exams/exam/coupons/verify', [ExamCouponController::class, 'verify'])->name('exam-coupons.verify');

    // course enrolment
    Route::delete('exams/exam/enrollments/{id}', [ExamEnrollmentController::class, 'destroy'])->name('exam-enrollments.destroy');
});

/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:instructor,admin'])->prefix('dashboard')->group(function () {
    // Exams (Admin can manage all)
    Route::resource('exams', ExamController::class)->except(['show', 'update', 'destroy']);
    Route::post('exams/{exam}', [ExamController::class, 'update'])->name('exams.update');

    // Exam Info (FAQs, Requirements, Outcomes)
    Route::resource('exam-faqs', ExamFaqController::class)->only(['store', 'update', 'destroy']);
    Route::resource('exam-requirements', ExamRequirementController::class)->only(['store', 'update', 'destroy']);
    Route::resource('exam-outcomes', ExamOutcomeController::class)->only(['store', 'update', 'destroy']);

    // Exam Questions
    Route::resource('exam-questions', ExamQuestionController::class)->only(['store', 'update', 'destroy']);
    Route::post('exam-questions/reorder', [ExamQuestionController::class, 'reorder'])->name('exam-questions.reorder');
    Route::post('exam-questions/{question}/duplicate', [ExamQuestionController::class, 'duplicate'])->name('exam-questions.duplicate');

    // lesson resource route
    Route::resource('exam-resources', ExamResourceController::class)->only(['store', 'update', 'destroy']);

    // Exam Attempt Review
    Route::get('exams/{exam_id}/attempts', [ExamAttemptController::class, 'index'])->name('exam-attempts.index');
    Route::get('exams/{exam_id}/attempts/{id}', [ExamAttemptController::class, 'review'])->name('exam-attempts.review');
    Route::post('exams/attempts/{attempt}/grade', [ExamAttemptController::class, 'grade'])->name('exam-attempts.grade');

    // course enrolment
    Route::get('exams/exam/enrollments', [ExamEnrollmentController::class, 'index'])->name('exam-enrollments.index');
});

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:student,instructor,admin'])->prefix('student')->group(function () {
    // Exam Attempts
    Route::post('exams/{exam}/attempts/start', [ExamAttemptController::class, 'start'])->name('exam-attempts.start')->middleware(CheckExamEnrollMiddleware::class);
    Route::get('exam-attempts/{attempt}/take', [ExamAttemptController::class, 'take'])->name('exam-attempts.take');
    Route::post('exam-attempts/{attempt}/submit', [ExamAttemptController::class, 'submit'])->name('exam-attempts.submit');
    Route::post('exam-attempts/{attempt}/abandon', [ExamAttemptController::class, 'abandon'])->name('exam-attempts.abandon');

    // Reviews
    Route::get('exams/{exam}/reviews', [ExamReviewController::class, 'index'])->name('exam-reviews.index');
    Route::post('exam-reviews', [ExamReviewController::class, 'store'])->name('exam-reviews.store');
    Route::put('exam-reviews/{review}', [ExamReviewController::class, 'update'])->name('exam-reviews.update');
    Route::delete('exam-reviews/{review}', [ExamReviewController::class, 'destroy'])->name('exam-reviews.destroy');

    // Wishlist
    Route::resource('exam-wishlists', ExamWishlistController::class)->only(['store', 'destroy']);

    // free enrolment
    Route::post('exams/exam/enrollments', [ExamEnrollmentController::class, 'store'])->name('exam-enrollments.store');
});

<?php

use Illuminate\Support\Facades\Route;
use Modules\Course\Http\Controllers\AssignmentSubmissionController;
use Modules\Course\Http\Controllers\BunnyVideoUploadController;
use Modules\Course\Http\Controllers\CategoryChildController;
use Modules\Course\Http\Controllers\CourseAssignmentController;
use Modules\Course\Http\Controllers\CourseCategoryController;
use Modules\Course\Http\Controllers\CourseController;
use Modules\Course\Http\Controllers\CourseCouponController;
use Modules\Course\Http\Controllers\CourseEnrollmentController;
use Modules\Course\Http\Controllers\CourseFaqController;
use Modules\Course\Http\Controllers\CourseForumController;
use Modules\Course\Http\Controllers\CourseForumReplyController;
use Modules\Course\Http\Controllers\CourseOutcomeController;
use Modules\Course\Http\Controllers\CourseRequirementController;
use Modules\Course\Http\Controllers\CourseReviewController;
use Modules\Course\Http\Controllers\CourseWishlistController;
use Modules\Course\Http\Controllers\CurriculumController;
use Modules\Course\Http\Controllers\LessonResourceController;
use Modules\Course\Http\Controllers\LessonVideoStreamController;
use Modules\Course\Http\Controllers\LessonVideoUrlController;
use Modules\Course\Http\Controllers\LiveClassController;
use Modules\Course\Http\Controllers\PlayerController;
use Modules\Course\Http\Controllers\QuestionController;
use Modules\Course\Http\Controllers\QuizController;
use Modules\Course\Http\Controllers\QuizSubmissionController;

/*
|--------------------------------------------------------------------------
| Public/Guest Routes
|--------------------------------------------------------------------------
*/

Route::controller(CourseController::class)->group(function () {
    Route::get('courses/{category}/{category_child?}', 'category_courses')->name('category.courses');
    Route::get('courses/details/{slug}/{id}', 'show')->name('course.details');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])->prefix('dashboard')->group(function () {
    // Course Categories
    Route::prefix('courses')->name('course-')->group(function () {
        Route::resource('categories', CourseCategoryController::class)->only(['index', 'store', 'destroy']);
        Route::post('categories/update/{category}', [CourseCategoryController::class, 'update'])->name('categories.update');
        Route::post('categories/sort', [CourseCategoryController::class, 'sort'])->name('categories.sort');

        Route::resource('category-child', CategoryChildController::class)->only(['store', 'update', 'destroy']);
        Route::post('category-child/sort', [CategoryChildController::class, 'sort'])->name('category-child.sort');
    });

    // Courses
    Route::delete('courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');

    // Course Coupons
    Route::resource('courses/course/coupons', CourseCouponController::class)->only(['index', 'store', 'update', 'destroy'])->names('course-coupons');

    // Course Enrollments
    Route::delete('courses/course/enrollments/{id}', [CourseEnrollmentController::class, 'destroy'])->name('course-enrollments.destroy');
});

/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:instructor,admin'])->prefix('dashboard')->group(function () {
    // Courses
    Route::resource('courses', CourseController::class)->except(['update', 'destroy']);
    Route::post('courses/{id}', [CourseController::class, 'update'])->name('courses.update');
    Route::put('course/status/{id}', [CourseController::class, 'status'])->name('course.status')->middleware('smtpConfig');

    // Course Info
    Route::resource('course-faqs', CourseFaqController::class)->only(['store', 'update', 'destroy']);
    Route::resource('course-outcomes', CourseOutcomeController::class)->only(['store', 'update', 'destroy']);
    Route::resource('course-requirements', CourseRequirementController::class)->only(['store', 'update', 'destroy']);

    // Curriculum
    Route::controller(CurriculumController::class)->group(function () {
        Route::post('section', 'section_store')->name('section.store');
        Route::put('section/{id}', 'section_update')->name('section.update');
        Route::delete('section/{id}', 'section_delete')->name('section.delete');
        Route::post('section/sort', 'section_sort')->name('section.sort');

        Route::post('lesson', 'lesson_store')->name('lesson.store');
        Route::put('lesson/{id}', 'lesson_update')->name('lesson.update');
        Route::delete('lesson/{id}', 'lesson_delete')->name('lesson.delete');
        Route::post('lesson/sort', 'lesson_sort')->name('lesson.sort');
    });

    // Bunny Stream lesson video uploads — the browser talks to Bunny
    // directly via TUS; these just mint/finalize/cancel the upload record.
    Route::controller(BunnyVideoUploadController::class)->prefix('uploads/bunny')->name('bunny.upload.')->group(function () {
        Route::post('initiate', 'initiate')->name('initiate');
        Route::post('{upload}/complete', 'complete')->name('complete');
        Route::delete('{upload}/abort', 'abort')->name('abort');
    });

    // Assignments
    Route::resource('section/assignments', CourseAssignmentController::class)->only(['store', 'update', 'destroy']);
    Route::get('courses/{course_id}/assignments', [CourseAssignmentController::class, 'index'])->name('course-assignments.index');
    Route::get('courses/{course_id}/assignments/{assignment_id}/submissions', [CourseAssignmentController::class, 'submissions'])->name('course-assignments.submissions');

    // Lesson Resources
    Route::resource('lesson-resources', LessonResourceController::class)->only(['store', 'update', 'destroy']);

    // Quizzes
    Route::resource('section/quiz', QuizController::class)->only(['store', 'update', 'destroy']);
    Route::controller(QuizController::class)->prefix('section/quiz')->name('quizzes.')->group(function () {
        Route::get('participant/result', 'result')->name('participant.result');
        Route::get('result/preview', 'result_preview')->name('result.preview');
    });

    // Questions
    Route::resource('quiz-questions', QuestionController::class)->only(['store', 'update', 'destroy']);
    Route::post('quiz-questions/sort', [QuestionController::class, 'sort'])->name('quiz-questions.sort');

    // live classes
    Route::resource('live-classes', LiveClassController::class)->only(['store', 'update', 'destroy']);

    // Course Enrollments
    Route::get('courses/course/enrollments', [CourseEnrollmentController::class, 'index'])->name('course-enrollments.index');
});

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:student,instructor,admin'])->group(function () {
    Route::post('courses/course/enrollments', [CourseEnrollmentController::class, 'store'])->name('course-enrollments.store');

    // Course Coupon Verify
    Route::post('dashboard/courses/coupons/verify', [CourseCouponController::class, 'verify'])->name('course-coupons.verify');

    // Wishlist
    Route::resource('course-wishlists', CourseWishlistController::class)->only(['store', 'destroy']);

    // Quiz Submissions
    Route::resource('quiz-submissions', QuizSubmissionController::class)->only(['store']);

    // Assignment Submissions
    Route::controller(AssignmentSubmissionController::class)->prefix('assignment/submission')->name('assignment-submissions.')->group(function () {
        Route::post('/', 'store')->name('store');
        Route::get('{id}', 'show')->name('show');
        Route::put('{id}', 'update')->name('update');
        Route::get('{assignmentId}/student', 'getStudentSubmissions')->name('student');
    });

    // Course Player
    Route::controller(PlayerController::class)->middleware(['course.enrollment'])->group(function () {
        Route::post('player/init/watch-history', 'intWatchHistory')->name('course.play.init');
        Route::get('play-course/{type}/{watch_history}/{lesson_id}', 'course_player')->name('course.play.start');
        Route::get('play-course/finish/{watch_history}', 'finish_course')->name('course.play.finish');

        // Live class routes
        Route::get('live-classes/start/{id}', [LiveClassController::class, 'index'])->name('live-class.start');
        Route::get('live-classes/signature/{id}', [LiveClassController::class, 'signature'])->name('live-class.signature');
    });

    // Private lesson video streaming (signed, short-lived, enrollment-gated)
    Route::get('lessons/{lesson}/stream', LessonVideoStreamController::class)
        ->name('lesson.video.stream')
        ->middleware(['signed', 'lesson.enrollment']);

    // Mints a fresh signed/presigned stream URL before the current one
    // expires — gated by session auth + enrollment, not a signature, since
    // its whole purpose is to be callable without already holding one.
    Route::get('lessons/{lesson}/stream-url', LessonVideoUrlController::class)
        ->name('lesson.video.stream-url')
        ->middleware(['lesson.enrollment']);

    // Forums and Reviews
    Route::resource('course-forums', CourseForumController::class)->only(['store', 'update', 'destroy']);
    Route::resource('course-forum-replies', CourseForumReplyController::class)->only(['store', 'update', 'destroy']);
    Route::resource('course-reviews', CourseReviewController::class)->only(['store', 'update', 'destroy']);
});

<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\JobCircularController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\SubscribeController;
use Illuminate\Support\Facades\Route;
use Modules\Store\Http\Controllers\ProductController;

// Web Routes - Apply global web middleware
Route::middleware(['web'])->group(function () {
    // Public routes (web.php)
    Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('customize');
    Route::get('sitemap.xml', SitemapController::class)->name('sitemap');
    Route::get('demo/{slug}', [HomeController::class, 'demo'])->name('home.demo')->middleware('customize');
    Route::get('job-circulars/{job_circular:uuid}', [JobCircularController::class, 'show'])->name('job-circulars.show');

    Route::get('instructors/{instructor}', [InstructorController::class, 'show'])->name('instructors.show');
    Route::post('subscribes', [SubscribeController::class, 'store'])->name('subscribes.store');

    // Store shop (bare `/products` or `/products/{category}`) has to live
    // here, ahead of the `/{slug}` catch-all below — module routes are
    // registered after this file loads, so a single-segment module route
    // would otherwise be shadowed by the catch-all.
    Route::get('products/{category?}', [ProductController::class, 'shop'])->name('products.shop');

    // Auth routes
    if (file_exists(base_path('routes/auth.php'))) {
        require base_path('routes/auth.php');
    }

    // Admin routes (authenticated, admin role only)
    Route::middleware(['auth', 'role:admin'])->group(function () {
        if (file_exists(base_path('routes/admin.php'))) {
            require base_path('routes/admin.php');
        }

        if (file_exists(base_path('routes/plugin.php'))) {
            require base_path('routes/plugin.php');
        }
    });

    // Instructor routes (authenticated, verified, admin or instructor)
    Route::middleware(['auth', 'verified', 'role:admin,instructor'])->group(function () {
        if (file_exists(base_path('routes/instructor.php'))) {
            require base_path('routes/instructor.php');
        }
    });

    // Student routes (authenticated, student, instructor, or admin)
    Route::middleware(['auth', 'role:student,instructor,admin'])->group(function () {
        if (file_exists(base_path('routes/student.php'))) {
            require base_path('routes/student.php');
        }
    });

    // Catch-all route for inner pages
    Route::get('/{slug}', [HomeController::class, 'inner_page'])->name('inner.page');
});

// RcMUNJqEwWrcF29j

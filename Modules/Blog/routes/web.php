<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\BlogCategoryController;
use Modules\Blog\Http\Controllers\BlogCommentController;
use Modules\Blog\Http\Controllers\BlogController;
use Modules\Blog\Http\Controllers\BlogLikeDislikeController;

// Student Routes
Route::get('blogs/{category}', [BlogController::class, 'guest_blogs'])->name('blogs.visit');
Route::get('read/blogs/{uuid}', [BlogController::class, 'show'])->name('blogs.read');

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('dashboard/blogs')->name('blogs.')->group(function () {
    Route::resource('categories', BlogCategoryController::class)->except(['create', 'edit', 'show']);
    Route::post('categories/sort', [BlogCategoryController::class, 'sort'])->name('categories.sort');
});

// Instructor Routes
Route::middleware(['auth', 'verified', 'role:admin,instructor'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::resource('blogs', BlogController::class)->except(['show', 'update']);
        Route::post('blogs/{id}', [BlogController::class, 'update'])->name('blogs.update');
    });
    Route::get('preview/blogs/{uuid}', [BlogController::class, 'preview'])->name('blogs.preview');
});

// Like/Dislike and Comment Routes (require authentication)
Route::middleware(['auth'])->group(function () {
    Route::post('blogs/like-dislike/toggle', [BlogLikeDislikeController::class, 'toggle'])->name('blogs.like-dislike');

    Route::post('blogs/comments', [BlogCommentController::class, 'store'])->name('blogs.comments.store');
    Route::put('blogs/comments/{id}', [BlogCommentController::class, 'update'])->name('blogs.comments.update');
    Route::delete('blogs/comments/{id}', [BlogCommentController::class, 'destroy'])->name('blogs.comments.destroy');
});

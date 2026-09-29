<?php

use Illuminate\Support\Facades\Route;
use Modules\Frontend\Http\Controllers\Api\FrontendCollectionController;
use Modules\Frontend\Http\Controllers\PageController;
use Modules\Frontend\Http\Controllers\PageTranslationController;
use Modules\Frontend\Http\Controllers\ProjectController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    // Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    // Route::resource('projects', ProjectController::class)->only(['store', 'destroy']);
    Route::post('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');

    Route::get('dashboard/frontend/api', [FrontendCollectionController::class, 'index'])->name('frontend.api');
    Route::put('dashboard/frontend/api', [FrontendCollectionController::class, 'update'])->name('frontend.api.update');
    Route::resource('dashboard/frontend/pages', PageController::class)->only(['index', 'store', 'destroy'])->names('frontend-pages');
    Route::post('dashboard/frontend/pages/{page}', [PageController::class, 'update'])->name('frontend-pages.update');

    Route::get('editor/{project}/{page}', [PageController::class, 'editor'])->name('frontend-pages.editor');
    Route::put('editor/{project}/{page}', [PageController::class, 'content'])->name('frontend-pages.content');

    Route::get('editor/{project}/{page}/translations/{locale}', [PageTranslationController::class, 'index'])->name('frontend-pages.translations');
    Route::put('editor/{project}/{page}/translations/{locale}', [PageTranslationController::class, 'update'])->name('frontend-pages.translations.update');
    Route::get('editor/{project}/{page}/translate/{locale}', [PageController::class, 'translate'])->name('frontend-pages.translate');

    Route::post('projects/image/store', [ProjectController::class, 'storeImage'])->name('project.store-image');
    Route::delete('projects/image/{project}/{image}', [ProjectController::class, 'destroyImage'])->name('project.delete-image');
    Route::post('projects/settings/{project}', [ProjectController::class, 'settings'])->name('projects.settings');

    Route::get('frontend/seeder', [FrontendCollectionController::class, 'seeder'])->name('frontend.seeder')->middleware('role:admin');
});

// Page Data Storage Routes
Route::get('frontend/pages/{page}', [PageController::class, 'show'])->name('frontend-pages.show');
Route::post('api/store-page/{slug}', [FrontendCollectionController::class, 'storePage'])->name('api.store-page');

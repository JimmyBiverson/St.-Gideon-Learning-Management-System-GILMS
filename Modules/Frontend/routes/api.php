<?php

use Illuminate\Support\Facades\Route;
use Modules\Frontend\Http\Controllers\Api\FrontendCollectionController;

// Collection Routes
Route::prefix('collections')->group(function () {
    // Public routes - Get collection data
    Route::get('/', [FrontendCollectionController::class, 'index']);
    Route::get('/{type}/{category}', [FrontendCollectionController::class, 'show']);

    // Admin only routes - Update collection data
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::match(['put', 'patch'], '/{type}/{category}', [FrontendCollectionController::class, 'update']);
        Route::post('/{type}/{category}/toggle', [FrontendCollectionController::class, 'toggle']);
    });
});

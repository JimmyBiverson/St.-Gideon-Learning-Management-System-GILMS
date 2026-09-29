<?php

use Illuminate\Support\Facades\Route;
use Modules\Store\Http\Controllers\ProductCategoryChildController;
use Modules\Store\Http\Controllers\ProductCategoryController;
use Modules\Store\Http\Controllers\ProductController;
use Modules\Store\Http\Controllers\ProductCouponController;
use Modules\Store\Http\Controllers\ProductFaqController;
use Modules\Store\Http\Controllers\ProductFileController;
use Modules\Store\Http\Controllers\ProductOrderController;
use Modules\Store\Http\Controllers\ProductReviewController;
use Modules\Store\Http\Controllers\ProductSpecificationController;
use Modules\Store\Http\Controllers\ProductWishlistController;

/*
|--------------------------------------------------------------------------
| Public/Guest Routes
|--------------------------------------------------------------------------
*/
Route::controller(ProductController::class)->group(function () {
    // `products.shop` (bare `/products` or `/products/{category}`) is
    // registered in the root routes/web.php, ahead of the `/{slug}`
    // catch-all — module routes load after it, so a single-segment route
    // here would be shadowed. Only the 3-segment detail route is safe here.
    Route::get('products/details/{slug}/{id}', 'show')->name('products.details');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])->prefix('dashboard/store')->group(function () {
    // Product Categories
    Route::name('product-')->group(function () {
        Route::resource('categories', ProductCategoryController::class)->only(['index', 'store', 'destroy']);
        Route::post('categories/update/{category}', [ProductCategoryController::class, 'update'])->name('categories.update');
        Route::post('categories/sort', [ProductCategoryController::class, 'sort'])->name('categories.sort');

        Route::resource('category-child', ProductCategoryChildController::class)->only(['store', 'update', 'destroy']);
        Route::post('category-child/sort', [ProductCategoryChildController::class, 'sort'])->name('category-child.sort');
    });

    // Products
    Route::delete('products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Product Coupons
    Route::resource('products/product/coupons', ProductCouponController::class)->only(['index', 'store', 'update', 'destroy'])->names('product-coupons');
});

/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:instructor,admin'])->prefix('dashboard/store')->group(function () {
    // Products
    Route::resource('products', ProductController::class)->except(['show', 'update', 'destroy']);

    // Product gallery images & downloadable files (spatie media collections)
    // Must be registered ahead of the `products/{id}` update route below —
    // otherwise POSTs to these static paths are swallowed by the `{id}`
    // wildcard (matching id="images"/"files") and never reach these handlers.
    Route::post('products/images', [ProductController::class, 'storeImage'])->name('products.images.store');
    Route::delete('products/{product}/images/{media}', [ProductController::class, 'destroyImage'])->name('products.images.destroy');
    Route::post('products/files', [ProductController::class, 'storeFile'])->name('products.files.store');
    Route::delete('products/{product}/files/{media}', [ProductController::class, 'destroyFile'])->name('products.files.destroy');

    Route::post('products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::put('product/status/{id}', [ProductController::class, 'status'])->name('product.status')->middleware('smtpConfig');

    // Product Info
    Route::resource('product-faqs', ProductFaqController::class)->only(['store', 'update', 'destroy']);
    Route::resource('product-specifications', ProductSpecificationController::class)->only(['store', 'update', 'destroy']);

    // Product Sales
    Route::get('products/product/sales', [ProductOrderController::class, 'sales'])->name('product-orders.sales');
});

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:student,instructor,admin'])->group(function () {
    // Free product claim (bypasses payment for pricing_type = free)
    Route::post('products/product/orders', [ProductOrderController::class, 'store'])->name('product-orders.store');

    // Wishlist
    Route::resource('product-wishlists', ProductWishlistController::class)->only(['store', 'destroy']);

    // Reviews
    Route::resource('product-reviews', ProductReviewController::class)->only(['store', 'update', 'destroy']);

    // Coupon Verify
    Route::post('products/coupons/verify', [ProductCouponController::class, 'verify'])->name('product-coupons.verify');

    // My Purchases + Invoice
    Route::get('products/product/purchases', [ProductOrderController::class, 'purchases'])->name('product-orders.purchases');

    // Downloadable file (purchase-gated)
    Route::get('products/{product}/files/{media}/download', [ProductFileController::class, 'download'])
        ->name('products.files.download')
        ->middleware('product.purchased');
});

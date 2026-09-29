<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Store\Http\Requests\StoreProductWishlistRequest;
use Modules\Store\Services\ProductWishlistService;

class ProductWishlistController extends Controller
{
    public function __construct(private ProductWishlistService $productWishlistService) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductWishlistRequest $request)
    {
        $this->productWishlistService->createWishlist($request->validated());

        return back()->with('success', 'Product added to wishlist');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->productWishlistService->deleteWishlist($id);

        return back()->with('success', 'Product removed from wishlist');
    }
}

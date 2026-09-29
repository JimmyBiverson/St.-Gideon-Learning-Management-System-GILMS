<?php

namespace Modules\Store\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Modules\Store\Models\ProductWishlist;

class ProductWishlistService
{
    public function createWishlist(array $data): ProductWishlist
    {
        return ProductWishlist::create($data);
    }

    public function getWishlists(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('products_page', $data) ? intval($data['products_page']) : 1;
        $perPage = array_key_exists('products_per_page', $data) ? intval($data['products_per_page']) : 10;

        $query = ProductWishlist::when(array_key_exists('user_id', $data), function ($query) use ($data) {
            return $query->ofUser($data['user_id'] ? $data['user_id'] : 0);
        }, function ($query) {
            $user = Auth::user();

            return $query->ofUser($user ? $user->id : 0);
        })
            ->select('id', 'product_id', 'user_id')
            ->with([
                'product' => function ($query) {
                    $query->select('id', 'slug', 'thumbnail', 'title', 'pricing_type', 'discount', 'discount_price', 'price')
                        ->withCount('reviews')
                        ->withCount('orders')
                        ->withAvg('reviews as average_rating', 'rating');
                },
            ]);

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $query->paginate($perPage, ['*'], 'products_page', $pageNumber);
        }

        return $query->get();
    }

    public function deleteWishlist(string $id): void
    {
        ProductWishlist::findOrFail($id)->delete();
    }
}

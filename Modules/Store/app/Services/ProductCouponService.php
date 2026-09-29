<?php

namespace Modules\Store\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Store\Models\ProductCoupon;

class ProductCouponService
{
    public function getProductValidCoupon(string $productId, string $code): ?ProductCoupon
    {
        return ProductCoupon::where('code', $code)
            ->where(function ($q) use ($productId) {
                $q->where('product_id', $productId)
                    ->orWhereNull('product_id');
            })
            ->isValid()
            ->first();
    }

    public function getProductValidCoupons(string $productId): Collection
    {
        return ProductCoupon::where(function ($q) use ($productId) {
            $q->where('product_id', $productId)
                ->orWhereNull('product_id');
        })
            ->isValid()
            ->get();
    }

    public function getCouponsList(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('product_coupons_page', $data) ? intval($data['product_coupons_page']) : 1;
        $perPage = array_key_exists('product_coupons_per_page', $data) ? intval($data['product_coupons_per_page']) : 10;

        $coupons = ProductCoupon::with('product:id,title')->searchWhen('code', $data, 'product_coupons_search');

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $coupons->paginate($perPage, ['*'], 'product_coupons_page', $pageNumber);
        }

        return $coupons->get();
    }

    public function createCoupon(array $data): ProductCoupon
    {
        return ProductCoupon::create($data);
    }

    public function updateCoupon(string $id, array $data): bool
    {
        return ProductCoupon::findOrFail($id)->update($data);
    }

    public function deleteCoupon(string $id): bool
    {
        return ProductCoupon::findOrFail($id)->delete();
    }

    public function verifyCoupon(string $code, ?string $productId = null): ?ProductCoupon
    {
        $query = ProductCoupon::where('code', $code);

        if ($productId) {
            $query->where(function ($q) use ($productId) {
                $q->where('product_id', $productId)
                    ->orWhereNull('product_id');
            });
        }

        return $query->isValid()->first();
    }
}

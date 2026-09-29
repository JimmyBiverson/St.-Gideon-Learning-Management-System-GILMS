<?php

namespace Modules\Store\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductOrder;

class ProductOrderService
{
    public function getOrderByProduct(int $productId, int $userId): ?ProductOrder
    {
        return ProductOrder::ofProduct($productId)->ofUser($userId)->first();
    }

    public function getOrders(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('product_orders_page', $data) ? intval($data['product_orders_page']) : 1;
        $perPage = array_key_exists('product_orders_per_page', $data) ? intval($data['product_orders_per_page']) : 10;

        $orders = ProductOrder::when(array_key_exists('relations', $data), function ($query) use ($data) {
            return $query->with($data['relations']);
        })
            ->when(array_key_exists('user_id', $data) && $data['user_id'], function ($query) use ($data) {
                return $query->ofUser($data['user_id']);
            })
            ->when(array_key_exists('instructor_id', $data) && $data['instructor_id'], function ($query) use ($data) {
                return $query->ofInstructor($data['instructor_id']);
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $orders->paginate($perPage, ['*'], 'product_orders_page', $pageNumber);
        }

        return $orders->get();
    }

    public function createOrder(array $data): ProductOrder
    {
        return ProductOrder::create($data);
    }

    public function createFreeOrder(Product $product, int $userId): ProductOrder
    {
        return $this->createOrder([
            'quantity' => 1,
            'unit_price' => 0,
            'subtotal' => 0,
            'discount' => 0,
            'tax' => 0,
            'total' => 0,
            'user_id' => $userId,
            'product_id' => $product->id,
            'instructor_id' => $product->instructor_id,
        ]);
    }
}

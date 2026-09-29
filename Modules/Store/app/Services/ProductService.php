<?php

namespace Modules\Store\Services;

use App\Models\Instructor;
use App\Models\User;
use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Modules\Store\Models\Product;
use Modules\Store\Notifications\ProductApprovalNotification;

class ProductService extends MediaService
{
    public function getCheckoutProduct(string $id): Product
    {
        return Product::where('id', $id)->first();
    }

    public function createProduct(array $data): Product
    {
        $slug = getModelUniqueSlug(Product::class, $data['title']);
        $product = Product::create(array_merge($data, ['slug' => $slug]));

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $product->update([
                'thumbnail' => $this->addNewDeletePrev($product, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $product;
    }

    public function updateProduct(string $id, array $data): ?Product
    {
        $product = Product::findOrFail($id);

        switch ($data['tab']) {
            case 'basic':
                $slug = Str::slug($data['title']);
                $product->update(array_merge($data, ['slug' => $slug]));
                break;

            case 'pricing':
                $product->update($data);
                break;

            case 'media':
                $media = [];

                if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
                    $media['thumbnail'] = $this->addNewDeletePrev($product, $data['thumbnail'], 'thumbnail');
                }

                if ($media) {
                    $product->update($media);
                }
                break;

            case 'seo':
                $product->update($data);
                break;

            case 'status':
                $product->update($data);

                if (array_key_exists('feedback', $data) && $data['feedback']) {
                    $instructor = Instructor::findOrFail($product->instructor_id);
                    $user = User::findOrFail($instructor->user_id);

                    $user->notify(new ProductApprovalNotification($product, $data));
                }

                break;

            default:
                $product->update($data);
                break;
        }

        return $product;
    }

    public function getProducts(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('products_page', $data) ? intval($data['products_page']) : 1;
        $perPage = array_key_exists('products_per_page', $data) ? intval($data['products_per_page']) : 10;

        $products = Product::searchWhen('title', $data, 'products_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('reviews_count', $data) && $data['reviews_count'], function ($query) {
                return $query->withCount('reviews');
            })
            ->when(array_key_exists('orders_count', $data) && $data['orders_count'], function ($query) {
                return $query->withCount('orders');
            })
            ->when(array_key_exists('average_rating', $data) && $data['average_rating'], function ($query) {
                return $query->withAvg('reviews as average_rating', 'rating');
            })
            ->when(array_key_exists('category', $data) && $data['category'] !== 'all', function ($query) use ($data) {
                return $query->inCategory($data['category']);
            })
            ->when(array_key_exists('category_child', $data) && $data['category_child'] && $data['category_child'] !== 'all', function ($query) use ($data) {
                return $query->inCategoryChild($data['category_child']);
            })
            ->when(array_key_exists('status', $data) && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('price', $data) && $data['price'] !== 'all', function ($query) use ($data) {
                return $query->where('pricing_type', $data['price']);
            })
            ->when(array_key_exists('featured', $data) && $data['featured'], function ($query) {
                return $query->featured();
            })
            ->when(array_key_exists('instructor_id', $data) && $data['instructor_id'], function ($query) use ($data) {
                return $query->where('instructor_id', $data['instructor_id']);
            })
            ->when(array_key_exists('sort', $data) && $data['sort'], function ($query) use ($data) {
                return match ($data['sort']) {
                    'expensive' => $query->orderBy('price', 'desc'),
                    'inexpensive' => $query->orderBy('price', 'asc'),
                    'bestsellers' => $query->withCount('orders')->orderBy('orders_count', 'desc'),
                    'best_rates' => $query->withAvg('reviews as average_rating', 'rating')->orderByDesc('average_rating'),
                    default => $query->latest(),
                };
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $products->paginate($perPage, ['*'], 'products_page', $pageNumber);
        }

        return $products->get();
    }

    public function getEditProductById(string $id): ?Product
    {
        $product = Product::where('id', $id)
            ->withCount('orders')
            ->with([
                'faqs' => function ($query) {
                    $query->select(['id', 'product_id', 'question', 'answer', 'sort']);
                },
                'specifications' => function ($query) {
                    $query->select(['id', 'product_id', 'title', 'value', 'sort']);
                },
                'instructor:id,user_id',
                'instructor.user:id,name',
            ])
            ->first();

        return $product?->append(['images', 'files']);
    }

    public function getGuestProductById(string $id): Product
    {
        $product = Product::where('id', $id)
            ->withCount('orders')
            ->withAvg('reviews as average_rating', 'rating')
            ->with([
                'faqs' => function ($query) {
                    $query->select(['id', 'product_id', 'question', 'answer', 'sort']);
                },
                'specifications' => function ($query) {
                    $query->select(['id', 'product_id', 'title', 'value', 'sort']);
                },
                'instructor' => function ($query) {
                    $query->select(['id', 'user_id'])
                        ->with('user:id,name,email,photo');
                },
            ])
            ->first();

        // Only the gallery is safe to expose pre-purchase; downloadable
        // files are served through the purchase-gated download route.
        return $product->append('images');
    }

    public function incrementViews(Product $product): void
    {
        $product->increment('views');
    }

    public function deleteProduct(string $id): void
    {
        $product = Product::findOrFail($id);
        $product->delete();
    }

    /**
     * Validate if a product is ready for approval based on content completeness
     *
     * @return array<string, mixed>
     */
    public function validateProductForApproval(Product $product): array
    {
        $hasThumbnail = ! empty($product->thumbnail);
        $hasFile = $product->getMedia(Product::FILES_COLLECTION)->isNotEmpty();
        $hasPrice = $product->pricing_type !== 'paid' || ! empty($product->price);

        $validationMessages = [];
        if (! $hasThumbnail) {
            $validationMessages[] = 'Product thumbnail is missing';
        }
        if (! $hasFile) {
            $validationMessages[] = 'At least one downloadable file is required';
        }
        if (! $hasPrice) {
            $validationMessages[] = 'Price is required for paid products';
        }

        return [
            'approve_able' => $hasThumbnail && $hasFile && $hasPrice,
            'validation_messages' => $validationMessages,
        ];
    }
}

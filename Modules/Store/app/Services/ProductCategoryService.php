<?php

namespace Modules\Store\Services;

use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductCategory;
use Modules\Store\Models\ProductCategoryChild;

class ProductCategoryService extends MediaService
{
    public function getCategoryBySlug(?string $name): ?ProductCategory
    {
        return ProductCategory::bySlug($name)->select('id', 'title', 'slug')->first();
    }

    public function getCategoryChildBySlug(?string $name): ?ProductCategoryChild
    {
        return ProductCategoryChild::bySlug($name)->select('id', 'title', 'slug')->first();
    }

    public function getCategories(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('product_categories_page', $data) ? intval($data['product_categories_page']) : 1;
        $perPage = array_key_exists('product_categories_per_page', $data) ? intval($data['product_categories_per_page']) : 10;

        $categories = ProductCategory::searchWhen('title', $data, 'product_categories_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('status', $data) && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('default', $data) && ! $data['default'], function ($query) {
                return $query->where('slug', '!=', 'default');
            })
            ->when(array_key_exists('products_count', $data) && $data['products_count'], function ($query) {
                return $query->withCount('products');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $categories->paginate($perPage, ['*'], 'product_categories_page', $pageNumber);
        }

        return $categories->get();
    }

    public function createCategory(array $data): ProductCategory
    {
        $slug = getModelUniqueSlug(ProductCategory::class, $data['title']);
        $category = ProductCategory::create(array_merge($data, ['slug' => $slug]));

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $category->update([
                'thumbnail' => $this->addNewDeletePrev($category, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $category;
    }

    public function updateCategory(array $data, ProductCategory $category): ProductCategory
    {
        $slug = Str::slug($data['title']);
        $category->update(array_merge($data, ['slug' => $slug]));

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $category->update([
                'thumbnail' => $this->addNewDeletePrev($category, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $category;
    }

    public function createCategoryChild(array $data): ProductCategoryChild
    {
        $slug = getModelUniqueSlug(ProductCategoryChild::class, $data['title']);
        $categoryChild = ProductCategoryChild::create(array_merge($data, ['slug' => $slug]));

        return $categoryChild;
    }

    public function updateCategoryChild(array $data, ProductCategoryChild $categoryChild): ProductCategoryChild
    {
        $slug = Str::slug($data['title']);
        $categoryChild->update(array_merge($data, ['slug' => $slug]));

        return $categoryChild;
    }

    public function deleteCategory(ProductCategory $category): bool
    {
        $defaultCategory = ProductCategory::bySlug('default')->first();

        // 1. Move products directly under this category to the default category
        $category->products()->update([
            'product_category_id' => $defaultCategory->id,
            'product_category_child_id' => null,
        ]);

        // 2. Move products under subcategories of this category to the default category
        $childIds = $category->category_children()->pluck('id')->toArray();
        if (! empty($childIds)) {
            Product::whereIn('product_category_child_id', $childIds)->update([
                'product_category_id' => $defaultCategory->id,
                'product_category_child_id' => null,
            ]);
        }

        return $category->delete();
    }

    public function deleteCategoryChild(ProductCategoryChild $categoryChild): bool
    {
        $categoryChild->products()->update([
            'product_category_child_id' => null,
        ]);

        return $categoryChild->delete();
    }

    public function sortCategories(array $sortedData)
    {
        foreach ($sortedData as $value) {
            ProductCategory::where('id', $value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }
    }

    public function sortCategoryChildren(array $sortedData)
    {
        foreach ($sortedData as $value) {
            ProductCategoryChild::where('id', $value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }
    }
}

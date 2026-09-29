<?php

namespace Modules\Blog\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Blog\Models\BlogCategory;

class BlogCategoryService
{
    public function getCategories(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('blog_categories_page', $data) ? intval($data['blog_categories_page']) : 1;
        $perPage = array_key_exists('blog_categories_per_page', $data) ? intval($data['blog_categories_per_page']) : 10;

        $categories = BlogCategory::searchWhen('name', $data, 'blog_categories_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('blogs_count', $data) && $data['blogs_count'], function ($query) {
                return $query->withCount('blogs');
            })
            ->when(array_key_exists('status', $data) && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('default', $data) && ! $data['default'], function ($query) {
                return $query->where('slug', '!=', 'default');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $categories->paginate($perPage, ['*'], 'blog_categories_page', $pageNumber);
        }

        return $categories->get();
    }

    public function getCategoryBySlug(string $slug)
    {
        return BlogCategory::where('slug', $slug)->select(['id', 'name', 'slug'])->first();
    }

    public function storeCategory(array $data): BlogCategory
    {
        $data['slug'] = getModelUniqueSlug(BlogCategory::class, $data['name']) ?? '';

        return BlogCategory::create($data);
    }

    public function updateCategory(string $id, array $data): bool
    {
        return BlogCategory::findOrFail($id)->update($data);
    }

    public function deleteCategory(string $id): bool
    {
        $category = BlogCategory::findOrFail($id);
        $defaultCategory = BlogCategory::where('slug', 'default')->first();

        $category->blogs()->update([
            'blog_category_id' => $defaultCategory->id,
        ]);

        $category->delete();

        return true;
    }
}

<?php

namespace Modules\Course\Services;

use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseCategoryChild;

class CourseCategoryService extends MediaService
{
    public function getCategoryBySlug(?string $name): ?CourseCategory
    {
        return CourseCategory::bySlug($name)->select('id', 'title', 'slug')->first();
    }

    public function getCategoryChildBySlug(?string $name): ?CourseCategoryChild
    {
        return CourseCategoryChild::bySlug($name)->select('id', 'title', 'slug')->first();
    }

    public function getCategories(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('course_categories_page', $data) ? intval($data['course_categories_page']) : 1;
        $perPage = array_key_exists('course_categories_per_page', $data) ? intval($data['course_categories_per_page']) : 10;

        $categories = CourseCategory::searchWhen('title', $data, 'course_categories_search')
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
            ->when(array_key_exists('courses_count', $data) && $data['courses_count'], function ($query) {
                return $query->withCount('courses');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $categories->paginate($perPage, ['*'], 'course_categories_page', $pageNumber);
        }

        return $categories->get();
    }

    public function createCategory(array $data): CourseCategory
    {
        $slug = getModelUniqueSlug(CourseCategory::class, $data['title']);
        $category = CourseCategory::create(array_merge($data, ['slug' => $slug]));

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $category->update([
                'thumbnail' => $this->addNewDeletePrev($category, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $category;
    }

    public function updateCategory(array $data, CourseCategory $category): CourseCategory
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

    public function createCategoryChild(array $data): CourseCategoryChild
    {
        $slug = getModelUniqueSlug(CourseCategoryChild::class, $data['title']);
        $categoryChild = CourseCategoryChild::create(array_merge($data, ['slug' => $slug]));

        return $categoryChild;
    }

    public function updateCategoryChild(array $data, CourseCategoryChild $categoryChild): CourseCategoryChild
    {
        $slug = Str::slug($data['title']);
        $categoryChild->update(array_merge($data, ['slug' => $slug]));

        return $categoryChild;
    }

    public function deleteCategory(CourseCategory $category): bool
    {
        $defaultCategory = CourseCategory::bySlug('default')->first();

        // 1. Move courses directly under this category to the default category
        $category->courses()->update([
            'course_category_id' => $defaultCategory->id,
            'course_category_child_id' => null,
        ]);

        // 2. Move courses under subcategories of this category to the default category
        $childIds = $category->category_children()->pluck('id')->toArray();
        if (! empty($childIds)) {
            Course::whereIn('course_category_child_id', $childIds)->update([
                'course_category_id' => $defaultCategory->id,
                'course_category_child_id' => null,
            ]);
        }

        return $category->delete();
    }

    public function deleteCategoryChild(CourseCategoryChild $categoryChild): bool
    {
        $categoryChild->courses()->update([
            'course_category_child_id' => null,
        ]);

        return $categoryChild->delete();
    }

    public function sortCategories(array $sortedData)
    {
        foreach ($sortedData as $value) {
            CourseCategory::where('id', $value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }
    }

    public function sortCategoryChildren(array $sortedData)
    {
        foreach ($sortedData as $value) {
            CourseCategoryChild::where('id', $value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }
    }
}

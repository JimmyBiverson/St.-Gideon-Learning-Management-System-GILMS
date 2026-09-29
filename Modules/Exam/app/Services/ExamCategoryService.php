<?php

namespace Modules\Exam\Services;

use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Exam\Models\ExamCategory;

class ExamCategoryService extends MediaService
{
    /**
     * Get category by slug
     */
    public function getCategoryBySlug(string $slug): ExamCategory
    {
        return ExamCategory::bySlug($slug)->select('id', 'title', 'slug')->first();
    }

    /**
     * Get all categories with pagination data
     */
    public function getCategories(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('exam_categories_page', $data) ? intval($data['exam_categories_page']) : 1;
        $perPage = array_key_exists('exam_categories_per_page', $data) ? intval($data['exam_categories_per_page']) : 10;

        $categories = ExamCategory::searchWhen('title', $data, 'exam_categories_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('exams_count', $data) && $data['exams_count'], function ($query) {
                return $query->withCount('exams');
            })
            ->when(array_key_exists('status', $data) && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('default', $data) && ! $data['default'], function ($query) {
                return $query->where('slug', '!=', 'default');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $categories->paginate($perPage, ['*'], 'exam_categories_page', $pageNumber);
        }

        return $categories->get();
    }

    /**
     * Create a new exam category
     */
    public function createCategory(array $data): ExamCategory
    {
        $data['slug'] = getModelUniqueSlug(ExamCategory::class, $data['title']) ?? '';
        $category = ExamCategory::create($data);

        if (isset($data['thumbnail']) && $data['thumbnail']) {
            $category->update([
                'thumbnail' => $this->addNewDeletePrev($category, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $category;
    }

    /**
     * Update an exam category
     */
    public function updateCategory(array $data, ExamCategory $category): ExamCategory
    {
        $category->update($data);

        if (isset($data['thumbnail']) && $data['thumbnail']) {
            $category->update([
                'thumbnail' => $this->addNewDeletePrev($category, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $category;
    }

    /**
     * Delete an exam category
     * Reassigns all exams to default category before deletion
     */
    public function deleteCategory(string $id): bool
    {
        $category = ExamCategory::findOrFail($id);
        $defaultCategory = ExamCategory::where('slug', 'default')->first();

        // If no default category exists, create one
        if (! $defaultCategory) {
            $defaultCategory = ExamCategory::create([
                'title' => 'Default',
                'icon' => 'fa-folder',
                'status' => true,
            ]);
        }

        // Reassign all exams to default category
        $category->exams()->update([
            'exam_category_id' => $defaultCategory->id,
        ]);

        // Delete the category
        $category->delete();

        return true;
    }
}

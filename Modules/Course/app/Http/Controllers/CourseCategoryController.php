<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Course\Http\Requests\StoreCourseCategoryRequest;
use Modules\Course\Http\Requests\UpdateCourseCategoryRequest;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Services\CourseCategoryService;

class CourseCategoryController extends Controller
{
    protected CourseCategoryService $categoryService;

    public function __construct()
    {
        $this->categoryService = new CourseCategoryService;
    }

    public function index(Request $request)
    {
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'select' => 'id,title,slug,icon,sort,status,description',
            'relations' => 'category_children:id,title,icon,sort,status,course_category_id',
        ]));

        return Inertia::render('Course/dashboard/categories/index', compact('categories'));
    }

    public function store(StoreCourseCategoryRequest $request)
    {
        $this->categoryService->createCategory($request->validated());

        return back()->with('success', 'Category added successfully');
    }

    public function update(UpdateCourseCategoryRequest $request, CourseCategory $category)
    {
        $this->categoryService->updateCategory($request->validated(), $category);

        return back()->with('success', 'Category updated successfully');
    }

    public function destroy(CourseCategory $category)
    {
        $this->categoryService->deleteCategory($category);

        return back()->with('success', 'Category deleted successfully');
    }

    public function sort(Request $request)
    {
        $this->categoryService->sortCategories($request->sortedData);

        return back()->with('success', 'Categories sorted successfully');
    }
}

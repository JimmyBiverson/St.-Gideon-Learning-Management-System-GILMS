<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Course\Http\Requests\StoreCategoryChildRequest;
use Modules\Course\Http\Requests\UpdateCategoryChildRequest;
use Modules\Course\Models\CourseCategoryChild;
use Modules\Course\Services\CourseCategoryService;

class CategoryChildController extends Controller
{
    protected CourseCategoryService $categoryService;

    public function __construct()
    {
        $this->categoryService = new CourseCategoryService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryChildRequest $request)
    {
        $this->categoryService->createCategoryChild($request->validated());

        return back()->with('success', 'Child category added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryChildRequest $request, CourseCategoryChild $categoryChild)
    {
        $this->categoryService->updateCategoryChild($request->validated(), $categoryChild);

        return back()->with('success', 'Child category updated successfully');
    }

    public function destroy(CourseCategoryChild $categoryChild)
    {
        $this->categoryService->deleteCategoryChild($categoryChild);

        return back()->with('success', 'Child category deleted successfully');
    }

    public function sort(Request $request)
    {
        $this->categoryService->sortCategoryChildren($request->sortedData);

        return back()->with('success', 'Categories sorted successfully');
    }
}

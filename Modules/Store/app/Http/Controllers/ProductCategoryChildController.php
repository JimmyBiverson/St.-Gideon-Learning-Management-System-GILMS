<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Store\Http\Requests\StoreProductCategoryChildRequest;
use Modules\Store\Http\Requests\UpdateProductCategoryChildRequest;
use Modules\Store\Models\ProductCategoryChild;
use Modules\Store\Services\ProductCategoryService;

class ProductCategoryChildController extends Controller
{
    public function __construct(
        protected ProductCategoryService $categoryService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductCategoryChildRequest $request)
    {
        $this->categoryService->createCategoryChild($request->validated());

        return back()->with('success', 'Child category added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductCategoryChildRequest $request, ProductCategoryChild $categoryChild)
    {
        $this->categoryService->updateCategoryChild($request->validated(), $categoryChild);

        return back()->with('success', 'Child category updated successfully');
    }

    public function destroy(ProductCategoryChild $categoryChild)
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

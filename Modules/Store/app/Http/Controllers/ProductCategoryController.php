<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Store\Http\Requests\StoreProductCategoryRequest;
use Modules\Store\Http\Requests\UpdateProductCategoryRequest;
use Modules\Store\Models\ProductCategory;
use Modules\Store\Services\ProductCategoryService;

class ProductCategoryController extends Controller
{
    public function __construct(
        protected ProductCategoryService $categoryService,
    ) {}

    public function index(Request $request)
    {
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'select' => 'id,title,slug,icon,sort,status,description',
            'relations' => 'category_children:id,title,icon,sort,status,product_category_id',
        ]));

        return Inertia::render('Store/dashboard/categories/index', compact('categories'));
    }

    public function store(StoreProductCategoryRequest $request)
    {
        $this->categoryService->createCategory($request->validated());

        return back()->with('success', 'Category added successfully');
    }

    public function update(UpdateProductCategoryRequest $request, ProductCategory $category)
    {
        $this->categoryService->updateCategory($request->validated(), $category);

        return back()->with('success', 'Category updated successfully');
    }

    public function destroy(ProductCategory $category)
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

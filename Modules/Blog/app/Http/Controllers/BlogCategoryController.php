<?php

namespace Modules\Blog\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Blog\Http\Requests\BlogCategoryRequest;
use Modules\Blog\Services\BlogCategoryService;

class BlogCategoryController extends Controller
{
    public function __construct(private BlogCategoryService $categoryService) {}

    /**
     * Display a listing of blog categories.
     */
    public function index(Request $request): Response
    {
        $categories = $this->categoryService->getCategories(array_merge($request->all(), [
            'blogs_count' => true,
            'select' => 'id,name,icon,slug,sort,status,description',
        ]));

        return Inertia::render('Blog/dashboard/categories', compact('categories'));
    }

    /**
     * Store a newly created blog category.
     */
    public function store(BlogCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->storeCategory($request->validated());

        return back()->with('success', 'Blog category created successfully.');
    }

    /**
     * Update the specified blog category.
     */
    public function update(BlogCategoryRequest $request, string $id): RedirectResponse
    {
        try {
            $this->categoryService->updateCategory($id, $request->validated());

            return back()->with('success', 'Blog category updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update blog category: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified blog category.
     */
    public function destroy(string $id): RedirectResponse
    {
        $this->categoryService->deleteCategory($id);

        return back()->with('success', 'Blog category deleted successfully.');
    }

    public function sort(Request $request)
    {
        sortTableRows('blog_categories', $request->sortedData);

        return back()->with('success', 'Blog categories sorted successfully');
    }
}

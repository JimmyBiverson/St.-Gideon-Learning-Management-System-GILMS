<?php

namespace Modules\Blog\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Blog\Actions\GenerateBlogMetaTagsAction;
use Modules\Blog\Http\Requests\BlogRequest;
use Modules\Blog\Models\Blog;
use Modules\Blog\Models\BlogCategory;
use Modules\Blog\Services\BlogCategoryService;
use Modules\Blog\Services\BlogService;

class BlogController extends Controller
{
    public function __construct(
        private BlogService $blogService,
        private BlogCategoryService $categoryService,
        private GenerateBlogMetaTagsAction $metaTagsAction,
    ) {}

    /**
     * Display a listing of blogs.
     */
    public function index(Request $request): Response
    {
        $blogs = $this->blogService->getBlogs([
            ...$request->all(),
            'paginate' => true,
            'relations' => ['user:id,name,email', 'category:id,name'],
            'select' => 'id,uuid,title,status,user_id,blog_category_id',
        ]);

        return Inertia::render('Blog/dashboard/index', ['blogs' => $blogs]);
    }

    /**
     * Display a listing of blogs.
     */
    public function guest_blogs(Request $request): Response
    {
        $category = $this->categoryService->getCategoryBySlug($request->category);
        $blogs = $this->blogService->getBlogs([
            ...$request->all(),
            'status' => 'published',
            'category' => $category ? $category->id : 'all',
            'blogs_per_page' => 12,
            'relations' => ['user:id,name,email,photo'],
            'paginate' => true,
        ]);

        $categories = $this->categoryService->getCategories([
            'default' => false,
            'status' => 'active',
            'select' => 'id,name,slug',
        ]);

        $metaTags = $this->metaTagsAction->forBlogListing($blogs, $category);

        return Inertia::render('Blog/index', [
            'blogs' => $blogs,
            'category' => $category,
            'categories' => $categories,
        ])->withViewData($metaTags);
    }

    /**
     * Show the form for creating a new blog.
     */
    public function create(): Response
    {
        $statuses = Blog::getStatuses();
        $categories = $this->categoryService->getCategories([
            'default' => false,
            'status' => 'active',
            'select' => 'id,name,slug',
        ]);

        return Inertia::render('Blog/dashboard/create-edit', compact('categories', 'statuses'));
    }

    /**
     * Store a newly created blog.
     */
    public function store(BlogRequest $request): RedirectResponse
    {
        $this->blogService->storeBlog($request->validated());

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
    }

    /**
     * Display the specified blog.
     */
    public function show(string $uuid): Response
    {
        $blog = Blog::where('uuid', $uuid)
            ->with([
                'user:id,name,email,photo',
                'category:id,name,slug',
                'comments.user:id,name,photo',
                'comments.replies.user:id,name,photo',
            ])
            ->withCount([
                'likes',
                'dislikes',
                'comments',
            ])
            ->first();

        if (! $blog) {
            abort(404, 'Blog not found');
        }

        // Get user's reaction if authenticated
        $userReaction = null;
        if (Auth::check()) {
            $userReaction = $blog->getUserReaction(Auth::id());
        }

        $metaTags = $this->metaTagsAction->forSingleBlog($blog);

        return Inertia::render('Blog/show', [
            'blog' => $blog,
            'userReaction' => $userReaction,
            'likesCount' => $blog->likes_count ?? 0,
            'dislikesCount' => $blog->dislikes_count ?? 0,
            'commentsCount' => $blog->comments_count ?? 0,
        ])->withViewData($metaTags);
    }

    /**
     * Display the specified blog.
     */
    public function preview(string $uuid): Response
    {
        $blog = Blog::where('uuid', $uuid)->with(['user:id,name,email,photo'])->first();

        return Inertia::render('Blog/dashboard/preview', compact('blog'));
    }

    /**
     * Show the form for editing the specified blog.
     */
    public function edit(Blog $blog): Response
    {
        $blog->load('category');

        return Inertia::render('Blog/dashboard/create-edit', [
            'blog' => $blog,
            'categories' => BlogCategory::active()->select('id', 'name')->get(),
            'statuses' => Blog::getStatuses(),
        ]);
    }

    /**
     * Update the specified blog.
     */
    public function update(BlogRequest $request, string $id): RedirectResponse
    {
        $this->blogService->updateBlog($id, $request->validated());

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully.');
    }

    /**
     * Remove the specified blog.
     */
    public function destroy(Blog $blog): RedirectResponse
    {

        $blog->clearMediaCollection();

        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully.');
    }
}

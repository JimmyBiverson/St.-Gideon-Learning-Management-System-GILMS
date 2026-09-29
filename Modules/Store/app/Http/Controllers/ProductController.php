<?php

namespace Modules\Store\Http\Controllers;

use App\Enums\StatusType;
use App\Http\Controllers\Controller;
use App\Services\InstructorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Store\Actions\GenerateProductMetaTagsAction;
use Modules\Store\Http\Requests\StoreProductFileRequest;
use Modules\Store\Http\Requests\StoreProductImageRequest;
use Modules\Store\Http\Requests\StoreProductRequest;
use Modules\Store\Http\Requests\UpdateProductRequest;
use Modules\Store\Http\Requests\UpdateProductStatusRequest;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductOrder;
use Modules\Store\Services\ProductCategoryService;
use Modules\Store\Services\ProductReviewService;
use Modules\Store\Services\ProductService;
use Modules\Store\Services\ProductWishlistService;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected ProductCategoryService $categoryService,
        protected InstructorService $instructorService,
        protected ProductWishlistService $wishlistService,
        protected ProductReviewService $reviewService,
        protected GenerateProductMetaTagsAction $metaTagsAction,
    ) {}

    /**
     * Public storefront listing.
     */
    public function shop(Request $request, ?string $category = null)
    {
        $user = Auth::user();

        $categoryModel = $category && $category !== 'all'
            ? $this->categoryService->getCategoryBySlug($category)
            : null;

        $categories = $this->categoryService->getCategories([
            'default' => false,
            'products_count' => true,
            'select' => 'id,title,slug,icon',
            'relations' => 'category_children:id,title,slug,product_category_id',
        ]);
        $wishlists = $this->wishlistService->getWishlists(['user_id' => $user ? $user->id : null]);
        $products = $this->productService->getProducts([
            ...$request->all(),
            'products_per_page' => 12,
            'category' => $categoryModel ? $categoryModel->id : 'all',
            'status' => 'approved',
            'reviews_count' => true,
            'average_rating' => true,
            'select' => 'id,title,slug,price,discount,discount_price,thumbnail,pricing_type,featured,product_category_id,instructor_id',
            'relations' => [
                'instructor:id,user_id',
                'instructor.user:id,name,photo',
                'product_category:id,title',
            ],
            'paginate' => true,
        ]);

        $metaTags = $this->metaTagsAction->forProductListing($products, $categoryModel);

        return Inertia::render('Store/products/index', [
            'products' => $products,
            'categories' => $categories,
            'category' => $categoryModel,
            'wishlists' => $wishlists,
        ])->withViewData($metaTags);
    }

    /**
     * Public single product page.
     */
    public function show(Request $request, string $slug, string $id)
    {
        if (empty($slug)) {
            return redirect()->back();
        }

        $product = $this->productService->getGuestProductById($id);

        if (! $product) {
            return Inertia::render('404');
        }

        $user = Auth::user();
        $isAdmin = $user && $user->role === 'admin';
        $isOwner = $user && $user->role === 'instructor' && $user->instructor_id === $product->instructor_id;

        if ($product->status !== 'approved' && ! $isOwner && ! $isAdmin) {
            return Inertia::render('404');
        }

        $this->productService->incrementViews($product);

        $order = $user ? ProductOrder::ofProduct($product->id)->ofUser($user->id)->first() : null;

        if ($order || $isOwner || $isAdmin) {
            $product->append('files');
        }

        $wishlists = $this->wishlistService->getWishlists(['user_id' => $user ? $user->id : null]);
        $reviews = $this->reviewService->getReviews(array_merge($request->all(), [
            'select' => 'id,user_id,rating,review,created_at',
            'relations' => ['user:id,name,photo'],
            'product_id' => $product->id,
            'paginate' => true,
        ]));
        $totalReviews = $this->reviewService->totalReviews($product->id);
        $metaTags = $this->metaTagsAction->forSingleProduct($product);

        return Inertia::render('Store/products/show', [
            'product' => $product,
            'order' => $order,
            'wishlists' => $wishlists,
            'reviews' => $reviews,
            'totalReviews' => $totalReviews,
        ])->withViewData($metaTags);
    }

    public function index(Request $request)
    {
        $statuses = StatusType::cases();
        $products = $this->productService->getProducts([
            ...$request->all(),
            'paginate' => true,
            'instructor_id' => isAdmin() ? null : Auth::user()?->instructor_id,
            'orders_count' => true,
            'select' => 'id,title,status,price,pricing_type,thumbnail,product_category_id,product_category_child_id,instructor_id',
            'relations' => [
                'instructor:id,user_id',
                'instructor.user:id,name,email',
                'product_category:id,title',
                'product_category_child:id,title',
            ],
        ]);

        return Inertia::render('Store/dashboard/index', compact('products', 'statuses'));
    }

    public function create()
    {
        $categories = $this->categoryService->getCategories([
            'default' => false,
            'select' => 'id,title',
            'relations' => 'category_children:id,title,product_category_id',
        ]);
        $instructors = $this->instructorService->getInstructors([
            'admin' => isAdmin(),
            'status' => 'approved',
            'relations' => ['user:id,name'],
        ]);

        return Inertia::render('Store/dashboard/create', compact('categories', 'instructors'));
    }

    public function store(StoreProductRequest $request)
    {
        $this->productService->createProduct($request->validated());

        return redirect(route('products.index'))->with('success', 'Product added successfully');
    }

    public function edit(Request $request, string $id)
    {
        $tab = $request->tab;

        $statuses = StatusType::cases();
        $product = $this->productService->getEditProductById($id);
        $categories = $this->categoryService->getCategories([
            'default' => false,
            'select' => 'id,title',
            'relations' => 'category_children:id,title,product_category_id',
        ]);
        $approvalStatus = $this->productService->validateProductForApproval($product);

        return Inertia::render('Store/dashboard/update', [
            'tab' => $tab,
            'product' => $product,
            'statuses' => $statuses,
            'categories' => $categories,
            'approvalStatus' => $approvalStatus,
        ]);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $this->productService->updateProduct($id, $request->validated());

        return back()->with('success', "Product $request->tab updated successfully");
    }

    public function status(UpdateProductStatusRequest $request, $id)
    {
        $this->productService->updateProduct($id, [...$request->validated(), 'tab' => 'status']);

        return back()->with('success', 'Product status changed successfully');
    }

    public function destroy($id)
    {
        $this->productService->deleteProduct($id);

        return redirect(route('products.index'))->with('success', 'Product deleted successfully');
    }

    /**
     * Store gallery images for a product.
     */
    public function storeImage(StoreProductImageRequest $request)
    {
        $product = Product::findOrFail($request->product_id);

        foreach ($request->file('images') as $image) {
            $product->addMedia($image)->toMediaCollection(Product::IMAGES_COLLECTION);
        }

        return back()->with('success', 'Product images uploaded successfully');
    }

    /**
     * Remove a gallery image from a product.
     */
    public function destroyImage(Product $product, string $media)
    {
        $product->getMedia(Product::IMAGES_COLLECTION)->find($media)?->delete();

        return back()->with('success', 'Product image removed successfully');
    }

    /**
     * Store downloadable files for a product.
     */
    public function storeFile(StoreProductFileRequest $request)
    {
        $product = Product::findOrFail($request->product_id);

        foreach ($request->file('files') as $file) {
            $product->addMedia($file)
                ->usingName($file->getClientOriginalName())
                ->toMediaCollection(Product::FILES_COLLECTION);
        }

        return back()->with('success', 'Product files uploaded successfully');
    }

    /**
     * Remove a downloadable file from a product.
     */
    public function destroyFile(Product $product, string $media)
    {
        $product->getMedia(Product::FILES_COLLECTION)->find($media)?->delete();

        return back()->with('success', 'Product file removed successfully');
    }
}

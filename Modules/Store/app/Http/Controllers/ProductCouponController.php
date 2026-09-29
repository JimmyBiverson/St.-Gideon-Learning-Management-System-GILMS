<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Store\Http\Requests\StoreProductCouponRequest;
use Modules\Store\Models\ProductCoupon;
use Modules\Store\Services\ProductCouponService;
use Modules\Store\Services\ProductService;

class ProductCouponController extends Controller
{
    public function __construct(
        private ProductService $product,
        private ProductCouponService $productCoupon
    ) {}

    /**
     * Display a listing of coupons
     */
    public function index(Request $request): Response
    {
        $products = $this->product->getProducts([...$request->all(), 'status' => 'approved', 'select' => 'id,title']);
        $coupons = $this->productCoupon->getCouponsList([...$request->all(), 'paginate' => true]);

        return Inertia::render('Store/dashboard/coupons/index', [
            'products' => $products,
            'coupons' => $coupons,
        ]);
    }

    /**
     * Store a newly created coupon
     */
    public function store(StoreProductCouponRequest $request)
    {
        $this->productCoupon->createCoupon($request->validated());

        return redirect()
            ->route('product-coupons.index')
            ->with('success', 'Coupon created successfully.');
    }

    /**
     * Update the specified coupon
     */
    public function update(StoreProductCouponRequest $request, ProductCoupon $coupon)
    {
        $this->productCoupon->updateCoupon($coupon->id, $request->validated());

        return redirect()
            ->route('product-coupons.index')
            ->with('success', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified coupon
     */
    public function destroy(ProductCoupon $coupon)
    {
        $this->productCoupon->deleteCoupon($coupon->id);

        return redirect()
            ->route('product-coupons.index')
            ->with('success', 'Coupon deleted successfully.');
    }

    /**
     * Verify a coupon code
     */
    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'product_id' => 'nullable|exists:products,id',
        ]);

        $coupon = $this->productCoupon->verifyCoupon($request->code, $request->product_id);

        if (! $coupon) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid coupon code.',
            ], 404);
        }

        if (! $coupon->isValid()) {
            return response()->json([
                'valid' => false,
                'message' => 'Coupon is not valid or has expired.',
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'coupon' => $coupon,
        ]);
    }
}

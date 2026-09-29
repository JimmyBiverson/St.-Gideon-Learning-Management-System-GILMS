<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Store\Http\Requests\StoreProductOrderRequest;
use Modules\Store\Models\Product;
use Modules\Store\Services\ProductOrderService;

class ProductOrderController extends Controller
{
    public function __construct(
        private ProductOrderService $orderService,
    ) {}

    /**
     * Claim a free product without going through the payment flow.
     */
    public function store(StoreProductOrderRequest $request)
    {
        $product = Product::findOrFail($request->product_id);

        $this->orderService->createFreeOrder($product, $request->user()->id);

        return back()->with('success', 'Product added to your library');
    }

    /**
     * Instructor/admin sales list.
     */
    public function sales(Request $request)
    {
        $user = Auth::user();
        $extraParams = [];

        if (! isAdmin()) {
            if ($user->instructor) {
                $extraParams = ['instructor_id' => $user->instructor->id];
            } else {
                $extraParams = ['user_id' => $user->id];
            }
        }

        $orders = $this->orderService->getOrders([
            ...$request->all(),
            'paginate' => true,
            'relations' => ['product:id,title,thumbnail', 'user:id,name,email,photo'],
            ...$extraParams,
        ]);

        return Inertia::render('Store/dashboard/sales/index', compact('orders'));
    }

    /**
     * Student purchase history.
     */
    public function purchases(Request $request)
    {
        $user = Auth::user();

        $orders = $this->orderService->getOrders([
            ...$request->all(),
            'paginate' => true,
            'user_id' => $user->id,
            'relations' => [
                'product:id,title,slug,thumbnail',
                'instructor:id,user_id',
                'instructor.user:id,name',
            ],
        ]);

        return Inertia::render('Store/dashboard/purchases/index', compact('orders'));
    }
}

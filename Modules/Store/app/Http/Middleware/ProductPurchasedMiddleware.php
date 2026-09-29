<?php

namespace Modules\Store\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductOrder;
use Symfony\Component\HttpFoundation\Response;

class ProductPurchasedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return $next($request);
        }

        $product = $request->route('product');

        if (! $product instanceof Product) {
            $product = Product::findOrFail($product);
        }

        if ($user->role === 'instructor' && $user->instructor_id == $product->instructor_id) {
            return $next($request);
        }

        $purchased = ProductOrder::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->exists();

        if ($purchased) {
            return $next($request);
        }

        return back()->with('error', 'You need to purchase this product before downloading its files');
    }
}

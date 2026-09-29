<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Store\Http\Requests\StoreProductReviewRequest;
use Modules\Store\Http\Requests\UpdateProductReviewRequest;
use Modules\Store\Services\ProductReviewService;

class ProductReviewController extends Controller
{
    public function __construct(
        public ProductReviewService $reviewService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductReviewRequest $request)
    {
        $this->reviewService->createReview($request->validated());

        return redirect()->back()->with('success', 'Review created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductReviewRequest $request, string $id)
    {
        $this->reviewService->updateReview($id, $request->validated());

        return redirect()->back()->with('success', 'Review updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->reviewService->deleteReview($id);

        return redirect()->back()->with('success', 'Review deleted successfully');
    }
}

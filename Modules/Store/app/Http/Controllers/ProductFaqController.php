<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Store\Http\Requests\StoreProductFaqRequest;
use Modules\Store\Http\Requests\UpdateProductFaqRequest;
use Modules\Store\Services\ProductFaqService;

class ProductFaqController extends Controller
{
    public function __construct(
        private ProductFaqService $faqService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductFaqRequest $request)
    {
        $this->faqService->createFaq($request->validated());

        return back()->with('success', 'Product Faq added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductFaqRequest $request, string $faq)
    {
        $this->faqService->updateFaq($request->validated(), $faq);

        return back()->with('success', 'Product Faq updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $faq)
    {
        $this->faqService->deleteFaq($faq);

        return back()->with('success', 'Product Faq deleted successfully');
    }
}

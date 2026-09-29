<?php

namespace Modules\Store\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Store\Http\Requests\StoreProductSpecificationRequest;
use Modules\Store\Http\Requests\UpdateProductSpecificationRequest;
use Modules\Store\Services\ProductSpecificationService;

class ProductSpecificationController extends Controller
{
    public function __construct(
        private ProductSpecificationService $specificationService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductSpecificationRequest $request)
    {
        $this->specificationService->createSpecification($request->validated());

        return back()->with('success', 'Product Specification added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductSpecificationRequest $request, string $specification)
    {
        $this->specificationService->updateSpecification($request->validated(), $specification);

        return back()->with('success', 'Product Specification updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $specification)
    {
        $this->specificationService->deleteSpecification($specification);

        return back()->with('success', 'Product Specification deleted successfully');
    }
}

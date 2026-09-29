<?php

namespace Modules\Store\Http\Requests;

use App\Enums\PricingType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'price' => request('price') ? (float) request('price') : null,
            'discount' => filter_var(request('discount'), FILTER_VALIDATE_BOOLEAN),
            'discount_price' => request('discount_price') ? (float) request('discount_price') : null,
            'unlimited_inventory' => filter_var(request('unlimited_inventory'), FILTER_VALIDATE_BOOLEAN),
            'product_category_id' => request('product_category_id') ? (int) request('product_category_id') : null,
            'product_category_child_id' => request('product_category_child_id') ? (int) request('product_category_child_id') : null,
        ]);
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'tab' => 'required|string',
        ];

        return array_merge($rules, $this->getTabSpecificRules());
    }

    /**
     * Get validation rules specific to the current tab
     */
    private function getTabSpecificRules(): array
    {
        $tab = request('tab');

        return match ($tab) {
            'basic' => $this->basicTabRules(),
            'pricing' => $this->pricingTabRules(),
            'media' => $this->mediaTabRules(),
            'seo' => $this->seoTabRules(),
            default => [],
        };
    }

    /**
     * Validation rules for the basic tab
     */
    private function basicTabRules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'description' => 'nullable|string',
            'product_category_id' => 'required|exists:product_categories,id',
            'product_category_child_id' => 'nullable|exists:product_category_children,id',
        ];
    }

    /**
     * Validation rules for the pricing tab
     */
    private function pricingTabRules(): array
    {
        $free = PricingType::FREE->value;
        $paid = PricingType::PAID->value;

        return [
            'pricing_type' => "required|string|in:$free,$paid",
            'price' => "nullable|numeric|min:1|required_if:pricing_type,$paid",
            'discount' => 'boolean',
            'discount_price' => 'nullable|numeric|min:1|lt:price|required_if:discount,true',
            'inventory' => 'nullable|integer|min:0|required_if:unlimited_inventory,false',
            'unlimited_inventory' => 'boolean',
        ];
    }

    /**
     * Validation rules for the media tab
     */
    private function mediaTabRules(): array
    {
        return [
            'thumbnail' => 'nullable|image|max:2048',
        ];
    }

    /**
     * Validation rules for the SEO tab
     */
    private function seoTabRules(): array
    {
        return [
            'meta_title' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
        ];
    }
}

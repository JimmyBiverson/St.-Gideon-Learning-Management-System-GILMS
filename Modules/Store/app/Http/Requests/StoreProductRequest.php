<?php

namespace Modules\Store\Http\Requests;

use App\Enums\PricingType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'price' => request('price') ? (float) request('price') : null,
            'discount' => filter_var(request('discount'), FILTER_VALIDATE_BOOLEAN),
            'discount_price' => request('discount_price') ? (float) request('discount_price') : null,
            'instructor_id' => (int) request('instructor_id'),
            'product_category_id' => (int) request('product_category_id'),
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
        $free = PricingType::FREE->value;
        $paid = PricingType::PAID->value;

        return [
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'description' => 'nullable|string',
            'pricing_type' => "required|string|in:$free,$paid",
            'price' => "nullable|numeric|min:1|required_if:pricing_type,$paid",
            'discount' => 'boolean',
            'discount_price' => 'nullable|numeric|min:1|lt:price|required_if:discount,true',
            'thumbnail' => 'nullable|image|max:2048',
            'instructor_id' => 'required|exists:instructors,id',
            'product_category_id' => 'required|exists:product_categories,id',
            'product_category_child_id' => 'nullable|exists:product_category_children,id',
        ];
    }
}

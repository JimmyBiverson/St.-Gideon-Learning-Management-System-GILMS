<?php

namespace Modules\Store\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductOrder;

class StoreProductOrderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $product = Product::find($this->product_id);

            if (! $product || $product->status !== 'approved' || $product->pricing_type !== 'free') {
                $validator->errors()->add('product_id', 'This product is not available for free enrollment.');

                return;
            }

            if (ProductOrder::ofProduct($product->id)->ofUser($this->user()->id)->exists()) {
                $validator->errors()->add('product_id', 'You already own this product.');
            }
        });
    }
}

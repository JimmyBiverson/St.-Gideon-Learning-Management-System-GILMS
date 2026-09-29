<?php

namespace Modules\Store\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductReviewRequest extends FormRequest
{
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
        return [
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required|string',
            'user_id' => 'required|exists:users,id|unique:product_reviews,user_id,NULL,id,product_id,'.request('product_id'),
            'product_id' => 'required|exists:products,id',
        ];
    }

    public function messages()
    {
        return [
            'user_id.unique' => 'You have already submitted a review for this product.',
        ];
    }
}

<?php

namespace Modules\Store\Http\Requests;

use App\Concerns\NormalizesCouponDatetime;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductCouponRequest extends FormRequest
{
    use NormalizesCouponDatetime;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $couponId = $this->route('coupon') ? $this->route('coupon')->id ?? '' : '';

        return [
            'product_id' => 'nullable|exists:products,id',
            'code' => 'required|string|max:50|unique:product_coupons,code,'.$couponId,
            'discount_type' => 'required|in:percentage,fixed',
            'discount' => 'required|numeric|min:0',
            'valid_from' => 'required|date',
            'valid_to' => 'required|date|after:valid_from',
            'usage_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'The coupon code is required.',
            'code.unique' => 'This coupon code already exists.',
            'discount_type.required' => 'Please select a discount type.',
            'discount.required' => 'Please specify the discount value.',
            'valid_from.required' => 'The valid from date is required.',
            'valid_to.required' => 'The valid to date is required.',
            'valid_to.after' => 'Valid to date must be after valid from date.',
        ];
    }
}

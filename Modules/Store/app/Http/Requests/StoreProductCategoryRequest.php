<?php

namespace Modules\Store\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductCategoryRequest extends FormRequest
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
            'title' => 'required|max:255|unique:product_categories',
            'icon' => 'required|string',
            'status' => 'required',
            'description' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|image|mimes:jpg,png,jpeg,svg|max:1024',
        ];
    }
}

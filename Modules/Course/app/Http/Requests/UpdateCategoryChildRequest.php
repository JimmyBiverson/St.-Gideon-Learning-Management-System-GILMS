<?php

namespace Modules\Course\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryChildRequest extends FormRequest
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
            'title' => 'required|max:255',
            'icon' => 'string|required',
            'status' => 'required',
            'keywords' => 'nullable|string|max:50',
            'description' => 'nullable|string|max:500',
            'logo' => 'nullable|image|mimes:jpg,png,jpeg,svg|max:512',
        ];
    }
}

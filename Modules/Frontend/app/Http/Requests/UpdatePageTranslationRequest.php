<?php

namespace Modules\Frontend\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePageTranslationRequest extends FormRequest
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
            'translations' => 'present|array',
            'translations.*.element_id' => 'required|string',
            'translations.*.field' => 'required|string|max:32',
            'translations.*.value' => 'nullable|string',
        ];
    }
}

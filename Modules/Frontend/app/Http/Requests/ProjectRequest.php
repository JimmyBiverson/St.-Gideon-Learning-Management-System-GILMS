<?php

namespace Modules\Frontend\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'title' => 'required|string|max:200',
            'description' => 'nullable|string|max:500',
            'favicon' => 'nullable|mimes:ico|max:512',
            'metadata' => 'nullable|array',
            'theme_color' => 'required|string',
            'theme_config' => 'required|string',
        ];
    }
}

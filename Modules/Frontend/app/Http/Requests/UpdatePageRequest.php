<?php

namespace Modules\Frontend\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Modules\Frontend\Models\ProjectPage;

class UpdatePageRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                Rule::unique(ProjectPage::class)->ignore($this->page->id),
            ],
            'type' => 'required|in:home,inner',
            'status' => 'nullable|boolean',
            'description' => 'nullable|string|max:500',
            'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
            'metadata' => 'nullable|array',
        ];
    }
}

<?php

namespace Modules\Frontend\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Modules\Frontend\Models\ProjectPage;

class StorePageRequest extends FormRequest
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
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|unique:'.ProjectPage::class,
            'url' => 'required|string|unique:'.ProjectPage::class,
            'description' => 'nullable|string',
            'type' => 'required|string|in:home,inner',
        ];
    }
}

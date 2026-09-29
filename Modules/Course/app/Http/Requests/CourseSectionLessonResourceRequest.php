<?php

namespace Modules\Course\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CourseSectionLessonResourceRequest extends FormRequest
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
        $rules = [
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255|in:document,image,video,zip,link',
            'resource' => 'required_if:type,link|nullable|string',
        ];

        if ($this->isMethod('post')) {
            $rules['section_lesson_id'] = 'required|exists:section_lessons,id';
            $rules['resource_url'] = 'required_unless:type,link|nullable|string';
        } else {
            $rules['resource_url'] = 'nullable|string';
        }

        return $rules;
    }
}

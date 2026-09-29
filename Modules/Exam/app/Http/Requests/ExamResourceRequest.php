<?php

namespace Modules\Exam\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ExamResourceRequest extends FormRequest
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
            $rules['exam_id'] = 'required|exists:exams,id';
            $rules['resource_url'] = 'required_unless:type,link|nullable|string';
        } else {
            $rules['resource_url'] = 'nullable|string';
        }

        return $rules;
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Instructor;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInstructorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && ($this->user()->role === 'admin'
            || Instructor::whereKey($this->route('id'))
                ->where('user_id', $this->user()->id)->exists());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'skills' => 'required',
            'biography' => 'required|string|min:50|max:5000',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:3072',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'skills.required' => 'Please specify your skills',
            'skills.json' => 'Skills must be in a valid format',
        ];
    }
}

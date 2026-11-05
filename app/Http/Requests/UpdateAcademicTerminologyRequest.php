<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAcademicTerminologyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'singular' => ['required', 'string', 'max:40', 'regex:/^[\pL\pN][\pL\pN\s\-]*$/u'],
            'plural' => ['required', 'string', 'max:40', 'different:singular', 'regex:/^[\pL\pN][\pL\pN\s\-]*$/u'],
        ];
    }
}

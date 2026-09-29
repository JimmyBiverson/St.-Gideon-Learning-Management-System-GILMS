<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TogglePluginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'enabled' => ['required', 'boolean'],
            'module' => [
                'required',
                'string',
                Rule::notIn(config('plugins.core_modules', [])),
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'module' => $this->route('module'),
        ]);
    }
}

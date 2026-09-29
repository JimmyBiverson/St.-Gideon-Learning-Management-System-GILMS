<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InstallPluginRequest extends FormRequest
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
            'plugin_file_url' => ['required', 'string', 'max:2048'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'plugin_file_url.required' => 'Please upload a plugin ZIP file first.',
        ];
    }
}

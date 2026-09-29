<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGoogleAnalyticsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Authorization will be handled by the middleware in the routes
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
            'analytics_enabled' => 'required|boolean',
            'measurement_id' => 'nullable|string|max:255|regex:/^G-[A-Z0-9]+$/|required_if:analytics_enabled,true|required_if:mp_enabled,true',
            'mp_enabled' => 'required|boolean',
            'api_secret' => 'nullable|string|required_if:mp_enabled,true',
            'debug_mode' => 'required|boolean',
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
            'measurement_id.regex' => 'The Measurement ID must look like G-XXXXXXXXXX.',
            'measurement_id.required_if' => 'Measurement ID is required when Analytics or the Measurement Protocol is enabled.',
            'api_secret.required_if' => 'API Secret is required when the Measurement Protocol is enabled.',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMetaPixelRequest extends FormRequest
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
            'pixel_enabled' => 'required|boolean',
            'pixel_id' => 'nullable|string|max:255|required_if:pixel_enabled,true|required_if:capi_enabled,true',
            'capi_enabled' => 'required|boolean',
            'access_token' => 'nullable|string|required_if:capi_enabled,true',
            'test_event_code' => 'nullable|string|max:255',
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
            'pixel_id.required_if' => 'Pixel ID is required when the Pixel or Conversions API is enabled.',
            'access_token.required_if' => 'Conversions API access token is required when the Conversions API is enabled.',
        ];
    }
}

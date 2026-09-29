<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStorageRequest extends FormRequest
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
            'storage_driver' => 'required|in:local,s3,r2,bunny',

            'aws_access_key_id' => 'required_if:storage_driver,s3|nullable|string|max:255',
            'aws_secret_access_key' => 'required_if:storage_driver,s3|nullable|string|max:255',
            'aws_default_region' => 'required_if:storage_driver,s3|nullable|string|max:255',
            'aws_bucket' => 'required_if:storage_driver,s3|nullable|string|max:255',

            'r2_access_key_id' => 'required_if:storage_driver,r2|nullable|string|max:255',
            'r2_secret_access_key' => 'required_if:storage_driver,r2|nullable|string|max:255',
            'r2_bucket' => 'required_if:storage_driver,r2|nullable|string|max:255',
            'r2_endpoint' => 'required_if:storage_driver,r2|nullable|url|max:255',
            // Optional — only needed for images/documents/course previews to
            // display (they use it directly as their URL). Lesson videos on
            // R2 never use it; they're always served via a signed URL
            // generated per request (see LessonVideoUrlResolver).
            'r2_public_url' => 'nullable|url|max:255',
            'r2_region' => 'nullable|string|max:255',

            // Bunny only ever hosts lesson videos — it has no generic file
            // API for images/documents/previews. When it's the selected
            // driver, everything except lesson videos silently falls back
            // to the local disk (see AppConfig middleware).
            'bunny_library_id' => 'required_if:storage_driver,bunny|nullable|string|max:255',
            'bunny_api_key' => 'required_if:storage_driver,bunny|nullable|string|max:255',
            'bunny_token_auth_key' => 'required_if:storage_driver,bunny|nullable|string|max:255',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ChunkUploadRequest extends FormRequest
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
     * The chunk bytes themselves are sent as the raw request body (not a
     * multipart file field), so PHP's small default `upload_max_filesize`
     * never applies to them — only the much larger `post_max_size` does,
     * same as before this endpoint dropped base64 encoding. `part_number`/
     * `filename`/`mimetype` therefore travel as query-string parameters
     * instead of body fields.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'part_number' => 'required|integer|min:1',
            'filename' => 'required|string',
            'mimetype' => 'required|string',
        ];
    }
}

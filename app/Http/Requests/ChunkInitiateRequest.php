<?php

namespace App\Http\Requests;

use App\Rules\RejectsExecutableExtension;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ChunkInitiateRequest extends FormRequest
{
    protected $maxSize;

    protected $mimeTypes;

    protected $extensions;

    public function __construct()
    {
        parent::__construct();

        $fileMaxSizes = [
            'audio' => 102400, // 100MB
            'video' => 1048576, // 1GB
            'lesson_video' => 1048576, // 1GB
            'document' => 20480,    // 20MB
            'image' => 2048,        // 2MB
            'zip' => 262144, // 256MB
            'update' => 524288, // 512MB
            // 'assets' => 262144, // 256MB
        ];
        $fileMimeTypes = [
            'audio' => ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp3', 'audio/x-wav'],
            'video' => ['video/mp4', 'video/avi', 'video/mpeg', 'video/ogg', 'video/webm', 'video/3gpp'],
            'lesson_video' => ['video/mp4', 'video/avi', 'video/mpeg', 'video/ogg', 'video/webm', 'video/3gpp'],
            'document' => ['text/plain', 'application/pdf'],
            'image' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            'zip' => ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed'],
            'update' => ['application/zip', 'application/x-zip-compressed'],
            // 'assets' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/avi', 'video/mpeg', 'video/ogg', 'video/webm', 'video/3gpp', 'text/plain', 'application/pdf', 'application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed'],
        ];
        // The extension of the (attacker-controlled) `filename` field ends up
        // in the stored file's path, so it must be constrained per filetype
        // rather than trusted as-is — otherwise a request can declare
        // filetype=document/mimetype=application/pdf while filename=shell.php
        // and get a `.php` file written into public storage.
        $fileExtensions = [
            'audio' => ['mp3', 'wav', 'ogg', 'weba', 'm4a'],
            'video' => ['mp4', 'avi', 'mpeg', 'mpg', 'ogv', 'webm', '3gp'],
            'lesson_video' => ['mp4', 'avi', 'mpeg', 'mpg', 'ogv', 'webm', '3gp'],
            'document' => ['txt', 'pdf'],
            'image' => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            'zip' => ['zip', 'rar'],
            // ZipArchive cannot read RAR, and an update package is extracted
            // over the live application — so this bucket is .zip only.
            'update' => ['zip'],
        ];

        $this->maxSize = $fileMaxSizes[request('filetype')] ?? 2048;
        $this->mimeTypes = $fileMimeTypes[request('filetype')] ?? [];
        $this->extensions = $fileExtensions[request('filetype')] ?? [];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * Application update packages are staged on the private disk and are only
     * ever applied from the admin-gated maintenance area, so only an admin may
     * start one — otherwise any authenticated student could park a 512MB file
     * in the site's storage.
     */
    public function authorize(): bool
    {
        if (request('filetype') === 'update') {
            return Auth::check() && isAdmin();
        }

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
            'filename' => [
                'required',
                'string',
                'max:255',
                new RejectsExecutableExtension,
                function (string $attribute, $value, \Closure $fail) {
                    $extension = strtolower(pathinfo((string) $value, PATHINFO_EXTENSION));

                    if (! in_array($extension, $this->extensions, true)) {
                        $fail('The :attribute extension does not match the selected file type.');
                    }
                },
            ],
            'filesize' => [
                'required',
                'numeric',
                'min:1',
                'max:'.$this->maxSize,
            ],
            'mimetype' => [
                'required',
                'string',
                'in:'.implode(',', $this->mimeTypes),
            ],
            'filetype' => 'required|string|in:audio,video,lesson_video,document,image,zip,update',
            'total_chunks' => 'required|integer|min:1',
            'course_id' => 'nullable|exists:courses,id',
            'course_section_id' => 'nullable|exists:course_sections,id',
        ];

        return $rules;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        $maxSizeMB = round(($this->maxSize / 1024), 1);

        return [
            'filesize.max' => 'The filesize may not be greater than '.$maxSizeMB.' MB.',
            'mimetype.in' => 'The filetype must be '.implode(', ', $this->mimeTypes),
        ];
    }
}

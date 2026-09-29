<?php

namespace Modules\Course\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCourseForumReplyRequest extends FormRequest
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
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'course_forum_id' => 'required|exists:course_forums,id',
            'course_forum_user_id' => 'required|exists:users,id',
        ];
    }
}

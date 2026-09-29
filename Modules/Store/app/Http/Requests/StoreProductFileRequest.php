<?php

namespace Modules\Store\Http\Requests;

use App\Rules\RejectsExecutableExtension;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductFileRequest extends FormRequest
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
            'product_id' => 'required|exists:products,id',
            'files' => 'required|array|min:1|max:5',
            'files.*' => ['required', 'file', 'max:51200', new RejectsExecutableExtension],
        ];
    }
}

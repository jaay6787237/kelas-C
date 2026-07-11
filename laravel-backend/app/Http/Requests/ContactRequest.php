<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:20'],
            'instagram' => ['required', 'string', 'max:100'],
            'location' => ['required', 'string'],
            'google_maps' => ['required', 'string'], // Raw iframe embed code or link
        ];
    }
}

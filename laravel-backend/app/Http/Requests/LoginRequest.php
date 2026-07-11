<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required_without:email', 'string'],
            'email' => ['required_without:username', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'Password admin wajib diisi.',
            'password.min' => 'Password minimal terdiri dari 6 karakter.',
        ];
    }
}

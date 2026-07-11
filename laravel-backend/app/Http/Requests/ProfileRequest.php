<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'class_name' => ['required', 'string', 'max:255'],
            'study_program' => ['required', 'string', 'max:255'],
            'faculty' => ['required', 'string', 'max:255'],
            'university' => ['required', 'string', 'max:255'],
            'academic_year' => ['required', 'string', 'max:4'],
            'total_students' => ['required', 'integer', 'min:1'],
            'class_leader' => ['required', 'string', 'max:255'],
            'homeroom_lecturer' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'], // Max 5MB
        ];
    }
}

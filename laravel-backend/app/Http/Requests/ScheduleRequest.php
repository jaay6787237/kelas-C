<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_name' => ['required', 'string', 'max:255'],
            'lecturer' => ['required', 'string', 'max:255'],
            'day' => ['required', 'string', 'in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'classroom' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'in:Aktif,Selesai,Batal,Pindah Jadwal'],
        ];
    }
}

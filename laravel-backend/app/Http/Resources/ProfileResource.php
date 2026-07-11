<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $logoUrl = $this->logo;
        if ($this->logo && !filter_var($this->logo, FILTER_VALIDATE_URL)) {
            $logoUrl = Storage::url($this->logo);
        }

        return [
            'class_name' => $this->class_name,
            'study_program' => $this->study_program,
            'faculty' => $this->faculty,
            'university' => $this->university,
            'academic_year' => $this->academic_year,
            'total_students' => $this->total_students,
            'class_leader' => $this->class_leader,
            'homeroom_lecturer' => $this->homeroom_lecturer,
            'description' => $this->description,
            'logo' => $logoUrl,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'course_name' => $this->course_name,
            'lecturer' => $this->lecturer,
            'day' => $this->day,
            'start_time' => substr($this->start_time, 0, 5), // HH:MM
            'end_time' => substr($this->end_time, 0, 5),     // HH:MM
            'classroom' => $this->classroom,
            'status' => $this->status,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}

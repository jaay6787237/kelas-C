<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassProfile extends Model
{
    use HasFactory;

    protected $table = 'class_profiles';

    protected $fillable = [
        'class_name',
        'study_program',
        'faculty',
        'university',
        'academic_year',
        'total_students',
        'class_leader',
        'homeroom_lecturer',
        'description',
        'logo',
    ];

    protected $casts = [
        'total_students' => 'integer',
    ];
}

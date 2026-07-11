<?php

namespace Database\Seeders;

use App\Models\ClassProfile;
use Illuminate\Database\Seeder;

class ClassProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClassProfile::updateOrCreate(
            ['class_name' => 'Sistem Informasi Kelas C'],
            [
                'study_program' => 'Sistem Informasi',
                'faculty' => 'Fakultas Sains dan Teknologi',
                'university' => 'Universitas Islam Negeri Raden Intan Lampung',
                'academic_year' => '2025',
                'total_students' => 42,
                'class_leader' => 'Lendra',
                'homeroom_lecturer' => 'Dr. Irwan Santoso',
                'description' => 'Program Studi pelopor yang mengintegrasikan inovasi teknologi, kecerdasan buatan, dan kearifan profesional untuk kemajuan bisnis global.',
                'logo' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrd-cu5BX7sY1fTiPnJdYYxrXs4qgWmfCzVlsrcjd3oswM2rLMM9sSIHV6H8tKpwHEoQR5eGH4uGtKlQLUKX3RhRz61OTJARh6Lpx8beR4XL1h1QNQKxZNiTxi_QsWmNMRa2zgUIhS4Ep-mhWNj4MsFu6zW3rqPhF-dhDSsikeCGSyVoVGyu3Asj4UZgp-m-wS-b33m35V0XuIdRzZ-GwDdI8nGd1QezUJm02Aie5KOJyUy24FwMER',
            ]
        );
    }
}

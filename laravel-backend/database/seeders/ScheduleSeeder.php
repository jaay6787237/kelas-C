<?php

namespace Database\Seeders;

use App\Models\Schedule;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = [
            [
                'course_name' => 'Analisis & Perancangan Sistem',
                'lecturer' => 'Dr. Irwan Santoso',
                'day' => 'Senin',
                'start_time' => '08:00',
                'end_time' => '10:30',
                'classroom' => 'Lab Komputer 3',
                'status' => 'Aktif',
            ],
            [
                'course_name' => 'Pemrograman Web Lanjut',
                'lecturer' => 'Hendra Wijaya, M.T.',
                'day' => 'Senin',
                'start_time' => '11:00',
                'end_time' => '13:30',
                'classroom' => 'Lab Komputer 5',
                'status' => 'Aktif',
            ],
            [
                'course_name' => 'Sistem Manajemen Basis Data',
                'lecturer' => 'Dr. Irwan Santoso',
                'day' => 'Selasa',
                'start_time' => '08:00',
                'end_time' => '10:30',
                'classroom' => 'Ruang Teori A-102',
                'status' => 'Aktif',
            ],
            [
                'course_name' => 'Etika Profesi & Keamanan Informasi',
                'lecturer' => 'Prof. Amalia Sari',
                'day' => 'Rabu',
                'start_time' => '10:00',
                'end_time' => '12:30',
                'classroom' => 'Ruang Teori B-204',
                'status' => 'Aktif',
            ],
            [
                'course_name' => 'Arsitektur Enterprise',
                'lecturer' => 'Dr. Irwan Santoso',
                'day' => 'Kamis',
                'start_time' => '13:00',
                'end_time' => '15:30',
                'classroom' => 'Ruang Teori A-103',
                'status' => 'Aktif',
            ],
            [
                'course_name' => 'Data Mining & Business Intelligence',
                'lecturer' => 'Diana Rahmawati, Ph.D.',
                'day' => 'Jumat',
                'start_time' => '09:00',
                'end_time' => '11:30',
                'classroom' => 'Lab Riset Data',
                'status' => 'Aktif',
            ],
        ];

        foreach ($schedules as $sch) {
            Schedule::create($sch);
        }
    }
}

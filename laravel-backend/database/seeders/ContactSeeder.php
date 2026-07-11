<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::updateOrCreate(
            ['email' => 'admin@si-hexagon.ac.id'],
            [
                'whatsapp' => '081234567890',
                'instagram' => 'si_hexagon_uin',
                'location' => 'Fakultas Sains dan Teknologi Tower 1 UIN Raden Intan Lampung',
                'google_maps' => 'https://maps.google.com/maps?q=Fakultas%20Sains%20dan%20Teknologi%20UIN%20Raden%20Intan%20Lampung&t=&z=16&ie=UTF8&iwloc=&output=embed',
            ]
        );
    }
}

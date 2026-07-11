<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GalleryCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Akademik',
            'Kegiatan',
            'Bimbingan',
            'Organisasi',
            'Pengabdian',
        ];

        foreach ($categories as $cat) {
            GalleryCategory::updateOrCreate(
                ['name' => $cat],
                ['slug' => Str::slug($cat)]
            );
        }
    }
}

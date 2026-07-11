<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = GalleryCategory::all()->pluck('id', 'name')->toArray();

        $items = [
            // Akademik
            [
                'category' => 'Akademik',
                'title' => 'Kolaborasi Proyek Pengembangan Sistem',
                'description' => 'Mahasiswa saling berdiskusi mengenai arsitektur sistem informasi dalam kuliah laboratorium terintegrasi.',
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLuud095ESdIwNwbl2GQRwEXULa8WfFG5b12sbuszoh7iDAgBVqMzfPEhtX-JnPCcPgdjzojzecT3Bb9PuKDDnnB3NDVQQsShC3lfbnD9X8-3UTd6attHh9hvyZIR5Dsx67rLvonxXLkDK5A8xc4VBddremdE9h6xq85wW50JnvYhE8TBJBxUEndWyM2uidg3K7CP6yuSWcpqoyFXIEQ7QQwUmaAsTx4FPSCh46ULHt-zDi7P8B2Rj',
                'taken_at' => '2024-09-28',
            ],
            [
                'category' => 'Akademik',
                'title' => 'Praktikum Pemrograman Web Lanjut',
                'description' => 'Sesi hands-on coding membangun API REST menggunakan PHP Laravel 12 dan React JS.',
                'image' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
                'taken_at' => '2024-10-05',
            ],
            [
                'category' => 'Akademik',
                'title' => 'Ujian Akhir Semester Teori & Praktik',
                'description' => 'Pelaksanaan ujian akhir semester mata kuliah Analisis & Perancangan Sistem dengan presentasi aplikasi.',
                'image' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
                'taken_at' => '2024-06-20',
            ],
            // Kegiatan
            [
                'category' => 'Kegiatan',
                'title' => 'Sidang Yudisium & Graduation Day',
                'description' => 'Momen perayaan wisuda kelulusan kakak tingkat angkatan Sistem Informasi yang berlangsung khidmat.',
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-mSFWNoBf9b4rZaJV59a-_D5PkEQd65pSBcp5J0didJXvjpv3qyERBOjm5ow1NUsTqNEGEGR0qDQyoXshGwuNlEwR5r0HxObZIemSkIN7Bt_y2nDvzi3wllOLGoMS25pdunIkLnkaIcjVK0udHyLjkzZ46_0-1m6iWhUPwED7LE4hPvRGZ9O5P1QIU-BFG03IS6-Z2HEJ-B-pdNSJPczWgJvN-dXw4UUs2V-TAy6vzpGGwgc1rfrI',
                'taken_at' => '2024-10-24',
            ],
            [
                'category' => 'Kegiatan',
                'title' => 'Studi Ekskursi Industri TI',
                'description' => 'Kunjungan industri mahasiswa Sistem Informasi ke Data Center dan Inkubator Bisnis Digital.',
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
                'taken_at' => '2024-08-15',
            ],
            [
                'category' => 'Kegiatan',
                'title' => 'Makrab SI: Inisiasi Keakraban',
                'description' => 'Malam keakraban angkatan baru Sistem Informasi untuk membangun solidaritas tiada batas.',
                'image' => 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
                'taken_at' => '2024-09-02',
            ],
            // Bimbingan
            [
                'category' => 'Bimbingan',
                'title' => 'Diskusi Interaktif Dosen dan Mahasiswa',
                'description' => 'Konsultasi bimbingan akademik bersama Dr. Irwan Santoso di ruang riset data science.',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
                'taken_at' => '2024-10-10',
            ],
            [
                'category' => 'Bimbingan',
                'title' => 'Bimbingan Proposal Skripsi & Capstone',
                'description' => 'Sesi review draft penelitian proposal mahasiswa semester akhir bersama dewan pembimbing.',
                'image' => 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
                'taken_at' => '2024-10-18',
            ],
            [
                'category' => 'Bimbingan',
                'title' => 'Konseling Karir & Magang MBKM',
                'description' => 'Dosen Pembina memberikan arahan persiapan Curriculum Vitae (CV) untuk magang BUMN.',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
                'taken_at' => '2024-10-22',
            ],
            // Organisasi
            [
                'category' => 'Organisasi',
                'title' => 'Himpunan Mahasiswa Sistem Informasi (HIMA-SI)',
                'description' => 'Rapat koordinasi pelaksanaan kompetisi esai teknologi nasional tahun 2024.',
                'image' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
                'taken_at' => '2024-10-02',
            ],
            [
                'category' => 'Organisasi',
                'title' => 'LDK Organisasi Kepemimpinan Mahasiswa',
                'description' => 'Latihan dasar kepemimpinan pengurus baru HIMA SI di balai pelatihan kampus.',
                'image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
                'taken_at' => '2024-05-12',
            ],
            [
                'category' => 'Organisasi',
                'title' => 'Musyawarah Besar Himpunan (MUBES)',
                'description' => 'Laporan pertanggungjawaban kepengurusan dan pemilihan ketua himpunan periode baru.',
                'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
                'taken_at' => '2024-11-10',
            ],
            // Pengabdian
            [
                'category' => 'Pengabdian',
                'title' => 'Sosialisasi Literasi Digital Desa',
                'description' => 'Mahasiswa mengedukasi ibu-ibu PKK desa wisata mengenai e-commerce dan keamanan internet.',
                'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
                'taken_at' => '2024-07-20',
            ],
            [
                'category' => 'Pengabdian',
                'title' => 'Digitalisasi Administrasi RT/RW',
                'description' => 'Pemasangan dan pelatihan sistem informasi kependudukan warga berbasis web di kelurahan.',
                'image' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
                'taken_at' => '2024-08-01',
            ],
            [
                'category' => 'Pengabdian',
                'title' => 'Aksi Hijau: SI Peduli Lingkungan',
                'description' => 'Penanaman mangrove di pesisir pantai Lampung sebagai aksi tanggap perubahan iklim.',
                'image' => 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
                'taken_at' => '2024-06-05',
            ],
        ];

        foreach ($items as $item) {
            $catId = $categories[$item['category']] ?? null;
            if ($catId) {
                Gallery::create([
                    'category_id' => $catId,
                    'title' => $item['title'],
                    'description' => $item['description'],
                    'image' => $item['image'],
                    'taken_at' => $item['taken_at'],
                ]);
            }
        }
    }
}

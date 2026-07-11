import { Announcement, Schedule, Student, GalleryItem, ActivityLog, ClassConfig } from './types';
import defaultLogo from './assets/images/refined_s_hexagon_logo_1783309336153.jpg';

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Pendaftaran Yudisium & Wisuda Gelombang IV',
    content: 'Bagi mahasiswa tingkat akhir yang telah menyelesaikan sidang skripsi, segera melakukan pendaftaran yudisium melalui sistem portal akademik paling lambat akhir bulan ini. Harap persiapkan dokumen pendukung lengkap seperti TOEFL, bebas pustaka, dan transkrip nilai resmi.',
    category: 'Akademik',
    date: '24 Oktober 2024',
    isPrioritas: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-mSFWNoBf9b4rZaJV59a-_D5PkEQd65pSBcp5J0didJXvjpv3qyERBOjm5ow1NUsTqNEGEGR0qDQyoXshGwuNlEwR5r0HxObZIemSkIN7Bt_y2nDvzi3wllOLGoMS25pdunIkLnkaIcjVK0udHyLjkzZ46_0-1m6iWhUPwED7LE4hPvRGZ9O5P1QIU-BFG03IS6-Z2HEJ-B-pdNSJPczWgJvN-dXw4UUs2V-TAy6vzpGGwgc1rfrI',
    author: 'Akademik Sekretariat',
    views: 185
  },
  {
    id: '2',
    title: 'Workshop Modern Web Development',
    content: 'Bergabunglah dalam workshop intensif mengupas tuntas framework Tailwind CSS dan React. Terbuka untuk seluruh mahasiswa Sistem Informasi angkatan 2021-2023. Event ini menghadirkan praktisi handal dari industri teknologi terkemuka.',
    category: 'Event',
    date: '22 Okt 2024',
    icon: 'campaign',
    author: 'HIMA SI',
    views: 142
  },
  {
    id: '3',
    title: 'Beasiswa Prestasi Akademik 2025',
    content: 'Pembukaan pendaftaran beasiswa prestasi untuk semester genap. Persiapkan transkrip nilai dan sertifikat pendukung organisasi Anda sekarang juga. Terbuka untuk IPK minimal 3.50 dan aktif berorganisasi.',
    category: 'Beasiswa',
    date: '20 Okt 2024',
    icon: 'school',
    author: 'Kemahasiswaan',
    views: 310
  },
  {
    id: '4',
    title: 'Update Kurikulum MBKM Semester Ganjil',
    content: 'Informasi terbaru mengenai konversi SKS untuk program Magang Merdeka dan Studi Independen. Pastikan Anda telah berkonsultasi dengan Dosen Pembimbing Akademik agar kualifikasi mata kuliah pilihan tercapai.',
    category: 'Akademik',
    date: '18 Okt 2024',
    icon: 'update',
    author: 'Kaprodi SI',
    views: 98
  },
  {
    id: '5',
    title: 'Pemeliharaan Server Portal Mahasiswa',
    content: 'Layanan pengisian KRS dan cetak KHS akan mengalami downtime singkat pada hari Sabtu mendatang pukul 22.00 WIB untuk peningkatan keamanan sistem data center. Harap selesaikan administrasi sebelum jadwal pemeliharaan.',
    category: 'Akademik',
    date: '15 Okt 2024',
    icon: 'emergency',
    author: 'Puskom TI',
    views: 74
  }
];

export const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: 's1',
    day: 'Senin',
    subject: 'Analisis & Perancangan Sistem',
    room: 'Lab Komputer 3',
    lecturer: 'Dr. Irwan Santoso',
    time: '08:00 - 10:30',
    type: 'Teori'
  },
  {
    id: 's2',
    day: 'Senin',
    subject: 'Pemrograman Web Lanjut',
    room: 'Lab Komputer 5',
    lecturer: 'Hendra Wijaya, M.T.',
    time: '11:00 - 13:30',
    type: 'Praktikum'
  },
  {
    id: 's3',
    day: 'Selasa',
    subject: 'Sistem Manajemen Basis Data',
    room: 'Ruang Teori A-102',
    lecturer: 'Dr. Irwan Santoso',
    time: '08:00 - 10:30',
    type: 'Teori'
  },
  {
    id: 's4',
    day: 'Rabu',
    subject: 'Etika Profesi & Keamanan Informasi',
    room: 'Ruang Teori B-204',
    lecturer: 'Prof. Amalia Sari',
    time: '10:00 - 12:30',
    type: 'Teori'
  },
  {
    id: 's5',
    day: 'Kamis',
    subject: 'Arsitektur Enterprise',
    room: 'Ruang Teori A-103',
    lecturer: 'Dr. Irwan Santoso',
    time: '13:00 - 15:30',
    type: 'Teori'
  },
  {
    id: 's6',
    day: 'Jumat',
    subject: 'Data Mining & Business Intelligence',
    room: 'Lab Riset Data',
    lecturer: 'Diana Rahmawati, Ph.D.',
    time: '09:00 - 11:30',
    type: 'Praktikum'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st1',
    nim: '240901001',
    name: 'Lendra',
    role: 'Ketua Kelas',
    status: 'Aktif',
    email: 'lendra@si-hexagon.ac.id',
    phone: '0812-3456-7890',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrd-cu5BX7sY1fTiPnJdYYxrXs4qgWmfCzVlsrcjd3oswM2rLMM9sSIHV6H8tKpwHEoQR5eGH4uGtKlQLUKX3RhRz61OTJARh6Lpx8beR4XL1h1QNQKxZNiTxi_QsWmNMRa2zgUIhS4Ep-mhWNj4MsFu6zW3rqPhF-dhDSsikeCGSyVoVGyu3Asj4UZgp-m-wS-b33m35V0XuIdRzZ-GwDdI8nGd1QezUJm02Aie5KOJyUy24FwMER'
  },
  {
    id: 'st2',
    nim: '240901002',
    name: 'Siti Aminah',
    role: 'Sekretaris',
    status: 'Aktif',
    email: 'siti.aminah@si-hexagon.ac.id',
    phone: '0812-9876-5432',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 'st3',
    nim: '240901003',
    name: 'Budi Santoso',
    role: 'Bendahara',
    status: 'Aktif',
    email: 'budi.santoso@si-hexagon.ac.id',
    phone: '0813-1111-2222',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'st4',
    nim: '240901004',
    name: 'Clara Shinta',
    role: 'Divisi Hubungan Masyarakat',
    status: 'Aktif',
    email: 'clara.shinta@si-hexagon.ac.id',
    phone: '0813-4444-5555',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  {
    id: 'st5',
    nim: '240901005',
    name: 'Dwi Prasetyo',
    role: 'Divisi Pendidikan & Riset',
    status: 'Aktif',
    email: 'dwi.pras@si-hexagon.ac.id',
    phone: '0857-8888-9999',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Kolaborasi Proyek Pengembangan Sistem',
    description: 'Mahasiswa saling berdiskusi mengenai arsitektur sistem informasi dalam kuliah laboratorium terintegrasi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLuud095ESdIwNwbl2GQRwEXULa8WfFG5b12sbuszoh7iDAgBVqMzfPEhtX-JnPCcPgdjzojzecT3Bb9PuKDDnnB3NDVQQsShC3lfbnD9X8-3UTd6attHh9hvyZIR5Dsx67rLvonxXLkDK5A8xc4VBddremdE9h6xq85wW50JnvYhE8TBJBxUEndWyM2uidg3K7CP6yuSWcpqoyFXIEQ7QQwUmaAsTx4FPSCh46ULHt-zDi7P8B2Rj',
    date: '28 September 2024',
    category: 'Akademik'
  },
  {
    id: 'g2',
    title: 'Sidang Yudisium & Graduation Day',
    description: 'Momen perayaan wisuda kelulusan kakak tingkat angkatan Sistem Informasi yang berlangsung khidmat.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-mSFWNoBf9b4rZaJV59a-_D5PkEQd65pSBcp5J0didJXvjpv3qyERBOjm5ow1NUsTqNEGEGR0qDQyoXshGwuNlEwR5r0HxObZIemSkIN7Bt_y2nDvzi3wllOLGoMS25pdunIkLnkaIcjVK0udHyLjkzZ46_0-1m6iWhUPwED7LE4hPvRGZ9O5P1QIU-BFG03IS6-Z2HEJ-B-pdNSJPczWgJvN-dXw4UUs2V-TAy6vzpGGwgc1rfrI',
    date: '24 Oktober 2024',
    category: 'Kegiatan'
  },
  {
    id: 'g3',
    title: 'Diskusi Interaktif Dosen dan Mahasiswa',
    description: 'Konsultasi bimbingan akademik bersama Dr. Irwan Santoso di ruang riset data science.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    date: '10 Oktober 2024',
    category: 'Bimbingan'
  },
  {
    id: 'g4',
    title: 'Himpunan Mahasiswa Sistem Informasi (HIMA-SI)',
    description: 'Rapat koordinasi pelaksanaan kompetisi esai teknologi nasional tahun 2024.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    date: '02 Oktober 2024',
    category: 'Organisasi'
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'l1',
    text: 'Jadwal Kuliah Baru Semester Ganjil Telah Diterbitkan',
    time: '2 jam yang lalu',
    author: 'Admin',
    type: 'primary'
  },
  {
    id: 'l2',
    text: 'Pembaruan Galeri Foto: Sesi Dokumentasi Kampus 2024',
    time: '5 jam yang lalu',
    author: 'Tim Konten',
    type: 'secondary'
  },
  {
    id: 'l3',
    text: 'Pemeliharaan Server Database Akademik Selesai Dilakukan',
    time: '1 hari yang lalu',
    author: 'Sistem',
    type: 'warning'
  }
];

export const CLASS_CONFIG: ClassConfig = {
  className: 'Sistem Informasi Kelas C',
  academicYear: '2025',
  accreditation: 'Unggul',
  university: 'Universitas Islam Negeri Raden Intan Lampung',
  faculty: 'Fakultas Sains dan Teknologi',
  major: 'Sistem Informasi',
  vision: 'Menjadi program studi pelopor yang mengintegrasikan inovasi teknologi, kecerdasan buatan, dan kearifan profesional untuk kemajuan bisnis global.',
  mission: [
    'Menyelenggarakan pendidikan sistem informasi berkualitas dunia dengan penekanan pada rekayasa data dan manajemen cerdas.',
    'Menghasilkan penelitian inovatif berstandar internasional yang bermanfaat bagi perkembangan industri teknologi.',
    'Melakukan pengabdian masyarakat guna mengimplementasikan solusi digital yang berdampak nyata.',
    'Membina kolaborasi industri yang erat guna mempersiapkan lulusan langsung terjun secara kompetitif.'
  ],
  logoUrl: defaultLogo
};

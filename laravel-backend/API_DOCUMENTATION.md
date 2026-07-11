# Dokumentasi REST API - Website Kelas Sistem Informasi

Dokumentasi ini mencakup seluruh REST API yang digunakan untuk mengelola data jadwal perkuliahan, dokumentasi kegiatan galeri, kontak kelas, profil kelas, serta manajemen otentikasi admin kelas.

---

## 📋 Struktur Respon JSON Konsisten

Seluruh endpoint pada backend ini mengembalikan respon dengan format JSON yang seragam.

### 1. Respon Sukses (200 OK / 201 Created)
```json
{
    "success": true,
    "message": "Pesan deskriptif sukses",
    "data": {
        // Objek atau array data utama
    }
}
```

### 2. Respon Error Validasi (422 Unprocessable Entity)
```json
{
    "success": false,
    "message": "Validation Error",
    "errors": {
        "nama_field": [
            "Pesan error detail validasi pertama.",
            "Pesan error detail validasi kedua."
        ]
    }
}
```

### 3. Respon Error Umum (401 Unauthorized / 404 Not Found)
```json
{
    "success": false,
    "message": "Deskripsi kegagalan atau pesan error."
}
```

---

## 🔒 Otentikasi Admin (Laravel Sanctum)

Semua endpoint bertanda **[Perlu Login]** membutuhkan header otentikasi berikut:
```text
Authorization: Bearer <token_anda>
Accept: application/json
```

### 1. Login Admin
* **Method & URL**: `POST /api/login`
* **Request Body**:
  ```json
  {
      "username": "admin", // atau menggunakan "email"
      "password": "password123"
  }
  ```
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Login admin berhasil.",
      "data": {
          "user": {
              "id": 1,
              "name": "Administrator Kelas",
              "username": "admin",
              "email": "admin@si-hexagon.ac.id"
          },
          "token": "1|qhZ7vS...",
          "token_type": "Bearer"
      }
  }
  ```

### 2. Logout Admin **[Perlu Login]**
* **Method & URL**: `POST /api/logout`
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Logout berhasil dilakukan.",
      "data": null
  }
  ```

### 3. Ambil Detail Admin Aktif **[Perlu Login]**
* **Method & URL**: `GET /api/me`
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Data admin berhasil diambil.",
      "data": {
          "id": 1,
          "name": "Administrator Kelas",
          "username": "admin",
          "email": "admin@si-hexagon.ac.id"
      }
  }
  ```

### 4. Perbarui Profil Admin **[Perlu Login]**
* **Method & URL**: `PUT /api/me/profile`
* **Request Body**:
  ```json
  {
      "name": "Lendra Pratama",
      "email": "lendra@si-hexagon.ac.id",
      "username": "lendra"
  }
  ```

### 5. Ganti Password Admin **[Perlu Login]**
* **Method & URL**: `PUT /api/me/password`
* **Request Body**:
  ```json
  {
      "current_password": "password123",
      "new_password": "passwordBaru123",
      "new_password_confirmation": "passwordBaru123"
  }
  ```

---

## 📊 Dashboard Metrics **[Perlu Login]**

Mendapatkan ringkasan metrik data kelas untuk visualisasi grafik atau counter kartu di dashboard.

* **Method & URL**: `GET /api/dashboard`
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Metrik dashboard berhasil diambil.",
      "data": {
          "total_gallery": 20,
          "total_schedule": 8,
          "total_category": 5
      }
  }
  ```

---

## 📅 Modul Jadwal Perkuliahan

### 1. Tampilkan List Jadwal (Mendukung Search, Filter, Sort, Pagination)
* **Method & URL**: `GET /api/schedules`
* **Parameter Query (Opsional)**:
  * `page`: Halaman ke- (Default: `1`)
  * `per_page`: Jumlah baris data (Default: `10`)
  * `search`: Pencarian nama mata kuliah atau dosen (Contoh: `basis`)
  * `day`: Filter hari kuliah (Pilihan: `Senin`, `Selasa`, `Rabu`, `Kamis`, `Jumat`, `Sabtu`, `Minggu`)
  * `sort`: Kolom pengurutan (Contoh: `start_time` atau `created_at`)
  * `order`: Arah pengurutan (`asc` atau `desc`)
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Daftar jadwal perkuliahan berhasil diambil.",
      "data": [
          {
              "id": 1,
              "course_name": "Sistem Manajemen Basis Data",
              "lecturer": "Dr. Irwan Santoso",
              "day": "Selasa",
              "start_time": "08:00",
              "end_time": "10:30",
              "classroom": "Ruang Teori A-102",
              "status": "Aktif"
          }
      ],
      "meta": {
          "current_page": 1,
          "last_page": 1,
          "per_page": 10,
          "total": 1
      }
  }
  ```

### 2. Tambah Jadwal Kuliah **[Perlu Login]**
* **Method & URL**: `POST /api/schedules`
* **Request Body**:
  ```json
  {
      "course_name": "Pemrograman Web Lanjut",
      "lecturer": "Hendra Wijaya, M.T.",
      "day": "Senin",
      "start_time": "11:00",
      "end_time" : "13:30",
      "classroom": "Lab Komputer 5",
      "status": "Aktif"
  }
  ```

### 3. Detail Jadwal
* **Method & URL**: `GET /api/schedules/{id}`

### 4. Perbarui Jadwal Kuliah **[Perlu Login]**
* **Method & URL**: `PUT /api/schedules/{id}`

### 5. Hapus Jadwal Kuliah **[Perlu Login]**
* **Method & URL**: `DELETE /api/schedules/{id}`

---

## 🖼️ Modul Galeri & Dokumentasi Kegiatan

### 1. Tampilkan List Galeri (Mendukung Search, Filter Kategori, Sort, Pagination)
* **Method & URL**: `GET /api/gallery`
* **Parameter Query (Opsional)**:
  * `page`: Halaman ke- (Default: `1`)
  * `per_page`: Jumlah baris data (Default: `10`)
  * `search`: Pencarian judul atau deskripsi foto (Contoh: `seminar`)
  * `category`: ID, slug, atau nama kategori (Contoh: `praktikum` atau `1`)
  * `sort`: Kolom pengurutan (`taken_at`, `created_at`, dll)
  * `order`: Arah pengurutan (`asc` atau `desc`)
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Daftar foto galeri berhasil diambil.",
      "data": [
          {
              "id": 1,
              "category_id": 2,
              "category": {
                  "id": 2,
                  "name": "Kegiatan",
                  "slug": "kegiatan"
              },
              "title": "Sidang Yudisium & Graduation Day",
              "description": "Momen perayaan wisuda kelulusan kakak tingkat angkatan Sistem Informasi.",
              "image": "http://domain.com/storage/gallery/nama_file.jpg",
              "taken_at": "2024-10-24"
          }
      ],
      "meta": {
          "current_page": 1,
          "last_page": 2,
          "per_page": 10,
          "total": 15
      }
  }
  ```

### 2. Unggah Foto Galeri Baru **[Perlu Login]**
* **Method & URL**: `POST /api/gallery`
* **Request Content-Type**: `multipart/form-data`
* **Request Fields**:
  * `category_id`: `2` (harus ada di tabel `gallery_categories`)
  * `title`: "Diskusi Interaktif Dosen dan Mahasiswa"
  * `description`: "Konsultasi bimbingan akademik bersama Dr. Irwan Santoso."
  * `image`: `[File Gambar PNG/JPG/WEBP, Max 5MB]`
  * `taken_at`: "2024-10-10"

### 3. Detail Foto Galeri
* **Method & URL**: `GET /api/gallery/{id}`

### 4. Perbarui Dokumentasi Galeri **[Perlu Login]**
* **Method & URL**: `POST /api/gallery/{id}`
* **Keterangan**: Pada request upload multipart PHP, gunakan `POST` untuk memperbarui data beserta lampiran file baru agar data terbaca optimal oleh PHP $_FILES.

### 5. Hapus Foto Galeri **[Perlu Login]**
* **Method & URL**: `DELETE /api/gallery/{id}`

---

## 🏷️ Modul Kategori Galeri

### 1. List Kategori
* **Method & URL**: `GET /api/categories`

### 2. Tambah Kategori Baru **[Perlu Login]**
* **Method & URL**: `POST /api/categories`
* **Request Body**:
  ```json
  {
      "name": "Kompetisi Mahasiswa",
      "slug": "kompetisi-mahasiswa" // Opsional, auto-generate slug jika dikosongkan
  }
  ```

### 3. Perbarui Kategori **[Perlu Login]**
* **Method & URL**: `PUT /api/categories/{id}`

### 4. Hapus Kategori **[Perlu Login]**
* **Method & URL**: `DELETE /api/categories/{id}`
* **Keterangan**: Penghapusan akan ditolak (422) jika masih terdapat foto galeri yang mengikat kategori ini demi konsistensi integritas database.

---

## 🏫 Modul Profil Kelas (Singular)

### 1. Tampilkan Profil Kelas
* **Method & URL**: `GET /api/profile`
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Profil kelas berhasil diambil.",
      "data": {
          "class_name": "Sistem Informasi Kelas C",
          "study_program": "Sistem Informasi",
          "faculty": "Fakultas Sains dan Teknologi",
          "university": "Universitas Islam Negeri Raden Intan Lampung",
          "academic_year": "2025",
          "total_students": 42,
          "class_leader": "Lendra",
          "homeroom_lecturer": "Dr. Irwan Santoso",
          "description": "Program Studi pelopor yang mengintegrasikan inovasi teknologi...",
          "logo": "http://domain.com/storage/logos/logo.png"
      }
  }
  ```

### 2. Perbarui Profil Kelas & Logo **[Perlu Login]**
* **Method & URL**: `POST /api/profile?_method=PUT` atau `PUT /api/profile` (tanpa logo file)
* **Request Content-Type**: `multipart/form-data` (bila mengupload file logo baru)

---

## 📞 Modul Kontak Kelas (Singular)

### 1. Tampilkan Kontak Kelas
* **Method & URL**: `GET /api/contact`
* **Respon Sukses (200)**:
  ```json
  {
      "success": true,
      "message": "Informasi kontak berhasil diambil.",
      "data": {
          "email": "admin@si-hexagon.ac.id",
          "whatsapp": "081234567890",
          "instagram": "si_hexagon_uin",
          "location": "Fakultas Sains dan Teknologi Tower 1 UIN Raden Intan Lampung",
          "google_maps": "https://maps.google.com/..."
      }
  }
  ```

### 2. Perbarui Kontak Kelas **[Perlu Login]**
* **Method & URL**: `PUT /api/contact`
* **Request Body**:
  ```json
  {
      "email": "admin@si-hexagon.ac.id",
      "whatsapp": "081234567890",
      "instagram": "si_hexagon_uin",
      "location": "Fakultas Sains dan Teknologi Tower 1 UIN Raden Intan Lampung",
      "google_maps": "https://maps.google.com/..."
  }
  ```

---

## 📖 Swagger / OpenAPI Setup Guide

Untuk memudahkan pengujian langsung dari browser, Anda dapat menggunakan library **L5-Swagger** (pembungkus Swagger UI untuk Laravel).

### 1. Instalasi
Jalankan perintah berikut di folder backend Laravel Anda:
```bash
composer require "darkaonline/l5-swagger"
```

### 2. Publish Config & Assets
```bash
php artisan l5-swagger:publish
```

### 3. Generate Dokumentasi Swagger
Tulis anotasi OpenAPI di controller Anda lalu generate file JSON swagger:
```bash
php artisan l5-swagger:generate
```
Akses langsung melalui browser di: `http://localhost:8000/api/documentation`

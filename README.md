# Library Loan API

REST API sederhana untuk pencatatan **peminjaman buku perpustakaan**, dibuat untuk memenuhi tugas Responsi PPB 2026.

**Identitas:**
- Nama: Rakha Aljiva Prabaswara
- NIM: 21120124140126
- Kelompok: 9
- Modul: 1
- Mata Kuliah: Praktikum PPB 2026

## 1. Deskripsi Umum & Tujuan Proyek

API ini digunakan untuk mencatat transaksi peminjaman buku oleh anggota perpustakaan. Fitur utamanya adalah operasi CRUD (Create, Read, Update, Delete) terhadap data peminjaman, serta filter berdasarkan query parameter (misalnya menampilkan peminjaman yang berstatus `Terlambat`).

**Stack yang digunakan:**
- **Backend**: Node.js + Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 2. Struktur Data / Schema

Tabel: `loans`

| Kolom         | Tipe        | Keterangan                                              |
|---------------|-------------|----------------------------------------------------------|
| `id`          | bigint      | Primary key, auto increment                               |
| `member_name` | text        | Nama anggota yang meminjam                                 |
| `book_title`  | text        | Judul buku yang dipinjam                                   |
| `loan_date`   | date        | Tanggal peminjaman                                          |
| `due_date`    | date        | Batas waktu pengembalian                                     |
| `return_date` | date        | Tanggal pengembalian aktual (nullable)                       |
| `status`      | text        | `Dipinjam` / `Dikembalikan` / `Terlambat` (default: `Dipinjam`) |
| `created_at`  | timestamptz | Waktu data dibuat                                            |

Script SQL untuk membuat tabel tersedia di [`supabase/schema.sql`](./supabase/schema.sql).

## 3. Daftar Endpoint

| Method | Endpoint             | Deskripsi                                   |
|--------|-----------------------|----------------------------------------------|
| GET    | `/`                   | Info API & daftar endpoint                    |
| GET    | `/loans`              | Ambil semua data peminjaman                    |
| GET    | `/loans?status=...`   | Filter peminjaman berdasarkan status           |
| GET    | `/loans?member_name=...` | Filter berdasarkan nama anggota (partial match) |
| GET    | `/loans?book_title=...`  | Filter berdasarkan judul buku (partial match)   |
| GET    | `/loans/:id`          | Ambil satu data peminjaman berdasarkan ID       |
| POST   | `/loans`              | Tambah data peminjaman baru                     |
| PUT    | `/loans/:id`          | Update data peminjaman                           |
| DELETE | `/loans/:id`          | Hapus data peminjaman                            |

## 4. Contoh Request & Response

### GET /loans?status=Terlambat

**Request:**
```
GET /loans?status=Terlambat
```

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 2,
      "member_name": "Gibran Pinto",
      "book_title": "Bumi Manusia",
      "loan_date": "2026-09-20",
      "due_date": "2026-10-04",
      "return_date": null,
      "status": "Terlambat",
      "created_at": "2026-09-20T03:00:00.000Z"
    }
  ]
}
```

### POST /loans

**Request:**
```
POST /loans
Content-Type: application/json

{
  "member_name": "Prabowo Widodo",
  "book_title": "Negeri 5 Menara",
  "loan_date": "2026-10-05",
  "due_date": "2026-10-19"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "member_name": "Prabowo Widodo",
    "book_title": "Negeri 5 Menara",
    "loan_date": "2026-10-05",
    "due_date": "2026-10-19",
    "return_date": null,
    "status": "Dipinjam",
    "created_at": "2026-10-05T01:00:00.000Z"
  }
}
```

### PUT /loans/3

**Request:**
```
PUT /loans/3
Content-Type: application/json

{
  "status": "Dikembalikan",
  "return_date": "2026-10-15"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "member_name": "Prabowo Widodo",
    "book_title": "Negeri 5 Menara",
    "loan_date": "2026-10-05",
    "due_date": "2026-10-19",
    "return_date": "2026-10-15",
    "status": "Dikembalikan",
    "created_at": "2026-10-05T01:00:00.000Z"
  }
}
```

### DELETE /loans/3

**Response (200):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus",
  "data": { "id": 3, "...": "..." }
}
```

### Error response (404)
```json
{
  "success": false,
  "message": "Data peminjaman tidak ditemukan"
}
```

## 5. Panduan Instalasi & Menjalankan Lokal

### Prasyarat
- Node.js v18+
- Akun [Supabase](https://supabase.com)

### Langkah-langkah

1. Clone repository
   ```bash
   git clone https://github.com/RakhaAlv/library-loan-api.git
   cd library-loan-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Buat project di [Supabase](https://supabase.com), lalu jalankan isi file `supabase/schema.sql` pada **SQL Editor** untuk membuat tabel `loans`.

4. Salin `.env.example` menjadi `.env` dan isi dengan kredensial Supabase Anda:
   ```bash
   cp .env.example .env
   ```
   ```
   PORT=3000
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=xxxxxxxxxxxxxxxxx
   ```
   (`SUPABASE_URL` dan `SUPABASE_KEY` bisa didapat di **Project Settings > API** pada dashboard Supabase.)

5. Jalankan server secara lokal
   ```bash
   npm start
   ```
   atau untuk mode development (auto-reload):
   ```bash
   npm run dev
   ```

6. Server berjalan di `http://localhost:3000`

## 6. Deployment

### Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → import repository GitHub ini.
3. Pada bagian **Environment Variables**, tambahkan:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Klik **Deploy**.

Konfigurasi routing untuk Vercel sudah disediakan pada `vercel.json` dan entry point serverless pada `api/index.js`.

### Link Deployment

- **Base URL (Vercel)**: https://library-loan-api-five.vercel.app
- **Repository GitHub**: https://github.com/RakhaAlv/library-loan-api

## 7. Struktur Folder

```
library-loan-api/
├── api/
│   └── index.js          # Entry point untuk Vercel serverless
├── src/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── controllers/
│   │   └── loansController.js
│   ├── routes/
│   │   └── loansRoutes.js
│   ├── app.js
│   └── server.js         # Entry point untuk menjalankan lokal
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

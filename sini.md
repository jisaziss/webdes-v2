# Project Specification: Website Portfolio Kelompok [Nama Kelompok]

Anda adalah seorang Senior Frontend Engineer. Tugas Anda adalah membangun fondasi website portfolio kelompok yang lengkap, aesthetic, dan responsive. JANGAN memberikan placeholder kosong, JANGAN hanya membuat satu file `index.html`, dan JANGAN memotong kode. Anda harus membuat struktur file dan semua kode yang diperlukan secara utuh.

---

## 1. Stack & Architecture
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla, No Framework).
* **Styling:** Modular CSS (Bukan inline style) yang bersih dan terstruktur.
* **Architecture:** Static Website dengan fungsionalitas interaktif via JS.

---

## 2. Target File Structure
Anda harus membuat dan menyusun struktur folder serta file seperti di bawah ini:
├── index.html              # Halaman Utama (Home & Hero)
├── pages/
│   ├── about.html          # Halaman Tentang Kelompok (Visi & Misi)
│   └── projects.html       # Halaman Showcasing Project
├── css/
│   ├── style.css           # Global reset, typography, & layout styles
│   ├── home.css            # Styles khusus untuk halaman utama
│   └── components.css      # Styles untuk komponen modular (header, footer, buttons)
└── js/
├── main.js             # Global JS (Navigation logic)
└── members.js          # JS untuk Dynamic Member Profile (Halaman About)


---

## 3. Detailed Page Requirements

### 📄 Page 1: Landing Page (`index.html`)
* **Hero Section:** Ada Headline menarik, Sub-headline, Call to Action button (CTA) "Lihat Tim Kami" yang mengarah ke `about.html`.
* **Brief Group Intro:** Deskripsi singkat tentang identitas kelompok.
* **Footer:** Navigasi sitemap, Hak Cipta, dan Link Sosial Media (Dummy).
* **Notes:** Integrasikan dengan Tailwind CSS dan pastikan fully responsive (Mobile-friendly).

### 📄 Page 2: About & Team Page (`pages/about.html`)
* **Header & Nav:** Navbar konsisten dengan `index.html`.
* **Team Section:** Harus menampilkan wajah, nama, dan role dari 6 anggota tim. Buat dalam format grid (3x2 pada desktop, 1 per kolom pada mobile).
* **Visi & Misi:** Bagian khusus yang menjelaskan tujuan kelompok.
* **Notes:** Tampilan grid harus *aesthetics* dan rapi.

### 📄 Page 3: Projects Page (`pages/projects.html`)
* **Header & Nav:** Navbar konsisten.
* **Project Gallery:** Minimal tampilkan 3 project (Gambar placeholder, judul project, deskripsi singkat, dan link ke demo/code).
* **Filter Feature:** Fungsionalitas filter project berdasarkan teknologi/kategori.

---

## 4. JavaScript Requirements

### 📄 Global Logic (`js/main.js`)
* Buat logic untuk Mobile Hamburger Menu (Toggle open/close).
* Tambahkan smooth scrolling untuk navigasi internal (jika ada).

### 📄 Member Logic (`js/members.js`)
* Buat *array* objek yang berisi data anggota (Nama, Role, Deskripsi Singkat, URL foto placeholder).
* Gunakan JavaScript untuk secara dinamis membuat card profil anggota dan memasukkannya ke dalam `about.html` tanpa harus menulis HTML card satu per satu.

---

## 5. Execution Steps for Copilot (TOLONG DIIKUTI!)
1. **NO PLACEHOLDERS:** Jangan menulis komentar seperti `<!-- Tambahkan kode lain di sini -->`. Tuliskan kodenya secara lengkap dari tag pembuka sampai penutup.
2. **Modular & Clean:** Pisahkan fungsi CSS dan JS ke file masing-masing sesuai struktur di atas.
3. **Mulai dari File Utama:** Pertama, buatlah `index.html`. Kemudian lanjutkan ke file-file CSS dan JS yang diperlukan untuk halaman tersebut. Setelah selesai, pindah ke halaman-halaman lain.
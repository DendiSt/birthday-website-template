# Product Requirements Document (PRD)
## Website "Birthday Gift" — Kado Ulang Tahun Digital

---

## 1. Overview

### 1.1 Deskripsi Produk
Website birthday gift adalah pengalaman digital personal berupa mini-site yang berisi foto-foto kenangan dan surat cinta, dengan tema visual pink romantis yang dipenuhi berbagai jenis bunga (rose, tulip, sakura, peony, daisy, lavender). Website ini bersifat private — hanya dapat diakses oleh pasangan dengan memasukkan PIN 6 digit yang diberikan secara pribadi (misalnya melalui chat, surat kecil, atau kode QR).

### 1.2 Tujuan
- Memberikan pengalaman ulang tahun yang intimate, personal, dan memorable
- Membawa pasangan melewati perjalanan memori secara kronologis melalui scroll vertikal
- Mengakhiri pengalaman dengan surat cinta sebagai klimaks emosional

### 1.3 Target Pengguna
- Pasangan pemberi kado (admin/content owner)
- Pasangan penerima kado (end user dengan PIN)

---

## 2. User Flow

```
Landing Page (PIN input)
    |
    v (PIN benar)
Halaman Utama — Scroll Vertikal
    |
    |-- Section 1: Pembuka (animasi + ucapan "Happy Birthday")
    |-- Section 2: Pertama Kali Bertemu
    |-- Section 3: First Date
    |-- Section 4: Jalan-jalan Terjauh
    |-- Section 5: Moment Paling Penting
    |-- Section 6: Moment Anniversary
    |-- Section 7: Surat Cinta (dikelilingi foto pasangan)
    |
    v
Ending (optional: tombol "Balas Surat" / musik)
```

---

## 3. Functional Requirements

### 3.1 Halaman Landing — PIN Input

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-1 | Tampilkan input PIN berbentuk 6 kotak digit terpisah (OTP-style) | Must Have |
| FR-2 | PIN hanya menerima angka (0-9), input otomatis pindah ke kotak berikutnya saat digit diisi | Must Have |
| FR-3 | Mendukung paste PIN 6 digit langsung | Should Have |
| FR-4 | PIN salah -> tampilkan animasi shake + pesan error ("PIN salah, coba lagi ya") dan input ter-clear | Must Have |
| FR-5 | Batas percobaan: maksimal 5x, setelahnya tampilkan countdown (misal 30 detik) sebelum bisa mencoba lagi | Should Have |
| FR-6 | PIN benar -> transisi halaman (fade/slide) menuju halaman utama | Must Have |
| FR-7 | Landing page bertema pink romantis dengan ilustrasi bunga (rose, tulip, sakura), gradasi warna pink, dan dekorasi hati | Must Have |

### 3.2 Halaman Utama — Scroll Vertikal

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-8 | Layout scroll vertikal satu halaman (single-page, section-based) | Must Have |
| FR-9 | Setiap section memiliki judul, foto-foto, dan deskripsi singkat | Must Have |
| FR-10 | Animasi scroll (fade-in, parallax, atau reveal) saat section masuk viewport | Must Have |
| FR-11 | Musik latar (lagu favorit pasangan) dengan tombol mute/unmute yang selalu terlihat (fixed floating button) | Should Have |
| FR-12 | Progress indicator kecil (titik/dot di sisi layar) menunjukkan posisi section | Nice to Have |

### 3.3 Konten Section

**Section 1 — Pembuka**
- Animasi teks "Happy Birthday, [Nama]" (typewriter atau fade bertahap)
- Ilustrasi dekoratif bertema bunga (karangan bunga/bouquet di sudut layar, kelopak jatuh lembut)
- Instruksi kecil: "Scroll untuk melihat perjalanan kita"

**Section 2 — Pertama Kali Bertemu**
- Judul + tanggal/tempat (opsional)
- 2-4 foto kenangan (layout responsif: 1 kolom di mobile, 2 kolom di desktop)
- Deskripsi singkat 2-3 kalimat

**Section 3 — First Date**
- Judul + tanggal/lokasi first date
- 2-4 foto
- Cerita singkat

**Section 4 — Jalan-jalan Terjauh**
- Judul + destinasi
- 3-6 foto perjalanan (horizontal scroll di mobile / grid di desktop)
- Deskripsi

**Section 5 — Moment Paling Penting**
- Judul (bisa diedit bebas: lamaran, lulus bareng, dll.)
- 2-4 foto
- Deskripsi

**Section 6 — Moment Anniversary**
- Judul + nomor/tanggal anniversary
- 2-4 foto
- Deskripsi

**Section 7 — Surat Cinta (Klimaks)**
- Surat cinta dalam bentuk kartu/kertas surat estetik (font tulisan tangan, kertas cream/soft pink)
- **Foto pasangan mengelilingi surat** (layout adaptif: foto-foto di atas, bawah, dan samping surat di mobile; arc/polaroid di sekeliling surat di desktop)
- Animasi reveal surat (surat terbuka / amplop terbuka)
- Optional: tombol "Buka Surat" sebelum isi ditampilkan
- Penutup: "Dari yang selalu sayang kamu"

### 3.4 Ending

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-13 | Di akhir surat: tombol "Balas Surat" yang membuka link WhatsApp/email pre-filled | Nice to Have |
| FR-14 | Confetti flowers animation (partikel kelopak bunga pink) saat user sampai di section surat | Should Have |
| FR-15 | Tombol "Ulangi dari Awal" | Nice to Have |

---

## 4. Non-Functional Requirements

### 4.1 Umum

| Aspek | Spesifikasi |
|-------|-------------|
| **Framework** | Next.js 14+ (App Router) |
| **Performance** | Foto dikompresi (WebP/AVIF via `next/image`), lazy loading, total load < 3 detik di 4G |
| **Keamanan** | PIN disimpan sebagai hash (bukan plain text), tidak diindeks search engine (`noindex` di metadata) |
| **Aksesibilitas** | Kontras teks memadai, alt text pada foto, target sentuh minimal 44x44px |
| **Browser** | Chrome, Safari, Firefox (versi terkini) |
| **Hosting** | Vercel (optimal untuk Next.js, gratis) |

### 4.2 Responsivitas Mobile (Prioritas)

| ID | Requirement |
|----|-------------|
| RESP-1 | Mobile-first design: semua layout didesain untuk layar 360px ke atas terlebih dahulu |
| RESP-2 | Breakpoint: `sm` 640px, `md` 768px, `lg` 1024px menggunakan Tailwind CSS |
| RESP-3 | Input PIN berukuran sentuh nyaman di mobile (kotak PIN minimal 48px, spasi antar kotak cukup) |
| RESP-4 | Foto tidak meluber/terpotong di layar kecil; gunakan `object-fit: cover` dengan rasio konsisten |
| RESP-5 | Tipografi fluida: font skala menggunakan `clamp()` agar judul tetap proporsional di semua ukuran layar |
| RESP-6 | Tombol fixed (musik, scroll-to-top) tidak menutupi konten dan aman dari area notch/iPhone safe-area |
| RESP-7 | Hindari hover-dependent interactions di mobile; gunakan tap/scroll trigger |
| RESP-8 | Section surat cinta: foto mengelilingi surat dengan layout stacked di mobile (foto di atas & bawah surat) agar tidak terlalu sempit |
| RESP-9 | Test pada ukuran umum: iPhone SE (375px), iPhone 14 Pro Max (430px), Android standar (360px), iPad (768px), desktop (1440px) |

---

## 5. Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| **Framework** | Next.js 14+ (App Router) | Routing sederhana, optimasi gambar otomatis, deploy mudah ke Vercel |
| **Styling** | Tailwind CSS | Utility-first, responsif dengan breakpoint bawaan, konsistensi tema via design tokens |
| **Animasi** | Framer Motion | Animasi scroll (whileInView), transisi halaman, micro-interactions (shake PIN) |
| **Komponen** | React + TypeScript | Type safety untuk struktur data konten |
| **Musik** | `<audio>` element dengan custom play button | Kontrol penuh, autoplay-off sesuai best practice |
| **Gambar** | `next/image` + kompresi WebP/AVIF | Otomatis lazy load & resize responsif |
| **PIN Auth** | Client-side SHA-256 hash check (via Web Crypto API) | Cukup untuk private gift, tanpa backend |
| **Fonts** | next/font/google — "Dancing Script" (judul) + "Poppins" (isi) | Optimal loading, no layout shift |
| **Confetti** | canvas-confetti (mode hearts) | Ringan, partikel hati pink |
| **Deployment** | Vercel | Zero-config untuk Next.js |

---

## 6. Desain & Estetika — Tema Pink & Bunga

### 6.1 Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      pink: {
        50:  '#FDF2F8',
        100: '#FCE7F3',
        200: '#FBCFE8',
        300: '#F9A8D4',
        400: '#F472B6',
        500: '#EC4899',
        600: '#DB2777',
        700: '#BE185D',
      },
      cream: '#FFF9F5',
      rose: {
        soft: '#FADADD',
        deep: '#C2185B',
      }
    },
    fontFamily: {
      script: ['"Dancing Script"', 'cursive'],
      body: ['"Poppins"', 'sans-serif'],
    }
  }
}
```

| Elemen | Spesifikasi |
|--------|-------------|
| **Warna utama** | Gradasi pink: `pink-100` (background) -> `pink-300` (aksen) -> `pink-500` (tombol/aksen kuat) |
| **Warna pendukung** | Cream (`#FFF9F5`) untuk kartu surat, rose deep (`#C2185B`) untuk teks judul, hijau sage (`#A8C5A0`) untuk daun bunga |
| **Font judul** | "Dancing Script" (tulisan tangan romantis, pink-600/rose-deep) |
| **Font isi** | "Poppins" (sans-serif bersih, gray-700 agar tetap terbaca di background pink) |
| **Foto frame** | Efek polaroid putih dengan border pink-200 muda + caption font script, dihiasi stiker bunga kecil di pojok |
| **Dekorasi utama** | Berbagai jenis bunga: **rose** (mawar pink), **tulip**, **sakura** (kelopak jatuh), **peony**, **daisy**, **lavender** — sebagai ilustrasi statis, animasi float, dan kelopak berjatuhan |
| **Tombol** | Rounded-full, gradasi pink-400 ke pink-600, shadow pink lembut, opsional diapit dua bunga kecil |
| **Transisi** | Smooth scroll, fade-in + slide-up per section, kelopak bunga jatuh saat pergantian section |
| **Latar section** | Background berganti nuansa pink lembut dengan pola bunga watermark berbeda per section |

### 6.2 Prinsip Visual
- Background tiap section bisa berganti nuansa pink (pink-50 -> pink-100 -> pink-50) agar ada ritme visual saat scroll
- Kontras teks dijaga: teks isi menggunakan warna gelap (gray-700/rose-deep), bukan putih murni di atas pink terang
- Hati-hati dengan pink terlalu "nyaring" — gunakan tone dusty/soft pink agar tetap elegan
- Bunga digunakan sebagai framing (sudut layar, pembatas section), bukan menutupi konten utama
- Ilustrasi bunga bersifat flat/line-art atau watercolor-style agar ringan dan tidak mengganggu foto kenangan

### 6.3 Jenis Bunga per Section

Setiap section menggunakan jenis bunga khas sebagai identitas visual:

| Section | Bunga Khas | Simbolisme / Alasan |
|---------|-----------|---------------------|
| Landing (PIN) | **Rose pink** | Cinta & kehangatan — kesan pertama romantis |
| Pembuka | **Peony** | Kemakmuran & kebahagiaan — merayakan hari lahir |
| Pertama Kali Bertemu | **Sakura** | Pertemuan yang indah & sesaat yang berharga |
| First Date | **Tulip pink** | Cinta pertama & kesederhanaan yang manis |
| Jalan-jalan Terjauh | **Lavender** | Ketenangan & petualangan bersama |
| Moment Paling Penting | **Rose merah muda peony ganda** | Momen bersejarah yang mendalam |
| Anniversary | **Daisy + baby breath** | Kesetiaan & awal yang baru setiap tahun |
| Surat Cinta | **Bouquet campuran (rose + peony + daisy)** | Puncak perayaan — surat dikelilingi karangan bunga penuh |

### 6.4 Aset Bunga yang Dibutuhkan

| Aset | Format | Keterangan |
|------|--------|------------|
| Ilustrasi corner flower (per jenis bunga) | SVG/PNG transparan | Hiasan sudut kartu & section |
| Falling petals animation (sakura/pink petals) | CSS/Lottie | Kelopak berjatuhan lembut di landing & pembuka |
| Floating flowers (rose, tulip) | CSS animation | Bunga melayang pelan sebagai dekorasi background |
| Confetti flowers | canvas-confetti bentuk kelopak | Trigger saat sampai di section surat cinta |
| Watercolor flower divider | PNG/SVG | Pembatas antar section |
| Stiker bunga kecil | SVG | Hiasan polaroid foto & tombol |

**Sumber aset:** ilustrasi buatan sendiri, Flaticon/Freepik (lisensi), atau Unsplash untuk foto bunga realistis.

---

## 7. Struktur Proyek Next.js

```
birthday-gift/
├── app/
│   ├── layout.tsx          # Metadata noindex, fonts, global styles
│   ├── page.tsx            # Landing page (PIN input)
│   └── story/
│       └── page.tsx        # Halaman utama scroll vertikal
├── components/
│   ├── PinInput.tsx        # 6 kotak PIN OTP-style
│   ├── HeroSection.tsx     # Pembuka "Happy Birthday"
│   ├── MemorySection.tsx   # Section foto reusable (props: title, date, photos, story)
│   ├── LoveLetter.tsx      # Surat cinta + surrounding photos
│   ├── MusicPlayer.tsx     # Floating play/mute button
│   ├── FloatingHearts.tsx  # Dekorasi hati melayang
│   ├── FallingPetals.tsx   # Animasi kelopak sakura/pink jatuh
│   ├── FlowerCorner.tsx    # Hiasan sudut bunga (reusable, props: type, position)
│   ├── FlowerDivider.tsx   # Pembatas section bergaya bunga watercolor
│   └── ProgressDots.tsx    # Indicator section
├── data/
│   └── content.json        # Semua konten (nama, PIN hash, sections, surat)
├── public/
│   ├── photos/             # Foto-foto kenangan
│   └── music/              # Lagu latar
└── lib/
    └── pin.ts              # Helper hash PIN (SHA-256)
```

### 7.1 Struktur Data Konten (`data/content.json`)

```json
{
  "recipientName": "Nama Pasangan",
  "pinHash": "sha256_hash_dari_pin",
  "musicUrl": "/music/lagu.mp3",
  "openingMessage": "Happy Birthday, Sayang!",
  "sections": [
    {
      "id": "pertama-bertemu",
      "title": "Pertama Kali Bertemu",
      "date": "12 Januari 2023",
      "description": "Cerita singkat...",
      "flower": "sakura",
      "photos": ["/photos/bertemu-1.webp", "/photos/bertemu-2.webp"]
    },
    {
      "id": "first-date",
      "title": "First Date",
      "date": "20 Februari 2023",
      "description": "Cerita singkat...",
      "photos": ["/photos/date-1.webp", "/photos/date-2.webp"]
    },
    {
      "id": "jalan-terjauh",
      "title": "Jalan-jalan Terjauh",
      "date": "Juni 2023",
      "description": "Cerita singkat...",
      "photos": ["/photos/trip-1.webp", "/photos/trip-2.webp", "/photos/trip-3.webp"]
    },
    {
      "id": "moment-penting",
      "title": "Moment Paling Penting",
      "date": "—",
      "description": "Cerita singkat...",
      "photos": ["/photos/moment-1.webp"]
    },
    {
      "id": "anniversary",
      "title": "Moment Anniversary",
      "date": "12 Januari 2024",
      "description": "Cerita singkat...",
      "photos": ["/photos/anniv-1.webp", "/photos/anniv-2.webp"]
    }
  ],
  "loveLetter": {
    "title": "Untuk Kamu, Sayangku",
    "content": "Isi surat cinta...",
    "surroundingPhotos": ["/photos/pasangan-1.webp", "/photos/pasangan-2.webp", "/photos/pasangan-3.webp", "/photos/pasangan-4.webp"]
  }
}
```

---

## 8. Acceptance Criteria

1. User harus memasukkan PIN 6 digit untuk masuk; PIN salah tidak bisa lanjut
2. Setelah PIN benar, user diarahkan ke halaman `/story` dengan scroll vertikal
3. Semua section konten tampil sesuai urutan: pembuka -> pertama bertemu -> first date -> jalan-jalan terjauh -> moment penting -> anniversary -> surat cinta
4. Section surat cinta ditampilkan di tengah dengan foto pasangan mengelilinginya
5. Website menggunakan tema pink dengan dekorasi berbagai jenis bunga secara konsisten di semua section
6. Website dibangun dengan Next.js 14+ (App Router) dan Tailwind CSS
7. Website tampil baik dan mulus di layar mobile 360px hingga desktop 1440px
8. Animasi scroll berjalan lancar tanpa lag
9. Musik dapat diputar/dihentikan oleh user
10. Foto ter-load cepat berkat `next/image` dan lazy loading

---

## 9. Roadmap / Tahapan Pengerjaan

| Fase | Task | Estimasi |
|------|------|----------|
| 1 | Setup Next.js + Tailwind + design tokens pink, kumpulkan aset (foto, lagu, tulisan surat, ilustrasi bunga) | 1 hari |
| 2 | Build landing page `page.tsx` + komponen PinInput (OTP logic + hash check) | 1 hari |
| 3 | Build halaman `/story`: HeroSection + MemorySection reusable + animasi Framer Motion | 2 hari |
| 4 | Build LoveLetter section (surat + foto mengelilingi) + confetti hearts | 1 hari |
| 5 | Responsif mobile: test 360px-430px, polish layout, safe-area, fluid typography | 1 hari |
| 6 | Polish: musik player, progress dots, kompresi foto, metadata noindex, animasi kelopak & konfigurasi bunga per section | 1 hari |
| 7 | Testing di device asli + deploy ke Vercel | 1 hari |

**Total estimasi: 8-10 hari kerja.**

# NesaStore — Demo Katalog Aplikasi

Katalog aplikasi (App Store mini) statis tanpa framework dan tanpa build step.
**NesaStore — "App-Store nya warga NESA".**
Cukup buka `index.html` di peramban — semuanya berjalan lewat protokol `file://`.

## Struktur

```
index.html        Shell HTML (header/nav, hero, katalog, detail, tentang, footer)
img/logo.png      Logo NesaStore (2340×764) — dipakai di header (logo saja, wordmark
                  "NesaStore" + tagline sudah menyatu di dalam gambar) & favicon
css/custom.css    Token warna, animasi, gaya tab/chip/kartu, segmented tema,
                  override mode terang, aksesibilitas
js/data.js        6 aplikasi dummy, CATEGORIES, APP_BY_ID
js/utils.js       escapeHtml, format*, starRatingHTML, categoryBadge, updatedDateHTML, iconTile,
                  placeholderSVG, helper status instal (localStorage), toast
js/app.js         Render katalog, filter/pencarian/urutan, halaman detail + 4 tab,
                  galeri screenshot, aplikasi serupa, halaman tentang, hash router,
                  pengelola tema (Terang / Gelap / Sistem)
_selftest.html    Alat uji mandiri (dev tool) — lihat bagian di bawah
```

## Fitur

- **Katalog**: pencarian nama, filter kategori (chip), urutan Populer / Rating / Nama / Terbaru.
- **Kartu katalog** menampilkan **tanggal pembaruan terakhir** (`Diperbarui: 4 Okt 2026`)
  tepat di bawah rating — diambil dari `app.updated` (ISO), diformat oleh `formatDateShort()`
  (`js/utils.js`) dan disusun `updatedDateHTML()` dengan ikon kalender SVG. Warnanya
  menyesuaikan tema: `#64748b` (terang) dan `#8b949e` (gelap).
- **Halaman detail** (`#/app/<id>`): header aplikasi, tombol instal, 4 tab
  (Deskripsi, Tangkapan Layar, Changelog, Info Teknis), galeri screenshot dengan
  tombol sebelumnya/berikutnya + thumbnail, dan daftar aplikasi serupa.
- **Simulasi instal**: status `Menginstal…` → `Terinstal!` disimpan di `localStorage`
  sehingga tetap tersimpan setelah muat ulang.
- **Halaman tentang** (`#/tentang`): penjelasan proyek dan panduan pemakaian.
- **Tema 3-mode** (Terang / Gelap / Sistem) lewat segmented control di header.
  Pilihan disimpan di `localStorage` (`nesastore-theme`), diterapkan sebelum render
  pertama sehingga tidak ada kedipan, dan mode *Sistem* otomatis mengikuti perubahan
  `prefers-color-scheme` perangkat. Di layar kecil kontrolnya menjadi ringkas (ikon saja).
  Ikon tiap opsi (matahari / bulan / monitor) memakai **SVG Feather 14×14** dengan `stroke:
  currentColor` — bukan emoji — agar konsisten dengan ikon lain di situs.
- **Router berbasis hash** dengan penanda nav aktif dan judul dokumen yang berubah.
  Penanda aktif berlaku untuk kedua baris nav (desktop & mobile).
- **Header responsif**: menampilkan **logo saja** — wordmark "NesaStore" + tagline sudah
  menyatu di dalam gambar, jadi teks di sebelahnya dihapus supaya tidak berulang. Logo
  berskala tinggi `32px → 40px → 48px` (`base` → `sm` → `lg`) dengan `max-width` sebagai
  pengaman rasio. Di layar ≥ `md` nav `Katalog`/`Tentang` + tombol **Ajukan Aplikasi**
  berada di baris yang sama; di bawah `md` nav dipindah ke **baris kedua** yang ringkas
  supaya tetap terjangkau pada lebar 360 px. Tombol `Ajukan Aplikasi` (tautan luar ke
  Google Form) menyusut menjadi **ikon upload saja** di bawah 768 px — lihat
  `.submit-app-btn` pada `css/custom.css`. Pemilih tema tetap di
  kanan (di bawah 640 px menjadi ringkas: ikon saja) bersama tombol cari.

## Cara memakai

| Aksi | Hasil |
| --- | --- |
| Ketik di kolom pencarian | Menyaring kartu secara langsung |
| Klik chip kategori | Menyaring berdasarkan kategori |
| Ubah dropdown urutan | Mengurutkan ulang daftar |
| Klik kartu / `Lihat Detail` | Masuk ke halaman detail (juga bisa via Enter/Spasi) |
| Klik `Instal Sekarang` | Menjalankan simulasi instal |
| Klik `Light` / `Dark` / `System` | Mengganti tema tampilan; pilihan bertahan setelah muat ulang |
| Klik `Tentang` di nav | Membuka `#/tentang` |
| Klik `Ajukan Aplikasi` di header | Membuka Google Form pengajuan aplikasi di tab baru |

## Catatan teknis

- Tailwind dimuat lewat **CDN Play** (`cdn.tailwindcss.com`). Kelas yang hanya
  dibuat saat runtime didaftarkan di `tailwind.config.safelist` pada `index.html`.
- Tema memakai `darkMode: 'class'`: mode gelap aktif saat `<html>` memiliki kelas
  `dark`. Skrip kecil di `<head>` `index.html` membaca `nesastore-theme` dari
  `localStorage` **sebelum paint pertama** (anti-FOUC), lalu `setTheme()` di
  `js/app.js` mengganti kelas tersebut sekaligus menyimpan pilihan dan menandai
  tombol aktif. Saat mode *Sistem*, listener `matchMedia('(prefers-color-scheme: dark)')`
  ikut memperbarui tampilan. Bila `localStorage` tidak tersedia (mode privat),
  tema jatuh kembali ke `'system'` dan tetap berjalan untuk sesi itu.
- Warna utama konsisten di kedua tema: biru `#1A73E8`, aksen kuning `#FCD34D`.
  Tombol `Instal Sekarang` solid biru, `Hapus instalasi` bergaris (outline) biru.
  Latar mode terang `#FFFFFF` (teks `#1e293b`), mode gelap `#0b0f1c` (teks `#e2e8f0`).
  Perpindahan tema dianimasikan 200 ms dan otomatis dinonaktifkan bila pengguna
  mengaktifkan *prefers-reduced-motion*.
- Screenshot galeri adalah **SVG data-URI yang dibuat sendiri** (`placeholderSVG`),
  jadi galeri tetap tampil tanpa koneksi internet. `#` di dalam SVG di-*encode*
  menjadi `%23` agar data-URI valid.
- Seluruh data aplikasi bersifat fiktif/dummy.

## Menguji: `_selftest.html`

`_selftest.html` **sengaja dipertahankan** sebagai dev tool. Halaman ini memuat
`js/data.js` + `js/utils.js` dan menjalankan 109 pemeriksaan (integritas data,
helper format, validitas data-URI SVG, ketersediaan `localStorage` di `file://`,
dan bolak-balik status instal), lalu menulis ringkasannya ke `<pre id="hasil">`.

Buka langsung di peramban, atau otomatis lewat headless Chrome:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  --headless=new --disable-gpu --no-sandbox --virtual-time-budget=6000 `
  --dump-dom 'file:///D:/Program/tes kode/Nyoba agent/_selftest.html'
```

Cari baris terakhir: `=== RINGKASAN: 109 lulus, 0 gagal ===`.

Verifikasi DOM halaman utama juga bisa memakai perintah serupa dengan menambahkan
hash rute, misalnya `index.html#/tentang`. Satu-satunya pesan konsol yang muncul
adalah peringatan bawaan Tailwind CDN ("should not be used in production") — itu
memang diharapkan untuk demo statis.

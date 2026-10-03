# PixelStore — Demo Katalog Aplikasi

Katalog aplikasi (App Store mini) statis tanpa framework dan tanpa build step.
Cukup buka `index.html` di peramban — semuanya berjalan lewat protokol `file://`.

## Struktur

```
index.html        Shell HTML (header/nav, hero, katalog, detail, tentang, footer)
css/custom.css    Token warna, animasi, gaya tab/chip/kartu, aksesibilitas
js/data.js        6 aplikasi dummy, CATEGORIES, APP_BY_ID
js/utils.js       escapeHtml, format*, starRatingHTML, categoryBadge, iconTile,
                  placeholderSVG, helper status instal (localStorage), toast
js/app.js         Render katalog, filter/pencarian/urutan, halaman detail + 4 tab,
                  galeri screenshot, aplikasi serupa, halaman tentang, hash router
_selftest.html    Alat uji mandiri (dev tool) — lihat bagian di bawah
```

## Fitur

- **Katalog**: pencarian nama, filter kategori (chip), urutan Populer / Rating / Nama / Terbaru.
- **Halaman detail** (`#/app/<id>`): header aplikasi, tombol instal, 4 tab
  (Deskripsi, Tangkapan Layar, Changelog, Info Teknis), galeri screenshot dengan
  tombol sebelumnya/berikutnya + thumbnail, dan daftar aplikasi serupa.
- **Simulasi instal**: status `Menginstal…` → `Terinstal!` disimpan di `localStorage`
  sehingga tetap tersimpan setelah muat ulang.
- **Halaman tentang** (`#/tentang`): penjelasan proyek dan panduan pemakaian.
- **Router berbasis hash** dengan penanda nav aktif dan judul dokumen yang berubah.

## Cara memakai

| Aksi | Hasil |
| --- | --- |
| Ketik di kolom pencarian | Menyaring kartu secara langsung |
| Klik chip kategori | Menyaring berdasarkan kategori |
| Ubah dropdown urutan | Mengurutkan ulang daftar |
| Klik kartu / `Lihat Detail` | Masuk ke halaman detail (juga bisa via Enter/Spasi) |
| Klik `Instal Sekarang` | Menjalankan simulasi instal |
| Klik `Tentang` di nav | Membuka `#/tentang` |

## Catatan teknis

- Tailwind dimuat lewat **CDN Play** (`cdn.tailwindcss.com`). Kelas yang hanya
  dibuat saat runtime didaftarkan di `tailwind.config.safelist` pada `index.html`.
- Screenshot galeri adalah **SVG data-URI yang dibuat sendiri** (`placeholderSVG`),
  jadi galeri tetap tampil tanpa koneksi internet. `#` di dalam SVG di-*encode*
  menjadi `%23` agar data-URI valid.
- Seluruh data aplikasi bersifat fiktif/dummy.

## Menguji: `_selftest.html`

`_selftest.html` **sengaja dipertahankan** sebagai dev tool. Halaman ini memuat
`js/data.js` + `js/utils.js` dan menjalankan 42 pemeriksaan (integritas data,
helper format, validitas data-URI SVG, ketersediaan `localStorage` di `file://`,
dan bolak-balik status instal), lalu menulis ringkasannya ke `<pre id="hasil">`.

Buka langsung di peramban, atau otomatis lewat headless Chrome:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  --headless=new --disable-gpu --no-sandbox --virtual-time-budget=6000 `
  --dump-dom 'file:///D:/Program/tes kode/Nyoba agent/_selftest.html'
```

Cari baris terakhir: `=== RINGKASAN: 42 lulus, 0 gagal ===`.

Verifikasi DOM halaman utama juga bisa memakai perintah serupa dengan menambahkan
hash rute, misalnya `index.html#/tentang`. Satu-satunya pesan konsol yang muncul
adalah peringatan bawaan Tailwind CDN ("should not be used in production") — itu
memang diharapkan untuk demo statis.

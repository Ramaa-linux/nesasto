/* ==========================================================================
   NesaStore - data.js
   Data dummy katalog aplikasi. Semua konten bersifat fiktif.
   Struktur satu objek aplikasi:
   {
     id, name, tagline, category, rating, ratingCount, downloads,
     icon (emoji), version, updated (ISO), size,
     theme: { from, to, accent },        // dipakai untuk ikon & screenshot
     shortDescription, fullDescription: [], highlights: [],
     screenshots: [{ title, caption }],
     changelog: [{ version, date, type, notes: [] }],
     developerInfo: { studio, founder, founded, location, website, email, team, appsPublished, responseTime },
     technical: { version, size, updated, requires, license, languages, ageRating, downloads, category }
   }
   ========================================================================== */

const APPS = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 'nebula-runner',
    name: 'Nebula Runner',
    tagline: 'Lari tanpa batas di galaksi neon',
    category: 'Game',
    rating: 4.8,
    ratingCount: 128450,
    downloads: '2,4 jt',
    icon: '🚀',
    version: '3.2.1',
    updated: '2026-08-28',
    size: '186 MB',
    theme: { from: '#6366f1', to: '#a855f7', accent: '#22d3ee' },
    shortDescription:
      'Endless runner bertema luar angkasa dengan kontrol satu jari dan grafis neon yang memukau.',
    fullDescription: [
      'Nebula Runner adalah game endless runner yang membawamu melintasi lima galaksi berbeda. Geser, lompat, dan meluncur untuk melewati rintangan asteroid sambil mengumpulkan kristal energi untuk membuka skin dan kapal baru.',
      'Setiap galaksi memiliki mekanika unik: gravitasi rendah di Selene, badai meteor di Kraken, hingga lorong cermin di Vantablack. Sistem misi harian dan papan peringkat global menjaga permainan tetap menantang untuk waktu yang lama.',
      'Game ini dioptimalkan untuk perangkat kelas menengah ke bawah, berjalan lancar bahkan tanpa koneksi internet, dan tidak menampilkan iklan pop-up yang mengganggu.'
    ],
    highlights: [
      '5 galaksi dengan mekanika gravitasi berbeda',
      'Lebih dari 40 skin kapal yang bisa dibuka',
      'Mode offline penuh tanpa iklan pop-up',
      'Papan peringkat mingguan dan misi harian'
    ],
    screenshots: [
      { title: 'Menu Utama', caption: 'Antarmuka utama dengan pemilihan galaksi.' },
      { title: 'Permainan', caption: 'Kontrol satu jari saat menerjang rintangan asteroid.' },
      { title: 'Toko Skin', caption: 'Buka 40+ skin kapal memakai kristal energi.' },
      { title: 'Statistik', caption: 'Pantau rekor jarak, kombo, dan pencapaian.' }
    ],
    changelog: [
      {
        version: '3.2.1',
        date: '28 Agustus 2026',
        type: 'Perbaikan',
        notes: [
          'Memperbaiki crash saat berpindah galaksi di perangkat RAM 2 GB.',
          'Mengurangi ukuran unduhan sekitar 12 MB.'
        ]
      },
      {
        version: '3.2.0',
        date: '11 Agustus 2026',
        type: 'Fitur baru',
        notes: [
          'Menambahkan galaksi keenam: Vantablack.',
          'Skin kapal baru bertema aurora.',
          'Mode latihan tanpa batas waktu.'
        ]
      },
      {
        version: '3.1.4',
        date: '22 Juli 2026',
        type: 'Perbaikan',
        notes: [
          'Menyeimbangkan tingkat kesulitan di zona Kraken.',
          'Memperbaiki sinkronisasi papan peringkat.'
        ]
      },
      {
        version: '3.1.0',
        date: '30 Juni 2026',
        type: 'Fitur baru',
        notes: [
          'Sistem misi harian dengan hadiah kristal.',
          'Dukungan getaran haptic yang dapat dimatikan.'
        ]
      }
    ],
    developerInfo: {
      studio: 'PixelForge Studio',
      founder: 'Rangga Prawira & Sari Anjani',
      founded: '2019',
      location: 'Bandung, Indonesia',
      website: 'pixelforge.example.com',
      email: 'halo@pixelforge.example.com',
      team: '14 orang',
      appsPublished: 7,
      responseTime: 'Rata-rata 1 hari kerja'
    },
    technical: {
      version: '3.2.1',
      size: '186 MB',
      updated: '28 Agustus 2026',
      requires: 'Android 8.0+ / iOS 14+ / Windows 10+',
      license: 'Gratis (dengan pembelian dalam aplikasi)',
      languages: 'Bahasa Indonesia, English, 日本語',
      ageRating: '7+ (Aksi ringan)'
    }
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'taskflow-pro',
    name: 'TaskFlow Pro',
    tagline: 'Kelola tugas dan proyek tanpa ribet',
    category: 'Produktivitas',
    rating: 4.7,
    ratingCount: 64210,
    downloads: '980 rb',
    icon: '✅',
    version: '5.0.3',
    updated: '2026-09-14',
    size: '42 MB',
    theme: { from: '#0ea5e9', to: '#14b8a6', accent: '#818cf8' },
    shortDescription:
      'Manajer tugas dengan papan Kanban, sub-tugas, pengingat, dan mode fokus bawaan.',
    fullDescription: [
      'TaskFlow Pro membantu individu dan tim kecil mengatur pekerjaan dengan papan Kanban yang ringan, cepat, dan mudah dipelajari. Seret kartu antar kolom, atur tenggat, dan lihat progres proyek dalam sekali pandang.',
      'Fitur pengingat pintar menyesuaikan waktu notifikasi berdasarkan kebiasaanmu. Mode Fokus menyembunyikan semua gangguan dan memulai penghitung waktu Pomodoro otomatis dari tugas yang sedang dikerjakan.',
      'Semua data tersimpan secara lokal dan dapat diekspor ke JSON atau CSV, sehingga tetap aman walau tanpa koneksi internet.'
    ],
    highlights: [
      'Papan Kanban dengan drag & drop yang halus',
      'Sub-tugas, label warna, dan tenggat fleksibel',
      'Mode Fokus dengan Pomodoro otomatis',
      'Ekspor data ke JSON/CSV, bekerja offline'
    ],
    screenshots: [
      { title: 'Papan Kanban', caption: 'Susun pekerjaan dalam kolom yang dapat disesuaikan.' },
      { title: 'Detail Tugas', caption: 'Sub-tugas, lampiran, dan pengingat dalam satu tempat.' },
      { title: 'Mode Fokus', caption: 'Timer Pomodoro otomatis dari tugas aktif.' },
      { title: 'Laporan', caption: 'Ringkasan progres mingguan timmu.' }
    ],
    changelog: [
      {
        version: '5.0.3',
        date: '14 September 2026',
        type: 'Perbaikan',
        notes: [
          'Memperbaiki kartu yang kembali ke posisi awal setelah drag di layar sentuh.',
          'Performa impor file besar meningkat 30%.'
        ]
      },
      {
        version: '5.0.0',
        date: '2 September 2026',
        type: 'Fitur baru',
        notes: [
          'Desain ulang antarmuka mode terang dan gelap.',
          'Kolom kustom tanpa batas jumlah.',
          'Integrasi kalender dua arah.'
        ]
      },
      {
        version: '4.8.1',
        date: '19 Agustus 2026',
        type: 'Perbaikan',
        notes: ['Pengingat tidak lagi terlewat saat perangkat dalam mode hemat daya.']
      }
    ],
    developerInfo: {
      studio: 'BrightLabs',
      founder: 'Nadia Kusuma',
      founded: '2020',
      location: 'Yogyakarta, Indonesia',
      website: 'brightlabs.example.com',
      email: 'support@brightlabs.example.com',
      team: '9 orang',
      appsPublished: 4,
      responseTime: 'Rata-rata 6 jam kerja'
    },
    technical: {
      version: '5.0.3',
      size: '42 MB',
      updated: '14 September 2026',
      requires: 'Android 9.0+ / iOS 15+ / Web modern',
      license: 'Gratis (Pro: langganan opsional)',
      languages: 'Bahasa Indonesia, English, Deutsch',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'metrocalc',
    name: 'MetroCalc',
    tagline: 'Kalkulator ilmiah super cepat',
    category: 'Tools',
    rating: 4.9,
    ratingCount: 215980,
    downloads: '5,1 jt',
    icon: '🧮',
    version: '2.4.0',
    updated: '2026-07-30',
    size: '18 MB',
    theme: { from: '#f59e0b', to: '#ef4444', accent: '#fbbf24' },
    shortDescription:
      'Kalkulator ilmiah, konverter satuan, dan penghitung rumus dengan riwayat tak terbatas.',
    fullDescription: [
      'MetroCalc menggabungkan kalkulator ilmiah, konverter satuan, dan penghitung rumus dalam satu aplikasi yang sangat ringan. Ukurannya hanya 18 MB dan membuka dalam kurang dari satu detik.',
      'Mendukung notasi ilmiah, basis bilangan (biner, oktal, heksadesimal), matriks sederhana, serta 120+ satuan di 14 kategori mulai dari panjang hingga mata uang.',
      'Riwayat perhitungan tersimpan tanpa batas dan dapat diberi catatan, sangat berguna untuk pekerjaan teknik maupun belajar.'
    ],
    highlights: [
      'Kalkulator ilmiah + 120 unit konversi',
      'Basis bilangan dan operasi matriks sederhana',
      'Riwayat perhitungan tak terbatas dengan catatan',
      'Widget dan pintasan dari layar utama'
    ],
    screenshots: [
      { title: 'Kalkulator Cepat', caption: 'Tombol besar dan tata letak yang jelas.' },
      { title: 'Mode Ilmiah', caption: 'Fungsi trigonometri, logaritma, dan basis bilangan.' },
      { title: 'Konverter', caption: '120+ satuan di 14 kategori berbeda.' },
      { title: 'Riwayat', caption: 'Simpan dan beri catatan pada setiap perhitungan.' }
    ],
    changelog: [
      {
        version: '2.4.0',
        date: '30 Juli 2026',
        type: 'Fitur baru',
        notes: [
          'Operasi matriks sederhana (penjumlahan & perkalian).',
          'Dukungan widget layar utama.',
          'Peningkatan akurasi konversi mata uang.'
        ]
      },
      {
        version: '2.3.2',
        date: '12 Juli 2026',
        type: 'Perbaikan',
        notes: ['Memperbaiki tanda minus ganda pada mode heksadesimal.']
      },
      {
        version: '2.3.0',
        date: '28 Juni 2026',
        type: 'Fitur baru',
        notes: ['Tema gelap murni (OLED) untuk menghemat baterai.']
      }
    ],
    developerInfo: {
      studio: 'NordTools',
      founder: 'Anders Lindqvist',
      founded: '2017',
      location: 'Malmö, Swedia',
      website: 'nordtools.example.com',
      email: 'hello@nordtools.example.com',
      team: '5 orang',
      appsPublished: 12,
      responseTime: 'Rata-rata 2 hari kerja'
    },
    technical: {
      version: '2.4.0',
      size: '18 MB',
      updated: '30 Juli 2026',
      requires: 'Android 7.0+ / iOS 13+',
      license: 'Gratis, tanpa iklan',
      languages: 'English, Bahasa Indonesia, Svenska',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'pixelcraft-editor',
    name: 'PixelCraft Editor',
    tagline: 'Edit foto & desain dalam sekali sentuh',
    category: 'Desain',
    rating: 4.6,
    ratingCount: 87350,
    downloads: '1,7 jt',
    icon: '🎨',
    version: '1.9.2',
    updated: '2026-09-05',
    size: '124 MB',
    theme: { from: '#ec4899', to: '#8b5cf6', accent: '#f472b6' },
    shortDescription:
      'Editor foto berbasis layer dengan filter sinematik, penghapus objek, dan template siap pakai.',
    fullDescription: [
      'PixelCraft Editor adalah editor foto dan desain ringan yang mendukung sistem layer, masker, dan penyesuaian non-destruktif. Cocok untuk membuat konten media sosial maupun desain poster sederhana.',
      'Tersedia lebih dari 60 filter sinematik, alat penghapus objek berbasis AI on-device, dan 200+ template yang bisa langsung dikustomisasi tanpa perlu akun.',
      'Semua pemrosesan dilakukan di perangkat, sehingga fotomu tidak pernah dikirim ke server mana pun.'
    ],
    highlights: [
      'Sistem layer, masker, dan penyesuaian non-destruktif',
      '60+ filter sinematik dan 200+ template',
      'Penghapus objek on-device tanpa upload',
      'Ekspor PNG, JPG, dan WebP hingga 4K'
    ],
    screenshots: [
      { title: 'Kanvas Utama', caption: 'Susun layer dan atur komposisi dengan bebas.' },
      { title: 'Filter', caption: '60+ preset warna satu ketukan.' },
      { title: 'Penghapus Objek', caption: 'Hapus objek pengganggu secara otomatis.' },
      { title: 'Template', caption: 'Ratusan template siap pakai untuk media sosial.' }
    ],
    changelog: [
      {
        version: '1.9.2',
        date: '5 September 2026',
        type: 'Perbaikan',
        notes: [
          'Memperbaiki bayangan yang hilang saat mengekspor PNG transparan.',
          'Mengurangi penggunaan baterai saat mengedit file 4K.'
        ]
      },
      {
        version: '1.9.0',
        date: '20 Agustus 2026',
        type: 'Fitur baru',
        notes: ['Alat penghapus objek generasi kedua.', 'Mode kolaborasi lokal via Wi-Fi.']
      },
      {
        version: '1.8.0',
        date: '2 Agustus 2026',
        type: 'Fitur baru',
        notes: ['Ekspor format WebP.', '50 template baru bertema Ramadan.']
      }
    ],
    developerInfo: {
      studio: 'Vora Creative',
      founder: 'Kevin Hartono',
      founded: '2021',
      location: 'Jakarta, Indonesia',
      website: 'voracreative.example.com',
      email: 'studio@voracreative.example.com',
      team: '21 orang',
      appsPublished: 3,
      responseTime: 'Rata-rata 3 hari kerja'
    },
    technical: {
      version: '1.9.2',
      size: '124 MB',
      updated: '5 September 2026',
      requires: 'Android 10+ / iOS 16+',
      license: 'Freemium',
      languages: 'Bahasa Indonesia, English, 中文',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: 'focusloft',
    name: 'FocusLoft',
    tagline: 'Ruang tenang untuk fokus mendalam',
    category: 'Produktivitas',
    rating: 4.5,
    ratingCount: 41020,
    downloads: '620 rb',
    icon: '🌙',
    version: '1.4.1',
    updated: '2026-06-18',
    size: '36 MB',
    theme: { from: '#334155', to: '#6366f1', accent: '#94a3b8' },
    shortDescription:
      'Timer fokus minimalis dengan suara latar, pelacak sesi, dan laporan kebiasaan.',
    fullDescription: [
      'FocusLoft adalah aplikasi timer fokus minimalis yang dirancang agar kamu bisa langsung mulai bekerja tanpa banyak gangguan. Antarmukanya hanya berisi satu tombol besar dan penghitung waktu.',
      'Pilih dari 24 suara latar seperti hujan, kafe, atau gemericik air, lalu kombinasikan dengan teknik Pomodoro 25/5, 50/10, atau durasi bebas sesuai kebutuhanmu.',
      'Setiap sesi dicatat dan divisualisasikan sebagai laporan harian maupun mingguan, membantumu memahami pola produktivitas terbaik.'
    ],
    highlights: [
      '24 suara latar berkualitas tinggi',
      'Preset Pomodoro 25/5, 50/10, dan durasi bebas',
      'Laporan kebiasaan harian & mingguan',
      'Widget dan mode jangan ganggu otomatis'
    ],
    screenshots: [
      { title: 'Timer Fokus', caption: 'Satu tombol besar, tanpa distraksi.' },
      { title: 'Suara Latar', caption: '24 suara ambient yang bisa dikombinasikan.' },
      { title: 'Pelacak Sesi', caption: 'Lihat total jam fokus yang kamu raih.' },
      { title: 'Laporan', caption: 'Grafik kebiasaan fokus sepanjang minggu.' }
    ],
    changelog: [
      {
        version: '1.4.1',
        date: '18 Juni 2026',
        type: 'Perbaikan',
        notes: [
          'Memperbaiki timer yang berhenti saat layar terkunci di beberapa perangkat.',
          'Sinkronisasi data lintas perangkat lebih stabil.'
        ]
      },
      {
        version: '1.4.0',
        date: '1 Juni 2026',
        type: 'Fitur baru',
        notes: ['6 suara latar baru bertema alam.', 'Preset durasi bebas.']
      },
      {
        version: '1.3.0',
        date: '12 Mei 2026',
        type: 'Fitur baru',
        notes: ['Laporan mingguan dengan grafik batang.']
      }
    ],
    developerInfo: {
      studio: 'QuietByte',
      founder: 'Maya Larasati',
      founded: '2022',
      location: 'Semarang, Indonesia',
      website: 'quietbyte.example.com',
      email: 'hi@quietbyte.example.com',
      team: '4 orang',
      appsPublished: 2,
      responseTime: 'Rata-rata 12 jam kerja'
    },
    technical: {
      version: '1.4.1',
      size: '36 MB',
      updated: '18 Juni 2026',
      requires: 'Android 8.1+ / iOS 15+',
      license: 'Gratis (versi Pro sekali bayar)',
      languages: 'Bahasa Indonesia, English',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id: 'retrodash',
    name: 'RetroDash',
    tagline: 'Nostalgia arkade 8-bit di kantongmu',
    category: 'Game',
    rating: 4.4,
    ratingCount: 33260,
    downloads: '450 rb',
    icon: '👾',
    version: '1.2.5',
    updated: '2026-05-22',
    size: '64 MB',
    theme: { from: '#22c55e', to: '#0891b2', accent: '#fde047' },
    shortDescription:
      'Kumpulan lima mini-game arkade 8-bit dengan kontrol sederhana dan skor tinggi.',
    fullDescription: [
      'RetroDash menghadirkan kembali sensasi bermain di mesin arkade dengan lima mini-game bergaya 8-bit: Blok Buster, Ular Neon, Runner Piksel, Tembak Bintang, dan Labirin.',
      'Setiap mini-game dapat dimainkan dalam sesi singkat dua menit, cocok untuk mengisi waktu luang. Skor tinggi tersimpan secara lokal dengan dukungan hingga sepuluh pemain berbeda.',
      'Grafik dan efek suara dibuat menyerupai konsol era 80-an, lengkap dengan mode CRT opsional yang bisa dinyalakan atau dimatikan.'
    ],
    highlights: [
      'Lima mini-game arkade klasik dalam satu aplikasi',
      'Sesi singkat dua menit per permainan',
      'Skor tinggi lokal hingga 10 pemain',
      'Mode tampilan CRT yang bisa diaktifkan'
    ],
    screenshots: [
      { title: 'Menu Arcade', caption: 'Pilih dari lima mini-game klasik.' },
      { title: 'Ular Neon', caption: 'Kumpulkan makanan tanpa menabrak dirimu sendiri.' },
      { title: 'Tembak Bintang', caption: 'Kendalikan kapal piksel melawan armada alien.' },
      { title: 'Skor Tinggi', caption: 'Simpan rekor hingga sepuluh pemain berbeda.' }
    ],
    changelog: [
      {
        version: '1.2.5',
        date: '22 Mei 2026',
        type: 'Perbaikan',
        notes: [
          'Memperbaiki input yang tertunda pada layar 120 Hz.',
          'Menambahkan tombol jeda di semua mini-game.'
        ]
      },
      {
        version: '1.2.0',
        date: '30 April 2026',
        type: 'Fitur baru',
        notes: ['Mini-game baru: Labirin.', 'Mode tampilan CRT.']
      },
      {
        version: '1.0.0',
        date: '10 Maret 2026',
        type: 'Rilis pertama',
        notes: ['Rilis perdana dengan empat mini-game dan skor lokal.']
      }
    ],
    developerInfo: {
      studio: 'ByteBounce',
      founder: 'Dimas Ardhana',
      founded: '2023',
      location: 'Surabaya, Indonesia',
      website: 'bytebounce.example.com',
      email: 'play@bytebounce.example.com',
      team: '3 orang',
      appsPublished: 2,
      responseTime: 'Rata-rata 2 hari kerja'
    },
    technical: {
      version: '1.2.5',
      size: '64 MB',
      updated: '22 Mei 2026',
      requires: 'Android 8.0+ / iOS 14+',
      license: 'Gratis, tanpa iklan',
      languages: 'Bahasa Indonesia, English',
      ageRating: '7+ (Fantasi ringan)'
    }
  }
];

/* ------------------------------------------------------------------ Indeks bantu */
const APP_BY_ID = APPS.reduce(function (acc, app) {
  acc[app.id] = app;
  return acc;
}, {});

const CATEGORIES = ['Semua'].concat(
  APPS.map(function (a) {
    return a.category;
  }).filter(function (cat, i, arr) {
    return arr.indexOf(cat) === i;
  })
);

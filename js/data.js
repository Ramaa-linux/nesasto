/* ==========================================================================
   NesaStore - data.js
   Data katalog aplikasi NesaStore.
   Struktur satu objek aplikasi:
   {
     id, name, tagline, category, rating, ratingCount, downloads,
     icon (path gambar 'img/asset/icon/<id>.png'; boleh juga emoji),
     version, updated (ISO), size, apkUrl (string; '' = segera hadir),
     theme: { from, to, accent },        // untuk glow ikon & screenshot cadangan
     shortDescription, fullDescription: [], highlights: [],
     screenshots: [{ title, caption, src }],   // src = path gambar asli
     changelog: [{ version, date, type, notes: [] }],
     developerInfo: { studio, founder, founded, location, website, email, team, appsPublished, responseTime },
     technical: { version, size, updated, requires, license, languages, ageRating }
   }
   ========================================================================== */

/* Catatan aset (mengikuti folder yang sudah ada di repo):
     - Ikon  : img/asset/icon/<id>.png
     - Screenshot : img/asset/screenshoot/<id>/<id>-<n>.jpg
   Bila sebuah berkas belum tersedia, iconTile() otomatis jatuh ke huruf
   inisial dan galeri jatuh ke gambar placeholder SVG, jadi tampilan tetap rapi.

   Catatan apkUrl: tautan mengarah ke GitHub Releases. Aplikasi dengan apkUrl
   kosong ('') akan ditandai lencana "Segera Hadir" dan tombol unduhnya
   dinonaktifkan. */
const APPS = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 'fiks-faham',
    name: 'FiksFaham',
    tagline: 'Belajar UI/UX jadi lebih paham',
    category: 'Produktivitas',
    rating: 0,
    ratingCount: 0,
    downloads: '0',
    icon: 'img/asset/icon/fiks-faham.png',
    version: '1.0.0',
    updated: '2026-10-04',
    size: '30 MB',
    apkUrl: 'https://github.com/Ramaa-linux/nesastore/releases/latest/download/fiks-faham.apk',
    theme: { from: '#f59e0b', to: '#ef4444', accent: '#fbbf24' },
    shortDescription:
      'Platform edukasi UI/UX dengan materi, pre-test, post-test, dan video pembelajaran.',
    fullDescription: [
      'FiksFaham adalah platform edukasi yang membantu kamu memahami UI/UX dari dasar hingga mahir. Tersedia materi terstruktur, pre-test untuk mengukur kemampuan awal, post-test untuk evaluasi, dan video materi yang mudah dipahami.',
      'Setiap materi disusun oleh praktisi UI/UX berpengalaman, dengan studi kasus nyata yang relevan dengan kebutuhan industri. Cocok untuk pemula maupun yang ingin memperdalam skill desain.',
      'Belajar kapan aja, di mana aja tanpa perlu install tools tambahan. Semua materi bisa diakses langsung dari aplikasi.'
    ],
    highlights: [
      'Materi UI/UX terstruktur dari dasar hingga mahir',
      'Pre-test & post-test untuk evaluasi',
      'Video materi berkualitas tinggi',
      'Studi kasus nyata dari industri'
    ],
    screenshots: [
      { title: 'Home & Progress', caption: 'Pantau capaian Level 1-4, nilai quiz, dan posttest.', src: 'img/asset/screenshoot/fiks-faham/fiks-faham-1.jpg' },
      { title: 'Course UI/UX', caption: 'Empat level materi lengkap dengan quiz tiap level.', src: 'img/asset/screenshoot/fiks-faham/fiks-faham-2.jpg' },
      { title: 'Eksplorasi Materi', caption: 'Video tutorial UI/UX pilihan dari para kreator.', src: 'img/asset/screenshoot/fiks-faham/fiks-faham-3.jpg' },
      { title: 'Detail Level', caption: 'Daftar sub-topik materi beserta tab quiz.', src: 'img/asset/screenshoot/fiks-faham/fiks-faham-4.jpg' }
    ],
    changelog: [
      { version: '1.0.0', date: '4 Oktober 2026', type: 'Rilis pertama', notes: ['Rilis perdana FiksFaham.', 'Fitur: materi, pre-test, post-test, video.'] }
    ],
    developerInfo: {
      studio: 'Faiza & Fishabella',
      founder: 'Faiza, Fishabella',
      founded: '2026',
      location: 'Surabaya, Indonesia',
      website: '-',
      email: '-',
      team: '2 orang',
      appsPublished: 1,
      responseTime: '-'
    },
    technical: {
      version: '1.0.0',
      size: '30 MB',
      updated: '4 Oktober 2026',
      requires: 'Android 8.0+',
      license: 'Gratis',
      languages: 'Bahasa Indonesia',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'net-skill',
    name: 'NetSkill',
    tagline: 'Kuasai jaringan komputer dari nol',
    category: 'Produktivitas',
    rating: 0,
    ratingCount: 0,
    downloads: '0',
    icon: 'img/asset/icon/net-skill.png',
    version: '1.0.0',
    updated: '2026-10-04',
    size: '26 MB',
    apkUrl: 'https://github.com/Ramaa-linux/nesastore/releases/latest/download/net-skill.apk',
    theme: { from: '#0ea5e9', to: '#14b8a6', accent: '#818cf8' },
    shortDescription:
      'Platform edukasi jaringan komputer dengan materi lengkap, pre-test, dan post-test.',
    fullDescription: [
      'NetSkill adalah platform edukasi yang fokus pada jaringan komputer. Tersedia materi terstruktur mulai dari dasar networking, subnetting, routing, hingga konfigurasi perangkat jaringan.',
      'Setiap materi dilengkapi pre-test dan post-test untuk mengukur pemahaman kamu. Cocok untuk mahasiswa, praktisi IT, atau siapa aja yang mau belajar jaringan dari nol.',
      'Materi disusun berdasarkan kurikulum industri, dengan contoh kasus nyata yang sering dijumpai di dunia kerja.'
    ],
    highlights: [
      'Materi jaringan komputer terstruktur',
      'Pre-test & post-test untuk evaluasi',
      'Contoh kasus nyata dari industri',
      'Cocok untuk pemula hingga mahir'
    ],
    screenshots: [
      { title: 'Beranda', caption: 'Ringkasan progres belajar dan daftar bab materi.', src: 'img/asset/screenshoot/net-skill/net-skill-1.jpg' },
      { title: 'Materi', caption: 'Empat bab jaringan: perangkat, topologi, sampai kabel & nirkabel.', src: 'img/asset/screenshoot/net-skill/net-skill-2.jpg' },
      { title: 'Progress', caption: 'Persentase penyelesaian tiap bab dalam satu halaman.', src: 'img/asset/screenshoot/net-skill/net-skill-3.jpg' },
      { title: 'Pre-Test', caption: 'Kerjakan pre-test sebelum masuk ke materi bab.', src: 'img/asset/screenshoot/net-skill/net-skill-4.jpg' }
    ],
    changelog: [
      { version: '1.0.0', date: '4 Oktober 2026', type: 'Rilis pertama', notes: ['Rilis perdana NetSkill.', 'Fitur: materi, pre-test, post-test.'] }
    ],
    developerInfo: {
      studio: 'Alwi & Bunga',
      founder: 'Alwi, Bunga',
      founded: '2026',
      location: 'Surabaya, Indonesia',
      website: '-',
      email: '-',
      team: '2 orang',
      appsPublished: 1,
      responseTime: '-'
    },
    technical: {
      version: '1.0.0',
      size: '26 MB',
      updated: '4 Oktober 2026',
      requires: 'Android 8.0+',
      license: 'Gratis',
      languages: 'Bahasa Indonesia',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'craft-cpp',
    name: 'CraftC++',
    tagline: 'Belajar C++ sambil ngoding langsung',
    category: 'Produktivitas',
    rating: 0,
    ratingCount: 0,
    downloads: '0',
    icon: 'img/asset/icon/craft-cpp.png',
    version: '1.0.0',
    updated: '2026-10-04',
    size: '120 MB',
    apkUrl: 'https://github.com/Ramaa-linux/nesastore/releases/latest/download/craft-cpp.apk',
    theme: { from: '#f59e0b', to: '#ef4444', accent: '#fbbf24' },
    shortDescription:
      'Aplikasi pembelajaran C++ dengan materi lengkap dan playground code interaktif.',
    fullDescription: [
      'CraftC++ adalah aplikasi pembelajaran pemrograman C++ yang menggabungkan materi terstruktur dengan playground code interaktif. Kamu bisa langsung mencoba kode yang dipelajari tanpa perlu install compiler terpisah.',
      'Materi disusun dari dasar: variabel, tipe data, kontrol alur, fungsi, pointer, hingga OOP. Setiap topik dilengkapi contoh kode yang bisa langsung dijalankan.',
      'Cocok untuk mahasiswa, pemula yang mau belajar C++, atau siapa aja yang ingin memperdalam skill programming.'
    ],
    highlights: [
      'Materi C++ dari dasar hingga OOP',
      'Playground code interaktif',
      'Contoh kode yang bisa langsung dijalankan',
      'Cocok untuk pemula & mahasiswa'
    ],
    screenshots: [
      { title: 'Menu Utama', caption: 'Progres belajar dan akses cepat materi.', src: 'img/asset/screenshoot/craft-cpp/craft-cpp-1.jpg' },
      { title: 'Materi', caption: '13 bab materi C++ beserta status penyelesaiannya.', src: 'img/asset/screenshoot/craft-cpp/craft-cpp-2.jpg' },
      { title: 'Coding Space', caption: 'Tulis, jalankan, dan uji kode C++ langsung di aplikasi.', src: 'img/asset/screenshoot/craft-cpp/craft-cpp-3.jpg' },
      { title: 'Progress Belajar', caption: 'Lihat bab yang selesai, terbuka, dan masih terkunci.', src: 'img/asset/screenshoot/craft-cpp/craft-cpp-4.jpg' },
      { title: 'Evaluasi', caption: 'Kerjakan soal evaluasi di akhir setiap bab.', src: 'img/asset/screenshoot/craft-cpp/craft-cpp-5.jpg' }
    ],
    changelog: [
      { version: '1.0.0', date: '4 Oktober 2026', type: 'Rilis pertama', notes: ['Rilis perdana CraftC++.', 'Fitur: materi, playground code.'] }
    ],
    developerInfo: {
      studio: 'Dziqro & Iqbal',
      founder: 'Dziqro, Iqbal',
      founded: '2026',
      location: 'Surabaya, Indonesia',
      website: '-',
      email: '-',
      team: '2 orang',
      appsPublished: 1,
      responseTime: '-'
    },
    technical: {
      version: '1.0.0',
      size: '120 MB',
      updated: '4 Oktober 2026',
      requires: 'Android 8.0+',
      license: 'Gratis',
      languages: 'Bahasa Indonesia',
      ageRating: '3+ (Semua umur)'
    }
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'netropia',
    name: 'netropia',
    tagline: 'Belajar Teknik Komputer & Jaringan dengan AI',
    category: 'Produktivitas',
    rating: 0,
    ratingCount: 0,
    downloads: '0',
    icon: 'img/asset/icon/netropia.png',
    version: '1.0.0',
    updated: '2026-10-04',
    size: '70 MB',
    apkUrl: 'https://github.com/Ramaa-linux/nesastore/releases/latest/download/netropia.apk',
    theme: { from: '#22c55e', to: '#0891b2', accent: '#fde047' },
    shortDescription:
      'Platform pembelajaran Teknik Komputer & Jaringan dengan materi, modul, simulasi jaringan, dan asisten AI.',
    fullDescription: [
      'netropia adalah platform pembelajaran Teknik Komputer & Jaringan yang lengkap. Tersedia materi terstruktur, modul pembelajaran, simulasi jaringan interaktif, dan asisten AI yang siap menjawab pertanyaan kamu 24/7.',
      'Simulasi jaringan memungkinkan kamu berlatih konfigurasi perangkat tanpa perlu hardware fisik. Asisten AI membantu menjelaskan konsep yang sulit dengan bahasa yang mudah dipahami.',
      'Cocok untuk siswa Teknik Komputer & Jaringan, praktisi IT, atau siapa aja yang ingin memperdalam skill networking.'
    ],
    highlights: [
      'Materi & modul Teknik Komputer & Jaringan',
      'Simulasi jaringan interaktif',
      'Asisten AI tanya-jawab 24/7',
      'Cocok untuk mahasiswa & praktisi IT'
    ],
    screenshots: [
      { title: 'Beranda', caption: 'Akses cepat materi TKJ, perangkat 3D, dan kalkulator subnet.', src: 'img/asset/screenshoot/netropia/netropia-1.jpg' },
      { title: 'Progress Belajar', caption: 'Pantau capaian tiap modul dalam satu halaman.', src: 'img/asset/screenshoot/netropia/netropia-2.jpg' },
      { title: 'Simulasi Jaringan', caption: 'Susun topologi dengan PC, switch, router, dan AP.', src: 'img/asset/screenshoot/netropia/netropia-3.jpg' },
      { title: 'Perangkat Jaringan', caption: 'Materi, video, latihan, hingga refleksi dalam satu menu.', src: 'img/asset/screenshoot/netropia/netropia-4.jpg' }
    ],
    changelog: [
      { version: '1.0.0', date: '4 Oktober 2026', type: 'Rilis pertama', notes: ['Rilis perdana netropia.', 'Fitur: materi, modul, simulasi, asisten AI.'] }
    ],
    developerInfo: {
      studio: 'Aziz & Zuhrifal',
      founder: 'Aziz, Zuhrifal',
      founded: '2026',
      location: 'Surabaya, Indonesia',
      website: '-',
      email: '-',
      team: '2 orang',
      appsPublished: 1,
      responseTime: '-'
    },
    technical: {
      version: '1.0.0',
      size: '70 MB',
      updated: '4 Oktober 2026',
      requires: 'Android 8.0+',
      license: 'Gratis',
      languages: 'Bahasa Indonesia',
      ageRating: '3+ (Semua umur)'
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

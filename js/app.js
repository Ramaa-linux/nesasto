/* ==========================================================================
   NesaStore - app.js
   Logika utama: router berbasis hash (tanpa reload), katalog, pencarian,
   filter kategori, halaman detail, tab, galeri, dan unduhan berkas APK.
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------- State UI */
  var state = {
    query: '',
    category: 'Semua',
    sort: 'populer'
  };

  var els = {};

  /* -------------------------------------------------------- Bantu internal */
  function byId(id) {
    return document.getElementById(id);
  }

  function getAppById(id) {
    return typeof APP_BY_ID !== 'undefined' ? APP_BY_ID[id] : null;
  }

  /* -------------------------------------------------- Filter kategori (chip) */
  function renderCategoryFilters() {
    var wrap = els.categoryFilters;
    if (!wrap) return;
    var html = '';
    CATEGORIES.forEach(function (cat) {
      var active = state.category === cat;
      html +=
        '<button type="button" data-category="' +
        escapeHtml(cat) +
        '" class="category-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ' +
        (active
          ? 'border-brand-400/50 bg-brand-500/20 text-white shadow-lg shadow-brand-600/20'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white') +
        '">' +
        escapeHtml(cat) +
        (cat === 'Semua'
          ? '<span class="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">' +
            APPS.length +
            '</span>'
          : '') +
        '</button>';
    });
    wrap.innerHTML = html;
  }

  /* ------------------------------------------------------ Filter + pengurutan */
  function getVisibleApps() {
    var q = state.query.trim().toLowerCase();

    var list = APPS.filter(function (app) {
      var cocokKategori = state.category === 'Semua' || app.category === state.category;
      var cocokNama =
        q === '' ||
        app.name.toLowerCase().indexOf(q) !== -1 ||
        app.developerInfo.studio.toLowerCase().indexOf(q) !== -1;
      return cocokKategori && cocokNama;
    });

    var salinan = list.slice();
    if (state.sort === 'rating') {
      salinan.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else if (state.sort === 'nama') {
      salinan.sort(function (a, b) {
        return a.name.localeCompare(b.name, 'id');
      });
    } else if (state.sort === 'terbaru') {
      salinan.sort(function (a, b) {
        return new Date(b.updated) - new Date(a.updated);
      });
    } else {
      salinan.sort(function (a, b) {
        return b.ratingCount - a.ratingCount;
      });
    }
    return salinan;
  }

  /* Lencana ketersediaan APK dihasilkan oleh apkStatusBadge() (js/utils.js).
     Tidak ada lagi status "terinstal" di sisi klien: NesaStore hanya
     mendistribusikan berkas .apk. */

  /* ---------------------------------------------------------- Kartu aplikasi */
  function appCardHTML(app) {
    return (
      '<article data-app="' +
      escapeHtml(app.id) +
      '" class="app-card group flex cursor-pointer flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400" tabindex="0" role="link" aria-label="Buka detail ' +
      escapeHtml(app.name) +
      '">' +

      '<div class="flex items-start gap-4">' +
      iconTile(app, 'h-16 w-16', 'text-3xl', 'rounded-2xl', 'app-card-icon') +
      '<div class="min-w-0 flex-1">' +
      '<div class="flex items-start justify-between gap-2">' +
      '<h3 class="truncate text-base font-bold text-white">' +
      escapeHtml(app.name) +
      '</h3>' +
      '</div>' +
      '<p class="mt-0.5 truncate text-xs text-slate-400">' +
      escapeHtml(app.developerInfo.studio) +
      '</p>' +
      '<div class="mt-2.5 flex flex-wrap items-center gap-2">' +
      categoryBadge(app.category) +
      apkStatusBadge(app) +
      '</div>' +
      '</div>' +
      '</div>' +

      '<p class="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-400">' +
      escapeHtml(app.shortDescription) +
      '</p>' +

      '<div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">' +
      starRatingHTML(app.rating) +
      '<span class="text-xs font-bold text-amber-400">' +
      formatRating(app.rating) +
      '</span>' +
      '<span class="text-xs text-slate-500">(' +
      formatCount(app.ratingCount) +
      ')</span>' +
      '</div>' +

      '<div class="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">' +
      '<div class="flex min-w-0 items-center gap-2 text-[11px] font-medium text-slate-500">' +
      '<span>' +
      escapeHtml(app.size) +
      '</span>' +
      '<span class="h-1 w-1 shrink-0 rounded-full bg-slate-600"></span>' +
      '<span class="truncate">' +
      escapeHtml(app.downloads) +
      ' unduhan</span>' +
      '</div>' +
      '<span class="btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition group-hover:bg-brand-600">' +
      'Lihat Detail' +
      '<svg class="h-3.5 w-3.5 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>' +
      '</span>' +
      '</div>' +

      '</article>'
    );
  }

  /* ------------------------------------------------------- Render katalog */
  function renderCatalog() {
    var list = getVisibleApps();
    var grid = els.appGrid;
    if (!grid) return;

    grid.innerHTML = list.map(appCardHTML).join('');

    if (els.resultsCount) {
      els.resultsCount.innerHTML =
        'Menampilkan <span class="font-semibold text-slate-200">' +
        list.length +
        '</span> dari ' +
        APPS.length +
        ' aplikasi' +
        (state.category !== 'Semua'
          ? ' &middot; kategori <span class="font-semibold text-slate-200">' + escapeHtml(state.category) + '</span>'
          : '') +
        (state.query.trim() !== ''
          ? ' &middot; kata kunci &ldquo;<span class="font-semibold text-slate-200">' + escapeHtml(state.query.trim()) + '</span>&rdquo;'
          : '');
    }

    if (els.emptyState) {
      els.emptyState.classList.toggle('hidden', list.length !== 0);
    }
    if (els.heroAppCount) {
      els.heroAppCount.textContent = String(APPS.length);
    }
  }

  /* =================================================================== DETAIL */

  var ICON_DOWNLOAD =
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M5 21h14"></path></svg>';
  var ICON_SPINNER =
    '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.56" opacity="0.9"></path></svg>';
  var ICON_EXTERNAL =
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"></path><path d="M20 4l-9 9"></path><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"></path></svg>';
  /* Lama hitung mundur (detik) sebelum berkas APK mulai diunduh. */
  var COUNTDOWN_SECONDS = 5;

  /* id aplikasi yang sedang menyiapkan unduhan + timer hitung mundurnya */
  var preparing = {};
  var countdownTimers = {};

  function downloadButtonClasses(app) {
    if (preparing[app.id]) {
      return 'btn-primary bg-brand-500/80 text-white cursor-wait';
    }
    if (!hasApk(app)) {
      return 'border border-white/10 bg-white/5 text-slate-400 cursor-not-allowed opacity-90';
    }
    return 'btn-primary bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 active:scale-[0.98]';
  }

  /**
   * Panel unduh APK pada halaman detail.
   *   - apkUrl ada    -> tombol "Download APK" (biru solid) + hitung mundur 5 detik
   *   - apkUrl kosong -> tombol dinonaktifkan, lencana "Segera Hadir"
   */
  function downloadAreaHTML(app) {
    var siap = hasApk(app);
    var menyiapkan = !!preparing[app.id];

    var label = menyiapkan ? 'Menyiapkan... ' + COUNTDOWN_SECONDS : 'Download APK';
    var icon = menyiapkan ? ICON_SPINNER : ICON_DOWNLOAD;
    var disabled = !siap || menyiapkan;

    var hint = siap
      ? 'Gratis &middot; ' + escapeHtml(app.size) + ' &middot; tanpa akun'
      : 'APK belum tersedia untuk diunduh.';
    if (menyiapkan) hint = 'Menyiapkan tautan unduhan...';

    return (
      '<div class="rounded-2xl border border-white/10 bg-ink-900/60 p-4">' +
      '<p class="mb-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">Unduh APK</p>' +
      '<button id="download-btn" type="button" ' +
      (disabled ? 'disabled ' : '') +
      'class="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ' +
      downloadButtonClasses(app) +
      '">' +
      icon +
      '<span id="download-btn-label">' +
      label +
      '</span>' +
      '</button>' +
      '<div id="download-progress" class="progress-track mt-3 ' +
      (menyiapkan ? '' : 'hidden') +
      '"><div id="download-progress-fill" class="progress-fill"></div></div>' +
      '<p id="download-hint" class="mt-3 text-center text-[11px] text-slate-500">' +
      hint +
      '</p>' +
      '<div class="mt-3 flex items-center justify-center gap-2 border-t border-white/5 pt-3 text-[11px] text-slate-500">' +
      '<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Diperiksa: tidak ada malware' +
      '</div>' +
      '</div>'
    );
  }

  /**
   * Baris versi Android minimum di bawah lencana kategori (sebelum rating).
   * Nilai diambil dari app.technical.requires lewat androidRequires() (js/utils.js).
   * Ukuran berkas (📦) tidak diulang di sini karena sudah tampil pada hint
   * tombol unduh di panel bawah.
   */
  function androidMinHTML(app) {
    var nilai = androidRequires(app);
    if (!nilai) return '';
    return (
      '<p class="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500" id="android-min">' +
      '<span aria-hidden="true">&#128241;</span>' +
      '<span>' +
      escapeHtml(nilai) +
      '</span>' +
      '</p>'
    );
  }

  /**
   * Lencana hijau "TERBARU" (lihat .version-badge di css/custom.css).
   */
  function latestVersionBadge() {
    return (
      '<span class="version-badge shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">' +
      'Terbaru' +
      '</span>'
    );
  }

  /**
   * Bagian "Versi Lain" di bawah tombol unduh. Daftar berasal dari
   * app.changelog (index 0 = versi terbaru) lewat versionHistory() (js/utils.js):
   *   - versi terbaru -> lencana "Terbaru" (unduhan sudah ada lewat tombol);
   *   - versi lama    -> baris tertaut ke GitHub Releases bila tautan tersedia;
   *   - hanya 1 versi -> tambahan catatan "Belum ada versi lain".
   * Elemen ini berada DI LUAR #download-area agar tidak ikut terhapus saat
   * hitung mundur unduhan me-render ulang panel tombol di atasnya.
   */
  function otherVersionsHTML(app) {
    var versi = versionHistory(app);

    var baris = versi
      .map(function (v) {
        var isi =
          '<div class="flex items-center justify-between gap-3">' +
          '<span class="flex min-w-0 items-baseline gap-2">' +
          '<span class="text-xs font-bold text-white">v' +
          escapeHtml(v.version) +
          '</span>' +
          '<span class="truncate text-[11px] text-slate-500">' +
          escapeHtml(v.date) +
          '</span>' +
          '</span>' +
          (v.isLatest
            ? latestVersionBadge()
            : v.url
            ? '<span class="shrink-0 text-slate-500 transition group-hover:text-brand-300">' +
              ICON_EXTERNAL +
              '</span>'
            : '') +
          '</div>';

        var kotak = 'rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2';
        return v.url && !v.isLatest
          ? '<a href="' +
              escapeHtml(v.url) +
              '" target="_blank" rel="noopener noreferrer" title="Buka rilis v' +
              escapeHtml(v.version) +
              ' di GitHub Releases" class="group block ' +
              kotak +
              ' transition hover:border-brand-400/40 hover:bg-white/[0.06]">' +
              isi +
              '</a>'
          : '<div class="' + kotak + '">' + isi + '</div>';
      })
      .join('');

    var catatan =
      versi.length <= 1
        ? '<p class="mt-2.5 text-[11px] italic text-slate-500">Belum ada versi lain</p>'
        : '';

    return (
      '<section class="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4" aria-label="Versi lain">' +
      '<p class="text-[11px] font-bold uppercase tracking-widest text-slate-500">Versi Lain</p>' +
      '<div class="mt-3 space-y-2">' +
      baris +
      '</div>' +
      catatan +
      '</section>'
    );
  }

  /* ------------------------------------------------------------ Tab: Deskripsi */
  function descriptionPanelHTML(app) {
    var paragraf = app.fullDescription
      .map(function (p) {
        return '<p class="text-sm leading-relaxed text-slate-300 sm:text-[15px]">' + escapeHtml(p) + '</p>';
      })
      .join('');

    var highlight = app.highlights
      .map(function (h) {
        return (
          '<li class="flex items-start gap-3 text-sm text-slate-300">' +
          '<span class="tag-neutral mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">' +
          '<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>' +
          '</span>' +
          '<span>' +
          escapeHtml(h) +
          '</span>' +
          '</li>'
        );
      })
      .join('');

    return (
      '<div class="grid gap-8 lg:grid-cols-3">' +
      '<div class="space-y-4 lg:col-span-2">' +
      paragraf +
      '</div>' +
      '<aside class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">' +
      '<h3 class="text-sm font-bold text-white">Keunggulan utama</h3>' +
      '<ul class="mt-4 space-y-3">' +
      highlight +
      '</ul>' +
      '</aside>' +
      '</div>'
    );
  }

  /* ------------------------------------------------- Tab: Tangkapan Layar */
  function screenshotsPanelHTML(app) {
    var thumbs = app.screenshots
      .map(function (shot, i) {
        return (
          '<button type="button" data-shot="' +
          i +
          '" class="shot-thumb shrink-0 overflow-hidden rounded-xl border border-white/10 bg-ink-900 ' +
          (i === 0 ? 'is-active' : '') +
          '" aria-label="Lihat ' +
          escapeHtml(shot.title) +
          '">' +
          '<img src="' +
          escapeHtml(screenshotSrc(app, i)) +
          '" alt="' +
          escapeHtml(shot.title) +
          '" class="h-20 w-12 object-cover sm:h-24 sm:w-14" loading="lazy" />' +
          '</button>'
        );
      })
      .join('');

    return (
      '<div>' +
      /* Screenshot aplikasi berbentuk potret (1080x2400), jadi panggung
         utamanya pun potret (kelas .shot-stage pada css/custom.css). */
      '<div class="shot-stage">' +
      '<img id="shot-main" src="' +
      escapeHtml(screenshotSrc(app, 0)) +
      '" alt="' +
      escapeHtml(app.screenshots[0].title) +
      '" />' +
      '<span class="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">' +
      '<span id="shot-index">1</span>/' +
      app.screenshots.length +
      '</span>' +
      '<button type="button" id="shot-prev" class="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70" aria-label="Sebelumnya">' +
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>' +
      '</button>' +
      '<button type="button" id="shot-next" class="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70" aria-label="Berikutnya">' +
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>' +
      '</button>' +
      '</div>' +
      '<div class="mt-4 text-center">' +
      '<p id="shot-title" class="text-sm font-bold text-white sm:text-base">' +
      escapeHtml(app.screenshots[0].title) +
      '</p>' +
      '<p id="shot-caption" class="mt-1 text-xs text-slate-400">' +
      escapeHtml(app.screenshots[0].caption) +
      '</p>' +
      '</div>' +
      '<div class="no-scrollbar mt-4 flex justify-center gap-3 overflow-x-auto pb-1">' +
      thumbs +
      '</div>' +
      '</div>'
    );
  }

  /* ------------------------------------------------------- Tab: Changelog */
  var BADGE_TIPE = {
    'Fitur baru': 'border-brand-400/30 bg-brand-500/15 text-brand-400',
    Perbaikan: 'border-amber-500/30 bg-amber-500/15 text-amber-300',
    'Rilis pertama': 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
  };

  function changelogPanelHTML(app) {
    var items = app.changelog
      .map(function (entry, i) {
        var catatan = entry.notes
          .map(function (n) {
            return (
              '<li class="flex items-start gap-3 text-sm text-slate-300">' +
              '<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500"></span>' +
              '<span>' +
              escapeHtml(n) +
              '</span>' +
              '</li>'
            );
          })
          .join('');

        var badge = BADGE_TIPE[entry.type] || 'border-white/15 bg-white/5 text-slate-300';

        return (
          '<li class="relative pl-8 sm:pl-10">' +
          '<span class="absolute left-0 top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 ' +
          (i === 0 ? 'border-brand-400 bg-brand-500' : 'border-slate-700 bg-ink-900') +
          '">' +
          '<span class="h-1.5 w-1.5 rounded-full ' +
          (i === 0 ? 'bg-white' : 'bg-slate-600') +
          '"></span>' +
          '</span>' +
          '<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">' +
          '<div class="flex flex-wrap items-center gap-2">' +
          '<span class="text-sm font-bold text-white">Versi ' +
          escapeHtml(entry.version) +
          '</span>' +
          (i === 0
            ? '<span class="tag-neutral rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">Terbaru</span>'
            : '') +
          '<span class="tag-neutral rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ' +
          badge +
          '">' +
          escapeHtml(entry.type) +
          '</span>' +
          '<span class="text-xs text-slate-500">' +
          escapeHtml(entry.date) +
          '</span>' +
          '</div>' +
          '<ul class="mt-3 space-y-2">' +
          catatan +
          '</ul>' +
          '</div>' +
          '</li>'
        );
      })
      .join('');

    return (
      '<div class="relative">' +
      '<span class="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/50 via-white/10 to-transparent"></span>' +
      '<ol class="space-y-6">' +
      items +
      '</ol>' +
      '</div>'
    );
  }

  /* ------------------------------------------------------- Tab: Info Teknis */
  function specRow(label, value) {
    return (
      '<div class="flex flex-col gap-0.5 border-b border-white/5 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">' +
      '<dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">' +
      escapeHtml(label) +
      '</dt>' +
      '<dd class="text-sm font-medium text-slate-200 sm:text-right">' +
      escapeHtml(value) +
      '</dd>' +
      '</div>'
    );
  }

  function developerCardHTML(app) {
    var d = app.developerInfo;

    function infoBox(label, value, accent) {
      return (
        '<div class="rounded-xl border border-white/10 bg-ink-900/60 p-3">' +
        '<p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">' +
        escapeHtml(label) +
        '</p>' +
        '<p class="mt-1 truncate text-sm font-medium ' +
        (accent ? 'text-brand-400' : 'text-slate-200') +
        '">' +
        escapeHtml(value) +
        '</p>' +
        '</div>'
      );
    }

    return (
      '<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:col-span-3">' +
      '<div class="flex items-start gap-4">' +
      '<span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl" style="background-image:linear-gradient(135deg,' +
      app.theme.accent +
      '33,' +
      app.theme.from +
      '55)">🏢</span>' +
      '<div class="min-w-0">' +
      '<h3 class="text-base font-bold text-white">' +
      escapeHtml(d.studio) +
      '</h3>' +
      '<p class="mt-0.5 text-xs text-slate-400">Kreator &middot; ' +
      escapeHtml(d.location) +
      '</p>' +
      '<p class="mt-3 text-sm leading-relaxed text-slate-300">Studio independen yang berdiri sejak ' +
      escapeHtml(d.founded) +
      ', dikelola oleh ' +
      escapeHtml(d.founder) +
      '. Tim beranggotakan ' +
      escapeHtml(d.team) +
      ' dengan ' +
      escapeHtml(String(d.appsPublished)) +
      ' aplikasi yang telah dirilis.</p>' +
      '</div>' +
      '</div>' +
      '<div class="mt-5 grid gap-3 sm:grid-cols-2">' +
      infoBox('Dukungan', d.email) +
      infoBox('Respon rata-rata', d.responseTime) +
      infoBox('Situs web', d.website, true) +
      infoBox('Aplikasi dirilis', d.appsPublished + ' aplikasi') +
      '</div>' +
      '</div>'
    );
  }

  function technicalPanelHTML(app) {
    var t = app.technical;
    var spesifikasi =
      specRow('Nama paket', 'com.nesastore.' + app.id.replace(/-/g, '')) +
      specRow('Versi saat ini', t.version) +
      specRow('Ukuran berkas', t.size) +
      specRow('Terakhir diperbarui', t.updated) +
      specRow('Kategori', app.category) +
      specRow('Kompatibilitas', t.requires) +
      specRow('Lisensi', t.license) +
      specRow('Bahasa', t.languages) +
      specRow('Rating usia', t.ageRating);

    return (
      '<div class="grid gap-6 lg:grid-cols-5">' +
      developerCardHTML(app) +
      '<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:col-span-2">' +
      '<h3 class="text-sm font-bold text-white">Informasi teknis</h3>' +
      '<dl class="mt-3">' +
      spesifikasi +
      '</dl>' +
      '</div>' +
      '</div>'
    );
  }

  /* -------------------------------------------------------- Header detail */
  var TABS = [
    { id: 'deskripsi', label: 'Deskripsi' },
    { id: 'screenshot', label: 'Tangkapan Layar' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'teknisi', label: 'Info Teknis' }
  ];

  function detailHeaderHTML(app) {
    var stats = [
      { label: 'Rating', value: formatRating(app.rating) + ' / 5' },
      { label: 'Unduhan', value: app.downloads },
      { label: 'Ukuran', value: app.size },
      { label: 'Diperbarui', value: formatDateLong(app.updated) }
    ];

    var statsHTML = stats
      .map(function (s) {
        return (
          '<div class="rounded-2xl border border-white/10 bg-ink-900/50 px-4 py-3">' +
          '<p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">' +
          escapeHtml(s.label) +
          '</p>' +
          '<p class="mt-1 text-sm font-bold text-white">' +
          escapeHtml(s.value) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<div class="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">' +
      '<div class="deco-light-only pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl" style="background-color:' +
      app.theme.from +
      '55"></div>' +
      '<div class="deco-light-only pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full blur-3xl" style="background-color:' +
      app.theme.accent +
      '33"></div>' +

      '<div class="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">' +
      '<div class="flex flex-col gap-5 sm:flex-row sm:items-start">' +
      iconTile(app, 'h-24 w-24 sm:h-28 sm:w-28', 'text-5xl sm:text-6xl', 'rounded-3xl') +
      '<div class="min-w-0">' +
      '<h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">' +
      escapeHtml(app.name) +
      '</h1>' +
      '<p class="mt-1.5 text-sm text-slate-300 sm:text-base">' +
      escapeHtml(app.tagline) +
      '</p>' +
      '<p class="mt-2.5 flex flex-wrap items-center gap-2 text-sm">' +
      '<span class="font-semibold text-brand-400">' +
      escapeHtml(app.developerInfo.studio) +
      '</span>' +
      '<span class="tag-neutral inline-flex items-center gap-1 rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-300">' +
      '<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>' +
      'Terverifikasi' +
      '</span>' +
      '</p>' +
      '<div class="mt-4 flex flex-wrap items-center gap-2">' +
      categoryBadge(app.category) +
      '<span class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">v' +
      escapeHtml(app.version) +
      '</span>' +
      '<span class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">' +
      escapeHtml(app.technical.ageRating) +
      '</span>' +
      '</div>' +
      androidMinHTML(app) +
      '<div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">' +
      starRatingHTML(app.rating) +
      '<span class="text-sm font-bold text-amber-400">' +
      formatRating(app.rating) +
      '</span>' +
      '<span class="text-xs text-slate-500">dari ' +
      formatCount(app.ratingCount) +
      ' ulasan</span>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="w-full shrink-0 lg:w-72">' +
      '<div id="download-area" data-app-id="' +
      escapeHtml(app.id) +
      '">' +
      downloadAreaHTML(app) +
      '</div>' +
      /* Bagian "Versi Lain" sengaja di LUAR #download-area supaya tetap tampil
         saat hitung mundur unduhan me-render ulang panel tombol di atasnya. */
      otherVersionsHTML(app) +
      '</div>' +
      '</div>' +

      '<div class="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">' +
      statsHTML +
      '</div>' +
      '</div>'
    );
  }

  /* -------------------------------------------------------------- Tab bar */
  function tabsHTML(active) {
    return (
      '<div class="no-scrollbar mt-8 flex gap-1 overflow-x-auto border-b border-white/10" role="tablist">' +
      TABS.map(function (tab) {
        return (
          '<button type="button" role="tab" data-tab="' +
          tab.id +
          '" aria-selected="' +
          (tab.id === active ? 'true' : 'false') +
          '" class="tab-btn whitespace-nowrap rounded-t-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white ' +
          (tab.id === active ? 'is-active' : '') +
          '">' +
          escapeHtml(tab.label) +
          '</button>'
        );
      }).join('') +
      '</div>'
    );
  }

  /* ------------------------------------------------------ Aplikasi serupa */
  function relatedHTML(app) {
    var related = APPS.filter(function (a) {
      return a.id !== app.id;
    })
      .sort(function (a, b) {
        var aSame = a.category === app.category ? 1 : 0;
        var bSame = b.category === app.category ? 1 : 0;
        return bSame - aSame || b.rating - a.rating;
      })
      .slice(0, 4);

    var cards = related
      .map(function (a) {
        return (
          '<a href="#/app/' +
          a.id +
          '" class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-brand-400/40 hover:bg-white/[0.06]">' +
          iconTile(a, 'h-12 w-12', 'text-xl') +
          '<div class="min-w-0 flex-1">' +
          '<p class="truncate text-sm font-bold text-white">' +
          escapeHtml(a.name) +
          '</p>' +
          '<p class="truncate text-[11px] text-slate-400">' +
          escapeHtml(a.category) +
          ' &middot; &#9733; ' +
          formatRating(a.rating) +
          '</p>' +
          '</div>' +
          '<svg class="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>' +
          '</a>'
        );
      })
      .join('');

    return (
      '<section class="mt-12">' +
      '<h2 class="text-lg font-bold text-white">Aplikasi serupa</h2>' +
      '<p class="mt-0.5 text-sm text-slate-400">Rekomendasi lain yang mungkin kamu suka.</p>' +
      '<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">' +
      cards +
      '</div>' +
      '</section>'
    );
  }

  /* ------------------------------------------------------- Render halaman */
  function renderDetail(app) {
    var back =
      '<a href="#/" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">' +
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>' +
      'Kembali ke Katalog' +
      '</a>';

    var panels =
      '<div class="pt-6">' +
      '<div class="tab-panel" data-panel="deskripsi">' + descriptionPanelHTML(app) + '</div>' +
      '<div class="tab-panel hidden" data-panel="screenshot">' + screenshotsPanelHTML(app) + '</div>' +
      '<div class="tab-panel hidden" data-panel="changelog">' + changelogPanelHTML(app) + '</div>' +
      '<div class="tab-panel hidden" data-panel="teknisi">' + technicalPanelHTML(app) + '</div>' +
      '</div>';

    els.detailView.innerHTML =
      '<div class="animate-fade-up">' +
      back +
      detailHeaderHTML(app) +
      tabsHTML('deskripsi') +
      panels +
      relatedHTML(app) +
      '</div>';

    bindDetailEvents(app);
  }

  /* ------------------------------------------ Area unduh (render ulang) */
  function refreshDownloadArea(app) {
    var area = byId('download-area');
    if (!area || area.getAttribute('data-app-id') !== app.id) return;

    area.innerHTML = downloadAreaHTML(app);

    var btn = byId('download-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        startDownload(app);
      });
    }
  }

  /* ------------------------ Hitung mundur 5 detik, lalu picu unduhan APK */
  function startDownload(app) {
    if (preparing[app.id]) return;

    if (!hasApk(app)) {
      toast('APK belum tersedia', 'hapus');
      return;
    }

    preparing[app.id] = true;
    refreshDownloadArea(app);

    var fill = byId('download-progress-fill');
    var label = byId('download-btn-label');
    var total = COUNTDOWN_SECONDS;
    var detik = 0;

    if (fill) fill.style.width = '0%';

    countdownTimers[app.id] = window.setInterval(function () {
      detik++;
      if (fill) fill.style.width = ((detik / total) * 100).toFixed(1) + '%';
      if (label) label.textContent = 'Menyiapkan... ' + (total - detik);

      if (detik >= total) {
        window.clearInterval(countdownTimers[app.id]);
        delete countdownTimers[app.id];
        window.setTimeout(function () {
          delete preparing[app.id];
          triggerDownload(app);
          toast('Mengunduh ' + app.name + '...', 'info');
          refreshDownloadArea(app);
        }, 320);
      }
    }, 1000);
  }

  /* Batalkan hitung mundur yang belum tuntas (mis. pengguna pindah halaman). */
  function cancelCountdown(id) {
    if (countdownTimers[id]) {
      window.clearInterval(countdownTimers[id]);
      delete countdownTimers[id];
    }
    delete preparing[id];
  }

  /* Memicu unduhan berkas APK lewat tautan tersembunyi. */
  function triggerDownload(app) {
    var link = document.createElement('a');
    link.href = app.apkUrl;
    link.download = app.id + '-v' + app.version + '.apk';
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 0);
  }

  /* -------------------------------------------------- Event pada halaman detail */
  function bindDetailEvents(app) {
    var root = els.detailView;
    if (!root) return;

    /* --- Tab --- */
    var tabButtons = root.querySelectorAll('[data-tab]');
    var panels = root.querySelectorAll('.tab-panel');

    function activateTab(id) {
      Array.prototype.forEach.call(tabButtons, function (btn) {
        var on = btn.getAttribute('data-tab') === id;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      Array.prototype.forEach.call(panels, function (panel) {
        panel.classList.toggle('hidden', panel.getAttribute('data-panel') !== id);
      });
    }

    Array.prototype.forEach.call(tabButtons, function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn.getAttribute('data-tab'));
      });
    });

    /* --- Galeri screenshot --- */
    var shots = app.screenshots;
    var index = 0;
    var mainImg = byId('shot-main');
    var titleEl = byId('shot-title');
    var captionEl = byId('shot-caption');
    var indexEl = byId('shot-index');
    var thumbs = root.querySelectorAll('[data-shot]');

    /* Cadangan galeri: bila berkas .jpg gagal dimuat, tampilkan placeholder SVG
       agar galeri tidak pernah kosong. */
    function pasangCadangan(img, shotIndex) {
      if (!img) return;
      img.addEventListener('error', function () {
        if (img.getAttribute('data-fallback') === '1') return;
        img.setAttribute('data-fallback', '1');
        img.setAttribute('src', placeholderSVG(app, shotIndex));
      });
    }
    pasangCadangan(mainImg, 0);
    Array.prototype.forEach.call(thumbs, function (t, i) {
      pasangCadangan(t.querySelector('img'), i);
    });

    function showShot(next) {
      index = (next + shots.length) % shots.length;
      if (mainImg) {
        mainImg.style.opacity = '0';
        var src = screenshotSrc(app, index);
        window.setTimeout(function () {
          /* Penanda cadangan dilepas supaya berkas asli tetap dicoba lagi. */
          mainImg.removeAttribute('data-fallback');
          mainImg.setAttribute('src', src);
          mainImg.setAttribute('alt', shots[index].title);
          mainImg.style.opacity = '1';
        }, 140);
      }
      if (titleEl) titleEl.textContent = shots[index].title;
      if (captionEl) captionEl.textContent = shots[index].caption;
      if (indexEl) indexEl.textContent = String(index + 1);
      Array.prototype.forEach.call(thumbs, function (t, i) {
        t.classList.toggle('is-active', i === index);
      });
    }

    Array.prototype.forEach.call(thumbs, function (t) {
      t.addEventListener('click', function () {
        showShot(parseInt(t.getAttribute('data-shot'), 10) || 0);
      });
    });

    var prev = byId('shot-prev');
    var next = byId('shot-next');
    if (prev) prev.addEventListener('click', function () { showShot(index - 1); });
    if (next) next.addEventListener('click', function () { showShot(index + 1); });

    /* --- Tombol unduh APK --- */
    refreshDownloadArea(app);
  }

  /* ================================================================== TENTANG */
  function renderAbout() {
    if (!els.aboutView) return;

    var kategori = CATEGORIES.filter(function (c) {
      return c !== 'Semua';
    })
      .map(function (c) {
        return categoryBadge(c);
      })
      .join(' ');

    els.aboutView.innerHTML =
      '<div class="animate-fade-up">' +
      '<a href="#/" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">' +
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>' +
      'Kembali ke Katalog</a>' +

      '<div class="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">' +
      '<h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Tentang NesaStore</h1>' +
      '<p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">NesaStore (\u201cApp-Store nya warga NESA\u201d) adalah contoh katalog aplikasi (App Store mini) yang dibuat sebagai demo antarmuka. Seluruh aplikasi, kreator, rating, dan changelog di dalamnya bersifat fiktif dan hanya untuk keperluan peragaan.</p>' +
      '<div class="mt-6 flex flex-wrap gap-2">' + kategori + '</div>' +
      '</div>' +

      '<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">' +
      aboutCard('HTML5', 'Struktur halaman dan markup semantik tanpa framework.') +
      aboutCard('Tailwind CSS', 'Ditambahkan melalui CDN untuk penataan gaya yang cepat.') +
      aboutCard('Vanilla JavaScript', 'Routing hash, pencarian, tab, galeri, dan unduhan APK.') +
      aboutCard('Tanpa server', 'Cukup dibuka langsung lewat peramban (protocol file://).') +
      '</div>' +

      '<div class="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">' +
      '<h2 class="text-lg font-bold text-white">Cara memakai</h2>' +
      '<ol class="mt-4 space-y-3 text-sm text-slate-300">' +
      aboutStep(1, 'Ketik nama aplikasi pada kolom pencarian untuk menyaring katalog.') +
      aboutStep(2, 'Pilih kategori atau ubah urutan daftar sesuai keinginan.') +
      aboutStep(3, 'Klik kartu aplikasi atau tombol "Lihat Detail" untuk membuka halaman detail.') +
      aboutStep(4, 'Tekan tombol "Download APK", tunggu hitung mundur 5 detik, lalu berkas APK mulai diunduh.') +
      '</ol>' +
      '<p class="mt-5 text-xs text-slate-500">NesaStore hanya mendistribusikan berkas APK. Proses pemasangan ke perangkat dilakukan di luar situs ini.</p>' +
      '</div>' +
      '</div>';
  }

  function aboutCard(title, text) {
    return (
      '<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">' +
      '<p class="text-sm font-bold text-white">' +
      escapeHtml(title) +
      '</p>' +
      '<p class="mt-1.5 text-xs leading-relaxed text-slate-400">' +
      escapeHtml(text) +
      '</p>' +
      '</div>'
    );
  }

  function aboutStep(no, text) {
    return (
      '<li class="flex items-start gap-3">' +
      '<span class="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-xs font-bold text-brand-400">' +
      no +
      '</span>' +
      '<span>' +
      escapeHtml(text) +
      '</span>' +
      '</li>'
    );
  }

  /* ============================================================ TEMA (3-mode) */

  var THEME_KEY = 'nesastore-theme';
  var THEME_VALUES = ['light', 'dark', 'system'];

  function getStoredTheme() {
    try {
      var v = window.localStorage.getItem(THEME_KEY);
      return THEME_VALUES.indexOf(v) !== -1 ? v : 'system';
    } catch (e) {
      return 'system';
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* localStorage tidak tersedia -> tema tetap dipakai untuk sesi ini */
    }
  }

  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function themeIsDark(theme) {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return systemPrefersDark();
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.classList.toggle('dark', themeIsDark(theme));
    root.setAttribute('data-theme', theme);
  }

  function markActiveTheme(theme) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-theme-value]'), function (btn) {
      var on = btn.getAttribute('data-theme-value') === theme;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setTheme(theme, opts) {
    if (THEME_VALUES.indexOf(theme) === -1) theme = 'system';
    storeTheme(theme);

    var root = document.documentElement;
    var animate = !(opts && opts.silent);
    if (animate) {
      root.classList.add('theme-switching');
      void root.offsetWidth; /* paksa reflow agar transisi 200ms berjalan */
    }

    applyTheme(theme);
    markActiveTheme(theme);

    if (animate) {
      window.setTimeout(function () {
        root.classList.remove('theme-switching');
      }, 240);
    }
  }

  function initTheme() {
    var theme = getStoredTheme();
    applyTheme(theme);
    markActiveTheme(theme);

    var toggle = byId('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (evt) {
        var btn = evt.target.closest('[data-theme-value]');
        if (!btn) return;
        setTheme(btn.getAttribute('data-theme-value'));
      });
    }

    /* Saat mode 'system', ikuti perubahan preferensi sistem secara langsung */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onSystemChange = function () {
        if (getStoredTheme() === 'system') applyTheme('system');
      };
      if (mq.addEventListener) {
        mq.addEventListener('change', onSystemChange);
      } else if (mq.addListener) {
        mq.addListener(onSystemChange);
      }
    }
  }

  /* ================================================================= ROUTER */

  function parseRoute() {
    var hash = window.location.hash || '';
    hash = hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(function (p) {
      return p !== '';
    });

    if (parts.length === 0) return { view: 'catalog' };
    if (parts[0] === 'app' && parts[1]) return { view: 'detail', id: decodeURIComponent(parts[1]) };
    if (parts[0] === 'tentang') return { view: 'about' };
    return { view: 'catalog' };
  }

  function showView(name) {
    if (els.catalogView) els.catalogView.classList.toggle('hidden', name !== 'catalog');
    if (els.detailView) els.detailView.classList.toggle('hidden', name !== 'detail');
    if (els.aboutView) els.aboutView.classList.toggle('hidden', name !== 'about');
  }

  function updateNavActive() {
    var route = parseRoute();
    Array.prototype.forEach.call(document.querySelectorAll('.nav-link'), function (link) {
      var href = link.getAttribute('href');
      var on =
        (route.view === 'catalog' && href === '#/') || (route.view === 'about' && href === '#/tentang');
      link.classList.toggle('bg-white/5', on);
      link.classList.toggle('text-white', on);
      link.classList.toggle('text-slate-300', !on);
    });
  }

  function router() {
    var route = parseRoute();

    /* Batalkan hitung mundur unduhan yang tertinggal saat pindah halaman. */
    Object.keys(countdownTimers).forEach(function (id) {
      if (route.view !== 'detail' || route.id !== id) cancelCountdown(id);
    });

    if (route.view === 'detail') {
      var app = getAppById(route.id);
      if (!app) {
        toast('Aplikasi tidak ditemukan.', 'hapus');
        window.location.hash = '#/';
        return;
      }
      showView('detail');
      renderDetail(app);
      document.title = app.name + ' \u2014 NesaStore';
    } else if (route.view === 'about') {
      showView('about');
      renderAbout();
      document.title = 'Tentang \u2014 NesaStore';
    } else {
      showView('catalog');
      renderCatalog();
      document.title = 'NesaStore \u2014 Katalog Aplikasi';
    }

    updateNavActive();
    window.scrollTo(0, 0);
  }

  /* =================================================================== EVENT */

  function bindGlobalEvents() {
    /* Pencarian */
    if (els.searchInput) {
      els.searchInput.addEventListener('input', function () {
        state.query = els.searchInput.value;
        if (els.clearSearch) {
          var kosong = state.query.trim() === '';
          els.clearSearch.classList.toggle('hidden', kosong);
          els.clearSearch.classList.toggle('grid', !kosong);
        }
        renderCatalog();
      });
    }

    if (els.clearSearch) {
      els.clearSearch.addEventListener('click', function () {
        state.query = '';
        if (els.searchInput) {
          els.searchInput.value = '';
          els.searchInput.focus();
        }
        els.clearSearch.classList.add('hidden');
        els.clearSearch.classList.remove('grid');
        renderCatalog();
      });
    }

    /* Tombol cari di header (mobile) */
    if (els.headerSearchBtn) {
      els.headerSearchBtn.addEventListener('click', function () {
        var hash = window.location.hash;
        if (hash && hash !== '#/') window.location.hash = '#/';
        window.setTimeout(function () {
          if (els.searchInput) {
            els.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            els.searchInput.focus();
          }
        }, 120);
      });
    }

    /* Pengurutan */
    if (els.sortSelect) {
      els.sortSelect.addEventListener('change', function () {
        state.sort = els.sortSelect.value;
        renderCatalog();
      });
    }

    /* Filter kategori */
    if (els.categoryFilters) {
      els.categoryFilters.addEventListener('click', function (evt) {
        var chip = evt.target.closest('[data-category]');
        if (!chip) return;
        state.category = chip.getAttribute('data-category');
        renderCategoryFilters();
        renderCatalog();
      });
    }

    /* Reset filter */
    if (els.resetFilters) {
      els.resetFilters.addEventListener('click', function () {
        state.query = '';
        state.category = 'Semua';
        state.sort = 'populer';
        if (els.searchInput) els.searchInput.value = '';
        if (els.sortSelect) els.sortSelect.value = 'populer';
        if (els.clearSearch) {
          els.clearSearch.classList.add('hidden');
          els.clearSearch.classList.remove('grid');
        }
        renderCategoryFilters();
        renderCatalog();
      });
    }

    /* Klik / Enter pada kartu aplikasi */
    if (els.appGrid) {
      els.appGrid.addEventListener('click', function (evt) {
        var card = evt.target.closest('[data-app]');
        if (!card) return;
        window.location.hash = '#/app/' + card.getAttribute('data-app');
      });

      els.appGrid.addEventListener('keydown', function (evt) {
        if (evt.key !== 'Enter' && evt.key !== ' ' && evt.key !== 'Spacebar') return;
        var card = evt.target.closest('[data-app]');
        if (!card) return;
        evt.preventDefault();
        window.location.hash = '#/app/' + card.getAttribute('data-app');
      });
    }

    /* Tombol Esc untuk kembali ke katalog */
    document.addEventListener('keydown', function (evt) {
      if (evt.key !== 'Escape') return;
      if (parseRoute().view !== 'catalog') window.location.hash = '#/';
    });

    /* Perubahan hash = navigasi tanpa reload */
    window.addEventListener('hashchange', router);
  }

  /* ==================================================================== INIT */

  function init() {
    els = {
      appGrid: byId('app-grid'),
      emptyState: byId('empty-state'),
      resultsCount: byId('results-count'),
      heroAppCount: byId('hero-app-count'),
      searchInput: byId('search-input'),
      clearSearch: byId('clear-search'),
      sortSelect: byId('sort-select'),
      categoryFilters: byId('category-filters'),
      resetFilters: byId('reset-filters'),
      headerSearchBtn: byId('header-search-btn'),
      catalogView: byId('catalog-view'),
      detailView: byId('detail-view'),
      aboutView: byId('about-view'),
      yearEl: byId('year')
    };

    if (els.yearEl) els.yearEl.textContent = String(new Date().getFullYear());

    renderCategoryFilters();
    initTheme();
    bindGlobalEvents();

    /* Tanpa hash -> arahkan ke katalog agar tombol kembali peramban rapi */
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    router();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

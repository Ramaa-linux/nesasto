/* ==========================================================================
   NesaStore - utils.js
   Fungsi bantu: escaping, format angka, bintang rating, gaya kategori,
   generator gambar placeholder (SVG), toast, dan penyimpanan lokal.
   ========================================================================== */

/* ---------------------------------------------------------------- Escaping */
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ------------------------------------------------------------- Format angka */
function formatCount(n) {
  return new Intl.NumberFormat('id-ID').format(n);
}

function formatRating(n) {
  return (Math.round(n * 10) / 10).toFixed(1);
}

function formatDateLong(iso) {
  var bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  var d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

/* ------------------------------------------------------------ Rating bintang */
var STAR_PATH =
  'M12 2.6l2.86 5.98 6.5.72-4.83 4.42 1.3 6.38L12 16.96 6.17 20.1l1.3-6.38L2.64 9.3l6.5-.72L12 2.6z';

function starRow(extraClass) {
  var out = '';
  for (var i = 0; i < 5; i++) {
    out +=
      '<svg class="h-3.5 w-3.5 shrink-0 ' + extraClass + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' +
      STAR_PATH +
      '"></path></svg>';
  }
  return out;
}

/**
 * Baris bintang yang mendukung nilai desimal (mis. 4.7).
 * Lapisan dasar berwarna abu-abu, lapisan atas berwarna emas
 * dipotong memakai clip-path sesuai persentase rating.
 */
function starRatingHTML(rating) {
  var pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  var clip = 'inset(0 ' + (100 - pct).toFixed(1) + '% 0 0)';
  return (
    '<span class="relative inline-flex align-middle" role="img" aria-label="Rating ' +
    formatRating(rating) +
    ' dari 5">' +
    '<span class="flex gap-0.5 text-slate-600/80">' +
    starRow('') +
    '</span>' +
    '<span class="absolute inset-0 flex gap-0.5 text-accent-400" style="clip-path:' +
    clip +
    ';-webkit-clip-path:' +
    clip +
    '">' +
    starRow('') +
    '</span>' +
    '</span>'
  );
}

/* ------------------------------------------------------------- Gaya kategori */
var CATEGORY_STYLES = {
  Game: { badge: 'border-fuchsia-500/25 bg-fuchsia-500/15 text-fuchsia-300', hex: '#e879f9' },
  Produktivitas: { badge: 'border-sky-500/25 bg-sky-500/15 text-sky-300', hex: '#38bdf8' },
  Tools: { badge: 'border-amber-500/25 bg-amber-500/15 text-amber-300', hex: '#fbbf24' },
  Desain: { badge: 'border-pink-500/25 bg-pink-500/15 text-pink-300', hex: '#f472b6' },
  Multimedia: { badge: 'border-emerald-500/25 bg-emerald-500/15 text-emerald-300', hex: '#34d399' }
};

function categoryStyle(category) {
  return CATEGORY_STYLES[category] || { badge: 'border-slate-500/25 bg-slate-500/15 text-slate-300', hex: '#94a3b8' };
}

function categoryBadge(category, extra) {
  return (
    /* Kelas .cat-badge membuat lencana ini abu-abu netral saat mode gelap
       (lihat blok "MODE GELAP MINIMALIS" pada css/custom.css). */
    '<span class="cat-badge inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ' +
    categoryStyle(category).badge +
    ' ' +
    (extra || '') +
    '">' +
    '<span class="cat-dot h-1.5 w-1.5 rounded-full" style="background-color:' +
    categoryStyle(category).hex +
    '"></span>' +
    escapeHtml(category) +
    '</span>'
  );
}

/* ---------------------------------------------------------------- Ikon tile */
function iconTile(app, sizeClasses, fontSizeClasses, radiusClass, extraClass) {
  return (
    /* .app-tile: di mode gelap gradient + glow tile diganti permukaan abu solid
       (lihat css/custom.css). Gradient tetap dipertahankan untuk mode terang. */
    '<span class="app-tile grid shrink-0 place-items-center ' +
    (radiusClass || 'rounded-2xl') +
    ' ' +
    (extraClass || '') +
    ' ' +
    sizeClasses +
    '" style="background-image:linear-gradient(135deg,' +
    app.theme.from +
    ',' +
    app.theme.to +
    ');box-shadow:0 14px 34px -14px ' +
    app.theme.from +
    'cc">' +
    '<span class="' +
    fontSizeClasses +
    ' leading-none drop-shadow-sm">' +
    app.icon +
    '</span>' +
    '</span>'
  );
}

/* ------------------------------------------------- Generator screenshot SVG
   Menghasilkan data-URI SVG sehingga galeri tetap tampil walau tanpa internet.
   ------------------------------------------------------------------------- */
var SHOT_BODIES = [
  '<rect x="200" y="248" width="190" height="240" rx="16" fill="#ffffff" fill-opacity="0.13"/>' +
    '<rect x="418" y="248" width="240" height="112" rx="16" fill="#ffffff" fill-opacity="0.20"/>' +
    '<rect x="678" y="248" width="322" height="112" rx="16" fill="#ffffff" fill-opacity="0.15"/>' +
    '<rect x="418" y="378" width="582" height="110" rx="16" fill="#ffffff" fill-opacity="0.11"/>',

  '<rect x="440" y="240" width="320" height="272" rx="34" fill="#ffffff" fill-opacity="0.14"/>' +
    '<rect x="470" y="286" width="260" height="18" rx="9" fill="#ffffff" fill-opacity="0.36"/>' +
    '<rect x="470" y="318" width="180" height="14" rx="7" fill="#ffffff" fill-opacity="0.22"/>' +
    '<circle cx="600" cy="414" r="52" fill="#ffffff" fill-opacity="0.28"/>' +
    '<rect x="520" y="488" width="160" height="12" rx="6" fill="#ffffff" fill-opacity="0.22"/>',

  '<rect x="220" y="430" width="60" height="70" rx="10" fill="#ffffff" fill-opacity="0.24"/>' +
    '<rect x="300" y="380" width="60" height="120" rx="10" fill="#ffffff" fill-opacity="0.30"/>' +
    '<rect x="380" y="330" width="60" height="170" rx="10" fill="#ffffff" fill-opacity="0.36"/>' +
    '<rect x="460" y="400" width="60" height="100" rx="10" fill="#ffffff" fill-opacity="0.24"/>' +
    '<rect x="540" y="300" width="60" height="200" rx="10" fill="#ffffff" fill-opacity="0.42"/>' +
    '<rect x="620" y="360" width="60" height="140" rx="10" fill="#ffffff" fill-opacity="0.30"/>' +
    '<rect x="700" y="320" width="60" height="180" rx="10" fill="#ffffff" fill-opacity="0.36"/>' +
    '<rect x="780" y="410" width="60" height="90" rx="10" fill="#ffffff" fill-opacity="0.22"/>',

  '<rect x="220" y="260" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.20"/>' +
    '<rect x="400" y="260" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.14"/>' +
    '<rect x="580" y="260" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.20"/>' +
    '<rect x="760" y="260" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.14"/>' +
    '<rect x="220" y="390" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.14"/>' +
    '<rect x="400" y="390" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.20"/>' +
    '<rect x="580" y="390" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.14"/>' +
    '<rect x="760" y="390" width="160" height="110" rx="14" fill="#ffffff" fill-opacity="0.20"/>'
];

function placeholderSVG(app, index) {
  var theme = app.theme;
  var shot = app.screenshots[index] || { title: 'Tangkapan Layar', caption: '' };
  var W = 1200;
  var H = 675;

  var defs =
    '<defs>' +
    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="' + theme.from + '"/>' +
    '<stop offset="100%" stop-color="' + theme.to + '"/>' +
    '</linearGradient>' +
    '<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#05070f" stop-opacity="0"/>' +
    '<stop offset="100%" stop-color="#05070f" stop-opacity="0.82"/>' +
    '</linearGradient>' +
    '<filter id="soft" x="-30%" y="-30%" width="160%" height="160%">' +
    '<feGaussianBlur stdDeviation="70"/>' +
    '</filter>' +
    '<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">' +
    '<path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>' +
    '</pattern>' +
    '</defs>';

  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img">' +
    defs +
    '<rect width="' + W + '" height="' + H + '" fill="#080b16"/>' +
    '<rect width="' + W + '" height="' + H + '" fill="url(#bg)" fill-opacity="0.92"/>' +
    '<rect width="' + W + '" height="' + H + '" fill="url(#grid)"/>' +
    '<circle cx="170" cy="120" r="200" fill="#ffffff" fill-opacity="0.14" filter="url(#soft)"/>' +
    '<circle cx="1050" cy="580" r="220" fill="' + theme.accent + '" fill-opacity="0.40" filter="url(#soft)"/>' +
    SHOT_BODIES[index % SHOT_BODIES.length] +
    '<rect width="' + W + '" height="' + H + '" fill="url(#fade)"/>' +
    '<text x="80" y="112" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="700" fill="#ffffff" fill-opacity="0.75" letter-spacing="4">' +
    escapeHtml(app.name.toUpperCase()) +
    '</text>' +
    '<text x="' + (W - 80) + '" y="112" text-anchor="end" font-family="Inter, Segoe UI, sans-serif" font-size="24" font-weight="700" fill="#ffffff" fill-opacity="0.6">' +
    escapeHtml(app.category) +
    '</text>' +
    '<text x="80" y="586" font-family="Inter, Segoe UI, sans-serif" font-size="52" font-weight="800" fill="#ffffff">' +
    escapeHtml(shot.title) +
    '</text>' +
    '<text x="80" y="628" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="400" fill="#ffffff" fill-opacity="0.72">' +
    escapeHtml(shot.caption) +
    '</text>' +
    '</svg>';

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ------------------------------------------------------------------- Toast */
var TOAST_ICONS = {
  sukses:
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
  info:
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path></svg>',
  hapus:
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"></path></svg>'
};

var TOAST_TONES = {
  sukses: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  info: 'border-brand-400/30 bg-brand-500/10 text-brand-400',
  hapus: 'border-rose-500/30 bg-rose-500/10 text-rose-300'
};

function toast(message, type, duration) {
  var container = document.getElementById('toast-container');
  if (!container) return;
  var kind = TOAST_TONES[type] ? type : 'info';

  var el = document.createElement('div');
  /* Latar solid (mode gelap #1c2128 / mode terang putih) → tidak perlu backdrop-blur. */
  el.className =
    'toast flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-850/95 p-4 shadow-2xl shadow-black/60';
  el.setAttribute('role', 'status');
  el.innerHTML =
    '<span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border ' +
    TOAST_TONES[kind] +
    '">' +
    TOAST_ICONS[kind] +
    '</span>' +
    '<div class="min-w-0 flex-1">' +
    '<p class="text-sm font-semibold text-white">' +
    escapeHtml(message) +
    '</p>' +
    '</div>' +
    '<button type="button" class="toast-close -mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Tutup notifikasi">' +
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>' +
    '</button>';

  function dismiss() {
    if (el.classList.contains('is-leaving')) return;
    el.classList.add('is-leaving');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 320);
  }

  el.querySelector('.toast-close').addEventListener('click', dismiss);
  container.appendChild(el);
  setTimeout(dismiss, duration || 3200);
}

/* -------------------------------------------------------- Status pemasangan */
var STORAGE_KEY = 'nesastore.installed.v1';
var memoryStore = {};

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function getInstalledMap() {
  var raw = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    raw = null;
  }
  var map = safeParse(raw);
  Object.keys(memoryStore).forEach(function (k) {
    map[k] = memoryStore[k];
  });
  return map;
}

function isInstalled(id) {
  return !!getInstalledMap()[id];
}

function setInstalled(id, value) {
  var map = getInstalledMap();
  if (value) {
    map[id] = Date.now();
    memoryStore[id] = Date.now();
  } else {
    delete map[id];
    delete memoryStore[id];
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    /* localStorage tidak tersedia (mis. mode privat) -> pakai memoryStore */
  }
}

/**
 * Latihan Soal (Advanced) — studi kasus praktik lanjutan.
 * Semua studi kasus ini menyasar SATU web tumbal yang sama: NUSANTARA MART
 * (project terpisah, lihat /home/ice/Projects/vuln-lab — kamu deploy sendiri
 * lalu ganti TARGET_BASE_URL di bawah dengan URL asli hasil deploy-mu).
 *
 * Skema tiap exercise:
 * { id, order, title, category, scenario, objective, tasks: [...],
 *   check: { placeholder, accepted: [...], explanation } }
 */

export const TARGET = {
  name: 'NUSANTARA MART',
  baseUrl: 'https://nusantara-mart.ct.ws/',
  credentials: [
    { username: 'alice', password: 'alice123' },
    { username: 'bob', password: 'bob12345' }
  ],
  note: 'Kredensial di atas cuma buat login sebagai user biasa. Jangan cari tahu password admin dari sini — itu justru bagian dari beberapa studi kasus di bawah.'
};

export const EXERCISES = [
  {
    id: 'sqli-login-bypass',
    order: 1,
    title: 'Login Tanpa Tahu Password Siapa Pun',
    category: 'SQL Injection',
    scenario: 'Manajemen NUSANTARA MART curiga form login mereka bisa ditembus tanpa kredensial yang valid, tapi tim internal mereka tidak berhasil membuktikannya. Kamu direkrut sebagai pentester eksternal untuk memverifikasi kecurigaan itu. Kamu tidak diberi akses source code — murni black-box, hanya boleh berinteraksi lewat form login yang tersedia di halaman publik.',
    objective: 'Buktikan kamu bisa masuk sebagai akun admin tanpa mengetahui password admin sama sekali, semata-mata lewat form login.',
    tasks: [
      'Coba masukkan karakter-karakter khas SQL injection (tanda kutip tunggal, dst) ke field username, perhatikan bagaimana aplikasi merespons — apakah muncul error yang membocorkan informasi query?',
      'Kalau field username memang rentan, pikirkan payload yang membuat kondisi WHERE di query login selalu bernilai benar, atau yang membuat sisa query setelah username-mu jadi tidak relevan (di-comment-out).',
      'Targetkan supaya baris yang ter-fetch adalah baris milik user dengan role admin, bukan sekadar "user pertama yang ketemu" — coba arahkan spesifik ke username admin di payload-mu.',
      'Begitu berhasil masuk, buka halaman dashboard admin dan catat flag yang tampil di sana.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{sqli_login_bypass_9f3a21}'],
      explanation: 'Payload seperti username `admin\' -- ` (dengan spasi setelah `--`) membuat sisa query jadi komentar, sehingga syarat password tidak pernah dicek sama sekali.'
    }
  },
  {
    id: 'sqli-union-extract',
    order: 2,
    title: 'Menarik Data yang Tidak Seharusnya Kamu Lihat',
    category: 'SQL Injection',
    scenario: 'Fitur pencarian produk di NUSANTARA MART terlihat biasa saja — ketik kata kunci, muncul daftar produk yang cocok. Tapi klien minta kamu memverifikasi apakah fitur pencarian ini bisa disalahgunakan untuk membaca data dari tabel lain di database yang sama sekali tidak berhubungan dengan produk.',
    objective: 'Gunakan UNION-based SQL injection di fitur pencarian untuk mengekstrak nilai dari tabel lain (bukan tabel produk) dan temukan flag yang tersimpan di sana.',
    tasks: [
      'Cari tahu dulu berapa jumlah kolom yang dikembalikan query pencarian — coba teknik `ORDER BY` dengan angka naik sampai muncul error, atau langsung uji coba UNION SELECT dengan jumlah kolom berbeda-beda.',
      'Setelah tahu jumlah kolomnya, susun payload UNION SELECT yang mengambil data dari tabel bernama `secrets` (kamu perlu menebak/menemukan nama tabel dan kolomnya lewat percobaan, atau lewat teknik enumerasi skema SQLite).',
      'Perhatikan tipe data tiap kolom hasil SELECT asli — kalau UNION-mu gagal karena mismatch tipe, sesuaikan placeholder kolommu (angka vs string).',
      'Begitu berhasil, nilai kolom yang kamu ekstrak dari tabel secrets itu sendiri adalah flag-nya.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{union_select_extract_2b7cd4}'],
      explanation: 'Query aslinya mengembalikan 3 kolom (id, name, price). Payload seperti `zzz\' UNION SELECT id, secret_value, 1 FROM secrets -- ` menyisipkan baris dari tabel secrets ke posisi kolom "name" pada hasil pencarian.'
    }
  },
  {
    id: 'stored-xss-review',
    order: 3,
    title: 'Ulasan Produk yang Menjalankan Kode',
    category: 'Cross-Site Scripting (XSS)',
    scenario: 'Setiap pelanggan NUSANTARA MART bisa menulis ulasan di halaman produk. Tim keamanan internal mereka belum pernah mengaudit fitur ini karena dianggap "cuma teks biasa". Kamu diminta memverifikasi apakah input ulasan benar-benar diperlakukan sebagai teks biasa, atau justru dieksekusi sebagai kode saat ditampilkan ke pengunjung lain.',
    objective: 'Buktikan kamu bisa menjalankan JavaScript arbitrer di browser siapa pun yang membuka halaman produk tertentu, dengan cara menyisipkannya lewat form ulasan (bukan lewat URL/parameter — ini harus persisten, bukan reflected).',
    tasks: [
      'Tulis ulasan yang isinya bukan teks biasa, tapi tag HTML/JavaScript aktif, lalu kirim lewat form ulasan di halaman produk manapun.',
      'Buka lagi halaman produk itu (reload penuh, bukan cuma submit) — apakah payload-mu tereksekusi, atau tertampil sebagai teks mentah (ter-escape)?',
      'Kalau tereksekusi: aplikasi punya endpoint bernama `/xss-callback.php` yang isinya sensitif. Susun payload yang melakukan request ke endpoint itu dari dalam browser korban dan menampilkan hasilnya (misal lewat `document.title`, `alert()`, atau elemen lain di halaman) supaya kamu bisa membacanya.',
      'Ingat: karena ini stored XSS, payload-mu akan tetap aktif setiap kali SIAPA PUN membuka halaman produk itu — bukan cuma sesi kamu sendiri.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{stored_xss_review_persisted_7e11}'],
      explanation: 'Payload seperti `<script>fetch(\'/xss-callback.php\').then(r=>r.text()).then(t=>document.title=t)</script>` akan mengambil flag dari endpoint itu dan menaruhnya di title tab browser begitu halaman produk dibuka siapa pun.'
    }
  },
  {
    id: 'idor-order-detail',
    order: 4,
    title: 'Melihat Pesanan Orang Lain',
    category: 'Broken Access Control (IDOR)',
    scenario: 'Setiap pelanggan NUSANTARA MART bisa melihat detail pesanannya sendiri lewat sebuah halaman detail order. Kamu diberi satu akun pelanggan biasa untuk pengujian (lihat kredensial di atas). Klien ingin tahu: dengan akun biasa ini, bisakah kamu melihat data pesanan milik pelanggan LAIN yang bukan milikmu?',
    objective: 'Login dengan salah satu akun yang diberikan, lalu akses detail pesanan yang BUKAN milik akun itu, dan baca catatan internal yang seharusnya rahasia di dalamnya.',
    tasks: [
      'Login dengan salah satu akun yang diberikan, lalu buat atau lihat pesananmu sendiri untuk memahami format URL halaman detail pesanan.',
      'Perhatikan parameter di URL tersebut — kemungkinan besar itu cuma angka ID yang naik berurutan.',
      'Coba ubah angka ID itu ke nilai lain (misalnya satu angka lebih kecil atau lebih besar dari milikmu) sambil tetap login dengan akunmu sendiri.',
      'Kalau aplikasi tetap menampilkan detail pesanan itu tanpa menolak, berarti tidak ada pengecekan kepemilikan — baca catatan internal di pesanan tersebut.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{idor_order_leak_c04f88}'],
      explanation: 'order.php mengambil data berdasarkan ID di URL tanpa pernah membandingkan pemilik order dengan user yang sedang login — order #2 (milik bob) bisa dibuka siapa pun yang sedang login, termasuk alice.'
    }
  },
  {
    id: 'broken-access-admin-cookie',
    order: 5,
    title: 'Jadi Admin Tanpa Login Sebagai Admin',
    category: 'Broken Access Control',
    scenario: 'NUSANTARA MART punya panel admin terpisah untuk mengelola pengguna dan tools operasional. Klien yakin panel ini aman karena "kan dicek role-nya". Tugasmu: buktikan bahwa pengecekan itu bisa dilewati tanpa pernah benar-benar login sebagai admin — cukup modal akun biasa (atau bahkan tanpa akun sama sekali, kalau memungkinkan).',
    objective: 'Akses halaman dashboard admin dan buktikan kamu bisa masuk meskipun login dengan akun ber-role user biasa.',
    tasks: [
      'Login dengan salah satu akun user biasa yang diberikan, lalu perhatikan cookie apa saja yang diset browser setelah login berhasil (buka DevTools > Application > Cookies).',
      'Cari cookie yang kelihatannya menyimpan informasi peran/otorisasi pengguna.',
      'Ubah nilai cookie itu secara langsung lewat DevTools ke nilai yang biasanya dipakai untuk akun admin.',
      'Tanpa logout atau login ulang, coba akses langsung halaman dashboard admin lewat URL-nya.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{broken_access_control_role_cookie_a91d}'],
      explanation: 'admin/index.php hanya mengecek nilai cookie `role`, bukan session server-side yang benar-benar diverifikasi — mengubah cookie itu ke `admin` lewat DevTools sudah cukup untuk membuka akses penuh.'
    }
  },
  {
    id: 'path-traversal-log-viewer',
    order: 6,
    title: 'Log Viewer yang Kebablasan Nurut',
    category: 'Path Traversal / Local File Inclusion',
    scenario: 'Setelah kamu berhasil masuk ke panel admin (studi kasus sebelumnya), kamu menemukan sebuah "Log Viewer" yang dipakai tim ops buat lihat file log aplikasi dengan cepat tanpa perlu akses FTP/SSH. Kamu curiga nama file yang kamu ketik di situ ditempel langsung ke path tanpa validasi sama sekali.',
    objective: 'Buktikan kamu bisa membaca file APAPUN di server lewat fitur Log Viewer ini — bukan cuma file log yang seharusnya diizinkan.',
    tasks: [
      'Masuk ke panel admin (pakai teknik dari studi kasus "Jadi Admin Tanpa Login Sebagai Admin" kalau kamu belum punya akses admin), lalu buka Log Viewer.',
      'Coba dulu nama file normal (`access.log`) buat lihat perilaku standarnya.',
      'Coba sisipkan urutan "naik direktori" (`../`) di depan nama file buat keluar dari folder logs/ yang seharusnya jadi batasnya.',
      'Targetkan sebuah file bernama `db_credentials.txt` yang ada di folder `secret/`, sejajar dengan folder `logs/` (satu level di atas keduanya).'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{path_traversal_lfi_5d3e70}'],
      explanation: 'Payload `../secret/db_credentials.txt` di parameter file lolos karena aplikasi cuma menempel input ke path lewat string concatenation, tanpa basename() atau validasi "../" sama sekali — file APAPUN yang bisa dibaca proses web server jadi bisa diakses, gak cuma yang ada di folder logs/.'
    }
  },
  {
    id: 'insecure-upload-rce',
    order: 7,
    title: 'Dari Upload Foto Profil ke Eksekusi Kode',
    category: 'Insecure File Upload',
    scenario: 'Fitur ganti foto profil di NUSANTARA MART menerima file apa saja tanpa banyak validasi yang terlihat. Klien menduga ini bisa dimanfaatkan lebih dari sekadar upload gambar, tapi belum tahu sejauh apa dampaknya. Kamu diminta membuktikan dampak paling parah yang bisa dicapai lewat fitur ini.',
    objective: 'Upload file yang berisi kode PHP lewat fitur foto profil, lalu eksekusi file itu langsung dari browser untuk membaca isi file konfigurasi aplikasi.',
    tasks: [
      'Login dengan akun apa pun, buka halaman profil, lalu siapkan sebuah file `.php` (bukan gambar) berisi kode PHP sederhana yang membaca isi file lain, misal `<?php echo file_get_contents(__DIR__ . \'/../config.php\'); ?>` (pakai fungsi baca-file native, bukan `system()`/`exec()` — banyak hosting gratis mematikan fungsi jalanin-perintah-OS itu, jadi jangan bergantung ke situ).',
      'Upload file itu lewat form "Upload Foto Profil" — perhatikan apakah aplikasi menolaknya atau menerimanya begitu saja.',
      'Kalau diterima, aplikasi biasanya memberi tahu (atau kamu bisa menebak) lokasi file yang baru diupload. Buka file itu langsung lewat browser.',
      'Perhatikan output-nya — isi file konfigurasi aplikasi (`config.php`, satu folder di atas folder upload) sekarang tampil di layar, termasuk flag-nya.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{insecure_upload_webshell_rce_6c2a}'],
      explanation: 'Fitur upload avatar tidak memvalidasi ekstensi maupun isi file sama sekali. File .php yang diupload bisa langsung dieksekusi web server, dan lewat itu kamu bisa membaca file lain di server (termasuk config.php yang menyimpan flag ini).'
    }
  },
  {
    id: 'ssrf-import-image',
    order: 8,
    title: 'Fitur "Ambil Gambar dari URL" yang Gak Pilih-Pilih Skema',
    category: 'Server-Side Request Forgery (SSRF)',
    scenario: 'Panel admin NUSANTARA MART punya fitur "Import Gambar Produk dari URL" — admin tinggal tempel link gambar dari supplier, server yang mengambilkan otomatis. Klien menduga fitur ini cuma divalidasi buat "kelihatannya URL gambar", tapi gak benar-benar mengecek APA yang boleh diambil. Buktikan seberapa jauh itu bisa disalahgunakan.',
    objective: 'Manfaatkan fitur import gambar untuk membuat SERVER membaca sebuah file di filesystem-nya sendiri, bukan cuma mengambil gambar dari internet.',
    tasks: [
      'Masuk ke panel admin, buka fitur "Import Gambar Produk dari URL".',
      'Coba dulu tempel URL gambar biasa dari internet untuk memahami cara kerja normalnya (server mengambil dan menampilkan kontennya).',
      'Perhatikan baik-baik seluruh HTML halaman ini (View Source / Inspect) — kadang developer ninggalin komentar debug yang harusnya udah dihapus sebelum production, isinya bisa informasi yang berguna.',
      'Kalau kamu nemu absolute path aplikasi ini di server, coba ganti input URL-nya pakai skema `file://` menuju sebuah file bernama `ssrf_internal_note.txt` di folder `secret/` (sejajar dengan folder `admin/`), bukan pakai `http://`.',
      'Fitur ini cuma dibuat buat "ambil gambar dari URL", tapi kalau skema URL-nya gak divalidasi sama sekali, `file://` juga akan dituruti — itu yang bikin ini tetap tergolong SSRF, bukan sekadar path traversal biasa.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{ssrf_internal_endpoint_reached_e814}'],
      explanation: 'import_image.php cuma melempar apa pun yang kamu ketik langsung ke file_get_contents() tanpa memvalidasi skema URL-nya. http:// bikin ini SSRF ke jaringan/layanan lain; file:// membuktikan fitur yang sama juga bisa disalahgunakan buat baca file lokal — dua sisi dari lubang validasi yang sama.'
    }
  },
  {
    id: 'business-logic-price-tamper',
    order: 9,
    title: 'Checkout dengan Harga Semaumu',
    category: 'Business Logic Flaw',
    scenario: 'Selain lewat keranjang biasa, NUSANTARA MART punya jalur "Checkout Manual" yang katanya "harga sudah otomatis terisi dari katalog, jangan diubah". Klien penasaran: kalau memang harganya "sudah otomatis terisi", apa yang sebenarnya mencegah harga itu diubah sebelum benar-benar dikirim ke server?',
    objective: 'Selesaikan proses checkout untuk sebuah produk dengan harga yang KAMU tentukan sendiri, berbeda dari harga asli di katalog.',
    tasks: [
      'Login dengan akun apa pun, buka halaman Checkout Manual, dan perhatikan struktur form-nya lewat DevTools (Inspect Element) — cari field yang menyimpan harga produk.',
      'Perhatikan bahwa field harga itu ADA di HTML, tapi tidak muncul sebagai kotak input yang bisa diketik di tampilan biasa.',
      'Ubah nilai field tersembunyi itu langsung lewat DevTools (edit HTML-nya) menjadi angka yang jauh lebih kecil dari harga asli, lalu submit form.',
      'Buka halaman detail order hasil checkout tadi dan lihat catatan yang muncul di sana.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{price_tampering_checkout_bf209}'],
      explanation: 'checkout.php mempercayai nilai field `price` yang dikirim dari form apa adanya, tanpa mencocokkannya ulang ke harga produk yang tersimpan di database — klasik "trust the client" yang berbahaya untuk apa pun yang menyangkut uang.'
    }
  },
  {
    id: 'info-disclosure-backup',
    order: 10,
    title: 'File yang Kelupaan Dihapus',
    category: 'Information Disclosure',
    scenario: 'Ini bukan tentang mengeksploitasi form atau fitur apa pun — ini tentang kebiasaan lama yang sering kejadian di dunia nyata: file cadangan atau file sementara yang ditinggal di server setelah migrasi/deploy, dan lupa dihapus. Klien tidak memberi petunjuk apa pun untuk studi kasus ini selain: "coba tebak nama file yang biasanya ketinggalan".',
    objective: 'Temukan sebuah file yang sengaja/tidak sengaja terekspos di root domain, yang berisi informasi sensitif.',
    tasks: [
      'Tanpa perlu login sama sekali, coba akses beberapa nama file umum yang sering ketinggalan di web root: file backup database, file `.env`, file config lama, dsb. Gunakan pengetahuanmu dari fase Ethical Hacking soal enumerasi/wordlist umum.',
      'Perhatikan ekstensi tidak biasa seperti `.bak`, `.old`, `.zip`, `.sql` yang ditempel di belakang nama file yang sudah kamu duga.',
      'Kalau menemukan file yang bisa diakses langsung, baca isinya.'
    ],
    check: {
      placeholder: 'FLAG{...}',
      accepted: ['FLAG{backup_file_exposed_3a77f1}'],
      explanation: 'File `backup.sql.bak` sengaja ditinggal di web root sebagai simulasi kesalahan operasional yang sangat umum terjadi — backup database yang harusnya disimpan di luar direktori publik.'
    }
  }
];

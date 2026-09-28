// Fase 10: Ethical Hacking
export default {
  id: "hacking",
  number: 10,
  title: "Ethical Hacking",
  dayRange: "Hari 85–90",
  summary:
    "Rangkaian penuh penetration testing terhadap lab Docker lokal milikmu sendiri: dari recon sampai command execution, dengan flag yang bisa dibuktikan di tiap tahap.",
  resources: [
    {
      label: "Hack The Box",
      url: "https://hackthebox.com",
    },
    {
      label: "VulnHub",
      url: "https://vulnhub.com",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 85",
      title: "Setup Lab dan Recon Awal",
      steps: [
        {
          kind: "materi",
          title: "Target-mu sekarang berjalan di komputermu sendiri",
          body: "Mulai hari ini, target latihanmu adalah lab Docker yang sudah kamu nyalakan di fase Tools: DVWA di `localhost:8081` dan terminal browser di `localhost:7681`. Recon pasif (whois, OSINT) tidak relevan untuk target lokal ini - recon di sini berarti langsung scanning: mencari port dan service apa saja yang aktif sebelum mulai mengeksploitasi apa pun.",
        },
        {
          kind: "materi",
          title: "Kenapa harus reset database dan atur security level dulu",
          body: 'DVWA sengaja dibuat dengan database kosong di awal (belum ada tabel users/guestbook) - klik "Create / Reset Database" memicu instalasi skema database itu, tanpanya hampir semua modul DVWA akan error. Security level (Low/Medium/High/Impossible) mengatur seberapa ketat validasi input di tiap modul kerentanan - level Low sengaja tanpa filter sama sekali, cocok untuk fase belajar dasar sebelum nanti (kalau mau tantangan lebih) mencoba level Medium/High yang mensimulasikan filter parsial yang masih bisa dilewati dengan teknik lebih canggih.',
        },
        {
          kind: "materi",
          title: "Kenapa recon dimulai dari nmap, bukan langsung buka browser",
          body: "Membuka DVWA lewat browser memang perlu (untuk setup awal), tapi recon yang sebenarnya dimulai dari mengonfirmasi port dan service apa saja yang benar-benar terbuka di container target - informasi ini menentukan permukaan serangan (attack surface) yang tersedia. Menjalankan `nmap` dari container attacker ke container target lewat nama host Docker (`dvwa-target`) mensimulasikan cara kerja pentest sungguhan: kamu tidak selalu tahu semua service yang jalan di suatu target sebelum benar-benar men-scan-nya.",
        },
        {
          kind: "praktik",
          title: "Selesaikan setup DVWA dan scan target",
          instructions: [
            'Buka `http://localhost:8081`, klik "Create / Reset Database" (setup awal DVWA).',
            'Login dengan `admin` / `password`, lalu di menu "DVWA Security" set level ke **Low**.',
            "Buka `http://localhost:7681` (terminal browser), jalankan `cat /root/welcome-flag.txt` untuk konfirmasi akses ke attacker box.",
            "Dari terminal yang sama, jalankan `nmap dvwa-target` untuk melihat port yang terbuka di container target.",
          ],
          proof:
            "Output welcome-flag.txt dan hasil nmap yang menunjukkan port terbuka di dvwa-target.",
          check: {
            placeholder: "tempel isi welcome-flag.txt",
            accepted: ["signal90{lab_terhubung}"],
          },
        },
        {
          kind: "kuis",
          question:
            "Port berapa yang muncul terbuka di container target (DVWA) hasil scan nmap-mu?",
          inputType: "text",
          placeholder: "contoh: 22",
          accepted: ["80"],
          explanation:
            "DVWA jalan sebagai aplikasi web PHP di atas Apache, dilayani lewat HTTP standar di port 80 - itu sebabnya kamu mengaksesnya lewat browser di `localhost:8081` (host memetakan 8081 ke port 80 container).",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 86",
      title: "SQL Injection Dasar - Ekstraksi Semua User",
      steps: [
        {
          kind: "materi",
          title: "Parameter yang percaya begitu saja ke input user",
          body: "Modul \"SQL Injection\" di DVWA punya form yang minta User ID, lalu menempelkan input itu langsung ke query SQL tanpa sanitasi. Payload boolean klasik seperti `%' or '0'='0` membuat kondisi WHERE selalu benar untuk SEMUA baris, bukan cuma satu user - akibatnya seluruh isi tabel user ikut terekspos.",
        },
        {
          kind: "materi",
          title: "Bedah payload: kenapa `%' or '0'='0` bisa membuka semuanya",
          body: "Query asli di balik layar kira-kira berbentuk `SELECT * FROM users WHERE user_id = '<input>'`. Tanda kutip tunggal di awal payload menutup string yang dibuka query, lalu `or '0'='0'` menambahkan kondisi yang PASTI selalu benar (karena '0' selalu sama dengan '0') - akibatnya kondisi WHERE keseluruhan jadi selalu true untuk SETIAP baris di tabel, bukan cuma baris dengan user_id yang kamu masukkan. Tanda persen (`%`) di depan sebenarnya bagian dari cara DVWA membungkus query LIKE di balik layar, bukan bagian inti dari trik boolean-nya.",
        },
        {
          kind: "praktik",
          title: "Dump seluruh user lewat satu payload",
          instructions: [
            'Buka menu "SQL Injection" di DVWA.',
            "Masukkan payload `%' or '0'='0` ke kolom User ID, submit.",
            "Perhatikan hasilnya menampilkan lebih dari satu user sekaligus, bukan cuma satu ID yang kamu minta.",
            "Hitung total user yang muncul di hasil dump itu.",
          ],
          proof:
            "Screenshot hasil dump menunjukkan seluruh baris user yang keluar dari satu payload.",
        },
        {
          kind: "kuis",
          question:
            "Berapa total user yang muncul di hasil dump SQL injection boolean itu?",
          inputType: "text",
          placeholder: "contoh: 1",
          accepted: ["5"],
          explanation:
            "DVWA punya 5 user seed di tabelnya: admin, gordonb, 1337, pablo, dan smithy. Payload boolean membuat WHERE selalu true, jadi query mengembalikan semuanya sekaligus.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 87",
      title: "SQL Injection Lanjutan - Ekstraksi Password Hash",
      steps: [
        {
          kind: "materi",
          title: "UNION SELECT membaca kolom apa pun yang kamu mau",
          body: "Kalau injection boolean cuma memanipulasi kondisi WHERE, UNION-based injection menggabungkan hasil query aslinya dengan query SELECT buatanmu sendiri - memungkinkan menarik kolom yang sama sekali tidak ditampilkan di form aslinya, seperti kolom password di tabel users.",
        },
        {
          kind: "materi",
          title: "Kenapa password tampil sebagai hash, bukan teks biasa",
          body: "Aplikasi yang dirancang dengan baik tidak pernah menyimpan password dalam bentuk plaintext di database - sebagai gantinya disimpan hash-nya (hasil satu arah dari fungsi kriptografi). DVWA (versi lama yang dipakai untuk simulasi ini) memakai MD5 untuk hashing, algoritma yang sekarang dianggap lemah karena rentan collision dan bisa di-brute-force/lookup dengan cepat memakai tabel rainbow yang sudah tersedia luas di internet. Ini kenapa hasil UNION SELECT-mu menampilkan deretan karakter hex acak, bukan password asli - kamu masih perlu satu langkah tambahan (cracking) untuk membalikkannya jadi plaintext.",
        },
        {
          kind: "praktik",
          title: "Tarik dan crack satu password hash",
          instructions: [
            "Di modul yang sama, coba payload UNION seperti `%' UNION SELECT user, password FROM users -- `.",
            "Cari baris dengan username `gordonb` di hasilnya - passwordnya tampil sebagai hash MD5, bukan teks biasa.",
            "Crack hash MD5 itu (pakai `hashcat`, `john`, atau layanan lookup MD5 mana pun) untuk dapat password plaintext-nya.",
          ],
          proof:
            "Hash MD5 milik gordonb dan password plaintext hasil crack-nya.",
          check: {
            placeholder: "password plaintext gordonb",
            accepted: ["abc123"],
          },
        },
        {
          kind: "kuis",
          question:
            "Password plaintext user gordonb setelah hash MD5-nya di-crack apa?",
          inputType: "text",
          placeholder: "contoh: password123",
          accepted: ["abc123"],
          explanation:
            'Hash MD5 gordonb di seed data DVWA memang publik dan terdokumentasi - begitu di-crack, hasilnya "abc123". Ini contoh nyata kenapa hashing tanpa salt (apalagi algoritma lemah seperti MD5) tidak cukup melindungi password.',
        },
      ],
    },
    {
      index: 4,
      label: "Hari 88",
      title: "Command Injection Dasar",
      steps: [
        {
          kind: "materi",
          title: "Ketika input user langsung masuk ke shell",
          body: 'Modul "Command Injection" DVWA punya fitur ping sederhana: kamu masukkan IP, aplikasi menjalankan `ping` ke IP itu lewat shell system di belakang layar. Karena inputnya ditempel langsung ke command shell tanpa sanitasi, menambahkan operator shell seperti `;` atau `&&` memungkinkan kamu menyisipkan command tambahan yang ikut dieksekusi.',
        },
        {
          kind: "materi",
          title: "Bedanya `;` dan `&&` sebagai pemisah command",
          body: "Kedua operator ini sama-sama menjalankan dua command berurutan di satu baris shell, tapi beda perilaku: `;` menjalankan command kedua TERLEPAS dari command pertama berhasil atau gagal, sementara `&&` cuma menjalankan command kedua KALAU command pertama berhasil (exit code 0). Untuk kasus command injection seperti ini biasanya keduanya sama-sama efektif karena `ping` ke alamat valid hampir selalu berhasil - tapi kalau command pertamamu berpotensi gagal, `;` lebih andal dipakai karena tidak bergantung pada keberhasilan command sebelumnya.",
        },
        {
          kind: "praktik",
          title: "Suntik command tambahan lewat fitur ping",
          instructions: [
            'Buka menu "Command Injection" di DVWA.',
            "Masukkan `127.0.0.1; id` (atau `127.0.0.1 && id`) ke kolom IP address, submit.",
            "Perhatikan output ping asli DIIKUTI output command `id` yang kamu sisipkan.",
            "Catat user yang tercantum di output `id` itu.",
          ],
          proof: "Screenshot output gabungan ping + hasil `id` yang tersisip.",
        },
        {
          kind: "kuis",
          question:
            "User apa yang menjalankan proses web server (terlihat dari output `id`) di container target?",
          inputType: "text",
          placeholder: "contoh: root",
          accepted: ["www-data"],
          explanation:
            "Server web Apache/PHP standar (termasuk yang menjalankan DVWA) berjalan sebagai user `www-data`, bukan root - praktik keamanan umum supaya kalau web app-nya dibobol, proses yang berjalan tidak otomatis punya akses admin penuh.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 89",
      title: "Command Execution Penuh dan Capstone Flag",
      steps: [
        {
          kind: "materi",
          title: "Dari satu output ping sampai baca file bebas",
          body: 'Command injection yang cuma menempel di satu command (seperti `id`) sudah cukup untuk mengeksekusi APA PUN yang bisa dijalankan user `www-data` - termasuk membaca file di luar folder aplikasi. Itu bedanya command injection dengan sekadar "bug tampilan": begitu kamu bisa menjalankan satu command sembarang, kamu punya command execution penuh dalam batas hak akses user itu.',
        },
        {
          kind: "materi",
          title: "Kenapa lokasi file di luar webroot itu penting",
          body: "File yang ditaruh DI DALAM webroot (folder yang dilayani langsung oleh web server, biasanya `/var/www/html`) berisiko bisa diakses langsung lewat URL kalau nama filenya ketebak, tanpa perlu eksploitasi apa pun. Menaruh flag capstone di `/var/flag.txt` (satu folder di luar webroot sepenuhnya) memastikan satu-satunya cara membacanya adalah lewat command execution sungguhan seperti yang kamu lakukan di sini - bukan lewat trik path traversal dangkal atau menebak URL file.",
        },
        {
          kind: "praktik",
          title: "Baca flag capstone di luar webroot",
          instructions: [
            "Di modul Command Injection yang sama, masukkan `127.0.0.1; cat /var/flag.txt`.",
            "Perhatikan isi file itu ikut tercetak di output, walaupun lokasinya di luar folder web DVWA.",
            "Catat isi flag persis seperti yang tertampil.",
          ],
          proof: "Isi flag capstone yang berhasil dibaca dari /var/flag.txt.",
          check: {
            placeholder: "isi flag capstone",
            accepted: ["signal90{rce_via_dvwa}"],
          },
        },
        {
          kind: "kuis",
          question: "Apa isi flag capstone yang kamu dapat dari /var/flag.txt?",
          inputType: "text",
          placeholder: "contoh: FLAG{...}",
          accepted: ["signal90{rce_via_dvwa}"],
          explanation:
            "File ini sengaja ditaruh di luar direktori web (bukan di /var/www) supaya cuma bisa dibaca lewat command execution sungguhan - bukan lewat trik file-browsing atau LFI dangkal ke file di dalam webroot.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 90",
      title: "Kompromi Penuh dan Reporting",
      steps: [
        {
          kind: "materi",
          title: "Rangkaian penuh, didokumentasikan profesional",
          body: "Recon → SQL injection → command injection → command execution yang kamu jalankan sepanjang minggu ini adalah simulasi paling dekat dengan pekerjaan penetration tester nyata. Yang membedakan pentester junior dari yang senior sering kali bukan exploit-nya, tapi kualitas laporannya: jelas, berurutan, dan rekomendasi perbaikannya bisa langsung ditindaklanjuti tim lain.",
        },
        {
          kind: "materi",
          title: "Struktur laporan pentest yang dipakai industri",
          body: "Laporan pentest profesional pada dasarnya punya tiga lapis pembaca berbeda: ringkasan eksekutif (untuk manajemen non-teknis, fokus ke dampak bisnis dan tingkat risiko, biasanya satu-dua paragraf), temuan teknis (untuk tim security/dev, detail lengkap step-by-step dan payload persis yang dipakai supaya reproducible), dan rekomendasi remediasi (jembatan antara keduanya - menerjemahkan tiap temuan teknis jadi langkah perbaikan konkret yang bisa dikerjakan tim development). Melewatkan salah satu lapis ini membuat laporan kurang berguna buat sebagian pembacanya.",
        },
        {
          kind: "praktik",
          title: "Tulis laporan pentest lengkap untuk lab ini",
          instructions: [
            "Tulis ringkasan eksekutif: apa yang kamu temukan, seberapa serius risikonya.",
            "Tulis temuan teknis tiap tahap (SQLi ekstraksi user, SQLi password hash, command injection, command execution) lengkap dengan payload yang dipakai.",
            "Untuk tiap temuan, tulis rekomendasi remediasi konkret (misal: parameterized query untuk SQLi, input sanitization untuk command injection).",
            "Simpan laporan ini di repo `cybersecurity-lab-notes` dari fase Review & Practice.",
          ],
          proof:
            "Laporan pentest lengkap (ringkasan eksekutif + temuan teknis + rekomendasi remediasi) tersimpan di repo portofolio.",
        },
        {
          kind: "kuis",
          question:
            "Bagian laporan pentest yang berisi saran perbaikan untuk tiap kerentanan yang ditemukan disebut apa?",
          inputType: "text",
          placeholder: "contoh: ringkasan eksekutif",
          accepted: [
            "rekomendasi remediasi",
            "remediasi",
            "rekomendasi perbaikan",
          ],
          explanation:
            'Remediasi adalah bagian paling berharga buat pembaca laporan (biasanya tim dev/ops) - ini yang menerjemahkan "kami menemukan bug" jadi "ini cara memperbaikinya".',
        },
      ],
    },
  ],
};

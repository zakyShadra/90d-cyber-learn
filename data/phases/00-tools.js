// Fase 0: Bekal: Tools yang Bakal Kamu Pakai
export default {
  id: "tools",
  number: 0,
  title: "Bekal: Tools yang Bakal Kamu Pakai",
  dayRange: "Sebelum Hari 1",
  summary:
    "Kenalan dulu secara umum sama tools yang bakal muncul berulang kali di sepanjang roadmap ini, sebelum masuk ke materi yang lebih dalam per fase.",
  resources: [],
  days: [
    {
      index: 1,
      label: "Bekal 1",
      title: "Terminal, Package Manager, dan Editor Teks",
      steps: [
        {
          kind: "materi",
          title: "Tiga alat yang akan kamu pakai setiap hari",
          body: "Terminal adalah antarmuka utama untuk hampir semua tool security - jauh lebih cepat dan bisa diotomasi dibanding klik-klik GUI. Package manager (apt, dnf, pacman, brew) menginstal dan memperbarui software dari repository resmi, jadi kamu tidak perlu download installer manual satu-satu. Editor teks command-line (nano untuk pemula, vim untuk yang mau lebih cepat setelah terbiasa) dipakai untuk mengedit file konfigurasi langsung dari terminal, tanpa perlu GUI.",
        },
        {
          kind: "praktik",
          title: "Instal satu tool baru dan edit satu file dengan nano",
          instructions: [
            "Buka terminal, cek package manager sistemmu (`apt`, `dnf`, atau `pacman`).",
            "Instal satu tool kecil yang belum ada, misal `tree` (`sudo apt install tree` atau setara).",
            "Buat file baru `catatan.txt` dengan `nano catatan.txt`, ketik satu kalimat, simpan (Ctrl+O lalu Enter) dan keluar (Ctrl+X).",
            "Tampilkan isi file itu dengan `cat catatan.txt` untuk konfirmasi tersimpan.",
          ],
          proof:
            "Output `cat catatan.txt` menampilkan kalimat yang kamu ketik.",
        },
        {
          kind: "kuis",
          question:
            "Kombinasi tombol apa di nano untuk menyimpan (write out) file yang sedang diedit?",
          inputType: "text",
          placeholder: "contoh: ctrl+x",
          accepted: ["ctrl+o", "ctrl o", "control+o", "control o"],
          explanation:
            'Ctrl+O ("Write Out") menyimpan file. Ctrl+X keluar dari nano - sering tertukar, tapi keduanya perintah terpisah.',
        },
      ],
    },
    {
      index: 2,
      label: "Bekal 2",
      title: "Tools Network dan Recon",
      steps: [
        {
          kind: "materi",
          title: "Empat tool wajib untuk menjelajahi jaringan",
          body: 'Nmap memindai host dan port untuk tahu layanan apa yang aktif di suatu jaringan. Netcat ("swiss army knife" jaringan) bisa jadi client maupun listener TCP/UDP sederhana. Curl dan wget mengambil konten lewat HTTP/HTTPS dari command line - curl lebih fleksibel untuk testing API, wget lebih simpel untuk download file. Dig melakukan query DNS manual, berguna untuk investigasi domain.',
        },
        {
          kind: "praktik",
          title: "Jalankan keempat tool ke target yang aman",
          instructions: [
            "Jalankan `nmap localhost` untuk melihat port yang terbuka di komputermu sendiri.",
            "Jalankan `curl -I https://example.com` untuk melihat response header saja.",
            "Jalankan `dig example.com` dan catat IP yang dikembalikan.",
            "Jalankan `wget https://example.com -O test.html` lalu konfirmasi file test.html terunduh.",
          ],
          proof:
            "Output keempat command, dengan IP dari dig dan minimal satu port dari hasil nmap.",
        },
        {
          kind: "kuis",
          question:
            "Flag nmap apa yang dipakai untuk mendeteksi versi service di tiap port terbuka?",
          inputType: "text",
          placeholder: "contoh: -p-",
          accepted: ["-sv", "sv"],
          explanation:
            '`-sV` memicu Nmap mencoba mengidentifikasi versi service (misal "Apache 2.4.41") di tiap port terbuka, bukan cuma status open/closed.',
        },
      ],
    },
    {
      index: 3,
      label: "Bekal 3",
      title: "Tools Analisis dan Eksploitasi",
      steps: [
        {
          kind: "materi",
          title: "Dari mengamati sampai mengeksploitasi",
          body: "Wireshark (GUI) dan tcpdump (command line) menangkap dan membaca traffic jaringan mentah. Burp Suite jadi proxy di antara browser dan web server, memungkinkan intersep dan modifikasi request HTTP secara manual - tool inti web pentesting. Metasploit Framework menyediakan ribuan exploit siap pakai untuk kerentanan yang sudah diketahui, dibungkus dalam satu console (`msfconsole`). Sqlmap mengotomasi deteksi dan eksploitasi SQL injection pada aplikasi web.",
        },
        {
          kind: "praktik",
          title: "Kenalan pertama dengan tiap tool",
          instructions: [
            "Install Wireshark (kalau belum), buka, capture 30 detik traffic biasa lalu stop.",
            "Buka `msfconsole`, jalankan `search type:exploit name:eternalblue` untuk melihat contoh format hasil pencarian exploit (tidak perlu dieksekusi).",
            "Baca dokumentasi singkat instalasi Burp Suite Community Edition (gratis) dan catat langkah utamanya, instal kalau kamu mau lanjut coba.",
            "Jalankan `sqlmap --version` untuk konfirmasi ter-install dan lihat banner-nya.",
          ],
          proof:
            "Screenshot Wireshark dengan traffic tertangkap, output pencarian msfconsole, dan output sqlmap --version.",
        },
        {
          kind: "kuis",
          question:
            "Sqlmap dipakai untuk mengotomasi deteksi dan eksploitasi jenis kerentanan apa?",
          inputType: "text",
          placeholder: "contoh: xss",
          accepted: ["sql injection", "sqli"],
          explanation:
            "Sqlmap fokus penuh ke SQL injection: dari deteksi parameter yang rentan sampai ekstraksi data dari database di baliknya.",
        },
      ],
    },
    {
      index: 4,
      label: "Bekal 4",
      title: "Scripting, Version Control, dan Infra",
      steps: [
        {
          kind: "materi",
          title: "Tools untuk membangun, bukan cuma memakai",
          body: "Python + pip dipakai untuk menulis automasi dan tool custom (dibahas lebih dalam di fase Python). Git melacak perubahan kode/catatan dan memungkinkan kolaborasi (fase Git). Docker mengemas aplikasi dan dependency-nya jadi container terisolasi - dipakai roadmap ini sendiri untuk lab praktik di fase Ethical Hacking. Cloud CLI (`aws`, `gcloud`, `az`) mengontrol resource cloud dari terminal, tanpa perlu buka dashboard web setiap saat.",
        },
        {
          kind: "praktik",
          title: "Cek versi semua tool infra dan nyalakan lab Docker",
          instructions: [
            "Jalankan `python3 --version`, `git --version`, dan `docker --version` untuk konfirmasi ketiganya ter-install.",
            "Masuk ke folder `docker/` di repo roadmap-app ini.",
            "Jalankan `docker compose up -d --build` untuk menyalakan lab praktik (target rentan + terminal browser).",
            "Jalankan `docker compose ps` untuk konfirmasi kedua container (`signal90-target`, `signal90-attacker`) berstatus running.",
          ],
          proof:
            'Output docker compose ps menunjukkan kedua container lab berstatus "running"/"Up".',
        },
        {
          kind: "kuis",
          question:
            "Perintah apa untuk melihat daftar container yang sedang berjalan?",
          inputType: "text",
          placeholder: "contoh: docker images",
          accepted: ["docker ps", "docker container ls", "docker compose ps"],
          explanation:
            "`docker ps` (atau `docker compose ps` untuk lingkup satu compose project) menampilkan container yang statusnya running beserta port yang di-publish.",
        },
      ],
    },
  ],
};

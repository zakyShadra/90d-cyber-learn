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
          title: "Kenapa terminal, bukan GUI",
          body: "Hampir semua tool security serius (nmap, sqlmap, metasploit, tcpdump) memang punya versi GUI, tapi versi command-line-nya selalu lebih lengkap dan bisa diotomasi lewat script. Terminal (juga disebut shell atau command line) adalah program yang menerima perintah teks dan menjalankannya langsung, tanpa lapisan klik-klik. Keuntungan utamanya tiga: (1) satu perintah bisa dijalankan berulang tanpa mengingat urutan klik, (2) output bisa disimpan/diproses lebih lanjut lewat pipe (`|`) dan redirect (`>`), (3) bisa dijalankan lewat SSH di server jarak jauh yang tidak punya layar sama sekali. Di sepanjang roadmap ini, hampir semua instruksi praktik akan berupa perintah terminal - biasakan dari sekarang.",
        },
        {
          kind: "materi",
          title: "Package manager: instal software tanpa cari installer manual",
          body: "Package manager adalah program yang mengunduh, menginstal, memperbarui, dan menghapus software dari repository resmi distro-mu. Di Debian/Ubuntu pakai `apt`, di Fedora/RHEL pakai `dnf`, di Arch pakai `pacman`, dan di macOS yang paling umum `brew` (Homebrew, pihak ketiga tapi jadi standar de facto). Pola perintahnya mirip di semua: cari paket, instal paket, perbarui daftar paket, hapus paket. Selalu perbarui daftar paket dulu sebelum instal sesuatu yang baru (`sudo apt update` misalnya), supaya kamu dapat versi terbaru yang tersedia di repository, bukan versi lama yang sudah di-cache.",
        },
        {
          kind: "materi",
          title: "Editor teks command-line: nano vs vim",
          body: "Banyak file konfigurasi di Linux (SSH, firewall, cron, dst) cuma bisa/enak diedit langsung dari terminal, terutama kalau kamu sedang SSH ke server tanpa GUI. Nano adalah editor paling ramah pemula: shortcut-nya selalu ditampilkan di bagian bawah layar (`^O` = Ctrl+O untuk save, `^X` = Ctrl+X untuk keluar), jadi kamu tidak perlu menghafal apa-apa di awal. Vim jauh lebih powerful (mode-based editing, bisa full tanpa mouse, ada di hampir semua sistem Linux/Unix secara default) tapi kurva belajarnya curam - kalau kamu baru pertama buka vim dan bingung kenapa mengetik malah tidak muncul teks, itu karena vim punya mode Normal (untuk navigasi/perintah) dan mode Insert (untuk mengetik teks), tekan `i` untuk masuk Insert dan `Esc` untuk kembali ke Normal. Untuk roadmap ini nano sudah lebih dari cukup; vim boleh dipelajari belakangan kalau kamu mau lebih cepat.",
        },
        {
          kind: "praktik",
          title: "Instal satu tool baru dan edit satu file dengan nano",
          instructions: [
            "Buka terminal, cek package manager sistemmu dengan menjalankan `apt --version`, `dnf --version`, atau `pacman --version` (yang berhasil itu package manager-mu).",
            "Perbarui daftar paket dulu: `sudo apt update` (atau `sudo dnf check-update` / `sudo pacman -Sy`, sesuaikan dengan package manager-mu).",
            "Instal satu tool kecil yang belum ada, misal `tree` (`sudo apt install tree`, `sudo dnf install tree`, atau `sudo pacman -S tree`).",
            "Jalankan `tree --version` untuk konfirmasi tool itu benar-benar terpasang.",
            "Buat file baru `catatan.txt` dengan `nano catatan.txt`, ketik satu kalimat bebas, simpan dengan Ctrl+O lalu Enter, dan keluar dengan Ctrl+X.",
            "Tampilkan isi file itu dengan `cat catatan.txt` untuk konfirmasi kalimatmu benar-benar tersimpan.",
          ],
          proof:
            "Output `tree --version` yang menampilkan versi terpasang, dan output `cat catatan.txt` yang menampilkan kalimat yang kamu ketik.",
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
          title: "Nmap: memetakan apa yang aktif di jaringan",
          body: "Nmap (Network Mapper) memindai host dan port untuk mencari tahu perangkat apa saja yang hidup di suatu jaringan, port apa yang terbuka di tiap perangkat, dan (dengan flag tambahan) versi service serta sistem operasi yang berjalan di baliknya. Pemindaian paling dasar, `nmap <target>`, cuma mengecek 1000 port paling umum dengan TCP connect scan. Nmap adalah salah satu tool pertama yang dijalankan di hampir semua tahap awal pentest - hasilnya menentukan target mana yang layak digali lebih dalam.",
        },
        {
          kind: "materi",
          title: "Netcat: 'swiss army knife' jaringan",
          body: "Netcat (`nc`) bisa berperan sebagai client TCP/UDP biasa (menyambung ke port tertentu di host lain) maupun sebagai listener (menunggu koneksi masuk di port tertentu). Kegunaannya sangat luas: transfer file sederhana antar-mesin, chat sederhana lewat jaringan, mengetes apakah suatu port benar-benar terbuka dan menerima koneksi (bukan cuma 'kelihatan' terbuka dari hasil scan), sampai jadi listener untuk menerima reverse shell di skenario exploitation lanjutan. Karena fleksibel dan ringan, netcat sering disebut sebagai 'TCP/IP Swiss Army knife'.",
        },
        {
          kind: "materi",
          title: "Curl, wget, dan dig: mengambil konten dan menjawab DNS",
          body: "Curl mengambil konten dari URL lewat command line dan sangat fleksibel - bisa mengirim header custom, method HTTP apa pun (GET/POST/PUT/dst), dan body request, sehingga jadi tool wajib untuk testing API maupun web endpoint tanpa perlu buka browser. Wget lebih spesifik untuk mengunduh file/halaman ke disk, termasuk mengunduh seluruh struktur situs secara rekursif. Dig melakukan query DNS manual - mengetik `dig domain.com` menunjukkan persis apa yang dikembalikan DNS server untuk domain itu, berguna untuk investigasi domain atau memverifikasi konfigurasi DNS sebelum menuduh ada masalah di tempat lain.",
        },
        {
          kind: "praktik",
          title: "Jalankan keempat tool ke target yang aman",
          instructions: [
            "Jalankan `nmap localhost` untuk melihat port yang terbuka di komputermu sendiri, catat berapa port yang terbuka.",
            "Jalankan `nc -zv localhost 22` (atau port lain yang muncul di hasil nmap) untuk memverifikasi lewat netcat bahwa port itu benar-benar menerima koneksi.",
            "Jalankan `curl -I https://example.com` untuk melihat response header saja (tanpa body), catat status code dan header `Content-Type`-nya.",
            "Jalankan `dig example.com` dan catat IP (A record) yang dikembalikan di bagian ANSWER SECTION.",
            "Jalankan `wget https://example.com -O test.html` lalu konfirmasi file `test.html` terunduh dengan `ls -la test.html`.",
          ],
          proof:
            "Output kelima command (nmap, nc, curl, dig, wget), dengan port dari nmap yang dikonfirmasi lewat nc, IP dari dig, dan konfirmasi ukuran file test.html.",
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
          title: "Wireshark dan tcpdump: membaca traffic mentah",
          body: "Wireshark (GUI) dan tcpdump (command line) menangkap paket yang lewat di suatu network interface dan menampilkan isinya sampai level byte - protokol, header, bahkan payload kalau tidak terenkripsi. Wireshark unggul untuk eksplorasi visual (filter, warna, follow TCP stream), sementara tcpdump lebih ringan dan cocok dijalankan di server tanpa GUI, hasilnya bisa disimpan ke file `.pcap` lalu dibuka nanti di Wireshark untuk dianalisis lebih detail. Fase Traffic Analysis nanti akan membahas kedua tool ini jauh lebih dalam.",
        },
        {
          kind: "materi",
          title: "Burp Suite: proxy inti web pentesting",
          body: "Burp Suite berdiri sebagai proxy di antara browser dan web server - semua request yang keluar dari browser dan response yang masuk lewat Burp dulu, sehingga bisa dilihat, dihentikan sementara (intercept), dan dimodifikasi sebelum diteruskan. Ini krusial untuk web pentesting karena banyak kerentanan (parameter tersembunyi, validasi yang cuma di sisi client, dst) baru kelihatan kalau kamu bisa mengubah request mentah sebelum sampai ke server. Versi Community Edition gratis dan sudah cukup untuk belajar - versi Professional menambah fitur scanner otomatis berbayar.",
        },
        {
          kind: "materi",
          title: "Metasploit dan Sqlmap: eksploitasi yang sudah dikemas",
          body: "Metasploit Framework menyediakan ribuan modul exploit siap pakai untuk kerentanan yang sudah diketahui publik, dibungkus dalam satu console interaktif (`msfconsole`) dengan alur kerja yang konsisten: cari modul, set target, jalankan. Sqlmap fokus sempit tapi dalam: mengotomasi seluruh proses deteksi dan eksploitasi SQL injection pada aplikasi web, dari mengenali parameter yang rentan sampai mengekstrak isi database di baliknya. Keduanya tool yang sangat powerful - dipakai hanya pada sistem yang kamu punya izin eksplisit untuk diuji.",
        },
        {
          kind: "praktik",
          title: "Kenalan pertama dengan tiap tool",
          instructions: [
            "Install Wireshark (kalau belum ada), buka, pilih satu network interface, capture 30 detik traffic biasa lalu stop.",
            "Di hasil capture Wireshark, ketik filter `http` atau `dns` di kolom filter untuk melihat cuma traffic jenis itu.",
            "Buka `msfconsole`, jalankan `search type:exploit name:eternalblue` untuk melihat contoh format hasil pencarian exploit (tidak perlu dieksekusi).",
            "Baca dokumentasi singkat instalasi Burp Suite Community Edition (gratis) dan catat langkah utamanya; instal kalau kamu mau lanjut coba mengatur proxy browser ke Burp.",
            "Jalankan `sqlmap --version` untuk konfirmasi ter-install dan lihat banner-nya.",
          ],
          proof:
            "Screenshot Wireshark dengan traffic tertangkap dan filter aktif, output pencarian msfconsole, dan output sqlmap --version.",
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
          title: "Python: menulis tool sendiri, bukan cuma memakai punya orang",
          body: "Python + pip (package installer bawaan Python) dipakai untuk menulis automasi dan tool custom - dari script kecil yang mem-parsing log sampai exploit proof-of-concept. Alasan Python populer di security: sintaksnya cepat ditulis, library-nya sangat banyak (requests untuk HTTP, scapy untuk manipulasi paket, dst), dan hasilnya portable ke hampir semua sistem. Fase Python nanti membahas ini jauh lebih dalam dari sekadar instalasi.",
        },
        {
          kind: "materi",
          title: "Git: melacak perubahan, bukan cuma menyimpan file",
          body: "Git melacak setiap perubahan pada file dari waktu ke waktu, sehingga kamu bisa melihat riwayat perubahan, kembali ke versi sebelumnya, dan berkolaborasi dengan orang lain tanpa saling menimpa pekerjaan. Di dunia security, Git dipakai untuk menyimpan catatan pentest, script tool custom, sampai konfigurasi infrastruktur - dan platform seperti GitHub jadi tempat riset kerentanan serta exploit publik dibagikan. Fase Git nanti membahas perintah dan alur kerjanya secara detail.",
        },
        {
          kind: "materi",
          title: "Docker: lingkungan yang sama di mana saja",
          body: "Docker mengemas aplikasi beserta seluruh dependency-nya (library, konfigurasi, versi runtime) jadi satu 'container' yang terisolasi dari sistem host dan berjalan konsisten di komputer mana pun. Untuk security, ini penting karena banyak lab praktik (termasuk lab di fase Ethical Hacking roadmap ini) didistribusikan sebagai container Docker - kamu tidak perlu menginstal manual satu per satu dependency yang rentan/berbahaya langsung di sistem utama. Cloud CLI (`aws`, `gcloud`, `az`) melengkapi bagian infra: mengontrol resource cloud (server, storage, jaringan virtual) langsung dari terminal, tanpa harus bolak-balik ke dashboard web.",
        },
        {
          kind: "praktik",
          title: "Cek versi semua tool infra dan nyalakan lab Docker",
          instructions: [
            "Jalankan `python3 --version`, `git --version`, dan `docker --version` untuk konfirmasi ketiganya ter-install.",
            "Kalau ada yang belum terpasang, instal lewat package manager dari Bekal 1 (misal `sudo apt install python3 git docker.io`).",
            "Masuk ke folder `docker/` di repo roadmap-app ini.",
            "Buka `docker-compose.yml` dan `docker/README.md` sekilas untuk paham dua service apa saja yang akan dinyalakan.",
            "Jalankan `docker compose up -d --build` untuk menyalakan lab praktik (target rentan + terminal browser).",
            "Jalankan `docker compose ps` untuk konfirmasi kedua container (`signal90-target`, `signal90-attacker`) berstatus running.",
          ],
          proof:
            'Output docker compose ps menunjukkan kedua container lab berstatus "running"/"Up", plus output ketiga perintah versi (python3, git, docker).',
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

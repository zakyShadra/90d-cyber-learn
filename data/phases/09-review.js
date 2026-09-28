// Fase 9: Review & Practice
export default {
  id: "review",
  number: 9,
  title: "Review & Practice",
  dayRange: "Hari 78–84",
  summary:
    "Menggabungkan semua skill dari fase sebelumnya jadi satu lab dan satu proyek nyata, sambil mengidentifikasi area yang masih lemah.",
  resources: [
    {
      label: "TryHackMe",
      url: "https://tryhackme.com",
    },
    {
      label: "VirtualBox",
      url: "https://www.virtualbox.org/",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 78",
      title: "Audit Diri: Identifikasi Area Lemah",
      steps: [
        {
          kind: "materi",
          title: "Kenapa harus jujur dulu sebelum lanjut ke hacking",
          body: "Setelah 8 fase (Network+ sampai Cloud Security), godaan terbesar adalah langsung loncat ke bagian yang paling seru: fase Ethical Hacking. Tapi kalau fondasinya masih bolong - misalnya masih bingung baca routing table, atau lupa cara kerja three-way handshake - kesulitan itu akan muncul lagi persis di tengah proses eksploitasi, saat kamu paling butuh fokus ke hal lain. Audit diri di hari ini bukan formalitas, tapi investasi supaya minggu terakhir roadmap ini berjalan lancar.",
        },
        {
          kind: "materi",
          title: "Kenapa membaca ulang catatan menipu",
          body: 'Membaca ulang catatan lama terasa produktif karena semuanya terlihat "familiar" - otak mengenali informasi begitu melihatnya lagi. Tapi mengenali (recognition) itu jauh lebih mudah daripada memproduksi ulang (recall) - itu sebabnya banyak orang merasa sudah paham saat membaca ulang, tapi mendadak blank saat harus menjelaskan atau mengerjakan sendiri tanpa contekan. Practice retrieval - sengaja mengerjakan ulang sesuatu dari ingatan murni - memaksa otak benar-benar mengambil ulang informasi itu, bukan cuma mengenalinya.',
        },
        {
          kind: "materi",
          title: "Cara mengukur area lemah tanpa menipu diri sendiri",
          body: "Self-assessment paling gampang gagal kalau kamu menilai diri berdasarkan seberapa nyaman kamu MERASA dengan suatu topik, bukan seberapa bisa kamu benar-benar MENGERJAKANNYA. Skala 1-5 per fase cuma berguna kalau jujur: skor 4-5 berarti kamu yakin bisa mengerjakan ulang tugas praktik fase itu tanpa membuka catatan sama sekali, bukan sekadar \"kayaknya familiar\". Fase dengan skor rendah bukan aib - itu sinyal berharga tentang di mana waktu tambahan paling berguna dipakai sebelum masuk fase hacking.",
        },
        {
          kind: "praktik",
          title: "Scoring diri dan ulangi 2 tugas dari ingatan",
          instructions: [
            "Beri skor 1-5 (confidence) untuk tiap 8 fase yang sudah dilewati (Network+ sampai Cloud) - patokan skor: 5 berarti yakin bisa mengerjakan ulang tugas praktiknya tanpa buka catatan sama sekali.",
            "Urutkan hasilnya dari skor terendah ke tertinggi, lalu pilih 2 fase dengan skor terendah.",
            "Untuk masing-masing dari 2 fase itu, buka daftar tugas praktiknya dan pilih satu yang paling merepresentasikan skill inti fase itu.",
            "Kerjakan ulang kedua tugas itu dari ingatan, tanpa membuka catatan lama atau jawaban sebelumnya sama sekali.",
            "Setelah selesai, baru bandingkan hasil pengerjaan ulang dengan catatan/jawaban pertamamu - catat persisnya bagian mana yang lupa atau salah.",
          ],
          proof:
            "Tabel skor 8 fase, dan catatan perbandingan hasil pengerjaan ulang 2 tugas terlemah.",
        },
        {
          kind: "kuis",
          question:
            "Metode mana yang lebih akurat menguji pemahamanmu: membaca ulang catatan, atau mengerjakan ulang tugas dari ingatan tanpa contekan?",
          inputType: "text",
          placeholder: "contoh: membaca ulang catatan",
          accepted: [
            "mengerjakan ulang dari ingatan",
            "dari ingatan",
            "mengerjakan ulang tugas dari ingatan",
          ],
          explanation:
            "Membaca ulang terasa familiar tapi gampang menipu - kamu mengenali informasi tanpa benar-benar bisa memproduksinya sendiri. Practice retrieval (mengerjakan dari ingatan) memaksa otakmu benar-benar mengambil ulang informasinya.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 79",
      title: "Membangun Home Lab - Attacker VM",
      steps: [
        {
          kind: "materi",
          title: "Kenapa home lab harus terisolasi",
          body: "Mulai hari ini kamu akan menyiapkan lab pribadi untuk berlatih menyerang mesin yang sengaja dibuat rentan - persiapan wajib sebelum fase Ethical Hacking. Lab ini HARUS terisolasi dari jaringan produksi/internet, karena mesin target sengaja penuh celah keamanan; kalau lab ini nyambung ke LAN rumah/kantormu, satu mesin yang berhasil kamu bobol saat latihan bisa jadi pintu masuk nyata ke perangkat lain di jaringan yang sama.",
        },
        {
          kind: "materi",
          title: "Tiga jenis network virtualisasi dan bedanya",
          body: "VirtualBox/VMware menawarkan beberapa mode network untuk VM: Bridged menyatukan VM langsung ke LAN fisik seolah-olah perangkat fisik terpisah (paling terbuka, paling berisiko untuk lab hacking); NAT membiarkan VM mengakses internet lewat satu arah keluar tapi tidak bisa diakses balik dari luar; dan Host-only cuma menghubungkan VM dengan VM lain (dan host-nya sendiri) tanpa jalur sama sekali ke LAN fisik atau internet. Untuk home lab hacking, Host-only adalah pilihan yang benar - VM attacker dan victim tetap bisa saling berkomunikasi, tapi keduanya terkurung dari jaringan nyata di sekitarnya.",
        },
        {
          kind: "praktik",
          title: "Setup VirtualBox/VMware dan VM attacker",
          instructions: [
            "Install VirtualBox atau VMware Workstation Player (pilih salah satu, gratis untuk pemakaian personal).",
            "Buka pengaturan network hypervisor-mu, buat satu network Host-only baru khusus untuk lab ini (bukan yang dipakai VM lain).",
            "Buat 1 VM baru, install Kali Linux di dalamnya.",
            "Ubah adapter network VM itu supaya terhubung ke Host-only network yang baru dibuat, BUKAN NAT atau Bridged.",
            "Nyalakan VM, jalankan `ip a` di dalamnya untuk konfirmasi Kali dapat IP dari range Host-only tadi (biasanya diawali `192.168.56.x` secara default).",
          ],
          proof:
            "Screenshot pengaturan network host-only dan output `ip a` di Kali menunjukkan IP dari range itu.",
        },
        {
          kind: "kuis",
          question:
            "Jenis network VirtualBox/VMware apa yang membiarkan VM saling terhubung tapi mengisolasi dari LAN utama komputermu?",
          inputType: "text",
          placeholder: "contoh: bridged",
          accepted: ["host-only", "host-only network", "jaringan host-only"],
          explanation:
            "Host-only network cuma menghubungkan VM dengan VM lain (dan host-nya sendiri) - beda dengan Bridged yang menyatu ke LAN fisik, atau NAT yang cuma satu arah keluar ke internet.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 80",
      title: "Membangun Home Lab - Victim VM dan Verifikasi Isolasi",
      steps: [
        {
          kind: "materi",
          title: "Metasploitable dan DVWA: target yang sengaja rapuh",
          body: "Metasploitable adalah image Linux yang SENGAJA dipenuhi service usang dan salah konfigurasi (FTP anonymous, service dengan credential default, dst), sementara DVWA (Damn Vulnerable Web Application) adalah aplikasi web PHP yang sengaja mengandung kerentanan klasik (SQL injection, XSS, command injection, dst) dengan level kesulitan yang bisa diatur. Keduanya legal dan aman dipakai justru karena memang dirancang untuk dibobol - beda jauh dengan mencoba menyerang sistem sungguhan tanpa izin.",
        },
        {
          kind: "materi",
          title: "Isolasi itu harus dibuktikan, bukan diasumsikan",
          body: "Baru menyambungkan VM ke Host-only network TIDAK otomatis berarti lab-mu aman - itu baru asumsi, belum bukti. Lab baru benar-benar terisolasi kalau dua syarat sekaligus terpenuhi: (1) VM di dalam lab bisa saling menjangkau satu sama lain (supaya latihan attacker→victim bisa jalan), DAN (2) tidak satu pun VM di lab itu bisa menjangkau gateway/router LAN utamamu. Banyak yang cuma mengecek syarat pertama dan menganggap lab-nya sudah aman - padahal syarat kedua itu yang justru melindungi jaringan asli di rumah/kantormu.",
        },
        {
          kind: "praktik",
          title: "Setup victim VM dan buktikan isolasi",
          instructions: [
            "Install 1 VM Metasploitable atau DVWA (pilih salah satu) di hypervisor yang sama dengan Kali dari hari sebelumnya.",
            "Sambungkan adapter network victim VM ini ke Host-only network YANG SAMA dengan Kali (bukan network host-only baru yang berbeda).",
            "Dari Kali, jalankan `ping <IP victim VM>` - pastikan berhasil (ada balasan).",
            "Dari Kali DAN dari victim VM, coba `ping <IP gateway/router LAN utamamu>` - pastikan KEDUANYA gagal total (timeout/unreachable).",
            "Catat hasil kedua arah pengujian ini secara eksplisit: mana yang berhasil, mana yang gagal.",
          ],
          proof:
            "Output ping yang berhasil antar-VM lab, dan output ping yang gagal ke LAN utama dari kedua VM.",
        },
        {
          kind: "kuis",
          question:
            "Selain ping berhasil antar-VM lab, apa yang wajib kamu verifikasi soal isolasi network lab ini?",
          inputType: "text",
          placeholder: "contoh: koneksi internet cepat",
          accepted: [
            "lab tidak bisa akses lan utama",
            "tidak bisa mengakses jaringan lan utama",
            "tidak terhubung ke lan utama",
            "tidak bisa akses lan utama",
          ],
          explanation:
            'Kalau VM lab masih bisa menjangkau LAN utamamu, satu VM yang "sengaja dibobol" saat latihan bisa jadi batu loncatan nyata ke perangkat lain di rumahmu - isolasi harus dua arah, bukan cuma "VM-nya bisa saling ngobrol".',
        },
      ],
    },
    {
      index: 4,
      label: "Hari 81",
      title: "Hands-on TryHackMe",
      steps: [
        {
          kind: "materi",
          title: "Room dan path: dua satuan konten TryHackMe",
          body: 'TryHackMe mengemas kontennya jadi "room" - satu room biasanya berisi satu target atau satu topik spesifik, lengkap dengan tugas berurutan yang harus diselesaikan. Beberapa room yang saling berurutan/berkaitan dikelompokkan jadi "path" (misal path "Jr Penetration Tester"). Room level pemula (kategori "Introductory") dirancang dengan instruksi yang cukup rinci untuk diikuti tanpa pengalaman sebelumnya, cocok untuk melatih alur kerja penuh sebelum mencoba room yang lebih sulit dan minim petunjuk.',
        },
        {
          kind: "materi",
          title: "Kenapa menulis walkthrough sendiri lebih penting daripada menyelesaikan room-nya",
          body: "Menyelesaikan room itu penting, tapi menulis walkthrough versimu sendiri sesudahnya jauh lebih penting untuk pembelajaran jangka panjang: proses menulis ulang setiap command dan ALASAN kamu menjalankannya memaksamu benar-benar memahami logikanya, bukan cuma mengikuti instruksi selangkah demi selangkah tanpa berpikir. Kebiasaan ini juga langsung menghasilkan bahan portofolio (lihat Hari 84) - jadi dua kerjaan sekaligus dalam satu proses.",
        },
        {
          kind: "praktik",
          title: "Selesaikan satu room pemula end-to-end",
          instructions: [
            'Buat akun TryHackMe gratis kalau belum punya, lalu cari kategori "Introductory" di halaman rooms.',
            "Pilih satu room pemula yang topiknya menarik buatmu (nmap, Linux fundamentals, web fundamentals, dst).",
            "Selesaikan seluruh room itu sendiri dulu, TANPA membuka walkthrough orang lain di internet - kalau stuck, coba dulu baca ulang hint/instruksi room-nya.",
            "Sambil mengerjakan, catat tiap command yang kamu jalankan beserta alasannya (bukan cuma copy-paste dari instruksi room).",
            "Setelah room selesai, rapikan catatan tadi jadi satu walkthrough utuh versimu sendiri.",
          ],
          proof:
            "Room yang diselesaikan (nama + bukti completion) dan walkthrough tertulis versimu sendiri.",
        },
        {
          kind: "kuis",
          question:
            "TryHackMe menyediakan lingkungan target siap pakai yang mereka sebut apa?",
          inputType: "text",
          placeholder: "contoh: path",
          accepted: ["room", "rooms"],
          explanation:
            'Satu "room" biasanya berisi satu target atau satu topik dengan panduan bertahap - kumpulan room yang berurutan disebut "path".',
        },
      ],
    },
    {
      index: 5,
      label: "Hari 82",
      title: "Proyek Integrasi - Ping Sweep",
      steps: [
        {
          kind: "materi",
          title: "Kenapa tidak langsung port-scan seluruh subnet",
          body: "Port-scan penuh (semua 65535 port) ke setiap alamat di satu subnet /24 (256 IP) itu lambat dan menghasilkan banyak sekali traffic yang tidak perlu - kebanyakan alamat di subnet mana pun biasanya memang tidak ada host yang hidup di sana. Pola kerja yang lebih efisien: cari dulu host mana saja yang benar-benar hidup, baru lakukan port-scan yang lebih detail HANYA ke host-host itu.",
        },
        {
          kind: "materi",
          title: "Ping sweep: ICMP echo request ke satu subnet penuh",
          body: "Ping sweep adalah teknik mengirim ICMP echo request (paket ping biasa) ke SETIAP alamat IP di satu range subnet, lalu mencatat siapa saja yang membalas. Ini jauh lebih murah secara waktu/traffic dibanding port-scan penuh, karena satu ping per host biasanya cukup untuk tahu \"hidup atau tidak\" - baru dari daftar host yang hidup itulah proses recon berlanjut ke tahap yang lebih detail (Hari 83).",
        },
        {
          kind: "praktik",
          title: "Tulis script ping sweep untuk subnet lab",
          instructions: [
            "Di VM Kali dari home lab Hari 79-80, buka editor/IDE, buat file baru misal `ping_sweep.py`.",
            "Tulis script Python yang melakukan ping sweep ke seluruh subnet Host-only lab-mu (misal 192.168.56.0/24 - sesuaikan dengan subnet lab-mu sendiri).",
            "Gunakan modul `subprocess` untuk memanggil `ping -c 1 -W 1 <ip>` per alamat (loop dari .1 sampai .254), lalu cek return code-nya untuk tahu berhasil/gagal.",
            "Kumpulkan semua IP yang membalas ke satu list, lalu cetak daftar itu di akhir eksekusi script.",
            "Jalankan script terhadap subnet lab-mu dan bandingkan hasilnya dengan jumlah VM yang kamu tahu sedang nyala - harus cocok.",
          ],
          proof:
            "Script ping sweep dan daftar IP hidup yang cocok dengan VM yang benar-benar kamu nyalakan.",
        },
        {
          kind: "kuis",
          question:
            "Teknik memeriksa host mana saja yang hidup di satu subnet dengan mengirim ping ke tiap alamat disebut apa?",
          inputType: "text",
          placeholder: "contoh: port scan",
          accepted: ["ping sweep"],
          explanation:
            "Ping sweep jauh lebih murah dan cepat daripada langsung port-scan seluruh subnet - kamu cuma lanjut scan port ke host yang terbukti hidup.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 83",
      title: "Proyek Integrasi - Port Scanner dan Logging",
      steps: [
        {
          kind: "materi",
          title: "Menggabungkan tiga fase jadi satu tool",
          body: "Hari ini kamu menggabungkan tiga skill dari fase-fase berbeda jadi satu tool utuh: ping sweep (Hari 82, hasil dari fase ini sendiri) untuk menemukan host hidup, logika socket dari fase Python untuk mengecek port terbuka per host, dan kebiasaan mencatat hasil ke file dari fase Linux/Traffic Analysis. Ini simulasi kecil dari bagaimana recon sungguhan bekerja: bukan satu tool ajaib, tapi rangkaian tool sederhana yang saling menyambung.",
        },
        {
          kind: "materi",
          title: "Kenapa nama file log harus mengandung timestamp",
          body: "Menjalankan scanner yang sama berulang kali (misal untuk membandingkan kondisi lab dari waktu ke waktu) akan menimpa file log lama kalau nama filenya statis (`scan.log` terus-menerus). Menyertakan timestamp di nama file (misal `scan_2026-09-26_1430.log`) membuat tiap eksekusi punya file sendiri, sehingga histori hasil scan sebelumnya tidak pernah hilang tertimpa - penting untuk membandingkan \"port apa yang baru terbuka sejak scan terakhir\".",
        },
        {
          kind: "praktik",
          title: "Perluas script jadi scanner + logger lengkap",
          instructions: [
            "Ambil daftar host hidup dari script ping sweep Hari 82 (bisa dipanggil sebagai fungsi, atau di-hardcode sementara dari hasil terakhir).",
            "Untuk tiap host hidup, tulis logika socket yang mencoba connect ke port-port umum (21, 22, 80, 443, 3306, 8080) dengan timeout singkat (misal 1 detik) supaya tidak menggantung lama di port yang tertutup.",
            "Kumpulkan hasil per host (list port yang terbuka), lalu tulis semuanya ke satu file dengan nama mengandung timestamp saat scan dijalankan, misal `scan_2026-09-26_1430.log`.",
            "Jalankan script lengkap ini terhadap subnet lab dan buka isi file log-nya untuk ditinjau.",
            "Jalankan ulang sekali lagi setelah beberapa saat, lalu bandingkan dua file log yang dihasilkan - pastikan namanya beda dan keduanya tetap ada (tidak saling menimpa).",
          ],
          proof:
            "Script scanner+logger lengkap dan satu file log hasil scan terhadap subnet lab dengan timestamp di namanya.",
        },
        {
          kind: "kuis",
          question:
            "Format timestamp seperti apa yang membuat nama file otomatis terurut alfabetis dari yang paling lama ke paling baru?",
          inputType: "text",
          placeholder: "contoh: dd-mm-yyyy",
          accepted: ["yyyy-mm-dd", "iso 8601", "yyyymmdd"],
          explanation:
            "Format tahun-bulan-tanggal (ISO 8601, misal 2026-09-26) terurut alfabetis persis sama dengan urutan kronologisnya - format tanggal-bulan-tahun tidak punya sifat ini.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 84",
      title: "Dokumentasi dan Portofolio",
      steps: [
        {
          kind: "materi",
          title: "Bukti kerja mengalahkan daftar sertifikat",
          body: "Recruiter dan hiring manager di bidang security sangat menghargai bukti kerja nyata (writeup, script, lab notes) dibanding sekadar daftar sertifikat - repo GitHub yang terdokumentasi rapi adalah portofolio paling murah dan paling kredibel. Sertifikat menunjukkan kamu pernah lulus ujian; portofolio menunjukkan kamu benar-benar bisa mengerjakan sesuatu, dan itu yang lebih meyakinkan untuk posisi entry-level.",
        },
        {
          kind: "materi",
          title: "README yang baik ditulis untuk orang asing, bukan untuk dirimu sendiri",
          body: "Kesalahan umum saat membuat portofolio: menulis README seolah-olah pembacanya sudah tahu konteks proyekmu (karena kamu sendiri yang mengerjakannya, jadi semuanya terasa jelas). Padahal recruiter yang membuka repo-mu sama sekali tidak tahu latar belakangnya - README yang baik menjelaskan APA proyek ini, KENAPA dibuat, dan BAGAIMANA cara menavigasi struktur foldernya, ditulis untuk pembaca yang baru pertama kali melihatnya sama sekali.",
        },
        {
          kind: "praktik",
          title: "Publikasikan lab notes ke GitHub",
          instructions: [
            "Buat repository publik baru di GitHub bernama `cybersecurity-lab-notes`.",
            "Pilih minimal 3 fase yang sudah kamu selesaikan (misal traffic analysis, Python automation, TryHackMe room dari Hari 81) dan siapkan writeup + script dari masing-masing.",
            "Buat satu folder per fase/proyek di dalam repo, push writeup dan script itu ke folder masing-masing.",
            "Tulis README.md di root repo yang menjelaskan: apa isi repo ini, kenapa dibuat (konteks roadmap 90 hari), dan daftar folder beserta ringkasan singkat isi tiap folder.",
            "Cek ulang README-mu dengan berpura-pura jadi orang asing yang baru pertama kali membuka repo ini - apakah masih jelas tanpa penjelasan tambahan darimu secara langsung?",
          ],
          proof:
            "Link repository GitHub publik dengan README dan minimal 3 folder writeup/script.",
        },
        {
          kind: "kuis",
          question:
            "Nama repository GitHub publik yang disarankan untuk portofolio lab notes-mu di materi ini apa?",
          inputType: "text",
          placeholder: "contoh: my-portfolio",
          accepted: ["cybersecurity-lab-notes"],
          explanation:
            "Nama yang deskriptif dan konsisten memudahkan recruiter langsung paham isinya cuma dari judul repo, tanpa perlu klik masuk dulu.",
        },
      ],
    },
  ],
};

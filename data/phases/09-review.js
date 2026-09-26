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
          title: "Jujur lebih produktif daripada terburu-buru",
          body: "Sebelum lanjut ke hacking, jujur terhadap area yang belum kuat itu lebih produktif daripada terburu-buru maju. Mengulang satu tugas dari ingatan (tanpa contekan) adalah tes pemahaman yang jauh lebih akurat daripada sekadar membaca ulang catatan.",
        },
        {
          kind: "praktik",
          title: "Scoring diri dan ulangi 2 tugas dari ingatan",
          instructions: [
            "Beri skor 1-5 (confidence) untuk tiap 8 fase yang sudah dilewati (Network+ sampai Cloud).",
            "Pilih 2 fase dengan skor terendah.",
            "Untuk masing-masing, pilih ulang satu tugas praktik dari fase itu dan kerjakan lagi dari ingatan, tanpa membuka catatan lama.",
            "Bandingkan hasilnya dengan pengerjaan pertama - apa yang masih lupa?",
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
          title: "Kenapa harus terisolasi",
          body: "Home lab yang terisolasi (host-only network) memungkinkan berlatih menyerang mesin rentan tanpa risiko menyentuh jaringan produksi atau internet - prasyarat wajib sebelum masuk fase hacking. Network host-only membiarkan VM saling terhubung satu sama lain, tapi memutus jalur ke LAN utama komputermu.",
        },
        {
          kind: "praktik",
          title: "Setup VirtualBox/VMware dan VM attacker",
          instructions: [
            "Install VirtualBox atau VMware Workstation Player.",
            "Buat network host-only baru khusus untuk lab.",
            "Install 1 VM Kali Linux, pasang di network host-only itu (bukan NAT/Bridged).",
            "Konfirmasi Kali dapat IP dari range host-only tadi (`ip a`).",
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
          title: "Lab belum aman sampai isolasinya dibuktikan",
          body: "Metasploitable dan DVWA adalah dua target rentan populer untuk latihan - sengaja dibuat penuh celah keamanan. Tapi lab baru benar-benar aman dipakai kalau isolasinya sudah dibuktikan dua arah: VM saling terhubung, DAN tidak satu pun dari mereka bisa menjangkau LAN utamamu.",
        },
        {
          kind: "praktik",
          title: "Setup victim VM dan buktikan isolasi",
          instructions: [
            "Install 1 VM Metasploitable atau DVWA di network host-only yang sama dengan Kali.",
            "Dari Kali, ping IP victim VM - harus berhasil.",
            "Dari kedua VM, coba ping IP router/gateway LAN utamamu - harus GAGAL.",
            "Catat hasil kedua arah pengujian ini.",
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
          title: "Target siap pakai dengan panduan terstruktur",
          body: "Room TryHackMe memberi lingkungan target siap pakai dengan panduan terstruktur - cara efektif melatih alur recon-exploit-report tanpa harus membangun target sendiri dulu.",
        },
        {
          kind: "praktik",
          title: "Selesaikan satu room pemula end-to-end",
          instructions: [
            'Pilih satu room level pemula di TryHackMe (misal kategori "Introductory").',
            "Selesaikan seluruh room tanpa langsung membuka walkthrough orang lain.",
            "Tulis walkthrough versimu sendiri: setiap command yang kamu jalankan dan alasan menjalankannya.",
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
          title: "Langkah pertama sebelum scan port",
          body: "Sebelum scan port satu per satu ke seluruh subnet (lambat dan berisik), pemindaian awal biasanya cukup mencari host mana saja yang HIDUP dulu. Teknik ini disebut ping sweep - mengirim ICMP echo request ke tiap alamat di satu subnet dan mencatat siapa yang membalas.",
        },
        {
          kind: "praktik",
          title: "Tulis script ping sweep untuk subnet lab",
          instructions: [
            "Di VM Kali dari home lab, tulis script Python yang melakukan ping sweep ke seluruh subnet host-only lab (misal 192.168.56.0/24).",
            "Gunakan modul `subprocess` untuk memanggil `ping -c 1 -W 1 <ip>` per alamat, atau `socket` kalau mau tanpa subprocess.",
            "Cetak daftar IP yang membalas (hidup) di akhir eksekusi.",
            "Jalankan terhadap subnet lab-mu dan bandingkan hasilnya dengan jumlah VM yang kamu tahu sedang nyala.",
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
          body: "Sekarang gabungkan hasil ping sweep kemarin dengan logika port scanner dari fase Python: untuk tiap host yang hidup, scan port umum, lalu simpan semuanya ke file log. Menyertakan timestamp di nama file log memudahkan membandingkan hasil scan dari waktu ke waktu tanpa saling menimpa.",
        },
        {
          kind: "praktik",
          title: "Perluas script jadi scanner + logger lengkap",
          instructions: [
            "Ambil daftar host hidup dari script ping sweep Hari 82.",
            "Untuk tiap host hidup, scan port umum (21, 22, 80, 443, 3306, 8080) pakai logika socket dari fase Python.",
            "Tulis semua hasil (host + port terbuka) ke file dengan nama mengandung timestamp, misal `scan_2026-09-26_1430.log`.",
            "Jalankan script lengkap ini terhadap subnet lab dan tinjau isi file log-nya.",
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
          body: "Recruiter dan hiring manager di bidang security sangat menghargai bukti kerja nyata (writeup, script, lab notes) dibanding sekadar daftar sertifikat - repo GitHub yang terdokumentasi rapi adalah portofolio paling murah dan paling kredibel.",
        },
        {
          kind: "praktik",
          title: "Publikasikan lab notes ke GitHub",
          instructions: [
            "Buat repository publik baru bernama `cybersecurity-lab-notes`.",
            "Push writeup dan script dari minimal 3 fase yang sudah kamu selesaikan (misal traffic analysis, Python automation, TryHackMe room).",
            "Tulis README yang menjelaskan struktur repo dan konteks tiap folder untuk pembaca yang belum tahu proyekmu sama sekali.",
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

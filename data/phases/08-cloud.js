// Fase 8: Cloud Security
export default {
  id: "cloud",
  number: 8,
  title: "Cloud Security",
  dayRange: "Hari 71–77",
  summary:
    "Pilih satu platform (AWS, GCP, atau Azure) dan pelajari model keamanannya secara hands-on lewat free tier. Konsepnya sama di ketiganya, hanya nama layanan yang berbeda.",
  resources: [
    {
      label: "AWS Getting Started",
      url: "https://aws.amazon.com/getting-started/",
    },
    {
      label: "Google Cloud Getting Started",
      url: "https://cloud.google.com/getting-started/",
    },
    {
      label: "Azure Fundamentals",
      url: "https://learn.microsoft.com/en-us/training/azure/",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 71",
      title: "Shared Responsibility Model",
      steps: [
        {
          kind: "materi",
          title: "Siapa mengamankan apa",
          body: 'Provider cloud bertanggung jawab atas keamanan "of the cloud" (infrastruktur fisik, jaringan dasar), sementara pengguna bertanggung jawab atas keamanan "in the cloud" (konfigurasi, data, IAM). Kesalahan konfigurasi pengguna adalah penyebab kebocoran data cloud paling umum, bukan kegagalan provider.',
        },
        {
          kind: "praktik",
          title: "Ringkas shared responsibility platformmu",
          instructions: [
            "Pilih satu platform (AWS/GCP/Azure) dan buat akun free tier.",
            "Baca dokumentasi resmi shared responsibility model platform itu.",
            "Tulis 5 poin: mana yang jadi tanggung jawab provider, mana yang jadi tanggung jawabmu.",
          ],
          proof:
            "Akun free tier aktif dan 5 poin ringkasan shared responsibility dalam bahasamu sendiri.",
        },
        {
          kind: "kuis",
          question:
            "Dalam shared responsibility model, siapa yang bertanggung jawab mengamankan konfigurasi dan data yang kamu simpan di cloud?",
          inputType: "text",
          placeholder: "contoh: provider",
          accepted: ["pengguna", "user", "customer", "pelanggan"],
          explanation:
            'Provider menjaga infrastruktur fisik dan jaringan dasarnya ("of the cloud"); kamu yang menjaga apa yang kamu taruh dan konfigurasi di atasnya ("in the cloud").',
        },
      ],
    },
    {
      index: 2,
      label: "Hari 72",
      title: "IAM di Cloud",
      steps: [
        {
          kind: "materi",
          title: "Siapa boleh melakukan apa",
          body: "IAM cloud mengatur siapa (user/role) boleh melakukan apa (policy/permission) terhadap resource apa. Least privilege berarti memberi akses seminimal mungkin yang dibutuhkan - bukan memberi akses admin penuh demi kepraktisan.",
        },
        {
          kind: "praktik",
          title: "Buat IAM role least-privilege untuk satu VM",
          instructions: [
            "Buat satu IAM user/role baru (bukan akun root/owner).",
            "Buat custom policy yang HANYA mengizinkan start/stop satu instance VM tertentu, tidak lebih.",
            "Attach policy itu ke user/role tadi.",
            "Login sebagai user itu, buktikan bisa start/stop VM itu tapi gagal melakukan aksi lain (misal membuat storage bucket baru).",
          ],
          proof:
            "Isi custom policy dan bukti (screenshot/log error) bahwa aksi di luar policy ditolak.",
        },
        {
          kind: "kuis",
          question:
            "Istilah untuk prinsip memberi akses seminimal mungkin yang benar-benar dibutuhkan disebut apa?",
          inputType: "text",
          placeholder: "contoh: zero trust",
          accepted: ["least privilege", "prinsip least privilege"],
          explanation:
            "Least privilege membatasi blast radius kalau satu akun/kredensial bocor - akun itu cuma bisa melakukan sedikit hal, bukan segalanya.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 73",
      title: "Compute Dasar dan Firewall/Security Group",
      steps: [
        {
          kind: "materi",
          title: "Firewall di level cloud",
          body: "VM di cloud dilindungi oleh security group (AWS) atau firewall rule (GCP/Azure) yang mengontrol traffic masuk/keluar berdasarkan IP, port, dan protokol - konsep yang sama persis dengan firewall di materi Security+.",
        },
        {
          kind: "praktik",
          title: "Kunci akses SSH VM hanya dari IP-mu",
          instructions: [
            "Launch satu VM free-tier di platform pilihanmu.",
            "Cek IP publikmu sendiri (misal lewat `curl ifconfig.me`).",
            "Konfigurasi security group/firewall rule agar port SSH (22) hanya bisa diakses dari IP publikmu itu.",
            "Verifikasi kamu masih bisa SSH masuk, lalu coba scan port itu dari layanan online scanner untuk konfirmasi tertutup dari luar.",
          ],
          proof:
            "Konfigurasi rule firewall/security group dan bukti akses berhasil dari IP-mu, gagal dari luar.",
        },
        {
          kind: "kuis",
          question:
            "Di AWS, fitur yang mengontrol traffic masuk/keluar VM berdasarkan IP, port, dan protokol disebut apa?",
          inputType: "text",
          placeholder: "contoh: IAM role",
          accepted: ["security group"],
          explanation:
            "AWS menyebutnya security group; GCP dan Azure menyebutnya firewall rule - fungsinya identik.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 74",
      title: "Storage dan Keamanan Data",
      steps: [
        {
          kind: "materi",
          title: "Bucket publik adalah kebocoran data #1",
          body: 'Object storage (S3, Cloud Storage, Blob Storage) sering jadi sumber kebocoran data karena bucket yang salah dikonfigurasi jadi publik. Semua provider besar sekarang punya fitur "block public access" untuk mencegah ini secara default.',
        },
        {
          kind: "praktik",
          title: "Uji dan amankan bucket storage",
          instructions: [
            "Buat satu storage bucket baru.",
            "Coba jadikan bucket itu publik sementara, upload satu file test, akses lewat URL publik untuk konfirmasi bisa diakses.",
            'Kembalikan ke private, aktifkan fitur "block public access" (atau setara).',
            "Verifikasi URL yang sama sekarang gagal diakses, dan jalankan public-access checker bawaan platform untuk konfirmasi status aman.",
          ],
          proof:
            "Bukti akses publik berhasil (sebelum) dan gagal (sesudah), plus hasil public-access checker.",
        },
        {
          kind: "kuis",
          question:
            "Fitur yang mencegah storage bucket diakses publik secara tidak sengaja disebut apa?",
          inputType: "text",
          placeholder: "contoh: versioning",
          accepted: ["block public access", "blok akses publik"],
          explanation:
            '"Block public access" adalah saklar yang, kalau aktif, menolak ACL/policy apa pun yang mencoba membuka bucket ke publik - pertahanan terakhir dari kesalahan konfigurasi manusia.',
        },
      ],
    },
    {
      index: 5,
      label: "Hari 75",
      title: "Logging dan Monitoring",
      steps: [
        {
          kind: "materi",
          title: "Audit log adalah memori akunmu",
          body: "Audit log (CloudTrail di AWS, Cloud Audit Logs di GCP, Azure Monitor di Azure) mencatat setiap aksi API yang terjadi di akunmu - sumber data utama untuk investigasi insiden dan deteksi aktivitas mencurigakan di cloud.",
        },
        {
          kind: "praktik",
          title: "Lacak aksimu sendiri lewat audit log",
          instructions: [
            "Aktifkan layanan audit logging platformmu (kalau belum aktif secara default).",
            "Lakukan 3 aksi berbeda: buat resource, ubah konfigurasi, hapus resource.",
            "Buka audit log, temukan ketiga event itu secara spesifik.",
            "Catat informasi apa saja yang tercatat untuk tiap event (siapa, kapan, aksi apa, dari IP mana).",
          ],
          proof:
            "Screenshot 3 entry audit log yang sesuai dengan 3 aksi yang kamu lakukan.",
        },
        {
          kind: "kuis",
          question:
            "Layanan AWS yang mencatat setiap aksi API di akunmu disebut apa?",
          inputType: "text",
          placeholder: "contoh: GuardDuty",
          accepted: ["cloudtrail", "aws cloudtrail"],
          explanation:
            "CloudTrail mencatat who-did-what-when-from-where untuk hampir semua API call di akun AWS-mu - GCP dan Azure punya padanan bernama Cloud Audit Logs dan Azure Monitor/Activity Log.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 76",
      title: "Cleanup dan Kontrol Biaya",
      steps: [
        {
          kind: "materi",
          title: "Resource yang lupa dimatikan = tagihan kejutan",
          body: "Resource cloud yang lupa dimatikan adalah penyebab utama tagihan tak terduga. Billing alert memberi peringatan dini sebelum biaya membengkak, dan harus jadi kebiasaan standar setiap kali eksperimen di cloud.",
        },
        {
          kind: "praktik",
          title: "Pasang billing alert dan bersihkan semua resource",
          instructions: [
            "Set billing alert/budget notification di ambang batas rendah, misal $1.",
            "Buat daftar semua resource yang kamu buat sepanjang modul ini (VM, storage bucket, IAM role, dll).",
            "Hapus/terminate semuanya satu per satu.",
            "Verifikasi lewat billing dashboard atau resource list bahwa tidak ada resource billable yang tersisa.",
          ],
          proof:
            "Screenshot billing alert yang terpasang dan bukti resource list kosong dari sisa eksperimen.",
        },
        {
          kind: "kuis",
          question:
            "Fitur yang memberi peringatan dini sebelum biaya cloud membengkak disebut apa?",
          inputType: "text",
          placeholder: "contoh: cost explorer",
          accepted: ["billing alert", "budget alert"],
          explanation:
            "Billing/budget alert mengirim notifikasi begitu pengeluaran menyentuh ambang batas yang kamu set - jauh lebih murah daripada kaget lihat tagihan di akhir bulan.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 77",
      title: "Audit Akses dan Log Menyeluruh",
      steps: [
        {
          kind: "materi",
          title: "Menutup minggu dengan bersih",
          body: "Sebelum menganggap fase cloud selesai, tinjau ulang semua yang kamu buat: apakah semua IAM role/policy dari Hari 72 masih seketat awal, dan apakah audit log dari Hari 75 menunjukkan aktivitas yang wajar dari kamu sendiri (bukan sesuatu yang aneh). Kebiasaan audit rutin ini yang membedakan konfigurasi cloud yang aman jangka panjang dari yang cuma aman di hari pertama.",
        },
        {
          kind: "praktik",
          title: "Lakukan access review menyeluruh",
          instructions: [
            "Buka kembali IAM role/policy yang kamu buat di Hari 72, cek apakah masih sesuai least privilege atau malah melebar karena testing.",
            "Cabut/perketat permission apa pun yang tidak lagi kamu perlukan.",
            "Query audit log platformmu untuk seluruh aktivitas minggu ini, pastikan tidak ada event yang bukan dari kamu.",
            "Konfirmasi ulang billing dashboard menunjukkan nol resource aktif sisa eksperimen.",
          ],
          proof:
            "Catatan hasil access review (apa yang diperketat/dicabut) dan konfirmasi billing dashboard bersih.",
        },
        {
          kind: "kuis",
          question:
            "Istilah umum untuk meninjau ulang seluruh izin (IAM) yang sudah pernah diberikan, untuk memastikan tidak ada yang berlebihan, disebut apa?",
          inputType: "text",
          placeholder: "contoh: penetration test",
          accepted: ["access review", "iam audit", "audit akses", "audit iam"],
          explanation:
            "Access review adalah praktik rutin meninjau siapa punya akses ke apa lalu mencabut yang tidak lagi diperlukan - least privilege itu proses berkelanjutan, bukan sekali set lalu dilupakan.",
        },
      ],
    },
  ],
};

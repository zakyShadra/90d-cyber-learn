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
          body: 'Provider cloud bertanggung jawab atas keamanan "of the cloud" (infrastruktur fisik data center, jaringan dasar, virtualisasi host), sementara pengguna bertanggung jawab atas keamanan "in the cloud" (konfigurasi resource, data, IAM, sistem operasi kalau itu levelmu). Garis ini bukan sekadar formalitas kontrak - ia menentukan tim mana yang harus bertindak duluan kalau ada insiden.',
        },
        {
          kind: "materi",
          title: "Garis tanggung jawab bergeser sesuai model layanan",
          body: "Posisi garis pembagi berubah tergantung model layanan yang dipakai: di IaaS (Infrastructure as a Service, misal EC2/Compute Engine mentah), pengguna bertanggung jawab sampai level OS, patching, dan konfigurasi aplikasi. Di PaaS (Platform as a Service, misal App Engine/Elastic Beanstalk), provider mengurus OS dan runtime, pengguna cukup fokus ke kode dan konfigurasi aplikasinya. Di SaaS (Software as a Service, misal Google Workspace), pengguna nyaris cuma bertanggung jawab atas data dan pengaturan akses yang mereka masukkan sendiri - provider menangani hampir semuanya di baliknya. Semakin ke arah SaaS, semakin sedikit yang jadi tanggung jawab teknismu, tapi tanggung jawab atas DATA dan AKSES tetap selalu ada di tanganmu di ketiga model itu.",
        },
        {
          kind: "materi",
          title: "Kenapa kesalahan konfigurasi jadi penyebab #1",
          body: "Kesalahan konfigurasi pengguna (bucket storage publik tidak sengaja, security group yang terlalu terbuka, kredensial yang ter-commit ke repo publik) adalah penyebab kebocoran data cloud paling umum di dunia nyata, jauh melebihi kegagalan infrastruktur dari sisi provider. Ini masuk akal kalau dikaitkan dengan shared responsibility: provider sudah mengeraskan (harden) infrastrukturnya secara ketat, tapi begitu masuk wilayah 'in the cloud', keamanannya sepenuhnya bergantung pada bagaimana pengguna mengonfigurasi resource-nya sendiri.",
        },
        {
          kind: "praktik",
          title: "Ringkas shared responsibility platformmu",
          instructions: [
            "Pilih satu platform (AWS/GCP/Azure) dan buat akun free tier.",
            "Baca dokumentasi resmi shared responsibility model platform itu.",
            "Identifikasi model layanan apa saja yang akan kamu pakai di fase ini (kemungkinan besar IaaS untuk VM di Hari 73) dan di mana garis tanggung jawabnya untuk model itu spesifik.",
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
          body: "IAM (Identity and Access Management) cloud mengatur siapa (user/role/service account) boleh melakukan apa (action/permission dalam sebuah policy) terhadap resource apa (VM tertentu, bucket tertentu, dst). Least privilege berarti memberi akses seminimal mungkin yang benar-benar dibutuhkan untuk menyelesaikan tugas - bukan memberi akses admin penuh demi kepraktisan supaya 'tidak perlu setting ulang kalau nanti butuh lebih'.",
        },
        {
          kind: "materi",
          title: "Empat blok bangunan IAM",
          body: "Hampir semua sistem IAM cloud tersusun dari empat elemen: identity (user manusia, atau service account/managed identity untuk aplikasi/mesin), policy/permission (daftar action yang diizinkan/ditolak, misal `s3:GetObject` atau `compute.instances.start`), role (kumpulan policy yang bisa di-attach ke identity, memudahkan pengelolaan dibanding mengatur permission satu-satu), dan resource (target dari action itu - bucket spesifik, VM spesifik, atau seluruh project/akun). Saat identity mencoba melakukan action, cloud mengevaluasi SEMUA policy yang berlaku ke identity dan resource itu - di kebanyakan provider, satu deny eksplisit mengalahkan allow dari mana pun, prinsip 'deny by default, explicit allow' yang jadi dasar least privilege.",
        },
        {
          kind: "materi",
          title: "Role/service account vs kredensial statis",
          body: "Untuk aplikasi/mesin yang butuh akses ke resource lain (misal VM yang perlu baca dari storage bucket), praktik terbaik adalah memakai role/service account dengan kredensial SEMENTARA yang otomatis di-rotate oleh platform (assume role di AWS, service account attached langsung ke VM di GCP), BUKAN menaruh access key/secret key statis di dalam kode atau file konfigurasi. Kredensial statis yang ter-hardcode adalah salah satu penyebab kebocoran paling umum (sering ketemu ter-commit tidak sengaja ke repo publik) - kredensial sementara otomatis kedaluwarsa dan tidak berguna lagi kalau bocor setelah masa berlakunya habis.",
        },
        {
          kind: "praktik",
          title: "Buat IAM role least-privilege untuk satu VM",
          instructions: [
            "Buat satu IAM user/role baru (bukan akun root/owner).",
            "Buat custom policy yang HANYA mengizinkan start/stop satu instance VM tertentu, tidak lebih.",
            "Attach policy itu ke user/role tadi.",
            "Login sebagai user itu, buktikan bisa start/stop VM itu tapi gagal melakukan aksi lain (misal membuat storage bucket baru).",
            "Baca pesan error saat aksi yang tidak diizinkan itu ditolak - catat bagian mana dari pesan error yang menunjukkan permission spesifik apa yang kurang.",
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
          body: "VM di cloud dilindungi oleh security group (AWS) atau firewall rule (GCP/Azure) yang mengontrol traffic masuk/keluar berdasarkan IP, port, dan protokol - konsep yang sama persis dengan firewall di materi Security+, cuma dikonfigurasi lewat console/API cloud alih-alih perangkat fisik.",
        },
        {
          kind: "materi",
          title: "Stateful vs stateless: kenapa AWS punya dua lapis",
          body: "Security group AWS bersifat stateful - kalau traffic masuk diizinkan, traffic balasannya otomatis diizinkan keluar tanpa perlu rule terpisah. Network ACL (NACL) di level subnet bersifat stateless - traffic masuk dan keluar harus dievaluasi terpisah, rule balasannya harus didefinisikan eksplisit. GCP dan Azure firewall rule pada umumnya juga stateful seperti security group AWS. Memahami mana yang stateful/stateless penting supaya tidak salah duga kenapa satu arah traffic jalan tapi arah baliknya diblokir.",
        },
        {
          kind: "materi",
          title: "Memperkecil attack surface: bukan cuma soal satu port",
          body: "Prinsip di balik latihan hari ini (SSH cuma dari IP tertentu) adalah memperkecil attack surface - setiap port yang terbuka ke `0.0.0.0/0` (semua IP di internet) adalah target potensial untuk automated scanning dan brute force. Pola yang lebih matang di lingkungan produksi: pakai bastion host/jump box (satu titik masuk SSH yang diperketat, semua akses lain lewat situ) atau VPN, sehingga tidak ada VM produksi yang expose port administratif langsung ke internet publik sama sekali.",
        },
        {
          kind: "praktik",
          title: "Kunci akses SSH VM hanya dari IP-mu",
          instructions: [
            "Launch satu VM free-tier di platform pilihanmu.",
            "Cek IP publikmu sendiri (misal lewat `curl ifconfig.me`).",
            "Konfigurasi security group/firewall rule agar port SSH (22) hanya bisa diakses dari IP publikmu itu.",
            "Verifikasi kamu masih bisa SSH masuk, lalu coba scan port itu dari layanan online scanner untuk konfirmasi tertutup dari luar.",
            "Cek apakah rule firewall/security group yang kamu buat bersifat stateful (coba balasan traffic dari VM keluar, harusnya tidak perlu rule outbound terpisah untuk balasan SSH itu).",
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
          body: 'Object storage (S3, Cloud Storage, Blob Storage) sering jadi sumber kebocoran data karena bucket yang salah dikonfigurasi jadi publik - biasanya bukan disengaja, tapi karena permission diatur longgar demi kemudahan development lalu lupa diperketat lagi. Semua provider besar sekarang punya fitur "block public access" untuk mencegah ini secara default di akun baru.',
        },
        {
          kind: "materi",
          title: "Lapisan kontrol akses: IAM policy vs bucket policy vs ACL",
          body: "Storage bucket biasanya punya beberapa lapisan kontrol akses yang bisa saling tumpang tindih: IAM policy (siapa boleh apa, di level akun/identity), bucket policy (aturan yang menempel langsung ke bucket itu, berlaku untuk siapa pun yang mengakses termasuk dari luar akun), dan ACL/object-level permission (kontrol lebih granular per object individual, sekarang makin jarang dipakai karena bucket policy lebih mudah diaudit). Kebocoran sering terjadi saat salah satu lapisan ini sengaja dilonggarkan untuk testing tapi lapisan lain tidak ikut membatasi, sehingga akses publik tetap tembus dari jalur yang tidak diperiksa.",
        },
        {
          kind: "materi",
          title: "Enkripsi dan versioning sebagai lapisan pertahanan tambahan",
          body: "Enkripsi at-rest (data terenkripsi saat disimpan di disk) dan in-transit (terenkripsi saat berpindah lewat jaringan, biasanya lewat HTTPS/TLS) melindungi data kalau media fisiknya dicuri atau traffic-nya disadap - tapi TIDAK melindungi dari bucket yang salah dikonfigurasi jadi publik, karena siapa pun yang punya akses sah tetap bisa membaca data yang sudah didekripsi otomatis oleh layanan itu. Versioning (menyimpan versi lama tiap kali object di-overwrite/dihapus) berguna untuk forensik dan pemulihan setelah insiden (misal ransomware yang mengenkripsi/menghapus object) - kombinasi enkripsi + access control + versioning memberi pertahanan berlapis, bukan mengandalkan satu fitur saja.",
        },
        {
          kind: "praktik",
          title: "Uji dan amankan bucket storage",
          instructions: [
            "Buat satu storage bucket baru.",
            "Coba jadikan bucket itu publik sementara, upload satu file test, akses lewat URL publik untuk konfirmasi bisa diakses.",
            'Kembalikan ke private, aktifkan fitur "block public access" (atau setara).',
            "Verifikasi URL yang sama sekarang gagal diakses, dan jalankan public-access checker bawaan platform untuk konfirmasi status aman.",
            "Aktifkan versioning di bucket itu, overwrite file test-mu dengan isi baru, lalu konfirmasi versi lama masih bisa diambil lewat riwayat versi.",
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
          body: "Audit log (CloudTrail di AWS, Cloud Audit Logs di GCP, Azure Monitor/Activity Log di Azure) mencatat setiap aksi API yang terjadi di akunmu - sumber data utama untuk investigasi insiden dan deteksi aktivitas mencurigakan di cloud. Tanpa audit log aktif, kamu tidak akan pernah bisa menjawab pertanyaan dasar forensik: siapa yang melakukan apa, kapan, dan dari mana - audit log HARUS diaktifkan sebelum insiden terjadi, bukan sesudahnya, karena log yang tidak direkam tidak bisa direkonstruksi belakangan.",
        },
        {
          kind: "materi",
          title: "Control plane vs data plane events",
          body: "Audit log umumnya membedakan dua jenis event: control plane (aksi manajemen terhadap resource itu sendiri - membuat/menghapus/mengubah konfigurasi VM, bucket, IAM role) dan data plane (aksi terhadap ISI resource - membaca/menulis object di dalam bucket, query ke database). Banyak platform mengaktifkan logging control plane secara default tapi logging data plane harus diaktifkan manual (dan sering dikenakan biaya tambahan) karena volumenya jauh lebih besar - kalau tujuanmu memantau siapa yang MEMBACA data sensitif di bucket tertentu, itu event data plane yang perlu diaktifkan eksplisit, bukan cuma mengandalkan log default.",
        },
        {
          kind: "materi",
          title: "Dari log pasif ke deteksi aktif",
          body: "Log yang cuma tersimpan tanpa pernah ditinjau sama saja tidak berguna untuk deteksi real-time - provider besar menyediakan layanan deteksi otomatis di atas audit log ini (GuardDuty di AWS, Security Command Center di GCP, Microsoft Defender for Cloud di Azure) yang menganalisis pola mencurigakan (API call dari lokasi tidak biasa, credential yang tiba-tiba dipakai dari IP asing) dan mengirim alert otomatis. Ini konsepnya sama seperti alerting Kibana yang dipelajari di fase ELK - bedanya, engine deteksinya sudah disediakan siap pakai oleh provider, kamu tinggal mengaktifkan dan meninjau hasil alert-nya.",
        },
        {
          kind: "praktik",
          title: "Lacak aksimu sendiri lewat audit log",
          instructions: [
            "Aktifkan layanan audit logging platformmu (kalau belum aktif secara default).",
            "Lakukan 3 aksi berbeda: buat resource, ubah konfigurasi, hapus resource.",
            "Buka audit log, temukan ketiga event itu secara spesifik.",
            "Catat informasi apa saja yang tercatat untuk tiap event (siapa, kapan, aksi apa, dari IP mana).",
            "Identifikasi apakah ketiga event itu tergolong control plane atau data plane, dan jelaskan alasannya.",
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
          body: "Resource cloud yang lupa dimatikan adalah penyebab utama tagihan tak terduga - VM yang terus jalan setelah eksperimen selesai, snapshot/disk yang menumpuk, atau storage bucket yang tidak pernah dibersihkan, semuanya tetap dikenai biaya meski tidak dipakai. Billing alert memberi peringatan dini sebelum biaya membengkak, dan harus jadi kebiasaan standar setiap kali eksperimen di cloud, bukan langkah opsional yang gampang dilewatkan.",
        },
        {
          kind: "materi",
          title: "Alert vs visibilitas real-time",
          body: "Billing/budget alert bersifat REAKTIF - baru memberi tahu setelah ambang batas tersentuh, dengan jeda beberapa jam karena data billing cloud umumnya tidak real-time. Untuk visibilitas yang lebih proaktif, provider menyediakan tool cost analysis (Cost Explorer di AWS, Billing Reports di GCP/Azure) yang memecah pengeluaran per layanan/tag/periode - berguna untuk melihat TREN pengeluaran sebelum menyentuh ambang alert, bukan cuma menunggu notifikasi setelah kejadian.",
        },
        {
          kind: "materi",
          title: "Tagging: tahu resource itu milik siapa dan untuk apa",
          body: "Resource tagging (memberi label key-value seperti `owner:namamu`, `purpose:latihan-roadmap`, `expire:2026-01-01`) memudahkan identifikasi resource mana milik siapa dan untuk tujuan apa, terutama penting di akun yang dipakai banyak orang atau banyak proyek sekaligus. Tanpa tagging, cleanup jadi tebak-tebakan - resource tanpa label yang jelas sering dibiarkan hidup karena tidak ada yang berani menghapus 'kalau-kalau itu penting punya orang lain'.",
        },
        {
          kind: "praktik",
          title: "Pasang billing alert dan bersihkan semua resource",
          instructions: [
            "Set billing alert/budget notification di ambang batas rendah, misal $1.",
            "Buat daftar semua resource yang kamu buat sepanjang modul ini (VM, storage bucket, IAM role, dll), beri tag sederhana kalau platformmu mendukung.",
            "Buka cost analysis/billing report platformmu, lihat resource mana yang paling banyak menyumbang biaya sejauh ini.",
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
          kind: "materi",
          title: "Metodologi access review: siapa, apa, kenapa",
          body: "Access review yang sistematis menjawab tiga pertanyaan untuk tiap permission yang ada: SIAPA yang punya akses ini, APA yang bisa mereka lakukan dengan akses itu, dan KENAPA mereka masih membutuhkannya sekarang. Permission yang tidak bisa dijawab pertanyaan ketiganya dengan jelas (dikasih untuk testing minggu lalu, tidak pernah dipakai lagi) adalah kandidat kuat untuk dicabut - kebanyakan cloud provider punya tool bawaan yang menunjukkan 'akses yang tidak pernah dipakai dalam N hari terakhir' untuk mempermudah proses ini, alih-alih meninjau manual satu-satu.",
        },
        {
          kind: "materi",
          title: "Access review sebagai proses berkelanjutan",
          body: "Least privilege bukan pengaturan sekali-set-lalu-lupa - permission cenderung 'melebar' (privilege creep) seiring waktu karena orang diberi akses tambahan untuk kebutuhan sementara yang tidak pernah dicabut lagi setelah kebutuhan itu selesai. Organisasi yang matang menjadwalkan access review berkala (bulanan/kuartalan), bukan cuma saat ada insiden atau audit compliance - kebiasaan yang sama persis berlaku untuk proyek pribadi seperti roadmap ini: tinjau ulang akses yang kamu buat sendiri secara berkala, bukan cuma di akhir fase ini saja.",
        },
        {
          kind: "praktik",
          title: "Lakukan access review menyeluruh",
          instructions: [
            "Buka kembali IAM role/policy yang kamu buat di Hari 72, cek apakah masih sesuai least privilege atau malah melebar karena testing.",
            "Kalau platformmu punya fitur 'akses yang tidak pernah dipakai', cek fitur itu untuk role/policy-mu.",
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

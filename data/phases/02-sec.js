// Fase 2: Security+
export default {
  id: "sec",
  number: 2,
  title: "Security+",
  dayRange: "Hari 8–14",
  summary:
    "Prinsip keamanan inti yang mendasari semua keputusan security: apa yang dilindungi, dari apa, dan bagaimana meresponsnya kalau gagal.",
  resources: [
    {
      label: "Professor Messer - SY0-701 Playlist",
      url: "https://www.youtube.com/watch?v=KiEptGbnEBc&list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv",
    },
    {
      label: "Pete Zerger - SY0-701 Playlist (alternatif)",
      url: "https://www.youtube.com/watch?v=1E7pI7PB4KI&list=PL7XJSuT7Dq_UDJgYoQGIW9viwM5hc4C7n",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 8",
      title: "Segitiga CIA dan Jenis Kontrol Keamanan",
      steps: [
        {
          kind: "materi",
          title: "CIA Triad: tiga tujuan yang mendasari semua keputusan security",
          body: "Confidentiality (kerahasiaan), Integrity (keutuhan), Availability (ketersediaan) adalah tiga tujuan dasar keamanan informasi - hampir semua keputusan security bisa ditelusuri balik ke salah satu (atau lebih) dari ketiganya. Confidentiality berarti data cuma bisa dilihat pihak yang berwenang (dijaga lewat enkripsi, kontrol akses). Integrity berarti data tidak diubah tanpa izin dan bisa dideteksi kalau berubah (dijaga lewat hashing, checksum, version control). Availability berarti sistem dan data bisa diakses saat dibutuhkan (dijaga lewat redundansi, backup, mitigasi DDoS). Ketiganya sering saling tarik-menarik - enkripsi yang terlalu ketat bisa memperlambat availability, akses yang terlalu longgar demi availability bisa mengorbankan confidentiality.",
        },
        {
          kind: "materi",
          title: "Jenis kontrol: teknis, administratif, fisik",
          body: "Kontrol keamanan (security control) adalah tindakan konkret untuk mendukung CIA, dan dikategorikan berdasarkan bentuknya. Kontrol teknis diterapkan lewat teknologi (firewall, enkripsi, antivirus, MFA). Kontrol administratif berupa kebijakan dan prosedur (security policy, training, proses onboarding/offboarding karyawan). Kontrol fisik membatasi akses secara nyata (kunci pintu, CCTV, badge akses ruang server). Satu organisasi yang matang secara security biasanya memakai ketiga jenis kontrol sekaligus (defense in depth) - kontrol teknis saja tidak cukup kalau prosedurnya lemah, dan sebaliknya.",
        },
        {
          kind: "materi",
          title: "Sifat kontrol: preventif, detektif, korektif",
          body: "Selain bentuknya, kontrol juga dikategorikan berdasarkan KAPAN dia bekerja relatif terhadap suatu insiden. Kontrol preventif mencegah insiden terjadi sama sekali (firewall yang memblokir traffic berbahaya, MFA yang mencegah login tidak sah). Kontrol detektif tidak mencegah, tapi mendeteksi kalau sesuatu terjadi (IDS/IDPS, log monitoring, CCTV yang merekam). Kontrol korektif bekerja SETELAH insiden untuk memulihkan keadaan (backup restore, patch setelah kerentanan ditemukan, incident response plan). Kombinasi dua sumbu ini (bentuk x sifat) sering dipakai untuk memetakan satu kontrol secara lengkap, misal 'firewall = teknis + preventif', 'CCTV = fisik + detektif'.",
        },
        {
          kind: "praktik",
          title: "Klasifikasikan kontrol keamanan di perangkatmu sendiri",
          instructions: [
            "Pilih 3 kontrol keamanan yang sudah kamu pakai, misal: enkripsi disk, screen lock otomatis, backup rutin.",
            "Untuk tiap kontrol, tentukan aspek CIA yang dilindungi (boleh lebih dari satu aspek).",
            "Untuk tiap kontrol, tentukan jenisnya (teknis/administratif/fisik) dan sifatnya (preventif/detektif/korektif).",
            "Identifikasi satu aspek CIA di hidup digitalmu yang PALING LEMAH kontrolnya saat ini, dan jelaskan kenapa.",
          ],
          proof:
            "Tabel 3 baris dengan kolom: kontrol, aspek CIA, jenis, sifat, plus satu kalimat soal aspek CIA yang paling lemah kontrolnya.",
        },
        {
          kind: "kuis",
          question:
            "Singkatan CIA dalam keamanan informasi adalah Confidentiality, Integrity, dan apa?",
          inputType: "text",
          placeholder: "contoh: authentication",
          accepted: ["availability"],
          explanation:
            "Availability berarti data/sistem harus bisa diakses saat dibutuhkan - ini yang diserang lewat serangan DDoS atau ransomware yang mengunci akses.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 9",
      title: "Jenis Serangan dan Kerentanan",
      steps: [
        {
          kind: "materi",
          title: "Malware: kategori berdasarkan cara kerja",
          body: "Malware (malicious software) punya banyak sub-kategori berdasarkan cara kerjanya. Virus menempel ke file/program lain dan butuh aksi user (menjalankan file) untuk aktif dan menyebar. Worm menyebar sendiri lewat jaringan tanpa perlu aksi user. Trojan menyamar sebagai program berguna, tapi membawa payload berbahaya di dalamnya. Ransomware mengenkripsi data korban dan meminta tebusan untuk kunci dekripsinya. Spyware diam-diam mengumpulkan informasi (keystroke, aktivitas browsing) tanpa sepengetahuan korban. Memahami kategori ini penting karena cara deteksi dan mitigasinya berbeda-beda - antivirus signature-based efektif untuk malware yang sudah dikenal, tapi tidak selalu efektif untuk varian baru.",
        },
        {
          kind: "materi",
          title: "Social engineering: menyerang manusia, bukan sistem",
          body: "Social engineering memanipulasi psikologi manusia (urgensi, rasa takut, rasa ingin tahu, otoritas) untuk membuat korban melakukan sesuatu yang merugikan keamanannya sendiri - tidak butuh celah teknis sama sekali. Phishing (lewat email) adalah bentuk paling umum, dengan varian spear phishing (ditargetkan ke individu/organisasi spesifik, lebih personal dan meyakinkan) dan whaling (menargetkan eksekutif tingkat tinggi). Pretexting membangun skenario/cerita palsu untuk mendapat kepercayaan korban (misal menyamar jadi staf IT yang minta password 'untuk keperluan maintenance'). Karena menargetkan manusia, pertahanan paling efektif adalah training dan kebiasaan skeptis, bukan tool teknis semata.",
        },
        {
          kind: "materi",
          title: "Kerentanan teknis: dari software yang belum dipatch",
          body: "Selain serangan yang menargetkan manusia, ada kerentanan teknis murni di software/sistem: bug yang belum di-patch, konfigurasi default yang tidak diubah, atau kelemahan desain. Zero-day adalah kerentanan yang belum diketahui vendor (belum ada patch resmi) - paling berbahaya karena tidak ada pertahanan siap pakai. CVE (Common Vulnerabilities and Exposures) adalah sistem penomoran standar untuk mendaftarkan kerentanan yang sudah diketahui publik, sehingga tim security bisa saling merujuk kerentanan yang sama dengan identifier yang konsisten. Patch management (rutin memperbarui software) adalah pertahanan paling mendasar terhadap kategori serangan ini, meski sering diremehkan karena terasa 'membosankan' dibanding topik security yang lebih 'menarik'.",
        },
        {
          kind: "praktik",
          title: "Analisis satu contoh email phishing",
          instructions: [
            "Cari satu contoh email phishing nyata (folder spam-mu sendiri, atau contoh publik dari phishtank.org).",
            "Identifikasi minimal 5 red flag: domain pengirim mencurigakan, urgensi palsu, link yang tidak cocok dengan teksnya, kesalahan tata bahasa, permintaan info sensitif, dll.",
            "Arahkan kursor ke link di email itu (tanpa mengklik) dan bandingkan URL asli yang muncul dengan teks link yang ditampilkan.",
            "Tentukan email itu termasuk phishing umum atau spear phishing (apakah terasa personal/ditargetkan, atau generik ke banyak orang).",
          ],
          proof:
            "Screenshot email dengan anotasi 5 red flag yang kamu temukan, plus klasifikasi phishing umum vs spear phishing.",
        },
        {
          kind: "kuis",
          question:
            "Serangan social engineering lewat email yang menyamar jadi pihak tepercaya untuk mencuri kredensial disebut apa?",
          inputType: "text",
          placeholder: "contoh: malware",
          accepted: ["phishing"],
          explanation:
            "Phishing menyamar sebagai entitas tepercaya (bank, layanan email, atasan) untuk memancing korban memberi kredensial atau data sensitif.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 10",
      title: "Identity and Access Management (IAM)",
      steps: [
        {
          kind: "materi",
          title: "Autentikasi: membuktikan siapa kamu",
          body: "Autentikasi adalah proses membuktikan identitas, biasanya lewat satu atau lebih 'faktor': sesuatu yang kamu TAHU (password, PIN), sesuatu yang kamu PUNYA (HP untuk terima OTP, hardware token, kartu akses), atau sesuatu yang kamu MILIKI secara biometrik (sidik jari, wajah). Multi-factor authentication (MFA) menggabungkan minimal dua faktor berbeda kategori - password saja (satu faktor) jauh lebih mudah dibobol dibanding password + kode dari authenticator app (dua faktor), karena penyerang harus membobol DUA hal berbeda sekaligus, bukan cuma menebak/mencuri satu password.",
        },
        {
          kind: "materi",
          title: "Otorisasi: menentukan apa yang boleh dilakukan setelah terverifikasi",
          body: "Kalau autentikasi menjawab 'kamu siapa', otorisasi menjawab 'kamu boleh ngapain'. Role-Based Access Control (RBAC) memberi izin berdasarkan peran (role) user, bukan per-individu - misal semua yang berperan 'staf finance' otomatis dapat akses yang sama ke sistem finance, memudahkan pengelolaan saat ada karyawan baru/keluar. Prinsip least privilege menyatakan setiap user/proses hanya diberi akses seminimal mungkin yang benar-benar dibutuhkan untuk tugasnya - bukan 'kasih akses luas dulu, batasi kalau ada masalah', tapi sebaliknya.",
        },
        {
          kind: "materi",
          title: "Kenapa MFA dan least privilege sangat efektif",
          body: "Kedua kontrol ini efektif karena menyerang titik yang sama dari sudut berbeda: mengurangi blast radius kalau ada sesuatu yang gagal. MFA membuat satu password bocor tidak otomatis berarti akun dibobol (penyerang masih butuh faktor kedua). Least privilege membuat satu akun yang berhasil dibobol tidak otomatis membuka akses ke seluruh sistem (penyerang cuma dapat akses seluas peran akun itu). Statistik industri konsisten menunjukkan mayoritas insiden besar melibatkan credential yang bocor DAN akses yang lebih luas dari yang seharusnya - dua kontrol dasar ini menutup kedua celah itu sekaligus, itulah kenapa keduanya selalu masuk rekomendasi security paling dasar di hampir semua framework.",
        },
        {
          kind: "praktik",
          title: "Aktifkan MFA di 2 akun nyata",
          instructions: [
            "Pilih 2 akun pentingmu (email, GitHub, dll) yang belum pakai MFA.",
            "Aktifkan MFA, idealnya pakai authenticator app (TOTP), bukan SMS.",
            "Dokumentasikan metode yang kamu pilih dan satu kelemahan dari metode itu (misal: SMS rentan SIM swap).",
            "Cek pengaturan role/permission di satu akun kerja/organisasi (kalau ada) - apakah kamu punya akses yang sebenarnya tidak kamu perlukan sehari-hari?",
          ],
          proof:
            "Catatan 2 akun yang sudah diaktifkan MFA-nya, metode yang dipakai, analisis kelemahannya, dan hasil cek akses berlebih (kalau ada).",
        },
        {
          kind: "kuis",
          question:
            "Prinsip memberi user hanya akses seminimal mungkin yang benar-benar dibutuhkan untuk tugasnya disebut prinsip apa?",
          inputType: "text",
          placeholder: "contoh: zero trust",
          accepted: ["least privilege", "prinsip least privilege"],
          explanation:
            "Least privilege membatasi blast radius: kalau satu akun dibobol, penyerang cuma dapat akses seluas yang akun itu punya, bukan seluruh sistem.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 11",
      title: "Dasar Kriptografi",
      steps: [
        {
          kind: "materi",
          title: "Enkripsi simetris: satu kunci, cepat, tapi harus dibagi dengan aman",
          body: "Enkripsi simetris memakai SATU kunci yang sama untuk proses enkripsi maupun dekripsi - siapa pun yang punya kunci itu bisa membuka maupun mengunci data. Keunggulannya kecepatan (algoritma seperti AES sangat efisien, cocok untuk mengenkripsi data dalam jumlah besar seperti seluruh isi disk atau traffic jaringan). Kelemahannya: kedua pihak yang berkomunikasi harus punya salinan kunci yang sama, dan mengirim kunci itu dengan aman ke pihak lain (tanpa disadap) adalah masalah tersendiri - masalah inilah yang dipecahkan oleh enkripsi asimetris.",
        },
        {
          kind: "materi",
          title: "Enkripsi asimetris: sepasang kunci, memecahkan masalah distribusi kunci",
          body: "Enkripsi asimetris memakai SEPASANG kunci yang matematis saling berkaitan: kunci publik (boleh disebar ke siapa saja) dan kunci privat (harus dirahasiakan pemiliknya). Data yang dienkripsi dengan kunci publik seseorang hanya bisa didekripsi dengan kunci privat pasangannya - jadi siapa pun bisa mengirim pesan rahasia ke seseorang cukup dengan kunci publiknya, tanpa perlu bertukar kunci rahasia lebih dulu. Asimetris juga jadi dasar tanda tangan digital (data 'ditandatangani' dengan kunci privat, siapa pun bisa memverifikasi keasliannya dengan kunci publik pengirim). Trade-off-nya: jauh lebih lambat dari simetris, sehingga di praktiknya (misal HTTPS) asimetris cuma dipakai di awal untuk menyepakati kunci simetris sementara, lalu sisa komunikasi memakai kunci simetris itu yang jauh lebih cepat.",
        },
        {
          kind: "materi",
          title: "Hashing: sidik jari data satu arah",
          body: "Hashing mengubah data (berapa pun ukurannya) jadi output berukuran tetap (disebut hash atau digest) lewat fungsi yang SATU ARAH - dari hash, mustahil (secara komputasi) mengembalikan data aslinya. Ini beda fundamental dari enkripsi (yang memang dirancang untuk bisa dibalik dengan kunci yang tepat). Hashing dipakai untuk verifikasi integritas (memastikan file tidak berubah - bandingkan hash sebelum/sesudah transfer) dan menyimpan password (sistem yang baik menyimpan HASH password, bukan password aslinya, sehingga kalau database bocor, password asli tidak langsung terbongkar). Sifat 'avalanche effect' - perubahan sekecil apa pun di input menghasilkan hash yang benar-benar berbeda - membuat hashing sangat sensitif untuk deteksi perubahan sekecil apa pun.",
        },
        {
          kind: "praktik",
          title: "Amati avalanche effect pada hashing",
          instructions: [
            "Buat file teks berisi satu kalimat, hitung hash-nya dengan `sha256sum file.txt`.",
            "Ubah satu karakter saja di file itu, hitung ulang hash-nya.",
            "Bandingkan kedua hash karakter demi karakter dan catat berapa banyak yang berubah - jelaskan kenapa ini disebut avalanche effect.",
            "Sebagai bonus, generate keypair GPG dengan `gpg --full-generate-key`, lalu jalankan `gpg --list-keys` untuk melihat kunci publikmu.",
          ],
          proof:
            "Dua hash SHA-256 sebelum/sesudah perubahan satu karakter, dengan catatan perbandingannya dan penjelasan singkat avalanche effect.",
          check: {
            placeholder: "Berapa jumlah karakter heksadesimal output SHA-256?",
            accepted: ["64"],
          },
        },
        {
          kind: "kuis",
          question:
            "Jenis enkripsi yang memakai satu kunci yang sama untuk proses enkripsi maupun dekripsi disebut enkripsi apa?",
          inputType: "text",
          placeholder: "contoh: asimetris",
          accepted: ["simetris", "symmetric"],
          explanation:
            "Enkripsi simetris (contoh: AES) memakai kunci yang sama di kedua sisi - cepat, tapi kunci itu harus dikirim/disepakati dengan aman terlebih dahulu.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 12",
      title: "Arsitektur Keamanan Jaringan",
      steps: [
        {
          kind: "materi",
          title: "Firewall: penyaring traffic berdasarkan rule",
          body: "Firewall menyaring traffic jaringan berdasarkan rule yang mempertimbangkan IP sumber/tujuan, port, dan protokol - traffic yang cocok dengan rule 'allow' diteruskan, yang cocok dengan rule 'deny' (atau tidak cocok rule apa pun, tergantung default policy) diblokir. Firewall generasi lama bekerja di layer network/transport (cuma lihat IP dan port), sementara Next-Generation Firewall (NGFW) modern bisa memeriksa lebih dalam sampai layer aplikasi (misal membedakan traffic HTTPS ke Netflix vs ke situs lain, meski sama-sama port 443). Default policy yang aman adalah 'deny all, allow tertentu' (whitelist) - hanya izinkan yang eksplisit dibutuhkan, bukan sebaliknya.",
        },
        {
          kind: "materi",
          title: "DMZ: mengorbankan satu zona untuk melindungi zona lain",
          body: "DMZ (demilitarized zone) adalah segmen jaringan terpisah yang menampung server yang MEMANG harus bisa diakses dari internet publik (web server, mail server, DNS server publik). Server ini ditempatkan di antara dua firewall (atau satu firewall dengan tiga interface): satu sisi menghadap internet, sisi lain menghadap jaringan internal - sehingga kalau server di DMZ berhasil dibobol dari internet, penyerang TIDAK otomatis punya jalan langsung ke jaringan internal yang berisi data lebih sensitif. Prinsipnya: terima risiko lebih tinggi di satu zona kecil yang memang harus terekspos, demi melindungi zona yang lebih besar dan lebih sensitif.",
        },
        {
          kind: "materi",
          title: "Segmentasi: membatasi seberapa jauh penyerang bisa bergerak",
          body: "Segmentasi jaringan memecah satu jaringan besar jadi beberapa zona lebih kecil (mirip prinsip VLAN yang sudah dibahas di fase Network+), masing-masing dengan kontrol akses sendiri antar-zona. Tujuannya membatasi lateral movement - kalau satu perangkat di satu segmen berhasil dibobol, penyerang tidak otomatis bisa langsung menjangkau semua perangkat lain di jaringan, karena harus melewati kontrol akses tambahan untuk pindah ke segmen lain. Zero Trust Architecture membawa prinsip ini lebih jauh: TIDAK ADA perangkat/user yang otomatis dipercaya hanya karena berada 'di dalam' jaringan internal - setiap request diverifikasi ulang, di mana pun asalnya.",
        },
        {
          kind: "praktik",
          title: "Audit dan uji firewall di komputermu sendiri",
          instructions: [
            "Jalankan `sudo ufw status verbose` (Linux) atau cek Windows Defender Firewall rules.",
            "Daftar semua rule aktif dan jelaskan alasan keberadaan 3 di antaranya.",
            "Tentukan apakah default policy sistemmu 'deny all, allow tertentu' atau sebaliknya - cek dengan `sudo ufw status` bagian default.",
            "Tambahkan satu rule baru yang memblokir satu port test (misal port 8888).",
            "Konfirmasi rule bekerja dengan scan port itu dari perangkat lain di jaringan yang sama (`nmap -p 8888 <ip-mu>`).",
          ],
          proof:
            "Daftar rule firewall, default policy yang terkonfirmasi, rule baru yang ditambahkan, dan hasil nmap yang menunjukkan port itu tertutup.",
        },
        {
          kind: "kuis",
          question:
            "Zona jaringan yang menampung server publik (web server, mail server) terpisah dari jaringan internal disebut apa (singkatan 3 huruf)?",
          inputType: "text",
          placeholder: "contoh: vpn",
          accepted: ["dmz"],
          explanation:
            "DMZ (demilitarized zone) mengisolasi server yang wajib diakses dari internet, sehingga kompromi di server itu tidak otomatis membuka jalan ke jaringan internal.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 13",
      title: "Operasi Keamanan dan Respons Insiden",
      steps: [
        {
          kind: "materi",
          title: "Preparation dan Detection & Analysis: sebelum dan saat insiden ketahuan",
          body: "Siklus incident response NIST dimulai dari Preparation - membangun kesiapan SEBELUM insiden terjadi: punya incident response plan tertulis, tim yang jelas peran-perannya, tool monitoring yang sudah terpasang, dan kontak yang sudah disiapkan (legal, PR, otoritas kalau perlu). Detection & Analysis adalah fase mendeteksi bahwa sesuatu yang tidak normal sedang/sudah terjadi (lewat alert dari SIEM, laporan user, anomali traffic) dan menganalisis seberapa serius, seluas apa, dan apa akar masalahnya - fase ini sering paling menantang karena harus membedakan alert asli dari false positive di tengah banyaknya noise.",
        },
        {
          kind: "materi",
          title: "Containment, Eradication, Recovery: menghentikan pendarahan lalu menyembuhkan",
          body: "Containment menghentikan penyebaran insiden lebih lanjut secepat mungkin - bisa berupa isolasi perangkat yang terinfeksi dari jaringan, mematikan akun yang dibobol, atau memblokir IP penyerang. Kecepatan di fase ini biasanya paling menentukan skala kerusakan akhir. Eradication menghilangkan akar penyebab sepenuhnya (menghapus malware, menutup celah yang dieksploitasi, mengganti kredensial yang bocor) - bukan cuma gejalanya. Recovery mengembalikan sistem ke operasi normal (restore dari backup, monitoring ketat pasca-insiden untuk memastikan tidak ada sisa ancaman) sebelum benar-benar dianggap 'selesai'.",
        },
        {
          kind: "materi",
          title: "Lessons Learned: fase yang paling sering dilewatkan",
          body: "Lessons Learned (kadang disebut post-incident review) adalah fase menganalisis apa yang terjadi setelah semuanya reda: apa yang berjalan baik, apa yang gagal, dan perubahan konkret apa yang perlu dilakukan (di teknologi, proses, maupun training) supaya insiden serupa tidak terulang atau bisa direspons lebih cepat lain kali. Fase ini paling sering dilewatkan dalam praktik nyata karena tim sudah lelah/lega insiden selesai, padahal justru di sinilah organisasi benar-benar belajar - tanpa fase ini, siklus 6 fase itu jadi reaktif terus-menerus tanpa pernah membaik.",
        },
        {
          kind: "praktik",
          title: "Tulis runbook insiden ransomware",
          instructions: [
            'Buat skenario: "laptop kerja terkena ransomware saat karyawan membuka lampiran email".',
            "Tulis satu halaman runbook mengikuti 6 fase NIST, dengan langkah konkret di tiap fase (bukan teori umum).",
            "Untuk fase Containment, tuliskan secara spesifik: langkah pertama apa yang dilakukan dalam 5 menit pertama begitu insiden terdeteksi.",
            "Untuk fase Lessons Learned, tuliskan minimal satu perubahan konkret (teknologi/proses/training) yang akan dilakukan setelah insiden ini.",
          ],
          proof:
            "Dokumen satu halaman berisi runbook 6 fase untuk skenario ransomware tersebut, dengan detail khusus di fase Containment dan Lessons Learned.",
        },
        {
          kind: "kuis",
          question:
            "Ada berapa fase dalam siklus incident response NIST (Preparation sampai Lessons Learned)?",
          inputType: "text",
          placeholder: "contoh: 4",
          accepted: ["6", "enam"],
          explanation:
            "6 fase: Preparation, Detection & Analysis, Containment, Eradication, Recovery, Lessons Learned.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 14",
      title: "Tata Kelola, Risiko, dan Kepatuhan (GRC)",
      steps: [
        {
          kind: "materi",
          title: "Risk = Likelihood x Impact: mengukur, bukan menebak",
          body: "Manajemen risiko dimulai dari mengukur risiko secara sistematis, bukan sekadar merasa 'ini kelihatannya berbahaya'. Likelihood adalah seberapa mungkin suatu ancaman benar-benar terjadi (dari skala rendah sampai tinggi), Impact adalah seberapa besar dampaknya kalau sampai terjadi. Mengalikan keduanya menghasilkan risk score yang bisa dipakai membandingkan dan mengurutkan prioritas mitigasi secara objektif - risiko dengan skor tertinggi dapat perhatian/anggaran lebih dulu, bukan yang paling 'ramai dibicarakan' atau paling gampang dikerjakan.",
        },
        {
          kind: "materi",
          title: "Framework: struktur untuk mengelola risiko secara sistematis",
          body: "NIST Cybersecurity Framework (CSF) mengorganisir aktivitas keamanan ke dalam fungsi inti (Identify, Protect, Detect, Respond, Recover) yang memberi bahasa dan struktur konsisten untuk membangun program keamanan dari nol atau mengevaluasi yang sudah ada. ISO 27001 adalah standar internasional untuk Information Security Management System (ISMS) - organisasi bisa disertifikasi ISO 27001 sebagai bukti formal bahwa proses keamanan mereka memenuhi standar tertentu. Framework ini tidak saling menggantikan; banyak organisasi memakai NIST CSF sebagai panduan operasional sambil mengejar sertifikasi ISO 27001 untuk kebutuhan kepercayaan klien/partner.",
        },
        {
          kind: "materi",
          title: "Regulasi kepatuhan: kewajiban, bukan sekadar rekomendasi",
          body: "Berbeda dari framework (yang sifatnya panduan/best practice), regulasi kepatuhan (compliance) adalah kewajiban hukum/kontraktual yang HARUS dipenuhi organisasi tertentu, dengan konsekuensi nyata (denda, tuntutan hukum, kehilangan kemampuan memproses pembayaran) kalau dilanggar. GDPR (General Data Protection Regulation) mewajibkan perlindungan data pribadi warga Uni Eropa, berlaku bahkan untuk perusahaan di luar Eropa yang memproses data warganya. PCI-DSS (Payment Card Industry Data Security Standard) mewajibkan standar keamanan tertentu bagi organisasi mana pun yang memproses/menyimpan data kartu pembayaran. Memahami perbedaan framework vs regulasi penting: framework kamu PILIH untuk diadopsi, regulasi yang relevan WAJIB dipatuhi terlepas kamu mau atau tidak.",
        },
        {
          kind: "praktik",
          title: "Lakukan mini risk assessment jaringan rumahmu",
          instructions: [
            "Daftar 5 aset di jaringan rumahmu (router, laptop, HP, smart device, NAS, dll).",
            "Untuk tiap aset, pilih satu ancaman relevan dan beri skor likelihood (1-5) dan impact (1-5).",
            "Hitung risk score = likelihood x impact, lalu urutkan dari risiko tertinggi ke terendah.",
            "Untuk aset dengan risk score tertinggi, tuliskan satu mitigasi konkret yang bisa langsung kamu lakukan minggu ini.",
          ],
          proof:
            "Tabel 5 aset dengan kolom ancaman, likelihood, impact, risk score, diurutkan dari tertinggi, plus satu mitigasi konkret untuk risiko teratas.",
          check: {
            placeholder:
              "Kalau likelihood=4 dan impact=5, berapa risk score-nya?",
            accepted: ["20"],
          },
        },
        {
          kind: "kuis",
          question:
            "Framework populer asal Amerika Serikat untuk mengelola risiko keamanan siber, disingkat 3 huruf, apa namanya?",
          inputType: "text",
          placeholder: "contoh: iso",
          accepted: ["nist"],
          explanation:
            "NIST (National Institute of Standards and Technology) menerbitkan NIST CSF (Cybersecurity Framework) yang jadi rujukan umum, di samping ISO 27001 yang bersifat internasional.",
        },
      ],
    },
  ],
};

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
          title: "Tiga tujuan yang mendasari semua keputusan security",
          body: "Confidentiality, Integrity, Availability (CIA) adalah tiga tujuan dasar keamanan informasi. Setiap kontrol keamanan (teknis, administratif, fisik) dirancang untuk mendukung satu atau lebih dari ketiganya, dan bisa bersifat preventif (mencegah), detektif (mendeteksi), atau korektif (memperbaiki setelah kejadian).",
        },
        {
          kind: "praktik",
          title: "Klasifikasikan kontrol keamanan di perangkatmu sendiri",
          instructions: [
            "Pilih 3 kontrol keamanan yang sudah kamu pakai, misal: enkripsi disk, screen lock otomatis, backup rutin.",
            "Untuk tiap kontrol, tentukan: aspek CIA yang dilindungi, jenis kontrolnya (teknis/administratif/fisik), dan sifatnya (preventif/detektif/korektif).",
          ],
          proof:
            "Tabel 3 baris dengan kolom: kontrol, aspek CIA, jenis, sifat.",
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
          title: "Manusia sering jadi celah termudah",
          body: "Serangan umum meliputi malware (virus, ransomware, trojan), social engineering (phishing, pretexting), dan eksploitasi kerentanan teknis. Phishing tetap jadi vektor awal paling umum karena menargetkan manusia lewat manipulasi psikologis (urgensi, rasa takut, rasa ingin tahu), bukan celah teknis pada sistem.",
        },
        {
          kind: "praktik",
          title: "Analisis satu contoh email phishing",
          instructions: [
            "Cari satu contoh email phishing nyata (folder spam-mu sendiri, atau contoh publik dari phishtank.org).",
            "Identifikasi minimal 5 red flag: domain pengirim mencurigakan, urgensi palsu, link yang tidak cocok dengan teksnya, kesalahan tata bahasa, permintaan info sensitif, dll.",
          ],
          proof:
            "Screenshot email dengan anotasi 5 red flag yang kamu temukan.",
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
          title:
            "Membuktikan siapa kamu, lalu membatasi apa yang boleh kamu lakukan",
          body: "Autentikasi membuktikan identitas (sesuatu yang kamu tahu/punya/miliki), otorisasi menentukan apa yang boleh diakses setelah identitas terverifikasi. Multi-factor authentication (MFA) dan prinsip least privilege - memberi akses seminimal mungkin yang dibutuhkan untuk suatu peran - adalah dua kontrol IAM paling efektif untuk mengurangi risiko akun yang dibobol.",
        },
        {
          kind: "praktik",
          title: "Aktifkan MFA di 2 akun nyata",
          instructions: [
            "Pilih 2 akun pentingmu (email, GitHub, dll) yang belum pakai MFA.",
            "Aktifkan MFA, idealnya pakai authenticator app (TOTP), bukan SMS.",
            "Dokumentasikan metode yang kamu pilih dan satu kelemahan dari metode itu (misal: SMS rentan SIM swap).",
          ],
          proof:
            "Catatan 2 akun yang sudah diaktifkan MFA-nya, metode yang dipakai, dan analisis kelemahannya.",
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
          title: "Dua kunci, satu arah, dan sidik jari data",
          body: "Enkripsi simetris pakai satu kunci yang sama untuk enkripsi dan dekripsi (cepat, cocok untuk data besar); asimetris pakai pasangan kunci publik-privat (dipakai untuk pertukaran kunci dan tanda tangan digital, lebih lambat tapi tidak perlu berbagi kunci rahasia). Hashing bersifat satu arah (tidak bisa dibalik) dan dipakai untuk verifikasi integritas, bukan untuk menyembunyikan isi data.",
        },
        {
          kind: "praktik",
          title: "Amati avalanche effect pada hashing",
          instructions: [
            "Buat file teks berisi satu kalimat, hitung hash-nya dengan `sha256sum file.txt`.",
            "Ubah satu karakter saja di file itu, hitung ulang hash-nya.",
            "Bandingkan kedua hash dan catat berapa banyak yang berubah.",
            "Sebagai bonus, generate keypair GPG dengan `gpg --full-generate-key`.",
          ],
          proof:
            "Dua hash SHA-256 sebelum/sesudah perubahan satu karakter, dengan catatan perbandingannya.",
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
          title: "Menyaring, memisahkan, membatasi pergerakan",
          body: "Firewall menyaring traffic berdasarkan rule (IP, port, protokol). DMZ (demilitarized zone) menempatkan server yang harus diakses publik terpisah dari jaringan internal, supaya kalau server itu dibobol, penyerang tidak langsung dapat akses ke jaringan internal. Segmentasi jaringan membatasi seberapa jauh penyerang bisa bergerak (lateral movement) kalau satu bagian jaringan berhasil dibobol.",
        },
        {
          kind: "praktik",
          title: "Audit dan uji firewall di komputermu sendiri",
          instructions: [
            "Jalankan `sudo ufw status verbose` (Linux) atau cek Windows Defender Firewall rules.",
            "Daftar semua rule aktif dan jelaskan alasan keberadaan 3 di antaranya.",
            "Tambahkan satu rule baru yang memblokir satu port test (misal port 8888).",
            "Konfirmasi rule bekerja dengan scan port itu dari perangkat lain di jaringan yang sama (`nmap -p 8888 <ip-mu>`).",
          ],
          proof:
            "Daftar rule firewall, rule baru yang ditambahkan, dan hasil nmap yang menunjukkan port itu tertutup.",
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
          title: "Enam fase saat semuanya sudah terlanjur terjadi",
          body: "Siklus respons insiden NIST punya 6 fase: Preparation, Detection & Analysis, Containment, Eradication, Recovery, dan Lessons Learned. Tim SOC bertugas mendeteksi dan merespons di fase-fase ini secara real-time - kecepatan containment sering jadi faktor yang paling menentukan seberapa besar kerusakan akhir suatu insiden.",
        },
        {
          kind: "praktik",
          title: "Tulis runbook insiden ransomware",
          instructions: [
            'Buat skenario: "laptop kerja terkena ransomware saat karyawan membuka lampiran email".',
            "Tulis satu halaman runbook mengikuti 6 fase NIST, dengan langkah konkret di tiap fase (bukan teori umum).",
          ],
          proof:
            "Dokumen satu halaman berisi runbook 6 fase untuk skenario ransomware tersebut.",
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
          title: "Mengukur risiko sebelum ia jadi insiden",
          body: "Risiko dihitung sebagai kombinasi likelihood (kemungkinan terjadi) dan impact (dampak jika terjadi). Framework seperti NIST CSF dan ISO 27001 memberi struktur untuk mengelola risiko secara sistematis, sementara regulasi seperti GDPR dan PCI-DSS menetapkan kewajiban kepatuhan yang harus dipenuhi organisasi tertentu.",
        },
        {
          kind: "praktik",
          title: "Lakukan mini risk assessment jaringan rumahmu",
          instructions: [
            "Daftar 5 aset di jaringan rumahmu (router, laptop, HP, smart device, NAS, dll).",
            "Untuk tiap aset, pilih satu ancaman relevan dan beri skor likelihood (1-5) dan impact (1-5).",
            "Hitung risk score = likelihood x impact, lalu urutkan dari risiko tertinggi ke terendah.",
          ],
          proof:
            "Tabel 5 aset dengan kolom ancaman, likelihood, impact, risk score, diurutkan dari tertinggi.",
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

// Fase 5: Traffic Analysis
export default {
  id: "traffic",
  number: 5,
  title: "Traffic Analysis",
  dayRange: "Hari 43–56",
  summary:
    "Membaca traffic jaringan mentah adalah skill inti analis SOC: dari packet capture dasar sampai menulis rule IDS sendiri.",
  resources: [
    {
      label: "Wireshark University",
      url: "https://www.wireshark.org/#educationalContent",
    },
    {
      label: "TCPdump Tutorial - Daniel Miessler",
      url: "https://danielmiessler.com/study/tcpdump/",
    },
    {
      label: "Suricata Quickstart",
      url: "https://docs.suricata.io/en/latest/quickstart.html",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 43",
      title: "Dasar Packet Capture",
      steps: [
        {
          kind: "materi",
          title: "Merekam traffic mentah jadi file yang bisa dianalisis",
          body: "Packet capture merekam seluruh traffic yang lewat satu network interface dalam format `.pcap` (atau `.pcapng`, versi lebih baru dengan metadata tambahan) - setiap byte header dan payload paket disimpan apa adanya, bukan cuma ringkasan. Wireshark adalah tool GUI standar untuk membaca dan menganalisis file ini secara visual, sementara `tshark` (versi command-line Wireshark) dan `tcpdump` bisa melakukan capture tanpa GUI sama sekali - berguna saat kamu perlu capture di server jarak jauh lewat SSH.",
        },
        {
          kind: "materi",
          title: "Satu format, banyak tool kompatibel",
          body: "Karena `.pcap` adalah format standar terbuka, hampir semua tool traffic analysis lain (tcpdump, tshark, Suricata, Zeek yang akan dipelajari di hari-hari berikutnya) bisa membaca file yang sama persis - artinya kamu bisa capture sekali di satu tempat, lalu menganalisisnya dengan tool berbeda-beda sesuai kebutuhan tanpa perlu re-capture. Ini juga alasan kenapa pcap sample dari insiden nyata bisa dibagikan publik untuk latihan (akan dipakai di Hari 51 dan 56) - filenya portable lintas tool dan lintas orang.",
        },
        {
          kind: "praktik",
          title: "Rekam dan simpan capture pertamamu",
          instructions: [
            "Install Wireshark (atau tshark untuk versi CLI) kalau belum ada.",
            "Buka Wireshark, pilih network interface yang aktif (biasanya yang ada traffic-nya kalau kamu lihat grafik kecil di sampingnya).",
            "Mulai capture, buka satu website di browser selama capture berjalan, biarkan berjalan sekitar 2 menit.",
            "Hentikan capture, simpan hasilnya sebagai `first-capture.pcap` lewat File > Save As.",
            "Buka menu Statistics > Protocol Hierarchy, catat protokol apa saja yang muncul beserta persentase paketnya.",
            "Hitung total paket yang tertangkap (lihat di status bar bawah Wireshark).",
          ],
          proof:
            "File first-capture.pcap dan ringkasan jumlah paket per protokol dari Protocol Hierarchy.",
        },
        {
          kind: "kuis",
          question:
            "Ekstensi file apa yang dipakai untuk menyimpan hasil packet capture?",
          inputType: "text",
          placeholder: "contoh: .log",
          accepted: ["pcap", ".pcap"],
          explanation:
            "Format .pcap (atau .pcapng) dibaca hampir semua tool network analysis - Wireshark, tcpdump, Suricata, Zeek - jadi satu file bisa dipakai lintas tool.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 44",
      title: "ARP dan Analisis Layer 2",
      steps: [
        {
          kind: "materi",
          title: "ARP: mencocokkan IP dengan MAC address",
          body: 'ARP (Address Resolution Protocol) menerjemahkan alamat IP jadi MAC address di jaringan lokal lewat mekanisme sederhana: perangkat yang butuh MAC address suatu IP mengirim ARP Request broadcast ("siapa yang punya IP ini?") ke semua perangkat di jaringan, dan perangkat pemilik IP itu membalas lewat ARP Reply unicast berisi MAC address-nya. Hasil pencocokan ini disimpan sementara di ARP cache/table lokal supaya tidak perlu broadcast ulang untuk tiap paket.',
        },
        {
          kind: "materi",
          title: "Kenapa layer ini jadi titik rawan serangan",
          body: "Banyak serangan man-in-the-middle (ARP poisoning/spoofing) dimulai persis di layer ini, SEBELUM traffic sempat naik ke layer yang mungkin sudah terenkripsi (TLS) - penyerang mengirim ARP Reply palsu yang mengklaim dirinya pemilik IP gateway, sehingga korban mengirim traffic lewat mesin penyerang dulu tanpa sadar. ARP sendiri tidak punya mekanisme otentikasi bawaan - siapa pun di jaringan yang sama bisa mengirim ARP Reply untuk IP mana pun, itulah kelemahan fundamentalnya. Analis traffic perlu bisa mengenali pola ARP normal (satu IP konsisten dijawab satu MAC yang sama) supaya bisa mendeteksi anomali seperti satu IP tiba-tiba dijawab MAC berbeda-beda dalam waktu singkat.",
        },
        {
          kind: "praktik",
          title: "Capture dan verifikasi ARP di jaringanmu",
          instructions: [
            "Mulai capture baru di Wireshark, terapkan filter `arp`.",
            "Di terminal, hapus ARP cache lokal (`sudo ip neigh flush all` di Linux) lalu `ping <ip gateway>` sekali untuk memicu ARP request baru.",
            "Kembali ke Wireshark, identifikasi pasangan ARP Request ('Who has X? Tell Y') dan ARP Reply untuk gateway-mu di capture.",
            "Klik paket ARP Reply-nya, expand detail paket, catat MAC address yang dikembalikan.",
            "Jalankan `arp -n` (Linux) atau `arp -a` (Windows) di terminal, bandingkan MAC address gateway di tabel ARP lokal dengan yang kamu catat dari Wireshark - keduanya harus identik.",
          ],
          proof:
            "MAC address gateway dari capture Wireshark cocok dengan hasil `arp -n`/`arp -a`.",
        },
        {
          kind: "kuis",
          question:
            "Protokol apa yang menerjemahkan alamat IP jadi MAC address di jaringan lokal?",
          inputType: "text",
          placeholder: "contoh: DHCP",
          accepted: ["arp", "address resolution protocol"],
          explanation:
            'ARP memetakan IP ke MAC lewat broadcast request ("siapa yang punya IP ini?") dan unicast reply dari pemilik IP tersebut.',
        },
      ],
    },
    {
      index: 3,
      label: "Hari 45",
      title: "Filter Wireshark: Capture vs Display",
      steps: [
        {
          kind: "materi",
          title: "Capture filter: menyaring sebelum paket direkam",
          body: "Capture filter memakai sintaks BPF (Berkeley Packet Filter) dan diterapkan SEBELUM proses perekaman dimulai - paket yang tidak lolos filter ini tidak pernah masuk ke file capture sama sekali, hilang selamanya. Ini berguna untuk membatasi ukuran file di lingkungan dengan traffic sangat besar, tapi berisiko: kalau filter-nya salah, kamu baru sadar ada data penting yang terlewat setelah capture selesai, dan itu tidak bisa dipulihkan tanpa capture ulang.",
        },
        {
          kind: "materi",
          title: "Display filter: menyaring dari data yang sudah ada",
          body: "Display filter memakai sintaks sendiri milik Wireshark (berbeda dari BPF) dan diterapkan ke paket yang SUDAH direkam - filter ini cuma mengontrol apa yang ditampilkan di layar, semua paket tetap ada di file capture. Karena itu, display filter jauh lebih sering dipakai sehari-hari: bisa diubah-ubah kapan saja untuk melihat sudut pandang berbeda dari capture yang sama, tanpa risiko kehilangan data dan tanpa perlu capture ulang.",
        },
        {
          kind: "praktik",
          title: "Terapkan 5 display filter berbeda",
          instructions: [
            "Buka `first-capture.pcap` dari Hari 43 di Wireshark.",
            "Terapkan filter `http` di kolom display filter, catat jumlah paket yang tersisa (angka ini muncul di status bar bawah).",
            "Ganti filter ke `dns`, catat jumlahnya.",
            "Ganti filter ke `tcp.port==443`, catat jumlahnya.",
            "Pilih satu IP tujuan yang sering muncul dari capture-mu, terapkan `ip.addr==<IP itu>`, catat jumlahnya.",
            "Terapkan `tcp.flags.syn==1` (semua paket yang mengandung flag SYN, termasuk SYN-ACK), catat jumlahnya.",
          ],
          proof: "Tabel 5 filter dengan jumlah paket hasil masing-masing.",
        },
        {
          kind: "kuis",
          question:
            "Tulis display filter Wireshark untuk menampilkan hanya paket TCP menuju port 443.",
          inputType: "text",
          placeholder: "contoh: dns",
          accepted: ["tcp.port==443", "tcp.port == 443"],
          explanation:
            "`tcp.port==443` mencocokkan paket TCP di mana port sumber ATAU tujuan adalah 443 (HTTPS).",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 46",
      title: "Analisis TCP Three-Way Handshake",
      steps: [
        {
          kind: "materi",
          title: "Tiga paket, ditandai lewat flags",
          body: "Handshake TCP yang sudah dipelajari secara konsep di fase Network+ sekarang dilihat langsung di level paket: paket pertama SYN (flag SYN=1), dibalas SYN-ACK (flag SYN=1 dan ACK=1 sekaligus), ditutup dengan ACK (flag ACK=1 saja). Wireshark menampilkan flag-flag ini secara eksplisit di kolom Info tiap paket, jadi tidak perlu menghafal - tinggal expand bagian TCP header di detail paket untuk melihat flag mana yang aktif.",
        },
        {
          kind: "materi",
          title: "SEQ/ACK: benang yang menghubungkan tiap paket",
          body: 'Setiap paket TCP membawa nomor Sequence (SEQ, posisi byte pertama yang dikirim paket ini) dan Acknowledgment (ACK, konfirmasi "saya sudah terima sampai byte nomor ini"). Aturan pentingnya: ACK yang dikirim balik selalu SEQ lawan bicara + 1 (dianggap sebagai konfirmasi 1 byte SYN meski SYN sendiri tidak membawa data). Memahami hubungan SEQ/ACK normal ini adalah dasar untuk mengenali anomali seperti SYN flood, di mana penyerang mengirim banyak SYN dari IP acak/palsu tanpa pernah membalas SYN-ACK-nya dengan ACK, membuat server menumpuk banyak koneksi setengah-terbuka (half-open) yang menghabiskan resource.',
        },
        {
          kind: "praktik",
          title: "Verifikasi hubungan SEQ/ACK di satu handshake nyata",
          instructions: [
            "Di `first-capture.pcap`, terapkan filter `tcp.flags.syn==1` untuk melihat semua paket SYN dan SYN-ACK.",
            "Pilih satu koneksi (perhatikan pasangan source-destination IP:port yang sama), lalu hapus filter sementara dan cari 3 paket pertamanya secara berurutan (SYN, SYN-ACK, ACK).",
            "Klik tiap paket, expand bagian TCP di panel detail, catat nomor Sequence number dan Acknowledgment number di ketiganya.",
            "Bandingkan: Acknowledgment number di paket SYN-ACK harus sama dengan Sequence number paket SYN + 1.",
            "Jelaskan dengan kata-katamu sendiri kenapa Acknowledgment number di paket ACK ketiga = Sequence number SYN-ACK + 1.",
          ],
          proof:
            "Screenshot 3 paket handshake dengan anotasi SEQ/ACK dan penjelasan hubungannya.",
        },
        {
          kind: "kuis",
          question:
            "Kalau nomor SEQ di paket SYN-ACK adalah 5000, berapa nilai ACK di paket ketiga (ACK) handshake?",
          inputType: "text",
          placeholder: "contoh: 5000",
          accepted: ["5001"],
          explanation:
            'ACK paket ketiga selalu SEQ lawan + 1, sebagai konfirmasi "saya terima byte sampai nomor itu, siap lanjut dari nomor berikutnya".',
        },
      ],
    },
    {
      index: 5,
      label: "Hari 47",
      title: "Analisis TLS Handshake",
      steps: [
        {
          kind: "materi",
          title: "Apa yang dinegosiasikan sebelum data terenkripsi",
          body: "TLS handshake terdiri dari beberapa tahap yang terlihat sebagai paket terpisah di Wireshark: ClientHello (client mengusulkan cipher suite yang didukung dan versi TLS), ServerHello (server memilih satu cipher suite dari daftar itu), Certificate (server mengirim sertifikatnya untuk diverifikasi client), lalu pertukaran kunci sebelum kedua pihak akhirnya bisa saling mengenkripsi data. Semua ini terjadi SEBELUM satu byte data aplikasi (misal isi halaman web) dikirim.",
        },
        {
          kind: "materi",
          title: "Metadata yang tetap terbaca, dan yang sudah aman",
          body: "Wireshark bisa membaca metadata handshake ini apa adanya karena memang belum dienkripsi - termasuk SNI (Server Name Indication, domain yang diminta client, dikirim di ClientHello supaya server tahu sertifikat mana yang harus dipakai) dan isi sertifikat server (nama domain, penerbit, masa berlaku). Ini kenapa pengamat jaringan (termasuk ISP atau penyerang di jaringan yang sama) masih bisa tahu domain APA yang kamu akses meski via HTTPS, walau tidak bisa membaca ISI halaman yang diakses. Payload aplikasi setelah handshake selesai baru benar-benar terenkripsi tanpa kunci sesi yang benar.",
        },
        {
          kind: "praktik",
          title: "Baca metadata TLS, buktikan payload-nya terenkripsi",
          instructions: [
            "Mulai capture baru, buka `https://example.com` di browser, hentikan capture setelah halaman selesai load.",
            "Terapkan filter `tls.handshake.type==1` untuk menemukan paket ClientHello, expand field Extensions > server_name, catat SNI-nya.",
            "Ganti filter ke `tls.handshake.type==2` untuk ServerHello, expand detailnya, catat cipher suite yang dipilih server.",
            'Cari paket data APLIKASI setelah handshake selesai (biasanya berlabel "Application Data"), klik kanan, pilih "Follow > TLS Stream".',
            "Konfirmasi isi stream itu tampil sebagai byte/teks acak yang tidak terbaca, bukan HTML/teks HTTP biasa.",
          ],
          proof:
            "SNI dari ClientHello cocok dengan domain yang kamu buka, dan follow TLS stream menunjukkan data acak/tidak terbaca, bukan HTTP plaintext.",
        },
        {
          kind: "kuis",
          question:
            "Field apa di ClientHello TLS yang menunjukkan domain yang diminta, meski koneksinya akan terenkripsi?",
          inputType: "text",
          placeholder: "contoh: cipher suite",
          accepted: ["sni", "server name indication"],
          explanation:
            "SNI dikirim plaintext di ClientHello supaya server tahu sertifikat/domain mana yang harus dipakai sebelum handshake selesai - makanya masih bisa dibaca meski isi datanya nanti terenkripsi.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 48",
      title: "Analisis HTTP dan DNS",
      steps: [
        {
          kind: "materi",
          title: "Follow TCP Stream: merekonstruksi percakapan penuh",
          body: 'Fitur "Follow > TCP Stream" di Wireshark mengumpulkan semua paket yang membentuk satu koneksi TCP dan menyusunnya kembali jadi teks yang mudah dibaca secara berurutan - untuk HTTP plaintext, ini berarti kamu bisa membaca persis request lengkap (method, path, header, body kalau ada) dan response lengkap (status code, header, body) tanpa harus lompat-lompat antar paket individual.',
        },
        {
          kind: "materi",
          title: "Transaction ID: mencocokkan query dan response DNS",
          body: "Setiap query DNS membawa Transaction ID (angka acak 16-bit), dan response-nya harus membawa Transaction ID yang SAMA PERSIS supaya resolver tahu response mana menjawab query yang mana - penting terutama kalau ada banyak query berlangsung nyaris bersamaan. Kemampuan mencocokkan pasangan query-response ini penting saat menelusuri traffic mencurigakan: misal untuk melihat domain command-and-control apa yang di-resolve jadi IP apa oleh malware di jaringan.",
        },
        {
          kind: "praktik",
          title: "Rekonstruksi satu request HTTP dan satu query DNS",
          instructions: [
            "Terapkan filter `http.request` di capture-mu untuk menemukan paket request HTTP.",
            'Klik kanan salah satu paket request, pilih "Follow > TCP Stream".',
            "Dari hasil rekonstruksi, catat method (GET/POST), path, header Host dari request, dan status code dari response.",
            "Tutup jendela stream, ganti filter ke `dns` secara terpisah.",
            "Temukan satu query DNS dan response pasangannya (cocokkan lewat field Transaction ID yang identik di keduanya).",
            "Catat domain yang di-query dan IP address yang dikembalikan di response-nya.",
          ],
          proof:
            "Isi TCP stream HTTP yang direkonstruksi, dan pasangan query/response DNS beserta IP hasilnya.",
        },
        {
          kind: "kuis",
          question:
            "Field apa di paket DNS yang dipakai untuk mencocokkan query dengan response-nya?",
          inputType: "text",
          placeholder: "contoh: TTL",
          accepted: ["transaction id", "id transaksi", "txid"],
          explanation:
            "Transaction ID sama antara query dan response-nya, sehingga resolver tahu response mana menjawab query yang mana - penting kalau ada banyak query berlangsung bersamaan.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 49",
      title: "Protokol Cleartext dan Kredensial Bocor",
      steps: [
        {
          kind: "materi",
          title: "Protokol lama yang tidak pernah dirancang untuk dienkripsi",
          body: "Banyak protokol lama - FTP, Telnet, HTTP dengan Basic Authentication - dirancang di era ketika penyadapan jaringan belum jadi ancaman umum, sehingga mengirim kredensial (username, password) dalam bentuk PLAINTEXT langsung di payload paket, tanpa enkripsi sama sekali. Siapa pun yang bisa menyadap traffic di jalur yang sama (misal di jaringan Wi-Fi publik yang sama, atau lewat ARP poisoning dari Hari 44) bisa membaca kredensial itu langsung dari isi paket, tanpa perlu 'membobol' apa pun.",
        },
        {
          kind: "materi",
          title: "Kenapa versi terenkripsi menggantikannya",
          body: "Ini alasan utama protokol-protokol itu digantikan versi terenkripsi di lingkungan produksi modern: SSH menggantikan Telnet, HTTPS menggantikan HTTP polos untuk apa pun yang melibatkan data sensitif, dan SFTP/FTPS menggantikan FTP polos untuk transfer file. Prinsipnya sama di semua kasus: bungkus protokol lama dalam lapisan enkripsi (TLS/SSH) sebelum data - termasuk kredensial - dikirim lewat jaringan, sehingga penyadap cuma melihat data acak, bukan kredensial asli.",
        },
        {
          kind: "praktik",
          title: "Buktikan kredensial FTP terbaca plaintext",
          instructions: [
            "Siapkan server FTP test lokal (misal `python3 -m pyftpdlib` atau image `vsftpd` di container/VM) dengan satu akun test yang kamu buat sendiri.",
            "Mulai capture di Wireshark, lalu login ke server FTP test itu dari client (command-line `ftp` atau FileZilla) dengan akun test itu.",
            "Hentikan capture, terapkan filter `ftp`.",
            "Cari paket yang berisi perintah `USER` (mengirim username) dan `PASS` (mengirim password).",
            "Klik tiap paket itu, konfirmasi username dan password terlihat jelas dalam bentuk plaintext di bagian payload/detail paket.",
          ],
          proof:
            "Screenshot paket FTP yang menunjukkan perintah USER dan PASS dengan kredensial terbaca jelas.",
        },
        {
          kind: "kuis",
          question:
            "Sebutkan satu protokol pengganti FTP yang mengenkripsi kredensial dan datanya.",
          inputType: "text",
          placeholder: "contoh: HTTP",
          accepted: ["sftp", "ftps"],
          explanation:
            "SFTP (transfer file lewat SSH) dan FTPS (FTP dibungkus TLS) sama-sama mengenkripsi kredensial dan data transfer, tidak seperti FTP polos.",
        },
      ],
    },
    {
      index: 8,
      label: "Hari 50",
      title: "TCPdump di Command Line",
      steps: [
        {
          kind: "materi",
          title: "Capture tanpa GUI, sintaks yang sama dengan Wireshark",
          body: "`tcpdump` adalah tool capture command-line yang memakai sintaks BPF (Berkeley Packet Filter) yang SAMA dengan capture filter di Wireshark - jadi filter yang kamu pelajari (`port 53`, `host 10.0.0.1`, dst) langsung bisa dipakai di kedua tool. Kemampuan capture dari terminal ini penting karena banyak server produksi tidak punya lingkungan desktop/GUI sama sekali - alur kerja umumnya: capture di server lewat SSH dengan tcpdump, simpan ke file, lalu pindahkan file itu ke komputer lokal untuk dianalisis lebih detail di Wireshark.",
        },
        {
          kind: "materi",
          title: "Flag-flag penting tcpdump",
          body: '`-i <interface>` memilih interface mana yang di-capture (`any` untuk semua interface sekaligus), `-w <file>` menulis hasil capture mentah ke file `.pcap` (tanpa `-w`, tcpdump cuma menampilkan ringkasan paket di terminal, tidak disimpan), dan filter BPF ditulis di akhir command tanpa flag khusus, misal `port 53` untuk traffic DNS. Kombinasi paling umum: `tcpdump -i <interface> <filter> -w output.pcap`.',
        },
        {
          kind: "praktik",
          title: "Capture traffic DNS dengan tcpdump",
          instructions: [
            "Jalankan `sudo tcpdump -i any port 53 -w dns-capture.pcap` di terminal.",
            "Sambil capture berjalan, buka beberapa website berbeda di browser selama sekitar 60 detik supaya ada traffic DNS.",
            "Hentikan capture dengan Ctrl+C, catat jumlah paket yang dilaporkan tcpdump di terminal saat berhenti.",
            "Buka `dns-capture.pcap` di Wireshark, konfirmasi isinya HANYA traffic DNS (protokol lain harus tidak ada karena sudah difilter di level capture).",
            "Bandingkan jumlah paket yang dicatat tcpdump di terminal dengan jumlah total paket yang ditampilkan Wireshark - keduanya harus sama.",
          ],
          proof:
            "File dns-capture.pcap dan konfirmasi jumlah paket cocok antara output tcpdump dan Wireshark.",
        },
        {
          kind: "kuis",
          question:
            "Flag tcpdump apa yang dipakai untuk menyimpan hasil capture ke file .pcap?",
          inputType: "text",
          placeholder: "contoh: -i",
          accepted: ["-w"],
          explanation:
            "`-w <file>` menulis paket mentah ke file pcap; `-i` justru dipakai untuk memilih interface capture.",
        },
      ],
    },
    {
      index: 9,
      label: "Hari 51",
      title: "Mendeteksi Traffic Mencurigakan",
      steps: [
        {
          kind: "materi",
          title: "Empat pola yang layak dicurigai",
          body: "Beberapa indikator traffic mencurigakan yang paling umum: (1) banyak koneksi ke port berbeda-beda dalam waktu singkat dari satu sumber - ciri khas port scan; (2) traffic menuju protokol/port yang tidak umum untuk konteksnya (misal koneksi keluar ke port acak dari server yang seharusnya cuma melayani web); (3) koneksi berulang ke satu IP/domain yang sama dalam interval waktu yang nyaris tetap - pola beaconing malware melapor ke server command-and-control; (4) kredensial dalam bentuk plaintext (dari Hari 49) yang seharusnya sudah terenkripsi.",
        },
        {
          kind: "materi",
          title: "Belajar dari pcap insiden nyata, bukan simulasi buatan sendiri",
          body: "Pcap sample publik dari insiden nyata (situs seperti malware-traffic-analysis.net mengumpulkan banyak studi kasus lengkap dengan konteksnya) adalah cara terbaik berlatih mengenali pola-pola di atas tanpa perlu benar-benar jadi korban - traffic malware sungguhan biasanya punya karakteristik yang tidak selalu muncul di traffic buatan sendiri untuk latihan (user-agent aneh, domain yang baru terdaftar, pola beaconing yang halus).",
        },
        {
          kind: "praktik",
          title: "Identifikasi indikator di pcap mencurigakan nyata",
          instructions: [
            "Unduh satu pcap sample dari malware-traffic-analysis.net (pilih salah satu studi kasus, biasanya ada deskripsi singkat di halamannya).",
            "Buka pcap itu di Wireshark, buka menu Statistics > Conversations, urutkan berdasarkan jumlah paket/durasi untuk melihat koneksi mana yang paling menonjol.",
            "Perhatikan pola waktu antar-koneksi ke IP yang sama (kalau intervalnya nyaris identik berulang kali, itu indikasi beaconing).",
            "Terapkan filter `http.request` dan periksa kolom User-Agent, cari yang terlihat tidak wajar (terlalu pendek, aneh, atau tidak seperti browser normal).",
            "Identifikasi minimal 2 indikator mencurigakan dan tulis penjelasan singkat kenapa masing-masing dianggap mencurigakan.",
          ],
          proof:
            "Nama pcap yang dianalisis dan deskripsi 2 indikator mencurigakan yang ditemukan beserta bukti screenshot-nya.",
        },
        {
          kind: "kuis",
          question:
            "Istilah untuk pola traffic berupa koneksi berulang ke satu IP/domain command-and-control dalam interval waktu tetap disebut apa?",
          inputType: "text",
          placeholder: "contoh: flooding",
          accepted: ["beacon", "beaconing"],
          explanation:
            'Beaconing adalah pola malware "lapor diri" ke server C2 secara periodik - makin teratur intervalnya, makin mencurigakan dibanding traffic manusia biasa.',
        },
      ],
    },
    {
      index: 10,
      label: "Hari 52",
      title: "Pengantar Suricata IDS/IPS",
      steps: [
        {
          kind: "materi",
          title: "Signature-based detection",
          body: "Suricata adalah engine IDS (Intrusion Detection System) / IPS (Intrusion Prevention System) open-source yang bekerja dengan mencocokkan traffic yang lewat terhadap ribuan rule signature - tiap rule mendeskripsikan pola spesifik dari serangan/aktivitas yang sudah diketahui (misal payload SQL injection tertentu, user-agent malware tertentu). Kalau traffic cocok dengan satu rule, Suricata menghasilkan alert (mode IDS, pasif) atau langsung memblokir (mode IPS, aktif).",
        },
        {
          kind: "materi",
          title: "Mode offline: analisis pasca-insiden",
          body: "Selain berjalan live memonitor traffic real-time, Suricata bisa dijalankan dalam mode offline dengan flag `-r <file.pcap>`, memproses file pcap yang sudah direkam sebelumnya alih-alih traffic langsung dari interface. Ini sangat berguna untuk investigasi pasca-insiden (menganalisis capture yang direkam saat kejadian) atau, seperti latihan hari ini, untuk menguji ruleset terhadap sample pcap tanpa perlu traffic live sama sekali.",
        },
        {
          kind: "praktik",
          title: "Jalankan Suricata terhadap pcap mencurigakan",
          instructions: [
            "Install Suricata, lalu update ruleset default-nya dengan `suricata-update`.",
            "Jalankan `suricata -r <pcap-dari-hari-51> -l output/` untuk memproses pcap dari Hari 51 dalam mode offline, hasilnya ditulis ke folder `output/`.",
            "Buka `output/fast.log` (format ringkas satu baris per alert) untuk melihat daftar alert yang ter-generate.",
            "Sebagai alternatif, buka `output/eve.json` (format JSON lebih detail per event) dan lihat satu entri alert lengkap dengan `cat output/eve.json | python3 -m json.tool | less` atau tool serupa.",
            "Catat 3 alert paling signifikan dari fast.log/eve.json dan jelaskan apa yang masing-masing deteksi.",
          ],
          proof:
            "Isi fast.log/eve.json dan ringkasan 3 alert paling signifikan.",
        },
        {
          kind: "kuis",
          question:
            "Flag Suricata apa yang dipakai untuk menganalisis file pcap secara offline (bukan live traffic)?",
          inputType: "text",
          placeholder: "contoh: -i",
          accepted: ["-r"],
          explanation:
            "`-r <file>` memerintahkan Suricata membaca dari file pcap, berlawanan dengan `-i <interface>` untuk capture live.",
        },
      ],
    },
    {
      index: 11,
      label: "Hari 53",
      title: "Menulis Custom Suricata Rule",
      steps: [
        {
          kind: "materi",
          title: "Tiga bagian anatomi satu rule",
          body: 'Rule Suricata terdiri dari tiga bagian: action (`alert` untuk sekadar mencatat, atau `drop` untuk langsung memblokir di mode IPS), header (protokol, IP sumber/tujuan, port sumber/tujuan - misal `alert http any any -> any any` berarti "alert untuk traffic HTTP dari mana saja ke mana saja"), dan options di dalam kurung (`msg` untuk deskripsi alert, `content` untuk pola yang dicari di payload, `sid` untuk ID unik rule itu).',
        },
        {
          kind: "materi",
          title: "Kenapa menulis rule sendiri itu latihan yang berharga",
          body: "Menulis rule sendiri dari nol memaksa kamu memahami betul bagaimana signature-based detection sebenarnya bekerja - bukan cuma memakai rule bawaan sebagai black box. Pemahaman ini jadi dasar penting sebelum Hari 54, di mana kamu justru harus MEMODIFIKASI/meredam rule bawaan yang sudah ada - kamu tidak bisa tuning sesuatu yang strukturnya belum kamu pahami.",
        },
        {
          kind: "praktik",
          title: "Tulis dan uji satu custom rule",
          instructions: [
            'Buat file `local.rules` berisi satu baris: `alert http any any -> any any (msg:"Custom test alert"; content:"/admin"; http_uri; sid:1000001; rev:1;)`.',
            'Buat traffic test yang cocok dengan rule itu - browsing ke path yang mengandung "/admin" di server test manapun, atau pakai `curl http://example.com/admin`.',
            "Capture traffic test itu dengan tcpdump/Wireshark, simpan sebagai pcap baru.",
            "Jalankan Suricata dengan rule custom-mu (`-S local.rules` atau tambahkan ke konfigurasi rule-files) terhadap pcap itu dalam mode `-r`.",
            "Buka `fast.log`, konfirmasi alert dengan pesan 'Custom test alert' muncul persis seperti yang kamu definisikan.",
          ],
          proof:
            "Isi rule custom, pcap test, dan baris alert di fast.log yang menunjukkan rule berhasil trigger.",
        },
        {
          kind: "kuis",
          question:
            "Field apa di dalam rule Suricata yang memberi tiap rule nomor identitas unik?",
          inputType: "text",
          placeholder: "contoh: msg",
          accepted: ["sid"],
          explanation:
            "`sid` (signature ID) harus unik per rule - Suricata memakainya untuk membedakan rule mana yang trigger di setiap alert.",
        },
      ],
    },
    {
      index: 12,
      label: "Hari 54",
      title: "Tuning Rule dan Mengurangi False Positive",
      steps: [
        {
          kind: "materi",
          title: "Kenapa alert yang berisik itu masalah nyata",
          body: 'Rule yang terlalu general (kondisi match-nya terlalu longgar) memicu false positive - alert untuk traffic yang sebenarnya sah/tidak berbahaya. Masalahnya bukan cuma "alert yang salah", tapi efek berantainya: alert yang membanjiri analis dengan noise membuat alert yang BENAR-BENAR penting ikut terkubur dan gampang terlewat/diabaikan - fenomena yang sering disebut "alert fatigue" di dunia SOC.',
        },
        {
          kind: "materi",
          title: "Tuning: mempersempit, bukan mematikan begitu saja",
          body: "Tuning yang baik berarti mempersempit kondisi match rule (content lebih spesifik, batasi ke rentang IP/port tertentu yang relevan) ATAU meredam rule yang terbukti tidak relevan untuk environment spesifikmu - tapi TANPA mematikan rule itu sepenuhnya untuk semua orang/semua traffic, karena rule yang sama mungkin tetap valid untuk kondisi lain. Suricata menyediakan mekanisme `suppress` justru untuk kebutuhan ini: meredam alert dari sumber tertentu (misal IP-mu sendiri) sambil membiarkan rule itu tetap aktif untuk sumber lain.",
        },
        {
          kind: "praktik",
          title: "Temukan dan redam satu false positive",
          instructions: [
            "Jalankan Suricata dengan ruleset default terhadap traffic browsing normal (bukan pcap malware) selama beberapa menit, dalam mode live (`-i <interface>`) atau capture dulu baru diproses offline.",
            "Review `fast.log`, identifikasi minimal 1 alert yang menurutmu false positive - traffic yang kamu tahu pasti sah tapi tetap dianggap mencurigakan oleh rule default.",
            "Catat `sid` dari rule yang men-trigger alert itu (ada di detail alert-nya).",
            "Tulis suppress rule di file `threshold.config`: `suppress gen_id 1, sig_id <sid alert itu>, track by_src, ip <ip-mu>`.",
            "Jalankan ulang Suricata dengan konfigurasi suppress itu terhadap traffic yang sama, konfirmasi alert itu tidak muncul lagi khusus dari IP-mu.",
          ],
          proof:
            "fast.log sebelum (alert muncul) dan sesudah (alert diredam khusus dari IP-mu) penerapan suppress rule.",
        },
        {
          kind: "kuis",
          question:
            "Istilah untuk alert yang salah memicu terhadap traffic yang sebenarnya sah/tidak berbahaya disebut apa?",
          inputType: "text",
          placeholder: "contoh: true positive",
          accepted: ["false positive"],
          explanation:
            'False positive adalah alert keliru - sistem bilang "ada masalah" padahal traffic-nya sah. Kebalikannya, false negative, justru lebih berbahaya: ancaman nyata yang tidak terdeteksi sama sekali.',
        },
      ],
    },
    {
      index: 13,
      label: "Hari 55",
      title: "Zeek sebagai Alternatif Suricata",
      steps: [
        {
          kind: "materi",
          title: "Filosofi berbeda: log terstruktur, bukan cuma alert",
          body: "Zeek (dulu bernama Bro) adalah network security monitor dengan pendekatan berbeda dari Suricata: alih-alih fokus mencocokkan signature dan memberi alert biner (cocok/tidak), Zeek menghasilkan LOG TERSTRUKTUR per-protokol untuk SETIAP traffic yang lewat - `conn.log` untuk ringkasan setiap koneksi, `http.log` untuk setiap request HTTP, `dns.log` untuk setiap query DNS, dan puluhan log spesifik lainnya.",
        },
        {
          kind: "materi",
          title: "Kapan Zeek lebih cocok dipakai daripada Suricata",
          body: "Pendekatan berbasis log ini membuat Zeek lebih cocok untuk investigasi mendalam dan threat hunting manual - analis bisa query log-log itu untuk pertanyaan seperti 'koneksi mana yang durasinya paling lama' atau 'domain apa saja yang di-resolve dalam 1 jam terakhir', pertanyaan yang tidak selalu terjawab lewat rule/alert saja. Suricata dan Zeek bukan kompetitor yang harus dipilih salah satu - banyak SOC memakai keduanya sekaligus: Suricata untuk deteksi/alert real-time, Zeek untuk konteks dan investigasi lanjutan begitu ada alert yang perlu digali lebih dalam.",
        },
        {
          kind: "praktik",
          title: "Jalankan Zeek terhadap pcap yang sudah kamu punya",
          instructions: [
            "Install Zeek (atau pakai image Docker resmi `zeek/zeek` kalau instalasi native ribet).",
            "Buat folder kerja terpisah, masuk ke dalamnya, jalankan `zeek -r <path-ke>/first-capture.pcap`.",
            "Lihat daftar file log yang dihasilkan di folder itu (`ls *.log`), buka `conn.log`.",
            "Identifikasi kolom durasi koneksi (`duration`) dan jumlah byte terkirim/terima (`orig_bytes`, `resp_bytes`) di beberapa baris.",
            "Pilih satu koneksi di conn.log, cari koneksi yang sama persis (IP dan port yang cocok) di Wireshark, bandingkan durasi dan jumlah byte-nya - keduanya harus konsisten.",
          ],
          proof:
            "Isi conn.log dan konfirmasi satu baris koneksi cocok dengan yang terlihat di Wireshark.",
        },
        {
          kind: "kuis",
          question:
            "Nama file log Zeek yang mencatat ringkasan setiap koneksi TCP/UDP (durasi, byte, IP) disebut apa?",
          inputType: "text",
          placeholder: "contoh: alert.log",
          accepted: ["conn.log"],
          explanation:
            "conn.log adalah log paling dasar Zeek - satu baris per koneksi, jadi titik awal paling umum untuk investigasi.",
        },
      ],
    },
    {
      index: 14,
      label: "Hari 56",
      title: "Studi Kasus Traffic Analysis",
      steps: [
        {
          kind: "materi",
          title: "Satu alur penuh, dari pcap mentah sampai laporan",
          body: "Menggabungkan semua skill sebelumnya (filter Wireshark, follow stream, deteksi pola anomali, Suricata untuk alert cepat, Zeek untuk konteks mendalam) jadi satu alur analisis penuh adalah simulasi paling dekat dengan pekerjaan analis SOC/Incident Response sehari-hari: dari file pcap mentah tanpa konteks apa pun, sampai laporan yang bisa dipahami dan ditindaklanjuti orang lain yang tidak ikut melihat capture-nya langsung.",
        },
        {
          kind: "materi",
          title: "Apa yang wajib ada di sebuah incident report",
          body: "Laporan insiden yang baik minimal berisi tiga bagian: ringkasan kejadian (apa yang terjadi, kapan, host mana saja yang terlibat, dalam bahasa yang bisa dipahami orang non-teknis), Indicators of Compromise/IOC (data forensik konkret - IP jahat, domain C2, hash file - yang bisa dipakai tim lain untuk mendeteksi kejadian serupa di sistem lain), dan rekomendasi tindakan (langkah konkret yang harus diambil, bukan cuma 'waspada').",
        },
        {
          kind: "praktik",
          title: "Tulis mini incident report dari satu pcap penuh",
          instructions: [
            "Unduh satu pcap studi kasus BARU dari malware-traffic-analysis.net (berbeda dari yang dipakai di Hari 51).",
            "Analisis penuh memakai kombinasi tool yang sudah dipelajari: buka di Wireshark untuk overview, jalankan Zeek untuk conn.log/http.log/dns.log, jalankan Suricata untuk melihat alert yang ter-generate.",
            "Identifikasi host yang terlibat (IP internal vs eksternal), protokol yang dipakai, dan urutan kejadian secara kronologis.",
            "Kumpulkan IOC yang kamu temukan: IP/domain mencurigakan, dan file hash kalau ada file yang bisa diekstrak dari traffic.",
            "Tulis laporan 1 halaman: ringkasan insiden, daftar IOC, dan rekomendasi tindakan konkret.",
          ],
          proof:
            "Laporan insiden 1 halaman lengkap dengan IOC dan rekomendasi.",
        },
        {
          kind: "kuis",
          question:
            "Istilah umum untuk data forensik yang menunjukkan suatu sistem sudah disusupi (IP jahat, hash file, domain C2) disebut apa?",
          inputType: "text",
          placeholder: "contoh: payload",
          accepted: ["ioc", "indicator of compromise"],
          explanation:
            "IOC (Indicator of Compromise) adalah bukti konkret yang bisa dipakai untuk mendeteksi atau mengonfirmasi insiden yang sama di sistem lain.",
        },
      ],
    },
  ],
};

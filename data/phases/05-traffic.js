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
          title: "Merekam traffic mentah",
          body: "Packet capture merekam seluruh traffic yang lewat satu interface jaringan dalam format .pcap. Wireshark adalah tool GUI standar untuk membacanya; hampir semua tool traffic analysis lain (tcpdump, tshark, Suricata, Zeek) bisa membaca format yang sama, jadi satu file capture bisa dianalisis dengan banyak tool berbeda.",
        },
        {
          kind: "praktik",
          title: "Rekam dan simpan capture pertamamu",
          instructions: [
            "Install Wireshark (atau tshark untuk versi CLI).",
            "Mulai capture di interface aktifmu, buka satu website di browser selama capture berjalan.",
            "Hentikan capture setelah kira-kira 2 menit, simpan sebagai `first-capture.pcap`.",
            "Hitung berapa total paket yang tertangkap dan protokol apa saja yang muncul (lihat kolom Protocol).",
          ],
          proof:
            "File first-capture.pcap dan ringkasan jumlah paket per protokol.",
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
          title: "Sebelum sampai ke IP, ada ARP",
          body: "ARP (Address Resolution Protocol) menerjemahkan alamat IP jadi MAC address di jaringan lokal lewat broadcast request dan unicast reply. Banyak serangan man-in-the-middle (ARP poisoning/spoofing) dimulai persis di layer ini - sebelum traffic sempat naik ke layer yang mungkin sudah terenkripsi. Analis traffic perlu bisa mengenali pola ARP normal supaya bisa mendeteksi anomali di level ini.",
        },
        {
          kind: "praktik",
          title: "Capture dan verifikasi ARP di jaringanmu",
          instructions: [
            "Mulai capture baru di Wireshark, filter dengan `arp`.",
            "Hapus ARP cache lokal (`sudo ip neigh flush all`) lalu `ping <ip gateway>` sekali untuk memicu ARP request baru.",
            "Identifikasi pasangan ARP Request/Reply untuk gateway-mu di capture, catat MAC address-nya.",
            "Bandingkan MAC itu dengan hasil `arp -n` (Linux) atau `arp -a` (Windows) di tabel ARP lokal.",
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
          title: "Dua jenis filter yang beda fungsi",
          body: "Capture filter (sintaks BPF) menyaring paket sebelum direkam - kalau salah setting, paket yang tidak lolos filter hilang selamanya. Display filter (sintaks Wireshark sendiri) menyaring paket yang sudah direkam, jadi jauh lebih sering dipakai karena bisa diubah-ubah kapan saja tanpa perlu capture ulang.",
        },
        {
          kind: "praktik",
          title: "Terapkan 5 display filter berbeda",
          instructions: [
            "Buka `first-capture.pcap` dari Hari 43.",
            "Terapkan filter berikut satu per satu: `http`, `dns`, `tcp.port==443`, `ip.addr==<salah satu IP tujuan>`, `tcp.flags.syn==1`.",
            "Catat jumlah paket yang ditampilkan untuk tiap filter.",
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
          title: "SYN, SYN-ACK, ACK",
          body: "Handshake TCP terdiri dari SYN, SYN-ACK, dan ACK, ditandai lewat flags dan nomor sequence/acknowledgment yang saling terkait. Memahami handshake normal adalah dasar untuk mengenali anomali seperti SYN flood, di mana banyak SYN dikirim tanpa pernah menyelesaikan handshake-nya.",
        },
        {
          kind: "praktik",
          title: "Verifikasi hubungan SEQ/ACK di satu handshake nyata",
          instructions: [
            "Di `first-capture.pcap`, filter dengan `tcp.flags.syn==1`.",
            "Pilih satu koneksi, ikuti 3 paket pertamanya (SYN, SYN-ACK, ACK).",
            "Catat nomor Sequence dan Acknowledgment di tiap paket.",
            "Jelaskan secara manual kenapa ACK paket ketiga = SEQ SYN-ACK + 1.",
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
          title: "Apa yang bocor sebelum enkripsi mulai",
          body: "TLS handshake (ClientHello, ServerHello, Certificate, dst) menegosiasikan cipher suite dan menukar kunci sebelum data aplikasi mulai dienkripsi. Wireshark bisa membaca metadata handshake ini apa adanya - termasuk SNI (domain yang diminta client) dan sertifikat server - tapi payload aplikasi setelah handshake selesai tetap terenkripsi tanpa kunci sesi yang benar.",
        },
        {
          kind: "praktik",
          title: "Baca metadata TLS, buktikan payload-nya terenkripsi",
          instructions: [
            "Mulai capture, buka `https://example.com` di browser.",
            "Filter `tls.handshake.type==1` untuk ClientHello, expand field-nya, catat SNI (Server Name Indication).",
            "Filter `tls.handshake.type==2` untuk ServerHello, catat cipher suite yang dipilih server.",
            "Follow TCP Stream pada paket data setelah handshake, konfirmasi isinya acak/tidak terbaca.",
          ],
          proof:
            "SNI dari ClientHello cocok dengan domain yang kamu buka, dan follow stream data menunjukkan teks acak, bukan HTTP plaintext.",
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
          title: "Merekonstruksi percakapan, mencocokkan query",
          body: '"Follow TCP Stream" merekonstruksi seluruh percakapan HTTP jadi teks yang mudah dibaca. Query DNS dan response-nya bisa dicocokkan lewat Transaction ID untuk melihat domain apa yang di-resolve jadi IP apa - penting saat menelusuri domain command-and-control di traffic mencurigakan.',
        },
        {
          kind: "praktik",
          title: "Rekonstruksi satu request HTTP dan satu query DNS",
          instructions: [
            'Filter `http.request` di capture-mu, klik kanan satu paket, pilih "Follow > TCP Stream".',
            "Catat isi request (method, path, host) dan response (status code) yang direkonstruksi.",
            "Filter `dns` terpisah, temukan satu query dan response pasangannya (Transaction ID sama).",
            "Catat domain yang di-query dan IP yang dikembalikan.",
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
          title: "Kenapa protokol lama diganti",
          body: "Banyak protokol lama (FTP, Telnet, HTTP Basic Auth) mengirim kredensial dalam bentuk plaintext, sehingga siapa pun yang bisa menyadap traffic di jalur yang sama bisa membaca username dan password langsung dari payload paket. Ini alasan utama protokol itu digantikan versi terenkripsi (SFTP/FTPS, SSH, HTTPS) di lingkungan produksi modern.",
        },
        {
          kind: "praktik",
          title: "Buktikan kredensial FTP terbaca plaintext",
          instructions: [
            "Siapkan server FTP test lokal (misal `python3 -m pyftpdlib` atau image `vsftpd` di container/VM) dengan satu akun test.",
            "Mulai capture, login ke server FTP test itu dari client (command-line `ftp` atau FileZilla).",
            "Filter `ftp` di Wireshark, cari perintah `USER` dan `PASS`.",
            "Catat bahwa username dan password terlihat jelas dalam plaintext di payload.",
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
          title: "Capture tanpa GUI",
          body: "tcpdump memakai sintaks BPF (Berkeley Packet Filter) yang sama untuk capture filter di Wireshark. Kemampuan capture dari terminal penting karena banyak server produksi tidak punya GUI - kamu capture di server lewat SSH, lalu analisis file-nya di Wireshark secara lokal.",
        },
        {
          kind: "praktik",
          title: "Capture traffic DNS dengan tcpdump",
          instructions: [
            "Jalankan `sudo tcpdump -i any port 53 -w dns-capture.pcap` selama 60 detik sambil browsing.",
            "Hentikan dengan Ctrl+C setelah 60 detik.",
            "Buka `dns-capture.pcap` di Wireshark, konfirmasi isinya hanya traffic DNS.",
            "Bandingkan jumlah paket yang tercatat tcpdump di terminal dengan jumlah di Wireshark.",
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
          title: "Pola yang layak dicurigai",
          body: "Indikator traffic mencurigakan meliputi: banyak koneksi ke port berbeda dalam waktu singkat (port scan), traffic ke protokol/port tidak umum, koneksi berulang ke satu IP/domain dalam interval waktu tetap (beaconing malware ke command-and-control), dan kredensial dalam bentuk plaintext. Pcap sample publik dari insiden nyata adalah cara terbaik berlatih tanpa perlu jadi korban sungguhan.",
        },
        {
          kind: "praktik",
          title: "Identifikasi indikator di pcap mencurigakan nyata",
          instructions: [
            "Unduh satu pcap sample dari malware-traffic-analysis.net (pilih salah satu studi kasus).",
            "Buka di Wireshark, gunakan Statistics > Conversations untuk melihat pola koneksi.",
            "Identifikasi minimal 2 indikator mencurigakan: misal beacon berulang ke satu IP, user-agent aneh, atau domain yang baru terdaftar.",
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
          body: "Suricata adalah engine IDS/IPS open-source yang mencocokkan traffic terhadap ribuan rule signature. Mode offline (`-r`) memungkinkan menganalisis pcap yang sudah direkam tanpa perlu traffic live - cocok untuk investigasi pasca-insiden atau, seperti di sini, latihan terhadap sample pcap.",
        },
        {
          kind: "praktik",
          title: "Jalankan Suricata terhadap pcap mencurigakan",
          instructions: [
            "Install Suricata dan pastikan ruleset default ter-update (`suricata-update`).",
            "Jalankan `suricata -r <pcap-dari-hari-51> -l output/` dalam mode offline.",
            "Buka `output/fast.log` atau `output/eve.json`, review alert yang ter-generate.",
            "Catat 3 alert paling signifikan dan apa yang mereka deteksi.",
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
          title: "Anatomi satu rule",
          body: "Rule Suricata terdiri dari action (alert/drop), header (protokol, IP, port), dan options (msg, content, sid). Menulis rule sendiri melatih pemahaman bagaimana signature-based detection sebenarnya bekerja, dan jadi dasar sebelum kamu bisa menuning rule bawaan di Hari 54.",
        },
        {
          kind: "praktik",
          title: "Tulis dan uji satu custom rule",
          instructions: [
            'Tulis rule di `local.rules`: `alert http any any -> any any (msg:"Custom test alert"; content:"/admin"; http_uri; sid:1000001; rev:1;)`.',
            'Buat traffic test yang cocok dengan rule itu (browsing ke path yang mengandung "/admin", atau pakai curl).',
            "Capture traffic test itu jadi pcap, jalankan Suricata dengan rule custom-mu terhadap pcap itu.",
            "Konfirmasi alert custom-mu muncul di fast.log.",
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
          title: "Alert yang berisik itu masalah, bukan prestasi",
          body: "Rule yang terlalu general memicu false positive - alert untuk traffic yang sebenarnya sah - yang membanjiri analis dengan noise sampai alert yang benar-benar penting ikut terabaikan. Tuning berarti mempersempit kondisi match (content lebih spesifik, batasi ke IP/port tertentu) atau meredam rule yang terbukti tidak relevan untuk environment-mu, tanpa mematikannya sepenuhnya untuk semua orang.",
        },
        {
          kind: "praktik",
          title: "Temukan dan redam satu false positive",
          instructions: [
            "Jalankan Suricata dengan ruleset default terhadap traffic normal (browsing biasa) selama beberapa menit.",
            "Review fast.log, identifikasi minimal 1 alert yang menurutmu false positive (traffic sah yang salah dianggap mencurigakan).",
            "Tulis suppress rule: `suppress gen_id 1, sig_id <sid alert itu>, track by_src, ip <ip-mu>`.",
            "Jalankan ulang, konfirmasi alert itu tidak muncul lagi dari IP-mu tapi tetap aktif untuk IP lain.",
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
          title: "Log terstruktur, bukan cuma alert",
          body: "Zeek (dulu bernama Bro) adalah network security monitor dengan filosofi berbeda dari Suricata: bukan cuma cocokkan signature dan memberi alert, tapi menghasilkan log terstruktur per-protokol (conn.log, http.log, dns.log, dst) yang cocok untuk investigasi mendalam dan threat hunting manual, bukan cuma deteksi real-time.",
        },
        {
          kind: "praktik",
          title: "Jalankan Zeek terhadap pcap yang sudah kamu punya",
          instructions: [
            "Install Zeek (atau pakai image Docker resmi `zeek/zeek`).",
            "Jalankan `zeek -r first-capture.pcap` di folder kerja terpisah.",
            "Buka `conn.log` yang dihasilkan, identifikasi kolom durasi koneksi dan jumlah byte terkirim/terima.",
            "Bandingkan satu koneksi di conn.log dengan koneksi yang sama di Wireshark, konfirmasi datanya konsisten.",
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
          title: "Menggabungkan semua skill jadi satu alur",
          body: "Menggabungkan semua skill sebelumnya (filter, follow stream, deteksi anomali, Suricata, Zeek) jadi satu alur analisis penuh adalah simulasi paling dekat dengan pekerjaan analis SOC/IR sehari-hari: dari pcap mentah sampai laporan yang bisa dibaca orang lain.",
        },
        {
          kind: "praktik",
          title: "Tulis mini incident report dari satu pcap penuh",
          instructions: [
            "Unduh satu pcap studi kasus baru dari malware-traffic-analysis.net (berbeda dari Hari 51).",
            "Analisis penuh: identifikasi host yang terlibat, protokol yang dipakai, dan urutan kejadian.",
            "Tulis laporan 1 halaman: ringkasan insiden, Indicators of Compromise (IP/domain/file hash jika ada), dan rekomendasi tindakan.",
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

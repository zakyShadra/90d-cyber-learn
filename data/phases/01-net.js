// Fase 1: Network+
export default {
  id: "net",
  number: 1,
  title: "Network+",
  dayRange: "Hari 1-7",
  summary:
    "Fondasi jaringan: bagaimana data berpindah dari satu perangkat ke perangkat lain, dan istilah yang akan terus kamu pakai di semua fase berikutnya.",
  resources: [
    {
      label: "Professor Messer - N10-009 Playlist",
      url: "https://youtube.com/playlist?list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 1",
      title: "Model OSI dan TCP/IP",
      steps: [
        {
          kind: "materi",
          title: "Tujuh lapisan, satu tujuan: mengirim data",
          body: "Model OSI membagi komunikasi jaringan jadi 7 lapisan, dari kabel fisik (layer 1) sampai aplikasi (layer 7). Model TCP/IP yang dipakai di dunia nyata lebih ringkas, hanya 4 lapisan (Network Access, Internet, Transport, Application), tapi konsepnya sama: tiap lapisan membungkus data dari lapisan di atasnya. Memahami lapisan mana yang bermasalah adalah skill dasar troubleshooting - DNS gagal itu masalah layer aplikasi, kabel putus itu layer fisik.",
        },
        {
          kind: "praktik",
          title: "Petakan hasil traceroute ke lapisan OSI",
          instructions: [
            "Jalankan `traceroute 8.8.8.8` (Linux/Mac) atau `tracert 8.8.8.8` (Windows).",
            "Catat setiap hop: IP, waktu respons (ms), dan apakah ada timeout (*).",
            "Untuk 3 hop pertama, tuliskan lapisan OSI apa saja yang terlibat supaya paket bisa sampai ke hop berikutnya.",
          ],
          proof:
            "File teks berisi output traceroute lengkap dengan anotasi lapisan OSI di 3 hop pertama.",
        },
        {
          kind: "kuis",
          question:
            "Model TCP/IP yang dipakai di dunia nyata (bukan model OSI teori) punya berapa lapisan?",
          inputType: "text",
          placeholder: "contoh: 7",
          accepted: ["4", "empat"],
          explanation:
            "Model TCP/IP praktis punya 4 lapisan: Network Access, Internet, Transport, Application - memadatkan 7 lapisan OSI jadi lebih ringkas.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 2",
      title: "Pengalamatan IP dan Subnetting",
      steps: [
        {
          kind: "materi",
          title: "Membagi satu jaringan jadi beberapa jaringan kecil",
          body: "Alamat IPv4 terdiri dari bagian network dan host, ditentukan oleh subnet mask atau notasi CIDR (/24, /26, dst). Subnetting adalah cara membagi satu blok alamat jadi beberapa jaringan lebih kecil - skill wajib untuk desain jaringan dan untuk membaca konfigurasi firewall. Semakin besar angka setelah garis miring, semakin sedikit bit tersisa untuk host, jadi semakin sedikit alamat yang bisa dipakai per subnet.",
        },
        {
          kind: "praktik",
          title: "Bagi satu blok /24 jadi 4 subnet",
          instructions: [
            "Ambil blok 192.168.10.0/24.",
            "Bagi manual jadi 4 subnet dengan ukuran sama (masing-masing /26).",
            "Untuk tiap subnet, tulis: network address, broadcast address, dan rentang IP yang bisa dipakai host.",
            "Cek hasil hitunganmu dengan kalkulator subnet online atau `ipcalc 192.168.10.0/26`.",
          ],
          proof:
            "Tabel 4 baris (satu per subnet) berisi network, broadcast, dan usable range, cocok dengan hasil ipcalc.",
          check: {
            placeholder: "Berapa usable host per subnet /26?",
            accepted: ["62"],
          },
        },
        {
          kind: "kuis",
          question:
            "Dari satu blok /24 penuh (256 alamat), setelah dikurangi network address dan broadcast address, berapa total IP yang bisa dipakai host?",
          inputType: "text",
          placeholder: "contoh: 256",
          accepted: ["254"],
          explanation:
            "256 alamat total dikurangi 1 network address dan 1 broadcast address = 254 alamat usable untuk host.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 3",
      title: "TCP, UDP, dan Port",
      steps: [
        {
          kind: "materi",
          title: "Dua cara mengirim data, satu nomor untuk menemukan aplikasi",
          body: "TCP membangun koneksi lewat three-way handshake (SYN, SYN-ACK, ACK) dan menjamin data sampai utuh dan berurutan. UDP tidak punya handshake atau jaminan itu, tapi lebih cepat - dipakai untuk DNS query dan streaming. Nomor port (0–65535) menentukan aplikasi mana di satu host yang menerima paket; port di bawah 1024 umumnya dipakai layanan standar (HTTP=80, HTTPS=443, SSH=22).",
        },
        {
          kind: "praktik",
          title: "Audit port yang terbuka di komputermu sendiri",
          instructions: [
            "Jalankan `ss -tulpn` (Linux) atau `netstat -ano` (Windows).",
            "Pilih 5 baris hasil, catat: port, proses/aplikasi, dan protokol (TCP/UDP).",
            "Untuk tiap baris, cari tahu port itu untuk layanan apa (misal 443 = HTTPS) dan jelaskan kenapa TCP atau UDP dipilih untuk layanan itu.",
          ],
          proof:
            "Tabel 5 baris: port, proses, protokol, nama layanan, dan alasan pemilihan TCP/UDP.",
        },
        {
          kind: "kuis",
          question:
            "Pada three-way handshake TCP, client mengirim SYN - flag apa yang dibalas server di paket kedua?",
          inputType: "text",
          placeholder: "contoh: ack",
          accepted: ["syn-ack", "syn ack", "syn,ack"],
          explanation:
            "Server membalas dengan SYN-ACK (mengonfirmasi SYN client sekaligus mengirim SYN-nya sendiri), lalu client menutup handshake dengan ACK.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 4",
      title: "Switching dan VLAN",
      steps: [
        {
          kind: "materi",
          title: "Satu switch fisik, banyak jaringan logis",
          body: "Switch meneruskan frame berdasarkan tabel MAC address, dan secara default satu switch adalah satu broadcast domain besar. VLAN memecah satu switch fisik jadi beberapa jaringan logis terpisah - dasar dari segmentasi jaringan untuk keamanan, karena perangkat di VLAN berbeda tidak bisa saling melihat traffic broadcast satu sama lain tanpa lewat router.",
        },
        {
          kind: "praktik",
          title: "Bangun 2 VLAN di Cisco Packet Tracer",
          instructions: [
            "Install Cisco Packet Tracer (gratis lewat akun NetAcad).",
            "Buat topologi: 1 switch, 4 PC, 2 di antaranya di VLAN 10 dan 2 di VLAN 20.",
            "Konfigurasi port switch dengan `switchport access vlan 10/20`.",
            "Buktikan PC di VLAN 10 tidak bisa ping PC di VLAN 20, tapi bisa ping sesama VLAN 10.",
          ],
          proof:
            "Screenshot hasil ping gagal antar-VLAN dan berhasil dalam VLAN yang sama, plus konfigurasi switch-nya.",
        },
        {
          kind: "kuis",
          question:
            "Standar IEEE apa (format 802.1x) yang mendefinisikan VLAN tagging?",
          inputType: "text",
          placeholder: "contoh: 802.11",
          accepted: ["802.1q", "dot1q", "802.1 q"],
          explanation:
            "802.1Q menambahkan tag VLAN ID ke header Ethernet frame, sehingga satu link fisik (trunk) bisa membawa traffic banyak VLAN sekaligus.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 5",
      title: "Routing Dasar",
      steps: [
        {
          kind: "materi",
          title: "Bagaimana router memutuskan ke mana paket pergi",
          body: 'Router meneruskan paket antar-network berdasarkan routing table, dengan default route sebagai jalur "kalau tidak ada entry spesifik yang cocok dengan tujuan". Static route dikonfigurasi manual satu-satu; dynamic routing (OSPF, BGP) dipelajari lebih lanjut di luar roadmap ini, tapi memahami routing table itu sendiri sudah cukup untuk level dasar.',
        },
        {
          kind: "praktik",
          title: "Baca dan modifikasi routing table sendiri",
          instructions: [
            "Jalankan `ip route` (Linux) atau `route print` (Windows) dan salin outputnya.",
            "Jelaskan baris default gateway dan satu baris route lain, apa artinya masing-masing kolom.",
            "Tambahkan satu static route sementara ke network fiktif, misal `sudo ip route add 10.99.0.0/24 via <gateway-mu>`.",
            "Verifikasi route baru muncul di `ip route`, lalu hapus lagi dengan `ip route del`.",
          ],
          proof:
            "Output `ip route` sebelum dan sesudah penambahan/penghapusan static route, dengan penjelasan tiap kolom.",
        },
        {
          kind: "kuis",
          question:
            "Rute yang dipakai router ketika tidak ada entry spesifik yang cocok dengan alamat tujuan disebut rute apa?",
          inputType: "text",
          placeholder: "contoh: static route",
          accepted: ["default route", "default gateway", "rute default"],
          explanation:
            "Default route (sering juga disebut default gateway di level host) menjadi jalur terakhir kalau tidak ada route lain yang lebih spesifik cocok dengan tujuan paket.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 6",
      title: "Wireless Networking",
      steps: [
        {
          kind: "materi",
          title: "Standar dan keamanan di udara terbuka",
          body: "Jaringan wireless (802.11) punya standar (a/b/g/n/ac/ax) yang menentukan kecepatan dan frekuensi. Metode enkripsi Wi-Fi berkembang dari WEP (sudah rentan dan gampang dibobol), WPA, sampai WPA2/WPA3 yang jadi standar aman saat ini. SSID yang terbuka (tanpa enkripsi sama sekali) atau masih pakai WEP adalah target empuk untuk serangan sniffing.",
        },
        {
          kind: "praktik",
          title: "Survei keamanan Wi-Fi di sekitarmu",
          instructions: [
            "Jalankan `nmcli dev wifi list` (Linux) atau buka daftar Wi-Fi di HP dengan aplikasi WiFi Analyzer.",
            "Catat 5 SSID: channel, kekuatan sinyal, dan jenis keamanan (Open/WEP/WPA/WPA2/WPA3).",
            "Identifikasi mana yang paling lemah keamanannya dan jelaskan risikonya.",
          ],
          proof:
            "Tabel 5 SSID dengan kolom channel, sinyal, jenis keamanan, dan analisis satu jaringan paling rentan.",
        },
        {
          kind: "kuis",
          question:
            "Di antara WEP, WPA, WPA2, dan WPA3 - protokol enkripsi Wi-Fi mana yang paling tua dan sudah dianggap rentan/mudah dibobol?",
          inputType: "text",
          placeholder: "contoh: wpa3",
          accepted: ["wep"],
          explanation:
            "WEP memakai kunci enkripsi statis dan algoritma RC4 yang lemah - bisa dibobol dalam hitungan menit dengan tool yang sudah tersedia bebas, sehingga tidak boleh dipakai lagi.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 7",
      title: "Layanan Jaringan: DNS, DHCP, NAT",
      steps: [
        {
          kind: "materi",
          title: "Tiga layanan yang bekerja diam-diam di balik layar",
          body: "DNS menerjemahkan nama domain jadi IP address lewat beberapa jenis record (A untuk IPv4, AAAA untuk IPv6, MX untuk mail server, NS untuk name server). DHCP membagikan konfigurasi IP otomatis ke perangkat baru yang masuk jaringan. NAT menerjemahkan IP privat ke IP publik sehingga banyak perangkat di jaringan rumah/kantor bisa berbagi satu IP internet.",
        },
        {
          kind: "praktik",
          title: "Bongkar record DNS satu domain",
          instructions: [
            "Pilih satu domain, misal domain kampus/kantor atau `github.com`.",
            "Jalankan `dig domain.com A`, `dig domain.com MX`, `dig domain.com NS`, dan `dig domain.com AAAA`.",
            "Untuk tiap hasil, jelaskan record itu dipakai untuk apa dan nilai apa yang dikembalikan.",
          ],
          proof:
            "Output 4 query dig beserta penjelasan singkat fungsi tiap jenis record.",
        },
        {
          kind: "kuis",
          question: "Port standar berapa yang dipakai protokol DNS?",
          inputType: "text",
          placeholder: "contoh: 80",
          accepted: ["53"],
          explanation:
            "DNS memakai port 53, baik lewat UDP (query biasa, lebih cepat) maupun TCP (dipakai untuk zone transfer atau respons yang lebih besar dari batas UDP).",
        },
      ],
    },
  ],
};

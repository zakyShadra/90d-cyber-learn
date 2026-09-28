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
          title: "Tujuh lapisan OSI: peta konseptual, bukan implementasi",
          body: "Model OSI (Open Systems Interconnection) membagi komunikasi jaringan jadi 7 lapisan tersusun dari bawah ke atas: Physical (kabel, sinyal listrik/cahaya), Data Link (frame, MAC address, switch), Network (paket, IP address, router), Transport (segment, TCP/UDP, port), Session, Presentation, dan Application (paling atas, tempat protokol seperti HTTP/DNS berjalan). Model ini tidak pernah diimplementasikan persis seperti itu di dunia nyata - fungsinya sebagai peta konseptual untuk berkomunikasi ('masalah ini di layer berapa?') dan untuk troubleshooting terstruktur, bukan cetak biru software yang benar-benar dijalankan mesin.",
        },
        {
          kind: "materi",
          title: "TCP/IP: model yang sungguh-sungguh berjalan di internet",
          body: "Model TCP/IP (kadang disebut model Internet) memadatkan konsep OSI jadi 4 lapisan yang benar-benar dipakai: Network Access (gabungan Physical+Data Link OSI), Internet (setara Network OSI - di sinilah IP hidup), Transport (setara Transport OSI - TCP/UDP), dan Application (menggabungkan Session+Presentation+Application OSI jadi satu). Setiap lapisan membungkus (encapsulate) data dari lapisan di atasnya dengan header tambahan sebelum diteruskan ke lapisan di bawahnya - proses ini disebut encapsulation saat mengirim, dan dibongkar (decapsulation) satu-satu di sisi penerima.",
        },
        {
          kind: "materi",
          title: "Memakai model lapisan untuk troubleshooting",
          body: "Kegunaan praktis terbesar dari kedua model ini adalah mempersempit dugaan saat ada masalah jaringan. Kabel putus atau NIC mati adalah masalah Physical/layer 1. Switch salah konfigurasi VLAN adalah masalah Data Link/layer 2. IP salah subnet atau routing salah arah adalah masalah Network/layer 3. Koneksi TCP yang terus-menerus reset adalah masalah Transport/layer 4. Website tidak bisa diakses padahal ping ke server-nya berhasil biasanya masalah Application/layer 7 (misal DNS salah, atau web server-nya sendiri yang error) - bukan masalah jaringan dasar sama sekali. Kebiasaan bertanya 'ini masalah di layer berapa?' akan mempercepat diagnosis di seluruh roadmap ini, terutama saat masuk fase Ethical Hacking.",
        },
        {
          kind: "praktik",
          title: "Petakan hasil traceroute ke lapisan OSI",
          instructions: [
            "Jalankan `traceroute 8.8.8.8` (Linux/Mac) atau `tracert 8.8.8.8` (Windows).",
            "Catat setiap hop: nomor urut, IP, waktu respons (ms), dan apakah ada timeout (*).",
            "Untuk 3 hop pertama, tuliskan protokol/lapisan apa saja yang terlibat supaya paket bisa sampai ke hop berikutnya (Physical untuk sinyal fisik, Data Link untuk pengalamatan MAC per segmen, Network untuk routing IP antar-hop).",
            "Bandingkan waktu respons hop pertama (biasanya router/modem-mu sendiri) dengan hop terakhir (8.8.8.8) - jelaskan kenapa biasanya makin jauh hop, makin besar (atau makin fluktuatif) waktunya.",
          ],
          proof:
            "File teks berisi output traceroute lengkap dengan anotasi lapisan OSI di 3 hop pertama, plus satu kalimat perbandingan waktu respons hop pertama vs terakhir.",
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
          title: "Anatomi alamat IPv4: network vs host",
          body: "Alamat IPv4 punya 32 bit, biasa ditulis 4 angka desimal dipisah titik (misal 192.168.10.5), tapi di baliknya itu murni angka biner. Subnet mask (misal 255.255.255.0) atau notasi CIDR (`/24`) menentukan berapa bit dari 32 bit itu dianggap bagian 'network' (identitas jaringan) dan sisanya bagian 'host' (identitas perangkat di jaringan itu). Dua perangkat bisa saling komunikasi langsung tanpa lewat router hanya kalau bagian network alamat mereka sama persis.",
        },
        {
          kind: "materi",
          title: "CIDR notation dan hubungannya dengan jumlah host",
          body: "Notasi CIDR (`/24`, `/26`, `/30`, dst) menyatakan berapa bit dipakai untuk bagian network, dihitung dari kiri. Semakin besar angka setelah garis miring, semakin sedikit bit tersisa untuk bagian host, sehingga semakin sedikit alamat yang bisa dipakai di subnet itu. Rumusnya: total alamat dalam satu subnet = 2 pangkat (jumlah bit host tersisa). Untuk `/24` (24 bit network, 8 bit host tersisa) itu 2^8 = 256 alamat total; untuk `/26` (26 bit network, 6 bit host tersisa) itu 2^6 = 64 alamat total.",
        },
        {
          kind: "materi",
          title: "Network address, broadcast address, dan usable range",
          body: "Dari total alamat dalam satu subnet, dua di antaranya selalu 'dipesan' dan tidak boleh dipakai perangkat: alamat pertama (semua bit host = 0) jadi network address, yaitu identitas subnet itu sendiri; alamat terakhir (semua bit host = 1) jadi broadcast address, dipakai untuk mengirim paket ke SEMUA perangkat di subnet itu sekaligus. Sisanya, di antara keduanya, adalah usable range - alamat yang benar-benar boleh dipasang ke perangkat. Jadi untuk `/24` (256 total) ada 254 usable, untuk `/26` (64 total) ada 62 usable, dan seterusnya (total dikurangi 2).",
        },
        {
          kind: "praktik",
          title: "Bagi satu blok /24 jadi 4 subnet",
          instructions: [
            "Ambil blok 192.168.10.0/24.",
            "Bagi manual jadi 4 subnet dengan ukuran sama - karena butuh 4 subnet, pinjam 2 bit dari bagian host, jadi masing-masing subnet berukuran /26.",
            "Untuk tiap subnet, tulis: network address, broadcast address, dan rentang IP yang bisa dipakai host (usable range).",
            "Cek hasil hitunganmu dengan kalkulator subnet online atau `ipcalc 192.168.10.0/26` (`ipcalc 192.168.10.64/26`, dst untuk subnet berikutnya).",
            "Jelaskan dengan kata-katamu sendiri kenapa subnet kedua dimulai dari 192.168.10.64, bukan 192.168.10.63 atau 192.168.10.65.",
          ],
          proof:
            "Tabel 4 baris (satu per subnet) berisi network, broadcast, dan usable range, cocok dengan hasil ipcalc, plus penjelasan singkat batas antar-subnet.",
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
          title: "TCP: koneksi yang dijamin, lewat three-way handshake",
          body: "TCP (Transmission Control Protocol) membangun koneksi eksplisit sebelum mengirim data lewat proses yang disebut three-way handshake: client mengirim SYN (synchronize, 'saya mau konek'), server membalas SYN-ACK (mengonfirmasi sekaligus mengirim SYN-nya sendiri), lalu client menutup dengan ACK (acknowledge). Setelah handshake selesai, TCP menjamin data sampai utuh dan berurutan lewat nomor urut (sequence number) dan acknowledgement per segmen - kalau ada segmen hilang, TCP akan mengirim ulang. Jaminan ini ada harganya: overhead lebih besar dan lebih lambat dibanding UDP.",
        },
        {
          kind: "materi",
          title: "UDP: cepat, tanpa jaminan",
          body: "UDP (User Datagram Protocol) tidak melakukan handshake apa pun dan tidak menjamin data sampai atau berurutan - kalau ada datagram hilang di tengah jalan, UDP tidak akan mengirim ulang, aplikasi di atasnyalah yang harus menangani (atau mengabaikan) kehilangan itu. Trade-off ini disengaja: dengan menghilangkan overhead handshake dan jaminan pengiriman, UDP jauh lebih cepat dan ringan, cocok untuk kasus yang lebih mementingkan kecepatan daripada kesempurnaan tiap paket, seperti DNS query (satu request-response singkat, kalau gagal tinggal ulang) dan video/audio streaming (kehilangan satu frame lebih baik daripada nunggu retransmisi bikin lag).",
        },
        {
          kind: "materi",
          title: "Port: alamat aplikasi di dalam satu host",
          body: "Kalau IP address menentukan host mana yang dituju, nomor port (0-65535) menentukan aplikasi/proses mana di host itu yang menerima data. Port 0-1023 disebut well-known ports, dipesan untuk layanan standar yang sama di seluruh dunia (HTTP=80, HTTPS=443, SSH=22, DNS=53, FTP=21) sehingga client tidak perlu menebak-nebak port aplikasi umum. Port 1024-49151 adalah registered ports (didaftarkan vendor untuk aplikasi tertentu), dan 49152-65535 adalah dynamic/private ports yang biasanya dipakai sementara oleh client saat membuka koneksi keluar. Kombinasi (IP, port, protokol) inilah yang membentuk satu koneksi jaringan yang unik.",
        },
        {
          kind: "praktik",
          title: "Audit port yang terbuka di komputermu sendiri",
          instructions: [
            "Jalankan `ss -tulpn` (Linux) atau `netstat -ano` (Windows) untuk melihat semua port yang sedang listening.",
            "Pilih 5 baris hasil, catat: port, proses/aplikasi, dan protokol (TCP/UDP).",
            "Untuk tiap baris, cari tahu port itu untuk layanan apa (misal 443 = HTTPS, 631 = printer/CUPS) dan jelaskan kenapa TCP atau UDP dipilih untuk layanan itu.",
            "Jalankan `nmap -sV localhost` dan bandingkan hasilnya dengan daftar `ss`/`netstat`-mu - apakah nmap melihat port yang sama persis, dan kenapa hasil dari mesin sendiri (internal) bisa berbeda dengan hasil scan dari luar jaringan.",
          ],
          proof:
            "Tabel 5 baris: port, proses, protokol, nama layanan, dan alasan pemilihan TCP/UDP, plus satu kalimat perbandingan hasil ss/netstat vs nmap.",
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
          title: "Bagaimana switch belajar dan meneruskan frame",
          body: "Switch beroperasi di layer 2 (Data Link), meneruskan frame berdasarkan MAC address, bukan IP address. Switch membangun MAC address table secara otomatis dengan mengamati port mana yang mengirim frame dari MAC address tertentu (proses ini disebut MAC learning) - begitu tabel terisi, switch bisa meneruskan frame langsung ke port tujuan tanpa broadcast ke semua port. Kalau MAC tujuan belum ada di tabel (atau memang frame broadcast), switch akan flooding: mengirim frame itu ke semua port kecuali port asalnya.",
        },
        {
          kind: "materi",
          title: "Broadcast domain dan masalah satu switch besar",
          body: "Secara default, semua port di satu switch fisik berada dalam satu broadcast domain yang sama - artinya satu frame broadcast (misal ARP request) akan sampai ke SEMUA perangkat yang terhubung ke switch itu, bahkan yang tidak relevan. Di jaringan besar, ini jadi masalah: makin banyak perangkat, makin banyak broadcast traffic yang harus diproses tiap perangkat (broadcast storm dalam kasus ekstrem), dan secara keamanan, semua perangkat bisa saling 'melihat' traffic broadcast satu sama lain tanpa segmentasi apa pun.",
        },
        {
          kind: "materi",
          title: "VLAN: memecah satu switch fisik jadi banyak jaringan logis",
          body: "VLAN (Virtual LAN) memecah satu switch fisik jadi beberapa broadcast domain terpisah secara logis, tanpa perlu switch fisik terpisah untuk tiap jaringan. Port switch dikonfigurasi masuk VLAN tertentu (`switchport access vlan 10`), dan perangkat di VLAN berbeda tidak bisa saling melihat traffic broadcast satu sama lain - untuk saling berkomunikasi, traffic itu harus lewat router (inter-VLAN routing) yang bisa diberi firewall/ACL. Ini jadi dasar segmentasi jaringan untuk keamanan: memisahkan jaringan tamu dari jaringan internal, atau memisahkan server database dari jaringan user umum. Standar 802.1Q mendefinisikan cara menambahkan tag VLAN ID ke header Ethernet frame, sehingga satu link fisik (disebut trunk) bisa membawa traffic banyak VLAN sekaligus antar-switch.",
        },
        {
          kind: "praktik",
          title: "Bangun 2 VLAN di Cisco Packet Tracer",
          instructions: [
            "Install Cisco Packet Tracer (gratis lewat akun NetAcad).",
            "Buat topologi: 1 switch, 4 PC, 2 di antaranya dihubungkan ke port yang akan masuk VLAN 10 dan 2 lainnya ke port VLAN 20.",
            "Konfigurasi port switch dengan `switchport access vlan 10` (untuk PC pertama dan kedua) dan `switchport access vlan 20` (untuk PC ketiga dan keempat), lalu beri IP di subnet yang sama untuk tiap PC agar variabel yang diuji murni VLAN, bukan subnetting.",
            "Buktikan PC di VLAN 10 tidak bisa ping PC di VLAN 20, tapi bisa ping sesama VLAN 10.",
            "Jalankan `show vlan brief` di switch dan cocokkan hasilnya dengan port yang sudah kamu konfigurasi.",
          ],
          proof:
            "Screenshot hasil ping gagal antar-VLAN dan berhasil dalam VLAN yang sama, plus output `show vlan brief` dan konfigurasi port switch-nya.",
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
          title: "Routing table: peta keputusan router",
          body: "Router beroperasi di layer 3 (Network), meneruskan paket antar-network berbeda berdasarkan routing table - daftar yang memetakan network tujuan ke interface/gateway mana paket harus diteruskan. Untuk tiap paket masuk, router membandingkan alamat IP tujuan dengan entry-entry di routing table, dan memilih entry yang paling spesifik (longest prefix match) - kalau ada entry untuk `10.0.0.0/8` dan `10.0.1.0/24`, paket menuju `10.0.1.5` akan mengikuti entry `/24` yang lebih spesifik, bukan yang `/8`.",
        },
        {
          kind: "materi",
          title: "Default route: jalur terakhir kalau tidak ada yang cocok",
          body: "Default route (ditulis `0.0.0.0/0` di banyak sistem) adalah entry khusus yang cocok dengan SEMUA alamat tujuan yang tidak match entry lain yang lebih spesifik - fungsinya sebagai 'jalur terakhir'. Di level host (komputer/laptop biasa), default route ini sering disebut default gateway, yaitu router yang jadi 'pintu keluar' setiap kali host mau mengirim paket ke network yang bukan network lokalnya sendiri, termasuk ke internet.",
        },
        {
          kind: "materi",
          title: "Static route vs dynamic routing",
          body: "Static route dikonfigurasi manual satu-satu oleh admin jaringan - cocok untuk jaringan kecil/stabil karena sederhana dan predictable, tapi tidak scalable untuk jaringan besar yang topologinya sering berubah. Dynamic routing protocol seperti OSPF (dipakai di dalam satu organisasi) dan BGP (dipakai untuk routing antar-organisasi/ISP di internet) membiarkan router saling bertukar informasi routing secara otomatis dan menyesuaikan diri kalau ada link yang mati. Materi dynamic routing secara mendalam ada di luar cakupan roadmap ini, tapi memahami routing table itu sendiri (cara membacanya, cara menambah entry manual) sudah cukup untuk level dasar Network+.",
        },
        {
          kind: "praktik",
          title: "Baca dan modifikasi routing table sendiri",
          instructions: [
            "Jalankan `ip route` (Linux) atau `route print` (Windows) dan salin outputnya.",
            "Jelaskan baris default gateway (biasanya ditandai `default via ...`) dan satu baris route lain, apa arti masing-masing kolom (destination, gateway, interface).",
            "Tambahkan satu static route sementara ke network fiktif, misal `sudo ip route add 10.99.0.0/24 via <gateway-mu>`.",
            "Verifikasi route baru muncul di `ip route`, lalu hapus lagi dengan `sudo ip route del 10.99.0.0/24`.",
            "Jelaskan kenapa route yang kamu tambahkan tadi tidak benar-benar bisa dipakai berkomunikasi (karena network `10.99.0.0/24` itu fiktif, tidak ada yang menjawab di sana) - route hanya menentukan KE MANA paket dikirim, bukan menjamin ada yang menjawab di ujung sana.",
          ],
          proof:
            "Output `ip route` sebelum dan sesudah penambahan/penghapusan static route, dengan penjelasan tiap kolom dan kenapa route fiktif tidak benar-benar fungsional.",
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
          title: "Standar 802.11: kecepatan dan frekuensi",
          body: "Jaringan wireless mengikuti keluarga standar IEEE 802.11, dengan huruf akhiran menandai generasi: 802.11b/g/n beroperasi di frekuensi 2.4GHz (jangkauan lebih jauh, lebih banyak interferensi karena dipakai banyak perangkat lain seperti microwave dan Bluetooth), sementara 802.11a/n/ac/ax bisa memakai 5GHz (lebih cepat, jangkauan lebih pendek, lebih sedikit interferensi). Nama pemasaran yang lebih dikenal umum: Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6 (802.11ax) - tiap generasi menaikkan kecepatan maksimum dan efisiensi spektrum.",
        },
        {
          kind: "materi",
          title: "Evolusi enkripsi Wi-Fi: dari WEP yang rapuh sampai WPA3",
          body: "WEP (Wired Equivalent Privacy) adalah standar enkripsi Wi-Fi paling awal, memakai kunci statis dan algoritma RC4 yang punya kelemahan kriptografi fundamental - bisa dibobol dalam hitungan menit dengan tool yang tersedia bebas, sehingga sudah lama tidak boleh dipakai. WPA (Wi-Fi Protected Access) diperkenalkan sebagai perbaikan sementara sambil menunggu standar baru, memperbaiki sebagian kelemahan WEP tapi masih memakai RC4 di baliknya. WPA2 mengganti total dengan AES (algoritma enkripsi yang jauh lebih kuat) dan jadi standar aman selama bertahun-tahun. WPA3 adalah generasi terbaru, menambah perlindungan terhadap serangan offline dictionary/brute-force pada proses handshake dan mewajibkan forward secrecy (kompromi satu sesi tidak membocorkan sesi lain).",
        },
        {
          kind: "materi",
          title: "Risiko praktis di jaringan wireless terbuka",
          body: "SSID yang terbuka (Open, tanpa enkripsi sama sekali) berarti semua traffic yang lewat udara bisa disadap siapa pun yang berada dalam jangkauan sinyal, tanpa perlu 'membobol' apa pun - ini biasa ditemui di Wi-Fi publik (kafe, bandara). Jaringan yang masih memakai WEP secara praktis setara dengan tanpa enkripsi, karena kuncinya bisa dipecahkan dengan cepat. Selain jenis enkripsi, kekuatan sinyal dan channel yang dipakai juga memengaruhi kualitas koneksi - channel yang overlap dengan banyak jaringan tetangga (umum terjadi di 2.4GHz karena cuma ada channel 1/6/11 yang tidak overlap) menyebabkan interferensi dan koneksi lambat meski keamanannya sudah kuat.",
        },
        {
          kind: "praktik",
          title: "Survei keamanan Wi-Fi di sekitarmu",
          instructions: [
            "Jalankan `nmcli dev wifi list` (Linux) atau buka daftar Wi-Fi di HP dengan aplikasi WiFi Analyzer.",
            "Catat 5 SSID: channel, kekuatan sinyal, dan jenis keamanan (Open/WEP/WPA/WPA2/WPA3).",
            "Identifikasi mana yang paling lemah keamanannya dan jelaskan risikonya secara konkret (misal: data apa yang bisa disadap kalau ada penyerang di dekat SSID itu).",
            "Cek apakah ada dua atau lebih SSID yang memakai channel sama persis di 2.4GHz - jelaskan potensi dampaknya ke kecepatan koneksi (bukan ke keamanan).",
          ],
          proof:
            "Tabel 5 SSID dengan kolom channel, sinyal, jenis keamanan, dan analisis satu jaringan paling rentan beserta potensi tumpang-tindih channel.",
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
          title: "DNS: menerjemahkan nama jadi alamat",
          body: "DNS (Domain Name System) menerjemahkan nama domain yang mudah diingat manusia (misal github.com) jadi IP address yang dipakai komputer untuk benar-benar berkomunikasi. Beberapa jenis record DNS yang paling sering ditemui: A record memetakan domain ke IPv4, AAAA record memetakan ke IPv6, MX record menunjuk mail server yang menangani email domain itu, NS record menunjuk name server otoritatif untuk domain itu, dan CNAME record memetakan satu nama domain sebagai alias ke domain lain. Proses resolusi DNS biasanya berjalan bertingkat: resolver di komputermu bertanya ke DNS server (misal 8.8.8.8), yang kalau belum punya jawabannya di cache akan bertanya lebih jauh ke root server, lalu TLD server (.com, .org, dst), sampai akhirnya ke name server otoritatif domain itu.",
        },
        {
          kind: "materi",
          title: "DHCP: konfigurasi IP otomatis untuk perangkat baru",
          body: "DHCP (Dynamic Host Configuration Protocol) membagikan konfigurasi jaringan secara otomatis ke perangkat baru yang masuk jaringan, sehingga tidak perlu mengatur IP secara manual satu per satu. Prosesnya dikenal sebagai DORA: Discover (perangkat baru broadcast mencari DHCP server), Offer (DHCP server menawarkan satu IP dari pool-nya), Request (perangkat meminta IP yang ditawarkan itu), Acknowledge (DHCP server mengonfirmasi dan mengirim detail lengkap: IP, subnet mask, default gateway, DNS server). IP yang dibagikan biasanya punya masa sewa (lease time) - perangkat harus memperbarui sewa itu secara berkala atau IP-nya bisa dipakai perangkat lain.",
        },
        {
          kind: "materi",
          title: "NAT: berbagi satu IP publik untuk banyak perangkat",
          body: "NAT (Network Address Translation) menerjemahkan IP privat (rentang seperti 192.168.x.x, 10.x.x.x, 172.16-31.x.x yang tidak bisa dirutekan langsung di internet publik) menjadi satu IP publik saat traffic keluar ke internet, dan menerjemahkannya kembali saat response masuk. Bentuk yang paling umum di jaringan rumah/kantor adalah PAT (Port Address Translation, sering disebut juga NAT overload) - router melacak koneksi keluar berdasarkan kombinasi IP privat + port, sehingga banyak perangkat internal bisa berbagi satu IP publik yang sama secara bersamaan tanpa saling bentrok. Efek samping NAT: perangkat di internet publik tidak bisa memulai koneksi langsung ke perangkat di belakang NAT tanpa konfigurasi tambahan (port forwarding) - inilah kenapa server yang mau diakses dari luar biasanya butuh setting port forwarding di router.",
        },
        {
          kind: "praktik",
          title: "Bongkar record DNS satu domain",
          instructions: [
            "Pilih satu domain, misal domain kampus/kantor atau `github.com`.",
            "Jalankan `dig domain.com A`, `dig domain.com MX`, `dig domain.com NS`, dan `dig domain.com AAAA`.",
            "Untuk tiap hasil, jelaskan record itu dipakai untuk apa dan nilai apa yang dikembalikan.",
            "Jalankan `ip addr` (Linux) atau `ipconfig` (Windows) di komputermu, catat IP yang kamu dapat - apakah itu IP privat (192.168.x.x/10.x.x.x/172.16-31.x.x)? Jelaskan kaitannya dengan NAT di router rumah/kantormu.",
          ],
          proof:
            "Output 4 query dig beserta penjelasan singkat fungsi tiap jenis record, plus IP lokal komputermu dan penjelasan hubungannya dengan NAT.",
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

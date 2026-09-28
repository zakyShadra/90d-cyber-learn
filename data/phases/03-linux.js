// Fase 3: Linux
export default {
  id: "linux",
  number: 3,
  title: "Linux",
  dayRange: "Hari 15–28",
  summary:
    "Linux adalah sistem operasi dominan di server, alat security, dan lab hacking. Bagian ini fokus ke command line sampai kamu nyaman tanpa GUI.",
  resources: [
    {
      label: "Linux Journey",
      url: "https://linuxjourney.com/",
    },
    {
      label: "Linux Unhatched - Cisco NetAcad",
      url: "https://www.netacad.com/courses/linux-unhatched",
    },
    {
      label: "LabEx - Linux Hands-on Labs",
      url: "https://labex.io/free-labs/linux",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 15",
      title: "Navigasi Filesystem dan find",
      steps: [
        {
          kind: "materi",
          title: "Filesystem Hierarchy Standard: peta direktori Linux",
          body: "Linux mengikuti Filesystem Hierarchy Standard (FHS), konvensi yang membuat hampir semua distro punya struktur direktori yang mirip. `/etc` menyimpan file konfigurasi sistem, `/var` menyimpan data yang berubah-ubah seiring waktu (log di `/var/log`, cache, spool mail), `/home` menyimpan data pribadi tiap user, `/bin` dan `/usr/bin` menyimpan executable yang bisa dijalankan siapa pun, `/tmp` menyimpan file sementara yang biasanya dibersihkan otomatis saat reboot, dan `/root` adalah home directory khusus user root (beda dari `/`, root directory sistem). Mengenal peta ini membantu menebak 'kira-kira file yang kucari ada di mana' tanpa harus menjelajah acak.",
        },
        {
          kind: "materi",
          title: "find: mencari berdasarkan kriteria, bukan cuma nama",
          body: "Daripada menghafal semua isi direktori, `find` jauh lebih powerful karena bisa mencari berdasarkan kombinasi kriteria: nama (`-name`), tipe file (`-type f` untuk file, `-type d` untuk direktori), ukuran (`-size`), waktu modifikasi (`-mtime`), sampai permission (`-perm`). Sintaksnya `find <lokasi-mulai> <kriteria>` - misal `find /home -name '*.log'` mencari semua file `.log` di dalam `/home`. Kriteria bisa digabung untuk pencarian yang sangat spesifik, misal 'file di atas 50MB yang diubah dalam 7 hari terakhir' sekaligus dalam satu command, jauh lebih cepat daripada menjelajah manual satu-satu.",
        },
        {
          kind: "materi",
          title: "Kenapa ini relevan untuk security",
          body: "Kemampuan mencari cepat lewat kriteria adalah skill inti investigasi/forensik dasar: file yang baru diubah bisa jadi indikasi ada yang mengutak-atik sistem, file berukuran tidak wajar bisa jadi data yang di-exfiltrate atau disembunyikan, dan file dengan permission tidak wajar (misal writable oleh semua orang) bisa jadi celah privilege escalation. Kebiasaan menjalankan `find` dengan kriteria yang tepat, alih-alih menjelajah GUI, akan terus dipakai di hampir semua fase praktik roadmap ini, termasuk saat masuk fase Ethical Hacking nanti.",
        },
        {
          kind: "praktik",
          title: "Cari file besar dan file yang baru diubah",
          instructions: [
            "Jalankan `find / -type f -size +100M 2>/dev/null` untuk cari file di atas 100MB.",
            "Jalankan `find / -type f -mtime -1 2>/dev/null` untuk cari file yang diubah 24 jam terakhir.",
            "Simpan kedua hasil ke file terpisah dengan `>` dan tinjau apakah ada yang mencurigakan.",
            "Jelaskan fungsi `2>/dev/null` di kedua command itu - kenapa ditambahkan, dan apa yang terjadi kalau dihapus.",
          ],
          proof:
            "Dua file output (file besar, file baru diubah) beserta catatan singkat hasil peninjauan dan penjelasan fungsi 2>/dev/null.",
        },
        {
          kind: "kuis",
          question:
            "Direktori mana menurut FHS yang menyimpan file konfigurasi sistem?",
          inputType: "text",
          placeholder: "contoh: /home",
          accepted: ["/etc", "etc"],
          explanation:
            "/etc menyimpan hampir semua file konfigurasi sistem, dari daftar user (/etc/passwd) sampai konfigurasi SSH (/etc/ssh/sshd_config).",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 16",
      title: "Disk dan Filesystem Management",
      steps: [
        {
          kind: "materi",
          title: "df: melihat kapasitas dari sudut pandang filesystem",
          body: "`df -h` (disk free, human-readable) menampilkan penggunaan tiap filesystem yang ter-mount: total kapasitas, terpakai, tersisa, dan persentase penuh, dalam satuan yang mudah dibaca (K/M/G, bukan byte mentah). Ini jawaban pertama untuk pertanyaan 'disk-ku penuh di mount point mana'. Kolom `Mounted on` menunjukkan di direktori mana filesystem itu 'ditempelkan' - sistem Linux bisa punya banyak filesystem berbeda (disk fisik berbeda, partisi berbeda) yang semuanya terlihat sebagai satu hierarki direktori tunggal berkat mounting ini.",
        },
        {
          kind: "materi",
          title: "du: mencari siapa biang keladi disk penuh",
          body: "`df` memberi tahu filesystem MANA yang penuh, tapi tidak memberi tahu FOLDER mana penyebabnya - di sinilah `du` (disk usage) berperan. `du -sh <folder>` menghitung total ukuran satu folder (rekursif ke semua isinya) dalam format ringkas. Untuk mencari biang keladi, pola umum adalah `du -sh /path/* | sort -rh | head` - menghitung ukuran tiap sub-folder, urutkan dari terbesar, ambil beberapa teratas. Kombinasi `df` (menemukan filesystem mana yang penuh) lalu `du` (menelusuri turun untuk menemukan folder spesifik penyebabnya) adalah alur diagnosis standar untuk masalah disk penuh.",
        },
        {
          kind: "materi",
          title: "lsblk: melihat struktur fisik di baliknya",
          body: "`lsblk` (list block devices) menampilkan struktur perangkat block secara fisik - disk apa saja yang terpasang (`/dev/sda`, `/dev/nvme0n1`, dst), bagaimana disk itu dipartisi, dan partisi mana yang di-mount ke direktori mana. Ini melengkapi gambaran dari `df`/`du`: `df`/`du` bicara soal filesystem dan folder (lapisan logis), `lsblk` bicara soal disk dan partisi (lapisan fisik) yang menjadi dasar filesystem itu berdiri. Berguna saat troubleshooting lebih dalam, misal memastikan partisi root benar-benar ter-mount di device yang diharapkan, atau saat menambah disk baru ke sistem.",
        },
        {
          kind: "praktik",
          title: "Audit penggunaan disk sistemmu",
          instructions: [
            "Jalankan `df -h` dan identifikasi filesystem mana yang paling penuh (persentase tertinggi).",
            "Jalankan `du -sh /var/log` untuk lihat seberapa besar log sistem.",
            "Jalankan `du -sh /var/log/* | sort -rh | head -5` untuk menemukan 5 sub-folder/file log terbesar.",
            "Jalankan `lsblk` dan identifikasi partisi mana yang di-mount sebagai `/`.",
          ],
          proof:
            "Output keempat command dengan anotasi: filesystem paling penuh, ukuran /var/log, 5 kontributor terbesar di dalamnya, dan nama device partisi root.",
        },
        {
          kind: "kuis",
          question:
            "Command apa yang menampilkan penggunaan disk per filesystem dalam format human-readable?",
          inputType: "text",
          placeholder: "contoh: du -sh",
          accepted: ["df -h", "df"],
          explanation:
            "`df -h` (disk free, human-readable) menunjukkan kapasitas, terpakai, dan tersisa per filesystem yang ter-mount.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 17",
      title: "Permission dan Kepemilikan File",
      steps: [
        {
          kind: "materi",
          title: "rwx untuk owner, group, others",
          body: "Setiap file/direktori di Linux punya tiga set permission: untuk owner (pemilik file), group (grup yang ditempeli file itu), dan others (semua user lain). Tiap set terdiri dari tiga hak: read (r, bisa dibaca/dilihat isinya), write (w, bisa diubah/dihapus), execute (x, bisa dijalankan kalau itu file program/script, atau bisa 'masuk' kalau itu direktori). `ls -l` menampilkan kesembilan karakter ini berurutan, misal `rwxr-xr-x` berarti owner punya full akses (rwx), group dan others cuma bisa baca+eksekusi (r-x) tapi tidak bisa menulis/mengubah.",
        },
        {
          kind: "materi",
          title: "Notasi oktal: mengubah rwx jadi satu angka",
          body: "Karena mengetik `chmod u+rwx,g+rx,o+rx` panjang, permission sering direpresentasikan sebagai angka oktal: r=4, w=2, x=1, dijumlahkan per set. rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, r-- = 4+0+0 = 4, dan seterusnya. Tiga digit oktal (misal 755) langsung merepresentasikan owner-group-others sekaligus: 7 (rwx untuk owner), 5 (r-x untuk group), 5 (r-x untuk others). `chmod 755 file` mengubah permission file itu langsung ke kombinasi itu dalam satu perintah, jauh lebih cepat diketik daripada notasi simbolik.",
        },
        {
          kind: "materi",
          title: "SUID: menjalankan file dengan hak akses pemiliknya",
          body: "SUID (Set User ID) bit membuat sebuah executable, saat dijalankan SIAPA PUN, berjalan dengan hak akses PEMILIK file itu, bukan hak akses user yang menjalankannya. Contoh sah: `/usr/bin/passwd` punya SUID root, sehingga user biasa bisa mengubah passwordnya sendiri (yang butuh menulis ke `/etc/shadow`, file yang normalnya cuma bisa ditulis root) tanpa perlu diberi akses root penuh. Masalahnya: kalau ada binary dengan SUID root yang salah konfigurasi atau punya bug, siapa pun yang bisa menjalankannya berpotensi mendapat eksekusi kode dengan hak akses root - inilah kenapa mencari binary SUID yang tidak wajar (`find / -perm -4000`) adalah salah satu teknik privilege escalation paling dasar dalam pentest, dan akan muncul lagi saat fase Ethical Hacking.",
        },
        {
          kind: "praktik",
          title: "Ubah permission dan cari binary SUID",
          instructions: [
            "Buat file script `test.sh`, cek permission default-nya dengan `ls -l`.",
            "Ubah ke 755 dengan `chmod 755 test.sh`, verifikasi dengan `ls -l` lagi dan jelaskan arti tiap digit.",
            "Jalankan `find / -perm -4000 -type f 2>/dev/null` untuk cari semua binary SUID.",
            "Pilih 3 hasil dan jelaskan kenapa masing-masing butuh SUID (misal `passwd`, `sudo`, `ping`).",
            "Bayangkan skenario: salah satu binary SUID itu bisa membaca file arbitrer - jelaskan kenapa itu berbahaya kalau pemiliknya root.",
          ],
          proof:
            "Output ls -l sebelum/sesudah chmod dengan penjelasan digit oktal, daftar binary SUID, penjelasan 3 di antaranya, dan analisis skenario bahaya.",
        },
        {
          kind: "kuis",
          question: "Berapa nilai oktal untuk permission rwxr-xr-x?",
          inputType: "text",
          placeholder: "contoh: 644",
          accepted: ["755"],
          explanation:
            "rwx = 7 (owner), r-x = 5 (group), r-x = 5 (others) → 755.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 18",
      title: "User dan Group Management",
      steps: [
        {
          kind: "materi",
          title: "/etc/passwd dan /etc/shadow: dua file, dua fungsi berbeda",
          body: "Setiap user tercatat di `/etc/passwd` sebagai satu baris berisi username, UID, GID, home directory, dan shell default - file ini bisa DIBACA semua user (perlu, supaya command seperti `ls -l` bisa menerjemahkan UID jadi nama). Password HASH-nya (bukan password asli, karena disimpan sudah di-hash) ada di `/etc/shadow`, file terpisah yang HANYA bisa dibaca root - pemisahan ini disengaja demi keamanan, karena kalau hash password ikut tersimpan di file yang semua orang bisa baca (seperti dulu di sistem Unix lama), siapa pun bisa mencoba crack hash itu secara offline.",
        },
        {
          kind: "materi",
          title: "Group: mengelompokkan user untuk akses bersama",
          body: "Group mengelompokkan beberapa user yang perlu berbagi akses ke resource yang sama, tanpa harus mengatur permission satu-satu per user. Satu user bisa jadi anggota banyak group sekaligus - satu group primer (dicatat di `/etc/passwd`) dan beberapa group sekunder (dicatat di `/etc/group`). Kalau sebuah file di-set kepemilikan group `netops` dengan permission group rw, semua anggota `netops` otomatis bisa membaca dan menulis file itu tanpa perlu permission `others` yang longgar ke semua user di sistem.",
        },
        {
          kind: "materi",
          title: "sudo: akses administratif tanpa membagikan password root",
          body: "Sudo memberi user biasa kemampuan menjalankan command tertentu dengan hak akses root, TANPA perlu tahu password root sama sekali - user cukup memasukkan password miliknya sendiri (atau tanpa password sama sekali kalau dikonfigurasi begitu). Konfigurasi sudo bisa sangat presisi lewat file di `/etc/sudoers.d/`: bukan cuma 'boleh sudo atau tidak', tapi bisa dibatasi ke command SPESIFIK saja (misal group tertentu cuma boleh menjalankan `systemctl status sshd` lewat sudo, tidak bisa command lain). Ini penerapan langsung prinsip least privilege dari fase Security+ - beri akses administratif seminimal dan sespesifik mungkin sesuai kebutuhan.",
        },
        {
          kind: "praktik",
          title: "Buat user dengan sudo access terbatas ke satu command",
          instructions: [
            "Buat user baru: `sudo useradd -m budi` lalu set password dengan `sudo passwd budi`.",
            "Buat group baru `netops` dengan `sudo groupadd netops`, lalu masukkan `budi` ke dalamnya dengan `sudo usermod -aG netops budi`.",
            "Di `/etc/sudoers.d/netops` (edit dengan `sudo visudo -f /etc/sudoers.d/netops`), izinkan group `netops` menjalankan hanya `/usr/bin/systemctl status sshd` tanpa password.",
            "Login sebagai `budi` (`su - budi`), buktikan command itu jalan lewat sudo tanpa diminta password.",
            "Sebagai perbandingan, coba jalankan command sudo lain (misal `sudo apt update`) sebagai `budi` dan konfirmasi itu DITOLAK.",
          ],
          proof:
            "Isi file sudoers yang dibuat, bukti command yang diizinkan berhasil, dan bukti command lain lewat sudo ditolak untuk user budi.",
        },
        {
          kind: "kuis",
          question:
            "File apa yang menyimpan password HASH user (bukan /etc/passwd)?",
          inputType: "text",
          placeholder: "contoh: /etc/group",
          accepted: ["/etc/shadow", "etc/shadow", "shadow"],
          explanation:
            "/etc/shadow menyimpan hash password dan hanya bisa dibaca root - /etc/passwd sendiri bisa dibaca semua user dan tidak lagi menyimpan password sejak lama.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 19",
      title: "Package Management",
      steps: [
        {
          kind: "materi",
          title: "Dependency resolution: masalah yang dipecahkan package manager",
          body: "Hampir semua software bergantung pada software/library lain (dependency) untuk bisa berjalan. Menginstal manual berarti harus mencari dan menginstal semua dependency itu satu-satu, dan kalau dua program butuh versi berbeda dari dependency yang sama, bisa terjadi konflik yang rumit ('dependency hell'). Package manager (apt di Debian/Ubuntu, dnf di Fedora, pacman di Arch) memecahkan ini secara otomatis: begitu kamu minta instal satu package, ia menghitung semua dependency yang dibutuhkan, mengunduh versi yang kompatibel, dan memasangnya dalam urutan yang benar - semua dari repository resmi yang sudah diverifikasi.",
        },
        {
          kind: "materi",
          title: "remove vs purge: bedanya file konfigurasi",
          body: "Menghapus package tidak sesederhana kelihatannya - ada dua level. `apt remove` menghapus binary dan sebagian besar file program, TAPI menyisakan file konfigurasi (biasanya di `/etc/`), dengan asumsi kalau kamu instal ulang nanti, konfigurasi lamamu masih ada. `apt purge` menghapus SEMUANYA termasuk file konfigurasi - bersih total, seolah package itu tidak pernah diinstal. Untuk kebutuhan security/investigasi (misal membersihkan tool yang sempat diinstal untuk testing), purge lebih tepat karena tidak meninggalkan jejak konfigurasi yang bisa membingungkan audit berikutnya.",
        },
        {
          kind: "materi",
          title: "Kenapa update rutin itu penting, bukan sekadar rutinitas",
          body: "Package manager juga menangani UPDATE - memperbarui software yang sudah terinstal ke versi terbaru dari repository. Ini bukan sekadar 'dapat fitur baru' - update sering membawa security patch untuk kerentanan yang baru ditemukan (ingat konsep CVE dari fase Security+). Sistem yang jarang di-update menumpuk kerentanan yang sudah diketahui publik dan sudah ada exploit-nya, menjadikannya target empuk. Alur standar: `apt update` (memperbarui DAFTAR package yang tersedia dari repository, belum menginstal apa pun) diikuti `apt upgrade` (benar-benar menginstal versi terbaru dari package yang sudah terpasang) - dua langkah terpisah yang sering disalahpahami sebagai satu hal yang sama.",
        },
        {
          kind: "praktik",
          title: "Install, inspeksi, lalu hapus bersih satu tool",
          instructions: [
            "Jalankan `sudo apt update` dulu untuk memperbarui daftar package.",
            "Install `tcpdump` (kalau belum ada) dengan package manager sistemmu.",
            "Cek dependency-nya (`apt-cache depends tcpdump` atau setara).",
            "Hapus total termasuk file konfigurasi (`sudo apt purge tcpdump` atau setara).",
            "Verifikasi tidak ada file sisa dengan `dpkg -L tcpdump` (harus error/kosong) atau cek manual, dan jelaskan bedanya kalau tadi pakai `apt remove` bukan `purge`.",
          ],
          proof:
            "Output instalasi, daftar dependency, bukti penghapusan bersih tanpa file sisa, dan penjelasan beda remove vs purge.",
        },
        {
          kind: "kuis",
          question:
            "Command apt apa (dua kata) untuk menghapus package BESERTA file konfigurasinya?",
          inputType: "text",
          placeholder: "contoh: apt remove",
          accepted: ["apt purge", "sudo apt purge", "apt-get purge"],
          explanation:
            "`apt remove` hanya menghapus binary-nya; `apt purge` juga menghapus file konfigurasi terkait.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 20",
      title: "Environment Variables dan Shell Profile",
      steps: [
        {
          kind: "materi",
          title: "Environment variable: konfigurasi yang dibaca proses apa pun",
          body: "Environment variable adalah pasangan nama-nilai yang tersimpan di memori sesi shell, dan bisa dibaca oleh proses apa pun yang berjalan di sesi itu (termasuk child process yang di-spawn dari shell tersebut). Contoh umum: `HOME` (lokasi home directory user), `USER` (nama user aktif), `SHELL` (shell default yang dipakai). `echo $NAMA_VARIABLE` menampilkan isinya, `export VAR=nilai` men-set sebuah variable dan membuatnya 'terlihat' oleh child process (tanpa `export`, variable itu cuma dikenal shell saat ini, tidak diwariskan ke proses yang dijalankan darinya).",
        },
        {
          kind: "materi",
          title: "PATH: daftar tempat shell mencari command",
          body: "PATH adalah environment variable paling penting untuk dipahami: isinya daftar direktori (dipisah titik dua `:`) yang dicari shell, URUT dari kiri ke kanan, setiap kali kamu mengetik nama command tanpa path lengkap. Ketika kamu ketik `nmap`, shell tidak tahu itu ada di `/usr/bin/nmap` sampai ia mencari satu-satu direktori di PATH sampai ketemu. Kalau ada dua program dengan nama sama di direktori PATH berbeda, yang dijalankan adalah yang ditemukan LEBIH DULU (direktori yang urutannya lebih kiri di PATH) - inilah kenapa urutan PATH bisa jadi masalah keamanan tersendiri kalau direktori yang bisa ditulis sembarang user ditaruh di urutan awal PATH.",
        },
        {
          kind: "materi",
          title: "~/.bashrc vs ~/.profile: kapan tiap file dijalankan",
          body: "Konfigurasi shell permanen (alias, PATH tambahan, environment variable custom) ditaruh di file yang otomatis dijalankan shell, tapi ada dua kandidat dengan waktu eksekusi berbeda. `~/.bashrc` dijalankan SETIAP kali membuka shell interaktif baru (misal tiap buka tab terminal baru) - cocok untuk alias dan fungsi shell. `~/.profile` (atau `~/.bash_profile`) dijalankan SEKALI saat login (misal login SSH atau login sesi desktop) - cocok untuk environment variable yang cuma perlu di-set sekali per sesi login, bukan tiap buka terminal baru. Setelah mengedit salah satu file ini, perubahan tidak otomatis berlaku di shell yang sudah terbuka - perlu `source ~/.bashrc` atau membuka terminal baru.",
        },
        {
          kind: "praktik",
          title: "Tambahkan direktori ke PATH dan buat alias permanen",
          instructions: [
            "Jalankan `echo $PATH` dan pisahkan isinya per direktori (dipisah tanda `:`).",
            "Tambahkan direktori baru sementara: `export PATH=$PATH:/tmp/mybin`, konfirmasi dengan `echo $PATH` lagi.",
            "Buka terminal/tab baru dan cek `echo $PATH` lagi - jelaskan kenapa perubahan tadi sudah hilang (ini bukti export tadi cuma berlaku di sesi shell itu saja).",
            'Tambahkan satu baris alias (misal `alias ll="ls -la"`) ke `~/.bashrc` supaya permanen.',
            "Jalankan `source ~/.bashrc`, konfirmasi alias `ll` langsung bisa dipakai tanpa perlu membuka terminal baru.",
          ],
          proof:
            "Output echo $PATH sebelum/sesudah, penjelasan kenapa PATH kembali semula di terminal baru, dan bukti alias ll bekerja setelah source.",
        },
        {
          kind: "kuis",
          question:
            "Environment variable apa yang menentukan direktori mana saja yang dicari shell saat kamu mengetik nama command?",
          inputType: "text",
          placeholder: "contoh: HOME",
          accepted: ["path"],
          explanation:
            "PATH adalah daftar direktori (dipisah titik dua) yang dicari berurutan sampai ketemu binary dengan nama yang kamu ketik.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 21",
      title: "Manajemen Proses",
      steps: [
        {
          kind: "materi",
          title: "PID dan siklus hidup proses",
          body: "Setiap proses yang berjalan di Linux punya Process ID (PID) unik, dan status yang berubah sepanjang siklus hidupnya: running (sedang dieksekusi CPU), sleeping (menunggu sesuatu, misal input I/O), stopped (dihentikan sementara, bisa dilanjutkan), atau zombie (proses sudah selesai tapi entry-nya belum dibersihkan oleh parent process). `ps aux` menampilkan snapshot semua proses yang berjalan beserta PID, user pemilik, dan resource yang dipakai; `top`/`htop` menampilkan versi live/real-time yang ter-update terus, berguna untuk memantau proses yang memakan CPU/memory berlebihan.",
        },
        {
          kind: "materi",
          title: "Sinyal: cara berkomunikasi dengan proses yang berjalan",
          body: "Mengirim sinyal adalah cara standar 'berbicara' dengan proses yang sedang berjalan, lewat command `kill` (namanya menyesatkan - sebenarnya mengirim sinyal APA PUN, tidak selalu mematikan). SIGTERM (sinyal 15, default `kill <pid>`) meminta proses berhenti dengan SOPAN - proses itu masih punya kesempatan membersihkan diri (menutup file, menyimpan state) sebelum benar-benar keluar. SIGKILL (sinyal 9, `kill -9 <pid>`) memaksa kernel menghentikan proses SEKETIKA, tanpa proses itu punya kesempatan menangkap atau mengabaikan sinyal itu - dipakai sebagai upaya terakhir kalau SIGTERM tidak direspons (misal proses yang hang total).",
        },
        {
          kind: "materi",
          title: "Proses background: menjalankan tugas panjang tanpa memblokir terminal",
          body: "Menambahkan `&` di akhir command menjalankan proses itu di BACKGROUND - shell langsung kembali menerima input baru, sementara proses tadi tetap jalan. Ini penting untuk task yang berjalan lama (transfer file besar, server sederhana untuk testing) supaya tidak memblokir terminal yang sama. Masalahnya: proses background yang dijalankan dari sesi SSH akan ikut mati begitu sesi SSH itu terputus (sinyal SIGHUP dikirim ke semua child process-nya). `nohup command &` mengatasi ini dengan membuat proses itu mengabaikan SIGHUP, sehingga tetap jalan meski sesi SSH-nya sendiri sudah ditutup - penting untuk task yang harus jalan lama di server jarak jauh.",
        },
        {
          kind: "praktik",
          title: "Jalankan, pantau, dan hentikan proses background",
          instructions: [
            "Jalankan `sleep 300 &` untuk membuat proses background 5 menit.",
            "Cari PID-nya dengan `jobs -l` atau `ps aux | grep sleep`.",
            "Pantau prosesnya lewat `top` atau `htop`, perhatikan statusnya (biasanya 'S' untuk sleeping).",
            "Hentikan dengan `kill -SIGTERM <pid>` (atau cukup `kill <pid>`), verifikasi sudah berhenti dengan `ps -p <pid>`.",
            "Ulangi dengan proses baru, kali ini coba `kill -SIGKILL <pid>` dan jelaskan bedanya secara perilaku dengan SIGTERM tadi.",
          ],
          proof:
            "PID proses, screenshot/output top saat proses berjalan, bukti proses berhenti setelah SIGTERM, dan penjelasan beda SIGTERM vs SIGKILL yang teramati.",
        },
        {
          kind: "kuis",
          question: "Nama sinyal apa yang dikirim oleh `kill -9`?",
          inputType: "text",
          placeholder: "contoh: SIGTERM",
          accepted: ["sigkill"],
          explanation:
            "Sinyal nomor 9 adalah SIGKILL - tidak bisa ditangkap atau diabaikan oleh proses target, langsung dihentikan paksa oleh kernel.",
        },
      ],
    },
    {
      index: 8,
      label: "Hari 22",
      title: "Archiving dan Compression",
      steps: [
        {
          kind: "materi",
          title: "tar: membungkus banyak file jadi satu, TANPA kompresi",
          body: "`tar` (tape archive, nama peninggalan era pita magnetik) awalnya cuma menggabungkan banyak file dan direktori jadi SATU file arsip, mempertahankan struktur folder dan metadata (permission, timestamp) - tapi TIDAK mengompresi apa pun secara default. Flag inti yang selalu dipakai: `c` (create, membuat arsip baru), `x` (extract, membongkar arsip), `v` (verbose, menampilkan progress file yang diproses), `f` (file, diikuti nama file arsip yang dituju/dibaca). Kombinasi paling umum: `tar -cvf archive.tar folder/` untuk membuat, `tar -xvf archive.tar` untuk membongkar.",
        },
        {
          kind: "materi",
          title: "Menambahkan kompresi: -z (gzip) dan -J (xz)",
          body: "Karena tar sendiri tidak mengompresi, biasanya dipasangkan dengan tool kompresi lewat flag tambahan: `-z` memakai gzip (cepat, kompresi sedang, paling umum dipakai - hasil biasanya berekstensi `.tar.gz` atau `.tgz`), `-J` memakai xz (lebih lambat tapi rasio kompresi lebih baik, ekstensi `.tar.xz`). Perintah `tar -czvf data.tar.gz folder/` sebenarnya menjalankan dua proses sekaligus dalam satu command: tar membungkus semua file jadi satu stream, lalu stream itu langsung dikompresi gzip sebelum ditulis ke disk sebagai satu file `.tar.gz`.",
        },
        {
          kind: "materi",
          title: "zip/unzip: alternatif lintas platform",
          body: "Berbeda dari `tar` (native Unix/Linux, kadang tidak dikenali langsung di Windows tanpa tool tambahan), format `.zip` dikenali secara native oleh Windows, Mac, dan Linux sekaligus - format pilihan kalau file harus dibagikan ke pengguna yang mungkin memakai OS berbeda. `zip -r archive.zip folder/` membuat arsip zip (flag `-r` untuk rekursif memasukkan seluruh isi folder), `unzip archive.zip` membongkarnya. Untuk kebutuhan internal antar-server Linux, `tar.gz` tetap jadi pilihan default karena mempertahankan permission Unix dengan lebih baik; untuk berbagi file ke pengguna umum, `.zip` lebih universal.",
        },
        {
          kind: "praktik",
          title: "Bundel dan ekstrak satu folder",
          instructions: [
            "Buat folder `data/` berisi 2 file teks.",
            "Jalankan `tar -czvf data.tar.gz data/` untuk membundel sekaligus mengompresi.",
            "Bandingkan ukuran `data.tar.gz` dengan total ukuran folder aslinya (`du -sh data/`) - jelaskan kenapa hasilnya lebih kecil (atau kalau isinya cuma teks pendek, kenapa bedanya tidak besar).",
            "Hapus folder aslinya, lalu ekstrak lagi dengan `tar -xzvf data.tar.gz`.",
            "Konfirmasi kedua file kembali utuh isinya, dan permission-nya sama seperti sebelum dihapus.",
          ],
          proof:
            "File data.tar.gz, perbandingan ukuran sebelum/sesudah kompresi, dan bukti kedua file di dalamnya utuh setelah folder asli dihapus lalu diekstrak ulang.",
        },
        {
          kind: "kuis",
          question:
            "Flag tar apa (satu huruf) yang dipakai untuk MENGEKSTRAK sebuah archive?",
          inputType: "text",
          placeholder: "contoh: c",
          accepted: ["-x", "x"],
          explanation:
            "`x` untuk extract, berlawanan dengan `c` (create). Biasa digabung: `tar -xzvf`.",
        },
      ],
    },
    {
      index: 9,
      label: "Hari 23",
      title: "Shell Scripting Dasar",
      steps: [
        {
          kind: "materi",
          title: "Variabel dan input: dasar yang membuat script bisa dipakai ulang",
          body: "Variabel di bash disimpan tanpa tipe eksplisit (`nama=nilai`, TANPA spasi di sekitar `=`) dan diakses dengan awalan `$` (`$nama` atau `${nama}`). Script bisa menerima argumen dari command line lewat `$1`, `$2`, dst (`$0` adalah nama script itu sendiri), dan `$#` menghitung jumlah argumen yang diberikan. Kemampuan menerima variabel/argumen inilah yang membuat satu script bisa dipakai ulang untuk banyak situasi berbeda, alih-alih menulis ulang script serupa dengan nilai hardcoded yang berbeda-beda.",
        },
        {
          kind: "materi",
          title: "Kondisional dan loop: mengambil keputusan dan mengulang",
          body: "Struktur `if`/`elif`/`else` mengambil keputusan berdasarkan kondisi (sering diuji dengan `[ kondisi ]` atau `[[ kondisi ]]`, versi lebih modern dengan lebih banyak fitur). Loop `for` mengulang untuk tiap item dalam sebuah daftar (`for f in *.txt; do ...; done` memproses semua file `.txt`), `while` mengulang SELAMA kondisi tertentu masih benar. Kombinasi variabel + kondisional + loop adalah tiga blok bangunan dasar yang cukup untuk menulis automasi yang jauh lebih kompleks daripada menjalankan command satu-satu secara manual.",
        },
        {
          kind: "materi",
          title: "Exit code: bahasa universal untuk 'berhasil atau tidak'",
          body: "Setiap command/script di Unix, ketika selesai, mengembalikan exit code berupa angka: 0 berarti SUKSES, angka non-zero apa pun (1-255) berarti ada jenis kegagalan tertentu (angka spesifiknya kadang punya makna khusus tergantung program). Exit code command TERAKHIR yang dijalankan bisa dicek lewat variabel spesial `$?`, atau langsung dipakai di kondisional (`if command; then ...` otomatis dianggap 'benar' kalau exit code command itu 0). Konvensi ini krusial untuk automasi: script lain, cron job, atau pipeline CI/CD semuanya bergantung pada exit code untuk memutuskan 'lanjut ke langkah berikutnya' atau 'berhenti, ada yang gagal'.",
        },
        {
          kind: "praktik",
          title: "Tulis script peringatan disk usage",
          instructions: [
            "Tulis `disk_alert.sh` yang membaca persentase disk usage dari `df -h /` (perlu ekstrak angka persennya, bisa pakai `awk`/`grep`).",
            'Kalau usage > 80%, print "WARNING: disk usage tinggi" dan exit code 1 (`exit 1`).',
            'Kalau tidak, print "OK" dan exit code 0 (`exit 0`).',
            "Uji dengan mengubah threshold sementara ke angka yang pasti terpicu (misal ke 1%), verifikasi pesan WARNING muncul dan `echo $?` menunjukkan 1.",
            "Kembalikan threshold ke 80% dan jalankan sekali lagi untuk konfirmasi kondisi OK juga tercapai dengan exit code 0.",
          ],
          proof:
            "Isi script disk_alert.sh dan output uji coba yang menunjukkan kedua kondisi (OK dan WARNING) tercapai beserta exit code masing-masing yang dikonfirmasi lewat $?.",
        },
        {
          kind: "kuis",
          question:
            "Exit code berapa yang menandakan sebuah command berhasil dijalankan?",
          inputType: "text",
          placeholder: "contoh: 1",
          accepted: ["0"],
          explanation:
            "Konvensi Unix: 0 = sukses, angka non-zero apa pun = jenis kegagalan tertentu.",
        },
      ],
    },
    {
      index: 10,
      label: "Hari 24",
      title: "Text Processing: grep, sed, awk",
      steps: [
        {
          kind: "materi",
          title: "grep: mencari pola di antara ribuan baris",
          body: "grep (global regular expression print) mencari baris yang cocok dengan sebuah pola, dan mencetak baris itu (bukan cuma bagian yang cocok). Pola bisa berupa teks biasa atau regular expression penuh (`-E` untuk extended regex, mengizinkan `|`, `+`, `{n,m}` tanpa perlu escape berlebihan). Flag yang sering dipakai: `-i` (ignore case, tidak peduli huruf besar/kecil), `-v` (invert match, tampilkan baris yang TIDAK cocok), `-r` (recursive, cari di semua file dalam direktori), `-n` (tampilkan nomor baris). Untuk file log yang berisi ribuan-jutaan baris, grep adalah cara tercepat menyaring baris yang relevan sebelum dianalisis lebih jauh.",
        },
        {
          kind: "materi",
          title: "sed: mengedit teks tanpa membuka editor",
          body: "sed (stream editor) memproses teks baris demi baris dan menerapkan transformasi, paling umum untuk substitusi: `sed 's/lama/baru/'` mengganti kemunculan PERTAMA 'lama' jadi 'baru' di tiap baris, tambahkan `g` di akhir (`s/lama/baru/g`) untuk mengganti SEMUA kemunculan di tiap baris, bukan cuma yang pertama. Flag `-i` mengedit file LANGSUNG di tempat (in-place) alih-alih cuma mencetak hasil ke layar - berguna untuk mengubah banyak file konfigurasi sekaligus lewat script, tapi harus hati-hati karena perubahannya langsung permanen (kecuali diberi backup suffix seperti `sed -i.bak`).",
        },
        {
          kind: "materi",
          title: "awk: mengekstrak dan mengolah kolom seperti spreadsheet",
          body: "awk memperlakukan tiap baris sebagai kumpulan field/kolom (dipisah spasi/tab secara default, atau delimiter lain lewat `-F`), diakses sebagai `$1`, `$2`, dst (`$0` adalah baris utuh). Ini membuat awk sangat pas untuk mengekstrak kolom tertentu dari output terstruktur, misal `ps aux | awk '{print $2, $11}'` mengambil kolom PID dan nama command saja dari output `ps`. awk juga bisa melakukan agregasi (menjumlahkan, menghitung) dan punya kondisional built-in, membuatnya jauh lebih dari sekadar 'pemotong kolom' - untuk kebutuhan yang lebih dari agregasi sederhana, biasanya lebih mudah pindah ke script Python (dibahas di fase berikutnya).",
        },
        {
          kind: "praktik",
          title: "Analisis percobaan login SSH gagal",
          instructions: [
            "Akses log auth: `journalctl -u ssh` atau `/var/log/auth.log`.",
            'Gunakan `grep "Failed password"` untuk memfilter baris relevan.',
            "Gunakan `awk` untuk mengekstrak IP sumber dari tiap baris (perhatikan posisi kolom IP di format log itu).",
            "Gunakan `sort | uniq -c | sort -rn` untuk menghitung dan mengurutkan berdasarkan jumlah percobaan per IP.",
            "Untuk IP dengan percobaan terbanyak, jelaskan langkah mitigasi konkret apa yang akan kamu lakukan (misal fail2ban, rate limiting, atau block manual).",
          ],
          proof:
            "Satu command pipeline lengkap, output daftar IP terurut dari yang paling sering mencoba login gagal, dan rencana mitigasi untuk IP teratas.",
        },
        {
          kind: "kuis",
          question:
            "Flag grep apa (satu huruf) yang membuat pencarian tidak case-sensitive?",
          inputType: "text",
          placeholder: "contoh: -v",
          accepted: ["-i", "i"],
          explanation:
            '`-i` (ignore case) membuat grep mencocokkan "Error", "error", dan "ERROR" sekaligus.',
        },
      ],
    },
    {
      index: 11,
      label: "Hari 25",
      title: "Networking dari Command Line",
      steps: [
        {
          kind: "materi",
          title: "ip: pengganti modern ifconfig/route",
          body: "`ip` adalah tool modern untuk mengelola konfigurasi jaringan, menggantikan tool lama (`ifconfig`, `route`) yang sudah deprecated di banyak distro. `ip addr` (atau `ip a`) menampilkan interface jaringan beserta IP address-nya, `ip route` menampilkan routing table (mengingatkan ke materi routing di fase Network+), `ip link` menampilkan status interface (up/down). Satu tool ini menggabungkan fungsi beberapa tool lama sekaligus, dengan output yang lebih konsisten dan bisa di-parsing lebih mudah lewat script.",
        },
        {
          kind: "materi",
          title: "ss: melihat koneksi yang sedang aktif",
          body: "`ss` (socket statistics) menampilkan koneksi jaringan aktif - port mana yang listening, koneksi TCP/UDP mana yang sedang established, dan proses apa yang memilikinya (dengan flag `-p`, butuh sudo untuk melihat proses milik user lain). Ini pengganti modern `netstat` yang lebih cepat karena membaca langsung dari kernel, bukan dari `/proc` seperti netstat lama. Flag umum: `-t` (TCP saja), `-u` (UDP saja), `-l` (cuma yang listening), `-n` (tampilkan angka port/IP mentah, jangan diterjemahkan jadi nama) - kombinasi `ss -tulpn` (yang sudah dipakai sejak fase Network+) jadi command audit port paling umum.",
        },
        {
          kind: "materi",
          title: "curl, wget, dan netcat: mengambil dan menguji konektivitas",
          body: "`curl`/`wget` mengambil konten lewat HTTP/HTTPS (sudah dibahas di fase Bekal), sementara `nc` (netcat) bekerja di level lebih rendah - bisa jadi client TCP/UDP sederhana ATAU listener yang menunggu koneksi masuk, tanpa peduli protokol aplikasi di atasnya (HTTP, atau sekadar teks mentah). Ini membuat netcat sangat berguna untuk TESTING konektivitas murni: apakah port tertentu benar-benar terbuka dan menerima koneksi (`nc -zv host port`), atau bahkan sekadar mengirim/menerima pesan teks mentah antar-mesin untuk verifikasi jalur jaringan sebelum menyalahkan aplikasi yang lebih kompleks di atasnya.",
        },
        {
          kind: "praktik",
          title: "Kirim pesan lewat netcat antar-terminal",
          instructions: [
            "Buka terminal A, jalankan `nc -l -p 4444` sebagai listener.",
            "Buka terminal B, jalankan `nc 127.0.0.1 4444`.",
            "Ketik pesan di terminal B, pastikan muncul di terminal A.",
            "Sambil koneksi masih terbuka, jalankan `ss -tn` di terminal ketiga dan temukan baris yang merepresentasikan koneksi netcat ini.",
            "Catat command persis yang dipakai dan jelaskan peran masing-masing flag (`-l`, `-p`).",
          ],
          proof:
            "Screenshot ketiga terminal (pesan terkirim, dan koneksi terlihat di output ss), plus penjelasan flag `-l` dan `-p`.",
        },
        {
          kind: "kuis",
          question:
            "Command modern apa (dua huruf) yang menampilkan koneksi TCP/UDP aktif, pengganti netstat?",
          inputType: "text",
          placeholder: "contoh: ip",
          accepted: ["ss"],
          explanation:
            "`ss` (socket statistics) lebih cepat dan jadi standar baru menggantikan `netstat` di kebanyakan distro modern.",
        },
      ],
    },
    {
      index: 12,
      label: "Hari 26",
      title: "Cron Job Scheduling",
      steps: [
        {
          kind: "materi",
          title: "crontab: lima kolom waktu sebelum command",
          body: "Cron menjalankan command secara otomatis pada jadwal yang ditentukan, tanpa perlu campur tangan manual. Satu baris crontab formatnya: lima kolom waktu (menit 0-59, jam 0-23, tanggal 1-31, bulan 1-12, hari-dalam-minggu 0-6 dengan 0=Minggu) diikuti command yang dijalankan. Tanda `*` di kolom mana pun berarti 'setiap nilai' - `* * * * *` berarti jalan setiap menit, sementara `0 2 * * *` berarti jalan tepat jam 02:00 setiap hari. `crontab -e` membuka editor untuk mengubah jadwal milik user yang sedang login, `crontab -l` menampilkan jadwal yang sedang aktif tanpa membukanya untuk diedit.",
        },
        {
          kind: "materi",
          title: "Pola jadwal yang lebih kompleks",
          body: "Selain angka tunggal dan `*`, tiap kolom mendukung beberapa notasi lanjutan: koma untuk beberapa nilai spesifik (`1,15` di kolom tanggal = tanggal 1 dan 15), tanda hubung untuk rentang (`1-5` di kolom hari = Senin sampai Jumat), dan garis miring untuk interval (`*/15` di kolom menit = tiap 15 menit: 0, 15, 30, 45). Kombinasi `0 9 * * 1-5` misalnya berarti 'jam 9 pagi, setiap hari kerja (Senin-Jumat)' - notasi yang sangat kompak begitu terbiasa, tapi mudah salah hitung kalau belum familiar, sehingga selalu baik untuk memverifikasi jadwal cron di tool online (crontab.guru) sebelum benar-benar disimpan di sistem produksi.",
        },
        {
          kind: "materi",
          title: "Kegunaan nyata cron untuk operasional dan security",
          body: "Cron dipakai luas untuk automasi rutin: backup terjadwal (dump database tiap malam), pembersihan file sementara/log lama supaya disk tidak penuh, dan yang relevan untuk security - menjalankan scan kerentanan atau audit terjadwal (misal cek integritas file penting tiap jam, atau menjalankan tool monitoring log secara berkala). Kesalahan umum: lupa bahwa cron job berjalan dengan environment yang MINIMAL (PATH yang lebih pendek dari shell interaktif biasa), sehingga script yang jalan lancar saat dites manual di terminal bisa gagal saat dijalankan lewat cron karena command tertentu tidak ditemukan - solusinya biasanya menulis path lengkap ke tiap command di dalam script, bukan mengandalkan PATH default.",
        },
        {
          kind: "praktik",
          title: "Jadwalkan satu cron job sederhana",
          instructions: [
            "Jalankan `crontab -e`.",
            "Tambahkan baris `* * * * * date >> /tmp/cron-test.log` (jalan tiap menit).",
            "Simpan, tunggu 2 menit.",
            "Jalankan `cat /tmp/cron-test.log`, konfirmasi ada minimal 2 baris timestamp baru.",
            "Ubah jadwal jadi tiap 5 menit dengan notasi `*/5 * * * *`, jelaskan kenapa notasi itu berarti demikian.",
          ],
          proof:
            "Isi /tmp/cron-test.log menunjukkan minimal 2 timestamp berbeda berjarak sekitar 1 menit, plus penjelasan notasi */5.",
        },
        {
          kind: "kuis",
          question:
            "Berapa banyak kolom waktu yang ada di satu baris crontab standar, sebelum command-nya?",
          inputType: "text",
          placeholder: "contoh: 4",
          accepted: ["5"],
          explanation:
            "Menit, jam, tanggal, bulan, hari-dalam-minggu - lima kolom, baru diikuti command yang dijalankan.",
        },
      ],
    },
    {
      index: 13,
      label: "Hari 27",
      title: "systemd dan Manajemen Layanan",
      steps: [
        {
          kind: "materi",
          title: "systemd dan unit file: standar modern manajemen service",
          body: "systemd adalah init system (proses pertama yang dijalankan kernel saat boot, PID 1) yang jadi standar di hampir semua distro Linux modern, menggantikan sistem init lama (SysV init). systemd mengelola service lewat 'unit file' berekstensi `.service`, file konfigurasi teks yang mendefinisikan cara menjalankan sebuah service: command apa yang dijalankan, service lain apa yang harus jalan lebih dulu (dependency), dan apa yang dilakukan kalau service itu crash (auto-restart atau tidak). Unit file biasanya ditaruh di `/etc/systemd/system/` untuk service custom.",
        },
        {
          kind: "materi",
          title: "systemctl: mengontrol siklus hidup service",
          body: "`systemctl` adalah command utama untuk berinteraksi dengan systemd: `start`/`stop` menjalankan/menghentikan service SEKARANG, `enable`/`disable` mengatur apakah service itu otomatis jalan saat boot (independen dari status jalan-tidaknya sekarang), `status` menampilkan kondisi terkini (aktif/gagal, PID, beberapa baris log terakhir). Kombinasi `enable --now` sekaligus menjalankan service SEKARANG dan mendaftarkannya untuk auto-start di boot berikutnya - pola paling umum dipakai setelah membuat service baru. Perbedaan enable vs start ini sering membingungkan pemula: service bisa 'enabled' (akan jalan saat boot) tapi statusnya 'inactive' sekarang kalau memang belum di-start manual.",
        },
        {
          kind: "materi",
          title: "journalctl: satu tempat untuk semua log systemd",
          body: "journalctl membaca 'journal' - log terpusat yang dikelola systemd untuk semua service yang berjalan di bawahnya, menggantikan kebutuhan tiap service menulis log ke file terpisah-pisah secara manual. `journalctl -u <nama-service>` menyaring log milik SATU unit tertentu saja - jauh lebih cepat daripada mencari manual di banyak file log berbeda. Flag berguna lain: `-f` (follow, mirip `tail -f`, menampilkan log baru secara real-time), `--since` (filter berdasarkan waktu, misal `--since '1 hour ago'`), `-p err` (cuma tampilkan log level error ke atas).",
        },
        {
          kind: "praktik",
          title: "Buat systemd service kustom",
          instructions: [
            "Buat script `/usr/local/bin/log-uptime.sh` yang menulis `uptime` ke `/var/log/uptime-boot.log`.",
            "Buat unit file `/etc/systemd/system/log-uptime.service` yang menjalankan script itu.",
            "Jalankan `sudo systemctl daemon-reload`, lalu `sudo systemctl enable --now log-uptime.service`.",
            "Verifikasi jalan dengan `systemctl status log-uptime.service` dan `journalctl -u log-uptime.service`.",
            "Jalankan `sudo systemctl disable log-uptime.service` (tanpa stop) dan jelaskan bedanya dengan `stop` - apa yang masih jalan sekarang vs apa yang berubah untuk boot berikutnya.",
          ],
          proof:
            "Isi unit file, output systemctl status yang menunjukkan service aktif, isi log-uptime-boot.log, dan penjelasan beda disable vs stop.",
        },
        {
          kind: "kuis",
          question:
            "Command dasar apa (dua kata, tanpa nama service) untuk melihat log satu service lewat journalctl?",
          inputType: "text",
          placeholder: "contoh: systemctl status",
          accepted: ["journalctl -u"],
          explanation:
            "`journalctl -u <nama-service>` menyaring log milik satu unit systemd tertentu saja.",
        },
      ],
    },
    {
      index: 14,
      label: "Hari 28",
      title: "SSH dan Akses Jarak Jauh yang Aman",
      steps: [
        {
          kind: "materi",
          title: "Key-based authentication: mengapa lebih aman dari password",
          body: "Autentikasi SSH berbasis key memakai sepasang kunci kriptografi (mengingatkan ke materi asimetris di fase Security+): private key disimpan rahasia di mesinmu, public key ditaruh di server yang ingin diakses (di `~/.ssh/authorized_keys`). Server mengirim tantangan yang cuma bisa dijawab benar oleh siapa pun yang memegang private key yang berpasangan - tidak ada password yang dikirim/ditebak sama sekali. Ini jauh lebih tahan brute force dibanding password (private key yang kuat secara praktis mustahil ditebak) dan bisa diperkuat lagi dengan passphrase di private key itu sendiri, jadi meski file private key dicuri, masih ada lapisan proteksi tambahan.",
        },
        {
          kind: "materi",
          title: "ssh-keygen dan ssh-copy-id: alur setup key-based auth",
          body: "`ssh-keygen -t ed25519` men-generate sepasang key baru memakai algoritma Ed25519 (lebih modern dan cepat dibanding RSA lama, meski RSA masih umum dipakai untuk kompatibilitas). Hasilnya dua file: private key (`id_ed25519`, JANGAN pernah dibagikan) dan public key (`id_ed25519.pub`, aman dibagikan). `ssh-copy-id user@host` menyalin public key itu ke server target secara otomatis (menambahkannya ke `authorized_keys` server), sehingga login berikutnya bisa langsung memakai key tanpa perlu copy-paste manual.",
        },
        {
          kind: "materi",
          title: "Hardening sshd_config: mengurangi permukaan serangan",
          body: "Setelah key-based auth berjalan lancar, langkah hardening berikutnya adalah menonaktifkan metode yang lebih lemah lewat `/etc/ssh/sshd_config`. `PasswordAuthentication no` mematikan login pakai password SEPENUHNYA - siapa pun tanpa key yang valid tidak akan pernah bisa masuk, betapa pun kuat mereka mencoba menebak password (brute force jadi sia-sia). `PermitRootLogin no` mencegah login LANGSUNG sebagai root lewat SSH - user harus login sebagai user biasa dulu lalu `sudo`, menambah satu lapis audit (siapa yang benar-benar melakukan aksi administratif tercatat by user, bukan cuma 'root'). Setelah mengubah `sshd_config`, service SSH harus di-restart (`sudo systemctl restart sshd`) supaya perubahan berlaku.",
        },
        {
          kind: "praktik",
          title: "Setup key-based SSH dan matikan password login",
          instructions: [
            "Generate keypair: `ssh-keygen -t ed25519`.",
            "Copy public key ke server/VM target dengan `ssh-copy-id user@host`.",
            "Login pakai key untuk memastikan berhasil tanpa password.",
            "Di server, edit `/etc/ssh/sshd_config`: set `PasswordAuthentication no` dan `PermitRootLogin no`, lalu restart sshd dengan `sudo systemctl restart sshd`.",
            "Coba login pakai password dari mesin lain (atau hapus sementara key dari agent), pastikan ditolak.",
          ],
          proof:
            "Bukti login berhasil dengan key, isi perubahan sshd_config, dan bukti login password ditolak setelah restart sshd.",
        },
        {
          kind: "kuis",
          question:
            "Baris konfigurasi apa di sshd_config yang menonaktifkan login PASSWORD sepenuhnya?",
          inputType: "text",
          placeholder: "contoh: PermitRootLogin no",
          accepted: ["passwordauthentication no"],
          explanation:
            "`PasswordAuthentication no` memaksa semua login memakai key - password tidak lagi diterima sama sekali.",
        },
      ],
    },
  ],
};

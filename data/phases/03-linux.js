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
          title: "Struktur direktori Linux dan cara menjelajahinya",
          body: "Linux mengikuti Filesystem Hierarchy Standard (FHS): /etc untuk konfigurasi, /var untuk data yang berubah (log, cache), /home untuk data user, /bin dan /usr/bin untuk executable. Alih-alih menghafal semua direktori, kuasai `find` - ia bisa mencari berdasarkan nama, ukuran, waktu modifikasi, permission, dan tipe file sekaligus, jauh lebih cepat daripada menjelajah manual.",
        },
        {
          kind: "praktik",
          title: "Cari file besar dan file yang baru diubah",
          instructions: [
            "Jalankan `find / -type f -size +100M 2>/dev/null` untuk cari file di atas 100MB.",
            "Jalankan `find / -type f -mtime -1 2>/dev/null` untuk cari file yang diubah 24 jam terakhir.",
            "Simpan kedua hasil ke file terpisah dan tinjau apakah ada yang mencurigakan.",
          ],
          proof:
            "Dua file output (file besar, file baru diubah) beserta catatan singkat hasil peninjauan.",
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
          title: "Melihat dan memahami penggunaan disk",
          body: '`df -h` menampilkan penggunaan tiap filesystem yang ter-mount (dalam format human-readable). `du -sh <folder>` menghitung total ukuran satu folder - berguna mencari apa yang memenuhi disk. `lsblk` menampilkan struktur block device dan partisi fisik. Memahami ketiganya penting sebelum menyalahkan "disk penuh" ke hal yang salah.',
        },
        {
          kind: "praktik",
          title: "Audit penggunaan disk sistemmu",
          instructions: [
            "Jalankan `df -h` dan identifikasi filesystem mana yang paling penuh.",
            "Jalankan `du -sh /var/log` untuk lihat seberapa besar log sistem.",
            "Jalankan `lsblk` dan identifikasi partisi mana yang di-mount sebagai `/`.",
          ],
          proof:
            "Output ketiga command dengan anotasi: filesystem paling penuh, ukuran /var/log, dan nama device partisi root.",
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
          title: "rwx, oktal, dan SUID",
          body: "Tiga digit permission (rwx) berlaku untuk owner, group, dan others, direpresentasikan sebagai angka oktal (misal 755). SUID bit membuat file dijalankan dengan hak akses pemiliknya, bukan pengguna yang menjalankannya - sumber umum privilege escalation kalau salah konfigurasi.",
        },
        {
          kind: "praktik",
          title: "Ubah permission dan cari binary SUID",
          instructions: [
            "Buat file script `test.sh`, cek permission default-nya dengan `ls -l`.",
            "Ubah ke 755 dengan `chmod 755 test.sh`.",
            "Jalankan `find / -perm -4000 -type f 2>/dev/null` untuk cari semua binary SUID.",
            "Pilih 3 hasil dan jelaskan kenapa masing-masing butuh SUID (misal `passwd`).",
          ],
          proof:
            "Output ls -l sebelum/sesudah chmod, daftar binary SUID, dan penjelasan 3 di antaranya.",
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
          title: "passwd, shadow, dan sudo terbatas",
          body: "Setiap user tercatat di /etc/passwd, password hash-nya di /etc/shadow (bukan di passwd, demi keamanan). Sudo memberi akses administratif terbatas tanpa membagikan password root, dan bisa dikonfigurasi presisi lewat /etc/sudoers.d untuk hanya mengizinkan command tertentu ke group tertentu.",
        },
        {
          kind: "praktik",
          title: "Buat user dengan sudo access terbatas ke satu command",
          instructions: [
            "Buat user baru: `sudo useradd -m budi` lalu set password.",
            "Buat group baru `netops` dan masukkan `budi` ke dalamnya.",
            "Di `/etc/sudoers.d/netops`, izinkan group `netops` menjalankan hanya `/usr/bin/systemctl status sshd` tanpa password.",
            "Login sebagai `budi`, buktikan command itu jalan tanpa sudo lain yang jalan.",
          ],
          proof:
            "Isi file sudoers yang dibuat, dan bukti command yang diizinkan berhasil sementara command lain ditolak.",
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
          title: "Instal, update, dan hapus bersih",
          body: 'Package manager (apt di Debian/Ubuntu, dnf di Fedora, pacman di Arch) menangani instalasi, update, dan dependency resolution secara otomatis. Menghapus bersih (termasuk file konfigurasi) sama pentingnya dengan cara menginstal - package yang "dihapus" tapi menyisakan config bisa membingungkan investigasi nanti.',
        },
        {
          kind: "praktik",
          title: "Install, inspeksi, lalu hapus bersih satu tool",
          instructions: [
            "Install `tcpdump` (kalau belum ada) dengan package manager sistemmu.",
            "Cek dependency-nya (`apt-cache depends tcpdump` atau setara).",
            "Hapus total termasuk file konfigurasi (`sudo apt purge tcpdump` atau setara).",
            "Verifikasi tidak ada file sisa dengan `dpkg -L tcpdump` (harus error/kosong) atau cek manual.",
          ],
          proof:
            "Output instalasi, daftar dependency, dan bukti penghapusan bersih tanpa file sisa.",
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
          title: "PATH, export, dan file profile shell",
          body: "Environment variable menyimpan konfigurasi yang bisa dibaca proses apa pun di sesi itu. PATH adalah yang paling penting: daftar direktori yang dicari shell saat kamu mengetik nama command, urut dari kiri ke kanan. `export VAR=nilai` membuat variable itu terlihat oleh child process. ~/.bashrc dijalankan tiap shell interaktif baru dibuka; ~/.profile dijalankan saat login - tempat yang tepat untuk alias dan PATH permanen.",
        },
        {
          kind: "praktik",
          title: "Tambahkan direktori ke PATH dan buat alias permanen",
          instructions: [
            "Jalankan `echo $PATH` dan pisahkan isinya per direktori.",
            "Tambahkan direktori baru sementara: `export PATH=$PATH:/tmp/mybin`, konfirmasi dengan `echo $PATH` lagi.",
            'Tambahkan satu baris alias (misal `alias ll="ls -la"`) ke `~/.bashrc`.',
            "Jalankan `source ~/.bashrc`, konfirmasi alias `ll` langsung bisa dipakai.",
          ],
          proof:
            "Output echo $PATH sebelum/sesudah, dan bukti alias ll bekerja setelah source.",
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
          title: "PID, sinyal, dan proses background",
          body: "Proses punya PID, status (running/sleeping/zombie), dan bisa dikirim sinyal seperti SIGTERM (minta berhenti dengan sopan) atau SIGKILL (paksa berhenti, tidak bisa ditangkap/diabaikan proses). Menjalankan proses di background dengan `&` dan `nohup` penting untuk task yang berjalan lama.",
        },
        {
          kind: "praktik",
          title: "Jalankan, pantau, dan hentikan proses background",
          instructions: [
            "Jalankan `sleep 300 &` untuk membuat proses background 5 menit.",
            "Cari PID-nya dengan `jobs -l` atau `ps aux | grep sleep`.",
            "Pantau prosesnya lewat `top` atau `htop`.",
            "Hentikan dengan `kill -SIGTERM <pid>`, verifikasi sudah berhenti dengan `ps -p <pid>`.",
          ],
          proof:
            "PID proses, screenshot/output top saat proses berjalan, dan bukti proses berhenti setelah SIGTERM.",
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
          title: "tar, gzip, dan bedanya",
          body: "`tar` awalnya cuma membungkus banyak file jadi satu (tape archive), tidak mengompresi - makanya sering dipasangkan dengan `-z` (gzip) atau `-J` (xz). Flag umum: `c` create, `x` extract, `v` verbose, `f` diikuti nama file. `zip`/`unzip` adalah alternatif yang lebih umum dipakai lintas Windows/Mac/Linux.",
        },
        {
          kind: "praktik",
          title: "Bundel dan ekstrak satu folder",
          instructions: [
            "Buat folder `data/` berisi 2 file teks.",
            "Jalankan `tar -czvf data.tar.gz data/` untuk membundel sekaligus mengompresi.",
            "Hapus folder aslinya, lalu ekstrak lagi dengan `tar -xzvf data.tar.gz`.",
            "Konfirmasi kedua file kembali utuh isinya.",
          ],
          proof:
            "File data.tar.gz, dan bukti kedua file di dalamnya utuh setelah folder asli dihapus lalu diekstrak ulang.",
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
          title: "Variabel, kondisional, dan exit code",
          body: "Bash script menggabungkan variabel, kondisional (if/elif/else), dan loop untuk otomasi. Exit code (0 = sukses, non-zero = error) adalah cara script berkomunikasi status ke script atau proses lain - dicek lewat `$?` atau langsung di kondisional `if command; then`.",
        },
        {
          kind: "praktik",
          title: "Tulis script peringatan disk usage",
          instructions: [
            "Tulis `disk_alert.sh` yang membaca persentase disk usage dari `df -h /`.",
            'Kalau usage > 80%, print "WARNING: disk usage tinggi" dan exit code 1.',
            'Kalau tidak, print "OK" dan exit code 0.',
            "Uji dengan mengubah threshold sementara ke angka yang pasti terpicu, verifikasi pesan WARNING muncul.",
          ],
          proof:
            "Isi script disk_alert.sh dan output uji coba yang menunjukkan kedua kondisi (OK dan WARNING) tercapai.",
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
          title: "Mencari, mengedit, dan mengekstrak kolom",
          body: "grep mencari pola, sed mengedit teks (termasuk in-place), awk mengekstrak dan mengolah kolom/field. Ketiganya adalah alat inti untuk mem-parsing log tanpa perlu bahasa pemrograman penuh.",
        },
        {
          kind: "praktik",
          title: "Analisis percobaan login SSH gagal",
          instructions: [
            "Akses log auth: `journalctl -u ssh` atau `/var/log/auth.log`.",
            'Gunakan `grep "Failed password"` untuk memfilter baris relevan.',
            "Gunakan `awk` untuk mengekstrak IP sumber dari tiap baris.",
            "Gunakan `sort | uniq -c | sort -rn` untuk menghitung dan mengurutkan berdasarkan jumlah percobaan per IP.",
          ],
          proof:
            "Satu command pipeline lengkap dan output daftar IP terurut dari yang paling sering mencoba login gagal.",
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
          title: "ip, ss, curl, dan nc",
          body: "`ip` mengelola interface dan routing, `ss` menampilkan koneksi aktif (pengganti modern `netstat`), `curl`/`wget` mengambil konten via HTTP, dan `nc` (netcat) bisa jadi client maupun listener TCP/UDP sederhana untuk testing konektivitas.",
        },
        {
          kind: "praktik",
          title: "Kirim pesan lewat netcat antar-terminal",
          instructions: [
            "Buka terminal A, jalankan `nc -l -p 4444` sebagai listener.",
            "Buka terminal B, jalankan `nc 127.0.0.1 4444`.",
            "Ketik pesan di terminal B, pastikan muncul di terminal A.",
            "Catat command persis yang dipakai dan jelaskan peran masing-masing flag.",
          ],
          proof:
            "Screenshot kedua terminal menunjukkan pesan terkirim, plus penjelasan flag `-l` dan `-p`.",
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
          title: "crontab dan lima kolom waktunya",
          body: "Cron menjalankan command otomatis pada jadwal tertentu. Satu baris crontab punya 5 kolom waktu (menit, jam, tanggal, bulan, hari-minggu) diikuti command. `crontab -e` mengedit jadwal milik user saat ini, `crontab -l` menampilkannya. Dipakai luas untuk automasi: backup rutin, scan terjadwal, pembersihan log.",
        },
        {
          kind: "praktik",
          title: "Jadwalkan satu cron job sederhana",
          instructions: [
            "Jalankan `crontab -e`.",
            "Tambahkan baris `* * * * * date >> /tmp/cron-test.log` (jalan tiap menit).",
            "Simpan, tunggu 2 menit.",
            "Jalankan `cat /tmp/cron-test.log`, konfirmasi ada minimal 2 baris timestamp baru.",
          ],
          proof:
            "Isi /tmp/cron-test.log menunjukkan minimal 2 timestamp berbeda, berjarak sekitar 1 menit.",
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
          title: "Unit file, systemctl, dan journalctl",
          body: "systemd mengelola service lewat unit file (.service). `systemctl` untuk start/stop/enable/disable, `journalctl` untuk membaca log service. Service yang di-enable akan otomatis jalan saat boot.",
        },
        {
          kind: "praktik",
          title: "Buat systemd service kustom",
          instructions: [
            "Buat script `/usr/local/bin/log-uptime.sh` yang menulis `uptime` ke `/var/log/uptime-boot.log`.",
            "Buat unit file `/etc/systemd/system/log-uptime.service` yang menjalankan script itu.",
            "Jalankan `sudo systemctl daemon-reload`, lalu `sudo systemctl enable --now log-uptime.service`.",
            "Verifikasi jalan dengan `systemctl status log-uptime.service` dan `journalctl -u log-uptime.service`.",
          ],
          proof:
            "Isi unit file, output systemctl status yang menunjukkan service aktif, dan isi log-uptime-boot.log.",
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
          title: "Key-based auth dan hardening dasar",
          body: "Autentikasi berbasis SSH key jauh lebih aman daripada password karena tidak bisa ditebak lewat brute force. Hardening dasar sshd_config mencakup menonaktifkan login root langsung dan mematikan autentikasi password sepenuhnya setelah key-based auth berjalan.",
        },
        {
          kind: "praktik",
          title: "Setup key-based SSH dan matikan password login",
          instructions: [
            "Generate keypair: `ssh-keygen -t ed25519`.",
            "Copy public key ke server/VM target dengan `ssh-copy-id user@host`.",
            "Login pakai key untuk memastikan berhasil tanpa password.",
            "Di server, edit `/etc/ssh/sshd_config`: set `PasswordAuthentication no` dan `PermitRootLogin no`, lalu restart sshd.",
            "Coba login pakai password dari mesin lain, pastikan ditolak.",
          ],
          proof:
            "Bukti login berhasil dengan key, isi perubahan sshd_config, dan bukti login password ditolak.",
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

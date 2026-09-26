// Fase 4: Python
export default {
  id: "python",
  number: 4,
  title: "Python",
  dayRange: "Hari 29–42",
  summary:
    "Python adalah bahasa serbaguna untuk otomasi keamanan: parsing log, scanning, sampai packet crafting. Fokus di sini pada Python yang langsung berguna untuk security, bukan Python umum.",
  resources: [
    {
      label: "freeCodeCamp - Learn Python Full Course",
      url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    },
    {
      label: "Real Python",
      url: "https://realpython.com/",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 29",
      title: "Sintaks Dasar dan Tipe Data",
      steps: [
        {
          kind: "materi",
          title: "Tipe dasar dan konversi basis angka",
          body: "Python punya tipe data dasar: int, float, str, bool, list, dict. Konversi basis angka (biner, desimal, heksadesimal) sering muncul saat kerja dengan alamat IP dan MAC address.",
        },
        {
          kind: "praktik",
          title: "Konverter representasi oktet IP",
          instructions: [
            "Tulis script yang minta user input satu oktet IP (0-255).",
            "Tampilkan nilai itu dalam bentuk desimal, biner (8 bit, pakai `bin()` dan `zfill`), dan heksadesimal.",
            "Uji dengan input 192, 10, dan 255.",
          ],
          proof:
            "Script Python beserta output untuk ketiga nilai uji (192, 10, 255).",
        },
        {
          kind: "kuis",
          question:
            "Fungsi built-in apa yang mengembalikan TIPE DATA suatu variabel?",
          inputType: "text",
          placeholder: "contoh: len",
          accepted: ["type"],
          explanation:
            "`type(x)` mengembalikan class dari x, misal `<class 'int'>`.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 30",
      title: "Struktur Kontrol: Percabangan dan Loop",
      steps: [
        {
          kind: "materi",
          title: "if/elif/else, for, while",
          body: "if/elif/else menangani percabangan logika, for dan while menangani pengulangan. Loop brute force sederhana adalah cara bagus memahami kenapa panjang password/PIN memengaruhi waktu brute force secara eksponensial.",
        },
        {
          kind: "praktik",
          title: "Simulasikan brute force PIN 4 digit",
          instructions: [
            'Tentukan target PIN rahasia, misal "4821", disimpan sebagai variabel.',
            'Tulis loop yang mencoba semua kombinasi dari "0000" sampai "9999".',
            "Hitung berapa banyak percobaan sampai ketemu, dan berapa lama waktu eksekusinya (`time.time()`).",
            "Bandingkan estimasi waktu kalau PIN-nya 6 digit.",
          ],
          proof:
            "Output jumlah percobaan dan waktu eksekusi untuk PIN 4 digit, plus estimasi untuk 6 digit.",
        },
        {
          kind: "kuis",
          question:
            "Keyword apa yang menghentikan sebuah loop lebih awal, sebelum kondisinya jadi false?",
          inputType: "text",
          placeholder: "contoh: continue",
          accepted: ["break"],
          explanation:
            "`break` langsung keluar dari loop terdekat; `continue` cuma melompat ke iterasi berikutnya, bukan menghentikan loop.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 31",
      title: "List dan Dict Comprehension",
      steps: [
        {
          kind: "materi",
          title: "Membuat koleksi dalam satu baris",
          body: "List comprehension `[expr for x in iterable if kondisi]` dan dict comprehension `{k: v for ...}` membuat koleksi baru dari yang lama dalam satu baris ekspresif, menggantikan loop manual berisi `.append()`. Pakai kalau tetap mudah dibaca - begitu logikanya bercabang atau lebih dari satu baris, loop biasa lebih jelas.",
        },
        {
          kind: "praktik",
          title: "Filter port well-known dari daftar IP-port",
          instructions: [
            'Buat list of tuples: `[("10.0.0.1", 22), ("10.0.0.2", 8080), ("10.0.0.3", 443)]`.',
            "Pakai dict comprehension untuk membuat `{ip: port}` HANYA untuk port di bawah 1024.",
            "Cetak hasilnya, pastikan port 8080 tidak ikut masuk.",
          ],
          proof:
            "Output dict yang hanya berisi entri dengan port well-known (<1024).",
        },
        {
          kind: "kuis",
          question:
            "Tanda kurung apa (nama Indonesianya) yang dipakai untuk membuat dict comprehension?",
          inputType: "text",
          placeholder: "contoh: kurung siku",
          accepted: ["kurung kurawal", "{}"],
          explanation:
            "Dict dan set comprehension pakai kurung kurawal `{}`; list comprehension pakai kurung siku `[]`.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 32",
      title: "Fungsi dan Modul",
      steps: [
        {
          kind: "materi",
          title: "Membungkus logika jadi bisa dipakai ulang",
          body: "Fungsi membungkus logika yang bisa dipakai ulang. Modul (file .py terpisah) memungkinkan kode diorganisir dan di-import ke script lain - dasar dari membangun tool yang lebih besar dari satu file.",
        },
        {
          kind: "praktik",
          title: "Ubah brute force PIN jadi modul yang bisa dipakai ulang",
          instructions: [
            "Pindahkan logika brute force dari Hari 30 ke file `pin_cracker.py` sebagai fungsi `crack_pin(target)`.",
            "Buat file baru `run.py` yang meng-import fungsi itu dan memanggilnya dengan 2 target PIN berbeda.",
            'Pastikan `pin_cracker.py` tidak menjalankan apa pun kalau di-run langsung (gunakan `if __name__ == "__main__"`).',
          ],
          proof:
            "Dua file (pin_cracker.py, run.py) dan output run.py yang berhasil crack 2 PIN berbeda.",
        },
        {
          kind: "kuis",
          question:
            'Variable khusus apa yang bernilai "__main__" saat sebuah file Python dijalankan langsung (bukan di-import)?',
          inputType: "text",
          placeholder: "contoh: __file__",
          accepted: ["__name__"],
          explanation:
            '`__name__` bernilai "__main__" hanya ketika file itu dijalankan langsung; kalau di-import, nilainya nama modulnya.',
        },
      ],
    },
    {
      index: 5,
      label: "Hari 33",
      title: "OOP Dasar: Class untuk Tool Kecil",
      steps: [
        {
          kind: "materi",
          title: "class, __init__, dan self",
          body: "Class membungkus state (data) dan behavior (method) yang saling terkait jadi satu unit. `__init__` adalah constructor yang jalan saat object dibuat, `self` merujuk ke instance itu sendiri. Berguna begitu sebuah tool punya beberapa data yang saling terkait - misal target host, daftar port, dan hasil scan - daripada melempar semuanya sebagai parameter terpisah ke tiap fungsi.",
        },
        {
          kind: "praktik",
          title: "Bangun class PortScanner sederhana",
          instructions: [
            "Buat class `PortScanner` dengan `__init__(self, host)` yang menyimpan `self.host`.",
            "Tambahkan method `is_open(self, port)` yang memakai `socket.connect_ex` untuk cek status port itu.",
            'Instansiasi `PortScanner("127.0.0.1")`, panggil `is_open` untuk 2 port berbeda.',
          ],
          proof:
            "Kode class PortScanner dan output pemanggilan is_open untuk 2 port.",
        },
        {
          kind: "kuis",
          question:
            "Parameter apa yang secara konvensi selalu jadi argumen PERTAMA sebuah method instance di Python?",
          inputType: "text",
          placeholder: "contoh: this",
          accepted: ["self"],
          explanation:
            "Python tidak punya keyword `this` seperti bahasa lain - konvensinya menamai parameter pertama itu `self`, merujuk ke instance yang memanggil method.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 34",
      title: "File I/O dan Parsing",
      steps: [
        {
          kind: "materi",
          title: "Baca-tulis file dan validasi manual",
          body: "Membaca dan menulis file adalah operasi paling umum dalam scripting security: parsing log, daftar IP, hasil scan. Validasi format IPv4 manual (tanpa library) melatih pemahaman struktur datanya.",
        },
        {
          kind: "praktik",
          title: "Validator IP dari file teks",
          instructions: [
            'Buat file `ips.txt` berisi 15 baris, campur IP valid dan tidak valid (misal "999.1.1.1", "abc", "10.0.0.256").',
            "Tulis script yang membaca file itu baris per baris.",
            "Validasi tiap baris: harus 4 oktet, tiap oktet 0-255, tanpa memakai library ipaddress.",
            "Tulis IP yang valid ke `valid_ips.txt`.",
          ],
          proof:
            "File ips.txt (input), valid_ips.txt (output), dan script validator-nya.",
        },
        {
          kind: "kuis",
          question:
            "Mode apa (satu huruf) yang dipakai open() untuk MENAMBAH ke akhir file, bukan menimpanya?",
          inputType: "text",
          placeholder: "contoh: w",
          accepted: ["a"],
          explanation:
            '`"a"` (append) menulis di akhir file tanpa menghapus isi lama; `"w"` (write) menimpa seluruh isi file.',
        },
      ],
    },
    {
      index: 7,
      label: "Hari 35",
      title: "Bekerja dengan JSON",
      steps: [
        {
          kind: "materi",
          title: "json.load, json.loads, dan json.dumps",
          body: "Modul `json` mem-parsing data terstruktur - format standar untuk response API dan banyak file konfigurasi tool security. `json.load(file)` membaca dari file, `json.loads(string)` mem-parsing dari string, `json.dumps(obj)` mengubah objek Python kembali jadi teks JSON.",
        },
        {
          kind: "praktik",
          title: "Filter temuan severity tinggi dari file JSON",
          instructions: [
            "Buat file `findings.json` berisi list 3 objek finding, masing-masing punya field `id`, `severity`, `description`.",
            'Buat minimal satu finding dengan severity "high".',
            'Tulis script yang `json.load` file itu, filter hanya yang severity-nya "high", cetak jumlahnya.',
          ],
          proof:
            'Isi findings.json dan output jumlah finding severity "high" yang benar.',
        },
        {
          kind: "kuis",
          question:
            "Fungsi json module apa yang mem-parsing sebuah STRING (bukan file) jadi objek Python?",
          inputType: "text",
          placeholder: "contoh: json.load",
          accepted: ["json.loads"],
          explanation:
            "`json.loads` (load string) untuk string yang sudah ada di memori; `json.load` untuk file object yang masih perlu dibaca.",
        },
      ],
    },
    {
      index: 8,
      label: "Hari 36",
      title: "Exception Handling",
      steps: [
        {
          kind: "materi",
          title: "try, except, finally",
          body: "try/except mencegah script crash saat menemui input tak terduga. Untuk tool yang memproses data dari luar (log, file, network), exception handling yang baik memisahkan error yang harus dicatat dari error yang harus menghentikan program.",
        },
        {
          kind: "praktik",
          title: "Perkuat validator IP agar tidak pernah crash",
          instructions: [
            "Tambahkan baris rusak ke `ips.txt`, misal baris kosong atau baris berisi angka acak tanpa titik.",
            "Bungkus proses parsing tiap baris dengan try/except.",
            "Saat terjadi error, catat baris bermasalah dan pesan error-nya ke `errors.log`, lalu lanjut ke baris berikutnya.",
            "Jalankan ulang, pastikan script selesai sampai akhir tanpa crash.",
          ],
          proof:
            "ips.txt versi rusak, errors.log berisi baris bermasalah, dan bukti script selesai tanpa crash.",
        },
        {
          kind: "kuis",
          question:
            "Blok apa yang SELALU dijalankan, baik terjadi exception maupun tidak?",
          inputType: "text",
          placeholder: "contoh: except",
          accepted: ["finally"],
          explanation:
            "`finally` selalu jalan - dipakai untuk cleanup seperti menutup file/koneksi, apa pun hasil try/except-nya.",
        },
      ],
    },
    {
      index: 9,
      label: "Hari 37",
      title: "venv dan requests",
      steps: [
        {
          kind: "materi",
          title: "Isolasi dependency dan HTTP request",
          body: "Virtual environment (venv) mengisolasi dependency per proyek supaya tidak bentrok antar-proyek. Library `requests` menyederhanakan HTTP request - dasar dari banyak tool security yang berinteraksi dengan web/API.",
        },
        {
          kind: "praktik",
          title: "Cek status HTTP sebuah website",
          instructions: [
            "Buat virtual environment: `python -m venv venv` lalu aktifkan.",
            "Install requests: `pip install requests`.",
            "Tulis script yang melakukan GET request ke satu URL dan mencetak status code beserta 3 response header.",
            "Uji ke satu URL yang valid dan satu URL yang tidak ada (harus menangani error koneksi).",
          ],
          proof:
            "Script dan output untuk kedua kasus (URL valid dan URL gagal).",
        },
        {
          kind: "kuis",
          question:
            "Command apa (persis) untuk mengaktifkan virtual environment di Linux/Mac setelah dibuat dengan python -m venv venv?",
          inputType: "text",
          placeholder: "contoh: venv activate",
          accepted: ["source venv/bin/activate"],
          explanation:
            "Script activate ada di dalam folder venv itu sendiri, dijalankan lewat `source` supaya perubahan environment berlaku di shell yang sedang dipakai.",
        },
      ],
    },
    {
      index: 10,
      label: "Hari 38",
      title: "argparse: Membuat CLI Tool",
      steps: [
        {
          kind: "materi",
          title: "Argumen command line yang benar",
          body: "Modul `argparse` menangani argumen command line: positional (wajib, urut) dan optional (pakai flag seperti `--target`). Tool dengan argparse otomatis dapat `--help` yang menjelaskan cara pakainya - jauh lebih siap dipakai orang lain (atau dirimu 3 bulan lagi) daripada hardcode nilai di dalam script.",
        },
        {
          kind: "praktik",
          title: "Ubah script jadi CLI tool",
          instructions: [
            "Ambil script HTTP status checker dari Hari 37.",
            'Ganti URL yang hardcoded dengan argument positional lewat `argparse` (`parser.add_argument("url")`).',
            "Jalankan `python cek.py --help`, konfirmasi ada teks bantuan otomatis.",
            "Jalankan dengan URL berbeda tanpa mengubah kode.",
          ],
          proof:
            "Script versi argparse, output --help, dan bukti jalan dengan 2 URL berbeda tanpa edit kode.",
        },
        {
          kind: "kuis",
          question:
            "Flag apa yang OTOMATIS disediakan argparse untuk menampilkan pesan bantuan?",
          inputType: "text",
          placeholder: "contoh: --version",
          accepted: ["--help", "-h"],
          explanation:
            "argparse otomatis mendaftarkan `-h`/`--help` tanpa perlu kamu tambahkan manual.",
        },
      ],
    },
    {
      index: 11,
      label: "Hari 39",
      title: "Regular Expressions",
      steps: [
        {
          kind: "materi",
          title: "Mencocokkan pola teks dengan re",
          body: "Modul `re` mencocokkan pola teks - sangat berguna untuk mengekstrak IP address, email, atau pola serangan tertentu dari log dalam jumlah besar, jauh lebih cepat daripada parsing manual karakter per karakter.",
        },
        {
          kind: "praktik",
          title: "Ekstrak IP dan email dari sample log",
          instructions: [
            "Buat file `sample.log` berisi 10 baris log campuran yang mengandung IP address dan/atau alamat email.",
            "Tulis regex untuk mencocokkan pola IPv4.",
            "Tulis regex untuk mencocokkan pola email.",
            "Cetak semua IP unik dan email unik yang ditemukan di file itu.",
          ],
          proof:
            "sample.log dan output daftar IP unik serta email unik yang berhasil diekstrak.",
        },
        {
          kind: "kuis",
          question:
            "Fungsi re module apa yang mengembalikan SEMUA kecocokan pola dalam sebuah string, sebagai list?",
          inputType: "text",
          placeholder: "contoh: re.match",
          accepted: ["re.findall"],
          explanation:
            "`re.findall` mengembalikan list semua kecocokan; `re.match`/`re.search` cuma mengembalikan kecocokan pertama.",
        },
      ],
    },
    {
      index: 12,
      label: "Hari 40",
      title: "Automasi untuk Tugas Keamanan",
      steps: [
        {
          kind: "materi",
          title: "Menjelajah filesystem dengan os module",
          body: "Modul `os` memungkinkan Python menjelajah filesystem dan memeriksa metadata seperti permission. Scanner konfigurasi sederhana - mencari file dengan permission yang terlalu longgar - adalah pola dasar dari banyak tool hardening/audit otomatis.",
        },
        {
          kind: "praktik",
          title: "Scanner file world-writable",
          instructions: [
            "Buat beberapa file test dengan permission berbeda, salah satunya world-writable (`chmod 777`).",
            "Tulis script yang berjalan rekursif di satu direktori menggunakan `os.walk`.",
            "Untuk tiap file, cek apakah bit world-write aktif (gunakan `os.stat` dan operasi bitwise pada `st_mode`).",
            "Cetak daftar file bermasalah beserta permission-nya.",
          ],
          proof:
            "Direktori test dengan minimal 1 file world-writable, dan output script yang berhasil mendeteksinya.",
        },
        {
          kind: "kuis",
          question:
            "Fungsi os module apa yang dipakai untuk menjelajahi direktori secara REKURSIF?",
          inputType: "text",
          placeholder: "contoh: os.listdir",
          accepted: ["os.walk"],
          explanation:
            "`os.walk` masuk ke semua subdirektori secara otomatis; `os.listdir` cuma satu level.",
        },
      ],
    },
    {
      index: 13,
      label: "Hari 41",
      title: "Socket Programming Dasar",
      steps: [
        {
          kind: "materi",
          title: "Cara kerja port scanner di level socket",
          body: "Modul `socket` bekerja langsung di level TCP/UDP. Port scanner sederhana - mencoba connect ke tiap port dan melihat apakah berhasil - adalah cara paling langsung memahami bagaimana tool seperti Nmap bekerja di bawah permukaan.",
        },
        {
          kind: "praktik",
          title: "Bangun port scanner TCP sederhana",
          instructions: [
            "Tulis script yang menerima target host dan daftar port umum (21, 22, 23, 80, 443, 3306, 8080).",
            "Untuk tiap port, gunakan `socket.connect_ex()` dengan timeout pendek untuk cek apakah terbuka.",
            "Cetak status tiap port (open/closed).",
            "Uji ke `127.0.0.1` (harus menunjukkan port yang benar-benar terbuka di komputermu).",
          ],
          proof:
            "Script port scanner dan hasil scan terhadap 127.0.0.1 yang cocok dengan hasil `ss -tulpn`.",
        },
        {
          kind: "kuis",
          question:
            "Method socket apa yang mencoba connect tanpa melempar exception saat gagal (mengembalikan kode error sebagai angka)?",
          inputType: "text",
          placeholder: "contoh: connect",
          accepted: ["connect_ex"],
          explanation:
            "`connect_ex` mengembalikan 0 kalau berhasil atau kode errno kalau gagal, jadi tidak perlu try/except di setiap percobaan port.",
        },
      ],
    },
    {
      index: 14,
      label: "Hari 42",
      title: "Pengantar Scapy: Packet Crafting",
      steps: [
        {
          kind: "materi",
          title: "Membuat dan mengirim paket manual",
          body: "Scapy memungkinkan membuat, mengirim, dan menganalisis paket jaringan secara manual dari Python. Ini menjembatani pemahaman teori protokol (fase Network+) dengan kemampuan memanipulasi paket secara langsung.",
        },
        {
          kind: "praktik",
          title: "Kirim ICMP echo request dengan Scapy",
          instructions: [
            "Install scapy: `pip install scapy`.",
            "Tulis script yang membuat paket ICMP echo request ke `127.0.0.1` menggunakan `IP()/ICMP()`.",
            "Kirim dengan `sr1()` dan cetak ringkasan paket balasan (`.summary()`).",
            "Bandingkan hasilnya dengan `ping 127.0.0.1` biasa.",
          ],
          proof: "Script Scapy dan output ringkasan paket balasan ICMP.",
        },
        {
          kind: "kuis",
          question:
            "Fungsi Scapy apa yang mengirim SATU paket dan menunggu SATU balasan?",
          inputType: "text",
          placeholder: "contoh: send",
          accepted: ["sr1"],
          explanation:
            "`sr1` (send/receive, 1 answer) mengirim satu paket dan mengembalikan balasan pertama; `send()` biasa tidak menunggu balasan sama sekali.",
        },
      ],
    },
  ],
};

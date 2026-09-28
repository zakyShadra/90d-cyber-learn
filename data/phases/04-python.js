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
          title: "Tipe data dasar Python",
          body: "Python punya beberapa tipe data bawaan yang akan terus muncul di semua script security: `int` (bilangan bulat), `float` (bilangan desimal), `str` (teks), `bool` (True/False), `list` (koleksi terurut yang bisa diubah, ditulis `[1, 2, 3]`), dan `dict` (pasangan key-value, ditulis `{\"key\": \"value\"}`). Python bertipe dinamis - kamu tidak perlu mendeklarasikan tipe variabel secara eksplisit, interpreter menyimpulkannya dari nilai yang diberikan, tapi ini juga berarti bug tipe data (misal mencoba menjumlahkan string dengan angka) baru ketahuan saat runtime, bukan saat 'kompilasi'.",
        },
        {
          kind: "materi",
          title: "Kenapa konversi basis angka penting di security",
          body: "Alamat IP, MAC address, dan banyak header protokol jaringan direpresentasikan dalam biner atau heksadesimal, bukan desimal biasa - jadi kemampuan konversi antar-basis adalah skill dasar, bukan sekadar latihan matematika. Python menyediakan fungsi bawaan untuk ini: `bin(x)` mengembalikan representasi biner sebagai string berawalan `0b`, `hex(x)` mengembalikan heksadesimal berawalan `0x`, dan `int(string, base)` melakukan kebalikannya - mengubah string di basis tertentu kembali jadi integer, misal `int(\"ff\", 16)` menghasilkan 255.",
        },
        {
          kind: "praktik",
          title: "Konverter representasi oktet IP",
          instructions: [
            "Buka editor teks, buat file baru `octet_converter.py`.",
            "Tulis script yang minta user input satu oktet IP (0-255) lewat `input()`, lalu ubah jadi integer dengan `int()`.",
            "Validasi dulu: kalau hasil input di luar rentang 0-255, cetak pesan error dan hentikan script (jangan lanjut ke konversi).",
            "Kalau valid, tampilkan nilai itu dalam bentuk desimal (aslinya), biner 8-bit (pakai `bin(x)[2:].zfill(8)` supaya selalu 8 digit dengan leading zero), dan heksadesimal (`hex(x)`).",
            "Jalankan script 3 kali dengan input 192, 10, dan 255 - catat hasil ketiganya.",
            "Coba juga input di luar rentang (misal 300) untuk memastikan validasi errornya benar-benar jalan.",
          ],
          proof:
            "Script Python beserta output untuk ketiga nilai uji (192, 10, 255) dan bukti validasi menolak input di luar rentang 0-255.",
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
          title: "if/elif/else: mengambil keputusan",
          body: "Percabangan `if`/`elif`/`else` menjalankan blok kode berbeda tergantung kondisi boolean. Python tidak pakai kurung kurawal untuk menandai blok kode seperti bahasa lain - sebagai gantinya, indentasi (biasanya 4 spasi) itu sendiri yang menentukan blok mana yang termasuk ke `if` mana. Ini membuat kode Python konsisten rapi secara paksa, tapi juga berarti salah indentasi bisa mengubah logika program secara diam-diam tanpa error yang jelas.",
        },
        {
          kind: "materi",
          title: "for dan while: dua jenis pengulangan",
          body: "`for` mengulang sejumlah item yang sudah diketahui (elemen list, karakter string, angka dari `range()`), sementara `while` mengulang selama suatu kondisi masih bernilai True - cocok kalau jumlah pengulangan tidak diketahui di awal. Loop brute force sederhana (mencoba semua kombinasi PIN/password satu per satu) adalah cara paling konkret memahami kenapa panjang password/PIN memengaruhi waktu brute force secara eksponensial: tiap tambahan satu digit/karakter mengalikan jumlah kombinasi yang harus dicoba.",
        },
        {
          kind: "praktik",
          title: "Simulasikan brute force PIN 4 digit",
          instructions: [
            'Buat file `bruteforce_pin.py`, tentukan target PIN rahasia sebagai string, misal `target = "4821"`.',
            "Import modul `time` di baris paling atas, dan catat waktu mulai dengan `start = time.time()` sebelum loop dimulai.",
            'Tulis loop `for` yang mencoba semua kombinasi dari `"0000"` sampai `"9999"` (gunakan `range(10000)` lalu format tiap angka jadi 4 digit dengan `str(i).zfill(4)`).',
            "Hentikan loop begitu kombinasi yang dicoba sama dengan target (pakai `break`), lalu hitung `time.time() - start` untuk waktu eksekusi.",
            "Cetak jumlah percobaan sampai ketemu dan waktu eksekusinya.",
            "Tanpa menjalankan program, hitung manual dan tuliskan estimasi berapa kali lebih banyak kombinasi kalau PIN-nya 6 digit dibanding 4 digit.",
          ],
          proof:
            "Output jumlah percobaan dan waktu eksekusi untuk PIN 4 digit, plus perhitungan estimasi jumlah kombinasi untuk 6 digit.",
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
          title: "Satu baris menggantikan beberapa baris loop",
          body: "List comprehension, ditulis `[expr for x in iterable if kondisi]`, membuat list baru dari yang lama dalam satu baris ekspresif - menggantikan pola loop manual berisi `list_baru = []` diikuti `.append()` berulang di dalam loop. Bagian `if kondisi` di akhir bersifat opsional dan berfungsi sebagai filter: hanya item yang memenuhi kondisi itu yang masuk ke list hasil.",
        },
        {
          kind: "materi",
          title: "Dict comprehension: pola sama, bentuk beda",
          body: "Dict comprehension memakai kurung kurawal, ditulis `{key_expr: value_expr for x in iterable if kondisi}`, dan menghasilkan dictionary baru alih-alih list. Pola pikirnya sama persis dengan list comprehension - transformasi + filter dalam satu baris - cuma bentuk outputnya pasangan key-value, bukan urutan nilai tunggal. Aturan praktis kapan pakai comprehension: pakai kalau tetap mudah dibaca dalam satu baris; begitu logikanya bercabang (butuh if/elif/else bertingkat) atau butuh lebih dari satu ekspresi, loop biasa jauh lebih jelas dan lebih mudah di-debug.",
        },
        {
          kind: "praktik",
          title: "Filter port well-known dari daftar IP-port",
          instructions: [
            'Buat file `filter_ports.py`, definisikan list of tuples: `data = [("10.0.0.1", 22), ("10.0.0.2", 8080), ("10.0.0.3", 443), ("10.0.0.4", 3306)]`.',
            "Pakai dict comprehension untuk membuat dictionary baru `{ip: port}` HANYA untuk entri dengan port di bawah 1024 (well-known ports).",
            "Cetak hasilnya dan pastikan secara visual entri dengan port 8080 dan 3306 tidak ikut masuk ke hasil.",
            "Sebagai perbandingan, tulis ulang logika yang sama pakai loop `for` manual (tanpa comprehension) dan konfirmasi hasilnya identik.",
          ],
          proof:
            "Output dict yang hanya berisi entri dengan port well-known (<1024), plus versi loop manual yang menghasilkan output identik.",
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
          title: "Fungsi: membungkus logika supaya bisa dipakai ulang",
          body: "Fungsi (`def nama_fungsi(parameter):`) membungkus satu blok logika supaya bisa dipanggil berulang kali dengan input berbeda-beda, tanpa menulis ulang kodenya setiap kali. Fungsi bisa menerima parameter (nilai yang masuk saat dipanggil) dan mengembalikan hasil lewat `return` - tanpa `return` eksplisit, fungsi Python otomatis mengembalikan `None`. Memecah script jadi fungsi-fungsi kecil dengan tanggung jawab jelas juga membuat kode jauh lebih mudah ditest dan di-debug dibanding satu blok kode panjang tanpa struktur.",
        },
        {
          kind: "materi",
          title: "Modul: mengorganisir kode lintas file",
          body: "Modul adalah file `.py` yang isinya (fungsi, class, variabel) bisa di-import dan dipakai dari file lain lewat `import nama_modul` atau `from nama_modul import nama_fungsi`. Ini dasar dari membangun tool yang lebih besar dari satu file: logika inti ditaruh di satu modul, sementara file lain fokus pada cara memakainya (menerima input, menampilkan output). Python akan menjalankan SELURUH isi file begitu di-import, termasuk kode di luar fungsi/class - inilah kenapa pola `if __name__ == \"__main__\":` penting, supaya kode yang seharusnya cuma jalan saat file dieksekusi langsung tidak ikut jalan tanpa sengaja saat file itu di-import dari tempat lain.",
        },
        {
          kind: "praktik",
          title: "Ubah brute force PIN jadi modul yang bisa dipakai ulang",
          instructions: [
            "Pindahkan logika brute force dari Hari 30 ke file baru `pin_cracker.py`, bungkus jadi fungsi `crack_pin(target)` yang me-`return` jumlah percobaan dan waktu eksekusi (bukan cuma print).",
            'Di bagian bawah `pin_cracker.py`, tambahkan blok `if __name__ == "__main__":` yang memanggil `crack_pin` dengan satu contoh target, cuma untuk testing manual file itu sendiri.',
            "Buat file baru `run.py` yang melakukan `from pin_cracker import crack_pin`, lalu memanggilnya dengan 2 target PIN berbeda.",
            "Jalankan `python pin_cracker.py` langsung - konfirmasi blok testing di dalamnya jalan.",
            "Jalankan `python run.py` - konfirmasi blok testing di `pin_cracker.py` TIDAK ikut jalan (karena sekarang `__name__` bukan `\"__main__\"`), hanya hasil dari `run.py` yang tampil.",
          ],
          proof:
            "Dua file (pin_cracker.py, run.py) dan output run.py yang berhasil crack 2 PIN berbeda, plus konfirmasi blok testing di pin_cracker.py tidak ikut jalan saat di-import.",
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
          body: "Class membungkus state (data, disimpan sebagai atribut) dan behavior (method, fungsi milik class itu) yang saling terkait jadi satu unit. `__init__` adalah constructor - method khusus yang otomatis jalan begitu object baru dibuat, biasanya dipakai untuk menyimpan nilai awal ke atribut. `self` di parameter pertama tiap method merujuk ke instance object itu sendiri, memungkinkan method mengakses atribut milik object yang sama.",
        },
        {
          kind: "materi",
          title: "Kapan class lebih masuk akal daripada fungsi lepas",
          body: "Class jadi pilihan tepat begitu sebuah tool punya beberapa data yang saling terkait dan dipakai bersama oleh beberapa operasi - misal target host, daftar port, dan hasil scan untuk sebuah port scanner - daripada melempar semua data itu sebagai parameter terpisah ke setiap fungsi. Dengan class, data itu disimpan sekali sebagai atribut (`self.host`, `self.hasil`), dan tiap method tinggal mengaksesnya lewat `self` tanpa perlu parameter berulang-ulang.",
        },
        {
          kind: "praktik",
          title: "Bangun class PortScanner sederhana",
          instructions: [
            "Buat file `port_scanner.py`, import modul `socket` di baris atas.",
            "Definisikan class `PortScanner` dengan `__init__(self, host)` yang menyimpan parameter `host` ke `self.host`.",
            "Tambahkan method `is_open(self, port)` yang membuat socket baru, set timeout pendek (`settimeout(1)`), lalu memakai `socket.connect_ex((self.host, port))` untuk cek status port itu - method ini return True kalau hasil `connect_ex` adalah 0 (berhasil), False selainnya.",
            'Di bagian bawah, buat instance `scanner = PortScanner("127.0.0.1")`.',
            "Panggil `scanner.is_open(port)` untuk 2 port berbeda (satu yang kamu tahu terbuka dari hasil `ss -tulpn`, satu yang kamu tahu tertutup), cetak hasilnya.",
          ],
          proof:
            "Kode class PortScanner dan output pemanggilan is_open untuk 2 port, hasilnya konsisten dengan status port sebenarnya di `ss -tulpn`.",
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
          title: "Membaca dan menulis file di Python",
          body: "Fungsi `open(nama_file, mode)` membuka file dengan mode tertentu: `\"r\"` untuk membaca, `\"w\"` untuk menulis (menimpa isi lama), `\"a\"` untuk menambah di akhir file tanpa menghapus isi lama. Cara paling aman membuka file adalah lewat `with open(...) as f:` - blok `with` otomatis menutup file begitu selesai, bahkan kalau terjadi error di tengah proses, jadi kamu tidak perlu ingat memanggil `f.close()` manual. Membaca dan menulis file adalah operasi paling umum dalam scripting security: parsing log, memproses daftar IP hasil scan, menyimpan hasil analisis.",
        },
        {
          kind: "materi",
          title: "Validasi format tanpa mengandalkan library",
          body: "Sebelum memakai library siap pakai seperti `ipaddress`, ada nilainya melatih validasi format IPv4 secara manual: pecah string berdasarkan titik (`.split(\".\")`, harus menghasilkan tepat 4 bagian), lalu pastikan tiap bagian benar-benar berupa angka dan nilainya ada di rentang 0-255. Latihan ini membangun kebiasaan berpikir 'apa saja cara input ini bisa salah' - skill yang sama persis dibutuhkan saat menulis validasi input untuk mencegah kerentanan seperti injection di kode aplikasi nyata.",
        },
        {
          kind: "praktik",
          title: "Validator IP dari file teks",
          instructions: [
            'Buat file `ips.txt` berisi 15 baris, campur IP valid dan tidak valid (misal "999.1.1.1", "abc", "10.0.0.256", "10.0.0").',
            "Tulis script `validate_ips.py` yang membuka `ips.txt` dengan `with open(...)` dan membaca baris per baris.",
            'Untuk tiap baris, hapus whitespace di ujung (`.strip()`), lalu validasi: harus persis 4 bagian setelah `.split(\".\")`, tiap bagian harus bisa di-`int()`-kan tanpa error, dan nilainya harus di rentang 0-255 - JANGAN memakai library `ipaddress`.',
            "Tulis tiap IP yang valid ke file baru `valid_ips.txt` (satu IP per baris), pakai mode `\"w\"` untuk membuatnya dari awal.",
            "Jalankan script, buka `valid_ips.txt`, konfirmasi isinya cuma IP-IP yang benar-benar valid dari `ips.txt`.",
          ],
          proof:
            "File ips.txt (input), valid_ips.txt (output), dan script validator-nya, dengan isi valid_ips.txt yang benar-benar cuma berisi IP valid.",
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
          title: "JSON sebagai format pertukaran data standar",
          body: "JSON (JavaScript Object Notation) adalah format data terstruktur berbasis teks yang jadi standar de facto untuk response API modern dan banyak file konfigurasi tool security - strukturnya (object jadi dict, array jadi list, string/number/boolean apa adanya) memetakan hampir 1:1 ke tipe data Python, sehingga gampang diproses.",
        },
        {
          kind: "materi",
          title: "load vs loads, dan dumps untuk arah sebaliknya",
          body: 'Modul bawaan `json` punya tiga fungsi utama yang gampang tertukar: `json.load(file_object)` membaca dan mem-parsing langsung dari FILE yang sudah dibuka, `json.loads(string)` mem-parsing dari STRING yang sudah ada di memori (huruf "s" di akhir untuk "string"), dan `json.dumps(obj)` melakukan kebalikannya - mengubah objek Python (dict/list) kembali jadi teks JSON, berguna saat kamu perlu mengirim data itu lewat network atau menyimpannya ke file.',
        },
        {
          kind: "praktik",
          title: "Filter temuan severity tinggi dari file JSON",
          instructions: [
            'Buat file `findings.json` berisi list JSON dari 3 objek finding, masing-masing punya field `id`, `severity`, `description` - buat minimal satu finding dengan `severity: "high"`.',
            "Tulis script `filter_findings.py` yang membuka `findings.json` dengan `with open(...)` dan memakai `json.load(f)` untuk mem-parsingnya jadi list Python.",
            'Pakai list comprehension untuk filter hanya finding yang `severity`-nya `"high"`.',
            "Cetak jumlah finding severity high yang ditemukan, dan cetak juga `id`-nya masing-masing.",
            "Sebagai latihan arah sebaliknya, buat dict baru berisi ringkasan (`{\"total\": ..., \"high_count\": ...}`) dan tulis ke file `summary.json` pakai `json.dumps()`.",
          ],
          proof:
            'Isi findings.json, output jumlah dan id finding severity "high", serta isi summary.json hasil json.dumps().',
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
          title: "try/except: mencegah crash yang tidak perlu",
          body: "Blok `try:`/`except:` menjalankan kode yang berpotensi gagal di dalam `try`, dan menangkap error (exception) yang muncul lewat `except` alih-alih membiarkan seluruh script berhenti mendadak. Kamu bisa menangkap jenis exception spesifik (`except ValueError:`) untuk menangani kasus tertentu secara berbeda, atau exception generik (`except Exception as e:`) untuk menangkap apa pun sambil tetap menyimpan pesan errornya lewat `e`.",
        },
        {
          kind: "materi",
          title: "finally, dan filosofi memisahkan jenis error",
          body: "Blok `finally:` (opsional, ditambahkan setelah except) selalu dijalankan apa pun hasilnya - dipakai untuk cleanup seperti menutup koneksi atau file, memastikan itu tetap terjadi meski ada error di tengah jalan. Untuk tool yang memproses data dari luar (log, file, hasil network), exception handling yang baik berarti memisahkan dua jenis error secara sadar: error pada SATU baris/item yang harus dicatat lalu dilewati supaya proses lain tetap lanjut, versus error fatal yang memang harus menghentikan seluruh program karena melanjutkan justru berbahaya (misal gagal koneksi ke database yang jadi sumber data utama).",
        },
        {
          kind: "praktik",
          title: "Perkuat validator IP agar tidak pernah crash",
          instructions: [
            "Ambil `ips.txt` dan `validate_ips.py` dari Hari 34, tambahkan baris rusak baru: satu baris kosong dan satu baris berisi teks acak tanpa titik sama sekali (misal `\"halo dunia\"`).",
            "Bungkus proses parsing tiap baris (split, konversi ke int, cek rentang) dengan `try`/`except` supaya error di satu baris tidak menghentikan seluruh script.",
            "Saat terjadi exception, tangkap pesan errornya, lalu tulis baris bermasalah beserta pesan error itu ke file `errors.log` (mode `\"a\"`, supaya menumpuk tiap kali dijalankan), lalu `continue` ke baris berikutnya.",
            "Jalankan ulang script dari awal sampai akhir, konfirmasi tidak ada crash meski ada baris rusak.",
            "Buka `errors.log`, konfirmasi baris kosong dan baris teks acak tadi tercatat sebagai error di sana, bukan ikut lolos ke `valid_ips.txt`.",
          ],
          proof:
            "ips.txt versi rusak, errors.log berisi baris bermasalah beserta pesan errornya, dan bukti script selesai sampai akhir tanpa crash.",
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
          title: "Kenapa tiap proyek butuh virtual environment sendiri",
          body: "Virtual environment (venv) menciptakan lingkungan Python terisolasi per proyek, lengkap dengan salinan interpreter dan folder package sendiri - artinya package yang di-install lewat `pip` di satu venv tidak memengaruhi proyek lain atau instalasi Python sistem. Ini penting karena dua proyek berbeda bisa saja butuh VERSI package yang berbeda dan saling bentrok kalau di-install global; venv mencegah konflik itu dengan mengisolasi sepenuhnya.",
        },
        {
          kind: "materi",
          title: "requests: HTTP tanpa ribet",
          body: "Library pihak ketiga `requests` menyederhanakan pengiriman HTTP request dibanding modul bawaan Python yang lebih verbose - satu baris `requests.get(url)` sudah cukup untuk mengirim GET request dan mendapat kembali objek response lengkap dengan `.status_code`, `.headers`, dan `.text`. Ini jadi dasar dari banyak tool security yang berinteraksi dengan web/API: dari sekadar cek apakah sebuah endpoint hidup, sampai mengirim payload testing ke parameter tertentu.",
        },
        {
          kind: "praktik",
          title: "Cek status HTTP sebuah website",
          instructions: [
            "Buat folder proyek baru, masuk ke dalamnya, lalu buat virtual environment: `python -m venv venv`.",
            "Aktifkan venv (`source venv/bin/activate` di Linux/Mac), konfirmasi prompt terminal berubah menandakan venv aktif.",
            "Install requests DI DALAM venv yang aktif: `pip install requests`.",
            "Tulis script `check_status.py` yang melakukan `requests.get(url)` ke satu URL, lalu cetak `response.status_code` dan 3 response header pertama dari `response.headers`.",
            "Bungkus request itu dengan try/except menangkap `requests.exceptions.ConnectionError`, supaya URL yang tidak ada tidak bikin script crash.",
            "Uji ke satu URL yang valid (harus dapat status 200-an) dan satu URL yang jelas tidak ada (harus tertangkap sebagai connection error, bukan crash).",
          ],
          proof:
            "Script dan output untuk kedua kasus (URL valid menunjukkan status code, URL gagal tertangani rapi lewat except tanpa crash).",
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
          title: "Positional vs optional argument",
          body: 'Modul bawaan `argparse` menangani argumen command line secara terstruktur, dua jenis utama: argumen positional (wajib diisi, urutannya menentukan arti, contoh `python tool.py target.com`) dan argumen optional (pakai flag seperti `--target`, biasanya juga punya nilai default kalau tidak diisi, dan urutannya bebas). Perilaku ini didaftarkan lewat `parser.add_argument("nama")` untuk positional, atau `parser.add_argument("--nama")` untuk optional.',
        },
        {
          kind: "materi",
          title: "--help gratis, dan kenapa itu penting",
          body: 'Tool yang dibangun dengan `argparse` otomatis mendapat flag `-h`/`--help` yang menampilkan teks bantuan berisi semua argumen yang didaftarkan beserta deskripsinya (kalau kamu isi parameter `help="..."` saat `add_argument`) - tanpa perlu menulis teks bantuan itu manual. Ini membuat tool jauh lebih siap dipakai orang lain (atau dirimu sendiri 3 bulan lagi yang sudah lupa cara pakainya) dibanding hardcode nilai langsung di dalam script, yang mengharuskan orang lain membuka dan mengedit source code cuma untuk mengganti target.',
        },
        {
          kind: "praktik",
          title: "Ubah script jadi CLI tool",
          instructions: [
            "Ambil script HTTP status checker dari Hari 37, salin jadi file baru `cek.py`.",
            'Buat objek parser: `parser = argparse.ArgumentParser(description="Cek status HTTP sebuah URL")`.',
            'Ganti URL yang hardcoded dengan argument positional: `parser.add_argument("url", help="URL yang mau dicek")`, lalu ambil nilainya lewat `args = parser.parse_args()` dan `args.url`.',
            "Jalankan `python cek.py --help`, konfirmasi ada teks bantuan otomatis yang menampilkan argumen `url` beserta deskripsinya.",
            "Jalankan `python cek.py https://example.com` dan `python cek.py https://google.com` - konfirmasi keduanya jalan dengan URL berbeda tanpa mengubah satu baris kode pun.",
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
          title: "Pola, bukan teks literal",
          body: 'Modul bawaan `re` mencocokkan TEKS terhadap sebuah POLA (regular expression/regex), bukan terhadap teks literal tertentu - misal pola `\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}` mencocokkan struktur "beberapa digit, titik, beberapa digit, titik, ..." yang menjadi bentuk umum alamat IPv4, tanpa perlu tahu IP spesifiknya apa. Ini jauh lebih fleksibel dibanding mencari teks pasti, dan sangat berguna untuk mengekstrak pola berulang (IP, email, pola serangan tertentu) dari log dalam jumlah besar - jauh lebih cepat dan reliable daripada parsing manual karakter per karakter.',
        },
        {
          kind: "materi",
          title: "findall vs search vs match",
          body: "Tiga fungsi `re` yang sering tertukar punya perilaku berbeda: `re.match()` cuma cek kecocokan di AWAL string, `re.search()` mencari kecocokan PERTAMA di mana pun dalam string, sementara `re.findall()` mengembalikan SEMUA kecocokan dalam string sebagai list. Untuk kebutuhan ekstraksi (misal 'ambil semua IP yang ada di log ini'), `re.findall()` biasanya jadi pilihan tepat karena satu baris log bisa saja mengandung lebih dari satu IP.",
        },
        {
          kind: "praktik",
          title: "Ekstrak IP dan email dari sample log",
          instructions: [
            "Buat file `sample.log` berisi 10 baris log campuran yang mengandung IP address dan/atau alamat email, beberapa baris punya lebih dari satu.",
            'Tulis script `extract.py`, import `re`, lalu tulis pola regex untuk IPv4: `r"\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"`.',
            'Tulis pola regex kedua untuk email, minimal menangkap pola umum `sesuatu@domain.tld`: `r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+"`.',
            "Baca `sample.log` baris per baris, pakai `re.findall()` dengan kedua pola itu untuk mengumpulkan semua IP dan email yang ketemu ke dalam dua list terpisah.",
            "Ubah kedua list itu jadi `set()` untuk menghilangkan duplikat, lalu cetak daftar IP unik dan email unik.",
          ],
          proof:
            "sample.log dan output daftar IP unik serta email unik yang berhasil diekstrak, tanpa duplikat.",
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
          title: "os.walk: menjelajah filesystem secara rekursif",
          body: "Modul bawaan `os` memungkinkan Python berinteraksi dengan filesystem: membuat/menghapus folder, memeriksa metadata file, dan yang paling relevan di sini, `os.walk(path)` menjelajahi SEMUA subfolder di bawah `path` secara rekursif, menghasilkan tuple `(folder_saat_ini, daftar_subfolder, daftar_file)` untuk tiap level. Ini berbeda dari `os.listdir()` yang cuma melihat satu level folder saja, tanpa masuk ke subfoldernya.",
        },
        {
          kind: "materi",
          title: "Membaca permission lewat os.stat dan operasi bitwise",
          body: "`os.stat(path)` mengembalikan objek berisi metadata file, termasuk `st_mode` - representasi numerik dari permission file dalam bentuk bit. Untuk cek apakah bit tertentu aktif (misal 'world-writable', permission yang mengizinkan SIAPA PUN menulis ke file itu), dipakai operasi bitwise AND (`&`) antara `st_mode` dengan konstanta bit yang relevan (`stat.S_IWOTH` dari modul `stat` untuk world-write) - kalau hasilnya bukan 0, berarti bit itu aktif. Scanner konfigurasi sederhana seperti ini - mencari file dengan permission yang terlalu longgar - adalah pola dasar dari banyak tool hardening/audit otomatis di dunia nyata.",
        },
        {
          kind: "praktik",
          title: "Scanner file world-writable",
          instructions: [
            "Buat folder test `test_dir/` berisi beberapa file, atur permission berbeda-beda dengan `chmod`, pastikan minimal satu file world-writable (`chmod 777 test_dir/bahaya.txt`).",
            "Tulis script `wworld_scanner.py`, import `os` dan `stat`.",
            "Gunakan `os.walk(\"test_dir\")` untuk mendapat semua file di dalam folder itu (gabungkan `folder_saat_ini` dan tiap nama file jadi path lengkap).",
            "Untuk tiap file, ambil `os.stat(path).st_mode`, cek dengan `mode & stat.S_IWOTH` apakah bit world-write aktif.",
            "Cetak daftar file bermasalah beserta permission-nya dalam format oktal yang mudah dibaca (`oct(stat.S_IMODE(mode))`).",
          ],
          proof:
            "Direktori test dengan minimal 1 file world-writable, dan output script yang berhasil mendeteksinya beserta permission oktalnya.",
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
          title: "Socket: pintu masuk komunikasi TCP/UDP",
          body: "Modul bawaan `socket` bekerja langsung di level TCP/UDP, jauh lebih rendah dari library seperti `requests` yang sudah membungkus detail ini. Membuat socket TCP butuh dua parameter: `socket.AF_INET` (pakai alamat IPv4) dan `socket.SOCK_STREAM` (pakai TCP, bukan UDP) - `socket.socket(socket.AF_INET, socket.SOCK_STREAM)` menghasilkan objek socket yang siap dipakai untuk connect ke host:port tertentu.",
        },
        {
          kind: "materi",
          title: "Cara kerja port scanner di level socket",
          body: "Port scanner paling sederhana bekerja dengan mencoba `connect()` ke tiap port satu per satu dan melihat apakah koneksinya berhasil (port terbuka) atau ditolak/timeout (port tertutup/difilter) - inilah cara paling langsung memahami bagaimana tool seperti Nmap bekerja di bawah permukaan, meski Nmap sendiri jauh lebih canggih (paralel, berbagai teknik scan selain full connect). Timeout yang pendek penting di sini: tanpa timeout, mencoba connect ke port yang difilter firewall bisa menggantung lama menunggu balasan yang tidak akan pernah datang.",
        },
        {
          kind: "praktik",
          title: "Bangun port scanner TCP sederhana",
          instructions: [
            "Tulis script `port_scanner.py` yang menerima target host dan daftar port umum (21, 22, 23, 80, 443, 3306, 8080) sebagai list di dalam kode.",
            "Untuk tiap port, buat socket baru, set timeout pendek dengan `sock.settimeout(1)`, lalu gunakan `sock.connect_ex((host, port))` untuk cek apakah terbuka - ingat, `connect_ex` mengembalikan 0 kalau berhasil, bukan melempar exception.",
            "Cetak status tiap port (open/closed) berdasarkan hasil `connect_ex`, lalu tutup socket dengan `sock.close()` sebelum lanjut ke port berikutnya.",
            "Uji ke `127.0.0.1` - hasilnya harus menunjukkan port yang benar-benar terbuka di komputermu.",
            "Bandingkan hasil scan-mu dengan output `ss -tulpn` untuk memverifikasi akurasinya port per port.",
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
          title: "Membuat paket dari nol, bukan cuma mengirim data",
          body: "Scapy adalah library Python yang memungkinkan membuat, mengirim, dan menganalisis paket jaringan secara manual - alih-alih memakai abstraksi tinggi seperti `socket`/`requests` yang menyembunyikan detail header, Scapy membiarkanmu menyusun tiap layer paket secara eksplisit lewat operator `/`, misal `IP(dst=\"127.0.0.1\")/ICMP()` menyusun paket IP yang membungkus ICMP echo request. Ini menjembatani pemahaman teori protokol (fase Network+ - header, layer, encapsulation) dengan kemampuan memanipulasi paket secara langsung dari kode.",
        },
        {
          kind: "materi",
          title: "sr1 vs send: mengirim dengan atau tanpa menunggu balasan",
          body: "Scapy punya beberapa fungsi pengiriman dengan perilaku berbeda: `send()` mengirim paket dan langsung selesai, tanpa peduli apakah ada balasan atau tidak; `sr1()` (send/receive, 1 answer) mengirim SATU paket dan MENUNGGU balasan pertamanya, cocok untuk kasus seperti ICMP echo request di mana kamu memang perlu tahu apakah host membalas. Ada juga `sr()` untuk mengirim banyak paket sekaligus dan menunggu semua balasannya - berguna untuk scanning, tapi di luar cakupan latihan hari ini.",
        },
        {
          kind: "praktik",
          title: "Kirim ICMP echo request dengan Scapy",
          instructions: [
            "Install scapy di dalam venv-mu: `pip install scapy` (mungkin perlu `sudo` karena Scapy butuh akses raw socket).",
            'Tulis script `ping_scapy.py`, import `IP`, `ICMP`, `sr1` dari scapy: `from scapy.all import IP, ICMP, sr1`.',
            'Buat paket dengan menyusun layer: `paket = IP(dst="127.0.0.1")/ICMP()`.',
            "Kirim dengan `balasan = sr1(paket, timeout=2)`, lalu cek apakah `balasan` bukan `None` sebelum mengaksesnya (kalau host tidak membalas dalam 2 detik, `sr1` mengembalikan `None`).",
            "Kalau ada balasan, cetak ringkasannya dengan `balasan.summary()`.",
            "Jalankan `ping 127.0.0.1` biasa di terminal lain, bandingkan responsnya secara konsep dengan hasil script Scapy-mu.",
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

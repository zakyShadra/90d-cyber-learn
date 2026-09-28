// Fase 7: ELK Stack
export default {
  id: "elk",
  number: 7,
  title: "ELK Stack",
  dayRange: "Hari 64–70",
  summary:
    "Elasticsearch, Logstash, dan Kibana adalah tumpukan SIEM open-source paling umum dipakai untuk mengumpulkan, mengolah, dan memvisualisasikan log keamanan.",
  resources: [
    {
      label: "Complete Guide to the ELK Stack - Logz.io",
      url: "https://logz.io/learn/complete-guide-elk-stack/",
    },
    {
      label: "Elastic - Get Started Docs",
      url: "https://www.elastic.co/docs/get-started",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 64",
      title: "Arsitektur ELK Stack",
      steps: [
        {
          kind: "materi",
          title: "Empat komponen, empat peran",
          body: "Elasticsearch menyimpan dan mengindeks data untuk pencarian cepat, bahkan di antara jutaan baris log. Logstash mengolah dan mentransformasi log mentah (biasanya teks tak terstruktur) jadi field-field terpisah sebelum masuk Elasticsearch. Kibana memvisualisasikan data yang tersimpan di Elasticsearch lewat dashboard, grafik, dan tabel. Beats adalah keluarga agen ringan yang mengirim log dari sumbernya (server, aplikasi) ke Logstash atau langsung ke Elasticsearch, tanpa proses transformasi berat.",
        },
        {
          kind: "materi",
          title: "Alur data dari sumber sampai layar",
          body: "Alur khas satu log security lewat ELK: agen Beats (misal Filebeat) membaca file log di server sumber → mengirim ke Logstash → Logstash mem-parsing teks mentah itu jadi field terstruktur (timestamp, source_ip, event_type, dst) lewat filter (grok) → hasil terstruktur dikirim dan disimpan sebagai document di index Elasticsearch → Kibana query index itu untuk ditampilkan sebagai dashboard yang bisa di-drill-down. Beats dan Logstash bisa dilewati sebagian (misal Beats langsung ke Elasticsearch tanpa Logstash) kalau lognya sudah cukup terstruktur, tapi pola lengkap di atas yang paling umum untuk log mentah seperti auth.log atau access log web server.",
        },
        {
          kind: "materi",
          title: "Kenapa ELK jadi pilihan SIEM open-source",
          body: "SIEM (Security Information and Event Management) butuh tiga kemampuan inti: mengumpulkan log dari banyak sumber berbeda, menyimpannya dengan cara yang bisa dicari cepat meski volumenya besar, dan memvisualisasikan/mengalert-kan pola mencurigakan. ELK menyediakan ketiganya sebagai open-source (gratis, bisa di-host sendiri) - inilah kenapa banyak SOC (Security Operations Center), terutama yang budget-nya terbatas, memakai ELK sebagai SIEM utama atau pelengkap SIEM komersial yang lebih mahal (Splunk, QRadar, dst). Konsep yang kamu pelajari di fase ini portable ke SIEM lain, karena inti kerjanya (kumpulkan-parsing-simpan-cari-visualisasi-alert) hampir selalu sama.",
        },
        {
          kind: "praktik",
          title: "Jalankan Elasticsearch dan Kibana lokal",
          instructions: [
            "Install Docker jika belum ada.",
            "Jalankan Elasticsearch dan Kibana lewat Docker (single-node, sesuai panduan resmi Elastic).",
            "Konfirmasi Elasticsearch hidup: `curl http://localhost:9200`, perhatikan field `cluster_name` dan `version` di response JSON-nya.",
            "Buka Kibana di browser (`http://localhost:5601`) dan konfirmasi UI-nya bisa diakses.",
            "Di Kibana, buka menu Stack Monitoring atau halaman status untuk melihat kondisi cluster Elasticsearch dari sisi UI, bandingkan dengan output curl tadi.",
          ],
          proof:
            "Output curl ke port 9200 dan screenshot Kibana yang berhasil terbuka.",
        },
        {
          kind: "kuis",
          question:
            "Komponen ELK mana yang bertugas memvisualisasikan data lewat dashboard?",
          inputType: "text",
          placeholder: "contoh: Logstash",
          accepted: ["kibana"],
          explanation:
            "Kibana adalah lapisan visualisasi ELK - Elasticsearch menyimpan datanya, Logstash mengolahnya, Kibana yang menampilkannya jadi grafik dan dashboard.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 65",
      title: "Elasticsearch Dasar: Index dan Document",
      steps: [
        {
          kind: "materi",
          title: "Analogi ke database relasional",
          body: "Elasticsearch menyimpan data sebagai document JSON di dalam index (mirip tabel di database relasional, dengan document sebagai barisnya dan field di dalam document sebagai kolomnya). Bedanya dengan database relasional: Elasticsearch tidak mewajibkan skema kaku di awal (schema-on-write yang fleksibel lewat dynamic mapping) dan dioptimalkan penuh untuk pencarian teks/full-text search, bukan transaksi terstruktur seperti SQL.",
        },
        {
          kind: "materi",
          title: "Mapping: skema di balik fleksibilitas",
          body: "Meski terkesan bebas skema, tiap index sebenarnya punya mapping - definisi tipe data tiap field (text untuk full-text search, keyword untuk exact match/agregasi, date, integer, dst). Kalau kamu insert document baru tanpa mapping eksplisit, Elasticsearch menebak tipe field secara otomatis (dynamic mapping) berdasarkan nilai yang dikirim - kadang tebakannya keliru (misal angka yang seharusnya keyword malah jadi integer), sehingga di proyek produksi, mapping biasanya didefinisikan eksplisit dari awal, bukan dibiarkan ditebak.",
        },
        {
          kind: "materi",
          title: "REST API: CRUD lewat HTTP polos",
          body: "Semua operasi Elasticsearch (create, read, update, delete document, sampai membuat/menghapus index) bisa dilakukan lewat REST API biasa - `PUT /index/_doc/id` untuk insert/replace, `GET /index/_doc/id` untuk ambil satu document, `POST /index/_search` untuk query, `DELETE /index/_doc/id` untuk hapus. Kibana Dev Tools menyediakan editor nyaman untuk menulis request-request ini tanpa perlu curl manual, lengkap dengan autocomplete syntax.",
        },
        {
          kind: "praktik",
          title: "Buat index dan query manual lewat Dev Tools",
          instructions: [
            "Buka Kibana Dev Tools.",
            "Buat index baru bernama `test-logs` dengan `PUT /test-logs`.",
            "Insert 5 document manual (`POST /test-logs/_doc`) berisi field `timestamp`, `source_ip`, dan `event` (rekayasa data log sederhana).",
            "Jalankan `GET /test-logs/_mapping` untuk melihat tipe data yang otomatis ditebak Elasticsearch dari kelima document tadi.",
            "Jalankan query match (`GET /test-logs/_search`) untuk mencari document dengan `event` tertentu, catat berapa hasil yang cocok.",
          ],
          proof:
            "Query Dev Tools yang dipakai untuk insert dan search, beserta hasilnya.",
        },
        {
          kind: "kuis",
          question:
            'Dalam Elasticsearch, kumpulan document yang polanya mirip disebut apa (analog ke "tabel" di database relasional)?',
          inputType: "text",
          placeholder: "contoh: document",
          accepted: ["index"],
          explanation:
            "Index adalah wadah document sejenis. `test-logs` di latihan ini adalah satu index, dan tiap log yang kamu insert adalah satu document di dalamnya.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 66",
      title: "Query DSL Dasar di Elasticsearch",
      steps: [
        {
          kind: "materi",
          title: "Match, term, dan range: tiga jenis pencarian dasar",
          body: "Elasticsearch Query DSL adalah bahasa query berbasis JSON. `match` melakukan full-text search yang menganalisis teks (tokenisasi, lowercase, dst) sehingga cocok untuk field bertipe `text` yang isinya kalimat bebas. `term` melakukan exact match tanpa analisis apa pun, cocok untuk field bertipe `keyword` seperti status kode atau ID yang harus cocok persis. `range` mencari nilai dalam rentang tertentu, dipakai untuk field angka atau tanggal (misal `timestamp` dalam 1 jam terakhir, atau `status_code` di atas 400).",
        },
        {
          kind: "materi",
          title: "Query bool: menggabungkan banyak kondisi",
          body: "Query `bool` menggabungkan beberapa kondisi jadi satu query kompleks lewat empat klausa: `must` (kondisi wajib cocok, ikut memengaruhi skor relevansi), `filter` (kondisi wajib cocok tapi TIDAK memengaruhi skor - lebih cepat karena hasilnya bisa di-cache, cocok untuk kondisi yes/no seperti rentang tanggal), `should` (kondisi opsional yang menaikkan skor kalau cocok, tidak wajib), dan `must_not` (kondisi yang WAJIB tidak cocok, document yang match klausa ini dibuang dari hasil). Kombinasi `bool` inilah bentuk query paling sering dipakai di dashboard SIEM sungguhan, karena investigasi keamanan hampir selalu butuh beberapa syarat sekaligus (misal: event login gagal, DARI rentang waktu tertentu, KECUALI dari IP kantor yang sudah dikenal).",
        },
        {
          kind: "materi",
          title: "Kapan pakai filter vs must",
          body: "Aturan praktis: pakai `filter` untuk kondisi yang jawabannya cuma ya/tidak dan tidak butuh skor relevansi (rentang tanggal, status field tertentu, kecocokan exact keyword) - performanya lebih baik karena Elasticsearch bisa cache hasilnya. Pakai `must`/`should` hanya kalau kamu memang butuh urutan hasil berdasarkan seberapa relevan (misal pencarian teks bebas di kolom deskripsi insiden). Kesalahan umum pemula: selalu pakai `must` untuk semua kondisi padahal kebanyakan sebenarnya cocok jadi `filter`.",
        },
        {
          kind: "praktik",
          title: "Coba range query dan bool query",
          instructions: [
            "Di index `test-logs` dari Hari 65, jalankan query `range` untuk mencari document dengan `timestamp` dalam 1 jam terakhir.",
            "Jalankan query `bool` yang menggabungkan `must` (event tertentu) dengan `must_not` (source_ip tertentu yang mau dikecualikan).",
            "Ubah query bool tadi supaya kondisi event-nya dipindah ke klausa `filter` alih-alih `must`, jalankan lagi dan bandingkan hasilnya (harus tetap sama jumlahnya, cuma beda cara Elasticsearch memprosesnya).",
            "Bandingkan hasil ketiganya (range, bool dengan must, bool dengan filter) dengan query `match` sederhana terhadap kondisi yang sama.",
          ],
          proof:
            "Ketiga query (range, bool, match) beserta hasilnya, dengan catatan perbedaan jumlah/isi hasil antara bool query dan match sederhana.",
        },
        {
          kind: "kuis",
          question:
            "Klausa apa di dalam query `bool` yang dipakai untuk MENGECUALIKAN document yang cocok kondisi tertentu?",
          inputType: "text",
          placeholder: "contoh: must",
          accepted: ["must_not"],
          explanation:
            "`must_not` membuang document yang cocok kondisi di dalamnya - kebalikan dari `must` (wajib cocok) dan `should` (menambah skor relevansi kalau cocok, tidak wajib).",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 67",
      title: "Logstash Pipeline dan Grok",
      steps: [
        {
          kind: "materi",
          title: "Tiga tahap satu pipeline",
          body: "Pipeline Logstash punya 3 tahap berurutan: input (dari mana data diambil - file, syslog, Beats, Kafka, dst), filter (transformasi data - parsing, menghapus field tidak perlu, menambah field baru), dan output (ke mana data hasil olahan dikirim - paling umum Elasticsearch, tapi bisa juga file atau sistem lain). Satu pipeline bisa punya banyak plugin input/filter/output sekaligus, dieksekusi berurutan sesuai konfigurasi.",
        },
        {
          kind: "materi",
          title: "Grok: regex dengan nama, bukan regex mentah",
          body: "Grok adalah plugin filter paling umum untuk mem-parsing teks tak terstruktur jadi field-field terpisah, bekerja dengan mencocokkan baris log terhadap pola bernama yang sebenarnya di baliknya adalah kumpulan regex - bedanya, grok punya ratusan pola siap pakai (`%{IP:source_ip}`, `%{TIMESTAMP_ISO8601:timestamp}`, `%{WORD:action}`, dst) yang jauh lebih mudah dibaca dan digabung dibanding menulis satu regex raksasa dari nol. Sintaks umumnya `%{POLA:nama_field}` - bagian POLA menentukan bentuk teks yang dicari, nama_field menentukan field apa hasil tangkapannya disimpan di document akhir.",
        },
        {
          kind: "materi",
          title: "Debugging grok yang gagal parsing",
          body: "Kesalahan paling umum saat menulis pattern grok adalah pattern tidak cocok PERSIS dengan format baris log (termasuk spasi, tanda baca, dan urutan tiap elemen) - kalau grok gagal mencocokkan, Logstash biasanya menambahkan tag `_grokparsefailure` ke document itu alih-alih error keras, sehingga document tetap masuk Elasticsearch tapi tanpa field terstruktur yang diharapkan. Kibana punya Grok Debugger (di menu Dev Tools) untuk menguji satu pattern terhadap satu baris sample sebelum dipasang di pipeline sungguhan - kebiasaan baik: selalu uji pattern di situ dulu, jangan langsung coba-coba di pipeline yang sudah jalan.",
        },
        {
          kind: "praktik",
          title: "Parse log SSH dengan Logstash",
          instructions: [
            'Siapkan file sample auth.log berisi beberapa baris "Failed password" dan "Accepted password".',
            "Sebelum menulis config Logstash, uji dulu pattern grok yang kamu rencanakan di Kibana Grok Debugger memakai satu baris sample dari auth.log itu.",
            "Tulis konfigurasi Logstash: input file, filter grok yang mengekstrak timestamp/user/IP dari baris log (pakai pattern yang sudah teruji), output ke Elasticsearch index `ssh-logs`.",
            "Jalankan Logstash dengan config itu.",
            "Verifikasi di Kibana Dev Tools bahwa document di `ssh-logs` sudah punya field terstruktur (bukan satu string mentah), dan cek tidak ada tag `_grokparsefailure` di document-nya.",
          ],
          proof:
            "File konfigurasi Logstash dan hasil query yang menunjukkan field terstruktur di Elasticsearch.",
        },
        {
          kind: "kuis",
          question:
            "Tiga tahap dalam satu pipeline Logstash adalah input, filter, dan apa?",
          inputType: "text",
          placeholder: "contoh: index",
          accepted: ["output"],
          explanation:
            "Output menentukan ke mana data yang sudah diproses dikirim - paling umum ke Elasticsearch, tapi bisa juga ke file, Kafka, atau tujuan lain.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 68",
      title: "Mengirim Log Nyata dengan Filebeat",
      steps: [
        {
          kind: "materi",
          title: "Agen ringan, bukan polling manual",
          body: "Filebeat adalah agen ringan yang memantau file log dan mengirim isinya secara real-time ke Logstash atau langsung ke Elasticsearch, tanpa perlu polling manual dari sisi kamu. Filebeat mengingat posisi terakhir yang sudah dibaca di tiap file (lewat registry file internal), jadi kalau Filebeat restart, ia melanjutkan dari posisi itu, bukan membaca ulang dari awal atau melewatkan baris baru.",
        },
        {
          kind: "materi",
          title: "Keluarga Beats dan module siap pakai",
          body: 'Filebeat termasuk keluarga "Beats" - agen-agen kecil khusus satu jenis data (Metricbeat untuk metrik sistem/CPU/memory, Packetbeat untuk traffic jaringan, Auditbeat untuk audit framework Linux, Winlogbeat untuk Windows Event Log). Filebeat juga punya "module" siap pakai untuk sumber log populer (nginx, mysql, system auth log) yang sudah menyertakan pattern grok/parsing bawaan - alih-alih menulis pipeline Logstash dari nol seperti Hari 67, module ini langsung mem-parsing format log standar tanpa konfigurasi manual.',
        },
        {
          kind: "materi",
          title: "Anatomi filebeat.yml dan jaminan pengiriman",
          body: "Konfigurasi Filebeat (`filebeat.yml`) intinya dua bagian: `filebeat.inputs` (daftar path file yang dipantau, plus tipe input) dan `output` (ke mana data dikirim - `output.logstash` atau `output.elasticsearch`, lengkap dengan host dan kredensial kalau perlu). Filebeat menjamin pengiriman at-least-once - kalau output tujuan sedang down, Filebeat akan menahan dan mencoba ulang, bukan membuang data begitu saja, sehingga log tidak hilang meski Logstash/Elasticsearch sempat mati sebentar.",
        },
        {
          kind: "praktik",
          title: "Ship log sistem asli dengan Filebeat",
          instructions: [
            "Install Filebeat di mesinmu.",
            "Konfigurasi input Filebeat (`filebeat.inputs`) untuk membaca auth.log/syslog milikmu sendiri.",
            "Arahkan output ke Elasticsearch (langsung atau lewat Logstash) di bagian `output` konfigurasi.",
            "Jalankan Filebeat, cek log Filebeat sendiri (biasanya di stdout/journalctl) untuk konfirmasi ia berhasil connect ke output tanpa error.",
            "Konfirmasi di Kibana Discover bahwa document baru terus bertambah seiring aktivitas sistemmu.",
          ],
          proof:
            "Konfigurasi filebeat.yml dan screenshot Kibana Discover menunjukkan log baru masuk.",
        },
        {
          kind: "kuis",
          question:
            "Filebeat termasuk kategori tool ringan pengirim log yang di ekosistem Elastic disebut apa?",
          inputType: "text",
          placeholder: "contoh: shipper",
          accepted: ["beat", "beats"],
          explanation:
            '"Beats" adalah nama keluarga agen ringan Elastic - Filebeat untuk file log, tapi ada juga Metricbeat, Packetbeat, dan lain-lain untuk jenis data berbeda.',
        },
      ],
    },
    {
      index: 6,
      label: "Hari 69",
      title: "Visualisasi di Kibana",
      steps: [
        {
          kind: "materi",
          title: "Dari log mentah jadi grafik",
          body: "Kibana mengubah data di Elasticsearch jadi grafik, tabel, dan peta lewat query yang berjalan di baliknya - cara standar SOC memantau kondisi keamanan secara visual daripada membaca log mentah satu per satu. Setiap visualisasi pada dasarnya adalah satu (atau beberapa) query Elasticsearch yang hasilnya dirender jadi bentuk visual, bukan sesuatu yang terpisah dari Query DSL yang sudah kamu pelajari di Hari 66.",
        },
        {
          kind: "materi",
          title: "Memilih jenis visualisasi yang tepat",
          body: "Line/area chart cocok untuk tren dari waktu ke waktu (jumlah event per jam, misalnya). Bar chart/data table cocok untuk perbandingan kategori (top 5 source IP, top 10 URL yang paling banyak diakses). Pie/donut chart cocok untuk proporsi dari keseluruhan (persentase status code 2xx vs 4xx vs 5xx), tapi jadi kurang terbaca kalau kategorinya terlalu banyak. Map (kalau data punya field geo) berguna untuk visualisasi asal geografis traffic/serangan. Memilih jenis yang salah (misal pie chart untuk data yang sebenarnya berupa tren waktu) membuat pola penting jadi tidak terlihat meski datanya sama persis.",
        },
        {
          kind: "materi",
          title: "Dashboard sebagai alat kerja harian SOC",
          body: "Satu dashboard menggabungkan beberapa visualisasi dalam satu halaman yang bisa di-filter bersama (misal filter rentang waktu di pojok atas otomatis memengaruhi semua visualisasi di dashboard itu). Dashboard yang baik disusun berdasarkan alur kerja nyata analyst: ringkasan/angka besar di atas (total event, total alert), tren waktu di tengah, detail/breakdown di bawah - bukan asal menumpuk semua visualisasi yang pernah dibuat dalam satu halaman tanpa urutan logis.",
        },
        {
          kind: "praktik",
          title: "Bangun dashboard 2 visualisasi",
          instructions: [
            "Dari data log yang sudah di-ship (Hari 68), buat visualisasi 1: grafik garis jumlah failed login per waktu.",
            "Buat visualisasi 2: tabel/bar chart top 5 source IP dengan failed login terbanyak.",
            "Susun keduanya dalam satu dashboard baru dengan grafik tren di atas dan breakdown detail di bawah.",
            "Uji filter rentang waktu di dashboard itu (misal ganti dari 24 jam terakhir ke 1 jam terakhir) dan konfirmasi kedua visualisasi ikut berubah bersamaan.",
          ],
          proof:
            "Screenshot dashboard Kibana dengan kedua visualisasi tersebut.",
        },
        {
          kind: "kuis",
          question:
            "Kumpulan beberapa visualisasi Kibana yang ditampilkan bersamaan dalam satu halaman disebut apa?",
          inputType: "text",
          placeholder: "contoh: index pattern",
          accepted: ["dashboard"],
          explanation:
            "Dashboard mengumpulkan beberapa visualisasi jadi satu tampilan - inilah yang biasanya ditonton tim SOC di layar monitor mereka sepanjang shift.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 70",
      title: "Deteksi Sederhana dengan Kibana",
      steps: [
        {
          kind: "materi",
          title: "Dari dashboard pasif ke alert aktif",
          body: "Alerting di Kibana memungkinkan trigger notifikasi otomatis saat kondisi tertentu terpenuhi (misal jumlah event melebihi threshold dalam rentang waktu tertentu) - bentuk paling dasar dari kapabilitas deteksi ala SIEM, tanpa harus terus-menerus menonton dashboard secara manual. Satu rule alert terdiri dari: kondisi (query + threshold), interval pengecekan (seberapa sering rule itu dievaluasi ulang), dan action (apa yang terjadi kalau kondisi terpenuhi - kirim email, webhook, atau sekadar mencatat di log alert Kibana).",
        },
        {
          kind: "materi",
          title: "Menyeimbangkan threshold: terlalu sensitif vs terlalu longgar",
          body: "Threshold yang terlalu rendah (misal alert setiap ada 1 failed login) menghasilkan banyak false positive - analyst kebanjiran notifikasi tidak penting sampai akhirnya mengabaikan semua alert (alert fatigue), termasuk yang benar-benar berbahaya. Threshold yang terlalu tinggi berisiko melewatkan serangan nyata (false negative) karena penyerang yang hati-hati sengaja menjaga aktivitasnya di bawah radar. Menentukan threshold yang tepat butuh baseline - amati pola normal dulu (berapa failed login wajar per jam di lingkunganmu) sebelum menentukan angka yang dianggap 'anomali'.",
        },
        {
          kind: "materi",
          title: "Dari alert ke tindakan nyata",
          body: "Alert yang cuma tercatat tanpa ada yang menindaklanjuti sama saja tidak berguna - action pada rule alerting biasanya diarahkan ke saluran yang benar-benar dipantau manusia (email tim SOC, webhook ke Slack/Teams, atau tiket otomatis di sistem ticketing). Di lingkungan yang lebih matang, alert kritis punya jalur eskalasi (siapa dihubungi kalau tidak direspons dalam waktu tertentu) - konsep ini di luar cakupan Kibana sendiri, tapi penting dipahami supaya alert yang kamu buat hari ini benar-benar berujung ke tindakan, bukan cuma catatan yang tidak pernah dibaca.",
        },
        {
          kind: "praktik",
          title: "Buat alert threshold failed login",
          instructions: [
            'Buat rule alerting Kibana: trigger saat ada lebih dari 5 "Failed password" dari satu source_ip dalam 1 jam.',
            "Tentukan action-nya (misal log ke Kibana alert history, atau webhook kalau tersedia).",
            "Simulasikan kondisi itu dengan insert manual document tambahan lewat Dev Tools (6 failed login dari IP yang sama).",
            "Konfirmasi alert benar-benar terpicu, dan catat berapa lama jeda antara data masuk dan alert muncul (dipengaruhi interval pengecekan rule).",
          ],
          proof:
            "Konfigurasi rule alert dan bukti alert terpicu setelah simulasi data.",
        },
        {
          kind: "kuis",
          question:
            'Istilah untuk kondisi ambang batas yang memicu alert otomatis (misal "lebih dari 5 failed login dalam 1 jam") disebut apa?',
          inputType: "text",
          placeholder: "contoh: baseline",
          accepted: ["threshold"],
          explanation:
            "Threshold adalah batas angka yang, kalau dilewati, memicu alert - kuncinya menyeimbangkan angka ini supaya cukup sensitif untuk menangkap insiden nyata tapi tidak terlalu berisik dengan false positive.",
        },
      ],
    },
  ],
};

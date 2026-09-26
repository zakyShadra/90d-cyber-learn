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
          body: "Elasticsearch menyimpan dan mengindeks data untuk pencarian cepat. Logstash mengolah dan mentransformasi log sebelum masuk Elasticsearch. Kibana memvisualisasikan data lewat dashboard. Beats adalah agen ringan pengirim log dari sumbernya ke Logstash atau langsung ke Elasticsearch.",
        },
        {
          kind: "praktik",
          title: "Jalankan Elasticsearch dan Kibana lokal",
          instructions: [
            "Install Docker jika belum ada.",
            "Jalankan Elasticsearch dan Kibana lewat Docker (single-node, sesuai panduan resmi Elastic).",
            "Konfirmasi Elasticsearch hidup: `curl http://localhost:9200`.",
            "Buka Kibana di browser (`http://localhost:5601`) dan konfirmasi UI-nya bisa diakses.",
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
          body: "Elasticsearch menyimpan data sebagai document JSON di dalam index (mirip tabel di database relasional, dengan document sebagai barisnya). REST API-nya memungkinkan create, read, update, delete document langsung lewat HTTP, tanpa perlu query language terpisah untuk operasi dasar.",
        },
        {
          kind: "praktik",
          title: "Buat index dan query manual lewat Dev Tools",
          instructions: [
            "Buka Kibana Dev Tools.",
            "Buat index baru bernama `test-logs`.",
            "Insert 5 document manual berisi field `timestamp`, `source_ip`, dan `event` (rekayasa data log sederhana).",
            "Jalankan query match untuk mencari document dengan `event` tertentu.",
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
          title: "Lebih jauh dari match sederhana",
          body: "Elasticsearch Query DSL adalah bahasa query berbasis JSON yang jauh lebih ekspresif dari sekadar `match`: `term` untuk exact match pada field terstruktur, `range` untuk rentang angka/tanggal, dan `bool` untuk menggabungkan beberapa kondisi (`must`, `should`, `must_not`) dalam satu query - bentuk query yang paling sering dipakai di dashboard SIEM sungguhan.",
        },
        {
          kind: "praktik",
          title: "Coba range query dan bool query",
          instructions: [
            "Di index `test-logs` dari Hari 65, jalankan query `range` untuk mencari document dengan `timestamp` dalam 1 jam terakhir.",
            "Jalankan query `bool` yang menggabungkan `must` (event tertentu) dengan `must_not` (source_ip tertentu yang mau dikecualikan).",
            "Bandingkan hasilnya dengan query `match` sederhana terhadap kondisi yang sama.",
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
          body: "Pipeline Logstash punya 3 tahap: input (sumber data), filter (transformasi, biasanya pakai pola grok untuk parsing teks tak terstruktur jadi field-field terpisah), dan output (tujuan data, biasanya Elasticsearch).",
        },
        {
          kind: "praktik",
          title: "Parse log SSH dengan Logstash",
          instructions: [
            'Siapkan file sample auth.log berisi beberapa baris "Failed password" dan "Accepted password".',
            "Tulis konfigurasi Logstash: input file, filter grok yang mengekstrak timestamp/user/IP dari baris log, output ke Elasticsearch index `ssh-logs`.",
            "Jalankan Logstash dengan config itu.",
            "Verifikasi di Kibana Dev Tools bahwa document di `ssh-logs` sudah punya field terstruktur (bukan satu string mentah).",
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
          body: 'Filebeat adalah agen ringan yang memantau file log dan mengirim isinya secara real-time ke Logstash atau langsung ke Elasticsearch, tanpa perlu polling manual. Filebeat termasuk keluarga "Beats" - agen-agen kecil khusus satu jenis data (Metricbeat untuk metrik, Packetbeat untuk traffic jaringan, dst).',
        },
        {
          kind: "praktik",
          title: "Ship log sistem asli dengan Filebeat",
          instructions: [
            "Install Filebeat di mesinmu.",
            "Konfigurasi input Filebeat untuk membaca auth.log/syslog milikmu sendiri.",
            "Arahkan output ke Elasticsearch (langsung atau lewat Logstash).",
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
          body: "Kibana mengubah data di Elasticsearch jadi grafik, tabel, dan peta yang bisa digabung dalam satu dashboard - cara standar SOC memantau kondisi keamanan secara visual daripada membaca log mentah satu per satu.",
        },
        {
          kind: "praktik",
          title: "Bangun dashboard 2 visualisasi",
          instructions: [
            "Dari data log yang sudah di-ship (Hari 68), buat visualisasi 1: grafik garis jumlah failed login per waktu.",
            "Buat visualisasi 2: tabel/bar chart top 5 source IP dengan failed login terbanyak.",
            "Gabungkan keduanya ke satu dashboard baru.",
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
          body: "Alerting di Kibana memungkinkan trigger notifikasi otomatis saat kondisi tertentu terpenuhi (misal jumlah event melebihi threshold dalam rentang waktu tertentu) - bentuk paling dasar dari kapabilitas deteksi ala SIEM, tanpa harus terus-menerus menonton dashboard secara manual.",
        },
        {
          kind: "praktik",
          title: "Buat alert threshold failed login",
          instructions: [
            'Buat rule alerting Kibana: trigger saat ada lebih dari 5 "Failed password" dari satu source_ip dalam 1 jam.',
            "Simulasikan kondisi itu dengan insert manual document tambahan lewat Dev Tools (6 failed login dari IP yang sama).",
            "Konfirmasi alert benar-benar terpicu.",
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

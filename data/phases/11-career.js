// Fase 11: Karier & Melamar Kerja
export default {
  id: "career",
  number: 11,
  title: "Karier & Melamar Kerja",
  dayRange: "Hari 91–95",
  summary:
    "Bonus fase: mengemas kerja praktikmu selama roadmap ini jadi resume yang kuat dan menjalankan proses melamar kerja secara terstruktur.",
  resources: [
    {
      label: "Template Resume - BowTiedCyber",
      url: "https://bowtiedcyber.substack.com/p/killer-cyber-resume-part-ii",
    },
    {
      label: "career-ops (job-search pipeline open-source)",
      url: "https://github.com/career-ops-hq/career-ops",
    },
    {
      label: "CyberSeek - Career Pathways",
      url: "https://www.cyberseek.org/pathway.html",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 91",
      title: "Draft Isi cv.md",
      steps: [
        {
          kind: "materi",
          title: "Bukti kerja mengalahkan daftar sertifikat",
          body: "Resume entry-level security paling kuat bukan berisi daftar sertifikat, tapi bukti kerja nyata: lab yang dibangun, CTF room yang diselesaikan, script yang ditulis, mesin HTB yang di-root. Semua materi praktik dari roadmap ini adalah bahan baku resume tersebut - kalau kamu sudah mengerjakan tugas praktik dengan serius sejak Hari 1, bahan resume-mu sebenarnya sudah terkumpul, tinggal disusun.",
        },
        {
          kind: "materi",
          title: "Kenapa mulai dari daftar mentah, bukan langsung kalimat rapi",
          body: 'Kesalahan umum saat menulis resume: langsung mencoba menulis kalimat "profesional" sejak draft pertama, padahal itu justru memperlambat proses dan sering membuat pengalaman penting terlewat karena keburu sibuk memilih kata. Urutan yang lebih efektif: dump semua pengalaman relevan dulu apa adanya (nama proyek, tanggal, satu-dua kata kunci teknis) tanpa mikirin kalimat yang bagus, baru di hari berikutnya (Hari 92) dirapikan jadi bahasa resume yang sebenarnya.',
        },
        {
          kind: "praktik",
          title: "Daftar pengalaman dan tulis draft cv.md",
          instructions: [
            "Buka template resume yang direkomendasikan roadmap sebagai referensi struktur (bagian apa saja yang biasanya ada: header, summary, experience/projects, skills, education).",
            "Buat file baru `cv.md`.",
            'Daftar semua lab, CTF room, dan proyek dari Hari 15-90 yang sudah kamu selesaikan sebagai "hands-on experience" - satu baris per item dulu, belum perlu kalimat lengkap.',
            "Untuk tiap item, catat minimal: nama proyek/lab, tools/skill yang dipakai, dan satu hasil konkret (flag ditemukan, kerentanan dibuktikan, script yang jalan).",
            "Simpan sebagai draft pertama - belum perlu sempurna, yang penting semua pengalaman relevan tercatat dulu.",
          ],
          proof:
            "Draft cv.md berisi daftar pengalaman hands-on nyata dari roadmap ini.",
        },
        {
          kind: "kuis",
          question:
            "Format file apa yang dipakai untuk draft resume sebelum nanti diekspor jadi PDF?",
          inputType: "text",
          placeholder: "contoh: .docx",
          accepted: ["markdown", ".md", "cv.md"],
          explanation:
            "Markdown (`cv.md`) gampang di-diff, di-version-control lewat Git, dan gampang diproses tool lain (termasuk career-ops di Hari 93) - jauh lebih fleksibel daripada mulai dari format biner seperti .docx.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 92",
      title: "Redact dan Finalisasi cv.md",
      steps: [
        {
          kind: "materi",
          title: "Rapikan dulu sebelum disebar ke tool AI",
          body: "Sebelum cv.md ditempel ke tool AI manapun (termasuk career-ops di hari-hari berikutnya), redact dulu info pribadi sensitif seperti alamat lengkap dan nomor telepon. Data yang sudah terkirim ke layanan pihak ketiga tidak bisa ditarik kembali sepenuhnya - lebih aman mencegah dari awal daripada berharap layanan itu menghapusnya nanti.",
        },
        {
          kind: "materi",
          title: "Kenapa satu halaman, bukan dua atau tiga",
          body: "Resume yang kuat harus muat dalam satu halaman, terutama untuk posisi entry-level - rekruter yang menyaring puluhan sampai ratusan lamaran biasanya cuma scan resume dalam hitungan detik, bukan membaca detail dari awal sampai akhir. Resume dua-tiga halaman untuk fresh graduate/entry-level justru sering dibaca sebagai tanda tidak bisa memilah mana pengalaman yang benar-benar relevan - lebih baik satu halaman padat berisi highlight terbaik daripada banyak halaman berisi semua hal tanpa prioritas.",
        },
        {
          kind: "praktik",
          title: "Redact info sensitif dan pastikan muat satu halaman",
          instructions: [
            "Redact/hapus info sensitif pribadi (alamat lengkap, nomor telepon) dari draft cv.md-mu.",
            "Baca ulang tiap baris pengalaman dari Hari 91, pangkas yang kurang relevan dengan target role-mu (bukan yang paling banyak, tapi yang paling relevan yang harus dipertahankan).",
            "Rapikan format Markdown-nya (heading konsisten, bullet points rapi) supaya enak dibaca sebelum di-export.",
            "Export ke PDF (lewat pandoc, VS Code extension, atau tool markdown-to-PDF apa pun) dan cek visualnya - pastikan benar-benar muat satu halaman.",
          ],
          proof:
            "File cv.md final (sudah di-redact) dan PDF hasil export yang muat satu halaman.",
        },
        {
          kind: "kuis",
          question:
            "Sebelum menempel resume ke tool AI manapun, apa yang wajib dilakukan dulu terhadap info pribadi sensitif di dalamnya?",
          inputType: "text",
          placeholder: "contoh: diterjemahkan",
          accepted: ["redact", "di-redact", "redaksi"],
          explanation:
            "Redact berarti menghapus/menyamarkan data pribadi sensitif (alamat, nomor telepon) sebelum teks itu dikirim ke layanan pihak ketiga mana pun - kebiasaan dasar menjaga privasi saat memakai tool AI.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 93",
      title: "Setup career-ops",
      steps: [
        {
          kind: "materi",
          title: "Filter lowongan, bukan robot pelamar",
          body: "career-ops adalah tool open-source yang berjalan di dalam AI coding CLI untuk mengevaluasi lowongan kerja terhadap resume-mu dan melacak proses lamaran - bukan tool yang melamar otomatis, tapi filter dan asisten persiapan. Ini penting dibedakan sejak awal: tujuannya membantumu SELEKTIF, bukan menembak lamaran sebanyak-banyaknya tanpa pertimbangan.",
        },
        {
          kind: "materi",
          title: "Kenapa target role harus spesifik sejak awal",
          body: 'career-ops (dan proses melamar kerja pada umumnya) bekerja jauh lebih baik kalau target role-nya spesifik ("SOC analyst" atau "junior penetration tester") dibanding generik ("kerja di bidang IT"). Target yang spesifik memungkinkan tool ini (dan kamu sendiri) menilai kecocokan lowongan dengan lebih tajam - resume yang sama bisa sangat cocok untuk satu role tapi kurang relevan untuk role lain, meskipun sama-sama "di bidang security".',
        },
        {
          kind: "praktik",
          title: "Install dan konfigurasi career-ops",
          instructions: [
            "Install Node.js kalau belum ada (cek dengan `node --version`).",
            "Baca release notes career-ops sebelum menjalankan `npx` - pahami dulu apa yang akan dilakukan tool ini sebelum menjalankannya.",
            "Jalankan `npx @santifer/career-ops init` di folder baru.",
            'Ikuti onboarding chat-nya, beri tahu target role spesifik (misal "SOC analyst" atau "junior penetration tester") - bukan target generik.',
            "Konfirmasi konfigurasi tersimpan dengan benar sebelum lanjut ke Hari 94.",
          ],
          proof:
            "career-ops berhasil di-setup dengan target role yang sudah dikonfigurasi.",
        },
        {
          kind: "kuis",
          question:
            "career-ops dirancang untuk berjalan di dalam jenis tool apa?",
          inputType: "text",
          placeholder: "contoh: browser extension",
          accepted: ["ai coding cli", "cli ai", "ai cli"],
          explanation:
            "career-ops jalan di dalam AI coding CLI seperti Claude Code, Codex, atau OpenCode - memanfaatkan kemampuan CLI itu membaca file cv.md-mu dan memproses banyak lowongan sekaligus.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 94",
      title: "Evaluasi Lowongan Kerja",
      steps: [
        {
          kind: "materi",
          title: "Skor dulu, baru lamar",
          body: "Menskorkan lowongan terhadap resume sebelum melamar mencegah waktu terbuang untuk posisi yang tidak cocok - perlakukan sebagai filter kualitas, bukan alat untuk melamar sebanyak-banyaknya. Melamar 5 lowongan yang benar-benar cocok biasanya menghasilkan lebih banyak panggilan interview dibanding melamar 50 lowongan secara serampangan.",
        },
        {
          kind: "materi",
          title: "Apa yang sebenarnya dinilai skor kecocokan itu",
          body: "Skor kecocokan dari career-ops (atau proses manual serupa) biasanya membandingkan requirement di deskripsi lowongan dengan pengalaman konkret di resume-mu - bukan cuma cocok kata kunci, tapi apakah pengalamanmu benar-benar relevan dengan tanggung jawab yang diminta. Skor rendah bukan berarti kamu tidak layak sebagai profesional, tapi sinyal bahwa lowongan spesifik itu mungkin butuh pengalaman yang berbeda dari yang kamu punya saat ini - lebih baik diketahui sebelum melamar daripada sesudah proses interview panjang.",
        },
        {
          kind: "praktik",
          title: "Skor 10-20 lowongan nyata",
          instructions: [
            "Cari 10-20 lowongan entry-level security di Indeed/LinkedIn yang sesuai target role-mu dari Hari 93.",
            "Paste tiap lowongan ke career-ops untuk dievaluasi terhadap cv.md-mu.",
            "Catat skor yang diberikan untuk tiap lowongan beserta alasan singkatnya (kalau tool-nya menyediakan alasan).",
            "Pisahkan hasil jadi dua daftar: skor ≥4.0/5 (akan dilamar) dan di bawah itu (dilewati).",
          ],
          proof:
            "Daftar lowongan dengan skornya masing-masing, dipisah antara yang lolos dan tidak.",
        },
        {
          kind: "kuis",
          question:
            "Skor minimal berapa (dari skala 5) yang jadi ambang batas untuk melamar suatu lowongan menurut materi ini?",
          inputType: "text",
          placeholder: "contoh: 3.0",
          accepted: ["4.0", "4", "4.0/5"],
          explanation:
            "Ambang 4.0/5 memaksamu selektif - cuma melamar ke lowongan yang benar-benar cocok dengan pengalamanmu, bukan menembak sebanyak mungkin lowongan secara serampangan.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 95",
      title: "Melamar dan Persiapan Interview",
      steps: [
        {
          kind: "materi",
          title: "CV yang di-tailor per lowongan",
          body: "Tailored CV per lowongan meningkatkan peluang lolos ATS screening (sistem otomatis yang menyaring resume sebelum sampai ke manusia) - menyesuaikan kata kunci dan urutan highlight pengalaman sesuai requirement spesifik tiap lowongan, tanpa mengubah fakta dasarnya. Ini bukan berarti berbohong soal pengalaman, tapi menonjolkan bagian pengalamanmu yang paling relevan untuk lowongan itu di posisi paling atas/terlihat.",
        },
        {
          kind: "materi",
          title: "STAR: format menjawab pertanyaan interview perilaku",
          body: 'STAR (Situation, Task, Action, Result) adalah format standar menjawab pertanyaan interview perilaku dengan bukti konkret, bukan klaim umum. Situation menjelaskan konteks/situasinya apa, Task menjelaskan tanggung jawab/tantanganmu di situasi itu, Action menjelaskan apa yang benar-benar kamu lakukan (bukan tim secara umum), dan Result menjelaskan hasilnya - idealnya terukur. Format ini memaksa jawabanmu jadi cerita konkret dengan bukti, jauh lebih meyakinkan daripada klaim abstrak seperti "saya orangnya teliti dan pekerja keras".',
        },
        {
          kind: "praktik",
          title: "Lamar shortlist dan siapkan 3 STAR story",
          instructions: [
            "Generate CV yang di-tailor untuk 3 lowongan dengan skor tertinggi dari Hari 94.",
            "Review manual tiap CV yang di-tailor sebelum submit - pastikan tidak ada klaim yang berlebihan atau tidak akurat.",
            "Kirim lamaran ke ketiganya (career-ops tidak melamar otomatis, submit tetap manual olehmu).",
            "Susun 3 STAR story dari proyek nyata roadmap ini (misal: proyek scanner lab dari Review & Practice, laporan pentest dari Ethical Hacking) - tulis lengkap keempat bagiannya untuk tiap story.",
          ],
          proof:
            "Bukti 3 lamaran terkirim dan 3 STAR story tertulis lengkap (Situation, Task, Action, Result).",
        },
        {
          kind: "kuis",
          question:
            "STAR dalam format jawaban interview perilaku adalah singkatan dari empat kata apa (dipisah spasi)?",
          inputType: "text",
          placeholder: "contoh: what how why result",
          accepted: ["situation task action result"],
          explanation:
            'Situation (situasinya apa) → Task (tugas/tanggung jawabmu apa) → Action (apa yang kamu lakukan) → Result (hasilnya apa, idealnya terukur) - format ini memaksa jawabanmu konkret, bukan klaim abstrak seperti "saya pekerja keras".',
        },
      ],
    },
  ],
};

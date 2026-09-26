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
          body: "Resume entry-level security paling kuat bukan berisi daftar sertifikat, tapi bukti kerja nyata: lab yang dibangun, CTF room yang diselesaikan, script yang ditulis, mesin HTB yang di-root. Semua materi praktik dari roadmap ini adalah bahan baku resume tersebut.",
        },
        {
          kind: "praktik",
          title: "Daftar pengalaman dan tulis draft cv.md",
          instructions: [
            "Buka template resume yang direkomendasikan roadmap sebagai referensi struktur.",
            'Daftar semua lab, CTF room, dan proyek dari Hari 15-90 yang sudah kamu selesaikan sebagai "hands-on experience".',
            "Tulis draft pertama dalam format Markdown (`cv.md`) - belum perlu sempurna, yang penting semua pengalaman relevan tercatat.",
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
          body: "Sebelum cv.md ditempel ke tool AI manapun (termasuk career-ops di hari-hari berikutnya), redact dulu info pribadi sensitif seperti alamat lengkap dan nomor telepon. Resume yang kuat juga harus muat dalam satu halaman - rekruter entry-level biasanya cuma scan resume dalam hitungan detik.",
        },
        {
          kind: "praktik",
          title: "Redact info sensitif dan pastikan muat satu halaman",
          instructions: [
            "Redact/hapus info sensitif pribadi (alamat lengkap, nomor telepon) dari draft cv.md-mu.",
            "Rapikan format dan potong bagian yang kurang relevan supaya muat satu halaman kalau di-export ke PDF.",
            "Export ke PDF (lewat pandoc, VS Code extension, atau tool markdown-to-PDF apa pun) dan cek visualnya.",
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
          body: "career-ops adalah tool open-source yang berjalan di dalam AI coding CLI untuk mengevaluasi lowongan kerja terhadap resume-mu dan melacak proses lamaran - bukan tool yang melamar otomatis, tapi filter dan asisten persiapan.",
        },
        {
          kind: "praktik",
          title: "Install dan konfigurasi career-ops",
          instructions: [
            "Install Node.js.",
            "Baca release notes career-ops sebelum menjalankan `npx`.",
            "Jalankan `npx @santifer/career-ops init` di folder baru.",
            'Ikuti onboarding chat-nya, beri tahu target role spesifik (misal "SOC analyst" atau "junior penetration tester").',
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
          body: "Menskorkan lowongan terhadap resume sebelum melamar mencegah waktu terbuang untuk posisi yang tidak cocok - perlakukan sebagai filter kualitas, bukan alat untuk melamar sebanyak-banyaknya.",
        },
        {
          kind: "praktik",
          title: "Skor 10-20 lowongan nyata",
          instructions: [
            "Cari 10-20 lowongan entry-level security di Indeed/LinkedIn yang sesuai target role-mu.",
            "Paste tiap lowongan ke career-ops untuk dievaluasi terhadap cv.md-mu.",
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
          title: "CV yang di-tailor, cerita yang siap disampaikan",
          body: "Tailored CV per lowongan meningkatkan peluang lolos ATS screening. STAR (Situation, Task, Action, Result) adalah format standar menjawab pertanyaan interview perilaku dengan bukti konkret, bukan klaim umum.",
        },
        {
          kind: "praktik",
          title: "Lamar shortlist dan siapkan 3 STAR story",
          instructions: [
            "Generate CV yang di-tailor untuk 3 lowongan dengan skor tertinggi dari Hari 94.",
            "Kirim lamaran ke ketiganya (review manual sebelum submit - career-ops tidak melamar otomatis).",
            "Susun 3 STAR story dari proyek nyata roadmap ini (misal: proyek scanner lab dari Review & Practice, laporan pentest dari Ethical Hacking).",
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

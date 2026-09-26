// Fase 6: Git
export default {
  id: "git",
  number: 6,
  title: "Git",
  dayRange: "Hari 57–63",
  summary:
    "Git adalah alat kolaborasi dan version control standar industri, dipakai untuk menyimpan script security, dokumentasi, dan proyek portofolio.",
  resources: [
    {
      label: "Codecademy - Learn Git",
      url: "https://codecademy.com/learn/learn-git",
    },
    {
      label: "Learn Git Branching (interaktif)",
      url: "https://learngitbranching.js.org/",
    },
  ],
  days: [
    {
      index: 1,
      label: "Hari 57",
      title: "Dasar Git: init, add, commit",
      steps: [
        {
          kind: "materi",
          title: "Snapshot, bukan diff mentah",
          body: "Git melacak perubahan file lewat snapshot (commit), bukan perbedaan mentah. Alur dasarnya: ubah file → `git add` (staging) → `git commit` (menyimpan snapshot dengan pesan). Staging area memungkinkan kamu memilih file mana saja yang masuk ke satu commit, bukan semua perubahan sekaligus.",
        },
        {
          kind: "praktik",
          title: "Mulai repo catatan security-mu sendiri",
          instructions: [
            "Buat folder `security-notes`, jalankan `git init`.",
            "Tulis satu file markdown berisi catatan nyata dari materi Network+ atau Security+ yang sudah kamu selesaikan.",
            "Commit dengan pesan deskriptif.",
            "Tambah/ubah isi catatan, commit lagi 2 kali dengan pesan berbeda (total 3 commit).",
          ],
          proof:
            "Output `git log --oneline` menunjukkan 3 commit dengan pesan yang jelas.",
        },
        {
          kind: "kuis",
          question:
            "Perintah git apa yang memindahkan perubahan dari working directory ke staging area?",
          inputType: "text",
          placeholder: "contoh: git commit",
          accepted: ["git add"],
          explanation:
            "`git add` menandai perubahan siap di-commit; `git commit` baru benar-benar menyimpannya sebagai snapshot permanen di riwayat.",
        },
      ],
    },
    {
      index: 2,
      label: "Hari 58",
      title: "Branching dan Merging",
      steps: [
        {
          kind: "materi",
          title: "Eksperimen tanpa mengganggu yang utama",
          body: "Branch memungkinkan eksperimen tanpa mengganggu kode/catatan utama di `main`. Conflict terjadi saat dua branch mengubah baris yang sama - Git tidak bisa menebak versi mana yang benar, jadi manusia harus memutuskan secara manual sebelum merge bisa diselesaikan.",
        },
        {
          kind: "praktik",
          title: "Buat dan selesaikan satu merge conflict",
          instructions: [
            "Dari `security-notes`, buat branch `edit-1` dari `main`.",
            "Di `main`, ubah baris pertama file catatanmu dan commit.",
            "Pindah ke `edit-1`, ubah baris yang sama dengan teks berbeda, commit.",
            "Merge `edit-1` ke `main`, resolve conflict yang muncul secara manual, commit hasil merge.",
          ],
          proof:
            "Output git log yang menunjukkan merge commit, dan isi file final setelah conflict diselesaikan.",
        },
        {
          kind: "kuis",
          question:
            "Istilah git untuk kondisi saat dua branch mengubah baris yang sama dan tidak bisa digabung otomatis disebut apa?",
          inputType: "text",
          placeholder: "contoh: fast-forward",
          accepted: ["merge conflict", "conflict"],
          explanation:
            "Merge conflict memaksa manusia memilih versi mana (atau gabungan seperti apa) yang benar - Git berhenti dan menandai bagian yang bentrok di file.",
        },
      ],
    },
    {
      index: 3,
      label: "Hari 59",
      title: "Bekerja dengan Remote: GitHub",
      steps: [
        {
          kind: "materi",
          title: "Backup dan kolaborasi di luar mesin lokal",
          body: "Remote repository memungkinkan kolaborasi dan backup di luar mesin lokal. `push` mengirim commit lokal ke remote, `pull` mengambil DAN langsung menggabungkan perubahan dari remote - beda dengan `fetch` yang cuma mengambil tanpa menggabungkan.",
        },
        {
          kind: "praktik",
          title: "Push repo lokal ke GitHub dan clone ulang",
          instructions: [
            "Buat repository baru (kosong) di GitHub bernama `security-notes`.",
            "Hubungkan dengan `git remote add origin <url>` lalu `git push -u origin main`.",
            "Di folder lain, jalankan `git clone <url>` untuk menyalin repo itu.",
            "Buat perubahan di clone kedua, push, lalu `git pull` di folder pertama untuk sinkronisasi.",
          ],
          proof:
            "URL repo GitHub, dan bukti kedua folder lokal ter-sinkronisasi setelah push/pull.",
        },
        {
          kind: "kuis",
          question:
            "Perintah apa yang mengambil DAN langsung menggabungkan perubahan dari remote ke branch lokal?",
          inputType: "text",
          placeholder: "contoh: git fetch",
          accepted: ["git pull"],
          explanation:
            "`git pull` = `git fetch` + `git merge` dalam satu langkah. `git fetch` sendirian cuma mengunduh perubahan tanpa menggabungkannya ke branch lokal.",
        },
      ],
    },
    {
      index: 4,
      label: "Hari 60",
      title: "Melihat Riwayat: diff, revert vs reset",
      steps: [
        {
          kind: "materi",
          title: "Membatalkan dengan aman vs menghapus riwayat",
          body: "`git diff` menunjukkan perbedaan antar-commit atau working directory. `git revert` membuat commit baru yang membatalkan perubahan (aman untuk riwayat yang sudah dibagikan ke orang lain), sedangkan `git reset` menghapus/memindahkan commit (bisa menghilangkan riwayat, berbahaya kalau sudah di-push dan dipakai orang lain).",
        },
        {
          kind: "praktik",
          title: "Bandingkan revert vs reset secara langsung",
          instructions: [
            "Jalankan `git diff HEAD~2 HEAD` di security-notes, catat perubahan apa saja yang terjadi di 2 commit terakhir.",
            'Buat satu commit "buruk" (misal menghapus isi penting file).',
            "Batalkan dengan `git revert HEAD`, konfirmasi isi file kembali dan riwayat tetap mencatat commit buruk itu.",
            "Sebagai perbandingan, di branch terpisah, buat commit buruk yang sama lalu hapus dengan `git reset --hard HEAD~1`, catat perbedaan riwayatnya.",
          ],
          proof:
            "Output git log untuk kedua skenario (setelah revert vs setelah reset) dengan penjelasan perbedaannya.",
        },
        {
          kind: "kuis",
          question:
            "Perintah mana yang membuat commit baru untuk membatalkan perubahan TANPA menghapus riwayat: revert atau reset?",
          inputType: "text",
          placeholder: "contoh: reset",
          accepted: ["revert", "git revert"],
          explanation:
            "`git revert` menambah commit baru yang membalikkan efek commit lama - riwayat lama tetap utuh dan aman dibagikan ke orang lain, tidak seperti `reset` yang bisa menghapus commit dari riwayat.",
        },
      ],
    },
    {
      index: 5,
      label: "Hari 61",
      title: ".gitignore dan Best Practice",
      steps: [
        {
          kind: "materi",
          title: "Mencegah jauh lebih murah daripada membersihkan",
          body: "File .gitignore mencegah file tertentu (secrets, binary, folder dependency) pernah masuk ke tracking Git. Sekali secret ter-commit, ia tetap ada di riwayat meskipun filenya dihapus di commit berikutnya - .gitignore yang ditambahkan belakangan tidak menghapus jejak yang sudah kadung tercatat.",
        },
        {
          kind: "praktik",
          title: "Cegah file rahasia ikut ter-commit",
          instructions: [
            "Buat file `.env` berisi baris dummy `API_KEY=fake12345`.",
            "Tambahkan `.gitignore` berisi `.env`.",
            "Jalankan `git status`, konfirmasi `.env` tidak muncul sebagai untracked.",
            "Commit `.gitignore`-nya, lalu jalankan `git log -p | grep API_KEY` untuk memastikan secret itu tidak pernah masuk riwayat.",
          ],
          proof:
            "Isi .gitignore, output git status yang tidak menampilkan .env, dan konfirmasi grep kosong di riwayat.",
        },
        {
          kind: "kuis",
          question:
            "Kalau sebuah file rahasia sudah kadung ter-commit sebelumnya, apakah cukup menambahkannya ke .gitignore sekarang untuk menghapusnya dari riwayat? (jawab: ya/tidak)",
          inputType: "text",
          placeholder: "ya atau tidak",
          accepted: ["tidak", "tidak cukup"],
          explanation:
            ".gitignore cuma mencegah tracking BARU. Commit lama yang sudah berisi secret itu masih ada di riwayat dan perlu dibersihkan dengan tools khusus (misal git filter-repo) atau, yang paling aman, rotasi kredensial itu.",
        },
      ],
    },
    {
      index: 6,
      label: "Hari 62",
      title: "Git Stash dan Rebase Interaktif Dasar",
      steps: [
        {
          kind: "materi",
          title: "Menyimpan sementara dan merapikan riwayat",
          body: "`git stash` menyimpan perubahan yang belum di-commit sementara, membersihkan working directory tanpa membuang pekerjaan - berguna saat harus pindah branch cepat. Interactive rebase (`git rebase -i`) menyusun ulang riwayat commit lokal (menggabungkan, mengubah pesan, menghapus commit) sebelum dibagikan ke orang lain - jangan dipakai pada commit yang sudah di-push dan dipakai orang lain, karena itu mengubah riwayat yang sudah dibagikan.",
        },
        {
          kind: "praktik",
          title: "Coba stash lalu rapikan 2 commit jadi 1",
          instructions: [
            "Di security-notes, ubah satu file tanpa commit, jalankan `git stash` untuk menyimpannya sementara.",
            "Konfirmasi `git status` bersih (working directory tidak ada perubahan).",
            "Kembalikan perubahan dengan `git stash pop`, lalu commit seperti biasa.",
            "Buat 2 commit kecil berturut-turut, lalu jalankan `git rebase -i HEAD~2` dan gabungkan (squash) keduanya jadi satu commit.",
          ],
          proof:
            "`git log --oneline` menunjukkan 2 commit sudah tergabung jadi 1 setelah rebase interaktif.",
        },
        {
          kind: "kuis",
          question:
            "Perintah apa untuk mengembalikan perubahan yang sebelumnya disimpan dengan `git stash`?",
          inputType: "text",
          placeholder: "contoh: git stash list",
          accepted: ["git stash pop", "stash pop"],
          explanation:
            "`git stash pop` mengembalikan perubahan paling atas dari daftar stash sekaligus menghapusnya dari daftar itu.",
        },
      ],
    },
    {
      index: 7,
      label: "Hari 63",
      title: "Alur Kolaborasi: Pull Request",
      steps: [
        {
          kind: "materi",
          title: "Mekanisme review kode standar industri",
          body: "Fork membuat salinan repo orang lain di akunmu sendiri. Pull request (PR) mengajukan perubahan dari fork/branch-mu untuk digabungkan ke repo asli, dan menjadi mekanisme review kode standar di hampir semua proyek open source - orang lain bisa mengomentari perubahanmu sebelum di-merge.",
        },
        {
          kind: "praktik",
          title: "Ajukan pull request nyata ke repo open source",
          instructions: [
            "Cari satu repository publik kecil di GitHub dengan perbaikan dokumentasi yang jelas (typo, link mati, dll) - misal repo 90DaysOfCyberSecurity yang jadi acuan roadmap ini.",
            "Fork repo itu ke akunmu.",
            "Buat branch baru, perbaiki satu hal kecil di dokumentasinya, commit, dan push ke fork-mu.",
            "Buka pull request dari branch itu ke repo asli, jelaskan perubahanmu di deskripsi PR.",
          ],
          proof: "Link pull request yang benar-benar terbuka di GitHub.",
        },
        {
          kind: "kuis",
          question:
            "Istilah untuk salinan pribadi sebuah repository orang lain di akun GitHub-mu sendiri disebut apa?",
          inputType: "text",
          placeholder: "contoh: clone",
          accepted: ["fork"],
          explanation:
            "Fork beda dari clone: clone cuma menyalin ke komputermu, fork membuat salinan repo baru di akun GitHub-mu sendiri, lengkap dengan riwayatnya, siap dijadikan sumber pull request.",
        },
      ],
    },
  ],
};

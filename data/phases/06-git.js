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
          body: "Git melacak perubahan file lewat snapshot (commit) dari seluruh proyek di titik waktu tertentu, bukan menyimpan perbedaan mentah antar-versi seperti yang dibayangkan banyak pemula. Tiap commit menyimpan referensi ke snapshot lengkap semua file yang di-track - kalau satu file tidak berubah antar-commit, Git cukup menunjuk ke salinan yang sama, tidak menyalin ulang. Cara berpikir ini penting karena banyak perintah Git (checkout, reset, revert) sebenarnya cuma soal 'pindah ke snapshot mana', bukan 'terapkan/undo diff ini'.",
        },
        {
          kind: "materi",
          title: "Tiga wilayah: working directory, staging area, repository",
          body: "Git bekerja lewat tiga wilayah: working directory (file yang sedang kamu edit di disk), staging area/index (area transit tempat perubahan yang sudah ditandai siap disimpan), dan repository (riwayat commit permanen di folder `.git`). Alurnya: ubah file di working directory → `git add` memindahkan perubahan itu ke staging area → `git commit` mengambil semua yang ada di staging area dan menyimpannya sebagai satu snapshot permanen di repository. Staging area inilah yang memungkinkan kamu memilih file/perubahan mana saja yang masuk ke satu commit, bukan otomatis semua perubahan yang ada sekaligus - berguna untuk memisahkan commit jadi logis dan mudah ditelusuri nanti.",
        },
        {
          kind: "materi",
          title: "Anatomi satu commit dan cara membaca riwayatnya",
          body: "Tiap commit punya: hash unik (identifier SHA-1/SHA-256 sepanjang commit itu), author dan timestamp, pesan commit, dan pointer ke commit sebelumnya (parent) - rangkaian pointer parent inilah yang membentuk riwayat/garis waktu proyek. `git log` menampilkan riwayat ini dari commit terbaru ke terlama; `git log --oneline` memampatkannya jadi satu baris per commit (hash pendek + pesan) supaya lebih mudah dipindai sekilas. Pesan commit yang deskriptif (menjelaskan APA yang berubah dan idealnya KENAPA) jauh lebih berharga saat riwayat sudah panjang, dibanding pesan generik seperti 'update' atau 'fix'.",
        },
        {
          kind: "praktik",
          title: "Mulai repo catatan security-mu sendiri",
          instructions: [
            "Buat folder `security-notes`, masuk ke dalamnya, lalu jalankan `git init`.",
            "Jalankan `git status` untuk melihat status awal repo (kosong, belum ada file ter-track).",
            "Tulis satu file markdown berisi catatan nyata dari materi Network+ atau Security+ yang sudah kamu selesaikan.",
            "Jalankan `git add <nama-file>` lalu `git status` lagi untuk melihat file itu sudah pindah ke staging area, baru `git commit` dengan pesan deskriptif.",
            "Tambah/ubah isi catatan, commit lagi 2 kali dengan pesan berbeda (total 3 commit).",
            "Jalankan `git log` (tanpa flag) sekali untuk melihat detail lengkap satu commit (hash, author, tanggal, pesan), lalu bandingkan dengan tampilan `git log --oneline`.",
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
          title: "Branch cuma pointer bergerak",
          body: "Secara internal, branch di Git cuma pointer ringan yang menunjuk ke satu commit tertentu - bukan salinan penuh seluruh proyek seperti di beberapa version control system lama, sehingga membuat branch baru itu instan dan murah. Branch `main` (atau `master`) hanyalah pointer bernama seperti branch lainnya, dianggap 'utama' cuma karena konvensi tim, bukan karena Git memperlakukannya spesial secara teknis. Setiap kali kamu commit di satu branch, pointer branch itu otomatis maju mengikuti commit terbarunya.",
        },
        {
          kind: "materi",
          title: "Fast-forward vs three-way merge",
          body: "Ada dua jenis merge: fast-forward terjadi kalau branch tujuan tidak punya commit baru sejak branch sumber dibuat - Git cukup menggeser pointer branch tujuan maju ke commit terbaru branch sumber, tanpa membuat commit merge baru. Three-way merge terjadi kalau kedua branch sudah sama-sama punya commit baru sejak titik pisahnya - Git membandingkan tiga titik (commit dasar bersama, ujung branch A, ujung branch B) dan membuat satu commit merge baru yang punya dua parent sekaligus.",
        },
        {
          kind: "materi",
          title: "Membaca dan menyelesaikan conflict marker",
          body: "Conflict terjadi saat dua branch mengubah baris yang sama secara berbeda - Git tidak bisa menebak versi mana yang benar, jadi berhenti di tengah proses merge dan menandai bagian yang bentrok langsung di file dengan conflict marker: `<<<<<<< HEAD` menandai awal versi branch saat ini, `=======` memisahkan kedua versi, dan `>>>>>>> nama-branch` menandai akhir versi branch yang di-merge. Tugas manusia: edit file itu langsung, hapus marker-marker itu, putuskan versi final (bisa salah satu, gabungan, atau tulisan baru sama sekali), lalu `git add` file itu dan `git commit` untuk menyelesaikan merge.",
        },
        {
          kind: "praktik",
          title: "Buat dan selesaikan satu merge conflict",
          instructions: [
            "Dari `security-notes`, buat branch `edit-1` dari `main` dengan `git branch edit-1` lalu `git checkout edit-1` (atau langsung `git checkout -b edit-1`).",
            "Pindah balik ke `main` (`git checkout main`), ubah baris pertama file catatanmu dan commit.",
            "Pindah ke `edit-1` lagi, ubah baris yang SAMA dengan teks berbeda, commit.",
            "Kembali ke `main`, jalankan `git merge edit-1` dan amati pesan conflict yang muncul.",
            "Buka file yang konflik, cari conflict marker (`<<<<<<<`, `=======`, `>>>>>>>`), putuskan versi final, hapus semua marker-nya.",
            "`git add` file yang sudah diperbaiki lalu `git commit` untuk menyelesaikan merge, dan konfirmasi lewat `git log` bahwa muncul satu commit dengan dua parent.",
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
          title: "Remote: repo lain yang saling terhubung",
          body: "Remote adalah referensi ke salinan repository yang sama di lokasi lain (biasanya server seperti GitHub/GitLab), memungkinkan backup di luar mesin lokal dan kolaborasi dengan orang lain. `origin` adalah nama default (bukan kata kunci wajib, cuma konvensi) untuk remote pertama yang kamu hubungkan ke repo lokalmu - `git remote -v` menampilkan semua remote yang terhubung beserta URL-nya.",
        },
        {
          kind: "materi",
          title: "Push, fetch, dan pull: tiga arah sinkronisasi",
          body: "`git push` mengirim commit dari branch lokal ke branch di remote, membuat riwayatmu ikut muncul di server. `git fetch` mengambil commit terbaru dari remote ke repo lokal TAPI tidak menggabungkannya ke branch kerja saat ini - commit itu baru 'terlihat' lewat referensi seperti `origin/main`, working directory tidak berubah. `git pull` = `git fetch` + `git merge` sekaligus dalam satu langkah - cara paling umum dipakai sehari-hari, tapi kalau kamu ingin melihat dulu apa yang berubah sebelum digabungkan, `fetch` manual lebih aman.",
        },
        {
          kind: "materi",
          title: "Tracking branch dan upstream",
          body: "Saat kamu `git push -u origin main` (atau `--set-upstream`), Git menyimpan hubungan antara branch lokal `main` dengan branch remote `origin/main` sebagai 'upstream' - setelah itu, cukup ketik `git push`/`git pull` tanpa menyebut nama remote dan branch lagi, Git sudah tahu ke/dari mana harus sinkron. Tanpa tracking branch ini, Git akan menolak `push`/`pull` polos dan minta kamu menyebutkan remote+branch secara eksplisit setiap kali.",
        },
        {
          kind: "praktik",
          title: "Push repo lokal ke GitHub dan clone ulang",
          instructions: [
            "Buat repository baru (kosong, tanpa README) di GitHub bernama `security-notes`.",
            "Hubungkan dengan `git remote add origin <url>`, lalu cek `git remote -v` untuk konfirmasi terhubung.",
            "Push dengan `git push -u origin main` supaya tracking branch langsung terpasang.",
            "Di folder lain di komputermu, jalankan `git clone <url>` untuk menyalin repo itu sebagai working copy kedua.",
            "Di clone kedua, buat perubahan baru, commit, lalu `git push`.",
            "Kembali ke folder pertama, jalankan `git pull` untuk menarik perubahan dari clone kedua, konfirmasi kedua folder sekarang identik.",
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
          title: "git diff: melihat sebelum menyimpan",
          body: "`git diff` menampilkan perbedaan baris-per-baris. Dijalankan tanpa argumen, ia membandingkan working directory dengan staging area (perubahan yang BELUM di-add). `git diff --staged` (atau `--cached`) membandingkan staging area dengan commit terakhir (perubahan yang SUDAH di-add tapi belum di-commit). `git diff commitA commitB` membandingkan dua commit mana pun secara langsung, berguna untuk melihat apa saja yang berubah di rentang riwayat tertentu tanpa harus commit demi commit.",
        },
        {
          kind: "materi",
          title: "git revert: membatalkan tanpa menghapus jejak",
          body: "`git revert <commit>` membuat commit BARU yang isinya kebalikan dari commit yang ditunjuk, secara efektif membatalkan efeknya tanpa menghapus commit lama dari riwayat. Ini aman dipakai pada commit yang sudah di-push dan mungkin sudah di-pull orang lain, karena riwayat tetap utuh - orang lain cukup pull commit revert-nya, tidak ada riwayat yang tiba-tiba 'hilang' di sisi mereka.",
        },
        {
          kind: "materi",
          title: "git reset: tiga mode, satu risiko",
          body: "`git reset` memindahkan pointer branch ke commit lain, dengan tiga mode yang menentukan apa yang terjadi ke staging area dan working directory: `--soft` (pointer pindah, staging area dan working directory tidak berubah - perubahan commit yang 'dihapus' tadi jadi staged lagi), `--mixed` (default, pointer dan staging area berubah, working directory tetap - perubahan jadi unstaged), dan `--hard` (pointer, staging area, DAN working directory semua berubah - perubahan benar-benar hilang dari disk). Reset menghapus/memindahkan commit dari riwayat branch saat ini, jadi berbahaya kalau commit itu sudah di-push dan dipakai orang lain - mereka akan punya riwayat yang 'menyimpang' dari milikmu.",
        },
        {
          kind: "praktik",
          title: "Bandingkan revert vs reset secara langsung",
          instructions: [
            "Jalankan `git diff HEAD~2 HEAD` di security-notes, catat perubahan apa saja yang terjadi di 2 commit terakhir.",
            'Buat satu commit "buruk" (misal menghapus isi penting file), catat hash commit-nya lewat `git log --oneline`.',
            "Batalkan dengan `git revert HEAD`, konfirmasi isi file kembali dan riwayat (`git log --oneline`) tetap mencatat commit buruk itu plus commit revert barunya.",
            "Sebagai perbandingan, buat branch baru dari titik sebelum commit buruk tadi, ulangi commit buruk yang sama di branch itu.",
            "Di branch pembanding itu, jalankan `git reset --hard HEAD~1` untuk menghapusnya, lalu bandingkan `git log --oneline` di branch ini dengan branch yang pakai revert - satu masih mencatat jejak commit buruknya, satu lagi tidak.",
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
          title: "Pola matching di .gitignore",
          body: "File `.gitignore` berisi daftar pola (satu per baris) yang memberi tahu Git file/folder mana yang tidak perlu ditawarkan untuk di-track. Pola bisa berupa nama file persis (`.env`), wildcard (`*.log` untuk semua file berekstensi log), atau folder (`node_modules/`) - tanda `#` di awal baris jadi komentar, dan `!` di depan pola berarti pengecualian (jangan ignore file ini meski cocok pola sebelumnya). File `.gitignore` sendiri sebaiknya ikut di-commit supaya semua orang di tim/riwayat proyek punya aturan ignore yang sama.",
        },
        {
          kind: "materi",
          title: "Kenapa mencegah jauh lebih murah daripada membersihkan",
          body: "Sekali sebuah secret (password, API key) ter-commit, ia tetap ada di riwayat Git selamanya meskipun filenya dihapus di commit berikutnya - siapa pun yang clone repo itu bisa menggali riwayat lama dan menemukannya lagi. Menambahkan `.gitignore` belakangan HANYA mencegah tracking baru, tidak menghapus jejak yang sudah kadung tercatat di commit-commit sebelumnya - inilah kenapa mencegah lewat `.gitignore` sejak awal proyek jauh lebih murah daripada membersihkan riwayat yang sudah kadung ternoda.",
        },
        {
          kind: "materi",
          title: "Kalau secret sudah kadung ter-commit",
          body: "Kalau secret sudah terlanjur masuk riwayat, ada dua langkah nyata: pertama dan PALING PENTING, rotasi/ganti kredensial itu segera - anggap ia sudah bocor, karena begitu ter-push ke remote publik, bot pemindai otomatis bisa menemukannya dalam hitungan menit. Kedua (opsional, tapi tidak menggantikan langkah pertama), bersihkan riwayat dengan tool khusus seperti `git filter-repo` yang menulis ulang seluruh riwayat commit untuk menghapus jejak file itu - operasi berat yang mengubah hash semua commit setelah titik itu, jadi harus dikoordinasikan kalau repo sudah dipakai orang lain.",
        },
        {
          kind: "praktik",
          title: "Cegah file rahasia ikut ter-commit",
          instructions: [
            "Buat file `.env` berisi baris dummy `API_KEY=fake12345`.",
            "Jalankan `git status` dulu SEBELUM menambah `.gitignore`, perhatikan `.env` muncul sebagai untracked.",
            "Tambahkan `.gitignore` berisi baris `.env`.",
            "Jalankan `git status` lagi, konfirmasi `.env` sekarang tidak muncul sama sekali (bukan cuma tidak staged, tapi benar-benar diabaikan).",
            "Commit `.gitignore`-nya, lalu jalankan `git log -p | grep API_KEY` untuk memastikan secret itu tidak pernah masuk riwayat commit mana pun.",
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
          title: "git stash: laci sementara untuk pekerjaan setengah jalan",
          body: "`git stash` mengambil semua perubahan yang belum di-commit (staged maupun belum), menyimpannya di tumpukan terpisah, dan mengembalikan working directory ke kondisi bersih seperti commit terakhir - berguna saat harus pindah branch mendadak (misal ada bug urgent) tapi pekerjaanmu belum siap di-commit. `git stash list` menampilkan semua stash tersimpan, `git stash pop` mengembalikan yang paling atas sekaligus menghapusnya dari daftar, dan `git stash apply` mengembalikan tanpa menghapus dari daftar (kalau mau dipakai lagi di branch lain).",
        },
        {
          kind: "materi",
          title: "Rebase vs merge: riwayat linear vs riwayat bercabang",
          body: "Merge menggabungkan dua branch dengan membuat commit merge baru yang punya dua parent, mempertahankan riwayat bercabang persis seperti kejadiannya. Rebase mengambil pendekatan berbeda: memindahkan (menulis ulang) commit dari satu branch supaya seolah-olah dibuat di atas ujung branch lain, menghasilkan riwayat linear tanpa commit merge tambahan - lebih rapi dibaca, tapi mengubah hash commit-commit yang di-rebase karena secara teknis itu commit BARU dengan parent berbeda, bukan commit lama yang dipindah.",
        },
        {
          kind: "materi",
          title: "Interactive rebase dan aturan emasnya",
          body: "`git rebase -i HEAD~N` membuka daftar N commit terakhir dalam editor teks, memungkinkan kamu mengubah urutan, menggabungkan (squash) beberapa commit jadi satu, mengubah pesan (reword), atau menghapus (drop) commit tertentu sebelum riwayat itu dibagikan ke orang lain. Aturan emas rebase: JANGAN rebase commit yang sudah di-push dan kemungkinan sudah di-pull orang lain - karena hash commit berubah, orang lain akan punya riwayat yang 'menyimpang' dan push/pull berikutnya jadi berantakan. Rebase aman untuk riwayat lokal yang belum dibagikan; begitu sudah dibagikan, pakai merge atau revert.",
        },
        {
          kind: "praktik",
          title: "Coba stash lalu rapikan 2 commit jadi 1",
          instructions: [
            "Di security-notes, ubah satu file tanpa commit, jalankan `git stash` untuk menyimpannya sementara.",
            "Konfirmasi `git status` bersih (working directory tidak ada perubahan) dan `git stash list` menampilkan satu entry.",
            "Kembalikan perubahan dengan `git stash pop`, lalu commit seperti biasa.",
            "Buat 2 commit kecil berturut-turut (misal dua perbaikan typo terpisah).",
            "Jalankan `git rebase -i HEAD~2`, di editor yang terbuka ubah baris commit kedua dari `pick` jadi `squash` (atau `s`), simpan.",
            "Tulis pesan commit gabungan saat diminta, lalu konfirmasi lewat `git log --oneline` bahwa 2 commit sudah tergabung jadi 1.",
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
          title: "Fork vs clone: dua cara menyalin repo orang lain",
          body: "Clone menyalin repository ke komputermu, tapi kamu tidak akan bisa push langsung ke repo asli kalau tidak punya akses tulis di sana. Fork membuat salinan PENUH repo itu (kode + riwayat) sebagai repository baru di akun GitHub-mu sendiri, tempat kamu bebas membuat perubahan dan push tanpa perlu izin siapa pun - baru dari fork itulah kamu mengajukan perubahan kembali ke repo asli.",
        },
        {
          kind: "materi",
          title: "Anatomi satu pull request",
          body: "Pull request (PR) adalah permintaan formal untuk menggabungkan commit dari satu branch (di fork-mu atau branch lain di repo yang sama) ke branch lain (biasanya `main` di repo asli). Satu PR berisi: judul dan deskripsi (menjelaskan APA dan KENAPA), daftar commit yang diajukan, diff lengkap yang bisa dikomentari baris per baris oleh reviewer, dan status check otomatis (CI/CD) yang menjalankan test/lint sebelum PR boleh di-merge. Maintainer bisa meminta perubahan (`request changes`), menyetujui (`approve`), atau langsung merge kalau semua sudah oke.",
        },
        {
          kind: "materi",
          title: "Kebiasaan PR yang bikin proses review lancar",
          body: "PR yang baik biasanya kecil dan fokus pada satu perubahan logis - PR raksasa yang mengubah puluhan file sekaligus jauh lebih sulit dan lambat di-review dibanding beberapa PR kecil berurutan. Deskripsi PR yang jelas (apa yang berubah, kenapa, cara mengujinya) menghemat waktu bolak-balik tanya-jawab dengan reviewer. Kebiasaan ini sama persis dipakai di dunia security: laporan pull request untuk perbaikan tooling internal, atau bahkan proof-of-concept exploit yang dikontribusikan ke proyek open source, semua mengikuti etika kolaborasi yang sama.",
        },
        {
          kind: "praktik",
          title: "Ajukan pull request nyata ke repo open source",
          instructions: [
            "Cari satu repository publik kecil di GitHub dengan perbaikan dokumentasi yang jelas (typo, link mati, dll) - misal repo 90DaysOfCyberSecurity yang jadi acuan roadmap ini.",
            "Fork repo itu ke akunmu lewat tombol Fork di GitHub.",
            "Clone hasil fork-mu ke lokal, buat branch baru dengan nama deskriptif (misal `fix-typo-readme`).",
            "Perbaiki satu hal kecil di dokumentasinya, commit dengan pesan jelas.",
            "Push branch itu ke fork-mu (`git push origin fix-typo-readme`).",
            "Buka GitHub, klik prompt untuk membuka pull request dari branch itu ke repo asli, isi judul dan deskripsi yang menjelaskan perubahanmu.",
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

# 90dCyberLearn

Roadmap praktik keamanan siber 90 hari, diadaptasi dari
[90DaysOfCyberSecurity](https://github.com/farhanashrafdev/90DaysOfCyberSecurity).
Situs statis (tanpa backend, tanpa build step) yang membagi roadmap jadi 12
fase - 99 hari - step (materi, praktik, kuis) dengan kotak jawaban yang dicek
langsung di browser.

## Menjalankan

Situs ini pakai ES modules (`<script type="module">`), jadi **harus dibuka
lewat server lokal**, bukan langsung buka file `index.html` (browser
memblokir `import` dari `file://`).

```bash
python3 -m http.server 8420
# atau: npx serve
```

Lalu buka `http://localhost:8420`.

## Struktur

```
index.html          shell halaman
css/                  satu file per komponen, mirror struktur js/
  tokens.css          warna, font, spacing (CSS custom properties)
  base.css            reset + gaya dasar body/link/tombol
  layout.css          kerangka sidebar + area konten
  nav.css             topbar + sidebar daftar fase
  shared.css          komponen lintas-view (breadcrumb, phase-header, phase-progress)
  views/
    overview.css       halaman ringkasan
    phaseDays.css       halaman daftar hari
    day.css             halaman satu hari + kotak jawaban
  responsive.css       semua @media dikumpulkan di sini
js/
  main.js            entry point, menyambungkan semuanya
  state.js           progres (localStorage) + perhitungan step selesai
  router.js           hash routing ('', /phase/:id, /phase/:id/day/:n)
  nav.js              topbar + sidebar
  dom.js               helper DOM murni
  views/
    overview.js        halaman ringkasan (grid semua fase)
    phaseDays.js        halaman daftar hari dalam satu fase
    day.js              halaman satu hari (render step + jawaban)
data/
  roadmap.js           gabungkan semua fase, urutkan berdasarkan nomor
  phases/NN-id.js       satu file per fase (data murni, `export default {...}`)
docker/                lab praktik lokal untuk fase Ethical Hacking
```

Progres belajar disimpan di `localStorage` browser (per-perangkat, tidak
disinkron ke mana pun).

## Menambah/mengubah konten

Setiap fase adalah satu file di `data/phases/`. Bentuknya:

```js
export default {
  id, number, title, dayRange, summary, resources: [{label, url}],
  days: [
    {
      index, label, title,
      steps: [
        { kind: 'materi', title, body },
        { kind: 'praktik', title, instructions: [...], proof, check?: {placeholder, accepted, explanation} },
        { kind: 'kuis', question, placeholder, accepted: [...], explanation }
      ]
    }
  ]
};
```

`accepted` dibandingkan case-insensitive + trimmed, exact match - bukan
substring. Tiap hari sebaiknya punya tepat satu step `kuis`.

## Lab Docker (fase Ethical Hacking)

Lihat [`docker/README.md`](docker/README.md) - target DVWA + terminal browser
berisi tools recon/eksploitasi, jalan lokal dan terisolasi.

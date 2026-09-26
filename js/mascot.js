// "Bayang" — maskot mengambang yang nemenin selama belajar. Berdiri sendiri
// dari sistem routing (hanya numpang baca ROADMAP buat fitur "Lanjutin
// Belajar"), jadi dia tetap muncul di semua halaman tanpa perlu di-render
// ulang tiap pindah view.

import { el } from './dom.js';
import { ROADMAP } from '../data/roadmap.js';
import { countDay } from './state.js';
import { goOverview, goExercises, goDay } from './router.js';

const IDLE_LINES = [
  'Psst... progress kamu masih segitu aja. Aku diem-diem merhatiin lho.',
  'Password "admin123" itu bukan strategi keamanan, itu undangan.',
  'Kalau capek belajar, inget: attacker gak pernah capek.',
  'Aku nungguin dari tadi. Lanjut belajar, atau aku mulai jalan-jalan sendiri.',
  'Fun fact: kata "reaper" di namaku bukan buat kamu. Buat sistem yang belum di-patch.',
  'Udah aktifin MFA di akun kamu sendiri belum?',
  'Tenang, aku cuma maskot. Bukan APT beneran.',
  'Kuis hari ini kayaknya masih nungguin buat dijawab...',
  'Kalau bosen, coba pencet aku — ada menu isengnya.',
  'Katanya mau jadi pentester, kok masih di halaman ini terus?',
  'Setiap detik kamu diem, satu server di luar sana kena scan Shodan.',
  'Belum tentu hackerman pakai hoodie kayak aku. Tapi aku emang pakai.'
];

const CLICK_LINES = [
  'Woy, jangan colek-colek, aku lagi mikirin exploit.',
  'Klik lagi, nanti aku ping balik.',
  'Butuh sesuatu, atau emang iseng doang?',
  '...',
  'Aku bukan tombol nuklir, tapi makasih udah diperhatiin.',
  'Halo! Ada yang bisa Bayang bantu?',
  'Hei. Ya. Aku beneran hidup, bukan cuma PNG.'
];

const WISDOM_LINES = [
  '"Satu-satunya sistem yang aman adalah yang dimatikan, dicor beton, dan dikubur." — agak berlebihan, tapi kamu paham maksudnya.',
  'Kerentanan paling umum bukan di kode — tapi di orang yang males baca dokumentasi.',
  'Recon yang bagus bikin eksploitasi jadi kelihatan gampang. Itu bukan keberuntungan, itu kerja.',
  'Kalau semua step kelihatan gampang, kamu mungkin ngelewatin sesuatu yang penting.',
  'Log yang gak pernah dibaca sama aja kayak gak ada log.'
];

const SPRITE_W = 68;
const SPRITE_H = 84;
const SIDEBAR_CLEARANCE = 300; // jangan nutupin sidebar fase pas jalan sendiri
const MANUAL_STEP = 32;

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function findNextUnfinishedDay() {
  for (const phase of ROADMAP) {
    for (const day of phase.days) {
      const { done, total } = countDay(phase, day);
      if (done < total) return { phaseId: phase.id, dayIndex: day.index };
    }
  }
  return null;
}

export function initMascot() {
  const root = document.getElementById('mascot');
  if (!root) return;

  const sprite = el('button', { class: 'mascot__sprite', type: 'button', 'aria-label': 'Bayang' });
  const bubble = el('div', { class: 'mascot__bubble', role: 'status', 'aria-live': 'polite' });
  const menu = el('div', { class: 'mascot__menu' });

  root.append(sprite, bubble, menu);

  let bubbleTimer = null;
  let idleTimer = null;
  let walkTimer = null;
  let menuOpen = false;
  let manualMode = false;
  let facing = 1; // 1 = normal, -1 = dibalik (abis jalan ke kiri)

  function currentRight() {
    return parseFloat(root.style.right || '24');
  }

  function currentBottom() {
    return parseFloat(root.style.bottom || '18');
  }

  function faceTowards(deltaX) {
    if (deltaX === 0) return;
    facing = deltaX > 0 ? -1 : 1;
    sprite.style.transform = 'scaleX(' + facing + ')';
  }

  function say(text, duration = 4200) {
    bubble.textContent = text;
    bubble.classList.add('is-visible');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove('is-visible'), duration);
  }

  // Bubble numpuk sama menu kalau keduanya nempel di atas sprite bareng —
  // begitu menu kebuka, geser bubble ke atas MENU (bukan atas sprite),
  // diukur dari tinggi menu yang beneran dirender, bukan angka tebakan.
  function repositionBubble() {
    bubble.style.bottom = menuOpen ? SPRITE_H + menu.offsetHeight + 20 + 'px' : '';
  }

  function closeMenu() {
    menuOpen = false;
    menu.classList.remove('is-open');
    repositionBubble();
  }

  function openMenu() {
    menuOpen = true;
    renderMenu();
    menu.classList.add('is-open');
    repositionBubble();
  }

  function menuItem(label, onClick) {
    const item = el('button', { class: 'mascot__menu-item', type: 'button', text: label });
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
      onClick();
    });
    return item;
  }

  function renderMenu() {
    menu.replaceChildren(
      menuItem('Ringkasan progress', goOverview),
      menuItem('Lanjutin belajar', () => {
        const next = findNextUnfinishedDay();
        if (next) goDay(next.phaseId, next.dayIndex);
        else say('Lah, semua udah kelar? Serius? Gaskeun ke Latihan Soal.', 5000);
      }),
      menuItem('Latihan Soal (Advanced)', goExercises),
      menuItem('Kata bijak Bayang', () => say(randomFrom(WISDOM_LINES), 6500)),
      menuItem('Buka terminal', () => say('Enggak lah, aku maskot, bukan xterm 😄', 4000)),
      menuItem(manualMode ? 'Matikan kontrol WASD' : 'Kontrol manual (WASD)', toggleManualMode),
      menuItem('Tentang Bayang', () =>
        say('Aku nemenin kamu selama 90 hari ini. Gak ngapa-ngapain selain nyeletuk dan jalan-jalan.', 5500)
      )
    );
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!menuOpen) say(randomFrom(IDLE_LINES));
      resetIdleTimer();
    }, randomBetween(5000, 10000));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function walkToRandomSpot() {
    const margin = 16;
    const wide = window.innerWidth > 900;
    const maxRight = wide
      ? Math.max(margin, window.innerWidth - SIDEBAR_CLEARANCE - SPRITE_W)
      : Math.max(margin, window.innerWidth - SPRITE_W - margin);
    const maxBottom = Math.max(margin, window.innerHeight - SPRITE_H - 90); // 90 ~ sisain ruang topbar

    const targetRight = randomBetween(margin, maxRight);
    const targetBottom = randomBetween(margin, maxBottom);

    faceTowards(currentRight() - targetRight); // gerak ke kanan (right berkurang) -> hadap kanan
    root.classList.add('is-walking');
    root.style.right = targetRight + 'px';
    root.style.bottom = targetBottom + 'px';
    setTimeout(() => root.classList.remove('is-walking'), 900);
  }

  function scheduleWalk() {
    clearTimeout(walkTimer);
    walkTimer = setTimeout(() => {
      if (!menuOpen && !manualMode) walkToRandomSpot();
      scheduleWalk();
    }, randomBetween(5000, 10000));
  }

  function moveBy(dx, dy) {
    const margin = 8;
    const maxRight = window.innerWidth - SPRITE_W - margin;
    const maxBottom = window.innerHeight - SPRITE_H - margin;
    const nextRight = clamp(currentRight() + dx, margin, maxRight);
    const nextBottom = clamp(currentBottom() + dy, margin, maxBottom);
    faceTowards(currentRight() - nextRight);
    root.classList.add('is-walking');
    root.style.right = nextRight + 'px';
    root.style.bottom = nextBottom + 'px';
    clearTimeout(walkTimer);
    walkTimer = setTimeout(() => root.classList.remove('is-walking'), 400);
  }

  function toggleManualMode() {
    manualMode = !manualMode;
    root.classList.toggle('is-manual', manualMode);
    if (manualMode) {
      clearTimeout(walkTimer);
      say('Kontrol manual aktif! W A S D buat gerak, Esc buat keluar.', 6000);
    } else {
      say('Oke, aku jalan sendiri lagi.', 3000);
      scheduleWalk();
    }
  }

  function handleManualKey(e) {
    if (!manualMode) return;
    const key = e.key.toLowerCase();
    if (key === 'escape') {
      toggleManualMode();
      return;
    }
    const moves = { w: [0, MANUAL_STEP], s: [0, -MANUAL_STEP], a: [MANUAL_STEP, 0], d: [-MANUAL_STEP, 0] };
    const move = moves[key];
    if (!move) return;
    e.preventDefault();
    moveBy(move[0], move[1]);
  }

  sprite.addEventListener('click', (e) => {
    e.stopPropagation();
    say(randomFrom(CLICK_LINES));
    if (menuOpen) closeMenu();
    else openMenu();
    resetIdleTimer();
  });

  document.addEventListener('click', (e) => {
    if (menuOpen && !root.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', handleManualKey);

  ['mousemove', 'keydown', 'scroll'].forEach((evt) => {
    document.addEventListener(evt, resetIdleTimer, { passive: true });
  });

  root.style.right = '24px';
  root.style.bottom = '18px';
  resetIdleTimer();
  scheduleWalk();
}

initMascot();

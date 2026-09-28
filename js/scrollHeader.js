// Shrinking header on scroll: topbar sticky, memampat begitu halaman
// discroll melewati threshold, balik normal begitu scroll ke atas lagi.

const COMPACT_THRESHOLD = 24;

/* Nilai ini harus sama persis dengan --topbar-h / --topbar-h-compact di
   tokens.css - di-set ulang di sini karena .layout menghitung min-height-nya
   dari --topbar-h lewat calc(), jadi variabelnya perlu benar-benar berubah
   nilai saat topbar memampat, bukan cuma class CSS. */
const TOPBAR_H = "76px";
const TOPBAR_H_COMPACT = "52px";

export function initScrollHeader() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let isCompact = false;

  function applyState(compact) {
    if (compact === isCompact) return;
    isCompact = compact;
    topbar.classList.toggle("is-compact", compact);
    document.documentElement.style.setProperty(
      "--topbar-h",
      compact ? TOPBAR_H_COMPACT : TOPBAR_H,
    );
  }

  function onScroll() {
    applyState(window.scrollY > COMPACT_THRESHOLD);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

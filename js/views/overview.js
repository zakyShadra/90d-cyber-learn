// Ringkasan: grid semua fase, ala daftar "Path".

import { el, setContent, phaseNumber } from "../dom.js";
import { countPhase, countAll } from "../state.js";
import { goPhase } from "../router.js";

function stat(value, label) {
  return el("div", { class: "stat" }, [
    el("span", { class: "stat__value", text: value }),
    el("span", { class: "stat__label", text: label }),
  ]);
}

function phaseCard(phase) {
  const { done, total } = countPhase(phase);

  const card = el("button", { class: "phase-card", type: "button" }, [
    el("div", { class: "phase-card__body" }, [
      el("div", {
        class: "phase-card__eyebrow",
        text: "FASE " + phaseNumber(phase) + " · " + phase.dayRange,
      }),
      el("h3", { class: "phase-card__title", text: phase.title }),
      el("p", { class: "phase-card__summary", text: phase.summary }),
      el("span", {
        class: "phase-card__count",
        text:
          done + "/" + total + " step selesai · " + phase.days.length + " hari",
      }),
    ]),
  ]);
  card.addEventListener("click", () => goPhase(phase.id));
  return card;
}

export function renderOverview(container, roadmap) {
  const { done, total } = countAll(roadmap);
  const totalDays = roadmap.reduce((sum, p) => sum + p.days.length, 0);

  const hero = el("div", { class: "overview-hero" }, [
    el("h1", { text: "Ringkasan roadmap" }),
    el("p", {
      text: "Tiap fase dibagi jadi beberapa hari. Tiap hari berisi step-by-step: materi buat dibaca, tugas buat dipraktikkan, dan kuis buat ngecek pemahamanmu — dijawab langsung di sini, dicek instan.",
    }),
  ]);

  const stats = el("div", { class: "overview-stats" }, [
    stat(done + "/" + total, "step selesai"),
    stat(roadmap.length, "fase"),
    stat(totalDays, "hari total"),
  ]);

  const grid = el("div", { class: "phase-grid" }, roadmap.map(phaseCard));

  setContent(container, hero, stats, grid);
}

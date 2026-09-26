// Daftar hari dalam satu fase, ala daftar "Room" di suatu Path.

import {
  el,
  setContent,
  breadcrumb,
  progressBlock,
  phaseNumber,
} from "../dom.js";
import { countPhase, countDay, percent } from "../state.js";
import { goOverview, goDay } from "../router.js";

function dayCard(phase, day) {
  const { done, total } = countDay(phase, day);
  const complete = total > 0 && done === total;

  const card = el(
    "button",
    { class: "day-card" + (complete ? " is-complete" : ""), type: "button" },
    [
      el("div", {
        class: "day-card__badge",
        text: complete ? "✓" : String(day.index),
      }),
      el("div", { class: "day-card__body" }, [
        el("span", { class: "day-card__label", text: day.label }),
        el("h3", { class: "day-card__title", text: day.title }),
        el("span", {
          class: "day-card__count",
          text: done + "/" + total + " step",
        }),
      ]),
    ],
  );
  card.addEventListener("click", () => goDay(phase.id, day.index));
  return card;
}

export function renderPhaseDays(container, phase) {
  const crumb = breadcrumb([
    { label: "Ringkasan", onClick: goOverview },
    { label: phase.title },
  ]);

  const header = el("div", { class: "phase-header" }, [
    el("div", {
      class: "phase-header__eyebrow",
      text: "Fase " + phaseNumber(phase) + " · " + phase.dayRange,
    }),
    el("h1", { text: phase.title }),
    el("p", { class: "phase-header__summary", text: phase.summary }),
  ]);

  const resourceBlock = phase.resources.length
    ? el("div", { class: "phase-header__resources" }, [
        el("div", {
          class: "phase-header__resources-label",
          text: "REFERENSI BELAJAR",
        }),
        el(
          "ul",
          {},
          phase.resources.map((r) =>
            el("li", {}, [
              el("a", {
                href: r.url,
                target: "_blank",
                rel: "noopener",
                text: r.label,
              }),
            ]),
          ),
        ),
      ])
    : null;

  const count = countPhase(phase);
  const grid = el(
    "div",
    { class: "day-grid" },
    phase.days.map((day) => dayCard(phase, day)),
  );

  setContent(
    container,
    crumb,
    header,
    resourceBlock,
    progressBlock(count, percent(count.done, count.total)),
    grid,
  );
}

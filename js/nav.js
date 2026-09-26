// Chrome yang selalu tampil: topbar (progres keseluruhan) + sidebar (daftar fase).

import { el, barFill, phaseNumber, setCurrent } from "./dom.js";
import { countPhase, countAll, percent } from "./state.js";
import { goPhase, goOverview } from "./router.js";

const overallDone = document.getElementById("overallDone");
const overallTotal = document.getElementById("overallTotal");
const overallBar = document.getElementById("overallBar");
const overallFill = document.getElementById("overallFill");
const overviewBtn = document.getElementById("overviewBtn");
const phaseListEl = document.getElementById("phaseList");

export function renderTopbar(roadmap) {
  const { done, total } = countAll(roadmap);
  const pct = percent(done, total);
  overallDone.textContent = done;
  overallTotal.textContent = total;
  overallFill.style.width = pct + "%";
  overallBar.setAttribute("aria-valuenow", pct);
}

export function renderNav(roadmap, activePhaseId) {
  setCurrent(overviewBtn, activePhaseId === null);

  const items = roadmap.map((phase) => {
    const { done, total } = countPhase(phase);

    const link = el("button", { class: "phase-nav__link", type: "button" }, [
      el("div", { class: "phase-nav__row" }, [
        el("span", { class: "phase-nav__number", text: phaseNumber(phase) }),
        el("span", { class: "phase-nav__days", text: phase.dayRange }),
      ]),
      el("span", { class: "phase-nav__title", text: phase.title }),
      el(
        "div",
        {
          class: "phase-nav__meter",
          role: "img",
          "aria-label": done + "/" + total + " step selesai",
        },
        [barFill("phase-nav__meter-fill", percent(done, total))],
      ),
    ]);
    setCurrent(link, phase.id === activePhaseId);
    link.addEventListener("click", () => goPhase(phase.id));

    return el("li", { class: "phase-nav__item" }, [link]);
  });

  phaseListEl.replaceChildren(...items);
}

export function initNav() {
  overviewBtn.addEventListener("click", goOverview);
}

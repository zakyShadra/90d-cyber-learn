// Entry point: menyambungkan data, routing, chrome (topbar/sidebar), dan
// ketiga tampilan (ringkasan / daftar-hari / satu-hari).

import { ROADMAP } from "../data/roadmap.js";
import { parseHash } from "./router.js";
import { renderTopbar, renderNav, initNav } from "./nav.js";
import { renderOverview } from "./views/overview.js";
import { renderPhaseDays } from "./views/phaseDays.js";
import { renderDay } from "./views/day.js";

const content = document.getElementById("content");

function refreshChrome(activePhaseId) {
  renderTopbar(ROADMAP);
  renderNav(ROADMAP, activePhaseId);
}

function route() {
  const { phase, day } = parseHash(ROADMAP);
  refreshChrome(phase ? phase.id : null);

  if (phase && day) {
    renderDay(content, ROADMAP, phase, day, () => refreshChrome(phase.id));
  } else if (phase) {
    renderPhaseDays(content, phase);
  } else {
    renderOverview(content, ROADMAP);
  }

  content.focus();
}

initNav();
window.addEventListener("hashchange", route);
route();

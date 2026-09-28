// Chrome yang selalu tampil: topbar (progres keseluruhan + nav Ringkasan/Latihan Soal).

import { setCurrent } from './dom.js';
import { countAll, percent } from './state.js';
import { goOverview } from './router.js';

const overallDone = document.getElementById('overallDone');
const overallTotal = document.getElementById('overallTotal');
const overallBar = document.getElementById('overallBar');
const overallFill = document.getElementById('overallFill');
const overviewBtn = document.getElementById('overviewBtn');
const exercisesBtn = document.getElementById('exercisesBtn');

export function renderTopbar(roadmap) {
  const { done, total } = countAll(roadmap);
  const pct = percent(done, total);
  overallDone.textContent = done;
  overallTotal.textContent = total;
  overallFill.style.width = pct + '%';
  overallBar.setAttribute('aria-valuenow', pct);
}

/**
 * @param {string|null} activeKey - id fase yang aktif, 'exercises', atau null (ringkasan)
 */
export function renderNav(activeKey) {
  setCurrent(overviewBtn, activeKey === null);
  setCurrent(exercisesBtn, activeKey === 'exercises');
}

export function initNav() {
  overviewBtn.addEventListener('click', goOverview);
}

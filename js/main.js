// Entry point: menyambungkan data, routing, chrome (topbar/sidebar), dan
// semua tampilan (ringkasan / daftar-hari / satu-hari / latihan soal).

import { ROADMAP } from '../data/roadmap.js';
import { EXERCISES, TARGET } from '../data/exercises.js';
import { parseHash, goExercises } from './router.js';
import { renderTopbar, renderNav, initNav } from './nav.js';
import { renderOverview } from './views/overview.js';
import { renderPhaseDays } from './views/phaseDays.js';
import { renderDay } from './views/day.js';
import { renderExerciseList, renderExerciseDetail } from './views/exercises.js';

const content = document.getElementById('content');
const exercisesBtn = document.getElementById('exercisesBtn');

function refreshChrome(activeKey) {
  renderTopbar(ROADMAP);
  renderNav(ROADMAP, activeKey);
}

function route() {
  const route = parseHash(ROADMAP);
  const activeKey = route.phase ? route.phase.id : (route.type === 'exercises' || route.type === 'exercise') ? 'exercises' : null;
  refreshChrome(activeKey);

  switch (route.type) {
    case 'day':
      renderDay(content, ROADMAP, route.phase, route.day, () => refreshChrome(route.phase.id));
      break;
    case 'phase':
      renderPhaseDays(content, route.phase);
      break;
    case 'exercises':
      renderExerciseList(content, EXERCISES, TARGET);
      break;
    case 'exercise': {
      const exercise = EXERCISES.find((e) => e.id === route.exerciseId);
      if (exercise) renderExerciseDetail(content, exercise, TARGET, () => refreshChrome('exercises'));
      else renderExerciseList(content, EXERCISES, TARGET);
      break;
    }
    default:
      renderOverview(content, ROADMAP);
  }

  content.focus();
}

initNav();
exercisesBtn.addEventListener('click', goExercises);
window.addEventListener('hashchange', route);
route();

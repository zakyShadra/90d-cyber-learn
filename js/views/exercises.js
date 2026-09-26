// Latihan Soal (Advanced): studi kasus yang semuanya menyasar satu web
// tumbal yang sama (lihat data/exercises.js untuk detail target).

import { el, setContent, breadcrumb } from '../dom.js';
import { isStepDone, markStep } from '../state.js';
import { goOverview, goExercises, goExercise } from '../router.js';
import { renderAnswerBox } from './day.js';

function exerciseStateId(exercise) {
  return 'exercise:' + exercise.id;
}

function targetCard(target) {
  return el('div', { class: 'exercise-target' }, [
    el('div', { class: 'exercise-target__label', text: 'TARGET LATIHAN' }),
    el('h3', { text: target.name }),
    el('p', { class: 'exercise-target__url', text: target.baseUrl }),
    el('p', { class: 'muted', text: target.note }),
    el('table', { class: 'exercise-target__creds' }, [
      el('tr', {}, [el('th', { text: 'Username' }), el('th', { text: 'Password' })]),
      ...target.credentials.map((c) =>
        el('tr', {}, [el('td', { text: c.username }), el('td', { text: c.password })])
      )
    ])
  ]);
}

function exerciseCard(exercise) {
  const done = isStepDone(exerciseStateId(exercise));
  const card = el('button', { class: 'exercise-card' + (done ? ' is-done' : ''), type: 'button' }, [
    el('div', { class: 'exercise-card__badge', text: done ? '✓' : String(exercise.order) }),
    el('div', { class: 'exercise-card__body' }, [
      el('span', { class: 'exercise-card__category', text: exercise.category }),
      el('h3', { class: 'exercise-card__title', text: exercise.title })
    ])
  ]);
  card.addEventListener('click', () => goExercise(exercise.id));
  return card;
}

export function renderExerciseList(container, exercises, target) {
  const crumb = breadcrumb([{ label: 'Ringkasan', onClick: goOverview }, { label: 'Latihan Soal' }]);

  const header = el('div', { class: 'phase-header' }, [
    el('div', { class: 'phase-header__eyebrow', text: 'LATIHAN SOAL · ADVANCED' }),
    el('h1', { text: 'Studi Kasus: NUSANTARA MART' }),
    el('p', {
      class: 'phase-header__summary',
      text: 'Bukan lagi materi bertahap seperti fase-fase sebelumnya — di sini kamu langsung dilempar ke skenario pentest, tanpa dituntun langkah demi langkah. Semua studi kasus di bawah menyasar SATU web tumbal yang sama, jadi kenali dulu targetnya sebelum mulai.'
    })
  ]);

  const sorted = exercises.slice().sort((a, b) => a.order - b.order);
  const grid = el('div', { class: 'exercise-grid' }, sorted.map(exerciseCard));

  setContent(container, crumb, header, targetCard(target), grid);
}

export function renderExerciseDetail(container, exercise, target, onProgressChange) {
  const id = exerciseStateId(exercise);

  const crumb = breadcrumb([
    { label: 'Ringkasan', onClick: goOverview },
    { label: 'Latihan Soal', onClick: goExercises },
    { label: exercise.title }
  ]);

  const header = el('div', { class: 'phase-header' }, [
    el('div', { class: 'phase-header__eyebrow', text: 'STUDI KASUS ' + exercise.order + ' · ' + exercise.category }),
    el('h1', { text: exercise.title })
  ]);

  const scenarioBlock = el('div', { class: 'step step--materi' }, [
    el('div', { class: 'step__kind', text: 'SKENARIO' }),
    el('p', { class: 'step__body', text: exercise.scenario })
  ]);

  const objectiveBlock = el('div', { class: 'step step--praktik' }, [
    el('div', { class: 'step__kind step__kind--praktik', text: 'TUJUAN' }),
    el('p', { class: 'step__body', text: exercise.objective })
  ]);

  const tasksBlock = el('div', { class: 'step' }, [
    el('div', { class: 'step__kind step__kind--praktik', text: 'YANG PERLU KAMU LAKUKAN' }),
    el('ol', { class: 'step__instructions' }, exercise.tasks.map((t) => el('li', { text: t })))
  ]);

  const article = el('article', { class: 'step step--kuis' + (isStepDone(id) ? ' is-done' : '') }, [
    el('div', { class: 'step__kind step__kind--kuis', text: 'BUKTI EKSPLOITASI (FLAG)' })
  ]);
  const box = renderAnswerBox(id, exercise.check, (correct) => {
    markStep(id, correct);
    article.classList.toggle('is-done', correct);
    if (onProgressChange) onProgressChange();
  });
  article.appendChild(box);

  setContent(container, crumb, header, targetCard(target), scenarioBlock, objectiveBlock, tasksBlock, article);
}

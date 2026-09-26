// Hash routing murni: baca/tulis location.hash, tidak merender apa pun.
// Bentuk hash: '', '/phase/<id>', '/phase/<id>/day/<index>',
// '/latihan', '/latihan/<exerciseId>'.

export function parseHash(roadmap) {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (parts[0] === 'latihan') {
    return parts[1] ? { type: 'exercise', exerciseId: parts[1] } : { type: 'exercises' };
  }

  if (parts[0] === 'phase') {
    const phase = roadmap.find((p) => p.id === parts[1]);
    if (!phase) return { type: 'overview' };

    const day = parts[2] === 'day' ? phase.days.find((d) => String(d.index) === parts[3]) : null;
    return day ? { type: 'day', phase, day } : { type: 'phase', phase };
  }

  return { type: 'overview' };
}

export function goOverview() {
  window.location.hash = '';
}

export function goPhase(phaseId) {
  window.location.hash = '/phase/' + phaseId;
}

export function goDay(phaseId, dayIndex) {
  window.location.hash = '/phase/' + phaseId + '/day/' + dayIndex;
}

export function goExercises() {
  window.location.hash = '/latihan';
}

export function goExercise(id) {
  window.location.hash = '/latihan/' + id;
}

/* Hari berikutnya: lanjut di fase yang sama, lalu lompat ke hari pertama
   fase berikutnya kalau ini hari terakhir. null kalau ini hari terakhir
   dari fase terakhir (roadmap selesai). */
export function nextDayTarget(roadmap, phase, day) {
  const nextInPhase = phase.days.find((d) => d.index === day.index + 1);
  if (nextInPhase) return { phaseId: phase.id, dayIndex: nextInPhase.index };

  const nextPhase = roadmap[roadmap.findIndex((p) => p.id === phase.id) + 1];
  return nextPhase ? { phaseId: nextPhase.id, dayIndex: nextPhase.days[0].index } : null;
}

// Progres belajar: penyimpanan localStorage + perhitungan step selesai.
// Modul ini satu-satunya yang boleh menyentuh `progress` secara langsung —
// modul lain hanya lewat fungsi-fungsi di bawah.

const STORAGE_KEY = "signal90-progress-v2";

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && typeof stored === "object" ? stored : {};
  } catch (err) {
    return {};
  }
}

const progress = loadProgress();

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    /* localStorage tidak tersedia — progres tidak ikut tersimpan. */
  }
}

export function stepId(phase, day, stepIndex) {
  return phase.id + ":" + day.index + ":" + stepIndex;
}

export function isStepDone(id) {
  return Boolean(progress[id] && progress[id].done);
}

export function markStep(id, done) {
  if (done) {
    progress[id] = { done: true };
  } else {
    delete progress[id];
  }
  saveProgress();
}

function normalize(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function answerMatches(userInput, accepted) {
  const normalizedInput = normalize(userInput);
  if (!normalizedInput) return false;
  return (accepted || []).some(
    (candidate) => normalize(candidate) === normalizedInput,
  );
}

export function percent(done, total) {
  return total ? Math.round((done / total) * 100) : 0;
}

function sumCounts(items, count) {
  return items.reduce(
    (acc, item) => {
      const c = count(item);
      return { done: acc.done + c.done, total: acc.total + c.total };
    },
    { done: 0, total: 0 },
  );
}

export function countDay(phase, day) {
  const ids = day.steps.map((_, i) => stepId(phase, day, i));
  return { done: ids.filter(isStepDone).length, total: ids.length };
}

export function countPhase(phase) {
  return sumCounts(phase.days, (day) => countDay(phase, day));
}

export function countAll(roadmap) {
  return sumCounts(roadmap, countPhase);
}

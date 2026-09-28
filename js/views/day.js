// Halaman satu hari: daftar step (materi / praktik / kuis) + navigasi ke
// hari berikutnya. Bagian paling interaktif dari seluruh aplikasi.

import { el, setContent, breadcrumb, progressBlock } from "../dom.js";
import {
  stepId,
  isStepDone,
  markStep,
  answerMatches,
  countDay,
  percent,
  getAnswer,
  saveAnswer,
} from "../state.js";
import { goOverview, goPhase, goDay, nextDayTarget } from "../router.js";

function stepCheckbox(id, label) {
  const checkbox = el("input", {
    type: "checkbox",
    id: "chk-" + id,
    "aria-label": label,
  });
  checkbox.checked = isStepDone(id);
  return checkbox;
}

function stepHead(checkbox, kindClass, kindText, title) {
  return el("div", { class: "step__head" }, [
    el("label", { class: "step__checkbox", for: checkbox.id }, [checkbox]),
    el("div", {}, [
      el("div", { class: kindClass, text: kindText }),
      el("h3", { class: "step__title", text: title }),
    ]),
  ]);
}

/* Satu jalur untuk tiap perubahan status step: simpan, tandai kartu, segarkan
   angka (progres hari ini secara lokal, plus topbar/sidebar lewat callback). */
function makeSetDone(id, article, onLocalChange, onProgressChange) {
  return function setDone(isDone) {
    markStep(id, isDone);
    article.classList.toggle("is-done", isDone);
    onLocalChange();
    onProgressChange();
  };
}

function renderMateri(
  phase,
  day,
  step,
  index,
  onLocalChange,
  onProgressChange,
) {
  const id = stepId(phase, day, index);
  const checkbox = stepCheckbox(id, 'Tandai "' + step.title + '" sudah dibaca');

  const article = el(
    "article",
    { class: "step step--materi" + (checkbox.checked ? " is-done" : "") },
    [
      stepHead(checkbox, "step__kind", "MATERI", step.title),
      el("p", { class: "step__body", text: step.body }),
    ],
  );

  const setDone = makeSetDone(id, article, onLocalChange, onProgressChange);
  checkbox.addEventListener("change", () => setDone(checkbox.checked));

  return article;
}

export function renderAnswerBox(id, { placeholder, accepted, explanation }, onResult) {
  const input = el("input", {
    class: "answer-box__input",
    type: "text",
    placeholder: placeholder || "Ketik jawabanmu di sini",
    id: "ans-" + id,
  });
  const feedback = el("div", {
    class: "answer-box__feedback",
    "aria-live": "polite",
  });
  const button = el("button", {
    class: "answer-box__submit",
    type: "button",
    text: "Cek Jawaban",
  });

  function check() {
    const correct = answerMatches(input.value, accepted);
    saveAnswer(id, input.value);
    if (correct) {
      feedback.textContent = explanation ? "Benar. " + explanation : "Benar.";
    } else {
      feedback.textContent = explanation
        ? "Belum tepat, coba lagi. (" + explanation + ")"
        : "Belum tepat, coba lagi.";
    }
    feedback.className =
      "answer-box__feedback " + (correct ? "is-correct" : "is-wrong");
    if (onResult) onResult(correct);
  }

  button.addEventListener("click", check);
  input.addEventListener("blur", () => saveAnswer(id, input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      check();
    }
  });

  /* Balik ke step yang pernah dijawab: isi ulang input dan tampilkan lagi
     feedback-nya, supaya user langsung inget jawaban & hasilnya tanpa
     harus klik "Cek Jawaban" ulang. */
  const savedAnswer = getAnswer(id);
  if (savedAnswer) {
    input.value = savedAnswer;
    check();
  }

  return el("div", { class: "answer-box" }, [
    el("label", {
      class: "answer-box__label",
      for: "ans-" + id,
      text: "Jawabanmu",
    }),
    el("div", { class: "answer-box__row" }, [input, button]),
    feedback,
  ]);
}

function renderPraktik(
  phase,
  day,
  step,
  index,
  onLocalChange,
  onProgressChange,
) {
  const id = stepId(phase, day, index);
  const checkbox = stepCheckbox(id, 'Tandai "' + step.title + '" selesai');

  const article = el("article", {
    class: "step step--praktik" + (checkbox.checked ? " is-done" : ""),
  });
  const setDone = makeSetDone(id, article, onLocalChange, onProgressChange);

  checkbox.addEventListener("change", () => setDone(checkbox.checked));

  const children = [
    stepHead(checkbox, "step__kind step__kind--praktik", "PRAKTIK", step.title),
    step.body ? el("p", { class: "step__body", text: step.body }) : null,
    el(
      "ol",
      { class: "step__instructions" },
      step.instructions.map((line) => el("li", { text: line })),
    ),
    el("p", { class: "step__proof" }, [
      el("strong", { text: "Bukti selesai: " }),
      document.createTextNode(step.proof),
    ]),
    step.check
      ? renderAnswerBox(id, step.check, (correct) => {
          if (!correct) return;
          checkbox.checked = true;
          setDone(true);
        })
      : null,
  ];

  article.append(...children.filter(Boolean));
  return article;
}

function renderKuis(phase, day, step, index, onLocalChange, onProgressChange) {
  const id = stepId(phase, day, index);

  const article = el(
    "article",
    { class: "step step--kuis" + (isStepDone(id) ? " is-done" : "") },
    [
      el("div", { class: "step__kind step__kind--kuis", text: "KUIS" }),
      el("p", { class: "step__question", text: step.question }),
    ],
  );

  const setDone = makeSetDone(id, article, onLocalChange, onProgressChange);
  article.appendChild(renderAnswerBox(id, step, setDone));
  return article;
}

function renderStep(phase, day, step, index, onLocalChange, onProgressChange) {
  switch (step.kind) {
    case "materi":
      return renderMateri(
        phase,
        day,
        step,
        index,
        onLocalChange,
        onProgressChange,
      );
    case "praktik":
      return renderPraktik(
        phase,
        day,
        step,
        index,
        onLocalChange,
        onProgressChange,
      );
    case "kuis":
      return renderKuis(
        phase,
        day,
        step,
        index,
        onLocalChange,
        onProgressChange,
      );
    default:
      return null;
  }
}

/* Menandai step yang self-graded (materi, dan praktik tanpa kotak jawaban)
   sebagai selesai sekaligus, supaya belajar gak harus bolak-balik centang
   satu-satu sebelum pindah hari. Kuis dan praktik yang punya `check` tetap
   harus benar-benar dijawab — tombol ini tidak membypass itu. */
function markSelfGradedDone(phase, day) {
  day.steps.forEach((step, i) => {
    const selfGraded =
      step.kind === "materi" || (step.kind === "praktik" && !step.check);
    if (!selfGraded) return;
    const id = stepId(phase, day, i);
    if (!isStepDone(id)) markStep(id, true);
  });
}

function dayNav(roadmap, phase, day) {
  const target = nextDayTarget(roadmap, phase, day);
  const label = target
    ? "Tandai Selesai & Lanjut ke Hari Berikutnya →"
    : "Tandai Selesai — Roadmap Kelar 🎉";

  const button = el("button", {
    class: "day-nav__next",
    type: "button",
    text: label,
  });
  button.addEventListener("click", () => {
    markSelfGradedDone(phase, day);
    if (target) goDay(target.phaseId, target.dayIndex);
    else goOverview();
  });

  return el("div", { class: "day-nav" }, [button]);
}

export function renderDay(container, roadmap, phase, day, onProgressChange) {
  const crumb = breadcrumb([
    { label: "Ringkasan", onClick: goOverview },
    { label: phase.title, onClick: () => goPhase(phase.id) },
    { label: day.label },
  ]);

  const header = el("div", { class: "phase-header" }, [
    el("div", {
      class: "phase-header__eyebrow",
      text: day.label + " · " + phase.title,
    }),
    el("h1", { text: day.title }),
  ]);

  const dayProgress = progressBlock(
    countDay(phase, day),
    percent(countDay(phase, day).done, countDay(phase, day).total),
    "day-progress",
  );
  function refreshDayProgress() {
    const c = countDay(phase, day);
    dayProgress.querySelector(".phase-progress__fill").style.width =
      percent(c.done, c.total) + "%";
    dayProgress.querySelector(".phase-progress__text").textContent =
      c.done + "/" + c.total + " step selesai";
  }

  const stepsWrap = el(
    "div",
    { class: "steps" },
    day.steps.map((step, i) =>
      renderStep(phase, day, step, i, refreshDayProgress, onProgressChange),
    ),
  );

  setContent(
    container,
    crumb,
    header,
    dayProgress,
    stepsWrap,
    dayNav(roadmap, phase, day),
  );
}

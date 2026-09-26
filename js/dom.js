// Helper DOM murni: tidak menyimpan state, tidak tahu apa-apa soal roadmap.

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.keys(attrs).forEach((key) => {
    if (key === "class") node.className = attrs[key];
    else if (key === "text") node.textContent = attrs[key];
    else node.setAttribute(key, attrs[key]);
  });
  children.forEach((child) => {
    if (child) node.appendChild(child);
  });
  return node;
}

/* Satu-satunya jalan masuk ke sebuah container: falsy child selalu dibuang,
   supaya replaceChildren tidak pernah mengubah null jadi teks "null". */
export function setContent(container, ...children) {
  container.replaceChildren(...children.filter(Boolean));
}

export function barFill(className, pct) {
  return el("div", { class: className, style: "width: " + pct + "%" });
}

export function progressBlock(count, pct, extraClass) {
  return el(
    "div",
    { class: extraClass ? "phase-progress " + extraClass : "phase-progress" },
    [
      el("div", { class: "phase-progress__bar" }, [
        barFill("phase-progress__fill", pct),
      ]),
      el("div", {
        class: "phase-progress__text",
        text: count.done + "/" + count.total + " step selesai",
      }),
    ],
  );
}

export function phaseNumber(phase) {
  return String(phase.number).padStart(2, "0");
}

export function ringStyle(pct) {
  return (
    "background: conic-gradient(var(--accent-green) " +
    pct +
    "%, var(--border-soft) " +
    pct +
    "% 100%)"
  );
}

export function setCurrent(node, isCurrent) {
  node.classList.toggle("is-active", isCurrent);
  if (isCurrent) node.setAttribute("aria-current", "true");
  else node.removeAttribute("aria-current");
}

export function breadcrumb(items) {
  const nodes = [];
  items.forEach((item, i) => {
    if (i > 0) nodes.push(el("span", { class: "breadcrumb__sep", text: "/" }));
    if (item.onClick) {
      const btn = el("button", {
        class: "breadcrumb__link",
        type: "button",
        text: item.label,
      });
      btn.addEventListener("click", item.onClick);
      nodes.push(btn);
    } else {
      nodes.push(
        el("span", { class: "breadcrumb__current", text: item.label }),
      );
    }
  });
  return el("nav", { class: "breadcrumb", "aria-label": "Navigasi" }, nodes);
}

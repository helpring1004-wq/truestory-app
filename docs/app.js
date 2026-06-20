import { appendEntry, readEntries, removeEntry } from "./lib/truthBook.js";

/** @type {HTMLFormElement | null} */
const form = document.querySelector("#entry-form");
/** @type {HTMLUListElement | null} */
const list = document.querySelector("#entry-list");
/** @type {HTMLTemplateElement | null} */
const template = document.querySelector("#entry-template");

/**
 * @param {string} iso
 * @returns {string}
 */
function formatDate(iso) {
  return new Date(iso).toLocaleString("ko-KR");
}

/**
 * @returns {void}
 */
function render() {
  if (!list || !template) {
    return;
  }

  list.innerHTML = "";
  const entries = readEntries(window.localStorage);

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "아직 기록이 없습니다.";
    list.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const node = template.content.firstElementChild?.cloneNode(true);
    if (!(node instanceof HTMLElement)) {
      return;
    }

    const title = node.querySelector(".entry-title");
    const time = node.querySelector(".entry-time");
    const content = node.querySelector(".entry-content");
    const deleteBtn = node.querySelector(".delete-btn");

    if (title) {
      title.textContent = entry.title;
    }
    if (time) {
      time.textContent = formatDate(entry.createdAt);
    }
    if (content) {
      content.textContent = entry.content;
    }
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        removeEntry(window.localStorage, entry.id);
        render();
      });
    }

    list.appendChild(node);
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const titleValue = String(formData.get("title") || "");
    const contentValue = String(formData.get("content") || "");

    appendEntry(window.localStorage, {
      title: titleValue,
      content: contentValue
    });

    form.reset();
    render();
  });
}

render();
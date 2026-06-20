/**
 * @typedef {Object} Entry
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} createdAt
 */

export const STORAGE_KEY = "truth-book-entries-v1";

/**
 * @param {string} raw
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeText(raw, maxLength) {
  return raw.trim().slice(0, maxLength);
}

/**
 * @param {{ title: string, content: string }} input
 * @returns {Entry}
 */
export function createEntry(input) {
  const title = sanitizeText(input.title, 80);
  const content = sanitizeText(input.content, 2000);
  const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    id,
    title,
    content,
    createdAt: new Date().toISOString()
  };
}

/**
 * @param {{ getItem(key: string): string | null }} storage
 * @returns {Entry[]}
 */
export function readEntries(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((entry) => {
      return typeof entry?.id === "string" && typeof entry?.title === "string" && typeof entry?.content === "string";
    });
  } catch {
    return [];
  }
}

/**
 * @param {{ setItem(key: string, value: string): void }} storage
 * @param {Entry[]} entries
 * @returns {void}
 */
export function writeEntries(storage, entries) {
  storage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * @param {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} storage
 * @param {{ title: string, content: string }} input
 * @returns {Entry}
 */
export function appendEntry(storage, input) {
  const entry = createEntry(input);
  const entries = readEntries(storage);
  entries.unshift(entry);
  writeEntries(storage, entries);
  return entry;
}

/**
 * @param {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} storage
 * @param {string} id
 * @returns {Entry[]}
 */
export function removeEntry(storage, id) {
  const next = readEntries(storage).filter((entry) => entry.id !== id);
  writeEntries(storage, next);
  return next;
}
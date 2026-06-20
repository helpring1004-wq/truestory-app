import test from "node:test";
import assert from "node:assert/strict";
import { appendEntry, readEntries, removeEntry, sanitizeText } from "../web/lib/truthBook.js";

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(key, value);
    }
  };
}

test("sanitizeText trims and truncates", () => {
  const result = sanitizeText("   abcdef   ", 4);
  assert.equal(result, "abcd");
});

test("appendEntry stores item", () => {
  const storage = createMemoryStorage();
  appendEntry(storage, { title: "제목", content: "내용" });
  const entries = readEntries(storage);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].title, "제목");
});

test("removeEntry deletes by id", () => {
  const storage = createMemoryStorage();
  const entry = appendEntry(storage, { title: "제목", content: "내용" });
  const next = removeEntry(storage, entry.id);
  assert.equal(next.length, 0);
});
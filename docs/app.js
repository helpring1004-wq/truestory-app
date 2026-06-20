(function() {
  "use strict";

  const cover = document.getElementById("cover-view");
  const page = document.getElementById("page-view");
  const openBtn = document.getElementById("open-btn");
  const newPageBtn = document.getElementById("new-page-btn");
  const backBtn = document.getElementById("back-btn");

  const quoteEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");
  const pageNumEl = document.getElementById("page-num");

  const quotes = window.TruthBookQuotes || [];

  function getIndex() {
    if (!quotes.length) return -1;
    const today = new Date();
    const base = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return base % quotes.length;
  }

  function renderPage(idx) {
    const q = quotes[idx >= 0 ? idx : 0];
    if (!q) {
      quoteEl.textContent = "오늘의 글귀를 준비 중입니다.";
      authorEl.textContent = "";
      pageNumEl.textContent = "1";
      return;
    }
    quoteEl.textContent = q.text;
    authorEl.textContent = q.author;
    pageNumEl.textContent = String(idx + 1);
  }

  function showCover() {
    page.classList.remove("active");
    cover.classList.add("active");
  }

  function showPage() {
    cover.classList.remove("active");
    page.classList.add("active");
    renderPage(getIndex());
  }

  function nextPage() {
    let idx = getIndex();
    idx = (idx + 1 + Math.floor(Math.random() * quotes.length)) % quotes.length;
    renderPage(idx);
  }

  if (openBtn) openBtn.addEventListener("click", showPage);
  if (newPageBtn) newPageBtn.addEventListener("click", nextPage);
  if (backBtn) backBtn.addEventListener("click", showCover);
})();

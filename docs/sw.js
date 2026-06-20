const CACHE_NAME = "truth-book-v1";
const ASSETS = [
  ".",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./quotes.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) {
        return cached;
      }
      return fetch(e.request).catch(function() {
        return cached || new Response("", { status: 503, statusText: "Offline" });
      });
    })
  );
});

/* THE MAP — service worker: offline app shell + opportunistic tile cache.
   Lets the app open and run even when mobile signal drops on the islands.
   Map tiles she has already seen are cached too; brand-new areas still
   need a little signal, but the quest logic never depends on the network. */
const SHELL = "themap-shell-v1";
const TILES = "themap-tiles-v1";
const ASSETS = [
  "./", "index.html",
  "css/styles.css", "js/journey.js", "js/app.js",
  "vendor/leaflet/leaflet.css", "vendor/leaflet/leaflet.js",
  "manifest.webmanifest", "assets/icons/icon.svg",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== TILES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // Same-origin app shell: cache-first, fall back to cached index.html.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((hit) =>
        hit || fetch(e.request).then((resp) => {
          const copy = resp.clone();
          caches.open(SHELL).then((c) => c.put(e.request, copy));
          return resp;
        }).catch(() => caches.match("index.html"))
      )
    );
    return;
  }

  // Map tiles (CARTO/OSM): cache-first, then network; keep what we fetch.
  const isTile = /cartocdn|tile\.openstreetmap|basemaps/.test(url.host);
  if (isTile) {
    e.respondWith(
      caches.match(e.request).then((hit) =>
        hit || fetch(e.request).then((resp) => {
          const copy = resp.clone();
          caches.open(TILES).then((c) => c.put(e.request, copy));
          return resp;
        }).catch(() => hit)
      )
    );
  }
});

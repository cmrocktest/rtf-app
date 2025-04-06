
const CACHE_NAME = 'rtf-app-v3';

const FILES_TO_CACHE = [
  'index.html?v=3',
  'manifest.json?v=3',
  'icon.png?v=3',
  'instructivo-uso-miniscape.mp4?v=3'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  const url = new URL(e.request.url);
  const cleanRequest = new Request(url.pathname, {
    method: e.request.method,
    headers: e.request.headers,
    mode: e.request.mode,
    credentials: e.request.credentials,
    redirect: e.request.redirect
  });
  e.respondWith(
    fetch(e.request).catch(() => caches.match(cleanRequest))
  );
});

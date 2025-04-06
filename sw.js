
const CACHE_NAME = 'rtf-app-v3';

const FILES_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon.png',
  'instructivo-uso-miniscape.mp4'
];

self.addEventListener('install', function(e) {
  self.skipWaiting(); // activa al instante
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
          return caches.delete(key); // borra caché anterior
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

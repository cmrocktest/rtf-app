
self.addEventListener('install', function(e) {
  self.skipWaiting(); // Fuerza activación inmediata del nuevo SW
  e.waitUntil(
    caches.open('rtf-app').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icon.png',
        'instructivo-uso-miniscape.mp4'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== 'rtf-app') {
          return caches.delete(key);
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

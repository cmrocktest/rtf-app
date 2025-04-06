
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('rtf-app').then(function(cache) {
      return cache.addAll([
        'Resumen_Interactivo_RTF.html',
        'manifest.json',
        'icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

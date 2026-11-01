const CACHE_PREFIX = 'idr-aud-shell-';
const CACHE = CACHE_PREFIX + 'v1';
const APP = new URL('./', self.location.href);
const SHELL = ['./', './index.html', './pwa.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== APP.origin || !url.pathname.startsWith(APP.pathname)) return;
  if (event.request.mode === 'navigate') {
    // Race the network against a short timeout, so weak connections also open quickly.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      try {
        const response = await fetch(event.request, {signal: controller.signal});
        if (!response.ok) throw new Error('Page unavailable');
        return response;
      } catch (error) {
        const saved = await cache.match(new URL('./index.html', APP).href);
        if (saved) return saved;
        throw error;
      } finally { clearTimeout(timer); }
    })());
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    const saved = await cache.match(event.request, {ignoreSearch: true});
    return saved || fetch(event.request);
  }));
});

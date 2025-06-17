const CACHE_NAME = 'pwa-to-do-cache-v1';
const URLS_TO_CACHE = [
    'to-do-pwa/',
    'to-do-pwa/index.html',
    'to-do-pwa/manifest.json',
    'to-do-pwa/styles.css',
    'to-do-pwa/app.js',
];

// Instala o service worker e faz cache dos arquivos essenciais
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

// Ativa o service worker e remove caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
});

// Intercepta requisições e responde com cache quando possível
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request)
        )
    );
});
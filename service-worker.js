const CACHE_NAME = 'raka-pwa-cache-v12';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/offline.html',
    '/style.css',
    '/app.js',
    '/foto-ahmad.jpg',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/WhatsApp Image 2025-09-13 at 22.03.16.jpeg', 
    '/WhatsApp Image 2025-09-13 at 22.19.54.jpeg',
    
    '/menjadi ketua himpunan mahasiswa informatika.jpg',
    '/panitia donor darah BEM FTI.jpg',
    '/relawan bina desa timbulun.jpg',
    '/panitia berbagi takjil BEM FTI.jpg',
    '/Relawan enviro explore.jpg',
    '/panitia berbagi ke panti asuhan.jpg',
    '/aktif organisasi.jpg',
    '/aktif badminton.jpg',

    '/Screenshot 2025-10-04 002234.png',
    '/Screenshot 2025-10-04 002455.png',
    '/Screenshot 2025-10-04 002510.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith('chrome-extension://')) return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
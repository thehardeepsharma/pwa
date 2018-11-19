importScripts('./workbox-sw.js');
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }
const staticAssets = [
    './',
    './style.css',
    './app.js',
    './images/dog.jpg',
    './fallback.json'
];

// const wb = new workboxSW();
// workbox.precache(staticAssets);
// workbox.router.registerRoute('http://localhost/pwa(.*)', workbox.strategies.networkFirst());

workbox.routing.registerRoute(
    new RegExp('.js'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.css'),
    workbox.strategies.networkFirst()
);


workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
);


// self.addEventListener('install', async event => {
//     const cache = await caches.open('news-static');
//     cache.addAll(staticAssets);
// });

// self.addEventListener('fetch', event => {
//     const req = event.request;
//     const url = new URL(req.url);

//     if (url.origin == location.origin) {
//         event.respondWith(cacheFirst(req));
//     } else {
//         event.respondWith(networkFirst(req));
//     }
// });

// async function cacheFirst(req) {
//     const cachedResponse = await caches.match(req);
//     return cachedResponse || fetch(req);
// }

// async function networkFirst(req) {
//     const cache = await caches.open('news-dynamic');

//     try {
//         const res = await fetch(req);
//         cache.put(req, res.clone());
//         return res;
//     } catch(error) {
//         // return await cache.match(req);
//         const cachedResponse = await cache.match(req);
//         console.log(cachedResponse);
//         return cachedResponse || await caches.match('./fallback.json');
//     }
// }
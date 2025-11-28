const CACHE_NAME = 'hk-travel-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './dino.png',
  './airplane.png',
  './hotel.png',
  './liti.png',
  './note.png',
  './train.png',
  './shoppingbag.png',
  './SOS.png',
  './ticket.png',
  './HongKong_MRT.png',
  './pattern.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 攔截網路請求：有快取就用快取，沒快取才連網
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果快取中有，直接回傳
        if (response) {
          return response;
        }
        // 否則發送網路請求
        return fetch(event.request);
      })
  );
});

// 更新 Service Worker 時清除舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
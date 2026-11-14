/*
 * NoxaPlus Tech News — offline shell.
 * Developed by NoxaPlus — https://www.noxaplus.ir
 */
'use strict';

var CACHE_PREFIX = 'noxa-news-';
var VERSION = CACHE_PREFIX + 'v4';
var SHELLS = ['index.html', 'article.html', 'category.html', 'search.html', 'bookmarks.html', 'about.html', '404.html'];

var PRECACHE = SHELLS.concat([
  './',
  'style.css',
  'app.js',
  'manifest.webmanifest',
  'assets/data/news.js',
  'assets/icons/favicon.svg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/fonts/inter-latin-var.woff2',
  'assets/fonts/newsreader-latin-var.woff2',
  'assets/fonts/newsreader-latin-italic-var.woff2',
  'assets/fonts/vazirmatn-var.woff2',
  'assets/covers/ai-small-models.svg',
  'assets/covers/software-local-first.svg',
  'assets/covers/mobile-battery.svg',
  'assets/covers/hardware-repairable.svg',
  'assets/covers/cyber-passkeys.svg',
  'assets/covers/space-small-sats.svg',
  'assets/covers/cyber-quantum.svg',
  'assets/covers/ai-agents.svg',
  'assets/covers/software-boring.svg',
  'assets/covers/mobile-satellite.svg',
  'assets/covers/space-lunar.svg',
  'assets/covers/hardware-edge.svg',
  'assets/og/default.png'
]);

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf(CACHE_PREFIX) === 0 && key !== VERSION;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

function shellFor(pathname) {
  var name = pathname.split('/').pop() || 'index.html';
  return SHELLS.indexOf(name) === -1 ? 'index.html' : name;
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        return response;
      }).catch(function () {
        return caches.open(VERSION).then(function (cache) {
          return cache.match(shellFor(url.pathname)).then(function (cached) {
            return cached || cache.match('index.html');
          });
        }).then(function (cached) {
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.open(VERSION).then(function (cache) {
      return cache.match(request).then(function (cached) {
        var network = fetch(request).then(function (response) {
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(function () {
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        });
        return cached || network;
      });
    })
  );
});

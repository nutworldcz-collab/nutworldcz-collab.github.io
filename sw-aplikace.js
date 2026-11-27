// Service worker of the staff app (aplikace.html) — phase 1: app shell only.
// Scope "/" so the tool pages opened from the app stay inside the installed app window,
// but EVERY request outside the shell list passes straight to the network untouched
// (login redirects of nw_auth, APIs, Trello, tool pages — nothing is cached or rewritten).
const VERZE = 'nw-app-1';
const SHELL = ['/aplikace.html', '/stranky-data.js', '/pwa/aplikace.webmanifest',
  '/pwa/ikona-192.png', '/pwa/ikona-512.png', '/pwa/apple-touch-icon.png', '/pwa/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERZE)
    .then(c => Promise.all(SHELL.map(u => c.add(new Request(u, {credentials: 'include'})).catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n.startsWith('nw-app-') && n !== VERZE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin || !SHELL.includes(u.pathname)) return;   // not ours -> browser default
  // network first (always the newest version), cache only as a fallback without signal
  e.respondWith(fetch(r).then(res => {
    // keep only real pages, never the login form a redirect may have produced
    if (res.ok && !res.redirected) { const cp = res.clone(); caches.open(VERZE).then(c => c.put(u.pathname, cp)); }
    return res;
  }).catch(() => caches.match(u.pathname).then(m => m || Response.error())));
});

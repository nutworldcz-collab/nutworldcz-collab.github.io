// Service worker of the staff app (aplikace.html) — phase 1: app shell only.
// Scope "/" so the tool pages opened from the app stay inside the installed app window,
// but EVERY request outside the shell list passes straight to the network untouched
// (login redirects of nw_auth, APIs, Trello, tool pages — nothing is cached or rewritten).
const VERZE = 'nw-app-3';
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

// ── phase 2: push notifications (nw_push.py on the server) ──
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = {title: 'Nutworld', body: e.data ? e.data.text() : ''}; }
  // the app open on screen shows it too (iPhone shows no banner over the open app)
  self.clients.matchAll({type: 'window'}).then(l => l.forEach(c => c.postMessage({nwPush: d})));
  e.waitUntil(self.registration.showNotification(d.title || 'Nutworld', {
    body: d.body || '', tag: d.tag || undefined, renotify: !!d.tag,
    icon: '/pwa/ikona-192.png', badge: '/pwa/favicon-64.png',
    data: {url: d.url || '/aplikace.html'},
  }));
});

// tap -> focus the open app and go to the place, or open the app there
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '/aplikace.html', location.origin).href;
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    const app = list.find(c => new URL(c.url).pathname === '/aplikace.html');
    if (app) { app.postMessage({nwOtevri: url}); return app.focus(); }
    return self.clients.openWindow(url);
  }));
});

// the browser renewed the subscription -> tell the server (cookie of the login goes along, same origin)
self.addEventListener('pushsubscriptionchange', e => {
  e.waitUntil(fetch('/api/push/stav', {credentials: 'include'}).then(r => r.json()).then(s => {
    const key = Uint8Array.from(atob(s.klic.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - s.klic.length % 4) % 4)), c => c.charCodeAt(0));
    return self.registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: key});
  }).then(sub => fetch('/api/push/odber', {method: 'POST', credentials: 'include', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({sub: sub.toJSON()})})).catch(() => {}));
});

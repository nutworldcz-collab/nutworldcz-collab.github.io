// Trello proxy — pages never hold the Trello key/token (security 2026-11-21).
// Every fetch() to api.trello.com is sent to the nw_data Apps Script, which checks the PIN and calls Trello
// with the key kept on the server. Pages keep their old code; key/token in their URLs are dummies and are dropped.
// Load this script BEFORE the page's own scripts.
(function () {
  const API = 'https://script.google.com/macros/s/AKfycbxK5FYBYGYsf9Hh9ueahqi0FhCDhaoxTkhzpFM3retvDBKvbOUJ1-YxSQurR2MQB2OT/exec';
  const nativeFetch = window.fetch.bind(window);
  const pin = () => { try { return localStorage.getItem('nw_access') || ''; } catch (e) { return ''; } };

  function toB64(buf) {
    let s = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }

  async function proxied(input, init) {
    init = init || {};
    const u = new URL(typeof input === 'string' ? input : input.url);
    u.searchParams.delete('key');
    u.searchParams.delete('token');
    const req = { action: 'trello', pin: pin(), method: (init.method || 'GET').toUpperCase(), path: u.pathname + u.search };
    const b = init.body;
    if (b instanceof FormData) {
      req.form = {};
      for (const [k, v] of b.entries()) {
        if (k === 'key' || k === 'token') continue;
        req.form[k] = (v instanceof Blob)
          ? { b64: toB64(await v.arrayBuffer()), name: v.name || 'soubor', type: v.type || 'application/octet-stream' }
          : String(v);
      }
    } else if (b instanceof URLSearchParams) {
      b.delete('key'); b.delete('token');
      req.json = b.toString(); req.ctype = 'application/x-www-form-urlencoded';
    } else if (b != null) {
      req.json = String(b);
      const h = new Headers(init.headers || {});
      req.ctype = h.get('Content-Type') || 'application/json';
    }
    const res = await nativeFetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(req) });
    const j = await res.json();
    if (!j.ok) return new Response(JSON.stringify({ message: j.error || 'proxy' }), { status: j.error === 'pin' ? 401 : 502 });
    return new Response(j.body, { status: j.status, headers: { 'Content-Type': 'application/json' } });
  }

  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    return url.indexOf('https://api.trello.com/') === 0 ? proxied(input, init) : nativeFetch(input, init);
  };
})();

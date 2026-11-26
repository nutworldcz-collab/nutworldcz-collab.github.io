// Shared data store client — talks to the nw_data Apps Script (PIN-gated, Google Sheet backend).
(function () {
  const API = 'https://script.google.com/macros/s/AKfycbxK5FYBYGYsf9Hh9ueahqi0FhCDhaoxTkhzpFM3retvDBKvbOUJ1-YxSQurR2MQB2OT/exec';

  // On the tools server everyone is logged in with their own account: the data go through /api/nwdata on our server
  // (it checks the role and signs changes with the person's name) — no PIN needed (Jan 2026-11-26, Balírna tablet).
  // GitHub Pages keep the PIN path to the Apps Script directly. Same data either way.
  const ON_SERVER = !/github\.io$/.test(location.hostname) && /^https?:$/.test(location.protocol)
    && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';
  const SRV = location.origin + '/api/nwdata';
  function pin() {
    try { return localStorage.getItem('nw_access') || (ON_SERVER ? 'prihlaseni' : ''); } catch { return ON_SERVER ? 'prihlaseni' : ''; }
  }
  function waitPin() {
    return new Promise(resolve => {
      const tick = () => { const p = pin(); if (p) resolve(p); else setTimeout(tick, 500); };
      tick();
    });
  }
  async function srv(method, params, body) {
    const url = new URL(SRV);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url, { method, credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    if (res.redirected || res.status === 401) throw new Error('přihlášení vypršelo — obnov stránku');
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'chyba serveru');
    return json;
  }
  async function get(params) {
    if (ON_SERVER) return srv('GET', params);
    const p = await waitPin();
    const url = new URL(API);
    Object.entries({ ...params, pin: p }).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'chyba serveru');
    return json;
  }
  // text/plain avoids a CORS preflight, which Apps Script cannot answer
  async function post(body) {
    if (ON_SERVER) return srv('POST', null, body);
    const p = await waitPin();
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...body, pin: p }),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'chyba serveru');
    return json;
  }

  window.NWData = {
    list:   async ns => (await get({ action: 'list', ns })).items,
    put:    (ns, id, data) => post({ action: 'put', ns, id, data }).then(j => j.item),
    patch:  (ns, id, data) => post({ action: 'patch', ns, id, data }).then(j => j.item),
    remove: (ns, id) => post({ action: 'delete', ns, id }),
    batch:  (ns, ops) => post({ action: 'batch', ns, ops }).then(j => j.items),
    pin,
    onServer: ON_SERVER,
  };
})();

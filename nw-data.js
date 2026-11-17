// Shared data store client — talks to the nw_data Apps Script (PIN-gated, Google Sheet backend).
(function () {
  const API = 'https://script.google.com/macros/s/AKfycbxK5FYBYGYsf9Hh9ueahqi0FhCDhaoxTkhzpFM3retvDBKvbOUJ1-YxSQurR2MQB2OT/exec';

  function pin() {
    try { return localStorage.getItem('nw_access') || ''; } catch { return ''; }
  }
  function waitPin() {
    return new Promise(resolve => {
      const tick = () => { const p = pin(); if (p) resolve(p); else setTimeout(tick, 500); };
      tick();
    });
  }
  async function get(params) {
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
  };
})();

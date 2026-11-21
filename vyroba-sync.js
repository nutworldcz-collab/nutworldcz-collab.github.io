// Shares vyroba.html browser data (progress, notes, times, firm status, "nabaleno") via the shared store.
// Jan's browser creates the master copy; everyone else follows it. Every entry is its own record,
// so people ticking different items at the same time never overwrite each other.
// Other browsers' previous data is never deleted: kept locally (<key>_pred_sdilenim) + uploaded as backup.
(function () {
  const NS = 'vyroba';
  // Jan's master rights are confirmed by the server (pin-guard.js whoami), no PIN in this public file
  const isMaster = () => { try { return localStorage.getItem('nw_master') === '1'; } catch (e) { return false; } };
  const META = 'v__meta';
  const SYNCED_KEY = 'nw_vyroba_synced';
  const STORES = [  // localStorage key, record prefix, kind
    ['nw_vyroba_progress', 'prog', 'map'],
    ['nw_vyroba_notes', 'nota', 'map'],
    ['nw_vyroba_cas', 'cas', 'map'],
    ['nw_pack_times', 'pack', 'map'],
    ['nw_firma_status', 'firma', 'map'],
    ['nw_nabaleno', 'nab', 'set'],
  ];
  const BY_KEY = Object.fromEntries(STORES.map(s => [s[0], s]));

  const rawGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const rawSetItem = Storage.prototype.setItem;
  let applying = false;
  let synced = null;
  let timer = null;
  let pushing = false;
  let live = false;

  const hadLocal = STORES.some(([k, , kind]) => {
    try { const v = JSON.parse(rawGet(k) || (kind === 'set' ? '[]' : '{}')); return kind === 'set' ? v.length : Object.keys(v).length; }
    catch (e) { return false; }
  });

  // ── UI bar ──
  const bar = document.createElement('div');
  bar.style.cssText = 'max-width:1400px;margin:8px auto;padding:9px 14px;border-radius:10px;font:600 13px/1.45 "Source Sans 3",Arial,sans-serif;';
  document.body.insertBefore(bar, document.body.firstChild);
  function status(kind, html) {
    const c = { ok: ['#dcfce7', '#166534'], warn: ['#fff3cd', '#8a6200'], err: ['#fee2e2', '#9b1c1c'], info: ['#f1e6da', '#83502e'] }[kind];
    bar.style.background = c[0]; bar.style.color = c[1]; bar.innerHTML = html;
  }
  const okStatus = () => status('ok', '✓ Sdílená výroba — vidí ji všichni · aktualizováno ' +
    new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }));

  const stable = o => JSON.stringify(o, (k, v) => v && typeof v === 'object' && !Array.isArray(v)
    ? Object.keys(v).sort().reduce((a, x) => (a[x] = v[x], a), {}) : v);

  // ── shared form: {prefix: {entryKey: value}} ──
  function readLocal() {
    const out = {};
    STORES.forEach(([k, p, kind]) => {
      let v;
      try { v = JSON.parse(rawGet(k) || (kind === 'set' ? '[]' : '{}')); } catch (e) { v = kind === 'set' ? [] : {}; }
      out[p] = kind === 'set' ? Object.fromEntries(v.map(x => [String(x), true])) : v;
    });
    return out;
  }
  function writeLocal(sh) {
    applying = true;
    try {
      STORES.forEach(([k, p, kind]) => {
        const m = sh[p] || {};
        rawSetItem.call(localStorage, k, JSON.stringify(kind === 'set' ? Object.keys(m) : m));
      });
    } catch (e) {} finally { applying = false; }
    try { loadProg(); loadNotes(); loadCas(); loadPackTimes(); loadNabaleno(); loadFirmaStatus(); render(); } catch (e) {}
  }
  function fromItems(items) {
    if (!items.find(i => i.id === META)) return null;
    const sh = Object.fromEntries(STORES.map(s => [s[1], {}]));
    items.forEach(i => {
      const m = i.id.match(/^v__(prog|nota|cas|pack|firma|nab)__(.+)$/);
      if (m) sh[m[1]][m[2]] = i.data.v;
    });
    return sh;
  }
  function diffOps(a, b) {
    const ops = [];
    STORES.forEach(([, p]) => {
      const A = a[p] || {}, B = b[p] || {};
      for (const k in B) if (stable(A[k]) !== stable(B[k])) ops.push({ action: 'put', id: `v__${p}__${k}`, data: { v: B[k] } });
      for (const k in A) if (!(k in B)) ops.push({ action: 'delete', id: `v__${p}__${k}` });
    });
    return ops;
  }
  const fetchMaster = async () => fromItems(await NWData.list(NS));
  const dirty = () => live && diffOps(synced, readLocal()).length > 0;
  const count = sh => STORES.reduce((n, [, p]) => n + Object.keys(sh[p] || {}).length, 0);

  function apply(sh) {
    synced = sh;
    try { rawSetItem.call(localStorage, SYNCED_KEY, JSON.stringify(sh)); } catch (e) {}
    writeLocal(sh);
  }

  async function push() {
    timer = null;
    if (!live) return;
    if (pushing) { schedule(); return; }
    const cur = readLocal();
    const ops = diffOps(synced, cur);
    if (!ops.length) return;
    pushing = true;
    try {
      for (let i = 0; i < ops.length; i += 400) await NWData.batch(NS, ops.slice(i, i + 400));
      synced = cur;
      rawSetItem.call(localStorage, SYNCED_KEY, JSON.stringify(cur));
      okStatus();
    } catch (e) {
      status('err', '⚠️ Uložení do sdílených dat se nepovedlo — změny máš u sebe a za chvíli to zkusím znovu. (' + e.message + ')');
      setTimeout(schedule, 10000);
    } finally { pushing = false; }
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(push, 800); }

  // Every save of the page goes through localStorage.setItem → push the change
  Storage.prototype.setItem = function (k, v) {
    rawSetItem.call(this, k, v);
    if (!applying && this === window.localStorage && BY_KEY[k] && live) schedule();
  };

  async function poll() {
    if (!live || timer || pushing || document.hidden || dirty()) return;
    const a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
    try {
      const sh = await fetchMaster();
      if (sh && stable(sh) !== stable(synced) && !dirty() && !timer) apply(sh);
      okStatus();
    } catch (e) {
      status('err', '⚠️ Nelze se připojit ke sdíleným datům — změny se ukládají u tebe a odešlou se po připojení.');
    }
  }

  function askPin() {
    status('warn', 'Pro sdílení výroby se jednou přihlas svým PINem: ' +
      '<input id="vsPin" type="password" style="margin:0 6px;padding:3px 8px;border:1px solid #c8976a;border-radius:6px;width:110px">' +
      '<button id="vsPinBtn" style="padding:3px 12px;border:0;border-radius:6px;background:#83502e;color:#fff;font-weight:700;cursor:pointer">Přihlásit</button>' +
      ' <span style="font-weight:400">Do té doby se ukládá jen v tomto prohlížeči.</span>');
    document.getElementById('vsPinBtn').onclick = () => {
      const p = document.getElementById('vsPin').value.trim();
      if (!p) return;
      try { rawSetItem.call(localStorage, 'nw_access', p); } catch (e) {}
      init();
    };
  }

  async function init() {
    if (!NWData.pin()) { askPin(); return; }
    status('info', '⏳ Načítám sdílenou výrobu…');
    let master;
    try { master = await fetchMaster(); }
    catch (e) {
      if (/pin/i.test(e.message)) { try { localStorage.removeItem('nw_access'); } catch (x) {} askPin(); return; }
      status('err', '⚠️ Nelze se připojit ke sdíleným datům — zatím pracuješ jen ve svém prohlížeči. Zkouším znovu…');
      setTimeout(init, 30000); return;
    }

    // Untouched copy of what this browser had before sharing started
    if (hadLocal && !rawGet('nw_vyroba_pred_sdilenim')) {
      try { rawSetItem.call(localStorage, 'nw_vyroba_pred_sdilenim', JSON.stringify(readLocal())); } catch (e) {}
    }

    if (master) {
      const lastSynced = JSON.parse(rawGet(SYNCED_KEY) || 'null');
      try {
        if (lastSynced) {
          const ops = diffOps(lastSynced, readLocal());  // offline edits since last sync, entry by entry
          if (ops.length) { for (let i = 0; i < ops.length; i += 400) await NWData.batch(NS, ops.slice(i, i + 400)); master = await fetchMaster(); }
        } else if (hadLocal && stable(master) !== stable(readLocal())) {
          // this browser's different data → shared backup (one record per store, never deleted)
          const ts = Date.now(), loc = readLocal();
          for (const [, p] of STORES) if (Object.keys(loc[p]).length)
            await NWData.put(NS, `v__zaloha__${ts}__${p}`, { v: loc[p] });
        }
      } catch (e) {
        status('err', '⚠️ Nepodařilo se uložit tvoje data do sdílené zálohy — zůstávají jen u tebe, nic se nepřepsalo. (' + e.message + ') Zkouším znovu…');
        setTimeout(init, 30000); return;
      }
      apply(master); live = true; okStatus(); return;
    }

    if (!isMaster()) {
      status('warn', 'Sdílená výroba zatím neexistuje — čeká se, až ji nahraje Jan. Do té doby se ukládá jen v tomto prohlížeči.');
      setTimeout(init, 60000); return;
    }
    const loc = readLocal();
    if (!confirm(`Nahrát data výroby z TOHOTO prohlížeče jako HLAVNÍ pro všechny? (${count(loc)} záznamů)\n` +
                 'Data z ostatních počítačů se nesmažou — uloží se jako záloha.')) {
      status('warn', 'Hlavní verze nebyla nahrána — pracuješ jen ve svém prohlížeči. Až budeš chtít, obnov stránku.'); return;
    }
    const ops = [{ action: 'put', id: META, data: { od: new Date().toISOString() } }].concat(diffOps({}, loc));
    try { for (let i = 0; i < ops.length; i += 400) await NWData.batch(NS, ops.slice(i, i + 400)); }
    catch (e) { status('err', 'Nahrání hlavní verze se nepovedlo: ' + e.message + ' — data zůstávají u tebe.'); return; }
    apply(loc); live = true; okStatus();
  }

  setInterval(poll, 20000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) poll(); });
  init();
})();

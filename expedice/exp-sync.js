// Syncs an expedice sheet (page globals: state, save, render, nextId) with the shared store.
// Jan's browser creates the master copy; everyone else follows it. Each row is its own record.
// Every save is a three-way merge (last synced copy / this browser / current shared copy), field by
// field, so two people editing the same row (different checkboxes, shipments...) never overwrite
// each other, and defaults a newer page version adds are never pushed over someone's real edits.
// An open tab reloads itself when a newer version of the page is published.
(function () {
  const me = document.currentScript;
  const KEY = me.dataset.key;
  const STORE = me.dataset.store;
  const NS = 'expedice';
  // Jan's master rights are confirmed by the server (pin-guard.js whoami), no PIN in this public file
  const isMaster = () => { try { return localStorage.getItem('nw_master') === '1'; } catch (e) { return false; } };
  const ROW = KEY + '__r__';
  const META = KEY + '__meta';
  const SYNCED_KEY = 'nw_exp_synced_' + KEY;
  const origSave = save;

  let synced = null;
  let timer = null;
  let pushing = false;
  let live = false;

  const bar = document.createElement('div');
  bar.style.cssText = 'max-width:1200px;margin:10px auto;padding:9px 14px;border-radius:10px;font:600 13px/1.45 "Source Sans 3",Arial,sans-serif;';
  document.body.insertBefore(bar, document.body.firstChild);

  function status(kind, text) {
    const c = { ok: ['#dcfce7', '#166534'], warn: ['#fff3cd', '#8a6200'], err: ['#fee2e2', '#9b1c1c'], info: ['#f1e6da', '#83502e'] }[kind];
    bar.style.background = c[0];
    bar.style.color = c[1];
    bar.textContent = text;
  }
  function okStatus() {
    status('ok', '✓ Sdílená verze — vidí ji všichni · aktualizováno ' + new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }));
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  const clone = o => JSON.parse(JSON.stringify(o));
  const stable = o => JSON.stringify(o, (k, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.keys(v).sort().reduce((a, x) => (a[x] = v[x], a), {})
      : v);

  // Shared form: {title, rows: {rowId: {...row, _i: sortKey}}}. Existing rows keep their sort key.
  function toShared(st, ref) {
    const refRows = (ref && ref.rows) || {};
    const list = st.rows;
    const rows = {};
    const known = list.map(r => (refRows[r.id] && refRows[r.id]._i != null ? refRows[r.id]._i : null));
    list.forEach((r, k) => {
      let i = known[k];
      if (i == null) {
        const lo = k > 0 ? rows[list[k - 1].id]._i : null;
        let hi = null;
        for (let m = k + 1; m < list.length; m++) { if (known[m] != null) { hi = known[m]; break; } }
        i = lo == null && hi == null ? k : lo == null ? hi - 1 : hi == null ? lo + 1 : (lo + hi) / 2;
      }
      rows[r.id] = { ...clone(r), _i: i };
    });
    return { title: st.title || '', rows };
  }
  function fromShared(sh) {
    const rows = Object.values(sh.rows).sort((a, b) => a._i - b._i).map(r => { const c = clone(r); delete c._i; return c; });
    return { title: sh.title, rows };
  }
  function fromItems(items) {
    const meta = items.find(i => i.id === META);
    if (!meta) return null;
    const rows = {};
    items.forEach(i => { if (i.id.startsWith(ROW)) rows[i.data.id] = i.data; });
    return { title: meta.data.title || '', rows };
  }
  function diffOps(a, b) {
    const out = [];
    if (a.title !== b.title) out.push({ action: 'put', id: META, data: { title: b.title } });
    for (const id in b.rows) if (stable(a.rows[id]) !== stable(b.rows[id])) out.push({ action: 'put', id: ROW + id, data: b.rows[id] });
    for (const id in a.rows) if (!(id in b.rows)) out.push({ action: 'delete', id: ROW + id });
    return out;
  }
  const isObj = v => v && typeof v === 'object';
  // A value that appeared where there was nothing before and is empty/false is a page default, not an edit.
  const blank = v => v == null || v === '' || v === false || v === 0 ||
    (isObj(v) && Object.values(v).every(blank));
  function mergeVal(base, mine, theirs) {
    if (isObj(mine) && isObj(theirs) && Array.isArray(mine) === Array.isArray(theirs)) {
      const b = isObj(base) ? base : (Array.isArray(mine) ? [] : {});
      const out = Array.isArray(mine) ? [] : {};
      new Set([...Object.keys(mine), ...Object.keys(theirs)]).forEach(k => {
        const v = mergeVal(b[k], mine[k], theirs[k]);
        if (v !== undefined) out[k] = v;
      });
      return out;
    }
    if (stable(mine) === stable(base)) return theirs === undefined ? mine : theirs;   // not edited here
    if (base === undefined && blank(mine) && theirs !== undefined) return theirs;     // only a default
    return mine;                                                                       // edited here
  }
  // Shared copy + only what changed in this browser since `base`.
  function merge(base, mine, theirs) {
    const rows = {};
    for (const id in theirs.rows) {
      if (!(id in mine.rows) && id in base.rows) continue;                  // deleted here
      rows[id] = id in mine.rows ? mergeVal(base.rows[id], mine.rows[id], theirs.rows[id]) : theirs.rows[id];
    }
    for (const id in mine.rows) if (!(id in theirs.rows) && !(id in base.rows)) rows[id] = mine.rows[id];  // added here
    return { title: mergeVal(base.title, mine.title, theirs.title), rows };
  }
  async function fetchMaster() {
    const items = (await NWData.list(NS)).filter(i => i.id.startsWith(KEY + '__'));
    return fromItems(items);
  }
  function dirty() {
    return live && diffOps(synced, toShared(state, synced)).length > 0;
  }

  function apply(sh) {
    synced = sh;
    lsSet(SYNCED_KEY, JSON.stringify(sh));
    const st = fromShared(sh);
    state.title = st.title;
    state.rows = st.rows;
    nextId = Math.max(state.rows.reduce((m, r) => Math.max(m, r.id + 1), 1), Date.now());
    origSave();
    render();
    const t = document.getElementById('sheetTitle');
    if (t && document.activeElement !== t) t.value = state.title || '';
  }

  async function push() {
    timer = null;
    if (!live) return;
    if (pushing) { schedule(); return; }
    const cur = toShared(state, synced);
    if (!diffOps(synced, cur).length) return;
    pushing = true;
    try {
      const master = (await fetchMaster()) || { title: '', rows: {} };
      const ops = diffOps(master, merge(synced, cur, master));
      if (ops.length) await NWData.batch(NS, ops);
      synced = cur;                          // what this browser shows; the next poll brings others' changes
      lsSet(SYNCED_KEY, JSON.stringify(cur));
      okStatus();
    } catch (e) {
      status('err', '⚠️ Uložení do sdílených dat se nepovedlo — změny máš uložené u sebe a za chvíli to zkusím znovu. (' + e.message + ')');
      setTimeout(schedule, 10000);
    } finally {
      pushing = false;
    }
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(push, 800);
  }

  save = function () {
    origSave();
    if (live) schedule();
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

  async function init() {
    status('info', '⏳ Načítám sdílenou verzi…');
    let master;
    try {
      master = await fetchMaster();
    } catch (e) {
      status('err', '⚠️ Nelze se připojit ke sdíleným datům — zatím pracuješ jen ve svém prohlížeči. Zkouším znovu…');
      setTimeout(init, 30000);
      return;
    }

    // Keep an untouched copy of whatever this browser had before the shared version took over.
    if (window.EXP_HAD_LOCAL && !lsGet(STORE + '_pred_sdilenim')) lsSet(STORE + '_pred_sdilenim', lsGet(STORE) || '');

    if (master) {
      const lastSynced = JSON.parse(lsGet(SYNCED_KEY) || 'null');
      try {
        if (lastSynced) {
          // Edits made here while offline since the last sync go on top of the master, row by row.
          const mine = toShared(state, lastSynced);
          if (diffOps(lastSynced, mine).length) {
            const ops = diffOps(master, merge(lastSynced, mine, master));
            if (ops.length) {
              await NWData.batch(NS, ops);
              master = await fetchMaster();
            }
          }
        } else if (window.EXP_HAD_LOCAL && stable(fromShared(master).rows) !== stable(state.rows)) {
          await NWData.put(NS, KEY + '__zaloha__' + Date.now(), { title: state.title, rows: state.rows });
        }
      } catch (e) {
        status('err', '⚠️ Nepodařilo se uložit tvoje data do sdílené zálohy — zůstávají jen u tebe, nic se nepřepsalo. (' + e.message + ') Zkouším znovu…');
        setTimeout(init, 30000);
        return;
      }
      apply(master);
      live = true;
      okStatus();
      return;
    }

    if (!isMaster()) {
      status('warn', 'Sdílená verze zatím neexistuje — čeká se, až ji nahraje Jan. Do té doby pracuješ jen ve svém prohlížeči.');
      setTimeout(init, 60000);
      return;
    }
    if (!window.EXP_HAD_LOCAL) {
      status('warn', 'V tomto prohlížeči nemáš expedici vyplněnou. Otevři stránku tam, kde ji vyplněnou máš, a nahraj ji jako hlavní verzi.');
      return;
    }
    if (!confirm('Nahrát tuto verzi „' + (state.title || KEY) + '“ (' + state.rows.length + ' řádků) jako HLAVNÍ pro všechny?')) {
      status('warn', 'Hlavní verze nebyla nahrána — pracuješ jen ve svém prohlížeči. Až budeš chtít nahrát, obnov stránku.');
      return;
    }
    const sh = toShared(state, null);
    const ops = [{ action: 'put', id: META, data: { title: sh.title } }]
      .concat(Object.keys(sh.rows).map(id => ({ action: 'put', id: ROW + id, data: sh.rows[id] })));
    try {
      await NWData.batch(NS, ops);
    } catch (e) {
      status('err', 'Nahrání hlavní verze se nepovedlo: ' + e.message + ' — data zůstávají u tebe.');
      return;
    }
    apply(sh);
    live = true;
    okStatus();
  }

  // Reload an open tab when a newer version of the page is published (old tabs kept old sync code).
  let pageSig = null;
  async function checkVersion() {
    try {
      const get = u => fetch(u + '?v=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.text() : Promise.reject());
      const txt = (await get(location.pathname)) + (await get(me.src.split('?')[0]));
      let h = 0;
      for (let k = 0; k < txt.length; k++) h = (h * 31 + txt.charCodeAt(k)) | 0;
      const sig = txt.length + ':' + h;
      if (pageSig && sig !== pageSig && !timer && !pushing && !dirty()) {
        const a = document.activeElement;
        if (!(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) { location.reload(); return; }
      }
      if (!pageSig) pageSig = sig;
    } catch (e) {}
  }
  checkVersion();
  setInterval(checkVersion, 3 * 60000);

  setInterval(poll, 15000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) poll(); });
  init();
})();

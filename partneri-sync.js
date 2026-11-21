// Shared partner register for partneri.html + nabidky.html.
// Base list = partneri-data.js (K2 export, BASE_DATA rows [id, kod, nazev, ico, adresa]).
// On top of it the shared store (NWData ns "partneri") holds what people add or change:
//   - firms that are not in K2 yet (from offers, Trello orders or added by hand)
//   - the sales rep ("rep") assigned to any firm
// Record id: "ico_<IČO>" when the firm has an IČO, otherwise "n_<normalized name>".
window.NWPartneri = (function () {
  const NS = 'partneri';
  const CACHE = 'nw_partneri_cache';
  const REPS = ['Martin Werner', 'Tomáš Hamerník', 'Markéta Costachová', 'Jan Vlček'];
  const ALIASES = { 'jan': 'Jan Vlček', 'martin': 'Martin Werner', 'marin werner': 'Martin Werner',
    'hamerník': 'Tomáš Hamerník', 'hamerník tomáš': 'Tomáš Hamerník', 'tomáš': 'Tomáš Hamerník',
    'markéta': 'Markéta Costachová', 'costachová': 'Markéta Costachová' };

  let shared = {};          // id -> data
  let loaded = false;
  try { shared = JSON.parse(localStorage.getItem(CACHE) || '{}'); } catch (e) {}

  function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\b(s\.?\s?r\.?\s?o\.?|spol\.?|a\.?\s?s\.?|k\.?\s?s\.?|v\.?\s?o\.?\s?s\.?|z\.?\s?s\.?|o\.?\s?p\.?\s?s\.?|se|gmbh|ltd)\b/g, '')
      .replace(/[^a-z0-9]+/g, '');
  }
  function cleanIco(s) { return (s || '').replace(/\s/g, ''); }
  function key(nazev, ico) {
    ico = cleanIco(ico);
    return (/^\d{6,8}$/.test(ico) ? 'ico_' + ico : 'n_' + norm(nazev)).slice(0, 100);
  }
  function repName(s) {
    s = (s || '').trim();
    if (!s) return '';
    const exact = REPS.find(r => r.toLowerCase() === s.toLowerCase());
    return exact || ALIASES[s.toLowerCase()] || s;
  }
  // name of the signed-in person — verified by the server in pin-guard.js (no PIN list in public files)
  function me() { try { return localStorage.getItem('nw_me') || ''; } catch (e) { return ''; } }

  function base() { return typeof BASE_DATA !== 'undefined' ? BASE_DATA : []; }

  // Every firm: {id, kod, nazev, ico, adresa, rep, zdroj, isNew}
  function all() {
    const out = [], seen = new Set();
    base().forEach(r => {
      const id = key(r[2], r[3]);
      const s = shared[id] || {};
      seen.add(id);
      out.push({ id, kod: r[1] || '', nazev: r[2] || '', ico: r[3] || '', adresa: r[4] || '',
        rep: s.rep || '', zdroj: 'K2', isNew: false });
    });
    Object.entries(shared).forEach(([id, s]) => {
      if (seen.has(id) || !s.nazev) return;
      seen.add(id);
      out.push({ id, kod: s.kod || '', nazev: s.nazev, ico: s.ico || '', adresa: s.adresa || '',
        rep: s.rep || '', zdroj: s.zdroj || '', isNew: true });
    });
    return out;
  }
  function find(nazev, ico) {
    const id = key(nazev, ico);
    return all().find(p => p.id === id) || null;
  }
  function reps() {
    const set = new Set(REPS);
    Object.values(shared).forEach(s => { if (s.rep) set.add(s.rep); });
    return [...set];
  }

  async function load() {
    const items = await NWData.list(NS);
    const next = {};
    items.forEach(i => { next[i.id] = i.data; });
    shared = next;
    loaded = true;
    try { localStorage.setItem(CACHE, JSON.stringify(shared)); } catch (e) {}
    return all();
  }
  function cacheSave() { try { localStorage.setItem(CACHE, JSON.stringify(shared)); } catch (e) {} }

  async function patch(id, data) {
    const item = await NWData.patch(NS, id, data);
    shared[id] = item ? item.data : Object.assign({}, shared[id] || {}, data);
    cacheSave();
    return shared[id];
  }

  // Add a firm (or fill missing details of a known one). Never overwrites an assigned rep.
  async function add(e, zdroj) {
    const nazev = (e.nazev || '').trim();
    if (!nazev) throw new Error('Chybí název firmy');
    const ico = cleanIco(e.ico);
    const id = key(nazev, ico);
    const known = all().find(p => p.id === id);
    const rep = repName(e.rep);
    if (known && !known.isNew) {                       // firm is in K2 already → only the rep is stored
      return (!known.rep && rep) ? patch(id, { rep }) : shared[id];
    }
    const cur = shared[id] || {};
    const data = { nazev: cur.nazev || nazev, ico: cur.ico || ico, adresa: cur.adresa || (e.adresa || '').trim(),
      kod: cur.kod || (e.kod || '').trim(), zdroj: cur.zdroj || zdroj || 'ručně' };
    if (!cur.rep && rep) data.rep = rep;
    return patch(id, data);
  }

  async function setRep(id, rep) { return patch(id, { rep: repName(rep) }); }
  async function remove(id) {
    await NWData.remove(NS, id);
    delete shared[id];
    cacheSave();
  }

  // Firms added before the register was shared lived only in one browser — move them to the shared store.
  async function migrateLocal() {
    let local = [];
    try { local = JSON.parse(localStorage.getItem('nw_partneri') || '[]'); } catch (e) {}
    if (!local.length) return 0;
    let n = 0;
    for (const p of local) {
      const e = Array.isArray(p) ? { kod: p[1], nazev: p[2], ico: p[3], adresa: p[4] } : p;
      if (!e.nazev) continue;
      await add({ ...e, rep: e.rep || me() }, 'ručně');
      n++;
    }
    try {
      localStorage.setItem('nw_partneri_presunuto', localStorage.getItem('nw_partneri'));
      localStorage.removeItem('nw_partneri');
    } catch (e) {}
    return n;
  }

  return { all, find, key, load, add, setRep, remove, migrateLocal, reps, me, repName,
    isLoaded: () => loaded, REPS };
})();

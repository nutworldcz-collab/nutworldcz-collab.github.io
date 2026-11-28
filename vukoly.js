// 📋 Production tasks with timing (Jan 2026-11-28) — shared by vyroba.html (Jan / team leads assign an item of an order)
// and objednavky.html (a worker takes an e-shop item himself). Data live on the server (nw_nastenky /api/nastenky/vukoly),
// the worker runs ▶ / ⏸ / ✅ in his own app (aplikace.html #/ukoly). On GitHub Pages (no server) everything stays hidden.
(function () {
  const API = '/api/nastenky/vukoly';
  const S = { data: null, zdroj: null, onChange: null, timer: null };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtMin = m => { m = Math.round(m || 0); return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
  const num = (v, d = 1) => v == null ? '–' : Number(v).toLocaleString('cs-CZ', { maximumFractionDigits: d });
  const onServer = !/github\.io$/.test(location.hostname);

  const css = document.createElement('style');
  css.textContent = `
.vu-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.vu-chip{font:600 11.5px/1.3 "Source Sans 3",Arial,sans-serif;border-radius:999px;padding:2px 8px;background:#f1e6da;color:#5c381f;border:1px solid #e3cdb5;cursor:pointer;white-space:nowrap}
.vu-chip.bezi{background:#e8f3df;color:#2d5a1b;border-color:#b9d8a0}
.vu-chip.pauza{background:#fff3cd;color:#8a6200;border-color:#f3d98a}
.vu-chip.hotovo{background:#dcfce7;color:#166534;border-color:#a7e3bb}
.vu-chip.warn{background:#fee2e2;color:#9b1c1c;border-color:#f5b5b5}
.vu-btn{font:700 11.5px/1 "Source Sans 3",Arial,sans-serif;border:1.5px solid #83502e;background:#fff;color:#83502e;border-radius:7px;padding:4px 8px;cursor:pointer;white-space:nowrap}
.vu-btn:hover{background:#83502e;color:#fff}
.vu-ov{position:fixed;inset:0;background:rgba(42,26,14,.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}
.vu-dlg{background:#fffdf9;border-radius:14px;max-width:440px;width:100%;padding:18px 18px 14px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:15px/1.45 "Source Sans 3",Arial,sans-serif;color:#2a1a0e;max-height:90vh;overflow:auto}
.vu-dlg h3{margin:0 0 4px;font:700 18px "Exo 2",Arial,sans-serif;color:#5c381f}
.vu-dlg .sub{color:#83502e;font-size:13px;margin-bottom:10px}
.vu-dlg label{display:block;font-weight:700;font-size:13px;color:#5c381f;margin:10px 0 3px}
.vu-dlg select,.vu-dlg input,.vu-dlg textarea{width:100%;box-sizing:border-box;font:15px "Source Sans 3",Arial,sans-serif;padding:8px 10px;border:1.5px solid #c8976a;border-radius:9px;background:#fff}
.vu-dlg .row{display:flex;gap:8px}.vu-dlg .row>div{flex:1;min-width:0}
.vu-dlg .akce{display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap}
.vu-dlg .ok{background:#83502e;color:#fff;border:0;border-radius:9px;padding:9px 16px;font-weight:700;cursor:pointer}
.vu-dlg .zp{background:#f1e6da;color:#5c381f;border:0;border-radius:9px;padding:9px 14px;font-weight:700;cursor:pointer}
.vu-dlg .del{background:#fff;color:#9b1c1c;border:1.5px solid #f5b5b5;border-radius:9px;padding:8px 12px;font-weight:700;cursor:pointer}
.vu-dlg .err{color:#9b1c1c;font-size:13px;margin-top:8px}
.vu-dlg .ukol{background:#f1e6da;border-radius:9px;padding:8px 10px;margin:6px 0;font-size:14px}`;
  document.head.appendChild(css);

  async function api(path, body) {
    const r = await fetch(path, body ? { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      : { credentials: 'same-origin', cache: 'no-store' });
    let j = {}; try { j = await r.json(); } catch (e) { }
    if (!r.ok) throw new Error(j.chyba || ('chyba ' + r.status));
    return j;
  }

  async function load(zdroj, onChange) {
    if (!onServer) return null;
    S.zdroj = zdroj; if (onChange) S.onChange = onChange;
    try { S.data = await api(API + '?zdroj=' + encodeURIComponent(zdroj)); } catch (e) { S.data = null; }
    if (!S.data || !S.data.smi) return S.data;
    if (!S.timer) S.timer = setInterval(async () => {
      if (document.hidden) return;
      const old = JSON.stringify(S.data && S.data.ukoly);
      try { S.data = await api(API + '?zdroj=' + encodeURIComponent(S.zdroj)); } catch (e) { return; }
      if (JSON.stringify(S.data.ukoly) !== old && S.onChange) S.onChange();
    }, 30000);
    return S.data;
  }
  const on = () => !!(S.data && S.data.smi);
  const byRef = (ref, odDne) => on() ? S.data.ukoly.filter(t => t.ref === ref && (t.stav !== 'hotovo' || !odDne || (t.dokonceno || '') >= odDne)) : [];
  // the item is done when it has tasks and all of them are done
  const refDone = (ref, odDne) => { const l = byRef(ref, odDne); return l.length > 0 && l.every(t => t.stav === 'hotovo'); };

  function chip(t) {
    const kdo = esc((t.osoba || '').split(' ')[0]);
    let cls = t.stav, txt;
    if (t.stav === 'zadano') txt = `👤 ${kdo} · ${esc(t.ukon)} ${t.ks} ks · ⏳ čeká`;
    else if (t.stav === 'bezi') txt = `▶ ${kdo} · ${esc(t.ukon)} · běží ${fmtMin(t.minuty)}`;
    else if (t.stav === 'pauza') txt = `⏸ ${kdo} · ${esc(t.ukon)} · ${fmtMin(t.minuty)}`;
    else txt = `✅ ${kdo} · ${esc(t.ukon)} ${t.ks_hotovo} ks · ${fmtMin(t.minuty)}` + (t.ks_h ? ` · ${num(t.ks_h)} ks/h · ${num(t.min_ks, 2)} min/ks` : '');
    if (t.varovani) { cls = 'warn'; txt = '⚠️ ' + txt + ' · zapomenuté zastavení'; }
    return `<span class="vu-chip ${cls}" data-vu="${esc(t.id)}" title="${esc(t.text || '')}">${txt}</span>`;
  }
  // chips + button for one item; opts = what the task is about (see assign)
  function html(ref, opts, odDne) {
    if (!on()) return '';
    const l = byRef(ref, odDne);
    const self = opts && opts.sam;            // e-shop: the worker takes it himself
    const otevrene = l.some(t => t.stav !== 'hotovo');
    let btn = '';
    if (S.data.muze_zadat) btn = `<button type="button" class="vu-btn" data-vu-new="${esc(ref)}">👤 Zadat úkol</button>`;
    if (self && !refDone(ref, odDne) && !(otevrene && l.some(t => t.stav !== 'hotovo' && !t.moje)) && !l.some(t => t.moje && t.stav !== 'hotovo'))
      btn += ` <button type="button" class="vu-btn" data-vu-sam="${esc(ref)}">🙋 Beru si</button>`;
    return `<div class="vu-chips" data-vu-ref="${esc(ref)}">${l.map(chip).join('')}${btn}</div>`;
  }

  function overlay(inner) {
    const ov = document.createElement('div'); ov.className = 'vu-ov';
    ov.innerHTML = `<div class="vu-dlg" role="dialog" aria-modal="true">${inner}</div>`;
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
    return ov;
  }
  function ukonOptions(dilna, sel) {
    const u = S.data.ukony || {};
    return ['balirna', 'darkovna'].map(d => `<optgroup label="${d === 'balirna' ? 'Balírna' : 'Dárkovna'}">` +
      (u[d] || []).map(x => `<option value="${d}|${esc(x)}"${(d === dilna && x === sel) ? ' selected' : ''}>${esc(x)}</option>`).join('') + '</optgroup>').join('');
  }

  // o = {zdroj, ref, karta, firma, produkt, kod, obal, gram, ks, dilna, ukon}
  function assign(o) {
    const text0 = o.text || `Udělej ${o.ks} ks ${o.produkt}${o.gram ? ' ' + o.gram : ''}${o.obal ? ' · ' + o.obal : ''}`;
    const lide = (S.data.lide || []).map(p => `<option>${esc(p.jmeno)}</option>`).join('');
    const ov = overlay(`<h3>👤 Zadat úkol</h3><div class="sub">${esc(o.firma || '')}</div>
      <label>Co udělat</label><textarea rows="2" data-f="text">${esc(text0)}</textarea>
      <div class="row"><div><label>Úkon</label><select data-f="ukon">${ukonOptions(o.dilna || 'balirna', o.ukon || (o.dilna === 'darkovna' ? 'Kompletace' : 'Balení'))}</select></div>
      <div style="flex:.6"><label>Kusů</label><input type="number" min="1" inputmode="numeric" data-f="ks" value="${esc(o.ks || '')}"></div></div>
      <label>Kdo</label><select data-f="osoba"><option value="">— vyber —</option>${lide}</select>
      <div class="err" hidden></div>
      <div class="akce"><button class="zp" type="button">Zpět</button><button class="ok" type="button">Zadat</button></div>`);
    const f = k => ov.querySelector(`[data-f="${k}"]`);
    ov.querySelector('.zp').onclick = () => ov.remove();
    ov.querySelector('.ok').onclick = async () => {
      const [dilna, ukon] = f('ukon').value.split('|');
      const err = ov.querySelector('.err');
      if (!f('osoba').value) { err.hidden = false; err.textContent = 'Vyber, kdo to udělá.'; return; }
      try {
        await api(API, { ...o, text: f('text').value, ukon, dilna, ks: +f('ks').value, osoba: f('osoba').value });
        ov.remove(); await refresh();
      } catch (e) { err.hidden = false; err.textContent = e.message; }
    };
  }
  function claim(o) {
    const ov = overlay(`<h3>🙋 Beru si</h3><div class="sub">${esc(o.produkt)}${o.gram && !String(o.produkt).replace(/\s/g, '').includes(o.gram) ? ' · ' + esc(o.gram) : ''}</div>
      <div class="row"><div><label>Úkon</label><select data-f="ukon">${ukonOptions(o.dilna || 'balirna', 'Balení')}</select></div>
      <div style="flex:.6"><label>Kusů</label><input type="number" min="1" inputmode="numeric" data-f="ks" value="${esc(o.ks || '')}"></div></div>
      <div class="sub" style="margin-top:8px">Úkol se ti objeví v aplikaci v 📋 Úkoly — tam dáš ▶ Začínám a ✅ Hotovo.</div>
      <div class="err" hidden></div>
      <div class="akce"><button class="zp" type="button">Zpět</button><button class="ok" type="button">Beru si</button></div>`);
    const f = k => ov.querySelector(`[data-f="${k}"]`);
    ov.querySelector('.zp').onclick = () => ov.remove();
    ov.querySelector('.ok').onclick = async () => {
      const [dilna, ukon] = f('ukon').value.split('|');
      try { await api(API, { ...o, zdroj: 'eshop', ukon, dilna, ks: +f('ks').value, osoba: S.data.ja }); ov.remove(); await refresh(); }
      catch (e) { const er = ov.querySelector('.err'); er.hidden = false; er.textContent = e.message; }
    };
  }
  // a click on a chip: detail + what this person may do
  function detail(id) {
    const t = S.data.ukoly.find(x => x.id === id); if (!t) return;
    const ved = S.data.muze_zadat, ja = t.moje;
    const b = [];
    if (ja && t.stav !== 'hotovo') b.push(t.stav === 'bezi' ? ['pauza', '⏸ Pauza'] : ['start', '▶ Začínám']);
    if ((ja || ved) && t.stav !== 'hotovo') b.push(['hotovo', '✅ Hotovo']);
    if ((ja || ved) && t.stav === 'hotovo') b.push(['znovu', '↩ Není hotovo']);
    if (S.data.statistiky && (t.varovani || t.stav === 'hotovo')) b.push(['oprava', '✏️ Opravit čas']);
    const del = ved || (ja && t.zdroj === 'eshop') ? `<button class="del" type="button" data-a="zrusit">Zrušit úkol</button>` : '';
    const ov = overlay(`<h3>${esc(t.ukon)} · ${t.stav === 'hotovo' ? t.ks_hotovo : t.ks} ks</h3><div class="sub">${esc(t.firma || '')}</div>
      <div class="ukol">${esc(t.text || t.produkt)}</div>
      <div>👤 <b>${esc(t.osoba)}</b> · zadal(a) ${esc(t.zadal)}</div>
      <div>⏱ ${fmtMin(t.minuty)} h${t.ks_h ? ` · <b>${num(t.ks_h)} ks/h</b> · ${num(t.min_ks, 2)} min/ks` : ''}${t.varovani ? ' · <span style="color:#9b1c1c">⚠️ zapomenuté zastavení — do průměrů se nepočítá, dokud Honza neopraví čas</span>' : ''}</div>
      <div class="err" hidden></div>
      <div class="akce">${del}<button class="zp" type="button">Zavřít</button>${b.map(([a, l]) => `<button class="ok" type="button" data-a="${a}">${l}</button>`).join('')}</div>`);
    ov.querySelector('.zp').onclick = () => ov.remove();
    ov.querySelectorAll('[data-a]').forEach(x => x.onclick = async () => {
      const a = x.dataset.a, body = { akce: a };
      if (a === 'oprava' || a === 'hotovo') {        // ask the real number first (minutes / pieces actually done)
        const i = document.createElement('input'); i.type = 'number'; i.min = a === 'oprava' ? 1 : 0; i.inputMode = 'numeric';
        i.placeholder = a === 'oprava' ? 'Kolik minut to opravdu trvalo' : 'Kolik kusů je hotových';
        i.value = a === 'oprava' ? (Math.round(t.minuty) || '') : t.ks;
        const lab = document.createElement('label'); lab.textContent = a === 'oprava' ? 'Minut celkem' : 'Hotových kusů';
        const box = ov.querySelector('.akce'); box.before(lab, i); box.innerHTML = '';
        const ok = document.createElement('button'); ok.className = 'ok'; ok.textContent = a === 'oprava' ? 'Uložit čas' : '✅ Hotovo';
        box.appendChild(ok); i.focus();
        ok.onclick = async () => { try { await api(`${API}/${t.id}`, a === 'oprava' ? { akce: a, minuty: +i.value } : { akce: a, ks: +i.value }); ov.remove(); await refresh(); } catch (e) { const er = ov.querySelector('.err'); er.hidden = false; er.textContent = e.message; } };
        return;
      }
      if (a === 'zrusit' && !x.dataset.sure) { x.dataset.sure = 1; x.textContent = 'Opravdu zrušit?'; return; }
      try { await api(`${API}/${t.id}`, body); ov.remove(); await refresh(); }
      catch (e) { const er = ov.querySelector('.err'); er.hidden = false; er.textContent = e.message; }
    });
  }
  async function refresh() {
    try { S.data = await api(API + '?zdroj=' + encodeURIComponent(S.zdroj)); } catch (e) { }
    if (S.onChange) S.onChange();
  }

  // one delegated click handler; pages register what each ref is about via NWUkoly.meta[ref]
  const meta = {};
  document.addEventListener('click', e => {
    const n = e.target.closest('[data-vu-new],[data-vu-sam],[data-vu]');
    if (!n || !on()) return;
    e.stopPropagation(); e.preventDefault();
    if (n.dataset.vuNew) assign(meta[n.dataset.vuNew] || { ref: n.dataset.vuNew });
    else if (n.dataset.vuSam) claim(meta[n.dataset.vuSam] || { ref: n.dataset.vuSam });
    else detail(n.dataset.vu);
  }, true);

  window.NWUkoly = { load, on, byRef, refDone, html, meta, refresh, fmtMin, num };
})();

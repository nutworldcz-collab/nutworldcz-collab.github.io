// 📋 Production tasks with timing (Jan 2026-11-28) — shared by vyroba.html and objednavky.html. Jan / team leads assign an
// item („👤 Zadat úkol“); anyone takes an item himself („🙋 Beru si“ = the time starts) and ends it („✅ Hotovo“) right on
// the page. Everyone has his own to-do list + month stats (floating „📋 Moje úkoly“) and the same in the app (#/ukoly).
// Data on the server (nw_nastenky /api/nastenky/vukoly). On GitHub Pages (no server) everything stays hidden.
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
.vu-chip{font:600 11.5px/1.3 "Source Sans 3",Arial,sans-serif;border-radius:999px;padding:2px 8px;background:#f1e6da;color:#5c381f;border:1px solid #e3cdb5;cursor:pointer;white-space:normal;max-width:100%}
.vu-chip.bezi{background:#e8f3df;color:#2d5a1b;border-color:#b9d8a0}
.vu-chip.pauza{background:#fff3cd;color:#8a6200;border-color:#f3d98a}
.vu-chip.ke_kontrole{background:#e8f0fb;color:#24508a;border-color:#b5cdee}
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
.vu-dlg .ukol{background:#f1e6da;border-radius:9px;padding:8px 10px;margin:6px 0;font-size:14px}
.vu-dlg select,.vu-dlg input,.vu-dlg textarea,.vu-dlg button,.vu-moje select,.vu-moje input{pointer-events:auto!important;opacity:1!important}
.vu-btn.go{background:#83502e;color:#fff}.vu-btn.ok2{border-color:#4a7c2f;color:#2d5a1b}.vu-btn.ok2:hover{background:#4a7c2f;color:#fff}
.vu-fab{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:9990;background:#83502e;color:#fff;border:0;border-radius:999px;
  padding:11px 16px;font:700 14px "Source Sans 3",Arial,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25);cursor:pointer}
.vu-fab b{background:#f7ab31;color:#2a1a0e;border-radius:999px;padding:0 7px;margin-left:6px}
.vu-fab.bezi{background:#4a7c2f}
.vu-moje{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:70px;z-index:9991;width:min(420px,calc(100vw - 32px));max-height:75vh;overflow:auto;background:#fffdf9;
  border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.28);padding:14px;font:14px/1.45 "Source Sans 3",Arial,sans-serif;color:#2a1a0e}
.vu-moje h4{margin:0 0 8px;font:700 16px "Exo 2",Arial,sans-serif;color:#5c381f}
.vu-moje .u{background:#f1e6da;border-radius:10px;padding:8px 10px;margin-bottom:8px}.vu-moje .u.bezi{outline:2px solid #6fa044}
.vu-moje .s{color:#83502e;font-size:12.5px}
.vu-moje table{width:100%;border-collapse:collapse;font-size:12.5px}.vu-moje td{padding:4px 2px;border-bottom:1px solid #eadccd;vertical-align:top}`;
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
    drawMoje();
    if (!S.timer) S.timer = setInterval(async () => {
      if (document.hidden) return;
      const old = JSON.stringify(S.data && S.data.ukoly);
      try { S.data = await api(API + '?zdroj=' + encodeURIComponent(S.zdroj)); } catch (e) { return; }
      if (JSON.stringify(S.data.ukoly) !== old && S.onChange) S.onChange();
      drawMoje();
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
    else if (t.stav === 'ke_kontrole') txt = `🔎 ${kdo} · ${esc(t.ukon)} ${t.ks_hotovo} ks · ${fmtMin(t.minuty)} · čeká na potvrzení vedoucího`;
    else txt = `✅ ${kdo} · ${esc(t.ukon)} ${t.ks_hotovo} ks · ${fmtMin(t.minuty)}` + (t.ks_h ? ` · ${num(t.ks_h)} ks/h · ${num(t.min_ks, 2)} min/ks` : '');
    if (t.varovani) { cls = 'warn'; txt = '⚠️ ' + txt + ' · zapomenuté zastavení'; }
    return `<span class="vu-chip ${cls}" data-vu="${esc(t.id)}" title="${esc(t.text || '')}">${txt}</span>`;
  }
  // my own task: ▶ / ⏸ and ✅ right next to it
  const ovl = t => t.stav === 'ke_kontrole' ? '' : (t.stav === 'bezi' ? `<button type="button" class="vu-btn" data-vu-act="pauza" data-id="${t.id}">⏸ Pauza</button>`
    : `<button type="button" class="vu-btn go" data-vu-act="start" data-id="${t.id}">▶ ${t.minuty ? 'Pokračuju' : 'Začínám'}</button>`)
    + ` <button type="button" class="vu-btn ok2" data-vu-act="hotovo" data-id="${t.id}">✅ Hotovo</button>`;
  // team lead: the worker's „done“ on a company order waits for him (Jan 2026-11-28)
  const kontrola = t => t.stav === 'ke_kontrole' && S.data.muze_zadat
    ? ` <button type="button" class="vu-btn ok2" data-vu-act="potvrdit" data-id="${t.id}">✔ Potvrdit</button> <button type="button" class="vu-btn" data-vu-act="vratit" data-id="${t.id}">↩ Vrátit</button>` : '';
  // chips + button for one item; opts = what the task is about (see assign)
  function html(ref, opts, odDne) {
    if (!on()) return '';
    const l = byRef(ref, odDne);
    const eshop = opts && opts.zdroj === 'eshop';
    const cizi = l.some(t => t.stav !== 'hotovo' && !t.moje), moje = l.filter(t => t.moje && t.stav !== 'hotovo');
    let btn = '';
    // anyone takes an item himself; an e-shop item only one person at a time (company items can be split)
    if (!refDone(ref, odDne) && !moje.length && !(eshop && cizi)) btn += `<button type="button" class="vu-btn" data-vu-sam="${esc(ref)}">🙋 Beru si</button>`;
    if (S.data.muze_zadat) btn += ` <button type="button" class="vu-btn" data-vu-new="${esc(ref)}">👤 Zadat úkol</button>`;
    return `<div class="vu-chips" data-vu-ref="${esc(ref)}">${l.map(t => chip(t) + (t.moje && t.stav !== 'hotovo' ? ovl(t) : '') + kontrola(t)).join('')}${btn}</div>`;
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
      <label>Kdo</label><div class="row" style="align-items:center"><div><select data-f="osoba"><option value="">— vyber —</option>${lide}</select></div>
        <button type="button" class="zp" data-qr style="flex:0 0 auto;white-space:nowrap">📷 Načíst QR</button></div>
      <div class="sub" data-kdo hidden style="margin-top:6px"></div>
      <div class="err" hidden></div>
      <div class="akce"><button class="zp" type="button">Zpět</button><button class="ok" type="button">Zadat</button></div>`);
    const f = k => ov.querySelector(`[data-f="${k}"]`);
    ov.querySelector('.zp:not([data-qr])').onclick = () => ov.remove();
    try { const p = JSON.parse(sessionStorage.getItem('nw_vu_osoba') || 'null');   // card scanned in the app a moment ago
      if (p && Date.now() - p.t < 30 * 60e3) f('osoba').value = p.j; } catch (e) { }
    ov.querySelector('[data-qr]').onclick = async () => {      // 🪪 the worker's card instead of the list (Jan 2026-11-28)
      const kod = await scan(); if (!kod) return;
      const info = ov.querySelector('[data-kdo]'), err = ov.querySelector('.err'); err.hidden = true;
      try {
        const j = await api('/api/nastenky/qr/kdo?k=' + encodeURIComponent(kod));
        if (!j.ucet) throw new Error(`${j.jmeno} zatím nemá účet v aplikaci — řekni Honzovi, ať ho založí.`);
        f('osoba').value = j.ucet;
        const roz = j.ukoly.filter(t => t.stav !== 'hotovo');
        info.hidden = false;
        info.innerHTML = `✅ <b>${esc(j.ucet)}</b>` + (roz.length ? ` · rozdělané: ${roz.map(t => `${esc(t.ukon)} ${t.ks} ks ${esc(t.produkt)} (${t.stav === 'bezi' ? '▶ běží' : t.stav === 'pauza' ? '⏸' : '⏳'})`).join(', ')}` : ' · teď nemá žádný úkol');
      } catch (e) { err.hidden = false; err.textContent = e.message; }
    };
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
    const ov = overlay(`<h3>🙋 Beru si</h3>${o.firma ? `<div class="sub" style="margin:0">${esc(o.firma)}</div>` : ''}<div class="sub">${esc(o.produkt)}${o.gram && !String(o.produkt).replace(/\s/g, '').includes(o.gram) ? ' · ' + esc(o.gram) : ''}</div>
      <div class="row"><div><label>Úkon</label><select data-f="ukon">${ukonOptions(o.dilna || 'balirna', 'Balení')}</select></div>
      <div style="flex:.6"><label>Kusů</label><input type="number" min="1" inputmode="numeric" data-f="ks" value="${esc(o.ks || '')}"></div></div>
      <div class="sub" style="margin-top:8px">Čas běží od teď. Až budeš mít hotovo, klikni ✅ Hotovo — tady, v „📋 Moje úkoly“ vpravo dole nebo v aplikaci.</div>
      <div class="err" hidden></div>
      <div class="akce"><button class="zp" type="button">Zpět</button><button class="ok" type="button">🙋 Beru si a začínám</button></div>`);
    const f = k => ov.querySelector(`[data-f="${k}"]`);
    ov.querySelector('.zp').onclick = () => ov.remove();
    ov.querySelector('.ok').onclick = async () => {
      const [dilna, ukon] = f('ukon').value.split('|');
      try { await api(API, { ...o, zdroj: o.zdroj || 'eshop', ukon, dilna, ks: +f('ks').value, osoba: S.data.ja, start: true }); ov.remove(); await refresh(); }
      catch (e) { const er = ov.querySelector('.err'); er.hidden = false; er.textContent = e.message; }
    };
  }
  // a click on a chip: detail + what this person may do
  function detail(id) {
    const t = S.data.ukoly.find(x => x.id === id); if (!t) return;
    const ved = S.data.muze_zadat, ja = t.moje;
    const b = [];
    if (ja && !['hotovo', 'ke_kontrole'].includes(t.stav)) b.push(t.stav === 'bezi' ? ['pauza', '⏸ Pauza'] : ['start', '▶ Začínám']);
    if ((ja || ved) && !['hotovo', 'ke_kontrole'].includes(t.stav)) b.push(['hotovo', '✅ Hotovo']);
    if (ved && t.stav === 'ke_kontrole') { b.push(['vratit', '↩ Vrátit']); b.push(['potvrdit', '✔ Potvrdit']); }
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
  // camera -> worker card code (jsQR self-hosted, same as the píchačka); resolves the code or null
  function scan() {
    return new Promise(resolve => {
      const ov = overlay(`<h3>📷 Kartička pracovníka</h3><div class="sub">Namiř kameru na QR na kartičce</div>
        <div style="position:relative;border-radius:12px;overflow:hidden;background:#222;aspect-ratio:1/1;max-height:50vh;margin:0 auto">
          <video playsinline muted style="width:100%;height:100%;object-fit:cover"></video>
          <div style="position:absolute;inset:18%;border:3px solid #f7ab31;border-radius:12px"></div></div>
        <div class="sub" data-st style="margin-top:8px">Spouštím kameru…</div>
        <div class="akce"><button class="zp" type="button">Zrušit</button></div>`);
      ov.style.zIndex = 10000;
      let stream = null, done = false, raf = 0;
      const end = v => { if (done) return; done = true; cancelAnimationFrame(raf); stream && stream.getTracks().forEach(x => x.stop()); ov.remove(); resolve(v); };
      ov.querySelector('.zp').onclick = () => end(null);
      ov.addEventListener('click', e => { if (e.target === ov) end(null); });
      const st = ov.querySelector('[data-st]'), v = ov.querySelector('video');
      const load = window.jsQR ? Promise.resolve() : new Promise((ok, no) => { const sc = document.createElement('script'); sc.src = '/vendor/jsQR-1.4.0.js'; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
      Promise.all([load, navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })]).then(([, s_]) => {
        stream = s_; v.srcObject = s_; v.play(); st.textContent = 'Hledám QR kód…';
        const cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
        const tick = () => { if (done) return;
          if (v.readyState >= 2) { const w = 480, h = Math.round(w * v.videoHeight / v.videoWidth) || 480; cv.width = w; cv.height = h; cx.drawImage(v, 0, 0, w, h);
            const r = jsQR(cx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: 'dontInvert' });
            if (r && r.data) { const m = r.data.match(/(pk[\w-]{8,20})/); if (m) return end(m[1]); st.textContent = 'Tohle není kartička pracovníka.'; } }
          raf = requestAnimationFrame(tick); };
        tick();
      }).catch(() => { st.innerHTML = '<span style="color:#9b1c1c">Kamera nejde spustit — povol ji v prohlížeči, nebo vyber člověka ze seznamu.</span>'; });
    });
  }

  async function refresh() {
    try { S.data = await api(API + '?zdroj=' + encodeURIComponent(S.zdroj)); } catch (e) { }
    if (S.onChange) S.onChange();
    drawMoje();
  }

  // ✅ Hotovo of my task: confirm the pieces actually done
  function hotovo(t, potvrdit) {
    const ov = overlay(`<h3>${potvrdit ? '✔ Potvrdit práci' : '✅ Hotovo'}</h3><div class="sub">${esc(t.ukon)} · ${esc(t.produkt)}${potvrdit ? ` · ${esc(t.osoba)} · ${fmtMin(t.minuty)} h` : ''}</div>
      <label>Kolik kusů je opravdu hotových?</label><input type="number" min="0" inputmode="numeric" data-f="ks" value="${potvrdit ? t.ks_hotovo : t.ks}">
      ${!potvrdit && t.zdroj === 'vyroba' && !S.data.muze_zadat ? '<div class="sub" style="margin-top:8px">Vedoucí to ještě zkontroluje a potvrdí — pak se položka odškrtne.</div>' : ''}
      <div class="err" hidden></div><div class="akce"><button class="zp" type="button">Zpět</button><button class="ok" type="button">${potvrdit ? '✔ Potvrdit' : '✅ Hotovo'}</button></div>`);
    const i = ov.querySelector('[data-f="ks"]'); i.focus(); i.select();
    ov.querySelector('.zp').onclick = () => ov.remove();
    ov.querySelector('.ok').onclick = async () => {
      try { await api(`${API}/${t.id}`, { akce: potvrdit ? 'potvrdit' : 'hotovo', ks: +i.value }); ov.remove(); await refresh(); }
      catch (e) { const er = ov.querySelector('.err'); er.hidden = false; er.textContent = e.message; }
    };
  }
  async function act(id, a) {
    const t = (S.moje || []).concat(S.data ? S.data.ukoly : []).find(x => x.id === id); if (!t) return;
    if (a === 'hotovo') return hotovo(t);
    if (a === 'potvrdit') return hotovo(t, true);
    try { await api(`${API}/${id}`, { akce: a }); await refresh(); } catch (e) { alert(e.message); }
  }

  // 📋 my to-do list + my month stats, floating on the page (every logged-in person with the feature)
  let fab = null, panel = null;
  async function drawMoje() {
    if (!on()) return;
    let j; try { j = await api(API + '?moje=1'); } catch (e) { return; }
    S.moje = j.ukoly;
    const live = j.ukoly.filter(t => t.stav !== 'hotovo'), run = live.find(t => t.stav === 'bezi');
    if (!fab) { fab = document.createElement('button'); fab.className = 'vu-fab'; fab.type = 'button'; document.body.appendChild(fab);
      fab.onclick = () => { if (panel) { panel.remove(); panel = null; } else { panel = document.createElement('div'); panel.className = 'vu-moje'; document.body.appendChild(panel); fillPanel(); } }; }
    fab.classList.toggle('bezi', !!run);
    const kk = S.data.muze_zadat ? S.data.ukoly.filter(t => t.stav === 'ke_kontrole').length : 0;
    fab.innerHTML = `📋 Moje úkoly${live.length ? `<b>${live.length}</b>` : ''}${run ? ` · ▶ ${fmtMin(run.minuty)}` : ''}${kk ? ` · 🔎 ${kk}` : ''}`;
    if (panel) fillPanel();
  }
  async function fillPanel() {
    const live = (S.moje || []).filter(t => t.stav !== 'hotovo'), done = (S.moje || []).filter(t => t.stav === 'hotovo');
    panel.innerHTML = `<h4>📋 Moje úkoly</h4>` + (live.length ? live.map(t => `<div class="u ${t.stav}">
        <div style="display:flex;justify-content:space-between;gap:6px"><b>${esc(t.ukon)} · ${esc(t.produkt)}</b><b style="white-space:nowrap">${t.ks} ks</b></div>
        <div class="s">${[t.firma, t.zadal !== t.osoba ? 'zadal(a) ' + (t.zadal || '').split(' ')[0] : ''].filter(Boolean).map(esc).join(' · ')}</div>
        <div class="s">${t.stav === 'bezi' ? '▶ běží' : t.stav === 'pauza' ? '⏸ pauza' : t.stav === 'ke_kontrole' ? '🔎 hotovo, čeká na potvrzení vedoucího' : '⏳ nezačato'}${t.minuty ? ' · ' + fmtMin(t.minuty) + ' h' : ''}</div>
        <div style="margin-top:5px">${ovl(t)}</div></div>`).join('')
      : '<div class="s" style="margin-bottom:8px">Teď nemáš žádný úkol. Vezmi si položku tlačítkem 🙋 Beru si.</div>')
      + (done.length ? `<div class="s" style="margin:6px 0 2px;font-weight:700">Hotovo za týden</div><table>${done.slice(0, 15).map(t => `<tr><td>✅ ${esc(t.ukon)} · ${esc(t.produkt)}</td><td>${t.ks_hotovo} ks</td><td>${fmtMin(t.minuty)}</td><td>${t.ks_h ? num(t.ks_h) + ' ks/h' : ''}</td></tr>`).join('')}</table>` : '')
      + (S.data.muze_zadat && S.data.ukoly.some(t => t.stav === 'ke_kontrole') ? `<div class="s" style="margin:10px 0 4px;font-weight:700">🔎 Ke kontrole (${S.data.ukoly.filter(t => t.stav === 'ke_kontrole').length})</div>`
        + S.data.ukoly.filter(t => t.stav === 'ke_kontrole').map(t => `<div class="u"><b>${esc(t.osoba)}</b> · ${esc(t.ukon)} · ${esc(t.produkt)} · ${t.ks_hotovo} ks · ${fmtMin(t.minuty)} h<div class="s">${esc(t.firma || '')}</div><div style="margin-top:5px">${kontrola(t)}</div></div>`).join('') : '')
      + '<div data-souhrn></div>';
    let j; try { j = await api(API + '/souhrn'); } catch (e) { return; }
    const el = panel && panel.querySelector('[data-souhrn]'); if (!el || !j.radky.length) return;
    el.innerHTML = `<div class="s" style="margin:10px 0 2px;font-weight:700">Můj výkon tento měsíc · úkolů ${j.ukolu} · ${fmtMin(j.minut_celkem)} h</div><table>
      <tr><td class="s">Práce</td><td class="s">ks/h</td><td class="s">min/ks</td><td class="s">tým ks/h</td></tr>
      ${j.radky.map(r => `<tr><td><b>${esc(r.klic)}</b><br><span class="s">${r.ks} ks · ${fmtMin(r.min)} h</span></td><td><b>${num(r.ks_h)}</b></td><td>${num(r.min_ks, 2)}</td><td>${num(r.tym_ks_h)}</td></tr>`).join('')}</table>
      <div class="s" style="margin-top:4px">Tým = průměr všech za stejnou práci (úkon, obal, gramáž), bez jmen.</div>`;
  }

  // one delegated click handler; pages register what each ref is about via NWUkoly.meta[ref]
  const meta = {};
  document.addEventListener('click', e => {
    const n = e.target.closest('[data-vu-new],[data-vu-sam],[data-vu],[data-vu-act]');
    if (!n || !on()) return;
    e.stopPropagation(); e.preventDefault();
    if (n.dataset.vuAct) act(n.dataset.id, n.dataset.vuAct);
    else if (n.dataset.vuNew) assign(meta[n.dataset.vuNew] || { ref: n.dataset.vuNew });
    else if (n.dataset.vuSam) claim(meta[n.dataset.vuSam] || { ref: n.dataset.vuSam });
    else detail(n.dataset.vu);
  }, true);

  window.NWUkoly = { load, on, byRef, refDone, html, meta, refresh, fmtMin, num, scan };
})();

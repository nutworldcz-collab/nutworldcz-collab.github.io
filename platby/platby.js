/* Nutworld — shared platby utilities */
const LS_KEY = 'nw_platby_v1';
const PRI_CLS = {r:'pbg-r', a:'pbg-a', n:'pbg-n'};
const PRI_COL = {r:'#b01040', a:'#c27a00', n:'#555'};

function loadPaid(){ try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}');}catch{return {};} }
function savePaid(o){ try{localStorage.setItem(LS_KEY,JSON.stringify(o));}catch{} }

function trClass(id){ return loadPaid()[id] ? ' class="paid"' : ''; }
function btnHtml(id){
  const done = !!loadPaid()[id];
  return `<button class="btn-paid${done?' done':''}" onclick="nwPaid('${id}',this)">${done?'✓ Zaplaceno':'Zaplatit'}</button>`;
}

window.nwPaid = function(id, btn){
  const paid = loadPaid();
  paid[id] = !paid[id];
  savePaid(paid);
  const tr = btn.closest('tr');
  tr.classList.toggle('paid', !!paid[id]);
  btn.textContent = paid[id] ? '✓ Zaplaceno' : 'Zaplatit';
  btn.classList.toggle('done', !!paid[id]);
  if(window._nwHiding && paid[id]) tr.style.display = 'none';
};

window._nwHiding = false;
window.nwToggleHide = function(){
  window._nwHiding = !window._nwHiding;
  document.querySelectorAll('.btn-hide').forEach(b=>{
    b.textContent = window._nwHiding ? 'Zobrazit vše' : 'Skrýt zaplacené';
  });
  const paid = loadPaid();
  document.querySelectorAll('[data-pid]').forEach(tr=>{
    if(paid[tr.dataset.pid]) tr.style.display = window._nwHiding ? 'none' : '';
  });
};

/* OZ — obchodní zástupci: barvy a řazení */
const OZ_COLOR = {
  'Renata P.': '#7b3fbe',
  'Jana N.':   '#1a7abf',
  'Tomáš H.':  '#d47e00',
  'Jan V.':    '#2a8f5a',
  'Martin W.': '#b03050',
  'Markéta C.':'#c05080',
};
const OZ_ORDER = ['Renata P.','Jana N.','Tomáš H.','Jan V.','Martin W.','Markéta C.',''];

function ozBadge(oz){
  if(!oz) return '';
  const col = OZ_COLOR[oz] || '#888';
  return `<span style="display:inline-block;margin-top:3px;padding:1px 7px;border-radius:10px;font-size:10.5px;font-weight:600;background:${col}18;color:${col};border:1px solid ${col}44">${oz}</span>`;
}

function sortByOz(arr){
  return [...arr].sort((a,b)=>{
    const ia = OZ_ORDER.indexOf(a.oz||''), ib = OZ_ORDER.indexOf(b.oz||'');
    return (ia<0?99:ia)-(ib<0?99:ib);
  });
}

function buildOvTable(arr, ccy, colspanTot, totalLabel, totalVal){
  const sorted = sortByOz(arr);
  let body = '', lastOz = null;
  sorted.forEach(r=>{
    const oz = r.oz || '';
    if(oz !== lastOz){
      const col = OZ_COLOR[oz] || '#aaa';
      const label = oz || '—';
      body += `<tr class="oz-sep"><td colspan="${colspanTot}" style="padding:4px 10px 2px;font-size:11px;font-weight:700;color:${col};background:${oz?col+'12':'#f8f6f2'};border-top:2px solid ${col}30;letter-spacing:.5px">▸ ${label}</td></tr>`;
      lastOz = oz;
    }
    const sub = r.sub ? `<div class="sub-txt">${r.sub}</div>` : (r.fakt ? `<div class="sub-txt">${r.fakt}</div>` : '');
    body += `<tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span>${sub}</td>
      <td class="r">${r.amt} ${ccy}</td>
      <td>${r.due}</td>
      <td class="r" style="color:${PRI_COL[r.pri]}">${r.days}d</td>
      <td><span class="pbg ${PRI_CLS[r.pri]}">${r.plbl}</span></td>
      <td>${btnHtml(r.id)}</td>
    </tr>`;
  });
  return wrap(`<thead><tr><th>Firma / zákazník</th><th class="r">Částka</th><th>Splatnost</th><th class="r">Dní</th><th>Stav</th><th></th></tr></thead>
    <tbody>${body}</tbody><tfoot><tr><td class="lbl" colspan="4">${totalLabel}</td><td class="r" colspan="2">${totalVal}</td></tr></tfoot>`);
}

function buildOvCZK(){
  return buildOvTable(OV_CZK,'Kč',6,'Celkem CZK po splatnosti','1 300 621 Kč');
}

function buildOvEUR(){
  return buildOvTable(OV_EUR,'EUR',6,'Celkem EUR po splatnosti','2 235,69 EUR');
}

function buildSoonCZK(){
  let body = '';
  SOON_CZK.forEach(g=>{
    const badge = g.lbl ? `<span class="dg-badge dg-${g.cls}">${g.lbl}</span>` : '';
    body += `<tr class="dg-row"><td colspan="5">${g.date}${badge}</td></tr>`;
    const sorted = sortByOz(g.rows);
    sorted.forEach(r=>{
      body += `<tr${trClass(r.id)} data-pid="${r.id}">
        <td><span class="pname">${r.n}</span>${ozBadge(r.oz)}</td>
        <td style="font-size:11.5px;color:#a08060">č. ${r.fakt}</td>
        <td class="r${r.credit?' credit':''}">${r.amt} Kč</td>
        <td>${btnHtml(r.id)}</td>
      </tr>`;
    });
  });
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Faktura</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${body}</tbody><tfoot><tr><td class="lbl" colspan="2">Celkem CZK do 7 dní</td><td class="r" colspan="2">751 432 Kč</td></tr></tfoot>`);
}

function buildSoonEUR(){
  const sorted = sortByOz(SOON_EUR);
  const rows = sorted.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span>${ozBadge(r.oz)}</td>
      <td style="font-size:11.5px;color:#a08060">č. ${r.fakt}</td>
      <td>${r.due}</td>
      <td class="r">${r.amt} EUR</td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Faktura</th><th>Splatnost</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="3">Celkem EUR do 7 dní</td><td class="r" colspan="2">6 860,93 EUR</td></tr></tfoot>`);
}

function buildLaterCZK(){
  const sorted = sortByOz(LATER_CZK);
  const rows = sorted.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span><div class="sub-txt">${r.fakt}</div>${ozBadge(r.oz)}</td>
      <td>${r.due}</td>
      <td class="r${r.approx?' credit':''}">${r.amt}${!r.approx?' Kč':''}</td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Splatnost</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="2">Celkem CZK 6+ dní</td><td class="r" colspan="2">821 tis.+ Kč (bez Alzy)</td></tr></tfoot>`);
}

function buildLaterEUR(){
  const rows = LATER_EUR.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span></td>
      <td style="font-size:11.5px;color:#a08060">č. ${r.fakt}</td>
      <td>${r.due}</td>
      <td class="r">${r.amt} EUR</td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Faktura</th><th>Splatnost</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="3">Celkem EUR 6+ dní</td><td class="r" colspan="2">0 EUR</td></tr></tfoot>`);
}

function wrap(inner){
  return `<div class="tbl-wrap"><table class="tbl">${inner}</table></div>`;
}

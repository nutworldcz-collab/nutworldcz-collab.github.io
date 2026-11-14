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

/* Table builders */
function buildOvCZK(){
  const rows = OV_CZK.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span><div class="sub-txt">${r.sub}</div></td>
      <td class="r">${r.amt} Kč</td>
      <td>${r.due}</td>
      <td class="r" style="color:${PRI_COL[r.pri]}">${r.days}d</td>
      <td><span class="pbg ${PRI_CLS[r.pri]}">${r.plbl}</span></td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th class="r">Částka</th><th>Splatnost</th><th class="r">Dní</th><th>Stav</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="4">Celkem CZK po splatnosti</td><td class="r" colspan="2">970 862 Kč</td></tr></tfoot>`);
}

function buildOvEUR(){
  const rows = OV_EUR.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span><div class="sub-txt">${r.fakt}</div></td>
      <td class="r">${r.amt} EUR</td>
      <td>${r.due}</td>
      <td class="r" style="color:${PRI_COL[r.pri]}">${r.days}d</td>
      <td><span class="pbg ${PRI_CLS[r.pri]}">${r.plbl}</span></td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th class="r">Částka</th><th>Splatnost</th><th class="r">Dní</th><th>Stav</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="4">Celkem EUR po splatnosti</td><td class="r" colspan="2">1 280,27 EUR</td></tr></tfoot>`);
}

function buildSoonCZK(){
  let body = '';
  SOON_CZK.forEach(g=>{
    const badge = g.lbl ? `<span class="dg-badge dg-${g.cls}">${g.lbl}</span>` : '';
    body += `<tr class="dg-row"><td colspan="4">${g.date}${badge}</td></tr>`;
    g.rows.forEach(r=>{
      body += `<tr${trClass(r.id)} data-pid="${r.id}">
        <td><span class="pname">${r.n}</span></td>
        <td style="font-size:11.5px;color:#a08060">č. ${r.fakt}</td>
        <td class="r${r.credit?' credit':''}">${r.amt} Kč</td>
        <td>${btnHtml(r.id)}</td>
      </tr>`;
    });
  });
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Faktura</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${body}</tbody><tfoot><tr><td class="lbl" colspan="2">Celkem CZK do 5 dní</td><td class="r" colspan="2">1 328 522 Kč</td></tr></tfoot>`);
}

function buildSoonEUR(){
  const rows = SOON_EUR.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span></td>
      <td style="font-size:11.5px;color:#a08060">č. ${r.fakt}</td>
      <td>${r.due}</td>
      <td class="r">${r.amt} EUR</td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Faktura</th><th>Splatnost</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="3">Celkem EUR do 5 dní</td><td class="r" colspan="2">3 396,48 EUR</td></tr></tfoot>`);
}

function buildLaterCZK(){
  const rows = LATER_CZK.map(r=>`
    <tr${trClass(r.id)} data-pid="${r.id}">
      <td><span class="pname">${r.n}</span><div class="sub-txt">${r.fakt}</div></td>
      <td>${r.due}</td>
      <td class="r${r.approx?' credit':''}">${r.amt}${!r.approx?' Kč':''}</td>
      <td>${btnHtml(r.id)}</td>
    </tr>`).join('');
  return wrap(`<thead><tr><th>Firma / zákazník</th><th>Splatnost</th><th class="r">Částka</th><th></th></tr></thead>
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="2">Celkem CZK 6+ dní</td><td class="r" colspan="2">943 tis.+ Kč (bez Alzy)</td></tr></tfoot>`);
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
    <tbody>${rows}</tbody><tfoot><tr><td class="lbl" colspan="3">Celkem EUR 6+ dní</td><td class="r" colspan="2">5 704,45 EUR</td></tr></tfoot>`);
}

function wrap(inner){
  return `<div class="tbl-wrap"><table class="tbl">${inner}</table></div>`;
}

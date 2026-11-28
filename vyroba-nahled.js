// Workers (roles vyroba = balírna, darkovna = dárkovna) see Výroba read-only: no ticking, no "nabaleno", no status chips,
// no times, no moving cards — only notes (📝). Team leads tick. Jan 2026-11-28: „náhled + poznámka, ať v tom není bordel“.
// The server enforces the same (nw_nastenky: ns vyroba accepts only notes from these roles, Trello writes refused).
(function () {
  if (/github\.io$/.test(location.hostname)) return;                 // the GitHub copy has no login roles
  const RO = ['vyroba', 'darkovna'];
  fetch('/api/asistent/stav', {credentials: 'same-origin', cache: 'no-store'}).then(r => r.ok ? r.json() : null).then(me => {
    if (!me || !RO.includes(me.role)) return;
    const say = () => {
      let t = document.getElementById('ro-toast');
      if (!t) { t = document.createElement('div'); t.id = 'ro-toast';
        t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#5c381f;color:#fff;padding:10px 16px;border-radius:12px;font:600 14px Arial;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,.3)';
        document.body.appendChild(t); }
      t.textContent = '👁 Odškrtává vedoucí — ty můžeš přidat poznámku 📝'; t.hidden = false;
      clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 2600);
    };
    ['toggle', 'toggleMany', 'markNabaleno', 'unmarkNabaleno', 'setFirmaStatus', 'setCas', 'setPackTime', 'moveCard', 'vzChStatus']
      .forEach(f => { if (typeof window[f] === 'function') window[f] = function () { say(); }; });
    // time / norm selects and inputs in the cards change records too -> read-only look
    const st = document.createElement('style');
    st.textContent = 'select,input[type=number],input[type=time]{pointer-events:none;opacity:.6} textarea{pointer-events:auto!important;opacity:1!important}';
    document.head.appendChild(st);
    const bar = document.createElement('div');
    bar.style.cssText = 'max-width:1400px;margin:8px auto;padding:9px 14px;border-radius:10px;background:#e8f0fb;color:#24508a;font:600 13px Arial';
    bar.textContent = '👁 Náhled výroby — co je hotové, odškrtává vedoucí. Poznámku (📝) k zakázce můžeš přidat.';
    document.body.insertBefore(bar, document.body.firstChild);
  }).catch(() => {});
})();

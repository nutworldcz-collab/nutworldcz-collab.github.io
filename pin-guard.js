(function(){
  // PINs are verified ONLY by the server (nw_data Apps Script "whoami") — no PIN list in this public file
  // (security 2026-11-21). The verified PIN + name are cached; re-checked every 12 h, so a changed PIN stops working.
  const API = 'https://script.google.com/macros/s/AKfycbxK5FYBYGYsf9Hh9ueahqi0FhCDhaoxTkhzpFM3retvDBKvbOUJ1-YxSQurR2MQB2OT/exec';
  const KEY = 'nw_access';
  const ls = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
    del: k => { try { localStorage.removeItem(k); } catch (e) {} },
  };
  async function whoami(pin) {
    const r = await fetch(API + '?action=whoami&pin=' + encodeURIComponent(pin));
    return r.json();
  }
  function remember(pin, j) {
    ls.set(KEY, pin); ls.set('nw_me', j.name || ''); ls.set('nw_master', j.master ? '1' : '');
    ls.set('nw_pin_checked', String(Date.now()));
  }
  const stored = ls.get(KEY);
  if (stored) {
    // already signed in (also people signed in before 2026-11-21: their PIN is verified once in the background)
    if (!ls.get('nw_me') || Date.now() - Number(ls.get('nw_pin_checked') || 0) > 12 * 3600e3) {
      whoami(stored).then(j => {
        if (j.ok) remember(stored, j);
        else { ls.del(KEY); ls.del('nw_me'); ls.del('nw_master'); location.reload(); }
      }).catch(() => {});   // offline -> keep working
    }
    return; // přihlášen, pokračuj
  }

  // Injektuj overlay
  const css = `
    #nw-pin-overlay{position:fixed;inset:0;background:rgba(60,32,10,.88);backdrop-filter:blur(4px);
      z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif}
    #nw-pin-card{background:#f1e6da;border:2px solid #83502e;border-radius:20px;padding:40px 36px 36px;
      width:320px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)}
    #nw-pin-card .nwp-ico{font-size:44px;display:block;margin-bottom:10px}
    #nw-pin-card .nwp-brand{font-size:11px;letter-spacing:3px;text-transform:uppercase;
      color:#83502e;font-weight:700;margin-bottom:4px}
    #nw-pin-card .nwp-title{font-size:20px;font-weight:700;color:#5c381f;margin-bottom:5px}
    #nw-pin-card .nwp-sub{font-size:13px;color:#8a6040;margin-bottom:24px;line-height:1.5}
    #nw-pin-inp{width:100%;padding:13px 16px;font-size:18px;letter-spacing:4px;text-align:center;
      border:2px solid #c8976a;border-radius:12px;background:#fff;color:#5c381f;outline:none;
      box-sizing:border-box;margin-bottom:12px;font-family:monospace}
    #nw-pin-inp:focus{border-color:#83502e;box-shadow:0 0 0 3px rgba(131,80,46,.18)}
    #nw-pin-btn{width:100%;padding:13px;background:#5c381f;color:#fff;border:none;border-radius:12px;
      font-size:15px;font-weight:700;cursor:pointer;letter-spacing:.3px}
    #nw-pin-btn:hover{background:#83502e}
    #nw-pin-err{margin-top:10px;font-size:13px;color:#da1668;font-weight:600;min-height:18px}
    #nw-pin-footer{margin-top:18px;font-size:11px;color:#b09070;
      border-top:1px solid #ddd0c0;padding-top:14px}
  `;

  const style = document.createElement('style');
  style.textContent = css;

  const overlay = document.createElement('div');
  overlay.id = 'nw-pin-overlay';
  overlay.innerHTML = `
    <div id="nw-pin-card">
      <span class="nwp-ico">🐿</span>
      <div class="nwp-brand">Nutworld</div>
      <div class="nwp-title">Interní přístup</div>
      <div class="nwp-sub">Zadejte svůj přístupový kód.</div>
      <input id="nw-pin-inp" type="password" placeholder="váš kód" autocomplete="off" autofocus/>
      <button id="nw-pin-btn">Vstoupit →</button>
      <div id="nw-pin-err"></div>
      <div id="nw-pin-footer">Zákazníci — použijte odkaz, který jste obdrželi.</div>
    </div>
  `;

  async function check(){
    const inp = document.getElementById('nw-pin-inp'), err = document.getElementById('nw-pin-err');
    const val = inp.value.trim();
    if (!val) return;
    err.style.color = '#8a6040'; err.textContent = 'Ověřuji…';
    let j = null;
    try { j = await whoami(val); } catch (e) { err.style.color = '#da1668'; err.textContent = '✕ Bez spojení — zkus znovu'; return; }
    if (j && j.ok) {
      remember(val, j);
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity .35s';
      setTimeout(()=>{ overlay.remove(); location.reload(); }, 380);
    } else {
      err.style.color = '#da1668';
      err.textContent = '✕ Nesprávný kód';
      inp.value = '';
      inp.focus();
      setTimeout(()=>{ err.textContent=''; }, 3000);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    document.getElementById('nw-pin-btn').addEventListener('click', check);
    document.getElementById('nw-pin-inp').addEventListener('keydown', function(e){
      if(e.key==='Enter') check();
    });
  });
})();

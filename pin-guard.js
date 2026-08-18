(function(){
  const KODY = [
    'jerab47',   // Jan Vlček
    'sliva83',   // Jana Nývltová
    'hrach29',   // Martin Werner
    'kopec61',   // Markéta Costachová
    'vrana54',   // Tomáš Hamerník
    'skala38',   // Jiřina Hamerníková
    'morak72',   // Lucie Turková
    'jablon16',  // Renata Pošepná
    'ryba95',    // Rita Vozáková
  ];

  const KEY = 'nw_access';
  const stored = localStorage.getItem(KEY);
  if (stored && KODY.includes(stored)) return; // přihlášen, pokračuj

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

  function check(){
    const val = document.getElementById('nw-pin-inp').value.trim();
    if(KODY.includes(val)){
      localStorage.setItem(KEY, val);
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity .35s';
      setTimeout(()=>overlay.remove(), 380);
    } else {
      const err = document.getElementById('nw-pin-err');
      err.textContent = '✕ Nesprávný kód';
      document.getElementById('nw-pin-inp').value = '';
      document.getElementById('nw-pin-inp').focus();
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

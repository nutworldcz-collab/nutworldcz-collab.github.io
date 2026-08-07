// Apps Script — Notifikace změn produktů (zmeny.html → email)
// Nasadit jako: Web App | Anyone | Execute as: Me
// Účet: claudie.nutworld.cz@gmail.com

const NOTIFY_TO = 'legislativa@nutworld.cz';

const TYPE_LABELS = {
  dodavatel:  'Dodavatel',
  slozeni:    'Složení',
  alergeny:   '⚠️ ALERGENY — KRITICKÉ',
  gramaz:     'Gramáž',
  cena:       'NC cena',
  certifikat: 'Certifikát / původ',
  jine:       'Jiné',
};

function doGet(e) {
  const p = e.parameter;
  if (p.action !== 'zmena') {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const kod   = p.kod   || '?';
  const nazev = p.nazev || '?';
  const typ   = p.typ   || 'jine';
  const popis = (p.popis || '').replace(/\n/g, '<br>');
  const isCritical = typ === 'alergeny';

  const typLabel = TYPE_LABELS[typ] || typ;
  const headerBg = isCritical ? '#9b1c1c' : '#5c381f';
  const subject  = isCritical
    ? `⚠️ KRITICKÁ ZMĚNA: ${kod} ${nazev} — Alergeny`
    : `[ZMĚNA PRODUKTU] ${kod} ${nazev} — ${typLabel}`;

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
  <div style="background:${headerBg};padding:22px 24px;border-radius:10px 10px 0 0">
    <div style="font-size:11px;color:rgba(255,255,255,.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">Nutworld · Změna produktu</div>
    <h1 style="color:white;margin:0;font-size:20px;font-weight:800">🔄 ${escHtml(nazev)}</h1>
    ${isCritical ? '<div style="background:#fee2e2;color:#9b1c1c;font-weight:bold;font-size:13px;padding:8px 12px;border-radius:6px;margin-top:12px">⚠️ Kritická změna — musí se okamžitě opravit etiketa i weby!</div>' : ''}
  </div>

  <div style="background:white;padding:24px;border:2px solid #d4c0a8;border-top:none;border-radius:0 0 10px 10px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <tr style="border-bottom:1px solid #f1e6da">
        <td style="color:#83502e;font-weight:bold;padding:8px 0;width:130px;font-size:13px">Kód produktu</td>
        <td style="padding:8px 0;font-size:14px;font-family:monospace;background:#f8f3ee;padding:6px 10px;border-radius:6px">${escHtml(kod)}</td>
      </tr>
      <tr style="border-bottom:1px solid #f1e6da">
        <td style="color:#83502e;font-weight:bold;padding:8px 0;font-size:13px">Název</td>
        <td style="padding:8px 0;font-size:14px">${escHtml(nazev)}</td>
      </tr>
      <tr style="border-bottom:1px solid #f1e6da">
        <td style="color:#83502e;font-weight:bold;padding:8px 0;font-size:13px">Typ změny</td>
        <td style="padding:8px 0;font-size:14px"><strong>${typLabel}</strong></td>
      </tr>
      <tr>
        <td style="color:#83502e;font-weight:bold;padding:8px 0;font-size:13px;vertical-align:top">Popis</td>
        <td style="padding:8px 0;font-size:14px;line-height:1.6">${popis}</td>
      </tr>
    </table>

    <div style="background:#f1e6da;border-radius:8px;padding:14px 18px;margin-bottom:20px">
      <div style="font-size:12px;font-weight:bold;color:#83502e;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Povinné kroky ke splnění</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <span style="background:white;border:1.5px solid #d4c0a8;border-radius:6px;padding:4px 12px;font-size:13px">🇨🇿 Web CZ</span>
        <span style="background:white;border:1.5px solid #d4c0a8;border-radius:6px;padding:4px 12px;font-size:13px">🇸🇰 Web SK</span>
        <span style="background:white;border:1.5px solid #d4c0a8;border-radius:6px;padding:4px 12px;font-size:13px">🏷️ Etiketa</span>
        <span style="background:white;border:1.5px solid #d4c0a8;border-radius:6px;padding:4px 12px;font-size:13px">📋 Trello spec</span>
      </div>
    </div>

    <a href="https://nutworldcz-collab.github.io/zmeny.html"
       style="display:inline-block;background:#83502e;color:white;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px">
      Otevřít tracker a odklikávat →
    </a>

    <div style="margin-top:24px;border-top:1px solid #f1e6da;padding-top:14px;font-size:11px;color:#a07850">
      Automatická notifikace · Nutworld s.r.o. · nutworldcz-collab.github.io
    </div>
  </div>
</div>`;

  MailApp.sendEmail({ to: NOTIFY_TO, subject: subject, htmlBody: html });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

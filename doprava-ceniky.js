/* doprava-ceniky.js — JEDINÝ zdroj ceníků dopravců Nutworld (od 2026-11-23).
   Používají: ppl.html, geis.html, toptrans.html, nabidky.html (návrh ceny dopravy).
   Cenu dopravce měnit JEN tady. Nakládka: Rtyně v Podkrkonoší. Všechny ceny bez DPH. */
(function (g) {
  const PPL = {
    svcs: {
  'cz-home': {name:'CZ domů',cls:'cz-home',mytne:'cz',dob:26.50,maxKg:31.5,
    bands:[{max:2,price:76.47,est:false},{max:5,price:78.30,est:false},{max:10,price:85.77,est:false},{max:20,price:89.67,est:false},{max:31.5,price:124.82,est:false}]},
  'cz-pbox':{name:'CZ výdejna',cls:'cz-pbox',mytne:'cz',dob:26.50,maxKg:20,
    bands:[{max:2,price:55.05,est:false},{max:5,price:65.23,est:false},{max:10,price:73.36,est:false},{max:20,price:88.50,est:true}]},
  'sk':{name:'SK',cls:'sk',mytne:'sk',dob:54.20,maxKg:20,
    bands:[{max:2,price:76.00,est:true},{max:5,price:95.00,est:true},{max:10,price:99.50,est:false},{max:20,price:101.97,est:false}]}
},
    palivoPct: 16.5,      // palivový příplatek (mění se měsíčně, faktury 06/2026 17,3 %, 08/2026 16,3 %)
    mytneCZ: 1.10,        // Kč/kg, všechny zásilky
    mytneSK: 0.50,        // Kč/kg navíc u SK
    obalKs: 20            // Kč za krabici/obal na každý balík (Jan 2026-11-23)
  };
  // Hmotnost palety připočtená k zásilce (stejné jako geis.html: FP +20 kg, HP +10 kg)
  const PALETY = { FP: { n: 'celá paleta', kg: 20 }, HP: { n: 'půlpaleta', kg: 10 } };
  const GEIS = {
    cenikCZ: [
  {from:0,to:50,price:349},{from:51,to:75,price:487},{from:76,to:100,price:609},
  {from:101,to:150,price:697},{from:151,to:250,price:783},{from:251,to:350,price:1019},
  {from:351,to:450,price:1335},{from:451,to:600,price:1489},{from:601,to:800,price:1724},
  {from:801,to:1500,price:2039},{from:1501,to:2000,price:2930},{from:2001,to:2500,price:3918},
],
    cenikSK: [
  {maxKg:50,price:551},{maxKg:75,price:657},{maxKg:100,price:794},
  {maxKg:150,price:1097},{maxKg:200,price:1315},{maxKg:250,price:1490},
  {maxKg:300,price:1695},{maxKg:350,price:1876},{maxKg:400,price:2054},
  {maxKg:450,price:2239},{maxKg:500,price:2394},{maxKg:600,price:2746},
  {maxKg:700,price:3119},{maxKg:800,price:3471},{maxKg:1000,price:4158},
  {maxKg:1500,price:5272},{maxKg:2000,price:6560},{maxKg:2500,price:8225},
],
    mytne: {
  1:[{maxKg:50,price:5.42},{maxKg:75,price:7.78},{maxKg:100,price:10.82},{maxKg:150,price:16.20},{maxKg:200,price:21.61},{maxKg:250,price:26.62},{maxKg:300,price:32.39},{maxKg:350,price:36.95},{maxKg:400,price:43.17},{maxKg:450,price:48.71},{maxKg:500,price:53.96},{maxKg:600,price:64.74},{maxKg:700,price:75.52},{maxKg:800,price:86.30},{maxKg:1000,price:107.91},{maxKg:1500,price:161.82},{maxKg:2000,price:215.76},{maxKg:2500,price:269.72}],
  2:[{maxKg:50,price:21.61},{maxKg:75,price:34.70},{maxKg:100,price:43.17},{maxKg:150,price:64.74},{maxKg:200,price:86.30},{maxKg:250,price:111.32},{maxKg:300,price:129.46},{maxKg:350,price:152.98},{maxKg:400,price:172.59},{maxKg:450,price:196.49},{maxKg:500,price:215.76},{maxKg:600,price:258.90},{maxKg:700,price:302.07},{maxKg:800,price:345.19},{maxKg:1000,price:431.49},{maxKg:1500,price:647.27},{maxKg:2000,price:862.97},{maxKg:2500,price:1078.74}],
  3:[{maxKg:50,price:32.39},{maxKg:75,price:49.44},{maxKg:100,price:64.74},{maxKg:150,price:97.13},{maxKg:200,price:129.46},{maxKg:250,price:159.22},{maxKg:300,price:194.21},{maxKg:350,price:229.56},{maxKg:400,price:258.90},{maxKg:450,price:293.45},{maxKg:500,price:323.62},{maxKg:600,price:388.37},{maxKg:700,price:453.10},{maxKg:800,price:517.78},{maxKg:1000,price:647.27},{maxKg:1500,price:970.87},{maxKg:2000,price:1294.47},{maxKg:2500,price:1618.08}],
  4:[{maxKg:50,price:43.17},{maxKg:75,price:71.28},{maxKg:100,price:86.30},{maxKg:150,price:129.46},{maxKg:200,price:172.59},{maxKg:250,price:226.43},{maxKg:300,price:258.90},{maxKg:350,price:317.97},{maxKg:400,price:345.19},{maxKg:450,price:400.07},{maxKg:500,price:431.49},{maxKg:600,price:517.78},{maxKg:700,price:604.09},{maxKg:800,price:690.38},{maxKg:1000,price:862.97},{maxKg:1500,price:1294.47},{maxKg:2000,price:1725.94},{maxKg:2500,price:2157.43}],
},
    cities: [
  {name:'Hronov',zone:1,dist:'~0 km'},{name:'Náchod',zone:1,dist:'~5 km'},{name:'Broumov',zone:1,dist:'~20 km'},
  {name:'Rychnov nad Kněžnou',zone:1,dist:'~25 km'},{name:'Jaroměř',zone:1,dist:'~28 km'},{name:'Trutnov',zone:1,dist:'~30 km'},
  {name:'Dvůr Králové nad Labem',zone:1,dist:'~35 km'},{name:'Nová Paka',zone:1,dist:'~45 km'},{name:'Jičín',zone:1,dist:'~55 km'},
  {name:'Hradec Králové',zone:2,dist:'~55 km'},{name:'Pardubice',zone:2,dist:'~75 km'},{name:'Turnov',zone:2,dist:'~80 km'},
  {name:'Chrudim',zone:2,dist:'~80 km'},{name:'Liberec',zone:2,dist:'~100 km'},{name:'Kolín',zone:2,dist:'~100 km'},
  {name:'Svitavy',zone:2,dist:'~100 km'},{name:'Kutná Hora',zone:2,dist:'~115 km'},{name:'Mladá Boleslav',zone:2,dist:'~120 km'},
  {name:'Praha',zone:2,dist:'~130 km'},
  {name:'Brno',zone:3,dist:'~260 km',confirmed:true},{name:'Jihlava',zone:3,dist:'~175 km'},{name:'Havlíčkův Brod',zone:3,dist:'~175 km'},
  {name:'Olomouc',zone:3,dist:'~215 km'},{name:'Ostrava',zone:3,dist:'~265 km'},{name:'Frýdek-Místek',zone:3,dist:'~285 km'},
  {name:'Opava',zone:3,dist:'~290 km'},{name:'Zlín',zone:3,dist:'~295 km'},{name:'Uherské Hradiště',zone:3,dist:'~295 km'},
  {name:'Plzeň',zone:4,dist:'~340 km'},{name:'České Budějovice',zone:4,dist:'~300 km'},
  {name:'Ústí nad Labem',zone:4,dist:'~205 km'},{name:'Chomutov',zone:4,dist:'~195 km'},{name:'Most',zone:4,dist:'~215 km'},
],
    palivo: 0.12, avizace: 20, minSK: 50
  };
  const TOPTRANS = {
    bands: [
  {max:5,    label:'do 5 kg',    p:[224,255,318,344,361,392,416,439,468]},
  {max:15,   label:'do 15 kg',   p:[333,389,426,476,532,561,592,626,658]},
  {max:30,   label:'do 30 kg',   p:[520,613,688,745,792,839,880,928,983]},
  {max:50,   label:'do 50 kg',   p:[704,844,955,1034,1109,1174,1232,1300,1375]},
  {max:75,   label:'do 75 kg',   p:[896,1089,1232,1346,1444,1534,1610,1700,1799]},
  {max:100,  label:'do 100 kg',  p:[1063,1301,1482,1628,1748,1856,1955,2068,2188]},
  {max:150,  label:'do 150 kg',  p:[1434,1763,2019,2228,2396,2555,2694,2848,3012]},
  {max:200,  label:'do 200 kg',  p:[1693,2113,2428,2688,2899,3097,3262,3449,3648]},
  {max:300,  label:'do 300 kg',  p:[2152,2715,3146,3494,3783,4043,4276,4525,4780]},
  {max:400,  label:'do 400 kg',  p:[2542,3245,3767,4202,4566,4891,5175,5475,5788]},
  {max:500,  label:'do 500 kg',  p:[2880,3715,4336,4847,5273,5655,5993,6340,6699]},
  {max:700,  label:'do 700 kg',  p:[3470,4539,5343,5993,6556,7045,7481,7917,8367]},
  {max:1000, label:'do 1 000 kg',p:[4196,5592,6640,7494,8225,8866,9438,9981,10549]},
  {max:1500, label:'do 1 500 kg',p:[5147,7036,8465,9621,10612,11477,12249,12959,13696]},
  {max:2000, label:'do 2 000 kg',p:[5891,8242,10010,11450,12671,13746,14706,15558,16448]},
  {max:2500, label:'do 2 500 kg',p:[6509,9311,10345,13067,14515,15785,16924,17904,18928]},
  {max:3000, label:'do 3 000 kg',p:[7017,10203,12594,14544,16207,17663,18955,19333,19780]},
],
    distKm: [100,200,300,400,500,600,700,800,900],
    slevaMimoPrahu: 0.85, mezinarodni: 200
  };
  // Cílová místa pro návrh dopravy (Geis zóna CZ mýtného + vzdálenost od Rtyně pro TopTrans)
  const MESTA = GEIS.cities.map(c => ({ n: c.name, c: 'CZ', zone: c.zone, km: parseInt(String(c.dist).replace(/\D/g, ''), 10) || 0 }))
    .concat([['Žilina',355],['Trenčín',395],['Bratislava',400],['Trnava',415],['Nitra',425],['Banská Bystrica',455],['Prešov',545],['Košice',585]]
      .map(([n, km]) => ({ n, c: 'SK', zone: 3, km })));

  const r2 = x => Math.round(x * 100) / 100;

  function ppl(key, kg, palivoPct) {
    const s = PPL.svcs[key]; if (!s || kg > s.maxKg) return null;
    const b = s.bands.find(x => kg <= x.max); if (!b) return null;
    const pal = palivoPct == null ? PPL.palivoPct : palivoPct;
    const tot = b.price * (1 + pal / 100) + kg * PPL.mytneCZ + (s.mytne === 'sk' ? kg * PPL.mytneSK : 0);
    return { total: r2(tot), odhad: !!b.est };
  }
  function geis(country, zone, kg) {
    let p;
    if (country === 'SK') {
      kg = Math.max(kg, GEIS.minSK);
      const e = GEIS.cenikSK.find(x => kg <= x.maxKg);
      p = e ? e.price : GEIS.cenikSK[GEIS.cenikSK.length - 1].price + (kg - 2500) * 2.90;
      zone = 3;   // CZ mýtné k hranici — odhad zóna 3 (jako geis.html)
    } else {
      const e = GEIS.cenikCZ.find(b => kg >= b.from && kg <= b.to) || GEIS.cenikCZ[GEIS.cenikCZ.length - 1];
      p = e.price;
    }
    const t = GEIS.mytne[zone] || GEIS.mytne[3];
    const m = (t.find(e => kg <= e.maxKg) || null);
    const myt = m ? m.price : t[t.length - 1].price + (kg - t[t.length - 1].maxKg) * (t[t.length - 1].price / t[t.length - 1].maxKg);
    return { total: r2(p + Math.round(p * GEIS.palivo * 100) / 100 + myt + GEIS.avizace), odhad: country === 'SK' };
  }
  function toptrans(country, km, kg) {
    const b = TOPTRANS.bands.find(x => kg <= x.max); if (!b) return null;
    const i = Math.max(0, Math.min(8, Math.ceil(Math.max(km, 1) / 100) - 1));
    return { total: r2(Math.round(b.p[i] * TOPTRANS.slevaMimoPrahu) + (country === 'SK' ? TOPTRANS.mezinarodni : 0)), odhad: false };
  }
  // Cena pro zákazníka v nabídce: náklady +10 %, zaokrouhleno nahoru na desítky (Jan 2026-11-23)
  const cenaProZakaznika = naklad => Math.ceil(naklad * 1.10 / 10) * 10;

  /* Návrh dopravy — obchodník si vybere sám podle typu dárku (Jan 2026-11-23).
     o = {country:'CZ'|'SK', mesto, kg, vydejna:bool, paleta:'FP'|'HP', palet:int}
     PPL: balíky do limitu služby + 20 Kč obal/balík. Palety (Geis, TopTrans): + hmotnost palet. */
  function navrh(o) {
    const kg = Math.max(0.1, +o.kg || 0), m = MESTA.find(x => x.n === o.mesto) || { zone: 3, km: o.country === 'SK' ? 400 : 200 };
    const pt = PALETY[o.paleta] || PALETY.FP, pn = Math.max(1, +o.palet || 1), kgPal = kg + pt.kg * pn;
    const palTxt = `${pn}× ${pt.n} (${Math.round(kg)} kg + ${pt.kg * pn} kg paleta = ${Math.round(kgPal)} kg)`;
    const out = [];
    const key = o.country === 'SK' ? 'sk' : (o.vydejna ? 'cz-pbox' : 'cz-home');
    const lim = PPL.svcs[key].maxKg, n = Math.max(o.baliky || 0, Math.ceil(kg / lim));
    const one = ppl(key, kg / n);
    if (one) out.push({ dopravce: 'PPL', popis: `${n}× balík ${(kg / n).toFixed(1).replace('.', ',')} kg (${PPL.svcs[key].name}) + obal ${PPL.obalKs} Kč/balík`,
      naklad: r2(one.total * n + PPL.obalKs * n), odhad: one.odhad, typ: 'balik', baliky: n });
    const g = geis(o.country, m.zone, kgPal);
    out.push({ dopravce: 'Geis', popis: palTxt, naklad: g.total, odhad: g.odhad, typ: 'paleta', palet: pn, paleta: o.paleta || 'FP' });
    const t = toptrans(o.country, m.km, kgPal);
    if (t) out.push({ dopravce: 'TopTrans', popis: `${palTxt}, ${m.km} km`, naklad: t.total, odhad: false, typ: 'paleta', palet: pn, paleta: o.paleta || 'FP' });
    out.forEach(x => { x.cena = cenaProZakaznika(x.naklad); x.nejlevnejsi = false; });
    out.sort((a, b) => a.naklad - b.naklad);
    if (out[0]) out[0].nejlevnejsi = true;
    return { kg, mesto: m, moznosti: out };
  }

  g.NWDoprava = { PPL, GEIS, TOPTRANS, PALETY, MESTA, ppl, geis, toptrans, navrh, cenaProZakaznika };
})(typeof window !== 'undefined' ? window : globalThis);

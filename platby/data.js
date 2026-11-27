/* Nutworld — B2B platby data. Aktualizovat při každém novém K2 exportu. */
const NW_PLATBY_UPDATED = '27. 11. 2026 (K2 updated)';

const OV_CZK = [
  /* === Urgentní (25+ dní) === */
  {id:'ov_vitr',    n:'Vítr v kapse s.r.o.',          sub:'1 faktura · č. 12337',              amt:'397',         days:39, pri:'r', plbl:'Urgentní', due:'19. 10.', oz:''},
  {id:'ov_kasal',   n:'Jana Kasalová',                 sub:'1 faktura · č. 12497',              amt:'2 772',       days:35, pri:'r', plbl:'Urgentní', due:'23. 10.', oz:''},
  /* ov_tumova uhrazen — K2 ✅ */

  /* === Pozor (10–24 dní) === */
  {id:'ov_vonavy',  n:'Muj vonávy kramek',             sub:'1 faktura · č. 12989',              amt:'739',         days:21, pri:'a', plbl:'Pozor', due:'06. 11.', oz:''},
  {id:'ov_cpr',     n:'CPR HK s.r.o.',                 sub:'5 faktur · č. 398–416',             amt:'10 760',      days:17, pri:'a', plbl:'Pozor', due:'10. 11.', oz:'Jana N.'},
  {id:'ov_saar',    n:'Saar Gummi Czech s.r.o.',       sub:'1 faktura · č. 418',                amt:'23 448,32',   days:14, pri:'a', plbl:'Pozor', due:'13. 11.', oz:'Jan V.'},
  {id:'ov_cpr16',   n:'CPR HK s.r.o.',                 sub:'5 faktur · č. 429–433',             amt:'11 690,25',   days:11, pri:'a', plbl:'Pozor', due:'16. 11.', oz:'Jana N.'},
  {id:'ov_cpr17',   n:'CPR HK s.r.o.',                 sub:'1 faktura · č. 434',                amt:'2 968',       days:10, pri:'a', plbl:'Pozor', due:'17. 11.', oz:'Jana N.'},
  {id:'ov_banalit', n:'Banalita s.r.o.',                sub:'1 faktura · č. 13452',              amt:'955',         days:10, pri:'a', plbl:'Pozor', due:'17. 11.', oz:''},

  /* === 18.–20. 11. === */
  {id:'ov_cpr18',   n:'CPR HK s.r.o.',                 sub:'1 faktura · č. 441',                amt:'3 284,74',    days:9,  pri:'n', plbl:'18.11', due:'18. 11.', oz:'Jana N.'},
  {id:'ov_kas',     n:'K a S, s.r.o.',                  sub:'1 faktura · č. 451',                amt:'16 184',      days:9,  pri:'n', plbl:'18.11', due:'18. 11.', oz:''},
  {id:'ov_cpr19',   n:'CPR HK s.r.o.',                 sub:'3 faktury · č. 457, 459, 460',      amt:'6 829,07',    days:8,  pri:'n', plbl:'19.11', due:'19. 11.', oz:'Jana N.'},
  {id:'ov_mlsoun',  n:'MLSOUN s.r.o.',                  sub:'1 faktura · č. 13629',              amt:'4 658',       days:7,  pri:'n', plbl:'20.11', due:'20. 11.', oz:''},
  {id:'ov_candex',  n:'Candex Solutions Czech s.r.o.',  sub:'1 faktura · č. 463',                amt:'87 180,80',   days:7,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jan V.'},
  {id:'ov_speed20', n:'SPEED PRESS Plus a.s.',          sub:'3 faktury · č. 462, 468, 495',      amt:'52 167,92',   days:7,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Tomáš H.'},
  {id:'ov_cpr20',   n:'CPR HK s.r.o.',                 sub:'4 faktury · č. 461, 465, 466, 472', amt:'19 710,15',   days:7,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jana N.'},
  {id:'ov_atlas',   n:'Atlas Copco s.r.o.',             sub:'1 faktura · č. 464',                amt:'5 292',       days:7,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jan V.'},
  /* ov_alza20 (č.139-141), ov_vino, ov_sport, ov_waxwing, ov_tsp, ov_amt uhrazeny — K2/Fio ✅ */

  /* === 22.–24. 11. === */
  {id:'ov_inafy',   n:'Inafy Estates s.r.o.',          sub:'1 faktura · č. 351',                amt:'12 898,97',   days:5,  pri:'n', plbl:'22.11', due:'22. 11.', oz:''},
  {id:'ov_reda',    n:'REDA a.s.',                     sub:'4 faktury · č. 355, 358, 370, 373', amt:'93 224,50',   days:4,  pri:'n', plbl:'23.11', due:'23. 11.', oz:'Tomáš H.'},
  {id:'ov_knauf',   n:'Knauf Insulation Trading',      sub:'1 faktura · č. 479',                amt:'7 573,44',    days:4,  pri:'n', plbl:'23.11', due:'23. 11.', oz:'Martin W.'},
  {id:'ov_heidel',  n:'Heidelberg Materials CZ, a.s.', sub:'1 faktura · č. 484',                amt:'41 451,20',   days:3,  pri:'n', plbl:'24.11', due:'24. 11.', oz:'Martin W.'},

  /* === 25. 11. === */
  {id:'ov_preralova',n:'Kateřina Přeralová',           sub:'1 faktura · č. 13794',              amt:'4 525',       days:2,  pri:'n', plbl:'25.11', due:'25. 11.', oz:''},
  {id:'ov_zahradn', n:'Zahradn. centrum Brabec',       sub:'1 faktura · č. 13822',              amt:'6 750',       days:2,  pri:'n', plbl:'25.11', due:'25. 11.', oz:''},
  {id:'ov_kasper25',n:'Eliška Kasper',                 sub:'1 faktura · č. 13824',              amt:'4 886',       days:2,  pri:'n', plbl:'25.11', due:'25. 11.', oz:'Martin W.'},
  {id:'ov_cpr25',   n:'CPR HK s.r.o.',                sub:'1 faktura · č. 486',                amt:'14 870,73',   days:2,  pri:'n', plbl:'25.11', due:'25. 11.', oz:'Jana N.'},
  /* ov_conseq uhrazen 2026-11-27 (69,148.80 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_alza25',  n:'Alza.cz a.s.',                 sub:'1 faktura · č. 143',                amt:'153 288,80',  days:2,  pri:'n', plbl:'25.11', due:'25. 11.', oz:'Tomáš H.'},

  /* === 26. 11. === */
  {id:'ov_vinotek', n:'Vinoteká u Pavlůši',            sub:'1 faktura · č. 13847',              amt:'13 402',      days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:''},
  {id:'ov_muller',  n:'MÜLLER GROUP AG s.r.o.',        sub:'1 faktura · č. 13905',              amt:'7 385,30',    days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:''},
  /* ov_stavop uhrazen 2026-11-27 (8,791.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_korabk',  n:'MUDr. Martina Korábková s.r.o.',sub:'1 faktura · č. 13911',              amt:'2 870,43',    days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:''},
  {id:'ov_alza26',  n:'Alza.cz a.s.',                 sub:'2 faktury · č. 146, 147',           amt:'46 872',      days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:'Tomáš H.'},
  {id:'ov_alcomet', n:'Alcometal s.r.o.',              sub:'1 faktura · č. 489',                amt:'86 195,20',   days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:'Jan V.'},
  /* ov_nakup uhrazen 2026-11-26 (44,940.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_saar26',  n:'Saar Gummi Czech s.r.o.',       sub:'1 faktura · č. 491',                amt:'1 172,42',    days:1,  pri:'n', plbl:'26.11', due:'26. 11.', oz:'Jan V.'},
  /* ov_imi uhrazen 2026-11-26 (26,444.32 Kč, Δ0.00) — Fio ✅ */
  /* === 27. 11. — splatnost DNES === */
  {id:'ov_lerch27', n:'Tomáš Lerch',                   sub:'1 faktura · č. 13921',              amt:'9 605',       days:0,  pri:'n', plbl:'27.11', due:'27. 11.', oz:''},
  /* ov_ekvita uhrazen 2026-11-26 (19,241.26 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_corpin',  n:'CORPIN, a.s.',                  sub:'1 faktura · č. 501',                amt:'41 132',      days:0,  pri:'n', plbl:'27.11', due:'27. 11.', oz:'Martin W.'},
  /* ov_hit uhrazen 2026-11-27 (10,634.40 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_zsspice', n:'ZŠ Špice – Lány',               sub:'1 faktura · č. 505',                amt:'10 315,20',   days:0,  pri:'n', plbl:'27.11', due:'27. 11.', oz:''},
  /* ov_alza27 uhrazen 2026-11-27 (61,734.85 Kč, Δ0.00) — Fio ✅ */
];

const OV_EUR = [
  {id:'oe_moss',    n:'MOSS.SK s.r.o.',                fakt:'č. 162',  days:42, pri:'r', plbl:'Urgentní',  due:'16. 10.', amt:'10,23',    oz:'Markéta C.'},
  {id:'oe_pavuk',   n:'Marián Pavúk',                  fakt:'č. 182',  days:22, pri:'a', plbl:'Pozor',     due:'05. 11.', amt:'57,36',    oz:''},
  {id:'oe_orig',    n:'Originale production s.r.o.',   fakt:'č. 183',  days:22, pri:'a', plbl:'Pozor',     due:'05. 11.', amt:'88,12',    oz:'Jan V.'},
  {id:'oe_metro',   n:'METROSTAV ESTATE A.S.',          fakt:'č. 48',   days:14, pri:'a', plbl:'13.11',     due:'13. 11.', amt:'1 824,00', oz:'Jan V.'},
  {id:'oe_pdvaj',   n:'PD Vajnory',                    fakt:'č. 194',  days:14, pri:'n', plbl:'13.11',     due:'13. 11.', amt:'90,68',    oz:''},
  {id:'oe_arma',    n:'Armaplast s.r.o.',               fakt:'č. 198',  days:8,  pri:'n', plbl:'19.11',     due:'19. 11.', amt:'128,45',   oz:''},
  {id:'oe_racing',  n:'RACING CAR s.r.o.',              fakt:'č. 201',  days:3,  pri:'n', plbl:'24.11',     due:'24. 11.', amt:'71,55',    oz:''},
  {id:'oe_ycorp',   n:'Y-corp s.r.o.',                 fakt:'č. 204',  days:2,  pri:'n', plbl:'25.11',     due:'25. 11.', amt:'520,00',   oz:''},
  {id:'oe_skola',   n:'Súkromná základná škola',        fakt:'č. 3059', days:1,  pri:'n', plbl:'26.11',     due:'26. 11.', amt:'74,79',    oz:''},
  {id:'oe_advant',  n:'Advantage spol. s r.o.',         fakt:'č. 54',   days:1,  pri:'n', plbl:'26.11',     due:'26. 11.', amt:'420,60',   oz:'Martin W.'},
  {id:'oe_srdcofk', n:'Ivana Madajová – Srdcofka',     fakt:'č. 205',  days:0,  pri:'n', plbl:'27.11',     due:'27. 11.', amt:'483,41',   oz:''},
  {id:'oe_post206', n:'POST Servis s.r.o.',              fakt:'č. 206',  days:0,  pri:'n', plbl:'27.11',     due:'27. 11.', amt:'236,19',   oz:'Tomáš H.'},
  {id:'oe_og55',    n:'OG s.r.o.',                     fakt:'č. 55',   days:0,  pri:'n', plbl:'27.11',     due:'27. 11.', amt:'340,20',   oz:''},
  /* oe_post190, oe_sketch199, oe_dez, oe_jufa196, oe_lamelland, oe_rechtys, oe_proreco uhrazeny — K2/Fio ✅ */
];

const SOON_CZK = [
  {date:'28. 11. 2026', lbl:'ZÍTRA', cls:'s', rows:[
    {id:'sc_alza28',      n:'Alza.cz a.s.',                      fakt:'149, 150, 151', amt:'408 800',    oz:'Tomáš H.'},
    {id:'sc_vilgain28',   n:'Vilgain s.r.o.',                    fakt:'383, 384',      amt:'50 548',     oz:'Tomáš H.'},
    {id:'sc_absjets',     n:'ABS Jets, a.s.',                    fakt:'506',           amt:'47 544',     oz:'Jan V.'},
    {id:'sc_olympic28a',  n:'Olympic Palace s.r.o.',             fakt:'475',           amt:'15 721,44',  oz:'Martin W.'},
    {id:'sc_danarj',      n:'Účetní a daňový ráj s.r.o.',        fakt:'14356',         amt:'5 698',      oz:''},
    {id:'sc_kavanova28',  n:'Veronika Kavanová',                 fakt:'14462',         amt:'1 189',      oz:'Markéta C.'},
    {id:'sc_speed28',     n:'SPEED PRESS Plus a.s.',             fakt:'507',           amt:'1 178,69',   oz:'Tomáš H.'},
  ]},
  {date:'30. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_olympic28b',  n:'Olympic Palace s.r.o.',             fakt:'477',           amt:'8 468,77',   oz:'Martin W.'},
    {id:'sc_sans508',     n:'SANS Products s.r.o.',               fakt:'508',           amt:'22 153,60',  oz:''},
    {id:'sc_vargova509',  n:'Markéta Vargová Mačáková s.r.o.',   fakt:'509',           amt:'19 308,80',  oz:''},
    {id:'sc_fashion14007',n:'Fashion-work s.r.o.',               fakt:'14007',         amt:'16 698',     oz:''},
    {id:'sc_zahrstas',    n:'Zahradnictví Šťastný spol. s r.o.', fakt:'14019',         amt:'14 546',     oz:''},
    {id:'sc_emedis511',   n:'EMEDIS s.r.o.',                     fakt:'511',           amt:'8 100',      oz:''},
    {id:'sc_gamaoc',      n:'GAMA OCEL, spol. s r.o.',           fakt:'510',           amt:'5 308,80',   oz:''},
    {id:'sc_trikorda',    n:'Tříša Kordová',                     fakt:'14420',         amt:'4 768',      oz:''},
    {id:'sc_medistore',   n:'Medi Store s.r.o.',                 fakt:'14452',         amt:'1 128',      oz:''},
  ]},
  {date:'1. 12. 2026', lbl:'', cls:'', rows:[
    {id:'sc_carbide',     n:'CARBIDE, s.r.o.',                   fakt:'512',           amt:'81 900',     oz:''},
    {id:'sc_emedis514',   n:'EMEDIS s.r.o.',                     fakt:'514',           amt:'18 144',     oz:''},
    {id:'sc_emedis516',   n:'EMEDIS s.r.o.',                     fakt:'516',           amt:'7 560',      oz:''},
    {id:'sc_pragocl',     n:'PRAGOCLIMA, spol. s r.o.',          fakt:'513',           amt:'10 920',     oz:''},
    {id:'sc_vhv',         n:'V.H.V. s.r.o.',                    fakt:'14048',         amt:'5 296',      oz:''},
    {id:'sc_achird',      n:'Achird s.r.o.',                     fakt:'14051',         amt:'5 531',      oz:''},
    {id:'sc_geum',        n:'GEUM s.r.o.',                       fakt:'14052',         amt:'8 492',      oz:''},
    {id:'sc_goldova',     n:'Leona Goldová',                     fakt:'14091',         amt:'3 402',      oz:''},
    {id:'sc_asscs',       n:'Asociace č. stav. spořitelen',      fakt:'515',           amt:'2 402,40',   oz:''},
    {id:'sc_svachtova',   n:'Dana Švachtová',                    fakt:'14094',         amt:'2 695',      oz:''},
    {id:'sc_kailova',     n:'Alena Kailová',                     fakt:'14056',         amt:'3 306',      oz:''},
    {id:'sc_tompat',      n:'Tom&Pat brothers s.r.o.',           fakt:'14100',         amt:'582',        oz:''},
  ]},
  {date:'2. 12. 2026', lbl:'', cls:'', rows:[
    {id:'sc_duskovi',     n:'DUŠKOVÍ s.r.o.',                    fakt:'14447',         amt:'41 316',     oz:''},
    {id:'sc_antikor',     n:'Antikor CZ s.r.o.',                 fakt:'518',           amt:'22 596',     oz:''},
    {id:'sc_koop',        n:'Kooperativa pojišťovna',            fakt:'519',           amt:'39 543,84',  oz:''},
    {id:'sc_hsekomin',    n:'HS EkoMin s.r.o.',                  fakt:'14380',         amt:'4 774',      oz:''},
    {id:'sc_jstastna',    n:'Jana Šťastná',                      fakt:'14026',         amt:'1 539',      oz:''},
  ]},
  {date:'3. 12. 2026', lbl:'', cls:'', rows:[
    {id:'sc_cpr525',      n:'CPR HK s.r.o.',                    fakt:'525',           amt:'26 588,80',  oz:'Jana N.'},
    {id:'sc_ergotep',     n:'ERGOTEP, družstvo',                fakt:'522',           amt:'19 678,40',  oz:''},
    {id:'sc_dekonta',     n:'DEKONTA, a.s.',                     fakt:'14234',         amt:'17 514',     oz:''},
    {id:'sc_opencent',    n:'Open Century s.r.o.',               fakt:'523',           amt:'17 460,80',  oz:''},
    {id:'sc_ilpopk',      n:'Ilona Popková',                     fakt:'524',           amt:'9 822,40',   oz:''},
    {id:'sc_timeair',     n:'Time Air, s.r.o.',                  fakt:'520',           amt:'7 784',      oz:''},
    {id:'sc_dsk',         n:'DSK Stavebniny s.r.o.',             fakt:'521',           amt:'6 619,20',   oz:''},
    {id:'sc_stankovo',    n:'STÁN KOVO s.r.o.',                  fakt:'14328',         amt:'3 225',      oz:''},
    {id:'sc_lukmacha',    n:'Lukáš Macháček',                    fakt:'14341',         amt:'1 264',      oz:''},
    {id:'sc_bahrami',     n:'Bahram Bahrami',                    fakt:'14661',         amt:'1 223',      oz:''},
    {id:'sc_msostrov',    n:'MŠ Ostrov, Halasova 765',           fakt:'14344',         amt:'985',        oz:''},
  ]},
  {date:'4. 12. 2026', lbl:'', cls:'', rows:[
    {id:'sc_aventas',     n:'AVENTAS s.r.o., advok. kancelář',  fakt:'527',           amt:'39 793,60',  oz:''},
    {id:'sc_familium',    n:'Familium s.r.o.',                   fakt:'528',           amt:'39 872',     oz:''},
    {id:'sc_strojtrn',    n:'Strojárny a stavby Třinec, a.s.',  fakt:'403',           amt:'31 920',     oz:'Markéta C.'},
    {id:'sc_emedis530',   n:'EMEDIS s.r.o.',                     fakt:'530',           amt:'14 718,46',  oz:''},
    {id:'sc_cpr535',      n:'CPR HK s.r.o.',                    fakt:'535',           amt:'11 054,40',  oz:'Jana N.'},
    {id:'sc_quiq',        n:'QUIQ s.r.o.',                       fakt:'532',           amt:'9 732,80',   oz:''},
    {id:'sc_devinn',      n:'DEVINN s.r.o.',                     fakt:'534',           amt:'8 568',      oz:''},
    {id:'sc_sladkepot',   n:'Sladké potěšení a dárečky',         fakt:'14360',         amt:'5 734',      oz:''},
    {id:'sc_zahrskok',    n:'Zahradnictví Škoda',                fakt:'14359',         amt:'3 696',      oz:''},
    {id:'sc_evenpro',     n:'Evenpro Marketing s.r.o.',          fakt:'533',           amt:'3 281,60',   oz:''},
    {id:'sc_hostkopec',   n:'Hostinec Na Kopečku s.r.o.',        fakt:'14361',         amt:'2 405',      oz:''},
  ]},
];

const SOON_EUR = [
  {id:'se_nemergut',   n:'Bc. Lukáš Nemergut – MGNG',  fakt:'č. 218',  due:'28. 11.', amt:'176,40',    oz:''},
  {id:'se_agrin',      n:'Agrin, s.r.o.',               fakt:'č. 56',   due:'30. 11.', amt:'142,00',    oz:''},
  {id:'se_valve',      n:'Valve Trade s.r.o.',           fakt:'č. 57',   due:'30. 11.', amt:'673,00',    oz:''},
  {id:'se_umakov',     n:'UMAKOV GROUP, A.S.',           fakt:'č. 58',   due:'01. 12.', amt:'744,50',    oz:''},
  {id:'se_stavikom',   n:'Stavikom s.r.o.',              fakt:'č. 59',   due:'01. 12.', amt:'891,60',    oz:''},
  {id:'se_mapplus',    n:'MaP plus, s.r.o.',             fakt:'č. 60',   due:'02. 12.', amt:'622,64',    oz:''},
  {id:'se_grandvino',  n:'Grandvino, s. r. o.',          fakt:'č. 213',  due:'02. 12.', amt:'348,94',    oz:''},
  {id:'se_jufa215',    n:'JUFA s.r.o.',                  fakt:'č. 215',  due:'02. 12.', amt:'170,75',    oz:''},
  {id:'se_fores',      n:'ForesServices, s. r. o.',      fakt:'č. 61',   due:'03. 12.', amt:'1 910,47',  oz:''},
  {id:'se_raven',      n:'RAVEN, a.s.',                  fakt:'č. 62',   due:'03. 12.', amt:'669,50',    oz:''},
  {id:'se_revels',     n:'REVELS s.r.o.',                fakt:'č. 63',   due:'03. 12.', amt:'120,16',    oz:''},
  {id:'se_ripit',      n:'Ripit. s.r.o.',                fakt:'č. 217',  due:'04. 12.', amt:'95,26',     oz:''},
  {id:'se_srdcofk219', n:'Ivana Madajová – Srdcofka',    fakt:'č. 219',  due:'04. 12.', amt:'315,13',    oz:''},
];

const LATER_CZK = [
  {id:'la_alza',    n:'Alza.cz a.s.',          fakt:'č. 152–195 (40+ fakt.)', due:'29.11–27.12', amt:'miliony Kč',  approx:true, oz:'Tomáš H.'},
  {id:'la_vilgain', n:'Vilgain s.r.o.',          fakt:'č. 453, 499',           due:'12.–19. 12.', amt:'281 413',    oz:'Tomáš H.'},
  {id:'la_albi',    n:'Albi ČR s.r.o.',          fakt:'č. 503',                due:'20. 12.',     amt:'139 104',    oz:'Tomáš H.'},
  {id:'la_heineken',n:'Heineken ČR, a.s.',        fakt:'č. 428',                due:'10. 12.',     amt:'79 195,20',  oz:'Jan V.'},
  {id:'la_vuuo',    n:'VÚÚO Holovousy s.r.o.',   fakt:'č. 14008',              due:'07. 12.',     amt:'74 603',     oz:''},
  {id:'la_reda',    n:'REDA a.s.',               fakt:'č. 408, 450, 469–478',  due:'05.–16. 12.', amt:'~237 000',   approx:true, oz:'Tomáš H.'},
  {id:'la_cpr517',  n:'CPR HK s.r.o.',           fakt:'č. 517',                due:'09. 12.',     amt:'13 752,48',  oz:'Jana N.'},
  {id:'la_inafy526',n:'Inafy Estates s.r.o.',    fakt:'č. 526',                due:'26. 12.',     amt:'25 457,25',  oz:''},
  {id:'la_inafy409',n:'Inafy Estates s.r.o.',    fakt:'č. 409',                due:'05. 12.',     amt:'12 817,95',  oz:''},
  {id:'la_jpservis',n:'JPServis, a.s.',           fakt:'č. 529, 531',           due:'27. 12.',     amt:'15 859,20',  oz:''},
  {id:'la_pematex', n:'Pematex s.r.o.',           fakt:'č. 13367, 13374',       due:'07. 12.',     amt:'6 436',      oz:'Jana N.'},
];

const LATER_EUR = [];

const B2C_SK_PENDING = [
  {code:'2026003465', n:'SNP Capital Energy s.r.o.', amt:'151.20', ccy:'EUR', date:'2026-11-25', paid:true, bank_date:'', bank_sender:''},
  {code:'2026003460', n:'—', amt:'59.60', ccy:'EUR', date:'2026-11-25', paid:true, bank_date:'2026-11-25', bank_sender:'Zuzana Nestorikova'},
  {code:'2026003458', n:'Levare Cable s.r.o.', amt:'730.80', ccy:'EUR', date:'2026-11-25', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003456', n:'L.A.M. TRANS, s.r.o.', amt:'142.04', ccy:'EUR', date:'2026-11-25', paid:true, bank_date:'2026-11-27', bank_sender:'L.A.M. TRANS, s.r.o.'},
  {code:'2026003425', n:'—', amt:'33.09', ccy:'EUR', date:'2026-11-22', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003415', n:'—', amt:'60.90', ccy:'EUR', date:'2026-11-21', paid:true, bank_date:'2026-11-21', bank_sender:'Iveta Burikova'},
  {code:'2026003398', n:'—', amt:'66.30', ccy:'EUR', date:'2026-11-20', paid:true, bank_date:'2026-11-20', bank_sender:'BENEDIK JULIA'},
];

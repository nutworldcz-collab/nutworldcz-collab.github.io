/* Nutworld — B2B platby data. Aktualizovat při každém novém K2 exportu. */
const NW_PLATBY_UPDATED = '16. 11. 2026 (bank-matched)';

const OV_CZK = [
  /* === 25+ dní — Urgentní === */
  {id:'ov_alza',    n:'Alza.cz a.s.',                 sub:'2 faktury + 2 dobropisy (č.133 uhrazeno)', amt:'33 352',    days:29, pri:'r', plbl:'Urgentní', due:'18. 10.'},
  {id:'ov_vitr',    n:'Vítr v kapse s.r.o.',          sub:'1 faktura · č. 12337',    amt:'397',       days:28, pri:'r', plbl:'Urgentní', due:'19. 10.'},
  {id:'ov_speed',   n:'SPEED PRESS Plus a.s.',        sub:'4 faktury · č. 328, 377, 388, 402', amt:'98 857', days:25, pri:'r', plbl:'Urgentní', due:'22. 10.'},
  {id:'ov_reda',    n:'REDA a.s.',                    sub:'1 faktura · č. 283 (7 uhrazeno 16.11)', amt:'57 490',    days:25, pri:'r', plbl:'Urgentní', due:'22. 10.'},
  {id:'ov_kasal',   n:'Jana Kasalová',                sub:'1 faktura · č. 12497',    amt:'2 772',     days:24, pri:'r', plbl:'Urgentní', due:'23. 10.'},
  /* === 10–19 dní — Pozor === */
  {id:'ov_kolar',   n:'Michal Kolář',                 sub:'1 faktura · č. 359',      amt:'52 630',    days:14, pri:'a', plbl:'Pozor',    due:'02. 11.'},
  /* ov_kram — Farmářskej krámek uhrazen 12.11 (7 984 Kč) */
  {id:'ov_emedis',  n:'EMEDIS s.r.o.',                sub:'7 faktur · č. 371–421',   amt:'151 577',   days:12, pri:'a', plbl:'Pozor',    due:'04. 11.'},
  /* ov_benkor — BENKOR uhrazen 12.11 net 19 449 Kč (č.380 − dobropis č.439) */
  /* ov_jested — Ještěd uhrazen 12.11 (11 312 Kč) */
  /* ov_linet — LINET uhrazen 13.11 (9 688 Kč) */
  {id:'ov_nakup',   n:'Nakup na Dobro s.r.o.',        sub:'1 faktura · č. 387',      amt:'152 038',   days:10, pri:'a', plbl:'Pozor',    due:'06. 11.'},
  {id:'ov_vonavy',  n:'Muj vonávy kramek',            sub:'1 faktura · č. 12989',    amt:'739',       days:10, pri:'a', plbl:'Pozor',    due:'06. 11.'},
  /* === 5–9 dní — Pozor === */
  /* ov_helik — Helikárová uhrazena 16.11 (8 828 Kč) */
  {id:'ov_ardix',   n:'ARDIX spol. s r.o.',           sub:'1 faktura · č. 395',      amt:'13 798',    days:7,  pri:'a', plbl:'Pozor',    due:'09. 11.'},
  /* ov_huber — HUBER CS uhrazen 16.11 (13 048 Kč) */
  {id:'ov_syrarna', n:'Sýrárna Broumov s.r.o.',       sub:'1 faktura · č. 396',      amt:'8 109',     days:6,  pri:'a', plbl:'6 dní',    due:'10. 11.'},
  {id:'ov_cpr',     n:'CPR HK s.r.o.',                sub:'5 faktur · č. 398–416',   amt:'10 760',    days:6,  pri:'a', plbl:'6 dní',    due:'10. 11.'},
  {id:'ov_zlkl',    n:'ZLKL, s. r. o.',               sub:'1 faktura · č. 404',      amt:'140 235',   days:5,  pri:'a', plbl:'5 dní',    due:'11. 11.'},
  {id:'ov_vilgain', n:'Vilgain s.r.o.',               sub:'2 faktury · č. 309, 327', amt:'125 480',   days:5,  pri:'a', plbl:'5 dní',    due:'11. 11.'},
  /* ov_arch — Arch.Design uhrazen 13.11 (20 328 Kč) */
  /* === 4 dny === */
  /* ov_tes — TES Consulting uhrazen 12.11 (25 300 Kč) */
  {id:'ov_dfszk',   n:'DFSZK, s.r.o.',                sub:'1 faktura · č. 13260',    amt:'1 554',     days:4,  pri:'n', plbl:'4 dny',    due:'12. 11.'},
  /* === 3 dny — přešlo z "do 5 dní" 13.11 === */
  {id:'ov_certis',  n:'Certis Belchim Czech Republic', sub:'1 faktura · č. 414',      amt:'111 104',   days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  {id:'ov_bmt',     n:'BMT Medical Technology s.r.o.', sub:'1 faktura · č. 417',      amt:'46 234',    days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  {id:'ov_vuuo',    n:'VÚÚO Holovousy s.r.o.',        sub:'1 faktura · č. 12985',    amt:'46 087',    days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  {id:'ov_vaillant',n:'Vaillant Group Czech Republic', sub:'1 faktura · č. 413',      amt:'28 334',    days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  {id:'ov_saar',    n:'Saar Gummi Czech s.r.o.',      sub:'1 faktura · č. 418',      amt:'23 448',    days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  /* ov_janamala — Jana Malá uhrazena 13.11 (7 577 Kč) */
  {id:'ov_hsekomin',n:'HS EkoMin s.r.o.',             sub:'1 faktura · č. 13280',    amt:'4 557',     days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.'},
  /* ov_stepek — Jiří Štěpek uhrazen 12.11 (2 258 Kč) */
];

const OV_EUR = [
  {id:'oe_moss',      n:'MOSS.SK s.r.o.',               fakt:'č. 162', days:31, pri:'r', plbl:'Urgentní', due:'16. 10.', amt:'10,23'},
  {id:'oe_pavuk',     n:'Marián Pavúk',                  fakt:'č. 182', days:11, pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'57,36'},
  {id:'oe_orig',      n:'Originale production s.r.o.',   fakt:'č. 183', days:11, pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'88,12'},
  {id:'oe_nelli',     n:'NELLI oblátky s.r.o.',          fakt:'č. 186', days:7,  pri:'a', plbl:'Pozor',    due:'09. 11.', amt:'165,30'},
  {id:'oe_sketch',    n:'Sketch s. r. o.',               fakt:'č. 188', days:6,  pri:'a', plbl:'6 dní',    due:'10. 11.', amt:'261,80'},
  {id:'oe_post',      n:'POST Servis s.r.o.',            fakt:'č. 190', days:6,  pri:'a', plbl:'6 dní',    due:'10. 11.', amt:'177,86'},
  {id:'oe_lamelland', n:'LAMELLAND, s.r.o.',             fakt:'č. 47',  days:4,  pri:'n', plbl:'4 dny',    due:'12. 11.', amt:'519,60'},
  /* přešlo z "do 5 dní" 13.11 */
  {id:'oe_metrostav', n:'METROSTAV ESTATE A.S.',         fakt:'č. 48',  days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.', amt:'1 824,00'},
  {id:'oe_elpatt',    n:'ELPATT spol. s r. o.',          fakt:'č. 49',  days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.', amt:'451,00'},
  {id:'oe_pd_vajnory',n:'PD Vajnory',                    fakt:'č. 194', days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.', amt:'90,68'},
];

const SOON_CZK = [
  {date:'16. 11. 2026', lbl:'DNES', cls:'t', rows:[
    {id:'sc_alza16',   n:'Alza.cz a.s.',                      fakt:'134, 419',      amt:'286 649,44'},
    {id:'sc_heineken', n:'Heineken ČR',                       fakt:'428',           amt:'79 195,20'},
    {id:'sc_chem',     n:'AS CHEMOPRAG',                      fakt:'427',           amt:'24 202,98'},
    {id:'sc_brand',    n:'BRAND CONCEPT',                     fakt:'423, 424',      amt:'17 722,88'},
    {id:'sc_cpr16',    n:'CPR HK s.r.o.',                     fakt:'429–433',       amt:'11 690,25'},
    {id:'sc_ikv',      n:'I.K.V., s.r.o.',                    fakt:'422',           amt:'8 232,00'},
    {id:'sc_geum',     n:'GEUM s.r.o.',                       fakt:'13429',         amt:'7 954,00'},
    {id:'sc_kasper',   n:'Eliška Kasper',                     fakt:'13401',         amt:'6 544,00'},
    {id:'sc_olympic16',n:'Olympic Palace',                    fakt:'392',           amt:'6 265,84'},
    {id:'sc_helik16',  n:'Markéta Helikárová',                fakt:'13411',         amt:'4 533,00'},
    {id:'sc_kavanova', n:'Veronika Kavanová',                 fakt:'13400',         amt:'2 384,00'},
    {id:'sc_dasicka',  n:'Dašická s.r.o.',                    fakt:'425',           amt:'2 184,00'},
  ]},
  {date:'17. 11. 2026', lbl:'ZÍTRA', cls:'s', rows:[
    {id:'sc_greenswan',n:'Green-Swan Pharmaceuticals',        fakt:'438',           amt:'102 821,60'},
    {id:'sc_imi17',    n:'IMI Partner',                       fakt:'440',           amt:'29 388,80'},
    {id:'sc_nachod',   n:'MĚSTO NÁCHOD',                      fakt:'436',           amt:'28 112,00'},
    {id:'sc_kovintrade',n:'KOVINTRADE Praha',                 fakt:'437',           amt:'13 832,00'},
    {id:'sc_ikme',     n:'Institut klinické a exp. medicíny', fakt:'435',           amt:'12 526,08'},
    {id:'sc_olympic17',n:'Olympic Palace',                    fakt:'399',           amt:'7 526,40'},
    {id:'sc_amt',      n:'AMT AUTO - SKLA',                   fakt:'13485',         amt:'6 510,00'},
    {id:'sc_jana17',   n:'Ing. Jana Malá',                    fakt:'13440',         amt:'5 027,00'},
    {id:'sc_cpr17',    n:'CPR HK s.r.o.',                     fakt:'434',           amt:'2 968,00'},
    {id:'sc_tsp',      n:'TSP DATA',                          fakt:'13474',         amt:'1 602,31'},
    {id:'sc_banalita', n:'Banalita s.r.o.',                   fakt:'13452',         amt:'955,00'},
    {id:'sc_benkor17', n:'BENKOR (dobropis)',                  fakt:'439',           amt:'−8 338,40', credit:true},
  ]},
  {date:'18. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_iframix',  n:'IFRAMIX',                           fakt:'442',           amt:'58 800,00'},
    {id:'sc_alza18',   n:'Alza.cz a.s.',                      fakt:'135, 136',      amt:'48 429,70'},
    {id:'sc_schinkmann',n:'SCHINKMANN',                       fakt:'443',           amt:'20 328,00'},
    {id:'sc_kas',      n:'K a S, s.r.o.',                     fakt:'451',           amt:'16 184,00'},
    {id:'sc_euro_pool',n:'Euro Pool System CZ',               fakt:'445',           amt:'14 488,32'},
    {id:'sc_emedis18', n:'EMEDIS s.r.o.',                     fakt:'444',           amt:'14 053,92'},
    {id:'sc_imi18',    n:'IMI Partner',                       fakt:'447',           amt:'12 073,60'},
    {id:'sc_sport',    n:'SPORT HOTÁREK',                     fakt:'13518',         amt:'7 832,00'},
    {id:'sc_ms_pod',   n:'MŠ Poděbrady',                      fakt:'446, 448, 449', amt:'7 084,00'},
    {id:'sc_cpr18',    n:'CPR HK s.r.o.',                     fakt:'441',           amt:'3 284,74'},
    {id:'sc_waxwing',  n:'WAXWING',                           fakt:'13517',         amt:'3 038,00'},
  ]},
];

const SOON_EUR = [
  {id:'se_sketch17',  n:'Sketch s.r.o.',  fakt:'196', due:'17. 11.', amt:'507,20'},
  {id:'se_jufa',      n:'JUFA s.r.o.',    fakt:'197', due:'17. 11.', amt:'226,40'},
  {id:'se_solarny',   n:'SOLARNY DOM',    fakt:'50',  due:'18. 11.', amt:'297,20'},
];

const LATER_CZK = [
  {id:'la_alza',    n:'Alza.cz a.s.',           fakt:'137–183 (40+ fakt.)', due:'19.11–12.12', amt:'miliony Kč',  approx:true},
  {id:'la_reda',    n:'REDA a.s.',              fakt:'342–471 (10+ fakt.)', due:'19. 11.',      amt:'~404 000+',   approx:true},
  {id:'la_vilgain', n:'Vilgain s.r.o.',         fakt:'383, 384, 453',       due:'—',            amt:'281 413,44'},
  {id:'la_candex',  n:'Candex Solutions',       fakt:'463',                 due:'20. 11.',      amt:'87 180,80'},
  {id:'la_brno',    n:'Statutární město Brno',  fakt:'407',                 due:'04. 12.',      amt:'64 344,00'},
  {id:'la_speed',   n:'SPEED PRESS Plus a.s.',  fakt:'462, 468',            due:'20. 11.',      amt:'39 483,92'},
  {id:'la_strojy',  n:'Strojárny Třinec',       fakt:'403',                 due:'04. 12.',      amt:'31 920,00'},
  {id:'la_inafy',   n:'Inafy Estates',          fakt:'351, 409',            due:'—',            amt:'25 716,92'},
  {id:'la_pematex', n:'Pematex',                fakt:'12821, 13367, 13374', due:'—',            amt:'8 630,00'},
];

const LATER_EUR = [
  {id:'le_proreco', n:'PRORECO s.r.o.',  fakt:'52',  due:'20. 11.', amt:'3 435,60'},
  {id:'le_rechtys', n:'Rechtys spol.',   fakt:'51',  due:'19. 11.', amt:'1 814,00'},
  {id:'le_sketch',  n:'Sketch s.r.o.',  fakt:'199', due:'19. 11.', amt:'165,30'},
  {id:'le_dez',     n:'DeZ spol.',       fakt:'200', due:'20. 11.', amt:'161,10'},
  {id:'le_arma',    n:'Armaplast',       fakt:'198', due:'19. 11.', amt:'128,45'},
];

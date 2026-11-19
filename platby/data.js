/* Nutworld — B2B platby data. Aktualizovat při každém novém K2 exportu. */
const NW_PLATBY_UPDATED = '19. 11. 2026 (K2 updated)';

const OV_CZK = [
  /* === 25+ dní — Urgentní === */
  /* ov_alza — Alza.cz všechny faktury uhrazeny: č.133 uhrazena 16.11, č.131 (31 828 Kč) + č.132 (23 827 Kč) uhrazeny 12.11 — zbývají jen 2 dobropisy jako kredity */
  {id:'ov_vitr',    n:'Vítr v kapse s.r.o.',          sub:'1 faktura · č. 12337',    amt:'397',       days:28, pri:'r', plbl:'Urgentní', due:'19. 10.'},
  /* ov_speed — SPEED PRESS Plus uhrazen 18.11 (98 856,80 Kč) — VS 202600328/377/388/402 */
  {id:'ov_reda',    n:'REDA a.s.',                    sub:'1 faktura · č. 283 (7 uhrazeno 16.11)', amt:'57 490',    days:25, pri:'r', plbl:'Urgentní', due:'22. 10.'},
  {id:'ov_kasal',   n:'Jana Kasalová',                sub:'1 faktura · č. 12497',    amt:'2 772',     days:24, pri:'r', plbl:'Urgentní', due:'23. 10.'},
  /* === 10–19 dní — Pozor === */
  {id:'ov_kolar',   n:'Michal Kolář',                 sub:'1 faktura · č. 359',      amt:'52 630',    days:14, pri:'a', plbl:'Pozor',    due:'02. 11.'},
  /* ov_kram — Farmářskej krámek uhrazen 12.11 (7 984 Kč) */
  {id:'ov_emedis',  n:'EMEDIS s.r.o.',                sub:'5 faktur · č. 374–421 (2 uh. 13.11 — 52 999 Kč)',        amt:'98 578,60', days:12, pri:'a', plbl:'Pozor',    due:'04. 11.'},
  /* ov_benkor — BENKOR uhrazen 12.11 net 19 449 Kč (č.380 − dobropis č.439) */
  /* ov_jested — Ještěd uhrazen 12.11 (11 312 Kč) */
  /* ov_linet — LINET uhrazen 13.11 (9 688 Kč) */
  /* ov_nakup — Nakup na Dobro uhrazena 16.11 (152 037,76 Kč) */
  {id:'ov_vonavy',  n:'Muj vonávy kramek',            sub:'1 faktura · č. 12989',    amt:'739',       days:10, pri:'a', plbl:'Pozor',    due:'06. 11.'},
  /* === 5–9 dní — Pozor === */
  /* ov_helik — Helikárová uhrazena 16.11 (8 828 Kč) */
  /* ov_ardix — ARDIX uhrazena 16.11 (13 798,40 Kč) */
  /* ov_huber — HUBER CS uhrazen 16.11 (13 048 Kč) */
  /* ov_syrarna — Sýrárna Broumov uhrazena 19.11 (8 108,80 Kč) — VS 202600396 */
  {id:'ov_cpr',     n:'CPR HK s.r.o.',                sub:'5 faktur · č. 398–416',   amt:'10 760',    days:6,  pri:'a', plbl:'6 dní',    due:'10. 11.'},
  /* ov_zlkl — ZLKL uhrazen 18.11 (140 235,20 Kč) — VS 030272502 */
  {id:'ov_vilgain', n:'Vilgain s.r.o.',               sub:'1 faktura · č. 327 (předchozí uh. 16.11)',  amt:'50 158', days:5, pri:'a', plbl:'5 dní', due:'11. 11.'},
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

  /* === přešlo z "do 5 dní" 19.11 (spl. 16. 11.) — 3 dny === */
  {id:'ov_alza16',     n:'Alza.cz a.s.',                 sub:'2 faktury · č. 134, 419',      amt:'286 649,44', days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  {id:'ov_heineken',   n:'Heineken ČR',                  sub:'1 faktura · č. 428',           amt:'79 195,20',  days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  /* ov_chem — AS CHEMOPRAG uhrazen 16.11 (24 202,98 Kč) — Fio VS=202600427 */
  {id:'ov_brand',      n:'BRAND CONCEPT',                sub:'2 faktury · č. 423, 424',      amt:'17 722,88',  days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  {id:'ov_cpr16',      n:'CPR HK s.r.o.',                sub:'5 faktur · č. 429–433',        amt:'11 690,25',  days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  /* ov_ikv — I.K.V. uhrazen 16.11 (8 232 Kč) — Fio VS=202600422 */
  /* ov_geum — GEUM uhrazen 12.11 (7 954 Kč) — Fio bank-match */
  {id:'ov_kasper16',   n:'Eliška Kasper',                sub:'1 faktura · č. 13401',         amt:'6 544',      days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  {id:'ov_olympic16',  n:'Olympic Palace',               sub:'1 faktura · č. 392',           amt:'6 265,84',   days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  {id:'ov_helik16',    n:'Markéta Helikárová',           sub:'1 faktura · č. 13411',         amt:'4 533',      days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  {id:'ov_kavanova',   n:'Veronika Kavanová',            sub:'1 faktura · č. 13400',         amt:'2 384',      days:3, pri:'n', plbl:'3 dny', due:'16. 11.'},
  /* ov_dasicka — Dašická uhrazena 12.11 (2 184 Kč) — Fio VS=202600425 */

  /* === přešlo z "do 5 dní" 19.11 (spl. 17. 11.) — 2 dny === */
  {id:'ov_greenswan',  n:'Green-Swan Pharmaceuticals',   sub:'1 faktura · č. 438',           amt:'102 821,60', days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  {id:'ov_imi17',      n:'IMI Partner',                  sub:'1 faktura · č. 440',           amt:'29 388,80',  days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  /* ov_nachod — MĚSTO NÁCHOD uhrazeno 16.11 (28 112 Kč) — Fio VS=202600436 */
  /* ov_kovintrade — KOVINTRADE Praha uhrazen 18.11 (13 832 Kč) — Fio VS=202600437 */
  {id:'ov_ikme',       n:'Institut klinické a exp. med.', sub:'1 faktura · č. 435',          amt:'12 526,08',  days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  {id:'ov_olympic17',  n:'Olympic Palace',               sub:'1 faktura · č. 399',           amt:'7 526,40',   days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  {id:'ov_amt',        n:'AMT AUTO - SKLA',              sub:'1 faktura · č. 13485',         amt:'6 510',      days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  /* ov_jana17 — Ing. Jana Malá uhrazena 17.11 (5 027 Kč) — Fio jméno+částka */
  {id:'ov_cpr17',      n:'CPR HK s.r.o.',                sub:'1 faktura · č. 434',           amt:'2 968',      days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  {id:'ov_tsp',        n:'TSP DATA',                     sub:'1 faktura · č. 13474',         amt:'1 602,31',   days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  {id:'ov_banalita',   n:'Banalita s.r.o.',              sub:'1 faktura · č. 13452',         amt:'955',        days:2, pri:'n', plbl:'2 dny', due:'17. 11.'},
  /* ov_benkor17 — BENKOR dobropis č.439 (−8 338,40 Kč) — zápočteno v úhradě 12.11 */

  /* === přešlo z "do 5 dní" 19.11 (spl. 18. 11.) — 1 den === */
  {id:'ov_iframix',    n:'IFRAMIX',                      sub:'1 faktura · č. 442',           amt:'58 800',     days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_alza18',     n:'Alza.cz a.s.',                 sub:'2 faktury · č. 135, 136',      amt:'48 429,70',  days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  /* ov_schinkmann — SCHINKMANN uhrazen 18.11 (20 328 Kč) — Fio VS=0202600443 */
  {id:'ov_kas',        n:'K a S, s.r.o.',                sub:'1 faktura · č. 451',           amt:'16 184',     days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_euro_pool',  n:'Euro Pool System CZ',          sub:'1 faktura · č. 445',           amt:'14 488,32',  days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_emedis18',   n:'EMEDIS s.r.o.',                sub:'1 faktura · č. 444',           amt:'14 053,92',  days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_imi18',      n:'IMI Partner',                  sub:'1 faktura · č. 447',           amt:'12 073,60',  days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_sport',      n:'SPORT HOTÁREK',                sub:'1 faktura · č. 13518',         amt:'7 832',      days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_ms_pod',     n:'MŠ Poděbrady',                 sub:'3 faktury · č. 446, 448, 449', amt:'7 084',      days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_cpr18',      n:'CPR HK s.r.o.',                sub:'1 faktura · č. 441',           amt:'3 284,74',   days:1, pri:'n', plbl:'1 den', due:'18. 11.'},
  {id:'ov_waxwing',    n:'WAXWING',                      sub:'1 faktura · č. 13517',         amt:'3 038',      days:1, pri:'n', plbl:'1 den', due:'18. 11.'},

  /* === nezachyceno dříve — z K2 po splatnosti export === */
  {id:'ov_tumova',     n:'Hana Tůmová',                  sub:'1 faktura · č. 11821',         amt:'1 228',      days:40, pri:'r', plbl:'Urgentní', due:'9. 10.'},
];

const OV_EUR = [
  {id:'oe_moss',      n:'MOSS.SK s.r.o.',               fakt:'č. 162', days:31, pri:'r', plbl:'Urgentní', due:'16. 10.', amt:'10,23'},
  {id:'oe_pavuk',     n:'Marián Pavúk',                  fakt:'č. 182', days:11, pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'57,36'},
  {id:'oe_orig',      n:'Originale production s.r.o.',   fakt:'č. 183', days:11, pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'88,12'},
  {id:'oe_nelli',     n:'NELLI oblátky s.r.o.',          fakt:'č. 186', days:7,  pri:'a', plbl:'Pozor',    due:'09. 11.', amt:'165,30'},
  /* oe_sketch — Sketch uhrazena 12.11 (261,80 EUR) */
  /* oe_post — POST Servis uhrazena 16.11 (177,86 EUR) */
  /* oe_lamelland — LAMELLAND uhrazena 16.11 (519,60 EUR) */
  /* přešlo z "do 5 dní" 13.11 */
  {id:'oe_metrostav', n:'METROSTAV ESTATE A.S.',         fakt:'č. 48',  days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.', amt:'1 824,00'},
  /* oe_elpatt — ELPATT uhrazena 12.11 (451,00 EUR) */
  {id:'oe_pd_vajnory',n:'PD Vajnory',                    fakt:'č. 194', days:3,  pri:'n', plbl:'3 dny',    due:'13. 11.', amt:'90,68'},
];

const SOON_CZK = [
  {date:'19. 11. 2026', lbl:'DNES', cls:'t', rows:[
    {id:'sc_alza19',      n:'Alza.cz a.s.',                     fakt:'137, 138',      amt:'111 265,28'},
    {id:'sc_a1com',       n:'A1 com s.r.o.',                    fakt:'455',           amt:'43 769,60'},
    {id:'sc_porkert',     n:'Vlastimil Porkert',                fakt:'454',           amt:'17 640,00'},
    {id:'sc_hufa',        n:'Hu-Fa Dental',                     fakt:'456',           amt:'9 800,00'},
    {id:'sc_cpr19',       n:'CPR HK s.r.o.',                    fakt:'457, 459, 460', amt:'6 829,07'},
    {id:'sc_agritech',    n:'AgriTechnika CZ',                  fakt:'458',           amt:'4 020,80'},
  ]},
  {date:'20. 11. 2026', lbl:'ZÍTRA', cls:'s', rows:[
    {id:'sc_candex',      n:'Candex Solutions',                 fakt:'463',           amt:'87 180,80'},
    {id:'sc_speed20',     n:'SPEED PRESS Plus a.s.',            fakt:'462, 468',      amt:'39 483,92'},
    {id:'sc_cpr20',       n:'CPR HK s.r.o.',                    fakt:'461, 465, 466, 472', amt:'19 710,15'},
    {id:'sc_atlas',       n:'Atlas Copco',                      fakt:'464',           amt:'5 292,00'},
    {id:'sc_mlsoun',      n:'MLSOUN s.r.o.',                    fakt:'13629',         amt:'4 658,00'},
    {id:'sc_dolany',      n:'Zemědělské druž. Dolany',          fakt:'13613',         amt:'2 064,00'},
  ]},
  {date:'21. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_hotel_amb',   n:'HOTEL AMBASSADOR ZLATÁ HUSA',      fakt:'476',           amt:'17 317,44'},
    {id:'sc_vino',        n:'Víno-dárkové balíčky',             fakt:'13651',         amt:'5 820,00'},
  ]},
  {date:'23. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_impregnace',  n:'Impregnace Soběslav',              fakt:'481',           amt:'43 806,56'},
    {id:'sc_addex',       n:'ADDEX s.r.o.',                     fakt:'482',           amt:'33 124,00'},
    {id:'sc_hrdlickova',  n:'Markéta Hrdličková',               fakt:'13710',         amt:'15 122,00'},
    {id:'sc_familium',    n:'Familium s.r.o.',                  fakt:'13665',         amt:'13 800,00'},
    {id:'sc_knauf',       n:'Knauf Insulation',                 fakt:'479',           amt:'7 573,44'},
    {id:'sc_neucilova',   n:'Zdeňka Neučilová',                 fakt:'13666',         amt:'6 825,00'},
  ]},
  {date:'24. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_heidelberg',  n:'Heidelberg Materials',             fakt:'484',           amt:'41 451,20'},
    {id:'sc_sitel',       n:'SITEL',                            fakt:'483',           amt:'14 985,60'},
    {id:'sc_moje_or',     n:'Moje Oříšky',                      fakt:'13737',         amt:'4 853,00'},
    {id:'sc_stoklaskova', n:'Lada Stokláskova',                 fakt:'13762',         amt:'2 929,00'},
    {id:'sc_svachtova',   n:'Dana Švachtová',                   fakt:'13730',         amt:'2 114,00'},
    {id:'sc_pbcomp',      n:'P & B company',                    fakt:'13766',         amt:'1 959,00'},
  ]},
  {date:'25. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_conseq',      n:'Conseq Investment',                fakt:'487',           amt:'69 148,80'},
    {id:'sc_secheron',    n:'Sécheron Hasler',                  fakt:'485',           amt:'53 312,00'},
    {id:'sc_imi25',       n:'IMI Partner',                      fakt:'488',           amt:'19 264,00'},
    {id:'sc_zimova',      n:'Jiřina Zimová',                    fakt:'13807',         amt:'18 592,00'},
    {id:'sc_zahradn',     n:'Zahradnické centrum Brabec',       fakt:'13822',         amt:'6 750,00'},
    {id:'sc_bogner',      n:'Bogner Edelstahl',                 fakt:'13809',         amt:'5 180,00'},
    {id:'sc_kasper25',    n:'Eliška Kasper',                    fakt:'13824',         amt:'4 886,00'},
    {id:'sc_preralova',   n:'Kateřina Přeralová',               fakt:'13794',         amt:'4 525,00'},
    {id:'sc_audit',       n:'AUDIT FM',                         fakt:'13808',         amt:'3 785,00'},
    {id:'sc_pulkrabkova', n:'Renata Půlkrábková',               fakt:'13826',         amt:'2 595,00'},
  ]},
];

const SOON_EUR = [
  /* přesunuto z LATER_EUR — splatnost 19–20. 11. */
  {id:'se_rechtys',   n:'Rechtys spol.',           fakt:'51',  due:'19. 11.', amt:'1 814,00'},
  {id:'se_sketch199', n:'Sketch s.r.o.',            fakt:'199', due:'19. 11.', amt:'165,30'},
  {id:'se_arma',      n:'Armaplast',                fakt:'198', due:'19. 11.', amt:'128,45'},
  {id:'se_proreco',   n:'PRORECO s.r.o.',           fakt:'52',  due:'20. 11.', amt:'3 435,60'},
  {id:'se_dez',       n:'DeZ spol.',                fakt:'200', due:'20. 11.', amt:'161,10'},
  /* nové z K2 — splatnost 23–25. 11. */
  {id:'se_viena',     n:'Viena international',      fakt:'53',  due:'23. 11.', amt:'298,85'},
  {id:'se_racing',    n:'RACING CAR',               fakt:'201', due:'24. 11.', amt:'71,55'},
  {id:'se_stilla',    n:'STILLA',                   fakt:'202', due:'24. 11.', amt:'48,48'},
  {id:'se_sketch203', n:'Sketch s.r.o.',            fakt:'203', due:'25. 11.', amt:'217,60'},
  {id:'se_ycorp',     n:'Y-corp',                   fakt:'204', due:'25. 11.', amt:'520,00'},
];

const LATER_CZK = [
  {id:'la_alza',    n:'Alza.cz a.s.',           fakt:'č.139–190+ (38+ fakt.)', due:'20.11–12.12', amt:'miliony Kč',  approx:true},
  {id:'la_reda',    n:'REDA a.s.',              fakt:'č.342–478 (14+ fakt.)',  due:'30 dní',       amt:'~385 000',    approx:true},
  {id:'la_vilgain', n:'Vilgain s.r.o.',         fakt:'383, 384, 453',          due:'—',            amt:'281 413,44'},
  {id:'la_brno',    n:'Statutární město Brno',  fakt:'407',                    due:'04. 12.',      amt:'64 344,00'},
  {id:'la_strojy',  n:'Strojárny Třinec',       fakt:'403',                    due:'04. 12.',      amt:'31 920,00'},
  {id:'la_olympic', n:'Olympic Palace',         fakt:'475, 477',               due:'28.–30. 11.',  amt:'24 190,21'},
  {id:'la_inafy',   n:'Inafy Estates',          fakt:'351, 409',               due:'—',            amt:'25 716,92'},
  {id:'la_pematex', n:'Pematex',                fakt:'12821, 13367, 13374',    due:'—',            amt:'8 630,00'},
];

const LATER_EUR = [
  /* všechny SK faktury přesunuty do SOON_EUR (splatnost 19–25. 11.) */
];

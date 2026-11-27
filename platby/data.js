/* Nutworld — B2B platby data. Aktualizovat při každém novém K2 exportu. */
const NW_PLATBY_UPDATED = '22. 11. 2026 (K2 updated)';

const OV_CZK = [
  /* === Urgentní (25+ dní) === */
  {id:'ov_tumova',     n:'Hana Tůmová',                  sub:'1 faktura · č. 11821',         amt:'1 228',      days:44, pri:'r', plbl:'Urgentní', due:'9. 10.', oz:''},
  {id:'ov_vitr',       n:'Vítr v kapse s.r.o.',           sub:'1 faktura · č. 12337',         amt:'397',        days:32, pri:'r', plbl:'Urgentní', due:'19. 10.', oz:''},
  /* ov_reda uhrazen 2026-11-23 (57,489.60 Kč, Δ0.40) — Fio ✅ */
  {id:'ov_kasal',      n:'Jana Kasalová',                 sub:'1 faktura · č. 12497',         amt:'2 772',      days:28, pri:'r', plbl:'Urgentní', due:'23. 10.', oz:''},

  /* === Pozor (10–19 dní) === */
  /* ov_kolar uhrazen 2026-11-26 (52,630.10 Kč, Δ0.10) — Fio ✅ */
  /* ov_emedis uhrazen 2026-11-26 (18,459.81 Kč, Δ0.21) — Fio ✅ */
  {id:'ov_vonavy',     n:'Muj vonávy kramek',             sub:'1 faktura · č. 12989',         amt:'739',        days:14, pri:'a', plbl:'Pozor', due:'06. 11.', oz:''},

  /* === 10–13. 11. === */
  {id:'ov_cpr',        n:'CPR HK s.r.o.',                 sub:'5 faktur · č. 398–416',        amt:'10 760',     days:12, pri:'a', plbl:'10–13.11', due:'10. 11.', oz:'Jana N.'},
  {id:'ov_dfszk',      n:'DFSZK, s.r.o.',                 sub:'1 faktura · č. 13260',         amt:'1 554',      days:10, pri:'n', plbl:'10–13.11', due:'12. 11.', oz:''},
  /* ov_certis uhrazen 2026-11-20 (111,104.00 Kč, Δ0.00) — Fio ✅ */
  /* ov_bmt uhrazen 2026-11-20 (46,233.60 Kč, Δ0.40) — Fio ✅ */
  {id:'ov_vuuo',       n:'VÚÚO Holovousy s.r.o.',         sub:'1 faktura · č. 12985',         amt:'46 087',     days:9,  pri:'n', plbl:'10–13.11', due:'13. 11.', oz:''},
  /* ov_vaillant uhrazen 2026-11-20 (28,333.76 Kč, Δ0.24) — Fio ✅ */
  {id:'ov_saar',       n:'Saar Gummi Czech s.r.o.',       sub:'1 faktura · č. 418',           amt:'23 448',     days:9,  pri:'n', plbl:'10–13.11', due:'13. 11.', oz:'Jan V.'},
  /* ov_hsekomin uhrazen 2026-11-23 (4,557.00 Kč, Δ0.00) — Fio ✅ */
  /* === 16. 11. === */
  {id:'ov_alza16',     n:'Alza.cz a.s.',                  sub:'2 faktury · č. 134, 419',      amt:'286 649,44', days:6,  pri:'n', plbl:'16.11', due:'16. 11.', oz:'Tomáš H.'},
  {id:'ov_heineken',   n:'Heineken ČR',                   sub:'1 faktura · č. 428',           amt:'79 195,20',  days:6,  pri:'n', plbl:'16.11', due:'16. 11.', oz:'Jan V.'},
  /* ov_brand uhrazen 2026-11-20 (17,722.88 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_cpr16',      n:'CPR HK s.r.o.',                 sub:'5 faktur · č. 429–433',        amt:'11 690,25',  days:6,  pri:'n', plbl:'16.11', due:'16. 11.', oz:'Jana N.'},
  /* ov_helik16 uhrazen 2026-11-23 (4,533.00 Kč, Δ0.00) — Fio ✅ */
  /* ov_kavanova uhrazen 2026-11-19 (2,384.00 Kč, Δ0.00) — Fio ✅ */
  /* === 17. 11. === */
  /* ov_greenswan uhrazen 2026-11-23 (102,821.60 Kč, Δ0.00) — Fio ✅ */
  /* ov_ikme uhrazen 2026-11-20 (12,526.08 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_amt',        n:'AMT AUTO - SKLA',               sub:'1 faktura · č. 13485',         amt:'6 510',      days:5,  pri:'n', plbl:'17.11', due:'17. 11.', oz:''},
  {id:'ov_cpr17',      n:'CPR HK s.r.o.',                 sub:'1 faktura · č. 434',           amt:'2 968',      days:5,  pri:'n', plbl:'17.11', due:'17. 11.', oz:'Jana N.'},
  {id:'ov_tsp',        n:'TSP DATA',                      sub:'1 faktura · č. 13474',         amt:'1 602,31',   days:5,  pri:'n', plbl:'17.11', due:'17. 11.', oz:''},
  {id:'ov_banalita',   n:'Banalita s.r.o.',               sub:'1 faktura · č. 13452',         amt:'955',        days:5,  pri:'n', plbl:'17.11', due:'17. 11.', oz:''},

  /* === 18. 11. === */
  /* ov_iframix uhrazen 2026-11-20 (58,800.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_kas',        n:'K a S, s.r.o.',                 sub:'1 faktura · č. 451',           amt:'16 184',     days:4,  pri:'n', plbl:'18.11', due:'18. 11.', oz:''},
  /* ov_euro_pool uhrazen 2026-11-20 (14,488.32 Kč, Δ0.00) — Fio ✅ */
  /* ov_emedis18 uhrazen 2026-11-26 (14,053.92 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_sport',      n:'SPORT HOTÁREK',                 sub:'1 faktura · č. 13518',         amt:'7 832',      days:4,  pri:'n', plbl:'18.11', due:'18. 11.', oz:''},
  /* ov_ms_pod uhrazen 2026-11-20 (7,084.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_cpr18',      n:'CPR HK s.r.o.',                 sub:'1 faktura · č. 441',           amt:'3 284,74',   days:4,  pri:'n', plbl:'18.11', due:'18. 11.', oz:'Jana N.'},
  {id:'ov_waxwing',    n:'WAXWING',                       sub:'1 faktura · č. 13517',         amt:'3 038',      days:4,  pri:'n', plbl:'18.11', due:'18. 11.', oz:''},

  /* === 19. 11. — přešlo z Do 5 dní === */
  /* ov_a1com uhrazen 2026-11-26 (43,769.60 Kč, Δ0.00) — Fio ✅ */
  /* ov_porkert uhrazen 2026-11-20 (17,640.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_cpr19',      n:'CPR HK s.r.o.',                 sub:'3 faktury · č. 457, 459, 460', amt:'6 829,07',   days:3,  pri:'n', plbl:'19.11', due:'19. 11.', oz:'Jana N.'},
  /* ov_agritech uhrazen 2026-11-25 (4,020.80 Kč, Δ0.00) — Fio ✅ */
  /* === 20. 11. — přešlo z Do 5 dní === */
  {id:'ov_candex',     n:'Candex Solutions',              sub:'1 faktura · č. 463',           amt:'87 180,80',  days:2,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jan V.'},
  {id:'ov_alza20',     n:'Alza.cz a.s.',                  sub:'3 faktury · č. 139, 140, 141', amt:'242 334',    days:2,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Tomáš H.'},
  {id:'ov_speed20',    n:'SPEED PRESS Plus a.s.',         sub:'2 faktury · č. 462, 468',      amt:'39 483,92',  days:2,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Tomáš H.'},
  {id:'ov_cpr20',      n:'CPR HK s.r.o.',                 sub:'4 faktury · č. 461, 465, 466, 472', amt:'19 710,15', days:2, pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jana N.'},
  /* ov_reda349 uhrazen 2026-11-23 (56,336.00 Kč, Δ0.00) — Fio ✅ */
  {id:'ov_atlas',      n:'Atlas Copco',                   sub:'1 faktura · č. 464',           amt:'5 292',      days:2,  pri:'n', plbl:'20.11', due:'20. 11.', oz:'Jan V.'},
  {id:'ov_mlsoun',     n:'MLSOUN s.r.o.',                 sub:'1 faktura · č. 13629',         amt:'4 658',      days:2,  pri:'n', plbl:'20.11', due:'20. 11.', oz:''},
  /* ov_dolany uhrazen 2026-11-20 (2,064.00 Kč, Δ0.00) — Fio ✅ */
  /* ov_reda342 uhrazen 2026-11-23 (6,594.74 Kč, Δ0.26) — Fio ✅ */
  /* === 21. 11. — přešlo z Do 5 dní === */
  {id:'ov_vino',       n:'Víno-dárkové balíčky',          sub:'1 faktura · č. 13651',         amt:'5 820',      days:1,  pri:'n', plbl:'21.11', due:'21. 11.', oz:''},
];

const OV_EUR = [
  /* starší po splatnosti */
  {id:'oe_moss',       n:'MOSS.SK s.r.o.',                fakt:'č. 162', days:37, pri:'r', plbl:'Urgentní',  due:'16. 10.', amt:'10,23',    oz:'Markéta C.'},
  {id:'oe_pavuk',      n:'Marián Pavúk',                  fakt:'č. 182', days:17, pri:'a', plbl:'Pozor',     due:'05. 11.', amt:'57,36',    oz:''},
  {id:'oe_orig',       n:'Originale production s.r.o.',   fakt:'č. 183', days:17, pri:'a', plbl:'Pozor',     due:'05. 11.', amt:'88,12',    oz:'Jan V.'},
  {id:'oe_metrostav',  n:'METROSTAV ESTATE A.S.',         fakt:'č. 48',  days:9,  pri:'n', plbl:'13.11',     due:'13. 11.', amt:'1 824,00', oz:'Jan V.'},
  {id:'oe_pd_vajnory', n:'PD Vajnory',                    fakt:'č. 194', days:9,  pri:'n', plbl:'13.11',     due:'13. 11.', amt:'90,68',    oz:''},
  /* LAMELLAND + POST Servis — Fio párování proběhlo, ale K2 stále eviduje jako neuhrazené — K2 je zdroj pravdy */
  /* oe_lamelland uhrazen 2026-11-16 (519.60 EUR, Δ0.00) — Fio ✅ */
  {id:'oe_post190',    n:'POST Servis s.r.o.',             fakt:'č. 190', days:6,  pri:'a', plbl:'K2 ověřit', due:'16. 11.', amt:'177,86',  oz:''},
  /* přešlo z Do 5 dní 19–20.11 */
  /* oe_rechtys uhrazen 2026-11-24 (1,814.00 EUR, Δ0.00) — Fio ✅ */
  {id:'oe_sketch199',  n:'Sketch s.r.o.',                  fakt:'č. 199', days:3,  pri:'n', plbl:'19.11',     due:'19. 11.', amt:'165,30',  oz:'Markéta C.'},
  {id:'oe_arma',       n:'Armaplast',                      fakt:'č. 198', days:3,  pri:'n', plbl:'19.11',     due:'19. 11.', amt:'128,45',  oz:''},
  /* oe_proreco uhrazen 2026-11-23 (3,435.60 EUR, Δ0.00) — Fio ✅ */
  {id:'oe_dez',        n:'DeZ spol.',                      fakt:'č. 200', days:2,  pri:'n', plbl:'20.11',     due:'20. 11.', amt:'161,10',  oz:''},
  {id:'oe_jufa',       n:'JUFA hotels',                    fakt:'č. 196', days:2,  pri:'n', plbl:'20.11',     due:'20. 11.', amt:'226,40',  oz:''},
];

const SOON_CZK = [
  {date:'22. 11. 2026', lbl:'DNES', cls:'t', rows:[
    {id:'sc_alza22',      n:'Alza.cz a.s.',                     fakt:'142',           amt:'155 288',   oz:'Tomáš H.'},
    {id:'sc_inafy22',     n:'Inafy Estates',                    fakt:'351',           amt:'12 899',    oz:''},
  ]},
  {date:'23. 11. 2026', lbl:'ZÍTRA', cls:'s', rows:[
    {id:'sc_impregnace',  n:'Impregnace Soběslav',              fakt:'481',           amt:'43 806,56', oz:'Markéta C.'},
    {id:'sc_addex',       n:'ADDEX s.r.o.',                     fakt:'482',           amt:'33 124,00', oz:'Tomáš H.'},
    {id:'sc_hrdlickova',  n:'Markéta Hrdličková',               fakt:'13710',         amt:'15 122,00', oz:''},
    {id:'sc_familium',    n:'Familium s.r.o.',                  fakt:'13665',         amt:'13 800,00', oz:'Markéta C.'},
    {id:'sc_knauf',       n:'Knauf Insulation',                 fakt:'479',           amt:'7 573,44',  oz:'Martin W.'},
    {id:'sc_neucilova',   n:'Zdeňka Neučilová',                 fakt:'13666',         amt:'6 825,00',  oz:''},
  ]},
  {date:'24. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_heidelberg',  n:'Heidelberg Materials',             fakt:'484',           amt:'41 451,20', oz:'Martin W.'},
    {id:'sc_sitel',       n:'SITEL',                            fakt:'483',           amt:'14 985,60', oz:'Martin W.'},
    {id:'sc_moje_or',     n:'Moje Oříšky',                      fakt:'13737',         amt:'4 853,00',  oz:'Tomáš H.'},
    {id:'sc_stoklaskova', n:'Lada Stokláskova',                 fakt:'13762',         amt:'2 929,00',  oz:''},
    {id:'sc_svachtova',   n:'Dana Švachtová',                   fakt:'13730',         amt:'2 114,00',  oz:''},
    {id:'sc_pbcomp',      n:'P & B company',                    fakt:'13766',         amt:'1 959,00',  oz:''},
  ]},
  {date:'25. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alza25',      n:'Alza.cz a.s.',                     fakt:'143, 144, 145', amt:'194 953',   oz:'Tomáš H.'},
    {id:'sc_conseq',      n:'Conseq Investment',                fakt:'487',           amt:'69 148,80', oz:'Martin W.'},
    {id:'sc_secheron',    n:'Sécheron Hasler',                  fakt:'485',           amt:'53 312,00', oz:'Martin W.'},
    {id:'sc_cpr25',       n:'CPR HK s.r.o.',                    fakt:'486',           amt:'14 871,00', oz:'Jana N.'},
    {id:'sc_imi25',       n:'IMI Partner',                      fakt:'488',           amt:'19 264,00', oz:'Tomáš H.'},
    {id:'sc_zimova',      n:'Jiřina Zimová',                    fakt:'13807',         amt:'18 592,00', oz:''},
    {id:'sc_zahradn',     n:'Zahradnické centrum Brabec',       fakt:'13822',         amt:'6 750,00',  oz:''},
    {id:'sc_bogner',      n:'Bogner Edelstahl',                 fakt:'13809',         amt:'5 180,00',  oz:''},
    {id:'sc_kasper25',    n:'Eliška Kasper',                    fakt:'13824',         amt:'4 886,00',  oz:'Martin W.'},
    {id:'sc_preralova',   n:'Kateřina Přeralová',               fakt:'13794',         amt:'4 525,00',  oz:''},
    {id:'sc_audit',       n:'AUDIT FM',                         fakt:'13808',         amt:'3 785,00',  oz:''},
    {id:'sc_pulkrabkova', n:'Renata Půlkrábková',               fakt:'13826',         amt:'2 595,00',  oz:''},
    {id:'sc_pematex25',   n:'Pematex',                          fakt:'12901',         amt:'2 194,00',  oz:'Jana N.'},
  ]},
  {date:'26. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alcometal',   n:'Alcometal s.r.o.',                 fakt:'489',           amt:'86 195,00', oz:'Jan V.'},
    {id:'sc_nakup26',     n:'Nakup na Dobro s.r.o.',            fakt:'490',           amt:'44 940,00', oz:'Martin W.'},
    {id:'sc_ekvita',      n:'EKVITA',                           fakt:'500',           amt:'19 241,00', oz:''},
    {id:'sc_imi26',       n:'IMI Partner',                      fakt:'492, 496, 497', amt:'26 445,00', oz:'Tomáš H.'},
    {id:'sc_alza26',      n:'Alza.cz a.s.',                     fakt:'146, 147',      amt:'46 872',    oz:'Tomáš H.'},
    {id:'sc_vinoteka',    n:'Vinoték s.r.o.',                   fakt:'493',           amt:'13 402,00', oz:''},
    {id:'sc_speed26',     n:'SPEED PRESS Plus a.s.',            fakt:'495',           amt:'12 684,00', oz:'Tomáš H.'},
    {id:'sc_stavoprim',   n:'StavoPrim s.r.o.',                 fakt:'494',           amt:'8 791,00',  oz:''},
    {id:'sc_benkor26',    n:'BENKOR s.r.o.',                    fakt:'498',           amt:'8 338,00',  oz:''},
    {id:'sc_hartman',     n:'Hartman s.r.o.',                   fakt:'13843',         amt:'5 376,00',  oz:''},
    {id:'sc_studio',      n:'Studio PLUS',                      fakt:'13844',         amt:'5 107,00',  oz:''},
    {id:'sc_dvorak',      n:'Dvořák CZ',                        fakt:'13841',         amt:'5 855,00',  oz:''},
    {id:'sc_hanzalova',   n:'Jana Hanzalová',                   fakt:'13845',         amt:'1 796,00',  oz:''},
    {id:'sc_saar26',      n:'Saar Gummi Czech s.r.o.',          fakt:'491',           amt:'1 172,00',  oz:'Jan V.'},
  ]},
  {date:'27. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alza27',      n:'Alza.cz a.s.',                     fakt:'148',           amt:'61 735',    oz:'Tomáš H.'},
    {id:'sc_corpin',      n:'CORPIN s.r.o.',                    fakt:'501',           amt:'41 132,00', oz:'Martin W.'},
    {id:'sc_hit',         n:'HIT CZ s.r.o.',                    fakt:'504',           amt:'10 634,00', oz:''},
    {id:'sc_zs_spice',    n:'ZŠ Špice',                         fakt:'505',           amt:'10 315,00', oz:''},
    {id:'sc_lerch',       n:'Lerch s.r.o.',                     fakt:'13857',         amt:'9 605,00',  oz:''},
    {id:'sc_kasparinik',  n:'Kašparová',                        fakt:'502',           amt:'7 302,00',  oz:''},
    {id:'sc_zs_kolin',    n:'ZŠ Kolín',                         fakt:'13858',         amt:'2 070,00',  oz:''},
  ]},
  {date:'28. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alza28',      n:'Alza.cz a.s.',                     fakt:'149, 150, 151', amt:'408 801',   oz:'Tomáš H.'},
    {id:'sc_vilgain28',   n:'Vilgain s.r.o.',                   fakt:'383, 384',      amt:'50 548',    oz:'Tomáš H.'},
    {id:'sc_absjets',     n:'ABS Jets a.s.',                    fakt:'506',           amt:'47 544,00', oz:'Jan V.'},
    {id:'sc_ortes',       n:'ORTES Medical',                    fakt:'13860',         amt:'14 280,00', oz:''},
    {id:'sc_olympic28a',  n:'Olympic Palace',                   fakt:'475',           amt:'15 721,00', oz:'Martin W.'},
    {id:'sc_olympic28b',  n:'Olympic Palace',                   fakt:'477',           amt:'8 469,21',  oz:'Martin W.'},
    {id:'sc_speed28',     n:'SPEED PRESS Plus a.s.',            fakt:'507',           amt:'1 179,00',  oz:'Tomáš H.'},
    {id:'sc_kavanova28',  n:'Veronika Kavanová',                fakt:'13861',         amt:'1 189,00',  oz:'Markéta C.'},
  ]},
];

const SOON_EUR = [
  {id:'se_viena',      n:'Viena international',      fakt:'č. 53',   due:'23. 11.', amt:'298,85',  oz:'Martin W.'},
  {id:'se_racing',     n:'RACING CAR',               fakt:'č. 201',  due:'24. 11.', amt:'71,55',   oz:''},
  {id:'se_stilla',     n:'STILLA',                   fakt:'č. 202',  due:'24. 11.', amt:'48,48',   oz:''},
  {id:'se_sketch203',  n:'Sketch s.r.o.',             fakt:'č. 203',  due:'25. 11.', amt:'217,60',  oz:'Markéta C.'},
  {id:'se_ycorp',      n:'Y-corp',                   fakt:'č. 204',  due:'25. 11.', amt:'520,00',  oz:''},
  {id:'se_advantage',  n:'Advantage Security',       fakt:'č. 54',   due:'26. 11.', amt:'420,60',  oz:'Martin W.'},
  {id:'se_skola',      n:'Súkromná škola',            fakt:'č. 3059', due:'26. 11.', amt:'74,79',   oz:''},
  {id:'se_og55',       n:'OG spol.',                  fakt:'č. 55',   due:'27. 11.', amt:'340,20',  oz:''},
  {id:'se_srdcofka',   n:'Srdcofka s.r.o.',           fakt:'č. 205',  due:'27. 11.', amt:'483,41',  oz:''},
  {id:'se_post206',    n:'POST Servis s.r.o.',         fakt:'č. 206',  due:'27. 11.', amt:'236,19',  oz:''},
  {id:'se_marbet',     n:'MARBET, s.r.o.',             fakt:'č. 208',  due:'28. 11.', amt:'14,71',   oz:''},
  {id:'se_gazdovsky',  n:'Gazdovský s.r.o.',           fakt:'č. 209',  due:'28. 11.', amt:'120,20',  oz:''},
];

const LATER_CZK = [
  {id:'la_alza',    n:'Alza.cz a.s.',           fakt:'č. 152–192+ (40+ fakt.)', due:'29.11–12.12', amt:'miliony Kč',   approx:true, oz:'Tomáš H.'},
  {id:'la_albi',    n:'Albi ČR s.r.o.',         fakt:'č. 503',                 due:'20. 12.',      amt:'139 104,00',  oz:'Tomáš H.'},
  {id:'la_vilgain', n:'Vilgain s.r.o.',          fakt:'č. 453, 499',            due:'12.–19. 12.',  amt:'281 414',     oz:'Tomáš H.'},
  {id:'la_brno',    n:'Statutární město Brno',  fakt:'č. 407',                 due:'04. 12.',      amt:'64 344,00',   oz:'Jan V.'},
  {id:'la_strojy',  n:'Strojárny Třinec',        fakt:'č. 403',                 due:'04. 12.',      amt:'31 920,00',   oz:'Markéta C.'},
  {id:'la_inafy',   n:'Inafy Estates',           fakt:'č. 409',                 due:'05. 12.',      amt:'12 818,00',   oz:''},
  {id:'la_pematex', n:'Pematex',                 fakt:'č. 12821, 13367, 13374, 13535, 13536', due:'—', amt:'15 066,00', oz:'Jana N.'},
  {id:'la_reda',    n:'REDA a.s.',               fakt:'zbývající faktury',      due:'—',            amt:'~250 000',    approx:true, oz:'Tomáš H.'},
];

const LATER_EUR = [];

const B2C_SK_PENDING = [
  {code:'2026003465', n:'SNP Capital Energy s.r.o.', amt:'151.20', ccy:'EUR', date:'2026-11-25', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003460', n:'—', amt:'59.60', ccy:'EUR', date:'2026-11-25', paid:true, bank_date:'2026-11-25', bank_sender:'Zuzana Nestorikova'},
  {code:'2026003458', n:'Levare Cable s.r.o.', amt:'730.80', ccy:'EUR', date:'2026-11-25', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003456', n:'L.A.M. TRANS, s.r.o.', amt:'142.04', ccy:'EUR', date:'2026-11-25', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003425', n:'—', amt:'33.09', ccy:'EUR', date:'2026-11-22', paid:false, bank_date:'', bank_sender:''},
  {code:'2026003415', n:'—', amt:'60.90', ccy:'EUR', date:'2026-11-21', paid:true, bank_date:'2026-11-21', bank_sender:'Iveta Burikova'},
  {code:'2026003398', n:'—', amt:'66.30', ccy:'EUR', date:'2026-11-20', paid:true, bank_date:'2026-11-20', bank_sender:'BENEDIK JULIA'},
];

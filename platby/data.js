/* Nutworld — B2B platby data. Aktualizovat při každém novém K2 exportu. */
const NW_PLATBY_UPDATED = '13. 11. 2026';

const OV_CZK = [
  {id:'ov_alza',    n:'Alza.cz a.s.',                 sub:'2 faktury + 2 dobropisy', amt:'33 352',    days:26, pri:'r', plbl:'Urgentní', due:'18. 10.'},
  {id:'ov_reda',    n:'REDA a.s.',                    sub:'5 faktur · č. 277–287',   amt:'127 098',   days:22, pri:'r', plbl:'Urgentní', due:'22. 10.'},
  {id:'ov_speed',   n:'SPEED PRESS Plus a.s.',        sub:'4 faktury · č. 328, 377, 388, 402', amt:'98 857', days:22, pri:'r', plbl:'Urgentní', due:'22. 10.'},
  {id:'ov_kasal',   n:'Jana Kasalová',                sub:'1 faktura · č. 12497',    amt:'2 772',     days:21, pri:'r', plbl:'Urgentní', due:'23. 10.'},
  {id:'ov_vitr',    n:'Vítr v kapse s.r.o.',          sub:'1 faktura · č. 12337',    amt:'397',       days:25, pri:'r', plbl:'Urgentní', due:'19. 10.'},
  {id:'ov_kolar',   n:'Michal Kolář',                 sub:'1 faktura · č. 359',      amt:'52 630',    days:11, pri:'a', plbl:'Pozor',    due:'02. 11.'},
  {id:'ov_kram',    n:'Farmářskej krámek s.r.o.',     sub:'1 faktura · č. 12897',    amt:'7 984',     days:10, pri:'a', plbl:'Pozor',    due:'03. 11.'},
  {id:'ov_emedis',  n:'EMEDIS s.r.o.',                sub:'6 faktur · č. 371–411',   amt:'133 117',   days:9,  pri:'a', plbl:'Pozor',    due:'04. 11.'},
  {id:'ov_benkor',  n:'B E N K O R s.r.o.',           sub:'1 faktura · č. 380',      amt:'27 787',    days:8,  pri:'a', plbl:'Pozor',    due:'05. 11.'},
  {id:'ov_jested',  n:'Výrobní podnik Ještěd s.r.o.', sub:'1 faktura · č. 379',      amt:'11 312',    days:8,  pri:'a', plbl:'Pozor',    due:'05. 11.'},
  {id:'ov_linet',   n:'L I N E T spol. s r.o.',       sub:'1 faktura · č. 375',      amt:'9 688',     days:8,  pri:'a', plbl:'Pozor',    due:'05. 11.'},
  {id:'ov_nakup',   n:'Nakup na Dobro s.r.o.',        sub:'1 faktura · č. 387',      amt:'152 038',   days:7,  pri:'a', plbl:'Pozor',    due:'06. 11.'},
  {id:'ov_vonavy',  n:'Muj vonávy kramek',            sub:'1 faktura · č. 12989',    amt:'739',       days:7,  pri:'a', plbl:'Pozor',    due:'06. 11.'},
  {id:'ov_helik',   n:'Markéta Helikárová',           sub:'1 faktura · č. 13061',    amt:'8 828',     days:4,  pri:'n', plbl:'4 dny',    due:'09. 11.'},
  {id:'ov_ardix',   n:'ARDIX spol. s r.o.',           sub:'1 faktura · č. 395',      amt:'13 798',    days:4,  pri:'n', plbl:'4 dny',    due:'09. 11.'},
  {id:'ov_huber',   n:'HUBER CS spol. s r.o.',        sub:'1 faktura · č. 391',      amt:'13 048',    days:4,  pri:'n', plbl:'4 dny',    due:'09. 11.'},
  {id:'ov_syrarna', n:'Sýrárna Broumov s.r.o.',       sub:'1 faktura · č. 396',      amt:'8 109',     days:3,  pri:'n', plbl:'3 dny',    due:'10. 11.'},
  {id:'ov_cpr',     n:'CPR HK s.r.o.',                sub:'3 faktury · č. 398, 400, 401', amt:'6 568', days:3, pri:'n', plbl:'3 dny',    due:'10. 11.'},
  {id:'ov_zlkl',    n:'ZLKL, s. r. o.',               sub:'1 faktura · č. 404',      amt:'140 235',   days:2,  pri:'n', plbl:'2 dny',    due:'11. 11.'},
  {id:'ov_vilgain', n:'Vilgain s.r.o.',               sub:'1 faktura · č. 309',      amt:'75 322',    days:2,  pri:'n', plbl:'2 dny',    due:'11. 11.'},
  {id:'ov_arch',    n:'Arch.Design, s.r.o.',          sub:'1 faktura · č. 406',      amt:'20 328',    days:2,  pri:'n', plbl:'2 dny',    due:'11. 11.'},
  {id:'ov_tes',     n:'TES Consulting s.r.o.',        sub:'1 faktura · č. 13230',    amt:'25 300',    days:1,  pri:'n', plbl:'1 den',    due:'12. 11.'},
  {id:'ov_dfszk',   n:'DFSZK, s.r.o.',                sub:'1 faktura · č. 13260',    amt:'1 554',     days:1,  pri:'n', plbl:'1 den',    due:'12. 11.'},
];

const OV_EUR = [
  {id:'oe_moss',     n:'MOSS.SK s.r.o.',               fakt:'č. 162', days:28, pri:'r', plbl:'Urgentní', due:'16. 10.', amt:'10,23'},
  {id:'oe_pavuk',    n:'Marián Pavúk',                 fakt:'č. 182', days:8,  pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'57,36'},
  {id:'oe_orig',     n:'Originale production s.r.o.',  fakt:'č. 183', days:8,  pri:'a', plbl:'Pozor',    due:'05. 11.', amt:'88,12'},
  {id:'oe_nelli',    n:'NELLI oblátky s.r.o.',         fakt:'č. 186', days:4,  pri:'n', plbl:'4 dny',    due:'09. 11.', amt:'165,30'},
  {id:'oe_sketch',   n:'Sketch s. r. o.',              fakt:'č. 188', days:3,  pri:'n', plbl:'3 dny',    due:'10. 11.', amt:'261,80'},
  {id:'oe_post',     n:'POST Servis s.r.o.',           fakt:'č. 190', days:3,  pri:'n', plbl:'3 dny',    due:'10. 11.', amt:'177,86'},
  {id:'oe_lamelland',n:'LAMELLAND, s.r.o.',            fakt:'č. 47',  days:1,  pri:'n', plbl:'1 den',    due:'12. 11.', amt:'519,60'},
];

const SOON_CZK = [
  {date:'13. 11. 2026', lbl:'DNES', cls:'t', rows:[
    {id:'sc_certis',   n:'Certis Belchim Czech Republic',     fakt:'414',           amt:'111 104,00'},
    {id:'sc_reda13',   n:'REDA a.s.',                         fakt:'318, 324, 325', amt:'74 930,24'},
    {id:'sc_vilg13',   n:'Vilgain s.r.o.',                    fakt:'327',           amt:'50 158,08'},
    {id:'sc_bmt',      n:'BMT Medical Technology',            fakt:'417',           amt:'46 233,60'},
    {id:'sc_vuuo',     n:'VÚÚO Holovousy',                    fakt:'12985',         amt:'46 087,00'},
    {id:'sc_vaillant', n:'Vaillant Group Czech',              fakt:'413',           amt:'28 333,76'},
    {id:'sc_saar',     n:'Saar Gummi Czech',                  fakt:'418',           amt:'23 448,32'},
    {id:'sc_jana13',   n:'Ing. Jana Malá',                    fakt:'13292',         amt:'7 577,00'},
    {id:'sc_hsekomin', n:'HS EkoMin s.r.o.',                  fakt:'13280',         amt:'4 557,00'},
    {id:'sc_cpr13',    n:'CPR HK s.r.o.',                     fakt:'415, 416',      amt:'4 192,16'},
    {id:'sc_stepek',   n:'Jiří Štěpek',                       fakt:'13273',         amt:'2 258,00'},
  ]},
  {date:'14. 11. 2026', lbl:'ZÍTRA', cls:'s', rows:[
    {id:'sc_emedis14', n:'EMEDIS s.r.o.',                     fakt:'421',           amt:'18 459,81'},
  ]},
  {date:'15. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alza15',   n:'Alza.cz a.s.',                      fakt:'133',           amt:'45 098,70'},
  ]},
  {date:'16. 11. 2026', lbl:'', cls:'', rows:[
    {id:'sc_alza16',   n:'Alza.cz a.s.',                      fakt:'134, 419',      amt:'286 649,44'},
    {id:'sc_heineken', n:'Heineken ČR',                       fakt:'428',           amt:'79 195,20'},
    {id:'sc_chem',     n:'AS CHEMOPRAG',                      fakt:'427',           amt:'24 202,98'},
    {id:'sc_brand',    n:'BRAND CONCEPT',                     fakt:'423, 424',      amt:'17 722,88'},
    {id:'sc_cpr16',    n:'CPR HK s.r.o.',                     fakt:'429–433',       amt:'11 690,25'},
    {id:'sc_ikv',      n:'I.K.V., s.r.o.',                    fakt:'422',           amt:'8 232,00'},
    {id:'sc_geum',     n:'GEUM s.r.o.',                       fakt:'13429',         amt:'7 954,00'},
    {id:'sc_olympic16',n:'Olympic Palace',                    fakt:'392',           amt:'6 265,84'},
    {id:'sc_kasper',   n:'Eliška Kasper',                     fakt:'13401',         amt:'6 544,00'},
    {id:'sc_helik16',  n:'Markéta Helikárová',                fakt:'13411',         amt:'4 533,00'},
    {id:'sc_kavanova', n:'Veronika Kavanová',                 fakt:'13400',         amt:'2 384,00'},
    {id:'sc_dasicka',  n:'Dašická s.r.o.',                    fakt:'425',           amt:'2 184,00'},
  ]},
  {date:'17. 11. 2026', lbl:'', cls:'', rows:[
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
    {id:'sc_euro_pool',n:'Euro Pool System CZ',               fakt:'445',           amt:'14 488,32'},
    {id:'sc_kas',      n:'K a S, s.r.o.',                     fakt:'451',           amt:'16 184,00'},
    {id:'sc_emedis18', n:'EMEDIS s.r.o.',                     fakt:'444',           amt:'14 053,92'},
    {id:'sc_imi18',    n:'IMI Partner',                       fakt:'447',           amt:'12 073,60'},
    {id:'sc_sport',    n:'SPORT HOTÁREK',                     fakt:'13518',         amt:'7 832,00'},
    {id:'sc_ms_pod',   n:'MŠ Poděbrady',                      fakt:'446, 448, 449', amt:'7 084,00'},
    {id:'sc_cpr18',    n:'CPR HK s.r.o.',                     fakt:'441',           amt:'3 284,74'},
    {id:'sc_waxwing',  n:'WAXWING',                           fakt:'13517',         amt:'3 038,00'},
  ]},
];

const SOON_EUR = [
  {id:'se_metrostav', n:'METROSTAV ESTATE A.S.',  fakt:'48',  due:'13. 11.', amt:'1 824,00'},
  {id:'se_elpatt',    n:'ELPATT spol. s r.o.',    fakt:'49',  due:'13. 11.', amt:'451,00'},
  {id:'se_pd_vajnory',n:'PD Vajnory',             fakt:'194', due:'13. 11.', amt:'90,68'},
  {id:'se_sketch17',  n:'Sketch s.r.o.',          fakt:'196', due:'17. 11.', amt:'507,20'},
  {id:'se_jufa',      n:'JUFA s.r.o.',            fakt:'197', due:'17. 11.', amt:'226,40'},
  {id:'se_solarny',   n:'SOLARNY DOM',            fakt:'50',  due:'18. 11.', amt:'297,20'},
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

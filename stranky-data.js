// Registr stránek nástrojů — JEDINÝ seznam pro rozcestník (a později menu, role). Nová stránka = nový řádek zde.
// Jan 2026-11-25: „lépe si to roztřídit, začíná v tom být bordel“.
window.NW_SKUPINY = [
 {
  "key": "obchod",
  "nazev": "Obchod a zákazníci",
  "ikona": "💼",
  "barva": "#da1668",
  "popis": "nabídka → zakázka → firma → klient"
 },
 {
  "key": "ceny",
  "nazev": "Ceny a marže",
  "ikona": "💰",
  "barva": "#f7ab31",
  "popis": "kalkulace, marže, nákupní ceny"
 },
 {
  "key": "vyroba",
  "nazev": "Výroba",
  "ikona": "🏭",
  "barva": "#6fa044",
  "popis": "co, kolik a jak vyrobit"
 },
 {
  "key": "sklad",
  "nazev": "Sklad, příjem a míchání",
  "ikona": "📦",
  "barva": "#83502e",
  "popis": "dodávky, šarže, DMT, míchání"
 },
 {
  "key": "produkty",
  "nazev": "Produkty, štítky a legislativa",
  "ikona": "🏷️",
  "barva": "#5c381f",
  "popis": "specifikace → štítek → web"
 },
 {
  "key": "doprava",
  "nazev": "Doprava",
  "ikona": "🚚",
  "barva": "#a0622a",
  "popis": "kalkulátory dopravců"
 },
 {
  "key": "marketing",
  "nazev": "Marketing a grafika",
  "ikona": "📣",
  "barva": "#b05030",
  "popis": "kampaně, bannery, web"
 },
 {
  "key": "lide",
  "nazev": "Lidé a provoz",
  "ikona": "👥",
  "barva": "#4a7c2f",
  "popis": "docházka, řády, BOZP, HACCP, návody"
 },
 {
  "key": "jan",
  "nazev": "Jen Jan",
  "ikona": "🐺",
  "barva": "#3e2c1c",
  "popis": "soukromé přehledy",
  "sbaleno": true
 },
 {
  "key": "zakaznici",
  "nazev": "Stránky pro zákazníky",
  "ikona": "🔗",
  "barva": "#8a6040",
  "popis": "odkazy, které posíláme firmám",
  "sbaleno": true
 }
];
window.NW_STRANKY = [
 {
  "soubor": "nabidky.html",
  "skupina": "obchod",
  "ikona": "📄",
  "nazev": "Generátor nabídek",
  "popis": "Vytvoř nabídku pro zákazníka a stáhni PDF",
  "hlavni": 1,
  "barva": "brown"
 },
 {
  "soubor": "zakazy.html",
  "skupina": "obchod",
  "ikona": "🃏",
  "nazev": "Přehled zakázek",
  "popis": "Live stav zakázek z Trella — firmy, hodnoty, termíny",
  "hlavni": 2,
  "barva": "amber"
 },
 {
  "soubor": "kalendar.html",
  "skupina": "obchod",
  "ikona": "📅",
  "nazev": "Kalendář termínů",
  "popis": "Termíny dodání zakázek v měsíčním přehledu — barevně podle obchodního zástupce",
  "barva": "amber"
 },
 {
  "soubor": "zakazka.html",
  "skupina": "obchod",
  "ikona": "✅",
  "nazev": "Potvrzení zakázky",
  "popis": "Z nabídky vznikne zakázka — obsah, obaly, termín → karta do Trella a výroby"
 },
 {
  "soubor": "firmy-ceniky.html",
  "skupina": "obchod",
  "ikona": "🏢",
  "nazev": "Firmy — vlastní ceníky",
  "popis": "Individuální ceníky a nabídky pro firemní zákazníky — Náchod, Olympic Palace a další.",
  "barva": "brown"
 },
 {
  "soubor": "partneri.html",
  "skupina": "obchod",
  "ikona": "🏢",
  "nazev": "Registr partnerů",
  "popis": "Vyhledávání v dodavatelích a odběratelích z K2 — filtr podle IČO, doplňování nových",
  "barva": "brown"
 },
 {
  "soubor": "klienti.html",
  "skupina": "obchod",
  "ikona": "🤝",
  "nazev": "Klíčoví klienti",
  "popis": "Klienti, úkoly, poznámky, schůzky a dokumenty — sdílené pro tým",
  "stitek": "nově sdílené"
 },
 {
  "soubor": "vzorky.html",
  "skupina": "obchod",
  "ikona": "🧪",
  "nazev": "Vzorky",
  "popis": "Zadávání a sledování B2B vzorků — od zadání přes výrobu až po odeslání klientovi",
  "barva": "pink"
 },
 {
  "soubor": "bulk-cenik.html",
  "skupina": "obchod",
  "ikona": "📦",
  "nazev": "Bulk ceník",
  "popis": "solo balení s přelepením etikety · ceny Kč/kg + Kč/bal · automaticky dle nákupních cen",
  "barva": "green"
 },
 {
  "soubor": "generator-darky.html",
  "skupina": "obchod",
  "ikona": "🎁",
  "nazev": "Generátor dárků",
  "popis": "Konfigurátor firemních dárků — krabičky, kelímky, skleničky a další balení na míru",
  "barva": "amber"
 },
 {
  "soubor": "generator-darkove-krabicky.html",
  "skupina": "obchod",
  "ikona": "🎁",
  "nazev": "Konfigurátor krabičky 2×50 g",
  "popis": "Sestav dárkovou krabičku 2×50 g pro firmu — obsah, gravír, stuha",
  "stitek": "sloučit 2×50 + 4×80"
 },
 {
  "soubor": "generator-darkove-krabicky-4x80.html",
  "skupina": "obchod",
  "ikona": "🎁",
  "nazev": "Konfigurátor krabičky 4×80 g",
  "popis": "Sestav dárkovou krabičku 4×80 g pro firmu — obsah, gravír, stuha",
  "stitek": "sloučit 2×50 + 4×80"
 },
 {
  "soubor": "b2b-prezentace.html",
  "skupina": "obchod",
  "ikona": "📊",
  "nazev": "B2B prezentace",
  "popis": "Prezentace Nutworld pro firemní klienty"
 },
 {
  "soubor": "dokument.html",
  "skupina": "obchod",
  "ikona": "📄",
  "nazev": "Generátor dokumentů",
  "popis": "Vložte text → Nutworld kabátek → PDF. Dopis, katalog, ceník, info list, nabídka.",
  "barva": "amber"
 },
 {
  "soubor": "dokumenty.html",
  "skupina": "obchod",
  "ikona": "🗂️",
  "nazev": "Dokumenty",
  "popis": "Rozcestník firemních dokumentů a strategií"
 },
 {
  "soubor": "kalkulator.html",
  "skupina": "ceny",
  "ikona": "🧮",
  "nazev": "Kalkulátor cen",
  "popis": "Kalkulace MO/VO ceny a marže — produkty i dárky (krabičky, sáčky, skleničky, kelímky)",
  "hlavni": 4,
  "barva": "amber"
 },
 {
  "soubor": "marze.html",
  "skupina": "ceny",
  "ikona": "📊",
  "nazev": "Přehled marží",
  "popis": "Marže dárků a sáčků — vždy aktuální z ceníku",
  "barva": "pink"
 },
 {
  "soubor": "k2.html",
  "skupina": "ceny",
  "ikona": "📈",
  "nazev": "K2 Porovnání ceníků",
  "popis": "Porovnání K2 ceníků — květen vs. červen 2026",
  "barva": "amber"
 },
 {
  "soubor": "bulk-cenik-pracovni.html",
  "skupina": "ceny",
  "ikona": "🔢",
  "nazev": "Bulk ceník — Pracovní",
  "popis": "Interní verze · nákupní ceny · marže % · poznámky · aktualizace automaticky",
  "barva": "brown"
 },
 {
  "soubor": "obchod-smesi.html",
  "skupina": "ceny",
  "ikona": "🏪",
  "nazev": "Alza & Vilgain — Marže",
  "popis": "Marže směsí a produktů dle gramáže — plné náklady (sáček, plnění, etiketa, doprava). Alza + Vilgain.",
  "barva": "amber"
 },
 {
  "soubor": "cenik.html",
  "skupina": "ceny",
  "ikona": "📋",
  "nazev": "Porovnání ceníků",
  "popis": "Nahraj dva CSV ceníky a viz co se změnilo",
  "stitek": "zvážit zrušení"
 },
 {
  "soubor": "vyroba.html",
  "skupina": "vyroba",
  "ikona": "🏭",
  "nazev": "Výrobní plán",
  "popis": "Přehled co vyrábět — filtruj podle produktu, odškrtávej hotové firmy",
  "hlavni": 3,
  "barva": "brown"
 },
 {
  "soubor": "objednavky.html",
  "skupina": "vyroba",
  "ikona": "📦",
  "nazev": "Výrobní rozklad objednávek",
  "popis": "Live Shoptet objednávky → co vyrábět dnes — CZ + SK, filtr dle data, vyhledávání",
  "barva": "green"
 },
 {
  "soubor": "normy.html",
  "skupina": "vyroba",
  "ikona": "🏭",
  "nazev": "Normy výroby + Kalkulátor zakázky",
  "popis": "Výrobní normy balení — ks/hod, Kč/ks, čas zakázky. Šablony pro eko kelímek, doypack, kornout, kazetku, krabičky a další.",
  "barva": "green"
 },
 {
  "soubor": "vyrobni-plan.html",
  "skupina": "vyroba",
  "ikona": "🎁",
  "nazev": "Výrobní plán produktů",
  "popis": "Plán výroby vánočních dárků — zadej počty kusů, zobraz potřebu surovin",
  "stitek": "sloučit s výrobním plánem",
  "barva": "amber"
 },
 {
  "soubor": "adventni-kalendar.html",
  "skupina": "vyroba",
  "ikona": "🎄",
  "nazev": "Adventní kalendář 2026",
  "popis": "Výrobní manuál — kalkulace, rozložení 24 okének, výrobní fronta",
  "barva": "amber"
 },
 {
  "soubor": "co-obsahuje.html",
  "skupina": "vyroba",
  "ikona": "📦",
  "nazev": "Co obsahuje?",
  "popis": "Zadej kód dárku → obsah s kódy a gramy. Nebo kód směsi → složení s alergeny.",
  "barva": "green"
 },
 {
  "soubor": "darky-lookup.html",
  "skupina": "vyroba",
  "ikona": "🔍",
  "nazev": "Kde je produkt?",
  "popis": "Zadej kód základního produktu → uvidíš všechny dárky, kde je obsažený.",
  "barva": "amber"
 },
 {
  "soubor": "suroviny.html",
  "skupina": "vyroba",
  "ikona": "🥜",
  "nazev": "Kde co je",
  "popis": "Průřez podle suroviny — vyber druh ořechu a uvidíš všechny dárky kde se nachází",
  "barva": "brown"
 },
 {
  "soubor": "receptury-smesi.html",
  "skupina": "vyroba",
  "ikona": "🧮",
  "nazev": "Receptury směsí",
  "popis": "Přesné poměry složení — Alza, Vilgain, Nutworld — na 1 kg a 20 kg",
  "barva": "green"
 },
 {
  "soubor": "prijem-surovin.html",
  "skupina": "sklad",
  "ikona": "📦",
  "nazev": "Příjem surovin",
  "popis": "Záznam příjmu dodávky — dodavatel, číslo dodávky, šarže, DMT, stav položek, tisk",
  "hlavni": 5,
  "barva": "brown"
 },
 {
  "soubor": "archiv-prijmu.html",
  "skupina": "sklad",
  "ikona": "📂",
  "nazev": "Archiv příjmů",
  "popis": "Vyhledávání v historii dodávek — podle suroviny, LOT, dodavatele, data nebo DMT",
  "barva": "green"
 },
 {
  "soubor": "denik-michani.html",
  "skupina": "sklad",
  "ikona": "📋",
  "nazev": "Deník míchání a surovin",
  "popis": "Záznam zpracování velkých dávek surovin — šarže, LOT, DMT, uložení do Trella",
  "barva": "brown"
 },
 {
  "soubor": "michani-archiv.html",
  "skupina": "sklad",
  "ikona": "🗄️",
  "nazev": "Archiv míchání",
  "popis": "Historie výroby — dávky, šarže, suroviny"
 },
 {
  "soubor": "michani-foto.html",
  "skupina": "sklad",
  "ikona": "📷",
  "nazev": "Nahrát foto formuláře",
  "popis": "Veřejná stránka — nafotit vyplněný papír → AI přečte → Trello karta automaticky",
  "barva": "amber"
 },
 {
  "soubor": "dmt.html",
  "skupina": "sklad",
  "ikona": "⏳",
  "nazev": "DMT Manager",
  "popis": "Data minimální trvanlivosti ze šarží příjmu a míchání"
 },
 {
  "soubor": "specifikace.html",
  "skupina": "produkty",
  "ikona": "📋",
  "nazev": "Specifikace produktů",
  "popis": "Ořechy, Ovoce, Semínka, Směsi NW, Ostatní · PDF z Trella · složení směsí s alergeny",
  "barva": "brown"
 },
 {
  "soubor": "specifikace-generator.html",
  "skupina": "produkty",
  "ikona": "📋",
  "nazev": "Generátor specifikací",
  "popis": "Nahraj spec od dodavatele → přeloží a převede do Nutworld formátu (PDF)",
  "barva": "green"
 },
 {
  "soubor": "mix-specifikace.html",
  "skupina": "produkty",
  "ikona": "🥣",
  "nazev": "Specifikace směsí",
  "popis": "Legislativní složení směsí s původem složek"
 },
 {
  "soubor": "zmeny.html",
  "skupina": "produkty",
  "ikona": "🔄",
  "nazev": "Změny produktů",
  "popis": "Zaznamenej změnu dodavatele, složení nebo alergenů — odklikej web CZ/SK, etiketu a Trello",
  "barva": "pink"
 },
 {
  "soubor": "produkty.html",
  "skupina": "produkty",
  "ikona": "📋",
  "nazev": "Nové produkty",
  "popis": "Trello nástěnka — přesouvej karty přímo tady bez otevření Trella",
  "barva": "brown"
 },
 {
  "soubor": "generator.html",
  "skupina": "produkty",
  "ikona": "📦",
  "nazev": "Generátor produktů",
  "popis": "Doplnit popis nebo upravit existující produkt — Claude nahraje texty CZ + SK do Shoptetu",
  "barva": "green"
 },
 {
  "soubor": "stitky.html",
  "skupina": "produkty",
  "ikona": "⚖️",
  "nazev": "Legislativní štítky",
  "popis": "Generátor štítků dle EU 1169/2011 — CZ i SK"
 },
 {
  "soubor": "stitky-objednat.html",
  "skupina": "produkty",
  "ikona": "🖨️",
  "nazev": "Objednat štítek",
  "popis": "Zadej kódy a velikost → PDF štítky do 5 minut e-mailem",
  "stitek": "nové",
  "hlavni": 6
 },
 {
  "soubor": "stitky-archiv.html",
  "skupina": "produkty",
  "ikona": "📚",
  "nazev": "Archiv štítků",
  "popis": "Historie vygenerovaných štítků — hledej podle kódu, stáhni PDF nebo objednej znovu"
 },
 {
  "soubor": "stitky-kontrola.html",
  "skupina": "produkty",
  "ikona": "🔍",
  "nazev": "Kontrola štítků",
  "popis": "Trojkontrola spec ↔ štítek ↔ web — co nesedí"
 },
 {
  "soubor": "alergeny-nastenska.html",
  "skupina": "produkty",
  "ikona": "⚠️",
  "nazev": "Alergeny — nástěnka",
  "popis": "Tisknutelný přehled pro laminaci: alergeny v provozu, pořadí výroby (Var. A + B), changeover postup, checklist před šarží.",
  "barva": "green"
 },
 {
  "soubor": "doprava.html",
  "skupina": "doprava",
  "ikona": "🚛",
  "nazev": "Doprava",
  "popis": "Kalkulátory dopravy — Geis (palety), PPL (zásilky CZ+SK), Zásilkovna, TopTrans. Cena, mýtné, dobírka.",
  "barva": "brown"
 },
 {
  "soubor": "ppl.html",
  "skupina": "doprava",
  "ikona": "📮",
  "nazev": "PPL kalkulátor",
  "popis": "Cena zásilky PPL CZ + SK podle váhy",
  "stitek": "sloučit do Dopravy"
 },
 {
  "soubor": "geis.html",
  "skupina": "doprava",
  "ikona": "🚛",
  "nazev": "Geis — palety",
  "popis": "Paletová doprava Geis podle zóny a palety",
  "stitek": "sloučit do Dopravy"
 },
 {
  "soubor": "toptrans.html",
  "skupina": "doprava",
  "ikona": "🚚",
  "nazev": "TopTrans",
  "popis": "Kalkulátor dopravy TopTrans",
  "stitek": "sloučit do Dopravy"
 },
 {
  "soubor": "zasilkovna.html",
  "skupina": "doprava",
  "ikona": "📦",
  "nazev": "Zásilkovna",
  "popis": "Kalkulátor ceny Zásilkovny",
  "stitek": "sloučit do Dopravy"
 },
 {
  "soubor": "marketing-calendar.html",
  "skupina": "marketing",
  "ikona": "📅",
  "nazev": "Marketingový kalendář",
  "popis": "Q4 2026 — 10 kampaní, editovatelné produkty, stav a poznámky. Přidávej vlastní kampaně.",
  "barva": "pink"
 },
 {
  "soubor": "bannery.html",
  "skupina": "marketing",
  "ikona": "🐿️",
  "nazev": "Generátor bannerů",
  "popis": "Téma, rozměry, CZ/SK → NutWorldka z Canvy + texty a logo podle značky. Archiv s vyhledáváním, uložení do Canvy.",
  "barva": "pink"
 },
 {
  "soubor": "chat.html",
  "skupina": "marketing",
  "ikona": "💬",
  "nazev": "Chat s NutWorldkou",
  "popis": "AI chat na nutworld.cz/.sk místo Smartsuppu: konverzace, odpovídání zákazníkům, předané dotazy, poptávky, co nevěděla, nastavení.",
  "barva": "pink"
 },
 {
  "soubor": "popupy.html",
  "skupina": "marketing",
  "ikona": "🎯",
  "nazev": "Popupy na e-shopu",
  "popis": "Vlastní okna na nutworld.cz/.sk místo Poptinu: kde, kdy, jak často, CZ/SK texty, NutWorldka, e-maily do Leadhubu, statistiky.",
  "barva": "pink"
 },
 {
  "soubor": "web-audit.html",
  "skupina": "marketing",
  "ikona": "📊",
  "nazev": "Web Audit: Nutworld.cz",
  "popis": "Komplexní analýza webu — hodnocení 7 oblastí, prioritní matice, doporučení pro Q4 2026. Skóre 6.8/10.",
  "stitek": "archiv",
  "barva": "brown"
 },
 {
  "soubor": "cenik-grafika.html",
  "skupina": "marketing",
  "ikona": "🖨️",
  "nazev": "Pravidla: Ceník tisků",
  "popis": "Grafika a tisk Claudia Fiori — nákupní ceny, pravidla pro zákazníka, příklady výpočtů",
  "barva": "amber"
 },
 {
  "soubor": "nastenky.html",
  "skupina": "lide",
  "ikona": "🗂",
  "nazev": "Nástěnky",
  "popis": "Naše vlastní nástěnky místo Trella — zatím kopie Trella (souběžný provoz), jen na serveru s přihlášením",
  "stitek": "nové",
  "barva": "brown"
 },
 {
  "soubor": "pichacky.html",
  "skupina": "lide",
  "ikona": "⏱",
  "nazev": "Píchačky",
  "popis": "Docházka zaměstnanců — příchod/odchod, denní a měsíční hodiny, sazba, výplata, export CSV",
  "stitek": "nově sdílené",
  "barva": "brown"
 },
 {
  "soubor": "zamestnanci.html",
  "skupina": "lide",
  "ikona": "👥",
  "nazev": "Manažeři",
  "popis": "Přehled manažerů a jejich stavu"
 },
 {
  "soubor": "manazer.html",
  "skupina": "lide",
  "ikona": "🧑‍💼",
  "nazev": "Profil manažera",
  "popis": "Profil, dostupnost a úkoly manažera"
 },
 {
  "soubor": "podpisove-rady.html",
  "skupina": "lide",
  "ikona": "✍️",
  "nazev": "Podpisové řády",
  "popis": "Vnitřní řád pracoviště k podpisu — HPP, DPP/DPČ a pracovníci firmy na úkolové práce. Tisk po záložkách.",
  "barva": "green"
 },
 {
  "soubor": "skoleni-dpp.html",
  "skupina": "lide",
  "ikona": "📝",
  "nazev": "Vstupní školení DPP",
  "popis": "Obecné školení k podpisu — pracovní řád, BOZP, hygiena, mobilní telefon, mlčenlivost, požár, alergeny. 12 sekcí + podpisový arch.",
  "barva": "brown"
 },
 {
  "soubor": "rozdeleni-pracovniku.html",
  "skupina": "lide",
  "ikona": "🏢",
  "nazev": "Rozdělení pracovníků",
  "popis": "B2B vs. HPP — co Nutworld může a nesmí řídit, zóny, pauzy, švarcsystém, BOZP jako provozovatel.",
  "barva": "brown"
 },
 {
  "soubor": "maorth-trans-komplet.html",
  "skupina": "lide",
  "ikona": "🤝",
  "nazev": "Firma na úkolové práce — kompletní přehled",
  "popis": "Podmínky B2B spolupráce, švarcsystém, daně, GDPR, IP, BOZP, organizace, kontrolní orgány — checklist.",
  "barva": "amber"
 },
 {
  "soubor": "podminky-maorth-trans.html",
  "skupina": "lide",
  "ikona": "📋",
  "nazev": "Podmínky s firmou na úkolové práce",
  "popis": "8 oblastí: smlouva, GDPR, autorská práva, daně, BOZP, mlčenlivost, ukončení, pojištění.",
  "barva": "brown"
 },
 {
  "soubor": "pudorysy.html",
  "skupina": "lide",
  "ikona": "🗺️",
  "nazev": "Půdorysy — zóny AG",
  "popis": "Půdorysy pracoviště s vyznačenými zónami firmy na úkolové práce — Z1AG, Z2AG (1. patro) · Z4AG (2. patro).",
  "barva": "amber"
 },
 {
  "soubor": "oznaceni-pracoviste.html",
  "skupina": "lide",
  "ikona": "🚧",
  "nazev": "Označení pracoviště",
  "popis": "BOZP, únikové cesty, potravinářský provoz, živnostenský zákon §17 — co musí být fyzicky označeno.",
  "barva": "pink"
 },
 {
  "soubor": "haccp.html",
  "skupina": "lide",
  "ikona": "🛡️",
  "nazev": "HACCP Plán",
  "popis": "Kompletní HACCP plán Nut World s.r.o. — analýza nebezpečí, CCP, krizový plán, tisknutelné přílohy (formuláře, alergeny, kalibrace).",
  "barva": "green"
 },
 {
  "soubor": "teploty-formular.html",
  "skupina": "lide",
  "ikona": "🌡️",
  "nazev": "Evidence teplot",
  "popis": "Měsíční formulář pro tisk: sklad surovin (°C + RH) a balírna. 31 řádků, prázdná pole pro ruční vyplnění.",
  "barva": "green"
 },
 {
  "soubor": "skladnik-priority.html",
  "skupina": "lide",
  "ikona": "📦",
  "nazev": "Priority skladníka",
  "popis": "8 priorit seřazených podle důležitosti — dofasování, příjem, K2, přesun ZJ/DJ, logistika, teplota, čistota.",
  "barva": "green"
 },
 {
  "soubor": "operator-balirna.html",
  "skupina": "lide",
  "ikona": "🏭",
  "nazev": "Priority operátora balírny",
  "popis": "9 priorit pro balírnu — tavení zakázek, rozvoz DJ/ZJ, míchání, krabice, čistý provoz, štítkování, sáčky.",
  "barva": "amber"
 },
 {
  "soubor": "navod-nabidky.html",
  "skupina": "lide",
  "ikona": "📖",
  "nazev": "Návod: Nabídky & Zakázky",
  "popis": "Jak zadávat nabídky, zakázky, výrobní plány — kompletní průvodce systémem",
  "barva": "green"
 },
 {
  "soubor": "wolf.html",
  "skupina": "jan",
  "ikona": "🐺",
  "nazev": "Wolf Leader Board",
  "popis": "Janův přehled — upozornění, KPI, kalendář, úkoly, obchodníci"
 },
 {
  "soubor": "ja.html",
  "skupina": "jan",
  "ikona": "📈",
  "nazev": "Dashboard (klasický)",
  "popis": "Starší Janův přehled — reklamy, e-maily, Trello, úkoly",
  "stitek": "nahrazuje Wolf"
 },
 {
  "soubor": "ukoly.html",
  "skupina": "jan",
  "ikona": "✅",
  "nazev": "Moje úkoly",
  "popis": "Janovy úkoly a rutiny"
 },
 {
  "soubor": "claude.html",
  "skupina": "jan",
  "ikona": "🤖",
  "nazev": "Claude chat",
  "popis": "Mobilní chat s Claudem nad firemními daty"
 },
 {
  "soubor": "b2b.html",
  "skupina": "zakaznici",
  "ikona": "🙏",
  "nazev": "Poděkování za poptávku (CZ)",
  "popis": "Stránka pro zákazníka po odeslání B2B poptávky"
 },
 {
  "soubor": "b2b-sk.html",
  "skupina": "zakaznici",
  "ikona": "🙏",
  "nazev": "Poďakovanie za dopyt (SK)",
  "popis": "Stránka pro zákazníka po odeslání B2B dopytu"
 },
 {
  "soubor": "cajovna-cenik.html",
  "skupina": "zakaznici",
  "ikona": "🍵",
  "nazev": "Čajovna — ceník",
  "popis": "Ceník pro zákazníka Čajovna Jan Fišer"
 },
 {
  "soubor": "cajovna-marze.html",
  "skupina": "zakaznici",
  "ikona": "🍵",
  "nazev": "Čajovna — marže",
  "popis": "Interní marže k ceníku Čajovna",
  "stitek": "interní"
 },
 {
  "soubor": "hufa-cenik.html",
  "skupina": "zakaznici",
  "ikona": "🦷",
  "nazev": "HU-FA Dental — ceník",
  "popis": "Ceník pro zákazníka HU-FA Dental"
 },
 {
  "soubor": "hufa-marze.html",
  "skupina": "zakaznici",
  "ikona": "🦷",
  "nazev": "HU-FA Dental — marže",
  "popis": "Interní marže k ceníku HU-FA",
  "stitek": "interní"
 },
 {
  "soubor": "olympic-nabidka.html",
  "skupina": "zakaznici",
  "ikona": "🏨",
  "nazev": "Olympic Palace — nabídka",
  "popis": "Nabídka pro zákazníka Olympic Palace"
 },
 {
  "soubor": "olympic-marze.html",
  "skupina": "zakaznici",
  "ikona": "🏨",
  "nazev": "Olympic Palace — marže",
  "popis": "Interní marže k nabídce Olympic Palace",
  "stitek": "interní"
 },
 {
  "soubor": "czech-inn-cenik.html",
  "skupina": "zakaznici",
  "ikona": "🏨",
  "nazev": "Czech Inn — ceník",
  "popis": "Ceník pro zákazníka Czech Inn Hotels"
 },
 {
  "soubor": "nachod-cenik.html",
  "skupina": "zakaznici",
  "ikona": "🏙️",
  "nazev": "Ceník Náchod",
  "popis": "Ceník pro zákazníka Náchod"
 },
 {
  "soubor": "klient-import.html",
  "skupina": "zakaznici",
  "ikona": "🔧",
  "nazev": "Import klienta",
  "popis": "Pomocná stránka pro import klienta",
  "stitek": "pomocná"
 }
];

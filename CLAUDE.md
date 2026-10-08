# Generátor nabídek – Efektivní izolace (foukaná izolace + fasády)

Interní webová aplikace, ve které Vojtěch připravuje cenové nabídky pro **Efektivní izolace s.r.o.**:
foukaná izolace (půda / střecha / mezi krokve) a zateplení fasády (Baumit ETICS).
Tento soubor je „paměť projektu“: kdo na projektu pracuje (Claude v chatu, Claude Code na Macu),
čte ho jako první a na konci práce ho aktualizuje (sekce Stav, Úkoly, Historie změn).

## Komunikace
- Vojtěch píše česky, chce stručné a praktické odpovědi.
- Terminál moc nepoužívá – každý příkaz vysvětlit jednoduše (co dělá, co čekat, jak spustit).
- Vizuál vždy podle `docs/DESIGN-SYSTEM.md` (zdroj pravdy pro barvy, písmo, rozvržení).

## Nasazení
- **Ostrá (stará) verze:** https://strong-tartufo-12ad44.netlify.app – nahrávaná ručně na Netlify.
  Její kód NENÍ na GitHubu (má navíc pole Poznámka, záklop 690 Kč, jiné ceny materiálů).
- **GitHub:** Vojtechnovotny88/foukackaaplikace
  - `main` = starší verze z dubna 2026 (bez poznámky)
  - `novy-design` = nová verze (tento soubor), čeká na schválení
- Nová verze: zkušební adresa na Netlify – viz Historie změn.

## Struktura (větev novy-design)
- `index.html` – formulář a náhled (CSS přímo v souboru, tokeny z design systému)
- `js/nastaveni.js` – **ceník, texty podmínek, kontakty, webhook** – vše, co se běžně mění
- `js/dokument.js` – vzhled PDF (pdfmake): úvodní tmavý blok, klíčová čísla, sekce služeb
- `js/app.js` – formulář, výpočty, náhled (pdf.js), stažení PDF, odeslání do Make, historie
- `assets/fonts` Manrope TTF · `assets/img` logo a fotky realizací (jen skutečné, ne AI) ·
  `assets/vendor` knihovny (pdfmake, pdf.js) –
  vše lokálně, žádné CDN.

## Jak to funguje
- Služby se zaškrtávají: Foukaná izolace / Fasáda / obojí → podle toho se skládá dokument.
  Obojí = na 1. straně souhrn s celkovou cenou, každá služba pak od nové strany.
- PDF je skutečné vektorové PDF (ostrý text), náhled vpravo je přesně to PDF.
- Místo přiloženého technického listu se v nabídce vypíše: 3 klíčové hodnoty (λD podle konstrukce, tepelný odpor
  R = tloušťka/λD vypočtený pro zvolenou tloušťku, reakce na oheň) + tabulka technických parametrů z `nastaveni.js`.
  Objemovou hmotnost do nabídek neuvádíme (přání Vojtěcha).
- Fasáda: plochy (označení, popis, m², tloušťka 6–20 cm nebo „neřešeno“), rozpočet seskupený podle
  tloušťky, cena bez DPH / DPH 12 % / s DPH, systém Baumit, platby 50/25/25 % s částkami.
- **Odeslat zákazníkovi** → JSON na Make webhook. Pole jako dřív: customerName, customerEmail,
  customerAddress, constructionType, material, thickness, areaM2, totalPrice, offerNumber, validUntil,
  sentAt, pdfFileName, pdfFileBase64. Nová pole: customerPhone, services (foukana / fasada /
  foukana+fasada), blownTotal, facadeTotal, facadeAreaM2, note.
- Číslo nabídky = RRRRMMDD-HHMM (už se neopakuje „-01“).
- Historie posledních 30 odeslaných nabídek v prohlížeči; načtení obnoví celý formulář (kromě fotek).

## Ceník (js/nastaveni.js) – ČEKÁ NA POTVRZENÍ od Vojtěcha
- Foukaná, Kč/m² vč. DPH: Paroc 40/30/25/20 cm = 399/379/369/359 · URSA 570/550/540/530 ·
  DEKWOOL G 039r (role) 40/30/18 cm = 520/490/390. (Ostrá verze má Paroc 40 cm asi 479. Web uvádí od 299 Kč/m²
  při 20 cm a 399 Kč/m² při 30 cm.)
- Lávka 380 Kč/bm, záklop 690 Kč/m², ohrádka 800 Kč/ks.
- Fasáda EPS, Kč/m² vč. DPH 12 %: 6=2240, 8=2270, 10=2300, 12=2340, 14=2370, 16=2400, 18=2450, 20=2500.

## Testování
- Lokálně: `python3 -m http.server 8765` ve složce projektu, otevřít http://localhost:8765
  (přímé otevření index.html ze složky nefunguje – prohlížeč nedovolí načíst fonty).
- V konzoli je `window.__generator` (vytvorPdf, ctiStav, zapisStav, spocitej) pro automatické testy.

## Otevřené otázky / úkoly
- [ ] Vojtěch potvrdí ceny a podmínky (poslán seznam 8. 10.)
- [ ] URSA: parametry jsou zatím z prohlášení o vlastnostech URSA PURE FLOC KD – ověřit podle technického listu od Vojtěcha
- [ ] Odesílání jednodušeji než přes Make – návrh poslán 8. 10., čeká na rozhodnutí
- [ ] Ověřit odeslání přes Make s novou verzí (nová pole namapovat ve scénáři, pokud je chce)
- [ ] Po schválení: sloučit `novy-design` do `main` a přepnout ostrou adresu
- [ ] Webhook je ve veřejném repozitáři – zvážit soukromé repo / přegenerování webhooku

## Historie změn
- 2026-04-01 – poslední úprava `main` před založením tohoto souboru
- 2026-10-08 – založen CLAUDE.md
- 2026-10-08 – větev `novy-design`: kompletně nová aplikace podle design systému, vektorové PDF,
  fasády (plochy + tloušťky), kontakty podle webu, nové logo, záklop 690, poznámka
- 2026-10-08 – přiložený technický list nahrazen výpisem technických parametrů (Paroc kompletně, URSA prozatímně)

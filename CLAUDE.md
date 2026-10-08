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
- **Hlavní adresa (od 8. 10. 2026):** https://nabidky-efekt-izolace.netlify.app – Netlify projekt
  `nabidky-efekt-izolace`, nahrává se ručně přetažením složky (Deploys → drag & drop).
- **Stará verze:** https://strong-tartufo-12ad44.netlify.app – už se nepoužívá, kód není na GitHubu.
- **GitHub:** Vojtechnovotny88/foukackaaplikace
  - `main` = aktuální verze (od 8. 10. 2026 = nový design); `novy-design` sloučena do `main`
- Historie a plán srozumitelně pro Vojtěcha: `docs/HISTORIE.md` – udržovat aktuální spolu s tímto souborem.

## Struktura
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
  foukana+fasada), blownTotal, facadeTotal, facadeAreaM2, note, emailSubject, emailBody.
- **Make scénář „Odesílání nabídek foukačka“** (rozhodnuto 8. 10.: Make zůstává): Webhook → Gmail „Send an email“
  z efektivniizolace@gmail.com, příloha = toBinary(pdfFileBase64). Nic dalšího (žádné Tabidoo, technický list
  přidávala stará aplikace sama). Aplikace posílá i emailSubject / emailBody (šablona v `nastaveni.js` → email).
- Číslo nabídky = RRRRMMDD-HHMM (už se neopakuje „-01“).
- Historie posledních 30 odeslaných nabídek v prohlížeči; načtení obnoví celý formulář (kromě fotek).

## Ceník (js/nastaveni.js) – potvrzeno Vojtěchem 8. 10. 2026
- Foukaná, Kč/m² vč. DPH: Paroc BLT 9 40/30/25/20 cm = 449/399/379/369 · URSA Pure Floc 640/610/590/570 ·
  DEKWOOL G 039r (role) 40/30/18 cm = 530/500/410.
- Lávka 380 Kč/bm, záklop 690 Kč/m², ohrádka 800 Kč/ks.
- Fasáda EPS, Kč/m² vč. DPH 12 %: 6=2240, 8=2270, 10=2300, 12=2340, 14=2370, 16=2400, 18=2450, 20=2500.
- Podmínky (foukaná 4 body, fasáda platby 50/25/25 + 5 bodů) podle Vojtěcha 8. 10. – texty v `nastaveni.js`,
  {platnostDni}/{platnostDo} se dosadí automaticky.
- Technické parametry: Paroc (technický list), URSA (technický list URSA Pure Floc, ETA-18/0889),
  DEKWOOL G 039r (dek.cz).

## Testování
- Lokálně: `python3 -m http.server 8765` ve složce projektu, otevřít http://localhost:8765
  (přímé otevření index.html ze složky nefunguje – prohlížeč nedovolí načíst fonty).
- V konzoli je `window.__generator` (vytvorPdf, ctiStav, zapisStav, spocitej) pro automatické testy.

## Otevřené otázky / úkoly
- [ ] Ověřit odeslání přes Make s novou verzí (na vlastní e-mail)
- [ ] Další fáze: víc fotek z realizací (sjednocený tón, jen autentické), logo Baumit u fasády – viz docs/HISTORIE.md
- [ ] Webhook je ve veřejném repozitáři – zvážit soukromé repo / přegenerování webhooku

## Historie změn
- 2026-04-01 – poslední úprava `main` před založením tohoto souboru
- 2026-10-08 – založen CLAUDE.md
- 2026-10-08 – větev `novy-design`: kompletně nová aplikace podle design systému, vektorové PDF,
  fasády (plochy + tloušťky), kontakty podle webu, nové logo, záklop 690, poznámka
- 2026-10-08 – přiložený technický list nahrazen výpisem technických parametrů (Paroc kompletně, URSA prozatímně)
- 2026-10-08 – nasazeno na nabidky-efekt-izolace.netlify.app, Make přemapován na emailSubject/emailBody,
  `novy-design` sloučena do `main`
- 2026-10-08 – nové ceny foukané izolace, nové podmínky, URSA podle technického listu, DEKWOOL G 039r

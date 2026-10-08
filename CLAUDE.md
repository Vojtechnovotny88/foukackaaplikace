# Generátor nabídek – Efektivní izolace (foukaná izolace)

Interní webová aplikace, ve které Vojtěch připravuje cenové nabídky na foukanou izolaci
(střecha / půda / mezi krokve) pro značku **Efektivní izolace s.r.o.**
Tento soubor je „paměť projektu“: kdo na projektu pracuje (Claude v chatu, Claude Code na Macu),
čte ho jako první a na konci práce ho aktualizuje (sekce Stav, Úkoly, Historie změn).

## Komunikace
- Vojtěch píše česky, chce stručné a praktické odpovědi.
- Terminál moc nepoužívá – každý příkaz vysvětlit jednoduše (co dělá, co čekat, jak spustit).

## Jak to funguje
- Jeden soubor `index.html` (Tailwind z CDN, html2pdf.js z CDN), obrázky vedle něj
  (`logo.png`, `realizace-1..3.jpg`). Žádný build.
- Vlevo formulář, vpravo živý náhled A4 nabídky.
- **Stáhnout PDF** – html2pdf.js (náhled se „vyfotí“ jako obrázek a vloží do PDF).
- **Odeslat e-mailem / Uložit** – vygeneruje PDF jako base64 a pošle JSON na Make.com webhook
  (`MAKE_WEBHOOK_URL` v kódu). Make posílá e-mail zákazníkovi a ukládá do Tabidoo.
  Pole: customerName, customerEmail, customerAddress, constructionType, material, thickness,
  areaM2, totalPrice, offerNumber, validUntil, sentAt, pdfFileName, pdfFileBase64.
- Historie posledních 10 odeslaných nabídek je jen v localStorage prohlížeče.

## Ceník (v kódu, objekt `pricing`)
- Paroc BLT 9 (kamenná vata): 40 cm 399 / 30 cm 379 / 25 cm 369 / 20 cm 359 Kč/m²
- URSA Pure Floc (skelná vata): 40 cm 570 / 30 cm 550 / 25 cm 540 / 20 cm 530 Kč/m²
- Rolovaná vata DEK: 40 cm 520 / 30 cm 490 / 18 cm 390 Kč/m²
- Lávka 380 Kč/bm, záklop 580 Kč/m², ohrádka prostupu výchozí 800 Kč/ks, 1 vlastní položka
- Skrytá přirážka se rozpustí do ceny za m². Ceny jsou vč. DPH.

## Nasazení
- GitHub: Vojtechnovotny88/foukackaaplikace (větev `main`), veřejný repozitář.
- Netlify: zatím neověřeno, která stránka je napojená – doplnit URL.

## Stav a známé problémy (k 8. 10. 2026)
- Telefon v nabídce +420 555 444 384 vs. web +420 799 558 004 – ověřit, který platí.
- U dodavatele chybí „s.r.o.“ a IČO (19978502).
- Číslo nabídky končí vždy „-01“ → více nabídek v jeden den má stejné číslo.
- Načtení z historie neobnoví lávku, záklop, ohrádky, vlastní položku, cenu za m² ani přirážku.
- Webhook URL je ve veřejném repozitáři – zvážit soukromé repo nebo přegenerování webhooku.
- PDF je obrázek (rozmazaný text, nejde označit, horší zalamování stránek).

## Úkoly
- [ ] Aktualizace údajů (Vojtěch upřesní co)
- [ ] Nový design nabídky podle vzoru od Vojtěcha
- [ ] Kvalitnější PDF (ostrý text, správné zalamování stránek)

## Historie změn
- 2026-04-01 – poslední úprava před založením tohoto souboru
- 2026-10-08 – založen CLAUDE.md s přehledem projektu

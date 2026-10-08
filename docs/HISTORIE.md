# Historie a plán – Generátor nabídek Efektivní izolace

Přehled toho, co se na aplikaci dělalo, proč, a co je v plánu.
Technické detaily pro práci s kódem jsou v `CLAUDE.md`, vizuální pravidla v `docs/DESIGN-SYSTEM.md`.

**Aplikace:** https://nabidky-efektivni-izolace.netlify.app (od 8. 10. 2026 hlavní adresa)
**Stará verze:** https://strong-tartufo-12ad44.netlify.app (už se nepoužívá, zůstává jen pro jistotu)

---

## Co jsme udělali

### 8. 10. 2026 – úklid a přehled
- Aplikace dohledána v repozitáři `foukackaaplikace`.
- Zjištěno, že ostrá verze (strong-tartufo) se liší od GitHubu – měla navíc poznámku, záklop 690 Kč,
  jiné ceny a připojovala technický list Paroc. Vše převzato do nové verze.
- Založen `CLAUDE.md` – „paměť projektu“, aby šlo navázat z jakéhokoli chatu nebo z Claude Code na Macu.

### 8. 10. 2026 – nová verze aplikace (větev `novy-design`)
- **Nový vzhled podle design systému** Efektivní izolace: tmavá úvodní část, nové logo, velká čísla,
  písmo Manrope, zelená jen jako akcent. Stejný vizuál ve formuláři i v PDF.
- **Skutečné PDF místo „fotky“**: ostrý text, který jde označit, rozumné zalamování stran,
  menší soubor. Náhled v aplikaci je přesně to PDF, které odejde zákazníkovi.
- **Fasády**: zaškrtnutí Foukaná izolace / Fasáda / obojí. U fasády plochy (označení, popis, m²,
  tloušťka 6–20 cm nebo „neřešeno“), rozpočet seskupený podle tloušťky, DPH 12 %, systém Baumit,
  platby 50/25/25 % i s částkami. Při obou službách souhrn na první straně.
- **Technické parametry místo přiloženého technického listu**: 3 klíčové hodnoty (tepelná vodivost
  podle konstrukce, tepelný odpor R vypočtený pro zvolenou tloušťku, třída reakce na oheň A1)
  + tabulka parametrů. Paroc BLT 9, URSA Pure Floc (podle technického listu), DEKWOOL G 039r (role).
  Objemová hmotnost se záměrně neuvádí.
- **Kontakty podle webu**: +420 799 558 004, Efektivní izolace s.r.o., IČO 19978502.
- **Nové ceny a podmínky** (potvrzeno 8. 10.):
  - Paroc 40/30/25/20 cm = 449/399/379/369 Kč/m² · URSA 640/610/590/570 · DEKWOOL 40/30/18 cm = 530/500/410
  - lávka 380 Kč/bm, záklop 690 Kč/m², ohrádka 800 Kč/ks
  - fasáda EPS 6–20 cm = 2 240–2 500 Kč/m² vč. DPH 12 %
- **Opravy**: číslo nabídky se už neopakuje (RRRRMMDD-HHMM), načtení z historie obnoví celý formulář.
- **Odesílání zůstává přes Make** (scénář „Odesílání nabídek foukačka“: Webhook → Gmail).
  Aplikace nově posílá i hotový předmět a text e-mailu (`emailSubject`, `emailBody`).
- Ceník, podmínky, texty e-mailu a kontakty jsou na jednom místě: `js/nastaveni.js`.

---

## Rozpracováno

- [ ] Nasadit novou verzi na https://nabidky-efektivni-izolace.netlify.app (Vojtěch, 8. 10.)
- [ ] Make: v modulu Gmail přemapovat Subject → `{{1.emailSubject}}`, text → `{{1.emailBody}}`
- [ ] Zkušební odeslání na vlastní e-mail
- [ ] Po potvrzení: sloučit `novy-design` do `main` (záloha na GitHubu)

## Plán – další kroky

### Fotky z realizací v nabídce
- Víc fotek z realizací tak, aby dávaly smysl k nabízené službě (půda / střecha / fasáda) a vypadaly hezky.
- Fotky sjednotit do jednotného vizuálního tónu (Vojtěch je upraví např. v ChatGPT).
  Pozor: jen barevné sladění a ořez – obsah fotky se nesmí měnit, musí zůstat skutečná realizace
  (pravidlo z design systému: negenerované, autentické fotky).
- U fasády logo Baumit (použít oficiální logo od Baumitu, ideálně partnerské materiály).
- Rozmyslet, kde v dokumentu fotky budou (úvod, u služby, závěr) a kolik jich je rozumné.

### Další nápady (nerozhodnuto)
- Webhook adresa je ve veřejném repozitáři – zvážit soukromý repozitář nebo nový webhook v Make.
- Propojit Netlify s GitHubem → každá úprava se nasadí sama, bez přetahování zipu.

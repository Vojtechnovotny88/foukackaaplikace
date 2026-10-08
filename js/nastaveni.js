/* =====================================================================
   NASTAVENÍ GENERÁTORU NABÍDEK – Efektivní izolace
   ---------------------------------------------------------------------
   Tady jsou všechny ceny, texty podmínek a kontakty na jednom místě.
   Ceny jsou v Kč za m² (u lávky za běžný metr, u ohrádky za kus),
   VČETNĚ DPH.
   ===================================================================== */

window.NASTAVENI = {

  /* ---------- Firma ---------- */
  firma: {
    nazev: 'Efektivní izolace s.r.o.',
    znacka: 'Efektivní izolace',
    ico: '19978502',
    ulice: 'Ostravská 438',
    mesto: '735 41 Petřvald',
    telefon: '+420 799 558 004',
    email: 'efektivniizolace@gmail.com',
    web: 'www.efektivniizolace.cz'
  },

  /* ---------- Make.com webhook (odeslání nabídky e-mailem + uložení do Tabidoo) ---------- */
  webhook: 'https://hook.eu2.make.com/ucjqvkazd3ahtgflguok9yrr3gsq57p1',

  /* ---------- Text e-mailu (posílá se do Make jako emailSubject / emailBody) ----------
     {jmeno} = jméno zákazníka, {sluzba} = např. „zateplení půdy a fasády“ */
  email: {
    predmet: 'Cenová nabídka na {sluzba} – {jmeno}',
    text: 'Dobrý den,\n\nv příloze zasíláme slíbenou cenovou nabídku na {sluzba}. Pokud by bylo cokoliv potřeba změnit nebo vysvětlit, jsme Vám k dispozici.\n\nS přáním hezkého dne\nVendula Pailová\nEfektivní izolace s.r.o.\nwww.efektivniizolace.cz\n+420 799 558 004\nefektivniizolace@gmail.com'
  },

  /* ---------- Platnost nabídky (výchozí počet dní) ---------- */
  platnostDni: 7,

  /* =====================================================================
     FOUKANÁ IZOLACE
     ===================================================================== */
  foukana: {
    konstrukce: ['Půda', 'Střecha', 'Střecha mezi krokve'],

    /* Technické parametry materiálů (vypisují se do nabídky).
       lambda.volne = λD pro volně foukanou vrstvu na strop/půdu,
       lambda.dutina = λD v uzavřené dutině / šikmině (použije se u „Střecha mezi krokve“).
       Tepelný odpor R se v nabídce dopočítá pro zvolenou tloušťku: R = tloušťka / λD.
       Objemovou hmotnost do nabídek záměrně neuvádíme. */
    materialy: {
      paroc: {
        nazev: 'Paroc BLT 9',
        typ: 'Kamenná minerální vlna – granulát pro foukání',
        ceny: { '40 cm': 449, '30 cm': 399, '25 cm': 379, '20 cm': 369 },
        lambda: { volne: 0.037, dutina: 0.034 },
        reakceNaOhen: 'A1',
        popis: 'Kamenná minerální izolace ve formě granulátu. Je nehořlavá, v průběhu let nedegraduje, nemění své vlastnosti a drží stabilní objem. Dobře tlumí hluk a je difuzně otevřená, takže chrání konstrukci před vlhkostí.',
        parametry: [
          ['Součinitel tepelné vodivosti λD – volně foukaná vrstva', '0,037 W/mK', 'EN 12667'],
          ['Součinitel tepelné vodivosti λD – v dutině a šikmině', '0,034 W/mK', 'EN 12667'],
          ['Třída reakce na oheň', 'A1 – nehořlavý', 'EN 13501-1'],
          ['Hořlavost', 'nehořlavý', 'EN ISO 1182'],
          ['Teplota tání vláken', 'přes 1 000 °C', ''],
          ['Faktor difuzního odporu µ', '1 – difuzně otevřený', 'EN 12086'],
          ['Třída sesedání', 'S2 volně foukaná · S1 v dutině', 'EN 14064-1'],
          ['Stálost vlastností', 'tepelná vodivost ani požární vlastnosti se časem nemění', ''],
          ['Označení výrobku', 'MW-EN14064-1-S1-MU1 / S2-MU1', ''],
          ['Certifikát', '0809-CPR-1014 (VTT Expert Services)', '']
        ]
      },
      ursa: {
        nazev: 'URSA Pure Floc',
        typ: 'Skelná minerální vlna – granulát pro foukání',
        ceny: { '40 cm': 640, '30 cm': 610, '25 cm': 590, '20 cm': 570 },
        lambda: { volne: 0.036, dutina: 0.034 },
        reakceNaOhen: 'A1',
        popis: 'Minerální izolace na bázi skla se známkou kvality RAL, která potvrzuje její zdravotní nezávadnost. Je lehká, nedoutná, dobře propouští vodní páru a vyplní i malé dutiny v konstrukci.',
        // zdroj: Technický list URSA Pure Floc (ETA-18/0889)
        parametry: [
          ['Součinitel tepelné vodivosti λD – volně foukaná vrstva', '0,036 W/mK', 'ČSN EN 14064-1'],
          ['Součinitel tepelné vodivosti λD – uzavřené dutiny', '0,034 W/mK', 'ČSN EN 14064-1'],
          ['Třída reakce na oheň', 'A1 – nehořlavý', 'ČSN EN 13501-1'],
          ['Doutnání', 'materiál nedoutná', 'ČSN EN 16733'],
          ['Faktor difuzního odporu µ', '1 – difuzně otevřený', 'ČSN EN 12086'],
          ['Sesedání', 'volně foukaná 10 % · v dutinách žádné (SC 0)', 'EN 15101-1'],
          ['Odpor při proudění vzduchu', '≥ 10 kPa·s/m² volně · ≥ 20 kPa·s/m² v dutinách', 'ČSN EN 29053'],
          ['Kvalita a ekologie', 'známka kvality RAL, ekoznačka Blauer Engel', ''],
          ['Evropské technické posouzení', 'ETA-18/0889', '']
        ]
      },
      role: {
        nazev: 'DEKWOOL G 039r',
        typ: 'Skelná minerální vlna v rolích',
        ceny: { '40 cm': 530, '30 cm': 500, '18 cm': 410 },
        lambda: { volne: 0.039, dutina: 0.039 },
        reakceNaOhen: 'A1',
        popis: 'Víceúčelová tepelná izolace ze skleněných minerálních vláken v rolích, určená do stropů a podlah. Je nehořlavá a difuzně otevřená. Role pokládáme ve více vrstvách s převazbou spár, aby nevznikaly tepelné mosty.',
        // zdroj: dek.cz – DEKWOOL G 039r
        parametry: [
          ['Materiál', 'MW – skelná minerální vlákna', ''],
          ['Součinitel tepelné vodivosti λD', '0,039 W/mK', 'EN 12667'],
          ['Třída reakce na oheň', 'A1 – nehořlavý', 'EN 13501-1'],
          ['Faktor difuzního odporu µ', '1 – difuzně otevřený', 'EN 12086'],
          ['Použití', 'tepelná izolace stropů a nezatížených podlah', '']
        ]
      }
    },

    priplatky: {
      lavka: { nazev: 'Pochozí servisní lávka (šířka 62 cm)', jednotka: 'bm', cena: 380 },
      zaklop: { nazev: 'Záklop – pochozí plocha nad izolací', jednotka: 'm²', cena: 690 },
      ohradka: { nazev: 'Ohrádka prostupu', jednotka: 'ks', cena: 800 }
    },

    // {platnostDni} a {platnostDo} se v nabídce nahradí skutečnými hodnotami
    podminky: [
      { nadpis: 'Bez zálohy', text: 'Nevybíráme zálohy. Platí se až po dokončení realizace a podpisu předávacího protokolu.' },
      { nadpis: 'Konečná cena', text: 'Cena je konečná a zahrnuje materiál, práci, dopravu a úklid.' },
      { nadpis: 'Tloušťka po sesednutí', text: 'Tloušťku izolace počítáme po sesednutí materiálu. Aplikujeme podle doporučení výrobce.' },
      { nadpis: 'Platnost nabídky', text: 'Nabídka platí {platnostDni} dní, do {platnostDo}.' }
    ]
  },

  /* =====================================================================
     FASÁDA – kontaktní zateplovací systém Baumit (ETICS, EPS)
     ===================================================================== */
  fasada: {
    sazbaDph: 12,                  // %
    vychoziTloustka: 14,           // cm
    ceny: { 6: 2240, 8: 2270, 10: 2300, 12: 2340, 14: 2370, 16: 2400, 18: 2450, 20: 2500 }, // Kč/m² vč. DPH

    system: {
      uvod: 'Fasádu zateplíme kontaktním zateplovacím systémem Baumit (ETICS) s izolantem z expandovaného polystyrenu. Lepidlo, izolant, kotvy, výztužná vrstva i omítka jsou navzájem sladěné a pochází od jednoho výrobce. Systém je certifikovaný podle evropských pravidel pro zateplovací systémy a provádí se podle české normy pro provádění ETICS.',
      vrstvy: [
        { nazev: 'Lepicí hmota', text: 'Desky izolantu se celoplošně lepí na připravený podklad.' },
        { nazev: 'Izolant z EPS', text: 'Fasádní polystyren v tloušťce podle rozpočtu.' },
        { nazev: 'Kotvení', text: 'Desky se kromě lepení mechanicky ukotví talířovými hmoždinkami.' },
        { nazev: 'Výztužná vrstva', text: 'Stěrková hmota se sklotextilní síťovinou, rohové a připojovací profily.' },
        { nazev: 'Penetrace', text: 'Základní nátěr sjednotí podklad pod finální omítku.' },
        { nazev: 'Fasádní omítka', text: 'Probarvená omítka ve zvoleném odstínu.' }
      ]
    },

    platby: [
      { procento: 50, text: 'Při dodání izolantu. Při nedostatku místa na stavbě dodáváme po etapách v průběhu realizace dle možností.' },
      { procento: 25, text: 'Po nalepení izolantu na všechny zateplované plochy.' },
      { procento: 25, text: 'Po dokončení prací a předání fasády.' }
    ],

    podminky: [
      { nadpis: 'Lešení v ceně', text: 'Lešení zajišťujeme my a je součástí ceny.' },
      { nadpis: 'Výměry ploch', text: 'Plochy oken a dveří se neodečítají, protože cena zahrnuje zateplení špalet.' },
      { nadpis: 'Termín realizace', text: 'Termín upřesníme po potvrzení nabídky, závisí na počasí. Standardně do 60 dní.' },
      { nadpis: 'Odstín omítky', text: 'Odstín omítky se vybírá podle fyzického vzorníku a lze ho upřesnit i v průběhu realizace. Případné příplatkové odstíny doceňujeme.' },
      { nadpis: 'Platnost nabídky', text: 'Nabídka platí {platnostDni} dní, do {platnostDo}.' }
    ]
  },

  /* ---------- Společné texty ---------- */
  texty: {
    uvod: 'na základě Vaší poptávky Vám předkládáme cenovou nabídku na zateplení Vašeho objektu. Ceny níže zahrnují materiál, práci i dopravu.',
    platnost: 'Nabídka je nezávazná do podpisu smlouvy o dílo.'
  }
};

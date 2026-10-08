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

  /* ---------- Platnost nabídky (výchozí počet dní) ---------- */
  platnostDni: 7,

  /* =====================================================================
     FOUKANÁ IZOLACE
     ===================================================================== */
  foukana: {
    konstrukce: ['Půda', 'Střecha', 'Střecha mezi krokve'],

    materialy: {
      paroc: {
        nazev: 'Paroc BLT 9',
        typ: 'Kamenná minerální vlna',
        ceny: { '40 cm': 399, '30 cm': 379, '25 cm': 369, '20 cm': 359 },
        parametry: [
          { hodnota: '0,037', jednotka: 'W/mK', popis: 'Součinitel tepelné vodivosti λD (volně foukaná)' },
          { hodnota: 'A1', jednotka: '', popis: 'Třída reakce na oheň – nehořlavý materiál' }
        ],
        popis: 'Kamenná minerální izolace ve formě granulátu. Je nehořlavá, v průběhu let nedegraduje, nemění své vlastnosti a drží stabilní objem. Dobře tlumí hluk a je difuzně otevřená, takže chrání konstrukci před vlhkostí.',
        technickyList: 'assets/listy/paroc-blt9.pdf'
      },
      ursa: {
        nazev: 'URSA Pure Floc',
        typ: 'Skelná minerální vlna',
        ceny: { '40 cm': 570, '30 cm': 550, '25 cm': 540, '20 cm': 530 },
        parametry: [
          { hodnota: '0,034', jednotka: 'W/mK', popis: 'Součinitel tepelné vodivosti λ (až)' },
          { hodnota: 'A1', jednotka: '', popis: 'Třída reakce na oheň – nehořlavý materiál' }
        ],
        popis: 'Minerální izolace na bázi skla se známkou kvality RAL. Je lehká, dobře propouští vodní páru a vyplní i malé dutiny v konstrukci.',
        technickyList: null
      },
      role: {
        nazev: 'Rolovaná vata DEK',
        typ: 'Minerální vlna v rolích',
        ceny: { '40 cm': 520, '30 cm': 490, '18 cm': 390 },
        parametry: [],
        popis: 'Izolace z minerální vlny určená pro pokládku. Je nehořlavá a difuzně otevřená. Pečlivá pokládka bez mezer omezuje tepelné mosty.',
        technickyList: null
      }
    },

    priplatky: {
      lavka: { nazev: 'Pochozí servisní lávka (šířka 62 cm)', jednotka: 'bm', cena: 380 },
      zaklop: { nazev: 'Záklop – pochozí plocha nad izolací', jednotka: 'm²', cena: 690 },
      ohradka: { nazev: 'Ohrádka prostupu', jednotka: 'ks', cena: 800 }
    },

    podminky: [
      { nadpis: 'Bez zálohy', text: 'Nevybíráme žádné zálohy. Platba probíhá až po dokončení realizace a podpisu předávacího protokolu.' },
      { nadpis: 'Konečná cena', text: 'Cena zahrnuje veškerý materiál, práci, dopravu a úklid pracoviště.' },
      { nadpis: 'Garantovaná tloušťka', text: 'Tloušťku foukané izolace počítáme po přirozeném sesednutí materiálu. Aplikujeme více, abyste dostali zaplacenou vrstvu.' }
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
      { procento: 50, text: 'Při dodání izolantu. Pokud na stavbě není místo na celé množství, dodáváme po etapách.' },
      { procento: 25, text: 'Po nalepení izolantu na všechny zateplované plochy.' },
      { procento: 25, text: 'Po dokončení prací a předání fasády.' }
    ],

    podminky: [
      { nadpis: 'Lešení v ceně', text: 'Lešení zajišťujeme my a je součástí zakázky.' },
      { nadpis: 'Výměry ploch', text: 'Plochy oken a dveří z výměr neodečítáme z důvodu zohlednění nákladovosti špalet.' },
      { nadpis: 'Termín realizace', text: 'Konkrétní harmonogram upřesníme po potvrzení nabídky. Zateplovací práce závisí na počasí.' },
      { nadpis: 'Odstín omítky', text: 'Finální odstín doporučujeme vybrat podle fyzického vzorníku.' }
    ]
  },

  /* ---------- Společné texty ---------- */
  texty: {
    uvod: 'na základě Vaší poptávky Vám předkládáme cenovou nabídku na zateplení Vašeho objektu. Ceny níže zahrnují materiál, práci i dopravu.',
    platnost: 'Nabídka je nezávazná do podpisu smlouvy o dílo.'
  }
};

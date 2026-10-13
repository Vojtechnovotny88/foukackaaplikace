/* =====================================================================
   SESTAVENÍ PDF DOKUMENTU (pdfmake)
   Vstup: vypočtená nabídka (viz app.js → spocitej) a obrázky jako dataURL.
   Vzhled podle docs/DESIGN-SYSTEM.md: charcoal + off-white + střídmá zelená,
   Manrope, tenké linky, velká čísla.
   ===================================================================== */

(function () {
  const C = {
    primary: '#171A18', darkAlt: '#202420', accent: '#7FC51B', b400: '#91D52B', b700: '#4E8012',
    bg: '#F4F4EF', surfEl: '#FAFAF7', t2: '#626861', t3: '#858B84', inv: '#F7F8F3', invM: '#B9BEB8',
    border: '#D8DCD5', borderD: '#343A34'
  };
  const PAGE_W = 595.28, MX = 44, MT = 58, MB = 54;
  const CW = PAGE_W - 2 * MX;               // šířka obsahu

  const fmt = n => Math.round(n).toLocaleString('cs-CZ').replace(/ /g, ' ');
  const kc = n => fmt(n) + ' Kč';
  const m2 = n => (Math.round(n * 100) / 100).toLocaleString('cs-CZ', { maximumFractionDigits: 2 }).replace(/ /g, ' ') + ' m²';
  const pad2 = i => String(i).padStart(2, '0');

  /* ---------- drobné stavební prvky ---------- */
  const rule = (w, color, h = 1) => ({ canvas: [{ type: 'rect', x: 0, y: 0, w, h, color }], margin: [0, 0, 0, 0] });
  const label = (t, color = C.t3, extra = {}) => Object.assign({ text: t.toUpperCase(), fontSize: 6.8, bold: true, characterSpacing: 0.7, color }, extra);

  function sekce(cislo, eyebrow, nadpis, uvod) {
    const s = [
      { text: [{ text: pad2(cislo) + '  ', color: C.b700 }, { text: eyebrow.toUpperCase(), color: C.t2 }], fontSize: 7, bold: true, characterSpacing: 0.8 },
      { text: nadpis, fontSize: 20, bold: true, characterSpacing: -0.5, lineHeight: 1.05, margin: [0, 6, 0, 8] },
      rule(28, C.accent, 2)
    ];
    if (uvod) s.push({ text: uvod, color: C.t2, margin: [0, 10, 0, 0] });
    return { stack: s, margin: [0, 0, 0, 16] };
  }

  const h3 = (t, extra = {}) => Object.assign({ text: t, fontSize: 12.5, bold: true, characterSpacing: -0.2, margin: [0, 18, 0, 8], headlineLevel: 1 }, extra);

  // tabulka s tenkými linkami
  function tabulka(widths, head, rows, opts = {}) {
    const body = [head.map((h, i) => ({ text: h.toUpperCase(), fontSize: 6.6, bold: true, characterSpacing: 0.6, color: C.t3, alignment: opts.align && opts.align[i] || 'left' }))];
    rows.forEach(r => body.push(r.map((c, i) => {
      const cell = typeof c === 'object' && !Array.isArray(c) ? c : { text: c };
      if (opts.align && opts.align[i] && !cell.alignment) cell.alignment = opts.align[i];
      return cell;
    })));
    return {
      table: { headerRows: 1, dontBreakRows: true, widths, body },
      layout: {
        hLineWidth: (i, node) => (i === 0 ? 0 : i === 1 ? 1 : 0.6),
        hLineColor: (i) => (i === 1 ? C.primary : C.border),
        vLineWidth: () => 0,
        paddingLeft: (i) => (i === 0 ? 0 : 6), paddingRight: (i, node) => (i === node.table.widths.length - 1 ? 0 : 6),
        paddingTop: () => 6, paddingBottom: () => 6
      },
      margin: opts.margin || [0, 0, 0, 0]
    };
  }

  // tmavý blok s celkovou cenou
  function celkem(popis, pod, castka) {
    return {
      table: {
        widths: ['*'],
        body: [[{
          columns: [
            { width: '*', stack: [label(popis, C.invM), pod ? { text: pod, color: C.invM, fontSize: 8, margin: [0, 3, 0, 0] } : ''], margin: [0, 2, 0, 0] },
            { width: 'auto', text: kc(castka), fontSize: 21, bold: true, color: C.b400, characterSpacing: -0.4, alignment: 'right' }
          ]
        }]]
      },
      layout: {
        fillColor: () => C.primary, hLineWidth: () => 0, vLineWidth: () => 0,
        paddingLeft: () => 14, paddingRight: () => 14, paddingTop: () => 12, paddingBottom: () => 12
      },
      margin: [0, 10, 0, 0], unbreakable: true
    };
  }

  // mřížka bloků (podmínky, vrstvy…) – n sloupců, nahoře linka
  function mrizka(polozky, n, render, prvniZelena = false) {
    const gap = 16, w = (CW - gap * (n - 1)) / n, radky = [];
    for (let i = 0; i < polozky.length; i += n) {
      const cols = [];
      for (let j = 0; j < n; j++) {
        const p = polozky[i + j], idx = i + j;
        cols.push(p ? { width: w, stack: [rule(w, prvniZelena && idx === 0 ? C.accent : C.border, prvniZelena && idx === 0 ? 2 : 1)].concat(render(p, idx)) } : { width: w, text: '' });
      }
      radky.push({ columns: cols, columnGap: gap, margin: [0, i ? 14 : 0, 0, 0], unbreakable: true });
    }
    return { stack: radky };
  }

  const podminkaBlok = (p, i) => [
    { text: pad2(i + 1), fontSize: 7, bold: true, color: C.b700, margin: [0, 7, 0, 3] },
    { text: p.nadpis, bold: true, fontSize: 9.5, margin: [0, 0, 0, 3] },
    { text: p.text, color: C.t2, fontSize: 8.5 }
  ];

  function poznamka(text) {
    return {
      table: { widths: ['*'], body: [[{ stack: [label('Poznámka', C.t2), { text, margin: [0, 4, 0, 0] }] }]] },
      layout: {
        fillColor: () => C.bg, hLineWidth: () => 0,
        vLineWidth: (i) => (i === 0 ? 2 : 0), vLineColor: () => C.accent,
        paddingLeft: () => 12, paddingRight: () => 12, paddingTop: () => 10, paddingBottom: () => 10
      },
      margin: [0, 16, 0, 0], unbreakable: true
    };
  }

  // řádek klíčových čísel
  function statRail(staty) {
    const n = staty.length, gap = n > 4 ? 10 : 14, vahy = staty.map(s => s.vaha || 1), sum = vahy.reduce((a, b) => a + b, 0);
    const husto = n > 4;
    return {
      columns: staty.map((s, i) => {
        const w = (CW - gap * (n - 1)) * vahy[i] / sum;
        return {
          width: w,
          stack: [
            rule(w, i === 0 ? C.accent : C.border, i === 0 ? 2 : 1),
            label(s.popis, C.t2, { margin: [0, 8, 0, 4] }),
            { text: [{ text: s.hodnota, fontSize: s.velke ? (husto ? 17 : 19) : (husto ? 13 : 15), bold: true, characterSpacing: -0.4 }, s.jednotka ? { text: ' ' + s.jednotka, fontSize: husto ? 8 : 9, bold: true, color: C.t2 } : ''] }
          ]
        };
      }),
      columnGap: gap, margin: [0, 18, 0, 0]
    };
  }

  function strany(odberatel, dodavatel) {
    const w = (CW - 24) / 2;
    const blok = (titul, radky) => ({
      width: w, stack: [label(titul, C.t2, { margin: [0, 0, 0, 5] }), rule(w, C.border, 0.75)].concat(
        radky.filter(Boolean).map((r, i) => ({ text: r, bold: i === 0, margin: [0, i === 0 ? 7 : 1.5, 0, 0], color: i === 0 ? C.primary : C.t2 })))
    });
    return { columns: [blok('Odběratel / místo realizace', odberatel), blok('Dodavatel', dodavatel)], columnGap: 24, margin: [0, 18, 0, 0] };
  }

  function fotky(obrazky, vyska) {
    const n = obrazky.length; if (!n) return null;
    const gap = 8, w = (CW - gap * (n - 1)) / n;
    return { columns: obrazky.map(src => ({ width: w, image: src, width: w, height: vyska })), columnGap: gap };
  }

  // řádek „V ceně je zahrnuto“
  function vCeneBox(polozky, margin) {
    return {
      table: { widths: ['auto', '*'], body: [[
        label('V ceně je zahrnuto', C.t2, { margin: [0, 1.5, 0, 0] }),
        { text: polozky.join('  ·  '), bold: true, fontSize: 8.6 }
      ]] },
      layout: { fillColor: () => C.bg, hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: (i) => i === 0 ? 12 : 10, paddingRight: () => 12, paddingTop: () => 9, paddingBottom: () => 9 },
      margin: margin || [0, 14, 0, 0], unbreakable: true
    };
  }

  // decentní klikací odkaz
  const odkaz = (text, url, extra = {}) => Object.assign({ text: [{ text: text + '  ', link: url, bold: true, color: C.primary, decoration: 'underline', decorationColor: C.border }, { text: '→', link: url, bold: true, color: C.b700 }], fontSize: 8.8 }, extra);

  // seznam s odrážkou (zelená krátká čárka) ve 2 sloupcích
  function seznam2(polozky, barvaZnacky) {
    const gap = 24, w = (CW - gap) / 2, half = Math.ceil(polozky.length / 2);
    const sl = arr => ({
      width: w,
      table: { widths: [13, '*'], body: arr.map(t => [{ canvas: [{ type: 'rect', x: 0, y: 5.4, w: 7, h: 1.6, color: barvaZnacky || C.accent }] }, { text: t }]) },
      layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 5 }
    });
    return { columns: [sl(polozky.slice(0, half)), sl(polozky.slice(half))], columnGap: gap };
  }

  // skladba jako horizontální proces 01–06 (linka + číslované čtverečky)
  function skladbaV(vrstvy) {
    const n = vrstvy.length, gap = 8, w = (CW - gap * (n - 1)) / n, sq = 18;
    const posledni = i => i === n - 1;
    return {
      stack: [
        { canvas: [{ type: 'line', x1: 0, y1: sq / 2, x2: CW, y2: sq / 2, lineWidth: 1, lineColor: C.border }].concat(
          vrstvy.map((v, i) => ({ type: 'rect', x: i * (w + gap), y: 0, w: sq, h: sq, color: posledni(i) ? C.accent : C.primary }))) },
        { columns: vrstvy.map((v, i) => ({ width: w, text: pad2(i + 1), bold: true, fontSize: 7.4, lineHeight: 1, color: posledni(i) ? C.primary : C.inv, margin: [4.4, 0, 0, 0] })), columnGap: gap, margin: [0, -13.2, 0, 0] },
        {
          columns: vrstvy.map((v) => ({
            width: w, stack: [
              { text: v.nazev, bold: true, fontSize: 8.6, lineHeight: 1.15, margin: [0, 0, 0, 3] },
              { text: v.text, fontSize: 7.6, color: C.t2, lineHeight: 1.28 }
            ]
          })), columnGap: gap, margin: [0, 10, 0, 0]
        }
      ]
    };
  }

  /* ---------- hlavní funkce ---------- */
  window.sestavDokument = function (d, a) {
    const N = window.NASTAVENI, F = N.firma;
    const content = [];
    let cisloSekce = 0;

    /* ===== Úvodní tmavý blok ===== */
    const sluzbyLabel = [d.foukana && 'Foukaná izolace', d.fasada && 'Fasáda Baumit'].filter(Boolean).join('  ·  ');
    content.push({
      table: {
        widths: ['*'],
        body: [[{
          stack: [
            {
              columns: [
                { width: 'auto', image: a.logo, width: 30 },
                { width: '*', stack: [{ text: 'Efektivní', color: C.inv }, { text: 'izolace', color: C.b400 }], bold: true, fontSize: 11, lineHeight: 0.95, margin: [9, 2, 0, 0] },
                {
                  width: 'auto', alignment: 'right', stack: [
                    label('Cenová nabídka', C.invM),
                    { text: 'č. ' + d.cislo, color: C.inv, bold: true, fontSize: 10.5, margin: [0, 3, 0, 1] },
                    { text: 'Vystaveno ' + d.datum, color: C.invM, fontSize: 8 }
                  ]
                }
              ]
            },
            label(sluzbyLabel, C.b400, { margin: [0, 30, 0, 7] }),
            { text: d.nadpis, color: C.inv, fontSize: 26, bold: true, characterSpacing: -0.9, lineHeight: 1.02 },
            { text: [d.zakaznik.jmeno || 'Zákazník', d.zakaznik.adresa ? '  ·  ' + d.zakaznik.adresa : ''].join(''), color: C.invM, fontSize: 10, margin: [0, 10, 0, 0] }
          ]
        }]]
      },
      layout: {
        fillColor: () => C.primary, hLineWidth: () => 0, vLineWidth: () => 0,
        paddingLeft: () => MX, paddingRight: () => MX, paddingTop: () => 30, paddingBottom: () => 24
      },
      margin: [-MX, -MT, -MX, 0]
    });

    /* ===== Klíčová čísla ===== */
    const staty = [{ popis: 'Cena celkem vč. DPH', hodnota: fmt(d.celkem), jednotka: 'Kč', velke: true }];
    if (d.foukana && d.fasada) {
      staty.push({ popis: 'Foukaná izolace', hodnota: fmt(d.foukana.celkem), jednotka: 'Kč' });
      staty.push({ popis: 'Fasáda', hodnota: fmt(d.fasada.celkem), jednotka: 'Kč' });
    } else if (d.foukana) {
      staty.push({ popis: 'Plocha', hodnota: m2(d.foukana.plocha).replace(' m²', ''), jednotka: 'm²' });
      staty.push({ popis: 'Tloušťka izolace', hodnota: d.foukana.tloustka.replace(' cm', ''), jednotka: 'cm' });
    } else if (d.fasada) {
      staty[0].vaha = 1.35;
      staty.push({ popis: 'Plocha k zateplení', hodnota: m2(d.fasada.vymera).replace(' m²', ''), jednotka: 'm²' });
      const rozsahEps = /–/.test(d.fasada.izolantText);
      staty.push({ popis: rozsahEps ? 'Izolant EPS' : 'Izolant', hodnota: d.fasada.izolantText.replace(/ mm$/, '').replace(rozsahEps ? /^EPS / : /$^/, ''), jednotka: 'mm', vaha: 1.1 });
      staty.push({ popis: 'Cena za m² vč. DPH', hodnota: d.fasada.cenaM2Text, jednotka: 'Kč/m²', vaha: 1.2 });
    }
    staty.push({ popis: 'Platnost nabídky', hodnota: d.platnostDo });
    content.push(statRail(staty));
    if (d.fasada && !d.foukana) content.push(vCeneBox(N.fasada.vCene));

    /* ===== Strany ===== */
    content.push(strany(
      [d.zakaznik.jmeno || 'Nezadáno', d.zakaznik.adresa, d.zakaznik.telefon, d.zakaznik.email],
      [F.nazev, F.ulice + ', ' + F.mesto, 'IČO ' + F.ico, F.telefon + '  ·  ' + F.email]
    ));

    /* ===== Úvod ===== */
    content.push({ stack: [{ text: 'Dobrý den,', bold: true }, { text: d.uvod, color: C.t2, margin: [0, 4, 0, 0] }], margin: [0, 18, 0, 0] });

    /* ===== Souhrn (jen když jsou obě služby) ===== */
    if (d.foukana && d.fasada) {
      content.push({
        stack: [
          h3('Souhrn nabídky', { margin: [0, 18, 0, 6] }),
          tabulka(['*', 90, 100], ['Služba', 'Rozsah', 'Cena vč. DPH'], [
            [{ stack: [{ text: d.foukana.nazevSluzby, bold: true }, { text: d.foukana.material.nazev + ', ' + d.foukana.tloustka, color: C.t2, fontSize: 8.5 }] }, m2(d.foukana.plocha), { text: kc(d.foukana.celkem), bold: true }],
            [{ stack: [{ text: 'Zateplení fasády', bold: true }, { text: 'Systém Baumit, ' + d.fasada.izolantText + ', omítka Baumit SilikonTop', color: C.t2, fontSize: 8.5 }] }, m2(d.fasada.vymera), { text: kc(d.fasada.celkem), bold: true }]
          ], { align: [null, 'right', 'right'] }),
          celkem('Cena celkem vč. DPH', 'Podrobný rozpis a podmínky najdete u jednotlivých služeb.', d.celkem)
        ], unbreakable: true
      });
    }

    /* ===== FOUKANÁ IZOLACE ===== */
    if (d.foukana) {
      const f = d.foukana, mat = f.material;
      const zacatek = [];
      zacatek.push(sekce(++cisloSekce, 'Foukaná izolace', f.nazevSluzby, null));
      zacatek.push(tabulka(['*', 64, 70, 78], ['Položka', 'Množství', 'Cena za jedn.', 'Celkem'],
        f.radky.map(r => [
          { stack: [{ text: r.nazev, bold: true }].concat(r.sub ? [{ text: r.sub, color: C.t2, fontSize: 8.5 }] : []) },
          r.mnozstvi, kc(r.cenaJ), { text: kc(r.celkem), bold: true }
        ]), { align: [null, 'right', 'right', 'right'] }));
      content.push({ stack: zacatek, unbreakable: true, pageBreak: d.fasada ? 'before' : undefined, margin: [0, d.fasada ? 0 : 26, 0, 0] });
      content.push(celkem('Cena celkem vč. DPH', 'Materiál, práce, doprava a úklid pracoviště', f.celkem));

      // materiál + technické parametry
      const klic = [];
      if (f.lambda) klic.push({ hodnota: f.lambda.toLocaleString('cs-CZ', { minimumFractionDigits: 3 }), jednotka: 'W/mK', popis: 'Součinitel tepelné vodivosti λD – ' + (f.dutina ? 'v dutině a šikmině' : 'volně foukaná vrstva') });
      if (f.odporR) klic.push({ hodnota: f.odporR.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), jednotka: 'm²K/W', popis: 'Tepelný odpor vrstvy ' + f.tloustka + ' (vypočteno R = d / λD)' });
      if (mat.reakceNaOhen) klic.push({ hodnota: mat.reakceNaOhen, jednotka: '', popis: 'Třída reakce na oheň – nehořlavý materiál' });
      const gapT = 10, wT = klic.length ? (CW - gapT * (klic.length - 1)) / klic.length : 0;
      const tiles = klic.length ? {
        columns: klic.map(p => ({
          width: wT,
          table: {
            widths: ['*'], body: [[{
              stack: [
                { text: [{ text: p.hodnota, fontSize: 18, bold: true, characterSpacing: -0.3 }, p.jednotka ? { text: ' ' + p.jednotka, fontSize: 8.5, bold: true, color: C.t2 } : ''] },
                { text: p.popis, fontSize: 7.4, color: C.t2, margin: [0, 4, 0, 0] }
              ]
            }]]
          },
          layout: { fillColor: () => C.bg, hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 12, paddingRight: () => 12, paddingTop: () => 11, paddingBottom: () => 11 }
        })), columnGap: gapT, margin: [0, 12, 0, 0]
      } : null;
      content.push({
        stack: [
          h3('Materiál: ' + mat.nazev),
          label(mat.typ, C.t2, { margin: [0, 0, 0, 4] }),
          { text: mat.popis, color: C.t2 },
          tiles
        ].filter(Boolean), unbreakable: true
      });
      if (f.technickeParametry && mat.parametry && mat.parametry.length) {
        content.push({
          stack: [
            h3('Technické parametry', { margin: [0, 16, 0, 8] }),
            tabulka(['*', 205, 66], ['Parametr', 'Hodnota', 'Norma'],
              mat.parametry.map(r => [r[0], { text: r[1], bold: true }, { text: r[2] || '', color: C.t3, fontSize: 8 }]),
              { align: [null, null, 'right'] }),
            { text: 'Údaje podle technického listu a prohlášení o vlastnostech výrobce.', fontSize: 7.6, color: C.t3, margin: [0, 6, 0, 0] }
          ], unbreakable: true
        });
      }

      content.push({ stack: [h3('Platební a dodací podmínky'), mrizka(f.podminky, f.podminky.length === 4 ? 2 : 3, podminkaBlok, true)], unbreakable: true });
      if (f.poznamka) content.push(poznamka(f.poznamka));
    }

    /* ===== FASÁDA ===== */
    if (d.fasada) {
      const s = d.fasada, S = N.fasada, om = S.system.omitka;
      content.push({ stack: [sekce(++cisloSekce, 'Fasáda', 'Zateplení fasády systémem Baumit', s.uvodSekce)], pageBreak: d.foukana ? 'before' : undefined, margin: [0, d.foukana ? 0 : 26, 0, 0] });

      // soupis ploch + způsob výpočtu výměry
      content.push(h3('Soupis ploch', { margin: [0, 0, 0, 8] }));
      content.push(tabulka([46, '*', 70, 80], ['Plocha', 'Popis', 'Výměra', 'Izolant'],
        s.plochy.map(p => [
          { text: p.kod || '–', bold: true }, { text: p.popis || '', color: p.tloustka ? C.primary : C.t3 },
          { text: m2(p.vymera), color: p.tloustka ? C.primary : C.t3 },
          p.tloustka ? 'EPS ' + p.tloustka * 10 + ' mm' : { text: 'neřešeno', color: C.t3 }
        ]).concat([[{ text: 'Celkem k zateplení', bold: true, colSpan: 2 }, '', { text: m2(s.vymera), bold: true }, '']]),
        { align: [null, null, 'right', 'right'] }));
      content.push({ text: [{ text: 'Způsob výpočtu výměry: ', bold: true }, S.texty.vymera], fontSize: 8, color: C.t2, margin: [0, 7, 0, 0] });

      // rozpočet
      const rows = s.skupiny.map(g => [
        { text: 'Izolant EPS ' + g.tloustka * 10 + ' mm', bold: true }, { text: g.kody, color: C.t2 },
        m2(g.vymera), kc(g.cenaM2) + '/m²', { text: kc(g.celkem), bold: true }
      ]).concat(s.polozky.map(p => [{ text: p.nazev, bold: true }, '', '1 soub.', kc(p.cena), { text: kc(p.cena), bold: true }]));
      rows.push([{ text: 'Cena bez DPH', colSpan: 4, color: C.t2 }, '', '', '', { text: kc(s.bezDph), color: C.t2 }]);
      rows.push([{ text: 'DPH ' + s.sazbaDph + ' %', colSpan: 4, color: C.t2 }, '', '', '', { text: kc(s.dph), color: C.t2 }]);
      content.push({
        stack: [
          h3('Rozpočet'),
          tabulka(['*', 70, 62, 76, 80], ['Položka', 'Plochy', 'Výměra', 'Cena za m²', 'Cena vč. DPH'], rows, { align: [null, null, 'right', 'right', 'right'] })
        ], unbreakable: true
      });
      content.push(celkem('Cena fasády celkem vč. DPH', 'Kompletní realizace včetně lešení a finální silikonové omítky Baumit SilikonTop', s.celkem));
      if (d.foukana) content.push(vCeneBox(S.vCene, [0, 8, 0, 0]));
      if (s.neresene) content.push({ text: 'Plochy mimo rozpočet (neřešeno): ' + s.neresene + '.', fontSize: 8, color: C.t3, margin: [0, 6, 0, 0] });

      // co je součástí realizace + výluky
      const soucast = S.soucastRealizace.filter(x => x.ukazat).map(x => x.text);
      content.push({ stack: [h3('Co je součástí realizace'), seznam2(soucast)], unbreakable: true });
      if (s.vyluky.length) content.push({ stack: [h3('Není-li uvedeno jinak, nabídka nezahrnuje', { margin: [0, 12, 0, 8] }), seznam2(s.vyluky, C.border)], unbreakable: true });

      // zateplovací systém – skladba
      content.push({
        stack: [
          h3('Zateplovací systém Baumit'),
          { text: S.system.uvod, color: C.t2, margin: [0, 0, 0, 14] },
          skladbaV(S.system.vrstvy)
        ], unbreakable: true
      });

      // finální omítka
      const vybrano = [s.struktura && ('struktura ' + s.struktura), s.odstin && ('odstín ' + s.odstin)].filter(Boolean).join(', ');
      content.push({
        stack: [
          h3('Finální omítka ' + om.nazev),
          { text: om.popis, color: C.t2, margin: [0, 0, 0, 12] },
          mrizka(om.vyhody, 2, (v) => [
            { text: v.nazev.toUpperCase(), fontSize: 7.2, bold: true, characterSpacing: 0.6, margin: [0, 8, 0, 3] },
            { text: v.text, fontSize: 8.6, color: C.t2 }
          ], true)
        ], unbreakable: true
      });
      content.push({
        stack: [
          h3('Technické parametry omítky', { fontSize: 10.5, margin: [0, 16, 0, 6] }),
          tabulka(['*', 250, 62], ['Parametr', 'Hodnota', 'Norma'],
            om.parametry.map(r => [r[0], { text: r[1], bold: true }, { text: r[2] || '', color: C.t3, fontSize: 8 }]), { align: [null, null, 'right'] }),
          { text: 'Podle oficiálního technického listu Baumit SilikonTop.', fontSize: 7.6, color: C.t3, margin: [0, 5, 0, 0] }
        ], unbreakable: true
      });

      // výběr odstínu + odkazy
      content.push({
        table: { widths: ['*'], body: [[{
          stack: [
            label('Výběr odstínu', C.t2),
            vybrano ? { text: [{ text: 'Zvoleno: ', color: C.t2 }, { text: vybrano, bold: true }], margin: [0, 5, 0, 0] } : '',
            { text: S.texty.odstin, margin: [0, 5, 0, 0] },
            { text: S.texty.odstinPriplatek, fontSize: 8, color: C.t2, margin: [0, 4, 0, 10] },
            { columns: [odkaz(S.odkazy.silikonTop.text, S.odkazy.silikonTop.url, { width: 'auto' }), odkaz(S.odkazy.baumitLife.text, S.odkazy.baumitLife.url, { width: 'auto' })], columnGap: 22 }
          ]
        }]] },
        layout: { fillColor: () => C.bg, hLineWidth: () => 0, vLineWidth: (i) => (i === 0 ? 2 : 0), vLineColor: () => C.accent, paddingLeft: () => 14, paddingRight: () => 14, paddingTop: () => 12, paddingBottom: () => 12 },
        margin: [0, 14, 0, 0], unbreakable: true
      });

      // platby
      content.push({
        stack: [
          h3('Platební podmínky'),
          mrizka(s.platby, 3, (p) => [
            { text: p.procento + ' %', fontSize: 20, bold: true, characterSpacing: -0.4, margin: [0, 8, 0, 0] },
            { text: kc(p.castka), bold: true, fontSize: 9.5, margin: [0, 2, 0, 4] },
            { text: p.text, fontSize: 8.2, color: C.t2 }
          ], true)
        ], unbreakable: true
      });

      content.push({ stack: [h3('Další podmínky'), mrizka(s.podminky, 3, podminkaBlok)], unbreakable: true });
      if (s.poznamka) content.push(poznamka(s.poznamka));
    }

    /* ===== Fotky ===== */
    if (a.obhlidka && a.obhlidka.length) {
      content.push({ stack: [h3('Fotografie z obhlídky', { margin: [0, 26, 0, 10] }), fotky(a.obhlidka, 128)], unbreakable: true });
    }
    if (a.realizace && a.realizace.length) {
      content.push({ stack: [h3('Ukázky našich realizací', { margin: [0, 26, 0, 10] }), fotky(a.realizace, a.realizace.length === 1 ? 150 : 128)], unbreakable: true });
    }

    /* ===== Kontakt / další postup ===== */
    const kontaktSloupec = (popis, hodnota, url) => ({ width: '*', stack: [label(popis, C.invM, { margin: [0, 0, 0, 4] }), { text: hodnota, link: url, color: C.inv, bold: true, fontSize: 10.5 }] });
    content.push({
      table: {
        widths: ['*'], body: [[{
          stack: [
            label('Další postup', C.b400, { margin: [0, 0, 0, 6] }),
            { text: N.texty.ctaNadpis, color: C.inv, bold: true, fontSize: 16, characterSpacing: -0.3 },
            { text: d.fasada ? N.texty.ctaFasada : N.texty.ctaObecne, color: C.invM, margin: [0, 5, 0, 16] },
            { columns: [
              kontaktSloupec('Telefon', F.telefon, 'tel:' + F.telefon.replace(/\s/g, '')),
              kontaktSloupec('E-mail', F.email, 'mailto:' + F.email),
              kontaktSloupec('Web', F.web, 'https://' + F.web.replace(/^https?:\/\//, ''))
            ], columnGap: 16 },
            { text: N.texty.platnost, color: C.invM, fontSize: 7.6, margin: [0, 14, 0, 0] }
          ]
        }]]
      },
      layout: { fillColor: () => C.primary, hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 20, paddingRight: () => 20, paddingTop: () => 18, paddingBottom: () => 18 },
      margin: [0, 28, 0, 0], unbreakable: true
    });

    return {
      pageSize: 'A4',
      pageMargins: [MX, MT, MX, MB],
      info: { title: 'Cenová nabídka ' + d.cislo + ' – ' + F.znacka, author: F.nazev, subject: d.nadpis },
      defaultStyle: { font: 'Manrope', fontSize: 9.2, lineHeight: 1.32, color: C.primary },
      header: (page) => page === 1 ? null : {
        margin: [MX, 22, MX, 0],
        stack: [{
          columns: [
            { width: 'auto', image: a.logo, width: 13 },
            { width: '*', text: [{ text: 'Efektivní ', bold: true }, { text: 'izolace', bold: true, color: C.b700 }], fontSize: 8, margin: [6, 1, 0, 0] },
            { width: 'auto', text: 'Cenová nabídka č. ' + d.cislo, fontSize: 7.2, color: C.t3, margin: [0, 2, 0, 0] }
          ]
        }, { canvas: [{ type: 'line', x1: 0, y1: 6, x2: CW, y2: 6, lineWidth: 0.6, lineColor: C.border }] }]
      },
      footer: (page, pages) => ({
        margin: [MX, 18, MX, 0],
        columns: [
          { width: '*', text: F.nazev + '  ·  IČO ' + F.ico + '  ·  ' + F.ulice + ', ' + F.mesto + '  ·  ' + F.telefon, fontSize: 6.8, color: C.t3 },
          { width: 'auto', text: page + ' / ' + pages, fontSize: 6.8, color: C.t3 }
        ]
      }),
      pageBreakBefore: (node, following) => node.headlineLevel === 1 && following.length === 0,
      content
    };
  };
})();

/* =====================================================================
   GENERÁTOR NABÍDEK – logika formuláře, výpočty, náhled, PDF, odeslání
   ===================================================================== */
(function () {
  const N = window.NASTAVENI;
  const $ = id => document.getElementById(id);
  const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };
  const fmt = n => Math.round(n).toLocaleString('cs-CZ');
  const kc = n => fmt(n) + ' Kč';
  const datumCZ = d => d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/vendor/pdf.worker.min.js';

  /* ---------- číslo nabídky: RRRRMMDD-HHMM ---------- */
  let cislo = '';
  function noveCislo() {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    cislo = d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
    $('cisloNabidky').textContent = cislo;
  }

  /* ---------- naplnění výběrů ---------- */
  const fill = (sel, items) => { sel.innerHTML = items.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join(''); };
  fill($('konstrukce'), N.foukana.konstrukce.map(k => [k, k]));
  fill($('material'), Object.entries(N.foukana.materialy).map(([k, m]) => [k, m.nazev + ' (' + m.typ.toLowerCase() + ')']));
  const TLOUSTKY = Object.keys(N.fasada.ceny).map(Number).sort((a, b) => a - b);
  fill($('vychoziTloustka'), TLOUSTKY.map(t => [t, t + ' cm (' + kc(N.fasada.ceny[t]) + '/m²)']));
  $('vychoziTloustka').value = N.fasada.vychoziTloustka;
  $('lblLavka').textContent = kc(N.foukana.priplatky.lavka.cena) + '/bm';
  $('lblZaklop').textContent = kc(N.foukana.priplatky.zaklop.cena) + '/m²';

  function obnovTloustky(zachovat) {
    const mat = N.foukana.materialy[$('material').value];
    const old = $('tloustka').value;
    fill($('tloustka'), Object.keys(mat.ceny).map(t => [t, t]));
    if (zachovat && mat.ceny[old] !== undefined) $('tloustka').value = old;
    $('lblList').textContent = mat.parametry && mat.parametry.length ? '' : '(pro tento materiál zatím nejsou doplněné)';
  }
  function obnovCenu() {
    const mat = N.foukana.materialy[$('material').value];
    $('cenaM2').value = mat.ceny[$('tloustka').value] || 0;
  }

  /* ---------- dynamické řádky ---------- */
  function radekPolozka(cont, p = {}) {
    const r = document.createElement('div'); r.className = 'row polozka';
    r.innerHTML = `<input data-k="nazev" placeholder="Název položky" value="${esc(p.nazev)}"><input data-k="cena" type="number" min="0" placeholder="Cena vč. DPH" value="${p.cena ?? ''}"><button type="button" class="x" aria-label="Odebrat">×</button>`;
    cont.appendChild(r);
  }
  function radekPlocha(p = {}) {
    const cont = $('plochy');
    if (!cont.children.length) {
      const h = document.createElement('div'); h.className = 'row plocha head';
      h.innerHTML = '<span>Ozn.</span><span>Popis</span><span>m²</span><span>Izolant</span><span></span>';
      cont.appendChild(h);
    }
    const r = document.createElement('div'); r.className = 'row plocha';
    const n = cont.querySelectorAll('.row.plocha:not(.head)').length + 1;
    const t = p.tloustka ?? num($('vychoziTloustka').value);
    r.innerHTML = `<input data-k="kod" value="${esc(p.kod ?? 'S' + n)}" aria-label="Označení"><input data-k="popis" placeholder="např. Uliční fasáda" value="${esc(p.popis)}" aria-label="Popis"><input data-k="vymera" type="number" min="0" step="0.01" value="${p.vymera ?? ''}" aria-label="Výměra m²"><select data-k="tloustka" aria-label="Tloušťka">${TLOUSTKY.map(x => `<option value="${x}">${x} cm</option>`).join('')}<option value="0">neřešeno</option></select><button type="button" class="x" aria-label="Odebrat">×</button>`;
    r.querySelector('select').value = String(t);
    r.classList.toggle('off', String(t) === '0');
    cont.appendChild(r);
  }
  const ctiRadky = (id) => [...$(id).querySelectorAll('.row:not(.head)')].map(r => {
    const o = {}; r.querySelectorAll('[data-k]').forEach(i => o[i.dataset.k] = i.value); return o;
  });

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { const id = add.dataset.add; id === 'plochy' ? radekPlocha() : radekPolozka($(id)); zmena(); return; }
    const x = e.target.closest('.x');
    if (x) {
      const cont = x.closest('.rows'); x.closest('.row').remove();
      if (cont.id === 'plochy' && !cont.querySelector('.row:not(.head)')) cont.innerHTML = '';
      zmena();
    }
  });

  /* ---------- stav formuláře ---------- */
  const POLE = ['jmeno', 'adresa', 'email', 'telefon', 'konstrukce', 'material', 'tloustka', 'cenaM2', 'plocha', 'lavka', 'zaklop', 'ohradkaKs', 'ohradkaCena', 'prirazka', 'poznamkaFoukana', 'vychoziTloustka', 'odstin', 'termin', 'uvodFasada', 'poznamkaFasada', 'platnost', 'uvod'];
  const CHECK = ['sFoukana', 'sFasada', 'technickyList', 'realizace'];

  function ctiStav() {
    const s = {}; POLE.forEach(k => s[k] = $(k).value); CHECK.forEach(k => s[k] = $(k).checked);
    s.polozkyFoukana = ctiRadky('polozkyFoukana'); s.polozkyFasada = ctiRadky('polozkyFasada'); s.plochy = ctiRadky('plochy');
    return s;
  }
  function zapisStav(s) {
    if (s.material) { $('material').value = s.material; obnovTloustky(false); }
    POLE.forEach(k => { if (s[k] !== undefined) $(k).value = s[k]; });
    CHECK.forEach(k => { if (s[k] !== undefined) $(k).checked = s[k]; });
    ['polozkyFoukana', 'polozkyFasada', 'plochy'].forEach(id => $(id).innerHTML = '');
    (s.polozkyFoukana || []).forEach(p => radekPolozka($('polozkyFoukana'), p));
    (s.polozkyFasada || []).forEach(p => radekPolozka($('polozkyFasada'), p));
    (s.plochy || []).forEach(p => radekPlocha(p));
  }

  /* ---------- výpočet ---------- */
  function rozsahKodu(kody) { return kody.join(', '); }

  function spocitej(s) {
    const d = { cislo, datum: datumCZ(new Date()), zakaznik: { jmeno: s.jmeno.trim(), adresa: s.adresa.trim(), email: s.email.trim(), telefon: s.telefon.trim() }, uvod: s.uvod.trim() || N.texty.uvod, celkem: 0 };
    const pl = new Date(); pl.setDate(pl.getDate() + Math.max(1, num(s.platnost) || N.platnostDni));
    d.platnostDo = datumCZ(pl);

    if (s.sFoukana) {
      const mat = N.foukana.materialy[s.material], P = N.foukana.priplatky;
      const plocha = num(s.plocha), zaklad = num(s.cenaM2) || mat.ceny[s.tloustka] || 0;
      const cenaM2 = zaklad + (plocha > 0 ? num(s.prirazka) / plocha : 0);
      const kon = { 'Půda': 'Zateplení půdy', 'Střecha': 'Zateplení střechy', 'Střecha mezi krokve': 'Zateplení střechy mezi krokvemi' };
      const nazevSluzby = kon[s.konstrukce] || 'Zateplení – ' + s.konstrukce.toLowerCase();
      const radky = [{ nazev: nazevSluzby, sub: mat.nazev + ', tloušťka ' + s.tloustka, mnozstvi: fmt2(plocha) + ' m²', cenaJ: cenaM2, celkem: Math.round(cenaM2 * plocha) }];
      const lavka = num(s.lavka), zaklop = num(s.zaklop), ohr = num(s.ohradkaKs), ohrC = num(s.ohradkaCena);
      if (lavka > 0) radky.push({ nazev: P.lavka.nazev, mnozstvi: fmt2(lavka) + ' bm', cenaJ: P.lavka.cena, celkem: lavka * P.lavka.cena });
      if (zaklop > 0) radky.push({ nazev: P.zaklop.nazev, mnozstvi: fmt2(zaklop) + ' m²', cenaJ: P.zaklop.cena, celkem: zaklop * P.zaklop.cena });
      if (ohr > 0) radky.push({ nazev: P.ohradka.nazev, mnozstvi: fmt2(ohr) + ' ks', cenaJ: ohrC, celkem: ohr * ohrC });
      s.polozkyFoukana.filter(p => p.nazev.trim() && num(p.cena) > 0).forEach(p => radky.push({ nazev: p.nazev.trim(), mnozstvi: '1 soub.', cenaJ: num(p.cena), celkem: num(p.cena) }));
      const celkem = radky.reduce((a, r) => a + Math.round(r.celkem), 0);
      const dutina = s.konstrukce === 'Střecha mezi krokve';
      const lambda = mat.lambda ? (dutina ? mat.lambda.dutina : mat.lambda.volne) : null;
      const tlM = parseFloat(String(s.tloustka).replace(',', '.')) / 100;
      const odporR = lambda && tlM ? Math.round(tlM / lambda * 10) / 10 : null;
      d.foukana = { nazevSluzby, konstrukce: s.konstrukce, material: mat, materialKey: s.material, tloustka: s.tloustka, plocha, cenaM2, radky, celkem, podminky: N.foukana.podminky, poznamka: s.poznamkaFoukana.trim(), technickeParametry: s.technickyList, dutina, lambda, odporR };
      d.celkem += celkem;
    }

    if (s.sFasada) {
      const plochy = s.plochy.map(p => ({ kod: p.kod.trim(), popis: p.popis.trim(), vymera: num(p.vymera), tloustka: num(p.tloustka) }));
      const skup = {};
      plochy.filter(p => p.tloustka > 0 && p.vymera > 0).forEach(p => {
        const g = skup[p.tloustka] || (skup[p.tloustka] = { tloustka: p.tloustka, cenaM2: N.fasada.ceny[p.tloustka], kodyArr: [], vymera: 0 });
        g.kodyArr.push(p.kod || '–'); g.vymera += p.vymera;
      });
      const skupiny = Object.values(skup).sort((a, b) => b.tloustka - a.tloustka).map(g => Object.assign(g, { kody: rozsahKodu(g.kodyArr), celkem: Math.round(g.vymera * g.cenaM2) }));
      const polozky = s.polozkyFasada.filter(p => p.nazev.trim() && num(p.cena) > 0).map(p => ({ nazev: p.nazev.trim(), cena: num(p.cena) }));
      const celkem = skupiny.reduce((a, g) => a + g.celkem, 0) + polozky.reduce((a, p) => a + p.cena, 0);
      const sazba = N.fasada.sazbaDph, bezDph = Math.round(celkem / (1 + sazba / 100));
      const t = skupiny.map(g => g.tloustka);
      const rozsah = !t.length ? '–' : Math.min(...t) === Math.max(...t) ? String(t[0]) : Math.min(...t) + '–' + Math.max(...t);
      let zbyva = celkem;
      const platby = N.fasada.platby.map((p, i, arr) => {
        const castka = i === arr.length - 1 ? zbyva : Math.round(celkem * p.procento / 100); zbyva -= castka;
        return Object.assign({}, p, { castka });
      });
      d.fasada = {
        plochy, skupiny, polozky, celkem, bezDph, dph: celkem - bezDph, sazbaDph: sazba, platby,
        vymera: skupiny.reduce((a, g) => a + g.vymera, 0), rozsahTloustek: rozsah,
        neresene: plochy.filter(p => !p.tloustka).map(p => p.kod).filter(Boolean).join(', '),
        odstin: s.odstin.trim(), termin: s.termin.trim(), uvodSekce: s.uvodFasada.trim() || null, poznamka: s.poznamkaFasada.trim()
      };
      d.celkem += celkem;
    }

    const kon = { 'Půda': 'půdy', 'Střecha': 'střechy', 'Střecha mezi krokve': 'střechy mezi krokvemi' };
    d.nadpis = d.foukana && d.fasada ? 'Zateplení ' + (kon[d.foukana.konstrukce] || 'půdy') + ' a fasády'
      : d.foukana ? 'Zateplení ' + (kon[d.foukana.konstrukce] || 'půdy') + ' foukanou izolací'
        : d.fasada ? 'Zateplení fasády systémem Baumit' : 'Cenová nabídka';
    return d;
  }
  function fmt2(n) { return (Math.round(n * 100) / 100).toLocaleString('cs-CZ', { maximumFractionDigits: 2 }); }

  /* ---------- obrázky ---------- */
  const cache = {};
  const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  async function orez(src, pomer, maxW = 1100) {
    const key = src.slice(0, 80) + src.length + '|' + pomer.toFixed(3);
    if (cache[key]) return cache[key];
    const img = await loadImg(src);
    let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
    if (sw / sh > pomer) { const nw = sh * pomer; sx = (sw - nw) / 2; sw = nw; } else { const nh = sw / pomer; sy = (sh - nh) / 2; sh = nh; }
    const w = Math.min(maxW, sw), h = w / pomer, c = document.createElement('canvas');
    c.width = Math.round(w); c.height = Math.round(h);
    c.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
    return (cache[key] = c.toDataURL('image/jpeg', 0.82));
  }
  async function toDataUrl(url) {
    if (cache[url]) return cache[url];
    const b = await (await fetch(url)).blob();
    return (cache[url] = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(b); }));
  }

  let fotkyObhlidky = [];
  $('fotky').addEventListener('change', async e => {
    const files = [...e.target.files].slice(0, 3);
    fotkyObhlidky = await Promise.all(files.map(f => new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(f); })));
    zmena();
  });

  const CW = 595.28 - 88;
  async function pripravObrazky(d, s) {
    const a = { logo: await toDataUrl('assets/img/logo-icon.png') };
    const p3 = ((CW - 16) / 3) / 128;
    a.obhlidka = await Promise.all(fotkyObhlidky.map(f => orez(f, fotkyObhlidky.length === 1 ? CW / 190 : ((CW - 8 * (fotkyObhlidky.length - 1)) / fotkyObhlidky.length) / 128)));
    a.realizace = [];
    if (s.realizace) {
      let src = [];
      if (d.foukana && d.fasada) src = ['pudy-4.jpg', 'pudy-1.jpg', 'fasada-1.jpg'];
      else if (d.foukana) src = ['pudy-1.jpg', 'pudy-4.jpg', 'pudy-2.jpg'];
      else if (d.fasada) src = ['fasada-1.jpg'];
      a.realizace = await Promise.all(src.map(f => orez(new URL('assets/img/' + f, location.href).href, src.length === 1 ? CW / 190 : p3)));
    }
    return a;
  }

  /* ---------- fonty pro pdfmake ---------- */
  let fontyOk = null;
  function fonty() {
    if (!fontyOk) fontyOk = (async () => {
      const files = { 'Manrope-Regular.ttf': 0, 'Manrope-Bold.ttf': 0 };
      const vfs = {};
      await Promise.all(Object.keys(files).map(async f => {
        const buf = await (await fetch('assets/fonts/' + f)).arrayBuffer();
        let bin = ''; const u = new Uint8Array(buf);
        for (let i = 0; i < u.length; i += 0x8000) bin += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
        vfs[f] = btoa(bin);
      }));
      pdfMake.vfs = vfs;
      pdfMake.fonts = { Manrope: { normal: 'Manrope-Regular.ttf', bold: 'Manrope-Bold.ttf', italics: 'Manrope-Regular.ttf', bolditalics: 'Manrope-Bold.ttf' } };
    })();
    return fontyOk;
  }

  /* ---------- tvorba PDF ---------- */
  async function vytvorPdf(s) {
    await fonty();
    const d = spocitej(s);
    const a = await pripravObrazky(d, s);
    const def = window.sestavDokument(d, a);
    const buf = await new Promise((res, rej) => { try { pdfMake.createPdf(def).getBuffer(res); } catch (e) { rej(e); } });
    let bytes = new Uint8Array(buf);
    return { bytes, d };
  }

  /* ---------- náhled ---------- */
  let gen = 0, timer = null;
  async function nahled() {
    const my = ++gen;
    $('status').classList.add('busy'); $('statusText').textContent = 'Aktualizuji náhled…';
    try {
      const { bytes } = await vytvorPdf(ctiStav());
      if (my !== gen) return;
      const pdf = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
      const wrap = $('pages'), w = Math.min(wrap.clientWidth || 700, 760), dpr = window.devicePixelRatio || 1;
      const canvases = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp1 = page.getViewport({ scale: 1 }), vp = page.getViewport({ scale: (w / vp1.width) * dpr });
        const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
        await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
        canvases.push(c);
      }
      if (my !== gen) return;
      wrap.replaceChildren(...canvases);
      $('statusPages').textContent = pdf.numPages + (pdf.numPages < 5 ? ' strany' : ' stran');
      $('status').classList.remove('busy'); $('statusText').textContent = 'Náhled PDF';
    } catch (e) {
      console.error(e);
      if (my === gen) { $('status').classList.remove('busy'); $('statusText').textContent = 'Chyba náhledu'; $('pages').innerHTML = '<p class="err">Náhled se nepodařilo vytvořit: ' + esc(e.message) + '</p>'; }
    }
  }

  function souhrny() {
    const d = spocitej(ctiStav());
    $('sumFoukana').textContent = kc(d.foukana ? d.foukana.celkem : 0);
    $('sumFasada').textContent = kc(d.fasada ? d.fasada.celkem : 0);
    $('sumFasadaM2').textContent = fmt2(d.fasada ? d.fasada.vymera : 0) + ' m²';
    $('sumCelkem').textContent = kc(d.celkem);
    $('cardFoukana').hidden = !$('sFoukana').checked;
    $('cardFasada').hidden = !$('sFasada').checked;
    document.querySelectorAll('#plochy .row:not(.head)').forEach(r => r.classList.toggle('off', r.querySelector('select').value === '0'));
  }
  function zmena() { souhrny(); clearTimeout(timer); timer = setTimeout(nahled, 450); }

  $('form').addEventListener('input', e => {
    if (e.target.id === 'fotky') return;
    if (e.target.id === 'material') { obnovTloustky(true); obnovCenu(); }
    if (e.target.id === 'tloustka') obnovCenu();
    if (e.target.id === 'sFasada' && e.target.checked && !$('plochy').querySelector('.row:not(.head)')) radekPlocha();
    zmena();
  });

  /* ---------- název souboru ---------- */
  const nazevSouboru = d => 'Cenova_nabidka_' + (d.fasada && !d.foukana ? 'Fasada' : 'Izolace') + '_' + ((d.zakaznik.jmeno || 'Nezadano').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '')) + '.pdf';

  function toast(t, err) { const el = $('toast'); el.textContent = t; el.classList.toggle('err', !!err); el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 4500); }

  /* ---------- stáhnout ---------- */
  $('btnPdf').addEventListener('click', async () => {
    const b = $('btnPdf'); b.disabled = true; b.textContent = 'Připravuji PDF…';
    try {
      const { bytes, d } = await vytvorPdf(ctiStav());
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      const l = document.createElement('a'); l.href = url; l.download = nazevSouboru(d); document.body.appendChild(l); l.click(); l.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e) { console.error(e); toast('PDF se nepodařilo vytvořit: ' + e.message, true); }
    b.disabled = false; b.textContent = 'Stáhnout PDF';
  });

  /* ---------- odeslat přes Make ---------- */
  function base64(bytes) { let bin = ''; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(bin); }

  $('btnOdeslat').addEventListener('click', async () => {
    const s = ctiStav();
    if (!s.email.trim()) { toast('Vyplňte prosím e-mail zákazníka.', true); $('email').focus(); return; }
    if (!s.sFoukana && !s.sFasada) { toast('Zaškrtněte aspoň jednu službu.', true); return; }
    const b = $('btnOdeslat'); b.disabled = true; b.textContent = 'Odesílám…';
    try {
      const { bytes, d } = await vytvorPdf(s);
      const f = d.foukana, fa = d.fasada;
      const data = {
        // pole jako v původní verzi (kvůli scénáři v Make)
        customerName: d.zakaznik.jmeno, customerEmail: d.zakaznik.email, customerAddress: d.zakaznik.adresa,
        constructionType: f ? f.konstrukce : 'Fasáda', material: f ? f.material.nazev : (fa ? 'Baumit ETICS (EPS)' : ''),
        thickness: f ? f.tloustka : (fa ? fa.rozsahTloustek + ' cm' : ''), areaM2: f ? f.plocha : (fa ? Math.round(fa.vymera * 100) / 100 : 0),
        totalPrice: String(Math.round(d.celkem)), offerNumber: d.cislo, validUntil: d.platnostDo, sentAt: new Date().toISOString(),
        pdfFileName: nazevSouboru(d), pdfFileBase64: base64(bytes),
        // nová pole
        customerPhone: d.zakaznik.telefon, services: [f && 'foukana', fa && 'fasada'].filter(Boolean).join('+'),
        blownTotal: f ? f.celkem : 0, facadeTotal: fa ? fa.celkem : 0, facadeAreaM2: fa ? Math.round(fa.vymera * 100) / 100 : 0,
        note: [f && f.poznamka, fa && fa.poznamka].filter(Boolean).join('\n')
      };
      const r = await fetch(N.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error('Make vrátil chybu ' + r.status);
      ulozHistorii({ cislo: d.cislo, jmeno: d.zakaznik.jmeno, celkem: d.celkem, odeslano: data.sentAt, sluzby: data.services, stav: s });
      toast('Nabídka č. ' + d.cislo + ' byla odeslána a uložena.');
      noveCislo();
    } catch (e) { console.error(e); toast('Nepodařilo se odeslat: ' + e.message, true); }
    b.disabled = false; b.textContent = 'Odeslat zákazníkovi';
  });

  /* ---------- historie ---------- */
  const HK = 'nabidkyHistorie';
  const nactiH = () => { try { return JSON.parse(localStorage.getItem(HK) || '[]'); } catch (e) { return []; } };
  function ulozHistorii(z) { const h = nactiH(); h.unshift(z); try { localStorage.setItem(HK, JSON.stringify(h.slice(0, 30))); } catch (e) { } vykresliH(); }
  function vykresliH() {
    const h = nactiH(), el = $('historie');
    if (!h.length) { el.innerHTML = '<p class="hint" style="margin:0">Zatím žádné odeslané nabídky z tohoto prohlížeče.</p>'; return; }
    el.innerHTML = h.map((z, i) => `<button type="button" data-h="${i}"><b>${esc(z.jmeno || 'Bez jména')}</b><span class="p">${kc(z.celkem)}</span><span>č. ${esc(z.cislo)} · ${new Date(z.odeslano).toLocaleDateString('cs-CZ')}${z.sluzby ? ' · ' + esc(z.sluzby.replace('+', ' + ')) : ''}</span><span></span></button>`).join('');
  }
  $('historie').addEventListener('click', e => {
    const b = e.target.closest('[data-h]'); if (!b) return;
    const z = nactiH()[+b.dataset.h]; if (!z || !z.stav) return;
    if (!confirm('Načíst nabídku č. ' + z.cislo + ' (' + (z.jmeno || 'bez jména') + ') do formuláře?')) return;
    zapisStav(z.stav); fotkyObhlidky = []; $('fotky').value = ''; zmena(); window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('btnNova').addEventListener('click', () => {
    if (!confirm('Vyčistit formulář a začít novou nabídku?')) return;
    zapisStav(vychozi()); fotkyObhlidky = []; $('fotky').value = ''; noveCislo(); zmena();
  });

  /* ---------- start ---------- */
  function vychozi() {
    const m = Object.keys(N.foukana.materialy)[0], t = Object.keys(N.foukana.materialy[m].ceny)[0];
    return { jmeno: '', adresa: '', email: '', telefon: '', konstrukce: N.foukana.konstrukce[0], material: m, tloustka: t, cenaM2: N.foukana.materialy[m].ceny[t], plocha: 100, lavka: 0, zaklop: 0, ohradkaKs: 0, ohradkaCena: N.foukana.priplatky.ohradka.cena, prirazka: 0, poznamkaFoukana: '', vychoziTloustka: N.fasada.vychoziTloustka, odstin: '', termin: '', uvodFasada: '', poznamkaFasada: '', platnost: N.platnostDni, uvod: N.texty.uvod, sFoukana: true, sFasada: false, technickyList: true, realizace: true, polozkyFoukana: [], polozkyFasada: [], plochy: [] };
  }
  noveCislo();
  zapisStav(vychozi());
  vykresliH();
  zmena();

  // pro testy
  window.__generator = { vytvorPdf, ctiStav, zapisStav, spocitej };
})();

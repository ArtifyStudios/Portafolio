/*
  Artify Studios · Esqueleto de carga
  Muestra la silueta de la página (barra, portada, tarjetas…) con un brillo suave
  mientras el sitio carga. Se quita solo cuando todo está listo.
  - Se incluye lo primero en <head> para verse desde el primer instante.
  - Cada tipo de página tiene su propia silueta (inicio, proyectos, cursos, detalle, legales).
  - Espera también al idioma elegido (i18n) para no mostrar un instante en español.
  - Tiempo mínimo 450 ms (evita parpadeos) y máximo 8 s (nunca deja la página tapada).
*/
(function () {
  'use strict';
  var root = document.documentElement;
  if (root.getAttribute('data-sk') === '1') { return; }
  root.setAttribute('data-sk', '1');

  var MIN = 450, MAX = 8000;

  // ---------- qué página es ----------
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase().replace('.html', '');
  var type = 'home';
  if (file === 'proyectos') { type = 'list'; }
  else if (file === 'proyecto' || file === 'curso' || file === 'plugin') { type = 'detail'; }
  else if (file === 'cursos' || file === 'artify-development') { type = 'catalog'; }
  else if (/aviso-legal|cookies|politicaprivacidad|terminos-de-uso/.test(file)) { type = 'legal'; }

  // ---------- etiqueta accesible en el idioma elegido ----------
  var LABEL = { es: 'Cargando…', en: 'Loading…', fr: 'Chargement…', pt: 'Carregando…', zh: '正在加载…', ja: '読み込み中…' };
  var lang = 'es';
  try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('artify-lang') || 'es'; } catch (e) {}
  if (!LABEL[lang]) { lang = 'es'; }

  // ---------- estilos (en línea: deben existir antes que style.css) ----------
  var css =
    '.sk{position:fixed;inset:0;z-index:99999;background:#000;overflow:hidden;opacity:1;transition:opacity .4s ease}' +
    '.sk.sk-out{opacity:0;pointer-events:none}' +
    'html.sk-lock{overflow:hidden}' +
    '.sk-b{display:block;background:linear-gradient(100deg,#17171c 30%,#26262d 45%,#17171c 60%);background-size:300% 100%;' +
      'animation:sk-sh 1.5s ease-in-out infinite;border-radius:10px}' +
    '@keyframes sk-sh{0%{background-position:100% 0}100%{background-position:0 0}}' +
    '.sk-nav{z-index:2;position:absolute;top:14px;left:16px;right:16px;max-width:1120px;height:58px;margin:0 auto;border-radius:20px;' +
      'border:1px solid rgba(255,255,255,.08);background:rgba(18,18,22,.7);display:flex;align-items:center;gap:26px;padding:0 10px 0 20px}' +
    '.sk-nav .sk-links{display:flex;gap:26px;margin:0 auto}' +
    '.sk-nav .sk-links .sk-b{height:10px;width:64px;border-radius:6px}' +
    '.sk-wrap{position:absolute;left:0;right:0;top:0;bottom:0;padding:130px 20px 0;max-width:1180px;margin:0 auto}' +
    '.sk-c{text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px}' +
    '.sk-row{display:flex;gap:12px;flex-wrap:wrap}' +
    '.sk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:34px}' +
    '.sk-cols{display:grid;grid-template-columns:2fr 1fr;gap:26px;margin-top:26px}' +
    '.sk-hero{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,#0f0f12,#000 70%)}' +
    '.sk-card{border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px;background:#0c0c0f}' +
    '@media (max-width:991.98px){.sk-nav .sk-links{display:none}.sk-nav{left:12px;right:12px;top:10px;justify-content:space-between}' +
      '.sk-nav .sk-cta{display:none}}' +
    '@media (max-width:768px){.sk-grid{grid-template-columns:1fr}.sk-cols{grid-template-columns:1fr}' +
      '.sk-wrap{padding-top:112px}.sk-hide-m{display:none!important}}' +
    '@media (prefers-reduced-motion:reduce){.sk-b{animation:none}.sk{transition:none}}';

  function b(w, h, x) { return '<span class="sk-b" style="width:' + w + ';height:' + h + ';' + (x || '') + '"></span>'; }
  function card() {
    return '<div class="sk-card">' + b('100%', '150px', 'border-radius:10px') +
           '<div style="height:12px"></div>' + b('62%', '16px') + '<div style="height:8px"></div>' + b('90%', '10px') +
           '<div style="height:6px"></div>' + b('70%', '10px') + '</div>';
  }
  var navHtml =
    '<div class="sk-nav">' + b('112px', '18px', 'border-radius:6px') +
    '<div class="sk-links">' + b('64px', '10px') + b('76px', '10px') + b('58px', '10px') + b('78px', '10px') + b('110px', '10px') + '</div>' +
    '<span class="sk-cta sk-b" style="width:96px;height:36px;border-radius:12px"></span>' +
    '<span class="sk-b" style="width:44px;height:36px;border-radius:12px;display:none" id="sk-tog"></span></div>';

  var body = '';
  if (type === 'home') {
    body = '<div class="sk-hero"></div><div class="sk-wrap" style="padding-top:0;display:flex;flex-direction:column;justify-content:center;gap:18px;max-width:1140px">' +
      b('150px', '30px', 'border-radius:6px') +
      b('min(640px,92%)', '52px') + b('min(520px,76%)', '52px') +
      b('min(460px,84%)', '14px', 'margin-top:6px') + b('min(380px,66%)', '14px') +
      '<div class="sk-row" style="margin-top:8px">' + b('180px', '46px', 'border-radius:8px') + b('180px', '46px', 'border-radius:8px') + '</div>' +
      b('min(560px,92%)', '48px', 'margin-top:8px;border-radius:12px') + '</div>';
  } else if (type === 'list') {
    body = '<div class="sk-wrap"><div class="sk-c">' + b('min(300px,70%)', '38px') + b('min(480px,86%)', '14px') + b('min(620px,100%)', '48px', 'margin-top:14px;border-radius:14px') +
      '<div class="sk-row sk-hide-m" style="justify-content:center">' + b('90px', '34px', 'border-radius:20px') + b('120px', '34px', 'border-radius:20px') + b('100px', '34px', 'border-radius:20px') + b('116px', '34px', 'border-radius:20px') + b('104px', '34px', 'border-radius:20px') + '</div></div>' +
      '<div class="sk-grid">' + card() + card() + card() + '</div></div>';
  } else if (type === 'catalog') {
    body = '<div class="sk-wrap" style="padding-top:150px"><div class="sk-c">' + b('min(300px,70%)', '88px', 'border-radius:14px') + b('min(520px,80%)', '40px', 'margin-top:6px') +
      b('min(640px,92%)', '14px') + b('min(520px,76%)', '14px') + '</div>' +
      '<div class="sk-grid">' + card() + card() + card() + '</div></div>';
  } else if (type === 'detail') {
    body = '<div class="sk-wrap">' + b('200px', '14px', 'border-radius:6px') + '<div style="height:16px"></div>' + b('90px', '24px', 'border-radius:12px') +
      '<div style="height:12px"></div>' + b('min(520px,80%)', '44px') +
      '<div class="sk-cols"><div>' + b('100%', 'min(48vh,380px)', 'border-radius:14px') + '<div style="height:18px"></div>' + b('92%', '12px') + '<div style="height:8px"></div>' + b('80%', '12px') + '</div>' +
      '<div class="sk-card">' + b('60%', '18px') + '<div style="height:14px"></div>' + b('100%', '12px') + '<div style="height:8px"></div>' + b('86%', '12px') + '<div style="height:8px"></div>' + b('94%', '12px') + '<div style="height:20px"></div>' + b('100%', '46px', 'border-radius:10px') + '</div></div></div>';
  } else { // legal
    body = '<div class="sk-wrap" style="padding-top:140px"><div class="sk-c">' + b('min(340px,70%)', '42px') + b('min(460px,86%)', '14px') + '</div>' +
      '<div class="sk-cols" style="grid-template-columns:260px 1fr;margin-top:46px"><div class="sk-card sk-hide-m" style="height:240px"></div><div>' +
      b('50%', '24px') + '<div style="height:16px"></div>' + b('100%', '12px') + '<div style="height:9px"></div>' + b('96%', '12px') + '<div style="height:9px"></div>' + b('88%', '12px') + '<div style="height:9px"></div>' + b('94%', '12px') +
      '<div style="height:26px"></div>' + b('42%', '20px') + '<div style="height:14px"></div>' + b('100%', '12px') + '<div style="height:9px"></div>' + b('90%', '12px') + '</div></div></div>';
  }

  var style = document.createElement('style');
  style.id = 'sk-style';
  style.textContent = css;
  (document.head || root).appendChild(style);

  var el = document.createElement('div');
  el.className = 'sk';
  el.id = 'sk';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-label', LABEL[lang]);
  el.innerHTML = navHtml + body;
  root.appendChild(el);
  root.classList.add('sk-lock');
  if (window.innerWidth < 992) { var t = el.querySelector('#sk-tog'); if (t) { t.style.display = 'block'; } }

  // ---------- cuándo se quita ----------
  var start = Date.now(), done = false, loaded = document.readyState === 'complete', fonts = true, timer = null;
  window.addEventListener('load', function () { loaded = true; });
  if (document.fonts && document.fonts.ready) { fonts = false; document.fonts.ready.then(function () { fonts = true; }, function () { fonts = true; }); }

  function hide() {
    if (done) { return; }
    done = true;
    clearInterval(timer);
    el.classList.add('sk-out');
    root.classList.remove('sk-lock');
    setTimeout(function () {
      if (el.parentNode) { el.parentNode.removeChild(el); }
      if (style.parentNode) { style.parentNode.removeChild(style); }
      root.removeAttribute('data-sk');
      try { document.dispatchEvent(new CustomEvent('artify:ready')); } catch (e) {}
    }, 450);
  }
  function check() {
    if (done) { return; }
    var waited = Date.now() - start;
    var langBusy = root.classList.contains('i18n-loading');
    if (waited >= MAX) { hide(); return; }
    if (loaded && fonts && !langBusy && waited >= MIN) { hide(); }
  }
  timer = setInterval(check, 80);

  // al volver con "atrás" desde caché no debe quedar el esqueleto
  window.addEventListener('pageshow', function (e) { if (e.persisted) { hide(); } });
})();

/*
  Artify Studios · Selector de idioma (es · en · fr · pt · zh · ja)
  - El sitio está escrito en español: el texto en español es la "clave".
  - Cada idioma vive en Script/lang/<codigo>.js y solo se descarga si se elige.
  - Traduce texto, placeholder, title, aria-label, alt y la meta description,
    también el contenido que los scripts crean después (MutationObserver).
  - Lo que no tiene traducción se queda en español (nunca se rompe nada).
  - API:  ArtifyI18n.t('texto en español', [args])  ·  ArtifyI18n.set('en')  ·  ArtifyI18n.lang
*/
(function () {
  'use strict';

  var LANGS = [
    { c: 'es', n: 'Español',   s: 'ES', h: 'es' },
    { c: 'en', n: 'English',   s: 'EN', h: 'en' },
    { c: 'fr', n: 'Français',  s: 'FR', h: 'fr' },
    { c: 'pt', n: 'Português', s: 'PT', h: 'pt' },
    { c: 'zh', n: '中文',       s: '中', h: 'zh-Hans' },
    { c: 'ja', n: '日本語',     s: '日', h: 'ja' }
  ];
  var KEY = 'artify-lang';
  var root = document.documentElement;

  // carpeta de este script (para encontrar lang/xx.js)
  var cs = document.currentScript;
  var BASE = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : 'Script/';

  var cur = 'es';
  var dict = null;          // { 'texto en español': 'traducción' }
  var patterns = [];        // claves con {0}, {1}…
  var textRec = new WeakMap();
  var attrRec = new WeakMap();
  var titleSrc = null, titleOut = null;
  var observer = null;
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, CODE: 1, PRE: 1, TEXTAREA: 1, TITLE: 1 };

  window.ARTIFY_I18N = window.ARTIFY_I18N || {};

  // ---------- idioma inicial ----------
  function valid(c) { for (var i = 0; i < LANGS.length; i++) { if (LANGS[i].c === c) { return true; } } return false; }
  try {
    var q = new URLSearchParams(location.search).get('lang');
    var st = localStorage.getItem(KEY);
    cur = valid(q) ? q : (valid(st) ? st : 'es');
  } catch (e) { cur = 'es'; }

  // evita el parpadeo en español mientras carga el idioma elegido
  var st0 = document.createElement('style');
  st0.textContent = 'html.i18n-loading body{opacity:0}html.i18n-ready body{transition:opacity .25s ease}';
  document.head.appendChild(st0);
  if (cur !== 'es') {
    root.classList.add('i18n-loading');
    setTimeout(function () { root.classList.remove('i18n-loading'); }, 2500);
  }

  // ---------- diccionario ----------
  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function compile(d) {
    patterns = [];
    for (var k in d) {
      if (d.hasOwnProperty(k) && /\{\d\}/.test(k)) {
        var esc = k.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{(\d)\}/g, '(.+?)');
        patterns.push({ re: new RegExp('^' + esc + '$'), tpl: d[k] });
      }
    }
  }
  function lookup(n) {
    if (!dict) { return null; }
    if (dict.hasOwnProperty(n)) { return dict[n]; }
    for (var i = 0; i < patterns.length; i++) {
      var m = patterns[i].re.exec(n);
      if (m) {
        return patterns[i].tpl.replace(/\{(\d)\}/g, function (_, g) {
          var part = m[+g + 1];
          var t = lookup(norm(part));
          return t == null ? part : t;
        });
      }
    }
    return null;
  }
  function tr(text) {
    var n = norm(text);
    if (!n) { return null; }
    var out = lookup(n);
    if (out == null) { return null; }
    var lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
    return lead + out + trail;
  }

  // ---------- recorrido del DOM ----------
  function skipEl(el) {
    while (el && el.nodeType === 1) {
      if (SKIP[el.tagName.toUpperCase()] || el.hasAttribute('data-no-i18n') || el.classList.contains('notranslate')) { return true; }
      el = el.parentNode;
    }
    return false;
  }
  function doText(node) {
    var p = node.parentNode;
    if (!p || skipEl(p)) { return; }
    var rec = textRec.get(node);
    var src = (rec && node.nodeValue === rec.out) ? rec.src : node.nodeValue;
    if (!/[A-Za-zÀ-ÿ¡¿0-9]/.test(src)) { return; }
    var out = cur === 'es' ? null : tr(src);
    var val = out == null ? src : out;
    if (node.nodeValue !== val) { node.nodeValue = val; }
    textRec.set(node, { src: src, out: val });
  }
  function doAttr(el, a) {
    if (!el.hasAttribute(a) || skipEl(el)) { return; }
    var rec = attrRec.get(el) || {};
    var curVal = el.getAttribute(a);
    var r = rec[a];
    var src = (r && curVal === r.out) ? r.src : curVal;
    var out = cur === 'es' ? null : tr(src);
    var val = out == null ? src : out;
    if (curVal !== val) { el.setAttribute(a, val); }
    rec[a] = { src: src, out: val };
    attrRec.set(el, rec);
  }
  function doMeta() {
    var m = document.querySelector('meta[name="description"]');
    if (!m) { return; }
    var rec = attrRec.get(m) || {};
    var curVal = m.getAttribute('content') || '';
    var r = rec.content;
    var src = (r && curVal === r.out) ? r.src : curVal;
    var out = cur === 'es' ? null : tr(src);
    var val = out == null ? src : out;
    if (curVal !== val) { m.setAttribute('content', val); }
    rec.content = { src: src, out: val };
    attrRec.set(m, rec);
  }
  function doTitle() {
    var t = document.title;
    var src = (titleOut !== null && t === titleOut) ? titleSrc : t;
    var out = cur === 'es' ? null : tr(src);
    var val = out == null ? src : out;
    if (t !== val) { document.title = val; }
    titleSrc = src; titleOut = val;
  }
  function walk(node) {
    if (node.nodeType === 3) { doText(node); return; }
    if (node.nodeType !== 1 || skipEl(node)) { return; }
    for (var i = 0; i < ATTRS.length; i++) { doAttr(node, ATTRS[i]); }
    var c = node.firstChild;
    while (c) { var nx = c.nextSibling; walk(c); c = nx; }
  }
  function applyAll() {
    pause();
    walk(document.body);
    doMeta(); doTitle();
    resume();
    root.lang = LANGS[idx(cur)].h;
    root.setAttribute('data-lang', cur);
    legalNote();
  }

  // ---------- observador de cambios dinámicos ----------
  function onMut(list) {
    pause();
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'childList') {
        for (var j = 0; j < m.addedNodes.length; j++) { walk(m.addedNodes[j]); }
        if (m.target && m.target.nodeName === 'TITLE') { doTitle(); }
      } else if (m.type === 'characterData') {
        if (m.target.parentNode && m.target.parentNode.nodeName === 'TITLE') { doTitle(); } else { doText(m.target); }
      } else if (m.type === 'attributes') {
        if (m.target.nodeName === 'META') { doMeta(); } else { doAttr(m.target, m.attributeName); }
      }
    }
    resume();
  }
  function pause() { if (observer) { observer.takeRecords(); observer.disconnect(); } }
  function resume() {
    if (!observer) { observer = new MutationObserver(onMut); }
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(['content']) });
  }

  // ---------- aviso en páginas legales ----------
  function legalNote() {
    var hero = document.querySelector('.legal-hero');
    if (!hero) { return; }
    var n = document.getElementById('legalLangNote');
    if (cur === 'es') { if (n) { n.remove(); } return; }
    if (!n) {
      n = document.createElement('div');
      n.id = 'legalLangNote';
      n.className = 'legal-lang-note';
      n.setAttribute('role', 'note');
      n.textContent = 'Este documento legal solo está disponible en español, que es la versión con validez legal.';
      hero.insertAdjacentElement('afterend', n);
    }
  }

  // ---------- carga de idioma ----------
  function idx(c) { for (var i = 0; i < LANGS.length; i++) { if (LANGS[i].c === c) { return i; } } return 0; }
  function load(code, cb) {
    if (code === 'es') { dict = null; patterns = []; cb(); return; }
    if (window.ARTIFY_I18N[code]) { dict = window.ARTIFY_I18N[code]; compile(dict); cb(); return; }
    var s = document.createElement('script');
    s.src = BASE + 'lang/' + code + '.js';
    s.onload = function () { dict = window.ARTIFY_I18N[code] || null; if (dict) { compile(dict); } cb(); };
    s.onerror = function () { dict = null; cb(); };
    document.head.appendChild(s);
  }
  function set(code) {
    if (!valid(code)) { return; }
    cur = code;
    try { localStorage.setItem(KEY, code); } catch (e) {}
    load(code, function () {
      applyAll();
      updateUI();
      root.classList.remove('i18n-loading');
      root.classList.add('i18n-ready');
      try { document.dispatchEvent(new CustomEvent('artify:langchange', { detail: { lang: code } })); } catch (e) {}
    });
  }

  // ---------- selector en el header ----------
  var ui = null;
  function buildUI() {
    var host = document.querySelector('.nav-modern .navbar-collapse');
    if (!host || document.getElementById('langSwitch')) { return; }
    ui = document.createElement('div');
    ui.className = 'lang-switch';
    ui.id = 'langSwitch';
    ui.setAttribute('data-no-i18n', '');
    var items = '';
    for (var i = 0; i < LANGS.length; i++) {
      items += '<li role="none"><button type="button" role="menuitemradio" class="lang-item" data-lang="' + LANGS[i].c + '" lang="' + LANGS[i].h + '">' +
               '<span class="lang-code">' + LANGS[i].s + '</span><span class="lang-name">' + LANGS[i].n + '</span><i class="bi bi-check2 lang-check"></i></button></li>';
    }
    ui.innerHTML =
      '<button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false" aria-controls="langMenu" id="langBtn">' +
      '<i class="bi bi-globe2"></i><span class="lang-cur">ES</span><i class="bi bi-chevron-down lang-caret"></i></button>' +
      '<ul class="lang-menu" id="langMenu" role="menu" aria-labelledby="langBtn">' + items + '</ul>';
    var cta = host.querySelector('.nav-cta');
    host.insertBefore(ui, cta || null);

    var btn = ui.querySelector('.lang-btn');
    function open(v) {
      ui.classList.toggle('open', v);
      btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); open(!ui.classList.contains('open')); });
    ui.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lang-item') : null;
      if (b) { set(b.getAttribute('data-lang')); open(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) { if (!ui.contains(e.target)) { open(false); } });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ui.classList.contains('open')) { open(false); btn.focus(); }
    });
    ui.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') { return; }
      var its = [].slice.call(ui.querySelectorAll('.lang-item'));
      if (!ui.classList.contains('open')) { open(true); }
      var i = its.indexOf(document.activeElement);
      e.preventDefault();
      its[(i + (e.key === 'ArrowDown' ? 1 : -1) + its.length) % its.length].focus();
    });
    updateUI();
  }
  function updateUI() {
    if (!ui) { return; }
    ui.querySelector('.lang-cur').textContent = LANGS[idx(cur)].s;
    var its = ui.querySelectorAll('.lang-item');
    for (var i = 0; i < its.length; i++) {
      var on = its[i].getAttribute('data-lang') === cur;
      its[i].classList.toggle('active', on);
      its[i].setAttribute('aria-checked', on ? 'true' : 'false');
    }
    var b = ui.querySelector('.lang-btn');
    var label = (cur === 'es') ? 'Seleccionar idioma' : tr('Seleccionar idioma');
    b.setAttribute('aria-label', (label || 'Seleccionar idioma').trim());
  }

  // ---------- API pública ----------
  window.ArtifyI18n = {
    get lang() { return cur; },
    set: set,
    t: function (key, args) {
      var out = cur === 'es' ? null : lookup(norm(key));
      var s = out == null ? key : out;
      if (args) { s = s.replace(/\{(\d)\}/g, function (_, g) { return args[+g] == null ? '' : args[+g]; }); }
      return s;
    }
  };

  // ---------- arranque ----------
  function start() {
    buildUI();
    if (cur === 'es') { root.lang = 'es'; root.setAttribute('data-lang', 'es'); resume(); return; }
    load(cur, function () {
      applyAll();
      updateUI();
      root.classList.remove('i18n-loading');
      root.classList.add('i18n-ready');
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();

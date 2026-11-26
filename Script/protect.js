/*
  Artify Studios · Protección básica de imágenes
  Dificulta guardar las imágenes con los gestos habituales:
    · clic derecho sobre imágenes / videos
    · arrastrar la imagen al escritorio u otra pestaña
    · mantener pulsada la imagen en el móvil (menú "Guardar imagen")
    · atajos de teclado: F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I/J/C (y sus equivalentes en Mac)
  El texto, los formularios y el resto de la página siguen funcionando con normalidad.

  IMPORTANTE: es un freno, no un candado. Un navegador necesita descargar la imagen para
  mostrarla, así que quien sepa usar la pestaña Red/Network, una captura de pantalla o
  desactivar JavaScript aún podrá obtenerla. Para protección real usa marca de agua
  y publica las imágenes en tamaño web (no los originales).
*/
(function () {
  'use strict';

  // ---- ajustes ----
  var BLOCK_IMAGE_MENU = true;   // clic derecho / pulsación larga sobre imágenes y videos
  var BLOCK_IMAGE_DRAG = true;   // arrastrar imágenes
  var BLOCK_SHORTCUTS  = true;   // F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I/J/C

  var MEDIA = /^(IMG|PICTURE|VIDEO|CANVAS|SOURCE)$/i;
  function isMedia(t) {
    while (t && t.nodeType === 1) {
      if (MEDIA.test(t.tagName)) { return true; }
      t = t.parentNode;
    }
    return false;
  }
  function isField(t) {
    return t && t.nodeType === 1 && /^(INPUT|TEXTAREA|SELECT)$/i.test(t.tagName);
  }

  // ---- estilos: sin selección, sin arrastre, sin menú táctil en imágenes ----
  var st = document.createElement('style');
  st.id = 'protect-style';
  st.textContent =
    'img,picture,video,canvas{-webkit-user-drag:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}' +
    'img{-webkit-tap-highlight-color:transparent}';
  (document.head || document.documentElement).appendChild(st);

  // ---- clic derecho / pulsación larga ----
  if (BLOCK_IMAGE_MENU) {
    document.addEventListener('contextmenu', function (e) {
      if (isMedia(e.target)) { e.preventDefault(); }
    }, true);
  }

  // ---- arrastrar y seleccionar imágenes ----
  if (BLOCK_IMAGE_DRAG) {
    document.addEventListener('dragstart', function (e) {
      if (isMedia(e.target)) { e.preventDefault(); }
    }, true);
    document.addEventListener('selectstart', function (e) {
      if (isMedia(e.target) && !isField(e.target)) { e.preventDefault(); }
    }, true);
  }

  // ---- atajos de teclado ----
  if (BLOCK_SHORTCUTS) {
    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      var ctrl = e.ctrlKey || e.metaKey;
      var block =
        e.key === 'F12' ||
        (ctrl && !e.altKey && !e.shiftKey && (k === 'u' || k === 's')) ||          // ver código fuente / guardar página
        (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) || // herramientas de desarrollo
        (e.metaKey && e.altKey && (k === 'i' || k === 'u' || k === 'j' || k === 'c')); // Mac
      if (block) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
  }

  // ---- marcar imágenes y videos (también los que crean otros scripts) ----
  function harden(root) {
    if (!root || root.nodeType !== 1) { return; }
    var list = root.matches && root.matches('img,video') ? [root] : [];
    var inner = root.querySelectorAll ? root.querySelectorAll('img,video') : [];
    for (var i = 0; i < inner.length; i++) { list.push(inner[i]); }
    for (var j = 0; j < list.length; j++) {
      var el = list[j];
      if (el.tagName === 'IMG') { el.setAttribute('draggable', 'false'); }
      else {
        el.setAttribute('controlsList', 'nodownload');
        el.setAttribute('disablePictureInPicture', '');
      }
    }
  }
  function init() {
    harden(document.documentElement);
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].addedNodes.length; j++) { harden(list[i].addedNodes[j]); }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

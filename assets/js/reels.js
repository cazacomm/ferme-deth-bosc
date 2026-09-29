/* =========================================================
   La Ferme Deth Bosc / reels.js
   Bandeau vidéo des réseaux sociaux.

   Trois principes pour que ça reste fluide :
   1. le défilement est un scroll natif, donc on peut aussi
      faire glisser au doigt ou à la molette ;
   2. une vidéo ne se charge que lorsqu'elle approche de
      l'écran, et se remet en pause dès qu'elle en sort ;
   3. tout s'arrête au survol, au focus clavier, au toucher,
      quand l'onglet passe en arrière-plan, et si la personne
      a demandé à réduire les animations.
   ========================================================= */
(function () {
  'use strict';

  var VITESSE = 0.35; /* pixels par frame, volontairement lent */

  var rail = document.getElementById('reels');
  if (!rail) return;
  var track = rail.querySelector('.reels__track');
  if (!track) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Boucle sans couture : on duplique la série ---- */
  var originaux = Array.prototype.slice.call(track.children);
  var largeurSerie = 0;

  function mesurer() {
    largeurSerie = originaux.reduce(function (t, el) {
      var st = window.getComputedStyle(el);
      return t + el.offsetWidth + parseFloat(st.marginRight || 0);
    }, 0);
    var gap = parseFloat(window.getComputedStyle(track).columnGap || 0) || 0;
    largeurSerie += gap * originaux.length;
  }

  originaux.forEach(function (el) {
    var copie = el.cloneNode(true);
    copie.setAttribute('aria-hidden', 'true');
    copie.querySelectorAll('a').forEach ?
      copie.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; }) : null;
    track.appendChild(copie);
  });
  mesurer();
  window.addEventListener('resize', mesurer);

  /* ---- 2. Chargement et lecture à la demande ---- */
  var videos = track.querySelectorAll('video[data-src]');

  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.src) { v.src = v.dataset.src; v.load(); }
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { root: null, rootMargin: '150px', threshold: 0.1 });
    Array.prototype.forEach.call(videos, function (v) { vo.observe(v); });
  } else {
    Array.prototype.forEach.call(videos, function (v) { v.src = v.dataset.src; });
  }

  /* ---- 3. Défilement automatique ---- */
  var enPause = false;
  var visible = true;
  var reprise = null;

  function pause()  { enPause = true; if (reprise) clearTimeout(reprise); }
  function reprendre(delai) {
    if (reprise) clearTimeout(reprise);
    reprise = setTimeout(function () { enPause = false; }, delai || 0);
  }

  rail.addEventListener('pointerenter', pause);
  rail.addEventListener('pointerleave', function () { reprendre(400); });
  rail.addEventListener('focusin',  pause);
  rail.addEventListener('focusout', function () { reprendre(400); });
  rail.addEventListener('touchstart', pause, { passive: true });
  rail.addEventListener('touchend',   function () { reprendre(2500); }, { passive: true });
  rail.addEventListener('wheel',      function () { pause(); reprendre(2500); }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting && !document.hidden; },
      { threshold: 0 }).observe(rail);
  }

  var reste = 0;
  function boucle() {
    requestAnimationFrame(boucle);
    if (enPause || !visible || !largeurSerie) return;

    reste += VITESSE;
    var pas = Math.floor(reste);
    if (pas >= 1) {
      rail.scrollLeft += pas;
      reste -= pas;
    }
    /* arrivé au bout de la première série, on revient au début sans que ça se voie */
    if (rail.scrollLeft >= largeurSerie) rail.scrollLeft -= largeurSerie;
  }

  if (!reduced) requestAnimationFrame(boucle);
})();

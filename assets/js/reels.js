/* =========================================================
   La Ferme Deth Bosc / reels.js
   Bandeau vidéo des réseaux sociaux.

   Deux mécaniques différentes, et c'est volontaire.

   ORDINATEUR : la bande glisse en continu avec `transform`.
   C'est fluide et c'est la carte graphique qui travaille.

   MOBILE : surtout pas de `transform`. Sur Safari iOS, une <video>
   placée dans un conteneur transformé à chaque frame n'affiche que
   sa première image : la vidéo tourne, mais le calque ne se
   repeint jamais. C'est exactement l'effet « image figée ».
   Sur tactile on utilise donc le défilement natif, avec une
   avance discrète toutes les quelques secondes. Aucune
   transformation n'est appliquée au conteneur des vidéos, elles
   se repeignent normalement, et on gagne le glissement au doigt
   sans avoir à le coder.

   Filet de sécurité commun : si la lecture automatique est refusée
   (mode économie d'énergie par exemple), la première interaction
   avec la page relance toutes les vidéos visibles.
   ========================================================= */
(function () {
  'use strict';

  var rail = document.getElementById('reels');
  if (!rail) return;
  var track = rail.querySelector('.reels__track');
  if (!track) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tactile = window.matchMedia('(hover: none)').matches ||
                ('ontouchstart' in window && window.innerWidth < 1024);

  rail.classList.add(tactile ? 'reels--scroll' : 'reels--glisse');

  /* ---------------------------------------------------------
     Boucle sans couture : on duplique la série
     --------------------------------------------------------- */
  var originaux = Array.prototype.slice.call(track.children);
  originaux.forEach(function (el) {
    var copie = el.cloneNode(true);
    copie.setAttribute('aria-hidden', 'true');
    track.appendChild(copie);
  });

  var largeurSerie = 0, pasCarte = 0;
  function mesurer() {
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    pasCarte = originaux.length ? originaux[0].offsetWidth + gap : 0;
    largeurSerie = 0;
    for (var i = 0; i < originaux.length; i++) {
      largeurSerie += originaux[i].offsetWidth + gap;
    }
  }
  mesurer();
  window.addEventListener('resize', mesurer);

  /* ---------------------------------------------------------
     Lecture des vidéos
     --------------------------------------------------------- */
  var videos = track.querySelectorAll('video');
  var MAX = tactile ? 3 : 5;
  var actives = [];

  function lancer(v) {
    v.muted = true;                    /* Safari veut la propriété, pas seulement l'attribut */
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    if (v.preload !== 'auto') v.preload = 'auto';
    var essai = v.play();
    if (essai && essai.catch) {
      essai.catch(function () {
        v.addEventListener('canplay', function once() {
          v.removeEventListener('canplay', once);
          var t = v.play();
          if (t && t.catch) t.catch(function () {});
        });
      });
    }
  }

  function jouer(v) {
    if (actives.indexOf(v) !== -1) return;
    while (actives.length >= MAX) {
      var vieille = actives.shift();
      if (vieille !== v) vieille.pause();
    }
    actives.push(v);
    lancer(v);
  }
  function arreter(v) {
    var i = actives.indexOf(v);
    if (i !== -1) actives.splice(i, 1);
    if (!v.paused) v.pause();
  }

  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) jouer(en.target); else arreter(en.target);
      });
    }, { rootMargin: '0px', threshold: 0.25 });
    Array.prototype.forEach.call(videos, function (v) { vo.observe(v); });
  } else {
    Array.prototype.slice.call(videos, 0, MAX).forEach(lancer);
  }

  /* Première interaction : on relance ce qui n'a pas démarré */
  function debloquer() {
    actives.forEach(function (v) { if (v.paused) lancer(v); });
    document.removeEventListener('touchstart', debloquer);
    document.removeEventListener('click', debloquer);
    document.removeEventListener('scroll', debloquer);
  }
  document.addEventListener('touchstart', debloquer, { passive: true, once: true });
  document.addEventListener('click', debloquer, { once: true });
  document.addEventListener('scroll', debloquer, { passive: true, once: true });

  /* ---------------------------------------------------------
     Pause commune
     --------------------------------------------------------- */
  var enPause = false, visible = true, reprise = null;
  function pause() { enPause = true; if (reprise) clearTimeout(reprise); }
  function reprendre(d) {
    if (reprise) clearTimeout(reprise);
    reprise = setTimeout(function () { enPause = false; }, d || 0);
  }
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting && !document.hidden;
    }, { threshold: 0 }).observe(rail);
  }
  rail.addEventListener('focusin', pause);
  rail.addEventListener('focusout', function () { reprendre(300); });

  if (reduced) return;

  /* =========================================================
     MODE TACTILE : défilement natif, avance discrète
     ========================================================= */
  if (tactile) {
    var INTERVALLE = 3800;

    rail.addEventListener('touchstart', pause, { passive: true });
    rail.addEventListener('touchend', function () { reprendre(4000); }, { passive: true });

    /* La boucle : arrivé au bout de la première série, on revient au
       début d'un seul coup. Le saut se fait uniquement quand plus rien
       n'est en mouvement, sinon il entrerait en conflit avec l'animation
       de défilement en cours et produirait un à-coup. */
    function boucler() {
      if (largeurSerie && rail.scrollLeft >= largeurSerie) {
        rail.scrollLeft = rail.scrollLeft - largeurSerie;
      }
    }

    var finDeScroll = null;
    rail.addEventListener('scroll', function () {
      if (finDeScroll) clearTimeout(finDeScroll);
      finDeScroll = setTimeout(boucler, 160);
    }, { passive: true });

    setInterval(function () {
      if (enPause || !visible || !pasCarte) return;
      boucler();
      rail.scrollBy({ left: pasCarte, behavior: 'smooth' });
    }, INTERVALLE);

    return;
  }

  /* =========================================================
     MODE ORDINATEUR : glissement continu
     ========================================================= */
  var VITESSE = 26; /* pixels par seconde */
  var x = 0;

  function poser() { track.style.transform = 'translate3d(' + x + 'px,0,0)'; }
  function normaliser() {
    if (!largeurSerie) return;
    while (x <= -largeurSerie) x += largeurSerie;
    while (x > 0) x -= largeurSerie;
  }

  rail.addEventListener('mouseenter', pause);
  rail.addEventListener('mouseleave', function () { reprendre(300); });

  var glisse = false, departX = 0, departPos = 0, bouge = 0;
  rail.addEventListener('pointerdown', function (e) {
    glisse = true; bouge = 0; departX = e.clientX; departPos = x;
    pause(); rail.classList.add('is-dragging');
    if (rail.setPointerCapture) { try { rail.setPointerCapture(e.pointerId); } catch (err) {} }
  });
  rail.addEventListener('pointermove', function (e) {
    if (!glisse) return;
    var d = e.clientX - departX;
    bouge = Math.max(bouge, Math.abs(d));
    x = departPos + d; normaliser(); poser();
  });
  function relacher() {
    if (!glisse) return;
    glisse = false; rail.classList.remove('is-dragging'); reprendre(2500);
  }
  rail.addEventListener('pointerup', relacher);
  rail.addEventListener('pointercancel', relacher);
  rail.addEventListener('pointerleave', relacher);
  rail.addEventListener('click', function (e) {
    if (bouge > 8) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  var precedent = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (!precedent) { precedent = t; return; }
    var dt = Math.min((t - precedent) / 1000, 0.05);
    precedent = t;
    if (enPause || glisse || !visible || !largeurSerie) return;
    x -= VITESSE * dt; normaliser(); poser();
  }
  poser();
  requestAnimationFrame(frame);
})();

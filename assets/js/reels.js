/* =========================================================
   La Ferme Deth Bosc / reels.js
   Bandeau vidéo des réseaux sociaux.

   Le défilement se fait par `transform` et non par `scrollLeft` :
   sur Safari iOS, écrire dans scrollLeft à chaque frame se fait
   annuler par la couche de défilement inertiel, et le bandeau
   restait immobile. Avec une transformation, le comportement est
   le même partout et c'est la carte graphique qui travaille.

   Le glissement au doigt est géré à la main, puisqu'il n'y a plus
   de conteneur scrollable.

   Si la lecture automatique est refusée (mode économie d'énergie
   sur iPhone par exemple), les vignettes d'attente restent
   affichées : le bandeau devient une bande de photos, jamais un
   rectangle vide.
   ========================================================= */
(function () {
  'use strict';

  var VITESSE = 26; /* pixels par seconde */

  var rail  = document.getElementById('reels');
  if (!rail) return;
  var track = rail.querySelector('.reels__track');
  if (!track) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Boucle sans couture ---------- */
  var originaux = Array.prototype.slice.call(track.children);
  originaux.forEach(function (el) {
    var copie = el.cloneNode(true);
    copie.setAttribute('aria-hidden', 'true');
    track.appendChild(copie);
  });

  var largeurSerie = 0;
  function mesurer() {
    largeurSerie = 0;
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    for (var i = 0; i < originaux.length; i++) {
      largeurSerie += originaux[i].offsetWidth + gap;
    }
  }
  mesurer();
  window.addEventListener('resize', mesurer);

  /* ---------- Lecture des vidéos à la demande ---------- */
  var videos = track.querySelectorAll('video');

  function lancer(v) {
    v.muted = true;                       /* Safari exige la propriété, pas seulement l'attribut */
    v.setAttribute('playsinline', '');
    if (v.preload !== 'auto') v.preload = 'auto';   /* le téléchargement ne démarre qu'ici */
    var essai = v.play();
    if (essai && essai.catch) {
      essai.catch(function () {
        /* refusé pour l'instant : on retentera dès que la vidéo est prête */
        v.addEventListener('canplay', function once() {
          v.removeEventListener('canplay', once);
          var t = v.play();
          if (t && t.catch) t.catch(function () {});
        });
      });
    }
  }

  /* Plafond de lectures simultanées : décoder huit vidéos en même temps
     suffit à faire chauffer un téléphone, et personne n'en voit plus de
     trois à la fois. */
  var MAX = window.matchMedia('(max-width: 760px)').matches ? 3 : 5;
  var actives = [];

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
        if (en.isIntersecting) jouer(en.target);
        else arreter(en.target);
      });
    }, { rootMargin: '0px', threshold: 0.25 });
    Array.prototype.forEach.call(videos, function (v) { vo.observe(v); });
  } else {
    Array.prototype.slice.call(videos, 0, MAX).forEach(lancer);
  }

  /* ---------- Défilement ---------- */
  var x = 0;
  var enPause = false;
  var visible = true;
  var reprise = null;

  function poser() { track.style.transform = 'translate3d(' + x + 'px,0,0)'; }

  function pause() { enPause = true; if (reprise) clearTimeout(reprise); }
  function reprendre(delai) {
    if (reprise) clearTimeout(reprise);
    reprise = setTimeout(function () { enPause = false; }, delai || 0);
  }

  rail.addEventListener('mouseenter', pause);
  rail.addEventListener('mouseleave', function () { reprendre(300); });
  rail.addEventListener('focusin',    pause);
  rail.addEventListener('focusout',   function () { reprendre(300); });
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting && !document.hidden;
    }, { threshold: 0 }).observe(rail);
  }

  /* ---------- Glissement au doigt ou à la souris ---------- */
  var glisse = false, departX = 0, departPos = 0, bouge = 0;

  rail.addEventListener('pointerdown', function (e) {
    glisse = true; bouge = 0;
    departX = e.clientX; departPos = x;
    pause();
    rail.classList.add('is-dragging');
    if (rail.setPointerCapture) { try { rail.setPointerCapture(e.pointerId); } catch (err) {} }
  });

  rail.addEventListener('pointermove', function (e) {
    if (!glisse) return;
    var d = e.clientX - departX;
    bouge = Math.max(bouge, Math.abs(d));
    x = departPos + d;
    normaliser();
    poser();
  });

  function relacher() {
    if (!glisse) return;
    glisse = false;
    rail.classList.remove('is-dragging');
    reprendre(2500);
  }
  rail.addEventListener('pointerup', relacher);
  rail.addEventListener('pointercancel', relacher);
  rail.addEventListener('pointerleave', relacher);
  /* un glissement ne doit pas déclencher le lien qui se trouve dessous */
  rail.addEventListener('click', function (e) {
    if (bouge > 8) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  function normaliser() {
    if (!largeurSerie) return;
    while (x <= -largeurSerie) x += largeurSerie;
    while (x > 0) x -= largeurSerie;
  }

  /* ---------- Boucle d'animation ---------- */
  var precedent = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (!precedent) { precedent = t; return; }
    var dt = Math.min((t - precedent) / 1000, 0.05);
    precedent = t;
    if (enPause || glisse || !visible || !largeurSerie) return;

    x -= VITESSE * dt;
    normaliser();
    poser();
  }

  poser();
  if (!reduced) requestAnimationFrame(frame);
})();

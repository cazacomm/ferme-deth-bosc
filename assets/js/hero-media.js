/* =========================================================
   La Ferme Deth Bosc / hero-media.js
   Diaporama de fond du hero : enchaîne photos et vidéos en
   fondu, avec un lent mouvement d'échelle sur les photos.

   Ajouter une diapo = ajouter un <figure class="hero__slide">
   dans le HTML, contenant une <img> ou une <video>. Rien à
   configurer ici.
   ========================================================= */
(function () {
  'use strict';

  var PHOTO_MS = 6200;   /* durée d'affichage d'une photo */

  var stage = document.getElementById('hero-media');
  if (!stage) return;

  var slides = Array.prototype.slice.call(stage.querySelectorAll('.hero__slide'));
  if (slides.length < 2) { stage.classList.add('is-ready'); return; }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var index = 0;
  var timer = null;
  var visible = true;

  function mediaOf(slide) { return slide.querySelector('video'); }

  function stop() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function show(next) {
    var current = slides[index];
    var video = mediaOf(current);
    if (video) { try { video.pause(); video.currentTime = 0; } catch (e) {} }
    current.classList.remove('is-active');

    index = next;
    var slide = slides[index];
    slide.classList.add('is-active');
    schedule(slide);
  }

  function schedule(slide) {
    stop();
    var video = mediaOf(slide);

    if (video) {
      video.currentTime = 0;
      var advance = function () { video.removeEventListener('ended', advance); next(); };
      video.addEventListener('ended', advance);
      var playing = video.play();
      if (playing && playing.catch) {
        /* autoplay refusé : on retombe sur un simple minutage */
        playing.catch(function () {
          video.removeEventListener('ended', advance);
          timer = setTimeout(next, PHOTO_MS);
        });
      }
      /* garde-fou si la vidéo ne déclenche jamais 'ended' */
      timer = setTimeout(function () {
        video.removeEventListener('ended', advance);
        next();
      }, Math.max((video.duration || 8) * 1000 + 800, PHOTO_MS));
      return;
    }

    timer = setTimeout(next, PHOTO_MS);
  }

  function next() {
    if (!visible) { timer = setTimeout(next, 1200); return; }
    show((index + 1) % slides.length);
  }

  /* Pause quand le hero sort de l'écran ou l'onglet passe en arrière-plan */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      var video = mediaOf(slides[index]);
      if (video) { visible ? video.play().catch(function () {}) : video.pause(); }
    }, { threshold: 0 }).observe(stage);
  }
  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
  });

  stage.classList.add('is-ready');
  if (!reduced) schedule(slides[0]);
})();

/* =========================================================
   La Ferme Deth Bosc / liseuse.js
   Catalogue des promotions : on feuillette page par page.

   Défilement natif, volontairement. Il n'y a pas d'animation
   automatique ici, donc pas besoin de `transform` : le scroll
   du navigateur gère le glissement au doigt, l'inertie et le
   calage sur les pages, et le clavier fonctionne tout seul.
   Voir reels.js pour le cas où l'automatique impose l'inverse.
   ========================================================= */
(function () {
  'use strict';

  var piste = document.getElementById('liseuse-piste');
  var cadre = document.getElementById('liseuse');
  if (!piste || !cadre) return;

  var prec = document.getElementById('liseuse-prec');
  var suiv = document.getElementById('liseuse-suiv');
  var num  = document.getElementById('liseuse-num');
  var pages = piste.children.length;

  function largeurPage() {
    var p = piste.children[0];
    if (!p) return cadre.clientWidth;
    var st = window.getComputedStyle(piste);
    return p.getBoundingClientRect().width + (parseFloat(st.columnGap) || 0);
  }

  function indexCourant() {
    var l = largeurPage();
    return l ? Math.min(pages - 1, Math.max(0, Math.round(cadre.scrollLeft / l))) : 0;
  }

  function aller(sens) {
    cadre.scrollBy({ left: largeurPage() * sens, behavior: 'smooth' });
  }

  function rafraichir() {
    var i = indexCourant();
    if (num) num.textContent = i + 1;
    if (prec) prec.disabled = i <= 0;
    if (suiv) suiv.disabled = i >= pages - 1;
  }

  if (prec) prec.addEventListener('click', function () { aller(-1); });
  if (suiv) suiv.addEventListener('click', function () { aller(1); });

  cadre.addEventListener('scroll', function () {
    window.clearTimeout(cadre._t);
    cadre._t = window.setTimeout(rafraichir, 80);
  }, { passive: true });

  cadre.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); aller(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); aller(-1); }
  });

  window.addEventListener('resize', rafraichir);
  rafraichir();
})();

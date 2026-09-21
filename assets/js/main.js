/* =========================================================
   La Ferme Deth Bosc / main.js
   Source unique de vérité pour les horaires : DATA ci-dessous.
   Modifier ici met à jour : le bandeau "Aujourd'hui", les badges
   ouvert/fermé et les tableaux d'horaires.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     DATA : horaires
     Clés de jour : 0 = dimanche … 6 = samedi
     Créneaux : [["08:30","13:00"], ["15:00","19:30"]]
     --------------------------------------------------------- */
  var DAYS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

  var LOCATIONS = [
    {
      id: 'orleix',
      name: 'Les Halles d\u2019Orleix',
      short: 'Les Halles de la Ferme Deth Bosc',
      meta: '6 ter route de Rabastens, 65800 Orleix',
      href: '#orleix',
      hours: {
        1: [['15:00','19:30']],
        2: [['08:30','13:00'],['15:00','19:30']],
        3: [['08:30','13:00'],['15:00','19:30']],
        4: [['08:30','13:00'],['15:00','19:30']],
        5: [['08:30','13:00'],['15:00','19:30']],
        6: [['08:30','19:30']],
        0: [['09:00','13:00']]
      }
    },
    {
      id: 'brauhauban',
      name: 'Halle Brauhauban à Tarbes',
      short: "L'étal sous la halle Brauhauban",
      meta: 'Halles Brauhauban, 65000 Tarbes',
      href: '#brauhauban',
      hours: {
        2: [['08:00','13:00']],
        3: [['08:00','13:00']],
        5: [['08:00','13:00']],
        6: [['08:00','13:00']],
        0: [['08:00','13:00']]
      }
    }
  ];

  /* Marchés : À CONFIRMER : horaires exacts (indiqués "matin" par le client) */
  var MARKETS = [
    { id:'luz',       day:1, place:'Luz-Saint-Sauveur', slot:['08:00','13:00'] },
    { id:'argeles',   day:2, place:'Argelès-Gazost',    slot:['08:00','13:00'] },
    { id:'marcadieu', day:4, place:'Marché de Marcadieu', town:'Tarbes', slot:['08:00','13:00'] }
  ];

  /* ---------------------------------------------------------
     Utilitaires horaires
     --------------------------------------------------------- */
  function toMin(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  function fmt(hhmm) { return hhmm.replace(':', 'h'); }
  function slotsLabel(slots) {
    if (!slots || !slots.length) return 'Fermé';
    return slots.map(function (s) {
      return '<span class="slot">' + fmt(s[0]) + ' à ' + fmt(s[1]) + '</span>';
    }).join('<span class="sep"> · </span>');
  }

  /* Renvoie { state:'open'|'soon'|'closed', label, detail } */
  function statusFor(slots, nowMin) {
    if (!slots || !slots.length) return { state:'closed', label:'Fermé aujourd’hui', detail:'' };
    for (var i = 0; i < slots.length; i++) {
      var o = toMin(slots[i][0]), c = toMin(slots[i][1]);
      if (nowMin >= o && nowMin < c) {
        var left = c - nowMin;
        return {
          state: 'open',
          label: 'Ouvert',
          detail: left <= 60 ? 'Ferme dans ' + left + ' min' : 'Jusqu’à ' + fmt(slots[i][1])
        };
      }
      if (nowMin < o) {
        var wait = o - nowMin;
        return {
          state: wait <= 90 ? 'soon' : 'closed',
          label: wait <= 90 ? 'Bientôt' : 'Fermé',
          detail: 'Ouvre à ' + fmt(slots[i][0])
        };
      }
    }
    return { state:'closed', label:'Fermé', detail:'Ouvert demain' };
  }

  /* ---------------------------------------------------------
     Bandeau "Aujourd'hui"
     --------------------------------------------------------- */
  function renderToday() {
    var grid = document.getElementById('today-grid');
    var dateEl = document.getElementById('today-date');
    if (!grid) return;

    var now = new Date();
    var d = now.getDay();
    var nowMin = now.getHours() * 60 + now.getMinutes();

    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long'
      });
    }

    var cards = [];

    LOCATIONS.forEach(function (loc) {
      var slots = loc.hours[d];
      var st = statusFor(slots, nowMin);
      if (st.state === 'closed' && !slots) return; /* fermé toute la journée : on masque */
      cards.push({
        state: st.state,
        label: st.label,
        name: loc.name,
        meta: slotsLabel(slots) + (st.detail ? ' · ' + st.detail : ''),
        href: loc.href,
        cta: 'Voir le point de vente'
      });
    });

    MARKETS.filter(function (m) { return m.day === d; }).forEach(function (m) {
      var st = statusFor([m.slot], nowMin);
      cards.push({
        state: st.state,
        label: st.state === 'open' ? 'Sur le marché' : st.label,
        name: 'Marché de ' + m.place,
        meta: slotsLabel([m.slot]) + (st.detail ? ' · ' + st.detail : ''),
        href: '#marches',
        cta: 'Voir tous les marchés'
      });
    });

    if (!cards.length) {
      grid.innerHTML = '<p class="today__none">Tout est fermé aujourd’hui. Retrouvez nos horaires complets ci-dessous.</p>';
      return;
    }

    var order = { open: 0, soon: 1, closed: 2 };
    cards.sort(function (a, b) { return order[a.state] - order[b.state]; });

    grid.innerHTML = cards.map(function (c) {
      return '<article class="tcard tcard--' + c.state + '">' +
        '<span class="tcard__status">' + c.label + '</span>' +
        '<h3 class="tcard__name">' + c.name + '</h3>' +
        '<p class="tcard__meta">' + c.meta + '</p>' +
        '<a class="tcard__link" href="' + c.href + '">' + c.cta + ' →</a>' +
      '</article>';
    }).join('');
  }

  /* ---------------------------------------------------------
     Tableaux d'horaires + badges
     --------------------------------------------------------- */
  function renderHours() {
    var now = new Date();
    var today = now.getDay();
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var weekOrder = [1,2,3,4,5,6,0];

    LOCATIONS.forEach(function (loc) {
      var table = document.querySelector('[data-hours="' + loc.id + '"] tbody');
      if (table) {
        table.innerHTML = weekOrder.map(function (d) {
          var slots = loc.hours[d];
          var cls = d === today ? ' class="is-today"' : '';
          var tdCls = slots && slots.length ? '' : ' class="is-closed"';
          return '<tr' + cls + '><th scope="row">' + DAYS[d] + '</th>' +
                 '<td' + tdCls + '>' + slotsLabel(slots) + '</td></tr>';
        }).join('');
      }

      var badge = document.querySelector('[data-open-badge="' + loc.id + '"]');
      if (badge) {
        var st = statusFor(loc.hours[today], nowMin);
        badge.textContent = st.state === 'open'
          ? 'Ouvert' + (st.detail ? ' · ' + st.detail.toLowerCase() : '')
          : (st.detail ? st.label + ' · ' + st.detail.toLowerCase() : st.label);
        badge.className = 'shop__badge ' + (st.state === 'open' ? 'is-open' : 'is-closed');
      }
    });
  }

  /* ---------------------------------------------------------
     Marchés
     --------------------------------------------------------- */
  function renderMarkets() {
    var list = document.getElementById('markets-list');
    if (!list) return;
    var today = new Date().getDay();

    list.innerHTML = MARKETS.map(function (m) {
      var isToday = m.day === today;
      return '<li class="market' + (isToday ? ' market--today' : '') + '">' +
        '<span class="market__day">' + DAYS[m.day] + ' matin</span>' +
        '<h3 class="market__place">' + m.place + (m.town ? '<br><span class="market__town">' + m.town + '</span>' : '') + '</h3>' +
        '<p class="market__hour">' + slotsLabel([m.slot]) + '</p>' +
        (isToday ? '<span class="market__flag">● Nous y sommes aujourd’hui</span>' : '') +
      '</li>';
    }).join('');
  }

  /* ---------------------------------------------------------
     Header : état collé + variante claire sur le hero
     --------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('header');
    var hero = document.querySelector('.hero');
    if (!header) return;

    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 40);
      if (hero) {
        var overHero = y < hero.offsetHeight - 90;
        header.classList.toggle('is-hero-light', overHero && y <= 40);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Menu mobile
     --------------------------------------------------------- */
  function initNav() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;

    var close = function () {
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------------------------------------------------
     Lien de nav actif selon la section visible
     --------------------------------------------------------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      if (el) map[el.id] = a;
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          if (map[en.target.id]) map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(map).forEach(function (id) {
      obs.observe(document.getElementById(id));
    });
  }

  /* ---------------------------------------------------------
     Apparitions au scroll
     --------------------------------------------------------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    /* décalage en cascade entre voisins directs */
    els.forEach(function (el) {
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', Math.min(idx, 5) * 0.09 + 's');
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          obs.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------------------------------------------------------
     Divers
     --------------------------------------------------------- */
  function initMisc() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* V1 : le formulaire n'a pas encore de backend (voir INFOS-MANQUANTES.md) */
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        window.alert('Formulaire à connecter (V2). En attendant, appelez-nous ou écrivez-nous directement.');
      });
    }
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function boot() {
    renderToday();
    renderHours();
    renderMarkets();
    initHeader();
    initNav();
    initScrollSpy();
    initReveal();
    initMisc();
    /* rafraîchit l'état ouvert/fermé toutes les minutes */
    setInterval(function () { renderToday(); renderHours(); }, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

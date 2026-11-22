/* Portfólio — Ingrid Oliveira · comportamento da página (JavaScript puro, sem bibliotecas) */
(function () {
  'use strict';

  var I18N = window.I18N || {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'pt';
  try { var saved = localStorage.getItem('lang'); if (saved && I18N[saved]) lang = saved; } catch (e) {}

  /* ---------- Idioma (PT / EN) ---------- */
  function t(key) { return (I18N[lang] && I18N[lang][key]) || (I18N.pt && I18N.pt[key]) || ''; }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
    var aria = document.querySelectorAll('[data-i18n-aria]');
    for (var j = 0; j < aria.length; j++) aria[j].setAttribute('aria-label', t(aria[j].getAttribute('data-i18n-aria')));
    var chips = document.getElementById('chips-do');
    if (chips) {
      chips.innerHTML = '';
      (t('dos') || []).forEach(function (txt) {
        var li = document.createElement('li'); li.className = 'chip'; li.textContent = txt; chips.appendChild(li);
      });
    }
    var buttons = document.querySelectorAll('.lang');
    for (var k = 0; k < buttons.length; k++) buttons[k].setAttribute('aria-pressed', String(buttons[k].getAttribute('data-lang') === lang));
    try { localStorage.setItem('lang', lang); } catch (e) {}
    if (modalOpen) renderSlide();
  }

  document.querySelectorAll('.lang').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---------- Fotos analógicas passando no fundo da Home ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var counter = document.getElementById('counter');
  var current = 0;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function showSlide(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    if (counter) counter.textContent = pad(current + 1) + ' / ' + pad(slides.length);
  }
  if (slides.length) {
    showSlide(0);
    if (!reduceMotion) setInterval(function () { showSlide(current + 1); }, 6000);
  }

  /* ---------- Traço do menu acompanha a rolagem ---------- */
  var ids = ['home', 'sobre', 'projetos', 'contato'];
  var links = document.querySelectorAll('.nav-link');
  function setActive(id) {
    for (var i = 0; i < links.length; i++) {
      var on = links[i].getAttribute('data-section') === id;
      links[i].classList.toggle('is-active', on);
      if (on) links[i].setAttribute('aria-current', 'true'); else links[i].removeAttribute('aria-current');
    }
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var cur = 'home', y = window.innerHeight * 0.35;
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) cur = id;
      });
      var d = document.documentElement;
      if (window.innerHeight + (window.pageYOffset || d.scrollTop) >= d.scrollHeight - 6) cur = 'contato';
      setActive(cur);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Pop-up com os slides de cada projeto ---------- */
  var PROJECTS = [
    { id: 'bit',       name: 'App BiT',   k: 10, r: 5 },
    { id: 'nexify',    name: 'Nexify',    k: 9,  r: 5 },
    { id: 'soujunior', name: 'SouJunior', k: 9,  r: 5 },
    { id: 'mare',      name: 'MARÉ',      k: 12, r: 6 },
    { id: 'pesquisa',  nameKey: 'nm5',    k: 10, r: 5 }
  ];
  var modal = document.getElementById('modal');
  var viewer = document.getElementById('viewer');
  var title = document.getElementById('modal-title');
  var mcount = document.getElementById('mcount');
  var closeBtn = document.getElementById('modal-close');
  var modalOpen = false, pIndex = 0, sIndex = 0, trigger = null;

  function projName(p) { return p.nameKey ? t(p.nameKey) : p.name; }
  function renderSlide() {
    var p = PROJECTS[pIndex], col = sIndex % 2, row = Math.floor(sIndex / 2);
    viewer.style.backgroundImage = 'url(assets/img/projects/slides-' + p.id + '.jpg)';
    viewer.style.backgroundSize = '200% ' + (p.r * 100) + '%';
    viewer.style.backgroundPosition = (col * 100) + '% ' + (p.r > 1 ? row * 100 / (p.r - 1) : 0) + '%';
    viewer.setAttribute('aria-label', t('slideL') + ' ' + (sIndex + 1) + '/' + p.k + ' · ' + projName(p));
    title.textContent = projName(p);
    mcount.textContent = pad(sIndex + 1) + ' / ' + pad(p.k);
  }
  function openProject(i, el) {
    pIndex = i; sIndex = 0; trigger = el; modalOpen = true;
    modal.hidden = false; document.body.style.overflow = 'hidden';
    renderSlide(); closeBtn.focus();
  }
  function closeProject() {
    if (!modalOpen) return;
    modalOpen = false; modal.hidden = true; document.body.style.overflow = '';
    if (trigger && trigger.focus) trigger.focus();
  }
  function go(d) { var k = PROJECTS[pIndex].k; sIndex = (sIndex + d + k) % k; renderSlide(); }

  document.querySelectorAll('.card').forEach(function (c) {
    c.addEventListener('click', function () { openProject(parseInt(c.getAttribute('data-project'), 10), c); });
  });
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeProject); });
  document.getElementById('prev').addEventListener('click', function () { go(-1); });
  document.getElementById('next').addEventListener('click', function () { go(1); });
  document.addEventListener('keydown', function (e) {
    if (!modalOpen) return;
    if (e.key === 'Escape') closeProject();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'Tab') {            /* mantém o foco dentro do pop-up */
      var f = modal.querySelectorAll('button'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  if (lang !== 'pt') applyLang(lang);
})();

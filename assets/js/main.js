/* Renders data.js into the page and wires the nav, theme toggle and entrance motion. */
(function () {
  var W = window.WORKSHOP;
  var root = document.documentElement;
  root.classList.add('js');

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function initials(name) {
    return name.split(/[\s-]+/).filter(Boolean).map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }
  function minutes(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function fmtDur(m) {
    var h = Math.floor(m / 60), r = m % 60;
    return (h ? h + ' h' : '') + (h && r ? ' ' : '') + (r ? r + ' min' : '');
  }

  // ---------- simple fills ----------
  document.querySelectorAll('[data-fill]').forEach(function (n) {
    var key = n.getAttribute('data-fill');
    if (key === 'contactName') n.textContent = W.contact.name;
    else if (W[key] != null) n.textContent = W[key];
  });
  var lede = document.getElementById('program-lede');
  if (lede) lede.textContent = 'More than half of the day goes to posters, contributed talks and moderated discussion. Tentative schedule, ' + W.timezone + '.';

  // ---------- people ----------
  function personCard(p, isSpeaker) {
    var card = el('article', 'person reveal');
    var img;
    if (p.photo) {
      img = el('img', 'avatar');
      img.src = p.photo; img.alt = 'Portrait of ' + p.name; img.loading = 'lazy'; img.width = 148; img.height = 148;
    } else {
      img = el('div', 'avatar avatar-initials', initials(p.name));
      img.setAttribute('aria-hidden', 'true');
    }
    card.appendChild(img);
    var h = el('h3', 'person-name');
    if (p.url) { var a = el('a', null, p.name); a.href = p.url; h.appendChild(a); } else h.textContent = p.name;
    card.appendChild(h);
    card.appendChild(el('p', 'person-aff', p.affiliation));
    if (isSpeaker && p.topic) card.appendChild(el('p', 'person-topic', p.topic));
    if (isSpeaker && p.talk) card.appendChild(el('p', 'person-talk', '“' + p.talk + '”'));
    if (p.status === 'tentative') card.appendChild(el('span', 'badge', 'Tentative'));
    return card;
  }
  var sg = document.getElementById('speaker-grid');
  W.speakers.forEach(function (p) { sg.appendChild(personCard(p, true)); });
  var og = document.getElementById('organizer-grid');
  W.organizers.forEach(function (p) { og.appendChild(personCard(p, false)); });

  // ---------- program: day strip + schedule ----------
  var KINDS = {
    talk:    'Invited talks',
    contrib: 'Posters and lightning talks',
    discuss: 'Panel and roadmap discussion',
    other:   'Breaks and remarks'
  };
  var totals = { talk: 0, contrib: 0, discuss: 0, other: 0 };
  var strip = document.getElementById('daystrip');
  W.schedule.forEach(function (s) {
    var d = minutes(s.end) - minutes(s.start);
    totals[s.kind] += d;
    var seg = el('div', 'seg ' + s.kind);
    seg.style.flex = d + ' 0 0';
    seg.setAttribute('role', 'listitem');
    seg.tabIndex = 0;
    var label = s.start + '–' + s.end + ' · ' + s.title;
    seg.setAttribute('aria-label', label + ' (' + KINDS[s.kind] + ')');
    seg.appendChild(el('span', 'tip', label));
    strip.appendChild(seg);
  });
  var legend = document.getElementById('daystrip-legend');
  Object.keys(KINDS).forEach(function (k) {
    var li = el('li');
    var sw = el('span', 'sw seg ' + k); sw.setAttribute('aria-hidden', 'true');
    li.appendChild(sw);
    li.appendChild(document.createTextNode(KINDS[k] + ' '));
    li.appendChild(el('b', null, fmtDur(totals[k])));
    legend.appendChild(li);
  });

  var sched = document.getElementById('schedule');
  [['Morning', function (s) { return minutes(s.start) < 12 * 60 + 50; }],
   ['Afternoon', function (s) { return minutes(s.start) >= 12 * 60 + 50; }]].forEach(function (col) {
    var box = el('div', 'sched-col reveal');
    box.appendChild(el('h3', null, col[0]));
    var ul = el('ul', 'sched-list');
    W.schedule.filter(col[1]).forEach(function (s) {
      var li = el('li', 'sched-item ' + s.kind);
      li.appendChild(el('span', 'sched-time', s.start + '–' + s.end));
      var body = el('div');
      body.appendChild(el('p', 'sched-title', s.title));
      if (s.detail) body.appendChild(el('p', 'sched-detail', s.detail));
      li.appendChild(body);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    sched.appendChild(box);
  });

  // ---------- dates + submit ----------
  var dl = document.getElementById('dates');
  W.dates.forEach(function (d) {
    var row = el('div');
    row.appendChild(el('dt', null, d.label));
    row.appendChild(el('dd', d.date === 'TBA' ? 'tba' : null, d.date));
    dl.appendChild(row);
  });
  var sb = document.getElementById('submit-btn');
  if (W.submitUrl) {
    sb.href = W.submitUrl; sb.textContent = 'Submit a contribution';
    sb.classList.remove('is-disabled'); sb.removeAttribute('aria-disabled');
  }

  // ---------- contact (assembled here to keep the address away from scrapers) ----------
  var cb = document.getElementById('contact-btn');
  if (cb) cb.href = 'mailto:' + W.contact.user + '@' + W.contact.domain + '?subject=' + encodeURIComponent('ICRA 2027 Multi-Agent Mobile Manipulation workshop');

  // ---------- nav: mobile menu ----------
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  function closeMenu() { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu'); }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---------- nav: highlight the section in view ----------
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navAnchors.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      if (sec) spy.observe(sec);
    });
  }

  // ---------- theme toggle ----------
  var tt = document.getElementById('theme-toggle');
  function currentTheme() {
    return root.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  tt.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---------- entrance motion ----------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var sibs = Array.prototype.indexOf.call(en.target.parentNode.children, en.target);
        en.target.style.transitionDelay = Math.min(sibs, 8) * 60 + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('in'); });
  }
})();

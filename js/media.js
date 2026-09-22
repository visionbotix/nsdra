/*
 * NSDRA Media page
 * Blocks of cards (4 per row) built from js/media-data.js.
 * A card with several media is a folder (slider viewer); a card with one media opens it directly.
 */
(function () {
  'use strict';

  var host = document.getElementById('ma-sections');
  if (!host) return;

  /* ------------------------------------------------------------------ helpers */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return s || '';
    return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function norm(s) { return String(s || '').trim().toLowerCase(); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }
  function sameOrigin(url) { try { return new URL(url, location.href).origin === location.origin; } catch (e) { return false; } }
  function fileName(url, fb) {
    try { return decodeURIComponent(new URL(url, location.href).pathname.split('/').pop()) || fb; } catch (e) { return fb; }
  }

  /* ------------------------------------------------------------------ model */
  var sections = ((window.NSDRA_MEDIA || {}).sections || []).filter(function (s) {
    return s && s.items && s.items.length;
  });
  var cards = {};                                    // id -> card

  function normMedia(m) {
    var kind = m.type === 'video' ? 'video' : (m.type === 'document' ? 'document' : 'image');
    return { kind: kind, src: m.src || '', poster: m.poster || m.thumb || '', thumb: m.thumb || '',
             duration: m.duration || '', title: m.title || '', filename: m.filename || '' };
  }

  function normCard(it, si, ii) {
    var c = {
      id: 's' + si + 'c' + ii, raw: it, title: it.title || 'Untitled', label: it.label || '',
      tags: (it.tags || []).filter(Boolean),
      media: (it.media || []).filter(function (m) { return m && m.src; }).map(normMedia)
    };
    var seen = {};
    c.tagList = c.tags.filter(function (t) {
      var k = norm(t); if (!k || seen[k]) return false; seen[k] = 1; return true;
    });
    c.tagKeys = c.tagList.map(norm);
    c.blockTitle = (sections[si] || {}).title || '';
    c.hay = norm([c.title, it.label, it.city, it.venue, it.organization, it.conferenceName, it.topic, it.description,
      fmtDate(it.date), c.blockTitle, c.tagList.join(' '),
      (it.participants || []).map(function (p) { return typeof p === 'string' ? p : (p && (p.name + ' ' + (p.designation || ''))); }).join(' '),
      (it.media || []).map(function (m) { return m && m.title; }).join(' ')].join(' | '));
    var first = c.media[0];
    c.cover = it.cover || (first ? (first.kind === 'image' ? (first.thumb || first.src) : first.poster) : '');
    cards[c.id] = c;
    return c;
  }

  /* ------------------------------------------------------------------ cards */
  function badge(c) {
    var n = c.media.length;
    if (n > 1) {
      var p = c.media.filter(function (m) { return m.kind === 'image'; }).length;
      var v = c.media.filter(function (m) { return m.kind === 'video'; }).length;
      var d = c.media.filter(function (m) { return m.kind === 'document'; }).length;
      var parts = [];
      if (p) parts.push(plural(p, 'photo'));
      if (v) parts.push(plural(v, 'video'));
      if (d) parts.push(plural(d, 'document'));
      var onlyVideos = v === n;
      return '<span class="ma-badge"><i class="bi ' + (onlyVideos ? 'bi-camera-video-fill' : 'bi-collection-fill') + '" aria-hidden="true"></i> ' + parts.join(' \u00b7 ') + '</span>';
    }
    if (n === 1 && c.media[0].kind === 'video')
      return '<span class="ma-badge"><i class="bi bi-camera-video-fill" aria-hidden="true"></i> Video' + (c.media[0].duration ? ' \u00b7 ' + esc(c.media[0].duration) : '') + '</span>';
    if (n === 1 && c.media[0].kind === 'document')
      return '<span class="ma-badge"><i class="bi bi-file-earmark-pdf-fill" aria-hidden="true"></i> Document</span>';
    return '';
  }

  function cardHtml(c) {
    var n = c.media.length;
    var img = c.cover
      ? '<img src="' + esc(c.cover) + '" alt="" loading="lazy" decoding="async">'
      : '<span class="ma-cover-ph" aria-hidden="true"><i class="bi ' + (n ? 'bi-film' : 'bi-image') + '"></i></span>';
    var single = n > 0 && c.media.every(function (m) { return m.kind === 'video'; });   // only videos: show a play button on the cover
    var body =
      '<span class="ma-card-media">' + img +
        (single ? '<span class="ma-play" aria-hidden="true"><i class="bi bi-play-fill"></i></span>' : '') +
        badge(c) +
        (n === 0 ? '<span class="ma-badge ma-badge--soon">Media to be added</span>' : '') +
      '</span>' +
      '<span class="ma-card-body">' +
        (c.label ? '<span class="ma-card-label">' + esc(c.label) + '</span>' : '') +
        '<span class="ma-card-title">' + esc(c.title) + '</span>' +
        (c.tags.length ? '<span class="ma-card-tags">' + c.tags.slice(0, 3).map(function (t) { return '<span class="ma-tag">' + esc(t) + '</span>'; }).join('') + '</span>' : '') +
      '</span>';

    if (!n) return '<li data-cid="' + c.id + '"><div class="ma-card is-empty">' + body + '</div></li>';
    var what = n > 1 ? 'open folder with ' + plural(n, 'item') : 'open';
    return '<li data-cid="' + c.id + '"><button type="button" class="ma-card' + (n > 1 ? ' is-folder' : '') + '" data-card="' + c.id + '" aria-label="' + esc(c.title + ', ' + what) + '">' + body + '</button></li>';
  }

  function render() {
    if (!sections.length) {
      host.innerHTML = '<div class="container"><p class="ma-note"><i class="bi bi-info-circle-fill" aria-hidden="true"></i> Media will appear here soon.</p></div>';
      return;
    }
    host.innerHTML = sections.map(function (s, si) {
      var list = s.items.map(function (it, ii) { return cardHtml(normCard(it, si, ii)); }).join('');
      var head = '<header class="ma-block-head"><h3 id="ma-h' + si + '">' + esc(s.title || 'Media') + '</h3>' +
        (s.description ? '<p>' + esc(s.description) + '</p>' : '') + '</header>';

      if (s.collection) {                                  // framed "collection": one heading + border around all its cards
        var all = [];
        s.items.forEach(function (it) { (it.media || []).forEach(function (m) { if (m && m.src) all.push(m); }); });
        var photos = all.filter(function (m) { return !m.type || m.type === 'image'; }).length;
        var videos = all.filter(function (m) { return m.type === 'video'; }).length;
        var docs = all.filter(function (m) { return m.type === 'document'; }).length;
        var stats = '<li><strong>' + s.items.length + '</strong><span>' + (s.items.length === 1 ? 'Album' : 'Albums') + '</span></li>' +
          (photos ? '<li><strong>' + photos + '</strong><span>' + (photos === 1 ? 'Photo' : 'Photos') + '</span></li>' : '') +
          (videos ? '<li><strong>' + videos + '</strong><span>' + (videos === 1 ? 'Video' : 'Videos') + '</span></li>' : '') +
          (docs ? '<li><strong>' + docs + '</strong><span>' + (docs === 1 ? 'Document' : 'Documents') + '</span></li>' : '');
        return '<section class="ma-block' + (si % 2 ? ' ma-block--alt' : '') + '" aria-labelledby="ma-h' + si + '">' +
          '<div class="container"><div class="ma-collection">' +
            '<header class="ma-collection-head">' +
              '<div class="ma-collection-text">' +
                '<p class="ma-collection-eyebrow"><i class="bi bi-collection-fill" aria-hidden="true"></i> ' + esc(s.eyebrow || 'Media Collection') + '</p>' +
                '<h3 id="ma-h' + si + '">' + esc(s.title || 'Media') + '</h3>' +
                (s.description ? '<p>' + esc(s.description) + '</p>' : '') +
              '</div>' +
              '<ul class="ma-collection-stats" aria-label="Collection contents">' + stats + '</ul>' +
            '</header>' +
            '<ul class="ma-cards">' + list + '</ul>' +
          '</div></div></section>';
      }

      return '<section class="ma-block' + (si % 2 ? ' ma-block--alt' : '') + '" aria-labelledby="ma-h' + si + '">' +
        '<div class="container">' + head + '<ul class="ma-cards">' + list + '</ul></div></section>';
    }).join('');
  }

  /* ------------------------------------------------------------------ search + tags */
  var finder = document.getElementById('ma-finder');
  var qIn = document.getElementById('ma-search'), qClear = document.getElementById('ma-search-clear');
  var tagRow = document.getElementById('ma-tags'), resultEl = document.getElementById('ma-result');
  var fstate = { q: '', tag: '' }, liMap = {}, blockEls = [], emptyEl = null, TAG_SHOW = 7;

  function buildTags() {
    var freq = {}, order = [], total = Object.keys(cards).length;
    Object.keys(cards).forEach(function (id) {
      cards[id].tagList.forEach(function (t) {
        var k = norm(t);
        if (!freq[k]) { freq[k] = { t: t, n: 0, i: order.length }; order.push(k); }
        freq[k].n++;
      });
    });
    var list = order.map(function (k) { return freq[k]; })
      .filter(function (f) { return total < 2 || f.n < total; })          // a tag on every card filters nothing
      .sort(function (a, b) { return (b.n - a.n) || (a.i - b.i); });
    if (!list.length) { tagRow.hidden = true; return; }
    var h = '<button type="button" class="ma-chip" data-tag="" aria-pressed="true">All</button>';
    list.forEach(function (f, i) {
      h += '<button type="button" class="ma-chip' + (i >= TAG_SHOW ? ' is-extra' : '') + '"' + (i >= TAG_SHOW ? ' hidden' : '') +
        ' data-tag="' + esc(f.t) + '" aria-pressed="false">' + esc(f.t) + '</button>';
    });
    if (list.length > TAG_SHOW) h += '<button type="button" class="ma-chip ma-chip--more" data-more="1" aria-expanded="false">+ ' + (list.length - TAG_SHOW) + ' more</button>';
    tagRow.innerHTML = h;
  }

  function applyFilter() {
    var toks = norm(fstate.q).split(/\s+/).filter(Boolean), tk = norm(fstate.tag), shown = 0, total = 0;
    Object.keys(cards).forEach(function (id) {
      var c = cards[id], ok = (!tk || c.tagKeys.indexOf(tk) > -1) && toks.every(function (t) { return c.hay.indexOf(t) > -1; });
      total++; if (ok) shown++;
      if (liMap[id]) liMap[id].hidden = !ok;
    });
    blockEls.forEach(function (b) { b.hidden = !b.querySelector('.ma-cards > li:not([hidden])'); });
    emptyEl.hidden = shown > 0;

    var filtering = !!(toks.length || tk);
    qClear.hidden = !fstate.q;
    Array.prototype.forEach.call(tagRow.querySelectorAll('.ma-chip[data-tag]'), function (b) {
      var on = norm(b.getAttribute('data-tag')) === tk;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && b.hidden) b.hidden = false;
    });
    resultEl.innerHTML = filtering
      ? 'Showing <strong>' + shown + '</strong> of ' + total + ' ' + (total === 1 ? 'album' : 'albums') +
        ' <button type="button" class="ma-link" data-clear="1">Clear</button>'
      : '';
  }

  function initFinder() {
    if (!sections.length) return;
    finder.hidden = false;
    document.getElementById('ma-intro').classList.add('has-finder');
    Array.prototype.forEach.call(host.querySelectorAll('li[data-cid]'), function (li) { liMap[li.getAttribute('data-cid')] = li; });
    blockEls = Array.prototype.slice.call(host.querySelectorAll('.ma-block'));
    var w = document.createElement('section');
    w.className = 'ma-block ma-block--empty'; w.hidden = true;
    w.innerHTML = '<div class="container"><div class="ma-empty" role="status"><i class="bi bi-search" aria-hidden="true"></i>' +
      '<h3>No media found</h3><p>Nothing matches your search. Try another keyword or clear the filters.</p>' +
      '<button type="button" class="custom-btn ma-clear" data-clear="1">Clear Filters</button></div></div>';
    host.appendChild(w); emptyEl = w;
    buildTags();

    var t;
    qIn.addEventListener('input', function () {
      clearTimeout(t); var v = qIn.value.trim();
      t = setTimeout(function () { fstate.q = v; applyFilter(); }, 120);
    });
    qIn.addEventListener('keydown', function (e) { if (e.key === 'Escape' && qIn.value) { qIn.value = ''; fstate.q = ''; applyFilter(); } });
    qClear.addEventListener('click', function () { qIn.value = ''; fstate.q = ''; applyFilter(); qIn.focus(); });
    finder.addEventListener('submit', function (e) { e.preventDefault(); });
    tagRow.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-more')) {
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        Array.prototype.forEach.call(tagRow.querySelectorAll('.is-extra'), function (x) { x.hidden = !open && norm(x.getAttribute('data-tag')) !== norm(fstate.tag); });
        b.textContent = open ? 'Show fewer' : '+ ' + tagRow.querySelectorAll('.is-extra').length + ' more';
        return;
      }
      var v = b.getAttribute('data-tag');
      fstate.tag = (b.getAttribute('aria-pressed') === 'true') ? '' : v;
      applyFilter();
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-clear]')) { qIn.value = ''; fstate.q = ''; fstate.tag = ''; applyFilter(); }
    });
  }

  /* ------------------------------------------------------------------ viewer */
  var lb = null, cur = null, idx = 0, opener = null, video = null;

  function build() {
    lb = document.createElement('div');
    lb.className = 'ma-lb'; lb.hidden = true;
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-labelledby', 'ma-lb-title');
    lb.innerHTML =
      '<button type="button" class="ma-lb-close" aria-label="Close (Esc)"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
      '<div class="ma-lb-wrap">' +
        '<div class="ma-lb-stage">' +
          '<button type="button" class="ma-lb-nav ma-lb-prev" aria-label="Previous (Left Arrow)"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>' +
          '<div class="ma-lb-media"></div>' +
          '<button type="button" class="ma-lb-nav ma-lb-next" aria-label="Next (Right Arrow)"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>' +
          '<span class="ma-lb-count" aria-live="polite"></span>' +
        '</div>' +
        '<aside class="ma-lb-info">' +
          '<p class="ma-lb-label"></p>' +
          '<h3 class="ma-lb-title" id="ma-lb-title"></h3>' +
          '<p class="ma-lb-caption"></p>' +
          '<div class="ma-lb-tags"></div>' +
          '<dl class="ma-lb-meta"></dl>' +
          '<p class="ma-lb-desc"></p>' +
          '<details class="ma-lb-people"><summary></summary><ul></ul></details>' +
          '<a class="custom-btn ma-lb-dl" href="#"></a>' +
        '</aside>' +
      '</div>';
    document.body.appendChild(lb);

    lb.querySelector('.ma-lb-close').addEventListener('click', close);
    lb.querySelector('.ma-lb-prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.ma-lb-next').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('ma-lb-stage') || e.target.classList.contains('ma-lb-media')) close();
    });

    var sx = 0, sy = 0, st = lb.querySelector('.ma-lb-stage');
    st.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY; }, { passive: true });
    st.addEventListener('touchend', function (e) {
      if (e.target.tagName === 'VIDEO') return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function open(id, from) {
    cur = cards[id]; if (!cur) return;
    if (!lb) build();
    idx = 0; opener = from || document.activeElement;
    fillInfo();
    lb.hidden = false;
    document.documentElement.classList.add('ma-lb-open');
    show(0);
    lb.querySelector('.ma-lb-close').focus();
    document.addEventListener('keydown', onKey);
  }

  function stopVideo() {
    if (video) { try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) { /* ignore */ } video = null; }
  }
  function close() {
    if (!lb || lb.hidden) return;
    stopVideo();
    lb.querySelector('.ma-lb-media').innerHTML = '';
    lb.hidden = true;
    document.documentElement.classList.remove('ma-lb-open');
    document.removeEventListener('keydown', onKey);
    if (opener && document.body.contains(opener)) opener.focus();
  }
  function step(d) {
    if (cur.media.length < 2) return;
    idx = (idx + d + cur.media.length) % cur.media.length;
    show(d);
  }

  function row(label, value) {
    return value ? '<div><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>' : '';
  }

  function fillInfo() {                                  // card-level info: filled once per card
    var r = cur.raw;
    lb.querySelector('.ma-lb-label').textContent = cur.label; lb.querySelector('.ma-lb-label').hidden = !cur.label;
    lb.querySelector('.ma-lb-title').textContent = cur.title;
    lb.querySelector('.ma-lb-tags').innerHTML = cur.tags.map(function (t) { return '<span class="ma-tag">' + esc(t) + '</span>'; }).join('');
    var meta = row('Location', r.city) + row('Station / venue', r.venue) + row('Organization', r.organization) +
      row('Conference', r.conferenceName) + row('Topic', r.topic) + row('Date', fmtDate(r.date));
    var dl = lb.querySelector('.ma-lb-meta'); dl.innerHTML = meta; dl.hidden = !meta;
    var d = lb.querySelector('.ma-lb-desc'); d.textContent = r.description || ''; d.hidden = !r.description;
    var ppl = (r.participants || []).map(function (p) { return typeof p === 'string' ? { name: p } : p; }).filter(function (p) { return p && p.name; });
    var box = lb.querySelector('.ma-lb-people'); box.hidden = !ppl.length; box.open = ppl.length <= 4;
    box.querySelector('summary').textContent = 'Participants (' + ppl.length + ')';
    box.querySelector('ul').innerHTML = ppl.map(function (p) {
      return '<li>' + esc(p.name) + (p.designation ? '<small>' + esc(p.designation) + '</small>' : '') + '</li>';
    }).join('');
  }

  function show(dir) {                                   // media-level: photo / video / document + download
    var m = cur.media[idx], multi = cur.media.length > 1;
    stopVideo();
    var box = lb.querySelector('.ma-lb-media');
    box.innerHTML = '';
    var noun = m.kind === 'video' ? 'video' : (m.kind === 'document' ? 'document' : 'photograph');
    var alt = (m.title || cur.title) + (multi ? ' (' + (idx + 1) + ' of ' + cur.media.length + ')' : '');
    var failed = function () {
      box.innerHTML = '<div class="ma-lb-fail"><i class="bi bi-exclamation-triangle" aria-hidden="true"></i><p>This ' + noun + ' could not be loaded.</p></div>';
    };

    if (m.kind === 'video') {
      var v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'metadata';
      if (m.poster) v.poster = m.poster;
      v.setAttribute('aria-label', alt);
      v.addEventListener('error', failed);
      v.src = m.src; box.appendChild(v); video = v;      // loaded only now; never autoplays
    } else if (m.kind === 'document') {
      var thumb = m.poster || cur.cover;
      box.innerHTML = '<div class="ma-lb-doc">' +
        (thumb ? '<img src="' + esc(thumb) + '" alt="' + esc(alt) + '">' : '<i class="bi bi-file-earmark-text-fill" aria-hidden="true"></i>') +
        '<a class="custom-btn custom-border-btn" href="' + esc(m.src) + '" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> Open document</a></div>';
    } else {
      var img = document.createElement('img');
      img.alt = alt; img.addEventListener('error', failed); img.src = m.src; box.appendChild(img);
    }

    if (dir) {                                           // slide animation
      box.classList.remove('slide-next', 'slide-prev'); void box.offsetWidth;
      box.classList.add(dir > 0 ? 'slide-next' : 'slide-prev');
    }

    lb.querySelector('.ma-lb-prev').hidden = !multi;
    lb.querySelector('.ma-lb-next').hidden = !multi;
    var cnt = lb.querySelector('.ma-lb-count'); cnt.hidden = !multi; cnt.textContent = (idx + 1) + ' / ' + cur.media.length;
    var cap = lb.querySelector('.ma-lb-caption'); cap.textContent = m.title; cap.hidden = !m.title;

    var dl = lb.querySelector('.ma-lb-dl');
    var label = m.kind === 'video' ? 'Download Video' : (m.kind === 'document' ? 'Download Document' : 'Download Image');
    if (sameOrigin(m.src)) {
      dl.setAttribute('download', m.filename || fileName(m.src, noun));
      dl.removeAttribute('target'); dl.removeAttribute('rel');
      dl.innerHTML = '<i class="bi bi-download" aria-hidden="true"></i> ' + label;
    } else {                                             // browsers cannot force-download other websites' files
      dl.removeAttribute('download'); dl.target = '_blank'; dl.rel = 'noopener noreferrer';
      dl.innerHTML = '<i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> Open Original';
    }
    dl.href = m.src;

    if (multi) [1, -1].forEach(function (o) {            // warm the neighbouring photos
      var n = cur.media[(idx + o + cur.media.length) % cur.media.length];
      if (n && n.kind === 'image') { var p = new Image(); p.src = n.src; }
    });
  }

  function onKey(e) {
    if (!lb || lb.hidden) return;
    var onVideo = video && document.activeElement === video;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft' && !onVideo) { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight' && !onVideo) { e.preventDefault(); step(1); }
    else if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(lb.querySelectorAll('button, a[href], summary, video[controls]'), function (x) { return !x.hidden && x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!lb.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  }

  /* ------------------------------------------------------------------ init */
  host.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-card]') : null;
    if (b) open(b.getAttribute('data-card'), b);
  });
  render();
  initFinder();
})();

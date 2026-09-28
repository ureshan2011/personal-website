/* ==========================================================================
   Cache hunt — engine (loaded on demand by hunt.js, never before)

   Draws, in one layer inserted right after the nav:
     · the cache hidden on this page, if there is one
     · a small status bar: finds so far, a distance readout to this page's
       cache ("Cache · 42 m ↓"), the cache list, and a way out
     · the cache list: a clue per cache, a hint shown scrambled until the
       visitor decodes it, and the time each find was logged
     · a "Found it" note when a cache is opened

   It never edits the page's own elements. The layer is absolutely
   positioned in document coordinates and each cache is placed by measuring
   the element it hides beside, in a clear spot that covers no words, links
   or pictures, so layouts and reveal animations are left alone. Turning
   the hunt off removes the layer entirely; finds are kept.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var win = window;
  var reducedMQ = win.matchMedia ? win.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var KEY_FOUND = "hunt-found";   // { cacheId: ISO time found }
  var KEY_CARDS = "hunt-cards";   // "open" once the prize is unsealed
  var PX_PER_M = 16;              // distance readout: 16px of page ≈ 1 m
  var S = null;                   // everything for the current session; null while off

  function motionOK() { return !(reducedMQ && reducedMQ.matches); }

  /* ------------------------------------------------------------- helpers */

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function make(tag, cls, attrs, html) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function num(v, d) { return typeof v === "number" && isFinite(v) ? v : d; }
  function listen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts || false);
    S.off.push(function () { target.removeEventListener(type, fn, opts || false); });
  }
  function later(fn, ms) { var t = setTimeout(fn, ms); S.timers.push(t); return t; }
  // Geocaching tradition: hints are ROT13-scrambled until you choose to read them.
  function rot13(s) {
    return String(s).replace(/[a-z]/gi, function (c) {
      var b = c <= "Z" ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - b + 13) % 26 + b);
    });
  }
  function when(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    try {
      return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(d);
    } catch (e) { return d.toLocaleString(); }
  }

  /* ---------------------------------------------------------------- data */

  function caches() { return win.HUNT_CACHES || []; }
  function pageKey() {
    var p = location.pathname.replace(/\/+/g, "/");
    p = p.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "").replace(/^\//, "").replace(/\/$/, "");
    return p || "index";
  }
  function site(path) {
    if (!path || /^([a-z]+:)?\/\//i.test(path) || path.charAt(0) === "#") return path;
    return S.site + path.replace(/^\//, "");
  }
  function foundMap() {
    var out = {}, k;
    try {
      var saved = JSON.parse(get(KEY_FOUND) || "{}");
      if (saved && typeof saved === "object") for (k in saved) if (Object.prototype.hasOwnProperty.call(saved, k)) out[k] = saved[k];
    } catch (e) {}
    if (S && S.mem) for (k in S.mem) if (Object.prototype.hasOwnProperty.call(S.mem, k)) out[k] = S.mem[k];
    return out;
  }
  function foundCount() {
    var m = foundMap();
    return caches().filter(function (c) { return m[c.id]; }).length;
  }
  function markFound(id) {
    var m = foundMap();
    if (!m[id]) m[id] = new Date().toISOString();
    S.mem = m;  // survives a browser that blocks storage, for this page at least
    set(KEY_FOUND, JSON.stringify(m));
    return m;
  }

  /* ------------------------------------------------------------ geometry */

  // A cache never sits on the page's words, links, buttons or pictures. At
  // each layout (first draw, a new width, the area changing size) it takes
  // the clear spot nearest to the one its data asks for, inside its area
  // ("within", or the element it hides beside). Between layouts it keeps
  // that spot, moving with its area.
  var HALF = 25;  // half the tin's footprint: its 44px tap target plus a little air
  var CONTROLS = "a[href], button, input, select, textarea, label, summary, iframe, video, audio, canvas, [role=button], [role=link], [tabindex]:not([tabindex='-1'])";
  var PICTURES = "img, picture, svg, figure";
  var REACH = 420, STEP = 6;  // how far, and how finely, to look for a clear spot

  // Ancestors that clip an element (overflow other than visible), nearest first.
  function clipParents(el) {
    var out = [], p = el.parentElement, n = 0;
    while (p && p !== doc.body && p !== root && n < 8) {
      var cs = getComputedStyle(p);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") out.push(p);
      if (cs.position === "fixed") break;
      p = p.parentElement;
      n++;
    }
    return out;
  }
  function visibleRect(it, raw) {
    var b = { l: raw.left, t: raw.top, r: raw.right, b: raw.bottom };
    for (var i = 0; i < it.clips.length; i++) {
      var c = it.clips[i].getBoundingClientRect();
      if (c.left > b.l) b.l = c.left;
      if (c.top > b.t) b.t = c.top;
      if (c.right < b.r) b.r = c.right;
      if (c.bottom < b.b) b.b = c.bottom;
    }
    return b;
  }

  // How far an element sits from where it will rest: a reveal still sliding
  // in, a card lifted on hover. Plain translations only.
  function shiftOf(el, stop, memo) {
    var x = 0, y = 0;
    for (var p = el; p && p !== stop && p.nodeType === 1; p = p.parentElement) {
      var s = memo.get(p);
      if (!s) {
        s = [0, 0];
        var t = getComputedStyle(p).transform, m = t && t !== "none" && /^matrix\(([^)]+)\)$/.exec(t);
        if (m) {
          var v = m[1].split(",").map(parseFloat);
          if (Math.abs(v[0] - 1) < 1e-3 && Math.abs(v[3] - 1) < 1e-3 && Math.abs(v[1]) < 1e-3 && Math.abs(v[2]) < 1e-3) s = [v[4], v[5]];
        }
        memo.set(p, s);
      }
      x += s[0];
      y += s[1];
    }
    return [x, y];
  }

  // Everything inside the area a cache must not cover. k: 0 words, 1 controls, 2 pictures.
  function obstacles(area) {
    var out = [], memo = new Map(), i, n, list;
    function add(rects, el, k) {
      var s = shiftOf(el, area, memo);
      for (var j = 0; j < rects.length; j++) {
        var r = rects[j];
        if (r.width >= 2 && r.height >= 2) out.push({ l: r.left - s[0], t: r.top - s[1], r: r.right - s[0], b: r.bottom - s[1], k: k });
      }
    }
    var walk = doc.createTreeWalker(area, 4 /* text */, null), range = doc.createRange();
    while ((n = walk.nextNode())) {
      var pe = n.parentElement;
      if (!pe || !/\S/.test(n.nodeValue) || pe.closest(".vh, script, style, noscript, template")) continue;
      range.selectNodeContents(n);
      add(range.getClientRects(), pe, 0);
    }
    list = area.querySelectorAll(CONTROLS);
    for (i = 0; i < list.length; i++) add(list[i].getClientRects(), list[i], 1);
    list = area.querySelectorAll(PICTURES);
    for (i = 0; i < list.length; i++) add(list[i].getClientRects(), list[i], 2);
    return out;
  }

  // The clear spot nearest (px, py) inside bounds b. Failing that, one that
  // only overlaps a picture; failing that, one that leaves the controls free;
  // failing all of those, the requested spot itself.
  function clearSpot(px, py, b, obs) {
    var x0 = b.l + HALF, x1 = b.r - HALF, y0 = b.t + HALF, y1 = b.b - HALF;
    if (x1 < x0) x0 = x1 = (b.l + b.r) / 2;
    if (y1 < y0) y0 = y1 = (b.t + b.b) / 2;
    px = Math.min(x1, Math.max(x0, px));
    py = Math.min(y1, Math.max(y0, py));
    var near = obs.filter(function (o) {
      return o.r > px - REACH - HALF && o.l < px + REACH + HALF && o.b > py - REACH - HALF && o.t < py + REACH + HALF;
    });
    var spots = [], dx, dy;
    for (dy = -REACH; dy <= REACH; dy += STEP) {
      if (py + dy < y0 || py + dy > y1) continue;
      for (dx = -REACH; dx <= REACH; dx += STEP) {
        if (px + dx < x0 || px + dx > x1 || dx * dx + dy * dy > REACH * REACH) continue;
        spots.push([dx * dx + dy * dy, px + dx, py + dy]);
      }
    }
    spots.sort(function (p, q) { return p[0] - q[0]; });
    var passes = [[1, 1, 1], [1, 1, 0], [0, 1, 0]];
    for (var p = 0; p < passes.length; p++) {
      var avoid = near.filter(function (o) { return passes[p][o.k]; });
      for (var s = 0; s < spots.length; s++) {
        var x = spots[s][1], y = spots[s][2], ok = true;
        for (var i = 0; i < avoid.length && ok; i++) {
          var o = avoid[i];
          if (x + HALF > o.l && x - HALF < o.r && y + HALF > o.t && y - HALF < o.b) ok = false;
        }
        if (ok) return [x, y];
      }
    }
    return [px, py];
  }

  // Choose where the cache sits in its area, for the layout as it is now.
  function plan(it, raw) {
    var b = visibleRect(it, raw);
    b.l = Math.max(b.l, 8);
    b.r = Math.min(b.r, S.vw - 8);
    var a = it.el.getBoundingClientRect();
    var spot = clearSpot(a.left + it.u * a.width + it.dx, a.top + it.v * a.height + it.dy, b, obstacles(it.area));
    it.ox = spot[0] - raw.left;
    it.oy = spot[1] - raw.top;
    it.pw = raw.width;
    it.ph = raw.height;
    it.pv = S.vw;
    it.stale = false;
    it.planned = Date.now();
  }

  function measure(it) {
    var raw = it.area.getBoundingClientRect();
    if (raw.width < 8 || raw.height < 8) return { ok: false };
    var moved = it.stale || it.pv !== S.vw || Math.abs(raw.width - it.pw) > 1 || Math.abs(raw.height - it.ph) > 1;
    // While a layout is still settling (a resize drag), re-plan at most every 150ms.
    if (it.ox == null || (moved && Date.now() - it.planned > 150)) plan(it, raw);
    else if (moved) it.stale = true;
    var b = visibleRect(it, raw), x = raw.left + it.ox, y = raw.top + it.oy;
    return { ok: x >= b.l - 1 && x <= b.r + 1 && y >= b.t - 1 && y <= b.b + 1, x: x, y: y };
  }

  /* ------------------------------------------------------------- artwork */

  var COMPASS = '<svg class="hunt-cmp" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><g><path class="hunt-n" d="M12 5.2 14.7 12H9.3z"/><path class="hunt-s" d="M12 18.8 9.3 12h5.4z"/></g></svg>';
  // A small cache tin: body, lid, latch and a star sticker.
  var BOX =
    '<svg class="hunt-box" viewBox="0 0 40 36" aria-hidden="true" focusable="false">' +
      '<rect class="hunt-box-body" x="4" y="14" width="32" height="19" rx="4"/>' +
      '<path class="hunt-box-band" d="M4 20h32"/>' +
      '<rect class="hunt-box-latch" x="17" y="17" width="6" height="7" rx="1.5"/>' +
      '<g class="hunt-box-lid"><rect x="3" y="7" width="34" height="9" rx="3.5"/><path d="M12 7V5.5A1.5 1.5 0 0 1 13.5 4h13A1.5 1.5 0 0 1 28 5.5V7" fill="none"/></g>' +
      '<path class="hunt-box-star" d="M29 24.5l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z"/>' +
    "</svg>";
  var ICON_X = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* --------------------------------------------------------------- build */

  function pick(sel) {
    if (!sel) return null;
    var list;
    try { list = doc.querySelectorAll(sel); } catch (e) { return null; }
    for (var i = 0; i < list.length; i++) {
      var r = list[i].getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && !list[i].closest("[hidden], .hunt-layer")) return list[i];
    }
    return null;
  }

  function cacheLabel(c, found) {
    return found ? "Cache found: " + c.name + ". Read its note again" : "A hidden cache: " + c.name + ". Open it";
  }

  function buildCache(c, index) {
    var t = pick(c.at);
    if (!t) return null;
    var area = t;
    if (c.within) { try { area = t.closest(c.within) || t; } catch (e) {} }
    var got = !!foundMap()[c.id];
    var btn = make("button", "hunt-cache" + (got ? " is-found" : ""), { type: "button", "aria-label": cacheLabel(c, got) },
      '<span class="hunt-ping" aria-hidden="true"></span>' + BOX + '<span class="hunt-got" aria-hidden="true">' + ICON_CHECK + "</span>");
    var it = {
      c: c, index: index, el: t, area: area, clips: clipParents(area),
      u: num(c.u, 0.5), v: num(c.v, 0.5), dx: num(c.dx, 0), dy: num(c.dy, 0), node: btn,
      ox: null, oy: null, pw: 0, ph: 0, pv: 0, planned: 0, stale: false
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); open(it); });
    btn.addEventListener("focus", function () { btn.classList.add("is-seen"); });  // reached by Tab: it stays shown
    return it;
  }

  function buildBar(layer) {
    var bar = make("div", "hunt-bar", { role: "group", "aria-label": "Cache hunt" });
    bar.innerHTML =
      '<span class="hunt-count">' + COMPASS + '<span><b class="hunt-num">0</b> of ' + caches().length + '<span class="hunt-word"> found</span></span></span>' +
      '<span class="hunt-gps" aria-hidden="true"></span>' +
      '<span class="vh hunt-here"></span>' +
      '<span class="hunt-acts">' +
        '<button type="button" class="hunt-cluebtn" aria-expanded="false" aria-controls="hunt-list">Clues</button>' +
        '<button type="button" class="hunt-exit" aria-label="Stop the cache hunt">' + ICON_X + "</button>" +
      "</span>";
    layer.appendChild(bar);
    S.bar = bar;
    S.numEl = bar.querySelector(".hunt-num");
    S.gpsEl = bar.querySelector(".hunt-gps");
    S.hereEl = bar.querySelector(".hunt-here");
    S.clueBtn = bar.querySelector(".hunt-cluebtn");
    // The list sits right after its button, so Tab moves from "Clues" into it.
    var panel = make("div", "hunt-panel", { id: "hunt-list", role: "region", "aria-labelledby": "hunt-list-t" });
    panel.hidden = true;
    S.clueBtn.parentNode.insertBefore(panel, S.clueBtn.nextSibling);
    S.panel = panel;
    panel.addEventListener("click", function (e) { e.stopPropagation(); });
    S.clueBtn.addEventListener("click", function (e) { e.stopPropagation(); togglePanel(!S.panelOpen); });
    bar.querySelector(".hunt-exit").addEventListener("click", function () { if (S && S.opts.exit) S.opts.exit(); });
  }

  /* ------------------------------------------------------------ the list */

  function levelDots(n) {
    var s = "";
    for (var i = 1; i <= 3; i++) s += '<i class="' + (i <= n ? "on" : "") + '"></i>';
    return '<span class="hunt-level" role="img" aria-label="Difficulty ' + n + ' of 3">' + s + "</span>";
  }

  function renderPanel(focusId) {
    if (!S || !S.panel) return;
    var list = caches(), fm = foundMap(), here = pageKey(), total = list.length;
    var got = list.filter(function (c) { return fm[c.id]; }).length, done = got >= total;
    var items = "";
    list.forEach(function (c, i) {
      var f = fm[c.id], isHere = c.key === here;
      var status = f ? ICON_CHECK + " Found " + esc(when(f)) : (isHere ? "On this page" : esc(c.pageName || ""));
      items +=
        '<li class="hunt-item' + (f ? " is-found" : "") + (isHere ? " is-here" : "") + '" data-id="' + esc(c.id) + '">' +
          '<div class="hunt-item-top"><span class="hunt-item-n">' + (i + 1) + "</span>" +
            '<span class="hunt-item-name">' + esc(c.name) + "</span>" + levelDots(num(c.level, 1)) +
            '<span class="hunt-item-s">' + status + "</span></div>" +
          (f
            ? '<p class="hunt-item-find"><span class="vh">Inside: </span>' + esc(c.find) + "</p>"
            : '<p class="hunt-item-clue">' + esc(c.clue) + "</p>" +
              '<div class="hunt-item-hint">' +
                '<span class="hunt-rot" aria-hidden="true">' + esc(rot13(c.hint)) + "</span>" +
                '<button type="button" class="hunt-decode" aria-expanded="false" aria-controls="hunt-hint-' + esc(c.id) + '">Decode hint<span class="vh"> for ' + esc(c.name) + "</span></button>" +
                '<p class="hunt-hint-t" id="hunt-hint-' + esc(c.id) + '" hidden>' + esc(c.hint) +
                  (isHere ? "" : ' <a href="' + esc(site(c.page)) + '">Go to ' + esc(c.pageName || c.page) + ' <span aria-hidden="true">→</span></a>') +
                "</p>" +
              "</div>") +
        "</li>";
    });
    S.panel.innerHTML =
      '<div class="hunt-ph"><p class="hunt-pt" id="hunt-list-t">' + (done ? "All " + total + " caches found" : "Cache hunt") + "</p>" +
        '<button type="button" class="hunt-px" aria-label="Close the cache list">' + ICON_X + "</button></div>" +
      '<p class="hunt-pp">' + (done
        ? "You’ve explored every corner. Your holo research cards are unsealed."
        : got + " of " + total + " found. Each clue points at something on this site; the hint tells you where.") + "</p>" +
      '<div class="hunt-prog" aria-hidden="true"><span style="width:' + Math.round(got / Math.max(1, total) * 100) + '%"></span></div>' +
      '<ol class="hunt-items">' + items + "</ol>" +
      '<a class="hunt-prize" href="' + esc(site("cards.html")) + '">' +
        (done ? "Open your holo research cards" : "Find all " + total + " to unseal my holo research cards") + ' <span aria-hidden="true">→</span></a>' +
      (got ? '<button type="button" class="hunt-reset">Start the hunt again</button>' : "");

    S.panel.querySelector(".hunt-px").addEventListener("click", function () { togglePanel(false); S.clueBtn.focus(); });
    Array.prototype.forEach.call(S.panel.querySelectorAll(".hunt-decode"), function (b) {
      b.addEventListener("click", function () {
        var box = b.parentNode, open = b.getAttribute("aria-expanded") !== "true";
        b.setAttribute("aria-expanded", open ? "true" : "false");
        box.querySelector(".hunt-hint-t").hidden = !open;
        box.querySelector(".hunt-rot").hidden = open;
        b.firstChild.nodeValue = open ? "Hide hint" : "Decode hint";
      });
    });
    var reset = S.panel.querySelector(".hunt-reset");
    if (reset) reset.addEventListener("click", function () {
      if (!reset.classList.contains("is-armed")) {
        reset.classList.add("is-armed");
        reset.textContent = "Tap again to clear your finds";
        later(function () { if (reset.isConnected) { reset.classList.remove("is-armed"); reset.textContent = "Start the hunt again"; } }, 3200);
        return;
      }
      S.mem = {};
      set(KEY_FOUND, "{}");
      S.items.forEach(function (it) { it.node.classList.remove("is-found"); it.node.setAttribute("aria-label", cacheLabel(it.c, false)); });
      updateBar();
      renderPanel();
      S.say("Your finds are cleared. The hunt starts again.");
      var first = S.panel.querySelector(".hunt-decode");
      if (first) first.focus();
    });
    if (focusId) {
      var li = S.panel.querySelector('.hunt-item[data-id="' + focusId + '"]');
      if (li) {
        li.classList.add("is-focus");
        var btn = li.querySelector(".hunt-decode");
        if (btn) btn.focus();
        if (li.scrollIntoView) li.scrollIntoView({ block: "nearest" });
      }
    }
  }

  function togglePanel(open, focusId) {
    if (!S || !S.panel) return;
    S.panelOpen = open;
    if (open) renderPanel(focusId);
    S.panel.hidden = !open;
    S.clueBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && !focusId && S.lastInput === "key") {
      var f = S.panel.querySelector(".hunt-decode, .hunt-prize");
      if (f) f.focus();
    }
  }

  /* ----------------------------------------------------------- status bar */

  function thisPage() { return S.items[0] || null; }  // one cache per page

  function updateBar() {
    if (!S) return;
    S.numEl.textContent = foundCount();
    var it = thisPage(), fm = foundMap(), here;
    var onPage = caches().filter(function (c) { return c.key === pageKey(); })[0];
    if (it) here = fm[it.c.id] ? "You’ve found this page’s cache." : "A cache is hidden on this page.";
    else if (onPage) here = fm[onPage.id] ? "You’ve found this page’s cache." : "This page’s cache is hidden on a part of the page not shown at this size.";
    else here = "There’s no cache on this page. Open Clues to see where to look.";
    S.hereEl.textContent = here;
    S.gpsText = null;  // force the readout to redraw
    queue();
  }

  // The distance readout, updated as the page scrolls. Visual only: the
  // same information is in the static text above for screen readers.
  function gps(m) {
    var it = thisPage(), text, near = false, pre = S.vw < 480 ? "" : "Cache · ";  // phones get the short form
    if (!it) {
      text = pre ? "No cache on this page" : "No cache here";
    } else if (foundMap()[it.c.id]) {
      text = pre ? "Cache · found" : "Found it";
    } else if (!m || !m.ok) {
      text = pre + (pre ? "somewhere here" : "Somewhere here");
    } else {
      var vh = win.innerHeight, vw = S.vw, dy = m.y - vh / 2;
      if (m.y > 70 && m.y < vh - 96 && m.x > 0 && m.x < vw) {
        text = pre ? "Cache · on your screen" : "On screen";
        near = true;
      } else {
        text = pre + Math.max(1, Math.round(Math.abs(dy) / PX_PER_M)) + " m " + (dy > 0 ? "↓" : "↑");
      }
    }
    if (it && near !== it.near) { it.near = near; it.node.classList.toggle("is-near", near); }
    if (text !== S.gpsText) {
      S.gpsText = text;
      S.gpsEl.textContent = text;
      S.gpsEl.classList.toggle("is-hot", near);
    }
  }

  /* ---------------------------------------------------------- finding */

  function open(it) {
    var c = it.c, fresh = !foundMap()[c.id];
    if (fresh) {
      markFound(c.id);
      it.node.classList.add("is-opening");
      it.node.setAttribute("aria-label", cacheLabel(c, true));
      later(function () { it.node.classList.remove("is-opening"); it.node.classList.add("is-found"); }, motionOK() ? 650 : 0);
      updateBar();
      if (S.panelOpen) renderPanel();
      if (foundCount() >= caches().length) set(KEY_CARDS, "open");
    }
    later(function () { note(it, fresh); }, fresh && motionOK() ? 520 : 0);
  }

  function note(it, fresh) {
    if (!S || S.dialog) return;
    var c = it.c, list = caches(), total = list.length, got = foundCount(), done = got >= total;
    var fm = foundMap(), next = list.filter(function (x) { return !fm[x.id]; })[0];
    var title = done && fresh ? "All " + total + " caches found" : (fresh ? "Found it" : "You found this one");
    var d = make("dialog", "hunt-dialog", { "aria-labelledby": "hunt-note-t", "aria-describedby": "hunt-note-p" });
    d.innerHTML =
      '<div class="hunt-dlg-art' + (fresh ? " is-fresh" : "") + '" aria-hidden="true">' + BOX + "</div>" +
      '<p class="hunt-dlg-k">Cache ' + (it.index + 1) + " of " + total + " · " + esc(c.name) + "</p>" +
      '<h2 class="hunt-dlg-t" id="hunt-note-t">' + title + "</h2>" +
      '<p class="hunt-dlg-p" id="hunt-note-p">' + esc(c.find) + "</p>" +
      (done && fresh ? '<p class="hunt-dlg-p">That was the last one. The holo edition of my research cards is unsealed.</p>' : "") +
      '<p class="hunt-dlg-log">' + ICON_CHECK + " Logged " + esc(when(fm[c.id])) + " · " + got + " of " + total + " found</p>" +
      '<div class="hunt-dlg-acts">' +
        (done
          ? '<a class="hunt-btn hunt-btn--solid" href="' + esc(site("cards.html")) + '">Open the holo cards <span aria-hidden="true">→</span></a>'
          : '<button type="button" class="hunt-btn hunt-btn--solid hunt-next">Next clue <span aria-hidden="true">→</span></button>') +
        '<button type="button" class="hunt-btn hunt-close">' + (done ? "Close" : "Keep exploring") + "</button>" +
      "</div>";
    doc.body.appendChild(d);
    S.dialog = d;
    var close = function (then) {
      if (S && S.dialog === d) S.dialog = null;
      try { if (d.open && d.close) d.close(); } catch (e) {}
      if (d.parentNode) d.parentNode.removeChild(d);
      if (then) then(); else if (it.node.isConnected) it.node.focus();
    };
    d.querySelector(".hunt-close").addEventListener("click", function () { close(); });
    var nb = d.querySelector(".hunt-next");
    if (nb) nb.addEventListener("click", function () { close(function () { togglePanel(true, next && next.id); }); });
    d.addEventListener("cancel", function (e) { e.preventDefault(); close(); });
    if (typeof d.showModal === "function") {
      d.showModal();
    } else {
      d.setAttribute("open", "");
      d.setAttribute("role", "dialog");
      d.setAttribute("aria-modal", "true");
      d.classList.add("is-fallback");
      d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }
    var first = d.querySelector(".hunt-btn--solid");
    if (first) first.focus();
    S.say((fresh ? title + ". " : "") + c.find + " " + got + " of " + total + " found.");
  }

  /* ----------------------------------------------------------------- sync */

  function place(it, m) {
    if (!m.ok) {
      if (!it.hiddenNow) { it.hiddenNow = true; it.node.classList.add("is-off"); }
      return;
    }
    if (it.hiddenNow) { it.hiddenNow = false; it.node.classList.remove("is-off"); }
    var x = Math.round(m.x - S.L), y = Math.round(m.y - S.T);
    if (x !== it.x || y !== it.y) { it.x = x; it.y = y; it.node.style.transform = "translate(" + x + "px," + y + "px)"; }
  }

  function sync() {
    if (!S) return;
    var lr = S.layer.getBoundingClientRect();
    S.L = lr.left;
    S.T = lr.top;
    S.vw = root.clientWidth || win.innerWidth;
    var ms = [], i;
    for (i = 0; i < S.items.length; i++) ms.push(measure(S.items[i]));  // reads first…
    for (i = 0; i < S.items.length; i++) place(S.items[i], ms[i]);      // …then writes
    S.at = ms[0] || null;  // this page's cache as last measured, and the scroll it was measured at
    S.atX = win.pageXOffset;
    S.atY = win.pageYOffset;
    gps(S.at);
  }

  // Scrolling moves nothing in the layer (it's laid out in page coordinates),
  // so the readout works the distance out again without measuring anything.
  function scrolled() {
    if (!S) return;
    if (S.follow) { burst(280); return; }  // a cache inside something sticky: track it
    if (S.gpsQueued) return;
    S.gpsQueued = true;
    requestAnimationFrame(function () {
      if (!S) return;
      S.gpsQueued = false;
      var m = S.at;
      gps(m && m.ok ? { ok: true, x: m.x - (win.pageXOffset - S.atX), y: m.y - (win.pageYOffset - S.atY) } : m);
    });
  }

  function queue() {
    if (!S || S.queued) return;
    S.queued = true;
    requestAnimationFrame(function () { if (!S) return; S.queued = false; sync(); });
  }

  // Follow the page every frame for a while (scrolling, parallax, reveals).
  function burst(ms) {
    if (!S) return;
    S.until = Math.max(S.until, Date.now() + ms);
    if (S.looping) return;
    S.looping = true;
    requestAnimationFrame(function loop() {
      if (!S) return;
      sync();
      if (Date.now() < S.until) requestAnimationFrame(loop);
      else S.looping = false;
    });
  }

  /* ---------------------------------------------------------- start/stop */

  function start(opts) {
    if (S) stop();
    S = {
      opts: opts || {}, say: (opts && opts.say) || function () {},
      items: [], off: [], timers: [], mem: null, until: 0, lastInput: "pointer",
      site: String((opts && opts.base) || "").replace(/assets\/?$/, "")
    };
    try {
      build();
    } catch (err) {
      stop();
      throw err;
    }
  }

  function build() {
    var layer = make("section", "hunt-layer", { id: "hunt-layer", "aria-label": "Cache hunt" });
    S.layer = layer;
    // Right after the nav (and its mobile drawer): Tab goes compass → hunt → page.
    var nav = doc.querySelector(".nav"), after = nav;
    if (nav && nav.nextElementSibling && nav.nextElementSibling.classList.contains("mobile-menu")) after = nav.nextElementSibling;
    if (after && after.parentNode) after.parentNode.insertBefore(layer, after.nextSibling);
    else doc.body.appendChild(layer);

    buildBar(layer);
    var here = pageKey();
    caches().forEach(function (c, i) {
      if (c.key !== here) return;
      var it = buildCache(c, i);
      if (it) { S.items.push(it); layer.appendChild(it.node); }
    });
    updateBar();

    // A gentle entrance the first time a cache scrolls into view.
    if ("IntersectionObserver" in win && S.items.length) {
      S.io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          S.items.forEach(function (it) { if (it.el === e.target) it.node.classList.add("is-seen"); });
          S.io.unobserve(e.target);
          burst(900);
        });
      }, { threshold: 0.1 });
      S.items.forEach(function (it) { S.io.observe(it.el); });
    } else {
      S.items.forEach(function (it) { it.node.classList.add("is-seen"); });
    }

    // A cache inside something sticky or fixed moves as the page scrolls.
    S.follow = S.items.some(function (it) {
      for (var p = it.area; p && p !== doc.body; p = p.parentElement) {
        var pos = getComputedStyle(p).position;
        if (pos === "sticky" || pos === "fixed") return true;
      }
      return false;
    });
    listen(win, "scroll", scrolled, { passive: true });
    listen(win, "resize", function () { burst(500); });
    if (S.items.some(function (it) { return it.area.closest(".hero"); })) {
      listen(doc, "pointermove", function (e) {
        if (e.target && e.target.closest && e.target.closest(".hero")) burst(1200);  // the hero drifts with the cursor
      }, { passive: true });
    }
    listen(doc, "pointerdown", function () { if (S) S.lastInput = "pointer"; }, true);
    listen(doc, "keydown", function (e) {
      if (!S) return;
      S.lastInput = "key";
      if (e.key === "Escape" && S.panelOpen && !S.dialog) { togglePanel(false); S.clueBtn.focus(); }
    });
    listen(doc, "click", function (e) {
      if (!S || !S.panelOpen) return;
      if (!(e.target.closest && e.target.closest(".hunt-panel, .hunt-cluebtn"))) togglePanel(false);
    });
    // Text can reflow without its area changing size: look for clear spots again.
    var relayout = function () { if (!S) return; S.items.forEach(function (it) { it.stale = true; }); burst(900); };
    if (doc.readyState !== "complete") listen(win, "load", relayout);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(relayout);
    if ("ResizeObserver" in win) {
      S.ro = new ResizeObserver(function () { burst(320); });
      S.ro.observe(doc.body);
    }
    S.tick = setInterval(queue, 800);  // late layout changes: accordions, lazy images, fonts

    burst(1500);
    if (!S.opts.restore) {
      var it = thisPage();
      S.say("Cache hunt on. " + foundCount() + " of " + caches().length + " found. " + S.hereEl.textContent);
      if (it && !foundMap()[it.c.id]) later(function () { if (S) S.bar.classList.add("is-hello"); }, 200);
    }
  }

  function stop() {
    if (!S) return;
    var s = S;
    S = null;
    var focusInside = s.layer && s.layer.contains(doc.activeElement);
    s.off.forEach(function (f) { try { f(); } catch (e) {} });
    s.timers.forEach(function (t) { clearTimeout(t); });
    clearInterval(s.tick);
    if (s.io) s.io.disconnect();
    if (s.ro) s.ro.disconnect();
    if (s.dialog) {
      try { if (s.dialog.open && s.dialog.close) s.dialog.close(); } catch (e) {}
      if (s.dialog.parentNode) s.dialog.parentNode.removeChild(s.dialog);
    }
    if (s.layer && s.layer.parentNode) s.layer.parentNode.removeChild(s.layer);
    if (focusInside && s.opts.toggles) {
      for (var i = 0; i < s.opts.toggles.length; i++) {
        var t = s.opts.toggles[i];
        var inClosedDrawer = t.closest(".mobile-menu") && !t.closest(".mobile-menu.open");
        if (t.offsetWidth && !inClosedDrawer) { t.focus(); break; }
      }
    }
  }

  win.HuntEngine = { start: start, stop: stop };
})();

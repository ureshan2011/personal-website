/* ==========================================================================
   AR Mode — engine (loaded on demand by ar-mode.js, never before)

   Everything it draws lives in ONE layer, inserted right after the nav:
     · tracking brackets that lock onto each photo as it scrolls into view
     · pinned cards and field notes, content from assets/js/ar-notes.js
     · six hidden crystals, one on each page the menu doesn't show
     · a HUD: readout, crystal counter + hunt panel, and a way out

   It never edits the page's own elements. The layer is absolutely positioned
   in document coordinates and every item is placed by measuring its target,
   so grids, sibling selectors and reveal animations are left alone. Pins on
   photos are authored in the photo's own coordinates (0–1 across the full
   image) and mapped through object-fit/object-position, so they stay on the
   thing they point at however the photo is cropped. Turning AR Mode off
   removes the layer entirely.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var win = window;
  var reducedMQ = win.matchMedia ? win.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var KEY_FOUND = "arx-crystals";
  var KEY_CARDS = "arx-cards";
  var KEY_KEYS = "arx-keys";
  var MAX_PHOTOS = 28;
  var S = null;  // everything for the current session; null while off

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
  function extend(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function num(v, d) { return typeof v === "number" && isFinite(v) ? v : d; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function repeat(s, n) { return new Array(n + 1).join(s); }
  function listen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts || false);
    S.off.push(function () { target.removeEventListener(type, fn, opts || false); });
  }
  function later(fn, ms) { var t = setTimeout(fn, ms); S.timers.push(t); return t; }
  function byDocOrder(a, b) {
    if (a === b) return 0;
    return a.compareDocumentPosition(b) & 4 ? -1 : 1;  // 4 = b follows a
  }

  /* ---------------------------------------------------------------- data */

  function notes() { return win.AR_NOTES || {}; }
  function crystals() { return notes().crystals || []; }
  function pageKey() {
    var p = location.pathname.replace(/\/+/g, "/");
    p = p.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "").replace(/^\//, "").replace(/\/$/, "");
    return p || "index";
  }
  function site(path) {
    if (!path || /^([a-z]+:)?\/\//i.test(path) || path.charAt(0) === "#") return path;
    return S.site + path.replace(/^\//, "");
  }
  function foundList() {
    var ids = crystals().map(function (c) { return c.id; });
    var out = S && S.mem ? S.mem.slice() : [];
    try {
      var saved = JSON.parse(get(KEY_FOUND) || "[]");
      if (Array.isArray(saved)) saved.forEach(function (id) { if (out.indexOf(id) < 0) out.push(id); });
    } catch (e) {}
    return out.filter(function (id) { return ids.indexOf(id) >= 0; });
  }
  function markFound(id) {
    var list = foundList();
    if (list.indexOf(id) < 0) list.push(id);
    S.mem = list;  // survives a browser that blocks storage, for this page at least
    set(KEY_FOUND, JSON.stringify(list));
    return list;
  }

  /* ------------------------------------------------------------ geometry */

  // Ancestors that clip the target (overflow other than visible), nearest first.
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

  // How far to pull each bracket in so it sits on a rounded frame
  // (the homepage arch has a 220px radius) rather than floating outside it.
  function cornerInsets(img, clips) {
    var out = [0, 0, 0, 0];
    var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"];
    [img].concat(clips.slice(0, 1)).forEach(function (n) {
      var cs = getComputedStyle(n), r = n.getBoundingClientRect(), max = Math.min(r.width, r.height) / 2;
      props.forEach(function (p, i) {
        var v = String(cs[p] || "0"), px = parseFloat(v) || 0;
        if (v.indexOf("%") > -1) px = px / 100 * r.width;
        out[i] = Math.max(out[i], Math.min(px, max) * 0.2929);  // 1 - 1/√2: where the curve crosses the diagonal
      });
    });
    return out;
  }

  function objectPosition(cs) {
    var kw = { left: 0, center: 50, right: 100, top: 0, bottom: 100 };
    var raw = String(cs.objectPosition || "50% 50%").trim().split(/\s+/);
    function val(t) { if (Object.prototype.hasOwnProperty.call(kw, t)) return kw[t]; return /%$/.test(t) ? parseFloat(t) : 50; }
    var a = raw[0], b = raw[1] || "center";
    if (a === "top" || a === "bottom" || b === "left" || b === "right") { var t = a; a = b; b = t; }
    return [val(a) / 100, val(b) / 100];
  }

  // Map a point given in the photo's own coordinates to the screen.
  function imagePoint(img, cs, r, u, v) {
    var nw = img.naturalWidth, nh = img.naturalHeight, rw = r.width, rh = r.height;
    var fit = cs.objectFit;
    if (!nw || !nh || !rw || !rh || (fit !== "cover" && fit !== "contain" && fit !== "scale-down")) {
      return [r.left + u * rw, r.top + v * rh];
    }
    var s = fit === "cover" ? Math.max(rw / nw, rh / nh) : Math.min(rw / nw, rh / nh);
    if (fit === "scale-down") s = Math.min(s, 1);
    var dw = nw * s, dh = nh * s, pos = objectPosition(cs);
    return [r.left + (rw - dw) * pos[0] + u * dw, r.top + (rh - dh) * pos[1] + v * dh];
  }

  function measure(it) {
    var raw = it.el.getBoundingClientRect();
    var L = raw.left, T = raw.top, R = raw.right, B = raw.bottom;
    for (var i = 0; i < it.clips.length; i++) {
      var c = it.clips[i].getBoundingClientRect();
      if (c.left > L) L = c.left;
      if (c.top > T) T = c.top;
      if (c.right < R) R = c.right;
      if (c.bottom < B) B = c.bottom;
    }
    var m = { l: L, t: T, r: R, b: B, w: R - L, h: B - T };
    m.ok = m.w > 8 && m.h > 8;
    // A pin needs room: on a thumbnail it would only cover the text beside it.
    if (it.kind === "pin" && it.isImg && (m.w < 120 || m.h < 90)) m.ok = false;
    if (m.ok && it.kind !== "photo") {
      var p = it.isImg
        ? imagePoint(it.el, it.cs, raw, it.u, it.v)
        : [raw.left + it.u * raw.width, raw.top + it.v * raw.height];
      // The anchor point itself must be visible (cropped out = hidden);
      // dx/dy nudges are applied after that check.
      m.ok = p[0] >= L - 1 && p[0] <= R + 1 && p[1] >= T - 1 && p[1] <= B + 1;
      m.x = p[0] + it.dx;
      m.y = p[1] + it.dy;
    }
    return m;
  }

  /* ------------------------------------------------------------- artwork */

  var DEFS =
    '<svg class="arx-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="arxGemA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f9ff"/><stop offset=".5" stop-color="#a9c0ff"/><stop offset="1" stop-color="#5a6af0"/></linearGradient>' +
      '<linearGradient id="arxGemB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3ebff"/><stop offset=".55" stop-color="#7f98ff"/><stop offset="1" stop-color="#4549d8"/></linearGradient>' +
      '<linearGradient id="arxGemC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7189ff"/><stop offset="1" stop-color="#2c27a0"/></linearGradient>' +
      '<linearGradient id="arxGemD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c55e6"/><stop offset="1" stop-color="#1b1872"/></linearGradient>' +
    "</defs></svg>";

  // The crystal from the Try AR page: an elongated octahedron, lit from the top left.
  var GEM =
    '<svg class="arx-gem" viewBox="0 0 40 60" aria-hidden="true" focusable="false">' +
      '<path d="M20 1 3 24l17 6z" fill="url(#arxGemA)"/>' +
      '<path d="M20 1l17 23-17 6z" fill="url(#arxGemB)"/>' +
      '<path d="M3 24l17 6v29z" fill="url(#arxGemC)"/>' +
      '<path d="M37 24l-17 6v29z" fill="url(#arxGemD)"/>' +
      '<path d="M20 1 3 24l17 6 17-6z" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".8" stroke-linejoin="round"/>' +
      '<path d="M3 24l17 35 17-35" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".8" stroke-linejoin="round"/>' +
      '<path d="M10.6 13.4l4.1 6.1" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".95"/>' +
    "</svg>";

  var MINI =
    '<svg class="arx-mini" viewBox="0 0 16 24" aria-hidden="true" focusable="false">' +
      '<path d="M8 .5 1 10l7 2.5 7-2.5z" fill="#c9d7ff"/><path d="M1 10l7 2.5v11z" fill="#7189ff"/><path d="M15 10l-7 2.5v11z" fill="#4549d8"/>' +
    "</svg>";

  var ICON_X = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ------------------------------------------------------------- targets */

  // First visible match, so a selector that also matches a hidden copy still works.
  function pick(sel) {
    if (!sel) return null;
    var list;
    try { list = doc.querySelectorAll(sel); } catch (e) { return null; }
    for (var i = 0; i < list.length; i++) {
      var r = list[i].getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && !list[i].closest("[hidden], .arx-layer")) return list[i];
    }
    return null;
  }

  function collectPhotos() {
    var imgs = doc.querySelectorAll("img"), out = [];
    for (var i = 0; i < imgs.length && out.length < MAX_PHOTOS; i++) {
      var im = imgs[i];
      if (im.closest(".nav, .mobile-menu, footer, .footer, .marquee, .trust-logos, [data-ar-skip], [hidden], .arx-layer")) continue;
      var r = im.getBoundingClientRect();
      if (r.width < 150 || r.height < 100) continue;
      out.push(im);
    }
    return out;
  }

  function register(it) {
    S.items.push(it);
    var list = S.byEl.get(it.el);
    if (!list) { list = []; S.byEl.set(it.el, list); }
    list.push(it);
  }

  /* --------------------------------------------------------------- build */

  function buildPhoto(im, n, chip) {
    var clips = clipParents(im);
    var ins = cornerInsets(im, clips);
    var node = make("div", "arx-anchor", { "aria-hidden": "true" });
    node.style.setProperty("--tl", ins[0].toFixed(1) + "px");
    node.style.setProperty("--tr", ins[1].toFixed(1) + "px");
    node.style.setProperty("--bl", ins[2].toFixed(1) + "px");
    node.style.setProperty("--br", ins[3].toFixed(1) + "px");
    node.innerHTML =
      '<i class="arx-c arx-c--tl"></i><i class="arx-c arx-c--tr"></i><i class="arx-c arx-c--bl"></i><i class="arx-c arx-c--br"></i>' +
      '<span class="arx-chip"><i></i><span class="arx-chip-l">' + esc(chip || "Anchor " + pad2(n) + " · Tracking") +
      '</span><span class="arx-chip-s">A' + pad2(n) + "</span></span>";
    return { kind: "photo", el: im, clips: clips, node: node, n: n };
  }

  function entryItem(en) {
    if (en.dynamic === "next-event") {
      var ne = doc.querySelector("[data-next-event]");
      var label = ne && ne.querySelector("span");
      var txt = label ? label.textContent.replace(/^\s*Next:\s*/i, "").trim() : "";
      if (!txt) return null;
      en = extend(en, { title: txt, href: ne.getAttribute("href"), pageRelative: true });
    }
    var t = pick(en.at);
    if (!t) return null;
    var it = {
      el: t, clips: clipParents(t), isImg: t.tagName === "IMG", en: en,
      u: num(en.u, 0.5), v: num(en.v, 0.5), dx: num(en.dx, 0), dy: num(en.dy, 0)
    };
    if (it.isImg) it.cs = getComputedStyle(t);
    if (en.crystal) {
      var def = null;
      crystals().forEach(function (c) { if (c.id === en.crystal) def = c; });
      if (!def) return null;
      it.kind = "crystal";
      it.def = def;
      return buildCrystal(it);
    }
    if (en.surface) {
      it.kind = "surface";
      it.node = make("div", "arx-surface", { "aria-hidden": "true" },
        '<i class="arx-ellipse"></i><span>' + esc(en.surface) + "</span>");
      return it;
    }
    it.kind = "pin";
    return buildPin(it);
  }

  function buildPin(it) {
    var en = it.en, id = "arx-card-" + (++S.uid);
    var href = en.href ? (en.pageRelative ? en.href : site(en.href)) : "";
    var node = make("div", "arx-pin" + (en.tone === "dark" ? " is-dark" : ""));
    var btn = make("button", "arx-dot", { type: "button", "aria-expanded": "false", "aria-controls": id },
      '<span class="arx-lbl">' + esc(en.label || en.title) + "</span>");
    var line = make("i", "arx-line", { "aria-hidden": "true" });
    var card = make("div", "arx-card", { id: id },
      (en.kicker ? '<span class="arx-k">' + esc(en.kicker) + "</span>" : "") +
      '<span class="arx-t">' + esc(en.title) + "</span>" +
      (en.text ? '<span class="arx-x">' + esc(en.text) + "</span>" : "") +
      (href ? '<a class="arx-a" href="' + esc(href) + '">' + esc(en.link || "Read more") + ' <span aria-hidden="true">→</span></a>' : ""));
    node.appendChild(btn);
    node.appendChild(line);
    node.appendChild(card);
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !it.isOpen;
      if (open && it.compact) closeCompact(it);
      it.userOpen = open;
      queue();
    });
    it.node = node;
    it.btn = btn;
    it.card = card;
    it.line = line;
    return it;
  }

  function buildCrystal(it) {
    var got = foundList().indexOf(it.def.id) > -1;
    var btn = make("button", "arx-crystal" + (got ? " is-found" : ""), {
      type: "button",
      "aria-label": got ? "Crystal already collected on this page" : "A hidden crystal. Collect it"
    });
    var shards = "";
    for (var i = 0; i < 8; i++) shards += '<i style="--a:' + (i * 45 + 22) + 'deg"></i>';
    btn.innerHTML = '<span class="arx-glow" aria-hidden="true"></span>' + GEM +
      '<span class="arx-shards" aria-hidden="true">' + shards + "</span>" +
      '<span class="arx-got" aria-hidden="true">' + ICON_CHECK + "</span>";
    btn.addEventListener("click", function (e) { e.stopPropagation(); collect(it); });
    it.node = btn;
    it.btn = btn;
    return it;
  }

  function buildHud(layer) {
    var total = crystals().length;
    var hud = make("div", "arx-hud");
    hud.innerHTML =
      '<div class="arx-readout" aria-hidden="true"><i class="arx-live"></i><b>AR Mode</b>' +
        '<span class="arx-sep">/</span><span class="arx-n">Scanning</span>' +
        '<span class="arx-clockwrap"><span class="arx-sep">/</span><span class="arx-clock"></span></span></div>' +
      '<div class="arx-ctrl">' +
        (total ? '<button type="button" class="arx-hunt" aria-expanded="false" aria-controls="arx-hunt">' + MINI +
          '<span class="arx-hunt-n">0</span><span class="arx-hunt-of">/' + total + "</span>" +
          '<span class="arx-vh"> crystals found. Open the crystal hunt</span></button>' : "") +
        '<button type="button" class="arx-exit" aria-label="Take off the glasses (AR Mode off)">' + ICON_X + '<span class="arx-exit-t" aria-hidden="true">Take off</span></button>' +
      "</div>";
    layer.appendChild(hud);
    S.hud = hud;
    S.countEl = hud.querySelector(".arx-n");
    S.clockEl = hud.querySelector(".arx-clock");
    S.clockWrap = hud.querySelector(".arx-clockwrap");
    S.huntBtn = hud.querySelector(".arx-hunt");
    hud.querySelector(".arx-exit").addEventListener("click", function () { if (S && S.opts.exit) S.opts.exit(); });
    if (S.huntBtn) {
      S.huntBtn.addEventListener("click", function (e) { e.stopPropagation(); togglePanel(!S.panelOpen); });
      buildPanel(S.huntBtn);
    }
    updateCounter(false);
    tickClock();
    S.clockTimer = setInterval(tickClock, 30000);
    S.toast = make("div", "arx-toast", { "aria-hidden": "true" }, MINI + '<span><b class="arx-toast-t"></b><span class="arx-toast-s"></span></span>');
    layer.appendChild(S.toast);
  }

  // The panel sits right after its button, so Tab moves from the counter
  // straight into the hunt and then on to "Take off".
  function buildPanel(btn) {
    var p = make("div", "arx-panel", { id: "arx-hunt", role: "region", "aria-labelledby": "arx-hunt-t" });
    p.hidden = true;
    btn.parentNode.insertBefore(p, btn.nextSibling);
    S.panel = p;
    p.addEventListener("click", function (e) { e.stopPropagation(); });
    renderPanel();
  }

  function renderPanel() {
    if (!S || !S.panel) return;
    var list = crystals(), got = foundList(), total = list.length, here = pageKey();
    var done = got.length >= total;
    var slots = "";
    list.forEach(function (c) { slots += '<i class="' + (got.indexOf(c.id) > -1 ? "is-on" : "") + '"></i>'; });
    var items = "";
    list.forEach(function (c) {
      var has = got.indexOf(c.id) > -1, isHere = c.key === here;
      items += '<li class="' + (has ? "is-found" : "") + (isHere ? " is-here" : "") + '"><a href="' + esc(site(c.page)) + '">' +
        '<span class="arx-hl">' + esc(c.hint) + "</span>" +
        '<span class="arx-hs">' + (has ? ICON_CHECK + " Found" : (isHere ? "This page" : esc(c.label || ""))) + "</span></a></li>";
    });
    var keysOn = get(KEY_KEYS) !== "off";
    S.panel.innerHTML =
      '<div class="arx-ph"><span class="arx-k">Crystal hunt</span>' +
        '<button type="button" class="arx-px" aria-label="Close the crystal hunt">' + ICON_X + "</button></div>" +
      '<p class="arx-pt" id="arx-hunt-t">' + (done ? "All six found. You’ve seen every hidden page."
        : "Six crystals hide on the pages the menu doesn’t show.") + "</p>" +
      '<div class="arx-slots" aria-hidden="true">' + slots + "</div>" +
      '<p class="arx-pp">' + got.length + " of " + total + " found. " +
        (done ? "The holo edition of my research cards is unsealed." : "With the glasses on, open a page below and look around.") + "</p>" +
      '<ol class="arx-hints">' + items + "</ol>" +
      '<a class="arx-pcta" href="' + esc(site("cards.html")) + '">' + MINI +
        (done ? "Open my holo research cards" : "Peek at the sealed cards") + ' <span aria-hidden="true">→</span></a>' +
      '<div class="arx-pf">' +
        '<label class="arx-switch"><input type="checkbox"' + (keysOn ? " checked" : "") + '> <span>Keyboard shortcut <kbd>G</kbd></span></label>' +
        (got.length ? '<button type="button" class="arx-reset">Start over</button>' : "") +
      "</div>";
    S.panel.querySelector(".arx-px").addEventListener("click", function () { togglePanel(false); S.huntBtn.focus(); });
    S.panel.querySelector(".arx-switch input").addEventListener("change", function (e) {
      set(KEY_KEYS, e.target.checked ? "on" : "off");
      S.say(e.target.checked ? "Keyboard shortcut on." : "Keyboard shortcut off.");
    });
    var reset = S.panel.querySelector(".arx-reset");
    if (reset) reset.addEventListener("click", function () {
      if (!reset.classList.contains("is-armed")) {
        reset.classList.add("is-armed");
        reset.textContent = "Tap again to reset";
        later(function () { if (reset.isConnected) { reset.classList.remove("is-armed"); reset.textContent = "Start over"; } }, 3200);
        return;
      }
      S.mem = [];
      set(KEY_FOUND, "[]");
      S.items.forEach(function (it) {
        if (it.kind === "crystal") { it.node.classList.remove("is-found"); it.btn.setAttribute("aria-label", "A hidden crystal. Collect it"); }
      });
      updateCounter(false);
      renderPanel();
      S.say("Crystal hunt reset.");
      var first = S.panel.querySelector(".arx-hints a");
      if (first) first.focus();
    });
  }

  function togglePanel(open) {
    if (!S || !S.panel) return;
    S.panelOpen = open;
    if (open) renderPanel();
    S.panel.hidden = !open;
    S.huntBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      var f = S.panel.querySelector(".arx-hints a");
      if (f && S.lastInput === "key") f.focus();
    }
  }

  function updateCounter(bump) {
    if (!S || !S.huntBtn) return;
    var n = foundList().length;
    S.huntBtn.querySelector(".arx-hunt-n").textContent = n;
    S.huntBtn.classList.toggle("is-done", n >= crystals().length);
    if (bump && motionOK()) {
      S.huntBtn.classList.remove("is-bump");
      void S.huntBtn.offsetWidth;
      S.huntBtn.classList.add("is-bump");
    }
  }

  function tickClock() {
    if (!S || !S.clockEl) return;
    var t = "";
    try {
      t = new Intl.DateTimeFormat("en-NZ", { timeZone: "Pacific/Auckland", hour: "numeric", minute: "2-digit" }).format(new Date());
    } catch (e) { t = ""; }
    S.clockWrap.hidden = !t;
    S.clockEl.textContent = t ? "Christchurch " + t.replace(/\s+/g, " ").toUpperCase() : "";
  }

  function setCount(text) {
    if (S && S.countEl) S.countEl.textContent = text || S.count + (S.count === 1 ? " anchor" : " anchors");
  }

  /* ------------------------------------------------------------- crystals */

  function collect(it) {
    var id = it.def.id, total = crystals().length;
    if (foundList().indexOf(id) > -1) {
      var have = foundList().length;
      toast("Already collected", have + " of " + total + " found.");
      S.say("Already collected. " + have + " of " + total + " found.");
      return;
    }
    var list = markFound(id), n = list.length, done = n >= total;
    var head = done ? "All " + total + " crystals found" : "Crystal " + n + " of " + total + " found";
    var sub = done ? "Your holo research cards are unsealed." : (total - n) + " more hide on pages the menu doesn’t show.";
    it.btn.setAttribute("aria-label", "Crystal collected");
    it.node.classList.add("is-collecting");
    later(function () {
      it.node.classList.remove("is-collecting");
      it.node.classList.add("is-found");
    }, motionOK() ? 720 : 0);
    fly(it, function () { updateCounter(true); });
    toast(head, sub);
    S.say(head + ". " + sub);
    renderPanel();
    if (done) {
      set(KEY_CARDS, "open");
      later(openDone, motionOK() ? 1350 : 150);
    }
  }

  function fly(it, done) {
    var target = S.huntBtn && S.huntBtn.querySelector(".arx-mini");
    var gem = it.node.querySelector(".arx-gem");
    if (!motionOK() || !target || !gem || !gem.animate) { done(); return; }
    var a = gem.getBoundingClientRect(), b = target.getBoundingClientRect();
    var ghost = make("div", "arx-fly", { "aria-hidden": "true" }, GEM);
    ghost.style.left = a.left + "px";
    ghost.style.top = a.top + "px";
    ghost.style.width = a.width + "px";
    ghost.style.height = a.height + "px";
    S.layer.appendChild(ghost);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2);
    var dy = b.top + b.height / 2 - (a.top + a.height / 2);
    var anim = ghost.animate([
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
      { transform: "translate(" + (dx * 0.3).toFixed(1) + "px," + (dy * 0.3 - 110).toFixed(1) + "px) scale(1.1) rotate(-14deg)", opacity: 1, offset: 0.38 },
      { transform: "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(.3) rotate(10deg)", opacity: 0.85 }
    ], { duration: 860, easing: "cubic-bezier(.55,0,.25,1)", fill: "forwards" });
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      done();
    };
    anim.onfinish = finish;
    later(finish, 1200);  // in case the animation is interrupted
  }

  function toast(head, sub) {
    if (!S || !S.toast) return;
    S.toast.querySelector(".arx-toast-t").textContent = head;
    S.toast.querySelector(".arx-toast-s").textContent = sub || "";
    S.toast.classList.remove("is-in");
    void S.toast.offsetWidth;
    S.toast.classList.add("is-in");
    clearTimeout(S.toastTimer);
    S.toastTimer = later(function () { if (S) S.toast.classList.remove("is-in"); }, 4600);
  }

  function openDone() {
    if (!S || S.dialog) return;
    var d = make("dialog", "arx-dialog", { "aria-labelledby": "arx-done-t", "aria-describedby": "arx-done-p" });
    var gems = "";
    for (var i = 0; i < 6; i++) gems += '<span class="arx-dg" style="--i:' + i + '">' + GEM + "</span>";
    d.innerHTML =
      '<div class="arx-dart" aria-hidden="true">' + gems + "</div>" +
      '<p class="arx-k">Hunt complete</p>' +
      '<h2 class="arx-dt" id="arx-done-t">You found all six crystals.</h2>' +
      '<p class="arx-dp" id="arx-done-p">You’ve seen every page the menu hides. The holo edition of my research cards is unsealed: thirteen papers, one collection, each one yours to flip and keep.</p>' +
      '<div class="arx-dacts"><a class="arx-dbtn arx-dbtn--solid" href="' + esc(site("cards.html")) + '">Open my holo cards <span aria-hidden="true">→</span></a>' +
      '<button type="button" class="arx-dbtn arx-dclose">Keep exploring</button></div>';
    doc.body.appendChild(d);
    S.dialog = d;
    var opener = doc.activeElement;
    var close = function () {
      if (!S || S.dialog !== d) { if (d.parentNode) d.parentNode.removeChild(d); return; }
      S.dialog = null;
      try { if (d.open && d.close) d.close(); } catch (e) {}
      if (d.parentNode) d.parentNode.removeChild(d);
      if (opener && opener.focus && opener.isConnected) opener.focus();
    };
    d.querySelector(".arx-dclose").addEventListener("click", close);
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
    var cta = d.querySelector(".arx-dbtn--solid");
    if (cta) cta.focus();
  }

  /* ----------------------------------------------------------------- pins */

  function closeCompact(except) {
    S.items.forEach(function (it) {
      if (it.kind === "pin" && it !== except && it.compact && it.isOpen) it.userOpen = false;
    });
    queue();
  }

  function setOpen(it, open) {
    it.isOpen = open;
    it.node.classList.toggle("is-open", open);
    it.btn.setAttribute("aria-expanded", open ? "true" : "false");
    it.side = null;
    it.cx = it.cy = null;
  }

  function layoutPin(it, m) {
    var vw = S.vw;
    var compact = !!it.en.compact || vw < 900 || m.w < 340;
    if (compact !== it.compact) {
      it.compact = compact;
      it.userOpen = undefined;  // a new layout starts from the default
      it.node.classList.toggle("is-compact", compact);
    }
    var open = !!it.locked && (it.userOpen !== undefined ? it.userOpen : (!compact && it.en.open !== false));
    if (open !== it.isOpen) setOpen(it, open);

    var flip = !open && m.x + 26 + (it.lw || 0) > vw - 10;
    if (flip !== it.flip) { it.flip = flip; it.node.classList.toggle("is-flip", flip); }
    if (!open) return;

    var cw = it.cw || 248, ch = it.ch || 110, gap = compact ? 20 : 46;
    var side = compact ? "auto" : (it.en.side || "left");
    var vx = m.x, vy = m.y, cx, cy;
    var roomL = vx - gap - cw >= Math.max(10, m.l - 28);
    var roomR = vx + gap + cw <= Math.min(vw - 10, m.r + 28);
    if (side === "left" && !roomL) side = roomR ? "right" : "auto";
    else if (side === "right" && !roomR) side = roomL ? "left" : "auto";

    if (side === "left" || side === "right") {
      cx = side === "left" ? -gap - cw : gap;
      cy = -ch / 2;
      if (m.h >= ch + 16) cy = clamp(cy, m.t + 8 - vy, m.b - 8 - ch - vy);
    } else {
      var up = vy - m.t > m.h * 0.55;
      side = up ? "above" : "below";
      cx = clamp(-cw / 2, 10 - vx, vw - 10 - cw - vx);
      cy = up ? -gap - ch : gap;
    }
    cx = Math.round(cx);
    cy = Math.round(cy);
    if (cx === it.cx && cy === it.cy && side === it.side) return;
    if (side !== it.side) {
      it.node.classList.remove("is-left", "is-right", "is-above", "is-below");
      it.node.classList.add("is-" + side);
    }
    it.cx = cx;
    it.cy = cy;
    it.side = side;
    it.card.style.transform = "translate(" + cx + "px," + cy + "px)";
    var ln = it.line.style, len = (gap - 10) + "px";
    if (side === "left") { ln.transform = "translate(" + (cx + cw + 1) + "px,-1px)"; ln.width = len; ln.height = ""; }
    else if (side === "right") { ln.transform = "translate(9px,-1px)"; ln.width = len; ln.height = ""; }
    else if (side === "below") { ln.transform = "translate(-1px,9px)"; ln.height = len; ln.width = ""; }
    else { ln.transform = "translate(-1px," + (cy + ch + 1) + "px)"; ln.height = len; ln.width = ""; }
  }

  /* ----------------------------------------------------------------- sync */

  function measureSizes() {
    S.items.forEach(function (it) {
      if (it.kind !== "pin") return;
      it.cw = it.card.offsetWidth;
      it.ch = it.card.offsetHeight;
      if (!it.isOpen) {
        var l = it.btn.querySelector(".arx-lbl");
        it.lw = l ? l.offsetWidth : 0;
      }
      it.cx = it.cy = null;
    });
  }

  function place(it, m) {
    var node = it.node, x, y;
    if (!m.ok) {
      if (!it.hiddenNow) { it.hiddenNow = true; node.classList.add("is-off"); }
      return;
    }
    if (it.hiddenNow) { it.hiddenNow = false; node.classList.remove("is-off"); }
    if (it.kind === "photo") {
      x = Math.round(m.l - S.L);
      y = Math.round(m.t - S.T);
      var w = Math.round(m.w), h = Math.round(m.h);
      if (x !== it.x || y !== it.y) { it.x = x; it.y = y; node.style.transform = "translate(" + x + "px," + y + "px)"; }
      if (w !== it.w || h !== it.h) {
        it.w = w;
        it.h = h;
        node.style.width = w + "px";
        node.style.height = h + "px";
        node.classList.toggle("is-small", w < 300);
      }
      return;
    }
    x = Math.round(m.x - S.L);
    y = Math.round(m.y - S.T);
    if (x !== it.x || y !== it.y) { it.x = x; it.y = y; node.style.transform = "translate(" + x + "px," + y + "px)"; }
    if (it.kind === "pin") layoutPin(it, m);
  }

  function sync() {
    if (!S) return;
    var lr = S.layer.getBoundingClientRect();
    S.L = lr.left;
    S.T = lr.top;
    S.vw = root.clientWidth || win.innerWidth;
    if (!S.sized) { measureSizes(); S.sized = true; }
    var ms = [], i;
    for (i = 0; i < S.items.length; i++) ms.push(measure(S.items[i]));   // all reads first…
    for (i = 0; i < S.items.length; i++) place(S.items[i], ms[i]);      // …then all writes
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

  function lock(it, delay) {
    if (it.locked) return;
    it.locked = true;
    var go = function () {
      if (!S) return;
      it.node.classList.add("is-locked");
      if (it.kind === "pin") queue();
    };
    if (delay > 0 && motionOK()) later(go, delay); else go();
  }

  function observe() {
    if (!("IntersectionObserver" in win)) {
      S.items.forEach(function (it) { lock(it, 0); });
      return;
    }
    S.io = new IntersectionObserver(function (entries) {
      var any = false;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        (S.byEl.get(e.target) || []).forEach(function (it, i) { lock(it, 110 * i); });
        S.io.unobserve(e.target);
        any = true;
      });
      if (any) burst(1100);
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.15 });
    S.byEl.forEach(function (list, el) {
      if (list.some(function (it) { return !it.locked; })) S.io.observe(el);
    });
  }

  function boot(restore) {
    var vh = win.innerHeight, motion = motionOK(), seen = [];
    sync();
    S.items.forEach(function (it) {
      var m = measure(it);
      if (!m.ok) return;
      var top = it.kind === "photo" ? m.t : m.y, bottom = it.kind === "photo" ? m.b : m.y;
      if (top < vh && bottom > 0) seen.push({ it: it, top: Math.max(0, top) });
    });
    seen.sort(function (a, b) { return a.top - b.top; });
    if (!restore && motion) {
      // The scan line sweeps down; each anchor locks as the line passes it.
      S.layer.classList.add("is-booting");
      later(function () { if (S) S.layer.classList.remove("is-booting"); }, 1500);
      seen.forEach(function (o) { lock(o.it, 160 + o.top / vh * 900 + (o.it.kind === "photo" ? 0 : 220)); });
      setCount("Scanning");
      later(function () { setCount(); }, 1050);
    } else {
      seen.forEach(function (o, i) { lock(o.it, motion ? 40 + i * 45 : 0); });
      setCount();
    }
    observe();
    burst(1800);
  }

  /* ---------------------------------------------------------- start/stop */

  function start(opts) {
    if (S) stop();
    S = {
      opts: opts || {}, say: (opts && opts.say) || function () {},
      items: [], byEl: new Map(), off: [], timers: [], mem: [],
      until: 0, uid: 0, count: 0, lastInput: "pointer",
      site: String((opts && opts.base) || "").replace(/assets\/?$/, "")
    };
    try {
      build(!!S.opts.restore);
    } catch (err) {
      stop();
      throw err;
    }
  }

  function build(restore) {
    var entries = ((notes().pages || {})[pageKey()] || []).slice();
    var layer = make("section", "arx-layer", { id: "arx-layer", "aria-label": "AR Mode" });
    layer.innerHTML = DEFS;
    S.layer = layer;
    if (!restore && motionOK()) {
      layer.appendChild(make("div", "arx-fx", { "aria-hidden": "true" }, '<i class="arx-grid"></i><i class="arx-scan"></i>'));
    }

    // Right after the nav (and its mobile drawer): Tab goes glasses → AR layer → page.
    var nav = doc.querySelector(".nav"), after = nav;
    if (nav && nav.nextElementSibling && nav.nextElementSibling.classList.contains("mobile-menu")) after = nav.nextElementSibling;
    if (after && after.parentNode) after.parentNode.insertBefore(layer, after.nextSibling);
    else doc.body.appendChild(layer);

    buildHud(layer);

    // Photos, in page order, with any custom chip from the notes.
    var chips = new Map();
    entries.forEach(function (en) { if (en.chip) { var t = pick(en.at); if (t) chips.set(t, en.chip); } });
    var photos = collectPhotos();
    chips.forEach(function (chip, t) { if (t.tagName === "IMG" && photos.indexOf(t) < 0) photos.push(t); });
    photos.sort(byDocOrder);
    var built = [];
    photos.forEach(function (im, i) { built.push(buildPhoto(im, i + 1, chips.get(im))); });

    entries.forEach(function (en) {
      if (en.chip) return;
      var it = entryItem(en);
      if (it) built.push(it);
    });

    // Layer order = reading order, so keyboard and screen-reader users meet
    // pins and crystals in the same order as the page.
    built.sort(function (a, b) {
      var d = byDocOrder(a.el, b.el);
      if (d) return d;
      var ka = a.kind === "photo" ? -1 : num(a.v, 0), kb = b.kind === "photo" ? -1 : num(b.v, 0);
      return ka - kb;
    });
    // DOM order: HUD first (first thing Tab reaches after the glasses), then
    // pins and crystals in reading order. CSS z-index keeps the HUD on top.
    var frag = doc.createDocumentFragment();
    built.forEach(function (it) { register(it); frag.appendChild(it.node); });
    layer.appendChild(frag);

    S.count = built.filter(function (it) { return it.kind !== "crystal"; }).length;

    listen(win, "scroll", function () { burst(280); }, { passive: true });
    listen(win, "resize", function () { if (S) { S.sized = false; burst(500); } });
    // The homepage hero drifts toward the cursor; follow it while that happens.
    listen(doc, "pointermove", function (e) {
      if (e.target && e.target.closest && e.target.closest(".hero")) burst(1200);
    }, { passive: true });
    listen(doc, "pointerdown", function () { if (S) S.lastInput = "pointer"; }, true);
    listen(doc, "keydown", function (e) {
      if (!S) return;
      S.lastInput = "key";
      if (e.key !== "Escape") return;
      if (S.panelOpen) { togglePanel(false); S.huntBtn.focus(); return; }
      var open = S.items.filter(function (it) { return it.kind === "pin" && it.compact && it.isOpen; });
      if (open.length) {
        open.forEach(function (it) { it.userOpen = false; });
        queue();
        open[0].btn.focus();
      }
    });
    listen(doc, "click", function (e) {
      if (!S) return;
      var t = e.target;
      if (S.panelOpen && !(t.closest && t.closest(".arx-panel, .arx-hunt"))) togglePanel(false);
      if (!(t.closest && t.closest(".arx-pin"))) closeCompact(null);
    });
    if (doc.readyState !== "complete") listen(win, "load", function () { burst(900); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { if (S) { S.sized = false; queue(); } });
    if ("ResizeObserver" in win) {
      S.ro = new ResizeObserver(function () { burst(320); });
      S.ro.observe(doc.body);
    }
    S.tick = setInterval(queue, 800);  // late layout changes: accordions, lazy images, fonts

    boot(restore);
  }

  function stop() {
    if (!S) return;
    var s = S;
    S = null;
    var focusInside = s.layer && s.layer.contains(doc.activeElement);
    s.off.forEach(function (f) { try { f(); } catch (e) {} });
    s.timers.forEach(function (t) { clearTimeout(t); });
    clearInterval(s.tick);
    clearInterval(s.clockTimer);
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

  win.ARXEngine = { start: start, stop: stop };
})();

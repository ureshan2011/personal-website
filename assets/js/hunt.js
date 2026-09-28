/* ==========================================================================
   Cache hunt — loader (runs on every page; the hunt itself loads on demand)

   A game in the spirit of geocaching: eight caches are hidden around the
   site, each beside something worth seeing. A compass button in the nav
   turns the hunt on; hunt-engine.js, hunt-caches.js and hunt.css are only
   fetched then. The choice is remembered, so the hunt stays on as you move
   between pages, until you turn it off.

   The current site must look and work exactly as before when:
     · the browser lacks anything the hunt needs   → no button, no changes
     · the hunt fails to load                      → quietly switched off
     · ?hunt=off is in the URL, or window.CACHE_HUNT = false → switched off
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var VERSION = "1";
  var KEY = "hunt";            // "on" | "off"
  var KEY_HINT = "hunt-hint";  // first-visit hint shown once

  var canStore = (function () {
    try { localStorage.setItem("hunt-t", "1"); localStorage.removeItem("hunt-t"); return true; } catch (e) { return false; }
  })();
  function get(k) { if (!canStore) return null; try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { if (!canStore) return; try { localStorage.setItem(k, v); } catch (e) {} }
  function clearClasses() { root.classList.remove("hunt-on", "hunt-loading", "hunt-exit"); }

  /* ---- Can this browser run it? If not, leave the page exactly as it is. */
  var supported = false;
  try {
    supported = !!(root.classList && doc.querySelector && window.requestAnimationFrame &&
      window.Promise && window.JSON && Element.prototype.closest &&
      window.CSS && CSS.supports && CSS.supports("--hunt", "0"));
  } catch (e) { supported = false; }

  var q = location.search || "";
  var forcedOff = /[?&]hunt=off\b/.test(q) || window.CACHE_HUNT === false;
  var forcedOn = /[?&]hunt=on\b/.test(q);
  var navInner = doc.querySelector(".nav .nav-inner");

  if (!supported || !navInner || forcedOff) {
    clearClasses();
    if (forcedOff) set(KEY, "off");
    return;
  }

  /* ---- Where the other files live, relative to this script. */
  var me = doc.currentScript || doc.querySelector('script[src*="hunt.js"]');
  var base = ((me && me.src) || "").replace(/js\/hunt\.js.*$/, "");  // …/assets/
  if (!base) return;

  /* ---- Screen-reader announcements (one polite live region). */
  var sayEl = doc.createElement("div");
  sayEl.className = "vh";
  sayEl.setAttribute("role", "status");
  sayEl.setAttribute("aria-live", "polite");
  doc.body.appendChild(sayEl);
  var sayTimer = 0;
  function say(text) {
    sayEl.textContent = "";
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () { sayEl.textContent = text; }, 80);
  }

  /* ---- The compass button. */
  var ICON =
    '<svg class="hunt-ico" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
      '<circle class="hunt-ring" cx="12" cy="12" r="9"/>' +
      '<g class="hunt-needle"><path class="hunt-n" d="M12 5.2 14.7 12H9.3z"/><path class="hunt-s" d="M12 18.8 9.3 12h5.4z"/></g>' +
    "</svg>";

  function makeToggle(variant) {
    var b = doc.createElement("button");
    b.type = "button";
    b.className = "hunt-toggle hunt-toggle--" + variant;
    b.setAttribute("aria-pressed", "false");
    if (variant === "menu") {
      b.innerHTML = ICON + '<span class="hunt-menu-t">Cache hunt</span><span class="hunt-menu-s" aria-hidden="true"></span>';
    } else {
      b.setAttribute("aria-label", "Cache hunt");
      b.innerHTML = ICON + '<span class="hunt-tip" aria-hidden="true">Cache hunt</span>';
    }
    b.addEventListener("click", function () { hideHint(); if (on) stop(); else start(false); });
    return b;
  }

  // None of the buttons may change the nav's existing layout:
  //   desktop  — absolutely positioned in the nav's own right padding
  //   phones   — absolutely positioned just left of the menu button
  //   < 350px  — no room beside the logo, so it becomes the menu's last row
  var toggles = [makeToggle("desk"), makeToggle("mob")];
  var burger = navInner.querySelector(".nav-toggle");
  var drawer = doc.querySelector(".mobile-menu");
  navInner.classList.add("hunt-nav");
  navInner.appendChild(toggles[0]);
  navInner.insertBefore(toggles[1], burger && burger.parentNode === navInner ? burger : null);
  if (drawer) { toggles.push(makeToggle("menu")); drawer.appendChild(toggles[2]); }

  function visibleToggle() {
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].offsetWidth > 0 && !toggles[i].closest(".mobile-menu")) return toggles[i];
    }
    return null;
  }
  function setPressed(v) {
    toggles.forEach(function (b) { b.setAttribute("aria-pressed", v ? "true" : "false"); });
  }

  /* ---- Load the hunt once, with a timeout. */
  var loading = null;
  function load() {
    if (window.HuntEngine) return Promise.resolve(window.HuntEngine);
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var files = ["js/hunt-engine.js"];
      if (!window.HUNT_CACHES) files.unshift("js/hunt-caches.js");
      var pending = files.length + 1, failed = false;
      var timer = setTimeout(fail, 12000);
      function done() {
        if (failed || --pending > 0) return;
        clearTimeout(timer);
        if (window.HuntEngine && window.HUNT_CACHES) resolve(window.HuntEngine); else fail();
      }
      function fail() {
        if (failed) return;
        failed = true;
        clearTimeout(timer);
        loading = null;
        reject(new Error("the cache hunt failed to load"));
      }
      var css = doc.createElement("link");
      css.rel = "stylesheet";
      css.href = base + "css/hunt.css?v=" + VERSION;
      css.onload = done;
      css.onerror = fail;
      doc.head.appendChild(css);
      files.forEach(function (path) {
        var s = doc.createElement("script");
        s.src = base + path + "?v=" + VERSION;
        s.async = false;  // keep order: the caches first, then the engine
        s.onload = done;
        s.onerror = fail;
        doc.head.appendChild(s);
      });
    });
    return loading;
  }

  /* ---- On / off. */
  var on = false;
  var exitTimer = 0;

  function start(restore) {
    if (on) return;
    on = true;
    clearTimeout(exitTimer);
    root.classList.remove("hunt-exit");
    root.classList.add("hunt-on", "hunt-loading");
    setPressed(true);
    set(KEY, "on");
    load().then(function (engine) {
      root.classList.remove("hunt-loading");
      if (!on) return;  // switched off again while loading
      try {
        engine.start({ restore: !!restore, base: base, say: say, exit: stop, toggles: toggles });
      } catch (err) {
        fail(err);
      }
    }, fail);
  }

  function stop() {
    if (!on) return;
    on = false;
    setPressed(false);
    set(KEY, "off");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("hunt-exit");
    clearTimeout(exitTimer);
    exitTimer = setTimeout(function () {
      if (window.HuntEngine) { try { window.HuntEngine.stop(); } catch (e) {} }
      clearClasses();
    }, reduced ? 0 : 220);
    say("Cache hunt off. Your finds are saved.");
  }

  function fail(err) {
    if (window.console && console.warn) console.warn("[Cache hunt] switched off:", err && err.message ? err.message : err);
    on = false;
    setPressed(false);
    set(KEY, "off");
    if (window.HuntEngine) { try { window.HuntEngine.stop(); } catch (e) {} }
    clearClasses();
    say("The cache hunt isn't available right now. The site works as normal.");
  }

  /* ---- Back/forward cache: a restored page may be out of date. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    var want = get(KEY) === "on";
    if (want && !on) start(true);
    else if (!want && on) {
      on = false;
      setPressed(false);
      if (window.HuntEngine) { try { window.HuntEngine.stop(); } catch (x) {} }
      clearClasses();
    }
  });

  /* ---- First visit: one quiet hint pointing at the compass. */
  var hintEl = null, hintTimer = 0;
  function hideHint() {
    clearTimeout(hintTimer);
    if (!hintEl) return;
    var el = hintEl;
    hintEl = null;
    el.classList.remove("is-in");
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    window.removeEventListener("resize", placeHint);
  }
  function placeHint() {
    var b = visibleToggle();
    if (!hintEl || !b) return hideHint();
    var r = b.getBoundingClientRect();
    var right = Math.max(10, window.innerWidth - r.right - 8);
    hintEl.style.top = Math.round(r.bottom + 12) + "px";
    hintEl.style.right = Math.round(right) + "px";
    hintEl.style.setProperty("--ax", Math.round(window.innerWidth - right - (r.left + r.width / 2)) + "px");
  }
  function showHint() {
    if (!canStore || get(KEY_HINT) || on || !visibleToggle()) return;
    if (doc.querySelector(".mobile-menu.open")) return;
    set(KEY_HINT, "1");
    hintEl = doc.createElement("div");
    hintEl.className = "hunt-hint";
    hintEl.innerHTML =
      '<button type="button" class="hunt-hint-go">Eight caches are hidden on this site. Go hunting?</button>' +
      '<button type="button" class="hunt-hint-x" aria-label="Dismiss">&times;</button>';
    doc.body.appendChild(hintEl);
    placeHint();
    hintEl.querySelector(".hunt-hint-go").addEventListener("click", function () { hideHint(); start(false); });
    hintEl.querySelector(".hunt-hint-x").addEventListener("click", hideHint);
    window.addEventListener("resize", placeHint);
    requestAnimationFrame(function () { if (hintEl) hintEl.classList.add("is-in"); });
    hintTimer = setTimeout(hideHint, 9000);
  }

  /* ---- Go. */
  if (forcedOn) {
    start(false);
    if (window.history && history.replaceState) {
      var clean = q.replace(/([?&])hunt=on\b&?/, "$1").replace(/[?&]$/, "");
      try { history.replaceState(history.state, "", location.pathname + clean + location.hash); } catch (e) {}
    }
  } else if (get(KEY) === "on") {
    start(true);
  } else {
    setTimeout(showHint, 2600);
  }
})();

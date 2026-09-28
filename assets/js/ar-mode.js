/* ==========================================================================
   AR Mode — loader (runs on every page; the engine itself loads on demand)

   Puts a pair of glasses in the nav. Tapping them (or pressing G) "puts the
   glasses on": ar-engine.js, ar-notes.js and ar-mode.css are fetched the
   first time, and the page turns into an AR view. The choice is remembered,
   so the glasses stay on as you move between pages.

   Safety first — the site must look and work exactly as before when:
     · the browser lacks anything the engine needs  → no button, no changes
     · the engine or its styles fail to load        → quietly switched off
     · ?ar=off is in the URL, or window.AR_MODE = false → switched off
   Nothing here runs until someone asks for it, except adding two buttons.

   The inline snippet in each page's <head> adds html.arx-on before the first
   paint when AR Mode was left on, so the HUD frame (redesign.css) is already
   there when a new page appears — which is what makes it carry across pages.
   ========================================================================== */
(function () {
  "use strict";

  // Tells the <head> snippet the loader ran; if it never does (blocked or
  // failed download), the snippet removes the frame on window load.
  window.ARXL = 1;

  var doc = document;
  var root = doc.documentElement;
  var VERSION = "1";
  var KEY = "arx";            // "on" | "off"
  var KEY_HINT = "arx-hint";  // first-visit hint shown once
  var KEY_KEYS = "arx-keys";  // "off" disables the G shortcut

  var canStore = (function () {
    try { localStorage.setItem("arx-t", "1"); localStorage.removeItem("arx-t"); return true; } catch (e) { return false; }
  })();
  function get(k) { if (!canStore) return null; try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { if (!canStore) return; try { localStorage.setItem(k, v); } catch (e) {} }

  function clearClasses() { root.classList.remove("arx-on", "arx-restore", "arx-loading", "arx-exit"); }

  /* ---- Can this browser run it? If not, leave the page exactly as it is. */
  var supported = false;
  try {
    supported = !!(root.classList && doc.querySelector && window.requestAnimationFrame &&
      window.Promise && window.JSON && Element.prototype.closest &&
      window.CSS && CSS.supports && CSS.supports("--arx", "0"));
  } catch (e) { supported = false; }

  var q = location.search || "";
  var forcedOff = /[?&]ar=off\b/.test(q) || window.AR_MODE === false;
  var forcedOn = /[?&]ar=on\b/.test(q);
  var navInner = doc.querySelector(".nav .nav-inner");

  if (!supported || !navInner || forcedOff) {
    clearClasses();
    if (forcedOff) set(KEY, "off");
    return;
  }

  /* ---- Where the other files live, relative to this script. */
  var me = doc.currentScript || doc.querySelector('script[src*="ar-mode.js"]');
  var base = ((me && me.src) || "").replace(/js\/ar-mode\.js.*$/, "");  // …/assets/
  if (!base) { clearClasses(); return; }

  /* ---- Screen-reader announcements (one polite live region). */
  var sayEl = doc.createElement("div");
  sayEl.className = "arx-vh";
  sayEl.setAttribute("role", "status");
  sayEl.setAttribute("aria-live", "polite");
  doc.body.appendChild(sayEl);
  var sayTimer = 0;
  function say(text) {
    sayEl.textContent = "";
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () { sayEl.textContent = text; }, 80);
  }

  /* ---- The glasses. One in the desktop link row, one beside the menu
         button on smaller screens; CSS shows whichever fits. */
  var ICON =
    '<svg class="arx-ico" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
      '<rect class="arx-lens" x="2.25" y="9" width="8.5" height="6.75" rx="2.6"/>' +
      '<rect class="arx-lens" x="13.25" y="9" width="8.5" height="6.75" rx="2.6"/>' +
      '<path class="arx-bridge" d="M10.75 11.4q1.25-1.1 2.5 0"/>' +
      '<path class="arx-spark" d="M18.6 2.6l.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55z"/>' +
    "</svg>";

  function makeToggle(variant) {
    var b = doc.createElement("button");
    b.type = "button";
    b.className = "arx-toggle arx-toggle--" + variant;
    b.setAttribute("aria-pressed", "false");
    if (variant === "menu") {
      b.innerHTML = ICON + '<span class="arx-menu-t">AR Mode</span><span class="arx-menu-s" aria-hidden="true"></span>';
    } else {
      b.setAttribute("aria-label", "AR Mode");
      b.innerHTML = ICON + '<span class="arx-tip" aria-hidden="true">AR Mode <kbd>G</kbd></span>';
    }
    b.addEventListener("click", function () { hideHint(); if (on) stop(); else start(false); });
    return b;
  }

  // None of the buttons may change the nav's existing layout:
  //   desktop  — absolutely positioned in the nav's own right padding
  //   phones   — absolutely positioned just left of the menu button
  //   < 350px  — no room beside the logo, so it becomes the last row of the
  //              menu drawer instead
  var toggles = [makeToggle("desk"), makeToggle("mob")];
  var burger = navInner.querySelector(".nav-toggle");
  var drawer = doc.querySelector(".mobile-menu");
  navInner.classList.add("arx-nav");
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

  /* ---- Load the engine once, with a timeout. */
  var loading = null;
  function load() {
    if (window.ARXEngine) return Promise.resolve(window.ARXEngine);
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var pending = 3, failed = false;
      var timer = setTimeout(fail, 12000);
      function done() {
        if (failed || --pending > 0) return;
        clearTimeout(timer);
        if (window.ARXEngine) resolve(window.ARXEngine); else fail();
      }
      function fail() {
        if (failed) return;
        failed = true;
        clearTimeout(timer);
        loading = null;
        reject(new Error("AR Mode failed to load"));
      }
      var css = doc.createElement("link");
      css.rel = "stylesheet";
      css.href = base + "css/ar-mode.css?v=" + VERSION;
      css.onload = done;
      css.onerror = fail;
      doc.head.appendChild(css);
      ["js/ar-notes.js", "js/ar-engine.js"].forEach(function (path) {
        var s = doc.createElement("script");
        s.src = base + path + "?v=" + VERSION;
        s.async = false;  // keep order: content first, then the engine
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
    root.classList.remove("arx-exit");
    setPressed(true);
    root.classList.add("arx-on", "arx-loading");
    root.classList.toggle("arx-restore", !!restore);
    set(KEY, "on");
    load().then(function (engine) {
      root.classList.remove("arx-loading");
      if (!on) return;  // switched off again while loading
      try {
        engine.start({ restore: !!restore, base: base, say: say, exit: stop, toggles: toggles });
        if (!restore) say("AR Mode on. Press G or the glasses button to take them off.");
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
    root.classList.add("arx-exit");
    clearTimeout(exitTimer);
    exitTimer = setTimeout(function () {
      if (window.ARXEngine) { try { window.ARXEngine.stop(); } catch (e) {} }
      clearClasses();
    }, reduced ? 0 : 260);
    say("AR Mode off.");
  }

  function fail(err) {
    if (window.console && console.warn) console.warn("[AR Mode] switched off:", err && err.message ? err.message : err);
    on = false;
    setPressed(false);
    set(KEY, "off");
    if (window.ARXEngine) { try { window.ARXEngine.stop(); } catch (e) {} }
    clearClasses();
    say("AR Mode isn't available on this device right now. The site works as normal.");
  }

  /* ---- Keyboard: G toggles. It can be switched off in the crystal-hunt panel
         (WCAG 2.1.4), and never fires while typing or with a modifier held. */
  doc.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    if (e.key !== "g" && e.key !== "G") return;
    if (get(KEY_KEYS) === "off") return;
    var t = e.target;
    var tag = t && t.tagName;
    if (t && (t.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) return;
    if (doc.querySelector(".mobile-menu.open")) return;
    e.preventDefault();
    hideHint();
    if (on) stop(); else start(false);
  });

  /* ---- Back/forward cache: a restored page may be out of date. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    var want = get(KEY) === "on";
    if (want && !on) start(true);
    else if (!want && on) { on = false; setPressed(false); if (window.ARXEngine) { try { window.ARXEngine.stop(); } catch (x) {} } clearClasses(); }
  });

  /* ---- First visit: one quiet hint pointing at the glasses. */
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
    hintEl.className = "arx-hint";
    hintEl.innerHTML =
      '<button type="button" class="arx-hint-go"><span class="arx-hint-k">New</span>See this site through AR glasses</button>' +
      '<button type="button" class="arx-hint-x" aria-label="Dismiss">&times;</button>';
    doc.body.appendChild(hintEl);
    placeHint();
    hintEl.querySelector(".arx-hint-go").addEventListener("click", function () { hideHint(); start(false); });
    hintEl.querySelector(".arx-hint-x").addEventListener("click", hideHint);
    window.addEventListener("resize", placeHint);
    requestAnimationFrame(function () { if (hintEl) hintEl.classList.add("is-in"); });
    hintTimer = setTimeout(hideHint, 9000);
  }

  /* ---- Go. */
  if (forcedOn) {
    start(false);
    if (window.history && history.replaceState) {
      var clean = q.replace(/([?&])ar=on\b&?/, "$1").replace(/[?&]$/, "");
      try { history.replaceState(history.state, "", location.pathname + clean + location.hash); } catch (e) {}
    }
  } else if (root.classList.contains("arx-on")) {
    start(true);
  } else {
    setTimeout(showHint, 2600);
  }
})();

/* Island header for the Cover Story home page.
   States: boot → intro → live → nav, then while scrolling: nav ⇄ read,
   and menu on demand. The pill's width and height are measured from the
   active panel so it morphs between sizes like a Dynamic Island.
   Without JS the nav panel is visible as a plain pill. */
(function () {
  "use strict";
  var isl = document.querySelector("[data-isl]");
  if (!isl) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = isl.querySelector(".isl-stage");
  var me = isl.querySelector(".isl-me");
  var panels = {};
  Array.prototype.forEach.call(isl.querySelectorAll("[data-panel]"), function (p) { panels[p.getAttribute("data-panel")] = p; });
  var openBtn = isl.querySelector("[data-isl-open]");
  var state = null, introDone = false, timers = [];

  // drop the "next on stage" panel once its date has passed
  var live = panels.live, liveOk = false;
  if (live) {
    var until = live.getAttribute("data-isl-until");
    liveOk = !until || new Date() <= new Date(until + "T23:59:59");
  }

  var PAD = 6, GAP = 10;
  function sizeFor(name) {
    var p = panels[name];
    if (name === "boot") return { w: 132, h: 38 };
    if (name === "menu") {
      var w = Math.min(window.innerWidth - 24, 680);
      p.style.width = (w - PAD * 2 - 8) + "px";
      return { w: w, h: Math.min(window.innerHeight - 40, p.scrollHeight + PAD * 2 + 6) };
    }
    p.style.width = "auto";
    var meW = name === "read" ? 36 : 44;
    var w2 = PAD + meW + GAP + p.scrollWidth + PAD + 6;
    return { w: Math.min(window.innerWidth - 24, Math.ceil(w2)), h: 56 };
  }

  function set(name, instant) {
    if (name === state) return;
    state = name;
    if (instant) isl.classList.add("isl-noanim");
    isl.setAttribute("data-state", name);
    Object.keys(panels).forEach(function (k) {
      var on = k === name, p = panels[k];
      p.classList.toggle("is-on", on);
      p.setAttribute("aria-hidden", on ? "false" : "true");
      Array.prototype.forEach.call(p.querySelectorAll("a,button"), function (el) { el.tabIndex = on ? 0 : -1; });
      if (p.matches("a,button")) p.tabIndex = on ? 0 : -1;
    });
    var s = sizeFor(name);
    isl.style.width = s.w + "px";
    isl.style.height = s.h + "px";
    if (openBtn) openBtn.setAttribute("aria-expanded", name === "menu" ? "true" : "false");
    if (instant) { void isl.offsetWidth; isl.classList.remove("isl-noanim"); }
    fitRing();
  }

  // ---- intro sequence ----
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    timers.forEach(clearTimeout);
    set(window.scrollY > heroBottom() ? "read" : "nav");
  }
  if (reduced) { introDone = true; set("nav", true); }
  else {
    set("boot", true);
    timers.push(setTimeout(function () { set("intro"); }, 450));
    timers.push(setTimeout(function () { if (liveOk) set("live"); }, 2700));
    timers.push(setTimeout(finishIntro, liveOk ? 5200 : 3000));
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach(function (ev) {
      window.addEventListener(ev, function once() { window.removeEventListener(ev, once); setTimeout(finishIntro, 120); }, { passive: true });
    });
    isl.addEventListener("pointerenter", finishIntro);
  }

  // ---- menu ----
  if (openBtn) openBtn.addEventListener("click", function () { finishIntro(); set("menu"); var c = isl.querySelector("[data-isl-close]"); if (c) setTimeout(function () { c.focus(); }, 300); });
  var closeBtn = isl.querySelector("[data-isl-close]");
  function closeMenu() { set(window.scrollY > heroBottom() ? "read" : "nav"); if (openBtn && state === "nav") openBtn.focus(); }
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && state === "menu") closeMenu(); });
  document.addEventListener("pointerdown", function (e) { if (state === "menu" && !isl.contains(e.target)) closeMenu(); });
  Array.prototype.forEach.call(panels.menu ? panels.menu.querySelectorAll("a") : [], function (a) { a.addEventListener("click", function () { set("nav"); }); });

  // compact "now reading" pill opens back into the nav
  var expand = isl.querySelector("[data-isl-expand]");
  var hoverHold = false;
  if (expand) expand.addEventListener("click", function () { hoverHold = true; set("nav"); });
  isl.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && state === "read") { hoverHold = true; set("nav"); } });
  isl.addEventListener("pointerleave", function () { hoverHold = false; });
  isl.addEventListener("focusin", function () { if (state === "read") { hoverHold = true; set("nav"); } });

  // ---- sections → label ----
  var NAMES = { top: "The cover", "start-here": "In this issue", voices: "Student voices", about: "About", ventures: "Three brands",
    "blended-teaching": "Free lessons", "study-nz": "Study in New Zealand", platform: "The platform", work: "Selected work",
    book: "The book", "upcoming-events": "Upcoming talks", news: "In the news", travel: "Off the clock", testimonials: "Kind words", faq: "Questions" };
  var secs = Array.prototype.filter.call(document.querySelectorAll("body > header, body > section"), function (s) { return !s.hidden; }).map(function (s) {
    var h = s.querySelector("h2");
    var label = s.getAttribute("data-isl-label") || NAMES[s.id] || (h ? h.textContent.replace(/\s+/g, " ").trim() : "");
    if (label.length > 30) label = label.slice(0, 28).replace(/\s+\S*$/, "") + "…";
    return { el: s, label: label };
  }).filter(function (s) { return s.label; });
  var secLabel = isl.querySelector("[data-isl-section]"), pctEl = isl.querySelector("[data-isl-pct]");
  var hero = document.querySelector("[data-cv]");
  function heroBottom() { return hero ? hero.offsetHeight * 0.55 : 300; }

  // ---- progress ring ----
  var ring = isl.querySelector("[data-isl-ring]"), track = isl.querySelector("[data-isl-ring-track]"), fill = isl.querySelector("[data-isl-ring-fill]"), ringLen = 0, RP = 4;
  function fitRing() {
    if (!ring) return;
    var w = parseFloat(isl.style.width) || isl.offsetWidth, h = parseFloat(isl.style.height) || isl.offsetHeight;
    var rw = w + RP * 2 - 2.5, rh = h + RP * 2 - 2.5, r = rh / 2, o = 1.25;
    var d = "M" + (o + rw / 2) + " " + o + "H" + (o + rw - r) + "A" + r + " " + r + " 0 0 1 " + (o + rw - r) + " " + (o + rh) + "H" + (o + r) + "A" + r + " " + r + " 0 0 1 " + (o + r) + " " + o + "Z";
    ring.setAttribute("width", w + RP * 2); ring.setAttribute("height", h + RP * 2);
    ring.style.left = ring.style.top = -RP + "px";
    track.setAttribute("d", d); fill.setAttribute("d", d);
    ringLen = fill.getTotalLength(); fill.style.strokeDasharray = ringLen;
    paint();
  }
  // refit after each morph settles
  isl.addEventListener("transitionend", function (e) { if (e.target === isl && (e.propertyName === "width" || e.propertyName === "height")) fitRing(); });

  var lastY = window.scrollY, raf = null;
  function paint() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    if (fill) { fill.style.strokeDashoffset = ringLen * (1 - p); fill.style.opacity = p > 0.002 ? 1 : 0; }
    isl.setAttribute("data-scrolled", y > 40 ? "true" : "false");
    if (pctEl) pctEl.textContent = Math.round(p * 100) + "%";
  }
  function frame() {
    raf = null;
    var y = window.scrollY, dy = y - lastY; lastY = y;
    paint();
    // which section is under the island
    var probe = 90, cur = secs[0];
    for (var i = 0; i < secs.length; i++) { if (secs[i].el.getBoundingClientRect().top <= probe) cur = secs[i]; }
    if (cur && secLabel && secLabel.textContent !== cur.label) {
      secLabel.textContent = cur.label;
      if (state === "read") { var s = sizeFor("read"); isl.style.width = s.w + "px"; }
    }
    if (!introDone || state === "menu" || hoverHold) return;
    if (y < heroBottom()) set("nav");
    else if (dy > 4) set("read");          // scrolling down: get out of the way
    else if (dy < -10) set("nav");         // scrolling up: offer the nav
  }
  window.addEventListener("scroll", function () { if (raf === null) raf = requestAnimationFrame(frame); }, { passive: true });
  window.addEventListener("resize", function () { var s = state; state = null; set(s, true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { var s = state; state = null; set(s, true); });
  frame();
})();

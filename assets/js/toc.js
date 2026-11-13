/* "In this issue" — pins the section on wide screens and turns vertical
   scroll into a sideways run through four magazine pages. On phones the
   pages are a native swipe row; with reduced motion (or no JS) they stack. */
(function () {
  "use strict";
  var tc = document.querySelector("[data-tc]");
  if (!tc) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wide = window.matchMedia("(min-width: 901px)");
  var track = tc.querySelector("[data-tc-track]");
  var viewport = tc.querySelector(".tc-viewport");
  var pages = Array.prototype.slice.call(tc.querySelectorAll("[data-tc-page]"));
  var links = Array.prototype.slice.call(tc.querySelectorAll("[data-tc-go]"));
  var countEl = tc.querySelector("[data-tc-count]");
  var imgs = pages.map(function (p) { return p.querySelector("[data-tc-par]"); });
  var dist = 0, step = 1, offs = [], top = 0, active = -1, pinned = false;

  function setActive(i) {
    if (i === active) return;
    active = i;
    links.forEach(function (a, k) { a.setAttribute("aria-current", k === i ? "true" : "false"); });
    pages.forEach(function (p, k) { p.classList.toggle("is-active", k === i); });
    if (countEl) countEl.textContent = ("0" + (i + 1)).slice(-2);
    // keep the active chip in view on phones
    if (!pinned && links[i] && links[i].parentNode.parentNode.scrollTo) {
      var ul = links[i].parentNode.parentNode, li = links[i].parentNode;
      ul.scrollTo({ left: li.offsetLeft - 18, behavior: "smooth" });
    }
  }

  function measure() {
    pinned = wide.matches && !reduced;
    tc.classList.toggle("tc-on", pinned);
    document.documentElement.classList.toggle("tc-js", pinned);
    if (!pinned) {
      tc.style.height = "";
      track.style.transform = "";
      pages.forEach(function (p) { p.style.removeProperty("--a"); });
      imgs.forEach(function (im) { if (im) im.style.translate = ""; });
      return;
    }
    track.style.transform = "none";
    var o0 = pages[0].offsetLeft;
    offs = pages.map(function (p) { return p.offsetLeft - o0; });
    step = pages.length > 1 ? offs[1] - offs[0] : 1;
    dist = offs[offs.length - 1];
    var vh = window.innerHeight;
    tc.style.height = (vh + dist * 1.15 + vh * 0.15) + "px";
    top = tc.getBoundingClientRect().top + window.scrollY;
    frame();
  }

  function frame() {
    if (!pinned) return;
    var y = window.scrollY - top;
    var p = Math.min(1, Math.max(0, y / (dist * 1.15)));
    var pos = p * dist;
    track.style.transform = "translate3d(" + (-pos).toFixed(1) + "px,0,0)";
    var best = 0, bestA = -1;
    pages.forEach(function (pg, k) {
      var d = (offs[k] - pos) / step;
      var a = Math.max(0, 1 - Math.abs(d));
      pg.style.setProperty("--a", a.toFixed(3));
      if (imgs[k]) imgs[k].style.translate = (Math.max(-1, Math.min(1, d)) * -5.5).toFixed(2) + "% 0";
      var bar = links[k] && links[k].querySelector(".tc-ix-bar i");
      if (bar) bar.style.setProperty("--p", Math.max(0, Math.min(1, 1 - d)).toFixed(3));
      if (a > bestA) { bestA = a; best = k; }
    });
    setActive(best);
  }

  // phones: follow the swipe
  viewport.addEventListener("scroll", function () {
    if (pinned) return;
    var w = pages[0].offsetWidth + 12;
    setActive(Math.max(0, Math.min(pages.length - 1, Math.round(viewport.scrollLeft / w))));
  }, { passive: true });

  links.forEach(function (a, k) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (pinned) {
        var target = top + (offs[k] / dist) * dist * 1.15 + 2;
        if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.1 }); else window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      } else {
        viewport.scrollTo({ left: pages[k].offsetLeft - 18, behavior: reduced ? "auto" : "smooth" });
        if (reduced || !wide.matches) setActive(k);
      }
    });
  });

  var raf = null;
  window.addEventListener("scroll", function () { if (raf === null) raf = requestAnimationFrame(function () { raf = null; frame(); }); }, { passive: true });
  window.addEventListener("resize", measure);
  if (wide.addEventListener) wide.addEventListener("change", measure);
  window.addEventListener("load", measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();
  setActive(0);
})();

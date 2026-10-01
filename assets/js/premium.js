/* Shared site behaviour: nav, reveal animations, counters, scroll progress */
(function () {
  "use strict";

  // Sticky nav state
  var nav = document.querySelector(".nav");
  var progress = document.querySelector(".progress-bar");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // Reveal on scroll (staggered via --d set inline or by sibling index)
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Animated counters: <span class="count" data-target="228">228</span>
  // Markup carries the final value so the number is always correct even if the
  // animation never runs; the count-up from 0 is purely an enhancement.
  var counters = document.querySelectorAll(".count");
  if (counters.length) {
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-target") || "0");
      var dur = 1600;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      if (reduced) { el.textContent = target.toLocaleString(); return; }
      el.textContent = "0";
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = parseFloat(el.getAttribute("data-target") || "0").toLocaleString();
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  // Footer year
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Smooth scrolling (Lenis) + parallax ----
  var lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
    });
    window.__lenis = lenis; // page scripts (blended.js) scroll through it
    var rafLenis = function (time) { lenis.raf(time); requestAnimationFrame(rafLenis); };
    requestAnimationFrame(rafLenis);

    // Smooth in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id && id.length > 1) {
          var target = document.querySelector(id);
          if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -72 }); }
        }
      });
    });
  }

  // ---- Parallax (hero + any [data-parallax]) ----
  var pxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (!reduced && pxEls.length && "requestAnimationFrame" in window) {
    var items = pxEls.map(function (el) {
      return { el: el, speed: parseFloat(el.getAttribute("data-speed")) || 0.1 };
    });
    var mobileCleared = false;
    var tick = function () {
      var sy = window.scrollY;
      if (window.innerWidth <= 940) {
        if (!mobileCleared) { items.forEach(function (it) { it.el.style.transform = ""; }); mobileCleared = true; }
      } else {
        mobileCleared = false;
        // Offset is relative to scroll distance, so the resting (scroll=0) state
        // matches the CSS layout exactly. Only meaningful while the hero is on screen.
        var amt = Math.min(sy, window.innerHeight);
        for (var i = 0; i < items.length; i++) {
          items[i].el.style.transform = "translate3d(0," + (amt * items[i].speed).toFixed(1) + "px,0)";
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ---- Hero depth: gentle scroll + pointer parallax on [data-depth] ----
  // data-depth = scroll speed (negative drifts up faster than the page),
  // data-pointer = max px shift towards the cursor. Wide screens get both;
  // narrow screens keep only the portrait drifting inside its frame.
  var depthEls = Array.prototype.slice.call(document.querySelectorAll("[data-depth]"));
  var heroEl = document.querySelector(".hero");
  if (!reduced && depthEls.length && heroEl) {
    var layers = depthEls.map(function (el) {
      return {
        el: el,
        depth: parseFloat(el.getAttribute("data-depth")) || 0,
        pointer: parseFloat(el.getAttribute("data-pointer")) || 0,
        always: el.classList.contains("hero-portrait-layer")
      };
    });
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var tx = 0, ty = 0, cx = 0, cy = 0, queued = false;
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(renderDepth); } };
    var renderDepth = function () {
      queued = false;
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      var wide = window.innerWidth > 940;
      var sy = Math.min(window.scrollY, window.innerHeight * 1.2);
      for (var i = 0; i < layers.length; i++) {
        var l = layers[i];
        if (!wide && !l.always) { l.el.style.transform = ""; continue; }
        var x = wide ? cx * l.pointer : 0;
        var y = sy * l.depth + (wide ? cy * l.pointer : 0);
        l.el.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
      }
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) queue();
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    if (finePointer) {
      heroEl.addEventListener("pointermove", function (e) {
        var r = heroEl.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        queue();
      });
      heroEl.addEventListener("pointerleave", function () { tx = 0; ty = 0; queue(); });
    }
    queue();
  }

  // ---- Hero router: "What brings you here?" (WAI-ARIA tabs pattern) ----
  var heroTabs = Array.prototype.slice.call(document.querySelectorAll(".hero-tab"));
  if (heroTabs.length) {
    var selectTab = function (tab, focus) {
      heroTabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    heroTabs.forEach(function (t, i) {
      t.addEventListener("click", function () { selectTab(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = heroTabs[(i + 1) % heroTabs.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = heroTabs[(i - 1 + heroTabs.length) % heroTabs.length];
        else if (e.key === "Home") n = heroTabs[0];
        else if (e.key === "End") n = heroTabs[heroTabs.length - 1];
        if (n) { e.preventDefault(); selectTab(n, true); }
      });
    });
  }

  // ---- Next talk: the markup names the next event; once it has passed, move on ----
  // data-next-event holds [{ "end": "YYYY-MM-DD", "label": "...", "href": "..." }, ...]
  document.querySelectorAll("[data-next-event]").forEach(function (el) {
    var list;
    try { list = JSON.parse(el.getAttribute("data-next-event") || "[]"); } catch (e) { return; }
    // Local date, not UTC: in New Zealand toISOString() is still "yesterday"
    // until 1 PM, which kept a finished event on the badge half a day too long.
    var d = new Date(), p2 = function (n) { return (n < 10 ? "0" : "") + n; };
    var today = d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
    var next = list.filter(function (ev) { return ev.end >= today; })[0] ||
      { label: "Upcoming talks & events", href: "news.html#upcoming" };
    var label = el.querySelector("span");
    if (label) label.textContent = next.label;
    el.setAttribute("href", next.href);
  });
})();

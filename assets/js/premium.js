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
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
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

  // Animated counters: <span class="count" data-target="228">0</span>
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
      requestAnimationFrame(step);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
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
})();

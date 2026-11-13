/* Cover Story home page: load-in sequence, scroll parallax, partner marquee,
   section reveals. Uses only `translate`/`rotate` for scroll motion so it
   never fights the CSS `transform` used by the entrance animations.
   Respects prefers-reduced-motion: everything is shown, nothing moves. */
(function () {
  "use strict";
  var root = document.documentElement;
  var hero = document.querySelector("[data-cv]");
  if (!hero) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- split the masthead into letters for the staggered rise ----
  var word = hero.querySelector("[data-cv-letters]");
  if (word && !reduced) {
    var i = 0;
    var split = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split("").forEach(function (ch) {
            var s = document.createElement("span");
            s.className = "cv-l"; s.textContent = ch; s.style.setProperty("--i", i++);
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { split(n); }
      });
    };
    split(word);
  }

  if (reduced) { root.classList.remove("cv-js"); }

  // ---- load-in ----
  var start = function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("cv-in"); }); });
    // count-up on the big number
    var c = hero.querySelector("[data-cv-count]");
    if (c && !reduced) {
      var to = +c.getAttribute("data-cv-count"), t0 = null;
      c.textContent = "0";
      setTimeout(function () {
        var step = function (t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
          c.textContent = Math.round(to * e);
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, 750);
    }
  };
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);

  // ---- reveals ----
  var revs = document.querySelectorAll("[data-cv-reveal]");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("cv-seen"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    revs.forEach(function (el) { io.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add("cv-seen"); });
  }

  if (reduced) return;

  // ---- scroll-driven motion ----
  var mast = hero.querySelector("[data-cv-mast]");
  var face = hero.querySelector("[data-cv-face]");
  var sticker = hero.querySelector("[data-cv-sticker]");
  var depth = Array.prototype.slice.call(hero.querySelectorAll("[data-cv-depth]"));
  var slide = document.querySelector("[data-cv-slide]");
  var inners = Array.prototype.slice.call(document.querySelectorAll("[data-cv-inner]"));
  var marquee = document.querySelector("[data-cv-marquee]");
  var track = marquee && marquee.querySelector(".cv-logos-track");
  if (track) {
    var clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    Array.prototype.slice.call(clone.querySelectorAll("img")).forEach(function (im) { im.alt = ""; });
    marquee.appendChild(clone);
    var clone2 = clone.cloneNode(true); marquee.appendChild(clone2);
  }

  var lastY = window.scrollY, vel = 0, mx = 0, hover = false;
  if (marquee) {
    marquee.addEventListener("pointerenter", function () { hover = true; });
    marquee.addEventListener("pointerleave", function () { hover = false; });
  }
  var vh = window.innerHeight;
  window.addEventListener("resize", function () { vh = window.innerHeight; });

  var tick = function () {
    var y = window.scrollY;
    var dy = y - lastY; lastY = y;
    vel += (dy - vel) * 0.12;

    // hero parallax (only while the hero is on screen)
    var hh = hero.offsetHeight;
    if (y < hh + 50) {
      var p = Math.min(1, Math.max(0, y / hh));
      if (mast) { mast.style.translate = "0 " + (y * 0.38).toFixed(1) + "px"; mast.style.opacity = (1 - p * 0.9).toFixed(3); }
      if (face) { face.style.translate = "0 " + (y * -0.06).toFixed(1) + "px"; face.style.scale = (1 + p * 0.07).toFixed(4); }
      depth.forEach(function (el) {
        var d = +el.getAttribute("data-cv-depth");
        el.style.translate = "0 " + (-y * d).toFixed(1) + "px";
      });
      if (sticker) sticker.style.rotate = (p * 160).toFixed(2) + "deg";
    }

    // "In this issue" slides in from the right as it crosses the viewport
    if (slide) {
      var r = slide.getBoundingClientRect();
      if (r.bottom > -100 && r.top < vh + 100) {
        var k = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
        slide.style.translate = ((1 - k) * 18).toFixed(2) + "vw 0";
      }
    }

    // images drift inside their frames
    inners.forEach(function (im) {
      var b = im.parentNode.getBoundingClientRect();
      if (b.bottom < -50 || b.top > vh + 50) return;
      var off = (b.top + b.height / 2 - vh / 2) / vh;
      im.style.translate = "0 " + (off * -9).toFixed(2) + "%";
    });

    // partner marquee: drifts, speeds up and leans with scroll velocity
    if (track) {
      var w = track.offsetWidth;
      mx -= (hover ? 0.15 : 0.6) + Math.min(14, Math.abs(vel) * 0.5);
      if (mx <= -w) mx += w;
      marquee.style.transform = "translate3d(" + mx.toFixed(2) + "px,0,0) skewX(" + Math.max(-8, Math.min(8, -vel * 0.35)).toFixed(2) + "deg)";
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

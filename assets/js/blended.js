/* Blended Teaching Content — lessons.html
   Library filters (course, format, search), course links that jump to the
   library already filtered to that course, a pointer spotlight on cards and
   a gentle tilt on the hero windows. Everything works without it: with no
   script, every card is simply visible. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function scrollToY(y, instant) {
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: !!instant || reduced });
    else window.scrollTo({ top: y, behavior: instant || reduced ? "auto" : "smooth" });
  }

  // ---- Pointer spotlight on cards
  if (finePointer) {
    document.querySelectorAll(".bl-card, .bl-feature").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  // ---- Hero windows follow the pointer a little
  var stack = document.querySelector("[data-bl-tilt]");
  if (stack && finePointer && !reduced) {
    var hero = stack.closest(".bl-hero") || document.body;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty("--ry", (-12 + x * 10).toFixed(2) + "deg");
      stack.style.setProperty("--rx", (6 - y * 8).toFixed(2) + "deg");
    });
    hero.addEventListener("pointerleave", function () {
      stack.style.removeProperty("--ry");
      stack.style.removeProperty("--rx");
    });
  }

  // ---- The live Scrum studio
  // three.js is about a megabyte, so the bundle loads only when the studio is
  // getting close on a wide screen, or when someone taps play. Phones and
  // Save-Data connections always wait for the tap.
  var studio = document.querySelector("[data-scrum-studio]");
  if (studio) {
    var loadStudio = function () {
      if (studio.getAttribute("data-requested")) return;
      studio.setAttribute("data-requested", "true");
      studio.classList.add("is-loading");
      var s = document.createElement("script");
      s.src = studio.getAttribute("data-src");
      s.async = true;
      s.onerror = function () {
        studio.classList.add("is-failed");
        var msg = studio.querySelector(".bl-studio-loading");
        if (msg) msg.textContent = "The studio couldn't load. Try the lesson site instead.";
      };
      document.body.appendChild(s);
    };
    var btn = studio.querySelector("[data-studio-load]");
    if (btn) btn.addEventListener("click", loadStudio);
    var saveData = navigator.connection && navigator.connection.saveData;
    var wide = window.matchMedia("(min-width: 900px)").matches;
    if (wide && !saveData && "IntersectionObserver" in window) {
      var sio = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { sio.disconnect(); loadStudio(); }
      }, { rootMargin: "500px 0px" });
      sio.observe(studio);
    }
  }

  // ---- Library filters
  var lib = document.querySelector("[data-bl-library]");
  if (!lib) return;
  var cards = [].slice.call(lib.querySelectorAll(".bl-card"));
  var groups = [].slice.call(lib.querySelectorAll(".bl-group"));
  var pills = [].slice.call(lib.querySelectorAll(".bl-pill"));
  var chips = [].slice.call(lib.querySelectorAll(".bl-chip"));
  var input = lib.querySelector(".bl-search input");
  var statusEl = lib.querySelector(".bl-status");
  var empty = lib.querySelector(".bl-empty");
  var head = lib.querySelector(".bl-head");
  var state = { course: "all", kind: "all", q: "" };

  // The study pack sits under two courses; count it once.
  var keyOf = function (c) { return c.getAttribute("href") || c.getAttribute("data-search"); };
  var total = {};
  cards.forEach(function (c) { total[keyOf(c)] = 1; });
  var totalCount = Object.keys(total).length;

  function press(list, attr, value) {
    list.forEach(function (b) {
      var on = b.getAttribute(attr) === value;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function apply() {
    var terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = {};
    cards.forEach(function (c) {
      var hay = c.getAttribute("data-search");
      var ok = (state.course === "all" || c.getAttribute("data-course") === state.course) &&
               (state.kind === "all" || c.getAttribute("data-kind") === state.kind) &&
               terms.every(function (t) { return hay.indexOf(t) !== -1; });
      c.hidden = !ok;
      if (ok) shown[keyOf(c)] = 1;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector(".bl-card:not([hidden])"); });
    var n = Object.keys(shown).length;
    empty.hidden = n !== 0;
    var filtered = state.course !== "all" || state.kind !== "all" || terms.length;
    statusEl.textContent = filtered
      ? "Showing " + n + " of " + totalCount + " lessons"
      : "";
  }

  // Where the library starts, so a filter change never strands the reader
  // halfway down a list that just got shorter.
  function libraryTop() {
    return head.getBoundingClientRect().bottom + window.scrollY - 60;
  }
  function keepInView() {
    var top = libraryTop();
    if (window.scrollY > top) scrollToY(top);
  }

  function setCourse(value) {
    state.course = value;
    press(pills, "data-course", value);
    apply();
  }

  pills.forEach(function (b) {
    b.addEventListener("click", function () {
      setCourse(b.getAttribute("data-course"));
      keepInView();
    });
  });
  chips.forEach(function (b) {
    b.addEventListener("click", function () {
      state.kind = b.getAttribute("data-kind");
      press(chips, "data-kind", state.kind);
      apply();
      keepInView();
    });
  });
  if (input) {
    input.addEventListener("input", function () {
      state.q = input.value.trim();
      apply();
    });
    // "/" jumps to search, as it does on most docs sites.
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      input.focus();
    });
  }

  var reset = lib.querySelector("[data-bl-reset]");
  if (reset) {
    reset.addEventListener("click", function () {
      state = { course: "all", kind: "all", q: "" };
      if (input) input.value = "";
      press(pills, "data-course", "all");
      press(chips, "data-kind", "all");
      apply();
    });
  }

  // Links to a course group (#mbi802) land on the library filtered to it.
  // Capture phase, so the site-wide smooth-anchor handler doesn't also run.
  function groupFor(hash) {
    var el = hash && hash.length > 1 && document.getElementById(hash.slice(1));
    return el && el.classList.contains("bl-group") ? el : null;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    var g = a && groupFor(a.getAttribute("href"));
    if (!g) return;
    e.preventDefault();
    e.stopPropagation();
    setCourse(g.getAttribute("data-group"));
    history.replaceState(null, "", a.getAttribute("href"));
    scrollToY(libraryTop());
  }, true);

  var initial = groupFor(window.location.hash);
  if (initial) {
    setCourse(initial.getAttribute("data-group"));
    requestAnimationFrame(function () { scrollToY(libraryTop(), true); });
  }
})();

/* ==========================================================================
   Teaching in Sri Lanka — scroll story (teaching.html#sri-lanka).
   Each chapter on the right sets data-step on the section as it reaches the
   middle of the screen; the map on the left reacts through CSS alone.
   ========================================================================== */
(function () {
  "use strict";

  var section = document.getElementById("sri-lanka");
  if (!section) return;
  var steps = section.querySelectorAll(".lk-step");
  var caption = document.getElementById("lkCaption");

  function activate(step) {
    if (section.getAttribute("data-step") === step.dataset.step) return;
    section.setAttribute("data-step", step.dataset.step);
    steps.forEach(function (s) { s.classList.toggle("is-active", s === step); });
    if (caption) {
      caption.classList.remove("is-in");
      // Re-trigger the caption's fade so each chapter change reads as a change.
      void caption.offsetWidth;
      caption.innerHTML = step.dataset.caption;
      caption.classList.add("is-in");
    }
  }

  // Without IntersectionObserver the section keeps its static, all-marks view.
  if (!("IntersectionObserver" in window)) return;
  section.setAttribute("data-step", "uom");
  if (caption) caption.classList.add("is-in");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) activate(e.target); });
  }, { rootMargin: window.matchMedia("(max-width: 940px)").matches ? "-62% 0px -30% 0px" : "-45% 0px -45% 0px" });
  steps.forEach(function (s) { io.observe(s); });

  // Draw the island outline once, when the map first comes into view.
  var land = section.querySelector(".lk-land");
  if (land && land.getTotalLength) {
    var len = Math.ceil(land.getTotalLength());
    land.style.setProperty("--len", len);
    var mio = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { section.classList.add("is-drawn"); mio.disconnect(); }
    }, { threshold: 0.25 });
    mio.observe(section.querySelector(".lk-map"));
  }
})();

/* Lesson pages: mark the "On this page" entry for the section being read,
   and fold the list away on phones once a link in it is used. */
(function () {
  "use strict";
  var links = document.querySelectorAll(".lp-toc a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (current) current.classList.remove("is-here");
      current = byId[e.target.id];
      if (current) current.classList.add("is-here");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  Object.keys(byId).forEach(function (id) {
    var h = document.getElementById(id);
    if (h) io.observe(h);
  });
  var details = document.querySelector(".lp-toc details");
  var narrow = window.matchMedia("(max-width: 980px)");
  if (details && narrow.matches) details.open = false;
  links.forEach(function (a) {
    a.addEventListener("click", function () { if (details && narrow.matches) details.open = false; });
  });
})();

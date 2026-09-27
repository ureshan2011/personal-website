/* ==========================================================================
   Student & organiser voices — data for the homepage globe and quote grid.

   ONLY ADD REAL QUOTES. Every entry must come from a named person who
   actually said it and agreed to be quoted on this site (keep the email or
   message where they said yes). While this list is empty, both homepage
   sections (#voices and #testimonials) stay hidden; the first real entry
   makes them appear, and the first three entries become the featured cards.

   Each entry:
     name    – the person's name as they agreed to be credited
     program – real course / event context, e.g. "MBI802 · Yoobee College"
               or "Organiser, CODE with WIE 2026 · IEEE WIE Sri Lanka"
     country – display name, e.g. "Sri Lanka"
     code    – two-letter country code shown on the globe, e.g. "LK"
     region  – "Asia" | "Oceania" | "Europe" | "Americas" | "Africa"
     lat,lng – map coordinates (decimal degrees) for the globe marker
     rating  – 1–5 (drives the sentiment dot)
     quote   – their words, unedited apart from trimming

   Example (copy, then replace every value):
   {
     name: "Full Name",
     program: "Organiser, Code Champ 2026 · E3 / SLAAS",
     country: "Sri Lanka", code: "LK", region: "Asia",
     lat: 6.9271, lng: 79.8612, rating: 5,
     quote: "What they actually wrote to you."
   }
   ========================================================================== */
window.STUDENT_VOICES = [];

/* ==========================================================================
   Quote grid — first three entries are featured, the rest sit behind a
   quiet "view more" toggle. Un-hides the homepage sections when there is
   real data to show.
   ========================================================================== */
(function () {
  "use strict";
  var data = window.STUDENT_VOICES || [];
  if (!data.length) return;

  var globe = document.getElementById("voices");
  var section = document.getElementById("testimonials");
  if (globe) globe.hidden = false;
  if (section) section.hidden = false;

  var featured = document.getElementById("tgridFeatured");
  var more = document.getElementById("tgridMore");
  var toggle = document.getElementById("tgridToggle");
  if (!featured || !more || !toggle) return;

  function card(d) {
    var fig = document.createElement("figure");
    fig.className = "tcard";
    var bq = document.createElement("blockquote");
    bq.textContent = "“" + d.quote + "”";
    var cap = document.createElement("figcaption");
    var nm = document.createElement("strong"); nm.textContent = d.name;
    var pr = document.createElement("span"); pr.textContent = d.program;
    var lc = document.createElement("span"); lc.className = "tloc"; lc.textContent = d.country;
    cap.appendChild(nm); cap.appendChild(pr); cap.appendChild(lc);
    fig.appendChild(bq); fig.appendChild(cap);
    return fig;
  }

  data.slice(0, 3).forEach(function (d) { featured.appendChild(card(d)); });
  var rest = data.slice(3);
  if (!rest.length) { toggle.parentElement.hidden = true; return; }
  rest.forEach(function (d) { more.appendChild(card(d)); });

  var openLabel = "View more perspectives (+" + rest.length + ")";
  var closeLabel = "Show fewer perspectives";
  toggle.textContent = openLabel;
  toggle.addEventListener("click", function () {
    var open = more.classList.toggle("open");
    more.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? closeLabel : openLabel;
    if (!open) featured.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

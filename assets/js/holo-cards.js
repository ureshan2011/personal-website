/* ==========================================================================
   Holo research cards — behaviour for cards.html

   The page is complete without this file: every card is visible and flips
   with its Flip control (a native checkbox). This adds:
     · foil and tilt that follow the mouse (mouse/pen only, motion allowed)
     · click anywhere on a card to flip it
     · the sealed state until the six AR Mode crystals are found, with an
       "Unseal them now" button for anyone who would rather not hunt
     · the unseal animation, played once, when the collection comes into view
     · Save → the phone's share sheet where supported, otherwise a download
     · Share the collection
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var grid = doc.querySelector(".hc-grid");
  if (!grid || !window.JSON || !Element.prototype.closest) return;

  var mq = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduced = mq("(prefers-reduced-motion: reduce)");
  var KEY_FOUND = "arx-crystals", KEY_CARDS = "arx-cards", KEY_SEEN = "arx-cards-seen";
  // The six crystals — ids and pages must match assets/js/ar-notes.js.
  var HUNT = [
    { id: "speaking", page: "speaking.html" }, { id: "workshops", page: "workshops.html" },
    { id: "cases", page: "case-studies.html" }, { id: "media", page: "media.html" },
    { id: "playbook", page: "playbook.html" }, { id: "lessons", page: "lessons.html" }
  ];
  var MINI = '<svg viewBox="0 0 16 24" aria-hidden="true" focusable="false"><path d="M8 .5 1 10l7 2.5 7-2.5z" fill="#c9d7ff"/><path d="M1 10l7 2.5v11z" fill="#7189ff"/><path d="M15 10l-7 2.5v11z" fill="#4549d8"/></svg>';

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function found() {
    var ids = HUNT.map(function (h) { return h.id; });
    try {
      var a = JSON.parse(get(KEY_FOUND) || "[]");
      return Array.isArray(a) ? a.filter(function (id) { return ids.indexOf(id) > -1; }) : [];
    } catch (e) { return []; }
  }
  function isOpen() { return get(KEY_CARDS) === "open" || found().length >= HUNT.length; }

  var items = Array.prototype.slice.call(grid.querySelectorAll(".hc-item"));
  var boxes = Array.prototype.slice.call(grid.querySelectorAll(".hc-flipbox"));
  var saves = Array.prototype.slice.call(grid.querySelectorAll(".hc-save"));
  var status = doc.querySelector(".hc-status");

  /* ---------------------------------------------------------------- flip */
  grid.addEventListener("click", function (e) {
    var save = e.target.closest(".hc-save");
    if (save) { onSave(e, save); return; }
    var card = e.target.closest(".hc-card");
    if (!card || grid.classList.contains("is-sealed")) return;
    var box = card.parentNode.querySelector(".hc-flipbox");
    if (box && !box.disabled) box.checked = !box.checked;
  });

  /* --------------------------------------------------- foil + tilt (mouse) */
  if (mq("(hover: hover) and (pointer: fine)") && !reduced && window.requestAnimationFrame) {
    items.forEach(function (li) {
      var card = li.querySelector(".hc-card"), raf = 0, last = null;
      var props = ["--mx", "--my", "--fx", "--fy", "--rx", "--ry"];
      function paint() {
        raf = 0;
        if (!last) return;
        var r = card.getBoundingClientRect();
        var x = Math.min(1, Math.max(0, (last.clientX - r.left) / r.width));
        var y = Math.min(1, Math.max(0, (last.clientY - r.top) / r.height));
        var s = card.style;
        s.setProperty("--mx", (x * 100).toFixed(1) + "%");
        s.setProperty("--my", (y * 100).toFixed(1) + "%");
        s.setProperty("--fx", (12 + x * 76).toFixed(1) + "%");
        s.setProperty("--fy", (12 + y * 76).toFixed(1) + "%");
        s.setProperty("--rx", ((x - 0.5) * 18).toFixed(2) + "deg");
        s.setProperty("--ry", ((0.5 - y) * 18).toFixed(2) + "deg");
      }
      card.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "touch") return;
        card.classList.add("is-active");
      });
      card.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        last = e;
        if (!raf) raf = requestAnimationFrame(paint);
      });
      card.addEventListener("pointerleave", function () {
        last = null;
        card.classList.remove("is-active");
        props.forEach(function (p) { card.style.removeProperty(p); });
      });
    });
  }

  /* ------------------------------------------------------------- sealing */
  function setSealed(on) {
    grid.classList.toggle("is-sealed", on);
    boxes.forEach(function (b) { b.disabled = on; if (on) b.checked = false; });
    saves.forEach(function (a) {
      if (on) { a.setAttribute("aria-disabled", "true"); a.setAttribute("tabindex", "-1"); }
      else { a.removeAttribute("aria-disabled"); a.removeAttribute("tabindex"); }
    });
  }

  function renderStatus(message) {
    if (!status) return;
    var n = found().length, open = isOpen();
    var gems = "";
    for (var i = 0; i < HUNT.length; i++) gems += '<span class="' + (i < n ? "on" : "off") + '">' + MINI + "</span>";
    status.querySelector(".hc-gems").innerHTML = gems;
    var text = status.querySelector(".hc-status-t");
    var acts = status.querySelector(".hc-acts");
    if (open) {
      text.innerHTML = "<b>Unsealed.</b> " + (n >= HUNT.length ? "You found all six crystals. " : "") +
        "Tilt a card to catch the foil, flip it for the finding, and save the ones you like." +
        (message ? ' <span class="hc-share-msg">' + message + "</span>" : "");
      acts.innerHTML = '<button type="button" class="btn btn-solid hc-share">Share the collection <span class="arrow">↗</span></button>';
    } else {
      var got = found();
      var next = HUNT.filter(function (h) { return got.indexOf(h.id) < 0; })[0] || HUNT[0];
      text.innerHTML = "<b>Sealed.</b> Six crystals hide across this site, visible only in AR Mode. " +
        (n ? "You’ve found " + n + " of 6." : "Find all six to open the holo edition.");
      acts.innerHTML =
        '<a class="btn btn-solid" href="' + next.page + '?ar=on">' + (n ? "Continue the hunt" : "Start the hunt") + ' <span class="arrow">→</span></a>' +
        '<button type="button" class="btn hc-unseal">Unseal them now</button>';
    }
    status.hidden = false;
  }

  function unseal(animate) {
    set(KEY_CARDS, "open");
    set(KEY_SEEN, "1");
    setSealed(false);
    if (animate && !reduced) {
      grid.classList.add("is-unsealing");
      setTimeout(function () { grid.classList.remove("is-unsealing"); }, items.length * 90 + 2300);
    }
    renderStatus();
  }

  if (status) {
    status.addEventListener("click", function (e) {
      if (e.target.closest(".hc-unseal")) {
        unseal(true);
        var t = status.querySelector(".hc-status-t");
        if (t) { t.setAttribute("tabindex", "-1"); t.focus(); }
        var vault = doc.getElementById("collection");
        if (vault && vault.scrollIntoView) vault.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      } else if (e.target.closest(".hc-share")) {
        shareCollection();
      }
    });
  }

  if (isOpen()) {
    if (!get(KEY_SEEN) && !reduced && "IntersectionObserver" in window) {
      // First visit after the hunt: keep them sealed until they scroll into
      // view, then open them in front of the visitor.
      setSealed(true);
      renderStatus();
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setTimeout(function () { unseal(true); }, 280);
      }, { threshold: 0.18 });
      io.observe(grid);
    } else {
      set(KEY_SEEN, "1");
      renderStatus();
    }
  } else {
    setSealed(true);
    renderStatus();
  }

  /* -------------------------------------------------------------- saving */
  function download(href, name) {
    var a = doc.createElement("a");
    a.href = href;
    a.download = name;
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
  }

  function onSave(e, link) {
    if (grid.classList.contains("is-sealed")) { e.preventDefault(); return; }
    // Phones: offer the share sheet (save to photos, send in WhatsApp…).
    // Everywhere else the link's own download attribute does the job.
    if (!mq("(hover: none)") || !navigator.canShare || !window.fetch || !window.File) return;
    e.preventDefault();
    var name = link.getAttribute("download") || "holo-card.jpg";
    fetch(link.href).then(function (r) {
      if (!r.ok) throw new Error("fetch failed");
      return r.blob();
    }).then(function (blob) {
      var file = new File([blob], name, { type: blob.type || "image/jpeg" });
      if (!navigator.canShare({ files: [file] })) throw new Error("cannot share files");
      return navigator.share({
        files: [file],
        title: link.getAttribute("data-title") || "Holo research card",
        text: "One of Dr. Yasas Sri Wickramasinghe’s holo research cards: " + location.origin + location.pathname
      });
    }).catch(function (err) {
      if (err && err.name === "AbortError") return;  // the visitor closed the sheet
      download(link.href, name);
    });
  }

  function shareCollection() {
    var url = location.origin + location.pathname;
    var data = { title: "Thirteen papers, thirteen holo cards", text: "Research papers as holographic trading cards, by Dr. Yasas Sri Wickramasinghe.", url: url };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { renderStatus("Link copied."); }, function () { renderStatus(url); });
    } else {
      renderStatus(url);
    }
  }
})();

/* ==========================================================================
   Postgraduate-in-New-Zealand interest form (index.html#study-nz).
   Same dual delivery as the contact form (assets/js/contact-form.js):
   1. Formspree  → the enquiry lands in the inbox (the must-have).
   2. Firestore  → a copy appears in the Admin Dashboard
      (app/#/admin → PG enquiries), written anonymously through the REST API.
   Without JavaScript all three steps show at once and the form posts
   straight to Formspree.
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("pgForm");
  if (!form || !window.fetch) return;

  var panels = form.querySelectorAll(".pg-panel");
  var labels = form.querySelectorAll("[data-step-label]");
  var bar = document.getElementById("pgBar");
  var back = document.getElementById("pgBack");
  var next = document.getElementById("pgNext");
  var submit = document.getElementById("pgSubmit");
  var out = document.getElementById("pgMsgOut");
  var step = 1, last = panels.length;

  form.classList.add("is-stepped");

  function show(n) {
    step = n;
    panels.forEach(function (p) { p.hidden = Number(p.dataset.step) !== n; });
    labels.forEach(function (l) {
      var k = Number(l.dataset.stepLabel);
      l.classList.toggle("is-on", k === n);
      l.classList.toggle("is-done", k < n);
    });
    bar.style.width = (n / last * 100) + "%";
    back.hidden = n === 1;
    next.hidden = n === last;
    submit.hidden = n !== last;
    setMsg("");
  }

  function setMsg(text, ok) {
    out.textContent = text;
    out.className = "pg-msg" + (text ? (ok ? " ok" : " err") : "");
  }

  // Validate only the fields on the current step.
  function stepValid(n) {
    var panel = form.querySelector('.pg-panel[data-step="' + n + '"]');
    var fields = panel.querySelectorAll("input, select, textarea");
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].checkValidity()) {
        var f = fields[i];
        if (f.type === "radio") setMsg("Choose master's, PhD or not sure to continue.", false);
        else if (f.name === "consent") setMsg("Please tick the box so I can reply to you.", false);
        else { setMsg("Please fill in the highlighted field.", false); f.focus(); }
        f.closest(".field, .pg-tiles, .pg-consent").classList.add("pg-invalid");
        return false;
      }
    }
    return true;
  }
  form.addEventListener("input", function (e) {
    var w = e.target.closest(".pg-invalid");
    if (w && e.target.checkValidity()) w.classList.remove("pg-invalid");
  });

  // PhD-only question shows once PhD is picked.
  function syncLevel() {
    var lvl = form.querySelector("[name=level]:checked");
    form.classList.toggle("is-phd", !!lvl && lvl.value === "PhD");
  }
  form.querySelectorAll("[name=level]").forEach(function (r) { r.addEventListener("change", syncLevel); });

  next.addEventListener("click", function () {
    if (!stepValid(step)) return;
    show(step + 1);
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  back.addEventListener("click", function () { show(step - 1); });

  var CFG = window.FIREBASE_CONFIG || {};
  var canMirror = !!(CFG.projectId && CFG.apiKey && String(CFG.apiKey).indexOf("PASTE") !== 0);
  var KEYS = ["level", "name", "email", "phone", "country", "currentStatus", "qualification",
              "institution", "gradYear", "gpa", "workExperience", "englishTest", "englishScore",
              "research", "field", "intake", "topic", "funding", "preferred", "help", "message", "heardFrom"];

  function collect() {
    var fd = new FormData(form), data = {};
    KEYS.forEach(function (k) {
      data[k] = k === "help" ? fd.getAll("help").join(", ") : String(fd.get(k) || "").trim();
    });
    return data;
  }

  function mirrorToDashboard(data) {
    if (!canMirror) return Promise.resolve();
    var fields = { status: { stringValue: "new" }, website: { stringValue: "" },
                   createdAt: { timestampValue: new Date().toISOString() } };
    KEYS.forEach(function (k) { fields[k] = { stringValue: data[k] }; });
    return fetch("https://firestore.googleapis.com/v1/projects/" + CFG.projectId +
                 "/databases/(default)/documents/pgEnquiries?key=" + CFG.apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: fields })
    }).then(function (r) { if (!r.ok) throw new Error("firestore " + r.status); });
  }

  function sendEmail() {
    var fd = new FormData(form);
    fd.set("help", fd.getAll("help").join(", "));
    return fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: fd })
      .then(function (r) { if (!r.ok) throw new Error("formspree " + r.status); });
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (form.querySelector("[name=website]").value) return; // honeypot
    for (var n = 1; n <= last; n++) {
      if (!stepValid(n)) { if (n !== step) { show(n); stepValid(n); } return; }
    }
    var data = collect();
    submit.disabled = true;
    setMsg("Sending…", true);

    var email = sendEmail();
    var mirror = mirrorToDashboard(data).catch(function (e) {
      if (window.console) console.warn("Dashboard copy failed:", e); // best-effort
    });

    Promise.all([email, mirror])
      .then(function () {
        form.reset();
        syncLevel();
        show(1);
        setMsg("Thank you, " + data.name.split(" ")[0] + " — I've got your details and will reply by email.", true);
      })
      .catch(function () {
        // Fall back to a classic post so the enquiry still reaches the inbox.
        setMsg("One moment — retrying…", true);
        form.classList.remove("is-stepped");
        panels.forEach(function (p) { p.hidden = false; });
        HTMLFormElement.prototype.submit.call(form);
      })
      .finally(function () { submit.disabled = false; });
  });

  show(1);
})();

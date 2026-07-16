/* ==========================================================================
   Contact form — dual delivery.
   1. Formspree  → email lands in the inbox (unchanged, the must-have).
   2. Firestore  → the message also appears in the platform's Admin
      Dashboard (app/#/admin → Messages), written anonymously through the
      Firestore REST API so this static page needs no SDK and no account.
   If the Firestore write fails the email still goes out — the dashboard
   copy is best-effort.
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  var msgEl = document.getElementById("contactMsg");
  if (!form) return;

  var CFG = window.FIREBASE_CONFIG || {};
  var canMirror = !!(CFG.projectId && CFG.apiKey && String(CFG.apiKey).indexOf("PASTE") !== 0);

  function firestoreUrl() {
    return "https://firestore.googleapis.com/v1/projects/" + CFG.projectId +
           "/databases/(default)/documents/messages?key=" + CFG.apiKey;
  }

  function mirrorToDashboard(data) {
    if (!canMirror) return Promise.resolve();
    return fetch(firestoreUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          name: { stringValue: data.name },
          email: { stringValue: data.email },
          subject: { stringValue: data.subject },
          message: { stringValue: data.message },
          status: { stringValue: "new" },
          website: { stringValue: "" },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      })
    }).then(function (r) {
      if (!r.ok) throw new Error("firestore " + r.status);
    });
  }

  function sendEmail(fd) {
    return fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: fd
    }).then(function (r) {
      if (!r.ok) throw new Error("formspree " + r.status);
    });
  }

  function setMsg(text, ok) {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.style.color = ok ? "#1a7f4b" : "#b3261e";
    msgEl.style.fontWeight = "600";
  }

  form.addEventListener("submit", function (ev) {
    if (!window.fetch) return; // very old browser: fall back to native Formspree submit
    ev.preventDefault();

    var fd = new FormData(form);
    if (fd.get("website")) return; // honeypot

    var subjectSel = form.querySelector("[name=subject]");
    var data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: subjectSel ? subjectSel.options[subjectSel.selectedIndex].text : "",
      message: String(fd.get("message") || "").trim()
    };
    if (!data.name || !data.email || !data.message) return;

    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    setMsg("Sending…", true);

    var email = sendEmail(fd);
    var mirror = mirrorToDashboard(data).catch(function (e) {
      // Dashboard copy is best-effort; the email is what must not fail.
      if (window.console) console.warn("Dashboard mirror failed:", e);
    });

    Promise.all([email, mirror])
      .then(function () {
        form.reset();
        setMsg("Message sent — I'll get back to you by email. ✓", true);
      })
      .catch(function () {
        // Email failed via fetch — retry as a classic form post so the
        // message still reaches the inbox via Formspree's hosted flow.
        setMsg("One moment — retrying…", true);
        form.removeAttribute("id"); // avoid re-intercepting
        form.submit();
      })
      .finally(function () { btn.disabled = false; });
  });
})();

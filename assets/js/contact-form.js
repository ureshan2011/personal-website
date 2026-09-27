/* ==========================================================================
   Enquiry forms — dual delivery, shared by every static page.
   1. Formspree  → email lands in the inbox (unchanged, the must-have).
   2. Firestore  → the message also appears in the platform's Admin
      Dashboard (app/#/admin → Messages), written anonymously through the
      Firestore REST API so these static pages need no SDK and no account.
   If the Firestore write fails the email still goes out — the dashboard
   copy is best-effort.

   Handles #contactForm plus any <form data-enquiry>. Every form needs
   name + email inputs and a Formspree action. Optional:
     [name=subject]      select or hidden input — the dashboard subject
     [name=message]      free text; any other named fields are folded into
                         the dashboard copy as "Label: value" lines
     data-success="…"    message shown after sending
     .form-msg / #contactMsg   status line inside the form
   On success the form dispatches an "enquiry:sent" event and, when
   Google Analytics is present, a generate_lead event tagged with the form.
   ========================================================================== */
(function () {
  "use strict";

  var forms = document.querySelectorAll("#contactForm, form[data-enquiry]");
  if (!forms.length) return;

  var CFG = window.FIREBASE_CONFIG || {};
  var canMirror = !!(CFG.projectId && CFG.apiKey && String(CFG.apiKey).indexOf("PASTE") !== 0);
  var SKIP = { name: 1, email: 1, subject: 1, message: 1, website: 1, _subject: 1 };

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

  function labelFor(form, field) {
    var el = form.querySelector("[name='" + field + "']");
    var lab = el && el.id ? form.querySelector("label[for='" + el.id + "']") : null;
    if (!lab && el) lab = el.closest(".field") && el.closest(".field").querySelector("label");
    return (lab ? lab.textContent : field).replace(/\s*\(optional\)\s*/i, "").replace(/\s*\*$/, "").trim();
  }

  function collect(form, fd) {
    var subjectEl = form.querySelector("[name=subject]");
    var subject = "";
    if (subjectEl) {
      subject = subjectEl.tagName === "SELECT"
        ? subjectEl.options[subjectEl.selectedIndex].text
        : subjectEl.value;
    }
    var lines = [];
    var seen = {};
    fd.forEach(function (value, key) {
      if (SKIP[key] || seen[key]) return;
      seen[key] = 1;
      var all = fd.getAll(key).map(String).filter(Boolean).join(", ");
      if (all) lines.push(labelFor(form, key) + ": " + all);
    });
    var message = String(fd.get("message") || "").trim();
    var body = lines.join("\n") + (lines.length && message ? "\n\n" : "") + message;
    return {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: subject.slice(0, 160),
      message: (body || "(no message)").slice(0, 5000)
    };
  }

  function sendEmail(form, fd) {
    return fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: fd
    }).then(function (r) {
      if (!r.ok) throw new Error("formspree " + r.status);
    });
  }

  function wire(form) {
    var msgEl = form.querySelector(".form-msg") || document.getElementById("contactMsg");

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

      var data = collect(form, fd);
      if (!data.name || !data.email) return;

      var btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      setMsg("Sending…", true);

      var email = sendEmail(form, fd);
      var mirror = mirrorToDashboard(data).catch(function (e) {
        // Dashboard copy is best-effort; the email is what must not fail.
        if (window.console) console.warn("Dashboard mirror failed:", e);
      });

      Promise.all([email, mirror])
        .then(function () {
          form.reset();
          setMsg(form.getAttribute("data-success") || "Message sent — I'll get back to you by email. ✓", true);
          if (typeof window.gtag === "function") {
            window.gtag("event", "generate_lead", {
              form_id: form.id || form.getAttribute("data-enquiry") || "contact",
              enquiry_subject: data.subject
            });
          }
          form.dispatchEvent(new CustomEvent("enquiry:sent", { detail: data }));
        })
        .catch(function () {
          // Email failed via fetch — retry as a classic form post so the
          // message still reaches the inbox via Formspree's hosted flow.
          setMsg("One moment — retrying…", true);
          form.removeAttribute("id"); // avoid re-intercepting
          form.removeAttribute("data-enquiry");
          HTMLFormElement.prototype.submit.call(form);
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  Array.prototype.forEach.call(forms, wire);
})();

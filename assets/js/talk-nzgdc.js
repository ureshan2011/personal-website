/* ==========================================================================
   NZGDC 2026 talk companion — "Designing Shared Worlds Across Distance"
   1. Talk status + countdown (NZDT)       6. Where-people-hid toggle
   2. The Window: scanned room + cone      7. "Expose the dial" settings
   3. Chapter bar scroll-spy               8. Share a rule
   4. Tabletop / Window / Overlay tabs     9. Slides + recording slots
   5. QR welcome                          10. Feedback form hand-off
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---- Edit these two after the talk -------------------------------------
  // Drop the PDF at this path and the download button switches on by itself.
  var SLIDES_URL = "../assets/files/nzgdc-2026/shared-worlds-across-distance-slides.pdf";
  // Paste the YouTube video ID once NZGDC publishes the recording.
  var RECORDING_YT = "";
  // -------------------------------------------------------------------------

  var START = Date.UTC(2026, 9, 1, 2, 0, 0);   // 1 Oct 2026, 3:00 PM NZDT (UTC+13)
  var END = START + 30 * 60 * 1000;             // 3:30 PM NZDT

  /* ---------------------------------------------------------------- 1 */
  var statusEl = $("#talkStatus");
  var cd = $("#countdown");
  function state(now) { return now < START ? "before" : now < END ? "live" : "after"; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var now = Date.now(), s = state(now);
    document.documentElement.setAttribute("data-talk", s);
    if (statusEl) {
      statusEl.setAttribute("data-state", s);
      statusEl.lastElementChild.textContent =
        s === "before" ? "On stage Thursday 1 October, 3:00 PM NZDT" :
        s === "live" ? "On stage right now at NZICC" : "Delivered 1 October 2026 — thank you";
    }
    if (cd) {
      if (s !== "before") { cd.hidden = true; return; }
      var ms = START - now, d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24,
          m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
      var set = function (k, v) { var el = cd.querySelector('[data-u="' + k + '"]'); if (el) el.textContent = v; };
      set("d", d); set("h", pad(h)); set("m", pad(m)); set("s", pad(sec));
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------------------------------------------------------- 2 */
  var win = $("#talkWindow");
  var canvas = $("#roomCanvas");
  if (win && !reduced) {
    win.classList.add("is-closed");
    setTimeout(function () { win.classList.remove("is-closed"); }, 350);
  }
  if (canvas && canvas.getContext) room(canvas);

  function room(cv) {
    var ctx = cv.getContext("2d");
    var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var toast = $("#roomToast"), dots = $$("#foundDots i"), countEl = $("#foundCount"), resetBtn = $("#roomReset");

    // World: x right, y up, z into the room (metres). Viewer stands outside the window.
    var R = { x0: -2.6, x1: 2.6, y0: 0, y1: 2.6, z0: 0, z1: 4.4 };
    var baseEye = [0, 1.42, -2.5], look = [0, 1.25, 2.4], FOV = 56 * Math.PI / 180;
    var eye = baseEye.slice();
    var seeker = [1.05, 1.5, 1.55];                 // the Seeker's tablet, no avatar
    var HALF = 15 * Math.PI / 180;

    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
    function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
    function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function len(a) { return Math.sqrt(dot(a, a)); }
    function norm(a) { var l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }

    var F, fwd, rgt, up;
    function camera() {
      fwd = norm(sub(look, eye));
      rgt = norm(cross([0, 1, 0], fwd));
      up = cross(fwd, rgt);
      F = (H / 2) / Math.tan(FOV / 2);
    }
    function proj(p) {
      var d = sub(p, eye), zc = dot(d, fwd);
      if (zc < 0.05) return null;
      return [W / 2 + dot(d, rgt) / zc * F, H / 2 - dot(d, up) / zc * F, zc];
    }

    // --- Static scene: a LiDAR-style point cloud + simple furniture edges ---
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(42);
    var pts = [];
    function surf(n, f) { for (var i = 0; i < n; i++) pts.push(f(rnd(), rnd())); }
    surf(520, function (a, b) { return [R.x0 + a * 5.2, 0, R.z0 + b * 4.4]; });            // floor
    surf(300, function (a, b) { return [R.x0 + a * 5.2, 2.6, R.z0 + b * 4.4]; });          // ceiling
    surf(460, function (a, b) { return [R.x0 + a * 5.2, b * 2.6, 4.4]; });                 // back wall
    surf(330, function (a, b) { return [-2.6, b * 2.6, a * 4.4]; });                       // left wall
    surf(330, function (a, b) { return [2.6, b * 2.6, a * 4.4]; });                        // right wall
    surf(120, function (a, b) { return [-2.35 + a * 1.45, 0.76, 0.85 + b * 0.85]; });      // desk top
    surf(60, function (a, b) { return [0.45 + a * 1.0, [0.02, 0.65, 1.28, 1.9][Math.floor(b * 4)], 3.95 + rnd() * 0.4]; }); // shelf boards

    var E = [];                                   // line segments
    function box(x0, y0, z0, x1, y1, z1) {
      var c = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
      [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function (e) { E.push([c[e[0]], c[e[1]]]); });
    }
    // room seams
    [[[-2.6, 0, 4.4], [2.6, 0, 4.4]], [[-2.6, 2.6, 4.4], [2.6, 2.6, 4.4]], [[-2.6, 0, 4.4], [-2.6, 2.6, 4.4]], [[2.6, 0, 4.4], [2.6, 2.6, 4.4]],
     [[-2.6, 0, 0], [-2.6, 0, 4.4]], [[2.6, 0, 0], [2.6, 0, 4.4]], [[-2.6, 2.6, 0], [-2.6, 2.6, 4.4]], [[2.6, 2.6, 0], [2.6, 2.6, 4.4]]].forEach(function (s) { E.push(s); });
    box(-2.35, 0.72, 0.85, -0.9, 0.76, 1.7);                                   // desk top
    [[-2.3, 0.9], [-0.95, 0.9], [-2.3, 1.65], [-0.95, 1.65]].forEach(function (l) { E.push([[l[0], 0, l[1]], [l[0], 0.72, l[1]]]); });
    box(-0.55, 0, 1.95, -0.1, 0.46, 2.4); E.push([[-0.55, 0.46, 2.4], [-0.55, 1.0, 2.4]], [[-0.1, 0.46, 2.4], [-0.1, 1.0, 2.4]], [[-0.55, 1.0, 2.4], [-0.1, 1.0, 2.4]]); // chair
    box(0.45, 0, 3.95, 1.45, 1.95, 4.38);                                      // shelf
    [0.65, 1.28].forEach(function (y) { E.push([[0.45, y, 3.95], [1.45, y, 3.95]]); });
    E.push([[2.6, 0, 2.3], [2.6, 2.05, 2.3]], [[2.6, 2.05, 2.3], [2.6, 2.05, 3.25]], [[2.6, 2.05, 3.25], [2.6, 0, 3.25]]); // door
    E.push([[-1.45, 2.6, 3.0], [-1.45, 2.3, 3.0]]);                            // lamp cord
    for (var k = 0; k < 10; k++) { var a0 = k / 10 * Math.PI * 2, a1 = (k + 1) / 10 * Math.PI * 2;
      E.push([[-1.45 + Math.cos(a0) * 0.22, 2.12, 3.0 + Math.sin(a0) * 0.22], [-1.45 + Math.cos(a1) * 0.22, 2.12, 3.0 + Math.sin(a1) * 0.22]]);
      if (k % 2 === 0) E.push([[-1.45, 2.3, 3.0], [-1.45 + Math.cos(a0) * 0.22, 2.12, 3.0 + Math.sin(a0) * 0.22]]); }

    // --- The hidden objects: where AR players actually hid things ----------
    var OBJ = [
      { p: [-1.75, 2.48, 3.55], name: "on the ceiling", msg: "Found — on the ceiling. AR hiders went up; real-world hiders almost never did." },
      { p: [1.95, 1.9, 3.8], name: "floating mid-air", msg: "Found — floating mid-air. Breaking physics was the cheapest, most-loved thing we built." },
      { p: [-1.55, 0.22, 1.3], name: "under the desk", msg: "Found — under the desk. That's where people hide things in real life." }
    ];
    var TOY = { p: [0.62, 1.43, 4.1], msg: "The bright yellow toy: AR hiders chose it 15× — once in real life. Bold beats clever when controls are fiddly." };
    var found = [false, false, false], toyShown = false, all = false;

    // --- Pointer → target ----------------------------------------------------
    var ptr = { x: 0.62, y: 0.28 }, target = [0, 2, 4.4], aimAt = null;
    var userDriven = false, lastUser = 0, par = { x: 0, y: 0 }, parT = { x: 0, y: 0 };
    function rayHit(nx, ny) {
      var dx = (nx * W - W / 2) / F, dy = -(ny * H - H / 2) / F;
      var dir = norm(add(add(fwd, mul(rgt, dx)), mul(up, dy)));
      var tmin = -Infinity, tmax = Infinity, lo = [R.x0, R.y0, R.z0], hi = [R.x1, R.y1, R.z1];
      for (var i = 0; i < 3; i++) {
        if (Math.abs(dir[i]) < 1e-6) continue;
        var t1 = (lo[i] - eye[i]) / dir[i], t2 = (hi[i] - eye[i]) / dir[i];
        tmin = Math.max(tmin, Math.min(t1, t2)); tmax = Math.min(tmax, Math.max(t1, t2));
      }
      if (tmax < tmin || tmax <= 0) return [0, 1.3, 4.4];
      return add(eye, mul(dir, tmax));
    }
    function setPtr(e) {
      var r = cv.getBoundingClientRect();
      ptr.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      ptr.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      parT.x = (ptr.x - 0.5); parT.y = (ptr.y - 0.5);
      userDriven = true; lastUser = performance.now(); hideHint();
      if (reduced) draw(performance.now());
    }
    cv.addEventListener("pointermove", setPtr);
    cv.addEventListener("pointerdown", setPtr);
    cv.addEventListener("keydown", function (e) {
      var step = 0.04, used = true;
      if (e.key === "ArrowLeft") ptr.x -= step; else if (e.key === "ArrowRight") ptr.x += step;
      else if (e.key === "ArrowUp") ptr.y -= step; else if (e.key === "ArrowDown") ptr.y += step; else used = false;
      if (!used) return;
      e.preventDefault();
      ptr.x = Math.min(1, Math.max(0, ptr.x)); ptr.y = Math.min(1, Math.max(0, ptr.y));
      userDriven = true; lastUser = performance.now(); hideHint();
      if (reduced) draw(performance.now());
    });
    var hint = $("#roomHint");
    if (hint && window.matchMedia("(hover: none)").matches) hint.textContent = "Tap around the room to look";
    function hideHint() { if (hint) hint.classList.remove("show"); }

    var toastTimer;
    function say(msg, ms) {
      if (!toast) return;
      toast.textContent = msg; toast.classList.add("show");
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove("show"); }, ms || 3600);
    }
    if (resetBtn) resetBtn.addEventListener("click", function () {
      found = [false, false, false]; all = false; toyShown = false;
      dots.forEach(function (d) { d.classList.remove("on"); });
      if (countEl) countEl.textContent = "0";
      say("Hidden again. Try looking up first.", 2400);
      if (reduced) draw(performance.now());
    });

    // Idle tour: sweeps the cone through the room (never "finds" anything).
    var tour = [[0.5, 0.2], [0.2, 0.12], [0.3, 0.55], [0.8, 0.3], [0.62, 0.7], [0.5, 0.45]];
    function tourPt(t) {
      var seg = 3.2, i = Math.floor(t / seg) % tour.length, f = (t % seg) / seg;
      var a = tour[i], b = tour[(i + 1) % tour.length], e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      return { x: a[0] + (b[0] - a[0]) * e, y: a[1] + (b[1] - a[1]) * e };
    }

    function resize() {
      var r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      camera();
      if (reduced) draw(performance.now());
    }

    function hull(P) {
      P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
      var c = function (o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); };
      var lo = [], hi = [];
      P.forEach(function (p) { while (lo.length >= 2 && c(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
      for (var i = P.length - 1; i >= 0; i--) { var p = P[i]; while (hi.length >= 2 && c(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
      return lo.slice(0, -1).concat(hi.slice(0, -1));
    }

    function draw(now) {
      var t = now / 1000;
      // gentle parallax: the viewer leans as they look around
      par.x += (parT.x - par.x) * 0.06; par.y += (parT.y - par.y) * 0.06;
      eye = [baseEye[0] + par.x * 0.55, baseEye[1] - par.y * 0.25, baseEye[2]];
      camera();

      var idle = !userDriven || (now - lastUser > 5000);
      if (idle && !reduced) { var tp = tourPt(t); if (!userDriven) { parT.x = (tp.x - 0.5) * 0.5; parT.y = (tp.y - 0.5) * 0.4; } aimAt = tp; }
      else aimAt = ptr;
      var goal = rayHit(aimAt.x, aimAt.y);
      // Aim assist: pointing at a glowing object on screen means "look at it".
      if (!idle || reduced) {
        var px = aimAt.x * W, py = aimAt.y * H, best = 38 * Math.max(1, W / 520), snap = null;
        OBJ.concat([TOY]).forEach(function (o) {
          var q = proj(o.p); if (!q) return;
          var dd = Math.hypot(q[0] - px, q[1] - py);
          if (dd < best) { best = dd; snap = o.p; }
        });
        if (snap) goal = snap;
      }
      target = reduced ? goal : add(target, mul(sub(goal, target), idle ? 0.08 : 0.22));

      ctx.clearRect(0, 0, W, H);
      var g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0d1426"); g.addColorStop(1, "#111a30");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // LiDAR sweep band
      var sweepY = reduced ? -1 : (Math.sin(t * 0.55) * 0.5 + 0.5) * 2.6;
      var s = Math.max(1, W / 520);
      for (var i = 0; i < pts.length; i++) {
        var p = proj(pts[i]); if (!p) continue;
        var near = Math.abs(pts[i][1] - sweepY) < 0.07;
        var a = Math.max(0.12, Math.min(0.75, 2.2 / p[2]));
        ctx.fillStyle = near ? "rgba(255,190,150," + Math.min(1, a + 0.35) + ")" : "rgba(170,190,255," + a + ")";
        var sz = (near ? 1.6 : 1.1) * s;
        ctx.fillRect(p[0] - sz / 2, p[1] - sz / 2, sz, sz);
      }
      ctx.lineWidth = 1;
      for (var j = 0; j < E.length; j++) {
        var a1 = proj(E[j][0]), b1 = proj(E[j][1]); if (!a1 || !b1) continue;
        ctx.strokeStyle = "rgba(180,198,255," + Math.max(0.2, Math.min(0.62, 2.3 / ((a1[2] + b1[2]) / 2))) + ")";
        ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke();
      }

      // the cone
      var axis = norm(sub(target, seeker)), L = Math.min(len(sub(target, seeker)), 4.6);
      var uu = norm(cross(axis, Math.abs(axis[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0])), vv = cross(axis, uu);
      var rr = L * Math.tan(HALF), C = add(seeker, mul(axis, L)), base = [], P2 = [];
      for (var k2 = 0; k2 < 36; k2++) {
        var an = k2 / 36 * Math.PI * 2;
        var bp = proj(add(C, add(mul(uu, Math.cos(an) * rr), mul(vv, Math.sin(an) * rr))));
        if (bp) { base.push(bp); P2.push(bp); }
      }
      var ap = proj(seeker);
      if (ap && base.length > 3) {
        P2.push(ap);
        var hl = hull(P2);
        var cg = ctx.createRadialGradient(ap[0], ap[1], 2, ap[0], ap[1], Math.max(W, H) * 0.7);
        cg.addColorStop(0, "rgba(242,107,58,0.55)"); cg.addColorStop(1, "rgba(242,107,58,0.10)");
        ctx.fillStyle = cg; ctx.beginPath();
        hl.forEach(function (q, n) { if (n) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "rgba(255,150,110,0.85)"; ctx.lineWidth = 1.4; ctx.beginPath();
        base.forEach(function (q, n) { if (n) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
        ctx.closePath(); ctx.stroke();
        // seeker marker: a tablet-sized glint and a floor ring, nothing more
        var fr = proj([seeker[0], 0.01, seeker[2]]);
        if (fr) { ctx.strokeStyle = "rgba(255,150,110,.45)"; ctx.beginPath(); ctx.ellipse(fr[0], fr[1], 16 * s, 5 * s, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(fr[0], fr[1]); ctx.lineTo(ap[0], ap[1]); ctx.stroke(); ctx.setLineDash([]); }
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ap[0], ap[1], 3.2 * s, 0, Math.PI * 2); ctx.fill();
        ctx.font = "600 " + Math.round(11 * s) + "px Inter, sans-serif"; ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.fillText("SEEKER", ap[0] + 9 * s, ap[1] + 15 * s);
        var tp2 = proj(target);
        if (tp2) { ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(tp2[0], tp2[1], 6 * s, 0, Math.PI * 2); ctx.stroke(); }
      }

      // objects
      function inCone(o) {
        var v = sub(o, seeker), d = len(v);
        return d < L + 0.5 && Math.acos(Math.max(-1, Math.min(1, dot(norm(v), axis)))) < HALF * 1.05;
      }
      var canFind = !idle || reduced;
      OBJ.forEach(function (o, n) {
        var bob = reduced ? 0 : Math.sin(t * 1.6 + n * 2) * 0.03;
        var pp = proj([o.p[0], o.p[1] + bob, o.p[2]]); if (!pp) return;
        var hit = inCone(o.p);
        if (hit && canFind && !found[n]) {
          found[n] = true; dots[n] && dots[n].classList.add("on");
          var c = found.filter(Boolean).length; if (countEl) countEl.textContent = c;
          if (c === 3 && !all) { all = true; say("All three found. You searched like an AR player — up, not just around.", 5200); }
          else say(o.msg);
          if (window.gtag && c === 3) window.gtag("event", "talk_room_complete", { event_category: "nzgdc2026" });
        }
        var rad = (found[n] ? 7 : 5.5) * s;
        var glow = ctx.createRadialGradient(pp[0], pp[1], 0, pp[0], pp[1], rad * 4);
        glow.addColorStop(0, found[n] ? "rgba(62,207,155,.9)" : hit ? "rgba(255,255,255,.95)" : "rgba(140,220,255,.55)");
        glow.addColorStop(1, "rgba(140,220,255,0)");
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(pp[0], pp[1], rad * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = found[n] ? "#3ecf9b" : "#dff4ff"; ctx.beginPath(); ctx.arc(pp[0], pp[1], rad * 0.8, 0, Math.PI * 2); ctx.fill();
        if (found[n]) { ctx.font = "700 " + Math.round(10.5 * s) + "px Inter, sans-serif"; ctx.fillStyle = "rgba(62,207,155,.95)"; ctx.fillText(o.name.toUpperCase(), pp[0] + 10 * s, pp[1] + 4 * s); }
      });
      // the bright yellow toy (easter egg)
      var yp = proj(TOY.p);
      if (yp) {
        ctx.fillStyle = "#ffc933"; ctx.beginPath();
        ctx.ellipse(yp[0], yp[1], 5.5 * s, 8 * s, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#1b1606"; ctx.beginPath(); ctx.arc(yp[0], yp[1] - 2 * s, 1.6 * s, 0, Math.PI * 2); ctx.fill();
        if (inCone(TOY.p) && canFind && !toyShown) { toyShown = true; say(TOY.msg, 5200); }
      }
    }

    var raf = null, visible = true;
    function loop(now) { draw(now); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0.05 }).observe(cv);
    }
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(cv); else window.addEventListener("resize", resize);
    resize();
    if (reduced) { ptr = { x: 0.3, y: 0.14 }; userDriven = true; draw(performance.now()); }
    else { start(); if (hint) setTimeout(function () { if (!userDriven) hint.classList.add("show"); }, 2600); }
  }

  /* ---------------------------------------------------------------- 3 */
  var bar = $(".t-chapters");
  if (bar) {
    var links = $$("a[data-ch]", bar), prog = $(".t-ch-progress", bar);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute("data-ch")); });
    var onScroll = function () {
      var y = window.scrollY + 170, cur = -1;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + "%";
      if (cur >= 0 && links[cur] && links[cur].scrollIntoView && bar._last !== cur) {
        bar._last = cur;
        var c = bar.querySelector(".container"), l = links[cur];
        c.scrollTo({ left: l.offsetLeft - 24, behavior: reduced ? "auto" : "smooth" });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  // In-page jumps clear the sticky nav + chapter bar
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var el = document.querySelector(id); if (!el) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -136 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 136, behavior: reduced ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------------------------------------------------------------- 4 */
  var MODES = {
    tabletop: { name: "Tabletop", def: "A miniature of the remote room on the ground in front of you.", big: "1 fan", l: "out of 30 players. The one that looks best in a trailer — great for overview, terrible for presence." },
    window: { name: "Window", def: "A life-size portal you walk up to and look through.", big: "8 of 30", l: "tried to walk through it. The most usable mode — and players called it “the portal” without being told to." },
    overlay: { name: "Overlay", def: "The remote room wrapped around your own, at 1:1 scale.", big: "67%", l: "preferred it — the only mode with a significant lift in feeling you were really there." }
  };
  var tabs = $$("#modeTabs [role=tab]"), view = $("#modeView"), panel = $("#modePanel");
  function pick(btn, focus) {
    var m = btn.getAttribute("data-mode"), d = MODES[m];
    tabs.forEach(function (b) { var on = b === btn; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; });
    if (view) { view.setAttribute("data-mode", m); var tg = view.querySelector(".tag"); if (tg) tg.textContent = d.name; }
    if (panel) {
      panel.innerHTML = '<div class="t-mode-panel"><h3>' + d.name + '</h3><p class="def">' + d.def + '</p><p class="big">' + d.big + '</p><p class="big-l">' + d.l + "</p></div>";
    }
    if (focus) btn.focus();
  }
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () { pick(b); });
    b.addEventListener("keydown", function (e) {
      var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (n) { e.preventDefault(); pick(tabs[(i + n + tabs.length) % tabs.length], true); }
    });
  });
  if (tabs.length) pick(tabs[2]);

  /* ---------------------------------------------------------------- 5 */
  if (document.documentElement.classList.contains("from-qr")) {
    setTimeout(function () {
      var t = $("#roomToast");
      if (t) { t.textContent = "Kia ora — thanks for scanning. Everything from the talk is on this page."; t.classList.add("show");
        setTimeout(function () { t.classList.remove("show"); }, 5200); }
    }, 900);
  }

  /* ---------------------------------------------------------------- 6 */
  var spots = $("#spots");
  $$("#spotTabs [role=tab]").forEach(function (b, i, all) {
    b.addEventListener("click", function () {
      all.forEach(function (x) { x.setAttribute("aria-selected", x === b); x.tabIndex = x === b ? 0 : -1; });
      if (spots) spots.setAttribute("data-view", b.getAttribute("data-view"));
    });
    b.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); var o = all[(i + 1) % all.length]; o.click(); o.focus(); }
    });
  });

  /* ---------------------------------------------------------------- 7 */
  var dial = { objects: 1, timer: false, swap: false };
  var OUT = {
    "1-false-false": { mode: "Study mode A · one object, no clock", h: "The chill one", win: "Highest sense of reward, and the easiest to use.", q: "“A great way to just chill and explore each other's rooms.”", chips: ["Highest reward", "Easiest to use"] },
    "3-false-false": { mode: "Study mode B · three objects, no clock", h: "The explorer", win: "Highest overall engagement — more to track, with no pressure to rush it.", q: "Players stayed absorbed without the stopwatch.", chips: ["Highest engagement"] },
    "3-true-true": { mode: "Study mode C · three objects, swapping, timer", h: "Cat-and-mouse", win: "Most fun and the deepest immersion — and the hardest to learn. The eye-tracker showed frantic, long saccades: alertness, urgency.", q: "“If I see them getting close, I'll just reassign the target. It felt a bit sneaky, but that was the point.”", chips: ["Most fun", "Deepest immersion", "Hardest to learn"] }
  };
  var out = $("#dialOut"), hintEl = $("#dialHint");
  function renderDial(msg) {
    $$("#dialObjects button").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-v") === dial.objects)); });
    var ti = $("#dialTimer"), sw = $("#dialSwap");
    if (ti) ti.checked = dial.timer; if (sw) sw.checked = dial.swap;
    if (hintEl) hintEl.textContent = msg || "";
    if (!out) return;
    var o = OUT[dial.objects + "-" + dial.timer + "-" + dial.swap];
    out.classList.toggle("untested", !o);
    out.innerHTML = o
      ? '<p class="mode">' + o.mode + '</p><h3>' + o.h + '</h3><p class="win">' + o.win + '</p><p class="q">' + o.q + '</p><div class="meta" style="margin-top:18px;display:flex;flex-wrap:wrap;gap:8px">' +
        o.chips.map(function (c) { return '<span class="t-chip">' + c + "</span>"; }).join("") + "</div>"
      : '<p class="mode">Not one of our three study modes</p><h3>Untested — that\'s your playtest</h3><p class="win">We tested one object with no clock, three objects with no clock, and three objects with swapping and a timer. This combination is yours to find out.</p><p class="q">Which is the point: expose the dial, and let players pick.</p>';
  }
  $$("#dialObjects button").forEach(function (b) {
    b.addEventListener("click", function () {
      dial.objects = +b.getAttribute("data-v");
      var m = "";
      if (dial.objects === 1 && dial.swap) { dial.swap = false; m = "Swapping needs clones to swap between, so it switched off."; }
      renderDial(m);
    });
  });
  var ti = $("#dialTimer"), sw = $("#dialSwap");
  if (ti) ti.addEventListener("change", function () { dial.timer = ti.checked; renderDial(); });
  if (sw) sw.addEventListener("change", function () {
    dial.swap = sw.checked; var m = "";
    if (dial.swap && dial.objects === 1) { dial.objects = 3; m = "Swapping needs clones — switched to three objects."; }
    renderDial(m);
  });
  renderDial();

  /* ---------------------------------------------------------------- 8 */
  $$(".t-rcard .share").forEach(function (b) {
    b.addEventListener("click", function () {
      var card = b.closest(".t-rcard"), n = card.id.replace("rule-", ""), text = card.querySelector("h3").textContent.trim();
      var url = location.origin + location.pathname + "#" + card.id;
      var line = "Rule " + n + ": “" + text + "” — Dr. Yasas Sri Wickramasinghe, Designing Shared Worlds Across Distance (NZGDC 2026)";
      var done = function () { var o = b.innerHTML; b.textContent = "Link copied ✓"; setTimeout(function () { b.innerHTML = o; }, 1800); };
      if (navigator.share) { navigator.share({ title: "Designing Shared Worlds Across Distance — rule " + n, text: line, url: url }).catch(function () {}); }
      else if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(line + " " + url).then(done, function () {});
      if (window.gtag) window.gtag("event", "share_rule", { event_category: "nzgdc2026", rule: n });
    });
  });

  /* ---------------------------------------------------------------- 9 */
  var slidesBtn = $("#slidesBtn"), slidesState = $("#slidesState");
  function slidesText(s) {
    return s === "after"
      ? "The slides are on their way. Leave your email below and I'll send them the moment they're up."
      : "The slides go live here straight after the talk on 1 October — this button switches on by itself.";
  }
  if (slidesState) slidesState.textContent = slidesText(state(Date.now()));
  if (slidesBtn && window.fetch && location.protocol.indexOf("http") === 0) {
    fetch(SLIDES_URL, { method: "HEAD", cache: "no-store" }).then(function (r) {
      if (!r.ok) return;
      slidesBtn.href = SLIDES_URL; slidesBtn.removeAttribute("aria-disabled"); slidesBtn.setAttribute("download", "");
      slidesBtn.innerHTML = 'Download the slides (PDF) <span class="arrow">↓</span>';
      if (slidesState) slidesState.textContent = "Every slide from the talk, with the speaker notes' key points.";
      $$(".js-slides-link").forEach(function (a) { a.href = SLIDES_URL; a.hidden = false; });
    }).catch(function () {});
  }
  if (RECORDING_YT) {
    var soon = $("#recordingSlot");
    if (soon) {
      soon.outerHTML = '<div class="yt-facade" data-yt="' + RECORDING_YT + '" role="button" tabindex="0" aria-label="Play the NZGDC 2026 talk recording">' +
        '<img src="https://i.ytimg.com/vi/' + RECORDING_YT + '/hqdefault.jpg" alt="NZGDC 2026 talk recording" loading="lazy"/><span class="yt-play-btn" aria-hidden="true"></span></div>';
    }
  }
  $$(".yt-facade").forEach(function (el) {
    function play() {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + el.getAttribute("data-yt") + "?autoplay=1&rel=0";
      f.title = el.getAttribute("aria-label") || "YouTube video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.setAttribute("allowfullscreen", "");
      el.innerHTML = ""; el.appendChild(f); el.style.cursor = "default";
    }
    el.addEventListener("click", play);
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });

  /* ---------------------------------------------------------------- 10 */
  var fb = $("#fbForm"), wrap = $(".t-fb");
  if (fb && wrap) {
    var wantNotes = false, notes = $("#fbNotes");
    fb.addEventListener("submit", function () { wantNotes = !!(notes && notes.checked); });
    fb.addEventListener("enquiry:sent", function (e) {
      wrap.classList.add("is-done");
      var nl = $("#fbNotesLink");
      if (nl && wantNotes) { nl.href = "../app/#/newsletter?email=" + encodeURIComponent(e.detail.email); nl.hidden = false; }
      var th = $(".t-thanks"); if (th) th.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    });
  }
})();

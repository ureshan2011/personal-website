/* ==========================================================================
   Student Voices Globe
   A dependency-free, dotted point-cloud globe rendered on <canvas>.
   - Slowly auto-rotates, seeks the active student's country to face front
   - Drag to spin, hover markers for a tooltip, click a marker to select
   - Region filter pills + prev/next, animated quote card, live stats
   - Respects prefers-reduced-motion (static render, no auto motion)
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.STUDENT_VOICES || [];
  var canvas = document.getElementById("voicesGlobe");
  if (!canvas || !DATA.length) return;

  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- DOM refs ----
  var quoteEl   = document.getElementById("voicesQuote");
  var textEl    = document.getElementById("vqText");
  var nameEl    = document.getElementById("vqName");
  var roleEl    = document.getElementById("vqRole");
  var countryEl = document.getElementById("vqCountry");
  var starsEl   = document.getElementById("vqStars");
  var avatarEl  = document.getElementById("vqAvatar");
  var filtersEl = document.getElementById("voicesFilters");
  var tooltipEl = document.getElementById("voicesTooltip");
  var srListEl  = document.getElementById("voicesSrList");
  var prevBtn   = document.getElementById("vPrev");
  var nextBtn   = document.getElementById("vNext");

  // ---- palette ----
  var DOT = "110,160,255";          // base globe dots
  var MARK = "120,170,255";         // resting marker
  var ACTIVE = "47,107,255";        // active marker / brand accent
  var REGION_TINT = {
    "Asia":        ["#2f6bff", "#6ea0ff"],
    "Oceania":     ["#13b4a0", "#5fe0c8"],
    "Europe":      ["#7b5bff", "#b39bff"],
    "Americas":    ["#ff7d54", "#ffb38a"],
    "Africa":      ["#f5a623", "#ffce6b"],
    "Middle East": ["#e7568a", "#ff9bbf"]
  };

  // ---- geometry / view state ----
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cx = 0, cy = 0, R = 0;
  var rotation = 0, tilt = 0.35;          // current orientation (radians)
  var targetRot = 0, targetTilt = 0.35;   // where we're easing toward
  var seeking = false;                     // currently spinning to a country
  var dragging = false, dragDist = 0;
  var lastX = 0, lastY = 0, lastInteract = -1e9, lastActivate = 0;
  var running = false, rafId = 0, lastTs = 0;

  var DRIFT = 0.13;        // idle rotation speed (rad/s)
  var DWELL = 4800;        // ms a country stays centered before auto-advance
  var RESUME = 9000;       // ms after a user interaction before auto motion resumes
  var EASE = 0.09;         // seek easing per frame

  // ---- build the dotted sphere (Fibonacci distribution) ----
  var N = 1500;
  var bx = new Float32Array(N), by = new Float32Array(N), bz = new Float32Array(N);
  (function buildSphere() {
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * golden;
      bx[i] = Math.cos(th) * r;
      by[i] = y;
      bz[i] = Math.sin(th) * r;
    }
  })();

  // ---- group testimonials into country markers ----
  var countries = [];
  var byCode = {};
  DATA.forEach(function (d, idx) {
    var c = byCode[d.code];
    if (!c) {
      c = byCode[d.code] = {
        code: d.code, name: d.country, region: d.region,
        lat: d.lat, lng: d.lng, indices: []
      };
      countries.push(c);
    }
    c.indices.push(idx);
  });

  // ---- regions + filter pool ----
  var regions = [];
  DATA.forEach(function (d) { if (regions.indexOf(d.region) === -1) regions.push(d.region); });
  var activeFilter = "all";
  var pool = DATA.map(function (_, i) { return i; });
  var activeIndex = 0;

  function rebuildPool() {
    pool = DATA.map(function (_, i) { return i; }).filter(function (i) {
      return activeFilter === "all" || DATA[i].region === activeFilter;
    });
    if (pool.indexOf(activeIndex) === -1 && pool.length) activate(pool[0]);
  }

  // ---- math: rotate a unit vector and project (orthographic) ----
  var cr = 1, sr = 0, cti = Math.cos(tilt), sti = Math.sin(tilt);
  function refreshTrig() { cr = Math.cos(rotation); sr = Math.sin(rotation); cti = Math.cos(tilt); sti = Math.sin(tilt); }

  function vec(lat, lng) {
    var phi = lat * Math.PI / 180, th = lng * Math.PI / 180;
    return [Math.cos(phi) * Math.sin(th), Math.sin(phi), Math.cos(phi) * Math.cos(th)];
  }
  function rot3(x, y, z) {
    var x1 = x * cr + z * sr;
    var z1 = -x * sr + z * cr;
    var y2 = y * cti - z1 * sti;
    var z2 = y * sti + z1 * cti;
    return [x1, y2, z2]; // camera at +z; z2>0 => front facing
  }

  // ---- sizing ----
  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    cx = W / 2; cy = H / 2;
    R = Math.min(W, H) / 2 * 0.82;
    draw(performance.now());
  }

  // ---- render ----
  function draw(now) {
    refreshTrig();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // atmosphere glow
    var atmo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.32);
    atmo.addColorStop(0, "rgba(" + DOT + ",0.18)");
    atmo.addColorStop(1, "rgba(" + DOT + ",0)");
    ctx.fillStyle = atmo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.32, 0, 6.2832); ctx.fill();

    // sphere body
    var body = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.34, R * 0.15, cx, cy, R);
    body.addColorStop(0, "rgba(34,68,140,0.55)");
    body.addColorStop(0.7, "rgba(13,28,66,0.7)");
    body.addColorStop(1, "rgba(6,13,31,0.92)");
    ctx.fillStyle = body;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();

    // dotted surface
    for (var i = 0; i < N; i++) {
      var p = rot3(bx[i], by[i], bz[i]);
      var depth = (p[2] + 1) / 2;                 // 0 back .. 1 front
      var a = 0.10 + depth * depth * 0.55;
      var s = 0.5 + depth * 1.5;
      ctx.globalAlpha = a;
      ctx.fillStyle = "rgb(" + DOT + ")";
      ctx.fillRect(cx + p[0] * R - s / 2, cy - p[1] * R - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // country markers
    var active = DATA[activeIndex];
    for (var m = 0; m < countries.length; m++) {
      var c = countries[m];
      var v = vec(c.lat, c.lng);
      var pp = rot3(v[0], v[1], v[2]);
      if (pp[2] <= 0.02) continue;                 // back of globe
      var sx = cx + pp[0] * R, sy = cy - pp[1] * R;
      var isActive = active && c.code === active.code;
      var depth = (pp[2] + 1) / 2;
      var size = (isActive ? 4.2 : 2.6) * (0.7 + depth * 0.5);
      var tint = REGION_TINT[c.region] || [ "#2f6bff", "#6ea0ff" ];

      // halo
      var halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4.5);
      halo.addColorStop(0, hexA(tint[1], isActive ? 0.7 : 0.4));
      halo.addColorStop(1, hexA(tint[1], 0));
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(sx, sy, size * 4.5, 0, 6.2832); ctx.fill();

      // pulsing ring on active (skip when reduced motion)
      if (isActive && !reduced) {
        var t = (now % 1600) / 1600;
        ctx.globalAlpha = (1 - t) * 0.8;
        ctx.strokeStyle = tint[1];
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(sx, sy, size + t * 22, 0, 6.2832); ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // core
      ctx.fillStyle = isActive ? tint[0] : hexA(tint[1], 0.9);
      ctx.beginPath(); ctx.arc(sx, sy, size, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = isActive ? 1.6 : 0.8;
      ctx.stroke();

      c._sx = sx; c._sy = sy; c._front = true;     // cache for hit-testing
    }
    // mark off-screen markers as not hittable
    for (var k = 0; k < countries.length; k++) {
      var cc = countries[k];
      var vv = rot3.apply(null, vec(cc.lat, cc.lng));
      cc._front = vv[2] > 0.02;
    }
  }

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }

  // ---- animation loop ----
  function angDiff(a, b) {
    var d = (a - b) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    return d;
  }

  function frame(ts) {
    if (!running) return;
    var dt = Math.min(0.05, (ts - lastTs) / 1000 || 0);
    lastTs = ts;

    if (!dragging) {
      if (seeking) {
        rotation += angDiff(targetRot, rotation) * EASE;
        if (Math.abs(angDiff(targetRot, rotation)) < 0.01) { rotation = targetRot; seeking = false; }
      } else if (!reduced && (ts - lastInteract) > RESUME) {
        rotation += DRIFT * dt;          // idle drift
        targetRot = rotation;
      }
      tilt += (targetTilt - tilt) * EASE;
    }

    // auto-advance to the next student once a country has dwelled
    if (!reduced && !seeking && !dragging &&
        (ts - lastInteract) > RESUME && (ts - lastActivate) > DWELL) {
      next(true);
    }

    draw(ts);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduced) { draw(performance.now()); return; }
    running = true; lastTs = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); }

  // ---- selection / quote card ----
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (s) { return s[0]; }).join("").toUpperCase();
  }
  function stars(rating) {
    var full = Math.floor(rating), half = rating - full >= 0.5;
    var s = "";
    for (var i = 0; i < 5; i++) s += (i < full ? "★" : (i === full && half ? "★" : "☆"));
    return s;
  }

  function paint() {
    var d = DATA[activeIndex];
    var tint = REGION_TINT[d.region] || [ "#2f6bff", "#6ea0ff" ];
    textEl.textContent = "“" + d.quote + "”";
    nameEl.textContent = d.name;
    roleEl.textContent = d.program;
    countryEl.textContent = d.country;
    starsEl.textContent = stars(d.rating);
    avatarEl.textContent = initials(d.name);
    avatarEl.style.background = "linear-gradient(135deg," + tint[0] + "," + tint[1] + ")";
    canvas.setAttribute("aria-label",
      "Globe showing " + countries.length + " countries. Currently: " + d.name + " from " + d.country);
  }

  function activate(index, isAuto) {
    activeIndex = index;
    lastActivate = performance.now();
    var d = DATA[index];
    targetRot = -d.lng * Math.PI / 180;
    targetTilt = Math.max(-0.6, Math.min(0.6, d.lat * Math.PI / 180));
    if (reduced) { rotation = targetRot; tilt = targetTilt; seeking = false; }
    else { seeking = true; }

    // animated card swap
    if (quoteEl) {
      quoteEl.classList.add("is-swapping");
      setTimeout(function () { paint(); quoteEl.classList.remove("is-swapping"); }, 240);
    } else { paint(); }

    if (reduced) draw(performance.now());
  }

  function next(isAuto) {
    var pos = pool.indexOf(activeIndex);
    activate(pool[(pos + 1) % pool.length], isAuto);
  }
  function prev() {
    var pos = pool.indexOf(activeIndex);
    activate(pool[(pos - 1 + pool.length) % pool.length]);
  }

  // ---- build filter pills ----
  function buildFilters() {
    if (!filtersEl) return;
    var mk = function (label, value) {
      var b = document.createElement("button");
      b.className = "vfilter" + (value === activeFilter ? " active" : "");
      b.type = "button";
      b.textContent = label;
      b.setAttribute("data-filter", value);
      b.addEventListener("click", function () {
        activeFilter = value;
        filtersEl.querySelectorAll(".vfilter").forEach(function (el) {
          el.classList.toggle("active", el.getAttribute("data-filter") === value);
        });
        lastInteract = performance.now();
        rebuildPool();
      });
      return b;
    };
    filtersEl.appendChild(mk("All", "all"));
    regions.forEach(function (r) { filtersEl.appendChild(mk(r, r)); });
  }

  // ---- screen-reader / no-JS list ----
  function buildSrList() {
    if (!srListEl) return;
    DATA.forEach(function (d) {
      var li = document.createElement("li");
      li.textContent = "“" + d.quote + "” — " + d.name + ", " + d.program + " (" + d.country + ")";
      srListEl.appendChild(li);
    });
  }

  // ---- pointer interaction ----
  function pickMarker(px, py) {
    var best = null, bestD = 18 * 18;
    for (var i = 0; i < countries.length; i++) {
      var c = countries[i];
      if (!c._front || c._sx == null) continue;
      var dx = px - c._sx, dy = py - c._sy, dd = dx * dx + dy * dy;
      if (dd < bestD) { bestD = dd; best = c; }
    }
    return best;
  }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    var px = e.clientX - rect.left, py = e.clientY - rect.top;
    if (dragging) {
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      dragDist += Math.abs(dx) + Math.abs(dy);
      rotation += dx * 0.006;
      tilt = Math.max(-0.9, Math.min(0.9, tilt + dy * 0.005));
      targetRot = rotation; targetTilt = tilt; seeking = false;
      lastX = e.clientX; lastY = e.clientY; lastInteract = performance.now();
      if (reduced) draw(performance.now());
      return;
    }
    var hit = pickMarker(px, py);
    if (hit && tooltipEl) {
      tooltipEl.textContent = hit.name + " · " + hit.indices.length + (hit.indices.length > 1 ? " students" : " student");
      tooltipEl.style.left = hit._sx + "px";
      tooltipEl.style.top = hit._sy + "px";
      tooltipEl.classList.add("show");
      canvas.style.cursor = "pointer";
    } else if (tooltipEl) {
      tooltipEl.classList.remove("show");
      canvas.style.cursor = "grab";
    }
  }

  function onDown(e) {
    dragging = true; dragDist = 0;
    lastX = e.clientX; lastY = e.clientY; lastInteract = performance.now();
    seeking = false;
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
  }
  function onUp(e) {
    if (!dragging) return;
    dragging = false; lastInteract = performance.now();
    if (dragDist < 6) {                          // treat as a click
      var rect = canvas.getBoundingClientRect();
      var hit = pickMarker(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) {
        var pos = hit.indices.indexOf(activeIndex);
        activate(hit.indices[(pos + 1) % hit.indices.length]);  // cycle within country
      }
    }
  }

  // ---- wire up ----
  buildFilters();
  buildSrList();
  activate(0);
  paint();
  resize();

  if (prevBtn) prevBtn.addEventListener("click", function () { lastInteract = performance.now(); prev(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { lastInteract = performance.now(); next(); });

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerleave", function () { if (tooltipEl) tooltipEl.classList.remove("show"); });

  if ("ResizeObserver" in window) { new ResizeObserver(resize).observe(canvas); }
  else { window.addEventListener("resize", resize); }

  // start/stop with visibility to save battery
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) start(); else stop(); });
    }, { threshold: 0.05 });
    io.observe(canvas);
  } else {
    start();
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else if (!reduced) start();
  });
})();

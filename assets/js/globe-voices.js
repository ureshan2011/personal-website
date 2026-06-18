/* ==========================================================================
   Student Voices Globe  —  Anthropic-inspired editorial styling
   A dependency-free, dotted point-cloud globe rendered on <canvas>.
   - Slowly auto-rotates; seeks the active voice's country to face front
   - Drag to spin, hover markers for a tooltip, click a marker to select
   - Region filter pills + prev/next, animated quote card, live stats
   - Markers sized by number of respondents, coloured by sentiment
       sage  #788c5d  = "Loved it"  (avg rating >= 4.75)
       sky   #6a9bcc  = "Positive"  (avg rating <  4.75)
     the active country is ringed in coral #d97757
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
  var labelEl   = document.getElementById("vqStars");   // repurposed: sentiment label
  var dotEl     = document.getElementById("vqAvatar");  // repurposed: sentiment dot
  var filtersEl = document.getElementById("voicesFilters");
  var tooltipEl = document.getElementById("voicesTooltip");
  var srListEl  = document.getElementById("voicesSrList");
  var prevBtn   = document.getElementById("vPrev");
  var nextBtn   = document.getElementById("vNext");

  // ---- palette (Anthropic) ----
  var DOT = "20,20,19";        // ink dots on ivory
  var SENT_POS = "#788c5d";    // sage  — loved it
  var SENT_NEU = "#6a9bcc";    // sky   — positive
  var CORAL = "#d97757";       // active highlight
  function sentiment(r) { return r >= 5 ? { label: "Loved it", color: SENT_POS } : { label: "Positive", color: SENT_NEU }; }

  // ---- view state ----
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cx = 0, cy = 0, R = 0;
  var rotation = 0, tilt = 0.32;
  var targetRot = 0, targetTilt = 0.32;
  var seeking = false, dragging = false, dragDist = 0;
  var lastX = 0, lastY = 0, lastInteract = -1e9, lastActivate = 0;
  var running = false, rafId = 0, lastTs = 0;

  var DRIFT = 0.12, DWELL = 4800, RESUME = 9000, EASE = 0.09;

  // ---- dotted sphere (Fibonacci distribution) ----
  var N = 1500;
  var bx = new Float32Array(N), by = new Float32Array(N), bz = new Float32Array(N);
  (function () {
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * golden;
      bx[i] = Math.cos(th) * r; by[i] = y; bz[i] = Math.sin(th) * r;
    }
  })();

  // ---- group testimonials into country markers ----
  var countries = [], byCode = {};
  DATA.forEach(function (d, idx) {
    var c = byCode[d.code];
    if (!c) { c = byCode[d.code] = { code: d.code, name: d.country, region: d.region, lat: d.lat, lng: d.lng, indices: [], sum: 0 }; countries.push(c); }
    c.indices.push(idx); c.sum += d.rating;
  });
  countries.forEach(function (c) {
    c.count = c.indices.length;
    c.avg = c.sum / c.count;
    c.color = c.avg >= 4.75 ? SENT_POS : SENT_NEU;
  });

  // ---- regions + pool ----
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

  // ---- math ----
  var cr = 1, sr = 0, cti = Math.cos(tilt), sti = Math.sin(tilt);
  function refreshTrig() { cr = Math.cos(rotation); sr = Math.sin(rotation); cti = Math.cos(tilt); sti = Math.sin(tilt); }
  function vec(lat, lng) {
    var phi = lat * Math.PI / 180, th = lng * Math.PI / 180;
    return [Math.cos(phi) * Math.sin(th), Math.sin(phi), Math.cos(phi) * Math.cos(th)];
  }
  function rot3(x, y, z) {
    var x1 = x * cr + z * sr, z1 = -x * sr + z * cr;
    var y2 = y * cti - z1 * sti, z2 = y * sti + z1 * cti;
    return [x1, y2, z2];
  }
  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }
  function angDiff(a, b) {
    var d = (a - b) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d;
  }

  // ---- sizing ----
  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    cx = W / 2; cy = H / 2; R = Math.min(W, H) / 2 * 0.82;
    draw(performance.now());
  }

  // ---- render ----
  function draw(now) {
    refreshTrig();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // faint warm halo (atmosphere) — subtle on ivory
    var halo = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.14);
    halo.addColorStop(0, hexA(CORAL, 0.05));
    halo.addColorStop(1, hexA(CORAL, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.14, 0, 6.2832); ctx.fill();

    // sphere body — gentle dimensionality
    var body = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.36, R * 0.1, cx, cy, R);
    body.addColorStop(0, "rgba(255,255,255,0.55)");
    body.addColorStop(0.62, "rgba(212,162,127,0.06)");
    body.addColorStop(1, "rgba(20,20,19,0.085)");
    ctx.fillStyle = body;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();

    // dotted surface
    ctx.fillStyle = "rgb(" + DOT + ")";
    for (var i = 0; i < N; i++) {
      var p = rot3(bx[i], by[i], bz[i]);
      var depth = (p[2] + 1) / 2;
      ctx.globalAlpha = 0.04 + depth * depth * 0.26;
      var s = 0.5 + depth * 1.3;
      ctx.fillRect(cx + p[0] * R - s / 2, cy - p[1] * R - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // markers
    var active = DATA[activeIndex];
    for (var m = 0; m < countries.length; m++) {
      var c = countries[m];
      var v = vec(c.lat, c.lng), pp = rot3(v[0], v[1], v[2]);
      c._front = pp[2] > 0.02;
      if (!c._front) { c._sx = null; continue; }
      var sx = cx + pp[0] * R, sy = cy - pp[1] * R;
      var depth = (pp[2] + 1) / 2;
      var isActive = active && c.code === active.code;
      var size = (2.4 + Math.sqrt(c.count) * 2.2) * (0.72 + depth * 0.5);

      // soft halo in sentiment colour
      var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4);
      g.addColorStop(0, hexA(c.color, isActive ? 0.5 : 0.32));
      g.addColorStop(1, hexA(c.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(sx, sy, size * 4, 0, 6.2832); ctx.fill();

      // active: coral ring (+ pulse unless reduced motion)
      if (isActive) {
        if (!reduced) {
          var t = (now % 1600) / 1600;
          ctx.globalAlpha = (1 - t) * 0.7;
          ctx.strokeStyle = CORAL; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(sx, sy, size + 3 + t * 20, 0, 6.2832); ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.strokeStyle = CORAL; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(sx, sy, size + 5, 0, 6.2832); ctx.stroke();
      }

      // core
      ctx.fillStyle = c.color;
      ctx.beginPath(); ctx.arc(sx, sy, size, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "#faf9f5"; ctx.lineWidth = 1.2;
      ctx.stroke();

      c._sx = sx; c._sy = sy;
    }
  }

  // ---- animation loop ----
  function frame(ts) {
    if (!running) return;
    var dt = Math.min(0.05, (ts - lastTs) / 1000 || 0);
    lastTs = ts;

    if (!dragging) {
      if (seeking) {
        rotation += angDiff(targetRot, rotation) * EASE;
        if (Math.abs(angDiff(targetRot, rotation)) < 0.01) { rotation = targetRot; seeking = false; }
      } else if (!reduced && (ts - lastInteract) > RESUME) {
        rotation += DRIFT * dt; targetRot = rotation;
      }
      tilt += (targetTilt - tilt) * EASE;
    }
    if (!reduced && !seeking && !dragging && (ts - lastInteract) > RESUME && (ts - lastActivate) > DWELL) next(true);

    draw(ts);
    rafId = requestAnimationFrame(frame);
  }
  function start() { if (running || reduced) { draw(performance.now()); return; } running = true; lastTs = performance.now(); rafId = requestAnimationFrame(frame); }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); }

  // ---- quote card ----
  function paint() {
    var d = DATA[activeIndex], s = sentiment(d.rating);
    textEl.textContent = "“" + d.quote + "”";
    nameEl.textContent = d.name;
    roleEl.textContent = d.program;
    countryEl.textContent = d.country;
    labelEl.textContent = s.label;
    labelEl.style.color = s.color;
    dotEl.style.background = s.color;
    dotEl.style.boxShadow = "0 0 0 4px " + hexA(s.color, 0.16);
    canvas.setAttribute("aria-label", "Globe of " + countries.length + " countries. Now showing " + d.name + " from " + d.country + ".");
  }

  function activate(index) {
    activeIndex = index; lastActivate = performance.now();
    var d = DATA[index];
    targetRot = -d.lng * Math.PI / 180;
    targetTilt = Math.max(-0.6, Math.min(0.6, d.lat * Math.PI / 180));
    if (reduced) { rotation = targetRot; tilt = targetTilt; seeking = false; }
    else { seeking = true; }
    if (quoteEl) { quoteEl.classList.add("is-swapping"); setTimeout(function () { paint(); quoteEl.classList.remove("is-swapping"); }, 240); }
    else { paint(); }
    if (reduced) draw(performance.now());
  }
  function next() { var p = pool.indexOf(activeIndex); activate(pool[(p + 1) % pool.length]); }
  function prev() { var p = pool.indexOf(activeIndex); activate(pool[(p - 1 + pool.length) % pool.length]); }

  // ---- filters ----
  function buildFilters() {
    if (!filtersEl) return;
    var mk = function (label, value) {
      var b = document.createElement("button");
      b.className = "vfilter" + (value === activeFilter ? " active" : "");
      b.type = "button"; b.textContent = label; b.setAttribute("data-filter", value);
      b.addEventListener("click", function () {
        activeFilter = value;
        filtersEl.querySelectorAll(".vfilter").forEach(function (el) { el.classList.toggle("active", el.getAttribute("data-filter") === value); });
        lastInteract = performance.now(); rebuildPool();
      });
      return b;
    };
    filtersEl.appendChild(mk("All", "all"));
    regions.forEach(function (r) { filtersEl.appendChild(mk(r, r)); });
  }

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
    var best = null, bestD = 20 * 20;
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
      rotation += dx * 0.006; tilt = Math.max(-0.9, Math.min(0.9, tilt + dy * 0.005));
      targetRot = rotation; targetTilt = tilt; seeking = false;
      lastX = e.clientX; lastY = e.clientY; lastInteract = performance.now();
      if (reduced) draw(performance.now());
      return;
    }
    var hit = pickMarker(px, py);
    if (hit && tooltipEl) {
      tooltipEl.textContent = hit.name + " · " + hit.count + (hit.count > 1 ? " voices" : " voice");
      tooltipEl.style.left = hit._sx + "px"; tooltipEl.style.top = hit._sy + "px";
      tooltipEl.classList.add("show"); canvas.style.cursor = "pointer";
    } else if (tooltipEl) { tooltipEl.classList.remove("show"); canvas.style.cursor = "grab"; }
  }
  function onDown(e) {
    dragging = true; dragDist = 0; lastX = e.clientX; lastY = e.clientY;
    lastInteract = performance.now(); seeking = false;
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
  }
  function onUp(e) {
    if (!dragging) return;
    dragging = false; lastInteract = performance.now();
    if (dragDist < 6) {
      var rect = canvas.getBoundingClientRect();
      var hit = pickMarker(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) { var p = hit.indices.indexOf(activeIndex); activate(hit.indices[(p + 1) % hit.indices.length]); }
    }
  }

  // ---- init ----
  buildFilters(); buildSrList(); activate(0); paint(); resize();
  if (prevBtn) prevBtn.addEventListener("click", function () { lastInteract = performance.now(); prev(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { lastInteract = performance.now(); next(); });
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerleave", function () { if (tooltipEl) tooltipEl.classList.remove("show"); });

  if ("ResizeObserver" in window) { new ResizeObserver(resize).observe(canvas); }
  else { window.addEventListener("resize", resize); }

  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) start(); else stop(); });
    }, { threshold: 0.05 });
    io.observe(canvas);
  } else { start(); }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else if (!reduced) start(); });
})();

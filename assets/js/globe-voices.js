/* ==========================================================================
   Student Voices Globe  —  Anthropic-inspired editorial globe
   A geographically accurate, dependency-light globe on <canvas>:
   - Real continents drawn as a dotted land grid (orthographic projection)
   - Faint graticule + country borders, like the "81k interviews" feature
   - The active student's country is filled in coral and ringed
   - Markers per country, sized by number of respondents, coloured by sentiment
       sage  #788c5d  = "Loved it"  (avg rating >= 4.75)
       sky   #6a9bcc  = "Positive"  (avg rating <  4.75)
   - Slowly auto-rotates, seeks the active country to face front
   - Drag to spin, hover markers for a tooltip, click a marker to select
   - Region filter pills + prev/next, animated quote card, live stats
   - Respects prefers-reduced-motion (static render, no auto motion)

   Geography: world-atlas countries (110m) loaded at runtime, projected and
   clipped with d3-geo + topojson-client. Falls back to a wireframe sphere if
   those libraries or the data can't be fetched, so the section is never blank.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.STUDENT_VOICES || [];
  var canvas = document.getElementById("voicesGlobe");
  if (!canvas || !DATA.length) return;

  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HALF_PI = Math.PI / 2;

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
  var INK = "20,20,19";        // ink — land dots / borders on ivory
  var SENT_POS = "#788c5d";    // sage  — loved it
  var SENT_NEU = "#6a9bcc";    // sky   — positive
  var CORAL = "#d97757";       // active highlight
  function sentiment(r) { return r >= 5 ? { label: "Loved it", color: SENT_POS } : { label: "Positive", color: SENT_NEU }; }

  // ---- view state (degrees: lambda = longitude spin, phi = tilt) ----
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cx = 0, cy = 0, R = 0;
  var lambda = -20, phi = -12;
  var targetLambda = -20, targetPhi = -12;
  var seeking = false, dragging = false, dragDist = 0;
  var lastX = 0, lastY = 0, lastInteract = -1e9, lastActivate = 0;
  var running = false, rafId = 0, lastTs = 0;
  var DRIFT = 6.5, DWELL = 4800, RESUME = 9000, EASE = 0.085;  // DRIFT in deg/sec

  // ---- geography (filled in once world-atlas loads) ----
  var ready = false, geoFailed = false;
  var projection = null, path = null;
  var graticule = null, borders = null, sphere = { type: "Sphere" };
  var landDots = [];                 // [lng, lat] points that fall on land
  var featureByName = {};            // country name -> GeoJSON feature
  var activeFeature = null;

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

  // ---- small helpers ----
  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }
  function angDiffDeg(a, b) {
    var d = (a - b) % 360;
    if (d > 180) d -= 360; if (d < -180) d += 360; return d;
  }
  // angular distance (radians) between a [lng,lat] point and the view centre
  function geoDist(lng, lat, clng, clat) {
    var a = lat * Math.PI / 180, b = clat * Math.PI / 180;
    var dl = (lng - clng) * Math.PI / 180;
    var c = Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(dl);
    return Math.acos(Math.max(-1, Math.min(1, c)));
  }

  // ---- sizing ----
  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    cx = W / 2; cy = H / 2; R = Math.min(W, H) / 2 * 0.94;
    if (projection) projection.scale(R).translate([cx, cy]);
    draw(performance.now());
  }

  // ====================================================================
  //  Geography loading (d3-geo + topojson-client + world-atlas)
  // ====================================================================
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) { if (existing.dataset.loaded) return res(); existing.addEventListener("load", res); existing.addEventListener("error", rej); return; }
      var s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = function () { s.dataset.loaded = "1"; res(); };
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function ensureLibs() {
    var topo = window.topojson ? Promise.resolve() : loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
    var d3geo = (window.d3 && window.d3.geoOrthographic)
      ? Promise.resolve()
      // d3-geo depends on d3-array's Adder, so it must load first
      : (window.d3 && window.d3.Adder ? Promise.resolve() : loadScript("https://cdn.jsdelivr.net/npm/d3-array@3/dist/d3-array.min.js"))
          .then(function () { return loadScript("https://cdn.jsdelivr.net/npm/d3-geo@3/dist/d3-geo.min.js"); });
    return Promise.all([topo, d3geo]);
  }

  // map our testimonial country names onto world-atlas feature names
  var NAME_ALIAS = {
    "united states": "united states of america",
    "united kingdom": "united kingdom",
    "united arab emirates": "united arab emirates"
  };
  function featureFor(name) {
    var key = name.toLowerCase();
    return featureByName[NAME_ALIAS[key] || key] || null;
  }

  function buildLandDots(land, d3) {
    var pts = [];
    for (var lat = -83; lat <= 83; lat += 2.6) {
      var rad = Math.cos(lat * Math.PI / 180);
      var step = 2.6 / Math.max(0.18, rad);   // keep dot density roughly even
      for (var lng = -180; lng < 180; lng += step) {
        if (d3.geoContains(land, [lng, lat])) pts.push([lng, lat]);
      }
    }
    return pts;
  }

  function setupGeo(world) {
    var d3 = window.d3, topojson = window.topojson;
    var obj = world.objects.countries;
    var fc = topojson.feature(world, obj);
    fc.features.forEach(function (f) {
      var nm = f.properties && f.properties.name;
      if (nm) featureByName[nm.toLowerCase()] = f;
    });
    borders = topojson.mesh(world, obj);                                   // coastlines + borders
    var land = topojson.merge(world, obj.geometries);                      // for containment test
    graticule = d3.geoGraticule10();

    projection = d3.geoOrthographic().rotate([lambda, phi]).scale(R || 200).translate([cx || 0, cy || 0]).precision(0.4);
    path = d3.geoPath(projection, ctx);

    landDots = buildLandDots(land, d3);
    activeFeature = featureFor(DATA[activeIndex].country);
    ready = true;
  }

  function loadGeo() {
    ensureLibs()
      .then(function () { return fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"); })
      .then(function (r) { if (!r.ok) throw new Error("geo " + r.status); return r.json(); })
      .then(function (world) { setupGeo(world); resize(); draw(performance.now()); })
      .catch(function (err) { geoFailed = true; if (window.console) console.warn("Globe geography unavailable, using wireframe fallback.", err); draw(performance.now()); });
  }

  // ====================================================================
  //  Rendering
  // ====================================================================
  function draw(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (R <= 0) return;

    // warm atmospheric halo
    var halo = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.16);
    halo.addColorStop(0, hexA(CORAL, 0.05));
    halo.addColorStop(1, hexA(CORAL, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, 6.2832); ctx.fill();

    // sphere body — gentle dimensionality (top-left light)
    var body = ctx.createRadialGradient(cx - R * 0.34, cy - R * 0.38, R * 0.1, cx, cy, R);
    body.addColorStop(0, "rgba(255,255,255,0.7)");
    body.addColorStop(0.6, "rgba(212,162,127,0.05)");
    body.addColorStop(1, "rgba(20,20,19,0.07)");
    ctx.fillStyle = body;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();

    if (ready) drawGeo(now); else drawFallback(now);

    // crisp sphere edge
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832);
    ctx.strokeStyle = hexA(INK, 0.16); ctx.lineWidth = 1; ctx.stroke();
  }

  function drawGeo(now) {
    projection.rotate([lambda, phi]).scale(R).translate([cx, cy]);
    var clng = -lambda, clat = -phi;

    // clip everything to the sphere disc
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();

    // graticule
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = hexA(INK, 0.06); ctx.lineWidth = 0.6; ctx.stroke();

    // dotted land
    ctx.fillStyle = "rgb(" + INK + ")";
    for (var i = 0; i < landDots.length; i++) {
      var p = landDots[i];
      var dist = geoDist(p[0], p[1], clng, clat);
      if (dist > HALF_PI - 0.015) continue;
      var xy = projection(p); if (!xy) continue;
      var cosD = Math.cos(dist);            // 1 at centre → 0 at horizon
      ctx.globalAlpha = 0.1 + cosD * 0.45;
      var s = 0.55 + cosD * 1.25;
      ctx.fillRect(xy[0] - s / 2, xy[1] - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // country borders
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = hexA(INK, 0.14); ctx.lineWidth = 0.6; ctx.stroke();

    // active country fill + outline (coral)
    if (activeFeature) {
      ctx.beginPath(); path(activeFeature);
      ctx.fillStyle = hexA(CORAL, 0.22); ctx.fill();
      ctx.strokeStyle = CORAL; ctx.lineWidth = 1.1; ctx.stroke();
    }

    drawMarkers(now, clng, clat);
    ctx.restore();
  }

  // wireframe fallback if libraries/data are unavailable
  var fbDots = null;
  function buildFallbackDots() {
    var N = 1400, golden = Math.PI * (3 - Math.sqrt(5));
    fbDots = new Float32Array(N * 2);
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = i * golden;
      fbDots[i * 2] = Math.atan2(Math.sin(th) * r, Math.cos(th) * r) * 180 / Math.PI;  // lng
      fbDots[i * 2 + 1] = Math.asin(y) * 180 / Math.PI;                                 // lat
    }
  }
  function projFallback(lng, lat, clng, clat) {
    // simple orthographic projection (no library)
    var a = lat * Math.PI / 180, b = clat * Math.PI / 180, dl = (lng - clng) * Math.PI / 180;
    var x = Math.cos(a) * Math.sin(dl);
    var y = Math.cos(b) * Math.sin(a) - Math.sin(b) * Math.cos(a) * Math.cos(dl);
    return [cx + x * R, cy - y * R];
  }
  function drawFallback(now) {
    if (!fbDots) buildFallbackDots();
    var clng = -lambda, clat = -phi;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
    ctx.fillStyle = "rgb(" + INK + ")";
    for (var i = 0; i < fbDots.length; i += 2) {
      var dist = geoDist(fbDots[i], fbDots[i + 1], clng, clat);
      if (dist > HALF_PI - 0.01) continue;
      var xy = projFallback(fbDots[i], fbDots[i + 1], clng, clat);
      var cosD = Math.cos(dist);
      ctx.globalAlpha = 0.05 + cosD * cosD * 0.28;
      var s = 0.5 + cosD * 1.3;
      ctx.fillRect(xy[0] - s / 2, xy[1] - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    drawMarkersFallback(now, clng, clat);
    ctx.restore();
  }

  function drawMarkers(now, clng, clat) {
    var active = DATA[activeIndex];
    for (var m = 0; m < countries.length; m++) {
      var c = countries[m];
      var dist = geoDist(c.lng, c.lat, clng, clat);
      if (dist > HALF_PI - 0.01) { c._sx = null; continue; }
      var xy = projection([c.lng, c.lat]); if (!xy) { c._sx = null; continue; }
      paintMarker(c, xy[0], xy[1], Math.cos(dist), active, now);
    }
  }
  function drawMarkersFallback(now, clng, clat) {
    var active = DATA[activeIndex];
    for (var m = 0; m < countries.length; m++) {
      var c = countries[m];
      var dist = geoDist(c.lng, c.lat, clng, clat);
      if (dist > HALF_PI - 0.01) { c._sx = null; continue; }
      var xy = projFallback(c.lng, c.lat, clng, clat);
      paintMarker(c, xy[0], xy[1], Math.cos(dist), active, now);
    }
  }
  function paintMarker(c, sx, sy, cosD, active, now) {
    var isActive = active && c.code === active.code;
    var size = (2.4 + Math.sqrt(c.count) * 2.2) * (0.72 + cosD * 0.45);

    var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4);
    g.addColorStop(0, hexA(c.color, isActive ? 0.5 : 0.3));
    g.addColorStop(1, hexA(c.color, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, sy, size * 4, 0, 6.2832); ctx.fill();

    if (isActive && !reduced) {
      var t = (now % 1600) / 1600;
      ctx.globalAlpha = (1 - t) * 0.7;
      ctx.strokeStyle = CORAL; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(sx, sy, size + 3 + t * 20, 0, 6.2832); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (isActive) {
      ctx.strokeStyle = CORAL; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(sx, sy, size + 5, 0, 6.2832); ctx.stroke();
    }
    ctx.fillStyle = c.color;
    ctx.beginPath(); ctx.arc(sx, sy, size, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = "#faf9f5"; ctx.lineWidth = 1.2; ctx.stroke();

    c._sx = sx; c._sy = sy;
  }

  // ====================================================================
  //  Animation loop
  // ====================================================================
  function frame(ts) {
    if (!running) return;
    var dt = Math.min(0.05, (ts - lastTs) / 1000 || 0);
    lastTs = ts;

    if (!dragging) {
      if (seeking) {
        lambda += angDiffDeg(targetLambda, lambda) * EASE;
        phi += (targetPhi - phi) * EASE;
        if (Math.abs(angDiffDeg(targetLambda, lambda)) < 0.4 && Math.abs(targetPhi - phi) < 0.4) {
          lambda = targetLambda; phi = targetPhi; seeking = false;
        }
      } else if (!reduced && (ts - lastInteract) > RESUME) {
        lambda -= DRIFT * dt; targetLambda = lambda;
        phi += (targetPhi - phi) * EASE;
      } else {
        phi += (targetPhi - phi) * EASE;
      }
      lambda = ((lambda + 180) % 360 + 360) % 360 - 180;
    }
    if (!reduced && !seeking && !dragging && (ts - lastInteract) > RESUME && (ts - lastActivate) > DWELL) next();

    draw(ts);
    rafId = requestAnimationFrame(frame);
  }
  function start() { if (running || reduced) { draw(performance.now()); return; } running = true; lastTs = performance.now(); rafId = requestAnimationFrame(frame); }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); }

  // ====================================================================
  //  Quote card + selection
  // ====================================================================
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
    targetLambda = -d.lng;
    targetPhi = Math.max(-62, Math.min(62, -d.lat));
    activeFeature = ready ? featureFor(d.country) : null;
    if (reduced) { lambda = targetLambda; phi = targetPhi; seeking = false; }
    else { seeking = true; }
    if (quoteEl) { quoteEl.classList.add("is-swapping"); setTimeout(function () { paint(); quoteEl.classList.remove("is-swapping"); }, 240); }
    else { paint(); }
    if (reduced) draw(performance.now());
  }
  function next() { var p = pool.indexOf(activeIndex); activate(pool[(p + 1) % pool.length]); }
  function prev() { var p = pool.indexOf(activeIndex); activate(pool[(p - 1 + pool.length) % pool.length]); }

  // ====================================================================
  //  Filters + a11y list
  // ====================================================================
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

  // ====================================================================
  //  Pointer interaction
  // ====================================================================
  function pickMarker(px, py) {
    var best = null, bestD = 22 * 22;
    for (var i = 0; i < countries.length; i++) {
      var c = countries[i];
      if (c._sx == null) continue;
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
      lambda -= dx * 0.3; phi = Math.max(-82, Math.min(82, phi + dy * 0.3));
      targetLambda = lambda; targetPhi = phi; seeking = false;
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

  // ====================================================================
  //  Init
  // ====================================================================
  buildFilters(); buildSrList(); activate(0); paint(); resize();
  loadGeo();

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

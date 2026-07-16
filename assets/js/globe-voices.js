/* ==========================================================================
   Student Voices Globe  —  Anthropic-inspired editorial globe
   A geographically accurate, dependency-light globe on <canvas>:
   - Real continents: a soft land fill, faint graticule + country borders,
     in the spirit of the "81k interviews" feature (no land-texture dots)
   - One blue marker per country, sized by number of students from there
   - The active student's country is filled in coral and ringed
   - Slowly auto-rotates, seeks the active country to face front
   - Drag to spin, hover markers for a tooltip, click a marker to select
   - Prev/next, animated quote card, live stats
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
  var dotEl     = document.getElementById("vqAvatar");  // small blue accent dot
  var tooltipEl = document.getElementById("voicesTooltip");
  var srListEl  = document.getElementById("voicesSrList");
  var prevBtn   = document.getElementById("vPrev");
  var nextBtn   = document.getElementById("vNext");

  // ---- palette (overridable via --globe-* CSS custom properties on the canvas) ----
  var cssPalette = getComputedStyle(canvas);
  var INK = cssPalette.getPropertyValue("--globe-ink").trim() || "20,20,19";          // rgb triplet — land fill / borders on ivory
  var MARKER = cssPalette.getPropertyValue("--globe-marker").trim() || "#6a9bcc";     // every student marker is the same blue
  var CORAL = cssPalette.getPropertyValue("--globe-active").trim() || "#d97757";      // active student's country highlight

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
  var graticule = null, borders = null, land = null;
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
    c.color = MARKER;
  });

  // ---- playback pool (every voice, cycled in order) ----
  var pool = DATA.map(function (_, i) { return i; });
  var activeIndex = 0;

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

  function setupGeo(world) {
    var d3 = window.d3, topojson = window.topojson;
    var obj = world.objects.countries;
    var fc = topojson.feature(world, obj);
    fc.features.forEach(function (f) {
      var nm = f.properties && f.properties.name;
      if (nm) featureByName[nm.toLowerCase()] = f;
    });
    borders = topojson.mesh(world, obj);                  // coastlines + borders
    land = topojson.merge(world, obj.geometries);         // soft continent fill
    graticule = d3.geoGraticule10();

    projection = d3.geoOrthographic().rotate([lambda, phi]).scale(R || 200).translate([cx || 0, cy || 0]).precision(0.4);
    path = d3.geoPath(projection, ctx);

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

    // soft continent fill so land reads against the ocean
    if (land) {
      ctx.beginPath(); path(land);
      ctx.fillStyle = hexA(INK, 0.055); ctx.fill();
    }

    // graticule
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = hexA(INK, 0.06); ctx.lineWidth = 0.6; ctx.stroke();

    // country borders / coastlines
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = hexA(INK, 0.2); ctx.lineWidth = 0.6; ctx.stroke();

    // active country fill + outline (coral)
    if (activeFeature) {
      ctx.beginPath(); path(activeFeature);
      ctx.fillStyle = hexA(CORAL, 0.22); ctx.fill();
      ctx.strokeStyle = CORAL; ctx.lineWidth = 1.1; ctx.stroke();
    }

    drawMarkers(now, clng, clat);
    ctx.restore();
  }

  // wireframe fallback (lat/long grid only — no dots) if libraries/data fail
  function projFallback(lng, lat, clng, clat) {
    var a = lat * Math.PI / 180, b = clat * Math.PI / 180, dl = (lng - clng) * Math.PI / 180;
    var x = Math.cos(a) * Math.sin(dl);
    var y = Math.cos(b) * Math.sin(a) - Math.sin(b) * Math.cos(a) * Math.cos(dl);
    return [cx + x * R, cy - y * R];
  }
  function strokeGridLine(coords, clng, clat) {
    ctx.beginPath();
    var pen = false;
    for (var i = 0; i < coords.length; i++) {
      var lng = coords[i][0], lat = coords[i][1];
      if (geoDist(lng, lat, clng, clat) > HALF_PI - 0.01) { pen = false; continue; }
      var xy = projFallback(lng, lat, clng, clat);
      if (!pen) { ctx.moveTo(xy[0], xy[1]); pen = true; } else { ctx.lineTo(xy[0], xy[1]); }
    }
    ctx.stroke();
  }
  function drawFallback(now) {
    var clng = -lambda, clat = -phi, lng, lat, line;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
    ctx.strokeStyle = hexA(INK, 0.12); ctx.lineWidth = 0.6;
    for (lng = -180; lng < 180; lng += 30) {        // meridians
      line = []; for (lat = -80; lat <= 80; lat += 4) line.push([lng, lat]);
      strokeGridLine(line, clng, clat);
    }
    for (lat = -60; lat <= 60; lat += 30) {         // parallels
      line = []; for (lng = -180; lng <= 180; lng += 4) line.push([lng, lat]);
      strokeGridLine(line, clng, clat);
    }
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
    var d = DATA[activeIndex];
    textEl.textContent = "“" + d.quote + "”";
    nameEl.textContent = d.name;
    roleEl.textContent = d.program;
    countryEl.textContent = d.country;
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
  //  Screen-reader list
  // ====================================================================
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
  if (dotEl) { dotEl.style.background = MARKER; dotEl.style.boxShadow = "0 0 0 4px " + hexA(MARKER, 0.16); }
  buildSrList(); activate(0); paint(); resize();
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

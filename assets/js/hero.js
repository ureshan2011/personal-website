/* ==========================================================================
   Hero — "Connected Places"
   A particle globe with animated arcs linking remote points: a nod to
   research on location-based AR connecting remote players and places.
   Three.js (WebGL) · GSAP ScrollTrigger (pinned scrub) · SplitText · Lenis
   ========================================================================== */
import * as THREE from "three";

const hero = document.querySelector(".hero-3d");
const canvas = document.getElementById("hero-canvas");
if (!hero || !canvas || !window.gsap) throw new Error("hero: missing deps");

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const IVORY = new THREE.Color(0xf2efe9);
const GOLD = new THREE.Color(0xc9a45c);

/* --------------------------------------------------------------------------
   Smooth scroll (Lenis) driving ScrollTrigger via the GSAP ticker
   -------------------------------------------------------------------------- */
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.style.scrollBehavior = "auto";
  // Anchor links go through Lenis so they respect the pinned hero offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   WebGL scene
   -------------------------------------------------------------------------- */
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
} catch (err) {
  hero.classList.add("no-webgl");
}

const state = { scroll: 0, px: 0, py: 0, mx: 0, my: 0, visible: true };

if (renderer) {
  const isMobile = matchMedia("(max-width: 760px)").matches;
  const POINTS = isMobile ? 1500 : 2600;
  const DUST = isMobile ? 220 : 420;
  const ARCS = isMobile ? 7 : 13;
  const R = 2;

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0, 0, 6);

  const globe = new THREE.Group();
  globe.rotation.x = 0.32;
  scene.add(globe);

  /* Fibonacci-distributed points on a sphere, soft round shader sprites */
  const pos = new Float32Array(POINTS * 3);
  const size = new Float32Array(POINTS);
  const shade = new Float32Array(POINTS);
  const phase = new Float32Array(POINTS);
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINTS; i++) {
    const y = 1 - (i / (POINTS - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = GA * i;
    pos[i * 3] = Math.cos(th) * rad * R;
    pos[i * 3 + 1] = y * R;
    pos[i * 3 + 2] = Math.sin(th) * rad * R;
    const gold = Math.random() < 0.08;
    shade[i] = gold ? 1 : 0;
    size[i] = gold ? 5.5 : 1.9 + Math.random() * 2.1;
    phase[i] = Math.random() * Math.PI * 2;
  }
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pointsGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  pointsGeo.setAttribute("aShade", new THREE.BufferAttribute(shade, 1));
  pointsGeo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));

  const pointsMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uPx: { value: 1 },
      uIvory: { value: IVORY },
      uGold: { value: GOLD },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aShade;
      attribute float aPhase;
      uniform float uTime;
      uniform float uPx;
      varying float vShade;
      varying float vTwinkle;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vTwinkle = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 0.7 + aPhase));
        vShade = aShade;
        gl_PointSize = aSize * uPx * (6.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uIvory;
      uniform vec3 uGold;
      varying float vShade;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.08, d) * vTwinkle * uOpacity;
        if (a < 0.003) discard;
        vec3 col = mix(uIvory * 0.9, uGold, vShade);
        gl_FragColor = vec4(col, a * mix(0.72, 1.0, vShade));
      }`,
  });
  globe.add(new THREE.Points(pointsGeo, pointsMat));

  /* Ambient dust drifting in a wide shell around the globe */
  const dustPos = new Float32Array(DUST * 3);
  const dustSize = new Float32Array(DUST);
  const dustShade = new Float32Array(DUST);
  const dustPhase = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    const r = 3.2 + Math.random() * 5.5;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    dustPos[i * 3] = r * Math.sin(p) * Math.cos(t);
    dustPos[i * 3 + 1] = r * Math.cos(p) * 0.6;
    dustPos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t) - 1.5;
    dustSize[i] = 1.3 + Math.random() * 1.2;
    dustShade[i] = Math.random() < 0.12 ? 1 : 0;
    dustPhase[i] = Math.random() * Math.PI * 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dustSize, 1));
  dustGeo.setAttribute("aShade", new THREE.BufferAttribute(dustShade, 1));
  dustGeo.setAttribute("aPhase", new THREE.BufferAttribute(dustPhase, 1));
  const dustMat = pointsMat.clone();
  dustMat.uniforms.uOpacity.value = 0.5;
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* Arcs: golden flight paths drawing between random surface points */
  const arcs = [];
  const randomOnSphere = () => {
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    return new THREE.Vector3(
      R * Math.sin(p) * Math.cos(t),
      R * Math.cos(p),
      R * Math.sin(p) * Math.sin(t)
    );
  };
  const SEG = 72;
  function buildArcGeometry(geo) {
    const a = randomOnSphere();
    const b = randomOnSphere();
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const lift = 1.15 + (a.distanceTo(b) / (2 * R)) * 0.55;
    mid.setLength(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    geo.setFromPoints(curve.getPoints(SEG));
  }
  for (let i = 0; i < ARCS; i++) {
    const geo = new THREE.BufferGeometry();
    buildArcGeometry(geo);
    const mat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.geometry.setDrawRange(0, 0);
    globe.add(line);
    arcs.push({ line, t: -Math.random() * 1.4, speed: 0.28 + Math.random() * 0.22 });
  }
  const easeInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  function updateArc(arc, dt, fade) {
    arc.t += dt * arc.speed;
    if (arc.t < 0) return;
    const cycle = arc.t % 2.6;
    if (arc.t > 2.6 && cycle < dt * arc.speed * 1.5) {
      buildArcGeometry(arc.line.geometry); // respawn on a new path
      arc.t = cycle;
    }
    let draw, op;
    if (cycle < 1) {            // draw on
      draw = easeInOut(cycle);
      op = Math.min(cycle * 3, 1);
    } else if (cycle < 1.9) {   // hold
      draw = 1;
      op = 1;
    } else {                    // fade out
      draw = 1;
      op = Math.max(1 - (cycle - 1.9) / 0.7, 0);
    }
    arc.line.geometry.setDrawRange(0, Math.floor(draw * SEG) + 1);
    arc.line.material.opacity = 0.72 * op * fade;
  }

  /* Soft golden halo sprite behind the globe */
  const haloCanvas = document.createElement("canvas");
  haloCanvas.width = haloCanvas.height = 256;
  const hctx = haloCanvas.getContext("2d");
  const grad = hctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(201,164,92,0.5)");
  grad.addColorStop(0.4, "rgba(201,164,92,0.16)");
  grad.addColorStop(1, "rgba(201,164,92,0)");
  hctx.fillStyle = grad;
  hctx.fillRect(0, 0, 256, 256);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(haloCanvas),
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    })
  );
  halo.scale.setScalar(7.5);
  halo.position.z = -0.5;
  scene.add(halo);

  /* Layout: globe sits right-of-centre on desktop, behind copy on mobile */
  function layout() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const px = renderer.getPixelRatio() * Math.max(Math.min(h / 900, 1.6), 0.7);
    pointsMat.uniforms.uPx.value = px;
    dustMat.uniforms.uPx.value = px;
    if (w < 760) {
      globe.position.set(0.35, 1.05, -1.4);
      globe.scale.setScalar(0.8);
      halo.position.set(0.35, 1.05, -1.9);
    } else {
      const x = THREE.MathUtils.mapLinear(Math.min(w / h, 2.2), 1, 2.2, 0.6, 1.3);
      globe.position.set(x, 0.1, 0);
      globe.scale.setScalar(1);
      halo.position.set(x, 0.1, -0.5);
    }
  }
  layout();
  window.addEventListener("resize", layout);

  /* Pointer parallax (lerped in the render loop) */
  if (!reduced) {
    hero.addEventListener("pointermove", (e) => {
      state.px = (e.clientX / innerWidth) * 2 - 1;
      state.py = (e.clientY / innerHeight) * 2 - 1;
    });
  }

  /* Pause rendering when the hero is off-screen or the tab is hidden */
  new IntersectionObserver(
    ([entry]) => { state.visible = entry.isIntersecting; },
    { threshold: 0 }
  ).observe(hero);

  const clock = new THREE.Clock();
  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (!state.visible || document.hidden) return;

    state.mx += (state.px - state.mx) * 0.045;
    state.my += (state.py - state.my) * 0.045;

    const p = state.scroll; // 0→1 across the pinned scrub
    globe.rotation.y = t * 0.055 + state.mx * 0.16 + p * 1.1;
    globe.rotation.x = 0.32 + state.my * 0.1 + p * 0.22;
    dust.rotation.y = -t * 0.012;

    camera.position.z = 6 + p * 2.1;
    camera.position.x = state.mx * 0.12;
    camera.position.y = -state.my * 0.08 - p * 0.5;
    camera.lookAt(globe.position.x * (1 - p * 0.4), globe.position.y, 0);

    pointsMat.uniforms.uTime.value = t;
    pointsMat.uniforms.uOpacity.value = 1 - p * 0.8;
    dustMat.uniforms.uTime.value = t;
    halo.material.opacity = 0.85 * (1 - p);

    const arcFade = Math.max(1 - p * 1.6, 0);
    arcs.forEach((a) => updateArc(a, reduced ? 0 : dt, arcFade));

    renderer.render(scene, camera);
  }

  if (reduced) {
    // Static, fully-drawn composition for reduced-motion users
    arcs.forEach((a) => {
      a.line.geometry.setDrawRange(0, SEG + 1);
      a.line.material.opacity = 0.4;
    });
    renderer.render(scene, camera);
  } else {
    gsap.ticker.add(tick);
    gsap.from(globe.scale, { x: 0.82, y: 0.82, z: 0.82, duration: 2.2, ease: "power3.out" });
  }
}

/* --------------------------------------------------------------------------
   Choreography — entrance + pinned scroll scrub
   -------------------------------------------------------------------------- */
const $ = (sel) => hero.querySelector(sel);

if (reduced) {
  gsap.set('[data-hero], .scroll-hint, .hero-canvas', { clearProps: "all" });
} else {
  const els = {
    title: $('[data-hero="title"]'),
    eyebrow: $('[data-hero="eyebrow"]'),
    sub: $('[data-hero="sub"]'),
    actions: Array.from($('[data-hero="actions"]').children),
    meta: Array.from($('[data-hero="meta"]').children),
    hint: $(".scroll-hint"),
  };
  // Pre-hide for the entrance; if JS never runs the page stays fully visible
  gsap.set([canvas, els.title, els.eyebrow, els.sub, ...els.actions, ...els.meta, els.hint], { autoAlpha: 0 });

  document.fonts.ready.then(() => {
    const split = new SplitText(els.title, {
      type: "lines,chars",
      mask: "lines",
      linesClass: "h-line",
    });
    gsap.set(split.chars, { yPercent: 112 });
    gsap.set(els.title, { autoAlpha: 1 });

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(canvas, { autoAlpha: 1, duration: 2.0, ease: "power2.out" }, 0)
      .fromTo(els.eyebrow, { y: 16 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.15)
      .to(
        split.chars,
        { yPercent: 0, duration: 1.15, stagger: { each: 0.013 }, onComplete: () => split.revert() },
        0.3
      )
      .fromTo(els.sub, { y: 26 }, { y: 0, autoAlpha: 1, duration: 1.0 }, 0.95)
      .fromTo(els.actions, { y: 18 }, { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.8 }, 1.1)
      .fromTo(els.meta, { y: 12 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.7 }, 1.25)
      .to(els.hint, { autoAlpha: 1, duration: 1.0 }, 1.5);

    /* Pin the hero and scrub layers out at different parallax rates */
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => { state.scroll = self.progress; },
        },
        defaults: { ease: "none" },
      })
      .to($(".scroll-hint"), { autoAlpha: 0, duration: 0.12 }, 0)
      .to($('[data-hero="title"]'), { yPercent: -42, autoAlpha: 0 }, 0)
      .to($('[data-hero="eyebrow"]'), { yPercent: -160, autoAlpha: 0 }, 0)
      .to($('[data-hero="sub"]'), { yPercent: -30, autoAlpha: 0 }, 0.06)
      .to($('[data-hero="actions"]'), { yPercent: -22, autoAlpha: 0 }, 0.12)
      .to($('[data-hero="meta"]'), { yPercent: -16, autoAlpha: 0 }, 0.16)
      .to($(".hero-scrim"), { opacity: 0.4 }, 0);

    ScrollTrigger.refresh();
  });
}

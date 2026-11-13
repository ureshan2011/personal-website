// Find my CV — the hide-and-seek CV room at /cv/.
// Entry point: renderer, quality tiers, first-person controls and the frame loop.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { buildWorld, HW, HD } from './world.js';
import { createTorch } from './torch.js';
import { createGame } from './game.js';
import { createUI } from './ui.js';

const script = document.currentScript;
const BASE = new URL('.', script ? script.src : location.href).href; // …/assets/cv-room/
const SITE = new URL('../../', BASE).href;
const params = new URLSearchParams(location.search);

const QUALITY = {
  high: { name: 'high', dpr: 2, shadow: 2048, msaa: 4, ao: true, bloom: true, dust: 520, roomShadows: true },
  medium: { name: 'medium', dpr: 1.5, shadow: 1024, msaa: 2, ao: false, bloom: true, dust: 300, roomShadows: true },
  low: { name: 'low', dpr: 1, shadow: 512, msaa: 0, ao: false, bloom: false, dust: 0, roomShadows: false },
};

const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVig: { value: 0.55 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform float uVig; varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv); float v = smoothstep(0.95, 0.3, length(vUv - 0.5) * 1.2);
    c.rgb *= mix(1.0, v, uVig); c.rgb += (hash(vUv * vec2(1733.0, 977.0) + fract(uTime) * 61.0) - 0.5) * 0.02; gl_FragColor = c; }`,
};

function makeSound(settings) {
  let ctx = null;
  const tone = (f0, f1, dur, type, gain, delay = 0) => {
    const t = ctx.currentTime + delay, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  };
  return {
    unlock() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } } if (ctx && ctx.state === 'suspended') ctx.resume(); },
    play(name) {
      if (!ctx || !settings.sound) return;
      if (name === 'found') { tone(880, 880, 0.5, 'sine', 0.12); tone(1318, 1318, 0.7, 'sine', 0.1, 0.09); }
      else if (name === 'swap') tone(1400, 320, 0.45, 'triangle', 0.07);
      else if (name === 'lights') tone(190, 120, 0.07, 'square', 0.05);
      else if (name === 'time') tone(330, 220, 0.6, 'sine', 0.1);
    },
  };
}

async function init() {
  const root = document.getElementById('cvr');
  const canvas = document.getElementById('cvr-canvas');
  if (!root || !canvas) return;
  root.hidden = false;
  document.documentElement.classList.add('cvr-js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const settings = { timer: false, swapping: true, camo: true, hints: true, sound: true };
  const ui = createUI(root, settings);
  const sound = makeSound(settings);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  } catch (e) {
    ui.fail('This browser could not start WebGL, so the room is switched off. The full CV is just below.');
    return;
  }
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  let quality = QUALITY[params.get('q')] || (coarse || Math.min(window.innerWidth, window.innerHeight) < 700 ? QUALITY.medium : QUALITY.high);
  quality = { ...quality, dpr: Math.min(quality.dpr, window.devicePixelRatio || 1) };

  renderer.setPixelRatio(quality.dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const manager = new THREE.LoadingManager();
  manager.onProgress = (url, loaded, total) => ui.progress(loaded / Math.max(total, 30));

  const camera = new THREE.PerspectiveCamera(62, 1, 0.05, 60);
  camera.rotation.order = 'YXZ';
  const view = { yaw: -0.67, pitch: -0.04, pos: new THREE.Vector3(-1.25, 1.62, 0.75), goal: null };

  let world;
  try {
    world = await buildWorld({ renderer, base: BASE, siteRoot: SITE, manager, quality });
    try {
      const res = await fetch(SITE + 'content/cv-room/instagram.json', { cache: 'no-cache' });
      if (res.ok) world.hangPosts(((await res.json()).posts || []).filter((p) => p && p.image && p.width && p.height).slice(0, 9));
    } catch (e) { /* the wall simply stays empty */ }
  } catch (e) {
    console.error(e);
    ui.fail('The room could not be loaded on this connection. The full CV is just below.');
    return;
  }
  const { scene } = world;
  scene.add(camera);
  const torch = createTorch(scene, quality);
  const game = createGame({ world, torch, camera, ui, settings, sound, reducedMotion });

  // ---------- post-processing ----------
  let composer = null, grade = null, bloom = null;
  function buildComposer() {
    if (composer) { for (const p of composer.passes) if (p.dispose) p.dispose(); composer.dispose(); composer = null; grade = null; bloom = null; }
    if (!quality.bloom && !quality.ao) return;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: quality.msaa });
    composer = new EffectComposer(renderer, rt);
    composer.setPixelRatio(quality.dpr);
    composer.addPass(new RenderPass(scene, camera));
    if (quality.ao) {
      const gtao = new GTAOPass(scene, camera, size.x, size.y);
      gtao.updateGtaoMaterial({ radius: 0.4, distanceExponent: 1.4, thickness: 1.2, scale: 1.15, samples: 12 });
      gtao.blendIntensity = 0.85;
      const ov = gtao.overrideVisibility.bind(gtao), rv = gtao.restoreVisibility.bind(gtao);
      const skip = [];
      let age = 0;
      gtao.overrideVisibility = () => {
        ov();
        if (age++ % 20 === 0) { // glass, sprites and the beam must not cast occlusion; re-list them now and then
          skip.length = 0;
          scene.traverse((o) => { if (o.isSprite || (o.isMesh && o.material && (o.material.transparent || o.material.isShaderMaterial))) skip.push(o); });
        }
        for (const o of skip) { o.userData.wasVisible = o.visible; o.visible = false; }
      };
      gtao.restoreVisibility = () => { rv(); for (const o of skip) o.visible = o.userData.wasVisible; };
      composer.addPass(gtao);
    }
    if (quality.bloom) { bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.2, 0.55, 0.95); composer.addPass(bloom); }
    composer.addPass(new OutputPass());
    grade = new ShaderPass(GradeShader);
    composer.addPass(grade);
  }

  const nav = document.querySelector('.nav');
  function resize() {
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    const w = root.clientWidth, h = root.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.8 ? 78 : w / h < 1.2 ? 70 : 62;
    camera.updateProjectionMatrix();
    if (composer) composer.setSize(w, h);
  }
  buildComposer();
  resize();
  new ResizeObserver(resize).observe(root);

  // ---------- controls ----------
  const ndc = new THREE.Vector2(0, 0.05);
  const raycaster = new THREE.Raycaster();
  const rayDir = new THREE.Vector3(0, 0, -1);
  const keys = new Set();
  let drag = null, paused = false;

  function setPointer(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ui.pointer(e.clientX - r.left, e.clientY - r.top);
  }
  function centrePointer() { ndc.set(0, 0.04); const r = canvas.getBoundingClientRect(); ui.pointer(r.width / 2, r.height * 0.48); }
  centrePointer();

  canvas.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary) return; // a second finger must not hijack the look
    sound.unlock();
    canvas.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: e.timeStamp, moved: false, type: e.pointerType };
    setPointer(e);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!e.isPrimary) return;
    setPointer(e);
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.x = e.clientX; drag.y = e.clientY;
    if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 7) drag.moved = true;
    if (drag.moved) {
      const k = (camera.fov / 62) * 0.0034;
      view.yaw += dx * k; view.pitch = THREE.MathUtils.clamp(view.pitch + dy * k, -1.25, 1.35);
    }
  });
  const release = (e) => {
    if (!drag || !e.isPrimary) return;
    const click = !drag.moved; // a press that did not travel is a click, however slow the frame
    const touch = drag.type !== 'mouse';
    drag = null;
    if (click) onClick();
    if (touch) setTimeout(() => { if (!drag) centrePointer(); }, 900);
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', () => { drag = null; });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
    // only while the room is on screen and in play, so the keys never get in the way of reading the page
    if (!visible || paused || game.state.phase === 'intro') return;
    const onCanvas = document.activeElement === canvas;
    if (!onCanvas && document.activeElement !== document.body) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'q', 'e', 'r', 'f', 'pageup', 'pagedown'].includes(k)) {
      keys.add(k);
      if (onCanvas && (k.startsWith('arrow') || k.startsWith('page'))) e.preventDefault();
    }
    if (k === 'l' && onCanvas) game.toggleLights();
  });
  window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
  window.addEventListener('blur', () => keys.clear());

  function walkable(x, z) {
    if (Math.abs(x) > HW - 0.32 || Math.abs(z) > HD - 0.32) return false;
    for (const b of world.blockers) {
      if (b.box.min.y > 1.4) continue;
      if (x > b.box.min.x - 0.27 && x < b.box.max.x + 0.27 && z > b.box.min.z - 0.27 && z < b.box.max.z + 0.27) return false;
    }
    return true;
  }
  function step(dx, dz) {
    const p = view.pos;
    if (walkable(p.x + dx, p.z + dz)) { p.x += dx; p.z += dz; return true; }
    if (walkable(p.x + dx, p.z)) { p.x += dx; return true; }
    if (walkable(p.x, p.z + dz)) { p.z += dz; return true; }
    return false;
  }

  function onClick() {
    raycaster.setFromCamera(ndc, camera);
    const gems = raycaster.intersectObjects(game.gems(), false);
    if (gems.length && game.click(gems[0].object.userData.item)) return;
    const hits = raycaster.intersectObjects(world.interactives, false);
    const floorHit = raycaster.intersectObjects([world.floor, world.rug], false)[0];
    if (hits.length && (!floorHit || hits[0].distance < floorHit.distance + 0.5)) {
      const d = hits[0].object.userData;
      if (d.type === 'switch') { game.toggleLights(); return; }
      if (d.type === 'photo') { ui.photo(d); return; }
    }
    if (floorHit && game.state.phase !== 'intro') view.goal = new THREE.Vector3(floorHit.point.x, 0, floorHit.point.z);
  }

  ui.on('start', ({ timed }) => { sound.unlock(); settings.timer = timed; root.querySelectorAll('[data-setting="timer"]').forEach((b) => b.setAttribute('aria-checked', timed ? 'true' : 'false')); game.start({ timed }); canvas.focus({ preventScroll: true }); });
  ui.on('again', () => { game.start({ timed: settings.timer, shuffle: true }); canvas.focus({ preventScroll: true }); });
  ui.on('lights', () => { sound.unlock(); if (game.state.phase === 'intro') game.start({ timed: false }); game.toggleLights(); });
  ui.on('setting', (key) => { if (key === 'timer') game.state.timed = settings.timer; game.refreshLooks(); });
  ui.on('pause', (v) => { paused = v; });

  // ---------- loop ----------
  const clock = new THREE.Clock();
  let visible = true, slow = 0, time = 0;
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.02 }).observe(root);
  const fwd = new THREE.Vector3(), side = new THREE.Vector3();

  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    if (!visible || document.hidden) return;
    tick(dt);
    if (composer) { grade.uniforms.uTime.value = reducedMotion ? 0 : time; grade.uniforms.uVig.value = 0.6 - 0.25 * world.lightLevel; composer.render(dt); } else renderer.render(scene, camera);

    // step down a quality tier if the device cannot keep up
    if (dt > 0.045) slow += dt; else slow = Math.max(0, slow - dt * 0.5);
    if (slow > 4 && quality.name !== 'low' && !params.get('q')) {
      quality = { ...(quality.name === 'high' ? QUALITY.medium : QUALITY.low) };
      quality.dpr = Math.min(quality.dpr, window.devicePixelRatio || 1);
      renderer.setPixelRatio(quality.dpr); torch.light.shadow.mapSize.set(quality.shadow, quality.shadow);
      if (torch.dust) torch.dust.visible = quality.dust > 0;
      world.pendantLight.castShadow = quality.roomShadows;
      if (torch.light.shadow.map) { torch.light.shadow.map.dispose(); torch.light.shadow.map = null; }
      buildComposer(); resize(); slow = 0;
    }
  }

  function tick(dt) {
    time += dt;

    // lights ease towards their target
    const target = game.state.lightTarget;
    if (Math.abs(world.lightLevel - target) > 0.001) world.setLights(world.lightLevel + Math.sign(target - world.lightLevel) * Math.min(Math.abs(target - world.lightLevel), dt * (reducedMotion ? 10 : 1.1)));
    if (bloom) bloom.strength = 0.16 + 0.05 * world.lightLevel;

    if (!paused && game.state.phase !== 'intro') {
      const turn = (keys.has('arrowleft') || keys.has('q') ? 1 : 0) - (keys.has('arrowright') || keys.has('e') ? 1 : 0);
      view.yaw += turn * dt * 1.6;
      const tilt = (keys.has('r') || keys.has('pageup') ? 1 : 0) - (keys.has('f') || keys.has('pagedown') ? 1 : 0);
      view.pitch = THREE.MathUtils.clamp(view.pitch + tilt * dt * 1.2, -1.25, 1.35);
      const f = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
      const s = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0);
      fwd.set(-Math.sin(view.yaw), 0, -Math.cos(view.yaw)); side.set(-fwd.z, 0, fwd.x);
      if (f || s) { view.goal = null; const sp = 1.7 * dt; step((fwd.x * f + side.x * s) * sp, (fwd.z * f + side.z * s) * sp); }
      if (view.goal) {
        const dx = view.goal.x - view.pos.x, dz = view.goal.z - view.pos.z, d = Math.hypot(dx, dz);
        if (d < 0.05 || !step((dx / d) * Math.min(d, 1.9 * dt), (dz / d) * Math.min(d, 1.9 * dt))) view.goal = null;
      }
    } else if (game.state.phase === 'intro' && !reducedMotion) {
      view.yaw = -0.67 + Math.sin(time * 0.16) * 0.22; // slow look-around behind the intro
    }
    camera.position.copy(view.pos);
    camera.rotation.set(view.pitch, view.yaw, 0);
    camera.updateMatrixWorld();

    raycaster.setFromCamera(ndc, camera);
    rayDir.copy(raycaster.ray.direction);
    torch.update(camera, rayDir, dt, time, world.lightLevel);
    if (game.state.phase === 'intro') torch.setOn(true);
    game.update(paused ? 0 : dt, time);
  }

  // compile shaders and upload textures before showing the room, so the first frames do not hitch
  torch.setOn(true);
  camera.position.copy(view.pos); camera.rotation.set(view.pitch, view.yaw, 0);
  game.group.visible = true; // include the hidden objects' shaders in the warm-up
  try { await renderer.compileAsync(scene, camera); } catch (e) { /* older drivers: compile lazily */ }
  game.group.visible = false;
  ui.progress(1);
  ui.ready();
  root.dataset.ready = '1';
  renderer.setAnimationLoop(frame);

  window.__cvroom = {
    ready: true, world, game, torch, camera, view, settings, renderer,
    look(x, y, z, yaw, pitch) { view.pos.set(x, y, z); view.yaw = yaw; view.pitch = pitch; view.goal = null; },
    aim(x, y) { ndc.set(x, y); },
    face(id) { const p = game.byId[id].group.position, d = p.clone().sub(view.pos); view.yaw = Math.atan2(-d.x, -d.z); view.pitch = Math.atan2(d.y, Math.hypot(d.x, d.z)); ndc.set(0, 0); },
    sim(seconds) { for (let t = 0; t < seconds; t += 0.05) tick(0.05); }, // advance the game without rendering (tests)
    info: () => renderer.info.render,
  };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

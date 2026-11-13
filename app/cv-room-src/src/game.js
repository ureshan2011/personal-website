// Hide-and-seek rules: where the twelve objects hide, how the torch finds them, and the optional
// mechanics from the third study (clones with one live target, active swapping, resize and
// camouflage, a timer).
import * as THREE from 'three';
import { ITEMS, SPARE_SPOTS } from './data.js';

const deg = THREE.MathUtils.degToRad;
const FIND_ANGLE = deg(6.5);
const GLINT_ANGLE = deg(19);
const JUMP_ANGLE = deg(14);
const DWELL = 0.55; // seconds the beam must rest on an object
const REACH = 7.5;
const TIME_LIMIT = 120;

function glintTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.12, 'rgba(255,244,214,0.85)'); r.addColorStop(0.4, 'rgba(255,190,110,0.18)'); r.addColorStop(1, 'rgba(255,160,60,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(64, 6); g.lineTo(64, 122); g.moveTo(6, 64); g.lineTo(122, 64); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function badgeTexture(n, found) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.beginPath(); g.arc(64, 64, 54, 0, Math.PI * 2); g.fillStyle = found ? '#8a4500' : '#1f1a14'; g.fill();
  g.lineWidth = 6; g.strokeStyle = '#fff3d6'; g.stroke();
  g.fillStyle = '#ffffff'; g.font = '600 58px "IBM Plex Mono", ui-monospace, Menlo, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(String(n), 64, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function createGame({ world, torch, camera, ui, settings, sound, reducedMotion }) {
  const group = new THREE.Group();
  world.scene.add(group);

  const gemGeo = new THREE.OctahedronGeometry(0.05, 0);
  gemGeo.scale(1, 1.7, 1);
  const camoGeo = new THREE.BoxGeometry(0.028, 0.15, 0.1);
  const glintTex = glintTexture();

  const liveLook = { color: 0xcfe6ff, emissive: 0x2f6bff, emissiveIntensity: 0.014, roughness: 0.08, opacity: 1 };
  const ghostLook = { color: 0x7d8aa0, emissive: 0x2f6bff, emissiveIntensity: 0.004, roughness: 0.5, opacity: 0.32 };
  const foundLook = { color: 0xffd9a0, emissive: 0xff8a1f, emissiveIntensity: 0.9, roughness: 0.1, opacity: 1 };
  const camoLook = { color: 0x5a2420, emissive: 0x000000, emissiveIntensity: 0, roughness: 0.75, opacity: 1 };

  function applyLook(it, look) {
    const m = it.gem.material;
    m.color.setHex(look.color); m.emissive.setHex(look.emissive); m.emissiveIntensity = look.emissiveIntensity;
    m.roughness = look.roughness; m.opacity = look.opacity; m.transparent = look.opacity < 1; m.needsUpdate = true;
  }

  const items = ITEMS.map((def, i) => {
    const g = new THREE.Group();
    const mat = new THREE.MeshPhysicalMaterial({ flatShading: true, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 3 });
    const gem = new THREE.Mesh(gemGeo, mat);
    gem.castShadow = true;
    const glint = new THREE.Sprite(new THREE.SpriteMaterial({ map: glintTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0, transparent: true }));
    glint.scale.setScalar(0.3);
    g.add(gem, glint);
    group.add(g);
    const it = {
      def, n: i + 1, group: g, gem, glint, badge: null,
      home: { spot: def.spot, where: def.where, ignore: def.ignore || [], note: def.note },
      spot: new THREE.Vector3(), where: '', ignore: [], note: '',
      found: false, dwell: 0, anim: null, hasJumped: false, phase: Math.random() * 6.28,
    };
    gem.userData.item = it;
    return it;
  });
  const byId = Object.fromEntries(items.map((it) => [it.def.id, it]));
  const trio = items.filter((it) => it.def.trio);

  const badgeCache = {};
  const badgeMap = (n, found) => (badgeCache[n + (found ? 'f' : 'r')] ||= badgeTexture(n, found));
  let endTimer = 0;
  const state = { phase: 'intro', elapsed: 0, timed: false, timeUp: false, liveId: 'senior-lecturer', foundCount: 0, lightTarget: 0, hintCooldown: 0 };

  function place(it, place_) {
    it.spot.fromArray(place_.spot); it.where = place_.where; it.ignore = place_.ignore || []; it.note = place_.note || '';
    it.group.position.copy(it.spot);
    it.floating = it.spot.y > 1.3 && !/shelf|sill|cabinet|desk|table|sofa/.test(it.where);
  }

  function isGhost(it) { return settings.swapping && it.def.trio && !it.found && it.def.id !== state.liveId; }
  function isCamo(it) { return settings.camo && it.def.camo; }

  function refreshLooks() {
    for (const it of items) {
      if (it.found) { applyLook(it, foundLook); continue; }
      const camo = isCamo(it);
      it.gem.geometry = camo ? camoGeo : gemGeo;
      it.gem.rotation.set(0, 0, 0);
      applyLook(it, camo ? camoLook : isGhost(it) ? ghostLook : liveLook);
    }
  }

  function layout(shuffle) {
    const movable = items.filter((it) => !it.def.trio && !it.def.camo);
    let pool = movable.map((it) => it.home);
    if (shuffle) {
      pool = pool.concat(SPARE_SPOTS);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    }
    movable.forEach((it, i) => place(it, pool[i]));
    for (const it of items) if (it.def.trio || it.def.camo) place(it, it.home);
  }

  // ----- particle trail for a swap -----
  const TRAIL_N = 46;
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL_N * 3), 3));
  trailGeo.setAttribute('aT', new THREE.BufferAttribute(new Float32Array(TRAIL_N).map((_, i) => i / (TRAIL_N - 1)), 1));
  const trailMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    uniforms: { uHead: { value: 0 }, uFade: { value: 0 }, uSize: { value: 30 } },
    vertexShader: `attribute float aT; uniform float uHead; uniform float uFade; uniform float uSize; varying float vA;
      void main(){ vA = step(aT, uHead) * (0.25 + 0.75 * smoothstep(uHead - 0.5, uHead, aT)) * uFade;
      vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = uSize / max(0.4, -mv.z); }`,
    fragmentShader: `varying float vA; void main(){ float r = length(gl_PointCoord - 0.5); if (r > 0.5) discard;
      gl_FragColor = vec4(vec3(1.0, 0.72, 0.36) * vA * smoothstep(0.5, 0.0, r) * 1.6, 1.0); }`,
  });
  const trail = new THREE.Points(trailGeo, trailMat);
  trail.frustumCulled = false; trail.renderOrder = 8; trail.visible = false;
  world.scene.add(trail);
  let trailAge = -1;
  function startTrail(a, b) {
    const p = trailGeo.attributes.position;
    const mid = a.clone().add(b).multiplyScalar(0.5); mid.y = Math.min(2.5, Math.max(a.y, b.y) + 0.45);
    for (let i = 0; i < TRAIL_N; i++) {
      const t = i / (TRAIL_N - 1), u = 1 - t;
      p.setXYZ(i, u * u * a.x + 2 * u * t * mid.x + t * t * b.x, u * u * a.y + 2 * u * t * mid.y + t * t * b.y, u * u * a.z + 2 * u * t * mid.z + t * t * b.z);
    }
    p.needsUpdate = true; trailAge = 0; trail.visible = true;
  }

  // ----- line of sight -----
  const ray = new THREE.Ray(), hit = new THREE.Vector3(), v = new THREE.Vector3(), w = new THREE.Vector3();
  function clear(it, dist) {
    ray.origin.copy(torch.origin); ray.direction.copy(v);
    for (const b of world.blockers) {
      if (it.ignore.includes(b.id)) continue;
      if (ray.intersectBox(b.box, hit) && hit.distanceTo(torch.origin) < dist - 0.12) return false;
    }
    return true;
  }

  function hint(text) {
    if (state.hintCooldown > 0) return;
    state.hintCooldown = 3.5; ui.hint(text);
  }

  function jump(from) {
    const others = trio.filter((it) => !it.found && it !== from);
    if (!others.length) return;
    let to = others[0], best = -2;
    for (const o of others) { const d = -o.spot.clone().sub(torch.origin).normalize().dot(torch.dir); if (d > best) { best = d; to = o; } }
    state.liveId = to.def.id; to.hasJumped = true; from.dwell = 0;
    startTrail(from.spot, to.spot);
    refreshLooks();
    sound.play('swap');
    state.hintCooldown = 0; hint('It jumped. Follow the trail.');
  }

  function find(it) {
    if (it.found || state.phase !== 'play') return;
    it.found = true; it.dwell = 0; state.foundCount++;
    applyLook(it, foundLook);
    it.gem.geometry = gemGeo;
    it.anim = { t: 0, from: it.spot.clone() };
    if (it.def.trio) {
      const left = trio.filter((x) => !x.found);
      if (left.length) { const next = left[Math.floor(Math.random() * left.length)]; state.liveId = next.def.id; next.hasJumped = false; }
      refreshLooks();
    }
    sound.play('found');
    ui.found(it.def, it.where, it.note, state.foundCount, items.length, state.elapsed);
    if (state.foundCount === items.length) endTimer = setTimeout(() => end('all'), reducedMotion ? 400 : 1700);
  }

  function reveal() {
    for (const it of items) {
      it.anim = null; it.group.position.copy(it.spot); it.gem.scale.setScalar(1.25); it.gem.visible = true; it.glint.visible = false;
      it.gem.geometry = gemGeo;
      applyLook(it, it.found ? foundLook : liveLook);
      it.gem.material.emissiveIntensity = it.found ? 0.9 : 0.5;
      it.glint.material.opacity = 0;
      if (!it.badge) {
        it.badge = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeMap(it.n, it.found), depthTest: false, transparent: true }));
        it.badge.scale.setScalar(0.17); it.badge.position.y = 0.22; it.badge.renderOrder = 20;
        it.group.add(it.badge);
      } else { it.badge.material.map = badgeMap(it.n, it.found); it.badge.visible = true; }
    }
  }

  function end(reason) {
    clearTimeout(endTimer);
    if (state.phase !== 'play') return;
    state.phase = 'end'; state.lightTarget = 1; torch.setOn(false);
    trail.visible = false;
    reveal();
    sound.play('lights');
    ui.end({ reason, found: state.foundCount, total: items.length, time: state.elapsed, timed: state.timed, items: items.map((it) => ({ n: it.n, def: it.def, found: it.found, where: it.where })) });
  }

  function start({ timed, shuffle = false }) {
    clearTimeout(endTimer);
    for (const it of items) {
      it.found = false; it.dwell = 0; it.anim = null; it.hasJumped = false; it.gem.visible = true; it.gem.scale.setScalar(1);
      it.glint.visible = true; it.glint.material.opacity = 0;
      if (it.badge) it.badge.visible = false;
    }
    layout(shuffle);
    group.visible = true;
    state.phase = 'play'; state.elapsed = 0; state.timed = timed; state.timeUp = false; state.foundCount = 0; state.lightTarget = 0;
    state.liveId = 'senior-lecturer';
    refreshLooks();
    torch.setOn(true);
    ui.play({ timed, total: items.length });
  }

  layout(false);
  refreshLooks();
  group.visible = false; // nothing to see until the game starts

  const toCam = new THREE.Vector3();
  function update(dt, time) {
    state.hintCooldown = Math.max(0, state.hintCooldown - dt);

    // found-object animation and idle motion
    for (const it of items) {
      if (it.anim) {
        const a = it.anim; a.t += dt / (reducedMotion ? 0.3 : 1.1);
        const k = Math.min(1, a.t);
        toCam.copy(camera.position).sub(a.from).multiplyScalar(0.3 * Math.sin(k * Math.PI * 0.5));
        it.group.position.copy(a.from).add(toCam);
        it.gem.rotation.y += dt * 9;
        it.gem.scale.setScalar(k < 0.35 ? 1 + k * 2.2 : Math.max(0, 1.77 * (1 - (k - 0.35) / 0.65)));
        it.glint.material.opacity = 1 - k;
        if (k >= 1) { it.anim = null; it.gem.visible = false; it.glint.visible = false; }
        continue;
      }
      if (it.gem.geometry === gemGeo && !reducedMotion) {
        it.gem.rotation.y += dt * 0.5;
        if (it.floating) it.group.position.y = it.spot.y + Math.sin(time * 1.1 + it.phase) * 0.018;
      }
    }

    if (trailAge >= 0) {
      trailAge += dt;
      trailMat.uniforms.uHead.value = Math.min(1, trailAge / 0.9);
      trailMat.uniforms.uFade.value = trailAge < 3.2 ? 1 : Math.max(0, 1 - (trailAge - 3.2) / 1.2);
      if (trailAge > 4.4) { trailAge = -1; trail.visible = false; }
    }

    if (state.phase !== 'play') { ui.aim(0, 0); return; }

    state.elapsed += dt;
    if (state.timed && !state.timeUp && state.elapsed >= TIME_LIMIT) { state.timeUp = true; sound.play('time'); ui.timeUp(state.foundCount, items.length); }
    ui.clock(state.timed ? Math.max(0, TIME_LIMIT - state.elapsed) : state.elapsed, state.timed);

    let target = null, targetAng = FIND_ANGLE, nearest = Math.PI;
    for (const it of items) {
      if (it.found) continue;
      v.copy(it.group.position).sub(torch.origin);
      const dist = v.length(); v.divideScalar(dist);
      const beamAng = Math.acos(THREE.MathUtils.clamp(v.dot(torch.dir), -1, 1));
      // the torch sits beside the eye, so also accept the pointer ray itself resting on the object
      w.copy(it.group.position).sub(torch.eye);
      const eyeAng = Math.acos(THREE.MathUtils.clamp(w.dot(torch.look) / w.length(), -1, 1));
      const ang = Math.min(beamAng, beamAng < torch.halfAngle ? eyeAng : beamAng);
      const ghost = isGhost(it), camo = isCamo(it);
      if (!ghost) nearest = Math.min(nearest, ang);

      // a glint when the beam passes close (camouflaged objects do not give themselves away)
      const want = torch.on && !camo && ang < GLINT_ANGLE && dist < REACH ? (1 - ang / GLINT_ANGLE) * (ghost ? 0.25 : 0.95) : 0;
      it.glint.material.opacity += (want - it.glint.material.opacity) * Math.min(1, dt * 8);

      if (!torch.on || dist > REACH) { it.dwell = Math.max(0, it.dwell - dt * 2); continue; }
      const near = ang < Math.max(FIND_ANGLE, Math.atan2(0.11, dist));
      if (ghost) { if (near && clear(it, dist)) hint('Not the live one. Only one clone is live at a time.'); continue; }
      if (settings.swapping && it.def.trio && !it.hasJumped && ang < JUMP_ANGLE && trio.filter((x) => !x.found).length > 1 && clear(it, dist)) { jump(it); continue; }
      if (near && ang < targetAng + 0.2 && clear(it, dist)) { if (!target || ang < targetAng) { target = it; targetAng = ang; } }
    }
    for (const it of items) if (it !== target) it.dwell = Math.max(0, it.dwell - dt * 2);
    if (target) {
      target.dwell += dt;
      if (target.dwell >= DWELL) find(target);
    }
    ui.aim(target ? Math.min(1, target.dwell / DWELL) : 0, THREE.MathUtils.clamp(1 - nearest / deg(42), 0, 0.999));
  }

  return {
    state, items, byId, group, start, end, update, refreshLooks,
    gems: () => items.filter((it) => !it.found && it.gem.visible).map((it) => it.gem),
    // a direct click or tap on an object
    click(it) {
      if (state.phase !== 'play' || it.found) return false;
      if (it.group.position.distanceTo(camera.position) > REACH) return false;
      if (isGhost(it)) { state.hintCooldown = 0; hint('Not the live one. Only one clone is live at a time.'); return true; }
      // a click needs the same clear line from the torch as the beam does
      v.copy(it.group.position).sub(torch.origin);
      const dist = v.length(); v.divideScalar(dist);
      if (!clear(it, dist)) { state.hintCooldown = 0; hint('Something is in the way. Move for a clear line.'); return true; }
      find(it); return true;
    },
    toggleLights() {
      if (state.phase === 'play') { end('lights'); return; }
      state.lightTarget = state.lightTarget > 0.5 ? 0 : 1;
      torch.setOn(state.lightTarget < 0.5);
      sound.play('lights');
    },
  };
}

// The Seeker's torch: a shadow-casting spotlight with a lens pattern, a faint visible beam and
// dust motes that only show inside the cone. In the hide-and-seek study this cone was all one
// player saw of the other.
import * as THREE from 'three';

const HALF_ANGLE = THREE.MathUtils.degToRad(24);

function lensPattern() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, 256, 256);
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 127);
  r.addColorStop(0, '#ffffff');
  r.addColorStop(0.2, '#fffaf0');
  r.addColorStop(0.36, '#b9b2a6');
  r.addColorStop(0.8, '#8d877d');
  r.addColorStop(0.9, '#a9a296');
  r.addColorStop(0.97, '#3a3834');
  r.addColorStop(1, '#000000');
  g.fillStyle = r;
  g.beginPath();
  g.arc(128, 128, 127, 0, Math.PI * 2);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createTorch(scene, quality) {
  const light = new THREE.SpotLight(0xfff0d8, 0, 13, HALF_ANGLE, 0.35, 1.4);
  light.castShadow = true;
  light.shadow.mapSize.set(quality.shadow, quality.shadow);
  light.shadow.camera.near = 0.12;
  light.shadow.camera.far = 13;
  light.shadow.bias = -0.0006;
  light.shadow.normalBias = 0.025;
  light.map = lensPattern();
  scene.add(light, light.target);

  // visible beam
  const len = 5.5;
  const coneGeo = new THREE.ConeGeometry(Math.tan(HALF_ANGLE) * len, len, 40, 1, true);
  coneGeo.translate(0, -len / 2, 0);
  coneGeo.rotateX(-Math.PI / 2);
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { uOn: { value: 0 }, uLen: { value: len } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vAlong; uniform float uLen;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
      vAlong = position.z / uLen; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vN; varying vec3 vV; varying float vAlong; uniform float uOn;
      void main(){ float edge = pow(abs(dot(normalize(vN), normalize(vV))), 2.0);
      float fall = pow(1.0 - clamp(vAlong, 0.0, 1.0), 1.6) * smoothstep(0.0, 0.08, vAlong);
      gl_FragColor = vec4(vec3(1.0, 0.92, 0.78) * edge * fall * 0.045 * uOn, 1.0); }`,
  });
  const beam = new THREE.Mesh(coneGeo, beamMat);
  beam.frustumCulled = false;
  beam.renderOrder = 5;
  scene.add(beam);

  // dust
  let dust = null;
  if (quality.dust > 0) {
    const n = quality.dust;
    const pos = new Float32Array(n * 3), seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * 2.7;
      pos[i * 3 + 1] = 0.1 + Math.random() * 2.5;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * 2.2;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {
        uPos: { value: new THREE.Vector3() }, uDir: { value: new THREE.Vector3(0, 0, -1) }, uCos: { value: Math.cos(HALF_ANGLE) },
        uOn: { value: 0 }, uTime: { value: 0 }, uSize: { value: 9 }, uRoom: { value: 0 },
      },
      vertexShader: `uniform vec3 uPos; uniform vec3 uDir; uniform float uCos; uniform float uOn; uniform float uTime; uniform float uSize; uniform float uRoom;
        attribute float aSeed; varying float vA;
        void main(){ vec3 p = position;
          p.x += sin(uTime * 0.11 + aSeed * 6.28) * 0.09; p.y += sin(uTime * 0.07 + aSeed * 12.0) * 0.07; p.z += cos(uTime * 0.09 + aSeed * 3.0) * 0.09;
          vec3 L = p - uPos; float d = length(L); float c = dot(L / d, uDir);
          float cone = smoothstep(uCos, mix(uCos, 1.0, 0.45), c);
          vA = uOn * cone * clamp(1.3 / (d * d), 0.0, 1.0) * (0.5 + 0.5 * aSeed) + uRoom * 0.035;
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (0.6 + aSeed) / max(0.4, -mv.z); }`,
      fragmentShader: `varying float vA; void main(){ float r = length(gl_PointCoord - 0.5); if (r > 0.5) discard;
        gl_FragColor = vec4(vec3(1.0, 0.93, 0.8) * vA * smoothstep(0.5, 0.05, r), 1.0); }`,
    });
    dust = new THREE.Points(g, m);
    dust.frustumCulled = false;
    dust.renderOrder = 6;
    scene.add(dust);
  }

  const origin = new THREE.Vector3(), dir = new THREE.Vector3(0, 0, -1), aim = new THREE.Vector3();
  const eye = new THREE.Vector3(), look = new THREE.Vector3(0, 0, -1); // the pointer ray, from the camera
  const right = new THREE.Vector3(), up = new THREE.Vector3(), fwd = new THREE.Vector3();
  let power = 0, wanted = 0;

  return {
    light, origin, dir, eye, look, dust, halfAngle: HALF_ANGLE,
    get on() { return wanted > 0; },
    setOn(v) { wanted = v ? 1 : 0; },
    // rayDir: unit vector from the camera through the pointer
    update(camera, rayDir, dt, time, roomLight) {
      power += (wanted - power) * Math.min(1, dt * 6);
      camera.matrixWorld.extractBasis(right, up, fwd); // fwd is the camera's +z (backwards)
      origin.copy(camera.position).addScaledVector(right, 0.2).addScaledVector(up, -0.2).addScaledVector(fwd, -0.05);
      eye.copy(camera.position); look.copy(rayDir);
      aim.copy(camera.position).addScaledVector(rayDir, 3.2);
      dir.copy(aim).sub(origin).normalize();
      light.position.copy(origin);
      light.target.position.copy(aim);
      light.intensity = 24 * power * (1 - 0.75 * roomLight);
      beam.position.copy(origin);
      beam.lookAt(aim);
      beamMat.uniforms.uOn.value = power * (1 - 0.8 * roomLight);
      if (dust) {
        const u = dust.material.uniforms;
        u.uPos.value.copy(origin); u.uDir.value.copy(dir); u.uOn.value = power * (1 - 0.7 * roomLight); u.uTime.value = time; u.uRoom.value = roomLight;
        u.uSize.value = 6.5 * quality.dpr;
      }
    },
  };
}

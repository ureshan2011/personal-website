// Builds the room: architecture, furniture (CC0 models from Poly Haven), the Instagram photo wall
// and the lights. Units are metres. x runs east, y up, z south. The room's inner faces sit at
// x = ±HW, z = ±HD, y = 0..H.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const HW = 2.8, HD = 2.3, H = 2.7;
const WIN = { z0: -1.1, z1: 0.5, y0: 0.9, y1: 2.25 }; // window opening in the east wall

// A box whose texture repeats every `tile` metres on every face, whatever its size.
function tiledBox(w, h, d, mat, tile = 1.4) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    for (let i = 0; i < 4; i++) {
      const k = f * 4 + i;
      uv.setXY(k, (uv.getX(k) * dims[f][0]) / tile, (uv.getY(k) * dims[f][1]) / tile);
    }
  }
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function plain(w, h, d, mat, shadow = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = shadow;
  m.receiveShadow = true;
  return m;
}

export async function buildWorld({ renderer, base, siteRoot, manager, quality }) {
  const scene = new THREE.Scene();
  const texLoader = new THREE.TextureLoader(manager);
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const T = (name, srgb = false) => {
    const t = texLoader.load(base + 'textures/' + name);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = aniso;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  // ---------- image-based light and the night sky outside the window ----------
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  const sky = texLoader.load(base + 'textures/sky_night.jpg');
  sky.mapping = THREE.EquirectangularReflectionMapping;
  sky.colorSpace = THREE.SRGBColorSpace;
  scene.background = sky;
  scene.backgroundRotation = new THREE.Euler(0, -1.9, 0);

  // ---------- materials ----------
  const wallNor = T('wall_nor.webp');
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe9e3d7, roughness: 0.93, normalMap: wallNor, normalScale: new THREE.Vector2(0.35, 0.35) });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x2c4640, roughness: 0.9, normalMap: wallNor, normalScale: new THREE.Vector2(0.35, 0.35) });
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf1eee7, roughness: 0.95 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xf3f0e9, roughness: 0.45 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2c, roughness: 0.35, metalness: 0.9 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb08d57, roughness: 0.3, metalness: 1 });

  const floorArm = T('floor_arm.webp');
  const floorMat = new THREE.MeshStandardMaterial({
    map: T('floor_diff.webp', true), normalMap: T('floor_nor.webp'), normalScale: new THREE.Vector2(0.9, 0.9),
    roughnessMap: floorArm, aoMap: floorArm, roughness: 0.82, metalness: 0,
  });
  const woodArm = T('wood_arm.webp');
  const woodMat = new THREE.MeshStandardMaterial({
    map: T('wood_diff.webp', true), normalMap: T('wood_nor.webp'), roughnessMap: woodArm, roughness: 0.75, color: 0xb9a184,
  });

  const room = new THREE.Group();
  scene.add(room);
  const blockers = []; // { id, box } bounding boxes used for walking and line-of-sight
  const interactives = []; // meshes the pointer can act on (photo frames, the light switch)

  // ---------- floor, ceiling, walls ----------
  const floorGeo = new THREE.PlaneGeometry(HW * 2, HD * 2);
  floorGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, HD * 2 / 1.7, HW * 2 / 1.7, HD * 2 / 1.7, 0, 0, HW * 2 / 1.7, 0]), 2));
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.userData.type = 'floor';
  room.add(floor);

  const t = 0.2;
  const ceiling = plain(HW * 2 + 2 * t, t, HD * 2 + 2 * t, ceilMat);
  ceiling.position.set(0, H + t / 2, 0);
  room.add(ceiling);
  const under = plain(HW * 2 + 2 * t, t, HD * 2 + 2 * t, ceilMat); // slab under the floor so no light leaks in
  under.position.set(0, -t / 2 - 0.001, 0);
  under.receiveShadow = false;
  room.add(under);

  const north = tiledBox(HW * 2 + 2 * t, H, t, accentMat);
  north.position.set(0, H / 2, -HD - t / 2);
  const south = tiledBox(HW * 2 + 2 * t, H, t, wallMat);
  south.position.set(0, H / 2, HD + t / 2);
  const west = tiledBox(t, H, HD * 2, wallMat);
  west.position.set(-HW - t / 2, H / 2, 0);
  room.add(north, south, west);

  // east wall, in four pieces around the window opening
  const eX = HW + t / 2;
  const eBelow = tiledBox(t, WIN.y0, HD * 2, wallMat); eBelow.position.set(eX, WIN.y0 / 2, 0);
  const eAbove = tiledBox(t, H - WIN.y1, HD * 2, wallMat); eAbove.position.set(eX, (H + WIN.y1) / 2, 0);
  const eL = tiledBox(t, WIN.y1 - WIN.y0, WIN.z0 + HD, wallMat); eL.position.set(eX, (WIN.y0 + WIN.y1) / 2, (WIN.z0 - HD) / 2);
  const eR = tiledBox(t, WIN.y1 - WIN.y0, HD - WIN.z1, wallMat); eR.position.set(eX, (WIN.y0 + WIN.y1) / 2, (WIN.z1 + HD) / 2);
  room.add(eBelow, eAbove, eL, eR);

  // skirting boards
  const sk = 0.1, skT = 0.016;
  const skN = plain(HW * 2, sk, skT, trimMat); skN.position.set(0, sk / 2, -HD + skT / 2);
  const skS = plain(HW * 2, sk, skT, trimMat); skS.position.set(0, sk / 2, HD - skT / 2);
  const skE = plain(skT, sk, HD * 2, trimMat); skE.position.set(HW - skT / 2, sk / 2, 0);
  const skW1 = plain(skT, sk, HD + 0.72, trimMat); skW1.position.set(-HW + skT / 2, sk / 2, (-HD + 0.72) / 2);
  const skW2 = plain(skT, sk, HD - 1.68, trimMat); skW2.position.set(-HW + skT / 2, sk / 2, (1.68 + HD) / 2);
  room.add(skN, skS, skE, skW1, skW2);

  // ---------- window: frame, glass, sill, curtains ----------
  const wz = (WIN.z0 + WIN.z1) / 2, wy = (WIN.y0 + WIN.y1) / 2, ww = WIN.z1 - WIN.z0, wh = WIN.y1 - WIN.y0;
  const fx = HW + 0.07, fd = 0.1, fb = 0.055;
  const frame = new THREE.Group();
  const fTop = plain(fd, fb, ww, trimMat); fTop.position.set(fx, WIN.y1 - fb / 2, wz);
  const fBot = plain(fd, fb, ww, trimMat); fBot.position.set(fx, WIN.y0 + fb / 2, wz);
  const fL = plain(fd, wh, fb, trimMat); fL.position.set(fx, wy, WIN.z0 + fb / 2);
  const fR = plain(fd, wh, fb, trimMat); fR.position.set(fx, wy, WIN.z1 - fb / 2);
  const fM = plain(fd * 0.8, wh, 0.04, trimMat); fM.position.set(fx, wy, wz);
  const fH = plain(fd * 0.8, 0.035, ww, trimMat); fH.position.set(fx, WIN.y0 + wh * 0.62, wz);
  frame.add(fTop, fBot, fL, fR, fM, fH);
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(ww, wh),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.03, metalness: 0, transparent: true, opacity: 0.1, envMapIntensity: 2.5, depthWrite: false }),
  );
  glass.rotation.y = -Math.PI / 2;
  glass.position.set(fx + 0.02, wy, wz);
  const sill = plain(0.24, 0.035, ww + 0.16, trimMat); sill.position.set(HW - 0.02, WIN.y0 - 0.0175, wz);
  room.add(frame, glass, sill);

  const curtainMat = new THREE.MeshStandardMaterial({ color: 0x9a9384, roughness: 1, side: THREE.DoubleSide, normalMap: T('fabric_nor.webp'), normalScale: new THREE.Vector2(0.6, 0.6) });
  function curtain(zc, width) {
    const g = new THREE.PlaneGeometry(width, 2.36, 48, 6);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const u = (p.getX(i) / width + 0.5) * Math.PI * 9;
      const hang = 0.6 + 0.4 * (0.5 - p.getY(i) / 2.36); // pleats open out towards the hem
      p.setZ(i, Math.sin(u) * 0.035 * hang + Math.sin(u * 0.37 + 1) * 0.012);
    }
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, curtainMat);
    m.rotation.y = -Math.PI / 2;
    m.position.set(HW - 0.13, 1.22, zc);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, ww + 1.0, 12), metalMat);
  rod.rotation.x = Math.PI / 2;
  rod.position.set(HW - 0.13, 2.4, wz);
  room.add(curtain(WIN.z0 - 0.2, 0.52), curtain(WIN.z1 + 0.2, 0.52), rod);

  // ---------- door and light switch (west wall) ----------
  const doorZ = 1.2;
  const door = tiledBox(0.045, 2.03, 0.86, woodMat, 1.2);
  door.position.set(-HW + 0.03, 1.015, doorZ);
  const aTop = plain(0.03, 0.075, 1.02, trimMat); aTop.position.set(-HW + 0.015, 2.07, doorZ);
  const aL = plain(0.03, 2.07, 0.075, trimMat); aL.position.set(-HW + 0.015, 1.035, doorZ - 0.47);
  const aR = plain(0.03, 2.07, 0.075, trimMat); aR.position.set(-HW + 0.015, 1.035, doorZ + 0.47);
  const rose = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.012, 20), brassMat);
  rose.rotation.z = Math.PI / 2; rose.position.set(-HW + 0.058, 1.0, doorZ - 0.34);
  const lever = plain(0.016, 0.016, 0.12, brassMat, false); lever.position.set(-HW + 0.085, 1.0, doorZ - 0.29);
  const stem = plain(0.03, 0.014, 0.014, brassMat, false); stem.position.set(-HW + 0.072, 1.0, doorZ - 0.34);
  room.add(door, aTop, aL, aR, rose, lever, stem);

  const switchGroup = new THREE.Group();
  const plate = plain(0.01, 0.12, 0.082, trimMat, false);
  const rocker = plain(0.014, 0.05, 0.03, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }), false);
  rocker.rotation.z = 0.12;
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x331a00, emissive: 0xff9d3d, emissiveIntensity: 2.2 });
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.004, 8, 8), ledMat);
  led.position.set(0.006, -0.042, 0);
  switchGroup.add(plate, rocker, led);
  switchGroup.position.set(-HW + 0.005, 1.22, 0.58);
  const switchHit = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.18), new THREE.MeshBasicMaterial({ visible: false }));
  switchHit.userData = { type: 'switch' };
  switchGroup.add(switchHit);
  room.add(switchGroup);
  interactives.push(switchHit);

  // ---------- rug ----------
  const rugMat = new THREE.MeshStandardMaterial({ map: T('rug_diff.webp', true), normalMap: T('rug_nor.webp'), roughness: 1, color: 0xcfc6b8 });
  rugMat.map.repeat.set(4, 3); rugMat.normalMap.repeat.set(4, 3);
  const rug = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.012, 2.0), rugMat);
  rug.position.set(0.95, 0.006, 0.9);
  rug.receiveShadow = true;
  rug.userData.type = 'floor';
  room.add(rug);

  // ---------- furniture ----------
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  const glow = {}; // emissive materials that light up when the lights go on
  const models = {};
  async function model(file, { id, x = 0, y = 0, z = 0, rot = 0, scale = 1, block = true, pad = 0 }) {
    const gltf = await gltfLoader.loadAsync(base + 'models/' + file + '.glb');
    const obj = gltf.scene;
    obj.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (m.map) m.map.anisotropy = aniso;
        if (m.transparent || m.alphaTest > 0) { m.alphaTest = Math.max(m.alphaTest, 0.4); m.transparent = false; m.side = THREE.DoubleSide; }
        if (/glass/i.test(m.name)) { o.castShadow = false; }
        if (/_light$|globe/i.test(m.name)) { glow[m.name] = m; o.castShadow = false; }
      }
    });
    obj.scale.setScalar(scale);
    obj.rotation.y = rot;
    obj.position.set(x, y, z);
    room.add(obj);
    obj.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(obj);
    if (block) blockers.push({ id, box: box.clone().expandByScalar(pad) });
    models[id] = obj;
    return obj;
  }

  const P = Math.PI;
  await Promise.all([
    model('modern_wooden_cabinet', { id: 'cabinet', x: 0.3, z: -HD + 0.29 }),
    model('steel_frame_shelves_03', { id: 'shelves', x: -HW + 0.38, z: -1.05, rot: P / 2 }),
    model('wooden_table_02', { id: 'desk', x: HW - 0.42, z: -0.3, rot: P / 2 }),
    model('modern_arm_chair_01', { id: 'desk-chair', x: 1.72, z: -0.42, rot: P / 2 + 0.35 }),
    model('sofa_02', { id: 'sofa', x: 0.9, z: HD - 0.42, rot: P }),
    model('modern_coffee_table_01', { id: 'coffee-table', x: 0.9, z: 0.95, rot: P / 2 }),
    model('side_table_01', { id: 'side-table', x: -0.42, z: 1.95 }),
    model('mid_century_lounge_chair', { id: 'lounge', x: 2.22, z: 1.22, rot: -P * 0.68 }),
    model('vintage_suitcase', { id: 'suitcases', x: -1.75, z: HD - 0.17, rot: P }),
    model('potted_plant_02', { id: 'plant', x: 2.25, z: -1.75, rot: 0.6, scale: 1.25 }),
    model('modern_ceiling_lamp_01', { id: 'pendant', x: 0, y: H - 1.17, z: -0.2, block: false }),
    model('desk_lamp_arm_01', { id: 'desk-lamp', x: HW - 0.3, y: 0.8, z: 0.2, rot: -P / 2 - 0.5, block: false }),
    model('Camera_01', { id: 'camera', x: -0.35, y: 0.68, z: -HD + 0.3, rot: 0.5, block: false }),
    model('ceramic_vase_01', { id: 'vase', x: -0.72, y: 0.68, z: -HD + 0.24, scale: 0.8, block: false }),
    model('potted_plant_04', { id: 'small-plant', x: HW - 0.3, y: 0.8, z: -0.78, block: false }),
    model('book_encyclopedia_set_01', { id: 'books', x: -HW + 0.3, y: 1.105, z: -1.3, rot: P / 2, block: false }),
    model('wall_clock', { id: 'clock', x: 2.25, y: 2.05, z: -HD + 0.002, block: false }),
  ]);

  // ---------- photo wall (north wall, above the cabinet) ----------
  const frameBlack = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.4 });
  const frameOak = woodMat.clone(); frameOak.color.set(0xd8c2a0);
  const matBoard = new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.95 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transparent: true, opacity: 0.07, envMapIntensity: 2, depthWrite: false });

  function framed({ url, w, h, data, oak = false, mat = 0.045, bar = 0.02 }) {
    const g = new THREE.Group();
    const fm = oak ? frameOak : frameBlack;
    const depth = 0.032;
    const top = plain(w, bar, depth, fm); top.position.set(0, h / 2 - bar / 2, depth / 2);
    const bot = plain(w, bar, depth, fm); bot.position.set(0, -h / 2 + bar / 2, depth / 2);
    const le = plain(bar, h - 2 * bar, depth, fm); le.position.set(-w / 2 + bar / 2, 0, depth / 2);
    const ri = plain(bar, h - 2 * bar, depth, fm); ri.position.set(w / 2 - bar / 2, 0, depth / 2);
    const board = new THREE.Mesh(new THREE.PlaneGeometry(w - 2 * bar, h - 2 * bar), matBoard); board.position.z = 0.012; board.receiveShadow = true;
    const pw = w - 2 * (bar + mat), ph = h - 2 * (bar + mat);
    const tex = texLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = aniso;
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 }));
    photo.position.z = 0.0135;
    photo.userData = { type: 'photo', ...data };
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w - 2 * bar, h - 2 * bar), glassMat); pane.position.z = 0.024;
    g.add(top, bot, le, ri, board, photo, pane);
    interactives.push(photo);
    return g;
  }

  const gallery = new THREE.Group();
  room.add(gallery);
  function hangPosts(posts) {
    const cx = 0.3, yLo = 0.98, yHi = 2.46, gap = 0.085, maxW = 3.5, mat = 0.045, bar = 0.02;
    const n = posts.length;
    if (!n) return;
    const rows = n <= 3 ? 1 : n <= 8 ? 2 : 3;
    const per = Math.ceil(n / rows);
    const rowH = Math.min(0.66, (yHi - yLo - (rows - 1) * gap) / rows);
    const blockH = rows * rowH + (rows - 1) * gap;
    let yTop = (yHi + yLo) / 2 + blockH / 2;
    for (let r = 0; r < rows; r++) {
      const items = posts.slice(r * per, (r + 1) * per);
      const inner = rowH - 2 * (mat + bar);
      let widths = items.map((p) => inner * (p.width / p.height) + 2 * (mat + bar));
      let total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
      const s = Math.min(1, maxW / total);
      widths = widths.map((w) => w * s); total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
      const h = rowH * s;
      let x = cx - total / 2;
      items.forEach((p, i) => {
        const fr = framed({ url: siteRoot + p.image, w: widths[i], h, oak: (r + i) % 3 === 1, mat: mat * s, bar, data: { post: p } });
        fr.position.set(x + widths[i] / 2, yTop - rowH / 2, -HD + 0.001);
        gallery.add(fr);
        x += widths[i] + gap;
      });
      yTop -= rowH + gap;
    }
  }

  // graduation photo above the sofa (south wall)
  const grad = framed({ url: siteRoot + 'assets/images/phd-certificate-arch-900.webp', w: 0.62, h: 0.86, oak: true, data: { decor: { title: 'PhD graduation', text: 'University of Canterbury', href: siteRoot + 'research.html', cta: 'See the research' } } });
  grad.rotation.y = Math.PI;
  grad.position.set(0.9, 1.62, HD - 0.001);
  room.add(grad);

  // ---------- lights ----------
  const moon = new THREE.DirectionalLight(0x9db6ff, 0.5);
  moon.position.set(HW + 5, 4.2, wz - 1.6);
  moon.target.position.set(0.4, 0, 0.5);
  moon.castShadow = true;
  moon.shadow.mapSize.set(quality.shadow, quality.shadow);
  Object.assign(moon.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 16 });
  moon.shadow.bias = -0.0005; moon.shadow.normalBias = 0.03;
  moon.shadow.autoUpdate = false; moon.shadow.needsUpdate = true; // nothing it lights ever moves
  scene.add(moon, moon.target);

  const hemi = new THREE.HemisphereLight(0x8fa6d8, 0x2a2118, 0.03);
  scene.add(hemi);

  const pendantLight = new THREE.PointLight(0xffd9a8, 0, 9, 2);
  pendantLight.position.set(0, H - 1.17 + 0.18, -0.2);
  pendantLight.castShadow = quality.roomShadows;
  pendantLight.shadow.mapSize.set(quality.shadow / 2, quality.shadow / 2);
  pendantLight.shadow.bias = -0.002; pendantLight.shadow.normalBias = 0.04;
  pendantLight.shadow.camera.near = 0.3;
  pendantLight.shadow.autoUpdate = false;
  scene.add(pendantLight);

  const deskLight = new THREE.SpotLight(0xffc98a, 0, 4, 0.9, 0.7, 2);
  deskLight.position.set(HW - 0.42, 1.38, 0.02);
  deskLight.target.position.set(HW - 0.55, 0.8, -0.25);
  scene.add(deskLight, deskLight.target);

  const fill = new THREE.PointLight(0xffe2bd, 0, 7, 2); // soft bounce so corners are not black once the lights are on
  fill.position.set(0.6, 1.5, 1.1);
  scene.add(fill);

  for (const m of Object.values(glow)) { m.emissive = new THREE.Color(0xffc98a); m.emissiveIntensity = 0; }

  const world = {
    scene, room, floor, rug, blockers, interactives, models, gallery, hangPosts, pendantLight,
    lightLevel: 0,
    // 0 = night (moon only), 1 = lamps on
    setLights(level) {
      world.lightLevel = level;
      pendantLight.intensity = 20 * level;
      deskLight.intensity = 14 * level;
      fill.intensity = 1.0 * level;
      hemi.intensity = 0.03 + 0.13 * level;
      scene.environmentIntensity = 0.03 + 0.22 * level;
      moon.intensity = 0.5 * (1 - 0.6 * level);
      scene.backgroundIntensity = 0.22 + 0.1 * level;
      for (const m of Object.values(glow)) m.emissiveIntensity = 3 * level;
      ledMat.emissiveIntensity = 2.2 * (1 - level);
      rocker.rotation.z = level > 0.5 ? -0.12 : 0.12;
      if (level > 0 && pendantLight.castShadow) pendantLight.shadow.needsUpdate = true;
    },
  };
  world.setLights(0);
  return world;
}

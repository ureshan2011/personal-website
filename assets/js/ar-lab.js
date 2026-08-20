/* ==========================================================================
   AR Lab — a dependency-free augmented reality demo for the workshop page.

   Three tiers, chosen automatically, best first:
     1. "full"  — WebXR immersive-ar: real plane detection via hit-test, and
                  real occlusion when the device exposes a depth sensor.
     2. "lite"  — camera feed + device orientation. No plane detection; objects
                  sit on an assumed floor about eye-height below the camera.
     3. "demo"  — no camera at all. The same scene on an animated backdrop.

   Every tier renders through the same small WebGL1 renderer, so the object
   looks identical however the visitor arrives at it. Written for cheap phones
   on slow connections: no libraries, no textures, no model downloads.
   ========================================================================== */
(function () {
  "use strict";

  var DEG = Math.PI / 180;
  var EYE_HEIGHT = 1.45;      // metres, assumed camera height in lite mode
  var MAX_GEMS = 6;

  /* ---------------------------------------------------------------- maths */

  function mat4() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    for (var i = 0; i < 4; i++) {
      var b0 = b[i * 4], b1 = b[i * 4 + 1], b2 = b[i * 4 + 2], b3 = b[i * 4 + 3];
      out[i * 4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[i * 4 + 1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[i * 4 + 2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[i * 4 + 3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }
    return out;
  }

  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) / (near - far); out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = 2 * far * near / (near - far); out[15] = 0;
    return out;
  }

  /* Inverse of a rigid transform (rotation + translation only) — all we need. */
  function invertRigid(out, m) {
    out[0] = m[0]; out[1] = m[4]; out[2] = m[8]; out[3] = 0;
    out[4] = m[1]; out[5] = m[5]; out[6] = m[9]; out[7] = 0;
    out[8] = m[2]; out[9] = m[6]; out[10] = m[10]; out[11] = 0;
    var x = m[12], y = m[13], z = m[14];
    out[12] = -(out[0] * x + out[4] * y + out[8] * z);
    out[13] = -(out[1] * x + out[5] * y + out[9] * z);
    out[14] = -(out[2] * x + out[6] * y + out[10] * z);
    out[15] = 1;
    return out;
  }

  function compose(out, pos, quat, scale) {
    var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;
    var sx = scale[0], sy = scale[1], sz = scale[2];
    out[0] = (1 - (yy + zz)) * sx; out[1] = (xy + wz) * sx; out[2] = (xz - wy) * sx; out[3] = 0;
    out[4] = (xy - wz) * sy; out[5] = (1 - (xx + zz)) * sy; out[6] = (yz + wx) * sy; out[7] = 0;
    out[8] = (xz + wy) * sz; out[9] = (yz - wx) * sz; out[10] = (1 - (xx + yy)) * sz; out[11] = 0;
    out[12] = pos[0]; out[13] = pos[1]; out[14] = pos[2]; out[15] = 1;
    return out;
  }

  function quatMultiply(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }

  /* Euler (YXZ order) → quaternion, matching the convention the DeviceOrientation
     spec uses. Same maths three.js uses in DeviceOrientationControls. */
  function quatFromEulerYXZ(out, x, y, z) {
    var c1 = Math.cos(x / 2), c2 = Math.cos(y / 2), c3 = Math.cos(z / 2);
    var s1 = Math.sin(x / 2), s2 = Math.sin(y / 2), s3 = Math.sin(z / 2);
    out[0] = s1 * c2 * c3 + c1 * s2 * s3;
    out[1] = c1 * s2 * c3 - s1 * c2 * s3;
    out[2] = c1 * c2 * s3 - s1 * s2 * c3;
    out[3] = c1 * c2 * c3 + s1 * s2 * s3;
    return out;
  }

  /* --------------------------------------------------------------- shaders */

  var VERT = [
    "attribute vec3 aPos;",
    "attribute vec3 aNormal;",
    "uniform mat4 uProj, uView, uModel;",
    "varying vec3 vNormal;",
    "varying vec3 vLocal;",
    "varying float vViewDepth;",
    "void main(){",
    "  vec4 world = uModel * vec4(aPos, 1.0);",
    "  vec4 view = uView * world;",
    "  vNormal = mat3(uModel) * aNormal;",
    "  vLocal = aPos;",
    "  vViewDepth = -view.z;",
    "  gl_Position = uProj * view;",
    "}"
  ].join("\n");

  var FRAG = [
    "precision mediump float;",
    "varying vec3 vNormal;",
    "varying vec3 vLocal;",
    "varying float vViewDepth;",
    "uniform vec3 uColor;",
    "uniform float uOpacity;",
    "uniform float uMode;",       // 0 = lit solid, 1 = flat ring/disc, 2 = grid line
    "uniform float uPulse;",
    // real-world occlusion, only ever switched on when a depth sensor exists
    "uniform float uUseDepth;",
    "uniform sampler2D uDepthTex;",
    "uniform mat4 uDepthUv;",
    "uniform vec2 uViewport;",
    "uniform float uRawToM;",
    "void main(){",
    "  if (uUseDepth > 0.5) {",
    "    vec2 uv = gl_FragCoord.xy / uViewport;",
    "    vec2 duv = (uDepthUv * vec4(uv, 0.0, 1.0)).xy;",
    "    if (duv.x >= 0.0 && duv.x <= 1.0 && duv.y >= 0.0 && duv.y <= 1.0) {",
    "      vec2 depthPair = texture2D(uDepthTex, duv).ra;",
    "      float realDepth = dot(depthPair, vec2(255.0, 256.0 * 255.0)) * uRawToM;",
    "      if (realDepth > 0.01 && realDepth < vViewDepth - 0.03) { discard; }",
    "    }",
    "  }",
    "  float alpha = uOpacity;",
    "  vec3 rgb = uColor;",
    "  if (uMode < 0.5) {",
    "    vec3 n = normalize(vNormal);",
    "    float key = max(dot(n, normalize(vec3(0.45, 0.9, 0.35))), 0.0);",
    "    float fill = max(dot(n, normalize(vec3(-0.5, 0.2, -0.6))), 0.0);",
    "    float rim = pow(1.0 - abs(n.z), 2.0);",
    "    rgb = uColor * (0.46 + 0.85 * key + 0.22 * fill) + vec3(0.6, 0.76, 1.0) * rim * 0.6;",
    "    rgb += uColor * uPulse * 0.35;",
    "  } else if (uMode < 1.5) {",
    "    float r = length(vLocal.xz);",
    "    float ring = smoothstep(1.0, 0.72, r) * smoothstep(0.32, 0.62, r);",
    "    float core = smoothstep(0.55, 0.0, r) * 0.35;",
    "    alpha *= (ring + core);",
    "    if (alpha < 0.01) discard;",
    "  }",
    "  gl_FragColor = vec4(rgb, alpha);",
    "}"
  ].join("\n");

  /* -------------------------------------------------------------- geometry */

  /* An elongated octahedron: 8 flat faces, reads as a cut gem, costs nothing. */
  function gemGeometry() {
    var top = [0, 1.35, 0], bot = [0, -1.0, 0];
    var belt = [[0.62, 0.1, 0], [0, 0.1, 0.62], [-0.62, 0.1, 0], [0, 0.1, -0.62]];
    var pos = [], nor = [];
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var len = Math.hypot(nx, ny, nz) || 1;
      nx /= len; ny /= len; nz /= len;
      [a, b, c].forEach(function (p) {
        pos.push(p[0], p[1], p[2]);
        nor.push(nx, ny, nz);
      });
    }
    for (var i = 0; i < 4; i++) {
      var a = belt[i], b = belt[(i + 1) % 4];
      tri(top, a, b);
      tri(bot, b, a);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, mode: "TRIANGLES" };
  }

  /* A flat unit disc on the XZ plane — used for the shadow and the reticle. */
  function discGeometry(segments) {
    var pos = [], nor = [];
    for (var i = 0; i < segments; i++) {
      var a0 = (i / segments) * Math.PI * 2, a1 = ((i + 1) / segments) * Math.PI * 2;
      pos.push(0, 0, 0, Math.cos(a0), 0, Math.sin(a0), Math.cos(a1), 0, Math.sin(a1));
      nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, mode: "TRIANGLES" };
  }

  /* A ground grid, only drawn in the no-camera demo tier. */
  function gridGeometry(half, step) {
    var pos = [], nor = [];
    for (var i = -half; i <= half; i += step) {
      pos.push(-half, 0, i, half, 0, i, i, 0, -half, i, 0, half);
      nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, mode: "LINES" };
  }

  /* -------------------------------------------------------------- renderer */

  function Renderer(canvas) {
    var opts = { alpha: true, antialias: false, depth: true, preserveDrawingBuffer: false, xrCompatible: true };
    var gl = canvas.getContext("webgl", opts) || canvas.getContext("experimental-webgl", opts);
    if (!gl) return null;

    function shader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
      return s;
    }
    var program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "link");
    gl.useProgram(program);

    var loc = {};
    ["uProj", "uView", "uModel", "uColor", "uOpacity", "uMode", "uPulse",
      "uUseDepth", "uDepthTex", "uDepthUv", "uViewport", "uRawToM"].forEach(function (n) {
        loc[n] = gl.getUniformLocation(program, n);
      });
    var aPos = gl.getAttribLocation(program, "aPos");
    var aNormal = gl.getAttribLocation(program, "aNormal");

    function upload(geo) {
      var p = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, p);
      gl.bufferData(gl.ARRAY_BUFFER, geo.pos, gl.STATIC_DRAW);
      var n = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, n);
      gl.bufferData(gl.ARRAY_BUFFER, geo.nor, gl.STATIC_DRAW);
      return { pos: p, nor: n, count: geo.count, mode: geo.mode };
    }

    var meshes = {
      gem: upload(gemGeometry()),
      disc: upload(discGeometry(40)),
      grid: upload(gridGeometry(20, 1))
    };

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    var identity = mat4();

    return {
      gl: gl,
      /* Depth-sensing occlusion is opt-in per frame and fails soft. */
      setDepth: function (info, viewportW, viewportH) {
        if (!info) { gl.uniform1f(loc.uUseDepth, 0); return false; }
        try {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, info.texture);
          gl.uniform1i(loc.uDepthTex, 0);
          gl.uniformMatrix4fv(loc.uDepthUv, false, info.normDepthBufferFromNormView.matrix);
          gl.uniform1f(loc.uRawToM, info.rawValueToMeters);
          gl.uniform2f(loc.uViewport, viewportW, viewportH);
          gl.uniform1f(loc.uUseDepth, 1);
          return true;
        } catch (e) {
          gl.uniform1f(loc.uUseDepth, 0);
          return false;
        }
      },
      beginFrame: function (w, h, clear) {
        gl.viewport(0, 0, w, h);
        if (clear) gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        else gl.clear(gl.DEPTH_BUFFER_BIT);
      },
      setViewport: function (x, y, w, h) { gl.viewport(x, y, w, h); },
      clearAll: function () { gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); },
      setCamera: function (proj, view) {
        gl.uniformMatrix4fv(loc.uProj, false, proj);
        gl.uniformMatrix4fv(loc.uView, false, view);
      },
      noDepth: function () { gl.uniform1f(loc.uUseDepth, 0); },
      draw: function (name, model, color, opacity, mode, pulse, depthWrite) {
        var m = meshes[name];
        if (!m) return;
        gl.uniformMatrix4fv(loc.uModel, false, model || identity);
        gl.uniform3f(loc.uColor, color[0], color[1], color[2]);
        gl.uniform1f(loc.uOpacity, opacity);
        gl.uniform1f(loc.uMode, mode);
        gl.uniform1f(loc.uPulse, pulse || 0);
        gl.depthMask(depthWrite === false ? false : true);
        gl.bindBuffer(gl.ARRAY_BUFFER, m.pos);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, m.nor);
        gl.enableVertexAttribArray(aNormal);
        gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(m.mode === "LINES" ? gl.LINES : gl.TRIANGLES, 0, m.count);
        gl.depthMask(true);
      }
    };
  }

  /* ------------------------------------------------------------------ scene */

  var GEM_COLOR = [0.30, 0.48, 1.0];
  var GOLD = [1.0, 0.72, 0.25];

  function Scene() {
    this.gems = [];
    this.collected = 0;
    this.pops = [];
  }

  Scene.prototype.add = function (x, y, z) {
    if (this.gems.length >= MAX_GEMS) this.gems.shift();
    this.gems.push({ x: x, y: y, z: z, born: performance.now(), spin: Math.random() * 6.28 });
    return this.gems[this.gems.length - 1];
  };

  /* Ray/sphere test so a tap on a placed gem collects it instead of stacking. */
  Scene.prototype.pick = function (ox, oy, oz, dx, dy, dz) {
    var best = -1, bestT = Infinity;
    for (var i = 0; i < this.gems.length; i++) {
      var g = this.gems[i];
      var ex = g.x - ox, ey = g.y + 0.17 - oy, ez = g.z - oz;
      var t = ex * dx + ey * dy + ez * dz;
      if (t <= 0) continue;
      var d2 = (ex * ex + ey * ey + ez * ez) - t * t;
      if (d2 < 0.07 && t < bestT) { bestT = t; best = i; }
    }
    return best;
  };

  Scene.prototype.collect = function (index) {
    var g = this.gems.splice(index, 1)[0];
    if (!g) return;
    this.collected++;
    this.pops.push({ x: g.x, y: g.y, z: g.z, born: performance.now() });
  };

  /* Real-world sizes, in metres — a crystal roughly the size of a coffee mug. */
  var GEM_SCALE = 0.16;        // gem is ~22 cm tall, ~20 cm across
  var GEM_LIFT = 0.17;         // centre height, so the bottom tip rests on the floor
  var SHADOW_R = 0.26;         // contact shadow radius

  Scene.prototype.draw = function (renderer, now, scale) {
    var m = mat4();
    var i;
    for (i = 0; i < this.gems.length; i++) {
      var g = this.gems[i];
      var age = (now - g.born) / 1000;
      var grow = Math.min(1, age / 0.35);
      var ease = 1 - Math.pow(1 - grow, 3);
      var bob = Math.sin(now / 620 + g.spin) * 0.022;
      var spin = now / 1400 + g.spin;
      var s = scale * ease;
      var pulse = 0.5 + 0.5 * Math.sin(now / 480 + g.spin);

      // soft contact shadow, flat on the floor — this is what sells "it's on the plane"
      var shadow = s * SHADOW_R;
      compose(m, [g.x, g.y + 0.004, g.z], [0, 0, 0, 1], [shadow, 1, shadow]);
      renderer.draw("disc", m, GEM_COLOR, 0.5, 1, 0, false);

      // a halo ring that breathes outward across the floor
      var halo = (age % 2.2) / 2.2;
      var haloR = s * SHADOW_R * (1 + halo * 1.5);
      compose(m, [g.x, g.y + 0.006, g.z], [0, 0, 0, 1], [haloR, 1, haloR]);
      renderer.draw("disc", m, GEM_COLOR, 0.32 * (1 - halo) * ease, 1, 0, false);

      var q = [0, Math.sin(spin / 2), 0, Math.cos(spin / 2)];
      var gs = s * GEM_SCALE;
      compose(m, [g.x, g.y + GEM_LIFT * ease + bob, g.z], q, [gs, gs, gs]);
      renderer.draw("gem", m, GEM_COLOR, 1, 0, pulse, true);
    }

    for (i = this.pops.length - 1; i >= 0; i--) {
      var p = this.pops[i];
      var t = (now - p.born) / 700;
      if (t >= 1) { this.pops.splice(i, 1); continue; }
      var popR = scale * SHADOW_R * (1 + t * 3);
      compose(m, [p.x, p.y + 0.01 + t * 0.35, p.z], [0, 0, 0, 1], [popR, 1, popR]);
      renderer.draw("disc", m, GOLD, 0.7 * (1 - t), 1, 0, false);
    }
  };

  /* ------------------------------------------------------------------- app */

  function AR(root) {
    this.root = root;
    this.stage = root.querySelector("[data-ar-stage]");
    this.canvas = root.querySelector("[data-ar-canvas]");
    this.video = root.querySelector("[data-ar-video]");
    this.overlay = root.querySelector("[data-ar-overlay]");
    this.hint = root.querySelector("[data-ar-hint]");
    this.counter = root.querySelector("[data-ar-counter]");
    this.badge = root.querySelector("[data-ar-badge]");
    this.startBtn = root.querySelector("[data-ar-start]");
    this.stopBtn = root.querySelector("[data-ar-stop]");
    this.resetBtn = root.querySelector("[data-ar-reset]");
    this.status = root.querySelector("[data-ar-status]");
    this.intro = root.querySelector("[data-ar-intro]");
    this.scene = new Scene();
    this.tier = null;
    this.running = false;
    this.orientation = null;
    this.hasOrientation = false;
    this.drag = { yaw: 0, pitch: 0, active: false, lx: 0, ly: 0 };
    this.depthOn = false;
    this.bind();
    this.probe();
  }

  AR.prototype.say = function (text) {
    if (this.hint) this.hint.textContent = text;
  };

  AR.prototype.setStatus = function (text, tone) {
    if (!this.status) return;
    this.status.textContent = text;
    this.status.setAttribute("data-tone", tone || "info");
  };

  AR.prototype.setBadge = function (text) {
    if (!this.badge) return;
    this.badge.textContent = text;
    this.badge.hidden = !text;
  };

  AR.prototype.updateCounter = function () {
    if (!this.counter) return;
    this.counter.textContent = this.scene.gems.length + " placed · " + this.scene.collected + " collected";
  };

  /* Work out, before the visitor taps anything, which tier this phone gets. */
  AR.prototype.probe = function () {
    var self = this;
    var hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    this.canWebXR = false;

    function settle() {
      var label;
      if (self.canWebXR) {
        self.setStatus("Your phone supports full AR — plane detection included.", "good");
        label = "Start AR";
      } else if (hasCamera) {
        self.setStatus("Your phone gets the lightweight camera AR mode.", "info");
        label = "Start camera AR";
      } else {
        self.setStatus("No camera available — you'll get the animated 3D demo.", "warn");
        label = "Start 3D demo";
      }
      if (self.startBtn) self.startBtn.textContent = label;
    }

    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-ar").then(function (ok) {
        self.canWebXR = !!ok;
        settle();
      }).catch(settle);
    } else {
      settle();
    }
  };

  AR.prototype.bind = function () {
    var self = this;
    if (this.startBtn) this.startBtn.addEventListener("click", function () { self.start(); });
    if (this.stopBtn) this.stopBtn.addEventListener("click", function () { self.stop(); });
    if (this.resetBtn) this.resetBtn.addEventListener("click", function () {
      self.scene.gems.length = 0;
      self.scene.collected = 0;
      self.updateCounter();
      self.say("Cleared. Tap the floor to place a new crystal.");
    });
  };

  AR.prototype.ensureRenderer = function () {
    if (this.renderer) return this.renderer;
    try {
      this.renderer = Renderer(this.canvas);
    } catch (e) {
      this.renderer = null;
    }
    return this.renderer;
  };

  AR.prototype.start = function () {
    var self = this;
    if (this.running) return;
    if (!this.ensureRenderer()) {
      this.setStatus("This browser can't run WebGL, so the 3D demo isn't available. The videos below still work.", "warn");
      this.root.setAttribute("data-fallback", "css");
      return;
    }
    this.root.setAttribute("data-active", "true");
    if (this.intro) this.intro.hidden = true;

    if (this.canWebXR) {
      this.startXR().catch(function (err) {
        self.startLite("Full AR didn't start on this device, so here's the lightweight mode.");
      });
    } else {
      this.startLite(null);
    }
  };

  AR.prototype.stop = function () {
    this.running = false;
    if (this.xrSession) { try { this.xrSession.end(); } catch (e) {} }
    this.stopLite();
    this.root.removeAttribute("data-active");
    if (this.intro) this.intro.hidden = false;
    this.setBadge("");
  };

  /* ------------------------------------------------------- tier 1: WebXR AR */

  AR.prototype.startXR = function () {
    var self = this;
    var gl = this.renderer.gl;

    return gl.makeXRCompatible().then(function () {
      return navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay", "depth-sensing", "local-floor"],
        domOverlay: self.overlay ? { root: self.overlay } : undefined,
        depthSensing: {
          usagePreference: ["gpu-optimized"],
          dataFormatPreference: ["luminance-alpha"]
        }
      });
    }).then(function (session) {
      self.xrSession = session;
      self.tier = "full";
      self.running = true;
      self.root.setAttribute("data-tier", "full");

      var wantsDepth = false;
      try {
        wantsDepth = session.depthUsage === "gpu-optimized" &&
          session.depthDataFormat === "luminance-alpha";
      } catch (e) { wantsDepth = false; }
      self.depthOn = wantsDepth;
      self.setBadge(wantsDepth ? "Full AR · plane detection · occlusion" : "Full AR · plane detection");
      self.say("Point at the floor. When the ring appears, tap to place a crystal.");

      var binding = null;
      if (wantsDepth) {
        try { binding = new XRWebGLBinding(session, gl); } catch (e) { self.depthOn = false; }
      }

      session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });

      var reticlePose = null;
      var hitSource = null;
      var refSpace = null;
      var viewerSpace = null;

      session.addEventListener("end", function () {
        self.xrSession = null;
        self.running = false;
        self.root.removeAttribute("data-active");
        self.root.removeAttribute("data-tier");
        if (self.intro) self.intro.hidden = false;
        self.setBadge("");
      });

      session.addEventListener("select", function (ev) {
        // A tap on an existing crystal collects it; otherwise drop a new one.
        var frame = ev.frame;
        if (frame && refSpace) {
          var rayPose = frame.getPose(ev.inputSource.targetRaySpace, refSpace);
          if (rayPose) {
            var m = rayPose.transform.matrix;
            var hit = self.scene.pick(m[12], m[13], m[14], -m[8], -m[9], -m[10]);
            if (hit >= 0) {
              self.scene.collect(hit);
              self.updateCounter();
              self.say("Collected. " + (self.scene.gems.length ? "Tap the floor for another." : "Place another one anywhere."));
              return;
            }
          }
        }
        if (reticlePose) {
          var p = reticlePose.transform.position;
          self.scene.add(p.x, p.y, p.z);
          self.updateCounter();
          self.say("Walk around it — it stays put. Tap the crystal to collect it.");
        } else {
          self.say("Keep pointing at the floor until the ring appears.");
        }
      });

      return Promise.all([
        session.requestReferenceSpace("local"),
        session.requestReferenceSpace("viewer")
      ]).then(function (spaces) {
        refSpace = spaces[0];
        viewerSpace = spaces[1];
        return session.requestHitTestSource({ space: viewerSpace });
      }).then(function (source) {
        hitSource = source;

        var proj = mat4(), view = mat4(), model = mat4();

        session.requestAnimationFrame(function onXRFrame(time, frame) {
          if (!self.running) return;
          session.requestAnimationFrame(onXRFrame);

          var pose = frame.getViewerPose(refSpace);
          if (!pose) return;
          var layer = session.renderState.baseLayer;
          gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer);
          gl.clear(gl.DEPTH_BUFFER_BIT);

          reticlePose = null;
          if (hitSource) {
            var hits = frame.getHitTestResults(hitSource);
            if (hits.length) reticlePose = hits[0].getPose(refSpace);
          }

          for (var i = 0; i < pose.views.length; i++) {
            var v = pose.views[i];
            var vp = layer.getViewport(v);
            self.renderer.setViewport(vp.x, vp.y, vp.width, vp.height);

            var depthApplied = false;
            if (self.depthOn && binding) {
              try {
                var info = binding.getDepthInformation(v);
                depthApplied = self.renderer.setDepth(info, vp.width, vp.height);
              } catch (e) { depthApplied = false; }
            }
            if (!depthApplied) self.renderer.noDepth();

            proj.set(v.projectionMatrix);
            view.set(v.transform.inverse.matrix);
            self.renderer.setCamera(proj, view);

            if (reticlePose && self.scene.gems.length < MAX_GEMS) {
              var rp = reticlePose.transform.position;
              var t = (time % 1400) / 1400;
              compose(model, [rp.x, rp.y + 0.005, rp.z], [0, 0, 0, 1],
                [0.13 + t * 0.05, 1, 0.13 + t * 0.05]);
              self.renderer.draw("disc", model, [1, 1, 1], 0.55 - t * 0.3, 1, 0, false);
            }
            self.scene.draw(self.renderer, time, 1);
          }
        });

        self.updateCounter();
      });
    });
  };

  /* ------------------------------- tier 2/3: camera + orientation, or demo */

  AR.prototype.startLite = function (note) {
    var self = this;
    this.tier = "lite";
    this.root.setAttribute("data-tier", "lite");
    if (note) this.setStatus(note, "warn");

    var constraints = {
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        // deliberately small: cheap phones decode this without dropping frames
        width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 24, max: 30 }
      }
    };

    var camera = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      ? navigator.mediaDevices.getUserMedia(constraints)
      : Promise.reject(new Error("no camera api"));

    camera.then(function (stream) {
      self.stream = stream;
      self.video.srcObject = stream;
      self.video.play().catch(function () {});
      self.root.setAttribute("data-camera", "on");
      self.setBadge("Camera AR · simulated floor");
      self.say("Hold the phone up and tap the floor in the picture.");
      return self.requestOrientation();
    }).catch(function () {
      self.tier = "demo";
      self.root.setAttribute("data-tier", "demo");
      self.root.removeAttribute("data-camera");
      self.setBadge("3D demo · no camera");
      self.setStatus("No camera feed, so here's the same scene as a 3D animation. Drag to look around.", "warn");
      self.say("Drag to look around. Tap the floor to place a crystal.");
    }).then(function () {
      self.runLite();
    });
  };

  /* iOS needs an explicit, gesture-triggered grant for motion sensors. */
  AR.prototype.requestOrientation = function () {
    var self = this;
    function listen() {
      self.orientationHandler = function (e) {
        if (e.alpha === null && e.beta === null && e.gamma === null) return;
        self.hasOrientation = true;
        self.orientation = e;
      };
      window.addEventListener("deviceorientation", self.orientationHandler, true);
      setTimeout(function () {
        if (!self.hasOrientation && self.tier === "lite") {
          self.setBadge("Camera AR · drag to look");
          self.say("Motion sensors aren't available — drag across the picture to look around, then tap to place.");
        }
      }, 1200);
    }
    try {
      if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
        return DeviceOrientationEvent.requestPermission().then(function (state) {
          if (state === "granted") listen();
          else self.say("Motion access declined — drag across the picture to look around instead.");
        }).catch(function () { listen(); });
      }
    } catch (e) { /* fall through to the plain listener */ }
    listen();
    return Promise.resolve();
  };

  AR.prototype.stopLite = function () {
    if (this.stream) {
      this.stream.getTracks().forEach(function (t) { t.stop(); });
      this.stream = null;
    }
    if (this.video) this.video.srcObject = null;
    if (this.orientationHandler) {
      window.removeEventListener("deviceorientation", this.orientationHandler, true);
      this.orientationHandler = null;
    }
    this.root.removeAttribute("data-camera");
    this.root.removeAttribute("data-tier");
  };

  /* Camera orientation for the non-XR tiers, as a rotation quaternion. */
  AR.prototype.cameraQuat = function (out) {
    if (this.hasOrientation && this.orientation) {
      var o = this.orientation;
      var screenAngle = 0;
      if (screen.orientation && typeof screen.orientation.angle === "number") screenAngle = screen.orientation.angle;
      else if (typeof window.orientation === "number") screenAngle = window.orientation;

      quatFromEulerYXZ(out, (o.beta || 0) * DEG, (o.alpha || 0) * DEG, -(o.gamma || 0) * DEG);
      // tilt so the camera looks out of the back of the phone, then undo screen rotation
      quatMultiply(out, out, [-Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
      var half = -screenAngle * DEG / 2;
      quatMultiply(out, out, [0, 0, Math.sin(half), Math.cos(half)]);
      return out;
    }
    // drag-to-look fallback
    var cy = Math.cos(this.drag.yaw / 2), sy = Math.sin(this.drag.yaw / 2);
    var cp = Math.cos(this.drag.pitch / 2), sp = Math.sin(this.drag.pitch / 2);
    out[0] = cy * sp; out[1] = sy * cp; out[2] = -sy * sp; out[3] = cy * cp;
    return out;
  };

  AR.prototype.runLite = function () {
    var self = this;
    this.running = true;
    var canvas = this.canvas;
    var proj = mat4(), view = mat4(), camWorld = mat4(), model = mat4();
    var quat = [0, 0, 0, 1];
    var fov = 62 * DEG;

    /* Turn a tap into a point on the assumed floor, 1.45 m below the camera. */
    function screenToFloor(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      var ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      var ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;
      var aspect = rect.width / rect.height;
      var tan = Math.tan(fov / 2);
      var dx = ndcX * tan * aspect, dy = ndcY * tan, dz = -1;
      // rotate the ray into world space using the current camera orientation
      var m = camWorld;
      var wx = m[0] * dx + m[4] * dy + m[8] * dz;
      var wy = m[1] * dx + m[5] * dy + m[9] * dz;
      var wz = m[2] * dx + m[6] * dy + m[10] * dz;
      var len = Math.hypot(wx, wy, wz) || 1;
      wx /= len; wy /= len; wz /= len;
      var floorY = -EYE_HEIGHT;
      if (wy > -0.05) {
        // aimed at or above the horizon — drop it 2.5 m ahead instead of at infinity
        var fx = wx, fz = wz;
        var flat = Math.hypot(fx, fz) || 1;
        return { x: (fx / flat) * 2.5, y: floorY, z: (fz / flat) * 2.5, guessed: true };
      }
      var t = Math.min(-floorY / -wy, 8);
      return { x: wx * t, y: floorY, z: wz * t, guessed: false, ray: [wx, wy, wz] };
    }

    var pointer = { down: false, moved: false, x: 0, y: 0 };

    function onDown(e) {
      var p = e.touches ? e.touches[0] : e;
      pointer.down = true; pointer.moved = false;
      pointer.x = p.clientX; pointer.y = p.clientY;
      self.drag.lx = p.clientX; self.drag.ly = p.clientY;
    }
    function onMove(e) {
      if (!pointer.down) return;
      var p = e.touches ? e.touches[0] : e;
      if (Math.abs(p.clientX - pointer.x) > 8 || Math.abs(p.clientY - pointer.y) > 8) pointer.moved = true;
      if (!self.hasOrientation) {
        self.drag.yaw -= (p.clientX - self.drag.lx) * 0.005;
        self.drag.pitch -= (p.clientY - self.drag.ly) * 0.005;
        self.drag.pitch = Math.max(-1.2, Math.min(1.2, self.drag.pitch));
        self.drag.lx = p.clientX; self.drag.ly = p.clientY;
        if (e.cancelable) e.preventDefault();
      }
    }
    function onUp(e) {
      if (!pointer.down) return;
      pointer.down = false;
      if (pointer.moved) return;
      var p = (e.changedTouches ? e.changedTouches[0] : e);
      var hitPoint = screenToFloor(p.clientX, p.clientY);
      if (hitPoint.ray) {
        var idx = self.scene.pick(0, 0, 0, hitPoint.ray[0], hitPoint.ray[1], hitPoint.ray[2]);
        if (idx >= 0) {
          self.scene.collect(idx);
          self.updateCounter();
          self.say("Collected. Tap the floor to place another.");
          return;
        }
      }
      self.scene.add(hitPoint.x, hitPoint.y, hitPoint.z);
      self.updateCounter();
      self.say(self.hasOrientation
        ? "Now turn your phone away and back — the crystal stays where you left it."
        : "Drag to look around — the crystal stays where you left it.");
    }

    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onUp);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    this.updateCounter();

    var demoAngle = 0;

    function frame(now) {
      if (!self.running || self.tier === "full") return;
      requestAnimationFrame(frame);

      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(rect.width * dpr));
      var h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }

      self.renderer.beginFrame(w, h, true);
      self.renderer.noDepth();

      if (self.tier === "demo" && !self.hasOrientation && !pointer.down) {
        demoAngle += 0.0022;                       // a slow idle orbit when nobody is touching
        self.drag.yaw = demoAngle;
        self.drag.pitch = -0.32 + Math.sin(demoAngle * 1.7) * 0.06;
      }

      self.cameraQuat(quat);
      compose(camWorld, [0, 0, 0], quat, [1, 1, 1]);
      invertRigid(view, camWorld);
      perspective(proj, fov, rect.width / rect.height, 0.02, 60);
      self.renderer.setCamera(proj, view);

      if (self.tier === "demo") {
        compose(model, [0, -EYE_HEIGHT, 0], [0, 0, 0, 1], [1, 1, 1]);
        self.renderer.draw("grid", model, [0.42, 0.58, 0.95], 0.5, 2, 0, false);
      }

      self.scene.draw(self.renderer, now, 1);
    }
    requestAnimationFrame(frame);

    // Seed the no-camera demo so there is always something moving on screen.
    if (this.tier === "demo" && !this.scene.gems.length) {
      this.scene.add(0, -EYE_HEIGHT, -2.6);
      this.scene.add(2.1, -EYE_HEIGHT, -1.8);
      this.scene.add(-1.9, -EYE_HEIGHT, -2.1);
      this.updateCounter();
    }
  };

  /* ---------------------------------------------------------------- boot */

  function init() {
    var root = document.querySelector("[data-ar-root]");
    if (!root) return;
    try {
      new AR(root);
    } catch (e) {
      root.setAttribute("data-fallback", "css");
      var status = root.querySelector("[data-ar-status]");
      if (status) {
        status.textContent = "The interactive demo couldn't start on this browser — everything else on the page still works.";
        status.setAttribute("data-tone", "warn");
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

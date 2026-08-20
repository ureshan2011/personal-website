/* ==========================================================================
   AR Lab — a dependency-free AR demo, built for cheap phones on slow links.

   Deliberately simple. There is no WebXR, no plane detection and no occlusion:
   those need ARCore-class hardware and fail in too many ways in front of a live
   audience. Instead there is one idea that works nearly everywhere —

       camera feed  +  gyroscope  =  an object anchored in the air.

   You place a crystal, turn away, turn back, and it is still there. That is the
   whole illusion, and it is enough to teach what AR is.

   Three tiers, chosen automatically:
     "sensor" — camera + device orientation. The real thing.
     "drag"   — camera, but no usable motion sensor. Drag to look around.
     "demo"   — no camera at all. Same scene over an animated backdrop.

   iOS note: DeviceOrientationEvent.requestPermission() only works while the
   browser still considers itself inside the user's tap. It is therefore the
   very first thing start() does — before the camera, before anything async.
   ========================================================================== */
(function () {
  "use strict";

  var DEG = Math.PI / 180;
  var MAX_GEMS = 6;
  var PLACE_DISTANCE = 2.2;    // metres in front of the viewer
  var FOV = 62 * DEG;

  /* ---------------------------------------------------------------- maths */

  function mat4() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) / (near - far); out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = 2 * far * near / (near - far); out[15] = 0;
    return out;
  }

  /* The camera never translates here, so the view matrix is just a transpose. */
  function invertRotation(out, m) {
    out[0] = m[0]; out[1] = m[4]; out[2] = m[8]; out[3] = 0;
    out[4] = m[1]; out[5] = m[5]; out[6] = m[9]; out[7] = 0;
    out[8] = m[2]; out[9] = m[6]; out[10] = m[10]; out[11] = 0;
    out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1;
    return out;
  }

  function compose(out, pos, q, s) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;
    out[0] = (1 - (yy + zz)) * s; out[1] = (xy + wz) * s; out[2] = (xz - wy) * s; out[3] = 0;
    out[4] = (xy - wz) * s; out[5] = (1 - (xx + zz)) * s; out[6] = (yz + wx) * s; out[7] = 0;
    out[8] = (xz + wy) * s; out[9] = (yz - wx) * s; out[10] = (1 - (xx + yy)) * s; out[11] = 0;
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

  /* Euler (YXZ) → quaternion, the convention the DeviceOrientation spec uses. */
  function quatFromEulerYXZ(out, x, y, z) {
    var c1 = Math.cos(x / 2), c2 = Math.cos(y / 2), c3 = Math.cos(z / 2);
    var s1 = Math.sin(x / 2), s2 = Math.sin(y / 2), s3 = Math.sin(z / 2);
    out[0] = s1 * c2 * c3 + c1 * s2 * s3;
    out[1] = c1 * s2 * c3 - s1 * c2 * s3;
    out[2] = c1 * c2 * s3 - s1 * s2 * c3;
    out[3] = c1 * c2 * c3 + s1 * s2 * s3;
    return out;
  }

  /* Short-path slerp. Raw sensor data is jittery; easing toward it is what
     makes a gyro-only scene feel steady rather than nervous. */
  function slerp(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var cos = ax * bx + ay * by + az * bz + aw * bw;
    if (cos < 0) { cos = -cos; bx = -bx; by = -by; bz = -bz; bw = -bw; }
    var s0, s1;
    if (1 - cos > 0.000001) {
      var omega = Math.acos(cos), sinOm = Math.sin(omega);
      s0 = Math.sin((1 - t) * omega) / sinOm;
      s1 = Math.sin(t * omega) / sinOm;
    } else {
      s0 = 1 - t; s1 = t;
    }
    out[0] = s0 * ax + s1 * bx;
    out[1] = s0 * ay + s1 * by;
    out[2] = s0 * az + s1 * bz;
    out[3] = s0 * aw + s1 * bw;
    return out;
  }

  /* --------------------------------------------------------------- shaders */

  var VERT = [
    "attribute vec3 aPos;",
    "attribute vec3 aNormal;",
    "uniform mat4 uProj, uView, uModel;",
    "varying vec3 vNormal;",
    "varying vec3 vLocal;",
    "void main(){",
    "  vNormal = mat3(uModel) * aNormal;",
    "  vLocal = aPos;",
    "  gl_Position = uProj * uView * uModel * vec4(aPos, 1.0);",
    "}"
  ].join("\n");

  var FRAG = [
    "precision mediump float;",
    "varying vec3 vNormal;",
    "varying vec3 vLocal;",
    "uniform vec3 uColor;",
    "uniform float uOpacity;",
    "uniform float uMode;",     // 0 = lit solid, 1 = radial glow, 2 = plain line
    "uniform float uPulse;",
    "void main(){",
    "  float alpha = uOpacity;",
    "  vec3 rgb = uColor;",
    "  if (uMode < 0.5) {",
    "    vec3 n = normalize(vNormal);",
    "    float key  = max(dot(n, normalize(vec3(0.45, 0.9, 0.35))), 0.0);",
    "    float fill = max(dot(n, normalize(vec3(-0.5, 0.2, -0.6))), 0.0);",
    "    float rim  = pow(1.0 - abs(n.z), 2.0);",
    "    rgb = uColor * (0.46 + 0.85 * key + 0.22 * fill) + vec3(0.6, 0.78, 1.0) * rim * 0.6;",
    "    rgb += uColor * uPulse * 0.3;",
    "  } else if (uMode < 1.5) {",
    "    float r = length(vLocal.xz);",
    "    alpha *= pow(max(0.0, 1.0 - r), 2.2);",
    "    if (alpha < 0.004) discard;",
    "  }",
    "  gl_FragColor = vec4(rgb, alpha);",
    "}"
  ].join("\n");

  /* -------------------------------------------------------------- geometry */

  /* An elongated octahedron — 8 flat faces, reads as a cut crystal, 24 verts. */
  function gemGeometry() {
    var top = [0, 1.35, 0], bot = [0, -1.0, 0];
    var belt = [[0.62, 0.1, 0], [0, 0.1, 0.62], [-0.62, 0.1, 0], [0, 0.1, -0.62]];
    var pos = [], nor = [];
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
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
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, lines: false };
  }

  /* Unit disc on the XZ plane — used as a camera-facing glow sprite. */
  function discGeometry(segments) {
    var pos = [], nor = [];
    for (var i = 0; i < segments; i++) {
      var a0 = (i / segments) * Math.PI * 2, a1 = ((i + 1) / segments) * Math.PI * 2;
      pos.push(0, 0, 0, Math.cos(a0), 0, Math.sin(a0), Math.cos(a1), 0, Math.sin(a1));
      nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, lines: false };
  }

  /* A horizon grid, only ever drawn in the no-camera tier. */
  function gridGeometry(half, step) {
    var pos = [], nor = [];
    for (var i = -half; i <= half; i += step) {
      pos.push(-half, 0, i, half, 0, i, i, 0, -half, i, 0, half);
      nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
    }
    return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3, lines: true };
  }

  /* -------------------------------------------------------------- renderer */

  function createRenderer(canvas) {
    var opts = { alpha: true, antialias: true, depth: true, premultipliedAlpha: true };
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
    ["uProj", "uView", "uModel", "uColor", "uOpacity", "uMode", "uPulse"].forEach(function (n) {
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
      return { pos: p, nor: n, count: geo.count, lines: geo.lines };
    }

    var meshes = {
      gem: upload(gemGeometry()),
      disc: upload(discGeometry(32)),
      grid: upload(gridGeometry(20, 1))
    };

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    return {
      gl: gl,
      resize: function (w, h) { gl.viewport(0, 0, w, h); },
      clear: function () { gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); },
      setCamera: function (proj, view) {
        gl.uniformMatrix4fv(loc.uProj, false, proj);
        gl.uniformMatrix4fv(loc.uView, false, view);
      },
      draw: function (name, model, color, opacity, mode, pulse, depthWrite) {
        var m = meshes[name];
        if (!m) return;
        gl.uniformMatrix4fv(loc.uModel, false, model);
        gl.uniform3f(loc.uColor, color[0], color[1], color[2]);
        gl.uniform1f(loc.uOpacity, opacity);
        gl.uniform1f(loc.uMode, mode);
        gl.uniform1f(loc.uPulse, pulse || 0);
        gl.depthMask(depthWrite !== false);
        gl.bindBuffer(gl.ARRAY_BUFFER, m.pos);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, m.nor);
        gl.enableVertexAttribArray(aNormal);
        gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(m.lines ? gl.LINES : gl.TRIANGLES, 0, m.count);
        gl.depthMask(true);
      }
    };
  }

  /* ------------------------------------------------------------------ scene */

  var GEM_COLOR = [0.32, 0.52, 1.0];
  var GOLD = [1.0, 0.74, 0.28];
  var GEM_SIZE = 0.17;
  // Squared pick radius in metres. At the 2.2 m placing distance this is a
  // ~45 px target on a phone — comfortable for a finger, tight enough that a
  // tap meant to place a new crystal doesn't collect a nearby one instead.
  var PICK_RADIUS2 = 0.06;

  function Scene() {
    this.gems = [];
    this.collected = 0;
    this.pops = [];
  }

  Scene.prototype.add = function (x, y, z) {
    if (this.gems.length >= MAX_GEMS) this.gems.shift();
    this.gems.push({ x: x, y: y, z: z, born: performance.now(), seed: Math.random() * 6.28 });
  };

  Scene.prototype.pick = function (dx, dy, dz) {
    var best = -1, bestT = Infinity;
    for (var i = 0; i < this.gems.length; i++) {
      var g = this.gems[i];
      var t = g.x * dx + g.y * dy + g.z * dz;
      if (t <= 0) continue;
      var d2 = (g.x * g.x + g.y * g.y + g.z * g.z) - t * t;
      if (d2 < PICK_RADIUS2 && t < bestT) { bestT = t; best = i; }
    }
    return best;
  };

  Scene.prototype.collect = function (i) {
    var g = this.gems.splice(i, 1)[0];
    if (!g) return;
    this.collected++;
    this.pops.push({ x: g.x, y: g.y, z: g.z, born: performance.now() });
  };

  /* True when nothing is roughly in front of the camera — drives the
     "turn around to find it" nudge. */
  Scene.prototype.anyInView = function (fx, fy, fz) {
    for (var i = 0; i < this.gems.length; i++) {
      var g = this.gems[i];
      var len = Math.sqrt(g.x * g.x + g.y * g.y + g.z * g.z) || 1;
      if ((g.x * fx + g.y * fy + g.z * fz) / len > 0.55) return true;
    }
    return false;
  };

  Scene.prototype.draw = function (r, now, camQuat) {
    var m = mat4();
    // billboard rotation: the glow disc always faces the viewer
    var face = quatMultiply([0, 0, 0, 1], camQuat, [Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
    var i;

    for (i = 0; i < this.gems.length; i++) {
      var g = this.gems[i];
      var age = (now - g.born) / 1000;
      var ease = 1 - Math.pow(1 - Math.min(1, age / 0.4), 3);
      var bob = Math.sin(now / 900 + g.seed) * 0.035;
      var pulse = 0.5 + 0.5 * Math.sin(now / 500 + g.seed);

      // soft halo first, without writing depth, so the crystal sits inside it
      compose(m, [g.x, g.y + bob, g.z], face, GEM_SIZE * 3.6 * ease);
      r.draw("disc", m, GEM_COLOR, 0.30 + 0.10 * pulse, 1, 0, false);

      var spin = now / 1500 + g.seed;
      compose(m, [g.x, g.y + bob, g.z], [0, Math.sin(spin / 2), 0, Math.cos(spin / 2)], GEM_SIZE * ease);
      r.draw("gem", m, GEM_COLOR, 1, 0, pulse, true);
    }

    for (i = this.pops.length - 1; i >= 0; i--) {
      var p = this.pops[i];
      var t = (now - p.born) / 650;
      if (t >= 1) { this.pops.splice(i, 1); continue; }
      compose(m, [p.x, p.y + t * 0.4, p.z], face, GEM_SIZE * (1.5 + t * 5));
      r.draw("disc", m, GOLD, 0.75 * (1 - t), 1, 0, false);
    }
  };

  /* -------------------------------------------------------------------- app */

  function ARLab(root) {
    this.root = root;
    this.canvas = root.querySelector("[data-ar-canvas]");
    this.video = root.querySelector("[data-ar-video]");
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
    this.sensorOk = false;
    this.drag = { yaw: 0, pitch: 0 };
    this.quat = [0, 0, 0, 1];        // smoothed camera rotation
    this.target = [0, 0, 0, 1];      // latest reading
    this.hasTarget = false;

    this.bind();
    this.probe();
  }

  ARLab.prototype.say = function (t) { if (this.hint) this.hint.textContent = t; };

  ARLab.prototype.setStatus = function (t, tone) {
    if (!this.status) return;
    this.status.textContent = t;
    this.status.setAttribute("data-tone", tone || "info");
  };

  ARLab.prototype.setBadge = function (t) {
    if (!this.badge) return;
    this.badge.textContent = t;
    this.badge.hidden = !t;
  };

  ARLab.prototype.count = function () {
    if (this.counter) {
      this.counter.textContent = this.scene.gems.length + " placed · " + this.scene.collected + " collected";
    }
  };

  ARLab.prototype.probe = function () {
    var hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    var secure = window.isSecureContext !== false;
    if (!secure) {
      this.setStatus("This page needs to be opened over https:// for the camera and motion sensors to work.", "warn");
      if (this.startBtn) this.startBtn.textContent = "Start 3D demo";
      return;
    }
    if (hasCamera) {
      this.setStatus("Ready. You'll be asked for motion and camera access — both stay on your phone.", "info");
      if (this.startBtn) this.startBtn.textContent = "Start AR";
    } else {
      this.setStatus("No camera on this device — you'll get the animated 3D version.", "info");
      if (this.startBtn) this.startBtn.textContent = "Start 3D demo";
    }
  };

  ARLab.prototype.bind = function () {
    var self = this;
    if (this.startBtn) this.startBtn.addEventListener("click", function () { self.start(); });
    if (this.stopBtn) this.stopBtn.addEventListener("click", function () { self.stop(); });
    if (this.resetBtn) this.resetBtn.addEventListener("click", function () {
      self.scene.gems.length = 0;
      self.scene.collected = 0;
      self.count();
      self.say("Cleared. Tap anywhere to place a new crystal.");
    });
    window.addEventListener("pagehide", function () { self.stop(); });
  };

  /* ------------------------------------------------------------ sensors */

  ARLab.prototype.attachOrientation = function () {
    var self = this;
    if (this.orientationHandler) return;

    this.orientationHandler = function (e) {
      if (e.alpha === null && e.beta === null && e.gamma === null) return;
      var screenAngle = 0;
      if (screen.orientation && typeof screen.orientation.angle === "number") screenAngle = screen.orientation.angle;
      else if (typeof window.orientation === "number") screenAngle = window.orientation;

      var q = self.target;
      quatFromEulerYXZ(q, (e.beta || 0) * DEG, (e.alpha || 0) * DEG, -(e.gamma || 0) * DEG);
      // look out of the back of the phone, then undo the screen rotation
      quatMultiply(q, q, [-Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
      var half = -screenAngle * DEG / 2;
      quatMultiply(q, q, [0, 0, Math.sin(half), Math.cos(half)]);

      if (!self.hasTarget) {
        self.quat[0] = q[0]; self.quat[1] = q[1]; self.quat[2] = q[2]; self.quat[3] = q[3];
        self.hasTarget = true;
      }
      if (!self.sensorOk) {
        self.sensorOk = true;
        self.onSensorFound();
      }
    };

    // "absolute" is what Android Chrome fires; iOS uses the plain event.
    window.addEventListener("deviceorientation", this.orientationHandler, true);
    window.addEventListener("deviceorientationabsolute", this.orientationHandler, true);
  };

  ARLab.prototype.detachOrientation = function () {
    if (!this.orientationHandler) return;
    window.removeEventListener("deviceorientation", this.orientationHandler, true);
    window.removeEventListener("deviceorientationabsolute", this.orientationHandler, true);
    this.orientationHandler = null;
  };

  ARLab.prototype.onSensorFound = function () {
    if (this.tier === "demo") return;
    this.tier = "sensor";
    this.root.setAttribute("data-tier", "sensor");
    this.setBadge("AR · motion tracking on");
    this.say("Tap anywhere to leave a crystal floating in the air.");
  };

  /* iOS gates motion behind a prompt that is only allowed to appear while the
     browser is still inside the user's tap — so this must run synchronously
     from the click handler, before any await. */
  ARLab.prototype.requestMotion = function () {
    var self = this;
    var DOE = window.DeviceOrientationEvent;
    if (!DOE) {
      this.motionState = "unsupported";
      return Promise.resolve(false);
    }
    if (typeof DOE.requestPermission !== "function") {
      this.motionState = "granted";           // Android and older iOS: just listen
      this.attachOrientation();
      return Promise.resolve(true);
    }
    var p;
    try {
      p = DOE.requestPermission();
    } catch (e) {
      this.motionState = "error";
      return Promise.resolve(false);
    }
    return Promise.resolve(p).then(function (state) {
      self.motionState = state;
      if (state === "granted") { self.attachOrientation(); return true; }
      return false;
    }).catch(function () {
      self.motionState = "error";
      return false;
    });
  };

  /* ------------------------------------------------------------- lifecycle */

  ARLab.prototype.start = function () {
    var self = this;
    if (this.running) return;

    // 1. Motion permission FIRST — while we still hold the user gesture.
    var motion = this.requestMotion();

    // 2. Renderer.
    if (!this.renderer) {
      try { this.renderer = createRenderer(this.canvas); } catch (e) { this.renderer = null; }
    }
    if (!this.renderer) {
      this.setStatus("This browser can't run WebGL, so the demo isn't available — the clips below still work.", "warn");
      return;
    }

    this.running = true;
    this.root.setAttribute("data-active", "true");
    if (this.intro) this.intro.hidden = true;
    this.tier = "drag";
    this.root.setAttribute("data-tier", "drag");
    this.setBadge("Starting…");
    this.say("Point your phone at the room around you.");

    // 3. Camera.
    var constraints = {
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 640 }, height: { ideal: 480 },
        frameRate: { ideal: 24, max: 30 }
      }
    };
    var camera = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      ? navigator.mediaDevices.getUserMedia(constraints)
      : Promise.reject(new Error("no camera"));

    camera.then(function (stream) {
      if (!self.running) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      self.stream = stream;
      self.video.srcObject = stream;
      var playing = self.video.play();
      if (playing && playing.catch) playing.catch(function () {});
      self.root.setAttribute("data-camera", "on");
    }).catch(function () {
      self.tier = "demo";
      self.root.setAttribute("data-tier", "demo");
      self.root.removeAttribute("data-camera");
      self.setBadge("3D demo · no camera");
      self.setStatus("No camera feed, so here's the same scene as a 3D animation. Drag to look around.", "warn");
      self.say("Drag to look around. Tap to place a crystal.");
      self.seedDemo();
    });

    // 4. Once we know how motion access went, say something useful about it.
    motion.then(function (ok) {
      if (!self.running || self.tier === "demo") return;
      if (ok) {
        // the listener sets the tier as soon as a real reading arrives; if the
        // hardware never reports, fall back after a fair wait
        setTimeout(function () {
          if (self.running && !self.sensorOk && self.tier !== "demo") self.fallbackToDrag("silent");
        }, 3000);
      } else {
        self.fallbackToDrag(self.motionState);
      }
    });

    this.count();
    this.loop();
  };

  ARLab.prototype.fallbackToDrag = function (reason) {
    if (this.sensorOk || this.tier === "demo") return;
    this.tier = "drag";
    this.root.setAttribute("data-tier", "drag");
    this.setBadge("AR · drag to look");
    if (reason === "denied") {
      this.setStatus("Motion access was declined, so drag across the picture to look around instead. On iPhone you can re-enable it in Settings → Apps → Safari → Motion & Orientation Access.", "warn");
    } else if (reason === "unsupported" || reason === "error") {
      this.setStatus("This browser doesn't expose motion sensors, so drag across the picture to look around instead.", "warn");
    } else {
      this.setStatus("No motion readings from this phone — drag across the picture to look around instead.", "warn");
    }
    this.say("Drag across the picture to look around, then tap to place a crystal.");
  };

  ARLab.prototype.stop = function () {
    this.running = false;
    if (this.stream) {
      this.stream.getTracks().forEach(function (t) { t.stop(); });
      this.stream = null;
    }
    if (this.video) this.video.srcObject = null;
    this.detachOrientation();
    this.sensorOk = false;
    this.hasTarget = false;
    this.root.removeAttribute("data-active");
    this.root.removeAttribute("data-camera");
    this.root.removeAttribute("data-tier");
    this.setBadge("");
    if (this.intro) this.intro.hidden = false;
  };

  ARLab.prototype.seedDemo = function () {
    if (this.scene.gems.length) return;
    this.scene.add(0, 0.05, -2.4);
    this.scene.add(2.0, 0.35, -1.4);
    this.scene.add(-1.9, -0.15, -1.7);
    this.count();
  };

  /* ------------------------------------------------------------ interaction */

  /* A screen point → a unit ray in world space. */
  ARLab.prototype.ray = function (clientX, clientY, camWorld, out) {
    var rect = this.canvas.getBoundingClientRect();
    var ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    var ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;
    var aspect = rect.width / rect.height;
    var tan = Math.tan(FOV / 2);
    var dx = ndcX * tan * aspect, dy = ndcY * tan, dz = -1;
    var m = camWorld;
    var wx = m[0] * dx + m[4] * dy + m[8] * dz;
    var wy = m[1] * dx + m[5] * dy + m[9] * dz;
    var wz = m[2] * dx + m[6] * dy + m[10] * dz;
    var len = Math.sqrt(wx * wx + wy * wy + wz * wz) || 1;
    out[0] = wx / len; out[1] = wy / len; out[2] = wz / len;
    return out;
  };

  ARLab.prototype.loop = function () {
    var self = this;
    var canvas = this.canvas;
    var proj = mat4(), view = mat4(), camWorld = mat4();
    var dir = [0, 0, -1];
    var demoAngle = 0;
    var lastNudge = 0;

    var pointer = { down: false, moved: false, x: 0, y: 0, lx: 0, ly: 0 };

    function point(e) { return e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0]) || e; }

    function onDown(e) {
      var p = point(e);
      pointer.down = true; pointer.moved = false;
      pointer.x = pointer.lx = p.clientX;
      pointer.y = pointer.ly = p.clientY;
    }
    function onMove(e) {
      if (!pointer.down) return;
      var p = point(e);
      if (Math.abs(p.clientX - pointer.x) > 10 || Math.abs(p.clientY - pointer.y) > 10) pointer.moved = true;
      if (!self.sensorOk) {
        self.drag.yaw -= (p.clientX - pointer.lx) * 0.005;
        self.drag.pitch -= (p.clientY - pointer.ly) * 0.005;
        self.drag.pitch = Math.max(-1.3, Math.min(1.3, self.drag.pitch));
        pointer.lx = p.clientX; pointer.ly = p.clientY;
        if (e.cancelable) e.preventDefault();
      }
    }
    function onUp(e) {
      if (!pointer.down) return;
      pointer.down = false;
      if (pointer.moved) return;
      var p = point(e);
      self.ray(p.clientX, p.clientY, camWorld, dir);

      var hit = self.scene.pick(dir[0], dir[1], dir[2]);
      if (hit >= 0) {
        self.scene.collect(hit);
        self.count();
        self.say(self.scene.gems.length
          ? "Collected. " + self.scene.gems.length + " still out there."
          : "All collected. Tap again to hide more.");
        return;
      }
      self.scene.add(dir[0] * PLACE_DISTANCE, dir[1] * PLACE_DISTANCE, dir[2] * PLACE_DISTANCE);
      self.count();
      self.say(self.sensorOk
        ? "Now turn away and come back — it stays where you left it."
        : "Drag to look around — it stays where you left it.");
    }

    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onUp);
    canvas.addEventListener("touchcancel", function () { pointer.down = false; });
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    function frame(now) {
      if (!self.running) return;
      requestAnimationFrame(frame);

      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // capped device pixel ratio: cheap phones would rather have the frame rate
      var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      var w = Math.max(1, Math.round(rect.width * dpr));
      var h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      self.renderer.resize(w, h);
      self.renderer.clear();

      if (self.sensorOk) {
        slerp(self.quat, self.quat, self.target, 0.25);
      } else {
        if (self.tier === "demo" && !pointer.down) {
          demoAngle += 0.0022;
          self.drag.yaw = demoAngle;
          self.drag.pitch = -0.12 + Math.sin(demoAngle * 1.7) * 0.07;
        }
        var cy = Math.cos(self.drag.yaw / 2), sy = Math.sin(self.drag.yaw / 2);
        var cp = Math.cos(self.drag.pitch / 2), sp = Math.sin(self.drag.pitch / 2);
        self.quat[0] = cy * sp; self.quat[1] = sy * cp;
        self.quat[2] = -sy * sp; self.quat[3] = cy * cp;
      }

      compose(camWorld, [0, 0, 0], self.quat, 1);
      invertRotation(view, camWorld);
      perspective(proj, FOV, rect.width / rect.height, 0.02, 60);
      self.renderer.setCamera(proj, view);

      if (self.tier === "demo") {
        var g = mat4();
        compose(g, [0, -1.45, 0], [0, 0, 0, 1], 1);
        self.renderer.draw("grid", g, [0.42, 0.58, 0.95], 0.5, 2, 0, false);
      }

      self.scene.draw(self.renderer, now, self.quat);

      // gentle nudge when everything is behind you
      if (self.sensorOk && self.scene.gems.length && now - lastNudge > 1400) {
        lastNudge = now;
        var inView = self.scene.anyInView(-camWorld[8], -camWorld[9], -camWorld[10]);
        if (!inView) self.say("Turn around slowly — your crystals are behind you.");
      }
    }
    requestAnimationFrame(frame);
  };

  /* ---------------------------------------------------------------- boot */

  function init() {
    var root = document.querySelector("[data-ar-root]");
    if (!root) return;
    try {
      new ARLab(root);
    } catch (e) {
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

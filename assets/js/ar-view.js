/* ==========================================================================
   AR View — one object, opened in the phone's own AR viewer.

   The page does two jobs and nothing else:
     1. Work out, honestly, whether this device can show AR.
     2. If it can, hand one 3D file to the viewer built into the phone —
        AR Quick Look on iPhone and iPad, Google's Scene Viewer on Android.

   Those viewers find the floor, track the phone as you walk, light the object
   to match the room and cast its shadow — far better than a web page can. If
   neither is available, the page says so and explains why, instead of faking
   it with a gyroscope or a canned animation.

   Both model files are built by scripts/ar-crystal/build.py.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.querySelector("[data-ar-root]");
  if (!root) return;

  var USDZ = "assets/models/crystal.usdz";
  var GLB = "assets/models/crystal.glb";
  var MODEL_TITLE = "Blue crystal cluster";
  var FAILED_HASH = "#ar-failed";
  var ARCORE_DEVICES = "https://developers.google.com/ar/devices";
  var ARCORE_STORE = "https://play.google.com/store/apps/details?id=com.google.ar.core";

  var el = {
    state: root.querySelector("[data-ar-state]"),
    title: root.querySelector("[data-ar-title]"),
    body: root.querySelector("[data-ar-body]"),
    launch: root.querySelector("[data-ar-launch]"),
    actions: root.querySelector("[data-ar-actions]"),
    tips: root.querySelector("[data-ar-tips]"),
    qr: root.querySelector("[data-ar-qr]")
  };

  /* ------------------------------------------------------------ detection */

  var ua = navigator.userAgent || "";
  var isIPad = /iPad/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isIOS = isIPad || /iPhone|iPod/.test(ua);
  var isAndroid = /Android/i.test(ua);
  var isHeadset = /OculusBrowser|Quest|Pico|Wolvic/i.test(ua);
  // Apps that open links in their own browser, where AR is blocked.
  var inApp = /FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|TikTok|musical_ly|BytedanceWebview|LinkedInApp|Pinterest|WhatsApp|MicroMessenger|; wv\)/i.test(ua);

  /* iOS: AR Quick Look runs in Safari, and in the browsers known to pass it
     through (the same allow-list <model-viewer> uses). Any other app's web
     view would silently do nothing, so it counts as unsupported. */
  function quickLookAvailable() {
    if (!isIOS) return false;
    var webView = !!(window.webkit && window.webkit.messageHandlers);
    if (webView) return /CriOS\/|EdgiOS\/|FxiOS\/|GSA\/|DuckDuckGo\//.test(ua);
    var a = document.createElement("a");
    return !!(a.relList && a.relList.supports && a.relList.supports("ar"));
  }

  /* Android: Chrome answers "can this device do AR?" through WebXR, which is
     true only on phones certified for ARCore — the same engine Scene Viewer
     needs. Resolves true, false, or null when the browser can't answer; a
     slow answer counts as "no". */
  function arCoreAvailable() {
    var xr = navigator.xr;
    if (!xr || typeof xr.isSessionSupported !== "function") return Promise.resolve(null);
    return new Promise(function (resolve) {
      var timer = setTimeout(function () { resolve(false); }, 4000);
      Promise.resolve()
        .then(function () { return xr.isSessionSupported("immersive-ar"); })
        .then(function (ok) { clearTimeout(timer); resolve(!!ok); },
              function () { clearTimeout(timer); resolve(false); });
    });
  }

  function isChrome() {
    return /Chrome\/\d/.test(ua) && !/SamsungBrowser|OPR\/|EdgA\/|YaBrowser|UCBrowser|Firefox|; wv\)/.test(ua);
  }

  function detect() {
    if (window.isSecureContext === false) return Promise.resolve({ result: "insecure" });
    if (inApp && (isIOS || isAndroid)) return Promise.resolve({ result: "in-app" });
    if (isIOS) {
      if (quickLookAvailable()) return Promise.resolve({ result: "ready", viewer: "quick-look" });
      return Promise.resolve({ result: (window.webkit && window.webkit.messageHandlers) ? "in-app" : "ios-old" });
    }
    if (isAndroid && !isHeadset) {
      if (/Firefox/.test(ua)) return Promise.resolve({ result: "use-chrome" });
      return arCoreAvailable().then(function (ok) {
        if (ok) return { result: "ready", viewer: "scene-viewer" };
        // only a current Chrome saying "no" is a verdict on the phone itself
        return { result: ok === false && isChrome() ? "no-arcore" : "use-chrome" };
      });
    }
    return Promise.resolve({ result: isHeadset ? "headset" : "desktop" });
  }

  /* -------------------------------------------------------------- launch */

  function absolute(path) {
    return new URL(path, location.href).href;
  }

  function openQuickLook() {
    // Safari only hands a link to AR Quick Look when it carries rel="ar" and
    // wraps an <img>. A hidden one, clicked inside the user's tap, is enough.
    var a = document.createElement("a");
    a.rel = "ar";
    a.href = absolute(USDZ);
    a.appendChild(document.createElement("img"));
    a.style.display = "none";
    root.appendChild(a);
    a.click();
    root.removeChild(a);
  }

  function openSceneViewer() {
    var page = location.href.replace(/#.*$/, "");
    var params = "file=" + encodeURIComponent(absolute(GLB)) +
      "&mode=ar_only&title=" + encodeURIComponent(MODEL_TITLE);
    // If ARCore is missing Chrome opens the fallback URL instead — this page
    // with a marker on the end, which the hashchange handler below reports.
    var intent = "intent://arvr.google.com/scene-viewer/1.0?" + params +
      "#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;" +
      "S.browser_fallback_url=" + encodeURIComponent(page + FAILED_HASH) + ";end;";
    var a = document.createElement("a");
    a.href = intent;
    a.style.display = "none";
    root.appendChild(a);
    a.click();
    root.removeChild(a);
  }

  /* ---------------------------------------------------------------- views */

  function device() {
    if (isIPad) return "iPad";
    if (isIOS) return "iPhone";
    return "Android phone";
  }

  function link(href, text) {
    return '<a href="' + href + '" target="_blank" rel="noopener">' + text + "</a>";
  }

  var browserForPlatform = isIOS ? "Safari" : "Chrome";

  var VIEWS = {
    checking: {
      tone: "info", chip: "Checking",
      title: "Checking your device…",
      body: "This takes a moment."
    },
    ready: {
      tone: "good", chip: "AR ready",
      title: function () { return "Ready on this " + device(); },
      body: function (v) {
        return "Tap the button, then point your camera at the floor or a table and move it slowly " +
          "from side to side. The crystal lands as soon as a surface is found. " +
          (v === "scene-viewer"
            ? "It opens in Google's AR viewer — allow camera access if asked."
            : "It opens in Apple's AR Quick Look.");
      },
      launch: true, tips: true
    },
    failed: {
      tone: "warn", chip: "AR didn't start",
      title: "Your phone couldn't open the AR viewer",
      body: "This usually means <b>Google Play Services for AR</b> is missing or out of date. " +
        "Install or update it, then try again. If the Play Store says your phone isn't compatible, " +
        "it can't run AR — sorry.",
      actions: [
        { href: ARCORE_STORE, text: "Get Google Play Services for AR", solid: true, external: true },
        { retry: true, text: "Try again" }
      ]
    },
    desktop: {
      tone: "warn", chip: "Not available here",
      title: "AR needs a phone or tablet",
      body: "A laptop or desktop can't see your floor, so there's nothing to put the crystal on. " +
        "Scan this code with your phone's camera to open this page there.",
      qr: true
    },
    headset: {
      tone: "warn", chip: "Not available here",
      title: "This demo is built for phones",
      body: "It hands the crystal to the AR viewer built into iPhone and Android phones, " +
        "which headsets don't have. Open this page on a phone or tablet instead."
    },
    "in-app": {
      tone: "warn", chip: "Not available here",
      title: "Open this page in " + browserForPlatform,
      body: "You're viewing it inside another app — Instagram, Facebook, WhatsApp and the like — " +
        "and those block AR. Use the app's menu (often <b>⋯</b> or <b>⋮</b>) and choose " +
        "<b>Open in browser</b>, or copy the link into " + browserForPlatform + ".",
      copy: true
    },
    "use-chrome": {
      tone: "warn", chip: "Not available here",
      title: "Open this page in Chrome",
      body: "On Android, AR works through Google Chrome, and this browser couldn't confirm it " +
        "can hand over to the AR viewer. Copy the link into an up-to-date Chrome and try there.",
      copy: true
    },
    "no-arcore": {
      tone: "warn", chip: "Not supported",
      title: "This phone can't run AR",
      body: "Chrome reports that this phone isn't certified for Google's ARCore, which every Android " +
        "AR app depends on. Rather than show you a wobbly imitation, the demo stops here. " +
        link(ARCORE_DEVICES, "See which phones are supported ↗")
    },
    "ios-old": {
      tone: "warn", chip: "Not supported",
      title: "This browser can't open AR",
      body: "AR on iPhone and iPad uses Apple's AR Quick Look, which needs iOS 12 or later on an " +
        "iPhone 6s or newer. Update iOS if you can, then open this page in Safari."
    },
    insecure: {
      tone: "warn", chip: "Not available here",
      title: "AR needs a secure connection",
      body: "Open this page from https://www.yasassri.me/ar.html — phones refuse AR on insecure pages."
    }
  };

  var current = { result: "checking" };

  function val(x) {
    return typeof x === "function" ? x(current.viewer) : x;
  }

  function render(state) {
    current = state;
    var v = VIEWS[state.result] || VIEWS.desktop;
    root.setAttribute("data-ar", state.result);
    el.state.setAttribute("data-tone", v.tone);
    el.state.textContent = v.chip;
    el.title.textContent = val(v.title);
    el.body.innerHTML = val(v.body);
    el.launch.hidden = !v.launch;
    el.tips.hidden = !v.tips;
    el.qr.hidden = !v.qr;

    el.actions.innerHTML = "";
    (v.actions || []).forEach(function (a) {
      var node;
      if (a.retry) {
        node = document.createElement("button");
        node.type = "button";
        node.addEventListener("click", launch);
      } else {
        node = document.createElement("a");
        node.href = a.href;
        if (a.external) { node.target = "_blank"; node.rel = "noopener"; }
      }
      node.className = "btn" + (a.solid ? " btn-solid" : "");
      node.textContent = a.text;
      el.actions.appendChild(node);
    });
    if (v.copy) el.actions.appendChild(copyButton());
  }

  function copyButton() {
    var canonical = document.querySelector('link[rel="canonical"]');
    var url = canonical ? canonical.href : location.href.replace(/#.*$/, "");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-solid";
    btn.textContent = "Copy link";
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Link copied"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { btn.textContent = url; });
      } else {
        btn.textContent = url;   // still readable, and selectable on long-press
      }
    });
    return btn;
  }

  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  }

  function launch() {
    if (current.result === "failed") {
      current = { result: "ready", viewer: "scene-viewer" };
      render(current);
    }
    if (current.result !== "ready") return;
    track("ar_launch", { viewer: current.viewer });
    if (current.viewer === "quick-look") openQuickLook();
    else openSceneViewer();
  }

  function checkFallback() {
    if (location.hash !== FAILED_HASH) return false;
    // drop the marker so a reload doesn't repeat the message
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search + "#try");
    if (!isAndroid) return false;   // a shared or bookmarked link, not a real fallback
    render({ result: "failed", viewer: "scene-viewer" });
    track("ar_support", { result: "failed" });
    // Move focus to the message so screen readers land on it. On a fresh
    // load the browser resets focus once loading ends, so wait for that.
    var focus = function () {
      root.scrollIntoView({ block: "center" });
      el.title.focus({ preventScroll: true });
    };
    if (document.readyState === "complete") focus();
    else window.addEventListener("load", function () { setTimeout(focus, 0); }, { once: true });
    return true;
  }

  /* ----------------------------------------------------------------- boot */

  el.launch.addEventListener("click", launch);
  window.addEventListener("hashchange", checkFallback);

  render(current);
  if (checkFallback()) return;
  detect().then(function (state) {
    if (current.result === "failed") return;   // the fallback arrived first
    render(state);
    track("ar_support", { result: state.result });
  });
})();

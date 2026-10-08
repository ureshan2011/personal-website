/* Hero welcome video: a "Say hello" button on the portrait plays a short
   talking clip that cross-fades in over the still photo and fades back out
   when it ends. Nothing is downloaded until the visitor presses play, and the
   button only appears once assets/video/welcome.mp4 actually exists. */
(function () {
  "use strict";
  var video = document.getElementById("heroWelcome");
  var btn = document.getElementById("heroWelcomeBtn");
  var note = document.getElementById("heroWelcomeNote");
  var cc = document.getElementById("heroWelcomeCc");
  if (!video || !btn || !window.fetch) return;

  var label = btn.querySelector(".hero-welcome-label");
  var arch = video.closest(".hero-arch");

  function setPlaying(on) {
    arch.classList.toggle("is-talking", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    label.textContent = on ? "Stop" : "Say hello";
    note.hidden = !on;
    if (!on) cc.textContent = "";
  }

  function stop() {
    video.pause();
    setPlaying(false);
    // Rewind after the fade so the next play starts on the frame that matches the photo
    setTimeout(function () { if (video.paused) video.currentTime = 0; }, 600);
  }

  btn.addEventListener("click", function () {
    if (!video.paused) { stop(); return; }
    video.muted = false;
    var p = video.play();
    setPlaying(true);
    if (p && p.catch) p.catch(function () { setPlaying(false); });
    if (window.gtag) window.gtag("event", "welcome_video_play");
  });

  video.addEventListener("ended", stop);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !video.paused) stop();
  });

  // Custom captions (native ones get cropped by object-fit: cover)
  var track = video.textTracks && video.textTracks[0];
  if (track) {
    track.mode = "hidden";
    track.addEventListener("cuechange", function () {
      var cue = track.activeCues && track.activeCues[0];
      cc.textContent = cue ? cue.text : "";
    });
  }

  // Reveal the button only when the clip is deployed (the host serves an
  // HTML page for missing files, so check the content type too).
  function check() {
    fetch("assets/video/welcome.mp4", { method: "HEAD" }).then(function (r) {
      var type = r.headers.get("content-type") || "";
      if (r.ok && type.indexOf("video/") === 0) btn.hidden = false;
    }).catch(function () {});
  }
  if ("requestIdleCallback" in window) requestIdleCallback(check, { timeout: 3000 });
  else window.addEventListener("load", check);
})();

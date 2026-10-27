/* video-teaser.js — muted trailers that play while they are on screen.

   Markup: <video data-teaser muted loop playsinline preload="none" poster="…">
   plus an optional sibling <button data-teaser-sound> that turns sound on/off.
   Nothing autoplays for visitors who ask for reduced motion; they get the
   poster and can start the trailer with the sound button. Nothing is
   downloaded until a trailer first scrolls into view. */
(function () {
  var videos = document.querySelectorAll('video[data-teaser]');
  if (!videos.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  Array.prototype.forEach.call(videos, function (v) {
    var btn = v.parentNode.querySelector('[data-teaser-sound]');
    if (btn) {
      btn.addEventListener('click', function () {
        var on = v.muted;
        v.muted = !on;
        if (on) { v.currentTime = 0; play(v); }
        btn.setAttribute('aria-pressed', String(on));
        btn.textContent = on ? 'Sound off' : 'Sound on';
      });
    }
    if (reduced || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= 0.4) play(v);
        else if (!v.paused && v.muted) v.pause();
      });
    }, { threshold: [0, 0.4] });
    io.observe(v);
  });
})();

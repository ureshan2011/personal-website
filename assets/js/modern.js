/* ============================================================
   modern.js — Vanilla JS for redesigned personal website
   No jQuery dependency for these features
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Navigation ────────────────────────────────────────── */
  const nav = document.querySelector('.m-nav');
  const hamburger = document.querySelector('.m-nav__hamburger');
  const mobileMenu = document.querySelector('.m-nav__mobile');
  const navLinks = document.querySelectorAll('.m-nav__link');

  // Sticky nav on scroll
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      this.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 2. Smooth Scrolling ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = nav ? nav.offsetHeight + 20 : 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── 3. Active Nav Link on Scroll (ScrollSpy) ─────────────── */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + (nav ? nav.offsetHeight : 0) + 50;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.m-nav__link[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── 4. Scroll Reveal (Intersection Observer) ─────────────── */
  var revealElements = document.querySelectorAll(
    '.m-reveal, .m-reveal-left, .m-reveal-right'
  );

  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: show all immediately
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 5. Skills Progress Bar Animation ────────────────────── */
  var skillBars = document.querySelectorAll('.m-skill__fill');

  if ('IntersectionObserver' in window && skillBars.length) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var pct = bar.getAttribute('data-pct') || '0';
          bar.style.width = pct + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(function (bar) { skillObserver.observe(bar); });
  }

  /* ── 6. Stats Count-Up Animation ─────────────────────────── */
  var statNumbers = document.querySelectorAll('.m-stat__number[data-target]');

  function animateCount(el, target, duration) {
    var start = 0;
    var startTime = null;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var val = Math.floor(progress * target);
      el.textContent = prefix + val + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCount(el, target, 1500);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(function (el) { statsObserver.observe(el); });
  }

  /* ── 7. Portfolio Filter ──────────────────────────────────── */
  var filterBtns = document.querySelectorAll('.m-portfolio__filter');
  var portfolioItems = document.querySelectorAll('.m-portfolio-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      portfolioItems.forEach(function (item) {
        if (filter === '*' || item.classList.contains(filter)) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function () {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.transition = 'opacity 0.25s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function () { item.style.display = 'none'; }, 260);
        }
      });
    });
  });

  /* ── 8. Contact Form (Formspree) ──────────────────────────── */
  var form = document.getElementById('contactform');
  var formResult = document.getElementById('contactform-result');

  if (form && formResult) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      var data = new FormData(form);

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            formResult.innerHTML =
              '<p class="m-form__result m-form__result--success">Thank you! Your message has been sent.</p>';
            form.reset();
          } else {
            formResult.innerHTML =
              '<p class="m-form__result m-form__result--error">Something went wrong. Please try again.</p>';
          }
        })
        .catch(function () {
          formResult.innerHTML =
            '<p class="m-form__result m-form__result--error">Network error. Please try again.</p>';
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  /* ── 9. Preloader ─────────────────────────────────────────── */
  var preloader = document.querySelector('.m-preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.4s ease';
        setTimeout(function () { preloader.style.display = 'none'; }, 400);
      }, 200);
    });
  }

})();

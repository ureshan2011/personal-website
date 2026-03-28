/* ============================================
   PREMIUM INTERACTIONS
   Scroll reveals, navigation, portfolio filter,
   form handling, and micro-interactions
   ============================================ */

(function () {
  'use strict';

  // --- Preloader ---
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('loaded');
      }, 300);
    }
  });

  // --- Scroll Reveal (Intersection Observer) ---
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-image, .reveal-line');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Animate skill bars when they become visible
          if (entry.target.classList.contains('reveal-stagger')) {
            var skillItems = entry.target.querySelectorAll('.premium-skill-item');
            skillItems.forEach(function (item) {
              item.classList.add('revealed');
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Navigation scroll behavior ---
  function initNavigation() {
    var nav = document.getElementById('mainNav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
  }

  window.closeMobileMenu = function () {
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');
    if (toggle) toggle.classList.remove('active');
    if (menu) menu.classList.remove('active');
    document.body.style.overflow = '';
  };

  // --- Portfolio Filter ---
  function initPortfolioFilter() {
    var buttons = document.querySelectorAll('.premium-portfolio-filter button');
    var items = document.querySelectorAll('.premium-portfolio-item');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        items.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(function () {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // --- Contact Form ---
  function initContactForm() {
    var form = document.getElementById('contactform');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var resultDiv = document.getElementById('contactform-result');
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          resultDiv.innerHTML = '<p style="color: #2a9d5c; margin-top: 1rem;">Message sent successfully. Thank you!</p>';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(function () {
        resultDiv.innerHTML = '<p style="color: #e74c3c; margin-top: 1rem;">Something went wrong. Please try again.</p>';
      })
      .finally(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // --- Active nav link on scroll ---
  function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.premium-nav__links a');

    window.addEventListener('scroll', function () {
      var scrollPos = window.pageYOffset + 120;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--color-heading)';
              link.style.fontWeight = '600';
            } else {
              link.style.fontWeight = '';
            }
          });
        }
      });
    }, { passive: true });
  }

  // --- Init all ---
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initNavigation();
    initMobileMenu();
    initPortfolioFilter();
    initContactForm();
    initScrollSpy();
  });

})();

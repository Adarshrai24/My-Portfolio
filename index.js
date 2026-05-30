/* ─────────────────────────────────────────────────────────────────
   index.js  —  minimal, no dependencies
   ───────────────────────────────────────────────────────────────── */

'use strict';

// ── 1. Set current year in footer ────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


// ── 2. Terminal typewriter on hero ────────────────────────────────
(function typewriter() {
  const el     = document.getElementById('typed-cmd');
  const cursor = document.getElementById('cursor');
  const text   = 'cat about.txt';
  let   i      = 0;

  // Hide cursor during typing, then show blinking cursor after
  cursor.style.visibility = 'hidden';

  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i === text.length) {
      clearInterval(interval);
      cursor.style.visibility = 'visible';
    }
  }, 80);
})();


// ── 3. Intersection Observer — fade-in sections ───────────────────
(function fadeInSections() {
  // Only animate if user hasn't requested reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.link-card, .project-card, .hero-body, .ascii-block'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach(el => observer.observe(el));
})();


// ── 4. Active nav link highlight on scroll ────────────────────────
(function activeNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActive = (id) => {
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${id}`;
      link.style.color = active ? 'var(--green)' : '';
    });
  };

  // Simple scroll-spy using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();

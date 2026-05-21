/* ============================================================
   FAHRENHEIT 451 — Shared Script
   ============================================================ */

/* --- PRELOADER -------------------------------------------- */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const counter = document.getElementById('preloaderCount');
  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 25) + 8;
    if (count >= 451) { count = 451; clearInterval(interval); }
    if (counter) counter.textContent = count;
    if (count === 451) setTimeout(() => preloader.classList.add('done'), 300);
  }, 30);
})();

/* --- LENIS SMOOTH SCROLL ---------------------------------- */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* Fix anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); lenis.scrollTo(target); }
    });
  });
}

/* --- SCROLL PROGRESS BAR ---------------------------------- */
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

/* --- NAVIGATION ------------------------------------------- */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        if (current > 200 && current > lastScroll) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
        lastScroll = current;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Mobile hamburger */
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('navOverlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    overlay.setAttribute('aria-hidden', String(expanded));
    overlay.classList.toggle('open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  overlay.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* --- CUSTOM CURSOR ---------------------------------------- */
if (window.matchMedia('(hover: hover)').matches) {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (cursor && follower) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
  }
}

/* --- INTERSECTION OBSERVER REVEALS ------------------------ */
(function () {
  const reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('revealed'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
})();

/* --- STAGGERED CHILDREN ----------------------------------- */
(function () {
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = (i * 80) + 'ms';
    });
  });
})();

/* --- WORD-BY-WORD TEXT SPLIT REVEAL ----------------------- */
(function () {
  if (typeof SplitType === 'undefined') return;

  document.querySelectorAll('[data-split]').forEach(el => {
    const split = new SplitType(el, { types: 'words' });
    split.words.forEach((word, i) => {
      word.style.opacity = '0';
      word.style.transform = 'translateY(20px)';
      word.style.display = 'inline-block';
      word.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s,
                               transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`;
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          split.words.forEach(w => {
            w.style.opacity = '1';
            w.style.transform = 'translateY(0)';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    obs.observe(el);
  });
})();

/* --- TOUCH: REDACTED TOGGLE ------------------------------- */
(function () {
  document.querySelectorAll('.redacted').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('redacted--revealed');
    });
  });
})();

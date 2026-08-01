/* ============================================================
   ASTRAFOLIO — main.js
   Loader, particles, theme, nav, reveal, stats, filters, newsletter
   ============================================================ */
(() => {
  'use strict';

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  const hideLoader = () => {
    const l = $('#loader');
    if (!l) return;
    l.classList.add('hide');
    setTimeout(() => l.remove(), 700);
  };
  window.addEventListener('load', () => setTimeout(hideLoader, 700));

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('astrafolio-theme');
  if (storedTheme) root.setAttribute('data-theme', storedTheme);
  const themeBtn = $('#themeToggle');
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('astrafolio-theme', next);
  });

  /* ---------- Sticky nav ---------- */
  const navWrap = $('#navWrap');
  const onScroll = () => {
    if (window.scrollY > 24) navWrap?.classList.add('scrolled');
    else navWrap?.classList.remove('scrolled');
    $('#backTop')?.classList.toggle('is-visible', window.scrollY > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = $('#navToggle');
  const navMenu   = $('#navMenu');
  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#navMenu a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }));

  /* ---------- Active link on scroll ---------- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
  };
  document.addEventListener('scroll', setActive, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(c => c.textContent = (parseInt(c.dataset.target,10)||0).toLocaleString());
  }

  /* ---------- Particles (lightweight canvas) ---------- */
  const canvas = $('#particles');
  if (canvas && !prefersReduce) {
    const ctx = canvas.getContext('2d');
    let w, h, parts;
    const COLORS = ['rgba(0,229,255,', 'rgba(139,92,246,', 'rgba(244,114,182,'];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth = canvas.offsetWidth;
      h = canvas.clientHeight = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = Math.min(110, Math.floor((w * h) / 18000));
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.4,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + '0.9)';
        ctx.fill();
      });
      // connections
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 110*110) {
            const alpha = (1 - Math.sqrt(d2)/110) * 0.18;
            ctx.strokeStyle = a.c + alpha + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ---------- Custom cursor (desktop) ---------- */
  const dot = $('.cursor-dot'), ring = $('.cursor-ring');
  if (dot && ring && window.matchMedia('(min-width: 901px)').matches && !prefersReduce) {
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let rx = mx, ry = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    $$('a, button, .cat-card, .post-card, .tech-card, .why-card, .testi, .pill').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---------- Articles: filter + search ---------- */
  const grid = $('#articleGrid');
  const search = $('#articleSearch');
  const pills = $$('#filterPills .pill');
  const empty = $('#emptyState');
  let activeFilter = 'all';
  let query = '';

  const applyFilters = () => {
    if (!grid) return;
    let shown = 0;
    $$('.post-card', grid).forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const body  = card.querySelector('p')?.textContent.toLowerCase() || '';
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesQuery  = !query || title.includes(query) || body.includes(query);
      const show = matchesFilter && matchesQuery;
      card.classList.toggle('is-hidden', !show);
      if (show) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  };

  pills.forEach(p => p.addEventListener('click', () => {
    pills.forEach(x => x.classList.remove('is-active'));
    p.classList.add('is-active');
    activeFilter = p.dataset.filter;
    applyFilters();
  }));
  search?.addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); applyFilters(); });

  /* ---------- Category cards -> set filter ---------- */
  $$('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      const target = pills.find(p => p.dataset.filter === cat);
      if (target) target.click();
      document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Newsletter ---------- */
  const form = $('#newsletterForm');
  const msg  = $('#newsletterMsg');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#emailInput');
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      if (msg) { msg.hidden = false; msg.textContent = 'Please enter a valid email address.'; msg.style.color = '#F472B6'; }
      return;
    }
    if (msg) { msg.hidden = false; msg.textContent = '🎉 You’re in! Welcome to ASTRAFOLIO.'; msg.style.color = 'var(--neon)'; }
    input.value = '';
  });

  /* ---------- Smooth scroll offset for sticky nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Service worker (PWA) ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {/* silent */});
    });
  }
})();

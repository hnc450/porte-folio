/* =========================================================
   HENOCK TUMONAKIESE — PORTFOLIO
   script.js — interactions, animations, thème, formulaire
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ANNÉE FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INIT AOS ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* =========================================================
     LOADER
  ========================================================= */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderStatus = document.getElementById('loaderStatus');

  const loaderSteps = [
    'Initialisation du serveur…',
    'Connexion à la base de données…',
    'Chargement des routes API…',
    'Compilation des assets…',
    'Prêt.'
  ];

  let progress = 0;
  let stepIndex = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) progress = 100;
    if (loaderFill) loaderFill.style.width = progress + '%';
    const newStep = Math.min(loaderSteps.length - 1, Math.floor((progress / 100) * loaderSteps.length));
    if (newStep !== stepIndex && loaderStatus) {
      stepIndex = newStep;
      loaderStatus.textContent = loaderSteps[stepIndex];
    }
    if (progress >= 100) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        if (loader) loader.classList.add('hide');
        document.body.style.overflow = '';
        if (window.AOS) AOS.refreshHard();
        animateSkillBars();
        animateCounters();
      }, 350);
    }
  }, 180);

  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 2200);

  /* =========================================================
     THEME (Dark / Light) — localStorage + détection système
  ========================================================= */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(savedTheme || (systemPrefersLight ? 'light' : 'dark'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (!isTouch && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const growTargets = 'a, button, .tilt, .project-card, .value-card, .skill-card, input, textarea';
    document.querySelectorAll(growTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('grow'));
    });
  }

  /* =========================================================
     SCROLL PROGRESS BAR
  ========================================================= */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';
  }

  /* =========================================================
     NAVBAR — état scroll + lien actif
  ========================================================= */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');

  function updateNavbar() {
    const scrolled = window.scrollY > 40;
    navbar && navbar.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.style.opacity = window.scrollY > 500 ? '1' : '.4';

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
  }, { passive: true });

  updateScrollProgress();
  updateNavbar();

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    hamburger && hamburger.classList.remove('active');
    mobileMenu && mobileMenu.classList.remove('open');
  }

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* =========================================================
     TÉLÉCHARGER LE CV
  ========================================================= */
  function generateCvText() {
    return [
      'HENOCK TUMONAKIESE',
      'Backend Developer — PHP / Laravel / API / DevOps',
      '',
      'Contact',
      'Email : henoctumonakiese@gmail.com',
      'Téléphone : +243 896 500 709',
      'Localisation : Kinshasa, RDC',
      'GitHub : https://github.com/hnc450',
      'GitLab : https://gitlab.com/hnc450',
      'LinkedIn : https://www.linkedin.com/in/henoc-tumonakiese-9192a1395',
      '',
      'À propos',
      "Développeur Backend passionné avec une expertise approfondie en PHP et Laravel.",
      "Spécialisé dans la création d'APIs robustes et scalables.",
      '',
      'Expérience',
      '2025 — présent : Développeur DevOps — Mokili',
      '2023 — 2025 : Étudiant en Informatique — UPC',
      '',
      'Compétences',
      'Backend : PHP, Laravel, APIs REST, MVC',
      'Frontend : HTML5, CSS3, JavaScript, TypeScript, React',
      'Bases de données : MySQL, PostgreSQL',
      'DevOps : Docker, Git, GitLab CI/CD',
      'Serveur : Linux, Nginx',
      '',
      'Projets',
      '- Ma TodoList (React, TypeScript)',
      '- Ghost Framework (PHP MVC)',
      '- Protect VIN (PHP, PDF, MySQL)',
      '- Mololo+ (PHP MVC, MySQL, API REST)',
      '- Portfolio Personnel (HTML5, CSS3, JS)',
      '- RetraiteFlow (PHP MVC, MySQL, GitHub Actions)'
    ].join('\n');
  }

  function downloadCv() {
    const blob = new Blob([generateCvText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV-Henock-Tumonakiese.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  ['downloadCv', 'downloadCvHero', 'downloadCvMobile'].forEach(id => {
    const el = document.getElementById(id);
    el && el.addEventListener('click', (e) => {
      e.preventDefault();
      downloadCv();
    });
  });

  /* =========================================================
     TYPED.JS — rôle animé
  ========================================================= */
  if (window.Typed) {
    new Typed('#typed', {
      strings: ['Backend Developer', 'Architecte d\'APIs', 'Laravel Specialist', 'DevOps Enthusiast'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1600,
      loop: true,
      showCursor: false
    });
  }

  /* =========================================================
     BOUTONS MAGNÉTIQUES + RIPPLE
  ========================================================= */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      this.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
      this.style.setProperty('--ry', (e.clientY - rect.top) + 'px');
      this.classList.remove('rippling');
      void this.offsetWidth;
      this.classList.add('rippling');
    });
  });

  /* =========================================================
     TILT SUR CARTES DE VALEURS (glow suit la souris)
  ========================================================= */
  document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });

  /* =========================================================
     VANILLA TILT — projets & valeurs
  ========================================================= */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02
    });
  }

  /* =========================================================
     MARQUEE TECHNOLOGIES
  ========================================================= */
  const techs = [
    { name: 'PHP', icon: 'fa-brands fa-php' },
    { name: 'Laravel', icon: 'fa-brands fa-laravel' },
    { name: 'Docker', icon: 'fa-brands fa-docker' },
    { name: 'Git', icon: 'fa-brands fa-git-alt' },
    { name: 'GitLab', icon: 'fa-brands fa-gitlab' },
    { name: 'Linux', icon: 'fa-brands fa-linux' },
    { name: 'MySQL', icon: 'fa-solid fa-database' },
    { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
    { name: 'React', icon: 'fa-brands fa-react' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'TypeScript', icon: 'fa-solid fa-code' },
    { name: 'Nginx', icon: 'fa-solid fa-server' }
  ];

  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const itemsHtml = techs.map(t => `<div class="tech-item"><i class="${t.icon}"></i><span>${t.name}</span></div>`).join('');
    marqueeTrack.innerHTML = itemsHtml + itemsHtml; // dupliqué pour boucle infinie
  }

  /* =========================================================
     COMPTEURS ANIMÉS (stats)
  ========================================================= */
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progressRatio, 3);
        current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progressRatio < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    });
    countersAnimated = true;
  }

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  /* =========================================================
     BARRES DE COMPÉTENCES ANIMÉES
  ========================================================= */
  let skillsAnimated = false;
  function animateSkillBars() {
    if (skillsAnimated) return;
    document.querySelectorAll('.skill-bar span').forEach(bar => bar.classList.add('animate'));
    skillsAnimated = true;
  }

  const skillsSection = document.querySelector('.skills-grid');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
  }

  /* =========================================================
     SWIPER — TÉMOIGNAGES
  ========================================================= */
  if (window.Swiper) {
    new Swiper('.testimonial-swiper', {
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      speed: 700
    });
  }

  /* =========================================================
     PARTICULES CANVAS — hero
  ========================================================= */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const heroEl = document.querySelector('.hero');

    function resize() {
      width = canvas.width = heroEl.offsetWidth;
      height = canvas.height = heroEl.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 35 : 70;
    function getColor() {
      return getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#3B82F6';
    }

    function initParticles() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.15
      }));
    }
    initParticles();

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const color = getColor();
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(color, p.alpha);
        ctx.fill();
      });

      // liens entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = hexToRgba(color, 0.06 * (1 - dist / 110));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    function hexToRgba(hex, alpha) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  /* =========================================================
     FORMULAIRE DE CONTACT — validation JS
  ========================================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const fields = {
      fName: { el: document.getElementById('fName'), err: document.getElementById('errName'), msg: 'Veuillez entrer votre nom.' },
      fEmail: { el: document.getElementById('fEmail'), err: document.getElementById('errEmail'), msg: 'Veuillez entrer un email valide.' },
      fSubject: { el: document.getElementById('fSubject'), err: document.getElementById('errSubject'), msg: 'Veuillez entrer un sujet.' },
      fMessage: { el: document.getElementById('fMessage'), err: document.getElementById('errMessage'), msg: 'Votre message est trop court.' }
    };

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateField(key) {
      const f = fields[key];
      const value = f.el.value.trim();
      let valid = true;

      if (key === 'fEmail') valid = isValidEmail(value);
      else if (key === 'fMessage') valid = value.length >= 10;
      else valid = value.length >= 2;

      f.el.closest('.form-group').classList.toggle('error', !valid);
      f.err.textContent = valid ? '' : f.msg;
      return valid;
    }

    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => validateField(key));
      fields[key].el.addEventListener('input', () => {
        if (fields[key].el.closest('.form-group').classList.contains('error')) validateField(key);
      });
    });

    const submitBtn = contactForm.querySelector('.btn-submit');
    const successMsg = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const allValid = Object.keys(fields).map(validateField).every(Boolean);
      if (!allValid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        successMsg.classList.add('show');
        contactForm.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }, 1400);
    });
  }

});

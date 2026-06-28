/* ==========================================================================
   ROTHMAN ASHBURY ASSET MANAGEMENT — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navigation Scroll Effect ---------- */
  const nav = document.querySelector('.nav');
  const isHomePage = nav && nav.classList.contains('nav--transparent');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
      if (isHomePage) nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      if (isHomePage) nav.classList.add('nav--transparent');
    }
  }

  if (nav) {
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Initial state
  }


  /* ---------- Mobile Menu Toggle ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const overlay = document.querySelector('.nav__overlay');

  function openMenu() {
    toggle.classList.add('nav__toggle--active');
    navLinks.classList.add('nav__links--open');
    if (overlay) overlay.classList.add('nav__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('nav__toggle--active');
    navLinks.classList.remove('nav__links--open');
    if (overlay) overlay.classList.remove('nav__overlay--visible');
    document.body.style.overflow = '';
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      if (navLinks.classList.contains('nav__links--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }


  /* ---------- Auto Reveal Application ---------- */
  const elementsToReveal = document.querySelectorAll('.asset-card, .insight-card, .content__body > p, .content__body > h3, .content__body > h4, .content__header, .performance-table, .principle');
  elementsToReveal.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  /* ---------- Scroll Reveal Animation (Staggered) ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      let delay = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal--visible');
          }, delay);
          delay += 100; // 100ms stagger
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }



  /* ---------- Active Navigation Link ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinkElements = document.querySelectorAll('.nav__link');

  navLinkElements.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();

    if (linkPath === currentPath ||
        (currentPath === '' && linkPath === 'index.html') ||
        (currentPath === 'index.html' && linkPath === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });


  /* ---------- Smooth page load ---------- */
  document.body.classList.add('page-enter');



  /* ---------- Back to Top ---------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---------- Performance Counter Animation ---------- */
  const perfValues = document.querySelectorAll('.perf-value');
  if (perfValues.length > 0 && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const duration = 1500;
          const frameRate = 30;
          const totalFrames = Math.round(duration / frameRate);
          let frame = 0;
          
          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = (target * easeProgress).toFixed(1);
            el.innerText = current + '%';
            
            if (frame >= totalFrames) {
              clearInterval(counter);
              el.innerText = target.toFixed(1) + '%';
            }
          }, frameRate);
          
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    perfValues.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Smooth Page Exit Transitions ---------- */
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const isLocalFile = window.location.protocol === 'file:';
      
      // If viewed locally via file:///, bypass the JS transition to prevent CORS security errors
      if (isLocalFile) return;

      const isSameHost = this.hostname === window.location.hostname;
      
      // If it's a valid internal link and not a hash link or new tab
      if (isSameHost && this.getAttribute('href') && !this.getAttribute('href').startsWith('#') && this.getAttribute('target') !== '_blank') {
        e.preventDefault();
        const dest = this.href;
        document.body.classList.add('page-leaving');
        setTimeout(() => {
          window.location.assign(dest);
        }, 150);
      }
    });
  });

  /* ==========================================================================
     ADVANCED $25,000 UI/UX FEATURES
     ========================================================================== */

  /* ---------- 2. Typography Reveals ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Auto-apply reveal-text to key headers
    document.querySelectorAll('h1:not(.hero__tagline), h2, .pullquote, .perf-chart-title').forEach(el => {
      if (!el.classList.contains('reveal-text')) {
        el.classList.add('reveal-text');
      }
    });

    const splitTextObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-text--active');
          splitTextObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-text').forEach(el => {
      // Split text into words for staggered animation
      const text = el.innerText;
      const words = text.split(' ');
      el.innerHTML = '';
      
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('reveal-text__word');
        
        const innerSpan = document.createElement('span');
        innerSpan.classList.add('reveal-text__inner');
        innerSpan.innerText = word + ' ';
        innerSpan.style.transitionDelay = `${i * 0.04}s`;
        
        wordSpan.appendChild(innerSpan);
        el.appendChild(wordSpan);
      });
      
      splitTextObserver.observe(el);
    });
  }

  /* ---------- 3. Interactive SVG Chart Animation ---------- */
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find paths and add is-drawn class to trigger CSS transition
        const portfolioPath = document.getElementById('portfolio-path');
        const benchmarkPath = document.getElementById('benchmark-path');
        if (portfolioPath) portfolioPath.classList.add('is-drawn');
        if (benchmarkPath) benchmarkPath.classList.add('is-drawn');
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const chartEl = document.querySelector('.perf-chart');
  if (chartEl) chartObserver.observe(chartEl);

  /* ==========================================================================
     FINAL UI/UX POLISH
     ========================================================================== */

  /* ---------- Preloader (first visit per session only) ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    if (sessionStorage.getItem('ra_preloader_shown')) {
      // Already shown this session — remove immediately
      preloader.remove();
    } else {
      sessionStorage.setItem('ra_preloader_shown', '1');
      setTimeout(() => {
        preloader.classList.add('preloader--hidden');
        setTimeout(() => preloader.remove(), 600);
      }, 1500);
    }
  }

  /* ---------- Custom Interactive Cursor ---------- */
  const cursor = document.getElementById('custom-cursor');
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2; // Smooth tracking
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .perf-chart, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
    });
  }

  /* ---------- Subtle Hero Parallax ---------- */
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Only animate if the hero is visible (approx top 800px)
          if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

});

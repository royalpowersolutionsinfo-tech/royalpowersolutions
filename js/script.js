/* =============================================================
   ROYAL POWER SOLUTIONS — script.js
   Vanilla JS: Navbar, Reveal, Count-up, Timeline, Carousel, Form
============================================================= */

/* ── 1. YEAR ─────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── 2. NAVBAR ───────────────────────────────────────────── */
(function initNav() {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('navBurger');
  const links   = document.getElementById('navLinks');
  if (!nav) return;

  // Scroll-triggered sticky state
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Hamburger toggle
  if (burger && links) {
    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link highlight based on current page URL
  function updateActiveLink() {
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') currentPath = 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
      let linkHref = link.getAttribute('href');
      link.classList.toggle('is-active', linkHref === currentPath);
    });
  }
  updateActiveLink(); // run once on load
})();

/* ── 3. SCROLL REVEAL (Intersection Observer) ────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
})();

/* ── 4. COUNT-UP ANIMATION ───────────────────────────────── */
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseInt(el.getAttribute('data-count'), 10);
      const suffix  = el.getAttribute('data-suffix') || '';
      const duration = 1600; // ms
      const start    = performance.now();

      function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ── 5. TIMELINE CONNECTOR LINE ──────────────────────────── */
(function initTimeline() {
  const fill  = document.getElementById('timelineFill');
  const steps = document.querySelectorAll('.timeline__step');
  if (!fill || !steps.length) return;

  const isMobile = () => window.innerWidth <= 900;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Count visible steps to drive line fill percentage
        const visibleCount = document.querySelectorAll('.timeline__step.is-visible').length;
        const pct = ((visibleCount - 1) / (steps.length - 1)) * 100;
        if (isMobile()) {
          fill.style.height = pct + '%';
          fill.style.width  = '100%';
        } else {
          fill.style.width  = pct + '%';
          fill.style.height = '100%';
        }
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(step => io.observe(step));
})();

/* ── 6. CHARGE BAR (scroll progress bolt) ────────────────── */
(function initChargeBar() {
  const bar  = document.getElementById('chargeBar');
  const bolt = document.getElementById('chargeBolt');
  if (!bar || !bolt) return;

  const totalDash = 460;

  function update() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = Math.min(scrolled / total, 1);

    bolt.style.strokeDashoffset = totalDash * (1 - pct);

    if (scrolled > 200) bar.classList.add('is-visible');
    else                 bar.classList.remove('is-visible');
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 7. TESTIMONIALS CAROUSEL ────────────────────────────── */
(function initCarousel() {
  const track    = document.getElementById('tTrack');
  const dotsWrap = document.getElementById('tDots');
  const prevBtn  = document.getElementById('tPrev');
  const nextBtn  = document.getElementById('tNext');
  if (!track) return;

  const cards = track.querySelectorAll('.t-card');
  const total  = cards.length;
  let current  = 0;
  let autoTimer;

  // Build dot buttons
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    });
  }

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    if (dotsWrap) {
      dotsWrap.querySelectorAll('button').forEach((btn, i) => {
        btn.classList.toggle('is-active', i === current);
        btn.setAttribute('aria-selected', i === current);
      });
    }
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

  // Pause on hover
  track.closest('.t-carousel')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.t-carousel')?.addEventListener('mouseleave', resetAuto);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  goTo(0); // Initialize
})();

/* ── 8. CONTACT FORM VALIDATION ──────────────────────────── */
(function initForm() {
  const form       = document.getElementById('rpsForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = document.getElementById('formSubmitBtn');
  if (!form) return;

  function validateField(field) {
    const input = field.querySelector('input, select, textarea');
    if (!input) return true;
    let valid = true;

    if (input.required && !input.value.trim()) {
      valid = false;
    } else if (input.type === 'tel') {
      valid = /^[6-9]\d{9}$/.test(input.value.trim());
    } else if (input.tagName === 'SELECT') {
      valid = !!input.value;
    } else if (input.required) {
      valid = input.value.trim().length >= 2;
    }

    field.classList.toggle('is-invalid', !valid);
    return valid;
  }

  // Real-time validation on blur
  form.querySelectorAll('.field').forEach(field => {
    const input = field.querySelector('input, select, textarea');
    input?.addEventListener('blur', () => validateField(field));
    input?.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields  = form.querySelectorAll('.field');
    let allValid  = true;
    fields.forEach(f => { if (!validateField(f)) allValid = false; });

    if (!allValid) {
      // Focus first invalid field
      form.querySelector('.field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea')?.focus();
      return;
    }

    // Simulate submission (replace with actual backend/email API)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('.field').forEach(f => f.classList.remove('is-invalid'));
      if (successMsg) successMsg.classList.add('is-visible');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Enquiry';

      // Hide success after 8s
      setTimeout(() => successMsg?.classList.remove('is-visible'), 8000);
    }, 1200);
  });
})();

/* ── 9. SMOOTH SCROLL for anchor links ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('nav')?.offsetHeight || 70;
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
  });
});

/* ── 10. FAQ ACCORDION ────────────────────────────────────── */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item, .faq-card');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question, .faq-q, .faq-card__q, h4');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // If within a container/grid, close siblings
      const parent = item.parentElement;
      if (parent) {
        const siblings = parent.querySelectorAll('.faq-item, .faq-card');
        siblings.forEach(i => {
          if (i !== item) {
            i.classList.remove('is-open');
            const btn = i.querySelector('button.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });
      }
      
      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        const btn = item.querySelector('button.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('is-open');
        const btn = item.querySelector('button.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

/* ── 11. LIGHTBOX ─────────────────────────────────────────── */
(function initLightbox() {
  const galleryItems = document.querySelectorAll('.g-item');
  if (!galleryItems.length) return;

  // Build lightbox DOM if not already present
  if (document.getElementById('lightbox')) return; // already exists

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <div class="lightbox__backdrop" id="lbBackdrop"></div>
    <button class="lightbox__close" id="lbClose" aria-label="Close image viewer">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <button class="lightbox__nav lightbox__prev" id="lbPrev" aria-label="Previous image">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button class="lightbox__nav lightbox__next" id="lbNext" aria-label="Next image">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
    <div class="lightbox__inner">
      <div class="lightbox__img-wrap">
        <span class="lightbox__counter" id="lbCounter"></span>
        <img class="lightbox__img" id="lbImg" src="" alt="">
      </div>
      <p class="lightbox__caption" id="lbCaption"></p>
    </div>
  `;
  document.body.appendChild(lb);

  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbBackdrop= document.getElementById('lbBackdrop');

  // Collect all gallery images
  const images = [];
  galleryItems.forEach(item => {
    const img   = item.querySelector('img');
    const label = item.querySelector('.g-item__label');
    if (img) {
      images.push({ src: img.src, caption: label ? label.textContent : '' });
    }
  });

  let current = 0;

  function openLightbox(index) {
    current = (index + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].caption;
    lbCaption.textContent = images[current].caption;
    lbCounter.textContent = `${current + 1} / ${images.length}`;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Click each gallery item to open
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => openLightbox(current - 1));
  lbNext.addEventListener('click', () => openLightbox(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   openLightbox(current - 1);
    if (e.key === 'ArrowRight')  openLightbox(current + 1);
  });

  // Touch/swipe
  let lbStartX = 0;
  lb.addEventListener('touchstart', e => { lbStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const diff = lbStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) openLightbox(current + (diff > 0 ? 1 : -1));
  });
})();

/* ── 12. GALLERY FILTER ───────────────────────────────────── */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.g-item[data-category]');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

/* ── 13. SCROLL-TO-TOP BUTTON ─────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('is-visible');
    else                      btn.classList.remove('is-visible');
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


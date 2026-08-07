/**
 * NOEMA - Consultora de InvestigaciÃ³n de Mercado
 * Master JavaScript Controller for Exepaginasweb.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initAccordion();
  initContactForm();
  initSmoothScroll();
  initScrollSpy();
  initBackToTop();
  initReveal();
});

/* Theme Toggle (Sun / Moon) with localStorage persistence */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('noema-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const apply = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  if (stored) {
    apply(stored);
  } else if (prefersDark) {
    apply('dark');
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    apply(isDark ? 'light' : 'dark');
    localStorage.setItem('noema-theme', isDark ? 'light' : 'dark');
  });
}

/* Navbar Scroll Effect & Mobile Toggle */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* FAQ Accordion Logic */
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Contact Form Validation & Submission Modal */
function initContactForm() {
  const form = document.getElementById('noemaContactForm');
  const modal = document.getElementById('thankYouModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Procesando...`;

    try {
      // Optional background submission call to /api/contact if available
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: document.getElementById('nombre')?.value,
          empresa: document.getElementById('empresa')?.value,
          email: document.getElementById('email')?.value,
          telefono: document.getElementById('telefono')?.value,
          servicio: document.getElementById('servicio')?.value,
          mensaje: document.getElementById('mensaje')?.value
        })
      }).catch(() => {});
    } catch (err) {}

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (modal) {
        modal.classList.add('active');
      }
    }, 1000);
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* Smooth Scroll Helper */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Active Navigation Highlight (ScrollSpy) */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* Premium Scroll Reveal (IntersectionObserver + stagger) */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    '.section-header',
    '.about-content',
    '.about-image-stack',
    '.value-card',
    '.service-card',
    '.methodology-step',
    '.contact-info-card',
    '.contact-form-wrapper',
    '.seal-item',
    '.faq-item'
  ];

  const items = document.querySelectorAll(selectors.join(','));
  if (!items.length) return;

  items.forEach(el => el.classList.add('reveal'));

  // Stagger sibling reveals with a subtle cascade delay
  const parents = new Set();
  items.forEach(el => parents.add(el.parentElement));
  parents.forEach(parent => {
    const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
    siblings.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => io.observe(el));
}

/* Back to Top Button Controller */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


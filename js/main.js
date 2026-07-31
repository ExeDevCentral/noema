/**
 * NOEMA - Consultora de Investigación de Mercado
 * Master JavaScript Controller for Exepaginasweb.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initCharts();
  initCalculator();
  initAccordion();
  initContactForm();
  initSmoothScroll();
  initScrollSpy();
  initBackToTop();
});

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

/* Animated Number Counters */
function initCounters() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricNumbers.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 2000;
          const steps = 50;
          const stepTime = duration / steps;
          let current = 0;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = `${prefix}${Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-bar');
  if (metricsSection) observer.observe(metricsSection);
}

/* Diagnostic Calculator Logic */
function initCalculator() {
  const calcContainer = document.getElementById('calcContainer');
  if (!calcContainer) return;

  const options = calcContainer.querySelectorAll('.option-btn');
  const titleEl = document.getElementById('calcTitle');
  const sampleEl = document.getElementById('calcSample');
  const methodEl = document.getElementById('calcMethodology');
  const durationEl = document.getElementById('calcDuration');
  const deliverableEl = document.getElementById('calcDeliverable');
  const applyBtn = document.getElementById('calcApplyBtn');

  const matrix = {
    lanzamiento: {
      title: 'Estudio de Validación de Lanzamiento & Demanda',
      sample: 'n = 600 - 1,200 casos (Representativo)',
      methodology: 'Cuantitativo Online + 4 Focus Groups Presenciales',
      duration: '20 Días Hábiles',
      deliverable: 'Informe Ejecutivo PDF + Tablero Interactivo'
    },
    salud: {
      title: 'Tracking de Salud de Marca & NPS Corporativo',
      sample: 'n = 800 casos (Multi-ciudad Paraguay)',
      methodology: 'Encuestas Telefónicas CATI & Paneles Digitales',
      duration: '15 Días Hábiles',
      deliverable: 'Dashboard de Indicadores & NPS Scorecard'
    },
    precios: {
      title: 'Estudio de Sensibilidad & Elasticidad de Precios',
      sample: 'n = 500 compradores activos',
      methodology: 'Modelo Van Westendorp & Gabor-Granger',
      duration: '18 Días Hábiles',
      deliverable: 'Simulador de Curva de Precios & Elasticidad'
    },
    b2b: {
      title: 'Investigación Cualitativa B2B & Decisores',
      sample: 'n = 25 Entrevistas en Profundidad (IDI)',
      methodology: 'Entrevistas Estructuradas a Ejecutivos C-Level',
      duration: '25 Días Hábiles',
      deliverable: 'Reporte Cualitativo de Tendencias & Drivers'
    }
  };

  let currentGoal = 'lanzamiento';

  function updateCalc() {
    const data = matrix[currentGoal] || matrix['lanzamiento'];
    if (titleEl) titleEl.textContent = data.title;
    if (sampleEl) sampleEl.textContent = data.sample;
    if (methodEl) methodEl.textContent = data.methodology;
    if (durationEl) durationEl.textContent = data.duration;
    if (deliverableEl) deliverableEl.textContent = data.deliverable;
  }

  options.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.calc-step-group');
      if (group) {
        group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        if (group.getAttribute('data-group') === 'goal') {
          currentGoal = btn.getAttribute('data-val');
          updateCalc();
        }
      }
    });
  });

  updateCalc();

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contacto');
      const mensajeField = document.getElementById('mensaje');
      if (contactSection) {
        const data = matrix[currentGoal];
        if (mensajeField) {
          mensajeField.value = `Hola Carmen Capli - Noema,\n\nQuisiera solicitar cotización para el servicio: "${data.title}" (${data.sample}, ${data.duration}).`;
        }
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
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

/* Interactive Charts System using Chart.js */
let currentChart = null;

function initCharts() {
  const canvas = document.getElementById('marketChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');
  const tabs = document.querySelectorAll('.chart-tab-btn');
  const infoTitle = document.getElementById('chartTitle');
  const infoDesc = document.getElementById('chartDesc');
  const highlightsContainer = document.getElementById('chartHighlights');

  const chartDataSets = {
    sentiment: {
      type: 'bar',
      title: 'Sentimiento de Marca & Percepción de Valor',
      desc: 'Medición cuantitativa del posicionamiento comparativo de marca en una muestra de n=1,500 consumidores en Paraguay y región.',
      highlights: [
        { label: 'Percepción de Calidad', val: '89.4%' },
        { label: 'Net Promoter Score (NPS)', val: '+64 ptos' },
        { label: 'Fidelidad / Recompra', val: '78.2%' }
      ],
      data: {
        labels: ['Confianza', 'Calidad', 'Innovación', 'Relación Precio-Valor', 'Recomendación'],
        datasets: [{
          label: 'Marca Líder',
          data: [88, 92, 85, 79, 90],
          backgroundColor: '#C88A6E',
          borderRadius: 6
        }, {
          label: 'Promedio Categoría',
          data: [65, 70, 62, 68, 64],
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#FAF8F5', font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { ticks: { color: 'rgba(250, 248, 245, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          y: { ticks: { color: 'rgba(250, 248, 245, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        }
      }
    },
    segmentation: {
      type: 'doughnut',
      title: 'Segmentación Psicográfica de Clientes',
      desc: 'Mapeo de clústeres de consumo identificados mediante modelos cuali-cuantitativos avanzados para guiar la estrategia Go-To-Market.',
      highlights: [
        { label: 'Segmento Mayoritario', val: 'Tech Pioneers (35%)' },
        { label: 'Mayor Valor LTV', val: 'Executive Traditionalists' },
        { label: 'Potencial de Crecimiento', val: '+24% YoY' }
      ],
      data: {
        labels: ['Tech Pioneers', 'Pragmáticos de Valor', 'Tradicionalistas', 'Eco-Conscientes'],
        datasets: [{
          data: [35, 28, 22, 15],
          backgroundColor: ['#C88A6E', '#8F9E8B', '#2A3D50', '#E8BFAC'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#FAF8F5', font: { family: 'Plus Jakarta Sans' } } }
        }
      }
    },
    trends: {
      type: 'line',
      title: 'Proyección de Tendencias de Mercado 2026-2028',
      desc: 'Análisis predictivo de adopción de tecnología y evolución de expectativas del consumidor en el sector corporativo.',
      highlights: [
        { label: 'Tasa de Crecimiento Anual (CAGR)', val: '14.8%' },
        { label: 'Punto de Inflexión', val: 'Q3 2027' },
        { label: 'Confianza Estadística', val: '95% CI' }
      ],
      data: {
        labels: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027'],
        datasets: [{
          label: 'Digital / Omnicanal',
          data: [42, 48, 55, 61, 68, 76, 83, 89],
          borderColor: '#C88A6E',
          backgroundColor: 'rgba(200, 138, 110, 0.15)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Canal Tradicional',
          data: [58, 52, 45, 39, 32, 24, 17, 11],
          borderColor: '#8F9E8B',
          borderDash: [5, 5],
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#FAF8F5', font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { ticks: { color: 'rgba(250, 248, 245, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          y: { ticks: { color: 'rgba(250, 248, 245, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        }
      }
    }
  };

  function renderChart(key) {
    const config = chartDataSets[key];
    if (!config) return;

    if (currentChart) {
      currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
      type: config.type,
      data: config.data,
      options: config.options
    });

    if (infoTitle) infoTitle.textContent = config.title;
    if (infoDesc) infoDesc.textContent = config.desc;

    if (highlightsContainer) {
      highlightsContainer.innerHTML = config.highlights.map(h => `
        <div class="highlight-row">
          <span class="highlight-label">${h.label}</span>
          <span class="highlight-val">${h.val}</span>
        </div>
      `).join('');
    }
  }

  // Initial Render
  renderChart('sentiment');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-chart');
      renderChart(key);
    });
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


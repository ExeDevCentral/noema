import { PageType } from './Navbar'
import ParaguayFlag from './ParaguayFlag'

interface HeroProps {
  onNavigate?: (page: PageType) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <>
      {/* 1. Header Statement & 3 Hero Navigation Cards */}
      <section id="inicio" className="hero-section hero-pure-statement">
        <div className="container">
          <div className="hero-statement-wrapper">
            <h1 className="hero-title-main">
              Investigamos para comprender.
            </h1>

            <p className="hero-description-main">
              Diseñamos y desarrollamos <strong>estudios cuantitativos y cualitativos</strong> para obtener información confiable y relevante.
            </p>

            <p className="hero-tagline-text">
              <ParaguayFlag size="sm" style={{ marginRight: '8px' }} />
              <strong>Cuantitativo</strong> · <strong>Cualitativo</strong> · <strong>Trabajo de campo en Paraguay</strong>
            </p>

            {/* The 3 Lapacho Navigation Cards */}
            <div className="hero-nav-cards-grid">
              {/* Card 1: Sobre NOEMA */}
              <div 
                className="hero-nav-card" 
                onClick={() => onNavigate && onNavigate('sobre-noema')}
                role="button"
                tabIndex={0}
              >
                <div 
                  className="hero-card-bg-img" 
                  style={{ backgroundImage: "url('/assets/images/heroes/lapacho_amarillo.jpg')" }}
                ></div>
                <div className="hero-card-overlay"></div>
                <div className="hero-card-content">
                  <span className="hero-card-tag">INFORMACIÓN INSTITUCIONAL</span>
                  <h3>Sobre NOEMA</h3>
                  <p>Nuestra metodología, filosofía de trabajo y visión desde Paraguay.</p>
                  <span className="card-link">Ver más &rarr;</span>
                </div>
              </div>

              {/* Card 2: Servicios de Investigación */}
              <div 
                className="hero-nav-card" 
                onClick={() => onNavigate && onNavigate('servicios')}
                role="button"
                tabIndex={0}
              >
                <div 
                  className="hero-card-bg-img" 
                  style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}
                ></div>
                <div className="hero-card-overlay"></div>
                <div className="hero-card-content">
                  <span className="hero-card-tag">SOLUCIONES A MEDIDA</span>
                  <h3>Servicios de Investigación</h3>
                  <p>Estudios cuantitativos, cualitativos y servicio especializado de campo.</p>
                  <span className="card-link">Ver servicios &rarr;</span>
                </div>
              </div>

              {/* Card 3: Contacto */}
              <div 
                className="hero-nav-card" 
                onClick={() => onNavigate && onNavigate('contacto')}
                role="button"
                tabIndex={0}
              >
                <div 
                  className="hero-card-bg-img" 
                  style={{ backgroundImage: "url('/assets/images/heroes/lapacho_rosado.jpg')" }}
                ></div>
                <div className="hero-card-overlay"></div>
                <div className="hero-card-content">
                  <span className="hero-card-tag">ATENCIÓN DIRECTA</span>
                  <h3>Contacto</h3>
                  <p>Escríbenos para conversar sobre tu proyecto o estudio en Paraguay.</p>
                  <span className="card-link">Contactar &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sobre Noema Detailed Feature Section (Photo + Quote + 4 Pillars) */}
      <section className="section home-about-feature-section">
        <div className="container">
          <div className="home-about-grid">
            {/* Left Column: Consultant Image with Floating Quote */}
            <div className="home-about-image-col">
              <div className="home-about-image-wrapper">
                <img 
                  src="/assets/images/about_consulting.jpg" 
                  alt="Noema Consultoría e Investigación en Paraguay" 
                  className="home-about-img"
                />
                <div className="home-about-quote-card">
                  <p className="quote-text">
                    &ldquo;Investigar el mercado en Paraguay y la región no es acumular datos, es encontrar la verdad estratégica detrás de cada tendencia.&rdquo;
                  </p>
                  <span className="quote-author">NOEMA — INVESTIGACIÓN Y ESTUDIOS</span>
                </div>
              </div>
            </div>

            {/* Right Column: Text & 4 Pillar Cards */}
            <div className="home-about-content-col">
              <span className="section-tag-small">SOBRE NOEMA</span>
              
              <h2 className="home-about-title">
                Investigación rigurosa para comprender personas, opiniones y comportamientos.
              </h2>

              <p className="home-about-lead">
                <strong>Noema</strong> es una consultora de <strong>Investigación y Estudios</strong> que diseña y desarrolla proyectos cuantitativos y cualitativos para obtener información confiable, relevante y útil.
              </p>

              <p className="home-about-body">
                Trabajamos en las distintas etapas de un estudio, desde el diseño metodológico y la elaboración de instrumentos hasta el trabajo de campo, procesamiento y análisis de la información. Desarrollamos estudios integrales y también acompañamos proyectos en etapas específicas, de acuerdo con las necesidades de cada cliente.
              </p>

              <h3 className="home-about-subtitle">Cómo trabajamos</h3>

              {/* 4 Cards Grid */}
              <div className="home-pillars-2x2-grid">
                {/* 1. Investigación a medida */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-sliders"></i>
                  </div>
                  <h4>Investigación a medida</h4>
                  <p>Cada proyecto parte de una pregunta y se construye con la metodología más adecuada para responderla.</p>
                </div>

                {/* 2. Del diseño al campo */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h4>Del diseño al campo</h4>
                  <p>Podemos desarrollar un estudio de manera integral o participar en etapas específicas, según las necesidades de cada proyecto.</p>
                </div>

                {/* 3. Campo con experiencia */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-users-viewfinder"></i>
                  </div>
                  <h4>Campo con experiencia</h4>
                  <p>Planificamos, coordinamos y ejecutamos trabajos de campo cuantitativos y cualitativos, con especial atención a la calidad del proceso.</p>
                </div>

                {/* 4. Conocimiento del contexto */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <h4>Conocimiento del contexto</h4>
                  <p>Investigamos desde Paraguay <ParaguayFlag size="sm" />, comprendiendo las particularidades de sus personas, mercados y realidades sociales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}




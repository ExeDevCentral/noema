export default function About() {
  return (
    <div className="page-view about-page-view">
      {/* Hero Banner with Lapacho Amarillo Image */}
      <section className="page-hero-banner hero-lapacho-amarillo">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_amarillo.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <span className="banner-tag">INFORMACIÓN INSTITUCIONAL</span>
          <h1 className="banner-title">Sobre NOEMA</h1>
          <p className="banner-subtitle">
            Investigación y estudios diseñados para generar evidencia confiable y relevante en Paraguay.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section about-main-section">
        <div className="container">
          <div className="about-text-content-card">
            <h2 className="section-title text-center">
              Investigación rigurosa para comprender personas, opiniones y comportamientos.
            </h2>
            <div className="about-divider-line"></div>
            
            <p className="lead-paragraph">
              <strong>Noema</strong> es una consultora de <strong>Investigación y Estudios</strong> que diseña y desarrolla 
              proyectos cuantitativos y cualitativos para obtener información confiable, relevante y útil.
            </p>
            <p className="body-paragraph">
              Trabajamos en las distintas etapas de un estudio, desde el diseño metodológico y la elaboración de instrumentos 
              hasta el trabajo de campo, procesamiento y análisis de la información. Desarrollamos estudios integrales 
              y también acompañamos proyectos en etapas específicas, de acuerdo con las necesidades de cada cliente.
            </p>

            <div className="about-work-section-block" style={{ marginTop: '48px' }}>
              <h3 className="section-subtitle-institutional text-center" style={{ marginBottom: '32px', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF' }}>
                Cómo trabajamos
              </h3>

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
                  <p>Investigamos desde Paraguay, comprendiendo las particularidades de sus personas, mercados y realidades sociales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



export default function Services() {
  return (
    <div className="page-view services-page-view">
      {/* Hero Banner with Lapacho Blanco Image */}
      <section className="page-hero-banner hero-lapacho-blanco">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <span className="banner-tag">SOLUCIONES DE INVESTIGACIÓN</span>
          <h1 className="banner-title">Servicios de Investigación</h1>
          <p className="banner-subtitle">
            Investigación para empresas, organizaciones e instituciones en Paraguay.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section services-main-section">
        <div className="container">
          <div className="services-intro-card">
            <h2 className="section-title text-center">
              Investigación para empresas, organizaciones e instituciones
            </h2>
            <div className="about-divider-line"></div>
            
            <p className="lead-paragraph">
              Trabajamos con empresas, organizaciones sociales, ONG e instituciones públicas que necesitan conocer mejor 
              a sus públicos, comprender una realidad, evaluar iniciativas o tomar decisiones basadas en información.
            </p>
            <p className="body-paragraph">
              Diseñamos y desarrollamos estudios cuantitativos y cualitativos a medida, adaptados a los objetivos 
              y características de cada proyecto.
            </p>
          </div>

          {/* 2 Large Cards: Modalidades de Trabajo */}
          <div className="work-modes-section">
            <div className="work-modes-grid">
              {/* Card 01 · Servicio de Campo */}
              <div className="work-mode-card">
                <div className="work-mode-header">
                  <div className="work-mode-icon-box">
                    <i className="fas fa-map-location-dot"></i>
                  </div>
                  <span className="work-mode-number">01</span>
                </div>

                <span className="work-mode-tag">01 · PARA AGENCIAS Y CONSULTORAS</span>
                <h3 className="work-mode-title">Servicio de Campo</h3>
                <p className="work-mode-desc">
                  Somos un equipo especializado en la ejecución de trabajos de campo en Paraguay. Nos integramos a proyectos de otras agencias y consultoras para planificar, coordinar y realizar relevamientos cuantitativos y cualitativos, con seguimiento y control de calidad.
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Planificación y coordinación del trabajo de campo</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Encuestas presenciales y telefónicas</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Entrevistas en profundidad y grupos</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Reclutamiento de participantes</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Supervisión y control de calidad</span>
                  </li>
                </ul>
              </div>

              {/* Card 02 · Servicio Integral */}
              <div className="work-mode-card featured-mode-card">
                <div className="work-mode-header">
                  <div className="work-mode-icon-box terracotta-icon-box">
                    <i className="fas fa-diagram-project"></i>
                  </div>
                  <span className="work-mode-number">02</span>
                </div>

                <span className="work-mode-tag terracotta-tag">02 · ESTUDIOS A MEDIDA</span>
                <h3 className="work-mode-title">Servicio Integral</h3>
                <p className="work-mode-desc">
                  Diseñamos y desarrollamos estudios de investigación de acuerdo con las necesidades de cada proyecto, desde la definición metodológica hasta la entrega de resultados.
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Diseño metodológico y de instrumentos</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Investigación cuantitativa y cualitativa</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Recolección y procesamiento de datos</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Análisis e interpretación de resultados</span>
                  </li>
                  <li>
                    <i className="fas fa-check check-icon"></i>
                    <span>Informe final y presentación de resultados</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




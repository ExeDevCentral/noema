const researchTopics = [
  {
    title: 'Hábitos y comportamientos',
    description: 'Prácticas, usos, necesidades y formas de relacionarse con productos, servicios o iniciativas.',
    icon: 'fa-user-gear',
    overlayClass: 'overlay-blue',
  },
  {
    title: 'Percepciones y posicionamiento',
    description: 'Cómo una marca, organización, institución o iniciativa es percibida por sus públicos.',
    icon: 'fa-eye',
    overlayClass: 'overlay-purple',
  },
  {
    title: 'Satisfacción y experiencia',
    description: 'Experiencias, expectativas y niveles de satisfacción con productos, servicios o propuestas.',
    icon: 'fa-face-smile',
    overlayClass: 'overlay-terracotta',
  },
  {
    title: 'Evaluación e impacto',
    description: 'Resultados, alcance y efectos de programas, proyectos e iniciativas en sus públicos o beneficiarios.',
    icon: 'fa-chart-line',
    overlayClass: 'overlay-sage',
  },
  {
    title: 'Opiniones y actitudes',
    description: 'Percepciones y actitudes frente a temas, instituciones, propuestas o situaciones específicas.',
    icon: 'fa-comments',
    overlayClass: 'overlay-navy',
  },
  {
    title: 'Estudios ad hoc',
    description: 'Investigaciones diseñadas específicamente para responder preguntas particulares.',
    icon: 'fa-sliders',
    overlayClass: 'overlay-gold',
  },
]

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

          {/* ¿Qué podemos investigar? Grid with image overlays */}
          <div className="what-we-research-section">
            <div className="section-header text-center">
              <span className="section-tag">Áreas de Especialidad</span>
              <h2 className="section-title">¿Qué podemos investigar?</h2>
            </div>

            <div className="research-topics-grid">
              {researchTopics.map((topic) => (
                <div className={`research-topic-card ${topic.overlayClass}`} key={topic.title}>
                  <div className="topic-card-bg"></div>
                  <div className="topic-card-content">
                    <div className="topic-icon">
                      <i className={`fas ${topic.icon}`}></i>
                    </div>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dos formas de trabajar juntos */}
          <div className="work-modes-section">
            <div className="section-header text-center">
              <span className="section-tag">Modalidades de Trabajo</span>
              <h2 className="section-title">Investigación de campo y estudios integrales</h2>
              <p>
                Dos formas de trabajar juntos: nos integramos a proyectos de otras agencias para desarrollar el trabajo de campo, 
                o llevamos adelante estudios completos de acuerdo con los objetivos de cada proyecto.
              </p>
            </div>

            <div className="work-modes-grid">
              {/* Mode 1 */}
              <div className="work-mode-card">
                <div className="mode-badge">01 · PARA AGENCIAS Y CONSULTORAS</div>
                <h3 className="mode-title">Servicio de Campo</h3>
                <p className="mode-text">
                  Somos un equipo especializado en la ejecución de trabajos de campo en Paraguay. Nos integramos a proyectos 
                  de otras agencias y consultoras para planificar, coordinar y realizar relevamientos cuantitativos y cualitativos, 
                  con seguimiento y control de calidad.
                </p>
                <ul className="mode-checklist">
                  <li><i className="fas fa-check-circle"></i> Planificación y coordinación del trabajo de campo</li>
                  <li><i className="fas fa-check-circle"></i> Encuestas presenciales y telefónicas</li>
                  <li><i className="fas fa-check-circle"></i> Entrevistas en profundidad y grupos</li>
                  <li><i className="fas fa-check-circle"></i> Reclutamiento de participantes</li>
                  <li><i className="fas fa-check-circle"></i> Supervisión y control de calidad</li>
                </ul>
              </div>

              {/* Mode 2 */}
              <div className="work-mode-card featured">
                <div className="mode-badge">02 · ESTUDIOS A MEDIDA</div>
                <h3 className="mode-title">Servicio Integral</h3>
                <p className="mode-text">
                  Diseñamos y desarrollamos estudios de investigación de acuerdo con las necesidades de cada proyecto, 
                  desde la definición metodológica hasta la entrega de resultados.
                </p>
                <ul className="mode-checklist">
                  <li><i className="fas fa-check-circle"></i> Diseño metodológico y de instrumentos</li>
                  <li><i className="fas fa-check-circle"></i> Investigación cuantitativa y cualitativa</li>
                  <li><i className="fas fa-check-circle"></i> Recolección y procesamiento de datos</li>
                  <li><i className="fas fa-check-circle"></i> Análisis e interpretación de resultados</li>
                  <li><i className="fas fa-check-circle"></i> Informe final y presentación de resultados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


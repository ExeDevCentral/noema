import Methodology from './Methodology'

const pillars = [
  {
    icon: 'fa-bullseye',
    title: 'Investigación a medida',
    text: 'Cada proyecto parte de una pregunta y se construye con la metodología más adecuada para responderla.',
  },
  {
    icon: 'fa-diagram-project',
    title: 'Del diseño al campo',
    text: 'Podemos desarrollar un estudio de manera integral o participar en etapas específicas, según las necesidades de cada proyecto.',
  },
  {
    icon: 'fa-clipboard-check',
    title: 'Campo con experiencia',
    text: 'Planificamos, coordinamos y ejecutamos trabajos de campo cuantitativos y cualitativos, con especial atención a la calidad del proceso.',
  },
  {
    icon: 'fa-earth-americas',
    title: 'Conocimiento del contexto',
    text: 'Investigamos desde Paraguay, comprendiendo las particularidades de sus personas, mercados y realidades sociales.',
  },
]

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
          </div>

          {/* Cómo Trabajamos Section */}
          <div className="how-we-work-section">
            <div className="section-header text-center">
              <span className="section-tag">Metodología &amp; Valores</span>
              <h2 className="section-title">Cómo trabajamos</h2>
            </div>

            <div className="pillars-grid">
              {pillars.map((pillar) => (
                <div className="pillar-card" key={pillar.title}>
                  <div className="pillar-icon">
                    <i className={`fas ${pillar.icon}`}></i>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Timeline */}
      <Methodology />
    </div>
  )
}


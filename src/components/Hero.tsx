import { PageType } from './Navbar'

interface HeroProps {
  onNavigate: (page: PageType) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="inicio" className="hero-section">
      <div className="container">
        <div className="hero-card-glow">
          <h1 className="hero-title-main">
            Investigamos para comprender.
          </h1>

          <p className="hero-description-main">
            Diseñamos y desarrollamos <strong>estudios cuantitativos y cualitativos</strong> para obtener información confiable y relevante.
          </p>

          <div className="hero-tagline-text">
            <strong>Cuantitativo</strong> · <strong>Cualitativo</strong> · <strong>Trabajo de campo</strong>
          </div>
        </div>

        {/* Quick Nav Cards to 3 main sections with Lapacho Images */}
        <div className="hero-nav-cards-grid">
          <div 
            className="hero-nav-card card-amarillo"
            onClick={() => onNavigate('sobre-noema')}
          >
            <div className="card-bg-overlay"></div>
            <div className="card-content">
              <span className="card-tag">INFORMACIÓN INSTITUCIONAL</span>
              <h3>Sobre NOEMA</h3>
              <p>Nuestra metodología, filosofía de trabajo y visión desde Paraguay.</p>
              <span className="card-link">Ver más <i className="fas fa-arrow-right ms-1"></i></span>
            </div>
          </div>

          <div 
            className="hero-nav-card card-blanco"
            onClick={() => onNavigate('servicios')}
          >
            <div className="card-bg-overlay"></div>
            <div className="card-content">
              <span className="card-tag">SOLUCIONES A MEDIDA</span>
              <h3>Servicios de Investigación</h3>
              <p>Estudios cuantitativos, cualitativos y servicio especializado de campo.</p>
              <span className="card-link">Ver servicios <i className="fas fa-arrow-right ms-1"></i></span>
            </div>
          </div>

          <div 
            className="hero-nav-card card-rosado"
            onClick={() => onNavigate('contacto')}
          >
            <div className="card-bg-overlay"></div>
            <div className="card-content">
              <span className="card-tag">ATENCIÓN DIRECTA</span>
              <h3>Contacto</h3>
              <p>Escríbenos para conversar sobre tu proyecto o estudio en Paraguay.</p>
              <span className="card-link">Contactar <i className="fas fa-arrow-right ms-1"></i></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


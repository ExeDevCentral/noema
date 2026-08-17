import BrandLogo from './BrandLogo'

interface MaintenancePageProps {
  onBypass?: () => void
}

export default function MaintenancePage({ onBypass }: MaintenancePageProps) {
  return (
    <div className="maintenance-container">
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-glow"></div>
        <div className="ambient-grain"></div>
      </div>

      <header className="maintenance-header">
        <BrandLogo light />
      </header>

      <main className="maintenance-content">
        <div className="maintenance-card">
          <div className="maintenance-badge">
            <i className="fas fa-hammer me-2"></i> SITIO EN MANTENIMIENTO &amp; ACTUALIZACIÓN
          </div>

          <h1 className="maintenance-title">
            Estamos preparando nuestra nueva plataforma web.
          </h1>

          <p className="maintenance-subtitle">
            En <strong>NOEMA — Investigación y Estudios</strong> estamos renovando nuestra experiencia digital 
            para brindarle información clara, relevante y evidencia objetiva en Paraguay.
          </p>

          <div className="maintenance-pills">
            <span><i className="fas fa-chart-pie me-2"></i>Cuantitativo</span>
            <span><i className="fas fa-comments me-2"></i>Cualitativo</span>
            <span><i className="fas fa-location-dot me-2"></i>Trabajo de campo</span>
          </div>

          <div className="maintenance-contact-box">
            <h4>¿Necesitas comunicarte con nosotros hoy?</h4>
            <p>Atención directa y consultas de investigación:</p>
            
            <div className="maintenance-actions">
              <a
                href="https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-maintenance"
              >
                <i className="fab fa-whatsapp me-2"></i> Contactar por WhatsApp (+595 972 536 004)
              </a>

              <a
                href="mailto:contacto@noemaconsultora.com.py"
                className="btn-email-maintenance"
              >
                <i className="fas fa-envelope me-2"></i> contacto@noemaconsultora.com.py
              </a>
            </div>
          </div>

          <div className="maintenance-footer-location">
            <i className="fas fa-location-dot me-2"></i> Encarnación, Paraguay · Cobertura en todo el país
          </div>

          {onBypass && (
            <button 
              type="button" 
              className="btn-bypass-dev"
              onClick={onBypass}
              title="Modo vista previa para desarrollador"
            >
              <i className="fas fa-code me-1"></i> Previsualizar sitio completo
            </button>
          )}
        </div>
      </main>

      <footer className="maintenance-footer">
        <p>&copy; {new Date().getFullYear()} NOEMA — Investigación y Estudios. Todos los derechos reservados.</p>
        <p className="guarani-motto">Ñeakãngeta ha pyʼamongeta</p>
      </footer>
    </div>
  )
}

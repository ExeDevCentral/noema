import BrandLogo from './BrandLogo'
import PY from 'country-flag-icons/react/3x2/PY'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo light />
            <p>
              Consultoría de investigación de mercado comprometida con la generación de evidencia objetiva e insights
              accionables para la toma de decisiones ejecutivas en Paraguay y la región.
            </p>
          </div>

          <div className="footer-col">
            <h5>Navegación</h5>
            <ul className="footer-links">
              <li><a href="#nosotros">Quién soy</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Servicios</h5>
            <ul className="footer-links">
              <li><a href="#servicios">Investigación Cuantitativa</a></li>
              <li><a href="#servicios">Estudios Cualitativos</a></li>
              <li><a href="#servicios">Business Intelligence</a></li>
              <li><a href="#servicios">Tracking de Marca</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contacto</h5>
            <p style={{ fontSize: '0.875rem', color: 'rgba(250, 248, 245, 0.75)', marginBottom: '0.75rem' }}>
              <i className="fas fa-envelope" style={{ color: 'var(--terracotta-light)', marginRight: '0.5rem' }}></i> contacto@noemaconsultora.com.py
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(250, 248, 245, 0.75)' }}>
              <PY style={{ width: 28, height: 19, borderRadius: 3, marginRight: '0.5rem', verticalAlign: 'middle', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }} />
              Asunción, Paraguay
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Carmen Capli - Noema Consultora. Todos los derechos reservados.</p>
          <p>Investigación de Mercado &amp; Inteligencia Estratégica en Paraguay</p>
        </div>
      </div>
    </footer>
  )
}

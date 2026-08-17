import BrandLogo from './BrandLogo'
import { PageType } from './Navbar'

interface FooterProps {
  onNavigate: (page: PageType) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid-minimal">
          <div className="footer-brand-col">
            <BrandLogo light onClick={() => onNavigate('inicio')} />
            <p className="footer-tagline">
              Cuantitativo · Cualitativo · Trabajo de campo
            </p>
          </div>

          <div className="footer-contact-col">
            <h5 className="footer-col-title">Contacto Directo</h5>
            
            <div className="footer-contact-item">
              <i className="fas fa-envelope footer-icon"></i>
              <a href="mailto:contacto@noemaconsultora.com.py" className="footer-link">
                contacto@noemaconsultora.com.py
              </a>
            </div>

            <div className="footer-contact-item">
              {/* WhatsApp icon in subtle terracotta/ivory instead of bright green */}
              <i className="fab fa-whatsapp footer-icon wa-subtle-icon"></i>
              <a 
                href="https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
              >
                +595 972 536 004
              </a>
            </div>

            <div className="footer-contact-item">
              {/* Location Icon without the word Dirección */}
              <i className="fas fa-location-dot footer-icon"></i>
              <span className="footer-text">
                Encarnación, Paraguay
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NOEMA — Investigación y Estudios. Todos los derechos reservados.</p>
          <p className="guarani-motto">Ñeakãngeta ha pyʼamongeta</p>
        </div>
      </div>
    </footer>
  )
}


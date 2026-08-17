import ParaguayFlag from './ParaguayFlag'
import BrandLogo from './BrandLogo'
import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onNavigate?: (page: PageType) => void
}

export default function Footer({ onNavigate }: Readonly<FooterProps>) {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Guarani Phrase */}
          <div className="footer-col footer-col-brand">
            <BrandLogo onClick={() => onNavigate?.('inicio')} />
            <p className="footer-company-desc">
              {t.footer.description}
            </p>
            
            {/* Enhanced Guarani Motto with Tooltip */}
            <div className="footer-guarani-wrapper">
              <p 
                className="footer-guarani-quote" 
                data-tooltip="Razonar y reflexionar con el corazón"
                tabIndex={0}
                aria-label="Ñeʼẽkãnguéta ha pyʼamongueta — Traducción: Razonar y reflexionar con el corazón"
              >
                «Ñeʼẽkãnguéta ha pyʼamongueta»
                <span className="guarani-tooltip-bubble">
                  <i className="fas fa-heart" style={{ color: 'var(--terracotta-accent)', marginRight: '6px' }}></i>
                  Razonar y reflexionar con el corazón
                </span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer.navTitle}</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => { onNavigate?.('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  {t.nav.inicio}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => { onNavigate?.('sobre-noema'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  {t.nav.sobreNoema}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => { onNavigate?.('servicios'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  {t.nav.servicios}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => { onNavigate?.('contacto'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                  {t.nav.contacto}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer.contactTitle}</h4>
            <ul className="footer-contact-list">
              <li>
                <a href="mailto:contacto@noema.com.py" className="footer-contact-link">
                  <i className="fas fa-envelope"></i>
                  <span>contacto@noema.com.py</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>+595 972 536 004</span>
                </a>
              </li>
              <li>
                <span className="footer-contact-link non-clickable">
                  <i className="fas fa-location-dot"></i>
                  <span>Encarnación, Paraguay <ParaguayFlag size="sm" style={{ marginLeft: '4px' }} /></span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Noema Consultoría e Investigación. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

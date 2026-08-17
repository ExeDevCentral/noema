import BrandLogo from './BrandLogo'
import { PageType } from './Navbar'
import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onNavigate: (page: PageType) => void
}

export default function Footer({ onNavigate }: Readonly<FooterProps>) {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid-minimal">
          <div className="footer-brand-col">
            <BrandLogo light onClick={() => onNavigate('inicio')} />
            <p className="footer-tagline">
              {t.footer.tagline}
            </p>
          </div>

          <div className="footer-contact-col">
            <h5 className="footer-col-title">{t.footer.directContact}</h5>
            
            <div className="footer-contact-item">
              <i className="fas fa-envelope footer-icon"></i>
              <a href="mailto:contacto@noema.com.py" className="footer-link">
                contacto@noema.com.py
              </a>
            </div>

            <div className="footer-contact-item">
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
              <i className="fas fa-location-dot footer-icon"></i>
              <span className="footer-text">
                <ParaguayFlag size="sm" style={{ marginRight: '6px' }} />
                {t.footer.location}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NOEMA — {t.hero.quoteAuthor.replace('NOEMA — ', '')}. {t.footer.rights}</p>
          <p className="guarani-motto">{t.footer.guaraniMotto}</p>
        </div>
      </div>
    </footer>
  )
}

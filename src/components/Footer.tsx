import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParaguayFlag from './ParaguayFlag'
import BrandLogo from './BrandLogo'
import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onNavigate?: (page: PageType) => void
}

export default function Footer({ onNavigate }: Readonly<FooterProps>) {
  const { t } = useLanguage()
  const [isGuaraniHovered, setIsGuaraniHovered] = useState(false)

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
            
            {/* Minimalist Morphing Guarani Pill */}
            <div className="footer-guarani-wrapper">
              <motion.button
                layout
                type="button"
                className="footer-guarani-morph-pill"
                aria-label="Ñeʼẽkãnguéta ha pyʼamongueta — Traducción: Razonar y reflexionar con el corazón"
                onMouseEnter={() => setIsGuaraniHovered(true)}
                onMouseLeave={() => setIsGuaraniHovered(false)}
                onClick={() => setIsGuaraniHovered((prev) => !prev)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isGuaraniHovered ? (
                    <motion.span
                      key="guarani"
                      className="guarani-phrase-text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      «Ñeʼẽkãnguéta ha pyʼamongueta»
                    </motion.span>
                  ) : (
                    <motion.span
                      key="spanish"
                      className="guarani-translation-text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      <i className="fas fa-heart text-terracotta" style={{ color: 'var(--terracotta)', marginRight: '7px' }} />
                      <span>Razonar y reflexionar con el corazón</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
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
                <a href="mailto:carmen@noema.com.py" className="footer-contact-link">
                  <i className="fas fa-envelope"></i>
                  <span>carmen@noema.com.py</span>
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
                  <i className="fas fa-clock"></i>
                  <span>{t.contact.scheduleText}</span>
                </span>
              </li>
              <li>
                <span className="footer-contact-link non-clickable">
                  <i className="fas fa-location-dot"></i>
                  <span className="footer-location-text">
                    Encarnación, Paraguay
                    <ParaguayFlag size="sm" style={{ display: 'inline-flex', marginLeft: '6px', verticalAlign: 'middle' }} />
                  </span>
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

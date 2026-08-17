import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

export type PageType = 'inicio' | 'sobre-noema' | 'servicios' | 'contacto'

interface NavbarProps {
  activePage: PageType
  setActivePage: (page: PageType) => void
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (page: PageType) => {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <BrandLogo onClick={() => handleNavClick('inicio')} />

        <nav className={`nav-menu${menuOpen ? ' active' : ''}`}>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'sobre-noema' ? ' active' : ''}`}
            onClick={() => handleNavClick('sobre-noema')}
          >
            {t.nav.sobreNoema}
          </button>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'servicios' ? ' active' : ''}`}
            onClick={() => handleNavClick('servicios')}
          >
            {t.nav.servicios}
          </button>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'contacto' ? ' active' : ''}`}
            onClick={() => handleNavClick('contacto')}
          >
            {t.nav.contacto}
          </button>

          {/* Mobile Language Switcher inside menu */}
          <div className="nav-mobile-lang-wrapper">
            <LanguageSwitcher variant="navbar" />
          </div>
        </nav>

        <div className="nav-actions">
          {/* Desktop Language Switcher */}
          <LanguageSwitcher variant="navbar" className="nav-desktop-lang" />

          <a
            href="https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            aria-label={t.nav.whatsapp}
          >
            <span className="wa-ring"><i className="fa-brands fa-whatsapp"></i></span>
            <span className="wa-text">{t.nav.whatsapp}</span>
          </a>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={menuOpen ? 'fas fa-xmark' : 'fas fa-bars'}></i>
        </button>
      </div>
    </header>
  )
}

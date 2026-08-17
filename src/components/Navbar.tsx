import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

export type PageType = 'inicio' | 'sobre-noema' | 'servicios' | 'contacto'

interface NavbarProps {
  activePage: PageType
  setActivePage: (page: PageType) => void
}

export default function Navbar({ activePage, setActivePage }: Readonly<NavbarProps>) {
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
        <div className="nav-brand-wrapper">
          <BrandLogo onClick={() => handleNavClick('inicio')} />
          <div className="nav-paraguay-badge" title="Paraguay" aria-label="Paraguay">
            <ParaguayFlag size="md" />
          </div>
        </div>

        <nav className={`nav-menu${menuOpen ? ' active' : ''}`}>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'inicio' ? ' active' : ''}`}
            onClick={() => handleNavClick('inicio')}
          >
            {t.nav.inicio}
          </button>
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
        </nav>

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


import { useEffect, useState, useCallback } from 'react'
import BrandLogo from './BrandLogo'
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

  // Track scroll position for sticky glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleNavClick = useCallback((page: PageType) => {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setActivePage])

  return (
    <header 
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      role="banner"
    >
      <div className="container nav-container">
        <div className="nav-brand-wrapper">
          <BrandLogo onClick={() => handleNavClick('inicio')} />
        </div>

        <nav 
          id="mobile-nav-menu"
          className={`nav-menu${menuOpen ? ' active' : ''}`}
          aria-label="Navegación principal"
        >
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
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={menuOpen ? 'fas fa-xmark' : 'fas fa-bars'} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  )
}



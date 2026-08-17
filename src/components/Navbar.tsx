import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'

export type PageType = 'inicio' | 'sobre-noema' | 'servicios' | 'contacto'

interface NavbarProps {
  activePage: PageType
  setActivePage: (page: PageType) => void
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
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
            Sobre NOEMA
          </button>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'servicios' ? ' active' : ''}`}
            onClick={() => handleNavClick('servicios')}
          >
            Servicios de Investigación
          </button>
          <button 
            type="button" 
            className={`nav-link-btn${activePage === 'contacto' ? ' active' : ''}`}
            onClick={() => handleNavClick('contacto')}
          >
            Contacto
          </button>
        </nav>

        <div className="nav-actions">
          <a
            href="https://wa.me/595981400800?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            aria-label="Escríbenos por WhatsApp"
          >
            <span className="wa-ring"><i className="fa-brands fa-whatsapp"></i></span>
            <span className="wa-text">WhatsApp</span>
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


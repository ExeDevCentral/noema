import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <BrandLogo />

        <nav className={`nav-menu${menuOpen ? ' active' : ''}`}>
          <a href="#nosotros" className="nav-link" onClick={closeMenu}>Quiénes Somos</a>
          <a href="#servicios" className="nav-link" onClick={closeMenu}>Servicios</a>
          <a href="#contacto" className="nav-link" onClick={closeMenu}>Contacto</a>
        </nav>

        <div className="nav-actions">
          <a
            href="https://wa.me/595981400800"
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

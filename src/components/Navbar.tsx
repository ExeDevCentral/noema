import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'
import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

export type PageType = 'inicio' | 'sobre-noema' | 'servicios' | 'contacto'

interface NavbarProps {
  activePage: PageType
  setActivePage: (page: PageType) => void
}

interface NavItemConfig {
  key: PageType
  labelKey: 'inicio' | 'sobreNoema' | 'servicios' | 'contacto'
  subtitleKey: string
  icon: string
}

const navItems: NavItemConfig[] = [
  {
    key: 'inicio',
    labelKey: 'inicio',
    subtitleKey: 'Investigamos para comprender',
    icon: 'fa-solid fa-house',
  },
  {
    key: 'sobre-noema',
    labelKey: 'sobreNoema',
    subtitleKey: 'Identidad, visión y equipo paraguayo',
    icon: 'fa-solid fa-compass',
  },
  {
    key: 'servicios',
    labelKey: 'servicios',
    subtitleKey: 'Estudios cuantitativos, cualitativos y campo',
    icon: 'fa-solid fa-chart-pie',
  },
  {
    key: 'contacto',
    labelKey: 'contacto',
    subtitleKey: 'Iniciá tu proyecto y consultas',
    icon: 'fa-solid fa-envelope',
  },
]

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

  // Lock body & html scroll when mobile menu is open to prevent background bleed/scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
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
    <>
      <header 
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="container nav-container">
          <div className="nav-brand-wrapper">
            <BrandLogo onClick={() => handleNavClick('inicio')} />
          </div>

          {/* Desktop Navigation Menu */}
          <nav 
            className="nav-menu desktop-nav-menu"
            aria-label="Navegación principal"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`nav-link-btn${isActive ? ' active' : ''}`}
                  style={{ position: 'relative' }}
                  onClick={() => handleNavClick(item.key)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="nav-active-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'rgba(200, 138, 110, 0.22)',
                        border: '1px solid rgba(232, 191, 172, 0.35)',
                        zIndex: 0,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {t.nav[item.labelKey]}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="nav-actions-group">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`nav-toggle${menuOpen ? ' active' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className={menuOpen ? 'fas fa-xmark' : 'fas fa-bars'} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            className="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-inner">
              {/* Drawer Top Header */}
              <div className="mobile-drawer-header">
                <div className="drawer-brand">
                  <BrandLogo showFlag={true} onClick={() => handleNavClick('inicio')} />
                </div>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú de navegación"
                >
                  <i className="fas fa-xmark" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer Main Content */}
              <div className="mobile-drawer-body">
                <div className="mobile-drawer-section-label">
                  <span>NAVEGACIÓN PRINCIPAL</span>
                </div>

                <nav className="mobile-drawer-nav" aria-label="Menú móvil">
                  {navItems.map((item, index) => {
                    const isActive = activePage === item.key
                    return (
                      <motion.button
                        key={item.key}
                        type="button"
                        className={`mobile-nav-card${isActive ? ' active' : ''}`}
                        onClick={() => handleNavClick(item.key)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index, duration: 0.22 }}
                      >
                        <div className="mobile-nav-icon-box">
                          <i className={item.icon} aria-hidden="true" />
                        </div>
                        <div className="mobile-nav-text-col">
                          <span className="mobile-nav-title">{t.nav[item.labelKey]}</span>
                          <span className="mobile-nav-desc">{item.subtitleKey}</span>
                        </div>
                        <div className="mobile-nav-chevron">
                          <i className="fas fa-chevron-right" aria-hidden="true" />
                        </div>
                      </motion.button>
                    )
                  })}
                </nav>

                <div className="mobile-drawer-divider" />

                {/* Direct Action Section */}
                <div className="mobile-drawer-section-label">
                  <span>CONTACTO DIRECTO</span>
                </div>

                <div className="mobile-drawer-actions">
                  <a
                    href="https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-wa-card"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="mobile-wa-icon">
                      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    </div>
                    <div className="mobile-wa-info">
                      <strong>Chatear por WhatsApp</strong>
                      <span>+595 972 536 004 · Atención directa</span>
                    </div>
                    <i className="fas fa-arrow-up-right-from-square mobile-ext-icon" aria-hidden="true" />
                  </a>

                  <a
                    href="mailto:carmen@noema.com.py"
                    className="mobile-email-card"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="mobile-email-icon">
                      <i className="fas fa-envelope" aria-hidden="true" />
                    </div>
                    <div className="mobile-email-info">
                      <strong>Correo electrónico</strong>
                      <span>carmen@noema.com.py</span>
                    </div>
                  </a>
                </div>

                {/* Drawer Footer Stamp */}
                <div className="mobile-drawer-footer">
                  <div className="mobile-footer-stamp">
                    <span>NOEMA</span>
                    <span className="dot">•</span>
                    <span>Investigación & Estudios</span>
                    <ParaguayFlag size="sm" style={{ marginLeft: '6px', display: 'inline-flex' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}





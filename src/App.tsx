import { useEffect, useState } from 'react'
import Navbar, { PageType } from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CraftedBar from './components/CraftedBar'
import BackToTop from './components/BackToTop'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { LanguageProvider } from './context/LanguageContext'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('inicio')

  useRevealOnScroll()

  // Sync state with URL hash on load & hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (['inicio', 'sobre-noema', 'servicios', 'contacto'].includes(hash)) {
        setActivePage(hash as PageType)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (page: PageType) => {
    setActivePage(page)
    window.location.hash = `#${page}`
    window.scrollTo(0, 0)
  }

  return (
    <LanguageProvider>
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-glow" />
        <div className="ambient-grain" />
        <div className="ambient-particles">
          <span /><span /><span /><span />
          <span /><span /><span /><span />
        </div>
      </div>

      <Navbar activePage={activePage} setActivePage={navigateTo} />

      <main className="main-content-view">
        {activePage === 'inicio' && <Hero onNavigate={navigateTo} />}
        {activePage === 'sobre-noema' && <About onNavigate={navigateTo} />}
        {activePage === 'servicios' && <Services onNavigate={navigateTo} />}
        {activePage === 'contacto' && <Contact onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} />
      <CraftedBar />
      <BackToTop />
      <FloatingWhatsApp />
    </LanguageProvider>
  )
}

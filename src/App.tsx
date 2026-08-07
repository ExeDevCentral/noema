import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Methodology from './components/Methodology'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CraftedBar from './components/CraftedBar'
import BackToTop from './components/BackToTop'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import { useSmoothScrollAndSpy } from './hooks/useSmoothScroll'

export default function App() {
  useRevealOnScroll()
  useSmoothScrollAndSpy()

  return (
    <>
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-glow"></div>
        <div className="ambient-grain"></div>
        <div className="ambient-particles">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Methodology />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CraftedBar />
      <BackToTop />
    </>
  )
}

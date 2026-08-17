import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

interface HeroProps {
  onNavigate?: (page: PageType) => void
}

export default function Hero({ onNavigate }: Readonly<HeroProps>) {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="hero-section hero-pure-statement">
      <div className="container">
        <div className="hero-statement-wrapper">
          <h1 className="hero-title-main">
            {t.hero.titleMain}
          </h1>

          <p className="hero-description-main">
            {t.hero.descriptionMain}
          </p>

          <p className="hero-tagline-text">
            {t.hero.tagline}
          </p>

          {/* The 3 Lapacho Navigation Cards */}
          <div className="hero-nav-cards-grid">
            {/* Card 1: Sobre NOEMA */}
            <div 
              className="hero-nav-card" 
              onClick={() => onNavigate?.('sobre-noema')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate?.('sobre-noema') }}
            >
              <div 
                className="hero-card-bg-img" 
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_amarillo.jpg')" }}
              ></div>
              <div className="hero-card-overlay"></div>
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card1Tag}</span>
                <h3>{t.hero.card1Title}</h3>
                <p>{t.hero.card1Desc}</p>
                <span className="card-link">{t.hero.card1Link}</span>
              </div>
            </div>

            {/* Card 2: Servicios de Investigación */}
            <div 
              className="hero-nav-card" 
              onClick={() => onNavigate?.('servicios')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate?.('servicios') }}
            >
              <div 
                className="hero-card-bg-img" 
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}
              ></div>
              <div className="hero-card-overlay"></div>
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card2Tag}</span>
                <h3>{t.hero.card2Title}</h3>
                <p>{t.hero.card2Desc}</p>
                <span className="card-link">{t.hero.card2Link}</span>
              </div>
            </div>

            {/* Card 3: Contacto */}
            <div 
              className="hero-nav-card" 
              onClick={() => onNavigate?.('contacto')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate?.('contacto') }}
            >
              <div 
                className="hero-card-bg-img" 
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_rosado.jpg')" }}
              ></div>
              <div className="hero-card-overlay"></div>
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card3Tag}</span>
                <h3>{t.hero.card3Title}</h3>
                <p>{t.hero.card3Desc}</p>
                <span className="card-link">{t.hero.card3Link}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


import { PageType } from './Navbar'
import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

interface HeroProps {
  onNavigate?: (page: PageType) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Header Statement & 3 Hero Navigation Cards */}
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
              <ParaguayFlag size="sm" style={{ marginRight: '8px' }} />
              {t.hero.tagline}
            </p>

            {/* The 3 Lapacho Navigation Cards */}
            <div className="hero-nav-cards-grid">
              {/* Card 1: Sobre NOEMA */}
              <div 
                className="hero-nav-card" 
                onClick={() => onNavigate && onNavigate('sobre-noema')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate && onNavigate('sobre-noema') }}
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
                onClick={() => onNavigate && onNavigate('servicios')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate && onNavigate('servicios') }}
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
                onClick={() => onNavigate && onNavigate('contacto')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate && onNavigate('contacto') }}
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

      {/* 2. Sobre Noema Detailed Feature Section (Photo + Quote + 4 Pillars) */}
      <section className="section home-about-feature-section">
        <div className="container">
          <div className="home-about-grid">
            {/* Left Column: Consultant Image with Floating Quote */}
            <div className="home-about-image-col">
              <div className="home-about-image-wrapper">
                <img 
                  src="/assets/images/about_consulting.jpg" 
                  alt="Noema Consultoría e Investigación en Paraguay" 
                  className="home-about-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="home-about-quote-card">
                  <p className="quote-text">
                    {t.hero.quote}
                  </p>
                  <span className="quote-author">{t.hero.quoteAuthor}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Text & 4 Pillar Cards */}
            <div className="home-about-content-col">
              <span className="section-tag-small">{t.hero.sobreTag}</span>
              
              <h2 className="home-about-title">
                {t.hero.sobreTitle}
              </h2>

              <p className="home-about-lead">
                {t.hero.sobreLead}
              </p>

              <p className="home-about-body">
                {t.hero.sobreBody}
              </p>

              <h3 className="home-about-subtitle">{t.hero.howWeWork}</h3>

              {/* 4 Cards Grid */}
              <div className="home-pillars-2x2-grid">
                {/* 1. Investigación a medida */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-sliders"></i>
                  </div>
                  <h4>{t.hero.pillar1Title}</h4>
                  <p>{t.hero.pillar1Desc}</p>
                </div>

                {/* 2. Del diseño al campo */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h4>{t.hero.pillar2Title}</h4>
                  <p>{t.hero.pillar2Desc}</p>
                </div>

                {/* 3. Campo con experiencia */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-users-viewfinder"></i>
                  </div>
                  <h4>{t.hero.pillar3Title}</h4>
                  <p>{t.hero.pillar3Desc}</p>
                </div>

                {/* 4. Conocimiento del contexto */}
                <div className="home-pillar-card">
                  <div className="home-pillar-icon-box">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <h4>{t.hero.pillar4Title}</h4>
                  <p>{t.hero.pillar4Desc} <ParaguayFlag size="sm" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

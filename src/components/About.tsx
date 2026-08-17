import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

interface AboutProps {
  onNavigate?: (page: PageType) => void
}

export default function About({ onNavigate }: Readonly<AboutProps>) {
  const { t } = useLanguage()

  return (
    <div className="page-view about-page-view">
      {/* Hero Banner with Lapacho Amarillo Image */}
      <section className="page-hero-banner hero-lapacho-amarillo">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_amarillo.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <span className="banner-tag">{t.about.bannerTag}</span>
          <h1 className="banner-title">{t.about.bannerTitle}</h1>
          <p className="banner-subtitle">
            {t.about.bannerSubtitle}
          </p>
        </div>
      </section>


      {/* Main Content Section */}
      <section className="section about-main-section">
        <div className="container">
          <div className="about-text-content-card">
            <h2 className="section-title text-center">
              {t.about.sectionTitle}
            </h2>
            <div className="about-divider-line"></div>
            
            <p className="lead-paragraph">
              {t.about.lead}
            </p>
            <p className="body-paragraph">
              {t.about.body}
            </p>

            <div className="about-work-section-block" style={{ marginTop: '48px' }}>
              <h3 className="section-subtitle-institutional text-center" style={{ marginBottom: '32px', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF' }}>
                {t.about.howWeWork}
              </h3>

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
                  <p>{t.hero.pillar4Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="page-back-home-wrapper">
            <button 
              type="button" 
              className="btn-back-home"
              onClick={() => onNavigate?.('inicio')}
            >
              <i className="fas fa-arrow-left"></i> Volver al inicio
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}


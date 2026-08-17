import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()

  return (
    <div className="page-view services-page-view">
      {/* Hero Banner with Lapacho Blanco Image */}
      <section className="page-hero-banner hero-lapacho-blanco">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <span className="banner-tag">{t.services.bannerTag}</span>
          <h1 className="banner-title">{t.services.bannerTitle}</h1>
          <p className="banner-subtitle">
            <ParaguayFlag size="sm" style={{ marginRight: '6px' }} />
            {t.services.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section services-main-section">
        <div className="container">
          <div className="services-intro-card">
            <h2 className="section-title text-center">
              {t.services.introTitle}
            </h2>
            <div className="about-divider-line"></div>
            
            <p className="lead-paragraph">
              {t.services.introLead}
            </p>
            <p className="body-paragraph">
              {t.services.introBody}
            </p>
          </div>

          {/* 2 Large Cards: Modalidades de Trabajo */}
          <div className="work-modes-section">
            <div className="work-modes-grid">
              {/* Card 01 · Servicio de Campo */}
              <div className="work-mode-card">
                <div className="work-mode-header">
                  <div className="work-mode-icon-box">
                    <i className="fas fa-map-location-dot"></i>
                  </div>
                  <span className="work-mode-number">01</span>
                </div>

                <span className="work-mode-tag">{t.services.mode1Tag}</span>
                <h3 className="work-mode-title">{t.services.mode1Title}</h3>
                <p className="work-mode-desc">
                  {t.services.mode1Desc} <ParaguayFlag size="sm" />
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  {t.services.mode1Items.map((item, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check check-icon"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 02 · Servicio Integral */}
              <div className="work-mode-card featured-mode-card">
                <div className="work-mode-header">
                  <div className="work-mode-icon-box terracotta-icon-box">
                    <i className="fas fa-diagram-project"></i>
                  </div>
                  <span className="work-mode-number">02</span>
                </div>

                <span className="work-mode-tag terracotta-tag">{t.services.mode2Tag}</span>
                <h3 className="work-mode-title">{t.services.mode2Title}</h3>
                <p className="work-mode-desc">
                  {t.services.mode2Desc}
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  {t.services.mode2Items.map((item, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check check-icon"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

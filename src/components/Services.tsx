import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

interface ServicesProps {
  onNavigate?: (page: PageType) => void
}

export default function Services({ onNavigate }: Readonly<ServicesProps>) {
  const { t } = useLanguage()

  return (
    <div className="page-view services-page-view">
      {/* Hero Banner with Lapacho Blanco Image */}
      <section className="page-hero-banner hero-lapacho-blanco">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <h1 className="banner-title">{t.services.bannerTitle}</h1>
          <p className="banner-subtitle">
            {t.services.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section services-main-section">
        <div className="container">
          <div className="services-intro-card">
            <h2 className="section-title text-center" style={{ whiteSpace: 'normal', maxWidth: '900px', margin: '0 auto 1.5rem auto' }}>
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
              {/* Card 1: Para Agencias y Consultoras / Servicio de Campo */}
              <div className="work-mode-card">
                <div className="work-mode-header-aligned">
                  <div className="work-mode-icon-box">
                    <i className="fas fa-map-location-dot"></i>
                  </div>
                  <h3 className="work-mode-title-aligned">{t.services.mode1Title}</h3>
                </div>

                <span className="work-mode-tag">{t.services.mode1Tag}</span>
                <p className="work-mode-desc">
                  {t.services.mode1Desc}
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  {t.services.mode1Items.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check check-icon"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Estudios a Medida / Servicio Integral */}
              <div className="work-mode-card featured-mode-card">
                <div className="work-mode-header-aligned">
                  <div className="work-mode-icon-box">
                    <i className="fas fa-diagram-project"></i>
                  </div>
                  <h3 className="work-mode-title-aligned">{t.services.mode2Title}</h3>
                </div>


                <span className="work-mode-tag terracotta-tag">{t.services.mode2Tag}</span>
                <p className="work-mode-desc">
                  {t.services.mode2Desc}
                </p>

                <div className="work-mode-divider"></div>

                <ul className="work-mode-checklist">
                  {t.services.mode2Items.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check check-icon"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="page-back-home-wrapper" style={{ marginTop: '48px' }}>
              <button 
                type="button" 
                className="btn-back-home"
                onClick={() => onNavigate?.('inicio')}
              >
                <i className="fas fa-arrow-left"></i> Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


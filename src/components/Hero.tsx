import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'
import LapachoCard from './LapachoCard'

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
            {/* Card 1: Sobre NOEMA (Lapacho Amarillo) */}
            <LapachoCard
              cardTag={t.hero.card1Tag}
              title={t.hero.card1Title}
              description={t.hero.card1Desc}
              linkText={t.hero.card1Link}
              imageSrc="/assets/images/heroes/lapacho_amarillo.jpg"
              petalColor="#FFD54F"
              onClick={() => onNavigate?.('sobre-noema')}
            />

            {/* Card 2: Servicios (Lapacho Blanco) */}
            <LapachoCard
              cardTag={t.hero.card2Tag}
              title={t.hero.card2Title}
              description={t.hero.card2Desc}
              linkText={t.hero.card2Link}
              imageSrc="/assets/images/heroes/lapacho_blanco.jpg"
              petalColor="#FFFFFF"
              onClick={() => onNavigate?.('servicios')}
            />

            {/* Card 3: Contacto (Lapacho Rosado) */}
            <LapachoCard
              cardTag={t.hero.card3Tag}
              title={t.hero.card3Title}
              description={t.hero.card3Desc}
              linkText={t.hero.card3Link}
              imageSrc="/assets/images/heroes/lapacho_rosado.jpg"
              petalColor="#F48FB1"
              onClick={() => onNavigate?.('contacto')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


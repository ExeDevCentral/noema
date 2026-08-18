import { motion, type Variants } from 'framer-motion'
import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'
import TiltCard from './TiltCard'

interface HeroProps {
  onNavigate?: (page: PageType) => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Hero({ onNavigate }: Readonly<HeroProps>) {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="hero-section hero-pure-statement">
      <div className="container">
        <motion.div
          className="hero-statement-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title-main" variants={itemVariants}>
            {t.hero.titleMain}
          </motion.h1>

          <motion.p className="hero-description-main" variants={itemVariants}>
            {t.hero.descriptionMain}
          </motion.p>

          <motion.p className="hero-tagline-text" variants={itemVariants}>
            {t.hero.tagline}
          </motion.p>

          {/* The 3 Lapacho Navigation Cards with 3D Physics Tilt */}
          <motion.div className="hero-nav-cards-grid" variants={itemVariants}>
            {/* Card 1: Sobre NOEMA */}
            <TiltCard
              className="hero-nav-card"
              onClick={() => onNavigate?.('sobre-noema')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate?.('sobre-noema')
              }}
            >
              <div
                className="hero-card-bg-img"
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_amarillo.jpg')" }}
              />
              <div className="hero-card-overlay" />
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card1Tag}</span>
                <h3>{t.hero.card1Title}</h3>
                <p>{t.hero.card1Desc}</p>
                <span className="card-link">{t.hero.card1Link}</span>
              </div>
            </TiltCard>

            {/* Card 2: Servicios de Investigación */}
            <TiltCard
              className="hero-nav-card"
              onClick={() => onNavigate?.('servicios')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate?.('servicios')
              }}
            >
              <div
                className="hero-card-bg-img"
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_blanco.jpg')" }}
              />
              <div className="hero-card-overlay" />
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card2Tag}</span>
                <h3>{t.hero.card2Title}</h3>
                <p>{t.hero.card2Desc}</p>
                <span className="card-link">{t.hero.card2Link}</span>
              </div>
            </TiltCard>

            {/* Card 3: Contacto */}
            <TiltCard
              className="hero-nav-card"
              onClick={() => onNavigate?.('contacto')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavigate?.('contacto')
              }}
            >
              <div
                className="hero-card-bg-img"
                style={{ backgroundImage: "url('/assets/images/heroes/lapacho_rosado.jpg')" }}
              />
              <div className="hero-card-overlay" />
              <div className="hero-card-content">
                <span className="hero-card-tag">{t.hero.card3Tag}</span>
                <h3>{t.hero.card3Title}</h3>
                <p>{t.hero.card3Desc}</p>
                <span className="card-link">{t.hero.card3Link}</span>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


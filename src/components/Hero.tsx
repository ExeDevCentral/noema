import { motion, type Variants } from 'framer-motion'
import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'
import LapachoCard from './LapachoCard'

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
        </motion.div>
      </div>
    </section>
  )
}


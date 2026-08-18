import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParaguayFlag from './ParaguayFlag'

interface BrandLogoProps {
  light?: boolean
  showFlag?: boolean
  onClick?: () => void
}

function FlyingBird({ delay, startX, startY }: Readonly<{ delay: number; startX: number; startY: number }>) {
  return (
    <motion.svg
      className="brand-flying-bird"
      viewBox="0 0 24 16"
      style={{ left: `${startX}px`, top: `${startY}px` }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 0.9, 0],
        x: [0, 12, 26],
        y: [0, -14, -28],
        scale: [0.5, 0.8, 0.6],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.3,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.path
        d="M2,10 Q7,3 12,8 Q17,3 22,10"
        fill="none"
        stroke="#FFDFC9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          d: [
            'M2,10 Q7,3 12,8 Q17,3 22,10',
            'M2,5 Q7,11 12,7 Q17,11 22,5',
            'M2,10 Q7,3 12,8 Q17,3 22,10',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  )
}

export default function BrandLogo({ showFlag = true, onClick }: Readonly<BrandLogoProps>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="#inicio"
      className="brand-logo"
      aria-label="NOEMA - Investigación y Estudios"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) onClick()
      }}
    >
      {/* Tree Symbol Wrapper with Wind Sway & Flying Birds */}
      <div className="brand-symbol-interactive-box">
        <motion.div
          className="brand-symbol-wind-sway"
          animate={{
            rotate: isHovered ? [0, -3.5, 2.8, -1.8, 1, 0] : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.3,
          }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <img
            src="/assets/images/logo_symbol_white.png"
            alt="NOEMA Isotipo"
            className="brand-official-symbol-img brand-symbol-white"
            width="54"
            height="48"
          />
        </motion.div>

        {/* Minimalist Birds Taking Flight from Trees on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <FlyingBird delay={0.05} startX={22} startY={6} />
              <FlyingBird delay={0.25} startX={14} startY={10} />
              <FlyingBird delay={0.45} startX={30} startY={8} />
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="brand-text-block">
        <span className="brand-title">NOEMA</span>
        <span className="brand-subtitle">INVESTIGACIÓN Y ESTUDIOS</span>
      </div>

      {showFlag && (
        <div className="brand-flag-badge-container" title="Paraguay" aria-label="Paraguay">
          <ParaguayFlag size="md" />
        </div>
      )}
    </a>
  )
}

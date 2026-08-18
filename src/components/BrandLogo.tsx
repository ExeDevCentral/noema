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
      viewBox="0 0 32 20"
      style={{ left: `${startX}px`, top: `${startY}px` }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, 18, 38],
        y: [0, -18, -36],
        scale: [0.6, 1.1, 0.7],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: 'easeOut',
      }}
    >
      <motion.path
        d="M2,12 Q9,2 16,9 Q23,2 30,12"
        fill="none"
        stroke="#FFDFC9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          d: [
            'M2,12 Q9,2 16,9 Q23,2 30,12',
            'M2,5 Q9,15 16,9 Q23,15 30,5',
            'M2,12 Q9,2 16,9 Q23,2 30,12',
          ],
        }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  )
}

function FloatingLeaf({ delay, startX, startY }: Readonly<{ delay: number; startX: number; startY: number }>) {
  return (
    <motion.div
      className="brand-floating-leaf"
      style={{ left: `${startX}px`, top: `${startY}px` }}
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.9, 0.8, 0],
        x: [0, 22, 45],
        y: [0, 12, 28],
        rotate: [0, 90, 220],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: 'easeOut',
      }}
    />
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
      {/* Tree Symbol Wrapper with Wind Sway, Leaves & Birds */}
      <div className="brand-symbol-interactive-box">
        {/* Wind Aura Ripple */}
        <motion.div
          className="brand-wind-aura"
          animate={{
            scale: isHovered ? [0.9, 1.35, 1] : 1,
            opacity: isHovered ? [0.2, 0.7, 0] : 0,
          }}
          transition={{
            duration: 1.6,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeOut',
          }}
        />

        {/* Tree Wind Flex Animation */}
        <motion.div
          className="brand-symbol-wind-sway"
          animate={{
            rotate: isHovered ? [0, -6, 5, -3.5, 2, 0] : 0,
            skewX: isHovered ? [0, -4.5, 3.8, -2.5, 1.2, 0] : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            duration: 1.8,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
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

        {/* Birds taking flight and leaves floating */}
        <AnimatePresence>
          {isHovered && (
            <>
              <FlyingBird delay={0.05} startX={16} startY={-4} />
              <FlyingBird delay={0.35} startX={6} startY={6} />
              <FlyingBird delay={0.7} startX={26} startY={2} />
              <FloatingLeaf delay={0.15} startX={12} startY={16} />
              <FloatingLeaf delay={0.65} startX={24} startY={20} />
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

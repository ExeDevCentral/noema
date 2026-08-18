import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'

interface LapachoCardProps {
  cardTag: string
  title: string
  description: string
  linkText: string
  imageSrc: string
  petalColor: string
  onClick?: () => void
}

// Drifting Lapacho Petal in the wind
function DriftingPetal({
  delay,
  startX,
  startY,
  color,
}: Readonly<{
  delay: number
  startX: number
  startY: number
  color: string
}>) {
  return (
    <motion.div
      className="lapacho-wind-petal"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
      }}
      initial={{
        opacity: 0,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: [0, 0.9, 0.85, 0],
        x: [0, 25, 55],
        y: [0, 18, 42],
        rotate: [0, 140, 360],
        scale: [0.7, 1, 0.8],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        repeatDelay: 0.2,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function LapachoCard({
  cardTag,
  title,
  description,
  linkText,
  imageSrc,
  petalColor,
  onClick,
}: Readonly<LapachoCardProps>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'contents' }}
    >
      <TiltCard
        className="hero-nav-card"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') onClick?.()
        }}
      >
        {/* Background tree image with smooth wind breathing zoom */}
        <motion.div
          className="hero-card-bg-img"
          style={{ backgroundImage: `url('${imageSrc}')` }}
          animate={{
            scale: isHovered ? 1.025 : 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Drifting petals blown by wind from tree canopy on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="lapacho-effects-layer"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DriftingPetal delay={0.05} startX={32} startY={22} color={petalColor} />
              <DriftingPetal delay={0.35} startX={48} startY={28} color={petalColor} />
              <DriftingPetal delay={0.65} startX={25} startY={35} color={petalColor} />
              <DriftingPetal delay={0.95} startX={56} startY={18} color={petalColor} />
              <DriftingPetal delay={1.25} startX={40} startY={32} color={petalColor} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hero-card-overlay" />

        <div className="hero-card-content">
          <span className="hero-card-tag">{cardTag}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="card-link">{linkText}</span>
        </div>
      </TiltCard>
    </div>
  )
}

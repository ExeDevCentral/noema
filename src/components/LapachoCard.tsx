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

// Minimalist Bird silhouette that flies across the tree sky
function SkyBird({ delay, startX, startY }: Readonly<{ delay: number; startX: number; startY: number }>) {
  return (
    <motion.svg
      className="lapacho-sky-bird"
      viewBox="0 0 28 16"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.95, 0.9, 0],
        x: [0, 35, 75],
        y: [0, -22, -48],
        scale: [0.5, 0.85, 0.65],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: 'easeOut',
      }}
    >
      <motion.path
        d="M2,11 Q8,2 14,8 Q20,2 26,11"
        fill="none"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          d: [
            'M2,11 Q8,2 14,8 Q20,2 26,11',
            'M2,5 Q8,14 14,8 Q20,14 26,5',
            'M2,11 Q8,2 14,8 Q20,2 26,11',
          ],
        }}
        transition={{
          duration: 0.32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  )
}

// Drifting Lapacho Petal in the wind
function DriftingPetal({ delay, startX, startY, color }: Readonly<{ delay: number; startX: number; startY: number; color: string }>) {
  return (
    <motion.div
      className="lapacho-wind-petal"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
      }}
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.85, 0.8, 0],
        x: [0, 30, 65],
        y: [0, 25, 55],
        rotate: [0, 140, 360],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2.6,
        delay,
        repeat: Infinity,
        repeatDelay: 0.4,
        ease: 'easeOut',
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
            scale: isHovered ? 1.08 : 1,
            x: isHovered ? [0, 3, -3, 2, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 3, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' },
          }}
        />

        {/* Ambient Sun & Wind Shimmer Glow on Tree Canopy */}
        <motion.div
          className="lapacho-sun-glare"
          animate={{
            opacity: isHovered ? 0.35 : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Birds flying across tree canopy on Hover */}
        <AnimatePresence>
          {isHovered && (
            <div className="lapacho-effects-layer" aria-hidden="true">
              <SkyBird delay={0.05} startX={18} startY={28} />
              <SkyBird delay={0.35} startX={8} startY={36} />
              <SkyBird delay={0.7} startX={25} startY={22} />

              {/* Drifting petals blown by wind from tree canopy */}
              <DriftingPetal delay={0.1} startX={35} startY={25} color={petalColor} />
              <DriftingPetal delay={0.4} startX={48} startY={30} color={petalColor} />
              <DriftingPetal delay={0.8} startX={28} startY={38} color={petalColor} />
              <DriftingPetal delay={1.1} startX={55} startY={20} color={petalColor} />
            </div>
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

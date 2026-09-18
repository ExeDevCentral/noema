import React from 'react'
import TiltCard from './TiltCard'

interface LapachoCardProps {
  cardTag: string
  title: string
  description: string
  linkText?: string
  imageSrc: string
  petalColor: string
  onClick?: () => void
}

// Drifting Lapacho Petal in the wind (CSS keyframes on parent hover)
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
    <div
      className="lapacho-wind-petal"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export default function LapachoCard({
  cardTag,
  title,
  description,
  imageSrc,
  petalColor,
  onClick,
}: Readonly<LapachoCardProps>) {
  return (
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
      <div
        className="hero-card-bg-img"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />

      {/* Drifting petals blown by wind from tree canopy on Hover */}
      <div className="lapacho-effects-layer" aria-hidden="true">
        <DriftingPetal delay={0.05} startX={32} startY={22} color={petalColor} />
        <DriftingPetal delay={0.35} startX={48} startY={28} color={petalColor} />
        <DriftingPetal delay={0.65} startX={25} startY={35} color={petalColor} />
        <DriftingPetal delay={0.95} startX={56} startY={18} color={petalColor} />
        <DriftingPetal delay={1.25} startX={40} startY={32} color={petalColor} />
      </div>

      <div className="hero-card-overlay" />

      <div className="hero-card-content">
        <span className="hero-card-tag">{cardTag}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </TiltCard>
  )
}
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  role?: string
  tabIndex?: number
  maxTilt?: number
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  onKeyDown,
  role,
  tabIndex,
  maxTilt = 7,
}: Readonly<TiltCardProps>) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery smooth motion
  const springConfig = { damping: 22, stiffness: 280, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Transform to 3D rotation angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt])

  // Dynamic light reflection position & opacity
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useTransform(smoothX, (val) => (val === 0 ? 0 : 0.15))

  const glareGradient = useTransform(
    [glareX, glareY],
    ([latestX, latestY]: string[]) =>
      `radial-gradient(circle 320px at ${latestX} ${latestY}, rgba(255, 255, 255, 0.45), transparent 75%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    mouseX.set(clientX / width - 0.5)
    mouseY.set(clientY / height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.985 }}
      transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
    >
      {children}

      {/* Dynamic Specular Glare Reflection */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 4,
          borderRadius: 'inherit',
          opacity: glareOpacity,
          background: glareGradient,
        }}
      />
    </motion.div>
  )
}

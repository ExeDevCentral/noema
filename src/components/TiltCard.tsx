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
    </motion.div>
  )
}

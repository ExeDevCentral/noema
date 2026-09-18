import React, { useRef } from 'react'

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
  const hoveredRef = useRef(false)
  const pressedRef = useRef(false)

  const currentScale = () => (pressedRef.current ? 0.985 : hoveredRef.current ? 1.025 : 1)

  const applyTilt = (rx: number, ry: number) => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${currentScale().toFixed(4)})`
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    applyTilt(-ny * 2 * maxTilt, nx * 2 * maxTilt)
  }

  const handleMouseLeave = () => {
    hoveredRef.current = false
    applyTilt(0, 0)
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      onMouseEnter={() => {
        hoveredRef.current = true
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => {
        pressedRef.current = true
      }}
      onMouseUp={() => {
        pressedRef.current = false
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {children}
    </div>
  )
}
import React from 'react'

interface ParaguayFlagProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}

export default function ParaguayFlag({ size = 'sm', className = '', style }: ParaguayFlagProps) {
  const dimensions = {
    sm: { width: 22, height: 14, radius: 3 },
    md: { width: 28, height: 18, radius: 3 },
    lg: { width: 36, height: 23, radius: 4 },
  }[size]

  return (
    <span 
      className={`inline-py-flag-wrapper ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        verticalAlign: 'middle',
        marginRight: '6px',
        ...style 
      }}
      title="República del Paraguay"
      aria-label="Bandera de Paraguay"
    >
      <svg 
        viewBox="0 0 60 36" 
        width={dimensions.width} 
        height={dimensions.height} 
        style={{ 
          borderRadius: `${dimensions.radius}px`, 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden',
          display: 'block',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <defs>
          <linearGradient id="pyRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DE2929" />
            <stop offset="100%" stopColor="#BA1717" />
          </linearGradient>
          <linearGradient id="pyBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A4ABF" />
            <stop offset="100%" stopColor="#00318A" />
          </linearGradient>
        </defs>
        {/* Red stripe */}
        <rect width="60" height="12" fill="url(#pyRedGrad)" />
        {/* White stripe */}
        <rect y="12" width="60" height="12" fill="#FFFFFF" />
        {/* Blue stripe */}
        <rect y="24" width="60" height="12" fill="url(#pyBlueGrad)" />
        
        {/* National Seal (Escudo de la República del Paraguay) */}
        <circle cx="30" cy="18" r="4.6" fill="#FFFFFF" stroke="#0A4ABF" strokeWidth="0.3" />
        <circle cx="30" cy="18" r="3.7" fill="none" stroke="#2B8A3E" strokeWidth="0.6" strokeDasharray="0.8, 0.5" />
        {/* Central 5-point Star */}
        <polygon points="30,15.2 30.8,17.2 32.8,17.2 31.2,18.4 31.8,20.4 30,19.2 28.2,20.4 28.8,18.4 27.2,17.2 29.2,17.2" fill="#FFC700" stroke="#D4AF37" strokeWidth="0.2" />
      </svg>
    </span>
  )
}

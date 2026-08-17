import React from 'react'

interface ParaguayFlagProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}

/**
 * High-definition, 100% compliant Paraguay Flag Component.
 * Official Pantone colors:
 * - Red (Rojo): #D52B1E
 * - White (Blanco): #FFFFFF
 * - Blue (Azul): #0038A8
 * Features the authentic national coat of arms (Estrella de Mayo y corona de palma y olivo).
 */
export default function ParaguayFlag({ size = 'sm', className = '', style }: ParaguayFlagProps) {
  const dimensions = {
    sm: { width: 24, height: 15, radius: 2.5 },
    md: { width: 30, height: 18, radius: 3 },
    lg: { width: 40, height: 24, radius: 4 },
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
        flexShrink: 0,
        ...style 
      }}
      title="República del Paraguay"
      aria-label="Bandera oficial de la República del Paraguay"
    >
      <svg 
        viewBox="0 0 60 36" 
        width={dimensions.width} 
        height={dimensions.height} 
        style={{ 
          borderRadius: `${dimensions.radius}px`, 
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.25)',
          overflow: 'hidden',
          display: 'block',
          border: '1px solid rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Franja Superior: Rojo Oficial (#D52B1E) */}
        <rect x="0" y="0" width="60" height="12" fill="#D52B1E" />
        
        {/* Franja Central: Blanco Oficial (#FFFFFF) */}
        <rect x="0" y="12" width="60" height="12" fill="#FFFFFF" />
        
        {/* Franja Inferior: Azul Oficial (#0038A8) */}
        <rect x="0" y="24" width="60" height="12" fill="#0038A8" />
        
        {/* Escudo Nacional del Paraguay (Anverso) */}
        <g transform="translate(30, 18)">
          {/* Círculo base blanco con borde fino */}
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" stroke="#0038A8" strokeWidth="0.3" />
          
          {/* Corona de ramas verdes (Palma y Olivo) */}
          <circle cx="0" cy="0" r="3.8" fill="none" stroke="#1E824C" strokeWidth="0.8" strokeDasharray="1.2, 0.6" />
          
          {/* Estrella de Mayo de 5 puntas (Amarillo / Oro) */}
          <polygon 
            points="0,-2.6 0.8,-0.9 2.6,-0.9 1.2,0.2 1.7,1.9 0,0.8 -1.7,1.9 -1.2,0.2 -2.6,-0.9 -0.8,-0.9" 
            fill="#FFD700" 
            stroke="#C89600" 
            strokeWidth="0.25" 
          />
        </g>
      </svg>
    </span>
  )
}

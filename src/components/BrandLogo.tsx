interface BrandLogoProps {
  light?: boolean
  onClick?: () => void
}

export default function BrandLogo({ light = false, onClick }: BrandLogoProps) {
  const textColor = light ? '#FAF8F5' : '#1B2A38'
  const subtitleColor = light ? 'rgba(250, 248, 245, 0.8)' : '#6C7A89'

  return (
    <a 
      href="#inicio" 
      className="brand-logo" 
      aria-label="Noema - Investigación y Estudios" 
      onClick={(e) => { 
        e.preventDefault() 
        if (onClick) onClick() 
      }}
    >
      {/* Synthetic Abstract 'N' Symbol representing intellect/thought */}
      <div className="brand-symbol-wrapper">
        <svg className="brand-symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Vertical Line */}
          <rect x="22" y="20" width="12" height="60" rx="6" fill="#C88A6E" />
          {/* Diagonal Connecting Ribbon */}
          <path d="M 32 24 L 68 76" stroke="#1B2A38" strokeWidth="12" strokeLinecap="round" />
          {/* Right Vertical Line */}
          <rect x="66" y="20" width="12" height="60" rx="6" fill="#8F9E8B" />
          {/* Subtle Golden Intellect Arc */}
          <path d="M 28 16 Q 50 8 72 16" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="brand-text-block">
        <div className="brand-header-row">
          <span className="brand-title" style={{ color: textColor }}>NOEMA</span>
          {/* Paraguayan Flag Pill Badge */}
          <span className="paraguay-flag-badge" title="Paraguay - MERCOSUR">
            <span className="flag-stripe red"></span>
            <span className="flag-stripe white"></span>
            <span className="flag-stripe blue"></span>
          </span>
        </div>
        <span className="brand-subtitle" style={{ color: subtitleColor }}>
          INVESTIGACIÓN Y ESTUDIOS
        </span>
      </div>
    </a>
  )
}


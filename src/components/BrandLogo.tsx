interface BrandLogoProps {
  light?: boolean
  onClick?: () => void
}

export default function BrandLogo({ light = false, onClick }: BrandLogoProps) {
  const textColor = light ? '#FAF8F5' : '#1B2A38'
  const subtitleColor = light ? 'rgba(250, 248, 245, 0.85)' : '#6C7A89'

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
      {/* Paraguayan Flag Icon replacing the previous icon */}
      <div className="brand-flag-icon" title="Paraguay">
        <svg viewBox="0 0 60 40" width="38" height="26" className="py-flag-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="40" rx="3" fill="#ffffff" />
          {/* Red Stripe */}
          <rect width="60" height="13.33" fill="#D52B1E" rx="3" />
          <rect y="10" width="60" height="3.33" fill="#D52B1E" />
          {/* White Stripe */}
          <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
          {/* Blue Stripe */}
          <rect y="26.67" width="60" height="13.33" fill="#0038A8" rx="3" />
          <rect y="26.67" width="60" height="3.33" fill="#0038A8" />
          {/* Central Seal Detail */}
          <circle cx="30" cy="20" r="4.2" fill="#FFFFFF" stroke="#C88A6E" strokeWidth="0.8" />
          <circle cx="30" cy="20" r="2.2" fill="#D4AF37" />
        </svg>
      </div>

      <div className="brand-text-block">
        <span className="brand-title" style={{ color: textColor }}>NOEMA</span>
        <span className="brand-subtitle" style={{ color: subtitleColor }}>
          INVESTIGACIÓN Y ESTUDIOS
        </span>
      </div>
    </a>
  )
}



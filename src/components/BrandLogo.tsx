interface BrandLogoProps {
  light?: boolean
  onClick?: () => void
}

export default function BrandLogo({ light = false, onClick }: BrandLogoProps) {
  const textColor = light ? '#FAF8F5' : '#FFFFFF'
  const subtitleColor = light ? 'rgba(250, 248, 245, 0.85)' : '#C88A6E'

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
      <img 
        src="/assets/images/logo_symbol.png" 
        alt="Noema Isotipo" 
        className="brand-official-symbol-img"
        width="48"
        height="48"
      />

      <div className="brand-text-block">
        <span className="brand-title" style={{ color: textColor }}>NOEMA</span>
        <span className="brand-subtitle" style={{ color: subtitleColor }}>
          INVESTIGACIÓN Y ESTUDIOS
        </span>
      </div>
    </a>
  )
}



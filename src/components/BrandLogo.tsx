interface BrandLogoProps {
  light?: boolean
  href?: string
}

export default function BrandLogo({ light = false, href = '#' }: BrandLogoProps) {
  const strokeMain = light ? '#FAF8F5' : '#1B2A38'
  return (
    <a href={href} className="brand-logo" aria-label="Noema Consultora Inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
      <svg className="brand-symbol-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 32,25 A 35,35 0 0 1 70,20" stroke="#C88A6E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 68,28 C 30,22 25,70 68,68" stroke={strokeMain} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M 38,45 C 38,78 70,82 78,65" stroke="#8F9E8B" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
      <div className="brand-text-block">
        <span className="brand-title" style={light ? { color: '#FAF8F5' } : undefined}>NOEMA</span>
        <div className="brand-subtitle-line">
          <span className="brand-dot"></span>
        </div>
        <span className="brand-subtitle" style={light ? { color: 'rgba(250, 248, 245, 0.7)' } : undefined}>C O N S U L T O R A</span>
      </div>
    </a>
  )
}

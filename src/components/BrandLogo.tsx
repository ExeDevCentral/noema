import ParaguayFlag from './ParaguayFlag'

interface BrandLogoProps {
  light?: boolean
  showFlag?: boolean
  onClick?: () => void
}

export default function BrandLogo({ showFlag = true, onClick }: Readonly<BrandLogoProps>) {


  return (
    <a 
      href="#inicio" 
      className="brand-logo" 
      aria-label="NOEMA - Investigación y Estudios" 
      onClick={(e) => { 
        e.preventDefault() 
        if (onClick) onClick() 
      }}
    >
      <img 
        src="/assets/images/logo_symbol_white.png" 
        alt="NOEMA Isotipo" 
        className="brand-official-symbol-img brand-symbol-white"
        width="44"
        height="46"
      />

      <div className="brand-text-block">
        <span className="brand-title">NOEMA</span>
        <span className="brand-subtitle">
          INVESTIGACIÓN Y ESTUDIOS
        </span>
      </div>

      {showFlag && (
        <div className="brand-flag-badge-container" title="Paraguay" aria-label="Paraguay">
          <ParaguayFlag size="md" />
        </div>
      )}
    </a>
  )
}




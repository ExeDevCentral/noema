import ParaguayFlag from './ParaguayFlag'

interface BrandLogoProps {
  light?: boolean
  showFlag?: boolean
  onClick?: () => void
}

function FlyingBird({ delay, startX, startY }: Readonly<{ delay: number; startX: number; startY: number }>) {
  return (
    <svg
      className="brand-flying-bird"
      viewBox="0 0 32 20"
      style={{ left: `${startX}px`, top: `${startY}px`, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <path
        d="M2,12 Q9,2 16,9 Q23,2 30,12"
        fill="none"
        stroke="#FFDFC9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="d"
          dur="0.7s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          keyTimes="0;0.5;1"
          values="M2,12 Q9,2 16,9 Q23,2 30,12;M2,5 Q9,15 16,9 Q23,15 30,5;M2,12 Q9,2 16,9 Q23,2 30,12"
        />
      </path>
    </svg>
  )
}

function FloatingLeaf({ delay, startX, startY }: Readonly<{ delay: number; startX: number; startY: number }>) {
  return (
    <div
      className="brand-floating-leaf"
      style={{ left: `${startX}px`, top: `${startY}px`, animationDelay: `${delay}s` }}
    />
  )
}

export default function BrandLogo({ showFlag = true, onClick }: Readonly<BrandLogoProps>) {
  return (
    <a
      href="#inicio"
      className="brand-logo"
      aria-label="NOEMA INVESTIGACIÓN Y ESTUDIOS"
      onClick={(e) => {
        e.preventDefault()
        if (onClick) onClick()
      }}
    >
      {/* Tree Symbol Wrapper with Wind Sway, Leaves & Birds */}
      <div className="brand-symbol-interactive-box">
        {/* Wind Aura Ripple */}
        <div className="brand-wind-aura" aria-hidden="true" />

        {/* Tree Wind Flex Animation */}
        <div className="brand-symbol-wind-sway">
          <img
            src="/assets/images/logo_symbol_white.webp"
            alt="NOEMA Isotipo"
            className="brand-official-symbol-img brand-symbol-white"
            width="54"
            height="48"
          />
        </div>

        {/* Birds taking flight and leaves floating */}
        <FlyingBird delay={0.05} startX={16} startY={-4} />
        <FlyingBird delay={0.35} startX={6} startY={6} />
        <FlyingBird delay={0.7} startX={26} startY={2} />
        <FloatingLeaf delay={0.15} startX={12} startY={16} />
        <FloatingLeaf delay={0.65} startX={24} startY={20} />
      </div>

      <div className="brand-text-block">
        <span className="brand-title">NOEMA</span>{' '}
        <span className="brand-subtitle">INVESTIGACIÓN Y ESTUDIOS</span>
      </div>

      {showFlag && (
        <div className="brand-flag-badge-container">
          <ParaguayFlag size="md" />
        </div>
      )}
    </a>
  )
}
import { useLanguage } from '../context/LanguageContext'
import ParaguayFlag from './ParaguayFlag'

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'floating' | 'banner'
  className?: string
}

export default function LanguageSwitcher({ variant = 'navbar', className = '' }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      type="button"
      className={`lang-switcher-btn lang-variant-${variant} ${className}`}
      onClick={toggleLanguage}
      aria-label={`Cambiar idioma a ${language === 'es' ? 'Guaraní' : 'Español'}`}
      title={language === 'es' ? 'Ñamonde Guaraníme (Cambiar a Guaraní)' : 'Cambiar a Español'}
    >
      <ParaguayFlag size="sm" style={{ marginRight: '6px' }} />
      <span className="lang-code-tag">{language === 'es' ? 'GUA' : 'ES'}</span>
      <span className="lang-name-label">{language === 'es' ? 'Avañeʼẽ' : 'Español'}</span>
    </button>
  )
}

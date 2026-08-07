import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      id="backToTopBtn"
      className={`back-to-top-btn${visible ? ' visible' : ''}`}
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}

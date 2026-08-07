import { useEffect } from 'react'

export const REVEAL_SELECTORS = [
  '.section-header',
  '.about-content',
  '.about-image-stack',
  '.value-card',
  '.service-card',
  '.methodology-step',
  '.contact-info-card',
  '.contact-form-wrapper',
  '.faq-item',
]

/**
 * Port of the legacy `initReveal()` logic: tags matching elements with the
 * `reveal` class and reveals them (adds `reveal-visible`) when they enter
 * the viewport. Runs once after the app mounts.
 */
export function useRevealOnScroll(selectors: string[] = REVEAL_SELECTORS) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')))
    if (!items.length) return

    items.forEach((el) => el.classList.add('reveal'))

    const parents = new Set<Element>()
    items.forEach((el) => parents.add(el.parentElement!))
    parents.forEach((parent) => {
      const siblings = Array.from(parent.children).filter((c) =>
        c.classList.contains('reveal'),
      )
      siblings.forEach((el, i) => {
        ;(el as HTMLElement).style.transitionDelay = `${Math.min(i * 80, 400)}ms`
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selectors])
}

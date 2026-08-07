import { useEffect } from 'react'

const HEADER_OFFSET = 80

/** Smooth-scrolls to an element by id, accounting for the fixed header. */
export function scrollToId(targetId: string) {
  if (targetId === '#') return
  const targetElement = document.querySelector(targetId)
  if (!targetElement) return
  const elementPosition = targetElement.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}

/** Binds smooth scrolling + scrollspy active-link highlighting. */
export function useSmoothScrollAndSpy() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      scrollToId(href)
    }

    document.addEventListener('click', handleClick)

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-menu .nav-link'))
    if (!sections.length || !navLinks.length) return

    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 120
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`)
          })
        }
      })
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true })
    updateActiveLink()

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', updateActiveLink)
    }
  }, [])
}

import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const elements = root.querySelectorAll<HTMLElement>('.reveal-item')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return ref
}


import { useEffect, useRef } from 'react'

/**
 * Adds the `is-visible` class to any element with the `reveal` class
 * when it scrolls into view. Acts as a lightweight AOS replacement.
 */
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observerRef.current?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])
}

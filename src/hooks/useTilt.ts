import { useCallback, useRef, type ReactNode } from 'react'

interface TiltResult {
  ref: React.RefObject<HTMLDivElement | null>
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave: () => void
  style: React.CSSProperties
}

/**
 * Subtle 3D tilt effect that follows the mouse.
 * Max tilt is intentionally small (8deg) for a premium feel.
 */
export function useTilt(maxTilt = 8): TiltResult {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.02)`
    },
    [maxTilt],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { transformStyle: 'preserve-3d', transition: 'transform 0.3s ease' },
  }
}

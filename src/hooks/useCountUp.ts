'use client'

import { useState, useEffect, useRef, useCallback, type RefObject } from 'react'

interface UseCountUpOptions {
  duration?: number
  startOnView?: boolean
  easing?: 'easeOut' | 'easeInOut' | 'linear'
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function getEasingFn(easing: UseCountUpOptions['easing']): (t: number) => number {
  switch (easing) {
    case 'easeOut':
      return easeOutCubic
    case 'easeInOut':
      return easeInOutCubic
    case 'linear':
    default:
      return (t: number) => t
  }
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {},
  externalRef?: RefObject<HTMLDivElement | null>
): { count: number; ref: RefObject<HTMLDivElement | null> } {
  const { duration = 2000, startOnView = true, easing = 'easeOut' } = options
  const [count, setCount] = useState(0)
  const internalRef = useRef<HTMLDivElement>(null)
  const ref = externalRef || internalRef
  const hasStarted = useRef(false)
  const prevTarget = useRef(target)
  const rafId = useRef<number>(0)

  const startCounting = useCallback(() => {
    if (prevTarget.current !== target) {
      prevTarget.current = target
      hasStarted.current = false
    }

    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()
    const easingFn = getEasingFn(easing)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFn(progress)

      setCount(Math.round(easedProgress * target))

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    rafId.current = requestAnimationFrame(animate)
  }, [target, duration, easing])

  useEffect(() => {
    if (!startOnView) {
      const id = requestAnimationFrame(() => startCounting())
      return () => cancelAnimationFrame(id)
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting()
          observer.unobserve(element)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [startCounting, startOnView, ref])

  return { count, ref }
}

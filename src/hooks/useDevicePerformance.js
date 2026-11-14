import { useMemo } from 'react'
export default function useDevicePerformance() {
  return useMemo(() => {
    const mobile = window.matchMedia('(max-width: 820px)').matches || /Mobi|Android/i.test(navigator.userAgent)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { mobile, reduced, dpr: mobile ? [1, 1.5] : [1, 2], particles: mobile ? 40 : 140 }
  }, [])
}

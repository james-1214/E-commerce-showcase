import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Robust scroll progress hook: combining native window scroll calculations + GSAP ScrollTrigger
export default function useScrollProgress(trackRef, onUpdate) {
  const progress = useRef(0)

  useEffect(() => {
    // 1. Direct native scroll handler for guaranteed 100% responsiveness on any device/browser
    const handleNativeScroll = () => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const total = trackRef.current.scrollHeight - window.innerHeight
      if (total <= 0) return
      const p = Math.min(1, Math.max(0, -rect.top / total))
      progress.current = p
      onUpdate?.(p)
    }

    window.addEventListener('scroll', handleNativeScroll, { passive: true })
    window.addEventListener('resize', handleNativeScroll, { passive: true })

    // Initial check
    handleNativeScroll()

    // 2. GSAP ScrollTrigger integration
    let st = null
    try {
      st = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (s) => {
          progress.current = s.progress
          onUpdate?.(s.progress)
        },
      })
      ScrollTrigger.refresh()
    } catch (e) {
      // Fallback already covered by native handler
    }

    return () => {
      window.removeEventListener('scroll', handleNativeScroll)
      window.removeEventListener('resize', handleNativeScroll)
      if (st) st.kill()
    }
  }, [trackRef, onUpdate])

  return progress
}

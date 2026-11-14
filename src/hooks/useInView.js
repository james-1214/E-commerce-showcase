import { useEffect, useState } from 'react'
export default function useInView(ref, margin = '200px') {
  const [v, setV] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { rootMargin: margin })
    io.observe(ref.current); return () => io.disconnect()
  }, [])
  return v
}

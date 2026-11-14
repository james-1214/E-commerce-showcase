import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Lock } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAnimation } from '../context/AnimationContext'
import { CATEGORIES } from '../data/corData'

function CategoryCard({ cat, index }) {
  const { isDark } = useTheme()
  const { isAnimationActive } = useAnimation()
  const tiltActive = isAnimationActive('tilt')
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (!tiltActive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 90}ms`,
        transform: tiltActive && hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: 'transform 0.2s ease, opacity 0.7s ease, translate 0.7s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(cat.route)}
    >
      <div className={`relative overflow-hidden rounded-2xl border h-full flex flex-col transition-all duration-300 ${
        isDark
          ? 'bg-[#111111] border-white/[0.07] hover:border-[#FF4B20]/40'
          : 'bg-white border-black/[0.07] hover:border-[#FF4B20]/40'
      } ${hovered ? 'shadow-xl shadow-[#FF4B20]/15' : ''}`}>

        {/* Product Image Area */}
        <div className="relative overflow-hidden h-52 sm:h-56">
          <img
            src={cat.image}
            alt={cat.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Cyber Flame glow on hover */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-[#A90D16]/30 to-[#FF4B20]/20 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="rounded-full bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-2.5 py-0.5 text-[9px] font-black text-white tracking-widest">
              {cat.badge}
            </span>
            {cat.isInteractive && (
              <span className="rounded-full bg-black/60 backdrop-blur-md border border-[#FF4B20]/40 px-2.5 py-0.5 text-[9px] font-bold text-[#FF4B20] tracking-wider flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                LIVE 3D
              </span>
            )}
          </div>

          {/* Item Count */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white">
            {cat.itemCount} Products
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className={`text-[9px] font-bold tracking-[0.35em] mb-1 text-[#FF4B20]`}>
            {cat.highlight}
          </div>
          <h3 className={`font-black text-lg tracking-tight mb-2 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            {cat.title}
          </h3>
          <p className={`text-xs leading-relaxed flex-1 ${isDark ? 'text-[#C7C1BB]/80' : 'text-[#6b6660]'}`}>
            {cat.description}
          </p>

          {/* Feature Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cat.features?.slice(0, 3).map((f) => (
              <span
                key={f}
                className={`text-[9px] px-2 py-0.5 rounded border font-medium ${
                  isDark ? 'border-white/10 text-[#C7C1BB] bg-white/[0.03]' : 'border-black/10 text-[#6b6660] bg-black/[0.03]'
                }`}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            {cat.isInteractive ? (
              <button
                className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-3 text-xs font-bold text-white shadow-lg shadow-[#FF4B20]/20 hover:shadow-[#FF4B20]/40 hover:brightness-110 transition-all"
                onClick={(e) => { e.stopPropagation(); navigate(cat.route) }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="tracking-wider">ENTER 3D EXPERIENCE</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold tracking-wider transition-all hover:border-[#FF4B20] hover:text-[#FF4B20] ${
                  isDark ? 'border-white/10 text-[#C7C1BB] hover:bg-[#FF4B20]/8' : 'border-black/10 text-[#6b6660] hover:bg-[#FF4B20]/5'
                }`}
                onClick={(e) => { e.stopPropagation(); navigate(cat.route) }}
              >
                EXPLORE
                <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedCollections() {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="collections"
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 ${isDark ? 'bg-[#090909]' : 'bg-[#f7f5f2]'}`}
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-[#A90D16]/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FF4B20]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div
          className={`mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">
              Curated Selection
            </span>
          </div>
          <h2 className={`font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            FEATURED<br />
            <span className="bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
              COLLECTIONS
            </span>
          </h2>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
            Six categories of precision instruments. Click Smartphones to enter the living 3D engineering showcase — the centrepiece of the CØR experience.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

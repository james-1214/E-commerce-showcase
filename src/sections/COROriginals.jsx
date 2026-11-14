import React, { useRef, useState, useEffect } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { COR_ORIGINALS } from '../data/corData'

function OriginalCard({ item, index }) {
  const { isDark } = useTheme()
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border flex flex-col transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isDark ? 'bg-[#111111] border-white/[0.07] hover:border-[#FF4B20]/40' : 'bg-white border-black/[0.07] hover:border-[#FF4B20]/40'}
      hover:shadow-2xl hover:shadow-[#FF4B20]/15`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image with strong overlay */}
      <div className="relative overflow-hidden h-64">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-50 group-hover:saturate-100"
          loading="lazy"
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/40 to-transparent" />
        {/* Cyber flame glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A90D16]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Concept Code Chip */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] font-black px-2 py-1 rounded bg-gradient-to-r from-[#A90D16] to-[#FF4B20] text-white tracking-widest">
            ⬟ CØR ORIGINAL
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`text-[9px] font-bold px-2 py-1 rounded backdrop-blur-md border border-white/15 text-white/80`}>
            {item.code}
          </span>
        </div>

        {/* Title over image */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-[9px] font-bold tracking-[0.3em] text-[#FF4B20] mb-1">{item.subtitle}</div>
          <h3 className="font-black text-xl text-white tracking-tight leading-tight">{item.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B20] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4B20]" />
          </span>
          <span className="text-[10px] font-bold text-[#FF4B20] tracking-wider">{item.status}</span>
        </div>

        <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-[#C7C1BB]/80' : 'text-[#6b6660]'}`}>
          {item.overview}
        </p>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {item.specs.map((spec, i) => (
            <div key={i} className={`rounded-lg p-2 border text-[11px] ${isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.02]'}`}>
              <div className="text-[9px] text-[#C7C1BB]/60 uppercase tracking-wider">{spec.label}</div>
              <div className={`font-semibold mt-0.5 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Materials */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.materials.map((m) => (
            <span key={m} className={`text-[9px] px-2 py-0.5 rounded-full border ${isDark ? 'border-[#FF4B20]/25 text-[#FF4B20] bg-[#FF4B20]/8' : 'border-[#A90D16]/25 text-[#A90D16] bg-[#A90D16]/5'}`}>
              {m}
            </span>
          ))}
        </div>

        {/* Reserve CTA */}
        <button className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-[#FF4B20]/30 bg-[#FF4B20]/8 py-2.5 text-xs font-bold tracking-wider text-[#FF4B20] hover:bg-gradient-to-r hover:from-[#A90D16] hover:to-[#FF4B20] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF4B20]/25 transition-all">
          <Sparkles className="h-3.5 w-3.5" />
          RESERVE CONCEPT ACCESS
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default function COROriginals() {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.08 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="originals"
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 ${isDark ? 'bg-[#090909]' : 'bg-[#f7f5f2]'}`}
    >
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-radial-[ellipse_80%_50%_at_50%_80%] from-[#A90D16]/7 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        {/* Header */}
        <div className={`mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">
              Concept Laboratory
            </span>
          </div>
          <h2 className={`font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            BEYOND<br />
            <span className="bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
              WHAT EXISTS.
            </span>
          </h2>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
            CØR Originals are exploratory concept instruments that exist beyond the boundary of what manufacturers are willing to attempt. Each one is a statement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {COR_ORIGINALS.map((item, i) => (
            <OriginalCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

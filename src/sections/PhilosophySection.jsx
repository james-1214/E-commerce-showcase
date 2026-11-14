import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { PHILOSOPHY } from '../data/corData'

export default function PhilosophySection() {
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
      id="about"
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f0ede9]'}`}
    >
      {/* Background with Cyber Flame pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF4B20]/20 to-transparent" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#A90D16]/8 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-[#FF4B20]/8 blur-3xl" />
        {/* Diagonal accent line */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, ${isDark ? '#FF4B20' : '#A90D16'} 0px, ${isDark ? '#FF4B20' : '#A90D16'} 1px, transparent 1px, transparent 60px)`
        }} />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Manifesto */}
          <div className={`transition-all duration-900 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">
                Brand Philosophy
              </span>
            </div>

            <h2 className={`font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-tight mb-6 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
              {PHILOSOPHY.heading}
            </h2>

            {/* Pull Quote */}
            <div className="relative pl-5 border-l-2 border-[#FF4B20] mb-8">
              <p className={`text-sm italic leading-relaxed ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
                "{PHILOSOPHY.quote}"
              </p>
            </div>

            {/* Metric Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PHILOSOPHY.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`rounded-xl border p-4 text-center transition-all duration-600 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  } ${isDark ? 'border-white/[0.07] bg-white/[0.02]' : 'border-black/[0.07] bg-black/[0.02]'}`}
                  style={{ transitionDelay: `${i * 100 + 400}ms` }}
                >
                  <div className="font-black text-lg bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
                    {m.value}
                  </div>
                  <div className={`text-[9px] mt-1 uppercase tracking-widest font-medium ${isDark ? 'text-[#C7C1BB]/60' : 'text-[#6b6660]/60'}`}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 4 Pillars */}
          <div className={`space-y-4 transition-all duration-900 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {PHILOSOPHY.pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className={`group flex gap-4 rounded-xl border p-5 transition-all duration-500 cursor-default ${
                  isDark
                    ? 'border-white/[0.07] bg-white/[0.02] hover:border-[#FF4B20]/30 hover:bg-[#FF4B20]/5'
                    : 'border-black/[0.07] bg-black/[0.02] hover:border-[#FF4B20]/30 hover:bg-[#FF4B20]/3'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {/* Number */}
                <div className="shrink-0 font-black text-3xl bg-gradient-to-b from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent opacity-50 group-hover:opacity-100 transition-opacity leading-none mt-0.5">
                  {pillar.number}
                </div>

                <div>
                  <h4 className={`font-black text-xs tracking-widest mb-1.5 group-hover:text-[#FF4B20] transition-colors ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
                    {pillar.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#C7C1BB]/70' : 'text-[#6b6660]'}`}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

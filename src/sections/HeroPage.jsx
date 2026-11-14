import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Sparkles, Zap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAnimation } from '../context/AnimationContext'
import ParticleField from '../components/ParticleField'
import HeroSculpture3D from '../components/3d/HeroSculpture3D'
import { TextFlippingBoard } from '../components/ui/text-flipping-board.tsx'

const FLIPPING_WORDS = [
  'INNOVATION.',
  'PRECISION.',
  'TITANIUM.',
  'THE FUTURE.',
  'CØR.',
  'ENGINEERING.',
]

function AnimatedWord() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const { isAnimationActive } = useAnimation()
  const active = isAnimationActive('flipBoard')

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % FLIPPING_WORDS.length)
        setVisible(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [active])

  return (
    <span
      className={`inline-block bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
      }`}
    >
      {FLIPPING_WORDS[index]}
    </span>
  )
}

export default function HeroPage() {
  const { isDark } = useTheme()
  const { isAnimationActive } = useAnimation()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 100)
  }, [])

  const scrollToCollections = () => {
    const el = document.getElementById('collections')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center ${
        isDark
          ? 'bg-[#090909]'
          : 'bg-[#f7f5f2]'
      }`}
    >
      {/* Background Gradient Layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary radial glow */}
        <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_30%] from-[#A90D16]/12 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-radial-[ellipse_60%_60%_at_80%_20%] from-[#FF4B20]/8 to-transparent" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#C7C1BB' : '#090909'} 1px, transparent 1px), linear-gradient(to right, ${isDark ? '#C7C1BB' : '#090909'} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating Embers */}
      <ParticleField />

      {/* Grid Layout: Text + 3D */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-24">

        {/* Left: Editorial Text Block */}
        <div
          className={`flex flex-col transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">
              Luxury Technology Showroom
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`font-black leading-[1.04] tracking-tight text-5xl sm:text-6xl xl:text-7xl ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            THE FUTURE IS<br />
            NOT JUST<br />
            TECHNOLOGY.<br />
            <span className="block mt-1 text-4xl sm:text-5xl xl:text-6xl">
              IT'S <AnimatedWord />
            </span>
          </h1>

          {/* Supporting text */}
          <p className={`mt-7 text-sm sm:text-base leading-relaxed max-w-md ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
            Discover a new dimension of premium technology. Explore innovation, design and engineering through immersive product experiences crafted at <span className="text-[#FF4B20] font-semibold">0.01mm tolerance</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={scrollToCollections}
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-[#FF4B20]/25 hover:shadow-[#FF4B20]/45 hover:brightness-110 transition-all duration-300"
            >
              <Sparkles className="h-4 w-4" />
              <span className="tracking-wider">EXPLORE COLLECTION</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate('/collections')}
              className={`flex items-center gap-2 rounded-xl border px-7 py-3.5 text-xs font-bold tracking-wider transition-all duration-300 hover:border-[#FF4B20] hover:text-[#FF4B20] ${
                isDark
                  ? 'border-white/15 text-[#C7C1BB] hover:bg-[#FF4B20]/8'
                  : 'border-black/15 text-[#6b6660] hover:bg-[#FF4B20]/5'
              }`}
            >
              <Zap className="h-4 w-4" />
              DISCOVER CØR
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-10 flex items-center gap-6 sm:gap-8">
            {[
              { value: '0.01mm', label: 'Tolerance' },
              { value: 'Grade 5', label: 'Titanium' },
              { value: '360°', label: '3D Inspection' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-black text-lg sm:text-xl bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${isDark ? 'text-[#C7C1BB]/70' : 'text-[#6b6660]/70'}`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Metallic Sculpture */}
        <div
          className={`relative h-[420px] sm:h-[520px] lg:h-[600px] transition-all duration-1200 delay-300 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <HeroSculpture3D />

          {/* Floating Label Cards */}
          <div className="absolute left-0 top-1/4 -translate-x-2 hidden xl:block">
            <div className={`rounded-xl border p-3 text-[11px] backdrop-blur-md shadow-xl ${
              isDark ? 'bg-[#111]/80 border-white/10 text-[#F4F0EB]' : 'bg-white/80 border-black/10 text-[#090909]'
            }`}>
              <div className="text-[9px] text-[#FF4B20] font-bold uppercase tracking-widest">MATERIAL</div>
              <div className="font-bold mt-0.5">Grade 5 Titanium</div>
            </div>
          </div>

          <div className="absolute right-0 bottom-1/3 translate-x-2 hidden xl:block">
            <div className={`rounded-xl border p-3 text-[11px] backdrop-blur-md shadow-xl ${
              isDark ? 'bg-[#111]/80 border-white/10 text-[#F4F0EB]' : 'bg-white/80 border-black/10 text-[#090909]'
            }`}>
              <div className="text-[9px] text-[#FF4B20] font-bold uppercase tracking-widest">TOLERANCE</div>
              <div className="font-bold mt-0.5">0.01mm CNC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 animate-bounce">
        <span className={`text-[9px] font-bold tracking-[0.3em] ${isDark ? 'text-[#C7C1BB]/50' : 'text-[#6b6660]/50'}`}>
          SCROLL
        </span>
        <ChevronDown className={`h-4 w-4 ${isDark ? 'text-[#C7C1BB]/40' : 'text-[#6b6660]/40'}`} />
      </div>
    </section>
  )
}

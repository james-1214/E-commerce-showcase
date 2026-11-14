import React, { useEffect } from 'react'
import { X, Sliders, RotateCcw, Sparkles, Box, Flame, Eye, Type, Compass, Check } from 'lucide-react'
import { useAnimation } from '../../context/AnimationContext'
import { useTheme } from '../../context/ThemeContext'

export default function AnimationControlModal() {
  const {
    master,
    settings,
    systemReducedMotion,
    toggleMaster,
    toggleSetting,
    resetToDefaults,
    isModalOpen,
    closeModal,
  } = useAnimation()
  const { isDark } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, closeModal])

  if (!isModalOpen) return null

  const toggles = [
    {
      key: 'mesh3D',
      title: '3D Mesh & Sculpture Motion',
      desc: 'Real-time floating and rotation of 3D metallic artifacts and turntable meshes.',
      icon: Box,
    },
    {
      key: 'particles',
      title: 'Cyber Flame Floating Embers',
      desc: 'Ambient canvas particles and cursor-reactive ember physics.',
      icon: Flame,
    },
    {
      key: 'tilt',
      title: '3D Card Perspective Tilt',
      desc: 'Interactive gyro-style card tilting based on mouse coordinate vectors.',
      icon: Compass,
    },
    {
      key: 'chromatic',
      title: 'Chromatic Aberration Shaders',
      desc: 'Subtle RGB color split displacement on product imagery hover.',
      icon: Eye,
    },
    {
      key: 'flipBoard',
      title: 'Mechanical Flipping Board',
      desc: 'Split-flap kinetic letterboard cycling through engineering concepts.',
      icon: Type,
    },
    {
      key: 'scrollReveals',
      title: 'Scroll-Triggered Reveals',
      desc: 'Smooth staged reveals and opacity transitions as elements enter viewport.',
      icon: Sparkles,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-xl rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-[#111111]/95 border-white/10 text-[#F4F0EB]'
            : 'bg-white/95 border-black/10 text-[#090909]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#A90D16] to-[#FF4B20] text-white shadow-lg shadow-[#FF4B20]/25">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">ANIMATION DIRECTIVES</h2>
              <p className="text-xs text-[#C7C1BB]/80">Configure real-time rendering & visual dynamics</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* System Reduced Motion Status */}
        {systemReducedMotion && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>OS reduced-motion preference detected. Non-essential motion throttled automatically.</span>
          </div>
        )}

        {/* Master Toggle */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#A90D16]/20 to-[#FF4B20]/20 border border-[#FF4B20]/30 p-4">
          <div>
            <div className="font-display text-sm font-bold tracking-wider uppercase text-[#FF4B20]">
              Master Animation Engine
            </div>
            <div className="text-xs text-[#C7C1BB]">
              {master ? 'All optional visual dynamics are active' : 'All optional animations globally suspended'}
            </div>
          </div>
          <button
            onClick={toggleMaster}
            className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              master ? 'bg-gradient-to-r from-[#A90D16] to-[#FF4B20]' : 'bg-neutral-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                master ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Sub Toggles */}
        <div className="mt-5 space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {toggles.map((item) => {
            const Icon = item.icon
            const isOn = master && settings[item.key]
            return (
              <div
                key={item.key}
                className={`flex items-start justify-between rounded-xl border p-3.5 transition-all ${
                  isDark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'
                } ${!master ? 'opacity-40 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FF4B20]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-display text-xs font-semibold tracking-wide">{item.title}</div>
                    <div className="text-[11px] text-[#C7C1BB]/80 leading-snug">{item.desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(item.key)}
                  disabled={!master}
                  className={`relative ml-4 inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isOn ? 'bg-[#FF4B20]' : 'bg-neutral-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isOn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 text-xs text-[#C7C1BB] hover:text-[#FF4B20] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={closeModal}
            className="rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-[#FF4B20]/25 hover:brightness-110 transition-all"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Sun, Moon } from 'lucide-react'
import GalaxyUniverse from '../scenes/GalaxyUniverse'
import LoadingScreen from '../components/LoadingScreen'
import useDevicePerformance from '../hooks/useDevicePerformance'
import { playSound } from '../utils/audio'
import { useTheme } from '../context/ThemeContext'

export default function GalaxyExperiencePage() {
  const perf = useDevicePerformance()
  const { theme, toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={`galaxy-experience relative min-h-screen ${isDark ? 'bg-[#030511]' : 'bg-[#eaeff5]'}`}>
      {/* Loading Screen from Galaxy Universe */}
      <LoadingScreen />

      {/* Back to COR Bar — floating top left, doesn't interfere with Galaxy controls */}
      <div
        className="fixed top-4 left-4 z-50 flex items-center gap-2"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={() => {
            playSound('select')
            navigate('/')
          }}
          className="group flex items-center gap-2 rounded-xl border border-white/15 bg-black/60 backdrop-blur-xl px-3 py-2 text-xs font-bold text-white hover:border-[#FF4B20] hover:bg-[#FF4B20]/15 hover:text-[#FF4B20] transition-all shadow-xl"
          title="Back to CØR Homepage"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline tracking-widest">BACK TO CØR</span>
        </button>

        <button
          onClick={() => {
            playSound('select')
            toggleTheme()
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/60 backdrop-blur-xl text-white hover:border-[#FF4B20] hover:text-[#FF4B20] transition-all"
          title="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* The existing Galaxy Universe experience, fully intact */}
      <main>
        <GalaxyUniverse
          perf={perf}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </main>
    </div>
  )
}

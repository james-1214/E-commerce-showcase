import React, { createContext, useContext, useState, useEffect } from 'react'

const AnimationContext = createContext({
  master: true,
  settings: {
    mesh3D: true,
    particles: true,
    tilt: true,
    chromatic: true,
    flipBoard: true,
    scrollReveals: true,
  },
  toggleMaster: () => {},
  toggleSetting: () => {},
  resetToDefaults: () => {},
  isAnimationActive: () => true,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

const DEFAULT_SETTINGS = {
  mesh3D: true,
  particles: true,
  tilt: true,
  chromatic: true,
  flipBoard: true,
  scrollReveals: true,
}

export function AnimationProvider({ children }) {
  // Check system prefers-reduced-motion
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [master, setMaster] = useState(() => {
    try {
      const saved = localStorage.getItem('cor-anim-master')
      if (saved !== null) return JSON.parse(saved)
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false
      }
      return true
    } catch (e) {
      return true
    }
  })

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('cor-anim-settings')
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      return DEFAULT_SETTINGS
    } catch (e) {
      return DEFAULT_SETTINGS
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setSystemReducedMotion(mediaQuery.matches)

    const handler = (e) => {
      setSystemReducedMotion(e.matches)
      if (e.matches) {
        setMaster(false)
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cor-anim-master', JSON.stringify(master))
      localStorage.setItem('cor-anim-settings', JSON.stringify(settings))
    } catch (e) {}

    // Apply class to body for global CSS animations
    if (!master) {
      document.body.classList.add('reduce-animations')
    } else {
      document.body.classList.remove('reduce-animations')
    }
  }, [master, settings])

  const toggleMaster = () => {
    setMaster((prev) => !prev)
  }

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const resetToDefaults = () => {
    setMaster(!systemReducedMotion)
    setSettings(DEFAULT_SETTINGS)
  }

  const isAnimationActive = (key) => {
    if (!master) return false
    if (!key) return master
    return Boolean(settings[key])
  }

  return (
    <AnimationContext.Provider
      value={{
        master,
        settings,
        systemReducedMotion,
        toggleMaster,
        toggleSetting,
        resetToDefaults,
        isAnimationActive,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}

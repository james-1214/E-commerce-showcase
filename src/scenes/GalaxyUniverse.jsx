import React, { useRef, useState, useCallback } from 'react'
import PhoneScene from './PhoneScene'
import HeroSection from '../sections/HeroSection'
import HolographicPanel from '../components/HolographicPanel'
import ComponentDock from '../components/ComponentDock'
import ErrorBoundary from '../components/ErrorBoundary'
import useScrollProgress from '../hooks/useScrollProgress'
import useInView from '../hooks/useInView'
import { STAGES } from '../animations/phoneTimeline'
import { playSound } from '../utils/audio'

export default function GalaxyUniverse({ perf, theme = 'light', onToggleTheme }) {
  const track = useRef()
  const heroCopy = useRef()
  const stick = useRef()
  const controlsRef = useRef()
  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState(null)
  const [autoRotate, setAutoRotate] = useState(false)
  const vis = useInView(track, '0px')

  const scrollP = useScrollProgress(track, (p) => {
    let i = 0
    STAGES.forEach((s, k) => {
      if (p >= s[0]) i = k
    })
    setStage(i)

    if (heroCopy.current) {
      const o = Math.max(0, 1 - p * 16)
      heroCopy.current.style.opacity = o
      heroCopy.current.style.pointerEvents = o < 0.15 ? 'none' : 'auto'
    }
  })

  const close = useCallback(() => setSelected(null), [])
  const st = STAGES[stage] || STAGES[0]

  // View presets
  const handleSetView = (view) => {
    playSound('select')
    setAutoRotate(false)
    const ctrl = controlsRef.current
    if (!ctrl) return

    const dist = 3.8
    if (view === 'front') {
      ctrl.object.position.set(0, 0, dist)
    } else if (view === 'back') {
      ctrl.object.position.set(0, 0, -dist)
    } else if (view === 'side') {
      ctrl.object.position.set(dist, 0, 0)
    } else if (view === 'top') {
      ctrl.object.position.set(0, dist, 0.5)
    }
    ctrl.target.set(0, 0, 0)
    ctrl.update()
  }

  const toggleAutoRotate = () => {
    playSound('select')
    setAutoRotate((prev) => !prev)
  }

  return (
    <section id="top" className="track" ref={track}>
      <div className="stick" ref={stick}>
        <ErrorBoundary>
          <PhoneScene
            scrollP={scrollP}
            selected={selected}
            onSelect={setSelected}
            perf={perf}
            active={vis}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            controlsRef={controlsRef}
            theme={theme}
          />
        </ErrorBoundary>

        {/* Hero title & intro (fades as user scrolls) */}
        <HeroSection
          innerRef={heroCopy}
          onExplore={() => setSelected('display')}
          onAutoRotate={toggleAutoRotate}
          isAutoRotating={autoRotate}
        />

        {/* 360° Orbit & View Presets Controller Widget */}
        <div className="orbit-controls-bar">
          <button
            className={`orbit-btn ${autoRotate ? 'is-active' : ''}`}
            onClick={toggleAutoRotate}
            title="Toggle continuous 360° spin"
          >
            <span className="orbit-icon">⟳</span>
            <span>{autoRotate ? 'SPINNING 360°' : '360° SPIN'}</span>
          </button>

          <div className="orbit-presets">
            <button
              className="preset-btn"
              onClick={() => handleSetView('front')}
              title="View front display"
            >
              FRONT
            </button>
            <button
              className="preset-btn"
              onClick={() => handleSetView('back')}
              title="View rear quad camera"
            >
              BACK
            </button>
            <button
              className="preset-btn"
              onClick={() => handleSetView('side')}
              title="View titanium side rail"
            >
              SIDE
            </button>
          </div>

          <span className="orbit-hint">DRAG TO ROTATE 360°</span>
        </div>

        {/* Exploded Timeline Stage Caption */}
        {!selected && stage > 0 && (
          <div id="explode" className="caption">
            <span className="label">{st[1]}</span>
            <b>{st[2]}</b>
            <span className="caption-sub">CLICK ON ANY PART TO ISOLATE & INSPECT DETAILS</span>
          </div>
        )}

        {/* Solo Inspection Mode HUD Indicator */}
        {selected && (
          <div className="solo-hud-banner">
            <span className="solo-pulse" />
            <span>SOLO COMPONENT INSPECTION — 360° ORBIT & ZOOM ACTIVE</span>
          </div>
        )}

        {/* Quick Component Dock at the bottom */}
        <ComponentDock selected={selected} onSelect={setSelected} stage={stage} />

        {/* Detailed High-Tech Holographic Specification Panel */}
        <HolographicPanel
          id={selected}
          onClose={close}
          onSelect={setSelected}
          onAutoRotate={toggleAutoRotate}
          isAutoRotating={autoRotate}
          onSetView={handleSetView}
        />
      </div>
    </section>
  )
}

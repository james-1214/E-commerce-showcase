import React from 'react'
import ScrollIndicator from '../components/ScrollIndicator'
import { playSound } from '../utils/audio'

export default function HeroSection({
  innerRef,
  onExplore,
  onAutoRotate,
  isAutoRotating,
}) {
  const handleScrollToExplode = (e) => {
    e.preventDefault()
    playSound('select')
    window.scrollTo({
      top: window.innerHeight * 1.2,
      behavior: 'smooth',
    })
  }

  return (
    <div className="hero-copy" ref={innerRef}>
      <div className="hero-badge">
        <span className="hero-dot" />
        <span>SAMSUNG GALAXY S26 ULTRA • 360° 3D SHOWCASE</span>
      </div>
      <span className="label">TITANIUM AURORA EDITION</span>
      <h1>
        GALAXY<br />
        UNIVERSE
      </h1>
      <p>DRAG ANYWHERE TO ROTATE IN 360°. SCROLL TO DECONSTRUCT.</p>

      <div className="hero-cta-group">
        <a className="btn hero-btn" href="#explode" onClick={handleScrollToExplode}>
          EXPLORE EXPLODED VIEW
        </a>
        <button
          type="button"
          className={`btn hero-btn-secondary ${isAutoRotating ? 'is-active' : ''}`}
          onClick={onAutoRotate}
        >
          {isAutoRotating ? 'PAUSE SPIN' : '⟳ 360° AUTO-SPIN'}
        </button>
      </div>

      <ScrollIndicator />
    </div>
  )
}

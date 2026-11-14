import React from 'react'
import { playSound } from '../utils/audio'

export default function Navbar({ theme = 'light', onToggleTheme }) {
  const scrollTo = (topPos) => {
    playSound('select')
    window.scrollTo({ top: topPos, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <a
        href="#top"
        className="logo"
        onClick={(e) => {
          e.preventDefault()
          scrollTo(0)
        }}
      >
        GALAXY<span>UNIVERSE</span>
      </a>

      <div className="nav-actions">
        <div className="nav-links">
          <a
            href="#explode"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(window.innerHeight * 1.5)
            }}
          >
            EXPLODED VIEW
          </a>
          <a
            href="#specs"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(window.innerHeight * 3.5)
            }}
          >
            DISSECT
          </a>
        </div>

        {/* Theme Mode Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          <span className="theme-toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="theme-toggle-text">{theme === 'light' ? 'DARK' : 'LIGHT'}</span>
        </button>
      </div>
    </nav>
  )
}

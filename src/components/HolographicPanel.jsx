import React, { useEffect, useState } from 'react'
import { SPECS_DATA, NOTE } from '../data/specs'
import { playSound } from '../utils/audio'

const COMPONENT_KEYS = ['display', 'camera', 'processor', 'cooling', 'battery', 'frame', 'rearGlass']

export default function HolographicPanel({
  id,
  onClose,
  onSelect,
  onAutoRotate,
  isAutoRotating,
  onSetView,
}) {
  const [activeTab, setActiveTab] = useState('specs') // 'specs' | 'features' | 'materials'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playSound('close')
        onClose()
      } else if (e.key === 'ArrowRight' && onSelect && id) {
        const curIdx = COMPONENT_KEYS.indexOf(id)
        if (curIdx !== -1) {
          const next = COMPONENT_KEYS[(curIdx + 1) % COMPONENT_KEYS.length]
          playSound('select')
          onSelect(next)
        }
      } else if (e.key === 'ArrowLeft' && onSelect && id) {
        const curIdx = COMPONENT_KEYS.indexOf(id)
        if (curIdx !== -1) {
          const prev = COMPONENT_KEYS[(curIdx - 1 + COMPONENT_KEYS.length) % COMPONENT_KEYS.length]
          playSound('select')
          onSelect(prev)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [id, onClose, onSelect])

  useEffect(() => {
    setActiveTab('specs')
  }, [id])

  if (!id) return null
  const d = SPECS_DATA[id] || SPECS_DATA.display

  const currentIndex = COMPONENT_KEYS.indexOf(id)
  const prevId = COMPONENT_KEYS[(currentIndex - 1 + COMPONENT_KEYS.length) % COMPONENT_KEYS.length]
  const nextId = COMPONENT_KEYS[(currentIndex + 1) % COMPONENT_KEYS.length]

  const handleClose = () => {
    playSound('close')
    onClose()
  }

  const handleNavigate = (targetId) => {
    playSound('select')
    onSelect(targetId)
  }

  return (
    <aside className="panel detail-panel" role="dialog" aria-label={d.name}>
      {/* 1. Header with Tags, 360 Spin Toggle, and Close Button */}
      <div className="panel-header">
        <div className="panel-tags">
          <span className="part-tag" style={{ borderColor: d.accentColor, color: d.accentColor }}>
            {d.partNumber}
          </span>
          <span className="category-tag">{d.category}</span>
        </div>

        <div className="panel-header-actions">
          {onAutoRotate && (
            <button
              className={`panel-spin-btn ${isAutoRotating ? 'is-active' : ''}`}
              onClick={onAutoRotate}
              title="Toggle 360° auto-rotation"
            >
              <span className="orbit-icon">⟳</span>
              <span>360°</span>
            </button>
          )}
          <button
            className="panel-close-btn"
            onClick={handleClose}
            aria-label="Close component detail"
            title="Restore exploded view (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. Component Title & Subtitle */}
      <div className="panel-title-group">
        <h2 className="component-title" style={{ textShadow: `0 0 20px ${d.accentColor}44` }}>
          {d.name}
        </h2>
        <p className="component-subtitle">{d.subtitle}</p>

        {/* 360 View Presets Row inside panel */}
        {onSetView && (
          <div className="panel-view-presets">
            <span className="view-label">VIEW ANGLE:</span>
            <button className="view-pill" onClick={() => onSetView('front')}>
              FRONT
            </button>
            <button className="view-pill" onClick={() => onSetView('back')}>
              BACK
            </button>
            <button className="view-pill" onClick={() => onSetView('side')}>
              SIDE
            </button>
            <button className="view-pill" onClick={() => onSetView('top')}>
              TOP
            </button>
          </div>
        )}
      </div>

      {/* 3. Navigation Tabs */}
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
          onClick={() => {
            playSound('hover')
            setActiveTab('specs')
          }}
        >
          SPECS
        </button>
        <button
          className={`tab-btn ${activeTab === 'features' ? 'is-active' : ''}`}
          onClick={() => {
            playSound('hover')
            setActiveTab('features')
          }}
        >
          INNOVATIONS
        </button>
        <button
          className={`tab-btn ${activeTab === 'materials' ? 'is-active' : ''}`}
          onClick={() => {
            playSound('hover')
            setActiveTab('materials')
          }}
        >
          MATERIALS
        </button>
      </div>

      {/* 4. Scrollable Content Area */}
      <div className="panel-content-scroll">
        {activeTab === 'specs' && (
          <div className="tab-pane">
            <p className="component-overview">{d.overview}</p>

            {/* Key Metrics Grid */}
            <div className="metrics-grid">
              {d.metrics.map((m, i) => (
                <div key={i} className="metric-card">
                  <span className="metric-label">{m.label}</span>
                  <strong className="metric-value">{m.value}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-pane">
            <div className="features-list">
              {d.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-bullet" style={{ background: d.accentColor }} />
                  <div>
                    <h4 className="feature-title">{f.title}</h4>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="tab-pane">
            <div className="materials-box">
              <span className="label">MATERIAL COMPOSITION & FINISH</span>
              <p className="materials-text">{d.materials}</p>
            </div>
            <div className="inspection-tip">
              <span className="tip-icon">⟳</span>
              <p>Drag anywhere on the 3D screen to orbit and inspect this isolated component in 360 degrees.</p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Sticky Footer with Cycle Navigation & Restore Button */}
      <div className="panel-footer">
        <div className="cycle-buttons">
          <button
            className="cycle-btn"
            onClick={() => handleNavigate(prevId)}
            title="Inspect previous component"
          >
            ← PREV
          </button>
          <span className="component-counter">
            {currentIndex + 1} / {COMPONENT_KEYS.length}
          </span>
          <button
            className="cycle-btn"
            onClick={() => handleNavigate(nextId)}
            title="Inspect next component"
          >
            NEXT →
          </button>
        </div>

        <button className="btn reset-btn" onClick={handleClose}>
          RESTORE EXPLODED VIEW
        </button>
      </div>

      <small className="panel-note">{NOTE}</small>
    </aside>
  )
}

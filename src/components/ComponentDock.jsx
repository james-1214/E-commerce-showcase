import React from 'react'
import { SPECS_DATA } from '../data/specs'
import { playSound } from '../utils/audio'

const DOCK_ITEMS = [
  { id: 'display', label: 'Display', icon: '◻' },
  { id: 'camera', label: 'Camera', icon: '◎' },
  { id: 'processor', label: 'SoC Core', icon: '⬡' },
  { id: 'cooling', label: 'Cooling', icon: '❄' },
  { id: 'battery', label: 'Battery', icon: '⚡' },
  { id: 'frame', label: 'Chassis', icon: '▣' },
  { id: 'rearGlass', label: 'Back Glass', icon: '◫' },
]

export default function ComponentDock({ selected, onSelect, stage }) {
  // Always visible when a component is popped up (selected !== null) or when scrolled into exploded view (stage >= 1)
  const isVisible = Boolean(selected) || stage >= 1

  return (
    <div
      className={`component-dock ${isVisible ? 'is-visible' : ''} ${
        selected ? 'is-solo-mode' : ''
      }`}
    >
      <span className="dock-hint">
        {selected ? 'SWITCH COMPONENT:' : 'CLICK TO ISOLATE & INSPECT:'}
      </span>
      <div className="dock-pill-group">
        {DOCK_ITEMS.map((item) => {
          const isCurrent = selected === item.id
          const spec = SPECS_DATA[item.id]

          return (
            <button
              key={item.id}
              className={`dock-btn ${isCurrent ? 'is-active' : ''}`}
              style={{
                borderColor: isCurrent ? spec?.accentColor || '#00f2fe' : undefined,
                boxShadow: isCurrent
                  ? `0 0 18px ${spec?.accentColor || '#00f2fe'}88`
                  : undefined,
              }}
              onClick={() => {
                if (isCurrent) {
                  playSound('close')
                  onSelect(null)
                } else {
                  playSound('select')
                  onSelect(item.id)
                }
              }}
              onMouseEnter={() => playSound('hover')}
              title={`Isolate ${spec?.name || item.label}`}
            >
              <span className="dock-icon">{item.icon}</span>
              <span className="dock-text">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

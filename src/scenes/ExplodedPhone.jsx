import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { getTextures } from './textures'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { explode, sm } from '../animations/phoneTimeline'
import { LAYOUT } from '../animations/assemblyTimeline'
import { playSound } from '../utils/audio'

const rrShape = (w, h, r) => {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, 1.5 * Math.PI)
  return s
}

const slab = (w, h, r, d, b = 0.006, hole) => {
  const sh = rrShape(w, h, r)
  if (hole) sh.holes.push(rrShape(...hole))
  const g = new THREE.ExtrudeGeometry(sh, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 4,
    curveSegments: 24,
  })
  g.translate(0, 0, -d / 2)
  return g
}

const face = (w, h, r) => {
  const g = new THREE.ShapeGeometry(rrShape(w, h, r), 24)
  const P = g.attributes.position
  const U = g.attributes.uv
  for (let i = 0; i < P.count; i++) {
    U.setXY(i, (P.getX(i) + w / 2) / w, (P.getY(i) + h / 2) / h)
  }
  return g
}

// Titanium material preset with high-end brushed metallic response
const TI = {
  color: '#8da4be',
  metalness: 0.96,
  roughness: 0.22,
  envMapIntensity: 2.0,
}

const TI_DARK = {
  color: '#384656',
  metalness: 0.92,
  roughness: 0.32,
  envMapIntensity: 1.4,
}

function Part({
  id,
  hot,
  hotPos = [0, 0, 0],
  size = [0.8, 1.6, 0.1],
  sel,
  reg,
  prog,
  onPick,
  label,
  children,
}) {
  const L = LAYOUT[id] || { pos: [0, 0, 0], ex: [0, 0, 0], r: [0, 1] }
  const pos = L.pos || [0, 0, 0]
  const g = useRef()
  const [hovered, setHovered] = useState(false)

  const isSelected = sel === hot || (sel && sel === id)
  const isSoloActive = Boolean(sel)

  useFrame((_, dt) => {
    if (!g.current) return
    const factor = 1 - Math.exp(-dt * 5)

    // Calculate normal exploded offset based on scroll progress
    const e = explode(prog.current, L.r[0], L.r[1])
    const normalX = pos[0] + L.ex[0] * e
    const normalY = pos[1] + L.ex[1] * e
    const normalZ = pos[2] + L.ex[2] * e

    if (!isSoloActive) {
      // Assembled or normally exploded: return to full scale and normal position
      g.current.visible = true
      g.current.position.x += (normalX - g.current.position.x) * factor
      g.current.position.y += (normalY - g.current.position.y) * factor
      g.current.position.z += (normalZ - g.current.position.z) * factor

      g.current.scale.x += (1.0 - g.current.scale.x) * factor
      g.current.scale.y += (1.0 - g.current.scale.y) * factor
      g.current.scale.z += (1.0 - g.current.scale.z) * factor

      g.current.rotation.y += (0 - g.current.rotation.y) * factor
    } else if (isSelected) {
      // SOLO ISOLATED COMPONENT: Popped right at screen center [0, 0, 0] with magnification
      g.current.visible = true
      g.current.position.x += (0 - g.current.position.x) * factor
      g.current.position.y += (0 - g.current.position.y) * factor
      g.current.position.z += (0 - g.current.position.z) * factor

      const targetScale = 1.3
      g.current.scale.x += (targetScale - g.current.scale.x) * factor
      g.current.scale.y += (targetScale - g.current.scale.y) * factor
      g.current.scale.z += (targetScale - g.current.scale.z) * factor

      // Gentle turntable rotation in solo inspection mode
      g.current.rotation.y += dt * 0.25
    } else {
      // NON-SELECTED PARTS: Smoothly vanish so ONLY the clicked component is visible
      g.current.scale.x += (0 - g.current.scale.x) * (factor * 1.6)
      g.current.scale.y += (0 - g.current.scale.y) * (factor * 1.6)
      g.current.scale.z += (0 - g.current.scale.z) * (factor * 1.6)

      if (g.current.scale.x < 0.03) {
        g.current.visible = false
      }
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    const targetId = hot || id
    playSound('select')
    onPick(targetId)
  }

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    playSound('hover')
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }

  return (
    <group
      ref={(n) => {
        g.current = n
        if (n && hot) reg.current[hot] = n
        else if (n) reg.current[id] = n
      }}
      position={pos}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}

      {/* Hover outline highlight */}
      {hovered && !isSoloActive && prog.current > 0.04 && (
        <mesh position={hotPos}>
          <boxGeometry args={[size[0] * 1.05, size[1] * 1.05, Math.max(0.04, size[2] * 1.1)]} />
          <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.7} />
        </mesh>
      )}

      {/* Floating 3D interactive badge in exploded mode */}
      {hot && !isSoloActive && prog.current > 0.1 && prog.current < 0.82 && (
        <Html position={hotPos} center zIndexRange={[30, 0]}>
          <div
            className={`hotspot-pill ${hovered ? 'is-hovered' : ''}`}
            onClick={handleClick}
            title={`Inspect ${label}`}
          >
            <span className="hotspot-pulse" />
            <span className="hotspot-label">{label}</span>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function ExplodedPhone({ prog, sel, reg, onPick }) {
  const root = useRef()
  const p = { prog, sel, reg, onPick }
  const T = useMemo(getTextures, [])

  const G = useMemo(
    () => ({
      frame: slab(0.82, 1.64, 0.1, 0.084, 0.007, [0.76, 1.58, 0.08]),
      glass: slab(0.78, 1.6, 0.092, 0.01, 0.002),
      panel: slab(0.75, 1.57, 0.085, 0.008, 0.002),
      screen: face(0.73, 1.55, 0.08),
    }),
    []
  )

  useEffect(() => () => Object.values(G).forEach((g) => g.dispose()), [G])

  useFrame((_, dt) => {
    if (!root.current) return
    const factor = 1 - Math.exp(-dt * 4)

    // UPRIGHT ORIENTATION ALWAYS (rotation.z = 0)
    // At start (prog = 0): perfectly upright front presentation (original phone image look)
    // As user scrolls into exploded view: smooth 3D tilt for layer visibility
    const isExploding = prog.current > 0.04
    const tiltProgress = sm(0.04, 0.28, prog.current) - sm(0.84, 0.98, prog.current)

    const targetRotX = sel ? 0 : 0.16 * tiltProgress
    const targetRotY = sel ? 0 : -0.06 + -0.32 * tiltProgress
    const targetRotZ = 0 // Stays upright! Never flipped 90 degrees sideways

    root.current.rotation.x += (targetRotX - root.current.rotation.x) * factor
    root.current.rotation.y += (targetRotY - root.current.rotation.y) * factor
    root.current.rotation.z += (targetRotZ - root.current.rotation.z) * factor

    // Subtle scale response
    const s = sel ? 1.05 : 1.0 - 0.1 * tiltProgress
    root.current.scale.setScalar(s)
  })

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* 1. TITANIUM ARMOR CHASSIS (Flush perimeter rail) */}
      <Part
        id="frame"
        hot="frame"
        hotPos={[0, 0.86, 0]}
        size={[0.88, 1.7, 0.09]}
        label="Titanium Chassis"
        {...p}
      >
        {/* Main Titanium Frame Rail */}
        <mesh geometry={G.frame}>
          <meshStandardMaterial {...TI} />
        </mesh>

        {/* Precision Antenna Band Inserts (Dark Polycarbonate inlays) */}
        {[
          [0.42, 0.62, 0],
          [-0.42, 0.62, 0],
          [0.42, -0.62, 0],
          [-0.42, -0.62, 0],
        ].map(([x, y, z], i) => (
          <mesh key={'ant' + i} position={[x, y, z]}>
            <boxGeometry args={[0.022, 0.016, 0.086]} />
            <meshStandardMaterial color="#1a222c" roughness={0.7} />
          </mesh>
        ))}

        {/* Right Rail: Volume Rocker & Power Button */}
        <mesh position={[0.424, 0.35, 0]}>
          <boxGeometry args={[0.016, 0.26, 0.036]} />
          <meshStandardMaterial {...TI} />
        </mesh>
        <mesh position={[0.424, 0.02, 0]}>
          <boxGeometry args={[0.016, 0.14, 0.036]} />
          <meshStandardMaterial {...TI} />
        </mesh>

        {/* Bottom Rail: USB-C Port, Stereo Speaker Grille, S-Pen Silo */}
        <mesh position={[0, -0.832, 0]}>
          <boxGeometry args={[0.15, 0.014, 0.038]} />
          <meshStandardMaterial color="#060910" roughness={0.8} />
        </mesh>
        {/* USB-C Interior Gold Pin Connector */}
        <mesh position={[0, -0.83, 0]}>
          <boxGeometry args={[0.07, 0.003, 0.008]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Bottom Stereo Speaker Ports */}
        {[-0.26, -0.22, -0.18, -0.14, -0.1, -0.06].map((x, i) => (
          <mesh key={'spk' + i} position={[x, -0.832, 0]}>
            <boxGeometry args={[0.022, 0.014, 0.024]} />
            <meshStandardMaterial color="#05070a" />
          </mesh>
        ))}

        {/* S-Pen Port Opening */}
        <mesh position={[0.3, -0.832, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.018, 16]} />
          <meshStandardMaterial color="#080c14" roughness={0.6} />
        </mesh>
      </Part>

      {/* 2. CORNING GORILLA GLASS ARMOR (Crystal-clear front protective shield) */}
      <Part id="frontGlass" hot="display" label="Gorilla Glass Armor" {...p}>
        <mesh geometry={G.glass} position={[0, 0, 0.043]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.14}
            roughness={0.03}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            transmission={0.96}
            ior={1.52}
          />
        </mesh>
      </Part>

      {/* 3. DYNAMIC AMOLED 2X DISPLAY PANEL (Edge-to-edge original phone screen) */}
      <Part
        id="display"
        hot="display"
        hotPos={[0.15, -0.1, 0.04]}
        size={[0.76, 1.58, 0.03]}
        label="AMOLED Display"
        {...p}
      >
        {/* Ultra-thin black bezel substrate */}
        <mesh position={[0, 0, 0.037]} geometry={G.panel}>
          <meshStandardMaterial color="#050810" roughness={0.3} />
        </mesh>

        {/* Active Emissive AMOLED Screen with Ultra-Realistic Lock Screen */}
        <mesh position={[0, 0, 0.041]}>
          <primitive object={G.screen} attach="geometry" />
          <meshBasicMaterial map={T.screen} toneMapped={false} />
        </mesh>

        {/* Front Punch-Hole Infinity-O Selfie Camera Lens */}
        <group position={[0, 0.725, 0.0415]}>
          <mesh>
            <circleGeometry args={[0.016, 24]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[0.016, 0.019, 24]} />
            <meshStandardMaterial {...TI_DARK} />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <circleGeometry args={[0.009, 16]} />
            <meshPhysicalMaterial
              color="#00f2fe"
              roughness={0.05}
              clearcoat={1}
              metalness={0.4}
              iridescence={1}
              iridescenceIOR={1.6}
            />
          </mesh>
        </group>
      </Part>

      {/* 4. 3D HYPER VAPOR CHAMBER COOLING MATRIX (Encased inside phone) */}
      <Part
        id="cooling"
        hot="cooling"
        hotPos={[0.26, 0.22, 0]}
        size={[0.62, 0.62, 0.02]}
        label="Vapor Chamber"
        {...p}
      >
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.007]} />
          <meshStandardMaterial
            map={T.vaporChamber}
            color="#e07a36"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>
      </Part>

      {/* 5. SNAPDRAGON 8 GEN 5 MOTHERBOARD (Encased inside phone) */}
      <Part
        id="board"
        hot="processor"
        hotPos={[0, -0.28, 0]}
        size={[0.72, 0.88, 0.03]}
        label="Processor SoC"
        {...p}
      >
        <mesh>
          <boxGeometry args={[0.72, 0.88, 0.01]} />
          <meshStandardMaterial map={T.pcb} roughness={0.38} metalness={0.45} />
        </mesh>

        {/* Metal Shield Cans */}
        {[
          [-0.22, 0.3, 0.15, 0.12],
          [0.22, 0.28, 0.13, 0.15],
          [0.24, -0.05, 0.11, 0.11],
          [-0.25, 0.05, 0.11, 0.18],
          [0, -0.34, 0.28, 0.09],
        ].map(([x, y, w, h], i) => (
          <mesh key={'shield' + i} position={[x, y, 0.01]}>
            <boxGeometry args={[w, h, 0.01]} />
            <meshStandardMaterial color="#1a2230" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}

        {/* Central Snapdragon 8 Gen 5 Core with Glowing Accent */}
        <mesh position={[0, 0.06, 0.013]}>
          <boxGeometry args={[0.26, 0.26, 0.014]} />
          <meshStandardMaterial
            color="#121824"
            emissive="#00f2fe"
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </Part>

      {/* Ribbon Flex Interconnects */}
      <Part id="flex" hot="processor" label="Flex Interconnects" {...p}>
        <Flex />
      </Part>

      {/* 6. 5,500 MAH HIGH-DENSITY BATTERY PACK (Encased in lower chassis) */}
      <Part
        id="battery"
        hot="battery"
        hotPos={[0, 0.0, 0]}
        size={[0.68, 0.68, 0.04]}
        label="5,500mAh Battery"
        {...p}
      >
        <mesh>
          <boxGeometry args={[0.66, 0.66, 0.03]} />
          <meshStandardMaterial map={T.battery} roughness={0.45} metalness={0.3} />
        </mesh>
        {/* Battery Terminal Lead */}
        <mesh position={[0.18, 0.34, 0.008]}>
          <boxGeometry args={[0.12, 0.035, 0.008]} />
          <meshStandardMaterial color="#c09838" metalness={0.9} roughness={0.3} />
        </mesh>
      </Part>

      {/* 7. SATIN FROSTED REAR GLASS (Original phone back cover) */}
      <Part
        id="rearGlass"
        hot="rearGlass"
        hotPos={[0, -0.4, -0.06]}
        size={[0.8, 1.62, 0.04]}
        label="Back Satin Glass"
        {...p}
      >
        <mesh geometry={G.glass} position={[0, 0, -0.043]}>
          <meshPhysicalMaterial
            map={T.backCover}
            color="#ffffff"
            metalness={0.5}
            roughness={0.18}
            clearcoat={0.95}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </Part>

      {/* 8. QUAD CAMERA SYSTEM WITH PROTRUDING LENS RINGS */}
      <Part
        id="camera"
        hot="camera"
        hotPos={[0, 0, -0.1]}
        size={[0.36, 0.72, 0.14]}
        label="Quad Camera Matrix"
        {...p}
      >
        {/* Internal camera module base */}
        <mesh position={[-0.04, 0, 0.0]}>
          <boxGeometry args={[0.34, 0.68, 0.02]} />
          <meshStandardMaterial color="#0c121d" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* 12MP Ultra-Wide Lens (Top) */}
        <ProLens y={0.22} size={0.072} label="12MP" prog={prog} texture={T.lensCoating} />

        {/* 200MP Main Wide Lens (Middle) */}
        <ProLens
          y={0.02}
          size={0.085}
          isMain={true}
          label="200MP"
          prog={prog}
          texture={T.lensCoating}
        />

        {/* 50MP 5x Folded Periscope Telephoto Lens (Bottom) */}
        <PeriscopeLens y={-0.18} prog={prog} />

        {/* Right Column: Laser AutoFocus Window */}
        <mesh position={[0.075, 0.22, -0.026]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.028, 0.007, 12, 24]} />
          <meshStandardMaterial {...TI} />
        </mesh>
        <mesh position={[0.075, 0.22, -0.028]}>
          <circleGeometry args={[0.022, 20]} />
          <meshBasicMaterial color="#300508" />
        </mesh>

        {/* Dual LED Flash */}
        <mesh position={[0.075, 0.08, -0.026]}>
          <circleGeometry args={[0.022, 20]} />
          <meshStandardMaterial
            color="#fff8e7"
            emissive="#ffe299"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* 10MP 3x Portrait Telephoto Lens */}
        <ProLens y={-0.06} x={0.075} size={0.048} prog={prog} texture={T.lensCoating} />
      </Part>
    </group>
  )
}

// Pro Camera Lens with Multi-Coated Optical Glass
function ProLens({ y, x = -0.06, size = 0.068, isMain = false, prog, texture }) {
  const g = useRef()
  useFrame(() => {
    if (!g.current) return
    // Lenses sit naturally protruding by -0.024 when assembled; explode out when scrolled
    g.current.position.z = -0.024 - 0.38 * explode(prog.current, 0.44, 0.58)
  })

  return (
    <group ref={g} position={[x, y, -0.024]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Outer Titanium Grooved Bezel Ring */}
      <mesh>
        <torusGeometry args={[size, 0.014, 16, 36]} />
        <meshStandardMaterial {...TI} />
      </mesh>

      {/* Inner Lens Barrel Cylinder */}
      <mesh>
        <cylinderGeometry args={[size * 0.9, size * 0.9, 0.034, 32]} />
        <meshPhysicalMaterial color="#05080f" metalness={0.4} roughness={0.08} clearcoat={1} />
      </mesh>

      {/* Optical Glass Convex Element with Iridescent Multi-Coating */}
      <mesh position={[0, -0.016, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[size * 0.78, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#00f2fe"
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          iridescence={1}
          iridescenceIOR={1.65}
          envMapIntensity={3.0}
          transmission={0.4}
        />
      </mesh>

      {/* Internal Gold Aperture Ring for Main 200MP Lens */}
      {isMain && (
        <mesh position={[0, -0.022, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 0.32, size * 0.48, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.25} />
        </mesh>
      )}
    </group>
  )
}

// 50MP 5x Folded Periscope Telephoto Lens with Rectangular Prism
function PeriscopeLens({ y, prog }) {
  const g = useRef()
  useFrame(() => {
    if (!g.current) return
    g.current.position.z = -0.024 - 0.38 * explode(prog.current, 0.44, 0.58)
  })

  return (
    <group ref={g} position={[-0.06, y, -0.024]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Outer Titanium Ring */}
      <mesh>
        <torusGeometry args={[0.075, 0.014, 16, 36]} />
        <meshStandardMaterial {...TI} />
      </mesh>

      {/* Inner Dark Housing */}
      <mesh>
        <cylinderGeometry args={[0.068, 0.068, 0.034, 32]} />
        <meshPhysicalMaterial color="#05080f" metalness={0.4} roughness={0.08} clearcoat={1} />
      </mesh>

      {/* Rectangular Periscope Prism Aperture Cutout */}
      <mesh position={[0, -0.014, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.07, 0.05]} />
        <meshPhysicalMaterial
          color="#06183a"
          roughness={0.02}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.8}
        />
      </mesh>

      {/* 45-degree Angled Internal Glass Prism Mirror */}
      <mesh position={[0, -0.024, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <planeGeometry args={[0.065, 0.045]} />
        <meshStandardMaterial color="#4aa3ff" metalness={0.95} roughness={0.05} />
      </mesh>
    </group>
  )
}

function Flex() {
  const geo = useMemo(() => {
    const c = new THREE.CatmullRomCurve3(
      [
        [0.2, 0.15, 0],
        [0.2, -0.05, 0],
        [-0.15, -0.15, 0],
        [-0.15, -0.35, 0],
        [0.15, -0.45, 0],
        [0.2, -0.66, 0],
      ].map((v) => new THREE.Vector3(...v))
    )
    return new THREE.TubeGeometry(c, 60, 0.03, 6, false)
  }, [])

  return (
    <group scale={[1, 1, 0.1]}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color="#d9762b"
          emissive="#ff5a2a"
          emissiveIntensity={0.35}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      {[[0.2, 0.15], [0.2, -0.66]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[0.1, 0.05, 0.1]} />
          <meshStandardMaterial
            color="#8fb2ff"
            metalness={0.8}
            roughness={0.3}
            emissive="#00f2fe"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

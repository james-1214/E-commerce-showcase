import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useAnimation } from '../../context/AnimationContext'
import { useTheme } from '../../context/ThemeContext'

function ArtifactMesh({ active }) {
  const groupRef = useRef()
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (active) {
      // Gentle constant rotation
      groupRef.current.rotation.y += delta * 0.25
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12

      if (coreRef.current) {
        coreRef.current.rotation.y -= delta * 0.5
        coreRef.current.rotation.z += delta * 0.3
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06
        coreRef.current.scale.set(scale, scale, scale)
      }

      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += delta * 0.4
        ring1Ref.current.rotation.y += delta * 0.3
      }

      if (ring2Ref.current) {
        ring2Ref.current.rotation.z += delta * 0.35
        ring2Ref.current.rotation.y -= delta * 0.2
      }
    }

    // Interactive mouse follow
    const pointer = state.pointer
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pointer.x * 0.4, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, pointer.y * 0.3, 0.05)
  })

  // Geometries and materials
  const cageGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 0), [])
  const coreGeometry = useMemo(() => new THREE.OctahedronGeometry(0.85, 0), [])

  return (
    <group ref={groupRef}>
      {/* Outer Titanium Faceted Exoskeleton */}
      <mesh geometry={cageGeometry}>
        <meshPhysicalMaterial
          color="#18181c"
          metalness={0.94}
          roughness={0.16}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          wireframe={true}
        />
      </mesh>

      <mesh geometry={cageGeometry} scale={0.98}>
        <meshPhysicalMaterial
          color="#111114"
          metalness={0.88}
          roughness={0.3}
          transparent={true}
          opacity={0.65}
          reflectivity={0.9}
        />
      </mesh>

      {/* Glowing Cyber Flame Inner Core */}
      <mesh ref={coreRef} geometry={coreGeometry}>
        <meshStandardMaterial
          color="#FF4B20"
          emissive="#A90D16"
          emissiveIntensity={3.2}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Precision Orbital Rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#FF4B20"
            emissive="#FF4B20"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#C7C1BB"
            emissive="#A90D16"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroSculpture3D() {
  const { isAnimationActive } = useAnimation()
  const { isDark } = useTheme()
  const active = isAnimationActive('mesh3D')

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.8} />

        {/* Cyber Flame Rim & Key Lights */}
        <pointLight position={[4, 3, 3]} intensity={4.5} color="#FF4B20" distance={12} />
        <pointLight position={[-4, -2, -2]} intensity={3.8} color="#A90D16" distance={12} />
        <pointLight position={[0, 4, -3]} intensity={2.2} color="#C7C1BB" distance={10} />
        <directionalLight position={[0, -5, 2]} intensity={1.5} color="#FF7A45" />

        <Float speed={active ? 1.5 : 0} rotationIntensity={active ? 0.4 : 0} floatIntensity={active ? 0.6 : 0}>
          <ArtifactMesh active={active} />
        </Float>
      </Canvas>

      {/* Cyber Flame Glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#A90D16]/25 to-[#FF4B20]/25 blur-3xl" />
    </div>
  )
}

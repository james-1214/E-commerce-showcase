import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import ExplodedPhone from './ExplodedPhone'
import { FOCUS_PROGRESS } from '../animations/phoneTimeline'
import { HOME, getCameraPosition } from '../animations/cameraTimeline'

function Rig({
  scrollP,
  selected,
  prog,
  autoRotate,
  setAutoRotate,
  controlsRef,
}) {
  const { camera, size } = useThree()
  const ctrl = useRef()
  const isDragging = useRef(false)
  const lastScroll = useRef(0)
  const portrait = size.width / size.height < 0.88

  useEffect(() => {
    camera.position.set(...HOME(portrait))
    if (ctrl.current) {
      ctrl.current.target.set(0, 0, 0)
      ctrl.current.update()
      ctrl.current.domElement.style.touchAction = 'pan-y'
      if (controlsRef) controlsRef.current = ctrl.current
    }
  }, [portrait])

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 5)
    const c = ctrl.current
    if (!c) return

    const targetProg = selected ? FOCUS_PROGRESS : scrollP.current
    prog.current += (targetProg - prog.current) * k

    if (selected) {
      const targetAim = portrait ? [0, 0.28, 0] : [-0.5, 0, 0]
      c.target.lerp(new THREE.Vector3(...targetAim), k)
    } else {
      const targetAim = portrait ? [0, 0.1, 0] : [0, 0, 0]
      c.target.lerp(new THREE.Vector3(...targetAim), k)

      const scrollMoved = Math.abs(scrollP.current - lastScroll.current) > 0.0005
      lastScroll.current = scrollP.current

      if (!isDragging.current && !autoRotate) {
        const targetCamPos = getCameraPosition(prog.current, portrait)
        camera.position.lerp(new THREE.Vector3(...targetCamPos), scrollMoved ? k * 0.8 : k * 0.2)
      }
    }

    c.update()
  })

  return (
    <OrbitControls
      ref={ctrl}
      makeDefault
      enableRotate={true}
      enableZoom={Boolean(selected)}
      maxDistance={7.5}
      minDistance={1.4}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.08}
      autoRotate={autoRotate}
      autoRotateSpeed={1.8}
      minPolarAngle={0.05}
      maxPolarAngle={Math.PI - 0.05}
      onStart={() => {
        isDragging.current = true
        if (autoRotate && setAutoRotate) setAutoRotate(false)
      }}
      onEnd={() => {
        isDragging.current = false
      }}
    />
  )
}

export default function PhoneScene({
  scrollP,
  selected,
  onSelect,
  perf,
  active,
  autoRotate = false,
  setAutoRotate,
  controlsRef,
  theme = 'light',
}) {
  const prog = useRef(0)
  const reg = useRef({})
  const isLight = theme === 'light'

  const bgColor = isLight ? '#eaeff5' : '#030511'
  const fogColor = isLight ? '#eaeff5' : '#030511'

  return (
    <Canvas
      frameloop="always"
      dpr={perf.dpr}
      camera={{ fov: 38, position: [0, 0, 4.0] }}
      gl={{ antialias: !perf.mobile, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Studio Background & Fog */}
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 5, isLight ? 14.5 : 13.5]} />

      {/* Balanced Studio Ambience */}
      <ambientLight intensity={isLight ? 0.95 : 0.55} />

      {/* Primary Key Light */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={isLight ? 2.6 : 2.0}
        color="#ffffff"
      />

      {/* Specular Accent Light */}
      <pointLight
        position={[2.5, 2.2, 2.5]}
        intensity={perf.mobile ? 14 : isLight ? 22 : 26}
        color={isLight ? '#0284c7' : '#00f2fe'}
        distance={10}
      />

      {/* Fill Light */}
      <pointLight
        position={[-3, -1.5, -2]}
        intensity={perf.mobile ? 10 : isLight ? 16 : 20}
        color={isLight ? '#6366f1' : '#d946ef'}
        distance={10}
      />

      {/* Rim Light */}
      <pointLight
        position={[0, -2.5, 2]}
        intensity={perf.mobile ? 6 : 12}
        color={isLight ? '#38bdf8' : '#f43f5e'}
        distance={8}
      />

      {/* Spotlight on Solo Isolated Component */}
      {selected && (
        <spotLight
          position={[-0.5, 2.6, 2.6]}
          target-position={[-0.5, 0, 0]}
          intensity={isLight ? 35 : 30}
          angle={0.65}
          penumbra={0.8}
          color="#ffffff"
        />
      )}

      <Suspense fallback={null}>
        {/* Studio Reflection Environment */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={isLight ? 3.0 : 3.6}
            color={isLight ? '#ffffff' : '#00f2fe'}
            position={[0, 4, 3]}
            scale={[10, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={isLight ? 2.2 : 2.8}
            color={isLight ? '#e0f2fe' : '#a855f7'}
            position={[-4, 0, 1]}
            scale={[2, 8, 1]}
          />
          <Lightformer
            form="rect"
            intensity={isLight ? 2.0 : 2.4}
            color={isLight ? '#f1f5f9' : '#f472b6'}
            position={[4, 1, -2]}
            scale={[3, 7, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.8}
            color="#ffffff"
            position={[0, -3, 2]}
            scale={[5, 5, 1]}
          />
        </Environment>

        <ExplodedPhone prog={prog} sel={selected} reg={reg} onPick={onSelect} />

        {/* Ambient Sparkles */}
        <Sparkles
          count={perf.particles}
          scale={[8, 6, 6]}
          size={2.4}
          speed={perf.reduced ? 0 : 0.35}
          color={isLight ? '#0284c7' : '#00f2fe'}
          opacity={isLight ? 0.4 : 0.75}
        />

        {/* High-tech reflective ground grid */}
        <gridHelper
          args={[30, 60, isLight ? '#94a3b8' : '#6366f1', isLight ? '#cbd5e1' : '#1e1b4b']}
          position={[0, -1.8, 0]}
        />

        {/* Vertical Holographic Guides */}
        {[[-3.6, 0.8], [3.8, 1.2]].map(([x, y], i) => (
          <mesh key={'s' + i} position={[x, y, -4]}>
            <boxGeometry args={[0.06, 2.8, 0.04]} />
            <meshBasicMaterial
              color={isLight ? '#0284c7' : i ? '#ec4899' : '#00f2fe'}
              transparent
              opacity={isLight ? 0.3 : 0.45}
            />
          </mesh>
        ))}

        {/* Holographic light shafts */}
        {[-2.5, 2.4].map((x, i) => (
          <mesh key={i} position={[x, 0, -2.6]} rotation={[0, 0, i ? 0.35 : -0.35]}>
            <planeGeometry args={[0.4, 10]} />
            <meshBasicMaterial
              color={isLight ? '#38bdf8' : i ? '#a855f7' : '#00f2fe'}
              transparent
              opacity={isLight ? 0.05 : 0.09}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </Suspense>

      <Rig
        scrollP={scrollP}
        selected={selected}
        prog={prog}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        controlsRef={controlsRef}
      />
    </Canvas>
  )
}

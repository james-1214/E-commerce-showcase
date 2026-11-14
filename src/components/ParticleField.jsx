import React, { useEffect, useRef } from 'react'
import { useAnimation } from '../context/AnimationContext'
import { useTheme } from '../context/ThemeContext'

export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null)
  const { isAnimationActive } = useAnimation()
  const { isDark } = useTheme()
  const active = isAnimationActive('particles')

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate embers
    const particleCount = Math.min(50, Math.floor((width * height) / 25000))
    const particles = []

    const colors = isDark
      ? ['#FF4B20', '#A90D16', '#FF7A45', '#C7C1BB']
      : ['#FF4B20', '#A90D16', '#66050B', '#8E8881']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      })
    }

    let mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.y += p.speedY
        p.x += p.speedX
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005

        // Interaction with mouse
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.x += (dx / dist) * force * 1.5
          p.y += (dy / dist) * force * 1.5
        }

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha))
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [active, isDark])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-1000 ${className}`}
    />
  )
}

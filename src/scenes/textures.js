import * as THREE from 'three'

// High-resolution procedural textures with hyper-attractive cosmic aurora gradients
const mk = (w, h, draw) => {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  draw(ctx, w, h)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

let cache = null

export function getTextures() {
  if (cache) return cache

  // 1. ULTRA-ATTRACTIVE COSMIC AURORA AMOLED DISPLAY (1024x2048)
  const screen = mk(1024, 2048, (ctx, w, h) => {
    // Pure OLED deep black base
    ctx.fillStyle = '#020308'
    ctx.fillRect(0, 0, w, h)

    // Flowing Cosmic Aurora Nebula (Wave 1: Electric Cyan & Deep Sapphire)
    const g1 = ctx.createRadialGradient(w * 0.35, h * 0.38, 80, w * 0.45, h * 0.42, w * 0.95)
    g1.addColorStop(0, 'rgba(0, 242, 254, 0.98)')
    g1.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)')
    g1.addColorStop(0.45, 'rgba(99, 102, 241, 0.85)')
    g1.addColorStop(0.7, 'rgba(168, 85, 247, 0.65)')
    g1.addColorStop(0.9, 'rgba(236, 72, 153, 0.3)')
    g1.addColorStop(1, 'rgba(2, 3, 8, 0)')
    ctx.fillStyle = g1
    ctx.fillRect(0, 0, w, h)

    // Flowing Wave 2: Vivid Hot Magenta, Sunset Amber & Solar Gold
    const g2 = ctx.createRadialGradient(w * 0.7, h * 0.68, 60, w * 0.6, h * 0.65, w * 0.85)
    g2.addColorStop(0, 'rgba(255, 42, 133, 0.88)')
    g2.addColorStop(0.28, 'rgba(217, 70, 239, 0.75)')
    g2.addColorStop(0.55, 'rgba(245, 158, 11, 0.65)')
    g2.addColorStop(0.8, 'rgba(0, 242, 254, 0.3)')
    g2.addColorStop(1, 'rgba(2, 3, 8, 0)')
    ctx.fillStyle = g2
    ctx.fillRect(0, 0, w, h)

    // Fluid S-Curve Chromatic Ribbon for depth
    ctx.save()
    ctx.filter = 'blur(35px)'
    ctx.beginPath()
    ctx.moveTo(w * 0.1, h * 0.25)
    ctx.bezierCurveTo(w * 0.8, h * 0.35, w * 0.2, h * 0.75, w * 0.9, h * 0.85)
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.45)'
    ctx.lineWidth = 140
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(w * 0.2, h * 0.28)
    ctx.bezierCurveTo(w * 0.85, h * 0.4, w * 0.25, h * 0.7, w * 0.8, h * 0.88)
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)'
    ctx.lineWidth = 100
    ctx.stroke()
    ctx.restore()

    // Iridescent stardust luminescent sparkles
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 220; i++) {
      const sx = (Math.sin(i * 123.45) * 0.5 + 0.5) * w
      const sy = (Math.cos(i * 87.65) * 0.5 + 0.5) * h
      const sr = (i % 4 === 0 ? 2.4 : 1.2) * 0.8
      const alpha = (i % 3 === 0 ? 0.9 : 0.55)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(sx, sy, sr, 0, Math.PI * 2)
      ctx.fill()
    }

    // Top Status Bar (Ultra-clean OLED)
    ctx.fillStyle = '#ffffff'
    ctx.font = '600 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.fillText('12:45', 70, 95)

    // 5G & Battery Status Indicators
    ctx.font = '500 24px -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.fillText('5G  100%', w - 245, 93)

    // Glowing Battery Icon
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.lineWidth = 3
    ctx.strokeRect(w - 95, 73, 44, 24)
    const battGlow = ctx.createLinearGradient(w - 92, 0, w - 54, 0)
    battGlow.addColorStop(0, '#00f2fe')
    battGlow.addColorStop(1, '#a855f7')
    ctx.fillStyle = battGlow
    ctx.fillRect(w - 92, 76, 38, 18)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(w - 51, 80, 4, 10)

    // Center Clock Widget with Subtle Chromatic Drop Glow
    ctx.textAlign = 'center'
    ctx.font = '200 168px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0, 242, 254, 0.75)'
    ctx.shadowBlur = 35
    ctx.fillText('12:45', w / 2, 480)
    ctx.shadowColor = 'rgba(217, 70, 239, 0.6)'
    ctx.shadowBlur = 45
    ctx.fillText('12:45', w / 2, 480)
    ctx.shadowBlur = 0

    // Date & Weather Widget
    ctx.font = '400 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = 'rgba(240, 248, 255, 0.95)'
    ctx.fillText('Sat, November 14   •   24°C Cosmic Aurora', w / 2, 565)

    // Ultrasonic Fingerprint Scanner Icon (Neon Aurora Cyan-Magenta)
    ctx.lineWidth = 4
    for (let r = 24; r <= 72; r += 14) {
      const ringGrad = ctx.createLinearGradient(w / 2 - r, 1480, w / 2 + r, 1480)
      ringGrad.addColorStop(0, '#00f2fe')
      ringGrad.addColorStop(1, '#ec4899')
      ctx.strokeStyle = ringGrad
      ctx.beginPath()
      ctx.arc(w / 2, 1480, r, 0.2 * Math.PI, 1.8 * Math.PI)
      ctx.stroke()
    }
    ctx.fillStyle = '#00f2fe'
    ctx.beginPath()
    ctx.arc(w / 2, 1480, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.font = '300 28px sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)'
    ctx.fillText('Swipe to unlock', w / 2, 1820)

    // Lockscreen Shortcut circles (with glass gradient glow)
    const btnGlow1 = ctx.createLinearGradient(60, 1830, 160, 1930)
    btnGlow1.addColorStop(0, 'rgba(0, 242, 254, 0.25)')
    btnGlow1.addColorStop(1, 'rgba(168, 85, 247, 0.25)')
    ctx.fillStyle = btnGlow1
    ctx.beginPath()
    ctx.arc(110, 1880, 56, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.45)'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = btnGlow1
    ctx.beginPath()
    ctx.arc(w - 110, 1880, 56, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)'
    ctx.stroke()

    // Home indicator pill (glowing gradient)
    const homeGrad = ctx.createLinearGradient(w / 2 - 120, 0, w / 2 + 120, 0)
    homeGrad.addColorStop(0, '#00f2fe')
    homeGrad.addColorStop(0.5, '#ffffff')
    homeGrad.addColorStop(1, '#ec4899')
    ctx.fillStyle = homeGrad
    roundRect(ctx, w / 2 - 120, 1990, 240, 8, 4)

    // Punch hole selfie camera
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(w / 2, 88, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)'
    ctx.lineWidth = 2
    ctx.stroke()
  })

  // 2. EYE-CATCHING TITANIUM AURORA FROSTED BACK GLASS (1024x2048)
  const backCover = mk(1024, 2048, (ctx, w, h) => {
    // Rich multidimensional satin gradient: Deep Midnight Cobalt -> Ethereal Violet -> Mystic Aurora Magenta -> Titanium Sheen
    const bg = ctx.createLinearGradient(0, 0, w, h)
    bg.addColorStop(0, '#151e3f')
    bg.addColorStop(0.25, '#202a5c')
    bg.addColorStop(0.55, '#3b1d5a')
    bg.addColorStop(0.82, '#50206b')
    bg.addColorStop(1, '#253556')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // Soft celestial aurora highlights across diagonal
    const aura = ctx.createRadialGradient(w * 0.35, h * 0.4, 80, w * 0.5, h * 0.5, w * 0.9)
    aura.addColorStop(0, 'rgba(0, 242, 254, 0.18)')
    aura.addColorStop(0.4, 'rgba(168, 85, 247, 0.22)')
    aura.addColorStop(0.75, 'rgba(236, 72, 153, 0.15)')
    aura.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = aura
    ctx.fillRect(0, 0, w, h)

    // Delicate frosted micro-texture noise
    ctx.fillStyle = 'rgba(255, 255, 255, 0.045)'
    for (let i = 0; i < 5000; i++) {
      const rx = Math.random() * w
      const ry = Math.random() * h
      ctx.fillRect(rx, ry, 2, 2)
    }

    // Laser Inlaid Mirrored "SAMSUNG" Logo with Radiant Specular Glow
    ctx.textAlign = 'center'
    ctx.font = '700 54px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.letterSpacing = '14px'
    ctx.shadowColor = 'rgba(0, 242, 254, 0.8)'
    ctx.shadowBlur = 18
    ctx.fillStyle = '#ffffff'
    ctx.fillText('SAMSUNG', w / 2, 1720)
    ctx.shadowBlur = 0

    // Micro regulatory & model text
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = 'rgba(215, 230, 255, 0.65)'
    ctx.letterSpacing = '2px'
    ctx.fillText('GALAXY S26 ULTRA  •  TITANIUM AURORA EDITION', w / 2, 1790)
    ctx.fillText('DESIGNED BY SAMSUNG  •  MADE IN KOREA  •  IP68', w / 2, 1825)
  })

  // 3. REALISTIC MOTHERBOARD / PCB (1024x1024)
  const pcb = mk(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#0a0d18'
    ctx.fillRect(0, 0, w, h)

    // Gold & Cyan ENIG circuit traces
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)'
    ctx.lineWidth = 2
    for (let i = 0; i < 150; i++) {
      let x = (Math.sin(i * 13) * 0.5 + 0.5) * w
      let y = (Math.cos(i * 29) * 0.5 + 0.5) * h
      ctx.beginPath()
      ctx.moveTo(x, y)
      for (let s = 0; s < 4; s++) {
        if (s % 2 === 0) x += ((i * s) % 7 - 3) * 28
        else y += ((i + s) % 7 - 3) * 28
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Gold test points
    ctx.fillStyle = '#f3cf58'
    for (let i = 0; i < 280; i++) {
      const vx = (Math.sin(i * 77) * 0.5 + 0.5) * w
      const vy = (Math.cos(i * 47) * 0.5 + 0.5) * h
      ctx.beginPath()
      ctx.arc(vx, vy, 3.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Main Processor SoC Metal Shield
    const cw = 420
    const ch = 420
    const cx = (w - cw) / 2
    const cy = 260
    ctx.fillStyle = '#182030'
    roundRect(ctx, cx, cy, cw, ch, 16)
    ctx.strokeStyle = '#00f2fe'
    ctx.lineWidth = 3
    ctx.strokeRect(cx + 8, cy + 8, cw - 16, ch - 16)

    // Laser Etching on SoC
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 28px -apple-system, sans-serif'
    ctx.fillText('SNAPDRAGON 8 GEN 5', w / 2, cy + 130)

    ctx.font = '600 20px -apple-system, sans-serif'
    ctx.fillStyle = '#00f2fe'
    ctx.fillText('FOR GALAXY  •  3NM N3P', w / 2, cy + 175)

    ctx.font = '500 18px monospace'
    ctx.fillStyle = 'rgba(215, 230, 255, 0.85)'
    ctx.fillText('HEXAGON NPU 98 TOPS', w / 2, cy + 230)
    ctx.fillText('QUALCOMM ADRENO 840', w / 2, cy + 265)
    ctx.fillText('16GB LPDDR5X + 1TB UFS 4.1', w / 2, cy + 300)

    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.arc(cx + 30, cy + 30, 10, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#263345'
    for (let i = 0; i < 24; i++) {
      const bx = 80 + (i % 6) * 150
      const by = cy + ch + 40 + Math.floor(i / 6) * 50
      roundRect(ctx, bx, by, 70, 32, 4)
      ctx.fillStyle = '#c0d0e4'
      ctx.fillRect(bx, by, 8, 32)
      ctx.fillRect(bx + 62, by, 8, 32)
      ctx.fillStyle = '#263345'
    }
  })

  // 4. REALISTIC BATTERY POUCH (1024x1024)
  const battery = mk(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#0f1420'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)'
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1)
    }

    ctx.textAlign = 'left'
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 38px -apple-system, sans-serif'
    ctx.fillText('SAMSUNG SDI', 70, 130)

    ctx.font = '500 24px -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(200, 220, 245, 0.85)'
    ctx.fillText('RECHARGEABLE LI-ION BATTERY', 70, 175)

    // Giant Capacity Callout with Aurora Cyan Gradient
    ctx.font = '800 84px -apple-system, sans-serif'
    ctx.fillStyle = '#00f2fe'
    ctx.fillText('5,500 mAh', 70, 290)

    ctx.font = '600 32px -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('21.18 Wh   3.88 V', 70, 345)

    ctx.font = '400 20px monospace'
    ctx.fillStyle = 'rgba(220, 235, 255, 0.8)'
    ctx.fillText('Model: EB-BS938ABY', 70, 420)
    ctx.fillText('Limited Charge Voltage: 4.45V', 70, 455)
    ctx.fillText('45W Super Fast Charging 2.0 / Qi2 15W', 70, 490)
    ctx.fillText('Secondary Li-ion Battery 1ICP6/64/88', 70, 525)
    ctx.fillText('Manufactured by Samsung SDI Co., Ltd.', 70, 560)

    const bx = 70
    const by = 620
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(bx, by, 520, 90)
    ctx.fillStyle = '#000000'
    for (let i = 0; i < 75; i++) {
      const lw = (i % 3 === 0 ? 5 : (i % 5 === 0 ? 8 : 3))
      const lx = bx + 15 + i * 6.5
      ctx.fillRect(lx, by + 10, lw, 70)
    }

    const qx = 650
    const qy = 620
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(qx, qy, 140, 140)
    ctx.fillStyle = '#000000'
    ctx.fillRect(qx + 10, qy + 10, 40, 40)
    ctx.fillRect(qx + 90, qy + 10, 40, 40)
    ctx.fillRect(qx + 10, qy + 90, 40, 40)
    ctx.fillRect(qx + 60, qy + 60, 30, 30)

    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 3
    ctx.strokeRect(70, 810, w - 140, 130)

    ctx.fillStyle = '#f59e0b'
    ctx.font = '700 22px sans-serif'
    ctx.fillText('WARNING / CAUTION / 注意事項', 90, 848)

    ctx.fillStyle = 'rgba(240, 245, 255, 0.85)'
    ctx.font = '400 18px sans-serif'
    ctx.fillText('Do not crush, puncture, disassemble, short circuit or incinerate.', 90, 885)
    ctx.fillText('Use specified Samsung fast charger only. Dispose of properly.', 90, 915)
  })

  // 5. STAMPED COPPER VAPOR CHAMBER (1024x1024)
  const vaporChamber = mk(1024, 1024, (ctx, w, h) => {
    const cg = ctx.createLinearGradient(0, 0, w, h)
    cg.addColorStop(0, '#e07a36')
    cg.addColorStop(0.3, '#f59f5a')
    cg.addColorStop(0.7, '#c96a29')
    cg.addColorStop(1, '#9b4c1a')
    ctx.fillStyle = cg
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = 'rgba(70, 25, 5, 0.35)'
    ctx.lineWidth = 8
    for (let y = 100; y < h - 100; y += 70) {
      ctx.beginPath()
      ctx.moveTo(80, y)
      ctx.bezierCurveTo(w * 0.3, y - 25, w * 0.7, y + 25, w - 80, y)
      ctx.stroke()
    }

    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(50, 18, 5, 0.85)'
    ctx.font = '700 36px -apple-system, sans-serif'
    ctx.fillText('3D HYPER VAPOR CHAMBER MATRIX', w / 2, 480)

    ctx.font = '600 26px monospace'
    ctx.fillText('SURFACE AREA: 3,850 mm²  •  OFHC COPPER', w / 2, 530)
    ctx.fillText('TWO-PHASE EVAPORATIVE THERMAL SYSTEM', w / 2, 570)
  })

  // 6. IRIDESCENT OPTICAL CAMERA LENS COATING GRADIENT
  const lensCoating = mk(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#040711'
    ctx.fillRect(0, 0, w, h)

    const lg = ctx.createRadialGradient(w * 0.42, h * 0.42, 10, w * 0.5, h * 0.5, w * 0.48)
    lg.addColorStop(0, 'rgba(0, 242, 254, 0.95)')
    lg.addColorStop(0.3, 'rgba(168, 85, 247, 0.8)')
    lg.addColorStop(0.65, 'rgba(236, 72, 153, 0.65)')
    lg.addColorStop(0.9, 'rgba(56, 189, 248, 0.4)')
    lg.addColorStop(1, 'rgba(4, 7, 17, 0.98)')
    ctx.fillStyle = lg
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, w * 0.46, 0, Math.PI * 2)
    ctx.fill()
  })

  return (cache = { screen, backCover, pcb, battery, vaporChamber, lensCoating })
}

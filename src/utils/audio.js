// Web Audio API sound generator for futuristic UI clicks, hovers, and transitions
let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function playSound(type) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    if (type === 'hover') {
      // Subtle high-tech blip
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(640, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04)

      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.05)
    } else if (type === 'click' || type === 'select') {
      // Futuristic mechanical lock/focus sound
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = 'triangle'
      osc2.type = 'sine'

      osc1.frequency.setValueAtTime(220, now)
      osc1.frequency.exponentialRampToValueAtTime(440, now + 0.08)

      osc2.frequency.setValueAtTime(880, now)
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.08)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.12)
      osc2.stop(now + 0.12)
    } else if (type === 'close') {
      // Soft release tone
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(480, now)
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.09)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    }
  } catch (err) {
    // Ignore audio autoplay restrictions gracefully
  }
}

import { MathUtils } from 'three'
export const sm = (a, b, x) => { const t = MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) }
// Exploded amount for a part: ramps out over [a,b]; everything reassembles over 0.82–0.98.
export const explode = (p, a, b) => sm(a, b, p) - sm(0.82, 0.98, p)
export const STAGES = [
  [0, 'STAGE 01', 'Assembled — floating in space'],
  [0.05, 'STAGE 02', 'Front glass moves forward'],
  [0.16, 'STAGE 03', 'AMOLED display separates'],
  [0.26, 'STAGE 04', 'Rear glass moves backward'],
  [0.36, 'STAGE 05', 'Camera assembly detaches'],
  [0.5, 'STAGE 06', 'Motherboard & processor revealed'],
  [0.6, 'STAGE 07', 'Battery leaves the frame'],
  [0.72, 'STAGE 08', 'Full exploded view'],
  [0.84, 'STAGE 09', 'Camera returns'],
  [0.95, 'STAGE 10', 'Reconnected'],
]
export const FOCUS_PROGRESS = 0.76

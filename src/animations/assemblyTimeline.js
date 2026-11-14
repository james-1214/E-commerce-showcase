// Base assembly positions [x, y, z] and exploded offsets [ex, ey, ez]
// When progress = 0: All parts are perfectly assembled flush inside the unibody phone
export const LAYOUT = {
  frontGlass: { pos: [0, 0, 0], ex: [0, 0, 1.15], r: [0.05, 0.22] },
  display: { pos: [0, 0, 0], ex: [0, 0, 0.72], r: [0.15, 0.32] },
  cooling: { pos: [0, 0.28, 0.014], ex: [0, 0.12, 0.42], r: [0.48, 0.62] },
  board: { pos: [0, 0.28, -0.004], ex: [0, 0.08, 0.12], r: [0.48, 0.62] },
  frame: { pos: [0, 0, 0], ex: [0, 0, 0], r: [0, 0.01] },
  flex: { pos: [0, 0, 0.006], ex: [0, 0, 0.22], r: [0.52, 0.65] },
  battery: { pos: [0, -0.4, -0.01], ex: [0, -0.28, -0.48], r: [0.58, 0.72] },
  rearGlass: { pos: [0, 0, 0], ex: [0, 0, -0.92], r: [0.25, 0.42] },
  camera: { pos: [-0.18, 0.45, -0.02], ex: [-0.05, 0.08, -1.35], r: [0.35, 0.52] },
}

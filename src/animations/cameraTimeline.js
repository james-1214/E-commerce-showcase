import { MathUtils } from 'three'

// Smooth camera positions from Hero (assembled upright original phone) to Exploded perspective
export const getCameraPosition = (p, portrait) => {
  // Clamp progress between 0 and 1
  const prog = MathUtils.clamp(p, 0, 1)

  // Smooth factor for transitioning from front beauty view to exploded angle
  // Explodes between 0.05 and 0.35, reassembles between 0.85 and 0.98
  const explodeFactor = MathUtils.smoothstep(prog, 0.04, 0.3) - MathUtils.smoothstep(prog, 0.84, 0.98)

  if (portrait) {
    // Mobile / Portrait view
    // Start: Upright, centered on the phone screen
    const startPos = [0, 0.15, 4.3]
    // Exploded: Angled so separated layers are clearly visible
    const explodedPos = [1.8, 1.5, 5.6]

    return [
      MathUtils.lerp(startPos[0], explodedPos[0], explodeFactor),
      MathUtils.lerp(startPos[1], explodedPos[1], explodeFactor),
      MathUtils.lerp(startPos[2], explodedPos[2], explodeFactor),
    ]
  } else {
    // Desktop / Landscape view
    // Start: Upright, heroically framed in the center-right to balance hero text
    const startPos = [0.4, 0.0, 3.6]
    // Exploded: Angled 3D isometric perspective
    const explodedPos = [1.6, 1.2, 4.2]

    return [
      MathUtils.lerp(startPos[0], explodedPos[0], explodeFactor),
      MathUtils.lerp(startPos[1], explodedPos[1], explodeFactor),
      MathUtils.lerp(startPos[2], explodedPos[2], explodeFactor),
    ]
  }
}

export const HOME = (portrait) => (portrait ? [0, 0.15, 4.3] : [0.4, 0.0, 3.6])

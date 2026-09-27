<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId: number
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

// Build the 3D Molecular Model (Ball-and-Stick Organometallic Complex matching user image)
interface Atom {
  x: number
  y: number
  z: number
  r: number
  colorLight: string
  colorDark: string
}

interface Bond {
  from: number
  to: number
  color: string
  width: number
  isDashed?: boolean
}

function createMoleculeData() {
  const atoms: Atom[] = []
  const bonds: Bond[] = []

  // 1. Central Green Atom (Metal Center) - Index 0
  atoms.push({
    x: 0,
    y: 10,
    z: 0,
    r: 16,
    colorLight: '#34d399',
    colorDark: '#047857'
  })

  // 2. Top Cyclopentadienyl (Cp) 5-Membered Ring (Index 1 to 5)
  const ringRadius = 36
  const ringY = -55
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
    const cx = ringRadius * Math.cos(angle)
    const cz = ringRadius * Math.sin(angle)

    atoms.push({
      x: cx,
      y: ringY,
      z: cz,
      r: 9.5,
      colorLight: '#cbd5e1',
      colorDark: '#475569'
    })

    // Ring bonds between carbons
    bonds.push({
      from: 1 + i,
      to: 1 + ((i + 1) % 5),
      color: 'rgba(148, 163, 184, 0.7)',
      width: 3.5,
      isDashed: i % 2 === 1
    })

    // Coordination bond from Central Green to Ring Carbons
    bonds.push({
      from: 0,
      to: 1 + i,
      color: 'rgba(100, 116, 139, 0.45)',
      width: 2.2
    })

    // Small White Hydrogen on each Ring Carbon (Index 6 to 10)
    const hDist = ringRadius + 22
    atoms.push({
      x: hDist * Math.cos(angle),
      y: ringY - 8,
      z: hDist * Math.sin(angle),
      r: 5.5,
      colorLight: '#ffffff',
      colorDark: '#94a3b8'
    })

    bonds.push({
      from: 1 + i,
      to: 6 + i,
      color: 'rgba(203, 213, 225, 0.65)',
      width: 2
    })
  }

  // 3. Three Coordinating Amine / Alkyl Arms at 120° spacing
  // Starting index: 11
  let nextIdx = 11
  for (let arm = 0; arm < 3; arm++) {
    const armAngle = (arm * 2 * Math.PI) / 3 + Math.PI / 6
    const nDist = 42

    // Blue Nitrogen Atom
    const nIdx = nextIdx++
    const nx = nDist * Math.cos(armAngle)
    const nz = nDist * Math.sin(armAngle)
    const ny = 22
    atoms.push({
      x: nx,
      y: ny,
      z: nz,
      r: 11.5,
      colorLight: '#60a5fa',
      colorDark: '#1d4ed8'
    })

    // Bond: Green Center -> Nitrogen
    bonds.push({
      from: 0,
      to: nIdx,
      color: 'rgba(37, 99, 235, 0.85)',
      width: 3.5
    })

    // Pink / Magenta Substituent Atom on Nitrogen
    const pinkIdx = nextIdx++
    const px = nx + 18 * Math.cos(armAngle + 0.85)
    const pz = nz + 18 * Math.sin(armAngle + 0.85)
    const py = ny - 6
    atoms.push({
      x: px,
      y: py,
      z: pz,
      r: 7,
      colorLight: '#f472b6',
      colorDark: '#be185d'
    })
    bonds.push({
      from: nIdx,
      to: pinkIdx,
      color: 'rgba(244, 114, 182, 0.75)',
      width: 2.2
    })

    // Grey Carbon attached to Nitrogen (Methyl/Alkyl)
    const cIdx = nextIdx++
    const cx = nx + 28 * Math.cos(armAngle - 0.45)
    const cz = nz + 28 * Math.sin(armAngle - 0.45)
    const cy = ny + 26
    atoms.push({
      x: cx,
      y: cy,
      z: cz,
      r: 9.5,
      colorLight: '#cbd5e1',
      colorDark: '#475569'
    })
    bonds.push({
      from: nIdx,
      to: cIdx,
      color: 'rgba(100, 116, 139, 0.75)',
      width: 3
    })

    // 3 White Hydrogens on the Methyl Carbon
    for (let h = 0; h < 3; h++) {
      const hAngle = (h * 2 * Math.PI) / 3
      const hIdx = nextIdx++
      atoms.push({
        x: cx + 18 * Math.cos(hAngle),
        y: cy + 18 * Math.sin(hAngle) + 4,
        z: cz + 16 * Math.sin(hAngle * 1.5),
        r: 5.5,
        colorLight: '#ffffff',
        colorDark: '#94a3b8'
      })
      bonds.push({
        from: cIdx,
        to: hIdx,
        color: 'rgba(226, 232, 240, 0.6)',
        width: 1.8
      })
    }
  }

  return { atoms, bonds }
}

onMounted(() => {
  if (!process.client || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const handleMouseMove = (e: MouseEvent) => {
    targetMouseX = (e.clientX / width - 0.5) * 1.2
    targetMouseY = (e.clientY / height - 0.5) * 1.2
  }
  window.addEventListener('mousemove', handleMouseMove, { passive: true })

  // Molecule 1: Upper Right (behind hero), compact scale ~0.85
  // Molecule 2: Mid-Left (skills/about), smaller scale ~0.6
  // Molecule 3: Lower-Right, mini scale ~0.45
  const baseMol = createMoleculeData()

  interface MoleculeInstance {
    xRel: number
    yRel: number
    scale: number
    rotX: number
    rotY: number
    rotZ: number
    speedX: number
    speedY: number
    speedZ: number
    opacity: number
  }

  const molecules: MoleculeInstance[] = [
    {
      xRel: 0.72,
      yRel: 0.32,
      scale: 0.85, // Compact, smaller size
      rotX: 0.2,
      rotY: 0.4,
      rotZ: 0,
      speedX: 0.003,
      speedY: 0.006,
      speedZ: 0.002,
      opacity: 0.72
    },
    {
      xRel: 0.12,
      yRel: 0.58,
      scale: 0.58, // Small
      rotX: 0.5,
      rotY: 1.2,
      rotZ: 0.3,
      speedX: -0.004,
      speedY: 0.005,
      speedZ: 0.003,
      opacity: 0.5
    },
    {
      xRel: 0.82,
      yRel: 0.82,
      scale: 0.48, // Mini
      rotX: 1.1,
      rotY: -0.8,
      rotZ: 0.6,
      speedX: 0.005,
      speedY: -0.004,
      speedZ: 0.002,
      opacity: 0.45
    }
  ]

  const fov = 420

  const render = () => {
    // Smooth mouse damping
    mouseX += (targetMouseX - mouseX) * 0.05
    mouseY += (targetMouseY - mouseY) * 0.05

    ctx.clearRect(0, 0, width, height)

    molecules.forEach(mol => {
      mol.rotX += mol.speedX
      mol.rotY += mol.speedY
      mol.rotZ += mol.speedZ

      const cx = width * mol.xRel
      const cy = height * mol.yRel

      // Combined 3D rotation angles (incorporating mouse parallax)
      const rx = mol.rotX + mouseY * 0.4
      const ry = mol.rotY + mouseX * 0.4
      const rz = mol.rotZ

      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz)

      // Transform all atoms to 3D projected space
      const projectedAtoms = baseMol.atoms.map((a, i) => {
        // Scale atom coordinates
        const x0 = a.x * mol.scale
        const y0 = a.y * mol.scale
        const z0 = a.z * mol.scale

        // Rotate Y
        const x1 = x0 * cosY - z0 * sinY
        const z1 = x0 * sinY + z0 * cosY

        // Rotate X
        const y2 = y0 * cosX - z1 * sinX
        const z2 = y0 * sinX + z1 * cosX

        // Rotate Z
        const x3 = x1 * cosZ - y2 * sinZ
        const y3 = x1 * sinZ + y2 * cosZ

        // 3D Perspective Projection
        const projScale = fov / (fov + z2)
        const px = cx + x3 * projScale
        const py = cy + y3 * projScale
        const pr = Math.max(1, a.r * mol.scale * projScale)

        return {
          idx: i,
          x: px,
          y: py,
          z: z2,
          r: pr,
          colorLight: a.colorLight,
          colorDark: a.colorDark
        }
      })

      // Combine atoms and bonds for Painter's Algorithm (sort by Z depth)
      type RenderItem = 
        | { type: 'atom'; z: number; atom: typeof projectedAtoms[0] }
        | { type: 'bond'; z: number; from: typeof projectedAtoms[0]; to: typeof projectedAtoms[0]; color: string; width: number; isDashed?: boolean }

      const items: RenderItem[] = []

      // Add bonds
      baseMol.bonds.forEach(b => {
        const fromAtom = projectedAtoms[b.from]
        const toAtom = projectedAtoms[b.to]
        if (fromAtom && toAtom) {
          items.push({
            type: 'bond',
            z: (fromAtom.z + toAtom.z) / 2 - 2, // slightly behind atoms
            from: fromAtom,
            to: toAtom,
            color: b.color,
            width: b.width * mol.scale,
            isDashed: b.isDashed
          })
        }
      })

      // Add atoms
      projectedAtoms.forEach(a => {
        items.push({
          type: 'atom',
          z: a.z,
          atom: a
        })
      })

      // Sort from back to front (lowest Z to highest Z)
      items.sort((a, b) => a.z - b.z)

      ctx.save()
      ctx.globalAlpha = mol.opacity

      // Draw all items in sorted 3D depth order
      items.forEach(item => {
        if (item.type === 'bond') {
          ctx.beginPath()
          ctx.strokeStyle = item.color
          ctx.lineWidth = Math.max(1, item.width)
          ctx.lineCap = 'round'
          if (item.isDashed) {
            ctx.setLineDash([4 * mol.scale, 3 * mol.scale])
          } else {
            ctx.setLineDash([])
          }
          ctx.moveTo(item.from.x, item.from.y)
          ctx.lineTo(item.to.x, item.to.y)
          ctx.stroke()
          ctx.setLineDash([])
        } else if (item.type === 'atom') {
          const a = item.atom
          const grad = ctx.createRadialGradient(
            a.x - a.r * 0.35,
            a.y - a.r * 0.35,
            Math.max(0.5, a.r * 0.08),
            a.x,
            a.y,
            a.r
          )
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.2, a.colorLight)
          grad.addColorStop(0.75, a.colorDark)
          grad.addColorStop(1, '#090e1a')

          ctx.beginPath()
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.shadowColor = a.colorLight
          ctx.shadowBlur = a.r * 0.8
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      ctx.restore()
    })

    animId = requestAnimationFrame(render)
  }

  animId = requestAnimationFrame(render)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
    
    <!-- Geometric Retro-Futuristic Cyber Grid -->
    <div class="absolute inset-0 bg-tech-grid opacity-50"></div>

    <!-- Soft Atmospheric Ambient Glow Blobs -->
    <div
      class="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-30 animate-pulse"
      style="background: radial-gradient(circle, rgba(0, 242, 254, 0.35) 0%, transparent 70%); animation-duration: 10s;"
    ></div>
    <div
      class="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-25 animate-pulse"
      style="background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%); animation-duration: 12s; animation-delay: -3s;"
    ></div>

    <!-- 3D Ball-and-Stick Molecular Canvas (Small, High-Performance, True 3D Shading) -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>

    <!-- Dark Vignette for Deep Contrast -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#030612]/20 via-transparent to-[#030612]/75"></div>
  </div>
</template>

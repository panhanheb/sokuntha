export default defineNuxtPlugin(() => {
  if (!process.client) return

  let activeCard: HTMLElement | null = null
  let rect: DOMRect | null = null
  let rafId: number | null = null
  let currentTargetX = 0
  let currentTargetY = 0

  const updateCardTransform = () => {
    if (!activeCard || !rect) return
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((currentTargetY - centerY) / centerY) * -13
    const rotateY = ((currentTargetX - centerX) / centerX) * 13

    activeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(16px) translateY(-8px)`
    activeCard.style.boxShadow = `${(-rotateY * 2).toFixed(1)}px ${(rotateX * 2 + 30).toFixed(1)}px 60px -10px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 242, 254, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.4)`
  }

  const handlePointerOver = (e: MouseEvent) => {
    // Only apply on devices with mouse/pointer hover
    if (window.matchMedia('(hover: none)').matches) return
    const target = (e.target as HTMLElement).closest('.pro-card, .pro-stat-box, .card-3d') as HTMLElement
    if (target && target !== activeCard) {
      if (activeCard) {
        activeCard.style.transform = ''
        activeCard.style.boxShadow = ''
      }
      activeCard = target
      rect = target.getBoundingClientRect()
      activeCard.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease, border-color 0.2s ease'
      activeCard.style.transformStyle = 'preserve-3d'
    }
  }

  const handlePointerMove = (e: MouseEvent) => {
    if (!activeCard || !rect) return
    currentTargetX = e.clientX - rect.left
    currentTargetY = e.clientY - rect.top

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        updateCardTransform()
        rafId = null
      })
    }
  }

  const resetCard = () => {
    if (activeCard) {
      activeCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease'
      activeCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)'
      activeCard.style.boxShadow = ''
      activeCard = null
      rect = null
    }
  }

  document.addEventListener('mouseover', handlePointerOver, { passive: true })
  document.addEventListener('mousemove', handlePointerMove, { passive: true })
  document.addEventListener('mouseout', (e) => {
    if (activeCard && !(e.relatedTarget as HTMLElement)?.closest?.('.pro-card, .pro-stat-box, .card-3d')) {
      resetCard()
    }
  }, { passive: true })
})

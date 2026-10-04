import { useEffect, useRef } from 'react'
import { CatIcon } from './CatIcon'

const CLICKABLE = 'a, button, input, [role="button"]'

export function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    let x = -100, y = -100, cx = x, cy = y
    let scale = 1, pressed = false, raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = 1
      scale = e.target.closest?.(CLICKABLE) ? 1.4 : 1
    }
    const onLeave = () => { el.style.opacity = 0 }
    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }

    const tick = () => {
      cx += (x - cx) * 0.25
      cy += (y - cy) * 0.25
      const s = pressed ? scale * 0.8 : scale
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${s})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] text-primary opacity-0 drop-shadow-lg transition-opacity"
    >
      <CatIcon className="size-6" />
    </div>
  )
}

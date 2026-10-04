import { useRef } from 'react'

export function TiltCard({ children, max = 10, className = '' }) {
  const ref = useRef(null)

  const move = (e) => {
    if (e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform =
      `perspective(700px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.03)`
  }
  const leave = () => { ref.current.style.transform = '' }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}

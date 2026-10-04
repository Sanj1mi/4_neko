import { useEffect, useState } from 'react'

export function Modal({ open = true, children, onClose, aside }) {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)

  useEffect(() => {
    if (!mounted) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose?.()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [mounted, open, onClose])

  if (!mounted) return null

  return (
    <div
      onClick={open ? onClose : undefined}
      onAnimationEnd={(e) => {
        if (!open && e.target === e.currentTarget) setMounted(false)
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-scrim/40 p-4 backdrop-blur-md ${
        open ? 'animate-fade-in' : 'pointer-events-none animate-fade-out'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-sm sm:max-w-md ${
          open ? 'animate-pop-in' : 'animate-pop-out'
        }`}
      >
        <div className="max-h-[90dvh] overflow-y-auto rounded-3xl bg-surface-container-high p-6 shadow-xl sm:p-8">
          {children}
        </div>
        {aside && <div className="absolute inset-x-0 top-full mt-4">{aside}</div>}
      </div>
    </div>
  )
}

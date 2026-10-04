import { useState } from 'react'
import { CatIcon } from './CatIcon'

const ITEMS = [
  { g: 'paw', top: '12%', left: '6%', size: 'size-10', delay: '0s' },
  { g: '♥', top: '28%', left: '14%', size: 'text-3xl', delay: '-3s' },
  { g: '✦', top: '68%', left: '8%', size: 'text-2xl', delay: '-6s' },
  { g: '♪', top: '84%', left: '18%', size: 'text-3xl', delay: '-9s' },
  { g: '✦', top: '10%', left: '88%', size: 'text-3xl', delay: '-2s' },
  { g: 'paw', top: '36%', left: '93%', size: 'size-9', delay: '-5s' },
  { g: '♥', top: '62%', left: '86%', size: 'text-4xl', delay: '-8s' },
  { g: '♪', top: '80%', left: '94%', size: 'text-2xl', delay: '-11s' },
]

const COLORS = ['text-primary', 'text-tertiary', 'text-secondary', 'text-mauve']

export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className={`absolute animate-drift opacity-25 ${COLORS[i % COLORS.length]} ${it.size}`}
          style={{ top: it.top, left: it.left, animationDelay: it.delay }}
        >
          {it.g === 'paw' ? <CatIcon className="size-full" /> : it.g}
        </span>
      ))}
    </div>
  )
}

// слот под твой арт: если файла нет, ничего не рисуется
export function SideArt({ src, side = 'left', className = 'w-56 xl:w-72' }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null

  return (
    <img
      src={src}
      alt=""
      onError={() => setOk(false)}
      className={`pointer-events-none fixed bottom-0 -z-10 hidden select-none animate-float xl:block ${
        side === 'left' ? 'left-6' : 'right-6'
      } ${className}`}
    />
  )
}

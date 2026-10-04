import { useEffect, useRef } from 'react'

const FOCUS = 0.3 // на какой высоте блока держим активную строку

export function LyricsView({ lines, activeIndex }) {
  const boxRef = useRef(null)
  const lineRefs = useRef([])

  useEffect(() => {
    const box = boxRef.current
    const el = lineRefs.current[activeIndex]
    if (!box || !el) return
    // пока строка выше отметки FOCUS, значение отрицательное и скролл остаётся в 0
    box.scrollTo({
      top: el.offsetTop - box.clientHeight * FOCUS,
      behavior: 'smooth',
    })
  }, [activeIndex])

  return (
    <div
      ref={boxRef}
      className="relative h-64 overflow-y-auto rounded-2xl bg-surface-container-low sm:h-80"
    >
      <ul className="flex flex-col gap-4 px-6 pt-5 pb-48 sm:pb-60">
        {lines.map((line, i) => (
          <li
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            className={`origin-left text-xl transition-all duration-300 sm:text-2xl ${
              i === activeIndex
                ? 'scale-105 text-on-surface'
                : i < activeIndex
                  ? 'text-on-surface-variant/40'
                  : 'text-on-surface-variant/60'
            }`}
          >
            {line.text || '♪'}
          </li>
        ))}
      </ul>
    </div>
  )
}

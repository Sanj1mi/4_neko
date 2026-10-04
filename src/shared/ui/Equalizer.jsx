const BARS = [
  { dur: '0.9s', delay: '-0.1s' },
  { dur: '0.7s', delay: '-0.4s' },
  { dur: '1.1s', delay: '-0.7s' },
]

export function Equalizer({ playing }) {
  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
      {BARS.map((b, i) => (
        <span
          key={i}
          className="h-full w-1 origin-bottom animate-eq rounded-sm bg-primary"
          style={{
            animationDuration: b.dur,
            animationDelay: b.delay,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
    </span>
  )
}

import { Equalizer, RevealText } from '../../../shared/ui'

export function TrackList({ tracks, currentIndex, played, revealed, isPlaying, onSelect }) {
  return (
    <ul className="flex w-full flex-col gap-2">
      {tracks.map((t, i) => {
        const isCurrent = i === currentIndex
        const isPlayed = played.has(t.id)
        const isRevealed = revealed.has(t.id)
        return (
          <li key={t.id}>
            <button
              onClick={() => onSelect(i)}
              aria-label={isRevealed ? `${t.title}, ${t.artist}` : `Скрытый трек ${i + 1}`}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                isCurrent
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-sm">
                {isCurrent && isRevealed ? (
                  <Equalizer playing={isPlaying} />
                ) : isPlayed ? (
                  '✓'
                ) : (
                  i + 1
                )}
              </span>

              <span className="min-w-0 flex-1">
                {isRevealed ? (
                  <>
                    <RevealText as="span" text={t.title} step={40} className="block font-medium" />
                    <RevealText
                      as="span"
                      text={t.artist}
                      delay={t.title.length * 40 + 100}
                      step={40}
                      className="block text-sm text-on-surface-variant"
                    />
                  </>
                ) : (
                  <>
                    <span className="block font-medium tracking-widest text-outline"></span>
                    <span className="mt-1 block h-3 w-1/2 animate-pulse rounded bg-surface-container-lowest" />
                  </>
                )}
              </span>

              <span className="text-xs text-outline">
                {isPlayed ? 'помурлыкал' : isRevealed ? 'мурчит' : 'кот в мешке'}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

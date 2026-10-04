import { RevealText } from '../../../shared/ui'
import { useSnippetPlayer } from '../model/useSnippetPlayer'
import { LyricsView } from './LyricsView'
import { TrackList } from './TrackList'

const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export function SnippetPlayer({ tracks }) {
  const p = useSnippetPlayer(tracks)
  const allPlayed = p.played.size === tracks.length
  const listening = p.phase === 'listen'

  const activeIndex = p.track
    ? p.track.lyrics.findLastIndex((l) => l.t <= p.time)
    : -1

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <section className="flex flex-col gap-4">
        {p.phase === 'idle' && (
          <button
            onClick={p.start}
            className="mx-auto rounded-full bg-primary px-10 py-4 text-lg font-semibold text-on-primary transition hover:bg-primary-container hover:text-on-primary-container"
          >
            {allPlayed ? '↻ еще хочу' : '▶ Play'}
          </button>
        )}

        {p.phase !== 'idle' && (
          <>
            {/* сообщение висит до конца трека, key = перепечатка для нового трека */}
            <div className="rounded-3xl bg-surface-container-high p-6">
              <RevealText
                key={p.track.id}
                as="p"
                text={p.track.message}
                step={35}
                className="text-on-surface"
              />
            </div>

            {/* место занято сразу, проявляется когда пошла музыка */}
            <div
              aria-hidden={!listening}
              className={`flex flex-col gap-4 transition-opacity duration-700 ${
                listening ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <LyricsView key={p.track.id} lines={p.track.lyrics} activeIndex={activeIndex} />

              <div className="flex items-center gap-3">
                <button
                  onClick={p.toggle}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
                  aria-label={p.isPlaying ? 'Пауза' : 'Играть'}
                >
                  {p.isPlaying ? '❚❚' : '▶'}
                </button>
                <span className="w-10 text-xs text-on-surface-variant">{fmt(p.time)}</span>
                <input
                  type="range"
                  min={0}
                  max={p.duration || 0}
                  step={0.1}
                  value={p.time}
                  onChange={(e) => p.seek(Number(e.target.value))}
                  className="h-1 flex-1 accent-primary"
                />
                <span className="w-10 text-right text-xs text-on-surface-variant">
                  {fmt(p.duration)}
                </span>
              </div>
            </div>
          </>
        )}
      </section>

      <TrackList
        tracks={tracks}
        currentIndex={p.index}
        played={p.played}
        revealed={p.revealed}
        isPlaying={p.isPlaying}
        onSelect={p.openTrack}
      />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

const REVEAL_STEP = 35 // тот же step, что в RevealText сообщения
const FADE_IN = 1.2 // сек
const FADE_OUT = 2.5 // сек
const END_PAUSE = 2000 // мс после последнего трека

const messageDelay = (track) =>
  track.messageDelay ?? track.message.length * REVEAL_STEP + 2500

export function useSnippetPlayer(tracks) {
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const unlockRef = useRef(Promise.resolve())
  const indexRef = useRef(null)
  const playedRef = useRef(new Set())
  const endedRef = useRef(() => {})
  const revealedRef = useRef(new Set())

  const [revealed, setRevealed] = useState(() => new Set())
  const [index, setIndex] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | message | listen
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(() => new Set())

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const onTime = () => setTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => endedRef.current()

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      clearTimeout(timerRef.current)
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // fade in / fade out громкости, пока играет
  useEffect(() => {
    if (!isPlaying) return
    const audio = audioRef.current
    let raf

    const tick = () => {
      const t = audio.currentTime
      const d = audio.duration
      const fadeIn = Math.min(1, t / FADE_IN)
      const fadeOut = Number.isFinite(d) ? Math.min(1, Math.max(0, (d - t) / FADE_OUT)) : 1
      audio.volume = Math.min(fadeIn, fadeOut)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [isPlaying])

  const openTrack = (i) => {
    const audio = audioRef.current
    const track = tracks[i]

    clearTimeout(timerRef.current)
    audio.pause()

    indexRef.current = i
    setIndex(i)
    setTime(0)
    setDuration(0)
    setPhase('message')

    // разблокировка: беззвучный старт (первый раз внутри клика)
    audio.src = track.src
    audio.muted = true
    unlockRef.current = audio
      .play()
      .catch(() => {})
      .then(() => {
        audio.pause()
        audio.currentTime = 0
        audio.muted = false
      })

    // сообщение -> музыка
    timerRef.current = setTimeout(() => {
      unlockRef.current.then(() => {
        audio.volume = 0 // старт с тишины, дальше ведёт fade
        setPhase('listen')
        revealedRef.current = new Set(revealedRef.current).add(track.id)
        setRevealed(revealedRef.current)
        audio.play().catch(console.error)
      })
    }, messageDelay(track))
  }

  // конец трека: пометить и автоматически перейти к следующему
  const handleEnded = () => {
    const doneId = tracks[indexRef.current].id
    playedRef.current = new Set(playedRef.current).add(doneId)
    setPlayed(playedRef.current)

    const next = tracks.findIndex(
      (t, i) => i > indexRef.current && !playedRef.current.has(t.id),
    )
    if (next !== -1) openTrack(next)
    else timerRef.current = setTimeout(() => setPhase('idle'), END_PAUSE)
  }

  useEffect(() => {
    endedRef.current = handleEnded
  })

  const start = () => {
    let i = tracks.findIndex((t) => !playedRef.current.has(t.id))
    if (i === -1) {
      playedRef.current = new Set()
      setPlayed(playedRef.current)
      i = 0
    }
    openTrack(i)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (audio.paused) audio.play().catch(console.error)
    else audio.pause()
  }

  const seek = (value) => {
    audioRef.current.currentTime = value
    setTime(value)
  }

  

  return {
    track: index === null ? null : tracks[index],
    index, phase, isPlaying, time, duration, played, revealed,
    start, openTrack, toggle, seek,
  }
}

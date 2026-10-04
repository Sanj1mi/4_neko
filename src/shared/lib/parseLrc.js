const STAMP = /\[(\d+):(\d{1,2}(?:\.\d+)?)\]/g

export function parseLrc(source) {
  const lines = []

  for (const raw of source.split(/\r?\n/)) {
    const stamps = [...raw.matchAll(STAMP)]
    if (!stamps.length) continue // пропускаем пустые строки и теги вроде [ar:...]

    const text = raw.replace(STAMP, '').trim()
    for (const m of stamps) {
      lines.push({ t: Number(m[1]) * 60 + Number(m[2]), text })
    }
  }

  return lines.sort((a, b) => a.t - b.t)
}

const ALIGN = {
  left: 'text-left',
  center: 'text-center',
  justify: 'text-justify [text-align-last:justify]',
}

export function RevealText({
  text, as: Tag = 'span', className = '', delay = 0, step = 40, play = true, align,
}) {
  const lines = text.split('\n').map((l) => l.trim().replace(/\s+/g, ' '))
  let i = 0

  return (
    <Tag className={`${align ? ALIGN[align] : ''} ${className}`}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, l) => (
          <span key={l} className="block">
            {line === '' && '\u00A0'}
            {line.split(' ').filter(Boolean).map((word, w, arr) => (
              <span key={w}>
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((ch, c) => (
                    <span
                      key={c}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${delay + i++ * step}ms`,
                        animationPlayState: play ? 'running' : 'paused',
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {w < arr.length - 1 && ' '}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  )
}

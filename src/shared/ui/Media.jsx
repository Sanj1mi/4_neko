const VIDEO = /\.(webm|mp4)$/i

export function Media({ src, alt = '', className = '', ...rest }) {
  if (VIDEO.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className={className}
        {...rest}
      />
    )
  }
  return <img src={src} alt={alt} className={className} {...rest} />
}

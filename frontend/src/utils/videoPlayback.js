export const primeInlineVideo = (
  video,
  { reload = false, shouldPlay = true, preload = 'metadata' } = {}
) => {
  if (!video) {
    return Promise.resolve()
  }

  video.autoplay = true
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.preload = preload
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('preload', preload)

  if (reload) {
    video.load()
  }

  if (!shouldPlay) {
    video.pause()
    return Promise.resolve()
  }

  const playPromise = video.play()
  return playPromise?.catch(() => undefined) ?? Promise.resolve()
}

export const bindMobileVideoRetries = (
  video,
  { shouldPlay = () => true, preload = 'metadata' } = {}
) => {
  if (!video || typeof window === 'undefined') {
    return () => {}
  }

  const retryPlayback = () => {
    if (shouldPlay()) {
      primeInlineVideo(video, { preload })
    }
  }

  const retryWhenVisible = () => {
    if (!document.hidden) {
      retryPlayback()
    }
  }

  const gestureOptions = { once: true, passive: true }
  window.addEventListener('pointerdown', retryPlayback, gestureOptions)
  window.addEventListener('touchstart', retryPlayback, gestureOptions)
  document.addEventListener('visibilitychange', retryWhenVisible)

  return () => {
    window.removeEventListener('pointerdown', retryPlayback)
    window.removeEventListener('touchstart', retryPlayback)
    document.removeEventListener('visibilitychange', retryWhenVisible)
  }
}

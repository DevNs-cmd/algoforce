export const primeInlineVideo = (video, { reload = false } = {}) => {
  if (!video) {
    return Promise.resolve()
  }

  video.autoplay = true
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('preload', 'auto')

  if (reload) {
    video.load()
  }

  const playPromise = video.play()
  return playPromise?.catch(() => undefined) ?? Promise.resolve()
}

export const bindMobileVideoRetries = (video) => {
  if (!video || typeof window === 'undefined') {
    return () => {}
  }

  const retryPlayback = () => {
    primeInlineVideo(video)
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

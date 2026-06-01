const MOBILE_VIDEO_SOURCES = {
  '/video1.mp4': '/video1-mobile.mp4',
  '/video2.mp4': '/video2-mobile.mp4',
  '/vecteezy.mp4': '/vecteezy-mobile.mp4',
}

let activeMobileVideo = null

const resolveShouldPlay = (shouldPlay) => (
  typeof shouldPlay === 'function' ? shouldPlay() : shouldPlay
)

const claimMobileVideoSlot = (video) => {
  if (!video || typeof document === 'undefined') {
    return
  }

  document.querySelectorAll('video[data-mobile-managed="true"]').forEach((candidate) => {
    if (candidate !== video) {
      candidate.pause()
    }
  })

  if (activeMobileVideo && activeMobileVideo !== video) {
    activeMobileVideo.pause()
  }

  activeMobileVideo = video
}

export const releaseMobileVideoSlot = (video) => {
  if (activeMobileVideo === video) {
    activeMobileVideo = null
  }
}

export const getOptimizedVideoSrc = (src, isMobile, mobileSrc) => {
  if (!src) {
    return undefined
  }

  return isMobile ? (mobileSrc || MOBILE_VIDEO_SOURCES[src] || src) : src
}

export const primeInlineVideo = (
  video,
  { reload = false, shouldPlay = true, preload = 'metadata', isMobile = false } = {}
) => {
  if (!video) {
    return Promise.resolve()
  }

  video.autoplay = true
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.preload = preload
  video.controls = false
  video.disablePictureInPicture = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('preload', preload)

  if (isMobile) {
    video.dataset.mobileManaged = 'true'
    video.setAttribute('x-webkit-airplay', 'deny')
  }

  if (reload) {
    video.load()
  }

  if (!resolveShouldPlay(shouldPlay)) {
    video.pause()
    return Promise.resolve()
  }

  if (isMobile) {
    claimMobileVideoSlot(video)
  }

  const playPromise = video.play()
  return playPromise?.catch(() => undefined) ?? Promise.resolve()
}

export const bindMobileVideoRetries = (
  video,
  { shouldPlay = () => true, preload = 'metadata', isMobile = false } = {}
) => {
  if (!video || typeof window === 'undefined') {
    return () => {}
  }

  const retryPlayback = () => {
    if (shouldPlay()) {
      primeInlineVideo(video, { preload, isMobile })
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

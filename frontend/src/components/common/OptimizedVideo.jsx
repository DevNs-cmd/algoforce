import { useEffect, useMemo, useRef, useState } from 'react'
import useIsMobile from '../../hooks/useIsMobile'
import {
  bindMobileVideoRetries,
  getOptimizedVideoSrc,
  primeInlineVideo,
  releaseMobileVideoSlot,
} from '../../utils/videoPlayback'

const schedulePlayback = (callback) => {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 500 })
    return () => window.cancelIdleCallback?.(id)
  }

  const id = window.setTimeout(callback, 90)
  return () => window.clearTimeout(id)
}

const OptimizedVideo = ({
  src,
  mobileSrc,
  inView = true,
  preload = 'metadata',
  mobilePreload = 'none',
  loadDelay = 80,
  className = '',
  onLoadedMetadata,
  onCanPlay,
  ...props
}) => {
  const videoRef = useRef(null)
  const isMobile = useIsMobile()
  const resolvedSrc = useMemo(
    () => getOptimizedVideoSrc(src, isMobile, mobileSrc),
    [isMobile, mobileSrc, src]
  )
  const activePreload = isMobile ? mobilePreload : preload
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (!inView || !resolvedSrc) {
      setShouldLoad(false)
      return undefined
    }

    const delay = isMobile ? loadDelay : 0
    const id = window.setTimeout(() => setShouldLoad(true), delay)
    return () => window.clearTimeout(id)
  }, [inView, isMobile, loadDelay, resolvedSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return undefined
    }

    if (!shouldLoad || !inView || !resolvedSrc) {
      video.pause()
      releaseMobileVideoSlot(video)
      return undefined
    }

    let cancelled = false
    const play = () => {
      if (cancelled) {
        return
      }

      primeInlineVideo(video, {
        reload: video.dataset.optimizedSrc !== resolvedSrc,
        shouldPlay: () => inView && !document.hidden,
        preload: activePreload,
        isMobile,
      })
      video.dataset.optimizedSrc = resolvedSrc
    }

    const cancelScheduledPlayback = schedulePlayback(play)
    const cleanupRetries = bindMobileVideoRetries(video, {
      shouldPlay: () => inView && !document.hidden,
      preload: activePreload,
      isMobile,
    })

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause()
        return
      }

      play()
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelled = true
      cancelScheduledPlayback()
      cleanupRetries()
      document.removeEventListener('visibilitychange', handleVisibility)
      releaseMobileVideoSlot(video)
    }
  }, [activePreload, inView, isMobile, resolvedSrc, shouldLoad])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      defaultMuted
      playsInline
      webkit-playsinline="true"
      preload={activePreload}
      src={shouldLoad ? resolvedSrc : undefined}
      className={className}
      data-mobile-managed={isMobile ? 'true' : undefined}
      aria-hidden="true"
      onLoadedMetadata={(event) => {
        if (inView) {
          primeInlineVideo(event.currentTarget, {
            shouldPlay: () => inView && !document.hidden,
            preload: activePreload,
            isMobile,
          })
        }
        onLoadedMetadata?.(event)
      }}
      onCanPlay={(event) => {
        if (inView) {
          primeInlineVideo(event.currentTarget, {
            shouldPlay: () => inView && !document.hidden,
            preload: activePreload,
            isMobile,
          })
        }
        onCanPlay?.(event)
      }}
      {...props}
    />
  )
}

export default OptimizedVideo

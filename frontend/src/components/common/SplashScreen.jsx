import { useEffect, useState } from 'react'

const SPLASH_DURATION = 900
const EXIT_DURATION = 280

const SplashScreen = () => {
  const [mounted, setMounted] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const visibleDuration = prefersReducedMotion ? 420 : SPLASH_DURATION

    setMounted(true)
    setLeaving(false)

    const leaveTimer = window.setTimeout(() => setLeaving(true), visibleDuration)
    const unmountTimer = window.setTimeout(() => setMounted(false), visibleDuration + EXIT_DURATION)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(unmountTimer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`algoforce-splash ${leaving ? 'algoforce-splash--leaving' : ''}`} role="status" aria-label="Loading AlgoForce AI">
      <div className="algoforce-splash__glow algoforce-splash__glow--navy" />
      <div className="algoforce-splash__glow algoforce-splash__glow--violet" />

      <div className="algoforce-splash__shell">
        <div className="algoforce-splash__ring" />
        <div className="algoforce-splash__card">
          <div className="algoforce-splash__logo-frame">
            <img
              src="/algoforce-logo.jpg"
              alt="AlgoForce AI"
              className="algoforce-splash__logo"
              width="760"
              height="360"
            />
          </div>
          <div className="algoforce-splash__loader">
            <div className="algoforce-splash__bar" />
            <div className="algoforce-splash__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <p className="algoforce-splash__text">AlgoForce AI</p>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen

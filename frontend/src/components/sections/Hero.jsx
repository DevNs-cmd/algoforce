import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import TrustBadges from '../common/TrustBadges'
import OptimizedVideo from '../common/OptimizedVideo'
import useIsMobile from '../../hooks/useIsMobile'

const DESKTOP_HERO_VIDEOS = [
  '/video1.mp4',
  '/video2.mp4',
  '/vecteezy.mp4',
];

const MOBILE_HERO_VIDEOS = [
  '/video1.mp4',
];

const getHeroVideos = () => {
  if (typeof window === 'undefined') return DESKTOP_HERO_VIDEOS
  return window.matchMedia('(max-width: 767px)').matches
    ? MOBILE_HERO_VIDEOS
    : DESKTOP_HERO_VIDEOS
}

const Hero = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.08,
    rootMargin: '160px 0px',
    initialInView: true,
  });

  const isMobile = useIsMobile();
  const [heroVideos, setHeroVideos] = useState(getHeroVideos);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updatePlaylist = () => {
      const nextVideos = mediaQuery.matches ? MOBILE_HERO_VIDEOS : DESKTOP_HERO_VIDEOS
      setHeroVideos(nextVideos)
      setActiveVideoIdx((prev) => nextVideos.length ? prev % nextVideos.length : 0)
    }
    updatePlaylist()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePlaylist)
      return () => mediaQuery.removeEventListener('change', updatePlaylist)
    }
    mediaQuery.addListener(updatePlaylist)
    return () => mediaQuery.removeListener(updatePlaylist)
  }, [])

  // Auto-slide every 8 seconds
  useEffect(() => {
    if (isMobile || !heroInView || heroVideos.length < 2) return undefined
    const timer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroInView, heroVideos.length, isMobile]);

  return (
    <section ref={heroRef} className="relative flex items-center justify-center min-h-[84vh] md:min-h-screen overflow-hidden premium-page-bg text-white pt-36 sm:pt-40 md:pt-48 lg:pt-52 pb-12 md:pb-16">
      {/* Video Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#03070d]/72 z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.24),rgba(3,7,13,0.8)_72%,#03070d)] z-10" />
        <div className="absolute inset-0 subtle-ai-grid z-10 opacity-60" />

        {heroVideos.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideoIdx}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <OptimizedVideo
                src={heroVideos[activeVideoIdx]}
                inView={heroInView}
                preload="metadata"
                mobilePreload="none"
                key={heroVideos[activeVideoIdx]}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="relative z-10 px-4 sm:px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full premium-dark-surface backdrop-blur-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                Enterprise AI &nbsp;•&nbsp; Automation &nbsp;•&nbsp; Digital Operations
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl min-[380px]:text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.65rem] font-bold mb-6 leading-[1.08] text-white max-w-5xl mx-auto tracking-tight"
          >
            AI systems for the workflows{' '}
            <span className="premium-serif italic font-normal text-[#cdb4ff]">that run your business.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8 md:mb-10 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed px-2 sm:px-0"
          >
            AlgoForce helps businesses identify operational bottlenecks, implement intelligent automation around the systems they already use, and continuously improve the workflows that matter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-xl mx-auto px-4 sm:px-0"
          >
            {/* Primary CTA */}
            <Link to="/contact?type=assessment" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(143,56,255,0.3)] transition-all"
              >
                Book a Workflow Assessment
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/solutions" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 bg-white text-[#06101d] rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(255,255,255,0.12)] active:bg-gray-100 transition-all"
              >
                Explore Solutions →
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-10 md:mt-14">
            <TrustBadges />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

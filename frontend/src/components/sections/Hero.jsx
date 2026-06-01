import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import TrustBadges from '../common/TrustBadges'
import { bindMobileVideoRetries, primeInlineVideo } from '../../utils/videoPlayback'
import useIsMobile from '../../hooks/useIsMobile'

const DESKTOP_HERO_VIDEOS = [
  '/video1.mp4',
  '/video2.mp4',
  '/vecteezy.mp4',
];

const MOBILE_HERO_VIDEOS = [];

const getHeroVideos = () => {
  if (typeof window === 'undefined') {
    return DESKTOP_HERO_VIDEOS
  }

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

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const videoRef = useRef(null);
  const isMobile = useIsMobile();
  const [heroVideos, setHeroVideos] = useState(getHeroVideos);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

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
    if (isMobile || !heroInView || heroVideos.length < 2) {
      return undefined
    }

    const timer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroInView, heroVideos.length]);

  useEffect(() => {
    if (isMobile || !heroVideos.length) {
      return undefined
    }

    const video = videoRef.current
    if (!video) {
      return undefined
    }

    if (!heroInView) {
      video.pause()
      return undefined
    }

    primeInlineVideo(video, { reload: true, preload: 'metadata' })
    return bindMobileVideoRetries(video, {
      shouldPlay: () => heroInView,
      preload: 'metadata',
    })
  }, [activeVideoIdx, heroInView, heroVideos.length, isMobile])

  return (
    <section ref={heroRef} className="relative flex items-center justify-center min-h-[84vh] md:min-h-screen overflow-hidden premium-page-bg text-white pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-12 md:pb-16">
      {/* Video Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#03070d]/72 z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.24),rgba(3,7,13,0.8)_72%,#03070d)] z-10" />
        <div className="absolute inset-0 subtle-ai-grid z-10 opacity-60" />
        
        {!isMobile && heroVideos.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideoIdx}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                defaultMuted
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                aria-hidden="true"
                src={heroVideos[activeVideoIdx]}
                onLoadedMetadata={(event) => {
                  if (heroInView) {
                    primeInlineVideo(event.currentTarget, { preload: 'metadata' })
                  }
                }}
                onCanPlay={(event) => {
                  if (heroInView) {
                    primeInlineVideo(event.currentTarget, { preload: 'metadata' })
                  }
                }}
                key={heroVideos[activeVideoIdx]}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="relative z-10 px-5 sm:px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
              <span className="text-[10px] font-semibold uppercase text-slate-300">AI Systems & Automation</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#7aa7c7]" />
              <span className="text-[10px] font-semibold uppercase text-slate-300">Execution Infrastructure</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.65rem] font-semibold mb-6 leading-[1.06] text-white max-w-6xl mx-auto"
          >
            AI systems and <span className="premium-serif italic font-normal text-[#cdb4ff]">automation infrastructure</span> for modern organizations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8 md:mb-10 text-base md:text-lg text-slate-300 font-normal leading-relaxed"
          >
            We help startups, SMEs, and enterprises automate operations, deploy intelligent systems, modernize workflows, and execute faster at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-5 py-3 mb-8 rounded-full premium-dark-surface backdrop-blur-xl"
          >
            <span className="text-[10px] font-semibold uppercase text-slate-400">MSME Registered</span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-normal">UDYAM-DL-08-0122150</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 md:mb-10 max-w-3xl mx-auto px-0 sm:px-4"
          >
            <div className="p-5 md:py-6 md:px-10 rounded-[24px] premium-dark-surface backdrop-blur-xl flex flex-col md:flex-row items-center justify-around gap-5 md:gap-0">
              <div className="text-center w-full md:w-auto">
                <div className="text-3xl md:text-4xl font-bold text-white">4</div>
                <div className="text-[10px] md:text-xs mt-1.5 uppercase font-medium text-slate-400">Ecosystem Initiatives</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div className="w-16 h-px bg-white/10 md:hidden" />
              <div className="text-center w-full md:w-auto">
                <div className="text-3xl md:text-4xl font-bold text-white">Active</div>
                <div className="text-[10px] md:text-xs mt-1.5 uppercase font-medium text-slate-400">Automation Workflows</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-11 sm:py-4 bg-white text-[#06101d] rounded-full font-bold text-sm sm:text-[14px] flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(143,56,255,0.16)] active:bg-gray-100 transition-all"
              >
                Deploy AI Systems {'->'}
              </motion.button>
            </Link>
            <a href="https://crucible-website-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-11 sm:py-4 border border-white/14 rounded-full font-bold text-sm sm:text-[14px] text-white hover:border-white/30 backdrop-blur-xl transition-all"
              >
                Optimize Operations
              </motion.button>
            </a>
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

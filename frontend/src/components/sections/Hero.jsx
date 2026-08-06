import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Orbit } from 'lucide-react'
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
          {/* Product Vertical & Highlight Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 mb-6 md:mb-8 px-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full premium-dark-surface backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Enterprise AI Software</span>
            </motion.div>

            <Link to="/products/finance-ai">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-purple-500/40 bg-gradient-to-r from-purple-900/40 via-purple-600/30 to-indigo-900/40 backdrop-blur-xl text-[11px] font-bold text-purple-200 hover:border-purple-400 transition-all shadow-md shadow-purple-500/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>⚡ TallyGPT v2.0 Desktop Ready</span>
                <span className="text-purple-400 font-normal">→</span>
              </motion.div>
            </Link>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl min-[380px]:text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.65rem] font-bold mb-6 leading-[1.08] text-white max-w-6xl mx-auto tracking-tight animate-pulse-subtle"
          >
            We deploy AI software that automates <span className="premium-serif italic font-normal text-[#cdb4ff]">business operations.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8 md:mb-10 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed px-2 sm:px-0"
          >
            Ready-to-use products for finance, sales, HR, manufacturing, hospitality, knowledge and operations - deployed around the systems your team already uses.
          </motion.p>

          {/* Buying journey indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 mb-8 sm:mb-10 text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 tracking-wider uppercase px-2 sm:px-0"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#8f38ff] rounded-full" /> Product Discovery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full" /> Deployment and Integration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#8f38ff] rounded-full" /> Ongoing Support
            </span>
          </motion.div>

          {/* Responsive Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-4xl mx-auto px-4 sm:px-0"
          >
            <Link to="/products/finance-ai" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] text-white rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(143,56,255,0.3)] transition-all"
              >
                <span>Install TallyGPT</span>
                <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-extrabold">v2.0 .exe</span>
              </motion.button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 bg-white text-[#06101d] rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(255,255,255,0.12)] active:bg-gray-100 transition-all"
              >
                Book a Demo
              </motion.button>
            </Link>

            <a href="#products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 border border-white/14 rounded-full font-bold text-xs sm:text-sm text-white hover:border-white/30 backdrop-blur-xl transition-all"
              >
                Explore Products {'->'}
              </motion.button>
            </a>

            <Link to="/orion" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-7 py-3.5 sm:px-8 sm:py-4 border border-[#d7b274]/50 rounded-full font-bold text-xs sm:text-sm text-[#f7e5bc] hover:border-[#d7b274] backdrop-blur-xl flex items-center justify-center gap-2 transition-all"
              >
                <Orbit size={16} aria-hidden="true" /> Explore Orion
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

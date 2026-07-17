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
    <section ref={heroRef} className="relative flex items-center justify-center min-h-[84vh] md:min-h-screen overflow-hidden premium-page-bg text-white pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-12 md:pb-16">
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

      <div className="relative z-10 px-5 sm:px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Product Vertical Badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
              <span className="text-[10px] font-semibold uppercase text-slate-300">AI Software Company · MSME Registered</span>
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.65rem] font-bold mb-6 leading-[1.06] text-white max-w-6xl mx-auto tracking-tight animate-pulse-subtle"
          >
            We build AI software that automates <span className="premium-serif italic font-normal text-[#cdb4ff]">business operations.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8 md:mb-10 text-base md:text-lg text-slate-300 font-normal leading-relaxed"
          >
            Deploy ready-to-use software for Finance, Sales, HR, Manufacturing, Customer Support and Operations.
          </motion.p>

          {/* Engagement Workflow Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#8f38ff] rounded-full" /> Business Assessment
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full" /> Deployment
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#8f38ff] rounded-full" /> Monthly Support
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-11 sm:py-4 bg-white text-[#06101d] rounded-full font-bold text-sm sm:text-[14px] flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(143,56,255,0.16)] active:bg-gray-100 transition-all"
              >
                Book Business Assessment
              </motion.button>
            </Link>
            <a href="#products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-11 sm:py-4 border border-white/14 rounded-full font-bold text-sm sm:text-[14px] text-white hover:border-white/30 backdrop-blur-xl transition-all"
              >
                Explore Products {'->'}
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

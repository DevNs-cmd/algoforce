import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { bindMobileVideoRetries, primeInlineVideo } from '../../utils/videoPlayback'

const SHOWCASE_VIDEOS = [
  { 
    id: 0, 
    src: '/video1.mp4', 
    label: 'Brand Strategy', 
    title: 'Ecosystem Brand Strategy',
    description: 'A deep dive into our core brand positioning, incubation framework, and builder network architectures.' 
  },
  { 
    id: 1, 
    src: '/video2.mp4', 
    label: 'Digital Dominant', 
    title: 'Digital Dominance Engine',
    description: 'Explore our high-performance marketing funnels, automated growth outreach, and visual campaign modules.' 
  },
  { 
    id: 2, 
    src: '/vecteezy.mp4', 
    label: 'Ecosystem Stream', 
    title: 'AlgoForce Core Neural Matrix',
    description: 'Observe the real-time AI consulting nodes and automated stream workflows that fuel the platform.' 
  },
]

const ShowcaseVideo = () => {
  const videoRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Whenever active video changes, reload and play the player
  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return undefined
    }

    primeInlineVideo(video, { reload: true })
    return bindMobileVideoRetries(video)
  }, [activeIdx])

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SHOWCASE_VIDEOS.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SHOWCASE_VIDEOS.length) % SHOWCASE_VIDEOS.length)
  }

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden bg-[#020205] text-white">
      {/* Decorative background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header copy */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Interactive Demos</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent"
          >
            Explore the Ecosystem
          </motion.h2>
        </div>

        {/* Custom sliding tabs controller */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg mx-auto">
          {SHOWCASE_VIDEOS.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveIdx(video.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeIdx === video.id
                  ? 'bg-white border-white text-black font-black shadow-lg shadow-white/5'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {video.label}
              {activeIdx === video.id && (
                <motion.span
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-full border border-purple-500 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Beautiful framed interactive video container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Outer glowing border wrapper */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500/25 to-emerald-500/15 rounded-[28px] blur-2xl opacity-65 pointer-events-none" />
          
          {/* Main frame mock */}
          <div className="relative overflow-hidden bg-zinc-950/80 border border-white/15 rounded-[24px] shadow-2xl backdrop-blur-2xl">
            
            {/* Top glassmorphic header bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              
              {/* Dynamic Video Title Info */}
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 select-none">
                Ecosystem Showcase
              </span>
              <div className="w-12 h-1 bg-white/5 rounded-full" />
            </div>

            {/* Video Canvas Container */}
            <div className="relative aspect-video w-full group overflow-hidden bg-black">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    defaultMuted
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    src={SHOWCASE_VIDEOS[activeIdx].src}
                    onLoadedMetadata={(event) => primeInlineVideo(event.currentTarget)}
                    onCanPlay={(event) => primeInlineVideo(event.currentTarget)}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next/Prev Navigation overlay arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/10 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous Video"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/10 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next Video"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>

              {/* Dynamic bottom overlays */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            </div>

          </div>
          
          {/* Bottom active description block */}
          <div className="mt-6 text-center max-w-xl mx-auto px-4">
            <h3 className="text-lg font-bold text-white mb-2">{SHOWCASE_VIDEOS[activeIdx].title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{SHOWCASE_VIDEOS[activeIdx].description}</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ShowcaseVideo

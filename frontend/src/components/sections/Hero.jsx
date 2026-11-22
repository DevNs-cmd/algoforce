import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

const HERO_VIDEOS = [
  { src: '/video1.mp4', label: '01 / Enterprise Systems' },
  { src: '/video2.mp4', label: '02 / Digital Engineering' },
  { src: '/vecteezy.mp4', label: '03 / Integrated Architecture' },
]

const Hero = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.05,
    rootMargin: '100px 0px',
    initialInView: true,
  })

  const [activeVideoIdx, setActiveVideoIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null)

  // Auto-advance video slide every 8 seconds
  useEffect(() => {
    if (!isPlaying) return undefined
    const interval = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Ensure current video plays cleanly when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [activeVideoIdx])

  return (
    <section 
      ref={heroRef} 
      className="relative flex flex-col justify-center items-center min-h-[92vh] md:min-h-screen overflow-hidden text-slate-900 pt-28 sm:pt-32 pb-14 sm:pb-16 bg-white"
    >
      {/* Background Video Slider (Visible with light veil) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          key={HERO_VIDEOS[activeVideoIdx].src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.01] filter brightness-[0.98] contrast-[1.02]"
        >
          <source src={HERO_VIDEOS[activeVideoIdx].src} type="video/mp4" />
        </video>

        {/* Clean, translucent veil that keeps video visible across entire viewport */}
        <div className="absolute inset-0 bg-white/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />
      </div>

      {/* Main Hero Card — Frosted glass gives 100% crystal-clear text visibility while preserving the video behind */}
      <div className="relative z-10 px-4 sm:px-6 mx-auto max-w-4xl text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/92 backdrop-blur-md rounded-3xl p-7 sm:p-10 md:p-14 border-t-2 border-t-white border-b-4 border-b-slate-300/80 border-x border-slate-200/90 shadow-[0_28px_65px_-8px_rgba(9,41,65,0.2),0_12px_28px_-6px_rgba(9,41,65,0.12),inset_0_1px_0_rgba(255,255,255,1)]"
        >
          {/* Executive Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#092941]" />
            <span className="text-[11px] font-semibold tracking-wider text-slate-800 uppercase font-mono">
              Integrated IT Services & Digital Engineering
            </span>
          </div>

          {/* Strategic Creative Headline */}
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-bold text-[#092941] mb-5 tracking-tight leading-[1.12]">
            Your Technology Partner.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              From Problem to Progress.
            </span>
          </h1>

          {/* Supporting Copy (High-Contrast, perfectly readable) */}
          <p className="max-w-2xl mx-auto mb-8 text-sm sm:text-base md:text-lg text-slate-700 font-normal leading-relaxed">
            From technology consulting and software engineering to AI-powered systems and managed technology services, AlgoForce helps businesses and institutions turn technology requirements into practical, scalable solutions.
          </p>

          {/* Executive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={16} />
              </button>
            </Link>

            <Link to="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-b from-white to-slate-100 hover:to-slate-200 text-[#092941] border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0">
                <span>Explore Our Capabilities</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

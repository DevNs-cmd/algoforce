import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import TrustBadges from '../common/TrustBadges'

const Hero = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] md:min-h-screen overflow-hidden bg-[#020205] text-white pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16">
      {/* Video Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#020205]/60 z-10 mix-blend-multiply" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/vecteezy.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tagline - Soft and Small */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500">AI Education & Execution</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500">Govt Registered MSME</span>
            </motion.div>
          </div>

          {/* Headline - Ultra Tight Tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white/95"
          >
            Edtech solutions  & MVP Builder for Startups
          </motion.h1>

          {/* Description - Modern Clarity */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mb-14 text-sm md:text-base text-gray-300 font-normal leading-relaxed"
          >
            <span className="font-semibold text-white">500+ students</span> already AlgoForce Certified. Join the community executing modern AI solutions.
          </motion.p>

          {/* Enhanced Glassmorphic Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-14 max-w-2xl mx-auto px-4"
          >
            <div className="p-5 md:py-6 md:px-12 rounded-3xl md:rounded-full bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0">
              <div className="text-center w-full md:w-auto">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">500+</div>
                <div className="text-[10px] md:text-xs mt-1.5 uppercase font-medium tracking-[0.15em] text-gray-400">Students Trained</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div className="w-16 h-px bg-white/10 md:hidden" />
              <div className="text-center w-full md:w-auto">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">50+</div>
                <div className="text-[10px] md:text-xs mt-1.5 uppercase font-medium tracking-[0.15em] text-gray-400">Startup Built</div>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs - iOS Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0"
          >
            <Link to="/labs" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-14 sm:py-5 bg-white text-black rounded-full font-black text-sm sm:text-[15px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:bg-gray-100 transition-all uppercase tracking-widest"
              >
                Explore Labs {'->'}
              </motion.button>
            </Link>
            <a href="https://crucible-website-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 sm:px-14 sm:py-5 border border-white/10 rounded-full font-black text-sm sm:text-[15px] text-white hover:border-white/30 backdrop-blur-xl transition-all uppercase tracking-widest"
              >
                Try Crucible
              </motion.button>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-20">
            <TrustBadges />
          </div>
        </motion.div>


      </div>
    </section>
  )
}

export default Hero

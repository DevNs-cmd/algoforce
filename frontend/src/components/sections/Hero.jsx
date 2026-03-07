import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#020205] text-white pt-32 pb-20">

      {/* iOS Liquid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full opacity-60"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -150, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[900px] h-[900px] bg-blue-600/15 blur-[180px] rounded-full opacity-50"
        />
      </div>

      <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tagline - Soft and Small */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Startup Execution Engine</span>
          </motion.div>

          {/* Headline - Ultra Tight Tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.85] tracking-tight md:tracking-tighter"
          >
            Build MVPs <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-purple-400/50">
              at Engine Speed.
            </span>
          </motion.h1>

          {/* Description - Modern Clarity */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mb-16 text-sm md:text-lg text-gray-400 font-medium leading-relaxed"
          >
            Precision engineering for the next generation of founders.
            We deploy high-performance AI systems and scalable architectures
            to turn bold visions into market reality.
          </motion.p>

          {/* Action CTAs - iOS Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/ai-builder">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white text-black rounded-full font-bold text-[15px] flex items-center gap-4 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:bg-gray-100 transition-all"
              >
                Launch Nexus {'->'}
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-white/10 rounded-full font-bold text-[15px] text-white hover:border-white/30 backdrop-blur-xl transition-all"
              >
                Request Audit
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Island - iOS Glassmorphism */}
        <div ref={statsRef} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Engineering',
              desc: 'Rapid prototype cycles.',
              gradient: 'from-purple-500/20 to-transparent'
            },
            {
              title: 'Inference',
              desc: 'Autonomous AI orchestration.',
              gradient: 'from-blue-500/20 to-transparent'
            },
            {
              title: 'Scaling',
              desc: 'Strategic revenue logic.',
              gradient: 'from-white/10 to-transparent'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + (idx * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-[50px] overflow-hidden group transition-all duration-700 hover:bg-white/[0.06] hover:scale-[1.02] cursor-default"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 transition-opacity group-hover:opacity-40`} />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 italic uppercase text-white group-hover:text-purple-400 transition-colors tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

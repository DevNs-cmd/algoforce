import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPlay } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#050814] to-black text-white">

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-24 sm:py-36 mx-auto text-center max-w-7xl flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base tracking-wide text-gray-300 border rounded-full bg-white/10 backdrop-blur-sm border-white/10">
              Global AI & Automation Agency
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white"
          >
            Scale Faster with {' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
            >

              AlgoForce
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-10 sm:mb-14 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400"

          >
            We build high-performance AI Chatbots, Business Automations, and Premium Websites
            designed to eliminate manual work and double your revenue.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all bg-purple-600 rounded-lg shadow-lg group hover:bg-purple-700 hover:shadow-purple-500/50"
              >
                View Combo Packs
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all border rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 shadow-lg"
              >
                Free AI Audit
                <FaPlay size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats - Now scroll-triggered */}
        <div ref={statsRef} className="mt-20 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:gap-10 mx-auto md:grid-cols-3"
          >
            {[
              { value: '$0', label: 'Upfront Maintenance' },
              { value: '24/7', label: 'AI Support' },
              { value: '10x', label: 'Faster Growth' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: statsInView ? index * 0.15 : 0 }}
                className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
              >
                <div className="mb-3 text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-base sm:text-lg text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { repeat: Infinity, duration: 2 }
          }}
          className="absolute transform -translate-x-1/2 bottom-10 left-1/2"
        >
          <div className="flex items-start justify-center w-6 h-10 p-2 border-2 rounded-full border-white/30">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

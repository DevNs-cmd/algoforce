import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPlay } from 'react-icons/fa'

const Hero = () => {
  return (
   <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#050814] to-black text-white">

   {/* Subtle background glow */}
<div className="absolute inset-0 pointer-events-none">
  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px]" />
</div>


      <div className="relative z-10 px-6 py-32 mx-auto text-center max-w-7xl">
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
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 text-sm tracking-wide text-gray-300 border rounded-full bg-white/10 backdrop-blur-sm border-white/10">

              Your AI Business partner for unstoppable growth
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            Start Using {' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
>

              AlgoForce AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto mb-12 text-xl text-gray-400 md:text-2xl"

          >
            Enterprise-grade AI Business OS that eliminates revenue leaks, 
            builds intelligence moats, and compounds decision-making velocity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all bg-purple-600 rounded-lg shadow-lg group hover:bg-purple-700 hover:shadow-purple-500/50"
              >
                Request Demo
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all border rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20"
              >
                Revenue Leak Audit
                <FaPlay size={14} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-20 md:grid-cols-3"
          >
            {[
              { value: '10x', label: 'Revenue Intelligence' },
              { value: '90%', label: 'Leak Prevention' },
              { value: '24/7', label: 'Autonomous Operations' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"

              >
                <div className="mb-2 text-4xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

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

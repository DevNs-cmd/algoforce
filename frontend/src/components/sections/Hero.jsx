import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPlay } from 'react-icons/fa'

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bg-purple-500 rounded-full top-1/4 -left-1/4 w-96 h-96 opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bg-blue-500 rounded-full bottom-1/4 -right-1/4 w-96 h-96 opacity-10 blur-3xl"
        />
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
            <span className="px-4 py-2 text-sm font-semibold text-purple-300 border rounded-full bg-purple-500/20 backdrop-blur-sm border-purple-500/30">
              Enterprise AI Operating System
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            The Operating System for{' '}
            <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">
              Revenue Intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto mb-12 text-xl text-gray-300 md:text-2xl"
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
                className="p-6 glass-dark rounded-xl"
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

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaRocket } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#05050F] text-white pt-20">

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 px-6 py-20 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">The Startup Execution Engine</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
          >
            Build Your MVP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400">
              In Record Time.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto mb-12 text-lg md:text-2xl text-gray-400 font-medium leading-relaxed"
          >
            AlgoForce empowers entrepreneurs with high-speed AI execution.
            We build scalable SaaS MVPs and growth systems that turn your vision into revenue.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/ai-builder">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl transition-all"
              >
                Launch with Nexus
                <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Request Audit
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Value Cards */}
        <div ref={statsRef} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: 'MVP Engineering',
              desc: 'Go from idea to prototype in weeks, not months.',
              icon: <FaRocket className="text-purple-500" />
            },
            {
              title: 'AI Automation',
              desc: 'Eliminate manual workflows and scale infinitely.',
              icon: <FaRocket className="text-blue-500" />
            },
            {
              title: 'Growth Systems',
              desc: 'Strategic revenue engineering for tech startups.',
              icon: <FaRocket className="text-white" />
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + (idx * 0.1) }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-purple-500/50 transition-colors"
            >
              <div className="mb-4 text-2xl">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

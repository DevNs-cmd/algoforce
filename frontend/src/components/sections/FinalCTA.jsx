import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FinalCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#03070d] text-white border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-400 mb-6">
            Start the conversation
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6">
            Have a workflow{' '}
            <span className="premium-serif italic font-normal text-[#cdb4ff]">worth improving?</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
            Tell us what your team is still doing manually. We'll identify where AlgoForce can create the most practical value — no commitment required to start.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?type=assessment">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#06101d] rounded-full font-bold text-sm shadow-[0_20px_50px_rgba(255,255,255,0.12)] hover:bg-gray-100 transition-all"
              >
                Book a Workflow Assessment <ArrowRight size={15} />
              </motion.button>
            </Link>

            <Link to="/contact?type=demo">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white rounded-full font-bold text-sm hover:border-white/30 backdrop-blur-xl transition-all"
              >
                Book a Demo
              </motion.button>
            </Link>
          </div>

          <p className="mt-8 text-[11px] text-slate-600 font-normal tracking-wider uppercase">
            DISCOVER &nbsp;→&nbsp; IMPLEMENT &nbsp;→&nbsp; OPERATE &nbsp;→&nbsp; IMPROVE
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA

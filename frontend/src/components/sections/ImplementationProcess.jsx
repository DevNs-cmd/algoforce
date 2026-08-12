import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaClipboardCheck,
  FaChartBar,
  FaFlask,
  FaCogs,
  FaCheckSquare,
  FaHeadset,
  FaExpandArrowsAlt
} from 'react-icons/fa'

const STEPS = [
  {
    icon: <FaSearch />,
    title: 'Discover',
    desc: 'We understand your operations, map your workflows and identify where automation creates real value.'
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Qualify',
    desc: 'We confirm the operational fit, current systems, data readiness and stakeholder requirements.'
  },
  {
    icon: <FaChartBar />,
    title: 'Assess',
    desc: 'A structured workflow assessment produces a clear implementation path and commercial proposal.'
  },
  {
    icon: <FaFlask />,
    title: 'Pilot',
    desc: 'A focused, time-bound pilot validates the automation in your environment before broader rollout.'
  },
  {
    icon: <FaCogs />,
    title: 'Implement',
    desc: 'We configure, integrate and deploy the solution around your existing systems and business rules.'
  },
  {
    icon: <FaCheckSquare />,
    title: 'Measure',
    desc: 'We validate performance against the agreed workflow metrics before handing over to operations.'
  },
  {
    icon: <FaHeadset />,
    title: 'Operate',
    desc: 'We manage, monitor and support the live solution — maintaining performance and resolving exceptions.'
  },
  {
    icon: <FaExpandArrowsAlt />,
    title: 'Expand',
    desc: 'Proven results create the foundation for expanding automation to additional workflows and teams.'
  }
]

const ImplementationProcess = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  return (
    <section ref={ref} id="how-it-works" className="py-16 md:py-24 bg-white text-black relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">How we work with customers</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            One partner. From workflow discovery{' '}
            <span className="premium-serif italic font-normal text-purple-600">to managed execution.</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed font-normal mt-3">
            You don't have to replace everything. AlgoForce works with the systems, teams and workflows you already have.
          </p>
        </motion.div>

        {/* 8-step grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-14">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + idx * 0.07 }}
              className="p-6 rounded-[22px] bg-gray-50 border border-gray-100 hover:shadow-lg hover:shadow-purple-500/5 transition-all group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {step.icon}
                </div>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-normal flex-1">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link to="/contact?type=assessment">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#06101d] text-white rounded-full font-bold text-sm hover:bg-[#102640] transition-all shadow-lg">
              Start with a Workflow Assessment
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ImplementationProcess

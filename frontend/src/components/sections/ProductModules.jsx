import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRobot, FaCode, FaChartBar, FaMobileAlt, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductModules = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: <FaRobot />,
      title: 'AlgoForce AI Core',
      desc: 'AI consulting, lead generation, branding, web/app development, CRM systems, and automation retainers for businesses.',
      tag: 'Services'
    },
    {
      icon: <FaCode />,
      title: 'AlgoForce Labs',
      desc: 'Cohort programs, certifications, apprenticeships, and a hiring pipeline that turns learners into client-ready builders.',
      tag: 'Education'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Crucible',
      desc: 'Founder community, hackathons, demo days, incubator cohorts, mentor access, and startup venture pipeline.',
      tag: 'Founders'
    },
    {
      icon: <FaChartBar />,
      title: 'SaaS Roadmap',
      desc: 'AlgoLeads, AlgoContent, AlgoCRM, and analytics products designed to turn delivery IP into recurring revenue.',
      tag: 'Products'
    }
  ]

  return (
    <section id="services" className="py-12 md:py-16 bg-[#05050F] text-white relative">
      <div className="absolute inset-0 bg-purple-600/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-6">Three Engines</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            One <span className="text-gray-800">Ecosystem.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-medium text-lg leading-relaxed">
            Services create revenue, Labs creates talent, and Crucible creates founders. Each engine strengthens the next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xl">
                  {s.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">{s.tag}</span>
              </div>
              <h4 className="text-xl font-bold mb-4">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-12 flex-grow">{s.desc}</p>
              <Link to="/contact">
                <button className="text-[11px] font-bold uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-colors">
                  Explore Engine <FaArrowRight size={10} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bonus Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="mt-12 md:mt-16 p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-[#1A1A2E] to-transparent border border-white/10 flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div className="text-left">
            <div className="text-purple-500 text-3xl mb-4 font-black">10+</div>
            <h4 className="text-2xl font-bold mb-2">Revenue Streams.</h4>
            <p className="text-gray-400 text-sm font-medium">Retainers, projects, Labs cohorts, SaaS tools, events, memberships, placements, training, and venture upside.</p>
          </div>
          <Link to="/pricing">
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">Explore Pricing</button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModules

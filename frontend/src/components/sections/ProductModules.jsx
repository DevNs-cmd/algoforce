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
      title: 'AlgoForce AI',
      desc: 'Our core operations delivering custom AI systems, automation infrastructure, digital transformation, and custom business platforms.',
      tag: 'AI & Automation'
    },
    {
      icon: <FaCode />,
      title: 'AlgoForce Labs',
      desc: 'Our talent infrastructure platform developing execution-ready builders capable of deploying advanced workflows.',
      tag: 'Talent Platform'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Crucible',
      desc: 'A strategic startup execution operating system helping founders scale operations and move efficiently from idea to execution.',
      tag: 'Startup OS'
    },
    {
      icon: <FaChartBar />,
      title: 'SaaS Ecosystem',
      desc: 'Proprietary execution tools (AlgoLeads, AlgoContent, AlgoCRM) designed to drive systemic operational efficiency.',
      tag: 'Software'
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
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-6">Execution Systems</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            One Scalable <span className="text-gray-800">Ecosystem.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-base md:text-lg leading-relaxed">
            We combine operational systems, talent infrastructure, and startup platforms into a compounding loop focused on execution outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-7 md:p-8 rounded-[24px] bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xl">
                  {s.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">{s.tag}</span>
              </div>
              <h4 className="text-xl font-bold mb-4">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-normal mb-8 flex-grow">{s.desc}</p>
              <Link to="/contact">
                <button className="text-[11px] font-bold uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-colors">
                  Explore Initiative <FaArrowRight size={10} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bonus Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="mt-10 md:mt-14 p-7 md:p-10 rounded-[28px] bg-gradient-to-br from-[#1A1A2E] to-transparent border border-white/10 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="text-left">
            <div className="text-purple-500 text-3xl mb-4 font-black">AI & Ops</div>
            <h4 className="text-2xl font-bold mb-2">Systems Integration.</h4>
            <p className="text-gray-400 text-sm font-medium">Deploy custom AI systems, automate operational workflows, and integrate digital platforms tailored for startups, SMEs, and enterprises.</p>
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

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
      title: 'AI Intelligence',
      desc: 'Autonomous agents and chatbots designed to capture leads 24/7 and eliminate repetitive manual tasks.',
      tag: 'Automation'
    },
    {
      icon: <FaCode />,
      title: 'MVP Engineering',
      desc: 'Rapid prototyping and full-stack development for startups. Go from concept to deployment in 14 days.',
      tag: 'Development'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Elite Web Ops',
      desc: 'High-conversion, premium websites built with modern frameworks and pixel-perfect design standards.',
      tag: 'Web Design'
    },
    {
      icon: <FaChartBar />,
      title: 'Growth Engines',
      desc: 'Strategic SEO, AEO, and automation systems engineered to compound your business revenue.',
      tag: 'Scale'
    }
  ]

  return (
    <section id="services" className="py-32 bg-[#05050F] text-white relative">
      <div className="absolute inset-0 bg-purple-600/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-24"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-6">Verticals</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Execution <span className="text-gray-800">Specialties.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-medium text-lg leading-relaxed">
            Everything you need to automate your operations and scale your revenue through specialized AI engineering.
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
                  Inquire Module <FaArrowRight size={10} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bonus Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="mt-24 p-12 rounded-[3.5rem] bg-gradient-to-br from-[#1A1A2E] to-transparent border border-white/10 flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div className="text-left">
            <div className="text-purple-500 text-3xl mb-4 font-black">75%</div>
            <h4 className="text-2xl font-bold mb-2">Efficiency Boost.</h4>
            <p className="text-gray-400 text-sm font-medium">Founders using our AI modules report massive reductions in manual overhead.</p>
          </div>
          <Link to="/pricing">
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">Explore Combo Packs</button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModules

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaBuilding, FaUserTie, FaMicrochip } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WhoItsFor = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const segments = [
    {
      icon: <FaRocket />,
      title: 'Startups & Founders',
      desc: 'Growing teams that need custom AI systems, rapid automation infrastructure, and operational support to scale consistently.',
      color: 'bg-purple-600/20 text-purple-400'
    },
    {
      icon: <FaBuilding />,
      title: 'SMEs & Mid-Market',
      desc: 'SMEs looking to eliminate operational bottlenecks, optimize CRM workflows, and integrate modern business intelligence platforms.',
      color: 'bg-blue-600/10 text-blue-400'
    },
    {
      icon: <FaUserTie />,
      title: 'Enterprises',
      desc: 'Corporate teams requiring legacy process modernization, enterprise-ready data automation, and custom workflow systems.',
      color: 'bg-green-600/10 text-green-400'
    },
    {
      icon: <FaMicrochip />,
      title: 'Strategic Partners',
      desc: 'Organizations, colleges, and ecosystems looking for custom technology implementation, talent access, and operational scaling.',
      color: 'bg-cyan-600/10 text-cyan-400'
    }
  ]

  return (
    <section id="who" className="py-14 md:py-20 bg-[#05050F] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-500 mb-6">Built For</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Startups, SMEs <span className="text-purple-500">& Enterprises.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-base md:text-lg leading-relaxed">
            The ecosystem supports teams that need AI systems, automation infrastructure, talent access, and execution support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {segments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-7 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-normal mb-8">{s.desc}</p>
              <div className="h-px w-10 bg-gray-800" />
            </motion.div>
          ))}
        </div>

        {/* Final Statement Block */}
        <div className="relative z-10 mt-10 md:mt-14 p-7 md:p-12 selection:bg-purple-500/30 rounded-[28px] bg-white text-black text-center">
          <h4 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">Choose Your Entry Point.</h4>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl mx-auto font-normal">
            Start with consulting, join Labs for skills, or enter Crucible to build with a founder community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="px-10 py-5 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">Start Services</button>
            </Link>
            <Link to="/pricing">
              <button className="px-10 py-5 bg-gray-100 text-black border border-gray-200 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white transition-all">View Pricing</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoItsFor

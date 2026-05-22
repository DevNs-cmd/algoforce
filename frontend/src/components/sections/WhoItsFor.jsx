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
      title: 'Businesses',
      desc: 'SMBs and enterprises that need AI consulting, automation, CRM, lead generation, and digital growth systems.',
      color: 'bg-purple-600/20 text-purple-400'
    },
    {
      icon: <FaBuilding />,
      title: 'Professionals',
      desc: 'Students, marketers, developers, analysts, and operators ready to learn AI through Labs cohorts and projects.',
      color: 'bg-blue-600/10 text-blue-400'
    },
    {
      icon: <FaUserTie />,
      title: 'Founders',
      desc: 'Builders entering Crucible for hackathons, community, incubation, mentorship, demo days, and funding readiness.',
      color: 'bg-green-600/10 text-green-400'
    },
    {
      icon: <FaMicrochip />,
      title: 'Partners',
      desc: 'Companies, colleges, sponsors, and investors looking for training, events, placements, and venture deal flow.',
      color: 'bg-cyan-600/10 text-cyan-400'
    }
  ]

  return (
    <section id="who" className="py-16 md:py-24 bg-[#05050F] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-500 mb-6">Built For</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
            Businesses, Talent <span className="text-purple-500">& Founders.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-medium text-lg leading-relaxed">
            The ecosystem is designed for everyone who touches AI growth: clients, learners, builders, sponsors, and investors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {segments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-12">{s.desc}</p>
              <div className="h-px w-10 bg-gray-800" />
            </motion.div>
          ))}
        </div>

        {/* Final Statement Block */}
        <div className="relative z-10 pt-10 md:pt-16 pb-12 md:pb-14 selection:bg-purple-500/30 rounded-[2.5rem] md:rounded-[3.5rem] bg-white text-black text-center">
          <h4 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Choose Your Entry Point.</h4>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto font-medium">
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

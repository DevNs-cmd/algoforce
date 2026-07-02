import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBolt, FaGraduationCap, FaRocket } from 'react-icons/fa'

const WhatIsAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const cards = [
    {
      icon: <FaBolt />,
      title: 'Enterprise AI & Automation',
      description: 'Our core operations delivering custom AI systems, database integration, custom software development, digital transformation, and n8n/Make automation platforms.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Talent Development Division',
      description: 'AlgoForce Labs is our strategic talent ecosystem, developing skilled developers and automation builders capable of maintaining enterprise integrations.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaRocket />,
      title: 'Startup Incubation Platform',
      description: 'Crucible functions as our incubation platform, helping early-stage founders build scalable MVPs, validate concepts, and run disciplined execution operations.',
      color: 'bg-green-100 text-green-600'
    }
  ]

  return (
    <section id="what-is" className="py-14 md:py-20 bg-white text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-14">
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Core Capabilities</h2>
              <h3 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Systems, Software & <span className="text-gray-300">Automation.</span>
              </h3>
            </div>
            <p className="text-lg text-gray-500 font-normal leading-relaxed max-w-md">
              We help organizations eliminate manual data entry, optimize legacy workflows, deploy intelligent agents, and scale business operations with custom technology.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="p-7 md:p-8 rounded-[24px] bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{card.title}</h4>
                <p className="text-gray-500 font-normal text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Enterprise Transformation block */}
          <div className="p-1 rounded-[28px] bg-gradient-to-br from-purple-500/20 to-transparent">
            <div className="bg-white rounded-[26px] p-7 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-white">
              <div className="flex-1">
                <h4 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Engineered for Measurable Business Outcomes.</h4>
                <p className="text-base md:text-lg text-gray-500 font-normal mb-8 leading-relaxed">
                  Our core engineering operations are designed to solve the scaling bottlenecks of modern Indian businesses. By coupling custom software development with workflow automation, we deliver secure, self-hosted technology infrastructures that save hours and secure your operations.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">13</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Core Services</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">100%</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">ROI Focused</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[400px] aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 blur-3xl" />
                <FaBolt className="text-8xl text-purple-200 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 max-w-4xl border-l-4 border-purple-600 pl-6 md:pl-10 py-4">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">Our Commitment</h4>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
              Most organizations know their scaling goals. Very few possess the custom software systems and automated workflows required to execute them consistently. AlgoForce AI builds those systems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce

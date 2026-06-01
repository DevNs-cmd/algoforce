import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBolt, FaCode, FaChartLine } from 'react-icons/fa'

const WhatIsAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const cards = [
    {
      icon: <FaBolt />,
      title: 'AlgoForce AI',
      description: 'Our core operations delivering enterprise AI systems, automation infrastructure, digital transformation, and custom business platforms.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <FaCode />,
      title: 'AlgoForce Labs',
      description: 'A strategic talent infrastructure platform developing execution-ready builders capable of deploying advanced operational workflows.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaChartLine />,
      title: 'Crucible',
      description: 'A strategic startup execution operating system helping founders scale operations and move efficiently from idea to execution.',
      color: 'bg-green-100 text-green-600'
    }
  ]

  const faqs = [
    { q: 'What is AlgoForce AI?', a: 'AlgoForce AI is a technology, AI, and execution infrastructure company. We help startups, SMEs, and enterprises automate operations, deploy intelligent systems, modernize legacy workflows, and execute faster at scale.' },
    { q: 'What does AlgoForce AI deliver?', a: 'We focus on execution outcomes: enterprise AI systems, workflow automation, operational intelligence, digital transformation, and custom business platforms that integrate seamlessly with your processes.' },
    { q: 'What is AlgoForce Labs?', a: 'Labs is our talent infrastructure platform. It develops execution-ready builders capable of deploying AI systems, automation workflows, and operational solutions for modern organizations.' },
    { q: 'What is Crucible?', a: 'Crucible is a strategic startup execution operating system. It helps founders move from ideas to execution through operational support, systems, talent, and accountability.' },
    { q: 'What is the long-term ecosystem vision?', a: 'We are building an ecosystem that unifies technology, talent, startups, and execution systems into a scalable operational infrastructure model, which includes initiatives like Velqora for performers and creators.' }
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
              <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">The Ecosystem</h2>
              <h3 className="text-4xl md:text-6xl font-bold leading-tight">
                Systems, Talent & <span className="text-gray-300">Execution.</span>
              </h3>
            </div>
            <p className="text-lg text-gray-500 font-normal leading-relaxed max-w-md">
              We help organizations execute faster, automate operations, deploy custom AI systems, and transform business processes into scalable engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                <p className="text-gray-500 font-normal leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 md:mt-14 p-1 rounded-[28px] bg-gradient-to-br from-purple-500/20 to-transparent">
            <div className="bg-white rounded-[26px] p-7 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-white">
              <div className="flex-1">
                <h4 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Engineered as an Operational Flywheel.</h4>
                <p className="text-base md:text-lg text-gray-500 font-normal mb-8 leading-relaxed">
                  Our core technology operations power strategic growth initiatives. Labs develops elite talent, Crucible nurtures high-execution startups, and Velqora optimizes creative systems, creating a self-sustaining operational loop.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">4</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Initiatives</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">Active</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Transformations</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[400px] aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 blur-3xl" />
                <FaBolt className="text-8xl text-purple-100 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 max-w-4xl border-l-4 border-purple-600 pl-6 md:pl-10 py-4">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Core Concept</h4>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
              Most organizations know what they want to achieve. Very few possess the systems required to execute consistently at scale. AlgoForce AI builds those systems.
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-12 text-center">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-8">
                  <h5 className="text-xl font-bold mb-4">{faq.q}</h5>
                  <p className="text-gray-500 font-normal leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce

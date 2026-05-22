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
      title: 'Services Engine',
      description: 'AlgoForce AI delivers consulting, lead generation, CRM systems, web and app builds, and AI automation for businesses.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <FaCode />,
      title: 'Talent Engine',
      description: 'AlgoForce Labs trains professionals through cohorts, certifications, capstones, apprenticeships, and placement pathways.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaChartLine />,
      title: 'Innovation Engine',
      description: 'Crucible brings founders into hackathons, incubator cohorts, demo days, investor rooms, and venture opportunities.',
      color: 'bg-green-100 text-green-600'
    }
  ]

  const faqs = [
    { q: 'What are the three parts of AlgoForce AI?', a: 'AlgoForce AI for services, AlgoForce Labs for education and talent, and Crucible for founders, hackathons, incubation, and venture pipeline.' },
    { q: 'What does AlgoForce AI Core do?', a: 'It provides AI consulting, lead generation, branding, web and app development, CRM implementation, and automation for businesses.' },
    { q: 'What is AlgoForce Labs?', a: 'Labs runs AI courses, live cohorts, certifications, apprenticeships, career tracks, and placement support for students and professionals.' },
    { q: 'What is Crucible?', a: 'Crucible is the founder ecosystem: hackathons, community, incubator cohorts, demo days, mentor access, and startup pipeline.' },
    { q: 'How does the business model work?', a: 'Revenue comes from retainers, projects, Labs cohorts, SaaS products, events, memberships, placements, corporate training, and venture upside.' }
  ]

  return (
    <section id="what-is" className="py-16 md:py-24 bg-white text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-16">
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">The Ecosystem</h2>
              <h3 className="text-5xl md:text-7xl font-black leading-[1] tracking-tighter">
                Services, Labs & <span className="text-gray-300">Crucible.</span>
              </h3>
            </div>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
              AlgoForce AI is a full-stack AI-powered growth ecosystem for businesses, professionals, and founders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="p-12 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h4 className="text-2xl font-black mb-4">{card.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 p-1 rounded-[3rem] bg-gradient-to-br from-purple-500/20 to-transparent">
            <div className="bg-white rounded-[2.9rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white">
              <div className="flex-1">
                <h4 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Engineered as a Flywheel.</h4>
                <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
                  Services revenue funds Labs. Labs creates talent. Crucible creates startups. Startups become clients, SaaS users, and portfolio upside.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">3</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Core Pillars</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">10+</div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Revenue Lines</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[400px] aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 blur-3xl" />
                <FaBolt className="text-8xl text-purple-100 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 max-w-4xl border-l-4 border-purple-600 pl-8 md:pl-12 py-4">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Institutional Profile</h4>
            <p className="text-2xl font-bold text-gray-900 leading-tight">
              AlgoForce AI combines premium AI consulting, AlgoForce Labs education, and Crucible founder incubation under one unified brand.
            </p>
          </div>

          <div className="mt-12 md:mt-20">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-12 text-center">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-8">
                  <h5 className="text-xl font-black mb-4 tracking-tight">{faq.q}</h5>
                  <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
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

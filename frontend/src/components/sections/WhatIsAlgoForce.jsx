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
      title: 'Precision Execution',
      description: 'We eliminate the friction between concept and deployment. Our systems are built for founders who demand speed.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <FaCode />,
      title: 'Studio Standards',
      description: 'Engineering excellence at every layer. We build software that performs, scales, and delivers value from Day 1.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaChartLine />,
      title: 'Revenue Obsessed',
      description: 'We don’t just ship code; we build machines that drive growth, capture leads, and automate revenue streams.',
      color: 'bg-green-100 text-green-600'
    }
  ]

  return (
    <section id="what-is" className="py-32 bg-white text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600 mb-6">The Methodology</h2>
              <h3 className="text-5xl md:text-7xl font-black leading-[1] tracking-tighter">
                Crafting the Future of <span className="text-gray-300">Software.</span>
              </h3>
            </div>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
              AlgoForce is a specialized execution studio. We partner with innovators to build products that define markets.
            </p>
          </div>

          {/* Cards */}
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

          {/* Big Visual Block */}
          <div className="mt-24 p-1 rounded-[3rem] bg-gradient-to-br from-purple-500/20 to-transparent">
            <div className="bg-white rounded-[2.9rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white">
              <div className="flex-1">
                <h4 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Engineered for Rapid Scaling.</h4>
                <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
                  Our internal toolset, including the <span className="text-black font-black">Nexus AI Engine</span>,
                  allows us to bypass traditional development bottlenecks and ship high-performance assets in record time.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">7-14</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">Day Launch</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-600">100%</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">IP Ownership</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[400px] aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 blur-3xl" />
                <FaBolt className="text-8xl text-purple-100 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce

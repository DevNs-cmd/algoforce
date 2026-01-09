import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaBuilding, FaUsers, FaLandmark } from 'react-icons/fa'

const WhoItsFor = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const segments = [
    {
      icon: <FaRocket className="w-12 h-12" />,
      title: 'Startups',
      subtitle: '$1M - $10M ARR',
      description: 'Move faster than competitors with AI-augmented operations. Build your intelligence moat from day one.',
      useCases: [
        'Revenue leak detection',
        'Automated customer intelligence',
        'Predictive churn prevention',
        'Sales process optimization'
      ],
      outcome: 'Scale without proportional headcount',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      icon: <FaBuilding className="w-12 h-12" />,
      title: 'Enterprises',
      subtitle: '$10M - $1B+ Revenue',
      description: 'Replace fragmented tools with unified intelligence. Turn data chaos into strategic advantage.',
      useCases: [
        'Enterprise-wide intelligence',
        'Multi-department coordination',
        'Complex workflow automation',
        'Compliance & audit trails'
      ],
      outcome: '10x decision velocity, zero data silos',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: 'Agencies',
      subtitle: 'Marketing, Consulting, Services',
      description: 'Deliver client results that compound. Your secret weapon for retention and referrals.',
      useCases: [
        'Client intelligence dashboard',
        'Campaign performance AI',
        'Automated reporting',
        'Client health scoring'
      ],
      outcome: 'Client LTV increases 3x',
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50'
    },
    {
      icon: <FaLandmark className="w-12 h-12" />,
      title: 'Governments',
      subtitle: 'Future-Ready Institutions',
      description: 'Public sector intelligence at private sector speed. Operational transparency meets predictive governance.',
      useCases: [
        'Citizen service optimization',
        'Resource allocation AI',
        'Fraud detection systems',
        'Policy impact modeling'
      ],
      outcome: 'Better outcomes, lower costs',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      badge: 'Coming Soon'
    }
  ]

  return (
    <section id="who-its-for" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Who It's <span className="gradient-text">For</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From fast-moving startups to global enterprises. If you make decisions that impact revenue, AlgoForce is built for you.
            </p>
          </div>

          {/* Segments Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className={`bg-gradient-to-br ${segment.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full`}>
                  {/* Badge if applicable */}
                  {segment.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                        {segment.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${segment.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {segment.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-3xl font-bold text-navy-900 mb-2">
                    {segment.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 mb-4">
                    {segment.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {segment.description}
                  </p>

                  {/* Use Cases */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-navy-900 mb-3 text-sm uppercase tracking-wide">
                      Key Use Cases
                    </h4>
                    <div className="space-y-2">
                      {segment.useCases.map((useCase, useCaseIndex) => (
                        <div key={useCaseIndex} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${segment.gradient}`} />
                          <span className="text-gray-700 text-sm">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className={`mt-6 pt-6 border-t border-gray-200`}>
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${segment.gradient} text-white text-sm font-semibold rounded-lg`}>
                      🎯 {segment.outcome}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Common Thread */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 glass-dark rounded-3xl p-12 text-white"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">
                What They All Have in Common
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Every organization that thrives with AlgoForce shares one characteristic: they recognize that competitive advantage in 2026 comes from compounding intelligence, not incremental tools.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl mb-3">🧠</div>
                  <h4 className="font-semibold mb-2">Think Long-Term</h4>
                  <p className="text-gray-300 text-sm">
                    Building moats, not checking boxes
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="font-semibold mb-2">Move Fast</h4>
                  <p className="text-gray-300 text-sm">
                    Speed is a competitive advantage
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl mb-3">📈</div>
                  <h4 className="font-semibold mb-2">Data-Driven</h4>
                  <p className="text-gray-300 text-sm">
                    Decisions backed by intelligence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-6">
              Not sure if AlgoForce is right for your organization?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Book a Strategy Call
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhoItsFor

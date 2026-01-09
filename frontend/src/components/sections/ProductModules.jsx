import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaSearchDollar, FaBrain, FaRocket, FaChartLine, FaCog } from 'react-icons/fa'

const ProductModules = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const modules = [
    {
      icon: <FaSearchDollar className="w-8 h-8" />,
      title: 'Revenue Leak Audit',
      description: 'Identifies hidden revenue losses across sales, operations, and customer retention. Real-time detection of pricing errors, churn signals, and missed opportunities.',
      benefits: [
        'Automated leak detection',
        'Priority-ranked insights',
        'ROI impact projections',
        'Actionable remediation steps'
      ],
      outcome: 'Average 23% revenue recovery in first 90 days',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: 'Intelligence Memory',
      description: 'Your business knowledge graph. Every interaction, decision, and outcome stored in a queryable, interconnected memory system. Institutional knowledge that never leaves.',
      benefits: [
        'Contextual search across all data',
        'Pattern recognition over time',
        'Team knowledge preservation',
        'Natural language queries'
      ],
      outcome: '10x faster insight discovery',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Decision Engine',
      description: 'Autonomous decision-making for revenue-critical actions. Pre-built playbooks and custom logic that executes faster than human teams.',
      benefits: [
        'Real-time decision automation',
        'Multi-factor optimization',
        'Risk-aware execution',
        'Human-in-loop controls'
      ],
      outcome: 'Decisions in seconds, not weeks',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Command Center',
      description: 'Single pane of glass for business intelligence. Real-time dashboards, predictive alerts, and natural language interaction with your data.',
      benefits: [
        'Unified intelligence view',
        'Predictive alerts',
        'Custom KPI tracking',
        'Voice/text commands'
      ],
      outcome: 'Complete visibility, zero data silos',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: <FaCog className="w-8 h-8" />,
      title: 'Automation Layer',
      description: 'Connects decisions to actions across your tech stack. Trigger workflows, update systems, and execute complex operations automatically.',
      benefits: [
        'Cross-platform automation',
        'Conditional workflows',
        'Error handling & rollback',
        'Audit trail & compliance'
      ],
      outcome: '90% reduction in manual tasks',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="product-modules" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Product <span className="gradient-text">Modules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five interconnected systems working as one. Each module amplifies the others, creating a compounding intelligence advantage.
            </p>
          </motion.div>

          {/* Modules Grid */}
          <div className="space-y-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Title & Description */}
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          {module.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-navy-900 mb-2">
                            {module.title}
                          </h3>
                          <div className={`inline-block px-4 py-1 bg-gradient-to-r ${module.gradient} text-white text-sm font-semibold rounded-full`}>
                            {module.outcome}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {module.description}
                      </p>
                    </div>

                    {/* Right: Benefits List */}
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-white rounded-2xl p-6 shadow-inner border border-gray-100">
                        <h4 className="font-semibold text-navy-900 mb-4 text-lg">
                          Key Capabilities
                        </h4>
                        <div className="space-y-3">
                          {module.benefits.map((benefit, benefitIndex) => (
                            <motion.div
                              key={benefitIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.15 + benefitIndex * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white flex-shrink-0 mt-0.5`}>
                                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium">
                                {benefit}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integration Note */}
          <motion.div
            variants={cardVariants}
            className="mt-16 glass-dark rounded-3xl p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              The Power is in the Integration
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              These modules don't work in isolation. They share intelligence, compound learnings, and create a business operating system that gets smarter every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="font-semibold">Unified Data Model</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="font-semibold">Cross-Module Intelligence</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="font-semibold">Compounding Returns</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModules

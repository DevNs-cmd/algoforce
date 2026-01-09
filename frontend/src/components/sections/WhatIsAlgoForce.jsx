import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaDatabase, FaCogs } from 'react-icons/fa'

const WhatIsAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: 'AI Operating System',
      description: 'Not just software. A living, learning intelligence layer that orchestrates your entire business operations.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: 'Business Memory',
      description: 'Every decision, every outcome, every pattern. Stored, indexed, and queryable. Your competitive intelligence moat.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <FaCogs className="w-8 h-8" />,
      title: 'Decision Engine',
      description: 'Real-time analysis → Predictive intelligence → Autonomous execution. From signal to action in milliseconds.',
      color: 'from-indigo-500 to-indigo-700'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
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
    <section id="what-is" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              What is <span className="gradient-text">AlgoForce</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AlgoForce is not another SaaS tool. It's the operating system layer between your data and decisions.
              It thinks, learns, and acts—autonomously.
            </p>
          </motion.div>

          {/* Main Explanation */}
          <motion.div
            variants={itemVariants}
            className="glass-dark rounded-3xl p-12 mb-16 text-white"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">The Intelligence Layer Your Business Needs</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Traditional software requires humans to interpret data, make decisions, and take action.
                  AlgoForce closes that loop.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Ingests</span> data from every business touchpoint
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Analyzes</span> patterns invisible to human teams
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Executes</span> revenue-critical actions autonomously
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Learns</span> from every outcome, compounding intelligence
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🧠</div>
                      <p className="text-xl font-semibold">Autonomous Intelligence</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Core Components */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual Flow */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-navy-50 to-purple-50 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-center text-navy-900 mb-12">
              Decision → Action → Outcome
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {['Data Input', 'AI Processing', 'Intelligent Action', 'Continuous Learning'].map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {index + 1}
                    </div>
                    <p className="font-semibold text-navy-900">{step}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block text-purple-400 text-3xl">→</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce

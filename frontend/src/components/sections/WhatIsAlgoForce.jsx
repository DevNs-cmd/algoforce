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
      title: 'AI Strategy',
      description: 'Custom roadmaps to integrate AI into your specific business workflows for maximum efficiency and growth.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <FaCogs className="w-8 h-8" />,
      title: 'Automation First',
      description: 'We replace repetitive manual tasks with intelligent automated workflows, saving hundreds of hours weekly.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: 'Growth Systems',
      description: 'From landing pages to complex SaaS MVPs, we build scalable digital assets that attract and convert customers.',
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
    <section id="about" className="py-24 bg-white">
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
              Why <span className="gradient-text">AlgoForce</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just build software. We build the intelligence infrastructure that powers your business growth.
              Our mission is to translate enterprise AI into specialized execution for every ambitious founder.
            </p>
          </motion.div>

          {/* Main Explanation */}
          <motion.div
            variants={itemVariants}
            className="glass-dark rounded-3xl p-12 mb-16 text-white"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">The High-Growth Engine Your Business Needs</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Traditional agencies stop at delivery. We stay for the results.
                  Our AI-driven systems are designed to:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Capture</span> every lead with 24/7 intelligent chatbots
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Optimize</span> workflows with custom business automation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Scale</span> digital presence with premium, high-speed websites
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Convert</span> more customers through data-driven SEO strategies
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
                      <div className="text-6xl mb-4">🚀</div>
                      <p className="text-xl font-semibold">Ready to Scale</p>
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

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../common/ScrollReveal'

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      number: '01',
      title: 'Business Assessment',
      description: 'We spend 1–2 weeks understanding your operations, mapping your workflows, and auditing your existing data systems. Then we recommend the right AlgoForce products for your business.',
      features: ['Workflow Mapping', 'Data Readiness Audit', 'Product Recommendation', 'ROI Forecast'],
      icon: '📋'
    },
    {
      number: '02',
      title: 'Product Implementation',
      description: 'Our team configures and integrates the selected products into your existing systems — CRM, ERP, WhatsApp, and databases. Your team is trained and goes live in 4–6 weeks.',
      features: ['Database Integration', 'Business Rule Config', 'Security Setup', 'Team Onboarding'],
      icon: '⚙️'
    },
    {
      number: '03',
      title: 'Monthly Subscription',
      description: 'Your team uses the products daily while we handle hosting, model updates, performance monitoring, and dedicated Customer Success support — all under one monthly plan.',
      features: ['Continuous Updates', 'Performance Monitoring', 'Customer Success', 'Priority Support'],
      icon: '📈'
    },
    {
      number: '04',
      title: 'Expand',
      description: 'As your business grows, add more AlgoForce products to the same platform. Your integrations carry over, your data compounds, and your subscription simply scales.',
      features: ['New Product Adoption', 'Shared Data Layer', 'Subscription Scaling', 'Cross-Product Insights'],
      icon: '🚀'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-navy-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={2} blurStrength={5}>
              <h2 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
                How <span className="gradient-text">customers get started.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four steps from first conversation to full deployment — and then continued expansion as your business grows.
              </p>
            </ScrollReveal>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 opacity-20" />

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Side */}
                  <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{step.icon}</span>
                        <div>
                          <span className="text-sm font-semibold text-purple-600">
                            STEP {step.number}
                          </span>
                          <h3 className="text-3xl font-bold text-navy-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {step.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-navy-800"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                    <motion.div
                      animate={{
                        y: [0, -15, 0]
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      <div className={`aspect-square bg-gradient-to-br ${
                        index % 2 === 0 ? 'from-purple-500/20 to-blue-500/20' : 'from-blue-500/20 to-purple-500/20'
                      } rounded-3xl backdrop-blur-sm border border-purple-500/30 p-8 flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="text-8xl mb-4 opacity-80">{step.icon}</div>
                          <div className="text-7xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {step.number}
                          </div>
                        </div>
                      </div>
                      {/* Decorative Elements */}
                      <motion.div
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute -top-4 -right-4 w-20 h-20 border-4 border-purple-500/30 rounded-full"
                      />
                    </motion.div>
                  </div>

                  {/* Center Dot for Timeline */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-center"
          >
            <div className="glass-dark rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                The first step is a Business Assessment. Our product team will map your operations and recommend exactly which AlgoForce products fit your business — no commitment required.
              </p>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-navy-900 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
                >
                  Request a Business Assessment
                </motion.button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks

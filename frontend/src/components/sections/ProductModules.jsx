import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaRocket, FaCog, FaSearchDollar, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductModules = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const modules = [
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: 'AI Chatbot Systems',
      description: 'Custom AI bots for Website and WhatsApp. From basic FAQ handlers to advanced lead generation systems with CRM integration.',
      benefits: [
        '24/7 Customer Support',
        'Automated Lead Qualification',
        'CRM & WhatsApp Integration',
        'Multi-language Support'
      ],
      outcome: '90% faster lead response time',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Voice AI Receptionist',
      description: 'AI-powered voice bots that handle incoming calls, schedule appointments, and qualify leads with human-like natural language.',
      benefits: [
        'Zero Missed Calls',
        'Automated Appointment Booking',
        'Lead Information Capture',
        'Seamless Human Handoff'
      ],
      outcome: '100% call handling efficiency',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaCog className="w-8 h-8" />,
      title: 'Business Automation',
      description: 'End-to-end automation of your emails, CRM workflows, and daily operations. Eliminate manual copy-pasting forever.',
      benefits: [
        'Automated Email Sequences',
        'CRM Data Synchronization',
        'Custom Workflow Triggers',
        'Detailed Analytics Tracking'
      ],
      outcome: 'Save 40+ hours of manual work weekly',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <FaSearchDollar className="w-8 h-8" />,
      title: 'Web & App Development',
      description: 'Premium, high-speed websites and MVP applications built to convert visitors into high-paying clients.',
      benefits: [
        'Animated Landing Pages',
        'E-commerce Scalability',
        'Mobile-First Design',
        'SEO-Ready Architecture'
      ],
      outcome: '3x higher visitor conversion rates',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Growth & SEO / AEO',
      description: 'Dominate search results and AI-search engines (GEO/AEO). We position your brand where your customers are looking.',
      benefits: [
        'Local SEO Optimization',
        'AI Search Engine Visibility',
        'High-Quality Backlink Strategy',
        'Content Conversion Analysis'
      ],
      outcome: '200% increase in organic traffic',
      gradient: 'from-green-500 to-teal-500'
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
    <section id="services" className="py-24 bg-white">
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
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate your operations and scale your revenue. Choose a service or go for our specialized combo packs.
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
                          Expert Solutions
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

          {/* CTA Note */}
          <motion.div
            variants={cardVariants}
            className="mt-16 glass-dark rounded-3xl p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              Not sure where to start?
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              Book a free consultation and we'll audit your business to find the best automation opportunities for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pricing" className="px-8 py-4 bg-purple-600 rounded-xl font-bold hover:bg-purple-700 transition-all">
                Check Combo Packs
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white text-navy-900 rounded-xl font-bold hover:bg-gray-100 transition-all">
                Book Free Audit
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModules

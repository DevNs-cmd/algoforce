import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheck, FaArrowRight } from 'react-icons/fa'

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Revenue Leak Audit',
      price: '$129',
      duration: 'One-time',
      description: 'Discover hidden revenue losses and get a prioritized action plan.',
      features: [
        'Complete business intelligence audit',
        'Revenue leak detection & quantification',
        'Priority-ranked opportunity list',
        'Custom remediation playbook',
        '90-day implementation roadmap',
        'Executive presentation deck'
      ],
      cta: 'Schedule Audit',
      highlight: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'AlgoForce OS Setup',
      price: '$199',
      duration: 'One-time',
      description: 'Full implementation and customization for your business.',
      features: [
        'Everything in Audit',
        'Complete AlgoForce installation',
        'Custom module configuration',
        'Data source integration',
        'Team training & onboarding',
        'First 3 months included',
        'Dedicated success manager',
        'Priority support'
      ],
      cta: 'Get Started',
      highlight: true,
      color: 'from-purple-500 to-indigo-500',
      badge: 'Most Popular'
    },
    {
      name: 'Monthly Intelligence',
      price: '$59',
      duration: 'per month',
      description: 'Ongoing optimization, learning, and strategic support.',
      features: [
        'Continuous system optimization',
        'Monthly intelligence reports',
        'New module deployments',
        'Expanding integrations',
        'Strategic consulting hours',
        'Priority feature requests',
        'Quarterly business reviews',
        'Unlimited support'
      ],
      cta: 'Subscribe',
      highlight: false,
      color: 'from-green-500 to-teal-500'
    }
  ]

  const faqs = [
    {
      question: 'Is this just another SaaS subscription?',
      answer: 'No. AlgoForce is an operating system, not a tool. It learns your business, compounds intelligence, and becomes irreplaceable over time. The longer you use it, the more valuable it becomes.'
    },
    {
      question: 'What\'s the typical ROI timeline?',
      answer: 'Most clients recover their initial investment within 90 days through revenue leak remediation alone. Long-term value comes from compounding intelligence and decision velocity.'
    },
    {
      question: 'Do we need technical expertise to use AlgoForce?',
      answer: 'No. We handle all technical implementation. Your team interacts through natural language commands and visual dashboards. It\'s built for business operators, not engineers.'
    },
    {
      question: 'Can we integrate with our existing systems?',
      answer: 'Yes. AlgoForce connects to all major platforms: CRMs, ERPs, analytics tools, communication systems, and custom APIs. If it has data, we can integrate it.'
    },
    {
      question: 'What if we want to cancel?',
      answer: 'There are no long-term contracts for monthly service. However, most clients don\'t cancel—the switching cost increases over time as AlgoForce learns your business. You own your data and intelligence.'
    },
    {
      question: 'Is this suitable for startups or just enterprises?',
      answer: 'Both. Startups benefit from AI-augmented operations without proportional headcount. Enterprises benefit from unified intelligence across departments. We serve $1M to $1B+ organizations.'
    }
  ]

  return (
    <>
    <Helmet>
      <title>AlgoForce Pricing – AI Business OS & Revenue Intelligence</title>
      <meta
        name="description"
        content="Explore AlgoForce pricing for AI-powered revenue intelligence, audits, enterprise OS setup, and ongoing optimization."
      />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href="https://algoforceaii.com/pricing"
      />

      {/* Open Graph */}
      <meta property="og:title" content="AlgoForce Pricing – AI Business OS & Revenue Intelligence" />
      <meta
        property="og:description"
        content="Explore AlgoForce pricing for AI-powered revenue intelligence, audits, enterprise OS setup, and ongoing optimization."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AlgoForce AI" />
      <meta property="og:url" content="https://algoforceaii.com/pricing" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AlgoForce Pricing – AI Business OS & Revenue Intelligence" />
      <meta
        name="twitter:description"
        content="Explore AlgoForce pricing for AI-powered revenue intelligence, audits, enterprise OS setup, and ongoing optimization."
      />
    </Helmet>
    
    <div className="min-h-screen pt-24 bg-gradient-to-b from-navy-50 to-white">
      {/* Hero Section */}
      <section className="py-16 text-white bg-gradient-to-br from-navy-900 via-purple-900 to-navy-900">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Pricing & <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Consulting</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              Premium positioning for premium results. This is not a $99/month SaaS tool. 
              This is enterprise-grade intelligence infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                  tier.highlight ? 'border-4 border-purple-500 md:-mt-8' : 'border border-gray-200'
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${tier.color} text-white text-center py-2 font-semibold text-sm`}>
                    {tier.badge}
                  </div>
                )}

                <div className={`p-8 ${tier.badge ? 'pt-16' : ''}`}>
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="mb-2 text-2xl font-bold text-navy-900">
                      {tier.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-navy-900">
                        {tier.price}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {tier.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-white flex-shrink-0 mt-0.5`}>
                          <FaCheck size={12} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                        tier.highlight
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-navy-900 text-white hover:bg-navy-800'
                      }`}
                    >
                      {tier.cta}
                      <FaArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="p-12 mt-16 text-center text-white glass-dark rounded-3xl"
          >
            <h3 className="mb-4 text-3xl font-bold">
              Enterprise & Government Solutions
            </h3>
            <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-300">
              Multi-department deployments, custom compliance requirements, or specialized integrations? 
              We build bespoke solutions for organizations with unique needs.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold transition-all bg-white rounded-lg text-navy-900 hover:shadow-xl"
              >
                Contact for Custom Pricing
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 text-4xl font-bold text-center md:text-5xl text-navy-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 border border-purple-100 shadow-lg bg-gradient-to-br from-white to-purple-50 rounded-2xl"
                >
                  <h3 className="mb-3 text-xl font-bold text-navy-900">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-navy-50 to-white">
        <div className="max-w-4xl px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl text-navy-900">
              Ready to Build Your Intelligence Moat?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Book a consultation to discuss your specific needs and see if AlgoForce is the right fit.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-white transition-all bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 hover:shadow-purple-500/50"
              >
                Book Consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Pricing

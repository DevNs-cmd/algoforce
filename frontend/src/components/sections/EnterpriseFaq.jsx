import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChevronDown } from 'react-icons/fa'

const FAQs = [
  {
    q: 'What does AlgoForce do?',
    a: 'AlgoForce is an Enterprise AI Software Company. We deploy ready-to-use products that automate finance, sales, HR, manufacturing, hospitality, knowledge and operational workflows.'
  },
  {
    q: 'What kind of company is AlgoForce?',
    a: 'We are a product company, not an AI agency or custom software house. You subscribe to a proven software product; we deploy, integrate, maintain and support it.'
  },
  {
    q: 'How do we know which product is right for us?',
    a: 'Start with a product demo. We will show the relevant use case, discuss the systems and workflow involved, and recommend a deeper discovery only if there is a clear fit.'
  },
  {
    q: 'Do you offer custom software development or consulting?',
    a: 'No. We do not begin with a blank build. AlgoForce deploys productized software around your operational requirements and existing technology environment.'
  },
  {
    q: 'Does AlgoForce replace our current software?',
    a: 'No. The goal is to automate work around the systems you already use. Depending on the product, we can integrate with platforms such as Tally, SAP, Zoho, Salesforce, WhatsApp and your internal data sources.'
  },
  {
    q: 'What is AlgoForce Finance AI?',
    a: 'AlgoForce Finance AI automates accounting work without replacing Tally. It is powered by Tally integration and is designed to reduce reconciliation effort while helping teams surface exceptions sooner.'
  },
  {
    q: 'What happens after a demo?',
    a: 'When a product fit is confirmed, we run a focused discovery call and business assessment, then share a proposal covering scope, integrations, deployment timeline and support.'
  },
  {
    q: 'What industries does AlgoForce serve?',
    a: 'Our product catalog is relevant to manufacturing, healthcare, hotels, CA firms, retail, education, construction, logistics and professional services. We begin with the operational workflow rather than a generic industry pitch.'
  },
  {
    q: 'How long does deployment take?',
    a: 'The timeline depends on the product, integrations, data readiness and deployment environment. Your proposal will define the rollout plan, validation approach and team training requirements.'
  },
  {
    q: 'How is business data handled?',
    a: 'Deployment is designed around the operating environment and data requirements of your business. Secure private-cloud and on-premises options can be considered as part of discovery.'
  },
  {
    q: 'How does pricing work?',
    a: 'Pricing is based on the software product, deployment scope, integrations, security requirements and ongoing support. We provide a proposal after the demo and discovery conversation.'
  },
  {
    q: 'How do we book a demo?',
    a: 'Use the Book a Demo button or contact page to speak with a product specialist. We will route the conversation to the product and business function most relevant to you.'
  }
]

const EnterpriseFaq = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [activeIndex, setActiveIndex] = useState(null)

  const toggleIndex = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx)
  }

  return (
    <section ref={ref} id="faq" className="py-16 md:py-24 bg-white text-black relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">FAQ</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight">
            Frequently Asked <span className="premium-serif italic font-normal text-purple-600">Questions</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-500 font-normal text-sm md:text-base mt-4">
            Everything you need to know about choosing, deploying and supporting AlgoForce software.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQs.map((faq, idx) => {
            const isOpen = activeIndex === idx
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.03 }}
                className="border-b border-gray-100 pb-4"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                >
                  <span className="font-bold text-base md:text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {faq.q}
                  </span>
                  <span className={`text-purple-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ml-4 flex-shrink-0`}>
                    <FaChevronDown size={14} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed pb-4 pt-1 font-normal">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EnterpriseFaq

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChevronDown } from 'react-icons/fa'

const FAQs = [
  {
    q: "What does AlgoForce do?",
    a: "AlgoForce builds AI software products for business operations. We deploy pre-built AI copilots — like TallyGPT, GST Autopilot, LeadBolt, and HR Copilot — that automate core business functions and run on a monthly subscription model."
  },
  {
    q: "What kind of company is AlgoForce?",
    a: "AlgoForce is an AI software company. We build specialized, repeatable AI products designed to run business operations under a subscription model — not custom consulting or agency work."
  },
  {
    q: "Where is AlgoForce headquartered?",
    a: "AlgoForce is headquartered in Kalkaji, South East Delhi, New Delhi - 110019, India. We deploy AI products to businesses across India."
  },
  {
    q: "Do you offer custom software development or consulting?",
    a: "No. AlgoForce is not an AI consulting agency or software house. Instead, we follow a productized implementation and subscription model: we conduct a Business Assessment to select the right pre-built AI Copilot, implement it for your business, and provide it as an ongoing subscription."
  },
  {
    q: "How do specialized AI copilots improve operations?",
    a: "By deploying specialized copilots for finance, sales, HR, or inventory, businesses can automate administrative tasks, preserve internal memory, sync data in real time, and scale operations without increasing headcount."
  },
  {
    q: "What are business AI copilots?",
    a: "AI copilots are specialized products built to solve one operational business problem (e.g. TallyGPT for accounting, GST Autopilot for tax matching). They integrate with your databases to automate workflows and drive decision-making."
  },
  {
    q: "Why should businesses subscribe to an AI operating layer?",
    a: "Subscribing to our AI operating layer gives your business access to continuously updated, secure, and production-ready AI products with native CRM/ERP integrations, backed by dedicated Customer Success and ongoing renewals."
  },
  {
    q: "What industries does AlgoForce serve?",
    a: "We build AI products for Manufacturing (FactoryGPT), Hospitality (HotelGPT), Finance (TallyGPT & GST Autopilot), Sales (LeadBolt), HR, and Inventory operations."
  },
  {
    q: "What is the Business Assessment?",
    a: "Our Business Assessment is the first step in our model. We analyze your workflows, identify operational leaks, and recommend the best pre-built AI Copilots to automate your business functions."
  },
  {
    q: "How do your products integrate with CRM systems?",
    a: "Our products feature built-in connection layers for Salesforce, Zoho, and other CRMs. For example, LeadBolt qualifies leads and updates CRM tables in real time without manual copy-pasting."
  },
  {
    q: "Do your products connect with Tally or legacy ERPs?",
    a: "Yes. Products like TallyGPT and GST Autopilot connect directly with Tally Prime and legacy ERP systems like SAP to reconcile ledgers, match tax credits, and provide real-time dashboards."
  },
  {
    q: "What is the timeline for AI Copilot implementation?",
    a: "Configuration and implementation typically take 4 to 6 weeks. This includes mapping your business rules, connecting the product to your databases, conducting validation runs, and training your team."
  },
  {
    q: "How does LeadBolt handle customer acquisition?",
    a: "LeadBolt uses official WhatsApp and web channels to engage incoming leads 24/7, qualify prospect needs, record details directly into your CRM database, and schedule sales meetings autonomously."
  },
  {
    q: "What is the HR Copilot?",
    a: "HR Copilot is a specialized enterprise product that serves as an internal knowledge operating layer, allowing team members to securely extract onboarding info, policies, and files instantly."
  },
  {
    q: "Is business data secure with AlgoForce products?",
    a: "Yes. Security and data privacy are core product features. We support secure, self-hosted deployments on your private cloud (AWS, Azure) so your proprietary corporate memory is 100% private."
  },
  {
    q: "How does AlgoForce deliver business outcomes?",
    a: "We focus on operational business outcomes: eliminating manual bookkeeping delays, preventing compliance tax credit leakage, reducing lead response times, and automating routine operations."
  },
  {
    q: "Why subscribe instead of hiring an agency?",
    a: "Agencies and software houses build custom code from scratch, which is slow and expensive. Subscribing to AlgoForce provides pre-built, tested enterprise AI products that integrate instantly, receive continuous updates, and include dedicated Customer Success."
  },
  {
    q: "What is the role of AlgoForce Labs?",
    a: "AlgoForce Labs is our talent engine. Top developers and product engineers learn by building real enterprise AI products, providing us with a pipeline of deployment-ready talent to support your implementation."
  },
  {
    q: "What is Crucible?",
    a: "Crucible is our Startup Execution Platform. It acts as a Startup Operating System that helps founders validate ideas, build MVPs, launch, find technical teams, and scale real products."
  },
  {
    q: "How do we request a Business Assessment?",
    a: "You can request a Business Assessment through our contact page. Our product team will coordinate with you to evaluate your workflows and identify the right AI Copilot for your business."
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
            Find answers to common questions about our custom AI systems, integration pipelines, local presence, and pricing.
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQs.map((faq, idx) => {
            const isOpen = activeIndex === idx
            return (
              <motion.div
                key={idx}
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

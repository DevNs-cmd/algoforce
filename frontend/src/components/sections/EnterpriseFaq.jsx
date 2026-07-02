import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChevronDown } from 'react-icons/fa'

const FAQs = [
  {
    q: "What does AlgoForce AI do?",
    a: "AlgoForce AI is a premier Enterprise AI Company in India. We design and build custom AI software, deploy autonomous AI agents, build CRM/ERP integrations, and automate business processes to reduce manual work, eliminate leaks, and drive measurable ROI."
  },
  {
    q: "What is an Enterprise AI Company?",
    a: "An Enterprise AI Company specializes in designing, building, and integrating custom artificial intelligence systems, databases, and automated workflows directly into business operations to replace manual processes."
  },
  {
    q: "Where is AlgoForce AI headquartered?",
    a: "AlgoForce AI is headquartered in Kalkaji, South East Delhi, New Delhi - 110019, India. We serve clients across all of India and globally."
  },
  {
    q: "Do you offer AI consulting services in India?",
    a: "Yes, AlgoForce AI is a leading AI Consulting Company in India. We provide strategic generative AI advisory, system architecture design, technology stack mapping, and ROI discovery audits."
  },
  {
    q: "How can business process automation reduce manual work?",
    a: "By automating manual workflows (e.g. using n8n, Make), synchronizing CRM/ERP data, sending auto-replies via WhatsApp, and deploying AI assistants, businesses can eliminate administrative tasks and save hundreds of employee hours."
  },
  {
    q: "What are AI agents for business?",
    a: "AI agents are autonomous software assistants configured to handle complex business operations, such as answering client support tickets, qualifying leads, reading files, and executing API calls without human intervention."
  },
  {
    q: "How does custom software development benefit SMEs in Delhi?",
    a: "Custom software development solves specific bottlenecks unique to your business. Unlike generic SaaS subscriptions, it integrates with your existing workflows, carries no per-seat licensing costs, and builds a permanent digital asset."
  },
  {
    q: "What industries does AlgoForce AI serve?",
    a: "We build custom systems for Manufacturing, Healthcare, Hotels, Retail, Education, and SMEs. We adapt our enterprise architectures to fit the workflows and regulatory compliance of each industry."
  },
  {
    q: "What is your AI readiness audit?",
    a: "Our AI readiness audit is a 1-2 week technical evaluation. We map your workflows, detect operational data leaks, assess data readiness, and outline a high-ROI roadmap for deploying automation."
  },
  {
    q: "How do you integrate AI with CRM systems like Salesforce or Zoho?",
    a: "We connect CRM software via secure webhooks, custom endpoints, and automation middleware. We enable automatic lead scoring, instant WhatsApp updates, database synching, and automated quotation generators."
  },
  {
    q: "Can you connect AI systems with legacy ERP systems?",
    a: "Yes. We design secure database bridges and middleware APIs to interface with legacy ERP software like SAP, Tally, or Microsoft Dynamics, enabling real-time dashboards and automated analytics."
  },
  {
    q: "What is the implementation timeline for custom AI software?",
    a: "Implementation typically takes 4 to 8 weeks. This includes system mapping, pipeline design, API integration, data testing, user acceptance testing, and team training."
  },
  {
    q: "How does WhatsApp automation improve lead capture?",
    a: "By using the official WhatsApp Cloud API, we build automated chat engines that interact with incoming leads 24/7, record interest details directly into your CRM, and schedule callback consultations instantly."
  },
  {
    q: "What are internal AI assistants?",
    a: "Internal AI assistants are secure, company-hosted chatbots that allow employees to search corporate documentation, HR policies, sales collateral, and past project guidelines securely using RAG technology."
  },
  {
    q: "Is business data secure with AlgoForce AI?",
    a: "Yes. Data security is our core pillar. We use end-to-end encryption, secure APIs, and can deploy open-source models (like Llama-3 or Mistral) on private self-hosted cloud servers so your data never leaves your control."
  },
  {
    q: "How does AlgoForce AI measure ROI?",
    a: "We track clear operational metrics: reduction in manual hours, decrease in data entry errors, improvement in response times for customer inquiries, and direct cost savings from replacing legacy per-seat licensing."
  },
  {
    q: "What is the difference between AlgoForce AI and a traditional software vendor?",
    a: "Traditional vendors build software specs exactly as written. AlgoForce AI operates as a strategic consulting and engineering partner, evaluating your business leaks, designing workflows, and supporting deployment for measurable ROI."
  },
  {
    q: "What is the role of AlgoForce Labs?",
    a: "AlgoForce Labs is our Talent Development Division. It trains developers and operational specialists on advanced AI systems and automation tools, creating a continuous talent pool for deployment."
  },
  {
    q: "What is Crucible?",
    a: "Crucible is our Startup Incubation Platform. It helps early-stage founders scale their workflows, build MVPs, and manage investor relations using structured software and execution routines."
  },
  {
    q: "How can we book a free AI consultation?",
    a: "You can book a consultation directly through our contact page by requesting a Discovery Call, AI Assessment, or Enterprise Quote. Our engineering team will reach out within 24 hours to schedule the session."
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

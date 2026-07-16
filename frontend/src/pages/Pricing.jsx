import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  FaArrowRight,
  FaSearch,
  FaCogs,
  FaRegCalendarAlt,
  FaCheck,
  FaBuilding,
  FaDatabase,
  FaUsers,
  FaCloud,
  FaShieldAlt,
  FaHeadset,
  FaPlug,
  FaWhatsapp,
  FaClock,
  FaFileAlt,
  FaChartBar
} from 'react-icons/fa'

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const investmentFactors = [
    { icon: <FaBuilding />, label: 'Business size' },
    { icon: <FaUsers />, label: 'Number of users' },
    { icon: <FaDatabase />, label: 'Database complexity' },
    { icon: <FaPlug />, label: 'ERP integrations' },
    { icon: <FaChartBar />, label: 'CRM integrations' },
    { icon: <FaWhatsapp />, label: 'WhatsApp integrations' },
    { icon: <FaCogs />, label: 'Custom workflows' },
    { icon: <FaCloud />, label: 'Private cloud requirements' },
    { icon: <FaShieldAlt />, label: 'Compliance requirements' },
    { icon: <FaFileAlt />, label: 'Number of AI products' },
    { icon: <FaHeadset />, label: 'Support SLA' },
  ]

  const includedItems = [
    'Business Assessment',
    'Deployment Planning',
    'Implementation',
    'Training',
    'Go-live Support',
    'Documentation',
    'Customer Success',
    'Updates',
    'Monitoring',
  ]

  const faqs = [
    {
      q: "How much does implementation cost?",
      a: "Every deployment is different. Implementation depends on business size, integrations, deployment scope and security requirements. A detailed proposal is prepared after the Business Assessment."
    },
    {
      q: "How much is the monthly subscription?",
      a: "Subscription depends on products deployed, hosting model, AI usage, support plan and security requirements. Pricing is shared after implementation planning."
    },
    {
      q: "Can I get an estimate?",
      a: "Yes. Book a Business Assessment and our team will prepare a deployment proposal with a detailed scope and investment breakdown."
    },
    {
      q: "Can small businesses work with AlgoForce?",
      a: "Yes. We work with startups, SMEs and larger organizations. Recommendations are based on operational complexity rather than company size."
    }
  ]

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#06101d] font-sans pb-20">
      <Helmet>
        <title>Pricing | AlgoForce</title>
        <meta name="description" content="AlgoForce pricing is determined after a Business Assessment. Every deployment is scoped to your business size, integrations, and security requirements." />
        <link rel="canonical" href="https://www.algoforceaii.com/pricing" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200 pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-purple-100/40 blur-[100px]" />
          <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-indigo-100/40 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/60 px-4 py-1.5 text-[10px] font-bold text-purple-700 mb-6 uppercase tracking-widest">
              Pricing
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-gray-900 mb-6">
              Assessment → Implementation →{' '}
              <span className="premium-serif italic font-normal text-purple-600">Subscription.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-gray-500 mb-4 font-normal">
              Every deployment is different.
            </p>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-400 mb-10 font-normal">
              Your Business Assessment determines the final implementation scope, deployment effort and ongoing operational support.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md"
            >
              Book Business Assessment <FaArrowRight size={11} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── How Pricing Works ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">How it works</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">How Pricing Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaSearch />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 01</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-4">Business Assessment</h3>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Understand operations</li>
                <li>Review systems</li>
                <li>Map workflows</li>
                <li>Identify automation opportunities</li>
                <li>Recommend products</li>
                <li>Deliver implementation roadmap</li>
              </ul>
              <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-purple-100 text-purple-600 items-center justify-center text-[10px]">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaCogs />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 02</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-4">Implementation</h3>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Configure products</li>
                <li>Connect databases</li>
                <li>Build integrations</li>
                <li>Validate workflows</li>
                <li>Deploy production environment</li>
              </ul>
              <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-purple-100 text-purple-600 items-center justify-center text-[10px]">→</div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaRegCalendarAlt />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 03</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-4">Subscription</h3>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Cloud hosting</li>
                <li>AI model maintenance</li>
                <li>Security updates</li>
                <li>Performance monitoring</li>
                <li>Customer Success</li>
                <li>Continuous improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Determines Investment ── */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Scope</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">What Determines Investment</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {investmentFactors.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200/60 text-xs font-semibold text-gray-700">
                <span className="text-purple-500 text-sm flex-shrink-0">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Included In Every Deployment ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Standard</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">Included In Every Deployment</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {includedItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-4 bg-gray-50 rounded-2xl border border-gray-200/60 text-xs font-semibold text-gray-700">
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="w-2 h-2 text-purple-700" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Assessment CTA ── */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Start here</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-6">Business Assessment</h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed mb-3 max-w-xl mx-auto">
            Every engagement begins with a Business Assessment.
          </p>
          <p className="text-sm text-gray-500 font-normal leading-relaxed mb-3 max-w-xl mx-auto">
            The assessment identifies operational bottlenecks, reviews your existing systems, recommends the right AI products, and produces a deployment roadmap.
          </p>
          <p className="text-xs text-gray-400 font-normal leading-relaxed mb-10 max-w-xl mx-auto">
            For qualified businesses, the assessment fee may be credited toward implementation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md"
          >
            Book Business Assessment <FaArrowRight size={11} />
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:text-purple-700 transition-colors focus:outline-none"
                  >
                    <span className="text-sm md:text-base">{faq.q}</span>
                    <span className="text-xl ml-4 font-normal text-gray-400">{isOpen ? "−" : "+"}</span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs md:text-sm text-gray-500 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Pricing

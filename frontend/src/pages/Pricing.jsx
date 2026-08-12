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
  FaHeadset,
  FaPlug
} from 'react-icons/fa'
import { trackCTAClick } from '../utils/analytics'

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const investmentFactors = [
    { icon: <FaBuilding />, label: 'Workflow complexity & scope' },
    { icon: <FaUsers />, label: 'Number of active users / teams' },
    { icon: <FaDatabase />, label: 'Existing software environment' },
    { icon: <FaPlug />, label: 'Required integrations (Tally, ERP, CRM)' },
    { icon: <FaCloud />, label: 'Deployment environment & security rules' },
    { icon: <FaHeadset />, label: 'Ongoing managed support level' },
  ]

  const includedItems = [
    'Workflow Assessment & Scoping',
    'Deployment Architecture Plan',
    'System & Database Integration',
    'Team Training & Onboarding',
    'Go-Live Validation',
    'Operational Documentation',
    'Ongoing Model & Managed Support',
    'Security Audits & Monitoring',
    'Continuous Workflow Improvement',
  ]

  const faqs = [
    {
      q: "How is pricing determined?",
      a: "Pricing depends on your specific workflow scope, existing software stack, required integrations, deployment environment, and ongoing support level. A tailored proposal is provided following your Workflow Assessment."
    },
    {
      q: "What is included in Managed AI Operations?",
      a: "Managed support covers cloud or server hosting, continuous model updates, operational monitoring, exception handling, and dedicated customer success support under a predictable service agreement."
    },
    {
      q: "Can we start with a single workflow before scaling?",
      a: "Yes. Our commercial relationship model is built on LAND -> PROVE -> EXPAND. We validate performance and ROI on one workflow first before extending automation across adjacent teams."
    },
    {
      q: "Is there a free trial or do you run paid pilots?",
      a: "We implement focused paid pilots for qualified operational scopes. This ensures full system integration, security validation, and measured performance proof before long-term commitment."
    }
  ]

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#06101d] font-sans pb-20">
      <Helmet>
        <title>Pricing & Commercial Model | AlgoForce</title>
        <meta
          name="description"
          content="AlgoForce pricing depends on workflow scope, integrations, deployment requirements, and ongoing support. Book a Workflow Assessment to receive a tailored proposal."
        />
        <link rel="canonical" href="https://www.algoforceaii.com/pricing" />
      </Helmet>

      {/* Hero */}
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
              Commercial Model
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-gray-900 mb-6">
              Assessment → Pilot → Deployment →{' '}
              <span className="premium-serif italic font-normal text-purple-600">Managed Service.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-gray-700 mb-4 font-bold">
              Pricing depends on workflow scope, integrations, deployment requirements and ongoing support.
            </p>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-500 mb-10 font-normal">
              We do not publish arbitrary fixed pricing because every deployment is scoped to your specific operational environment, software integrations, and security rules.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact?type=assessment"
                onClick={() => trackCTAClick('Book Workflow Assessment', '/contact?type=assessment', 'pricing_hero')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md w-full sm:w-auto"
              >
                Book a Workflow Assessment <FaArrowRight size={11} />
              </Link>
              <Link
                to="/contact?type=demo"
                onClick={() => trackCTAClick('Book a Demo', '/contact?type=demo', 'pricing_hero')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-bold text-gray-800 transition-all hover:bg-gray-50 shadow-sm w-full sm:w-auto"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Commercial Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">How Commercial Engagements Work</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaSearch />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 01</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">Workflow Assessment</h3>
              <p className="text-xs text-purple-600 font-bold mb-4">Identify and prioritize high-value bottlenecks.</p>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Map manual tasks & handoffs</li>
                <li>Audit software compatibility</li>
                <li>Define automation scope</li>
                <li>Deliver implementation proposal</li>
              </ul>
              <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-purple-100 text-purple-600 items-center justify-center text-[10px]">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaCogs />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 02</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">Paid Pilot & Rollout</h3>
              <p className="text-xs text-purple-600 font-bold mb-4">Validate accuracy before enterprise scale.</p>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Configure solution components</li>
                <li>Connect database integrations</li>
                <li>Validate output correctness</li>
                <li>Measure operational impact</li>
              </ul>
              <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-purple-100 text-purple-600 items-center justify-center text-[10px]">→</div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-[26px] bg-gray-50 border border-gray-200/60">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-6">
                <FaRegCalendarAlt />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Step 03</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">Managed AI Operations</h3>
              <p className="text-xs text-purple-600 font-bold mb-4">Continuous operation and support.</p>
              <ul className="space-y-2.5 text-xs text-gray-500 font-normal">
                <li>Managed cloud or server hosting</li>
                <li>Proactive model updates</li>
                <li>Exception tracking & oversight</li>
                <li>Expand to adjacent workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Determines Investment */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Cost Factors</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">What Scopes Your Investment</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {investmentFactors.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200/60 text-xs font-semibold text-gray-700">
                <span className="text-purple-600 text-sm flex-shrink-0">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included In Every Deployment */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Standard Delivery</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">Included In Every Engagement</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {includedItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-4 bg-gray-50 rounded-2xl border border-gray-200/60 text-xs font-semibold text-gray-800">
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="w-2.5 h-2.5 text-purple-700" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Get Started</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-6">Discuss Your Workflow Scope</h2>
          <p className="text-sm text-gray-600 font-normal leading-relaxed mb-8 max-w-xl mx-auto">
            Every engagement starts with understanding your specific manual bottlenecks and software environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact?type=assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md w-full sm:w-auto"
            >
              Book a Workflow Assessment <FaArrowRight size={11} />
            </Link>
            <Link
              to="/contact?type=demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-bold text-gray-800 transition-all hover:bg-gray-50 shadow-sm w-full sm:w-auto"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Commercial FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Frequently Asked Questions</h2>
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
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
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

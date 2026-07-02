import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaCogs,
  FaDatabase,
  FaFileInvoiceDollar,
  FaHandshake,
  FaHeadset,
  FaNetworkWired,
  FaQuestionCircle,
  FaShieldAlt,
  FaUserCheck,
  FaUsers,
  FaWhatsapp,
} from 'react-icons/fa'
import { useState } from 'react'

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const engagementTypes = [
    {
      title: "Enterprise AI Consulting",
      bestFor: "Leadership teams wanting to map out a clear AI roadmap and locate operational process leaks.",
      timeline: "2 - 4 Weeks",
      outcome: "Comprehensive operational audit, technology stack recommendations, and ROI estimation report."
    },
    {
      title: "Business Process Automation",
      bestFor: "Companies looking to eliminate manual data entry, file syncs, and document reconciliation work.",
      timeline: "4 - 6 Weeks",
      outcome: "Fully automated background pipelines coordinating data across departments silently and error-free."
    },
    {
      title: "Custom AI Software",
      bestFor: "Organizations requiring custom-designed software portals built around their specific operational rules.",
      timeline: "8 - 12 Weeks",
      outcome: "Bespoke database portals and web applications with 100% intellectual property ownership."
    },
    {
      title: "Internal AI Assistants",
      bestFor: "Teams spending hours searching local document directories, PDFs, and internal support knowledge bases.",
      timeline: "3 - 5 Weeks",
      outcome: "Private RAG-powered search models indexing company memory securely without data leakages."
    },
    {
      title: "WhatsApp Automation",
      bestFor: "Businesses missing high-intent booking leads or customer support inquiries during off-hours.",
      timeline: "2 - 3 Weeks",
      outcome: "Official WhatsApp Cloud API integrations with 24/7 calendar bookings and lead capture agents."
    },
    {
      title: "CRM & ERP Integrations",
      bestFor: "Connecting legacy platforms (Tally Prime, SAP, Oracle) with modern web stores and front-end channels.",
      timeline: "4 - 8 Weeks",
      outcome: "Secure middleware syncs enabling automated stock levels, instant sales logging, and real-time reports."
    }
  ]

  const steps = [
    {
      step: "Step 1",
      title: "Discovery Call",
      detail: "30 Minutes",
      desc: "We align on your high-level business objectives, identify immediate operational bottlenecks, and review your current software setup."
    },
    {
      step: "Step 2",
      title: "AI Readiness Assessment",
      detail: "Deep operational scan",
      desc: "Our architects map out your manual workflows, determine automation readiness, and estimate implementation ROI."
    },
    {
      step: "Step 3",
      title: "Solution Architecture",
      detail: "Technical blueprinting",
      desc: "We design custom-fit pipelines recommending models, secure VPC databases, and native integrations (Salesforce, Zoho, Tally)."
    },
    {
      step: "Step 4",
      title: "Custom Proposal",
      detail: "Roadmap & Scope",
      desc: "Receive a clear roadmap containing exact milestone deliverables, timeline schedules, and your custom investment estimate."
    }
  ]

  const investmentFactors = [
    { label: "Business & Database Scale", desc: "The volume of transactions, files, and users interacting with the database." },
    { label: "Existing Software Integrations", desc: "The complexity of syncing custom pipelines with legacy tools like Tally, SAP, or Oracle." },
    { label: "Automation Logic Scope", desc: "The complexity and count of branch logic sequences required across the business workflow." },
    { label: "Data Security Protocols", desc: "High-compliance requirements including self-hosted, private VPC model deployments." },
    { label: "Model Architecture", desc: "The choice of models (commercial cloud APIs vs. fine-tuned private open-source parameters)." },
    { label: "Post-Launch Support Level", desc: "Tailored SLAs, continuous prompt engineering, and model performance auditing." }
  ]

  const faqs = [
    {
      q: "How much does an AI project cost?",
      a: "Every implementation is custom-fit. Because every business carries different database schemas, legacy tools, and operational workflows, we don't use fixed packages. After auditing your systems during our readiness assessment, we provide a transparent, milestone-based proposal detailed with exact deliverables."
    },
    {
      q: "Do you charge for the initial consultation?",
      a: "No. The initial 30-minute discovery call and the subsequent AI readiness assessment are completely complimentary. Our objective is to ensure we can deliver a clear, measurable ROI before any technical engagement is signed."
    },
    {
      q: "How long do projects take to deploy?",
      a: "Focused automation workflows or WhatsApp lead agents are typically deployed in 2 to 4 weeks. Full digital transformations, legacy database migrations, or custom enterprise portals range from 2 to 4 months depending on integration complexity."
    },
    {
      q: "Can small businesses work with AlgoForce AI?",
      a: "Yes. We consult and design solutions for startups, growing SMEs, and large mid-market enterprises. We recommend tools and workflows appropriate to your current business size and operational budget."
    }
  ]

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#06101d] font-sans">
      <Helmet>
        <title>Enterprise AI Consulting & Proposals | AlgoForce AI</title>
        <meta name="description" content="Custom Enterprise AI consulting, database integrations, and process automation solutions tailored to your business workflows. Request a custom proposal." />
        <link rel="canonical" href="https://www.algoforceaii.com/pricing" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200 pt-32 pb-16 md:pt-36 md:pb-24">
        {/* Glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-purple-100/40 blur-[100px]" />
          <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-indigo-100/40 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/60 px-4 py-1.5 text-xs font-semibold text-purple-700 mb-6 uppercase tracking-wider">
              Enterprise AI Consulting
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-gray-900 mb-6">
              Every Business Is Different.<br />
              <span className="premium-serif italic font-normal text-purple-600">Every AI Solution Should Be Too.</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-gray-600 mb-8 font-medium">
              Every organization has different workflows, database schemas, legacy systems, compliance requirements, and automation opportunities. We begin with a complimentary AI Business Assessment and provide a customized implementation proposal engineered around your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact?interest=consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md"
              >
                Book Free Consultation <FaArrowRight size={11} />
              </Link>
              <Link
                to="/contact?interest=quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Don't Display Fixed Pricing */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-gray-900 mb-4 leading-tight">
                Why We Don't Display Fixed Pricing Packages
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Enterprise AI implementations vary significantly based on your current operational infrastructure. Fitting complex database syncs, secure self-hosted LLM setups, or WhatsApp queues into rigid flat-rate pricing tiers leads to compromise.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                Instead, we structure every proposal to maximize operational ROI, ensuring your technology investment maps directly to measurable business growth.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl border border-gray-200/60 p-6 md:p-8">
              <h3 className="text-xs uppercase font-bold text-purple-700 tracking-wider mb-4">Pricing Variables</h3>
              <ul className="space-y-3">
                {[
                  "Business size & user counts",
                  "Existing software & database setups",
                  "CRM / ERP sync complexity",
                  "AI model throughput requirements",
                  "Workflow branching logic count",
                  "Self-hosted private VPC security specs"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                    <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-2.5 h-2.5 text-purple-700" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Engagement Process */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Methodology</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Engagement Process</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              How we take your systems from manual workflows to optimized, automated digital infrastructures.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-xs flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                <div>
                  <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 border border-purple-100 rounded-md px-2 py-0.5">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-4 mb-1">{item.title}</h3>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-3">{item.detail}</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Engagement Types */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Scopes</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Typical Engagement Types</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              Common solutions we deliver to scale operations, synchronize databases, and automate pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {engagementTypes.map((item, idx) => (
              <div key={idx} className="bg-gray-50/60 rounded-3xl border border-gray-200/70 p-6 md:p-8 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block">Best For</span>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed font-semibold">{item.bestFor}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200/50">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block">Est. Timeline</span>
                      <p className="text-xs text-purple-700 font-bold mt-0.5">{item.timeline}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block">Business Outcome</span>
                      <p className="text-xs text-gray-700 font-bold mt-0.5">{item.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Determines Investment? */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Investment Metrics</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">What Determines Project Investment?</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              Our project quotes are fully transparent, based on execution complexity and scope requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {investmentFactors.map((factor, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200/60 p-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{factor.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Target Verticals</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">Industries We Serve</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "Manufacturing", "Healthcare", "Hotels & Hospitality", "Retail & E-Commerce",
              "Education & Academies", "Construction & Real Estate", "Logistics & Supply Chain",
              "Professional Services", "Startups & SMEs", "Mid-Market Enterprises"
            ].map((ind) => (
              <span
                key={ind}
                className="text-xs font-semibold px-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-gray-700"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-[#fcfdff] border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:text-purple-700 transition-colors"
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
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
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

      {/* Bottom CTA */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            Ready to Modernize Your Business?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 font-medium">
            Book a complimentary AI Business Assessment with our solutions team and receive personalized recommendations based on your operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact?interest=consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100 shadow-md"
            >
              Book Free Consultation
            </Link>
            <Link
              to="/contact?interest=call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              Schedule Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Pricing

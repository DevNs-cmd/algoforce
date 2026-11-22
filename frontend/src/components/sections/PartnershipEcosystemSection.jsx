import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Handshake, ArrowRight, Shield, Users, Briefcase, Share2, Layers, CheckCircle2 } from 'lucide-react'

const PARTNERSHIP_MODELS = [
  {
    id: 'whitelabel',
    tabLabel: 'White-Label Software',
    title: 'White-Label Technology Execution',
    subtitle: 'Under Your Agency or Consulting Brand',
    desc: 'Scale your technical delivery bandwidth seamlessly. We act as your specialized engineering execution arm for custom web apps, mobile systems, and complex backends. All client-facing deliverables remain 100% white-labeled under your agency identity with mutual NDA protection.',
    benefits: [
      'Strict non-disclosure agreements (NDA) & client protection',
      'Direct access to senior full-stack architects & engineers',
      'Transparent milestone-based pricing with healthy agency margins',
      'White-labeled documentation, Git repos & client walkthroughs'
    ],
    icon: Shield,
    badge: 'Agency Delivery Model'
  },
  {
    id: 'ai-implementation',
    tabLabel: 'AI & Automation Implementation',
    title: 'AI & Intelligent Automation Co-Delivery',
    subtitle: 'Expand Your AI Capabilities Without Full-Time Payroll',
    desc: 'Add advanced AI, intelligent agents, and ERP automation capabilities to your client pitch deck without hiring an expensive in-house machine learning team. We co-architect, build, and deploy the AI pipelines while you manage the client relationship.',
    benefits: [
      'Pre-tested LLM & agentic orchestration architectures',
      'Enterprise Tally, SAP & legacy database connectors ready to deploy',
      'Technical proposal support & architecture co-pitching',
      'Production deployment directly inside client VPCs'
    ],
    icon: Layers,
    badge: 'High-Demand Capability'
  },
  {
    id: 'institutional',
    tabLabel: 'Institutional Projects',
    title: 'Institutional & Campus Technology Delivery',
    subtitle: 'Collaborative Execution for Schools, Colleges & Universities',
    desc: 'Collaborate on large-scale school, college, and university portals, admission systems, and digital campus transformations. Perfect for education consultants and regional institutional service providers.',
    benefits: [
      'Proven admission enquiry automation & CRM integration',
      'Multi-role institutional portals for faculty, students & parents',
      'End-to-end examination, grading & fee workflow automation',
      'Scalable cloud infrastructure supporting peak admission traffic'
    ],
    icon: Users,
    badge: 'Education Sector'
  },
  {
    id: 'reseller-referral',
    tabLabel: 'Reseller & Referral',
    title: 'Structured Reseller & Referral Arrangements',
    subtitle: 'Competitive, Recurring Commission Streams',
    desc: 'Introduce clients needing custom software, ERP integrations, or managed IT services and earn competitive, recurring commission streams. We manage the technical scoping, contract execution, and ongoing support.',
    benefits: [
      'Transparent commission structures on project fees & retainers',
      'Dedicated partner management & rapid quotation turnaround',
      'Zero delivery liability — AlgoForce owns the technical SLA',
      'Regular pipeline updates & partner dashboard reporting'
    ],
    icon: Share2,
    badge: 'Referral Program'
  },
  {
    id: 'joint-engagements',
    tabLabel: 'Joint Engagements',
    title: 'Joint Strategic Client Engagements',
    subtitle: 'Consulting Strategy + Engineering Execution',
    desc: 'Combine your domain consulting and industry advisory expertise with our technical architecture and software engineering execution for Fortune 500 or mid-market transformation proposals.',
    benefits: [
      'Combined RFP & enterprise tender bids',
      'Complementary advisory + software delivery capabilities',
      'Joint steering committee & executive governance',
      'Long-term multi-phase enterprise client expansions'
    ],
    icon: Handshake,
    badge: 'Strategic Alliance'
  }
]

const PartnershipEcosystemSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeTab, setActiveTab] = useState(0)

  const current = PARTNERSHIP_MODELS[activeTab]
  const CurrentIcon = current.icon

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f8fafc] text-slate-900 border-b border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
            Collaborative Technology Delivery
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#092941] mb-4">
            AlgoForce Partnership{' '}
            <span className="font-serif italic font-normal text-purple-900">
              Ecosystem.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            We collaborate with business consultancies, marketing agencies, IT service providers, system integrators, and independent professionals to co-deliver exceptional software.
          </p>
        </motion.div>

        {/* 3D Tactile Tab Switcher */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md">
            {PARTNERSHIP_MODELS.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white shadow-[0_8px_20px_rgba(9,41,65,0.38),0_2px_6px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-t-white/30 border-b-2 border-b-[#051724] -translate-y-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 active:translate-y-0'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Sliding Spotlight Partner Card */}
        <div className="max-w-5xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border-t border-t-white border-b border-b-slate-200 border-x border-slate-200 text-xs font-mono font-bold text-slate-700 mb-4 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                    <CurrentIcon size={14} className="text-purple-900" />
                    <span>{current.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#092941] mb-1.5">
                    {current.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {current.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {current.desc}
                  </p>

                  <Link to="/partnerships">
                    <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0">
                      <span>Explore {current.tabLabel} Terms</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>

                {/* Right Benefits Box (Layered 3D Sub-card) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white to-slate-50/90 p-6 rounded-2xl border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_14px_30px_-4px_rgba(9,41,65,0.12),0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4">
                    Collaboration Guarantees:
                  </div>

                  <div className="space-y-3">
                    {current.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 shadow-[0_4px_10px_rgba(9,41,65,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(9,41,65,0.08)] transition-all">
                        <CheckCircle2 size={15} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-semibold leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default PartnershipEcosystemSection
